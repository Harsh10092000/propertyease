import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SearchBar from "../../components/searchBar/SearchBar";
import {
  IconBrandWhatsapp,
  IconMapPin,
  IconSend,
  IconCurrentLocation,
} from "@tabler/icons-react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Pagination,
} from "@mui/material";
const AgentsListing = () => {
  const [agents, setAgents] = useState([]);
  const [subData, setSubData] = useState([]);
  const [rentData, setRentData] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/agent/fetchAgents`)
      .then((res) => {
        setAgents(res.data);
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

  // const [records, setRecords] = useState([]);
  // const [nPages, setNPages] = useState(0);

  // const handleRecordsChange = (newRecords) => {
  //   setRecords(newRecords);
  // };

  // const handleNPagesChange = (newNPages) => {
  //   setNPages(newNPages);
  // };

  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cityData, setCityData] = useState();
  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [location, setLocation] = useState("All India");
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  // const records =
  //   searchValue === "" && filter === "All"
  //   ? data.slice(firstIndex, lastIndex)
  //     : results.slice(firstIndex, lastIndex);

  // const nPages = Math.ceil(
  //   searchValue === "" && filter === "All"
  //     ? data.length / recordsPerPage
  //     : results.length / recordsPerPage
  // );

  //console.log("records : ", records);

  const handleSearchValue = (value) => {
    //console.log(value);
    setSearchValue(value);
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/StateDistinctCityData`)
      .then((res) => {
        setCityData(res.data);
      });
  }, []);

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
      new Set(agents?.slice(0, 60).map((item) => item.agent_city.trim()))
    );
    const uniqueState = Array.from(
      new Set(agents?.slice(0, 60).map((item) => item.agent_state.trim()))
    );
    const uniqueWorkCity = Array.from(
      new Set(agents?.slice(0, 60).map((item) => item.work_city.trim()))
    );
    // const uniqueWorkState= Array.from(
    //   new Set(agents?.slice(0, 60).map((item) => item.work_state.trim()))
    // );

    const workCities = [
      ...new Set(uniqueWorkCity.flatMap((city) => city.split(","))),
    ];
    //const workStates = [...new Set(uniqueWorkState.flatMap(city => city.split(',')))];

    const u7 = Array.from(
      new Set(agents?.slice(0, 60).map((item) => item.agent_name.trim()))
    );

    // const unique2 = Array.from(
    //   new Set(
    //     agents
    //       .slice(0, 60)
    //       .map(
    //         (item) =>
    //           item.agent_name.trim() + ", " + (item.agent_comapnay_name
    //             ? item.agent_comapnay_name.trim() + ", "
    //             : "")
    //       )
    //   )
    // );
    // const unique3 = Array.from(
    //   new Set(
    //     agents
    //       .slice(0, 60)
    //       .map(
    //         (item) =>
    //           (item.pro_locality ? item.pro_locality.trim() + ", " : "") +
    //           (item.pro_sub_district
    //             ? item.pro_sub_district.trim() + ", "
    //             : "") +
    //           item.pro_city.trim()
    //       )
    //   )
    // );
    console.log(u7);
    const arr = [...unique1, ...uniqueState, ...workCities, ...u7];
    const unique4 = Array.from(
      new Set(arr.slice(0, 200).map((item) => item.trim()))
    );

    const unique = unique4.filter((i) =>
      i.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    console.log("unique : ", unique);
    setSuggestions(unique);
    //console.log("unique : " , unique , unique1 , unique2 , unique3 , unique4)
    let searchWords = searchValue.toLowerCase().split(",");
    //console.log(searchWords)
    const filteredData = agents
      // .filter((code) => {
      //   if (filter === "Sale") {
      //     return code.pro_ad_type === "Sale";
      //   } else if (filter === "Rent") {
      //     return code.pro_ad_type === "Rent";
      //   } else if (filter === "All") {
      //     return true;
      //   }
      // })
      .filter((item) => {
        const itemValues =
          item.agent_city +
          " " +
          item.agent_name +
          " " +
          item.work_city +
          " " +
          item.agent_state;

        return searchWords.every((word) =>
          itemValues.toLowerCase().includes(word)
        );
      });
    //console.log("filteredData : " , filteredData)
    setResults(filteredData);
    //console.log("searchWords : ", searchWords, filteredData);
  }, [searchValue, userLocation, filter, agents]);

  // const records = agents?.slice(firstIndex, lastIndex);
  // const nPages = Math.ceil(agents?.length / recordsPerPage);

  const records =
    searchValue === "" && filter === "All"
      ? agents.slice(firstIndex, lastIndex)
      : results?.slice(firstIndex, lastIndex);

  const nPages = Math.ceil(
    searchValue === "" && filter === "All"
      ? agents.length / recordsPerPage
      : results?.length / recordsPerPage
  );

  return (
    <div>
      <Navbar />
      <section className="main-content">
        <div className="container agent-card-wrapper">
          <div className="title">
            <h2>
              All Agents
              <span className="ml-2 numberProperties">{agents?.length}</span>
            </h2>

            <div className="row align-items-center my-2 mx-1 gap-3">
              <TextField
                variant="outlined"
                className="col-md-9 mx-4 mx-md-0"
                size="small"
                label="Search for agents..."
                placeholder="e.g. Mohit arya "
                value={searchValue}
                onChange={(e) => {
                  setOpenSuggestions(true);
                  setCurrentPage(1);
                  setSearchValue(e.target.value);
                  //handleSearchValue(e.target.value);
                }}
              />

              {/* <div className="col-md-4 mx-4 mx-md-0 pl-0">
                {cityData && (
                  <Autocomplete
                    size="small"
                    //disableClearable
                    id="combo-box-demo"
                    options={cityData.map((option) => option.district)}
                    onInputChange={(event, newInputValue) => {
                      setLocation(newInputValue);
                      //handleUserLocation(newInputValue);
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
              </div> */}

              {/* <FormControl
                sx={{ m: 1, width: ["100%"] }}
                size="small"
                className="col-md-3 mx-4 mx-md-0"
              >
                <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
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
          <div className="row main-conetnt-1">
            <div className="col-md-9 ">
              {records?.map((item) => (
                <div className="content">
                  <div class="agent-card">
                    <div class="firstinfo">
                      <img src="/img/home.jpg" />
                      <div class="profileinfo">
                        <div className="d-flex justify-content-between">
                          <div className="text-wrap text-bold">
                            {item.agent_name}
                          </div>
                          {/* <div className="agent-property">
                            {item.Sale_Count} Property for sale{" "}
                            <span className="border-line"></span>{" "}
                            {item.Rent_Count} Property for rent
                          </div> */}
                          {/* <div className="agent-property">
                            {item.Sale_Count !== 0 ? `Property for sale 
                            <span className="border-line"></span>` : "" }
                            {item.Rent_Count} Property for rent
                          </div> */}

                          {item.Sale_Count !== 0 && item.Rent_Count !== 0 ? (
                            <>
                              <div className="agent-property">
                                <Link
                                  to={`/agentproperties/Sale-${item.user_cnct_id}`}
                                >
                                  {item.Sale_Count} Property for sale{" "}
                                </Link>
                                <span className="border-line"></span>
                                <Link
                                  to={`/agentproperties/Rent-${item.user_cnct_id}`}
                                >
                                  {item.Rent_Count} Property for rent
                                </Link>
                              </div>
                            </>
                          ) : item.Sale_Count !== 0 || item.Rent_Count !== 0 ? (
                            <>
                              <div className="agent-property">
                                <Link
                                  to={`/agentproperties/${
                                    item.Sale_Count > 0 ? "Sale" : "Rent"
                                  }-${item.user_cnct_id}`}
                                >
                                  {item.Sale_Count + " Property for sale" ||
                                    item.Rent_Count + " Property for rent"}
                                </Link>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="company-name">
                          Cal Properties,{" "}
                          {item.agent_locality && item.agent_city
                            ? item.agent_locality + ", " + item.agent_city
                            : item.agent_locality || item.agent_city}
                        </div>
                        <div className="deals-in-area">
                          Deals in Area -{" "}
                        
                          {item.work_city ? (
                            item.work_city
                          ) : item.work_state.length > 80 ? (
                            <>
                              {item.work_state.slice(0, 80)}...
                              <Link title="View Agent Profile" to={`/agentProfile/${item.agent_id}`}>
                                more
                              </Link>
                            </>
                          ) : (
                            item.work_state
                          )}
                        </div>
                        <p class="desc">
                          We are Real Estate Agent in Ludhiana providing Buying,
                          Selling and Renting Services for all types of Property
                          in {item.agent_state}.
                        </p>
                        <div>
                          {item.Sale_Count !== 0 && item.Rent_Count !== 0 ? (
                            <>
                              <div className="agent-property-1">
                                <Link
                                  to={`/agentproperties/Sale-${item.user_cnct_id}`}
                                >
                                  {item.Sale_Count} Property for sale{" "}
                                </Link>
                                <span className="border-line"></span>
                                <Link
                                  to={`/agentproperties/Rent-${item.user_cnct_id}`}
                                >
                                  {item.Rent_Count} Property for rent
                                </Link>
                              </div>
                            </>
                          ) : item.Sale_Count !== 0 || item.Rent_Count !== 0 ? (
                            <>
                              <div className="agent-property-1">
                                <Link
                                  to={`/agentproperties/${
                                    item.Sale_Count > 0 ? "Sale" : "Rent"
                                  }-${item.user_cnct_id}`}
                                >
                                  {item.Sale_Count + " Property for sale" ||
                                    item.Rent_Count + " Property for rent"}
                                </Link>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="badgescard">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex ">
                        <div className="pl-2">
                          <button title="Contact Agent" type="button" class="btn btn-sm interest">
                            <IconSend width="20px" height="20px" />
                            <span className="pl-1">Contact</span>
                          </button>
                        </div>
                        <div className="pl-2">
                          <Link to={`/agentProfile/${item.agent_id}`}>
                            <button
                              type="button"
                              class="btn btn-sm view-profile"
                              title="View Agent Profile"
                            >
                              View Profile
                            </button>
                          </Link>
                        </div>
                      </div>
                      {/* <div className="pr-2 website-link">
                        <a  href="https://calinfo.in/" target="_blank">
                        {item.agent_company_website}
                        </a>
                      </div> */}
                      <div className="pr-2 website-link">
                        <a href={item.agent_company_website} target="_blank">
                          {item.agent_company_website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
          {records?.length > 0 && (
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
      <Footer />
    </div>
  );
};

export default AgentsListing;
