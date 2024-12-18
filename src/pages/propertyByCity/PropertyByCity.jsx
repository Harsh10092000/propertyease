import Navbar from "../../components/navbar/Navbar";
import { Link, useParams, useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IconBrandWhatsapp, IconMapPin, IconCurrentLocation  } from "@tabler/icons-react";
import DateTime from "../../dateTime";
import NoResult from "../../components/noResult/NoResult";
import { Skeleton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import Autocomplete from "@mui/material/Autocomplete";
import { city } from "../addProperty/City";

import PropertyCard from "../../components/propertyCard/PropertyCard";

const PropertyByCity = () => {
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
  const { adType } = useParams();
  const { proType } = useParams();
  //const { proCity } = useParams();

  const adTypeData = adType[0].toUpperCase() + adType.slice(1)

  //const proCity = "Kurukshetra";
  //console.log("proType : " , proType , proCity, adTypeData);
  const filCat = proType.replaceAll("-", " ");
  //const filCat = "independent-house";
  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [moreData, setMoreData] = useState([]);
  
  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [userCurrLocation , setUserCurrLocation] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    // axios
    //   .get(
    //     import.meta.env.VITE_BACKEND +
    //       `/api/pro/fetchPropertyDataByCatAndCity/${adTypeData}/${filCat}/${proCity}`
    //   )
    //   .then((res) => {
    //     setData(res.data);
    //     console.log("fetchPropertyDataByCatAndCity : " , res.data)
    //     setSkeleton(false);
    //   });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchPropertyDataByCatAndCity/${adTypeData}/${filCat}`
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
      .get(import.meta.env.VITE_BACKEND + `/api/pro/moreProperties/${adTypeData}`)
      .then((res) => {
        setMoreData(res.data);
      });
      
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/rentalPropertyTotal`)
      .then((res) => {
        setRentData(res.data);
      });
  }, [proType]);

  

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


  const handleSearchValue = (value) => {
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

  

  const handleUserLocation = (value) => {
    setUserCurrLocation(value);
  };

  console.log("serach value : " , searchValue)

  return (
    <div className="">
      <Helmet>
  <title>Propertyease - {filCat}</title>
  {proType === "apartment" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Explore a range of rental apartments available for individuals and families. From cozy studios to spacious multi-bedroom apartments, enjoy modern living with all the essential amenities."
          : "Buy stylish apartments in prime locations offering modern designs, comfortable layouts, and easy access to schools, shopping centers, and transportation hubs."
      }
    />
  ) : proType === "independent-house" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Find independent houses for rent that offer spacious living areas, private gardens, and a peaceful environment. Ideal for families seeking comfort and privacy."
          : "Purchase independent houses with ample space, outdoor areas, and the freedom to personalize. Perfect for those looking for privacy and a serene lifestyle."
      }
    />
  ) : proType === "builder-floor" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent builder floors that offer privacy and independent living. Enjoy spacious floors with convenient access to amenities and excellent connectivity."
          : "Buy builder floors offering spacious layouts and modern amenities. Enjoy the privacy of independent living in a vibrant neighborhood."
      }
    />
  ) : proType === "farm-house" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent farmhouses that provide peaceful rural living with expansive outdoor spaces. Ideal for relaxation or agricultural activities, away from the city hustle."
          : "Buy farmhouses offering large plots of land, perfect for farming or creating your own rural retreat. Enjoy tranquility and natural beauty."
      }
    />
  ) : proType === "retirement-community" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent homes in dedicated retirement communities designed for comfort, safety, and social interaction. Enjoy a peaceful environment with senior-friendly amenities."
          : "Invest in a retirement community home that offers comfort, security, and a fulfilling lifestyle for seniors. Perfect for those looking for peace of mind in their later years."
      }
    />
  ) : proType === "studio-apartment" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent studio apartments that provide compact, efficient living spaces. Perfect for singles or couples, offering modern conveniences in a stylish setting."
          : "Buy studio apartments that combine practicality with modern design. A great choice for first-time buyers or those looking for an affordable, low-maintenance home."
      }
    />
  ) : proType === "residential-land" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent residential land and build your dream home on spacious plots in prime locations. Customize your living space to suit your needs and lifestyle."
          : "Purchase residential land to create your ideal living environment. Choose from spacious plots in desirable areas for building a custom home."
      }
    />
  ) : proType === "commercial-land" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent commercial land in prime locations to establish your business. These plots offer great visibility and accessibility for retail, office, or other commercial use."
          : "Buy commercial land to build your business premises in high-traffic areas. Ideal for setting up retail shops, offices, or other business ventures."
      }
    />
  ) : proType === "industrial-land" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent industrial land to set up factories, warehouses, or manufacturing units. These plots are located in strategic industrial hubs, providing easy access to major transport routes."
          : "Buy industrial land in well-established zones, perfect for large-scale operations. A solid investment for manufacturing, storage, or logistics."
      }
    />
  ) : proType === "agricultural-land" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent agricultural land ideal for farming or livestock raising. These plots offer fertile soil and ample space for your agricultural projects."
          : "Purchase agricultural land to start your own farm or agricultural business. Take advantage of fertile land for crops, livestock, or other farming ventures."
      }
    />
  ) : proType === "farm-house-land" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent land for a farmhouse in tranquil rural locations. Ideal for building a peaceful retreat or engaging in agricultural activities in a spacious setting."
          : "Buy farm house land for rural living or agricultural purposes. Enjoy the freedom to build your dream home or pursue farming in a quiet environment."
      }
    />
  ) : proType === "retail-showroom" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent retail showrooms in high-visibility locations. Perfect for showcasing your products in areas with high foot traffic, ensuring maximum customer exposure."
          : "Buy retail showrooms in bustling commercial areas, ideal for businesses seeking prime visibility and a strong customer base."
      }
    />
  ) : proType === "commercial-building" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent commercial buildings in key business areas, suitable for offices, retail spaces, or mixed-use purposes. These properties offer flexibility and accessibility."
          : "Buy commercial buildings in prime locations. Ideal for businesses seeking office space, retail outlets, or multi-use properties."
      }
    />
  ) : proType === "office-complex" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent office complex spaces with modern amenities and professional environments. Located in central business districts, ideal for growing businesses."
          : "Buy office complex spaces in strategic locations, perfect for businesses looking to expand or invest in commercial real estate."
      }
    />
  ) : proType === "software-technology-park" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent office spaces in tech parks designed for startups and IT businesses. Enjoy modern infrastructure and networking opportunities in a collaborative environment."
          : "Invest in office spaces in technology parks, offering cutting-edge infrastructure, ideal for tech companies and startups looking to expand."
      }
    />
  ) : proType === "warehouse" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent warehouse spaces that offer large storage areas and easy access for logistics and distribution. Perfect for businesses with storage needs."
          : "Buy warehouse properties located in key industrial zones. Ideal for businesses needing ample storage, distribution, or manufacturing space."
      }
    />
  ) : proType === "industrial-estate" ? (
    <meta
      name="description"
      content={
        adType === "rent"
          ? "Rent space in industrial estates for manufacturing, warehouses, or large-scale operations. These properties offer ample space and are well-connected to major transport routes."
          : "Buy land in industrial estates for large-scale production, logistics, or storage. Ideal for businesses looking to expand or set up new facilities."
      }
    />
  ) : 
  <meta
      name="description"
      content="Discover your dream property at PropertyEase.in! Explore a wide range of residential and commercial listings, from luxurious homes to affordable plots."
    />
  }
</Helmet>

      <Navbar />

      <div className={"main pt-5"}>
        <section className="main-content">
          <div className="container">
            <div className="title">
              {/* <h2 className="text-capitalize">{filCat} For {adTypeData[0].toUpperCase() + adTypeData.slice(1)} in {proCity}</h2> */}
              <h2 className="text-capitalize">{filCat} For {adTypeData[0].toUpperCase() + adTypeData.slice(1)}</h2>
              
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
                  <>{
                  records.map((object, index) => (
                   <PropertyCard
                object={object}
                index={index}
                currentUser={currentUser}
                DateTime={DateTime}
              />
                  ))}
                  { records.length < 6 &&
                  <h2 className="text-capitalize">Similar properties almost matching your search</h2>}
                  { records.length < 6 &&
                  moreData.map((object, index) => (
                    <PropertyCard
                object={object}
                index={index}
                currentUser={currentUser}
                DateTime={DateTime}
              />
                  ))}
                  </>
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
                <div>
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
                </div>
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

export default PropertyByCity;
