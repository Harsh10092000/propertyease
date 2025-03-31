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

import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { IconX } from "@tabler/icons-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment";
import { AdminDashUpperBody, FormHeading } from "../../components/adminDashboardComp/AdminDashTbody";

const AdsForm = () => {
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
    setAdData({...adData, ad_days: totalDays10})
  }, [transactionDate])

  const [adData, setAdData] = useState({
    ad_type: "",
    ad_link: "",
    ad_image: "",
    ad_days: "",
  });

  
  const navigate = useNavigate();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (
      adData.ad_type !== "" &&
      adData.ad_link !== "" &&
      adData.ad_days !== ""
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(false);
    }
  }, [adData.ad_type, adData.ad_link, adData.ad_days]);

  const [formatError, setFormatError] = useState(false);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 1000000;
  const minFileSize = 10000;

  const [selectedFiles, setSelectedFiles] = useState(null);
  const formData = new FormData();

  const handleImage = (data) => {
    setFormatError(false);
    const pattern = /image-*/;
    for (let i = 0; i < data.length; i++) {
      if (data[i].type.match(pattern)) {
        setFormatError(false);
        if (data[i].size < maxFileSize && data[i].size > minFileSize) {
          formData.append(`files`, data[i]);
          setFileSizeExceeded(false);
        } else {
          setFileSizeExceeded(true);

          return;
        }
      } else {
        setFormatError(true);
      }
    }
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFiles(e.dataTransfer.files);
      handleImage(e.dataTransfer.files);
    }
  };

  // const handleClick = async (e) => {
  //   setLoader(true);

  //   e.preventDefault();
  //   try {
  //     await axios
  //       .post(
  //         import.meta.env.VITE_BACKEND + `/api/ad/addAd`,
  //         adData
  //       )
  //       .then((res) => {
  //         setLoader(false);

  //         setAdData({
  //           ad_type: "",
  //           ad_link: "",
  //           ad_image: "",
  //         });
  //       });
  //   } catch (err) {
  //     console.log(err.response.data);
  //   }
  // };

  const handleClick = async () => {
    //e.preventDefault();
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("image", selectedFiles !== null ? selectedFiles[0] : "");
      formData.append("ad_type", adData.ad_type);
      formData.append("ad_link", adData.ad_link);
      formData.append("ad_image", adData.ad_image);
      formData.append("ad_days", adData.ad_days);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/ad/addAd",
        formData
      );
      setLoader(false);
      navigate(`/admin/adslist`);
      //navigate(`/user/user-profile/${currentUser[0].login_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const removeImage = () => {
    setSelectedFiles(null);
    setFileSizeExceeded(false);
    setFormatError(false);
  };

  return (
    <div className="container-fluid">
    {loader && <Loader />}

    <div className="profile-form-upper-section">
      <AdminDashUpperBody
      heading={"Ads Form"}
      filterAva={false}
      selectedActionsAva={false}
      searchAva={false}
    />
</div>

<div className="row user-profile-form-comp">
    <div className="col-md-6">

<div className="user-profile-form-wrapper ">
  
<div className="form-fields">
<FormHeading heading={"Ads Form"} />
      
        

        <div className="pro_flex m-2">
          <FormControl
            sx={{ width: ["100%"] }}
            size="small"
            // error={propertyData.pro_type === "" ? true : false}
          >
            <InputLabel htmlFor="grouped-native-select">Ad Type</InputLabel>
            <Select
              helpperText
              native
              defaultValue=""
              id="grouped-native-select"
              label="Ad Type"
              onChange={(e) =>
                setAdData({
                  ...adData,
                  ad_type: e.target.value,
                })
              }
              value={adData.ad_type}
            >
              <option aria-label="Select Type" value="" />
              <option value={"all_properties_ad_1"}>All Properties Ad 1 (Top of the page)</option>
              <option value={"all_properties_ad_2"}>All Properties Ad 2 (Middle of the page)</option>
              <option value={"property_page_ad_1"}>Property Page Ad 1 (Top of the page)</option>
              <option value={"property_page_ad_2"}>Property Page Ad 2 (Middle of page at right side)</option>
            </Select>
            {adData.ad_type === "" && (
              <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
            )}
          </FormControl>
        </div>

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Ad Link"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={adData.ad_link}
            helperText={adData.ad_link.length < 1 ? "Required" : ""}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setAdData({
                ...adData,
                ad_link: e.target.value.replace(/[^a-zA-Z / . : 0-9 - #]/g, ""),
              });
            }}
          />
        </div>

        {/* <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Total No. of days"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={adData.ad_days}
            helperText={adData.ad_days.length < 1 ? "Required" : ""}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setAdData({
                ...adData,
                ad_days: e.target.value.replace(/[^0-9]/g, ""),
              });
            }}
          />
        </div> */}

        <div className="pro_flex m-1 ">
          <div className="w-100 date-wrapper m-1">

          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={["DatePicker", "DatePicker"]} >
              <DatePicker
                label="Created At" 
                value={todaysDate}
                //onChange={(newValue) => setTransactionDate(newValue)}
                format="LL"
                className="w-full"
                //minDate={todaysDate.add(1, "days")}
                // onError={(newError) => {
                //   setError(newError);
                // }}
                readOnly
              />
            </DemoContainer>
          </LocalizationProvider>
          </div>
          <div className="w-100 date-wrapper m-1">

          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={["DatePicker", "DatePicker"]} >
              <DatePicker
                label="Disabled At" 
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
            label="Total No. of days"
            variant="outlined"
           size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={adData.ad_days}
            disabled
            helperText={adData.ad_days.length < 1 ? "Required" : ""}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setAdData({
                ...adData,
                ad_days: e.target.value.replace(/[^0-9]/g, ""),
              });
            }}
          />
          </div>
        <div className="m-2">
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
            {selectedFiles != null && selectedFiles != undefined &&
            selectedFiles.length !== 0 ? (
              // ? files.map((item) => (
              <div className="d-flex file-name-wrapper justify-content-between  ">
                
                <div className="file-name">{selectedFiles[0]?.name}</div>
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
        </div>
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

export default AdsForm;
