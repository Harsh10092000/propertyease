import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import DateTime from "../../dateTime";
import NoResult from "../../components/noResult/NoResult";
import { Skeleton } from "@mui/material";
import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Footer from "../../components/footer/Footer";
import PropertyCard from "../../components/propertyCard/PropertyCard";
import Navbar from "../../components/navbar/Navbar";
import Sidebar2 from "../../components/sidebar2/Sidebar2";


const Rent = () => {
  const { cat } = useParams();
  const filCat = cat.replaceAll("-", " ");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [cityData, setCityData] = useState([]);
  const [filter, setFilter] = useState("All");
  const pagelocation = useLocation();
  const searchParams = new URLSearchParams(pagelocation.search).get("search");

  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [userCurrLocation , setUserCurrLocation] = useState("");
  const [results, setResults] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (searchParams !== null) {
      setSearchValue(searchParams.replaceAll("%20", " "));
    }
  }, [searchParams]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/rentalProperty/${filCat}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error("Error fetching rental properties:", error));
    
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertySubCatNo`)
      .then((res) => {
        setSubData(res.data);
      })
      .catch((error) => console.error("Error fetching property subcategories:", error));
    
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/rentalPropertyTotal`)
      .then((res) => {
        setRentData(res.data);
      })
      .catch((error) => console.error("Error fetching rental property totals:", error));
    
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/StateDistinctCityData`)
      .then((res) => {
        const modifiedData = [...res.data];
        if (!modifiedData.some(item => item.district === "All India")) {
          modifiedData.push({ district: "All India" });
        }
        setCityData(modifiedData);
      })
      .catch((error) => console.error("Error fetching distinct city data:", error));
  }, [cat]);

  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("Geolocation not supported");
    }
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    axios
      .get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=825008d9e23247daa5600c3878106833`)
      .then((res) => {
        setLocation(res.data.features[0].properties.city.trim());
        setSearchValue("");
      })
      .catch((error) => console.error("Error fetching geolocation data:", error));
  };

  useEffect(() => {
    const unique1 = Array.from(new Set(data.slice(0, 60).map((item) => item.pro_city.trim())));
    const uniqueState = Array.from(new Set(data.slice(0, 60).map((item) => item.pro_state.trim())));
    const unique2 = Array.from(new Set(data.slice(0, 60).map((item) => (item.pro_sub_district ? item.pro_sub_district.trim() + ", " : "") + item.pro_city.trim())));
    const unique3 = Array.from(new Set(data.slice(0, 60).map((item) => (item.pro_locality ? item.pro_locality.trim() + ", " : "") + (item.pro_sub_district ? item.pro_sub_district.trim() + ", " : "") + item.pro_city.trim())));
    const arr = [...unique1, ...uniqueState, ...unique2, ...unique3];
    const unique4 = Array.from(new Set(arr.slice(0, 200).map((item) => item.trim())));
    const unique = unique4.filter((i) => i.toLowerCase().startsWith(searchValue.toLowerCase()));
    setSuggestions(unique);
    
    const searchWords = searchValue.toLowerCase().split(",");
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
    setResults(filteredData);
  }, [searchValue, filter, data]);

  const records =
    searchValue === "" && filter === "All"
      ? data.slice(firstIndex, lastIndex)
      : results.slice(firstIndex, lastIndex);

  const nPages = Math.ceil(
    searchValue === "" && filter === "All"
      ? data.length / recordsPerPage
      : results.length / recordsPerPage
  );

  const navigate = useNavigate();
  const handleForSale = (val) => {
    console.log(val)
    navigate(`/${val}`)
  }

  const handleForRent = (val) => {
    console.log(val)
    navigate(`/rental/${val}`)
  }
 

  return (
    <div>
      <Helmet>
        <title>Propertyease - {filCat}</title>
      </Helmet>
      <Navbar />
      <div className={"main padding-top"}>
        <section className="main-content">
          <div className="container">
            <div className="title">
              <h2 className="text-capitalize">{filCat}</h2>
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
                  }}
                />
                <FormControl
                  sx={{ m: 1, width: ["100%"] }}
                  size="small"
                  className="col-md-3 mx-4 mx-md-0 pl-0"
                >
                  <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="Filter By"
                    onChange={(e) => {
                      setFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Sale"}>Sale</MenuItem>
                    <MenuItem value={"Rent"}>Rent</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="row">
              <div className="col-md-9">
            {records.length > 0 ? (
              records.map((object, index) => (
                <PropertyCard
                object={object}
                index={index}
                currentUser={currentUser}
                DateTime={DateTime}
              />
              ))
            ) : (
              <div className="row gap-3">
                <NoResult />
              </div>
            )}
</div>
<div className="col-md-3">
                {/* <div>
                  <div className="p-1 shadow">
                    <div className="p-3 font-weight-bold text-black">
                      For Sale
                    </div>
                    {subData.map((sub, index) => (
                      <Link
                        onClick={() => setSearchValue("")}
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
                <div className="pt-2">
                  <div className="p-1 shadow">
                    <div className="p-3 font-weight-bold text-black">Rent</div>
                    {rentData.map((rent, index) => (
                      <Link
                        to={`/rental/${rent.pro_type
                          .split(",")[0]
                          .replaceAll(" ", "-")
                          .toLowerCase()}`}
                        key={index}
                        // className={
                        //   rent.pro_type.split(",")[0] === cat
                        //     ? "text-primary m-0"
                        //     : "text-secondary m-0"
                        // }
                      >
                        <div className="d-flex justify-content-between px-3 py-2">
                          <div>{rent.pro_type.split(",")[0]}</div>
                          <div>({rent.pro_sub_cat_number})</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div> */}
                <Sidebar2 handleForSale={handleForSale} handleForRent={handleForRent}/>
              </div>
              </div>
            {records.length > 0 && (
              <Pagination
                page={currentPage}
                count={nPages}
                color="primary"
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

export default Rent;
