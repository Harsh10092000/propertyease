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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
const AddProperty = () => {
  const { currentUser } = useContext(AuthContext);
  const regEx = [
    {
      emailRegex:
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    }, //0
    { numberValidation: /^\.|[^0-9.]|\.\d*\.|^(\d*\.\d{0,2}).*$/g }, //1
  ];
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
    pro_user_id: currentUser[0].login_id,
    pro_area_size_unit: "Yards",
    pro_facing_road_unit: "Feet",

    pro_amt_unit: "Lakhs",
    pro_pincode: "",
  });

  const locality = [
    { location_name: "Abhi Palace" },
    { location_name: "Akash Nagar" },
    { location_name: "Akash Nursary Colony" },
    { location_name: "Alanpur" },
    { location_name: "Amar Colony" },
    { location_name: "Amargarh Majhara" },
    { location_name: "Bahri" },
    { location_name: "Balahi" },
    { location_name: "Bhiwani Khera" },
    { location_name: "Bir Pipli" },
    { location_name: "Bishangarh" },
    { location_name: "Chanairthal" },
    { location_name: "Chander Bhanpur 372" },
    { location_name: "College Colony" },
    { location_name: "Dabkheri" },
    { location_name: "Dara Kalan Thanesar Part 379" },
    { location_name: "Dara Khurd Thanesar 391" },
    { location_name: "Darra Khera Thanesar Part" },
    { location_name: "Dayalpur" },
    { location_name: "Dedar Nagar" },
    { location_name: "Dera Rampura" },
    { location_name: "Devi Daspur Village" },
    { location_name: "Dhakka Basti" },
    { location_name: "Dukh Bhanjan Colony" },
    { location_name: "Ekta Vihar" },
    { location_name: "Gandhi Nagar" },
    { location_name: "Ganesh Colony" },
    { location_name: "Gobindgarh" },
    { location_name: "Gurudev Nagar" },
    { location_name: "Hirmi Canal Colony" },
    { location_name: "Indira Colony" },
    { location_name: "Jogna Khera" },
    { location_name: "Jyoti Nagar" },
    { location_name: "Jyotisar" },
    { location_name: "Kalyan Nagar" },
    { location_name: "Kanthal Kalan" },
    { location_name: "Kanthal Khurd" },
    { location_name: "Karan Tila Colony" },
    { location_name: "Karar Majra" },
    { location_name: "Kerti Nagar" },
    { location_name: "Kheri Brahamana" },
    { location_name: "Kheri Brahamana Kalash Colony" },
    { location_name: "Kheri Brahmanan" },
    { location_name: "Kheri Markanda Village" },
    { location_name: "Kheri Ram Nagar" },
    { location_name: "Krishna Nagar" },
    { location_name: "Krishna Nagar Gamri" },
    { location_name: "Kuber Colony" },
    { location_name: "Kurukshetra University" },
    { location_name: "Lakshman Colony" },
    { location_name: "Gurukul" },
    { location_name: "Mirzapur" },
    { location_name: "Mirzapur New Colony" },
    { location_name: "Model Town" },
    { location_name: "Mohan Nagar" },
    { location_name: "Narkatari" },
    { location_name: "New Chanarthal Colony" },
    { location_name: "New Colony" },
    { location_name: "Palwal Village" },
    { location_name: "Paras Enclave" },
    { location_name: "Parshu Ram Colony" },
    { location_name: "Partap Garh" },
    { location_name: "Patiala Bank Colony" },
    { location_name: "Pipli" },
    { location_name: "Police Line" },
    { location_name: "Power House" },
    { location_name: "Professor Colony" },
    { location_name: "Ram Nagar" },
    { location_name: "Raogarh 427" },
    { location_name: "Ratgal" },
    { location_name: "Saini Colony" },
    { location_name: "Saraswati Colony" },
    { location_name: "Sarswati Nagar" },
    { location_name: "Sector 10" },
    { location_name: "Sector 13" },
    { location_name: "Sector 14" },
    { location_name: "Sector 17" },
    { location_name: "Sector 2" },
    { location_name: "Sector 29" },
    { location_name: "Sector 30" },
    { location_name: "Sector 32" },
    { location_name: "Sector 4" },
    { location_name: "Sector 5" },
    { location_name: "Sector 7" },
    { location_name: "Sector 7 BSNL Colony" },
    { location_name: "Sector 7 Pustal Colony" },
    { location_name: "Sector 8" },
    { location_name: "Sector 9" },
    { location_name: "Shadipur Ladwa 367" },
    { location_name: "Shanti Nagar" },
    { location_name: "Shastri Nagar" },
    { location_name: "Sheela Colony" },
    { location_name: "Shyam Colony" },
    { location_name: "Sirsama" },
    { location_name: "Subhash Mandi" },
    { location_name: "Sunderpur" },
    { location_name: "Suraj Colony" },
    { location_name: "Umri" },
    { location_name: "Vishnu Colony" },
  ];

  const [formatError, setFormatError] = useState(false);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 2000000;

  const [selectedFiles, setSelectedFiles] = useState(null);
  const formData = new FormData();
  const handleImage = (data) => {
    console.log(data);
    setSelectedFiles(data.target.files);

    const pattern = /image-*/;
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].type.match(pattern)) {
        setFormatError(true);
        if (selectedFiles[i].size > maxFileSize) {
          setFileSizeExceeded(true);
        } else {
          setFileSizeExceeded(false);
        }
      } else {
        setFormatError(false);
        formData.append(`files`, data.target.files[i]);
      }
    }

    for (let i = 0; i < data.target.files.length; i++) {
      console.log(`file ${i + 1} uploading`);
      formData.append(`files`, data.target.files[i]);
    }
  };

  let files = "";

  if (selectedFiles !== null && selectedFiles !== undefined) {
    console.log("selectedFiles : ", selectedFiles);
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
      propertyData.pro_plot_no !== "" &&
      propertyData.pro_street !== "" &&
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
    propertyData.pro_plot_no,
    propertyData.pro_street,
    propertyData.pro_pincode,
  ]);

  const [step3Disabled, setStep3Disabled] = useState(true);
  useEffect(() => {
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
      fileSizeExceeded === false
    ) {
      setStep3Disabled(false);
    } else {
      setStep3Disabled(true);
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
  ]);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      propertyData.pro_ownership_type !== "" &&
      propertyData.pro_approval !== "" &&
      propertyData.pro_amt > 0
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    propertyData.pro_ownership_type,
    propertyData.pro_approval,
    propertyData.pro_amt,
  ]);
  const [otherLocality, setOtherLocality] = useState("");
  const [addLocality, setAddLocality] = useState(false);
  useEffect(() => {
    if (propertyData.pro_locality === "others") {
      setAddLocality(true);
    } else {
      setAddLocality(false);
      setOtherLocality("");
    }
  }, [propertyData.pro_locality]);

  const handleClick = () => {
    axios
      .post(import.meta.env.VITE_BACKEND + "/api/pro/addProperty", propertyData)
      .then((res) => addImages(res.data));
  };
  const navigate = useNavigate();
  const addImages = async (id) => {
    for (let i = 0; i < selectedFiles.length; i++) {
      console.log(`file ${i + 1} uploading`);
      formData.append(`files`, selectedFiles[i]);
    }
    formData.append("proId", id);
    formData.append("userId", currentUser[0].login_id);
    await axios.post(
      import.meta.env.VITE_BACKEND + "/api/pro/addPropertyimages",
      formData
    );
    navigate(`/property/${id}`);
  };

  return (
    <div>
      <Navbar />
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
              Do fill this form with attention so that your Property details are
              more accurate than the competitors. We know the form is a little
              bit lengthy, but it is for your own good.
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
                        Start Posting your Property,It's Free
                      </h2>
                      <h2 style={{ textAlign: "center" }}>Basic Details</h2>
                      <div className="whole_radio">
                        <div className="flex-col-sm">
                          <h3>Sale</h3>

                          <div className="div_radio ">
                            <label htmlFor="rent">
                              <input
                                type="radio"
                                name="adTpye"
                                id="rent"
                                defaultChecked={
                                  propertyData.pro_ad_type === "RENT"
                                    ? true
                                    : false
                                }
                                onChange={() =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_ad_type: "RENT",
                                  })
                                }
                              />
                              Rent
                            </label>
                            <label htmlFor="new">
                              <input
                                type="radio"
                                name="adTpye"
                                id="new"
                                defaultChecked={
                                  propertyData.pro_ad_type === "new"
                                    ? true
                                    : false
                                }
                                onChange={() =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_ad_type: "new",
                                  })
                                }
                              />
                              New
                            </label>
                            <label htmlFor="resale">
                              <input
                                type="radio"
                                name="adTpye"
                                id="resale"
                                defaultChecked={
                                  propertyData.pro_ad_type === "resale"
                                    ? true
                                    : false
                                }
                                onChange={() =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_ad_type: "resale",
                                  })
                                }
                              />
                              Resale
                            </label>
                          </div>
                        </div>

                        <div className="flex-col-sm">
                          <h3>Are you an ?</h3>
                          <div className="div_radio">
                            <label htmlFor="agent">
                              <input
                                type="radio"
                                name="userTpye"
                                id="agent"
                                defaultChecked={
                                  propertyData.pro_user_type === "agent"
                                    ? true
                                    : false
                                }
                                onChange={() =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_user_type: "agent",
                                  })
                                }
                              />
                              Agent
                            </label>
                            <label htmlFor="owner">
                              <input
                                type="radio"
                                name="userTpye"
                                id="owner"
                                defaultChecked={
                                  propertyData.pro_user_type === "owner"
                                    ? true
                                    : false
                                }
                                onChange={() =>
                                  setPropertyData({
                                    ...propertyData,
                                    pro_user_type: "owner",
                                  })
                                }
                              />
                              Owner
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="btn-con ">
                        {activeStep > 0 ? (
                          <button className="btn" onClick={handleBackStep}>
                            Back
                          </button>
                        ) : (
                          ""
                        )}
                        <button
                          className="btn btn-primary"
                          disabled={step1Disabled}
                          onClick={handleNextStep}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  ) : activeStep === 1 ? (
                    <div className="flex-col-sm mainDiv">
                      <h2>Locations Details </h2>

                      <div className="flex-row-sm">
                        <FormControl
                          sx={{ m: 1, width: 300 }}
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
                              <option value={"Farm  House,Residential"}>
                                Farm House
                              </option>
                              <option value={"Row House,Residential"}>
                                Row House
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
                            <optgroup label="land">
                              <option value={"Residential Land,land"}>
                                Residential Land
                              </option>
                              <option value={"Commercial Land,land"}>
                                Commercial Land
                              </option>
                              <option value={"Industrial Land,land"}>
                                Industrial Land
                              </option>
                              <option value={"Agricultural Land,land"}>
                                Agricultural Land
                              </option>
                              <option value={"Farm House Land,land"}>
                                Farm House Land
                              </option>
                            </optgroup>
                            <optgroup label="Commercial">
                              <option value={"Retail Showroom,Commercial"}>
                                Retail Showroom
                              </option>
                              <option value={"Commercial Building,Commercial"}>
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
                            </optgroup>
                          </Select>
                          {propertyData.pro_type === "" && (
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>

                        <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                            <MenuItem value={"Kurukshetra"}>
                              Kurukshetra
                            </MenuItem>
                          </Select>
                          {propertyData.pro_city === "" && (
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>
                      </div>

                      <div className="flex-row-sm">
                        <FormControl sx={{ m: 1, width: 300 }} size="small">
                          <InputLabel id="demo-simple-select-label">
                            Locality
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={propertyData.pro_locality}
                            label="Locality"
                            onChange={(e) =>
                              setPropertyData({
                                ...propertyData,
                                pro_locality: e.target.value,
                              })
                            }
                          >
                            {locality.map((item, index) => (
                              <MenuItem value={item.location_name} key={index}>
                                {item.location_name}
                              </MenuItem>
                            ))}
                            <MenuItem value={"others"}>Others</MenuItem>
                          </Select>
                          {propertyData.pro_locality === "" && (
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>

                        <TextField
                          sx={{ m: 1, width: 300 }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          label="Plot Number"
                          className="w-full"
                          name="Plot Number"
                          inputProps={{ maxLength: 10 }}
                          value={propertyData.pro_plot_no}
                          helperText={
                            propertyData.pro_plot_no === "" ? "Required" : ""
                          }
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              pro_plot_no: e.target.value.replace(
                                /[^0-9/]/g,
                                ""
                              ),
                            })
                          }
                          required
                        />
                      </div>

                      {addLocality && (
                        <div>
                          <TextField
                            sx={{ m: 1, width: 615 }}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            label="Enter Locality"
                            className="w-full"
                            name="Enter Locality"
                            inputProps={{ maxLength: 50 }}
                            value={otherLocality}
                            // onChange={(e) =>
                            //   setPropertyData({
                            //     ...propertyData,
                            //     pro_locality: e.target.value.replace(
                            //       /[^A-Z a-z]/g,
                            //       ""
                            //     ),
                            //   })
                            // }
                            helperText={
                              propertyData.pro_locality === "others" &&
                              otherLocality === ""
                                ? "Required"
                                : ""
                            }
                            onChange={(e) =>
                              setOtherLocality(
                                e.target.value.replace(/[^A-Z a-z]/g, "")
                              )
                            }
                            required
                          />
                        </div>
                      )}

                      <div>
                        <TextField
                          sx={{ m: 1, width: 615 }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          label="Street Address"
                          className="w-full"
                          name="Street Address"
                          inputProps={{ maxLength: 100 }}
                          value={propertyData.pro_street}
                          helperText={
                            propertyData.pro_street === "" ? "Required" : ""
                          }
                          onChange={(e) =>
                            setPropertyData({
                              ...propertyData,
                              pro_street: e.target.value.replace(
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
                          sx={{ m: 1, width: 615 }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          label="Pin Code"
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
                      <div className="btn-con ">
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

                      <div className="flex-row-sm">
                        <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>

                        <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>
                      </div>

                      <div className="flex-row-sm">
                        <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                            <MenuItem value={"3"}>3</MenuItem>
                            <MenuItem value={"4"}>4</MenuItem>

                            <MenuItem value={"5+"}>5+</MenuItem>
                          </Select>
                          {propertyData.pro_bedroom === "" && (
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>

                        <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                            <MenuItem value={"3"}>3</MenuItem>
                            <MenuItem value={"4"}>4</MenuItem>

                            <MenuItem value={"5+"}>5+</MenuItem>
                          </Select>
                          {propertyData.pro_washrooms === "" && (
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>
                      </div>

                      <div className="flex-row-sm">
                        <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                            <MenuItem value={"1"}>0</MenuItem>
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                            <MenuItem value={"3"}>3</MenuItem>
                            <MenuItem value={"4"}>4</MenuItem>

                            <MenuItem value={"5+"}>5+</MenuItem>
                          </Select>
                          {propertyData.pro_balcony === "" && (
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>

                        <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>
                      </div>

                      <div className="flex-row-sm">
                        <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                            <MenuItem value={"North-East"}>North-East</MenuItem>
                            <MenuItem value={"East"}>East</MenuItem>
                            <MenuItem value={"South-East"}>South-East</MenuItem>
                            <MenuItem value={"South"}>South</MenuItem>
                            <MenuItem value={"South-West"}>South-West</MenuItem>
                            <MenuItem value={"West"}>West</MenuItem>
                            <MenuItem value={"North-West"}>North-West</MenuItem>
                          </Select>
                          {propertyData.pro_facing === "" && (
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>

                        <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                            <MenuItem value={"Immediate"}>Immediate</MenuItem>
                            <MenuItem value={"0-3 Month"}>0-3 Month</MenuItem>
                            <MenuItem value={"3-6 Month"}>3-6 Month</MenuItem>
                            <MenuItem value={"After 6 Months"}>
                              After 6 Months
                            </MenuItem>
                          </Select>
                          {propertyData.pro_possession === "" && (
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>
                      </div>

                      <div className="flex-row-sm">
                        <TextField
                          sx={{ m: 1, mr: 0, width: 220 }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          label="Area Plot Size"
                          className="w-full"
                          name="Area Plot Size"
                          inputProps={{ maxLength: 100 }}
                          value={propertyData.pro_area_size}
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
                        <FormControl sx={{ mt: 1, width: 80 }} size="small">
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
                            <MenuItem value={"Yards"}>Yards</MenuItem>
                            <MenuItem value={"Acres"}>Acres</MenuItem>
                            <MenuItem value={"Marla"}>Marla</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField
                          sx={{ m: 1, width: 220, ml: 2, mr: 0 }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          label="Facing road Width"
                          className="w-full"
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
                          required
                        />
                        <FormControl sx={{ mt: 1, width: 80 }} size="small">
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

                      <div className="flex-row-sm">
                        <TextField
                          sx={{ m: 1, width: 300 }}
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
                          sx={{ m: 1, width: 300 }}
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

                      <div className="flex-row-sm">
                        <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>

                        <FormControl sx={{ m: 1, width: 300 }} size="small">
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
                            <FormHelperText>Required</FormHelperText>
                          )}
                        </FormControl>
                      </div>

                      <div className="">
                        <label for="images" htmlFor="file-1">
                          <input
                            multiple
                            type="file"
                            id="images"
                            accept="image/x-png,image/gif,image/jpeg"
                            required
                            onChange={(event) => {
                              handleImage(event);
                            }}
                          />
                        </label>

                        <div>
                          {console.log(selectedFiles, files)}
                          {selectedFiles != null && selectedFiles != undefined
                            ? files.map((item) => (
                                <div>
                                  <div>{item.name}</div>
                                  <div></div>
                                </div>
                              ))
                            : "no file selected"}
                        </div>

                        <div>
                          {formatError ? "Invalid Format" : ""}
                          {fileSizeExceeded
                            ? "File size exceeded the limit of" +
                              maxFileSize / 1000000 +
                              "MB"
                            : ""}
                        </div>
                      </div>

                      <div className="btn-con ">
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
                      <div>
                        <h3>Ownership</h3>
                        <div className="div_radio">
                          <label htmlFor="freehold">
                            <input
                              type="radio"
                              name="ownnership"
                              id="freehold"
                              defaultChecked={
                                propertyData.pro_ownership_type === "Freehold"
                                  ? true
                                  : false
                              }
                              onChange={() =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_ownership_type: "Freehold",
                                })
                              }
                            />
                            Freehold
                          </label>
                          <label htmlFor="Power of Attorney">
                            <input
                              type="radio"
                              name="ownnership"
                              id="Power of Attorney"
                              defaultChecked={
                                propertyData.pro_ownership_type ===
                                "Power of Attorney"
                                  ? true
                                  : false
                              }
                              onChange={() =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_ownership_type: "Power of Attorney",
                                })
                              }
                            />
                            Power of Attorney
                          </label>
                        </div>
                      </div>

                      <div>
                        <h3>Authority Approved</h3>
                        <div className="div_radio">
                          <label htmlFor="HSVP">
                            <input
                              type="radio"
                              name="approval"
                              id="HSVP"
                              defaultChecked={
                                propertyData.pro_approval === "HSVP"
                                  ? true
                                  : false
                              }
                              onChange={() =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_approval: "HSVP",
                                })
                              }
                            />
                            HSVP
                          </label>
                          <label htmlFor="MC">
                            <input
                              type="radio"
                              name="approval"
                              id="MC"
                              defaultChecked={
                                propertyData.pro_approval === "MC"
                                  ? true
                                  : false
                              }
                              onChange={() =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_approval: "MC",
                                })
                              }
                            />
                            MC
                          </label>

                          <label htmlFor="DTP">
                            <input
                              type="radio"
                              name="approval"
                              id="DTP"
                              defaultChecked={
                                propertyData.pro_approval === "DTP"
                                  ? true
                                  : false
                              }
                              onChange={() =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_approval: "DTP",
                                })
                              }
                            />
                            DTP
                          </label>

                          <label htmlFor="Other">
                            <input
                              type="radio"
                              name="approval"
                              id="Other"
                              defaultChecked={
                                propertyData.pro_approval === "Other"
                                  ? true
                                  : false
                              }
                              onChange={() =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_approval: "Other",
                                })
                              }
                            />
                            Other
                          </label>
                        </div>
                      </div>

                      <div>
                        <h3>Already on Rented</h3>
                        <div className="div_radio">
                          <label htmlFor="Yes">
                            <input
                              type="radio"
                              name="Rented"
                              id="Yes"
                              defaultChecked={
                                propertyData.pro_rental_status === "Yes"
                                  ? true
                                  : false
                              }
                              onChange={() =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_rental_status: "Yes",
                                })
                              }
                            />
                            Yes
                          </label>
                          <label htmlFor="No">
                            <input
                              type="radio"
                              name="Rented"
                              id="No"
                              defaultChecked={
                                propertyData.pro_rental_status === "No"
                                  ? true
                                  : false
                              }
                              onChange={() =>
                                setPropertyData({
                                  ...propertyData,
                                  pro_rental_status: "No",
                                })
                              }
                            />
                            No
                          </label>
                        </div>
                      </div>

                      <div className="flex-row-sm">
                        <TextField
                          sx={{ m: 1, width: 220, mr: 0 }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          label="Expected Amount"
                          className="w-full"
                          name="Expected Amount"
                          inputProps={{ maxLength: 10 }}
                          value={propertyData.pro_amt}
                          helperText={
                            propertyData.pro_amt < 1 ? "Enter Valid Amount" : ""
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
                          required
                        />
                        <FormControl sx={{ mt: 1, width: 80 }} size="small">
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
                            <MenuItem value={"Hundred"}>Hundred</MenuItem>
                          </Select>
                        </FormControl>
                      </div>

                      <div>
                        <TextField
                          multiline
                          sx={{ m: 1, width: 300 }}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          label="Property Description"
                          className="w-full"
                          name="Property Description"
                          inputProps={{ maxLength: 100 }}
                          value={propertyData.pro_desc}
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
                          required
                        />
                      </div>

                      <div className="btn-con ">
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
                          Submit
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
    </div>
  );
};

export default AddProperty;
