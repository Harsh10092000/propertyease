import {
  IconInfoCircleFilled,
  IconMail,
  IconMapPin,
  IconUser,
  IconWallet,
} from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import React, { useContext, useEffect } from "react";

import { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

import { city } from "../addProperty/City";

import { stateList } from "../addProperty/State";
import { regEx } from "../regEx";

const EditProperty = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const { id } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const handleNextStep = () => {
    activeStep <= 2 ? setActiveStep(activeStep + 1) : "";
  };
  const handleBackStep = () => {
    activeStep >= 1 ? setActiveStep(activeStep - 1) : "";
  };
  const stepStyleConfig = {
    activeBgColor: "#4c5684",
    completedBgColor: "#00ee99",
  };

  const [propertyData, setPropertyData] = useState({
    pro_id: "",
    pro_user_type: "",
    pro_ad_type: "",
    pro_type: "",
    pro_city: "",
    pro_locality: "",

    pro_plot_no: "",
    pro_street: "",
    pro_age: "",
    pro_floor: "",
    pro_bedroom: "",

    pro_washrooms: "",
    pro_balcony: "",
    pro_parking: "",
    pro_facing: "",
    pro_area_size: "",

    pro_width: "",
    pro_length: "",
    pro_facing_road_width: "",
    pro_open_sides: "",
    pro_furnishing: "",

    pro_ownership_type: "",
    pro_approval: "",
    pro_amt: "",
    pro_rental_status: "",
    pro_desc: "",

    pro_possession: "",
    pro_sub_cat: "",
    pro_user_id: "",
    pro_area_size_unit: "Marla",
    pro_facing_road_unit: "Feet",

    pro_amt_unit: "Lakhs",
    pro_pincode: "",
    pro_state: "",
    pro_negotiable: "",
  });
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertyDataById/${id}`
      )
      .then((res) => {
        setPropertyData({
          ...propertyData,
          pro_id: res.data[0].pro_id,
          pro_user_type: res.data[0].pro_user_type,
          pro_ad_type: res.data[0].pro_ad_type,
          pro_type: res.data[0].pro_type,
          pro_city: res.data[0].pro_city,
          pro_locality: res.data[0].pro_locality,

          pro_plot_no: res.data[0].pro_plot_no,
          pro_street: res.data[0].pro_street,
          pro_age: res.data[0].pro_age,
          pro_floor: res.data[0].pro_floor,
          pro_bedroom:
            res.data[0].pro_bedroom === 0 ? "" : res.data[0].pro_bedroom,

          pro_washrooms:
            res.data[0].pro_washrooms === 0 ? "" : res.data[0].pro_washrooms,
          pro_balcony: res.data[0].pro_balcony,
          pro_parking: res.data[0].pro_parking,
          pro_facing: res.data[0].pro_facing,
          pro_area_size: res.data[0].pro_area_size,

          pro_width: res.data[0].pro_width,
          pro_length: res.data[0].pro_length,
          pro_facing_road_width: res.data[0].pro_facing_road_width,
          pro_open_sides: res.data[0].pro_open_sides,
          pro_furnishing: res.data[0].pro_furnishing,

          pro_ownership_type: res.data[0].pro_ownership_type,
          pro_approval: res.data[0].pro_approval,
          pro_amt: res.data[0].pro_amt,
          pro_rental_status: res.data[0].pro_rental_status,
          pro_desc: res.data[0].pro_desc,

          pro_possession: res.data[0].pro_possession,
          pro_area_size_unit: res.data[0].pro_area_size_unit
            ? res.data[0].pro_area_size_unit
            : "Acres",
          pro_facing_road_unit: res.data[0].pro_facing_road_unit
            ? res.data[0].pro_facing_road_unit
            : "Feet",

          pro_amt_unit: res.data[0].pro_amt_unit
            ? res.data[0].pro_amt_unit
            : "Lakhs",
          pro_pincode: res.data[0].pro_pincode,
          //pro_state: res.data[0].pro_state,
          pro_state: stateList.filter(
            (item) => item.name === res.data[0].pro_state
          )[0].id,
          pro_negotiable: res.data[0].pro_negotiable,
          pro_user_id: res.data[0].pro_user_id,
        });
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchImagesWithId/${id}`)
      .then((res) => {
        setImages(res.data);
      });
  }, []);

  const [formatError, setFormatError] = useState(false);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 1000000;
  const minFileSize = 10000;

  const [selectedFiles, setSelectedFiles] = useState(null);
  const formData = new FormData();
  // const handleImage = (data) => {
  //   setFormatError(false);
  //   //setSelectedFiles(data.target.files);

  //   const pattern = /image-*/;
  //   for (let i = 0; i < data.target.files.length; i++) {
  //     if (data.target.files[i].type.match(pattern)) {
  //       setFormatError(false);
  //       if (
  //         data.target.files[i].size < maxFileSize &&
  //         data.target.files[i].size > minFileSize
  //       ) {
  //         formData.append(`files`, data.target.files[i]);
  //         setFileSizeExceeded(false);
  //       } else {
  //         setFileSizeExceeded(true);
  //         return;
  //       }
  //     } else {
  //       setFormatError(true);
  //     }
  //   }

  //   for (let i = 0; i < data.target.files.length; i++) {
  //     formData.append(`files`, data.target.files[i]);
  //   }
  // };

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
      console.log("e.dataTransfer.files : ", e.dataTransfer.files);
      setSelectedFiles(e.dataTransfer.files);
      handleImage(e.dataTransfer.files);
    }
  };

  let files = "";

  if (selectedFiles !== null && selectedFiles !== undefined) {
    files = Array.from(selectedFiles);
  }

  const [step1Disabled, setStep1Disabled] = useState(true);
  useEffect(() => {
    if (propertyData.pro_ad_type !== "" && propertyData.pro_user_type !== "") {
      setStep1Disabled(false);
    } else {
      setStep1Disabled(true);
    }
  }, [propertyData.pro_ad_type, propertyData.pro_user_type]);

  const [step2Disabled, setStep2Disabled] = useState(true);
  useEffect(() => {
    if (
      propertyData.pro_type !== "" &&
      propertyData.pro_city !== "" &&
      propertyData.pro_locality !== "" &&
      propertyData.pro_pincode.length > 5
    ) {
      setStep2Disabled(false);
    } else {
      setStep2Disabled(true);
    }
  }, [
    propertyData.pro_type,
    propertyData.pro_city,
    propertyData.pro_locality,
    propertyData.pro_pincode,
  ]);

  const [step3Disabled, setStep3Disabled] = useState(true);
  useEffect(() => {
    if (propertyData.pro_type.split(",")[1] !== "Land") {
      if (
        propertyData.pro_age !== "" &&
        propertyData.pro_floor !== "" &&
        propertyData.pro_bedroom !== "" &&
        propertyData.pro_washrooms !== "" &&
        propertyData.pro_balcony !== "" &&
        propertyData.pro_parking !== "" &&
        propertyData.pro_facing !== "" &&
        propertyData.pro_possession !== "" &&
        propertyData.pro_open_sides !== "" &&
        propertyData.pro_furnishing !== "" &&
        formatError === false &&
        fileSizeExceeded === false &&
        propertyData.pro_area_size !== ""
      ) {
        setStep3Disabled(false);
      } else {
        setStep3Disabled(true);
      }
    }
  }, [
    propertyData.pro_age,
    propertyData.pro_floor,
    propertyData.pro_bedroom,
    propertyData.pro_washrooms,
    propertyData.pro_balcony,
    propertyData.pro_parking,
    propertyData.pro_facing,
    propertyData.pro_possession,
    propertyData.pro_open_sides,
    propertyData.pro_furnishing !== "",
    formatError,
    fileSizeExceeded,
    propertyData.pro_type,
    propertyData.pro_area_size,
  ]);

  useEffect(() => {
    if (propertyData.pro_type.split(",")[1] === "Land") {
      if (
        propertyData.pro_age !== "" &&
        propertyData.pro_facing !== "" &&
        propertyData.pro_possession !== "" &&
        propertyData.pro_open_sides !== "" &&
        formatError === false &&
        fileSizeExceeded === false
      ) {
        setStep3Disabled(false);
      } else {
        setStep3Disabled(true);
      }
    }
  }, [
    propertyData.pro_age,
    propertyData.pro_facing,
    propertyData.pro_possession,
    propertyData.pro_open_sides,
    formatError,
    fileSizeExceeded,
    propertyData.pro_type,
  ]);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      propertyData.pro_ownership_type !== "" &&
      propertyData.pro_approval !== "" &&
      //propertyData.pro_amt > 0 &&
      (propertyData.pro_desc === "" || propertyData.pro_desc.length < 2000)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    propertyData.pro_ownership_type,
    propertyData.pro_approval,
    //propertyData.pro_amt,
    propertyData.pro_desc,
  ]);

  const handleClick = () => {
    propertyData.pro_state = stateList
      .filter((item) => parseInt(item.id) === parseInt(propertyData.pro_state))
      .map((filteredItem) => filteredItem.name);
    axios
      .put(
        import.meta.env.VITE_BACKEND + "/api/pro/updateProperty",
        propertyData
      )
      // .then((res) => addImages(res.data));
      .then((res) => addImages(propertyData.pro_id));
  };

  const deletePropertyImages = () => {
    try {
      axios
        .delete(
          import.meta.env.VITE_BACKEND +
            `/api/pro/deletePropertyImages/${propertyData.pro_id}`
        )
        // .then((res) => addImages(res.data));
        .then((res) => console.log(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const addImages = async (id) => {
    if (selectedFiles !== null) {
      deletePropertyImages();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`files`, selectedFiles[i]);
      }
      formData.append("proId", id);
      formData.append("userId", currentUser[0].login_id);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/pro/addPropertyimages",
        formData
      );
    }
    navigate(`/${id}`);
  };
 
  return (
    <div>
      {propertyData.pro_user_id === currentUser[0].login_id ? (
        <>
          {" "}
          <Navbar />
          <div className="container">
            <section className="signup-section upper-form-heading post-property">
              <div className="heading_style">
                <h4>
                  <span>
                    <IconMapPin className="sidebar-faicon" />
                  </span>
                  Edit Property
                </h4>
                <p>
                Do fill this form with attention so that your Property details are more accurate for the potential buyers.
                </p>
              </div>
              <div className="signup-form">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-stepinfo">
                      <h4>
                        How to quickly
                        <br /> <span>SELL/RENT</span> your <br />
                        property?
                      </h4>
                      <ul>
                        <li>
                          <span>
                            <IconUser className="sidebar-faicon" />
                          </span>
                          <strong>Edit Account</strong>Update your personal
                          information.
                        </li>
                        <li>
                          <span>
                            <IconMail className="sidebar-faicon" />
                          </span>
                          <strong>Edit Location </strong>Enter all details of
                          your property location
                        </li>
                        <li>
                          <span>
                            <IconInfoCircleFilled className="sidebar-faicon" />
                          </span>
                          <strong>Property Details</strong>Include all property
                          information.
                        </li>
                        <li>
                          <span>
                            <IconWallet className="sidebar-faicon" />
                          </span>
                          <strong>Pricing</strong>Edit property Pricing
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="main-container">
                      <Stepper
                        className="stepper"
                        styleConfig={stepStyleConfig}
                        activeStep={activeStep}
                      >
                        <Step label="Get Started" />
                        <Step label="Location Details" />
                        <Step label="Property Details" />
                        <Step label="Pricing and Others" />
                      </Stepper>

                      {activeStep === 0 ? (
                        <div className="mainDiv flex-col">
                          <h2 style={{ textAlign: "center" }}>
                            Start Posting your Property,It's Free
                          </h2>
                          <h2 style={{ textAlign: "center" }}>Basic Details</h2>
                          <div className="whole_radio">
                            <div className="pro_flex">
                              <FormControl
                                sx={{ m: 1, width: ["100%"] }}
                                size="small"
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Ad Type
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={propertyData.pro_ad_type}
                                  label="Ad Type"
                                  onChange={(e) =>
                                    setPropertyData({
                                      ...propertyData,
                                      pro_ad_type: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value="Sale">Sale</MenuItem>
                                  <MenuItem value="Rent">Rent</MenuItem>
                                </Select>
                                {propertyData.pro_ad_type === "" && (
                                  <FormHelperText sx={{ color: "red" }}>
                                    Required
                                  </FormHelperText>
                                )}
                              </FormControl>

                              <FormControl
                                sx={{ m: 1, width: ["100%"] }}
                                size="small"
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Are you an ?
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={propertyData.pro_user_type}
                                  label="Are you an ?"
                                  onChange={(e) =>
                                    setPropertyData({
                                      ...propertyData,
                                      pro_user_type: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value="Agent">Agent</MenuItem>
                                  <MenuItem value="Owner">Owner</MenuItem>
                                </Select>
                                {propertyData.pro_user_type === "" && (
                                  <FormHelperText sx={{ color: "red" }}>
                                    Required
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </div>
                          </div>

                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-primary"
                              disabled={step1Disabled}
                              //onClick={handleNextStep}
                              onClick={
                                currentUser !== null ? handleNextStep : fetchOtp
                              }
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      ) : activeStep === 1 ? (
                        <div className="flex-col-sm mainDiv">
                          <h2>Locations Details </h2>

                          <div className="pro_flex">
                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                              // error={propertyData.pro_type === "" ? true : false}
                            >
                              <InputLabel htmlFor="grouped-native-select">
                                Property Type
                              </InputLabel>
                              <Select
                                helpperText
                                native
                                defaultValue=""
                                id="grouped-native-select"
                                label="Property Type"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_type: e.target.value,
                                  })
                                }
                                value={propertyData.pro_type}
                              >
                                <option aria-label="None" value="" />
                                <optgroup label="Residential">
                                  <option value={"Apartment,Residential"}>
                                    Apartment
                                  </option>
                                  <option
                                    value={"Independent House,Residential"}
                                  >
                                    Independent House
                                  </option>
                                  <option value={"Builder Floor,Residential"}>
                                    Builder Floor
                                  </option>
                                  <option value={"Farm  House,Residential"}>
                                    Farm House
                                  </option>
                                  <option value={"Raw House,Residential"}>
                                    Raw House
                                  </option>
                                  <option
                                    value={"Retirement Community,Residential"}
                                  >
                                    Retirement Community
                                  </option>
                                  <option
                                    value={"Studio Apartment,Residential"}
                                  >
                                    Studio Apartment
                                  </option>
                                </optgroup>
                                <optgroup label="Land">
                                  <option value={"Residential Land,Land"}>
                                    Residential Land
                                  </option>
                                  <option value={"Commercial Land,Land"}>
                                    Commercial Land
                                  </option>
                                  <option value={"Industrial Land,Land"}>
                                    Industrial Land
                                  </option>
                                  <option value={"Agricultural Land,Land"}>
                                    Agricultural Land
                                  </option>
                                  <option value={"Farm House Land,Land"}>
                                    Farm House Land
                                  </option>
                                </optgroup>
                                <optgroup label="Commercial">
                                  <option value={"Retail Showroom,Commercial"}>
                                    Retail Showroom
                                  </option>
                                  <option
                                    value={"Commercial Building,Commercial"}
                                  >
                                    Commercial Building
                                  </option>
                                  <option value={"Office Complex,Commercial"}>
                                    Office Complex
                                  </option>
                                  <option
                                    value={
                                      "Software Technology Park,Commercial"
                                    }
                                  >
                                    Software Technology Park
                                  </option>
                                  <option value={"Warehouse,Commercial"}>
                                    Warehouse
                                  </option>
                                  <option
                                    value={"Industrial Estate,Commercial"}
                                  >
                                    Industrial Estate
                                  </option>
                                </optgroup>
                              </Select>
                              {propertyData.pro_type === "" && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Required
                                </FormHelperText>
                              )}
                            </FormControl>

                            <TextField
                              sx={{ m: 1, width: ["100%"] }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Plot Number"
                              className="w-full"
                              name="Plot Number"
                              inputProps={{ maxLength: 10 }}
                              value={propertyData.pro_plot_no}
                              onChange={(e) =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_plot_no: e.target.value.replace(
                                    /[^0-9/]/g,
                                    ""
                                  ),
                                })
                              }
                              //required
                            />
                          </div>

                          <div className="pro_flex">
                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                State
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //value={ isNaN(propertyData.pro_state) === true ? stateList.filter((item) =>  item.name ===  propertyData.pro_state)[0].id : propertyData.pro_state  }
                                value={propertyData.pro_state}
                                label="State"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_state: e.target.value,
                                    pro_city: "",
                                  })
                                }
                              >
                                {stateList.map((item, index) => (
                                  <MenuItem value={item.id} key={index}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              {propertyData.pro_state === "" && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Required
                                </FormHelperText>
                              )}
                            </FormControl>

                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                City
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={propertyData.pro_city}
                                label="City"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_city: e.target.value,
                                  })
                                }
                              >
                                {city
                                  .filter(
                                    (i) =>
                                      parseInt(i.state_id) ===
                                      parseInt(propertyData.pro_state)
                                  )
                                  .map((item, index) => (
                                    <MenuItem
                                      value={item.city_name}
                                      key={index}
                                    >
                                      {item.city_name}
                                    </MenuItem>
                                  ))}
                              </Select>
                              {propertyData.pro_city === "" &&
                                propertyData.pro_state === "" && (
                                  <FormHelperText sx={{ color: "red" }}>
                                    Select State to add City
                                  </FormHelperText>
                                )}
                              {propertyData.pro_city === "" &&
                                propertyData.pro_state !== "" && (
                                  <FormHelperText sx={{ color: "red" }}>
                                    Required
                                  </FormHelperText>
                                )}
                            </FormControl>
                          </div>

                          <div>
                            <TextField
                              sx={{ m: 1, width: ["100%"] }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Enter Locality"
                              className="w-full"
                              name="Enter Locality"
                              inputProps={{ maxLength: 50 }}
                              value={propertyData.pro_locality}
                              FormHelperTextProps={{ sx: { color: "red" } }}
                              helperText={
                                propertyData.pro_locality === ""
                                  ? "Required"
                                  : ""
                              }
                              onChange={(e) =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_locality: e.target.value.replace(
                                    /[^0-9A-Z a-z , . /]/g,
                                    ""
                                  ),
                                })
                              }
                              required
                            />
                          </div>

                          <div>
                            <TextField
                              multiline
                              InputProps={{
                                rows: 5,
                              }}
                              sx={{ m: 1, width: ["100%"] }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Complete Address"
                              FormHelperTextProps={{ sx: { color: "red" } }}
                              className="w-full"
                              name="Complete Address"
                              inputProps={{ maxLength: 200 }}
                              helperText={
                                propertyData.pro_desc.length < 2001
                                  ? ""
                                  : "Description should be smaller than 2000 characters"
                              }
                              value={propertyData.pro_street}
                              onChange={(e) =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_street: e.target.value.replace(
                                    /[^0-9A-Z a-z , . /]/g,
                                    ""
                                  ),
                                })
                              }
                              
                            />
                          </div>
                          <div>
                            <TextField
                              sx={{ m: 1, width: ["100%"] }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Pin Code"
                              FormHelperTextProps={{ sx: { color: "red" } }}
                              className="w-full"
                              name="Pin Code"
                              inputProps={{ maxLength: 6 }}
                              value={propertyData.pro_pincode}
                              helperText={
                                propertyData.pro_pincode.length < 6
                                  ? "Enter Valid Pin Code"
                                  : ""
                              }
                              onChange={(e) =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_pincode: e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  ),
                                })
                              }
                              required
                            />
                          </div>
                          <div className="d-flex justify-content-between ">
                            {activeStep > 0 ? (
                              <button className="btn" onClick={handleBackStep}>
                                Back
                              </button>
                            ) : (
                              ""
                            )}
                            <button
                              className="btn btn-primary"
                              disabled={step2Disabled}
                              onClick={handleNextStep}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      ) : activeStep === 2 ? (
                        <div className="flex-col-sm mainDiv">
                          <h2>Property Details</h2>

                          <div className="pro_flex">
                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                Age of Property (in year)
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={propertyData.pro_age}
                                label="Age of Property  (in year)"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_age: e.target.value,
                                  })
                                }
                              >
                                <MenuItem value={"0-1"}>0-1</MenuItem>
                                <MenuItem value={"1-3"}>1-3</MenuItem>
                                <MenuItem value={"3-5"}>3-5</MenuItem>
                                <MenuItem value={"5-10"}>5-10</MenuItem>
                                <MenuItem value={"10+"}>10+</MenuItem>
                              </Select>
                              {propertyData.pro_age === "" && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Required
                                </FormHelperText>
                              )}
                            </FormControl>
                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                Number of Open Sides
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={propertyData.pro_open_sides}
                                label="Number of Open Sides"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_open_sides: e.target.value,
                                  })
                                }
                              >
                                <MenuItem value={"1"}>1</MenuItem>
                                <MenuItem value={"2"}>2</MenuItem>
                                <MenuItem value={"3"}>3</MenuItem>
                                <MenuItem value={"4"}>4</MenuItem>
                              </Select>
                              {propertyData.pro_open_sides === "" && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Required
                                </FormHelperText>
                              )}
                            </FormControl>
                          </div>

                          {propertyData.pro_type.split(",")[1] !== "Land" && (
                            <div className="pro_flex">
                              <FormControl
                                sx={{ m: 1, width: ["100%"] }}
                                size="small"
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Number of bedrooms
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={propertyData.pro_bedroom}
                                  label="Number of bedrooms"
                                  onChange={(e) =>
                                    setPropertyData({
                                      ...propertyData,
                                      pro_bedroom: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value={"0"}>0</MenuItem>
                                  <MenuItem value={"1"}>1</MenuItem>
                                  <MenuItem value={"2"}>2</MenuItem>
                                  <MenuItem value={"3"}>3</MenuItem>
                                  <MenuItem value={"4"}>4</MenuItem>
                                  <MenuItem value={"5+"}>5+</MenuItem>
                                </Select>
                                {(propertyData.pro_bedroom === "" ||
                                  propertyData.pro_bedroom === 0) && (
                                  <FormHelperText sx={{ color: "red" }}>
                                    Required
                                  </FormHelperText>
                                )}
                              </FormControl>

                              <FormControl
                                sx={{ m: 1, width: ["100%"] }}
                                size="small"
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Number of Washrooms
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={propertyData.pro_washrooms}
                                  label="Number of Washrooms"
                                  onChange={(e) =>
                                    setPropertyData({
                                      ...propertyData,
                                      pro_washrooms: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value={"0"}>0</MenuItem>
                                  <MenuItem value={"1"}>1</MenuItem>
                                  <MenuItem value={"2"}>2</MenuItem>
                                  <MenuItem value={"3"}>3</MenuItem>
                                  <MenuItem value={"4"}>4</MenuItem>

                                  <MenuItem value={"5+"}>5+</MenuItem>
                                </Select>

                                {(propertyData.pro_washrooms === "" ||
                                  propertyData.pro_washrooms === 0) && (
                                  <FormHelperText sx={{ color: "red" }}>
                                    Required
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </div>
                          )}
                          {propertyData.pro_type.split(",")[1] !== "Land" && (
                            <div className="pro_flex">
                              <FormControl
                                sx={{ m: 1, width: ["100%"] }}
                                size="small"
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Number of Balconies
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={propertyData.pro_balcony}
                                  label="Number of Balconies"
                                  onChange={(e) =>
                                    setPropertyData({
                                      ...propertyData,
                                      pro_balcony: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value={"0"}>0</MenuItem>
                                  <MenuItem value={"1"}>1</MenuItem>
                                  <MenuItem value={"2"}>2</MenuItem>
                                  <MenuItem value={"3"}>3</MenuItem>
                                  <MenuItem value={"4"}>4</MenuItem>

                                  <MenuItem value={"5+"}>5+</MenuItem>
                                </Select>
                                {propertyData.pro_balcony === "" && (
                                  <FormHelperText sx={{ color: "red" }}>
                                    Required
                                  </FormHelperText>
                                )}
                              </FormControl>

                              <FormControl
                                sx={{ m: 1, width: ["100%"] }}
                                size="small"
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Car Parking
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={propertyData.pro_parking}
                                  label="Car Parking"
                                  onChange={(e) =>
                                    setPropertyData({
                                      ...propertyData,
                                      pro_parking: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value={"0"}>0</MenuItem>
                                  <MenuItem value={"1"}>1</MenuItem>
                                  <MenuItem value={"2"}>2</MenuItem>
                                  <MenuItem value={"3"}>3</MenuItem>
                                  <MenuItem value={"4"}>4</MenuItem>
                                  <MenuItem value={"5+"}>5+</MenuItem>
                                </Select>
                                {propertyData.pro_parking === "" && (
                                  <FormHelperText sx={{ color: "red" }}>
                                    Required
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </div>
                          )}
                          <div className="pro_flex">
                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                Property Facing
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={propertyData.pro_facing}
                                label="Property Facing"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_facing: e.target.value,
                                  })
                                }
                              >
                                <MenuItem value={"North"}>North</MenuItem>
                                <MenuItem value={"North-East"}>
                                  North-East
                                </MenuItem>
                                <MenuItem value={"East"}>East</MenuItem>
                                <MenuItem value={"South-East"}>
                                  South-East
                                </MenuItem>
                                <MenuItem value={"South"}>South</MenuItem>
                                <MenuItem value={"South-West"}>
                                  South-West
                                </MenuItem>
                                <MenuItem value={"West"}>West</MenuItem>
                                <MenuItem value={"North-West"}>
                                  North-West
                                </MenuItem>
                              </Select>
                              {propertyData.pro_facing === "" && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Required
                                </FormHelperText>
                              )}
                            </FormControl>

                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                Possession Available
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={propertyData.pro_possession}
                                label="Possession Available"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_possession: e.target.value,
                                  })
                                }
                              >
                                <MenuItem value={"Immediate"}>
                                  Immediate
                                </MenuItem>
                                <MenuItem value={"0-3 Month"}>
                                  0-3 Month
                                </MenuItem>
                                <MenuItem value={"3-6 Month"}>
                                  3-6 Month
                                </MenuItem>
                                <MenuItem value={"After 6 Months"}>
                                  After 6 Months
                                </MenuItem>
                              </Select>
                              {propertyData.pro_possession === "" && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Required
                                </FormHelperText>
                              )}
                            </FormControl>
                          </div>

                          <div className="pro_flex">
                            <TextField
                              sx={{ m: 1, mr: 0, width: ["70%"] }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Area Plot Size"
                              className="w-full pro_flex_select"
                              name="Area Plot Size"
                              required
                              inputProps={{ maxLength: 100 }}
                              value={propertyData.pro_area_size}
                              FormHelperTextProps={{ sx: { color: "red" } }}
                              helperText={
                                propertyData.pro_area_size === ""
                                  ? "Required"
                                  : ""
                              }
                              onChange={(e) =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_area_size: e.target.value.replace(
                                    regEx[1].numberValidation,
                                    "$1"
                                  ),
                                })
                              }
                            />
                            <FormControl
                              sx={{ mt: 1, width: ["30%"] }}
                              size="small"
                              className="pro_flex_select2"
                            >
                              <Select
                                id="demo-simple-select"
                                value={propertyData.pro_area_size_unit}
                                inputProps={{ "aria-label": "Without label" }}
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_area_size_unit: e.target.value,
                                  })
                                }
                              >
                                <MenuItem value={"Sq. Yards"}>
                                  Sq. Yards
                                </MenuItem>
                                <MenuItem value={"Sq. Mts"}>Sq. Mts</MenuItem>
                                <MenuItem value={"Acres"}>Acres</MenuItem>
                                <MenuItem value={"Marla"}>Marla</MenuItem>
                              </Select>
                            </FormControl>

                            <TextField
                              sx={{ m: 1, width: ["70%"], ml: 2, mr: 0 }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Facing road Width"
                              className="w-full pro_flex_select pro_flex_select3"
                              name="Facing road Width"
                              inputProps={{ maxLength: 100 }}
                              value={propertyData.pro_facing_road_width}
                              onChange={(e) =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_facing_road_width: e.target.value.replace(
                                    regEx[1].numberValidation,
                                    "$1"
                                  ),
                                })
                              }
                            />
                            <FormControl
                              sx={{ mt: 1, width: ["30%"] }}
                              size="small"
                              className="pro_flex_select2"
                            >
                              <Select
                                id="demo-simple-select"
                                value={propertyData.pro_facing_road_unit}
                                inputProps={{ "aria-label": "Without label" }}
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_facing_road_unit: e.target.value,
                                  })
                                }
                              >
                                <MenuItem value={"Feet"}>Feet</MenuItem>
                                <MenuItem value={"Meter"}>Meter</MenuItem>
                              </Select>
                            </FormControl>
                          </div>

                          <div className="pro_flex">
                            <TextField
                              sx={{ m: 1, width: ["100%"] }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Plot Width ( in Feets )"
                              className="w-full"
                              name="Plot Width ( in Feets )"
                              inputProps={{ maxLength: 10 }}
                              value={propertyData.pro_width}
                              onChange={(e) =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_width: e.target.value.replace(
                                    regEx[1].numberValidation,
                                    "$1"
                                  ),
                                })
                              }
                            />

                            <TextField
                              sx={{ m: 1, width: ["100%"] }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Plot Length ( in Feets )"
                              className="w-full"
                              name="Plot Length ( in Feets )"
                              inputProps={{ maxLength: 10 }}
                              value={propertyData.pro_length}
                              onChange={(e) =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_length: e.target.value.replace(
                                    regEx[1].numberValidation,
                                    "$1"
                                  ),
                                })
                              }
                            />
                          </div>

                          {propertyData.pro_type.split(",")[1] !== "Land" && (
                            <div className="pro_flex">
                              <FormControl
                                sx={{ m: 1, width: ["100%"] }}
                                size="small"
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Number of Floors
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={propertyData.pro_floor}
                                  label="Number of Floors"
                                  onChange={(e) =>
                                    setPropertyData({
                                      ...propertyData,
                                      pro_floor: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value={"0"}>0</MenuItem>
                                  <MenuItem value={"1"}>1</MenuItem>
                                  <MenuItem value={"2"}>2</MenuItem>
                                  <MenuItem value={"3"}>3</MenuItem>
                                  <MenuItem value={"4"}>4</MenuItem>

                                  <MenuItem value={"5+"}>5+</MenuItem>
                                </Select>
                                {propertyData.pro_floor === "" && (
                                  <FormHelperText sx={{ color: "red" }}>
                                    Required
                                  </FormHelperText>
                                )}
                              </FormControl>

                              <FormControl
                                sx={{ m: 1, width: ["100%"] }}
                                size="small"
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Furnishing
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={propertyData.pro_furnishing}
                                  label="Furnishing"
                                  onChange={(e) =>
                                    setPropertyData({
                                      ...propertyData,
                                      pro_furnishing: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value={"Semi Furnished"}>
                                    Semi Furnished
                                  </MenuItem>
                                  <MenuItem value={"Fully Furnished"}>
                                    Fully Furnished
                                  </MenuItem>
                                  <MenuItem value={"Unfurnished"}>
                                    Unfurnished
                                  </MenuItem>
                                </Select>
                                {propertyData.pro_furnishing === "" && (
                                  <FormHelperText sx={{ color: "red" }}>
                                    Required
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </div>
                          )}
                          <div className="">
                            <input
                              multiple
                              type="file"
                              id="file-1"
                              class="hidden sr-only w-full"
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
                              className="border py-4 mx-2 rounded-2 border-secondary"
                              onDragEnter={handleDrag}
                              onDragLeave={handleDrag}
                              onDragOver={handleDrag}
                              onDrop={handleDrop}
                            >
                              <div className="d-flex flex-column  align-items-center">
                                <div>Drop files here</div>
                                <div className="py-1">Or</div>
                                <div className="border py-2 px-4">Browse</div>
                              </div>
                            </label>
                            <div>
                              {selectedFiles != null &&
                              selectedFiles != undefined
                                ? files.map((item) => (
                                    <div className="ml-2">
                                      <div>{item.name}</div>
                                      <div></div>
                                    </div>
                                  ))
                                : ""}
                            </div>
                            <div>
                              {selectedFiles === null &&
                              formatError === false &&
                              fileSizeExceeded === false
                                ? images.map((item) => (
                                    <div className="ml-2">
                                      <div>{item.img_link}</div>
                                      <div></div>
                                    </div>
                                  ))
                                : ""}
                            </div>

                            <div className="text-danger ml-2">
                              {formatError ? "Invalid Format" : ""}
                              {fileSizeExceeded
                                ? "File size must be greater than 10KB and less than 1MB"
                                : ""}
                            </div>
                          </div>

                          <div className="d-flex justify-content-between">
                            {activeStep > 0 ? (
                              <button className="btn" onClick={handleBackStep}>
                                Back
                              </button>
                            ) : (
                              ""
                            )}
                            <button
                              className="btn btn-primary"
                              disabled={step3Disabled}
                              onClick={handleNextStep}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      ) : activeStep === 3 ? (
                        <div className="flex-col mainDiv">
                          <h2>Pricing and Others</h2>
                          <div className="pro_flex">
                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                Ownership
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={propertyData.pro_ownership_type}
                                label="Ownership"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_ownership_type: e.target.value,
                                  })
                                }
                              >
                                <MenuItem value={"Ownership"}>
                                  Ownership
                                </MenuItem>
                                <MenuItem value={"Power of Attorney"}>
                                  Power of Attorney
                                </MenuItem>
                              </Select>
                              {propertyData.pro_ownership_type === "" && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Required
                                </FormHelperText>
                              )}
                            </FormControl>

                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                Authority Approved
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={propertyData.pro_approval}
                                label="Authority Approved"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_approval: e.target.value,
                                  })
                                }
                              >
                                <MenuItem value={"HSVP"}>HSVP</MenuItem>
                                <MenuItem value={"MC"}>MC</MenuItem>
                                <MenuItem value={"DTP"}>DTP</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                              </Select>
                              {propertyData.pro_approval === "" && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Required
                                </FormHelperText>
                              )}
                            </FormControl>
                          </div>

                          <div className="pro_flex">
                            <TextField
                              sx={{ m: 1, width: ["80%"], mr: 0 }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Expected Amount"
                              className="w-full pro_flex_select"
                              name="Expected Amount"
                              inputProps={{ maxLength: 10 }}
                              value={propertyData.pro_amt}
                              FormHelperTextProps={{ sx: { color: "red" } }}
                              // helperText={
                              //   propertyData.pro_amt < 1
                              //     ? "Enter Valid Amount"
                              //     : ""
                              // }
                              onChange={(e) =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_amt: e.target.value.replace(
                                    regEx[1].numberValidation,
                                    "$1"
                                  ),
                                })
                              }
                              //required
                            />
                            <FormControl
                              sx={{ mt: 1, width: ["20%"] }}
                              size="small"
                              className="pro_flex_select2"
                            >
                              <Select
                                id="demo-simple-select"
                                value={propertyData.pro_amt_unit}
                                inputProps={{ "aria-label": "Without label" }}
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_amt_unit: e.target.value,
                                  })
                                }
                              >
                                <MenuItem value={"Crores"}>Crores</MenuItem>
                                <MenuItem value={"Lakhs"}>Lakhs</MenuItem>
                                <MenuItem value={"Thousand"}>Thousand</MenuItem>
                              </Select>
                            </FormControl>
                          </div>

                          <div className="pro_flex">
                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                Price Negotiable
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={propertyData.pro_negotiable}
                                label="Price Negotiable"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_negotiable: e.target.value,
                                  })
                                }
                              >
                                <MenuItem value={"Yes"}>Yes</MenuItem>
                                <MenuItem value={"No"}>No</MenuItem>
                              </Select>
                              {propertyData.pro_negotiable === "" && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Required
                                </FormHelperText>
                              )}
                            </FormControl>

                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                Already on Rented
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={propertyData.pro_rental_status}
                                label="Already on Rented"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_rental_status: e.target.value,
                                  })
                                }
                              >
                                <MenuItem value={"Yes"}>Yes</MenuItem>
                                <MenuItem value={"No"}>No</MenuItem>
                              </Select>
                              {propertyData.pro_rental_status === "" && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Required
                                </FormHelperText>
                              )}
                            </FormControl>
                          </div>

                          <div>
                            <TextField
                              multiline
                              sx={{ m: 1, width: ["100%"] }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Property Description"
                              className="w-full"
                              name="Property Description"
                              inputProps={{ maxLength: 2000 }}
                              value={propertyData.pro_desc}
                              FormHelperTextProps={{ sx: { color: "red" } }}
                              helperText={
                                propertyData.pro_desc.length < 2001
                                  ? ""
                                  : "Description should be smaller than 2000 characters"
                              }
                              InputProps={{
                                rows: 5,
                              }}
                              onChange={(e) =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_desc: e.target.value.replace(
                                    /[^0-9A-Z a-z , . /]/g,
                                    ""
                                  ),
                                })
                              }
                            />
                          </div>

                          <div className="d-flex justify-content-between">
                            {activeStep > 0 ? (
                              <button className="btn" onClick={handleBackStep}>
                                Back
                              </button>
                            ) : (
                              ""
                            )}
                            <button
                              className="btn btn-primary"
                              disabled={submitDisabled}
                              onClick={handleClick}
                            >
                              Edit Property
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </>
      ) : (
        <div>
          <div className="main-content">
            <div className="full-width-header">
              <Navbar />
            </div>
            <div className="col-md-12 error-content">
              <div className="error-pict">
                <img src="/images/404-error.webp" alt="dev logo" />
              </div>
              <div className="mt-2">This Property Doesn't belongs to you </div>
              <Link to="/" className="btn btn-primary mt-5">
                Go To Home page
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default EditProperty;
