import React from "react";
import { useState, useEffect, useContext } from "react";
import { stateList } from "../addProperty/State";
import { TextField, Autocomplete } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { IconPlus, IconX } from "@tabler/icons-react";
import { regEx } from "../regEx";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const RadioBoxSelection = ({
  heading,
  array,
  field_item,
  field_item_val,
  propertyData,
  setPropertyData,
  formSubmit,
  storeInArray,
  setData
}) => {
  return (
    <div className="pro_flex pro_flex_1">
      <div className="w-100 m-1 mb-3">
        <span className="pro_heading">{heading}</span>
        <div className="d-flex flex-wrap ">
          {storeInArray ? array.map((item) => (
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
          )) : 
          array.map((item) => (
          <div
              className={
                field_item === item.value
                  ? "pro_radio_btn_1 pro_selected"
                  : "pro_radio_btn_1"
              }
              onClick={() =>
                setData(item.value)
              }
            >
              {item.value}
            </div>
          ))}
        </div>
        {formSubmit && field_item === "" && (
          <div className="error_msg">Required</div>
        )}
      </div>
    </div>
  );
};

const RadioBoxSelection2 = ({
  heading,
  array,
  field_item,
  field_item_val,
  propertyData,
  setPropertyData,
  formSubmit,
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
              {item.item}
            </div>
          ))}
        </div>
        {formSubmit && field_item === "" && (
          <div className="error_msg">Required</div>
        )}
      </div>
    </div>
  );
};

const QuickListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [searchState, setSearchState] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  const [subDistrict, setSubDistrict] = useState();
  const [cityState, setCityState] = useState();

  const [filterDistricts, setFilterDistricts] = useState([]);
  const [filterSubDistricts, setFilterSubDistricts] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [searchSubDistrict, setSearchSubDistrict] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [tempProType, setTempProType] = useState("");

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

  const [propertyData, setPropertyData] = useState({
    pro_user_type: "Broker",
    pro_ad_type: "Sale",
    pro_type: "",
    pro_city: "",
    pro_locality: "",
    pro_facing: "",
    pro_area_size: "",
    pro_amt: "",
    pro_user_id: currentUser ? currentUser[0].login_id : "",
    pro_area_size_unit: "Marla",
    pro_amt_unit: "Lakhs",
    pro_state: "",
    pro_sub_district: "",
    pro_user_email: "",
    pro_login_number: "",
    pro_desc: "",
  });

  useEffect(() => {
    if (
      cityState &&
      propertyData.pro_state != "" &&
      propertyData.pro_state != null
    ) {
      const filteredItems =
        //propertyData.pro_state.map((number) =>
        cityState
          .filter((i) => i.state == propertyData.pro_state.name)
          .map((item) => {
            return { state: item.state, district: item.district };
          });
      // );

      const combinedArray = filteredItems.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );
      setFilterDistricts(combinedArray);
    }
  }, [propertyData.pro_state, cityState]);

  useEffect(() => {
    if (
      subDistrict &&
      propertyData.pro_city != "" &&
      propertyData.pro_city != null
    ) {
      const filteredItems =
        //userData.user_work_city.map((number) =>
        subDistrict
          .filter((i) => i.district == propertyData.pro_city.district)
          .map((item) => {
            return { sub_district: item.sub_district, district: item.district };
          });
      //  );

      const combinedArray = filteredItems.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );

      setFilterSubDistricts(combinedArray);
    }
  }, [filterDistricts, propertyData.pro_state, propertyData.pro_city]);

  const selectedState = React.useMemo(
    () =>
      stateList.find(
        (v) => v.name === propertyData.pro_state?.name
      ) || null,
    [stateList, propertyData.pro_state]
  );

  

  const selectedCity = React.useMemo(
    () =>
      filterDistricts.find(
        (v) => v.district === propertyData.pro_city?.district
      ) || null,
    [filterDistricts, propertyData.pro_city]
  );

  const selectedSubDistrict = React.useMemo(
    () =>
      filterSubDistricts.find(
        (v) => v.sub_district === propertyData.pro_sub_district?.sub_district
      ) || null,
    [filterSubDistricts, propertyData.pro_sub_district]
  );

  const propertyAdType = [{ value: "Sale" }, { value: "Rent" }];

  const propertyUserType = [{ value: "Broker" }, { value: "Owner" }];
  const [formatError, setFormatError] = useState(false);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 1000000;
  const minFileSize = 10000;
  const [loader, setLoader] = useState(false);
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

  const changeFormatting = (value) => {
    //var val = value.toLowerCase().trim();
    var val = value.trim();
    var a = val.replace(/\s{2,}/g, " ");
    return a;
  };

  const handleSubmit = () => {
    setFormSubmit(true);
    if (
      propertyData.pro_ad_type !== "" &&
      propertyData.pro_user_type !== "" &&
      propertyData.pro_type !== "" &&
      propertyData.pro_state !== "" &&

      //propertyData.pro_city !== "" &&
      ((propertyData.pro_state !== "" && filterDistricts.length < 1) || propertyData.pro_city !== "") &&
      ((filterDistricts.length < 1 && filterSubDistricts.length < 1) || propertyData.pro_sub_district !== "") &&

      propertyData.pro_locality !== "" &&
      propertyData.pro_facing !== "" &&
      propertyData.pro_area_size !== "" &&
      (propertyData.pro_desc === "" || propertyData.pro_desc.length < 2000) &&
      formatError === false &&
      fileSizeExceeded === false
    ) {
      handleClick();
    }
    // else {
    //   console.log(  propertyData.pro_locality, propertyData.pro_state)
    // }
  };

  const handleClick = async () => {
    setLoader(true);
    currentUser && (propertyData.pro_user_id = currentUser[0].login_id);
    currentUser && (propertyData.pro_user_email = currentUser[0].login_email);
    currentUser &&
      (propertyData.pro_login_number = currentUser[0].login_number);
    propertyData.pro_state = propertyData.pro_state.name;
    propertyData.pro_city = propertyData.pro_city.district;
    propertyData.pro_sub_district = propertyData.pro_sub_district.sub_district;
    propertyData.pro_locality = changeFormatting(propertyData.pro_locality);
    propertyData.pro_date = Date.now();
    // propertyData.pro_state = stateList.filter(
    //   (item) => parseInt(item.id) === parseInt(propertyData.pro_state)
    // )[0].name;
    axios
      .post(
        import.meta.env.VITE_BACKEND + "/api/pro/quickListing",
        propertyData
      )
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

  // const propertyType = [
  //         { "value": "Apartment", "item": "Apartment" },
  //         { "value": "Independent House", "item": "Independent House" },
  //         { "value": "Builder Floor", "item": "Builder Floor" },
  //         { "value": "Farm House", "item": "Farm House" },
  //         { "value": "Raw House", "item": "Raw House" },
  //         { "value": "Retirement Community", "item": "Retirement Community" },
  //         { "value": "Studio Apartment", "item": "Studio Apartment" },
  //         { "value": "Residential Land", "item": "Residential Land" },
  //         { "value": "Commercial Land", "item": "Commercial Land" },
  //         { "value": "Industrial Land", "item": "Industrial Land" },
  //         { "value": "Agricultural Land", "item": "Agricultural Land" },
  //         { "value": "Farm House Land", "item": "Farm House Land" },
  //         { "value": "Retail Showroom", "item": "Retail Showroom" },
  //         { "value": "Commercial Building", "item": "Commercial Building" },
  //         { "value": "Office Complex", "item": "Office Complex" },
  //         { "value": "Software Technology Park", "item": "Software Technology Park" },
  //         { "value": "Warehouse", "item": "Warehouse" },
  //         { "value": "Industrial Estate", "item": "Industrial Estate" }
  // ]

  const proTypes = [
    {value: "Residential"},
    {value: "Land"},
    {value: "Commercial"},
  ]


  const proResSubTypes = [
    { value: "Apartment,Residential", item: "Apartment" },
    { value: "Independent House,Residential", item: "Independent House" },
    { value: "Builder Floor,Residential", item: "Builder Floor" },
    { value: "Farm House,Residential", item: "Farm House" },
    { value: "Raw House,Residential", item: "Raw House" },
    { value: "Retirement Community,Residential", item: "Retirement Community" },
    { value: "Studio Apartment,Residential", item: "Studio Apartment" },

  ]
  const proLandSubTypes = [
    { value: "Residential Land,Land", item: "Residential Land" },
    { value: "Commercial Land,Land", item: "Commercial Land" },
    { value: "Industrial Land,Land", item: "Industrial Land" },
    { value: "Agricultural Land,Land", item: "Agricultural Land" },
    { value: "Farm House Land,Land", item: "Farm House Land" },
    { value: "Institutional Land,Land", item: "Institutional Land" },

  ]

  const proCommercialSubTypes = [
    { value: "Retail Showroom,Commercial", item: "Retail Showroom" },
    { value: "Commercial Building,Commercial", item: "Commercial Building" },
    { value: "Office Complex,Commercial", item: "Office Complex" },
    {
      value: "Software Technology Park,Commercial",
      item: "Software Technology Park",
    },
    { value: "Warehouse,Commercial", item: "Warehouse" },
    { value: "Industrial Estate,Commercial", item: "Industrial Estate" },

    {
      value: "Institutional Building,Commercial",
      item: "Institutional Building",
    },
    { value: "Petrol Pump,Commercial", item: "Petrol Pump" },
    { value: "Cold Store,Commercial", item: "Cold Store" },

  ];

  const propertyType = [
    { value: "Apartment,Residential", item: "Apartment" },
    { value: "Independent House,Residential", item: "Independent House" },
    { value: "Builder Floor,Residential", item: "Builder Floor" },
    { value: "Farm House,Residential", item: "Farm House" },
    { value: "Raw House,Residential", item: "Raw House" },
    { value: "Retirement Community,Residential", item: "Retirement Community" },
    { value: "Studio Apartment,Residential", item: "Studio Apartment" },

    { value: "Residential Land,Land", item: "Residential Land" },
    { value: "Commercial Land,Land", item: "Commercial Land" },
    { value: "Industrial Land,Land", item: "Industrial Land" },
    { value: "Agricultural Land,Land", item: "Agricultural Land" },
    { value: "Farm House Land,Land", item: "Farm House Land" },

    { value: "Retail Showroom,Commercial", item: "Retail Showroom" },
    { value: "Commercial Building,Commercial", item: "Commercial Building" },
    { value: "Office Complex,Commercial", item: "Office Complex" },
    {
      value: "Software Technology Park,Commercial",
      item: "Software Technology Park",
    },
    { value: "Warehouse,Commercial", item: "Warehouse" },
    { value: "Industrial Estate,Commercial", item: "Industrial Estate" },

    {
      value: "Institutional,Commercial",
      item: "Institutional",
    },
    { value: "Petrol Pump,Commercial", item: "Petrol Pump" },
    { value: "Cold Store,Commercial", item: "Cold Store" },

  ];

  return (
    <div>
      {loader && <Loader />}
      <Navbar />

      <div className="container">
        <div className="quick-list-form">
          <div className="section-title ">
            <h3 className="aboutus">
              Quick Property Listing{" "}
              <div className="heading-divider mx-auto"></div>
            </h3>
            <p className="pl-4 pr-4">
              Ready to get your property noticed? With our Quick Property
              Listing form, you can easily submit your property details and have
              it listed in no time! Our streamlined process is designed to get
              your property on the market quickly, allowing you to reach
              potential buyers or renters with minimal effort.
              <br />
            </p>
          </div>
          <div className="flex-col-sm mainDiv">
            <div className="pro_flex m-1 mt-3 d-flex">
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
                {propertyData.pro_ad_type === "" && (
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
                {propertyData.pro_user_type === "" && (
                  <div className="error_msg">Required</div>
                )}
              </div>
            </div>

            <RadioBoxSelection
              heading="Property Type"
              array={proTypes}
              field_item={tempProType}
              //field_item_val="pro_type"
              //tempProType={tempProType}
              setData={setTempProType}
              formSubmit={formSubmit}
              storeInArray={false}
            />


{tempProType &&
            <RadioBoxSelection2
              heading="Property Sub Type"
              array={tempProType === "Residential" ? proResSubTypes : tempProType === "Land" ? proLandSubTypes : tempProType === "Commercial" ? proCommercialSubTypes : ""  }
              field_item={propertyData.pro_type}
              field_item_val="pro_type"
              propertyData={propertyData}
              setPropertyData={setPropertyData}
              formSubmit={formSubmit}
            />
}
            <div className="pro_flex d-flex">
              {/* <FormControl
                sx={{
                  mt: 1,
                  mb: 1,
                  width: ["100%"],
                  ml: { xs: 0, sm: 0, xl: 1 },
                }}
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
                    <option value={"Apartment,Residential"}>Apartment</option>
                    <option value={"Independent House,Residential"}>
                      Independent House
                    </option>
                    <option value={"Builder Floor,Residential"}>
                      Builder Floor
                    </option>
                    <option value={"Farm House,Residential"}>Farm House</option>
                    <option value={"Raw House,Residential"}>Raw House</option>
                    <option value={"Retirement Community,Residential"}>
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
                    <option value={"Commercial Building,Commercial"}>
                      Commercial Building
                    </option>
                    <option value={"Office Complex,Commercial"}>
                      Office Complex
                    </option>
                    <option value={"Software Technology Park,Commercial"}>
                      Software Technology Park
                    </option>
                    <option value={"Warehouse,Commercial"}>Warehouse</option>
                    <option value={"Industrial Estate,Commercial"}>
                      Industrial Estate
                    </option>
                  </optgroup>
                </Select>
                {propertyData.pro_type === "" && formSubmit && (
                  <FormHelperText sx={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
              </FormControl> */}


<TextField
                            sx={{ mt: 1,
                              mb: 1,
                               width: ["80%"], mr: 0, ml: 1 }}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            label="Expected Amount"
                            className="w-full pro_flex_select"
                            name="Expected Amount"
                            inputProps={{ maxLength: 10 }}
                            value={propertyData.pro_amt}
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

              <TextField
                sx={{
                  mt: 1,
                  mb: 1,
                  ml: 0,
                  width: ["70%"],
                  borderRight: 0,
                  ml: { xs: 0, sm: 0, xl: 1 },
                }}
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
                  formSubmit && propertyData.pro_area_size === ""
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
            </div>

            <div className="pro_flex d-flex">
              <Autocomplete
                sx={{
                  mt: 1,
                  mb: 1,
                  width: ["100%"],
                  ml: { xs: 0, sm: 0, xl: 1 },
                }}
                size="small"
                //   multiple
                limitTags={2}
                value={selectedState}
                id="checkboxes-tags-demo3"
                options={stateList}
                getOptionLabel={(option) => option.name}
                onChange={(event, selectedValues) => {
                  setPropertyData({
                    ...propertyData,
                    pro_state: selectedValues,
                    pro_city: "",
                    pro_sub_district: "",
                    searchCity: "",
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={
                      formSubmit === true &&
                      (propertyData.pro_state === null ||
                        propertyData.pro_state === "") &&
                      "Required"
                    }
                    FormHelperTextProps={{ sx: { color: "red" } }}
                    onChange={(e) => setSearchState(e.target.value)}
                    value={searchCity}
                    label="State"
                    placeholder="State"
                  />
                )}
              />

              {cityState && (
                <Autocomplete
                  sx={{
                    mt: 1,
                    mb: 1,
                    width: ["100%"],
                    ml: { xs: 0, sm: 0, xl: 1 },
                  }}
                  size="small"
                  // multiple
                  limitTags={1}
                  id="checkboxes-tags-demo"
                  options={filterDistricts}
                  //value={propertyData.pro_city.district}
                  getOptionLabel={(option) => option.district}
                  onChange={(event, selectedValues) => {
                    setPropertyData({
                      ...propertyData,
                      pro_city: selectedValues,
                      pro_sub_district: "",
                    });
                  }}
                  value={selectedCity}
                  //disabled={filterDistricts.length < 0 ? true : false}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={
                        // filterDistricts.length > 0
                        //   ?
                        formSubmit === true && 
                        (propertyData.pro_state === null || propertyData.pro_state === "") &&
                        (propertyData.pro_city === null || propertyData.pro_city === "")
                          ? "Select state to add city"
                          : propertyData.pro_state !== null && propertyData.pro_state !== "" && filterDistricts.length < 1 
                          ? ""
                          : formSubmit === true && (propertyData.pro_city === null || propertyData.pro_city === "")
                          ? "Required" 
                           : ""
                        // : ""
                      }
                      FormHelperTextProps={{ sx: { color: "red" } }}
                      onChange={(e) => setSearchCity(e.target.value)}
                      label="City"
                      placeholder="City"
                    />
                  )}
                />
              )}
            </div>

            <div className="pro_flex d-flex">
              <Autocomplete
                sx={{
                  mt: 1,
                  mb: 1,
                  width: ["100%"],
                  ml: { xs: 0, sm: 0, xl: 1 },
                }}
                size="small"
                //multiple
                limitTags={8}
                id="checkboxes-tags-demo"
                options={filterSubDistricts}
                value={selectedSubDistrict}
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
                // getOptionDisabled={checkDisable}

                onChange={(event, selectedValues) => {
                  setPropertyData({
                    ...propertyData,
                    pro_sub_district: selectedValues,
                    //   pro_sub_district: "",
                  });
                }}
                //disabled={filterSubDistricts.length < 0 ? false : true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    //helperText={limitReached ? "Maximum limit reached" : ""}

                    helperText={
                      // filterDistricts.length > 0
                      //   ?
                      formSubmit === true &&
                      (propertyData.pro_state === null ||
                        propertyData.pro_state === "") &&
                      (propertyData.pro_city === null ||
                        propertyData.pro_city === "")
                        ? "Select state and city to add sub district"
                        : filterDistricts.length < 1 && filterSubDistricts.length < 1 
                          ? ""
                        : formSubmit === true &&
                          (propertyData.pro_city === null ||
                            propertyData.pro_city === "")
                        ? "Select city to add sub district"
                        : formSubmit === true && propertyData.pro_sub_district === ""
                        ? "Required"
                        : ""
                      //: ""
                    }
                    //helperText= {formSubmit === true && userData.user_work_sub_district.length === 0 && "Required"}
                    FormHelperTextProps={{ sx: { color: "red" } }}
                    onChange={(e) => setSearchSubDistrict(e.target.value)}
                    label="Sub District"
                    placeholder="Sub District"
                  />
                )}
              />
              <TextField
                sx={{
                  mt: 1,
                  mb: 1,
                  width: ["100%"],
                  ml: { xs: 0, sm: 0, xl: 1 },
                }}
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
                  propertyData.pro_locality === "" && formSubmit
                    ? "Required"
                    : ""
                }
                onChange={(e) =>
                  setPropertyData({
                    ...propertyData,
                    pro_locality: e.target.value.replace(/[^0-9A-Z a-z ]/g, ""),
                  })
                }
                required
              />
            </div>

            <RadioBoxSelection
              heading="Property Facing"
              array={propertyFacing}
              field_item={propertyData.pro_facing}
              field_item_val="pro_facing"
              propertyData={propertyData}
              setPropertyData={setPropertyData}
              formSubmit={formSubmit}
              storeInArray={true}
            />

