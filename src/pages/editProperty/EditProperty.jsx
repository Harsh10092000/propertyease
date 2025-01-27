import {
  IconInfoCircleFilled,
  IconMail,
  IconMapPin,
  IconUser,
  IconWallet,
  IconSquare,
  IconSquareCheckFilled,
  IconX,
  IconChevronsLeft,
  IconChevronsRight,
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
import Checkbox from "@mui/material/Checkbox";
import { Skeleton } from "@mui/material";
import { priceFormat } from "../../components/helper";
import Loader from "../../components/loader/Loader";

const EditProperty = () => {
  const [skeleton, setSkeleton] = useState(true);
  const icon = <IconSquare fontSize="small" />;
  const checkedIcon = <IconSquareCheckFilled fontSize="small" />;
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

    const [loader, setLoader] = useState(false);
  //const { id } = useParams();
  const { id1 } = useParams();

  const arrproId = id1.split("-");
  const id = arrproId[arrproId.length - 1];
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

  const [subDistrict, setSubDistrict] = useState();
  const [cityState, setCityState] = useState();
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/SubDistrictData`)
      .then((res) => {
        setSubDistrict(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/StateCityData`)
      .then((res) => {
        setCityState(res.data);
      });
  }, []);

  const propertyAge = [
    { value: "0" },
    { value: "0-1" },
    { value: "1-3" },
    { value: "3-5" },
    { value: "5-10" },
    { value: "10+" },
  ];

  const propertyBedrooms = [
    { value: "0" },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5+" },
  ];

  const propertyFacing = [
    { value: "North" },
    { value: "North-East" },
    { value: "East" },
    { value: "South-East" },
    { value: "South" },
    { value: "South-West" },
    { value: "West" },
    { value: "North-West" },
  ];

  const propertyFurnishing = [
    { value: "Fully Furnished" },
    { value: "Semi Furnished" },
    { value: "Unfurnished" },
  ];

  const propertySides = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
  ];

  const propertyAdType = [{ value: "Sale" }, { value: "Rent" }];

  const propertyUserType = [{ value: "Broker" }, { value: "Owner" }];

  const propertyAuthority = [
    { value: "HSVP" },
    { value: "MC" },
    { value: "DTP" },
    { value: "Other" },
  ];

  const propertyOwnership = [
    { value: "Ownership" },
    { value: "Power of Attorney" },
  ];

  const propertyPossession = [
    { value: "Immediate" },
    { value: "0-3 Month" },
    { value: "3-6 Month" },
    { value: "After 6 Months" },
  ];


  const otherRooms = [
    { value: "Puja Room" },
    { value: "Store Room" },
    { value: "Study Room " },
  ];

  const nearByFacilities = [
    { value: "Schools" },
    { value: "Hospitals" },
    { value: "Public Transportation" },
    { value: "Shops/Malls " },
    { value: "Restaurants" },
    { value: "Parks/Green Spaces " },
  ];


  
  const [selectedOtherRooms, setSelectedOtherRooms] = useState([]);
  const [selectednearByFac, setSelectednearByFac] = useState([]);

  const handleTypeToggle = (type) => {
    if (selectedOtherRooms.includes(type)) {
      setSelectedOtherRooms(selectedOtherRooms.filter((item) => item !== type));
    } else {
      setSelectedOtherRooms([...selectedOtherRooms, type]);
    }
  };

  const handleTypeToggleNearBy = (type) => {
    if (selectednearByFac.includes(type)) {
      setSelectednearByFac(selectednearByFac.filter((item) => item !== type));
    } else {
      setSelectednearByFac([...selectednearByFac, type]);
    }
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
    pro_sub_district: "",
    pro_negotiable: "",
    pro_other_rooms: "",
    pro_near_by_facilities: "",
    pro_corner: "",
  });

  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertyDataById/${id}`
      )
      .then((res) => {
        //setSkeleton(false);
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
          pro_floor:
            res.data[0].pro_floor === 5
              ? res.data[0].pro_floor + "+"
              : res.data[0].pro_floor,
          // pro_bedroom:
          //   res.data[0].pro_bedroom === 0 ? "" : res.data[0].pro_bedroom,

          // pro_washrooms:
          //   res.data[0].pro_washrooms === 0 ? "" : res.data[0].pro_washrooms,
          pro_bedroom:
            res.data[0].pro_bedroom === 5
              ? res.data[0].pro_bedroom + "+"
              : res.data[0].pro_bedroom,

          pro_washrooms:
            res.data[0].pro_washrooms === 5
              ? res.data[0].pro_washrooms + "+"
              : res.data[0].pro_washrooms,
          //pro_bedroom: res.data[0].pro_bedroom,
          //pro_washrooms: res.data[0].pro_washrooms,
          //pro_balcony: res.data[0].pro_balcony,
          //pro_parking: res.data[0].pro_parking,
          // pro_balcony:
          //   res.data[0].pro_balcony === 0 ? "" : res.data[0].pro_balcony,
          // pro_parking:
          //   res.data[0].pro_parking === 0 ? "" : res.data[0].pro_parking,
          pro_balcony:
            res.data[0].pro_balcony === 5
              ? res.data[0].pro_balcony + "+"
              : res.data[0].pro_balcony,
          pro_parking:
            res.data[0].pro_parking === 5
              ? res.data[0].pro_parking + "+"
              : res.data[0].pro_parking,
          pro_facing: res.data[0].pro_facing,
          pro_area_size: res.data[0].pro_area_size,

          pro_width: res.data[0].pro_width,
          pro_length: res.data[0].pro_length,
          pro_facing_road_width: res.data[0].pro_facing_road_width,
          // pro_open_sides:
          //   res.data[0].pro_open_sides === 0 ? "" : res.data[0].pro_open_sides,
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
          pro_state: res.data[0].pro_state,
          pro_sub_district: res.data[0].pro_sub_district,
          // pro_state: stateList.filter(
          //   (item) => item.name === res.data[0].pro_state
          // )[0].id,
          pro_negotiable: res.data[0].pro_negotiable,
          pro_user_id: res.data[0].pro_user_id,
          pro_corner: res.data[0].pro_corner,
        });
        setSelectedOtherRooms(res.data[0].pro_other_rooms ? res.data[0].pro_other_rooms.split(",") : []);
        setSelectednearByFac(res.data[0].pro_other_rooms ? res.data[0].pro_near_by_facilities.split(",") : [])

       setSkeleton(false);
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

  const pattern = /image-*/;
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

  const removeImage = (item, index) => {
    console.log("index : " , index);
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
    files = Array.from(newSelectedFiles);
    handleImage(newSelectedFiles);
  };

  const [step1, setStep1] = useState(false);
  const handleStep1 = () => {
    if (propertyData.pro_ad_type !== "" && propertyData.pro_user_type !== "") {
      setStep1(false);
      setActiveStep(activeStep + 1);
    } else {
      setStep1(true);
    }
  };

  const [step2, setStep2] = useState(false);
  const handleStep2 = () => {
    if (
      propertyData.pro_type !== "" &&
      propertyData.pro_city !== "" &&
      propertyData.pro_sub_district !== "" &&
      propertyData.pro_locality !== "" &&
      propertyData.pro_pincode.length > 5
    ) {
      setStep2(false);
      setActiveStep(activeStep + 1);
    } else {
      setStep2(true);
    }
  };

  const [step3, setStep3] = useState(false);
  const handleStep3 = () => {
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
        propertyData.pro_area_size !== "" &&
        formatError === false &&
        fileSizeExceeded === false
      ) {
        setStep3(false);
        setActiveStep(activeStep + 1);
      } else {
        setStep3(true);
      }
    } else if (
      propertyData.pro_age !== "" &&
      propertyData.pro_facing !== "" &&
      propertyData.pro_possession !== "" &&
      propertyData.pro_area_size !== "" &&
      formatError === false &&
      fileSizeExceeded === false
    ) {
      setStep3(false);
      setActiveStep(activeStep + 1);
    } else {
      setStep3(true);
    }
  };

  const [step4, setStep4] = useState(false);
  const handleStep4 = () => {
    if (
      propertyData.pro_ownership_type !== "" &&
      propertyData.pro_approval !== "" &&
      propertyData.pro_ownership_type !== null &&
      propertyData.pro_approval !== null
    ) {
      setStep4(false);
      handleClick();
    } else {
      setStep4(true);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      propertyData.pro_ownership_type !== "" &&
      propertyData.pro_approval !== "" &&
      (propertyData.pro_amt === "" || propertyData.pro_amt > 0) &&
      propertyData.pro_desc !== null &&
      propertyData.pro_desc !== "" &&
      (propertyData.pro_desc === "" || propertyData.pro_desc.length < 2000)
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    propertyData.pro_ownership_type,
    propertyData.pro_approval,
    propertyData.pro_amt,
    propertyData.pro_desc,
  ]);


  const handleClick = () => {
    setLoader(true);
    var val = propertyData.pro_locality.trim();
    var a = val.replace(/\s{2,}/g, " ");
    propertyData.pro_locality = a;
    propertyData.pro_other_rooms = selectedOtherRooms?.map((item) => item).join(",");
    propertyData.pro_near_by_facilities = selectednearByFac?.map((item) => item).join(",");
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
    //navigate(`/${id}`);
    setLoader(false);
    navigate(
      `/${
        propertyData.pro_area_size.toLowerCase() +
        "-" +
        propertyData.pro_area_size_unit
          .toLowerCase()
          .replaceAll(" ", "-")
          .replaceAll(".", "") +
        "-"
      }${
        propertyData.pro_type
          ? propertyData.pro_type
              .split(",")[0]
              .toLowerCase()
              .replaceAll(" ", "-")
          : ""
      }-for-${
        propertyData.pro_ad_type === "Rent" ? "rent" : "sale"
      }-in-${propertyData.pro_locality
        .toLowerCase()
        .replaceAll(" ", "-")}-${propertyData.pro_city
        .toLowerCase()
        .replaceAll(" ", "-")}-${id}`
    );
  };

  return (
    <div>
      {loader ? <Loader /> : ""}
      {skeleton ? (
       <>
        <Navbar />
       <div className="container">
          <div className="row user-profile-form-comp" style={{ marginTop: "130px" }}>
            <div className="col-md-12">
              
              <Skeleton variant="rectangular" height={100} className=""  />

              <Skeleton variant="rectangular" height={400} className="mt-4 " />
            </div>
          </div>
        </div> 
      </> 
      ) : propertyData.pro_user_id === currentUser[0].login_id ? (
        <>
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
                  Do fill this form with attention so that your Property details
                  are more accurate for the potential buyers.
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

                          <div className="pro_flex m-1 mt-3">
                            <div className="w-100 m-1">
                              <span className="pro_heading">Ad Type</span>
                              <div className="d-flex mb-1">
                                {propertyAdType.map((item) => (
                                  <div
                                    onClick={(e) => {
                                      setPropertyData({
                                        ...propertyData,
                                        pro_ad_type: item.value,
                                      });
                                    }}
                                    className={
                                      propertyData.pro_ad_type === item.value
                                        ? "pro_radio_btn_1 pro_selected mb-1"
                                        : "pro_radio_btn_1 mb-1"
                                    }
                                  >
                                    {item.value}
                                  </div>
                                ))}
                              </div>
                              {step1 === true &&
                                propertyData.pro_ad_type === "" && (
                                  <div className="error_msg">Required</div>
                                )}
                            </div>
                            <div className="w-100 m-1">
                              <span className="pro_heading">Are you an ?</span>
                              <div className="d-flex mb-1">
                                {propertyUserType.map((item) => (
                                  <div
                                    onClick={(e) => {
                                      setPropertyData({
                                        ...propertyData,
                                        pro_user_type: item.value,
                                      });
                                    }}
                                    className={
                                      propertyData.pro_user_type === item.value
                                        ? "pro_radio_btn_1 pro_selected mb-1"
                                        : "pro_radio_btn_1 mb-1"
                                    }
                                  >
                                    {item.value}
                                  </div>
                                ))}
                              </div>
                              {step1 === true &&
                                propertyData.pro_user_type === "" && (
                                  <div className="error_msg">Required</div>
                                )}
                            </div>
                          </div>

                          <div className="d-flex justify-content-start">
                          <button
                              className="btn continue-btn"
                              //disabled={step2Disabled}
                              //disabled={step2 === true ? true : false}
                              onClick={handleStep1}
                            >
                              Next <IconChevronsRight />
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
                                  <option value={"Farm House,Residential"}>
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
                                  <option
                                    value={"RK,Residential"}
                                  >
                                    RK
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
                                  <option
                                    value={"Institutional,Commercial"}
                                  >
                                    Institutional
                                  </option>

                                  <option
                                    value={"Petrol Pump,Commercial"}
                                  >
                                    Petrol Pump
                                  </option>

                                  <option
                                    value={"Cold Store,Commercial"}
                                  >
                                    Cold Store
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
                                    pro_sub_district: "",
                                  })
                                }
                              >
                                {stateList.map((item, index) => (
                                  <MenuItem value={item.name} key={index}>
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
                                title={
                                  propertyData.pro_state === "" &&
                                  "Select State to add City"
                                }
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_city: e.target.value,
                                    pro_sub_district: "",
                                  })
                                }
                              >
                                {cityState &&
                                  cityState
                                    .filter(
                                      (i) => i.state === propertyData.pro_state
                                    )
                                    .map((item, index) => (
                                      <MenuItem
                                        value={item.district}
                                        key={index}
                                      >
                                        {item.district}
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


                          <div className="pro_flex">
                            <FormControl
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                            >
                              <InputLabel id="demo-simple-select-label">
                                Sub District
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                title={
                                  propertyData.pro_state !== "" &&
                                  propertyData.pro_city === "" &&
                                  "Select City to add sub district"
                                }
                                value={propertyData.pro_sub_district}
                                label="Sub District"
                                onChange={(e) =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_sub_district: e.target.value,
                                  })
                                }
                              >
                                {subDistrict &&
                                  subDistrict
                                    .filter(
                                      (i) =>
                                        i.district === propertyData.pro_city
                                    )
                                    .map((item, index) => (
                                      <MenuItem
                                        value={item.sub_district}
                                        key={index}
                                      >
                                        {item.sub_district}
                                      </MenuItem>
                                    ))}
                              </Select>
                              {(propertyData.pro_city === "" ||
                                propertyData.pro_state === "") && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Select State and City to add Sub District
                                </FormHelperText>
                              )}
                              {propertyData.pro_sub_district === "" &&
                                propertyData.pro_city !== "" &&
                                propertyData.pro_state !== "" && (
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
                                    /[^0-9A-Z a-z , . //\n]/g,
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
                              // helperText={
                              //   propertyData.pro_desc !== null && propertyData.pro_desc !== "" &&
                              //    propertyData.pro_desc.length < 2001
                              //     ? ""
                              //     : "Description should be smaller than 2000 characters"
                              // }
                              helperText={
                                propertyData.pro_desc === null
                                  ? ""
                                  : propertyData.pro_desc.length < 2001
                                  ? ""
                                  : "Description should be smaller than 2000 characters"
                              }
                              value={propertyData.pro_street}
                              onChange={(e) =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_street: e.target.value.replace(
                                    /[^0-9A-Z a-z , . //\n]/g,
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
                                (propertyData.pro_pincode !== null ||
                                  propertyData.pro_pincode !== "") &&
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
                              
                              <button className="btn add-pro-back-btn" onClick={handleBackStep}>
                              <IconChevronsLeft /> Back
                             </button>
                            ) : (
                              ""
                            )}
                             <button
                              className="btn continue-btn"
                              //disabled={step2Disabled}
                              //disabled={step2 === true ? true : false}
                              onClick={handleStep2}
                            >
                              Next <IconChevronsRight />
                            </button>
                          </div>
                        </div>
                      ) : activeStep === 2 ? (
                        <div className="flex-col-sm mainDiv">
                          <h2>Property Details</h2>

                          <div className="pro_flex pro_flex_1">
                            <div className="w-100 m-1">
                              <span className="pro_heading">
                                Age of Property (in year)
                              </span>
                              <div className="d-flex flex-wrap ">
                                {propertyAge.map((item) => (
                                  <div
                                    className={
                                      propertyData.pro_age === item.value
                                        ? "pro_radio_btn_1 pro_selected"
                                        : "pro_radio_btn_1 "
                                    }
                                    onClick={(e) =>
                                      setPropertyData({
                                        ...propertyData,
                                        pro_age: item.value,
                                      })
                                    }
                                  >
                                    {item.value}
                                  </div>
                                ))}
                              </div>
                              {step3 === true &&
                                propertyData.pro_age === "" && (
                                  <div className="error_msg">Required</div>
                                )}
                            </div>
                          </div>

                          {propertyData.pro_type.split(",")[1] !== "Land" && (
                            <div className="pro_flex pro_flex_1">
                              <div className="w-100 m-1 mb-3">
                                <span className="pro_heading">
                                  Number of bedrooms
                                </span>
                                <div className="d-flex ">
                                  {propertyBedrooms.map((item) => (
                                    <div
                                      className={
                                        propertyData.pro_bedroom.toString() ===
                                        item.value.toString()
                                          ? "pro_radio_btn pro_selected"
                                          : "pro_radio_btn"
                                      }
                                      onClick={() =>
                                        setPropertyData({
                                          ...propertyData,
                                          pro_bedroom: item.value.toString(),
                                        })
                                      }
                                    >
                                      {item.value}
                                    </div>
                                  ))}
                                </div>
                                {step3 === true &&
                                  propertyData.pro_bedroom === "" && (
                                    <div className="error_msg">Required</div>
                                  )}
                              </div>
                              <div className="w-100 m-1 mb-3">
                                <span className="pro_heading">
                                  Number of Washrooms
                                </span>
                                <div className="d-flex ">
                                  {propertyBedrooms.map((item) => (
                                    <div
                                      className={
                                        propertyData.pro_washrooms.toString() ===
                                        item.value.toString()
                                          ? "pro_radio_btn pro_selected"
                                          : "pro_radio_btn"
                                      }
                                      onClick={() =>
                                        setPropertyData({
                                          ...propertyData,
                                          pro_washrooms: item.value.toString(),
                                        })
                                      }
                                    >
                                      {item.value}
                                    </div>
                                  ))}
                                </div>
                                {step3 === true &&
                                  propertyData.pro_washrooms === "" && (
                                    <div className="error_msg">Required</div>
                                  )}
                              </div>
                            </div>
                          )}
                          {propertyData.pro_type.split(",")[1] !== "Land" && (
                            <div className="pro_flex pro_flex_1">
                              <div className="w-100 m-1 mb-3">
                                <span className="pro_heading">
                                  Number of Balconies
                                </span>
                                <div className="d-flex ">
                                  {propertyBedrooms.map((item) => (
                                    <div
                                      className={
                                        propertyData.pro_balcony.toString() ===
                                        item.value.toString()
                                          ? "pro_radio_btn pro_selected"
                                          : "pro_radio_btn"
                                      }
                                      onClick={() =>
                                        setPropertyData({
                                          ...propertyData,
                                          pro_balcony: item.value,
                                        })
                                      }
                                    >
                                      {item.value}
                                    </div>
                                  ))}
                                </div>
                                {step3 === true &&
                                  propertyData.pro_balcony === "" && (
                                    <div className="error_msg">Required</div>
                                  )}
                              </div>
                              {console.log(
                                "propertyData.pro_balcony : ",
                                propertyData.pro_balcony,
                                propertyData.pro_bedroom,
                                propertyData
                              )}
                              <div className="w-100 m-1 mb-3">
                                <span className="pro_heading">Car Parking</span>
                                <div className="d-flex ">
                                  {propertyBedrooms.map((item) => (
                                    <div
                                      className={
                                        propertyData.pro_parking.toString() ===
                                        item.value.toString()
                                          ? "pro_radio_btn pro_selected"
                                          : "pro_radio_btn"
                                      }
                                      onClick={() =>
                                        setPropertyData({
                                          ...propertyData,
                                          pro_parking: item.value,
                                        })
                                      }
                                    >
                                      {item.value}
                                    </div>
                                  ))}
                                </div>
                                {step3 === true &&
                                  propertyData.pro_parking === "" && (
                                    <div className="error_msg">Required</div>
                                  )}
                              </div>
                            </div>
                          )}
                          <div className="pro_flex pro_flex_1">
                            <div className="w-100 m-1 mb-3">
                              <span className="pro_heading">
                                Property Facing
                              </span>
                              <div className="d-flex flex-wrap ">
                                {propertyFacing.map((item) => (
                                  <div
                                    className={
                                      propertyData.pro_facing === item.value
                                        ? "pro_radio_btn_1 pro_selected"
                                        : "pro_radio_btn_1"
                                    }
                                    onClick={() =>
                                      setPropertyData({
                                        ...propertyData,
                                        pro_facing: item.value,
                                      })
                                    }
                                  >
                                    {item.value}
                                  </div>
                                ))}
                              </div>
                              {step3 === true &&
                                propertyData.pro_facing === "" && (
                                  <div className="error_msg">Required</div>
                                )}
                            </div>
                          </div>

                          {propertyData.pro_type.split(",")[1] !== "Land" && (
                            <div className="pro_flex pro_flex_1">
                              <div className="w-100 m-1 mb-3">
                                <span className="pro_heading">Furnishing</span>
                                <div className="d-flex flex-wrap ">
                                  {propertyFurnishing.map((item) => (
                                    <div
                                      className={
                                        propertyData.pro_furnishing ===
                                        item.value
                                          ? "pro_radio_btn_1 pro_selected"
                                          : "pro_radio_btn_1"
                                      }
                                      onClick={() =>
                                        setPropertyData({
                                          ...propertyData,
                                          pro_furnishing: item.value,
                                        })
                                      }
                                    >
                                      {item.value}
                                    </div>
                                  ))}
                                </div>
                                {step3 === true &&
                                  propertyData.pro_furnishing === "" && (
                                    <div className="error_msg">Required</div>
                                  )}
                              </div>
                            </div>
                          )}
                          <div className="pro_flex pro_flex_1">
                            <div className="w-100 m-1 mb-3">
                              <span className="pro_heading">
                                Possession Available
                              </span>
                              <div className="d-flex flex-wrap ">
                                {propertyPossession.map((item) => (
                                  <div
                                    className={
                                      propertyData.pro_possession === item.value
                                        ? "pro_radio_btn_1 pro_selected"
                                        : "pro_radio_btn_1"
                                    }
                                    onClick={() =>
                                      setPropertyData({
                                        ...propertyData,
                                        pro_possession: item.value,
                                      })
                                    }
                                  >
                                    {item.value}
                                  </div>
                                ))}
                              </div>
                              {step3 === true &&
                                propertyData.pro_possession === "" && (
                                  <div className="error_msg">Required</div>
                                )}
                            </div>
                          </div>

                          {propertyData.pro_type.split(",")[1] !== "Land" && (
                            <div className="pro_flex pro_flex_1">
                              <div className="w-100 m-1 mb-3">
                                <span className="pro_heading">
                                  Number of Floors
                                </span>
                                <div className="d-flex ">
                                  {propertyBedrooms.map((item) => (
                                    <div
                                      className={
                                        propertyData.pro_floor.toString() ===
                                        item.value.toString()
                                          ? "pro_radio_btn pro_selected"
                                          : "pro_radio_btn"
                                      }
                                      onClick={() =>
                                        setPropertyData({
                                          ...propertyData,
                                          pro_floor: item.value,
                                        })
                                      }
                                    >
                                      {item.value}
                                    </div>
                                  ))}
                                </div>
                                {step3 === true &&
                                  propertyData.pro_floor === "" && (
                                    <div className="error_msg">Required</div>
                                  )}
                              </div>

                              <div className="w-100 m-1 mb-3">
                                <span className="pro_heading">
                                  Number of Open Sides
                                </span>
                                <div className="d-flex ">
                                  {propertySides.map((item) => (
                                    <div
                                      className={
                                        propertyData.pro_open_sides.toString() ===
                                        item.value.toString()
                                          ? "pro_radio_btn pro_selected"
                                          : "pro_radio_btn"
                                      }
                                      onClick={() =>
                                        setPropertyData({
                                          ...propertyData,
                                          pro_open_sides: item.value,
                                        })
                                      }
                                    >
                                      {item.value}
                                    </div>
                                  ))}
                                </div>
                                {step3 === true &&
                                  (propertyData.pro_open_sides === "" ||
                                    propertyData.pro_open_sides === 0) && (
                                    <div className="error_msg">Required</div>
                                  )}
                              </div>
                            </div>
                          )}
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
                                step3 === true &&
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
                             style={{width: "97.5%"}}
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
                           
                            {/* <div>
                              <div className="add-pro-img w-100 pb-3">
                                {selectedFiles != null &&
                                selectedFiles != undefined
                                  ? files.map((item, index) => (
                                      <div className="pt-3">
                                        <div className="d-flex file-name-wrapper justify-content-between">
                                          <div className="file-name">
                                            {item.name}
                                          </div>
                                          <div
                                            className="pointer text-[#C4C5C8]"
                                            onClick={() =>
                                              removeImage(item, index)
                                            }
                                            title="Click to remove selected file"
                                          >
                                            <IconX />
                                          </div>
                                        </div>
                                        <div className="text-danger">
                                          {item.size >= 10000 &&
                                          item.size <= 1000000 &&
                                          item.type.match(pattern)
                                            ? ""
                                            : "File size must be greater than 10KB and less than 1MB, and file format should be .png, .jpg"}
                                        </div>
                                      </div>
                                    ))
                                  : ""}
                              </div>
                            </div>
                            */}

                <div className="property-file-wrapper-block mx-2 my-2">
                              <div className="add-pro-img w-100">
                                {selectedFiles != null &&
                                selectedFiles != undefined
                                  ? files.map((item, index) => (
                                      <div className="pt-2 no-padding">
                                        <div className="d-flex file-name-wrapper-1 justify-content-between">
                                          <div className="file-name-1">
                                            {item.name}
                                          </div>
                                          <div
                                            className="pointer text-[#C4C5C8]"
                                            onClick={() =>
                                              removeImage(item, index)
                                            }
                                            title="Click to remove selected file"
                                          >
                                            <IconX height={16} width={16} />
                                          </div>
                                        </div>
                                        <div className="text-danger text-danger-1">
                                          {item.size >= 10000 &&
                                          item.size <= 1000000 &&
                                          item.type.match(pattern)
                                            ? ""
                                            : "File size must be greater than 10KB and less than 1MB, and file format should be .png, .jpg"}
                                        </div>
                                      </div>
                                    ))
                                  : ""}
                              </div>
                            </div>
                           
                           {/* <div className="property-file-wrapper-block mx-2 my-2">
  <div className="add-pro-img w-100">
    {selectedFiles != null && selectedFiles !== undefined
      ? files
          .map((item, index) => {
            const hasError = item.size < 10000 || item.size > 1000000 || !item.type.match(pattern);
            
            return {item, hasError};
          })
          .sort((a, b) => (a.hasError ? -1 : 1) - (b.hasError ? -1 : 1))
          .map((item, index) => (
            <div className="pt-2 no-padding" key={index}>
              {console.log(item)}
              <div className="d-flex file-name-wrapper-1 justify-content-between">
                <div className="file-name-1">{item.item.name}</div>
                <div
                  className="pointer text-[#C4C5C8]"
                  onClick={() => removeImage(item.item, index)}
                  title="Click to remove selected file"
                >
                  <IconX height={16} width={16} />
                </div>
              </div>
              <div className="text-danger text-danger-1">
                {item.hasError
                  ? "File size must be greater than 10KB and less than 1MB, and file format should be .png, .jpg"
                  : ""}
              </div>
            </div>
          ))
      : ""}
  </div>
</div> */}


                            <div>
                             
                              <div className="add-pro-img w-100 pb-3">
                                {selectedFiles === null
                                  ? images.map((item, index) => (
                                      <div className="pt-3">
                                        <div className="d-flex file-name-wrapper justify-content-between">
                                          <div className="file-name">
                                            {item.img_link}
                                          </div>
                                          
                                        </div>
                                      </div>
                                    ))
                                  : ""}
                              </div>
                            </div>

                            
                          </div>

                          <div className="d-flex justify-content-between">
                            {activeStep > 0 ? (
                              <button className="btn add-pro-back-btn" onClick={handleBackStep}>
                              <IconChevronsLeft /> Back
                             </button>
                            ) : (
                              ""
                            )}
                            <button
                              className="btn continue-btn"
                              //disabled={step2Disabled}
                              //disabled={step2 === true ? true : false}
                              onClick={handleStep3}
                            >
                              Next <IconChevronsRight />
                            </button>
                          </div>
                        </div>
                      ) : activeStep === 3 ? (
                        <div className="flex-col mainDiv">
                          <h2>Pricing and Others</h2>
                          <div className="pro_flex pro_flex_1 mb-3">
                            <div className="w-100 m-1">
                              <span className="pro_heading">Ownership</span>
                              <div className="d-flex flex-wrap ">
                                {propertyOwnership.map((item) => (
                                  <div
                                    className={
                                      propertyData.pro_ownership_type ===
                                      item.value
                                        ? "pro_radio_btn_1 pro_selected"
                                        : "pro_radio_btn_1 "
                                    }
                                    onClick={(e) =>
                                      setPropertyData({
                                        ...propertyData,
                                        pro_ownership_type: item.value,
                                      })
                                    }
                                  >
                                    {item.value}
                                  </div>
                                ))}
                              </div>
                              {(step4 === true &&
                                propertyData.pro_ownership_type === "") ||
                                (propertyData.pro_ownership_type === null && (
                                  <div className="error_msg pb-0">Required</div>
                                ))}
                            </div>
                          </div>

                          <div className="pro_flex pro_flex_1 mb-3">
                            <div className="w-100 m-1">
                              <span className="pro_heading">
                                Authority Approved
                              </span>
                              <div className="d-flex flex-wrap ">
                                {propertyAuthority.map((item) => (
                                  <div
                                    className={
                                      propertyData.pro_approval === item.value
                                        ? "pro_radio_btn_1 pro_selected"
                                        : "pro_radio_btn_1 "
                                    }
                                    onClick={(e) =>
                                      setPropertyData({
                                        ...propertyData,
                                        pro_approval: item.value,
                                      })
                                    }
                                  >
                                    {item.value}
                                  </div>
                                ))}
                              </div>
                              {(step4 === true &&
                                propertyData.pro_approval === "") ||
                                (propertyData.pro_approval === null && (
                                  <div className="error_msg pb-0">Required</div>
                                ))}
                            </div>
                          </div>



                          <div className="pro_flex pro_flex_1 mb-3">
                          <div className="d-flex flex-wrap text-center d-flex align-items-center">
                            <span className="pro_heading">Other Rooms</span>
                            {otherRooms.map((item) => (
                              <div
                                className={`pro_radio_btn_1 ${
                                  selectedOtherRooms.includes(item.value)
                                    ? " pro_selected"
                                    : ""
                                }`}
                                onClick={() => handleTypeToggle(item.value)}
                              >
                                {item.value}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pro_flex pro_flex_1 mb-3">
                          <div className="d-flex flex-wrap text-center d-flex align-items-center">
                            <span className="pro_heading">
                              Near By Facilities
                            </span>
                            {nearByFacilities.map((item) => (
                              <div
                                className={`pro_radio_btn_1 ${
                                  selectednearByFac.includes(item.value)
                                    ? " pro_selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleTypeToggleNearBy(item.value)
                                }
                              >
                                {item.value}
                              </div>
                            ))}
                          </div>
                        </div>


                          <div className="pro_flex flex-column pb-3">
                            <TextField
                              sx={{ m: 1, width: ["100%"], mr: 0 }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Expected Amount"
                              className="w-full pro_flex_select"
                              name="Expected Amount"
                              inputProps={{ maxLength: 14 }}
                              value={propertyData.pro_amt && !isNaN(propertyData.pro_amt) ? Intl.NumberFormat().format(propertyData.pro_amt) : "" }
                              FormHelperTextProps={{ sx: { color: "red" } }}
                              helperText={
                                propertyData.pro_amt > 0  ||
                                propertyData.pro_amt === ""
                                  ? ""
                                  : "Enter Valid Amount"
                              }
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
                            <div className="price-in-words">
              {propertyData.pro_amt && !isNaN(propertyData.pro_amt) ? "₹ " + priceFormat(propertyData.pro_amt) : "e.g. ₹ 10,00,000"}
            </div>
                            {/* <FormControl
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
                            </FormControl> */}
                          </div>

                          {/* <div className="pro_flex">
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
                          </div> */}
                          <div className="pro_flex pro_flex_1">
                            <div className="w-100 ">
                              <span className="pro_heading">
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={
                                    propertyData.pro_negotiable === "Yes"
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    setPropertyData({
                                      ...propertyData,
                                      pro_negotiable:
                                        propertyData.pro_negotiable === "Yes"
                                          ? "No"
                                          : "Yes",
                                    });
                                  }}
                                />{" "}
                                Price Negotiable
                              </span>
                            </div>

                            <div className="w-100 ">
                              <span className="pro_heading">
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  checked={
                                    propertyData.pro_rental_status === "Yes"
                                      ? true
                                      : false
                                  }
                                  style={{ marginRight: 8 }}
                                  onClick={() => {
                                    setPropertyData({
                                      ...propertyData,
                                      pro_rental_status:
                                        propertyData.pro_rental_status === "Yes"
                                          ? "No"
                                          : "Yes",
                                    });
                                  }}
                                />{" "}
                                Already on Rented
                              </span>
                            </div>
                          </div>

                          <div className="pro_flex pro_flex_1">
                          <div className="w-100 ">
                            <span className="pro_heading">
                              <Checkbox
                                icon={icon}
                                //checkedIcon={checkedIcon}
                                checked={
                                  propertyData.pro_corner === "Yes"
                                    ? true
                                    : false
                                }
                                style={{ marginRight: 8 }}
                                //checked={selected}
                                onClick={() => {
                                  setPropertyData({
                                    ...propertyData,
                                    pro_corner:
                                      propertyData.pro_corner === "Yes"
                                        ? "No"
                                        : "Yes",
                                  });
                                }}
                              />{" "}
                              Corner Property
                            </span>
                          </div>
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
                                propertyData.pro_desc === null
                                  ? ""
                                  : propertyData.pro_desc.length < 2001
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
                                    /[^0-9A-Z a-z , . //\n]/g,
                                    ""
                                  ),
                                })
                              }
                            />
                          </div>

                          <div className="d-flex justify-content-between">
                            {activeStep > 0 ? (
                              <button className="btn add-pro-back-btn" onClick={handleBackStep}>
                              <IconChevronsLeft /> Back
                             </button>
                            ) : (
                              ""
                            )}
                            <button
                              className="btn continue-btn"
                              //disabled={submitDisabled}
                              //onClick={handleClick}
                              onClick={handleStep4}
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
