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
  IconPlus,
} from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import React, { useContext, useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../../context/AuthContext";
import { ACTION_TYPES } from "./FetchActionTypes";
import { INITIAL_STATE, fetchReducer } from "./FetchReducer";
import { stateList } from "./State";
import { regEx } from "../regEx";
import Loader from "../../components/loader/Loader";
import { InputAdornment } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import moment from "moment";
import { Skeleton } from "@mui/material";

import { IconChevronsRight } from "@tabler/icons-react";
import { priceFormat } from "../../components/helper";


const BoxSelectOptions = ({
  heading,
  array,
  field_item,
  field_item_val,
  propertyData,
  setPropertyData,
  step_val,
}) => {
  return (
    <div className="w-100 m-1 mb-3">
      <span className="pro_heading">{heading}</span>
      <div className="d-flex">
        {array.map((item) => (
          <div
            key={item.value} // Added a unique key for each item
            className={
              field_item === item.value
                ? "pro_radio_btn pro_selected"
                : "pro_radio_btn"
            }
            onClick={() =>
              setPropertyData({
                ...propertyData,
                [field_item_val]: item.value, // Use computed property name
              })
            }
          >
            {item.value}
          </div>
        ))}
      </div>
      {step_val === true && field_item === "" && (
        <div className="error_msg">Required</div>
      )}
    </div>
  );
};

const RadioBoxSelection = ({
  heading,
  array,
  field_item,
  field_item_val,
  propertyData,
  setPropertyData,
  step_val,
}) => {
  return (
    <div className="pro_flex pro_flex_1">
      <div className="w-100 m-1 mb-3">
        <span className="pro_heading">{heading}</span>
        <div className="d-flex flex-wrap ">
          {array.map((item) => (
            <div
              className={
                field_item === item.value
                  ? "pro_radio_btn_1 pro_selected"
                  : "pro_radio_btn_1"
              }
              onClick={() =>
                setPropertyData({
                  ...propertyData,
                  [field_item_val]: item.value,
                })
              }
            >
              {item.value}
            </div>
          ))}
        </div>
        {step_val === true && field_item === "" && (
          <div className="error_msg">Required</div>
        )}
      </div>
    </div>
  );
};

const AddProperty = () => {
  const { currentUser, login } = useContext(AuthContext);
  const [prevData, setPrevData] = useState();
  const [upcomingDate, setUpcomingDate] = useState();
  const [latestProperty, setLatestProperty] = useState([]);
  const [proListingPlan, setProListingPlan] = useState([]);
  const [change, setChange] = useState(1);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchLatestProperty`)
      .then((res) => {
        setLatestProperty(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/proplan/fetchProPlanData`)
      .then((res) => {
        setProListingPlan(res.data);
      });
  }, []);

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

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchPropertiesAddInLast30Days/${
            currentUser && currentUser[0].login_id
          }`
      )
      .then((res) => {
        setPrevData(res.data[0]);
        setUpcomingDate(
          res.data[0].pro_creation_date !== null &&
            moment(res.data[0].pro_creation_date)
              .add(30, "days")
              .format("MMMM DD YYYY")
        );
      });
  }, [change]);

  const icon = <IconSquare fontSize="small" />;
  const checkedIcon = <IconSquareCheckFilled fontSize="small" />;
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUserData({ ...userData, number: "" });
    dispatch({ type: ACTION_TYPES.DIALOG_CLOSE });
  };

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

  const curr_date = Date.now();
  const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE);

  const [numberError, setNumberError] = useState(true);
  const [loginStatus, setLoginStatus] = useState("");
  const [getOtp, setGetOtp] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    number: "",
    otp: "",
  });

  const [userType, setUserType] = useState();

  useEffect(() => {
    currentUser !== null &&
      axios
        .get(
          import.meta.env.VITE_BACKEND +
            `/api/act/fetchUserData/${currentUser && currentUser[0].login_id}`
        )
        .then((res) => {
          setUserData({
            ...userData,
            email: res.data[0].login_email,
            number: res.data[0].login_number,
          });
          setChange(change + 1);
        });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/agent/checkUserType/${currentUser && currentUser[0].login_id}`
      )
      .then((res) => {
        setUserType(res.data[0].agent_type);
        setPropertyData({
          ...propertyData,
          pro_user_type: res.data[0].agent_type,
        });
      });
  }, [currentUser]);

  const verifyEmail = async () => {
    try {
      await axios
        .get(
          import.meta.env.VITE_BACKEND +
            `/api/auth/verifyEmail/${userData.email}`
        )
        .then((res) => dispatch({ type: ACTION_TYPES.UNSET_FETCH_ERROR }));
    } catch (err) {
      dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: err.response.data });
    }
  };

  const verifyNumber = async () => {
    try {
      await axios
        .get(
          import.meta.env.VITE_BACKEND +
            `/api/auth/verifyNumber/${userData.number}`
        )
        .then((res) =>
          dispatch({ type: ACTION_TYPES.SET_PHONE_ERROR, payload: res.data })
        );
    } catch (err) {
      dispatch({ type: ACTION_TYPES.UNSET_PHONE_ERROR });
    }
  };

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.UNSET_FETCH_ERROR });
    if (!regEx[0].emailRegex.test(userData.email)) {
      dispatch({ type: ACTION_TYPES.SET_FORMAT_ERROR });
    } else {
      dispatch({ type: ACTION_TYPES.UNSET_FORMAT_ERROR });
      verifyEmail();
    }
  }, [userData.email]);

  useEffect(() => {
    if (userData.number.length > 9) {
      verifyNumber();
      setNumberError(false);
    } else {
      setNumberError(true);
    }
  }, [userData.number]);

  const fetchOtp = async () => {
    // if(step1 === false) {

    setLoader(true);
    //e.preventDefault();
    try {
      dispatch({ type: ACTION_TYPES.FETCH_START });
      await axios
        .get(
          import.meta.env.VITE_BACKEND + `/api/auth/sendOtp/${userData.email}`
        )
        .then((res) => {
          dispatch({ type: ACTION_TYPES.FETCH_SUCCESS });
          handleClickOpen();
        });
      setLoader(false);
    } catch (err) {
      dispatch({ type: ACTION_TYPES.OTP_ERROR, payload: err.response.data });
      handleClickOpen();
      setLoader(false);
    }
    // } else {
    //   setStep1(true);
    // }
  };

  const addUser = async (e) => {
    userData.phone = userData.number;
    e.preventDefault();
    try {
      setGetOtp(true);
      handleClickOpen();
      dispatch({ type: ACTION_TYPES.FETCH_START });
      await axios
        .post(import.meta.env.VITE_BACKEND + `/api/auth/addUser`, userData)
        .then((res) => {
          dispatch({ type: ACTION_TYPES.FETCH_SUCCESS });
          dispatch({ type: ACTION_TYPES.UNSET_FETCH_ERROR });
        });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.OTP_ERROR, payload: err.response.data });
    }
  };

  useEffect(() => {
    if (state.seconds > 0 && state.timer === true) {
      const intervalId = setInterval(() => {
        dispatch({ type: ACTION_TYPES.DECREASE_SECONDS });
        if (state.minutes > 0 && state.seconds === 1) {
          dispatch({ type: ACTION_TYPES.DECREASE_MINUTES });
          dispatch({ type: ACTION_TYPES.CHANGE_SECONDS });
        }
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      dispatch({ type: ACTION_TYPES.CHANGE_TIMER });
    }
  }, [state.timer, state.seconds, state.minutes]);

  const checkLogin = async () => {
    if (userData.otp.length === 6) {
      const result = await login(userData);
      if (result !== false) {
        setChange(change + 1);

        axios
          .get(
            import.meta.env.VITE_BACKEND +
              `/api/pro/fetchPropertiesAddInLast30Days/${
                currentUser && currentUser[0].login_id
              }`
          )
          .then((res) => {
            setPrevData(res.data[0]);
            setUpcomingDate(
              res.data[0].pro_creation_date !== null &&
                moment(res.data[0].pro_creation_date)
                  .add(30, "days")
                  .format("MMMM DD YYYY")
            );
            res.data[0].pro_count >= 5 && handleClose(), handleNextStep();
          });

        //  ( prevData.length > 0 &&
        //     handleNextStep() )

        handleClose();
      } else {
        setLoginStatus("Wrong OTP Entered");
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, [userData.otp]);

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
    pro_user_type: "",
    pro_ad_type: "Sale",
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
    pro_rental_status: "No",
    pro_desc: "",

    pro_possession: "",
    pro_sub_cat: "",
    pro_user_id: currentUser ? currentUser[0].login_id : "",
    pro_area_size_unit: "Marla",
    pro_facing_road_unit: "Feet",

    pro_amt_unit: "Lakhs",
    pro_pincode: "",
    pro_state: "",
    pro_sub_district: "",
    pro_negotiable: "No",
    pro_user_email: "",
    pro_login_number: "",
    pro_corner: "No",
  });

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
      setSelectedFiles(e.dataTransfer.files);
      handleImage(e.dataTransfer.files);
    }
  };

  let files = "";

  if (selectedFiles !== null && selectedFiles !== undefined) {
    files = Array.from(selectedFiles);
  }

  const removeImage = (item, index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
    files = Array.from(newSelectedFiles);
    handleImage(newSelectedFiles);
  };

  const [step1, setStep1] = useState(false);
  const handleStep1 = () => {
    if (
      propertyData.pro_ad_type !== "" &&
      propertyData.pro_user_type !== "" &&
      state.emailFormatError === false &&
      currentUser !== null
    ) {
      setStep1(false);
      setActiveStep(activeStep + 1);
    } else if (currentUser === null && state.emailFormatError === false) {
      fetchOtp();
      //setStep1(false);
    } else {
      setStep1(true);
      //setStep1(false);
      //setActiveStep(activeStep + 1);
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
      //setStep2(false);
      //setActiveStep(activeStep + 1);
    }
  };

  const [step3, setStep3] = useState(false);
  const handleStep3 = () => {
    if (propertyData.pro_type.split(",")[1] === "Commercial") {
      if (
        propertyData.pro_washrooms !== "" &&
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
    } else if (propertyData.pro_type.split(",")[1] !== "Land") {
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
        //setStep3(false);
        //setActiveStep(activeStep + 1);
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
      propertyData.pro_approval !== ""
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
      propertyData.pro_negotiable.length > 0 &&
      propertyData.pro_rental_status.length > 0 &&
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
    propertyData.pro_negotiable,
    propertyData.pro_rental_status,
  ]);

  const changeFormatting = (value) => {
    //var val = value.toLowerCase().trim();
    var val = value.trim();
    var a = val.replace(/\s{2,}/g, " ");
    return a;
  };

  const handleClick = async () => {
    setLoader(true);
    currentUser && (propertyData.pro_user_id = currentUser[0].login_id);
    currentUser && (propertyData.pro_user_email = currentUser[0].login_email);
    currentUser &&
      (propertyData.pro_login_number = currentUser[0].login_number);

    propertyData.pro_locality = changeFormatting(propertyData.pro_locality);
    propertyData.pro_date = Date.now();
    // propertyData.pro_state = stateList.filter(
    //   (item) => parseInt(item.id) === parseInt(propertyData.pro_state)
    // )[0].name;

    propertyData.pro_other_rooms = selectedOtherRooms?.map((item) => item).join(",");
    propertyData.pro_near_by_facilities = selectednearByFac?.map((item) => item).join(",");
    

    axios
      .post(import.meta.env.VITE_BACKEND + "/api/pro/addProperty", propertyData)
      .then((res) => addImages(res.data));
  };

  const addImages = async (id) => {
    if (selectedFiles !== null) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`files`, selectedFiles[i]);
      }
      formData.append("proId", id);
      formData.append("userId", currentUser && currentUser[0].login_id);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/pro/addPropertyimages",
        formData
      );
    }
    setLoader(false);
    //navigate(`/${id}`);
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
        propertyData.pro_ad_type === "rent" ? "rent" : "sale"
      }-in-${propertyData.pro_locality
        .toLowerCase()
        .replaceAll(" ", "-")}-${propertyData.pro_city
        .toLowerCase()
        .replaceAll(" ", "-")}-${id}`
    );
  };

  // useEffect(() => {
  //   window.scrollTo(0, 100);
  // }, []);

  return (
    <div>
      {loader ? <Loader /> : ""}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {state.emailErr !== null ? "Create Account" : "Get Started"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {state.emailErr !== null
              ? "Please enter your phone number."
              : "Check your Mail for OTP."}
          </DialogContentText>

          {state.emailErr === null && (
            <div className="otpWrapper">
              <TextField
                label="OTP"
                variant="outlined"
                size="small"
                inputProps={{ maxlength: 6 }}
                className="w-100"
                value={userData.otp}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    otp: e.target.value.replace(
                      regEx[2].phoneNumberValidation,
                      ""
                    ),
                  }),
                    setLoginStatus("");
                }}
              />

              {state.timer === true ? (
                <p>
                  Time Remaining: {state.minutes}:
                  {state.seconds < 10 ? `0${state.seconds}` : state.seconds}
                </p>
              ) : (
                <p>Didn't recieve code?</p>
              )}
            </div>
          )}

          {state.emailErr !== null && (
            <TextField
              sx={{ m: 1, width: ["100%"] }}
              id="outlined-basic"
              variant="standard"
              size="small"
              label="Phone Number"
              className="w-full"
              name="Phone Number"
              inputProps={{
                maxLength: 10,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91 </InputAdornment>
                ),
              }}
              //value={propertyData.pro_plot_no}
              helperText={
                numberError
                  ? "Please enter a valid Phone Number"
                  : state.numberErr === true
                  ? "Phone Number Already Registered"
                  : ""
              }
              disabled={currentUser === null ? false : true}
              value={userData.number}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  number: e.target.value.replace(/[^0-9/]/g, ""),
                })
              }
              required
            />
          )}
          <div className="input-group text-center">
            <div className="left-block" />
            {state.emailErr !== null ? (
              <button
                className={
                  numberError === false && state.numberErr !== true
                    ? "logina"
                    : "nextDisabled"
                }
                onClick={addUser}
                // disabled={state.timer === true ? true : false}
                disabled={
                  numberError === false &&
                  state.numberErr !== true &&
                  getOtp === false
                    ? false
                    : true
                }
              >
                Next
              </button>
            ) : (
              <button
                className={state.timer === true ? "nextDisabled " : "logina"}
                onClick={fetchOtp}
                disabled={state.timer === true ? true : false}
              >
                Resend OTP
              </button>
            )}
          </div>
          <div
            style={{ color: "red" }}
            className="pt-2 d-flex justify-content-center "
          >
            {loginStatus === "" ? "" : loginStatus}
          </div>
        </DialogContent>
      </Dialog>
      <Navbar />

      {true ? (
        <div className="container">
          <section className="signup-section upper-form-heading post-property">
            <div className="heading_style">
              <h4>
                <span>
                  <IconMapPin className="sidebar-faicon" />
                </span>
                Post Property
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
                        <strong>Create Account</strong>Register your personal
                        information.
                      </li>
                      <li>
                        <span>
                          <IconMail className="sidebar-faicon" />
                        </span>
                        <strong>Add Location </strong>Enter all details of your
                        property location
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
                        <strong>Pricing</strong>Add property Pricing
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
                          Start Posting your Property for Free
                        </h2>

                        <div className="pro_flex m-1 mt-3 pl-md-5">
                          <div className="w-50 m-1">
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
                          <div className="w-50 m-1">
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

                        {currentUser === null && (
                          <div className="pro_flex pl-md-5">
                            <TextField
                              sx={{ m: 1, width: ["100%"] }}
                              id="outlined-basic"
                              variant="outlined"
                              size="small"
                              label="Email"
                              className="w-full"
                              name="Email"
                              FormHelperTextProps={{ sx: { color: "red" } }}
                              //inputProps={{ maxLength: 60 }}
                              helperText={
                                step1 === true &&
                                state.emailFormatError !== false
                                  ? state.emailFormatError
                                  : ""
                              }
                              disabled={currentUser === null ? false : true}
                              value={userData.email}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  email: e.target.value.replace(
                                    /[^a-zA-Z.@0-9/]/g,
                                    ""
                                  ),
                                })
                              }
                              required
                            />
                          </div>
                        )}
                        <div className="d-flex justify-content-start ml-2 mt-2 pl-md-5">
                          <button
                            className="btn continue-btn"
                            //disabled={step1Disabled}
                            //onClick={handleNextStep}
                            // onClick={
                            //   currentUser == null ? handleStep1 :  fetchOtp
                            // }
                            // onClick={
                            //   currentUser === null && state.emailFormatError === false ? fetchOtp : handleStep1
                            // }
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
                                <option value={"Independent House,Residential"}>
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
                                <option value={"Studio Apartment,Residential"}>
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
                                  value={"Software Technology Park,Commercial"}
                                >
                                  Software Technology Park
                                </option>
                                <option value={"Warehouse,Commercial"}>
                                  Warehouse
                                </option>
                                <option value={"Industrial Estate,Commercial"}>
                                  Industrial Estate
                                </option>

                                <option value={"Institutional,Commercial"}>
                                  Institutional
                                </option>

                                <option value={"Petrol Pump,Commercial"}>
                                  Petrol Pump
                                </option>

                                <option value={"Cold Store,Commercial"}>
                                  Cold Store
                                </option>
                              </optgroup>
                            </Select>
                            {step2 === true && propertyData.pro_type === "" && (
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
                            // helperText={
                            //   propertyData.pro_plot_no === "" ? "Required" : ""
                            // }
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
                            {step2 === true &&
                              propertyData.pro_state === "" && (
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
                              disabled={
                                propertyData.pro_state === "" ? true : false
                              }
                              label="City"
                              title={
                                propertyData.pro_state === ""
                                  ? "Select State to add City"
                                  : ""
                              }
                              onChange={(e) => {
                                setPropertyData({
                                  ...propertyData,
                                  pro_city: e.target.value,
                                  pro_sub_district: "",
                                });
                              }}
                            >
                              {cityState
                                .filter(
                                  (i) => i.state === propertyData.pro_state
                                )
                                .map((item, index) => (
                                  <MenuItem value={item.district} key={index}>
                                    {item.district}
                                  </MenuItem>
                                ))}
                            </Select>
                            {step2 === true &&
                              propertyData.pro_city === "" &&
                              propertyData.pro_state !== "" &&
                              propertyData.pro_state !== null && (
                                <FormHelperText sx={{ color: "red" }}>
                                  {/* Select State to add City */}
                                  Required
                                </FormHelperText>
                              )}
                            {step2 === true &&
                              propertyData.pro_city === "" &&
                              propertyData.pro_state === "" && (
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
                                propertyData.pro_state === "" &&
                                propertyData.pro_city === ""
                                  ? "Select State and City to Sub District"
                                  : propertyData.pro_state !== "" &&
                                    propertyData.pro_city === ""
                                  ? "Select City to add Sub District"
                                  : ""
                              }
                              disabled={
                                propertyData.pro_city === "" ||
                                propertyData.pro_state === ""
                                  ? true
                                  : false
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
                                    (i) => i.district === propertyData.pro_city
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
                            {step2 === true &&
                              (propertyData.pro_city === "" ||
                                propertyData.pro_state === "") && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Select State and City to add Sub District
                                </FormHelperText>
                              )}
                            {step2 === true &&
                              propertyData.pro_sub_district === "" &&
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
                              step2 === true && propertyData.pro_locality === ""
                                ? "Required"
                                : ""
                            }
                            onChange={(e) =>
                              setPropertyData({
                                ...propertyData,
                                pro_locality: e.target.value.replace(
                                  /[^0-9A-Z a-z ]/g,
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
                            className="w-full"
                            name="Complete Address"
                            FormHelperTextProps={{ sx: { color: "red" } }}
                            helperText={
                              propertyData.pro_desc.length < 2001
                                ? ""
                                : "Description should be smaller than 2000 characters"
                            }
                            inputProps={{ maxLength: 2000 }}
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
                            className="w-full"
                            name="Pin Code"
                            inputProps={{ maxLength: 6 }}
                            FormHelperTextProps={{ sx: { color: "red" } }}
                            value={propertyData.pro_pincode}
                            helperText={
                              step2 === true &&
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
                            <button
                              className="btn add-pro-back-btn"
                              onClick={handleBackStep}
                            >
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

                        <RadioBoxSelection
                          heading="Age of Property (in year)"
                          array={propertyAge}
                          field_item={propertyData.pro_age}
                          field_item_val="pro_age"
                          propertyData={propertyData}
                          setPropertyData={setPropertyData}
                          step_val={step3}
                        />

                        {propertyData.pro_type.split(",")[1] ===
                          "Commercial" && (
                          <BoxSelectOptions
                            heading="Number of Washrooms"
                            array={propertyBedrooms}
                            field_item={propertyData.pro_washrooms}
                            field_item_val="pro_washrooms"
                            propertyData={propertyData}
                            setPropertyData={setPropertyData}
                            step_val={step3}
                          />
                        )}
                        {propertyData.pro_type.split(",")[1] !== "Land" &&
                          propertyData.pro_type.split(",")[1] !==
                            "Commercial" && (
                            <div className="pro_flex pro_flex_1">
                              <BoxSelectOptions
                                heading="Number of Bedrooms"
                                array={propertyBedrooms}
                                field_item={propertyData.pro_bedroom}
                                field_item_val="pro_bedroom"
                                propertyData={propertyData}
                                setPropertyData={setPropertyData}
                                step_val={step3}
                              />

                              <BoxSelectOptions
                                heading="Number of Washrooms"
                                array={propertyBedrooms}
                                field_item={propertyData.pro_washrooms}
                                field_item_val="pro_washrooms"
                                propertyData={propertyData}
                                setPropertyData={setPropertyData}
                                step_val={step3}
                              />
                            </div>
                          )}
                        {propertyData.pro_type.split(",")[1] !== "Land" &&
                          propertyData.pro_type.split(",")[1] !==
                            "Commercial" && (
                            <div className="pro_flex pro_flex_1">
                              <BoxSelectOptions
                                heading="Number of Balconies"
                                array={propertyBedrooms}
                                field_item={propertyData.pro_balcony}
                                field_item_val="pro_balcony"
                                propertyData={propertyData}
                                setPropertyData={setPropertyData}
                                step_val={step3}
                              />

                              <BoxSelectOptions
                                heading="Car Parking"
                                array={propertyBedrooms}
                                field_item={propertyData.pro_parking}
                                field_item_val="pro_parking"
                                propertyData={propertyData}
                                setPropertyData={setPropertyData}
                                step_val={step3}
                              />
                            </div>
                          )}

                        <RadioBoxSelection
                          heading="Property Facing"
                          array={propertyFacing}
                          field_item={propertyData.pro_facing}
                          field_item_val="pro_facing"
                          propertyData={propertyData}
                          setPropertyData={setPropertyData}
                          step_val={step3}
                        />

                        {propertyData.pro_type.split(",")[1] !== "Land" && (
                          <RadioBoxSelection
                            heading="Furnishing"
                            array={propertyFurnishing}
                            field_item={propertyData.pro_furnishing}
                            field_item_val="pro_furnishing"
                            propertyData={propertyData}
                            setPropertyData={setPropertyData}
                            step_val={step3}
                          />
                        )}

                        <RadioBoxSelection
                          heading="Possession Available"
                          array={propertyPossession}
                          field_item={propertyData.pro_possession}
                          field_item_val="pro_possession"
                          propertyData={propertyData}
                          setPropertyData={setPropertyData}
                          step_val={step3}
                        />

                        {propertyData.pro_type.split(",")[1] !== "Land" && (
                          <div className="pro_flex pro_flex_1">
                            <BoxSelectOptions
                              heading="Number of Floors"
                              array={propertyBedrooms}
                              field_item={propertyData.pro_floor}
                              field_item_val="pro_floor"
                              propertyData={propertyData}
                              setPropertyData={setPropertyData}
                              step_val={step3}
                            />

                            <BoxSelectOptions
                              heading="Number of Open Sides"
                              array={propertySides}
                              field_item={propertyData.pro_open_sides}
                              field_item_val="pro_open_sides"
                              propertyData={propertyData}
                              setPropertyData={setPropertyData}
                              step_val={step3}
                            />
                          </div>
                        )}
                        <div className="pro_flex ">
                          <TextField
                            sx={{ m: 1, mr: 0, width: ["70%"], borderRight: 0 }}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            required
                            label="Area Plot Size"
                            className="w-full pro_flex_select "
                            name="Area Plot Size"
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
                            sx={{ mt: 1, width: ["30%"], borderLeft: 0 }}
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
                              <MenuItem value={"Sq. Yards"}>Sq. Yards</MenuItem>
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
                            sx={{ mt: 1, mr: 1, width: ["30%"] }}
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

                        <div className="pro_flex pro_flex_1">
                          <TextField
                            sx={{ m: 1, width: ["100%"], mb: 2 }}
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
                            sx={{ m: 1, width: ["100%"], mb: 2 }}
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

                        <div className=" w-30 m-8">
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
                        </div>

                        <div className="d-flex justify-content-between ">
                          {activeStep > 0 ? (
                            <button
                              className="btn add-pro-back-btn"
                              onClick={handleBackStep}
                            >
                              <IconChevronsLeft /> Back
                            </button>
                          ) : (
                            ""
                          )}
                          <button
                            className="btn continue-btn"
                            //disabled={step3 === true ? true : false}
                            onClick={handleStep3}
                          >
                            Next <IconChevronsRight />
                          </button>
                        </div>
                      </div>
                    ) : activeStep === 3 ? (
                      <div className="flex-col mainDiv">
                        <h2>Pricing and Others</h2>
                        <RadioBoxSelection
                          heading="Ownership"
                          array={propertyOwnership}
                          field_item={propertyData.pro_ownership_type}
                          field_item_val="pro_ownership_type"
                          propertyData={propertyData}
                          setPropertyData={setPropertyData}
                          step_val={step4}
                        />

                        <RadioBoxSelection
                          heading="Authority Approved"
                          array={propertyAuthority}
                          field_item={propertyData.pro_approval}
                          field_item_val="pro_approval"
                          propertyData={propertyData}
                          setPropertyData={setPropertyData}
                          step_val={step4}
                        />

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

                        <div className="pro_flex flex-column pb-3 ">
                          <TextField
                            sx={{ m: 1, width: ["100%"], mr: 0 }}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            label="Expected Amount"
                            className="w-full pro_flex_select"
                            name="Expected Amount"
                            inputProps={{ maxLength: 14 }}
                            //value={propertyData.pro_amt}
                            value={propertyData.pro_amt != 0 ? "₹ " + Intl.NumberFormat().format(propertyData.pro_amt) : ""}
                            FormHelperTextProps={{ sx: { color: "red" } }}
                            helperText={
                              propertyData.pro_amt > 0 ||
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
                          />
                           <div className="price-in-words">
              {propertyData.pro_amt ? "₹ " + priceFormat(propertyData.pro_amt) : "₹ Price in words"}
            </div>
                          {/* <FormControl
                            sx={{ mt: 1, mr: 1, width: ["20%"] }}
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

                        <div className="pro_flex pro_flex_1">
                          <div className="w-100 ">
                            <span className="pro_heading">
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                //checked={selected}
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
                                //checked={selected}
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
                                checkedIcon={checkedIcon}
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
                            sx={{ m: 1, mr: 2, width: ["100%"] }}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            label="Property Description"
                            className="w-full"
                            name="Property Description"
                            inputProps={{ maxLength: 2000 }}
                            value={propertyData.pro_desc}
                            helperText={
                              propertyData.pro_desc.length < 2001
                                ? ""
                                : "Description should be smaller than 2000 characters"
                            }
                            FormHelperTextProps={{ sx: { color: "red" } }}
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

                        <div className="d-flex justify-content-between ">
                          {activeStep > 0 ? (
                            <button
                              className="btn add-pro-back-btn"
                              onClick={handleBackStep}
                            >
                              <IconChevronsLeft /> Back
                            </button>
                          ) : (
                            ""
                          )}
                          <button
                            className="btn continue-btn"
                            //disabled={submitDisabled}
                            // onClick={handleClick}
                            onClick={handleStep4}
                          >
                            <IconPlus /> Add Property
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
      ) : (
        <div className="container">
          {prevData?.pro_count}
          <div className="row">
            <div className="col-md-12">
              <section className="property-view-outer ">
                <div className="pb-4">
                  <Skeleton variant="rectangular" width="100%" height={240} />
                </div>
                <div className="pb-5">
                  <Skeleton variant="rectangular" width="100%" height={240} />
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AddProperty;
