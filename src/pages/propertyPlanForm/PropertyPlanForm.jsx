import React, { useState, useEffect } from "react";
import {
  TextField,
} from "@mui/material";
import axios from "axios";

import { useNavigate } from "react-router-dom";


const PropertyPlanForm = () => {

  const [planData, setPlanData] = useState({
    pro_plan_name: "",
    pro_plan_amt: "",
    ad_image: "",
    pro_plan_validity: "",
    pro_plan_list_no: "",
  });

  
  const navigate = useNavigate();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (
      planData.pro_plan_name !== "" &&
      planData.pro_plan_amt !== "" &&
      planData.pro_plan_validity !== "" &&
      planData.pro_plan_list_no !== ""
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(false);
    }
  }, [planData.pro_plan_name, planData.pro_plan_amt, planData.pro_plan_validity, planData.pro_plan_list_no]);

  const handleClick = async () => {
    try {
      setLoader(true);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/proPlan/addProPlan",
        planData
      );
      setLoader(false);
      navigate(`/admin/propertyplans`);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div>
      {loader && <Loader />}

      <div className="ad-form-wrapper ">
        <div className=" ad-form-heading ">Add Property Plans</div>
        <div className="pl-2 pt-2 pb-2">
         
        </div>

        

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Plan name"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={planData.pro_plan_name}
            helperText={planData.pro_plan_name.length < 1 ? "Required" : ""}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setPlanData({
                ...planData,
                pro_plan_name: e.target.value.replace(/[^a-zA-Z / . : 0-9 - #]/g, ""),
              });
            }}
          />
        </div>

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Plan amount"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={planData.pro_plan_amt}
            helperText={planData.pro_plan_amt.length < 1 ? "Required" : ""}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setPlanData({
                ...planData,
                pro_plan_amt: e.target.value.replace(/[^a-zA-Z / . : 0-9 - #]/g, ""),
              });
            }}
          />
        </div>

        

        {/* <div className="pro_flex m-1 ">
          <div className="w-100 date-wrapper m-1">

          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={["DatePicker", "DatePicker"]} >
              <DatePicker
                label="Created At" 
                value={todaysDate}
                format="LL"
                className="w-full"
                readOnly
              />
            </DemoContainer>
          </LocalizationProvider>
          </div>
          <div className="w-100 date-wrapper m-1">

          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={["DatePicker", "DatePicker"]} >
              <DatePicker
                label="End At" 
                value={transactionDate}
                onChange={(newValue) => setTransactionDate(newValue)}
                format="LL"
                className="w-full"
                minDate={todaysDate.add(1, "days")}
                onError={(newError) => {
                  setError(newError);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          </div>
          
        </div> */}

        <div className="pro_flex ">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Plan Validity (In Days)"
            variant="outlined"
           size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={planData.pro_plan_validity}
            
            helperText={planData.pro_plan_validity.length < 1 ? "Required" : ""}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setPlanData({
                ...planData,
                pro_plan_validity: e.target.value.replace(/[^0-9]/g, ""),
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
            value={planData.pro_plan_list_no}
            
            helperText={planData.pro_plan_list_no.length < 1 ? "Required" : ""}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setPlanData({
                ...planData,
                pro_plan_list_no: e.target.value.replace(/[^0-9]/g, ""),
              });
            }}
          />
          </div>

        {/* <div className="m-2">
          <input
            type="file"
            id="file-1"
            class="hidden sr-only w-full "
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(event) => {
              setFormatError(false),
                setFileSizeExceeded(false),
                setSelectedFiles(event.target.files),
                handleImage(event.target.files);
            }}
          />
          <label
            htmlFor="file-1"
            className="mb-3"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="d-flex flex-column align-items-center border border-[#5a5c69] py-4 rounded-2 ">
              <div>Drop files here</div>
              <div className="py-1">Or</div>
              <div className="border py-2 px-4">Browse</div>
            </div>
          </label>
          <div className="  w-100">
            {selectedFiles != null && selectedFiles != undefined ? (
              // ? files.map((item) => (
              <div className="d-flex file-name-wrapper justify-content-between  ">
                <div className="file-name">{selectedFiles[0].name}</div>
                <div
                  className="pointer text-[#C4C5C8]"
                  onClick={removeImage}
                  title="Click to remove selected file"
                >
                  <IconX />
                </div>
              </div>
            ) : (
              // ))
              ""
            )}
          </div>

          <div className="text-danger ml-2 error_msg ">
            {formatError ? "Invalid Format" : ""}
            {fileSizeExceeded
              ? "File size must be greater than 10KB and less than 1MB"
              : ""}
          </div>
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
  );
};

export default PropertyPlanForm;


