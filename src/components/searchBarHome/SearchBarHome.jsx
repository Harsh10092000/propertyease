import React, { useEffect, useState } from "react";
import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import {
  IconBrandWhatsapp,
  IconMapPin,
  IconCurrentLocation,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { Snackbar } from "@mui/material";

const SearchBarHome = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const lastIndex = props.currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [searchValue1, setSearchValue1] = useState("");
  const [adFilter , setAdFilter] = useState("All");
  const [filter2, setFilter2] = useState("All");
  const [location, setLocation] = useState("All India");
  const [snack, setSnack] = useState(false);
  const [cityData, setCityData] = useState();
  const [proSubTypeFilter, setProSubTypeFilter] = useState([
    "Apartment",
    "Independent House",
    "Builder Floor",
    "Farm HouseRaw House",
    "Retirement Community",
    "Studio Apartment",
    "Residential Land",
    "Commercial Land",
    "Industrial Land",
    "Agricultural Land",
    "Farm House Land",
    "Retail Showroom",
    "Commercial Building",
    "Office Complex",
    "Software Technology Park",
    "Warehouse",
    "Industrial Estate",
  ]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/StateDistinctCityData`)
      .then((res) => {
        setCityData(res.data);
      });
  }, []);

  const propertyType1 = [
    { id: "t1", type: "Apartment", parent_type: "Residential" },
    { id: "t2", type: "Independent House", parent_type: "Residential" },
    { id: "t3", type: "Builder Floor", parent_type: "Residential" },
    { id: "t4", type: "Farm HouseRaw House", parent_type: "Residential" },
    { id: "t5", type: "Retirement Community", parent_type: "Residential" },
    { id: "t6", type: "Studio Apartment", parent_type: "Residential" },
    { id: "t7", type: "Residential Land", parent_type: "Land" },
    { id: "t8", type: "Commercial Land", parent_type: "Land" },
    { id: "t9", type: "Industrial Land", parent_type: "Land" },
    { id: "t10", type: "Agricultural Land", parent_type: "Land" },
    { id: "t11", type: "Farm House Land", parent_type: "Land" },

    { id: "t12", type: "Retail Showroom", parent_type: "Commercial" },
    { id: "t13", type: "Commercial Building", parent_type: "Commercial" },
    { id: "t14", type: "Office Complex", parent_type: "Commercial" },
    { id: "t15", type: "Software Technology Park", parent_type: "Commercial" },
    { id: "t16", type: "Warehouse", parent_type: "Commercial" },
    { id: "t18", type: "Industrial Estate", parent_type: "Commercial" },
  ];

  useEffect(() => {
    if (props.searchValue1 !== null && props.searchValue1 !== "") {
      setSearchValue1(props.searchValue1);
      setAdFilter(props.proAdTypeFilter);
      //setProSubTypeFilter(props.proSubTypeFilter)

      // const a = props.proSubTypeFilter.split("-");
      // setProSubTypeFilter(() => {
      //   const matchedTypes = a.map((id) => {
      //     const property = propertyType1.find((property) => property.id === id);
      //     return property.type;
      //   });
      //   return [...matchedTypes];
      // });
      //console.log(matchedTypes);


      
      //   const replacedValues = a.map((key) => proTypes.find((obj) => obj[key]));
      //   setProSubTypeFilter((prevProSubTypeFilter) => {
      //     const updatedTypes = replacedValues.map((item) => {
      //       return Object.values(item);
      //     });
      //     console.log(replacedValues, updatedTypes);
      //     const flatArray = updatedTypes.flatMap((innerArray) => innerArray);
      //     console.log(flatArray);
      //     return [...flatArray];
      //   });
    } else {
      setSearchValue1("");
    }
  }, [props.searchValue1]);

  useEffect(() => {
    if (props.searchParams !== undefined) {
      setSearchValue1(props.searchParams.replaceAll("%20", " "));
    }
  }, [props.searchParams]);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, showError);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function showError(error) {
    console.log("error : ", error);
    if (error.PERMISSION_DENIED) {
      alert("User Denied the request for Geolocation");
    }
  }

  useEffect(() => {
    cityData &&
    cityData.filter((item) => item.district === "All India").length === 0
      ? //setCityData([...cityData, { district: "All India" }])
        cityData.unshift({ district: "All India" })
      : "";
  }, [cityData]);

  const cities = [{ district: "All India" }];

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=825008d9e23247daa5600c3878106833`
      )
      .then((res) => {
        setLocation(res.data.features[0].properties.city.trim());
        props.handleUserLocation(res.data.features[0].properties.city.trim());
        setSearchValue1("");
        props.handleSearchValue("");
      });
  }

  useEffect(() => {
    handleLocationClick;
  }, []);

  const [filteredDataByCity, setFilteredDataByCity] = useState();
  useEffect(() => {
    const data = props.data.filter(
      (item) => item.pro_city.toLowerCase() == location.toLowerCase()
    );
    setFilteredDataByCity(data);
  }, [location]);

  const [results, setResults] = useState();
  useEffect(() => {
    const unique1 = Array.from(
      new Set(props.data.slice(0, 60).map((item) => item.pro_city.trim()))
    );
    const uniqueState = Array.from(
      new Set(props.data.slice(0, 60).map((item) => item.pro_state.trim()))
    );

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

    const unique4 = Array.from(
      new Set(arr.slice(0, 200).map((item) => item.trim()))
    );
    const unique = unique4.filter((i) =>
      i.toLowerCase().startsWith(searchValue1.toLowerCase())
    );

    setSuggestions(unique);
    let searchWords = searchValue1?.toLowerCase().split(",");

    const filteredData = props.data
      .filter((code) => {
        if (adFilter === "Sale") {
          return code.pro_ad_type === "Sale";
        } else if (adFilter === "Rent") {
          return code.pro_ad_type === "Rent";
        } else if (adFilter === "All") {
          return true;
        }
      })
      .filter((code2) => {
        if (filter2 === "Residential") {
          return code2.pro_type.split(",")[1] == "Residential";
        } else if (filter2 === "Commercial") {
          return code2.pro_type.split(",")[1] == "Commercial";
        } else if (filter2 === "Land") {
          return code2.pro_type.split(",")[1] == "Land";
        } else if (filter2 === "All") {
          return true;
        }
      })
      .filter((item) => {
        const result = proSubTypeFilter.includes(item.pro_type.split(",")[0]);

        if (result === true) {
          return item;
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
    console.log("filteredData : ", filteredData);
    setResults(filteredData);
  }, [
    props.proSubTypeFilter,
    props.proTypeFilter,
    props.data,
    props.searchValue1,
    searchValue1,
    adFilter,
    props.searchValue,
    props.searchParams,
    filteredDataByCity,
    proSubTypeFilter,
    filter2,
  ]);



//   useEffect(() => {
//     const filteredData = props.data.filter(code => {
//         const adTypeMatch = filter === "All" || code.pro_ad_type === filter;
//         const propertyTypeMatch = filter2 === "All" ||
//             (filter2 === "Residential" && code.pro_type.split(",")[1] === "Residential") ||
//             (filter2 === "Commercial" && code.pro_type.split(",")[1] === "Commercial") ||
//             (filter2 === "Land" && code.pro_type.split(",")[1] === "Land");

//         const subtypeMatch = proSubTypeFilter.includes(code.pro_type.split(",")[0]);

//         const searchWords = searchValue1?.toLowerCase().split(",");
//         const itemValues =
//             (code.pro_locality || "") + " " +
//             code.pro_city + " " +
//             (code.pro_sub_district || "") + " " +
//             (code.pro_street || "") + " " +
//             code.pro_state;

//         const searchMatch = !searchWords ||
//             searchWords.every(word => itemValues.toLowerCase().includes(word.trim()));

//         return adTypeMatch && propertyTypeMatch && subtypeMatch && searchMatch;
//     });

//     console.log("filteredData : ", filteredData);
//     setResults(filteredData);
// }, [
//     props.proSubTypeFilter,
//     props.proTypeFilter,
//     props.data,
//     props.searchValue1,
//     searchValue1,
//     filter,
//     filter2,
// ]);


  const [selectedTypes, setSelectedTypes] = useState([]);
  const propertyType = [
    { type: "Apartment" },
    { type: "Independent House" },
    { type: "Builder Floor" },
    { type: "Farm HouseRaw House" },
    { type: "Retirement Community" },
    { type: "Studio Apartment" },
    { type: "Residential Land" },
    { type: "Commercial Land" },
    { type: "Industrial Land" },
    { type: "Agricultural Land" },
    { type: "Farm House Land" },
    { type: "Retail Showroom" },
    { type: "Commercial Building" },
    { type: "Office Complex" },
    { type: "Software Technology Park" },
    { type: "Warehouse" },
    { type: "Industrial Estate" },
  ];

  const handleTypeToggle = (type) => {
    props.handleCurrentPage(1);
    if (proSubTypeFilter.includes(type)) {
      setProSubTypeFilter(proSubTypeFilter.filter((item) => item !== type));
    } else {
      setProSubTypeFilter([...proSubTypeFilter, type]);
    }
  };

  const handleAllTypes = () => {
    setProSubTypeFilter((prevSelectedTypes) => {
      const updatedTypes = propertyType1
        .map((item) => item.type)
        .filter((type) => !prevSelectedTypes.includes(type));
      return [...prevSelectedTypes, ...updatedTypes];
    });
  };

  // useEffect(() => {
  //   // const records =
  //   // searchValue1 === "" && filter === "All"
  //   //   ? props.data.slice(firstIndex, lastIndex)
  //   //   : results.slice(firstIndex, lastIndex);

  //   const records = results?.slice(firstIndex, lastIndex);

  //   // const nPages = Math.ceil(
  //   //   searchValue1 === "" && filter === "All"
  //   //     ? props.data.length / recordsPerPage
  //   //     : results.length / recordsPerPage
  //   // );

  //   const nPages = Math.ceil(results?.length / recordsPerPage);

  //   props.handleRecordsChange(records);
  //   props.handleNPagesChange(nPages);
  // }, [results, props.data ]);

  // const records =
  //   searchValue1 === "" && filter === "All"
  //     ? props.data.slice(firstIndex, lastIndex)
  //     : results.slice(firstIndex, lastIndex);

  // const nPages = Math.ceil(
  //   searchValue1 === "" && filter === "All"
  //     ? props.data.length / recordsPerPage
  //     : results.length / recordsPerPage
  // );

  const records = results?.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(results?.length / recordsPerPage);

  useEffect(() => {
    props.handleRecordsChange(records);
    props.handleNPagesChange(nPages);
  }, [records, nPages]);

  useEffect(() => {
    setSearchValue1(props.searchValue);
  }, [props.searchValue]);

  return (
    <>
      <div className="row align-items-center my-2 mx-1 gap-3">
        <TextField
          variant="outlined"
          className="col-md-4 mx-4 mx-md-0"
          size="small"
          label="Search for properties..."
          placeholder="e.g. Sector 7 "
          value={searchValue1}
          onChange={(e) => {
            setOpenSuggestions(true);
            //setCurrentPage(1);
            props.handleCurrentPage(1);
            setSearchValue1(e.target.value);
            props.handleSearchValue(e.target.value);
          }}
        />

        <div className="col-md-3 mx-4 mx-md-0 pl-0">
          {cityData ? (
            <Autocomplete
              size="small"
              //disableClearable
              id="combo-box-demo"
              options={cityData.sort().map((option) => option.district)}
              onInputChange={(event, newInputValue) => {
                setLocation(newInputValue);
                props.handleUserLocation(newInputValue);
                setSearchValue1("");
                props.handleSearchValue("");
              }}
              sx={{ m: 1, width: ["100%"] }}
              value={location}
              slotProps={{
                popper: {
                  sx: {
                    zIndex: 1,
                  },
                },
              }}
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
          ) : (
            <Autocomplete
              size="small"
              id="combo-box-demo"
              options={cities.map((option) => option.district)}
              sx={{ m: 1, width: ["100%"] }}
              value={location}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        title="Detect your current location"
                      >
                        <IconCurrentLocation className="pointer location-icon" />
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
          className="col-md-2 mx-4 mx-md-0"
        >
          <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={adFilter}
            label="Filter By"
            onChange={(e) => {
              setAdFilter(e.target.value),
                setCurrentPage(1),
                props.handleCurrentPage(1);
            }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Sale"}>Sale</MenuItem>
            <MenuItem value={"Rent"}>Rent</MenuItem>
          </Select>
        </FormControl>
        <FormControl
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
            <MenuItem value={"Commercial"}>Commercial</MenuItem>
            <MenuItem value={"Land"}>Land/Plots</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* <div className="d-flex flex-wrap">
        {proSubTypeFilter.length === 17 ? (
          <div
            onClick={() => setProSubTypeFilter([])}
            className={`pro_radio_btn_1 pro_selected `}
          >
            <IconMinus width={16} height={16} className="mr-1" stroke={1} />
            Deselect All
          </div>
        ) : (
          <div
            onClick={handleAllTypes}
            className={`pro_radio_btn_1 text-center d-flex align-items-center`}
          >
            <IconPlus width={16} height={16} className="mr-1" />
            Select All
          </div>
        )}
        {propertyType1.map((item) =>
          filter2 === item.parent_type || filter2 === "All" ? (
            <div
              className={`pro_radio_btn_1 ${
                proSubTypeFilter?.includes(item.type) ? " pro_selected" : ""
              }`}
              onClick={() => handleTypeToggle(item.type)}
            >
              {item.type}
            </div>
          ) : (
            <div
              className={`pro_radio_btn_1 no-pointer disabled-color ${
                proSubTypeFilter?.includes(item.type) ? " pro_selected" : ""
              }`}
            >
              {item.type}
            </div>
          )
        )}
      </div> */}
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

export default SearchBarHome
