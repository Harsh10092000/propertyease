import React, { useState, useEffect } from "react";

import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { IconX } from "@tabler/icons-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment";

const EditPropertyPlanForm = () => {
  //const planId = 1;
  const { planId } = useParams();

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const current_date = `${month}/${date}/${year}`;
  const todaysDate = dayjs(current_date);
  
  const [error, setError] = useState(null);
  const [transactionDate, setTransactionDate] = useState(
    dayjs(todaysDate.add(1, "days"))
  );
  
  useEffect(() => {
    var date1 = transactionDate.$d;
    var filteredDate1 = date1.toString().slice(4, 16);
    const today = moment().startOf('day');
    const totalDays1 = moment(filteredDate1).startOf('day');
    const totalDays10 = totalDays1.diff(today, 'days');
    setPlanData({...planData, pro_plan_validity: totalDays10})
  }, [transactionDate])

  const [planData, setPlanData] = useState({
    pro_plan_name: "",
    pro_plan_amt: "",
    pro_plan_validity: "",
    pro_plan_date: "",
  });


  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/proplan/fetchProPlanDataById/${planId}`)
      .then((res) => {
        setPlanData({
          ...planData,
          pro_plan_name: res.data[0].pro_plan_name,
          pro_plan_amt: res.data[0].pro_plan_amt,
          pro_plan_validity: res.data[0].pro_plan_validity,
          pro_plan_date: res.data[0].pro_plan_date,
        });
        //setTransactionDate(moment(res.data[0].ad_created_at).add(1, "days"))
        setTransactionDate(
          dayjs(
            moment(res.data[0].pro_plan_date).add(parseInt(res.data[0].pro_plan_validity), "days")
          )
        );
      });
  }, [planId]);

  
  const navigate = useNavigate();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (
      planData.pro_plan_name !== "" &&
      planData.pro_plan_amt !== "" &&
      planData.pro_plan_validity !== ""
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(false);
    }
  }, [planData.pro_plan_name, planData.pro_plan_amt, planData.pro_plan_validity]);

  const [formatError, setFormatError] = useState(false);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 1000000;
  const minFileSize = 10000;

  const [selectedFiles, setSelectedFiles] = useState(null);
  const formData = new FormData();

//   const handleImage = (data) => {
//     setFormatError(false);
//     const pattern = /image-*/;
//     for (let i = 0; i < data.length; i++) {
//       if (data[i].type.match(pattern)) {
//         setFormatError(false);
//         if (data[i].size < maxFileSize && data[i].size > minFileSize) {
//           formData.append(`files`, data[i]);
//           setFileSizeExceeded(false);
//         } else {
//           setFileSizeExceeded(true);

//           return;
//         }
//       } else {
//         setFormatError(true);
//       }
//     }
//   };

//   const handleDrag = function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = function (e) {
//     e.preventDefault();
//     e.stopPropagation();

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setSelectedFiles(e.dataTransfer.files);
//       handleImage(e.dataTransfer.files);
//     }
//   };

  const handleClick = async () => {
    //e.preventDefault();
    try {
      setLoader(true);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/proPlan/addProPlan",
        planData
      );
      setLoader(false);
      navigate(`/admin/propertyplans`);
      //navigate(`/user/user-profile/${currentUser[0].login_id}`);
    } catch (err) {
      console.log(err);
    }
  };

//   const handleClick = async () => {
//     //e.preventDefault();
//     try {
//       setLoader(true);
//       const formData = new FormData();
//       formData.append("image", selectedFiles !== null ? selectedFiles[0] : "");
//       formData.append("pro_plan_name", planData.pro_plan_name);
//       formData.append("pro_plan_amt", planData.pro_plan_amt);
//       formData.append("ad_image", planData.ad_image);
//       formData.append("pro_plan_validity", planData.pro_plan_validity);
//       await axios.post(
//         import.meta.env.VITE_BACKEND + "/api/ad/addAd",
//         formData
//       );
//       setLoader(false);
//       navigate(`/admin/adslist`);
//       //navigate(`/user/user-profile/${currentUser[0].login_id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   };

  const removeImage = () => {
    setSelectedFiles(null);
    setFileSizeExceeded(false);
    setFormatError(false);
  };

  return (
    <div>
      {loader && <Loader />}

      <div className="ad-form-wrapper ">
        <div className=" ad-form-heading ">Edit Property Plans</div>
        <div className="pl-2 pt-2 pb-2">
          {/* Are you searching to buy any property? Please fill out this form to
          let us know about your preferred city, property type, and your budget.{" "} */}
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

        

        <div className="pro_flex m-1 ">
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
          
        </div>

        <div className="pro_flex ">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Plan Validity (In Days)"
            variant="outlined"
           size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={planData.pro_plan_validity}
            disabled
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

export default EditPropertyPlanForm;


