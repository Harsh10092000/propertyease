import React, { useState, useEffect, useContext } from "react";
import { IconCheckbox, IconSquareOff } from "@tabler/icons-react";
import "./package.css";
import { TextField } from "@mui/material";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";


const Package1 = () => {
    const { currentUser, login } = useContext(AuthContext);
    const [enterCoupon, setEnterCoupon] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [couponRes, setCouponRes] = useState("");
    const [couponError, setCouponError] = useState(false);
    const [couponAmt, setCouponAmt] = useState("");
    const [planId, setPlanId] = useState("");
    const [proListingPlan, setProListingPlan] = useState([]);
    const [loader, setLoader] = useState(false);
    
    useEffect(() => {
        axios  
        .get(import.meta.env.VITE_BACKEND + `/api/proplan/fetchProPlanData`)
          .then((res) => {
            setProListingPlan(res.data);
          });
      }, []);

    const validateCoupon = async () => {
      try {
        await axios
          .get(
            import.meta.env.VITE_BACKEND +
              `/api/admin/fetchCouponCode/${couponCode}`
          )
          .then((res) => {
            setCouponRes(res.data),
              setCouponAmt(res.data[0].coupon_amt),
              setCouponError(false),
              setEnterCoupon(false);
          });
      } catch (err) {
        setCouponError(true);
      }
    };

    const handleBuy = (item, couponAmt, planId) => {
        checkoutHandler(item, couponAmt, planId);
      };

    const checkoutHandler = async (item, couponAmt, planId) => {
        const couponAmt1 = item.pro_plan_id !== planId ? 0 : couponAmt;
    
        setLoader(true);
        const amount =
          item.pro_plan_amt - (item.pro_plan_amt * Math.abs(couponAmt1)) / 100;
        try {
          const response = await axios.post(
            import.meta.env.VITE_BACKEND + "/api/pay/proListingPay",
            { amount }
          );
          setLoader(false);
          const orderId = response.data.id;
          const options = {
            key: import.meta.env.RAZORPAY_API_KEY,
    
            amount:
              (item.pro_plan_amt - (item.pro_plan_amt * couponAmt1) / 100) * 100,
            currency: "INR",
            name: item.pro_plan_name,
            //callback_url: import.meta.env.VITE_BACKEND + "/api/pay/paymentVerification",
            handler: async function (response) {
              const data = {
                orderCreationId: orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                list_plan_id: item.pro_plan_id,
                plan_name: item.pro_plan_name,
                tran_amt:
                  item.pro_plan_amt -
                  (item.pro_plan_amt * Math.abs(couponAmt1)) / 100,
                list_plan_valid_for_days: item.pro_plan_validity,
                user_id: currentUser[0].login_id,
                pro_plan_added_slots: item.pro_plan_property_slots,
                plan_status: "1",
                payment_status: "Success",
                login_email: currentUser[0].login_email,
                login_number: currentUser[0].login_number,
                discount: couponAmt1,
                original_price: item.pro_plan_amt,
                pro_added_recently: prevData.pro_count,
                total_no_pro_user_can_add: parseInt(prevData.pro_count) + parseInt(item.pro_plan_property_slots)
              }
              setOrderId(response.razorpay_order_id);
              setPaymentAmt(
                item.pro_plan_amt - (item.pro_plan_amt * Math.abs(couponAmt1)) / 100
              );
              setPaymentId(response.razorpay_payment_id);
              setLoader(true);
              const result = await axios.post(
                import.meta.env.VITE_BACKEND + "/api/pay/paymentVerification",
                data
              );
              setLoader(false);
              //result.data == 1 ? navigate("/payment-succesful") : "";
              result.data == 1
                ? setPaymentSuccessful(true)
                : setPaymentSuccessful(false);
            },
            description: "Testing",
            order_id: orderId,
            prefill: {
              // name: "",
              email: currentUser[0].login_email,
              contact: currentUser[0].login_number,
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#121212",
            },
          };
    
          const razor = new window.Razorpay(options);
          razor.on("payment.failed", (response) => {
            //paymentId.current = response.error.metadata.payment_id;
            console.log("payment.failed : ", response.error);
            planData.list_plan_id = item.pro_plan_id;
            planData.plan_name = item.pro_plan_name;
            planData.tran_amt =
              item.pro_plan_amt - (item.pro_plan_amt * couponAmt1) / 100;
            planData.list_plan_valid_for_days = item.pro_plan_validity;
            planData.user_id = currentUser[0].login_id;
            planData.pro_plan_added_slots = item.pro_plan_property_slots;
            planData.plan_status = "0";
            planData.order_id = response.error.metadata.order_id;
            planData.payment_id = response.error.metadata.payment_id;
            planData.payment_status = "Failed";
            planData.discount = couponAmt1;
            planData.original_price = item.pro_plan_amt;
            axios.post(
              import.meta.env.VITE_BACKEND + "/api/proplan/buyProPlan",
              planData
            );
    
            alert(response.error.description);
          });
          // razor.on("payment.failed", (response) => {
          //   alert(response.error.code);
          //   alert(response.error.description);
          //   alert(response.error.source);
          //   alert(response.error.step);
          //   alert(response.error.reason);
          //   alert(response.error.metadata.order_id);
          //   alert(response.error.metadata.payment_id);
          // });
          razor.open();
    
          // axios
          //   .post(import.meta.env.VITE_BACKEND + "/api/proplan/buyProPlan", planData);
        } catch (error) {
          console.error("Error creating order:", error);
        }
      };

  return (
    <>
    <Helmet>
    <script defer src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script defer src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    </Helmet>
    <Navbar />
    <div className="container ">
          <div className="row">
            <div className="col-md-12">
    <section className="price_plan_area section_padding_130_80" id="pricing">
        <div>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-lg-6">
              <div
                className="section-heading text-center wow fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                <h6>Pricing Plans</h6>
                <h3>Let's find a way together</h3>
                {/* <p>
                  Appland is completely creative, lightweight, clean &amp; super
                  responsive app landing page.
                </p> */}
  
                <p>
                  Introducing our premium subscription service, designed to break
                  down barriers and empower you to list more properties than ever
                  before. Find the perfect plan, starting from less than ₹{Math.ceil(proListingPlan[0]?.pro_plan_amt/7)}/Day 
                </p>
  
                <div className="line"></div>
              </div>
            </div>
          </div>
  
          <div className="row justify-content-center">
            {proListingPlan.map((item, index) => (
              <div className="col-md-4">
                <div
                  className="single_price_plan wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
                  }}
                >
                  <div
                    className={`side-shape ${index % 2 === 0 ? "even" : "odd"}`}
                    key="index"
                  >
                    <img
                      src="https://bootdey.com/img/popular-pricing.png"
                      alt=""
                    />
                  </div>
                  <div className="title">
                    <h3>{item.pro_plan_name}</h3>
                    <p>{item.pro_plan_desc}</p>
                    <div className="line"></div>
                  </div>
                  <div className="price">
                    <h4>₹{item.pro_plan_amt}</h4>
                  </div>
                  <div className="description">
                    <p>
                      <IconCheckbox className="plan-icon" />
                      Duration: {item.pro_plan_validity + " "} Days
                    </p>
                    <p>
                      <IconCheckbox className="plan-icon" />
                      List up to {item.pro_plan_property_slots} properties
                    </p>
                    <p>
                      <IconCheckbox className="plan-icon" />
                      On Call Assistance
                    </p>
                    <p>
                      <IconCheckbox className="plan-icon" />
                      House Visit Assistance
                    </p>
                  </div>
                  <div className="button">
                    <button
                      className="btn btn-info btn-2 w-100"
                      onClick={() => {
                    handleBuy(item, couponAmt, planId);
                      }}
                      href="#"
                    >
                      Pay Securely
                    </button>
                  </div>
  
                  {couponRes.length > 0 &&
                  couponError === false &&
                  item.pro_plan_id === planId ? (
                    <span>{couponAmt}% Discount Applied</span>
                  ) : item.pro_plan_id !== planId ? (
                    <span
                      className="ask-coupon-code "
                      onClick={() => {
                        setEnterCoupon(true),
                          setPlanId(item.pro_plan_id),
                          setCouponAmt("");
                        setCouponRes(""),
                          setCouponCode(""),
                          setCouponError(false);
                      }}
                    >
                      Have a coupon code?
                    </span>
                  ) : (
                    <span
                      className="ask-coupon-code "
                      
                    >
                      Have a coupon code?
                    </span>
                  )}
                  {enterCoupon && item.pro_plan_id === planId && (
                    <div className="coupon-wrapper">
                      <div className="pro_flex d-flex">
                        <div>
                          <TextField
                            sx={{ width: ["100%"] }}
                            //label="Enter Coupon Code"
                            placeholder="Enter Code"
                            variant="outlined"
                            size="small"
                            inputProps={{ maxlength: 12 }}
                            className="w-100 coupon-code-textfield"
                            value={couponCode}
                            //helperText={couponCode < 1 ? "Required" : ""}
                            FormHelperTextProps={{ sx: { color: "red" } }}
                            onChange={(e) => {
                              setCouponCode(
                                e.target.value.replace(/[^a-zA-Z0-9]/g, "")
                              );
                              setCouponError(false);
                            }}
                          />
                        </div>
  
                        <div className="coupon-code-btn">
                          <button
                            className="btn btn-success"
                            onClick={validateCoupon}
                          >
                            Reedem
                          </button>
                        </div>
                      </div>
                      <span>{couponError ? "Invalid Coupon" : ""}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
      </div>
      </div>
      <Footer />
      </>
  )
}

export default Package1


