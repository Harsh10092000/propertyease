import React, { useState } from "react";
import { IconCheckbox } from "@tabler/icons-react";
import "./propertylistingplan.css";
import { TextField } from "@mui/material";
import axios from "axios";

const PropertyListingPlan = (props) => {
  const [enterCoupon, setEnterCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponRes, setCouponRes] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [couponAmt, setCouponAmt] = useState("");
  const [planId, setPlanId] = useState("");

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

  return (
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
                before.
              </p>

              <div className="line"></div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {props.proListingPlan.map((item, index) => (
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
                      props.handleBuy(item, couponAmt, planId);
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
  );
};

export default PropertyListingPlan;
