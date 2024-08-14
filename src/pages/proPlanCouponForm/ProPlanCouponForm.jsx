import React from "react";
import { useState, useContext, useEffect } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { TextField } from "@mui/material";
import axios from "axios";
import { AdminDashUpperBody, FormHeading } from "../../components/adminDashboardComp/AdminDashTbody";

const ProPlanCouponForm = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);

  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [transactionDate, setTransactionDate] = useState(dayjs(todaysDate));
  const [transactionDate2, setTransactionDate2] = useState(
    dayjs(todaysDate.add(1, "days"))
  );



  const [couponData, setCouponData] = useState({
    pro_coupon_name: "",
    pro_coupon_code: "",
    pro_coupon_amt: "",
    //pro_coupon_validity: "",
    //pro_coupon_list_no: "",
    pro_coupon_valid_form: "",
    pro_coupon_valid_till: "",
  });

  const navigate = useNavigate();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (
      couponData.pro_coupon_name !== "" &&
      couponData.pro_coupon_code !== "" &&
      couponData.pro_coupon_amt !== "" &&
      //couponData.pro_coupon_validity !== "" &&
      //couponData.pro_coupon_list_no !== "" &&
      error1 !== null &&
      error2 !== null
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(false);
    }
  }, [
    couponData.pro_coupon_name,
    couponData.pro_coupon_code,
    couponData.pro_coupon_amt,
    //couponData.pro_coupon_validity,
    //couponData.pro_coupon_list_no,
    error1,
    error2,
  ]);

  

  const handleClick = async () => {
    try {
      setLoader(true);
      couponData.pro_coupon_valid_form = transactionDate.$y +"-"+ (parseInt(transactionDate.$M) + 1) +"-"+ transactionDate.$D +" "+ "00:00:00";
      couponData.pro_coupon_valid_till = transactionDate2.$y +"-"+ (parseInt(transactionDate2.$M) + 1) +"-"+ transactionDate2.$D +" "+ "00:00:00";
      
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/admin/addProListingCoupon",
        couponData
      );
      setLoader(false);
      navigate(`/admin/viewcoupons`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      {loader && <Loader />}

      <div className="profile-form-upper-section">
        <AdminDashUpperBody
        heading={"Add Coupon"}
        filterAva={false}
        selectedActionsAva={false}
        searchAva={false}
      />
</div>

<div className="row user-profile-form-comp">
      <div className="col-md-6">

<div className="user-profile-form-wrapper ">
<div className="form-fields">

      
        
        <FormHeading heading={"Add Coupon"} />

        

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Coupon name"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={couponData.pro_coupon_name}
            helperText={couponData.pro_coupon_name.length < 1 ? "Required" : ""}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setCouponData({
                ...couponData,
                pro_coupon_name: e.target.value.replace(
                  /[^a-zA-Z / . : 0-9 - #]/g,
                  ""
                ),
              });
            }}
          />
        </div>

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Coupon code"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={couponData.pro_coupon_code}
            helperText={couponData.pro_coupon_code.length < 1 ? "Required" : ""}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setCouponData({
                ...couponData,
                pro_coupon_code: e.target.value.replace(
                  /[^a-zA-Z / . : 0-9 - #]/g,
                  ""
                ),
              });
            }}
          />
        </div>

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Coupon Discount (In Percentage)"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 2 }}
            className="w-100"
            value={couponData.pro_coupon_amt}
            helperText={couponData.pro_coupon_amt.length < 1 ? "Required" : ""}
            FormHelperTextProps={{ sx: { color: "red" } }}
            
            onChange={(e) => {
              setCouponData({
                ...couponData,
                pro_coupon_amt: e.target.value.replace(
                  /[^a-zA-Z / . : 0-9 - #]/g,
                  ""
                ),
              });
            }}
          />
        </div>

        <div className="pro_flex m-1 ">
          <div className="w-100 date-wrapper m-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Coupon valid from"
                  value={transactionDate}
                  onChange={(newValue) => setTransactionDate(newValue)}
                  format="LL"
                  className="w-full"
                  minDate={todaysDate}
                  onError={(newError) => {
                    setError1(newError);
                  }}
                  slotProps={{
                    textField: {
                      helperText:
                        error1 !== null ? "Please select correct date" : "",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="w-100 date-wrapper m-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Coupon valid till"
                  value={transactionDate2}
                  onChange={(newValue) => setTransactionDate2(newValue)}
                  format="LL"
                  className="w-full"
                  minDate={todaysDate.add(1, "days")}
                  //helperText="dfg"
                  slotProps={{
                    textField: {
                      helperText:
                        error2 !== null ? "Please select correct date" : "",
                    },
                  }}
                  onError={(newError) => {
                    setError2(newError);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        {/* <div className="pro_flex ">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Plan Validity (In Days)"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={couponData.pro_coupon_validity}
            helperText={
              couponData.pro_coupon_validity.length < 1 ? "Required" : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setCouponData({
                ...couponData,
                pro_coupon_validity: e.target.value.replace(/[^0-9]/g, ""),
              });
            }}
          />
        </div>

        <div className="pro_flex ">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="List Property Slots"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={couponData.pro_coupon_list_no}
            helperText={
              couponData.pro_coupon_list_no.length < 1 ? "Required" : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setCouponData({
                ...couponData,
                pro_coupon_list_no: e.target.value.replace(/[^0-9]/g, ""),
              });
            }}
          />
        </div> */}

        <div className="pro_flex justify-content-end">
          <button
            onClick={handleClick}
            type="button"
            class={
              submitDisabled
                ? "cursor-not-allowed-btn btn btn-secondary px-5 py-2 m-2"
                : "btn btn-primary px-5 py-2 m-2 "
            }
            disabled={submitDisabled}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ProPlanCouponForm;
