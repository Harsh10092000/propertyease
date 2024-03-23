import React, { useEffect, useState } from "react";
import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import {
  IconBrandWhatsapp,
  IconMapPin,
  IconCurrentLocation,
} from "@tabler/icons-react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
const SearchBar = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [searchValue1, setSearchValue1] = useState("");
  const [filter, setFilter] = useState("All");
  const [filter2, setFilter2] = useState("All");
  const [location, setLocation] = useState("All India");

  const [cityData, setCityData] = useState();
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/StateDistinctCityData`)
      .then((res) => {
        setCityData(res.data);
      });
  }, []);

  useEffect(() => {
    if (props.searchParams !== undefined) {
      //console.log("search : ", props.searchParams, typeof props.searchParams);
      setSearchValue1(props.searchParams.replaceAll("%20", " "));
    }
  }, [props.searchParams]);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("Geolocation not supported");
    }
  }

  useEffect(() => {
    cityData &&
    cityData.filter((item) => item.district === "All India").length === 0
      ? setCityData([...cityData, { district: "All India" }])
      : "";
  }, []);

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
        //setSearchValue1(res.data.features[0].properties.city.trim());
        //props.handleSearchValue(res.data.features[0].properties.city.trim());
        setLocation(res.data.features[0].properties.city.trim());
        props.handleUserLocation(res.data.features[0].properties.city.trim());
        setSearchValue1("");
        props.handleSearchValue("");
        //setSearchValue1(res.data.address.city);
        //setSearchValue1("kurukshetra");
      });
  }

  //console.log("props.handleSearchValue : " , props.handleSearchValue)

  //console.log("serach value : " , searchValue1)
  const [filteredDataByCity, setFilteredDataByCity] = useState();
  useEffect(() => {
    const data = props.data.filter(
      (item) => item.pro_city.toLowerCase() == location.toLowerCase()
    );
    setFilteredDataByCity(data);
  }, [location]);

  const [results, setResults] = useState();
  useEffect(() => {
    // const unique1 = Array.from(
    //   new Set(
    //     (location !== "All India" || location !== "")
    //       ? props.data.slice(0, 60).map((item) => item.pro_city.trim())
    //       : filteredDataByCity.slice(0, 60).map((item) => item.pro_city.trim())
    //   )
    // );
    // const uniqueState = Array.from(
    //   new Set(
    //     (location !== "All India" || location !== "")
    //       ? props.data.slice(0, 60).map((item) => item.pro_state.trim())
    //       : filteredDataByCity.slice(0, 60).map((item) => item.pro_state.trim())
    //   )
    // );
    const unique1 = Array.from(
      new Set(props.data.slice(0, 60).map((item) => item.pro_city.trim()))
    );
    const uniqueState = Array.from(
      new Set(props.data.slice(0, 60).map((item) => item.pro_state.trim()))
    );

    // const unique2 = Array.from(
    //   new Set(
    //     (location !== "All India" || location !== "")
    //       ? props.data
    //           .slice(0, 60)
    //           .map(
    //             (item) =>
    //               (item.pro_sub_district
    //                 ? item.pro_sub_district.trim() + ", "
    //                 : "") + item.pro_city.trim()
    //           )
    //       : filteredDataByCity
    //           .slice(0, 60)
    //           .map(
    //             (item) =>
    //               (item.pro_sub_district
    //                 ? item.pro_sub_district.trim() + ", "
    //                 : "") + item.pro_city.trim()
    //           )
    //   )
    // );
    // const unique3 = Array.from(
    //   new Set(
    //     (location !== "All India" || location !== "")
    //       ? props.data
    //           .slice(0, 60)
    //           .map(
    //             (item) =>
    //               (item.pro_locality ? item.pro_locality.trim() + ", " : "") +
    //               (item.pro_sub_district
    //                 ? item.pro_sub_district.trim() + ", "
    //                 : "") +
    //               item.pro_city.trim()
    //           )
    //       : filteredDataByCity
    //           .slice(0, 60)
    //           .map(
    //             (item) =>
    //               (item.pro_locality ? item.pro_locality.trim() + ", " : "") +
    //               (item.pro_sub_district
    //                 ? item.pro_sub_district.trim() + ", "
    //                 : "") +
    //               item.pro_city.trim()
    //           )
    //   )
    // );

    const unique2 = Array.from(
      new Set(
        props.data
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
        props.data
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

    //console.log(unique1, uniqueState, unique2, unique3, arr);
    const unique4 = Array.from(
      new Set(arr.slice(0, 200).map((item) => item.trim()))
    );
    const unique = unique4.filter((i) =>
      i.toLowerCase().startsWith(searchValue1.toLowerCase())
    );
    //console.log(unique, filteredDataByCity, location);
    //console.log(location === "" ? props.data : filteredDataByCity);
    setSuggestions(unique);
    let searchWords = searchValue1?.toLowerCase().split(",");
    //const filteredData = (location === "" ? props.data : filteredDataByCity)
    const filteredData = props.data
      .filter((code) => {
        if (filter === "Sale") {
          return code.pro_ad_type === "Sale";
        } else if (filter === "Rent") {
          return code.pro_ad_type === "Rent";
        } else if (filter === "All") {
          return true;
        }
      })
      // .filter((code2) => {
      //   if (filter2 === "Residential") {
      //     return code2.pro_type.split(",")[1] == "Residential";
      //   } else if (filter2 === "Commercial") {
      //     return code2.pro_type.split(",")[1] == "Commercial";
      //   } else if (filter2 === "Land") {
      //     return code2.pro_type.split(",")[1] == "Land";
      //   } else if (filter2 === "All") {
      //     return true;
      //   }
      // })
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

        console.log(
          "itemValues : ",
          itemValues,
          searchWords,
          props.searchValue
        );
        return searchWords.every((word) =>
          itemValues.toLowerCase().includes(word)
        );
      });
    setResults(filteredData);
  }, [
    searchValue1,
    //location,
    filter,
    props.searchValue,
    props.searchParams,
    filteredDataByCity,
  ]);
  //console.log("props.searchValue : " ,  props.searchValue)
  // const records =
  //   searchValue1 === "" && filter === "All"
  //     ? props.data.slice(firstIndex, lastIndex)
  //     : results.slice(firstIndex, lastIndex);

  // const records =
  //   searchValue1 !== "" && filter !== "All" && (location !== "All India" || location !== "")
  //     ? results.slice(firstIndex, lastIndex)
  //     : props.data.slice(firstIndex, lastIndex);

  // const nPages = Math.ceil(
  //   searchValue1 !== "" && filter !== "All" && (location !== "All India" || location !== "")
  //     ? results.length / recordsPerPage
  //     : props.data.length / recordsPerPage
  // );

  const records =
    searchValue1 === "" && filter === "All"
      ? props.data.slice(firstIndex, lastIndex)
      : results.slice(firstIndex, lastIndex);

  const nPages = Math.ceil(
    searchValue1 === "" && filter === "All"
      ? props.data.length / recordsPerPage
      : results.length / recordsPerPage
  );

  useEffect(() => {
    props.handleRecordsChange(records);
    props.handleNPagesChange(nPages);
  }, [records, nPages]);

  useEffect(() => {
    setSearchValue1(props.searchValue)
  }, [props.searchValue])

  // useEffect(() => {
  //   if (location === "") {
  //     setLocation("All India");
  //     props.handleUserLocation("All India");
  //   }
  // }, [location]);

  // console.log(
  //   "searchValue1 || props.searchValue : ",
  //   searchValue1 || props.searchValue
  // );
  //console.log("searchValue1  : " , searchValue1 );
  //console.log("location  : ", location);
  return (
    <>
      <div className="row align-items-center my-2 mx-1 gap-3">
        <TextField
          variant="outlined"
          className="col-md-5 mx-4 mx-md-0"
          size="small"
          label="Search for properties..."
          placeholder="e.g. Sector 7 "
          value={searchValue1}
          onChange={(e) => {
            setOpenSuggestions(true);
            setCurrentPage(1);
            setSearchValue1(e.target.value);
            props.handleSearchValue(e.target.value);
          }}
        />

        <div className="col-md-3 mx-4 mx-md-0 pl-0">
          {cityData && (
            <Autocomplete
              size="small"
              disableClearable
              id="combo-box-demo"
              options={cityData.map((option) => option.district)}
              onInputChange={(event, newInputValue) => {
                setLocation(newInputValue);
                props.handleUserLocation(newInputValue);
                setSearchValue1("");
                props.handleSearchValue("");
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
        searchValue1 !== "" &&
        searchValue1 !== null &&
        suggestions !== null &&
        suggestions !== "" &&
        suggestions.length > 0 && (
          <div className="col-md-9 mx-4 mx-md-0 search-suggestions pt-2 shadow pb-2">
            {suggestions.map((item) => (
              <div
                className="py-2 pl-2 suggesion-item pointer"
                onClick={() => {
                  setSearchValue1(item), setOpenSuggestions(false);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
    </>
  );
};

export default SearchBar;
