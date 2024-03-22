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
import { IconSquareCheckFilled, IconSquare } from "@tabler/icons-react";
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

  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_exp: "",
    user_state: "",
    user_city: "",
    user_locality: "",
    user_sub_district: "",
    user_work_area: [],
    user_work_state: [],
    user_work_city: [],
    user_work_sub_district: [],
    user_comapnay_name: "",
    user_company_website: "",
    user_desc: "",
  });

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

  // const styleValue = (value) => {
  //   console.log(value)
  //   // Define styles based on the value
  //   let style = {};
  //   if (value === 'Value1') {
  //     style = { color: 'red' };
  //   } else if (value === 'Value2') {
  //     style = { color: 'blue' };
  //   } else if (value === 'Value3') {
  //     style = { color: 'green' };
  //   }
  //   // Return the styled value
  //   return <span style={style}>{value}</span>;
  // };

  // Join the values with commas and apply styles to each value
  //const styledValue = userData.user_work_state.map(styleEachValue).join(', ');
  // const styledValues = userData.user_work_state.map((value, index) => (
  //   // Apply styling to each value
  //   //styleValue(value)
  //    <span >{value}</span>
  // ));
  // console.log(styledValues)

  // Join the styled values with commas
  // const styledValue = styledValues.join(', ');

  useEffect(() => {
    if (cityState) {
      const filteredItems = userData.user_work_state.map((number) =>
        cityState
          .filter((i) => i.state === number)
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

  const handleClick = async () => {
    //setLoader(true);
    // propertyData.pro_state = stateList.filter(
    //   (item) => parseInt(item.id) === parseInt(propertyData.pro_state)
    // )[0].name;
    axios.post(import.meta.env.VITE_BACKEND + "/api/agent/addAgent", userData);
    //.then((res) => addImages(res.data));
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
              <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
            )}
          </FormControl>
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

        {/* <div className="pro_flex">
          <Autocomplete
            sx={{ m: 1, width: ["100%"] }}
            size="small"
            multiple
            id="checkboxes-tags-demo"
            options={propertyType}
            disableCloseOnSelect
            getOptionLabel={(option) => option.type}
            onChange={(event, selectedValues) => {
              setUserData({
                ...userData,
                user_work_area: [
                  ...userData.user_work_area,
                  selectedValues[selectedValues.length - 1].type,
                ],
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
                {option.type}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Property Type Deals In"
                placeholder="Property Type Deals In"
              />
            )}
          />
        </div> */}

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"], color: "blue" }}
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Property Type Deals In"
            placeholder="Property Type Deals In"
            className="w-full"
            name="Website"
            //inputProps={{ maxLength: 200 }}
            multiline
            // inputProps={{
            //   maxLength: 200,
            //   readOnly: true, // Make the input read-only
            //   style: { color: "rgba(0, 0, 0, 0.87)",
            //     backgroundColor: "rgba(0, 0, 0, 0.08)", } // Apply styles to the input
            // }}
            // value={userData.user_company_website}
            // helperText={
            //   userData.user_company_website.length < 2000
            //     ? ""
            //     : "Description should be smaller than 2000 characters"
            // }
            //value={userData.user_work_state.join(', ')}
            //value={styledValue}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onClick={() => setShowSearchSuggestions(!showSearchSuggestions)}

            // onChange={(e) =>
            //   setUserData({
            //     ...userData,
            //     user_company_website: e.target.value.replace(
            //       /[^0-9A-Z a-z , . /]/g,
            //       ""
            //     ),
            //   })
            // }
          />
        </div>
        <div className="d-flex flex-wrap tags-link ">
          {userData.user_work_state.map((item) => (
            <div className="loc-list mb-0">
            <span className="text-dark">
              {item}
            </span>
          </div>
          ))}
          
        </div>
        {showSearchSuggestions && (
          <div className="user-search-suggestions m-1 ">
            {propertyType.map((item) => (
              <li>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  //checked={selected}
                />
                {item.type}
              </li>
            ))}
          </div>
        )}

        <div className="pro_flex">
          <Autocomplete
            sx={{ m: 1, width: ["100%"] }}
            size="small"
            multiple
            limitTags={2}
            id="checkboxes-tags-demo3"
            options={stateList}
            disableCloseOnSelect
            //disableClearable={true}
            getOptionLabel={(option) => option.name}
            filterOptions={(options, { inputValue }) => {
              if (!searchState) {
                return [];
              }
              return options.filter((option) =>
                option.name
                  .toLowerCase()
                  .startsWith(searchState.toString().toLowerCase())
              );
            }}
            onChange={(event, selectedValues) => {
              setUserData({
                ...userData,
                user_work_state: [
                  ...userData.user_work_state,
                  selectedValues[selectedValues.length - 1].name,
                ],
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
                  return [];
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
                  user_work_city: [
                    ...userData.user_work_city,
                    {
                      district:
                        selectedValues[selectedValues.length - 1].district,
                      state: selectedValues[selectedValues.length - 1].state,
                    },
                  ],
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
                return [];
              }

              return options.filter(
                (item) =>
                  item.sub_district &&
                  item.sub_district
                    .toLowerCase()
                    .startsWith(searchSubDistrict.toString().toLowerCase())
              );
            }}
            onChange={(event, selectedValues) => {
              setUserData({
                ...userData,
                user_work_sub_district: [
                  ...userData.user_work_sub_district,
                  {
                    district:
                      selectedValues[selectedValues.length - 1].district,
                    sub_district:
                      selectedValues[selectedValues.length - 1].sub_district,
                  },
                ],
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
                user_desc: e.target.value.replace(/[^0-9A-Z a-z , . /]/g, ""),
              })
            }
          />
        </div>
        <div className="pro_flex justify-content-end">
          <button
            onClick={handleClick}
            type="button"
            // class={
            //   submitDisabled
            //     ? "cursor-not-allowed-btn btn btn-secondary px-5 py-2 m-2"
            //     : "btn btn-primary px-5 py-2 m-2 "
            // }
            //disabled={submitDisabled}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
