import React, { useState, useEffect, useRef, useContext } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import { IconSquareCheckFilled, IconSquare, IconX } from "@tabler/icons-react";
import { stateList } from "../addProperty/State";
import { regEx } from "../regEx";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { AuthContext } from "../../context/AuthContext";

const UserProfileForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const icon = <IconSquare fontSize="small" />;
  const checkedIcon = <IconSquareCheckFilled fontSize="small" />;
  const propertyType = [
    { type: "Apartment" },
    { type: "Independent House" },
    { type: "Builder Floor" },
    { type: "Farm HouseRaw House" },
    { type: "Retirement Community" },
    { type: "Studio Apartment" },
    { type: "Residential Land" },
    { type: " Commercial Land" },
    { type: " Industrial Land" },
    { type: " Agricultural Land" },
    { type: " Farm House Land" },
    { type: " Retail Showroom" },
    { type: "Commercial Building" },
    { type: " Office Complex" },
    { type: " Software Technology Park" },
    { type: " Warehouse" },
    { type: " Industrial Estate" },
  ];
  const propertyUserType = [
    { key: "Agent", value: "I'm an agent or broker" },
    { key: "Owner", value: "I'm an induivdual property owner" },
  ];
  const agentExp = [
    { value: "0-1" },
    { value: "1-3" },
    { value: "3-5" },
    { value: "5-10" },
    { value: "10+" },
  ];
  // const [userData, setUserData] = useState({
  //   user_type: "",
  //   user_name: "Mohit Arya",
  //   user_email: "mohitarya.calinfo@gamil.com",
  //   user_phone: "9867543467",
  //   user_exp: "1-3",
  //   user_state: "Haryana",
  //   user_city: "",
  //   user_locality: "Sector 7",
  //   user_sub_district: "",
  //   user_work_area: "",
  //   user_work_state: [],
  //   user_work_city: [],
  //   user_work_sub_district: [],
  //   user_comapnay_name: "Calinfo",
  //   user_company_website: "Calinfo.com",
  //   user_desc: "testing",
  //   user_image: "",
  // });

  const [userData, setUserData] = useState({
    user_type: "",
    user_name: "",
    user_email: "",
    user_phone: "",
    user_exp: "",
    user_state: "",
    user_city: "",
    user_locality: "",
    user_sub_district: "",
    user_work_area: "",
    user_work_state: [],
    user_work_city: [],
    user_work_sub_district: [],
    user_comapnay_name: "",
    user_company_website: "",
    user_desc: "",
    user_image: "",
    user_cnct_id: "",
  });

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

  const [emailFormatError, setEmailFormatError] = useState(true);
  const [searchState, setSearchState] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchSubDistrict, setSearchSubDistrict] = useState("");

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

  const [filterDistricts, setFilterDistricts] = useState([]);
  const [filterSubDistricts, setFilterSubDistricts] = useState([]);
  const [workArea, setWorkArea] = useState([]);
  const handleWorkAreaChange = (event, selectedOptions) => {
    setWorkArea(selectedOptions);
  };

  useEffect(() => {
    if (cityState) {
      const filteredItems = userData.user_work_state.map((number) =>
        cityState
          .filter((i) => i.state === number.name)
          .map((item) => {
            return { state: item.state, district: item.district };
          })
      );
      const combinedArray = filteredItems.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );
      setFilterDistricts(combinedArray);
    }
  }, [userData.user_work_state, cityState]);

  useEffect(() => {
    if (subDistrict) {
      const filteredItems = userData.user_work_city.map((number) =>
        subDistrict
          .filter((i) => i.district == number.district)
          .map((item) => {
            return { sub_district: item.sub_district, district: item.district };
          })
      );

      const combinedArray = filteredItems.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );

      setFilterSubDistricts(combinedArray);
    }
  }, [filterDistricts, userData.user_work_city]);

  useEffect(() => {
    if (!regEx[0].emailRegex.test(userData.user_email)) {
      setEmailFormatError(true);
    } else {
      setEmailFormatError(false);
    }
  }, [userData.user_email]);

  const navigate = useNavigate();
  const insertId = useRef();

  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // console.log(
  //   "cityState : ",
  //   subDistrict.filter((i) => i.district === userData.user_city).length,
  //   subDistrict.filter((i) => i.district === userData.user_city).length,
  //   filterDistricts.length,
  //   filterSubDistricts.length
  // );

  // console.log(
  //   subDistrict.length < 0 &&
  //     (subDistrict.filter((i) => i.district === userData.user_city).length < 0
  //       ? userData.user_sub_district !== ""
  //       : userData.user_sub_district === ""),
  //   cityState.length < 0 &&
  //     (cityState.filter((i) => i.state === userData.user_state).length < 0
  //       ? userData.user_city !== ""
  //       : userData.user_city === ""),
  //   userData.user_city,
  //   userData.user_sub_district
  // );

  const [formSubmit, setFormSubmit] = useState(false);
  const handleSubmit = () => {
    if (userData.user_type === "Agent") {
      if (
        //userData.user_type !== "" &&
        userData.user_name !== "" &&
        userData.user_email !== "" &&
        userData.user_phone !== "" &&
        userData.user_exp !== "" &&
        userData.user_state !== "" &&
        //userData.user_desc !== "" &&
        formatError === false &&
        fileSizeExceeded === false &&
        selectedTypes !== "" &&
        userData.user_work_state.length > 0 &&
        userData.user_locality !== "" &&
        userData.user_comapnay_name !== "" &&
        userData.user_company_website !== "" &&
        (cityState.length > 0 &&
        cityState.filter((i) => i.state === userData.user_state).length > 0
          ? userData.user_city !== ""
          : userData.user_city === "") &&
        (subDistrict.length > 0 &&
        subDistrict.filter((i) => i.district === userData.user_city).length > 0
          ? userData.user_sub_district !== ""
          : userData.user_sub_district === "") &&
        (filterDistricts.length > 0
          ? userData.user_work_city.length > 0
          : userData.user_work_city.length === 0) &&
        (filterSubDistricts.length > 0
          ? userData.user_work_sub_district.length > 0
          : userData.user_work_sub_district.length === 0)
      ) {
        setFormSubmit(false);
        console.log("ok.......");
        handleClick();
      } else {
        console.log(
          "not ok.......",
          userData,
          filterDistricts.length > 0
          ? userData.user_work_city !== ""
          : userData.user_work_city === "" ,

          filterSubDistricts.length > 0
          ? userData.user_work_sub_district !== ""
          : userData.user_work_sub_district === "",
          
          userData.user_work_city.length === 0 ,
          userData.user_work_sub_district.length === 0,

          userData.user_name !== "" ,
        userData.user_email !== "" ,
        userData.user_phone !== "" ,
        userData.user_exp !== "" ,
        userData.user_state !== "" ,
        //userData.user_desc !== "" ,
        formatError === false ,
        fileSizeExceeded === false ,
        selectedTypes !== "" ,
        userData.user_work_state !== "" ,
        userData.user_locality !== "" ,
        userData.user_comapnay_name !== "" ,
        userData.user_company_website !== "" 
        );
        setFormSubmit(true);
      }
    } else if (
      userData.user_type !== "" &&
      userData.user_name !== "" &&
      userData.user_email !== "" &&
      userData.user_phone !== "" &&
      //userData.user_exp !== "" &&
      userData.user_state !== "" &&
      //userData.user_city !== "" &&
      userData.user_locality !== "" &&
      (cityState.length > 0 &&
      cityState.filter((i) => i.state === userData.user_state).length > 0
        ? userData.user_city !== ""
        : userData.user_city === "") &&
      (subDistrict.length > 0 &&
      subDistrict.filter((i) => i.district === userData.user_city).length > 0
        ? userData.user_sub_district !== ""
        : userData.user_sub_district === "") &&
      //userData.user_sub_district !== "" &&
      formatError === false &&
      fileSizeExceeded === false
    ) {
      console.log("handle submit ");
      setFormSubmit(false);
      handleClick();
    } else {
      console.log("handle submit true ", userData);
      setFormSubmit(true);
    }
  };

  console.log(selectedTypes);
  const handleClick = async () => {
    //e.preventDefault();
    try {
      setLoader(true);
      userData.user_work_area = selectedTypes?.map((item) => item).join(", ");
      userData.user_image = selectedFiles !== null ? selectedFiles[0].name : "";
      userData.user_cnct_id = currentUser[0].login_id;
      const formData = new FormData();
      console.log("selectedTypes : ", userData.user_work_area);
      formData.append("image", selectedFiles !== null ? selectedFiles[0] : "");
      formData.append("user_type", userData.user_type);
      formData.append("user_name", userData.user_name);
      formData.append("user_email", userData.user_email);
      formData.append("user_phone", userData.user_phone);
      formData.append("user_exp", userData.user_exp);
      formData.append("user_state", userData.user_state);
      formData.append("user_city", userData.user_city);
      formData.append("user_locality", userData.user_locality);
      formData.append("user_sub_district", userData.user_sub_district);
      formData.append("user_work_area", userData.user_work_area);
      formData.append("user_cnct_id", userData.user_cnct_id);

      formData.append(
        "user_work_state",
        JSON.stringify(userData.user_work_state)
      );
      formData.append(
        "user_work_city",
        JSON.stringify(userData.user_work_city)
      );
      formData.append(
        "user_work_sub_district",
        JSON.stringify(userData.user_work_sub_district)
      );
      formData.append("user_comapnay_name", userData.user_comapnay_name);
      formData.append("user_company_website", userData.user_company_website);
      formData.append("user_desc", userData.user_desc);
      formData.append("user_image", userData.user_image);
      // console.log(
      //   "userData.user_work_city : ",
      //   userData.user_work_city,
      //   ...formData
      // );
      await axios
        .post(import.meta.env.VITE_BACKEND + "/api/agent/addAgent", formData)
        .then((res) => (insertId.current = res.data));
      setLoader(false);
      navigate(`/agentProfile/${insertId.current}`);
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
      {loader ? <Loader /> : ""}
      <div className="user-profile-form-wrapper ">
        <div className=" user-profile-form-heading ">Complete Your Profile</div>
        <div className="pl-2 pt-2 pb-2">
          {`\u2022 Are you searching to buy any property? Please fill out this form to
          let us know about your preferred city, locality, and your budget.`}{" "}
        </div>

        <div className="user-profile-form mt-2">
          <div className="pro_flex pro_flex_1 ml-2">
            <div className="w-100 m-1 mb-1 ">
              <span className="pro_heading">Tell us who you are ?</span>
              <div className="d-flex flex-wrap ">
                {propertyUserType.map((item) => (
                  <div
                    className={
                      userData.user_type === item.key
                        ? "pro_radio_btn_1 pro_selected"
                        : "pro_radio_btn_1"
                    }
                    onClick={(e) => {
                      setUserData({
                        ...userData,
                        user_type: item.key,
                      });
                    }}
                  >
                    {item.value}
                  </div>
                ))}
              </div>
              {formSubmit === true && userData.user_type === "" && (
                <div className="error_msg">Required</div>
              )}
            </div>
          </div>

          {/* <div className="w-100 m-2 ">
          <span className="pro_heading">Tell us who you are ?</span>
          <div className="d-flex mb-1">
            {propertyUserType.map((item) => (
              <div
                onClick={(e) => {
                  setUserData({
                    ...userData,
                    user_type: item.value,
                  });
                }}
                className={
                  userData.user_type === item.value
                    ? "pro_radio_btn_1 pro_selected mb-1"
                    : "pro_radio_btn_1 mb-1"
                }
              >
                {item.value}
              </div>
            ))}
          </div>
          {userData.user_type === "" && (
            <div className="error_msg">Required</div>
          )}
        </div> */}

          {/* <div className="pro_flex">
          <FormControl sx={{ m: 1, width: ["100%"] }} size="small">
            <InputLabel id="demo-simple-select-label">Are you an ?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userData.user_type}
              label="Are you an ?"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  user_type: e.target.value,
                })
              }
            >
              <MenuItem value={"Agent"}>Agent</MenuItem>
              <MenuItem value={"Owner"}>Owner</MenuItem>
            </Select>
            {userData.user_exp === "" && (
              <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
            )}
          </FormControl>
        </div> */}

          <div className="pro_flex">
            <TextField
              sx={{ m: 1, width: ["100%"] }}
              label="Name"
              variant="outlined"
              size="small"
              inputProps={{ maxlength: 50 }}
              className="w-100"
              value={userData.user_name}
              helperText={
                formSubmit === true && userData.user_name.length < 1
                  ? "Required"
                  : ""
              }
              FormHelperTextProps={{ sx: { color: "red" } }}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  user_name: e.target.value.replace(/[^a-zA-Z /]/g, ""),
                });
              }}
            />

            <TextField
              sx={{ m: 1, width: ["100%"] }}
              id="outlined-basic"
              variant="outlined"
              size="small"
              label="Phone Number"
              className="w-full"
              name="Phone Number"
              inputProps={{
                maxLength: 10,
              }}
              FormHelperTextProps={{ sx: { color: "red" } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91 </InputAdornment>
                ),
              }}
              helperText={
                formSubmit === true && userData.user_phone.length < 10
                  ? "Please enter a valid Phone Number"
                  : ""
              }
              value={userData.user_phone}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  user_phone: e.target.value.replace(/[^0-9/]/g, ""),
                })
              }
              required
            />
          </div>
          <div className="pro_flex">
            <TextField
              sx={{ m: 1, width: ["100%"] }}
              id="outlined-basic"
              variant="outlined"
              size="small"
              label="Email"
              className="w-full"
              name="Email"
              FormHelperTextProps={{ sx: { color: "red" } }}
              inputProps={{ maxLength: 60 }}
              helperText={
                formSubmit === true && emailFormatError !== false
                  ? "Please Enter Vaild email address"
                  : ""
              }
              value={userData.user_email}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  user_email: e.target.value.replace(/[^a-zA-Z.@0-9/]/g, ""),
                })
              }
              required
            />
          </div>

          <div className="pro_flex">
            <FormControl sx={{ m: 1, width: ["100%"] }} size="small">
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userData.user_state}
                label="State"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    user_state: e.target.value,
                    user_city: "",
                    user_sub_district: "",
                  })
                }
              >
                {stateList.map((item, index) => (
                  <MenuItem value={item.name} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {formSubmit === true && userData.user_state === "" && (
                <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ m: 1, width: ["100%"] }} size="small">
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userData.user_city}
                label="City"
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    user_city: e.target.value,
                    user_sub_district: "",
                  });
                }}
              >
                {cityState
                  ? cityState
                      .filter((i) => i.state === userData.user_state)
                      .map((item, index) => (
                        <MenuItem value={item.district} key={index}>
                          {item.district}
                        </MenuItem>
                      ))
                  : "No City Exists"}
              </Select>
              {formSubmit === true &&
                userData.user_city === "" &&
                userData.user_state === "" && (
                  <FormHelperText sx={{ color: "red" }}>
                    Select State to add City
                  </FormHelperText>
                )}
              {formSubmit === true &&
                userData.user_city === "" &&
                userData.user_state !== "" && (
                  <FormHelperText sx={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
            </FormControl>
          </div>

          <div className="pro_flex">
            <FormControl sx={{ m: 1, width: ["100%"] }} size="small">
              <InputLabel id="demo-simple-select-label">
                Sub District
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userData.user_sub_district}
                label="Sub District"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    user_sub_district: e.target.value,
                  })
                }
              >
                {subDistrict
                  ? subDistrict
                      .filter((i) => i.district === userData.user_city)
                      .map((item, index) => (
                        <MenuItem value={item.sub_district} key={index}>
                          {item.sub_district}
                        </MenuItem>
                      ))
                  : "No District Exists"}
              </Select>
              {formSubmit === true &&
                (userData.user_city === "" || userData.user_state === "") && (
                  <FormHelperText sx={{ color: "red" }}>
                    Select State and City to add Sub District
                  </FormHelperText>
                )}
              {formSubmit === true &&
                userData.user_sub_district === "" &&
                userData.user_city !== "" &&
                userData.user_state !== "" && (
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
              value={userData.user_locality}
              FormHelperTextProps={{ sx: { color: "red" } }}
              helperText={
                formSubmit === true && userData.user_locality === ""
                  ? "Required"
                  : ""
              }
              onChange={(e) =>
                setUserData({
                  ...userData,
                  user_locality: e.target.value.replace(
                    /[^0-9A-Z a-z , . /]/g,
                    ""
                  ),
                })
              }
              required
            />
          </div>

          {userData.user_type === "Agent" && (
            <div>
              <div className="pro_flex">
                <TextField
                  sx={{ m: 1, width: ["100%"] }}
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  label="Company Name"
                  className="w-full"
                  name="Company Name"
                  inputProps={{ maxLength: 200 }}
                  value={userData.user_comapnay_name}
                  // helperText={
                  //   formSubmit === true && userData.user_comapnay_name.length < 2000
                  //     ? ""
                  //     : "Description should be smaller than 2000 characters"
                  // }
                  // FormHelperTextProps={{ sx: { color: "red" } }}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      user_comapnay_name: e.target.value.replace(
                        /[^0-9A-Z a-z , . /]/g,
                        ""
                      ),
                    })
                  }
                />

                <TextField
                  sx={{ m: 1, width: ["100%"] }}
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  label="Website"
                  className="w-full"
                  name="Website"
                  inputProps={{ maxLength: 200 }}
                  value={userData.user_company_website}
                  // helperText={
                  //   formSubmit === true && userData.user_company_website.length < 2000
                  //     ? ""
                  //     : "Description should be smaller than 2000 characters"
                  // }
                  // FormHelperTextProps={{ sx: { color: "red" } }}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      user_company_website: e.target.value.replace(
                        /[^0-9A-Z a-z , . /]/g,
                        ""
                      ),
                    })
                  }
                />
              </div>

              {/* <div className="pro_flex">
              <FormControl sx={{ m: 1, width: ["100%"] }} size="small">
                <InputLabel id="demo-simple-select-label">
                  Experience (in year)
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userData.user_exp}
                  label="Experience  (in year)"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      user_exp: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"0-1"}>0-1</MenuItem>
                  <MenuItem value={"1-3"}>1-3</MenuItem>
                  <MenuItem value={"3-5"}>3-5</MenuItem>
                  <MenuItem value={"5-10"}>5-10</MenuItem>
                  <MenuItem value={"10+"}>10+</MenuItem>
                </Select>
                {userData.user_exp === "" && (
                  <FormHelperText sx={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
              </FormControl>
              <Autocomplete
                sx={{ m: 1, width: ["100%"] }}
                size="small"
                multiple
                limitTags={8}
                id="checkboxes-tags-demo"
                options={propertyType}
                disableCloseOnSelect
                getOptionLabel={(option) => option.type}
                // onChange={(event, selectedOptions) => {
                //   //console.log("Selected Options:", selectedOptions);
                //   //   setUserData({
                //   //   ...userData,
                //   //   user_work_area: selectedOptions,
                //   // });
                //   () => setWorkArea(selectedOptions);
                //   console.log("woek area 1 : " , workArea);
                // }}
                onChange={handleWorkAreaChange}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected.type}
                    />
                    {option.type}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Deals in Property types"
                    placeholder="Deals in Property types"
                  />
                )}
              />
            </div> */}
              <div className="pro_flex pro_flex_1 ml-2">
                <div className="w-100 m-1 mb-3">
                  <span className="pro_heading">Deals in Property types</span>
                  <div className="d-flex flex-wrap ">
                    {propertyType.map((item) => (
                      <div
                        // className={
                        //   userData.user_work_area === item.type
                        //     ? "pro_radio_btn_1 pro_selected"
                        //     : "pro_radio_btn_1"
                        // }
                        // onClick={() =>
                        //   setUserData({
                        //     ...userData,
                        //     user_work_area: item.type,
                        //   })
                        // }
                        className={`pro_radio_btn_1 ${
                          selectedTypes.includes(item.type)
                            ? " pro_selected"
                            : ""
                        }`}
                        onClick={() => handleTypeToggle(item.type)}
                      >
                        {item.type}
                      </div>
                    ))}
                  </div>
                  {formSubmit === true && selectedTypes.length === 0 && (
                    <div className="error_msg">Required</div>
                  )}
                </div>
              </div>

              <div className="pro_flex pro_flex_1 ml-2">
                <div className="w-100 m-1 mb-3">
                  <span className="pro_heading">Experience (In Years)</span>
                  <div className="d-flex flex-wrap ">
                    {agentExp.map((item) => (
                      <div
                        className={
                          userData.user_exp === item.value
                            ? "pro_radio_btn_1 pro_selected"
                            : "pro_radio_btn_1"
                        }
                        onClick={() =>
                          setUserData({
                            ...userData,
                            user_exp: item.value,
                          })
                        }
                        //onClick={handleWorkAreaChange}
                      >
                        {item.value}
                      </div>
                    ))}
                  </div>
                  {formSubmit === true && userData.user_exp === "" && (
                    <div className="error_msg">Required</div>
                  )}
                </div>
              </div>
              <div className="pro_flex">
                <Autocomplete
                  sx={{ m: 1, width: ["100%"] }}
                  size="small"
                  multiple
                  limitTags={2}
                  id="checkboxes-tags-demo3"
                  options={stateList}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  filterOptions={(options, { inputValue }) => {
                    if (!searchState) {
                      return options;
                    }
                    return options.filter((option) =>
                      option.name
                        .toLowerCase()
                        .startsWith(searchState.toString().toLowerCase())
                    );
                  }}
                  onChange={(event, selectedValues) => {
                    //if (selectedValues.length < 3) {
                    setUserData({
                      ...userData,
                      user_work_state: selectedValues,
                      user_work_city: [],
                      user_work_sub_district: [],
                    });
                    
                    // } else {
                    //   return;
                    // }
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={
                        formSubmit === true &&
                        userData.user_work_state.length === 0 &&
                        "Required"
                      }
                      FormHelperTextProps={{ sx: { color: "red" } }}
                      onChange={(e) => setSearchState(e.target.value)}
                      label="Deals in States"
                      placeholder="Deals in States"
                    />
                  )}
                />

                {cityState && (
                  <Autocomplete
                    sx={{ m: 1, width: ["100%"] }}
                    size="small"
                    multiple
                    limitTags={2}
                    id="checkboxes-tags-demo"
                    options={filterDistricts}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.district}
                    filterOptions={(options, { inputValue }) => {
                      if (!searchCity) {
                        return options;
                      }

                      return options.filter(
                        (item) =>
                          item.district &&
                          item.district
                            .toLowerCase()
                            .startsWith(searchCity.toString().toLowerCase())
                      );
                    }}
                    onChange={(event, selectedValues) => {
                      setUserData({
                        ...userData,
                        user_work_city: selectedValues,
                        user_work_sub_district: [],
                      });
                    }}
                    // onChange={(event, selectedValues) => {
                    //   setUserData({
                    //     ...userData,
                    //     user_work_city: [
                    //       ...userData.user_work_city,
                    //       {
                    //         district:
                    //           selectedValues[selectedValues.length - 1].district,
                    //         state: selectedValues[selectedValues.length - 1].state,
                    //       },
                    //     ],
                    //   });
                    // }}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.district}
                      </li>
                    )}
                    //disabled={filterDistricts.length < 0 ? true : false}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        helperText={
                          filterDistricts.length > 0
                            ? formSubmit === true &&
                              userData.user_work_state.length === 0 &&
                              userData.user_work_city.length === 0
                              ? "Select state to add city"
                              : formSubmit === true &&
                                userData.user_work_city.length === 0
                              ? "Required"
                              : ""
                            : ""
                        }
                        FormHelperTextProps={{ sx: { color: "red" } }}
                        onChange={(e) => setSearchCity(e.target.value)}
                        label="Deals in Cities"
                        placeholder="Deals in Cities"
                      />
                    )}
                  />
                )}
              </div>

              <div className="pro_flex">
                <Autocomplete
                  sx={{ m: 1, width: ["100%"] }}
                  size="small"
                  multiple
                  limitTags={8}
                  id="checkboxes-tags-demo"
                  options={filterSubDistricts}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.sub_district}
                  filterOptions={(options, { inputValue }) => {
                    if (!searchSubDistrict) {
                      return options;
                    }

                    return options.filter(
                      (item) =>
                        item.sub_district &&
                        item.sub_district
                          .toLowerCase()
                          .startsWith(
                            searchSubDistrict.toString().toLowerCase()
                          )
                    );
                  }}
                  onChange={(event, selectedValues) => {
                    setUserData({
                      ...userData,
                      user_work_sub_district: selectedValues,
                    });
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.sub_district}
                    </li>
                  )}
                  //disabled={filterSubDistricts.length < 0 ? false : true}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={
                        filterDistricts.length > 0
                          ? formSubmit === true &&
                            userData.user_work_state.length === 0 &&
                            userData.user_work_city.length === 0
                            ? "Select state and city to add sub district"
                            : formSubmit === true &&
                              userData.user_work_city.length === 0
                            ? "Select city to add sub district"
                            : formSubmit === true &&
                              userData.user_work_sub_district.length === 0
                            ? "Required"
                            : ""
                          : ""
                      }
                      //helperText= {formSubmit === true && userData.user_work_sub_district.length === 0 && "Required"}
                      FormHelperTextProps={{ sx: { color: "red" } }}
                      onChange={(e) => setSearchSubDistrict(e.target.value)}
                      label="Deals in Localities"
                      placeholder="Deals in Localities"
                    />
                  )}
                />
              </div>
              {console.log(
                "filterSubDistricts.length : ",
                filterSubDistricts.length
              )}
              <div className="pro_flex">
                <TextField
                  multiline
                  sx={{ m: 1, width: ["100%"] }}
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  label="Description"
                  className="w-full"
                  name="Description"
                  inputProps={{ maxLength: 2000 }}
                  value={userData.user_desc}
                  helperText={
                    userData.user_desc.length < 2000
                      ? ""
                      : "Description should be smaller than 2000 characters"
                  }
                  FormHelperTextProps={{ sx: { color: "red" } }}
                  InputProps={{
                    rows: 5,
                  }}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      user_desc: e.target.value.replace(
                        /[^0-9A-Z a-z , . /]/g,
                        ""
                      ),
                    })
                  }
                />
              </div>
            </div>
          )}
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
          <div className="pro_flex justify-content-end mr-2">
            <button
              onClick={handleSubmit}
              type="button"
              className="btn continue-btn"
              // class={
              //   submitDisabled
              //     ? "cursor-not-allowed-btn btn btn-secondary px-5 py-2 m-2"
              //     : "btn btn-primary px-5 py-2 m-2 "
              // }
              //disabled={submitDisabled}
            >
              Complete Your Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
