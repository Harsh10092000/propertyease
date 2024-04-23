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
import { regEx } from "../regEx";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { IconX } from "@tabler/icons-react";




const AdsForm = () => {
  const [adData, setAdData] = useState({
    ad_type: "",
    ad_link: "",
    ad_image: "",
  });

  const navigate = useNavigate();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  
  const [loader, setLoader] = useState(false);
 

  useEffect(() => {
    if (
      adData.ad_type !== "" &&
      adData.ad_link !== "" 
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(false);
    }
  }, [
    adData.ad_type,
    adData.ad_link,
    
  ]);

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
      await axios
        .post(import.meta.env.VITE_BACKEND + "/api/ad/addAd", formData)
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
    <div>
      {loader && <Loader />}

      <div className="ad-form-wrapper ">
        <div className=" ad-form-heading ">Ads Form</div>
        <div className="pl-2 pt-2 pb-2">
          Are you searching to buy any property? Please fill out this form to
          let us know about your preferred city, property type, and your budget.{" "}
        </div>

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
              <option value={"all_properties_ad_1"}>
                All Properties Ad 1
              </option>
              <option value={"all_properties_ad_2"}>
                All Properties Ad 2
              </option>
              <option value={"property_page_ad_1"}>
                Property Page Ad 1
              </option>
              <option value={"property_page_ad_2"}>
                Property Page Ad 2
              </option>
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
                ad_link: e.target.value.replace(/[^a-zA-Z / . : 0-9 -]/g, ""),
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
  );
};

export default AdsForm;