<div className="d-flex">
            <div className=" w-30  mr-3" style={{width: '100%'}}>
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
                className="border py-4  rounded-2 border-secondary quick-list-upload"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="d-flex flex-column  align-items-center">
                  <div>Drop Property Images here</div>
                  <div className="py-1">Or</div>
                  <div className="border py-2 px-4">Browse</div>
                </div>
              </label>
              <div>
                <div className="add-pro-img w-100 pb-3">
                  {selectedFiles != null && selectedFiles != undefined
                    ? files.map((item, index) => (
                        <div className="pt-3">
                          <div className="d-flex file-name-wrapper justify-content-between">
                            <div className="file-name">{item.name}</div>
                            <div
                              className="pointer text-[#C4C5C8]"
                              onClick={() => removeImage(item, index)}
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

              {/* <div className="text-danger ml-2 ">
                            {formatError ? "Invalid Format" : ""}
                            {fileSizeExceeded
                              ? "File size must be greater than 10KB and less than 1MB"
                              : ""}
                          </div> */}
            </div>
            <div className=" w-30  ml-3"  style={{width: '100%'}}>
            <TextField
                            multiline
                            sx={{ width: ["100%"], paddingBottom: '0px' }}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            label="Property Description"
                            className="w-full hello"
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
                              rows: 6,
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
            </div>

            <div className="d-flex justify-content-end ">
              <button
                className="btn continue-btn"
                //disabled={submitDisabled}
                // onClick={handleClick}
                //onClick={handleClick}
                onClick={handleSubmit}
              >
               <IconPlus /> Add Property
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuickListing;
