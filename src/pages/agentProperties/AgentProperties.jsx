import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  IconBrandWhatsapp,
  IconMapPin,
  IconCurrentLocation,
} from "@tabler/icons-react";
import { Skeleton, Snackbar } from "@mui/material";
import DateTime from "../../dateTime";
import NoResult from "../../components/noResult/NoResult";
import { InputAdornment, Autocomplete } from "@mui/material";
import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";

const AgentProperties = () => {
  const {currentUser} = useContext(AuthContext);
  const { id } = useParams();
  const arrproId = id.split("-");
  const agentId = arrproId[1];

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [location, setLocation] = useState("All India");
  const lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All");
  const [userCurrLocation, setUserCurrLocation] = useState("");
  const [cityData, setCityData] = useState();
  const [userLocation, setUserLocation] = useState(null);
  const [locationSnack, setLocationSnack] = useState(false);

  useEffect(() => {
    setFilter(arrproId[0]);
  }, [id]);

  console.log("arrproId[0] : ", arrproId[0]);

  useEffect(() => {
    cityData &&
    cityData.filter((item) => item.district === "All India").length === 0
      ? setCityData([...cityData, { district: "All India" }])
      : "";
  }, [cityData]);

  const handleLocationSnack = (value) => {
    setLocationSnack(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/agent/fetchPropertyDataByAgent/${agentId}`
      )
      .then((res) => {
        setData(res.data);
        setSkeleton(false);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertySubCatNo`)
      .then((res) => {
        setSubData(res.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/rentalPropertyTotal`)
      .then((res) => {
        setRentData(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/StateDistinctCityData`)
      .then((res) => {
        setCityData(res.data);
      });
  }, []);

  useEffect(() => {
    data.forEach((item, i) => {
      item.pro_modified_id = 5000 + parseInt(item.pro_id);
    });
  }, [data]);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=825008d9e23247daa5600c3878106833`
        //`https://geocode.maps.co/reverse?lat=30.3752&lon=76.7821&api_key=65fa9be01b679584333361bhid151b9`
      )
      .then((res) => {
        //setSearchValue(res.data.features[0].properties.city.trim());
        //setUserLocation(res.data);
        setLocation(res.data.features[0].properties.city.trim());
        //props.handleUserLocation(res.data.features[0].properties.city.trim());
        setSearchValue("");
        //props.handleSearchValue("");
        //setSearchValue(res.data.address.city);
        //setSearchValue("kurukshetra");
      });
  }

  const [results, setResults] = useState();
  useEffect(() => {
    const unique1 = Array.from(
      new Set(data.slice(0, 60).map((item) => item.pro_city.trim()))
    );
    const uniqueState = Array.from(
      new Set(data.slice(0, 60).map((item) => item.pro_state.trim()))
    );

    const unique2 = Array.from(
      new Set(
        data
          .slice(0, 60)
          .map(
            (item) =>
              (item.pro_sub_district
                ? item.pro_sub_district.trim() + ", "
                : "") + item.pro_city.trim()
          )
      )
    );
    const unique3 = Array.from(
      new Set(
        data
          .slice(0, 60)
          .map(
            (item) =>
              (item.pro_locality ? item.pro_locality.trim() + ", " : "") +
              (item.pro_sub_district
                ? item.pro_sub_district.trim() + ", "
                : "") +
              item.pro_city.trim()
          )
      )
    );
    const arr = [...unique1, ...uniqueState, ...unique2, ...unique3];
    const unique4 = Array.from(
      new Set(arr.slice(0, 200).map((item) => item.trim()))
    );

    const unique = unique4.filter((i) =>
      i.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    setSuggestions(unique);
    //console.log("unique : " , unique , unique1 , unique2 , unique3 , unique4)
    let searchWords = searchValue.toLowerCase().split(",");
    //console.log(searchWords)
    const filteredData = data
      .filter((code) => {
        if (filter === "Sale") {
          return code.pro_ad_type === "Sale";
        } else if (filter === "Rent") {
          return code.pro_ad_type === "Rent";
        } else if (filter === "All") {
          return true;
        }
      })
      .filter((item) => {
        const itemValues =
          item.pro_locality +
          " " +
          item.pro_city +
          " " +
          item.pro_sub_district +
          " " +
          item.pro_street +
          " " +
          item.pro_state;

        return searchWords.every((word) =>
          itemValues.toLowerCase().includes(word)
        );
      });
    //console.log("filteredData : " , filteredData)
    setResults(filteredData);
    //console.log("searchWords : ", searchWords, filteredData);
  }, [searchValue, userLocation, filter, data]);

  const records =
    searchValue === "" && filter === "All"
      ? data.slice(firstIndex, lastIndex)
      : results.slice(firstIndex, lastIndex);

  const nPages = Math.ceil(
    searchValue === "" && filter === "All"
      ? data.length / recordsPerPage
      : results.length / recordsPerPage
  );

  const handleSearchValue = (value) => {
    console.log(value);
    setSearchValue(value);
  };

  const handleUserLocation = (value) => {
    setUserCurrLocation(value);
  };

  return (
    <div>
      <Helmet>
        <title>Propertyease - All Properties</title>
      </Helmet>
      <Navbar />
      {/* <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
            textAlign: "center",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={locationSnack}
        autoHideDuration={1000}
        onClose={() => setLocationSnack(false)}
        message={
          "Thank You for showing interest in this property, we will get back to you soon."
        }
      /> */}
      <div className={"main padding-top"}>
        <section className="main-content">
          <div className="container">
            <div className="title">
              <h2>
                All Properties
                <span className="ml-2 numberProperties">{data.length}</span>
              </h2>

              <div className="row align-items-center my-2 mx-1 gap-3">
                <TextField
                  variant="outlined"
                  className="col-md-5 mx-4 mx-md-0"
                  size="small"
                  label="Search for properties..."
                  placeholder="e.g. Sector 7 "
                  value={searchValue}
                  onChange={(e) => {
                    setOpenSuggestions(true);
                    setCurrentPage(1);
                    setSearchValue(e.target.value);
                    //handleSearchValue(e.target.value);
                  }}
                />

                <div className="col-md-3 mx-4 mx-md-0 pl-0">
                  {cityData && (
                    <Autocomplete
                      size="small"
                      //disableClearable
                      id="combo-box-demo"
                      options={cityData.map((option) => option.district)}
                      onInputChange={(event, newInputValue) => {
                        setLocation(newInputValue);
                        handleUserLocation(newInputValue);
                        setSearchValue("");
                        //handleSearchValue("");
                      }}
                      sx={{ m: 1, width: ["100%"] }}
                      value={location}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          //value={"All India"}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                title="Detect your current location"
                              >
                                <IconCurrentLocation
                                  className="pointer location-icon"
                                  onClick={handleLocationClick}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  )}
                </div>

                <FormControl
                  sx={{ m: 1, width: ["100%"] }}
                  size="small"
                  className="col-md-3 mx-4 mx-md-0"
                >
                  <InputLabel id="demo-simple-select-label">
                    Filter By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="Filter By"
                    onChange={(e) => {
                      setFilter(e.target.value), setCurrentPage(1);
                    }}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Sale"}>Sale</MenuItem>
                    <MenuItem value={"Rent"}>Rent</MenuItem>
                  </Select>
                </FormControl>
                {/* <FormControl
          sx={{ m: 1, width: ["100%"] }}
          size="small"
          className="col-md-2 mx-4 mx-md-0"
        >
          <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter2}
            label="Filter By"
            onChange={(e) => {
              setFilter2(e.target.value), setCurrentPage(1);
            }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Residential"}>Residential</MenuItem>
            <MenuItem value={"Commerical"}>Commerical</MenuItem>
            <MenuItem value={"Land"}>Land/Plots</MenuItem>
          </Select>
        </FormControl> */}
              </div>
              {openSuggestions &&
                searchValue !== "" &&
                searchValue !== null &&
                suggestions !== null &&
                suggestions !== "" &&
                suggestions.length > 0 && (
                  <div className="col-md-9 mx-4 mx-md-0 search-suggestions pt-2 shadow pb-2">
                    {suggestions.map((item) => (
                      <div
                        className="py-2 pl-2 suggesion-item pointer"
                        onClick={() => {
                          setSearchValue(item), setOpenSuggestions(false);
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
            </div>
            <div className="row">
              <div className="col-md-9">
                {!skeleton && records.length > 0 ? (
                  records.map((object, index) => (
                    <div className="list-group" key={index}>
                      <div className="row">
                        <div className="col-md-auto flex-column text-center">
                          <div className="buiness-logo">
                            <Link
                              // to={`/${
                              //   object.pro_area_size.toLowerCase() +
                              //   "-" +
                              //   object.pro_area_size_unit
                              //     .toLowerCase()
                              //     .replaceAll(" ", "-")
                              //     .replaceAll(".", "") +
                              //   "-"
                              // }${
                              //   object.pro_type
                              //     ? object.pro_type
                              //         .split(",")[0]
                              //         .toLowerCase()
                              //         .replaceAll(" ", "-")
                              //     : ""
                              // }-for-${
                              //   object.pro_ad_type === "rent" ? "rent" : "sale"
                              // }-in-${object.pro_locality
                              //   .toLowerCase()
                              //   .replaceAll(" ", "-")}-${object.pro_city
                              //   .toLowerCase()
                              //   .replaceAll(" ", "-")}-${object.pro_id}`}
                              to={`/${object.pro_url}`}
                            >
                              {object.img_link ? (
                                <img
                                  src={`${
                                    import.meta.env.VITE_BACKEND
                                  }/propertyImages/watermark/${
                                    object.img_link
                                  }`}
                                  alt="img"
                                />
                              ) : (
                                <img src="/images/default.png" alt="no image" />
                              )}
                            </Link>
                          </div>
                        </div>

                        <div className="col" style={{ minWidth: 0 }}>
                          <div className="recent-box-serv">
                            <div className="recent-bus-content">
                              <div className="property-listing-type">
                                <Link
                                  // to={`/${
                                  //   object.pro_area_size.toLowerCase() +
                                  //   "-" +
                                  //   object.pro_area_size_unit
                                  //     .toLowerCase()
                                  //     .replaceAll(" ", "-")
                                  //     .replaceAll(".", "") +
                                  //   "-"
                                  // }${
                                  //   object.pro_type
                                  //     ? object.pro_type
                                  //         .split(",")[0]
                                  //         .toLowerCase()
                                  //         .replaceAll(" ", "-")
                                  //     : ""
                                  // }-for-${
                                  //   object.pro_ad_type === "rent"
                                  //     ? "rent"
                                  //     : "sale"
                                  // }-in-${object.pro_locality
                                  //   .toLowerCase()
                                  //   .replaceAll(" ", "-")}-${object.pro_city
                                  //   .toLowerCase()
                                  //   .replaceAll(" ", "-")}-${object.pro_id}`}
                                  to={`/${object.pro_url}`}
                                >
                                  <span className="text-wrap text-bold">
                                    {object.pro_area_size +
                                      " " +
                                      object.pro_area_size_unit +
                                      " " +
                                      object.pro_type.split(",")[0] +
                                      " "}
                                    for{" "}
                                    {object.pro_ad_type === "Rent"
                                      ? "Rent"
                                      : "Sale"}{" "}
                                    in{" "}
                                    <span className="text-capitalize">
                                      {object.pro_locality}
                                    </span>
                                    ,&nbsp;
                                    {object.pro_sub_district
                                      ? object.pro_sub_district + ", "
                                      : ""}
                                    {object.pro_city},&nbsp;
                                    {object.pro_state}
                                  </span>
                                </Link>
                              </div>
                              <ul>
                                <li className="text-capitalize">
                                  <img
                                    src="/img/location.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon"></strong>
                                  {object.pro_locality},&nbsp;
                                  {object.pro_city}
                                </li>
                                {object.pro_width ? (
                                  <li>
                                    <img
                                      src="/img/meter.png"
                                      className="property-slider-icon"
                                    />
                                    <strong className="frontPropIcon">
                                      Dimension&nbsp;
                                    </strong>
                                    {object.pro_width} Feet *{" "}
                                    {object.pro_length + " "}
                                    Feet
                                  </li>
                                ) : (
                                  ""
                                )}
                                <li>
                                  <img
                                    src="/img/rupee.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    {object.pro_amt && "Price"}
                                  </strong>
                                  &nbsp;
                                  {object.pro_amt
                                    ? "₹" +
                                      object.pro_amt +
                                      " " +
                                      object.pro_amt_unit
                                    : "Ask Price"}
                                </li>

                                <li>
                                  <img
                                    src="/img/facing.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    Property Facing
                                  </strong>
                                  &nbsp;{object.pro_facing}
                                </li>
                              </ul>
                              {/* <Link
                              to={`/property/${object.pro_type
                                .split(",")[0]
                                .replace(
                                  " ",
                                  "-"
                                )}-${object.pro_ad_type.replace(" ", "-")}_${
                                object.pro_id
                              }`}
                            >
                              <a title="View More" className="btn-viewmore">
                                View More
                              </a>
                            </Link> */}
                            </div>
                            <div className="pt-3 d-flex justify-content-between  align-items-center listing-details-wrapper">
                            <div className=" listed pl-md-0">
                              {object.user_type === "Broker" &&
                              object.pro_user_type === "Broker" ? (
                                <Link
                                  to={`/agentProfile/${object.pro_user_id}`}
                                  title="Click to View Broker Profile"
                                >
                                  Listed by{" "}
                                  {currentUser &&
                                  object.pro_user_id == currentUser[0].login_id
                                    ? "Me "
                                    : object.agent_name +
                                      " (" +
                                      object.pro_user_type +
                                      ")" +
                                      " "}
                                </Link>
                              ) : (
                                "Listed by " +
                                (currentUser &&
                                object.pro_user_id == currentUser[0].login_id
                                  ? "Me "
                                  : object.pro_user_type + " ")
                              )}
 <br />
                              {DateTime(object.pro_date)}
                            </div>
                              <div className="d-flex listing-buttons">
                                <div className="mr-2 mt-1 ">
                                  <Link
                                    // to={`/${
                                    //   object.pro_area_size.toLowerCase() +
                                    //   "-" +
                                    //   object.pro_area_size_unit
                                    //     .toLowerCase()
                                    //     .replaceAll(" ", "-")
                                    //     .replaceAll(".", "") +
                                    //   "-"
                                    // }${
                                    //   object.pro_type
                                    //     ? object.pro_type
                                    //         .split(",")[0]
                                    //         .toLowerCase()
                                    //         .replaceAll(" ", "-")
                                    //     : ""
                                    // }-for-${
                                    //   object.pro_ad_type === "rent"
                                    //     ? "rent"
                                    //     : "sale"
                                    // }-in-${object.pro_locality
                                    //   .toLowerCase()
                                    //   .replaceAll(" ", "-")}-${object.pro_city
                                    //   .toLowerCase()
                                    //   .replaceAll(" ", "-")}-${object.pro_id}`}
                                    to={`/${object.pro_url}`}
                                  >
                                    <a
                                      title="View complete details of this property"
                                      className=" btn-viewmore"
                                    >
                                      View More
                                    </a>
                                  </Link>
                                </div>
                                <div>
                                  <a
                                    rel="noreferrer nofollow"
                                    href={`https://wa.me/918950040151?text=https://www.propertyease.in/${
                                      object.pro_url}`}
                                    target="_blank"
                                    className="conatct-propertywp"
                                    title=" Whatsapp/Contact for this property"
                                  >
                                    <IconBrandWhatsapp />
                                    <span className="pl-1">Whatsapp</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : skeleton ? (
                  <div>
                    <Skeleton variant="rectangular" width={813} height={200} />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                  </div>
                ) : (
                  <NoResult
                    searchValue={searchValue}
                    userCurrLocation={userCurrLocation}
                    handleSearchValue={handleSearchValue}
                  />
                )}
              </div>
              <div className="col-md-3 d-flex flex-column gap-3">
                <div>
                  <div className="p-1 shadow">
                    <div className="p-3 font-weight-bold text-black">
                      For Sale
                    </div>
                    {subData.map((sub, index) => (
                      <Link
                        to={`/${sub.pro_type
                          .split(",")[1]
                          .toLowerCase()}/${sub.pro_type
                          .split(",")[0]
                          .replaceAll(" ", "-")
                          .toLowerCase()}`}
                        key={index}
                      >
                        <div className="d-flex justify-content-between px-3 py-2">
                          <div>{sub.pro_type.split(",")[0]}</div>
                          <div>({sub.pro_sub_cat_number})</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="p-1 shadow">
                    <div className="p-3 font-weight-bold text-black">Rent</div>
                    {rentData.map((rent, index) => (
                      <Link
                        to={`/rental/${rent.pro_type
                          .split(",")[0]
                          .replaceAll(" ", "-")
                          .toLowerCase()}`}
                        key={index}
                      >
                        <div className="d-flex justify-content-between px-3 py-2">
                          <div>{rent.pro_type.split(",")[0]}</div>
                          <div>({rent.pro_sub_cat_number})</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {records.length > 0 && (
              <Pagination
                count={nPages}
                color="primary"
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                className="col-md-6 mx-auto py-2"
              />
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AgentProperties;
