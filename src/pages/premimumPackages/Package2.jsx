import React, { useState, useEffect, useContext } from "react";
import { IconCheckbox } from "@tabler/icons-react";
import "./package.css";
import { TextField } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Helmet } from "react-helmet";
import PaymentSucess from "../paymentSuccess/PaymentSucess";
import Loader from "../../components/loader/Loader";

const Package2 = ({handlePaymnetStatus}) => {
 
  const [orderId, setOrderId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [paymentAmt, setPaymentAmt] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const [enterCoupon, setEnterCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponRes, setCouponRes] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [couponAmt, setCouponAmt] = useState("");
  const [planId, setPlanId] = useState("");
  const [proListingPlan, setProListingPlan] = useState([]);
  const [loader3, setLoader3] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(import.meta.env.VITE_BACKEND + `/api/proplan/fetchProPlanData`)
  //     .then((res) => {
  //       setProListingPlan(res.data);
  //     })
  //     .catch((err) => console.error("Error fetching plans:", err));
  // }, []);

  // const validateCoupon = async () => {
  //   try {
  //     const res = await axios.get(
  //       import.meta.env.VITE_BACKEND + `/api/admin/fetchCouponCode/${couponCode}`
  //     );
  //     setCouponRes(res.data);
  //     setCouponAmt(res.data[0].coupon_amt);
  //     setCouponError(false);
  //     setEnterCoupon(false);
  //   } catch (err) {
  //     setCouponError(true);
  //   }
  // };

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
    setLoader3(true);

    // const planData = {
    //   user_id: currentUser[0].login_id,
    //   list_plan_id: item.pro_plan_id,
    //   plan_name: item.pro_plan_name,
    //   original_price: item.pro_plan_amt,
    //   tran_amt: item.pro_plan_amt - (item.pro_plan_amt * Math.abs(couponAmt1)) / 100,
    //   list_plan_valid_for_days: item.pro_plan_validity,
    //   discount: couponAmt1,
    // };

    try {
      const amount =
          item.pro_plan_amt - (item.pro_plan_amt * Math.abs(couponAmt1)) / 100;
      const response = await axios.post(
        import.meta.env.VITE_BACKEND + "/api/pay/proListingPay",
        { amount }
      );

      setLoader3(false);
      const orderId = response.data.id;

      const options = {
        key: import.meta.env.RAZORPAY_API_KEY,
        amount: (item.pro_plan_amt - (item.pro_plan_amt * couponAmt1) / 100) * 100,
        currency: "INR",
        name: item.pro_plan_name,
        order_id: orderId,
        prefill: {
          email: currentUser[0].login_email,
          contact: currentUser[0].login_number,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
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
            original_price: item.pro_plan_amt
          }
          setOrderId(response.razorpay_order_id);
          //setPaymentAmt(planData.tran_amt);
          setPaymentAmt(
            item.pro_plan_amt - (item.pro_plan_amt * Math.abs(couponAmt1)) / 100
          );
          setPaymentId(response.razorpay_payment_id);
          setLoader3(true);
          await axios.post(
            import.meta.env.VITE_BACKEND + "/api/pay/paymentVerification",
            data
          );
          setLoader3(false);
          //setPaymentSuccessful(true);
          handlePaymnetStatus(true);
        },
      };

      const razor = new window.Razorpay(options);
      // razor.on("payment.failed", async (response) => {
      //   const failedPaymentData = {
      //     ...planData,
      //     order_id: response.error.metadata.order_id,
      //     payment_id: response.error.metadata.payment_id,
      //     plan_status: "0",
      //     payment_status: "failed",
      //   };
      //   console.log("failedPaymentData : " , failedPaymentData);
      //   try {
      //     setLoader3(true);
      //     await axios.post(
      //       import.meta.env.VITE_BACKEND + "/api/proplan/buyProPlan",
      //       failedPaymentData
      //     );
      //     setLoader3(false);
      //     setErrorMessage(`Payment Failed: ${response.error.description}`);
      //   } catch (error) {
      //     console.error("Failed to record payment failure:", error);
      //     setErrorMessage("Payment failed and could not be recorded. Please try again.");
      //   }
      // });
      let processedPayments = new Set();
      razor.on("payment.failed", (response) => {
        //paymentId.current = response.error.metadata.payment_id;
        const paymentId = response.error.metadata.payment_id;
        if (processedPayments.has(paymentId)) return; // Skip if already processed
        processedPayments.add(paymentId);

        console.log("payment.failed : ", response.error);
        const data2 = {
        list_plan_id : item.pro_plan_id,
        plan_name : item.pro_plan_name,
        tran_amt :
          item.pro_plan_amt - (item.pro_plan_amt * couponAmt1) / 100,
        list_plan_valid_for_days : item.pro_plan_validity,
        user_id : currentUser[0].login_id,
        pro_plan_added_slots : item.pro_plan_property_slots,
        plan_status : 0,
        order_id : response.error.metadata.order_id,
        payment_id : response.error.metadata.payment_id,
        payment_status : "failed",
        discount : couponAmt1,
        original_price : item.pro_plan_amt,
        }
        axios.post(
          import.meta.env.VITE_BACKEND + "/api/proplan/buyProPlan",
          data2
        );

        alert(response.error.description);
      });
      razor.open();
      

    } catch (error) {
      console.error("Error creating order:", error);
      setLoader3(false);
      setErrorMessage("Failed to initiate payment. Please try again.");
    }
  };


  return (
    <>
      <Helmet>
        <script defer src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <script defer src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
      </Helmet>

      {loader3 && <Loader />}
      {/* {paymentSuccessful && (
        <PaymentSucess
          orderId={orderId}
          paymentAmt={paymentAmt}
          paymentId={paymentId}
          handleChange={handleChange}
        />
      )} */}

     
        <div className="row">
          <div className="col-md-12">
            <section className="price_plan_area section_padding_130_80" id="pricing">
              <div>
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-8 col-lg-6">
                    <div className="section-heading text-center wow fadeInUp">
                      <h6>Pricing Plans</h6>
                      <h3>Let's find a way together</h3>
                      <p>
                        Introducing our premium subscription service, designed to break
                        down barriers and empower you to list more properties than ever
                        before. Find the perfect plan, starting from less than ₹
                        {Math.ceil(proListingPlan[0]?.pro_plan_amt / 7)}/Day
                      </p>
                      <div className="line"></div>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="alert alert-danger text-center">
                    {errorMessage}
                    <button
                      className="btn btn-sm btn-danger ml-2"
                      onClick={() => setErrorMessage(null)}
                    >
                      Close
                    </button>
                  </div>
                )}

                <div className="row justify-content-center">
                  {proListingPlan.map((item, index) => (
                    <div className="col-md-4" key={item.pro_plan_id}>
                      <div className="single_price_plan wow fadeInUp">
                        <div className={`side-shape ${index % 2 === 0 ? "even" : "odd"}`}>
                          <img src="https://bootdey.com/img/popular-pricing.png" alt="" />
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
                            Duration: {item.pro_plan_validity} Days
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
                            onClick={() => handleBuy(item, couponAmt, planId)}
                            disabled={loader3}
                          >
                            Pay Securely
                          </button>
                        </div>

                        {couponRes.length > 0 && !couponError && item.pro_plan_id === planId ? (
                          <span>{couponAmt}% Discount Applied</span>
                        ) : (
                          <span
                            className="ask-coupon-code"
                            onClick={() => {
                              setEnterCoupon(true);
                              setPlanId(item.pro_plan_id);
                              setCouponAmt("");
                              setCouponRes("");
                              setCouponCode("");
                              setCouponError(false);
                            }}
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
                                  placeholder="Enter Code"
                                  variant="outlined"
                                  size="small"
                                  inputProps={{ maxlength: 12 }}
                                  className="w-100 coupon-code-textfield"
                                  value={couponCode}
                                  onChange={(e) => {
                                    setCouponCode(e.target.value.replace(/[^a-zA-Z0-9]/g, ""));
                                    setCouponError(false);
                                  }}
                                />
                              </div>
                              <div className="coupon-code-btn">
                                <button className="btn btn-success" onClick={validateCoupon}>
                                  Redeem
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


    </>
  );
};

export default Package2;