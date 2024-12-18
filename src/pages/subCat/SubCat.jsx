import Navbar from "../../components/navbar/Navbar";
import { useParams, useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {IconCurrentLocation  } from "@tabler/icons-react";
import DateTime from "../../dateTime";
import NoResult from "../../components/noResult/NoResult";
import { Skeleton } from "@mui/material";
import { InputAdornment } from "@mui/material";

import Autocomplete from "@mui/material/Autocomplete";
import { AuthContext } from "../../context/AuthContext";
import PropertyCard from "../../components/propertyCard/PropertyCard";
import Sidebar2 from "../../components/sidebar2/Sidebar2";
import { useNavigate } from "react-router-dom";

const SubCat = () => {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);
  const [skeleton, setSkeleton] = useState(true);
  const [cityData, setCityData] = useState();
  const [userLocation, setUserLocation] = useState(null);
  const [filter, setFilter] = useState("All");
  //let { search } = useParams();
  const pagelocation = useLocation();
  const searchParams = pagelocation.search.split("=")[1];
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    cityData &&
    cityData.filter((item) => item.district === "All India").length === 0
      ? setCityData([...cityData, { district: "All India" }])
      : "";
    if (searchParams !== undefined) {
      //console.log("search : ", searchParams, typeof searchParams);
      setSearchValue(searchParams.replaceAll("%20", " "));
    }

  }, [searchParams, cityData]);

  
  const [location, setLocation] = useState("All India");
  const { cat } = useParams();
  const filCat = cat.replaceAll("-", " ");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [userCurrLocation , setUserCurrLocation] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);


  const handleForSale = (val) => {
    console.log(val)
    navigate(`/${val}`)
  }

  const handleForRent = (val) => {
    console.log(val)
    navigate(`/rental/${val}`)
  }

  // useEffect(() => {
  //   console.log(sideBarValue)
  //   navigate(`/rental/${sideBarValue}`)
  // }, [sideBarValue])

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchPropertyDataByCat/${filCat}`
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
  }, [cat]);

  useEffect(() => {
    data.forEach((item, i) => {
      item.pro_modified_id = 5000 + parseInt(item.pro_id);
    });
  }, [data]);

  
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/StateDistinctCityData`)
      .then((res) => {
        setCityData(res.data);
      });
  }, []);


  // useEffect(() => {
  //   cityData &&
  //   cityData.filter((item) => item.district === "All India").length === 0
  //     ? setCityData([...cityData, { district: "All India" }])
  //     : "";
  // }, [cityData]);

  

  // const [records, setRecords] = useState([]);
  // const [nPages, setNPages] = useState(0);

  // const handleRecordsChange = (newRecords) => {
  //   setRecords(newRecords);
  // };

  // const handleNPagesChange = (newNPages) => {
  //   setNPages(newNPages);
  // };

  const handleSearchValue = (value) => {
    //console.log(value);
    setSearchValue(value);
  };

  

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
  }, [searchValue, userLocation,filter, data]);
  
  const records =
    searchValue === "" && filter === "All"
    ? data.slice(firstIndex, lastIndex)
      : results.slice(firstIndex, lastIndex);
      
  const nPages = Math.ceil(
    searchValue === "" && filter === "All"
      ? data.length / recordsPerPage
      : results.length / recordsPerPage
      
  );

  // const handleSearchValue = (value) => {
  //   console.log(value);
  //   setSearchValue(value);
  // };

  const handleUserLocation = (value) => {
    setUserCurrLocation(value);
  };

  console.log("serach value : " , searchValue)

  return (
    <div>

      <Helmet>
  <title>Propertyease - {filCat}</title>
  {cat === "apartment" ? (
    <meta
      name="description"
      content="Browse through a selection of apartments for sale, from modern studios to expansive family units. Find a perfect fit for your lifestyle in well-connected neighborhoods with top amenities."
    />
  ) : cat === "independent-house" ? (
    <meta
      name="description"
      content="Purchase an independent house offering privacy, ample space, and freedom to customize. Enjoy quiet living with large gardens and easy access to key locations."
    />
  ) : cat === "builder-floor" ? (
    <meta
      name="description"
      content="Invest in a builder floor that combines independent living with modern convenience. Spacious layouts, modern designs, and the benefit of a low-maintenance home."
    />
  ) : cat === "farm-house" ? (
    <meta
      name="description"
      content="Own a farmhouse set in serene countryside surroundings. Ideal for those looking for peace and tranquility, these properties offer large plots for agricultural use or relaxation."
    />
  ) : cat === "retirement-community" ? (
    <meta
      name="description"
      content="Buy a property in a retirement community that offers peace of mind, comfortable living, and dedicated amenities to support an active and independent lifestyle."
    />
  ) : cat === "studio-apartment" ? (
    <meta
      name="description"
      content="Find compact and efficient studio apartments for sale. Perfect for singles or couples looking for a stylish and affordable living space with easy access to city life."
    />
  ) : cat === "residential-land" ? (
    <meta
      name="description"
      content="Purchase residential land in desirable locations and build the home of your dreams. These plots provide flexibility and ample space to create your vision."
    />
  ) : cat === "commercial-land" ? (
    <meta
      name="description"
      content="Invest in prime commercial land perfect for retail, office, or mixed-use developments. These high-visibility plots are ideal for setting up successful ventures."
    />
  ) : cat === "industrial-land" ? (
    <meta
      name="description"
      content="Purchase industrial land to set up manufacturing units, warehouses, or logistics facilities. Offering spacious plots in strategic locations with easy access to major transport routes."
    />
  ) : cat === "agricultural-land" ? (
    <meta
      name="description"
      content="Buy agricultural land with fertile soil and abundant space, ideal for farming, livestock, or other agricultural ventures. A smart investment for long-term growth."
    />
  ) : cat === "farm-house-land" ? (
    <meta
      name="description"
      content="Purchase land for a farmhouse, offering large plots in peaceful rural areas. Perfect for building a retreat, starting agricultural projects, or enjoying country living."
    />
  ) : cat === "retail-showroom" ? (
    <meta
      name="description"
      content="Buy a retail showroom in bustling commercial areas with excellent foot traffic. A great investment for displaying your products and growing your business in a high-demand location."
    />
  ) : cat === "commercial-building" ? (
    <meta
      name="description"
      content="Purchase a commercial building offering versatile spaces for offices, retail shops, or mixed-use purposes. Situated in key business districts, it's a solid investment for business owners."
    />
  ) : cat === "office-complex" ? (
    <meta
      name="description"
      content="Invest in an office complex that offers flexible workspaces, ideal for businesses of all sizes. These modern facilities are well-located and ready to accommodate your growing workforce."
    />
  ) : cat === "software-technology-park" ? (
    <meta
      name="description"
      content="Buy office spaces in a cutting-edge technology park designed for tech companies. Modern infrastructure, high-speed internet, and access to an innovation-driven ecosystem make these spaces ideal for growth."
    />
  ) : cat === "warehouse" ? (
    <meta
      name="description"
      content="Invest in warehouse space offering ample storage capacity and secure facilities. Perfect for distribution, inventory management, or logistics companies looking for operational efficiency."
    />
  ) : cat === "industrial-estate" ? (
    <meta
      name="description"
      content="Purchase land in an industrial estate equipped with the infrastructure needed for large-scale operations. Ideal for businesses looking to expand or start manufacturing, storage, or logistics."
    />
  ) : (
    <meta
      name="description"
      content="Discover your ideal property for sale at PropertyEase.in. From luxurious homes to commercial land, explore a diverse range of listings to suit your investment or lifestyle needs."
    />
  )}
</Helmet>

        
  
      <Navbar />

      <div className={"main "}>
        <section className="main-content">
          <div className="container">
            <div className="title">
              <h2 className="text-capitalize">{filCat}</h2>

              {/* <SearchBar
                handleNPagesChange={handleNPagesChange}
                handleRecordsChange={handleRecordsChange}
                data={data}
                handleSearchValue={handleSearchValue}
                searchValue={searchValue}
                searchParams={searchParams}
              /> */}
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
            <MenuItem value={"Commercial"}>Commercial</MenuItem>
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
                    <PropertyCard
                object={object}
                index={index}
                currentUser={currentUser}
                DateTime={DateTime}
              />
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
                  <NoResult searchValue={searchValue} userCurrLocation={userCurrLocation} handleSearchValue={handleSearchValue}  />
                )}
              </div>

              <div className="col-md-3">
                <Sidebar2 cat={cat} handleForSale={handleForSale} handleForRent={handleForRent}/>
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

export default SubCat;
