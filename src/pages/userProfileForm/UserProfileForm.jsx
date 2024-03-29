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
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import { IconSquareCheckFilled, IconSquare, IconX } from "@tabler/icons-react";
import { stateList } from "../addProperty/State";
import { regEx } from "../regEx";

const UserProfileForm = () => {
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
  const propertyUserType = [{ value: "Agent" }, { value: "Owner" }];
  const agentExp = [
    { value: "0-1" },
    { value: "1-3" },
    { value: "3-5" },
    { value: "5-10" },
    { value: "10+" },
  ];
  const [userData, setUserData] = useState({
    user_type: "",
    user_name: "Mohit Arya",
    user_email: "mohitarya.calinfo@gamil.com",
    user_phone: "9867543467",
    user_exp: "1-3",
    user_state: "Haryana",
    user_city: "",
    user_locality: "Sector 7",
    user_sub_district: "",
    user_work_area: "",
    user_work_state: [],
    user_work_city: [],
    user_work_sub_district: [],
    user_comapnay_name: "Calinfo",
    user_company_website: "Calinfo.com",
    user_desc: "testing",
    user_image: "",
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

  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
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

  const handleClick1 = async () => {
    userData.user_work_area = workArea?.map((item) => item.type).join(", ");
    userData.user_image = selectedFiles[0]?.name;
    //setLoader(true);
    // propertyData.pro_state = stateList.filter(
    //   (item) => parseInt(item.id) === parseInt(propertyData.pro_state)
    // )[0].name;
    axios.post(import.meta.env.VITE_BACKEND + "/api/agent/addAgent", userData);
    //.then((res) => addImages(res.data));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      userData.user_work_area = workArea?.map((item) => item.type).join(", ");
      userData.user_image = selectedFiles[0]?.name;
      const formData = new FormData();
      
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
      formData.append("user_work_state", JSON.stringify(userData.user_work_state));
      formData.append("user_work_city", JSON.stringify(userData.user_work_city));
      formData.append("user_work_sub_district", JSON.stringify(userData.user_work_sub_district));
      formData.append("user_comapnay_name", userData.user_comapnay_name);
      formData.append("user_company_website", userData.user_company_website);
      formData.append("user_desc", userData.user_desc);
      formData.append("user_image", userData.user_image);
      console.log("userData.user_work_city : " , userData.user_work_city , ...formData)
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/agent/addAgent",
        formData
      );
      changeChange();
      props.snack();
    } catch (err) {
      console.log(err);
    }
  };
  
 
    

  console.log("userData : ", userData);
  return (
    <div>
      <div className="user-profile-form-wrapper ">
        <div className=" user-profile-form-heading ">Complete Your Profile</div>
        <div className="pl-2 pt-2 pb-2">
          {`\u2022 Are you searching to buy any property? Please fill out this form to
          let us know about your preferred city, locality, and your budget.`}{" "}
        </div>
        {/* <div className="w-100 m-1">
          <span className="pro_heading">Are you an ?</span>
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

        <div className="pro_flex">
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
        </div>

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Name"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={userData.user_name}
            helperText={userData.user_name.length < 1 ? "Required" : ""}
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
              userData.user_phone.length < 10
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
              emailFormatError !== false
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
            {userData.user_state === "" && (
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
            {userData.user_city === "" &&
              userData.user_city === null &&
              userData.user_state === "" &&
              userData.user_state === null && (
                <FormHelperText sx={{ color: "red" }}>
                  Select State to add City
                </FormHelperText>
              )}
            {userData.user_city === "" && userData.user_state !== "" && (
              <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
            )}
          </FormControl>
        </div>

        <div className="pro_flex">
          <FormControl sx={{ m: 1, width: ["100%"] }} size="small">
            <InputLabel id="demo-simple-select-label">Sub District</InputLabel>
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
            {(userData.user_city === "" || userData.user_state === "") && (
              <FormHelperText sx={{ color: "red" }}>
                Select State and City to add Sub District
              </FormHelperText>
            )}
            {userData.user_sub_district === "" &&
              userData.user_city !== "" &&
              userData.user_state !== "" && (
                <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
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
            value={userData.pro_locality}
            FormHelperTextProps={{ sx: { color: "red" } }}
            helperText={userData.pro_locality === "" ? "Required" : ""}
            onChange={(e) =>
              setUserData({
                ...userData,
                pro_locality: e.target.value.replace(
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
                helperText={
                  userData.user_comapnay_name.length < 2000
                    ? ""
                    : "Description should be smaller than 2000 characters"
                }
                FormHelperTextProps={{ sx: { color: "red" } }}
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
                helperText={
                  userData.user_company_website.length < 2000
                    ? ""
                    : "Description should be smaller than 2000 characters"
                }
                FormHelperTextProps={{ sx: { color: "red" } }}
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

            <div className="pro_flex">
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onChange={(e) => setSearchCity(e.target.value)}
                      label="Deals in Cities"
                      placeholder="Deals in Cities"
                    />
                  )}
                />
              )}
            </div>

            {/* <div className="pro_flex pro_flex_1">
          <div className="w-100 m-1 mb-3">
            <span className="pro_heading">Deals in Property types</span>
            <div className="d-flex flex-wrap ">
              {propertyType.map((item) => (
                <div
                  className={
                    userData.user_work_area === item.type
                      ? "pro_radio_btn_1 pro_selected"
                      : "pro_radio_btn_1"
                  }
                  onClick={() =>
                    setUserData({
                      ...userData,
                      user_work_area: item.type,
                    })
                  }
                >
                  {item.type}
                </div>
              ))}
            </div>
            {userData.user_work_area === "" && (
              <div className="error_msg">Required</div>
            )}
          </div>
        </div>

        <div className="pro_flex pro_flex_1">
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
                  // onClick={() =>
                  //   setUserData({
                  //     ...userData,
                  //     user_exp: item.value,
                  //   })
                  // }
                  onClick={handleWorkAreaChange}
                >
                  {item.value}
                </div>
              ))}
            </div>
            {userData.user_exp === "" && (
              <div className="error_msg">Required</div>
            )}
          </div>
        </div> */}

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
                        .startsWith(searchSubDistrict.toString().toLowerCase())
                  );
                }}
                // onChange={(event, selectedValues) => {
                //   setUserData({
                //     ...userData,
                //     user_work_sub_district: [
                //       ...userData.user_work_sub_district,
                //       {
                //         district:
                //           selectedValues[selectedValues.length - 1].district,
                //         sub_district:
                //           selectedValues[selectedValues.length - 1].sub_district,
                //       },
                //     ],
                //   });
                // }}
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e) => setSearchSubDistrict(e.target.value)}
                    label="Deals in Localities"
                    placeholder="Deals in Localities"
                  />
                )}
              />
            </div>
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
        <div className=" ">
          <input
            
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
          <div className=" ml-2 w-100">
            {selectedFiles != null && selectedFiles != undefined ?
              // ? files.map((item) => (
                  <div className="d-flex file-name-wrapper justify-content-between  ">
                    <div className="file-name">{selectedFiles[0].name}</div>
                    <div className="pointer text-danger"><IconX /></div>
                  </div>
               // ))
               : ""
            }
          </div>
  
          <div className="text-danger ml-2 ">
            {formatError ? "Invalid Format" : ""}
            {fileSizeExceeded
              ? "File size must be greater than 10KB and less than 1MB"
              : ""}
          </div>
        </div>
        <div className="pro_flex justify-content-end mr-2">
          <button
            onClick={handleClick}
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
  );
};

export default UserProfileForm;
