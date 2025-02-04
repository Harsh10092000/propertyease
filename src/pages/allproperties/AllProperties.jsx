import React, { useEffect, useState, useContext } from "react";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";

import Pagination from "@mui/material/Pagination";

import {

  IconSquareCheckFilled,
  IconSquare,

  IconX
} from "@tabler/icons-react";
import { Skeleton, Snackbar } from "@mui/material";
import DateTime from "../../dateTime";
import NoResult from "../../components/noResult/NoResult";

import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import { AuthContext } from "../../context/AuthContext";

//import AdSlider2 from "../../components/adslider/AdSlider2";
// import AdSlider3 from "../../components/adslider/AdSlider3";
import AllPropertySlider from "../../components/adslider/AllPropertySlider";
import { useSearchParams } from "react-router-dom";
import CreateAgentAd from "../../components/createAgentAd/CreateAgentAd";
import PropertyCard from "../../components/propertyCard/PropertyCard";



import Sidebar2 from "../../components/sidebar2/Sidebar2";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import { regEx } from "../regEx";
import Loader from "../../components/loader/Loader";



const AllProperties = (props) => {
  // const [config, setConfig] = useState({
  //   autoRotate: -2,
  // });

  // const handleClick = () => {
  //   console.log(getConfig());
  // };
  const navigate = useNavigate();

  const handleForSale = (val) => {
    console.log(val)
    navigate(`/${val}`)
  }

  const handleForRent = (val) => {
    console.log(val)
    navigate(`/rental/${val}`)
  }




  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue1, setSearchValue1] = useState("");

  const [change, setChange] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState("");

  

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/pro/fetchPropertyData")
      .then((res) => {
        setData(res.data);
        //setResults(res.data);
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
    const myParam = searchParams.get("search");
    const proadtype = searchParams.get("proadtype");
    const proCat = searchParams.get("procat");
    
    if (myParam !== null && proadtype !== null) {
      setSearchValue(myParam);
      setSearchValue1(myParam);
      setPropertyAdTypeFilter(proadtype);
      setChange(change + 1);
      //handleSearch();
    } 
    if (proCat !== null) {
      setProCategoryFilter([proCat]);
    }
    if (proCat === "All Properties") {
      setProCategoryFilter(["Residential" , "Commercial" ,"Land"])}
    //setProSubTypeFilter(temp);
  }, []);

  const icon = <IconSquare fontSize="small" height={20} width={20} />;
  const checkedIcon = (
    <IconSquareCheckFilled fontSize="small" height={20} width={20} />
  );

  const { currentUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  //const [searchValue, setSearchValue] = useState("");
  //const [filter, setFilter] = useState("All");
  const [userCurrLocation, setUserCurrLocation] = useState("");
  const [locationSnack, setLocationSnack] = useState(false);

  const handleLocationSnack = (value) => {
    setLocationSnack(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // useEffect(() => {
  //   window.addEventListener('mousedown', handleMouseDown);
  //   return () => {
  //     window.removeEventListener('mousedown', handleMouseDown);
  //   };
  // }, []);

  // const handleMouseDown = () => {
  //   setOpenSortByOptions(false);
  // };

  const handleMouseDown = (event) => {
    if (event.target.closest(".sort-by") === null) {
      setOpenSortByOptions(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    data.forEach((item, i) => {
      item.pro_modified_id = 5000 + parseInt(item.pro_id);
    });
  }, [data]);


  var origin_url = document.referrer;
  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem("origin_url"));
    if (items === null) {
      if (
        origin_url.startsWith("https://propertyease.in/") === false &&
        origin_url.startsWith("https://www.propertyease.in/") === false &&
        origin_url !== null &&
        origin_url !== ""
      ) {
        sessionStorage.setItem("origin_url", JSON.stringify(origin_url));
        axios.post(import.meta.env.VITE_BACKEND + "/api/pro/addOrigin", [
          origin_url,
        ]);
      }
    }
  }, []);

  // const [records, setRecords] = useState([]);
  // const [nPages, setNPages] = useState(0);

  // const handleRecordsChange = (newRecords) => {
  //   setRecords(newRecords);
  // };

  // const handleNPagesChange = (newNPages) => {
  //   setNPages(newNPages);
  // };

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };



  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const [ad1, setAd1] = useState();
  const [ad2, setAd2] = useState();
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ad/fetchAdData2`)
      .then((res) => {
        setAd1(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ad/fetchAdData3`)
      .then((res) => {
        setAd2(res.data);
      });
  }, []);



  const [propertyAdTypeFilter, setPropertyAdTypeFilter] =
    useState("All Properties");
  const [openPropertyAdTypeOptions, setOpenPropertyAdTypeOptions] =
    useState(false);
  const propertyAdTypeOptions = [
    { type: "All Properties" },
    { type: "Sale" },
    { type: "Rent" },
  ];

  const [furnishingStatusFilter, setFurnishingStatusFilter] = useState([]);
  const [openFurnishingOptions, setOpenFurnishingOptions] = useState(false);
  const furnishingStatusOptions = [
    { type: "Fully Furnished" },
    { type: "Semi Furnished" },
    { type: "Unfurnished" },
  ];

  const [possessionAvailableFilter, setPossessionAvailableFilter] = useState(
    []
  );
  const [openPossessionOptions, setOpenPossessionOptions] = useState(false);
  const possessionAvailableOptions = [
    { type: "Immediate" },
    { type: "0-3 Month" },
    { type: "3-6 Month" },
    { type: "After 6 Months" },
  ];

  const [authorityApprovedFilter, setAuthorityApprovedFilter] = useState([]);

  const [openAuthorityOptions, setOpenAuthorityOptions] = useState(false);
  const authorityApprovedOptions = [
    { type: "HSVP" },
    { type: "MC" },
    { type: "DTP" },
    { type: "Other" },
  ];

  const [proCategoryFilter, setProCategoryFilter] = useState([]);

  const [openProCategoryOptions, setOpenProCategoryOptions] = useState(false);
  const proCategoryOptions = [
    { type: "Residential" },
    { type: "Commercial" },
    { type: "Land" },
  ];

  const [proWithPhotos, setProWithPhotos] = useState(false);
  const [proWithParking, setProWithParking] = useState(false);

  const [sortBy, setSortBy] = useState("Recent Listed");
  const [openSortByOptions, setOpenSortByOptions] = useState(false);

  const [selectedSubTypeFilter, setSelectedSubTypeFilter] = useState([]);
  

  const propertySubTypeOptions = [
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
  const [openProSubOptions, setOpenProSubOptions] = useState(false);

  const handleProSubTypeToggle = (type) => {
    console.log(type);
    //props.handleCurrentPage(1);
    if (selectedSubTypeFilter.includes(type)) {
      setSelectedSubTypeFilter(
        selectedSubTypeFilter.filter((item) => item !== type)
      );
    } else {
      setSelectedSubTypeFilter([...selectedSubTypeFilter, type]);
    }
  };

  const handleAllSubTypes = () => {
    setSelectedSubTypeFilter((prevSelectedTypes) => {
      const updatedTypes = propertySubTypeOptions
        .map((item) => item.type)
        .filter((type) => !prevSelectedTypes.includes(type));
      return [...prevSelectedTypes, ...updatedTypes];
    });
  };

  const handleToggleFurnishing = (type) => {
    //props.handleCurrentPage(1);
    if (furnishingStatusFilter.includes(type)) {
      setFurnishingStatusFilter(
        furnishingStatusFilter.filter((item) => item !== type)
      );
    } else {
      setFurnishingStatusFilter([...furnishingStatusFilter, type]);
    }
  };

  const handleToggleAuthority = (type) => {
    //props.handleCurrentPage(1);
    if (authorityApprovedFilter.includes(type)) {
      setAuthorityApprovedFilter(
        authorityApprovedFilter.filter((item) => item !== type)
      );
    } else {
      setAuthorityApprovedFilter([...authorityApprovedFilter, type]);
    }
  };

  const handleTogglePossession = (type) => {
    //props.handleCurrentPage(1);
    if (possessionAvailableFilter.includes(type)) {
      setPossessionAvailableFilter(
        possessionAvailableFilter.filter((item) => item !== type)
      );
    } else {
      setPossessionAvailableFilter([...possessionAvailableFilter, type]);
    }
  };

  const handleToggleProCategory = (type) => {
    //props.handleCurrentPage(1);
    if (proCategoryFilter.includes(type)) {
      setProCategoryFilter(proCategoryFilter.filter((item) => item !== type));
    } else {
      setProCategoryFilter([...proCategoryFilter, type]);
    }
  };

  useEffect(() => {
    const unique1 = Array.from(
      new Set(data?.slice(0, 60).map((item) => item.pro_city.trim()))
    );
    const uniqueState = Array.from(
      new Set(data?.slice(0, 60).map((item) => item.pro_state.trim()))
    );

    const unique2 = Array.from(
      new Set(
        data
          ?.slice(0, 60)
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
          ?.slice(0, 60)
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

    const arr = [
      ...unique1,
      ...uniqueState,
      ...unique2,
      ...unique3,
      searchValue,
    ];

    const unique4 = Array.from(
      new Set(arr.slice(0, 200).map((item) => item.trim()))
    );
    const unique = unique4.filter((i) =>
      i.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    if (searchValue === "") {
      setOpenSuggestions(false);
    }

    setSuggestions(unique);
  }, [searchValue]);

  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    setSortedUsers(data);
    if (sortBy === "Recent Listed") {
      sortedUsers.sort((a, b) => b.pro_id - a.pro_id);
    } else if (sortBy === "Most Popular") {
      sortedUsers.sort((a, b) => b.pro_views - a.pro_views);
    }
  }, [data, sortBy]);
  //let sortedUsers = [...data];

  const handleSearch = () => {
    setOpenSuggestions(false);
    let searchWords = searchValue?.toLowerCase().split(",");
    setSearchValue1(searchValue);

    const filteredData = (results.length > 0 ? results : sortedUsers).filter(
      (item) => {
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
      }
    );

    setResults(filteredData);
  };

  useEffect(() => {
    let searchWords = searchValue1?.toLowerCase().split(",");
    console.log(sortedUsers, searchWords);
    const filteredData = sortedUsers
      .filter((code) => {
        if (proWithPhotos === true) {
          return code.img_id !== null;
        } else if (proWithPhotos === false) {
          return true;
        }
      })
      .filter((code) => {
        if (proWithParking === true) {
          
          return code.pro_parking > 0;
        } else if (proWithParking === false) {
          return true;
        }
      })
      .filter((code) => {
        if (propertyAdTypeFilter === "Sale") {
          return code.pro_ad_type === "Sale";
        } else if (propertyAdTypeFilter === "Rent") {
          return code.pro_ad_type === "Rent";
        } else if (propertyAdTypeFilter === "All Properties") {
          return true;
        }
      })
      .filter((item) => {
        const result = furnishingStatusFilter.includes(item.pro_furnishing);
        if (result === true) {
          return item;
        } else if (furnishingStatusFilter.length === 0) {
          return true;
        }
      })
      .filter((item) => {
        const result = proCategoryFilter.includes(item.pro_type.split(",")[1]);
        if (result === true) {
          return item;
        } else if (proCategoryFilter.length === 0) {
          return true;
        }
      })
      .filter((item) => {
        const result = selectedSubTypeFilter.includes(
          item.pro_type.split(",")[0]
        );

        if (result === true) {
          return item;
        } else if (selectedSubTypeFilter.length === 0) {
          return true;
        }
      })
      .filter((item) => {
        const result = authorityApprovedFilter.includes(item.pro_approval);
        if (result === true) {
          return item;
        } else if (authorityApprovedFilter.length === 0) {
          return true;
        }
      })
      .filter((item) => {
        const result = possessionAvailableFilter.includes(item.pro_possession);
        if (result === true) {
          return item;
        } else if (possessionAvailableFilter.length === 0) {
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

        if (searchWords.length !== 0) {
          return searchWords.every((word) =>
            itemValues.toLowerCase().includes(word)
          );
        } else {
          return true;
        }
      });
    setCurrentPage(1);
    setResults(filteredData);
  }, [
    sortedUsers,
    sortBy,
    searchValue1,
    propertyAdTypeFilter,
    furnishingStatusFilter,
    proCategoryFilter,
    selectedSubTypeFilter,
    possessionAvailableFilter,
    authorityApprovedFilter,
    proWithPhotos,
    change,
    proWithParking
  ]);

 
  const records = results?.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(results?.length / recordsPerPage);

const [open1, setOpen1] = useState(false);


const handleClose = () => {
  setOpen1(false);
};

const [subscribedUser , setSubscribedUser] = useState(false);
  useEffect(() => {
    if (currentUser && currentUser[0] && currentUser[0].login_email) {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/setting/fetchSubscriberDataById/${currentUser[0].login_email}`)
      .then((res) => {
        setSubscribedUser(res.data);
      });
    }
  }, [currentUser]);


useEffect(() => {
  if(subscribedUser !== true) {

    const timer = setTimeout(() => {
      setOpen1(false);
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [subscribedUser]);




const [popupData, setPopupData] = useState({
  name: "",
  phone: "",
  email: ""
})



const [emailError, setEmailError] = useState(true);
useEffect(() => {
  if (!regEx[0].emailRegex.test(popupData.email)) {
    setEmailError(true);
  } else {
    setEmailError(false);
  }
}, [popupData.email]);

const [dupEntry, setDupEntry] = useState("");
const [subError, setSubError] = useState(false);
const handleSubmit = async () => {
  setLoader(true);
  try {
    await axios.post(
      import.meta.env.VITE_BACKEND + "/api/maildigest/addSubscriberData",
      popupData
    );
    setLoader(false);
    setOpen1(false)
    //setOpenSubSnack(true);
    setPopupData({
      name: "",
      email: "",
      phone: ""
    });
    //setSnack(true);
  } catch (err) {
    console.log(err);
    err.response.data.code === "ER_DUP_ENTRY" ? setDupEntry("Already Subscribed ") : setSubError(true);
      setLoader(false);
  }
};

const [loader, setLoader] = useState(false);
const [step, setStep] = useState(false);
const [openSubSnack , setOpenSubSnack] = useState(false);
const handleStep = () => {
 
  if (
    popupData.name !== "" &&
    popupData.phone.length > 9 && popupData.phone.length < 11 &&
    emailError === false 
  ) {
    setStep(false);
    handleSubmit();
  } else {
    setStep(true);
    
  }
};


const [inputText, setInputText] = useState('');
const [generatedCode, setGeneratedCode] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');



// const userAgent = navigator.userAgent;
// console.log("userAgent : " , userAgent);

  return (
    <div>
     <title>Propertyease - View All Properties</title>
      <meta name="description" content="Discover a diverse range of properties for sale and rent in Kurukshetra, including residential lands, independent houses, commercial buildings, and agricultural lands. Explore your dream property today!"/>
  <meta name="author" content="Propertyease" />
<link rel="canonical" href="https://propertyease.in/allproperties" />
<meta name="keywords" content={`Top real estate agents near me, Commercial real estate, Residential real estate, haryana, rent house, Property, Propertyease, houses for rent, mls,real estate agent, property for sale,  for sale near me, home, realtor, houses for sale Sale, Rent, Buy, India, Best Property `} />




      <Dialog
        open={open1}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-wrapper"
        role="dialog"
      >
           <div className="mail-popup">
          <div className="popup-heading-wrapper d-flex">
            <div>
              <div className="popup-heading">Be the first to know!</div>
              <div className="popup-subheading">
                Subscribers are the first one to hear about new listed
                properties and best deals.
              </div>
            </div>

            <div onClick={handleClose} className="pointer" title="close">
              <IconX />
            </div>
          </div>
          <div className="popup-content-wrapper">
            <div className="popup-content-sec d-flex justify-content-between">
              <div className="mb-3">
                <input
                  className="pf-input-1 "
                  type="text"
                  placeholder="Name"
                  required
                  onChange={(e) =>
                  {
                    setSubError(false);
                    setPopupData({
                      ...popupData,
                      name: e.target.value.replace(/[^a-zA-Z ]/g, ""),
                    })
                  }
                  }
                />
                <span className="popup-error-msg">
                  {step && popupData.name === "" ? "Required" : ""}
                </span>
              </div>
              <div className="mb-3">
                <input
                  className="pf-input-1 "
                  // type="text"
                  placeholder="Phone"
                  required
                  value={popupData.phone}
                  onChange={(e) =>
                    {
                      setSubError(false);
                    setPopupData({
                      ...popupData,
                      phone: e.target.value.replace(
                        regEx[2].phoneNumberValidation,
                        ""
                      ),
                    })
                  }
                }
                />
                <span className="popup-error-msg">
                  {step && popupData.phone.length !== 10
                    ? "Phone number must be 10 digits."
                    : ""}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <input
                className="pf-input"
                type="email"
                placeholder="Email"
                required
                onChange={(e) => {
                  setDupEntry("");
                  
                    setSubError(false);
                  setPopupData({
                    ...popupData,
                    email: e.target.value.replace(/[^a-zA-Z.@0-9/]/g, ""),
                  })
                }
                }
              />
              <span className="popup-error-msg">
                {step && emailError ? "Please enter valid email address" :dupEntry.length > 1 ? dupEntry : ""}
              </span>
            </div>
           
            <div>
              <button
                class="pf-submit hover-opacity"
                onClick={handleStep}
                title="Click to Subscribe"
              >
                Submit
              </button>
            </div>
            <div className="popup-botton-text">
              We don't share data with anyone.
            </div>
            <div>{subError && "Please try again after some time."}</div>
          </div>
        </div>
      </Dialog>

      {loader ? <Loader /> : ""}
      
      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
            textAlign: "center",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSubSnack}
        autoHideDuration={2000}
        onClose={() => setOpenSubSnack(false)}
        message={
          "Thank You for subscribing us."
        }
      />
      <Helmet>
      <title>Propertyease - All Properties</title>
      <meta name="description" content="Explore the best real estate properties in Kurukshetra, Ambala, Karal, Kaithal, Mohali, Chandigarh and Haryana. Find your ideal home, land, or commercial property at PropertyEase.in. Browse our comprehensive listings and make informed property decisions today!" />

    <meta
    property="og:image"
          content="https://api.propertyease.in/propertyImages/watermark/default.png"
          

        />

    <meta
    property="og:title"
    content="Propertyease"
  />
  <meta
    property="og:description"
    content="Ab Property Bechna Kharidna Hoga Aasan"
  />
        

        <link
          rel="canonical"
          href="https://propertyease.in/allproperties"
        ></link>

        
      </Helmet>
      <Navbar  />
      

  
      <div className={"main"}>
        <section className="main-content">
          <div className="container">
            <div className="title">
            
              <h2>
                All Properties
                <span className="ml-2 numberProperties">{results.length}</span>
              </h2>

              

              

              <div className="row hero-search-all-pro">
                <div
                  className={`col-md-3 sort-by pointer position-relative ${
                    openPropertyAdTypeOptions ? "arrow-up" : "arrow-down"
                  }`}
                  onClick={() => setOpenSortByOptions(!openSortByOptions)}
                >
                  <div className="sort-by-value">{sortBy}</div>
                  {openSortByOptions && (
                    <div className="sort-by-menu">
                      <div
                        className={`${
                          sortBy === "Recent Listed" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setSortBy("Recent Listed"),
                            setOpenSortByOptions(false);
                        }}
                      >
                        Recent Listed
                      </div>
                      <div
                        className={`${
                          sortBy === "Most Popular" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setSortBy("Most Popular"),
                            setOpenSortByOptions(false);
                        }}
                      >
                        Most Popular
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-7">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a property"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value), setOpenSuggestions(true);
                    }}
                  />

                  {/* <div class="location-icon">
                    <IconAdjustmentsHorizontal />
                  </div> */}
                  {openSuggestions && (
                    <div className=" search-suggestions-2 pt-2 shadow pb-2">
                      {suggestions.map((item) => (
                        <div
                          className="py-2 pl-2 suggesion-item-2 pointer"
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
                <div className="col-md-2">
                  <button
                    type="submit"
                    class="btn btn-primary w-100 "
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-9">
                {!skeleton &&
                  records?.length > 0 &&
                  records
                    .slice(0, 2)
                    .map((object, index) => (
                      <PropertyCard
                      // viewerRef= {viewerRef}
                        object={object}
                        index={index}
                        currentUser={currentUser}
                        DateTime={DateTime}
                      />
                    ))}
                {skeleton && (
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
                )}
                {records?.length < 1 && (
                  <NoResult
                    searchValue={searchValue}
                    userCurrLocation={userCurrLocation}
                    handleSearchValue={handleSearchValue}
                  />
                )}

                {/* ad section start */}
                {/* <div className="list-group ">
                  <div className="row">
                    <div className="col-md-auto flex-column text-center">
                      <img
                        src="/images/bizease.png"
                        alt="no image"
                        className="ad-section"
                      />
                    </div>
                  </div>
                </div> */}

                {ad1?.length > 0 && (
                  <div className="list-group ">
                    <div className=" row">
                      <div className="col-md-auto flex-column text-center ad-1">
                        <AllPropertySlider
                          className="ad-section"
                          slides={ad1}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ad section end */}
                {!skeleton &&
                  records?.length > 0 &&
                  records
                    .slice(2)
                    .map((object, index) => (
                      <PropertyCard
                        object={object}
                        index={index}
                        currentUser={currentUser}
                        DateTime={DateTime}
                        
                      />
                    ))}
                {skeleton && (
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
                )}
                {/* {records.length < 1 && (
                  <NoResult
                    searchValue={searchValue}
                    userCurrLocation={userCurrLocation}
                    handleSearchValue={handleSearchValue}
                  />
                )} */}
              </div>
              <div className="col-md-3 d-flex flex-column gap-3">
              <div className="allproperty-filter">
                <div className="all-pro-filter shadow">
                  <div className="p-1 ">
                    {/* ########### filter 1 ########### */}

                    <div
                      className={`property-type-filter pointer position-relative ${
                        openPropertyAdTypeOptions ? "arrow-up" : "arrow-down"
                      }`}
                      onClick={() =>
                        setOpenPropertyAdTypeOptions(!openPropertyAdTypeOptions)
                      }
                    >
                      <div>Purchase Type</div>
                      <span className="selected">{propertyAdTypeFilter}</span>
                    </div>

                    {openPropertyAdTypeOptions &&
                      propertyAdTypeOptions.map((item) => (
                        <div
                          className={`${
                            propertyAdTypeFilter === item.type
                              ? "selected-option pointer"
                              : "options pointer"
                          }`}
                          onClick={() => {
                            setPropertyAdTypeFilter(item.type);
                            //,setOpenPropertyAdTypeOptions(false);
                          }}
                        >
                          {item.type}
                        </div>
                      ))}

                    {/* ########### filter 2 ########### */}
                    <div
                      className={`property-type-filter pointer position-relative border-top ${
                        openProCategoryOptions ? "arrow-up" : "arrow-down"
                      }`}
                      onClick={() =>
                        setOpenProCategoryOptions(!openProCategoryOptions)
                      }
                    >
                      <div>Property Types</div>


                      <span className="selected">
                        {proCategoryFilter.length > 0 ? (
                          proCategoryFilter[0] +
                          (proCategoryFilter.length > 1
                            ? " + " + (proCategoryFilter.length - 1) + " more"
                            : "")
                        ) : (
                          <span className="text-danger ml-0"></span>
                        )}
                      </span>
                    </div>

                    {openProCategoryOptions &&
                      proCategoryOptions.map((item, index) => (
                        <div
                          className={`${
                            proCategoryFilter.includes(item.type)
                              ? "selected-check-box-option pointer"
                              : "check-box-options pointer"
                          }`}
                          onClick={() => handleToggleProCategory(item.type)}
                        >
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            //style={{ marginRight: 8 }}
                            checked={proCategoryFilter.includes(item.type)}
                          />

                          {item.type}
                        </div>
                      ))}

                    {/* ########### filter 3 ########### */}

                    <div
                      className={`property-type-filter pointer position-relative border-top ${
                        openProSubOptions ? "arrow-up" : "arrow-down"
                      }`}
                      onClick={() => setOpenProSubOptions(!openProSubOptions)}
                    >
                      <div>Property Sub Type</div>

                      <span className="selected">
                        {selectedSubTypeFilter.length > 0 ? (
                          selectedSubTypeFilter[0] +
                          (selectedSubTypeFilter.length > 1
                            ? " + " +
                              (selectedSubTypeFilter.length - 1) +
                              " more"
                            : "")
                        ) : (
                          <span className="text-danger ml-0"></span>
                        )}
                      </span>
                    </div>

                    {openProSubOptions && (
                      <div
                        className="sub-pro-type-wrapper"
                        style={{ height: openProSubOptions ? "400px" : "auto" }}
                      >
                        {selectedSubTypeFilter.length === 17 ? (
                          <div
                            onClick={() => setSelectedSubTypeFilter([])}
                            className="selected-check-box-option pointer"
                          >
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              //style={{ marginRight: 8 }}
                              checked={true}
                            />
                            {/* <IconMinus width={16} height={16} className="mr-1" stroke={1} /> */}
                            Deselect All
                          </div>
                        ) : (
                          <div
                            onClick={handleAllSubTypes}
                            className="check-box-options pointer"
                          >
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              //style={{ marginRight: 8 }}
                              checked={false}
                            />
                            {/* <IconPlus width={16} height={16} className="mr-1" /> */}
                            Select All
                          </div>
                        )}

                        {propertySubTypeOptions.map((item, index) =>
                          proCategoryFilter.includes(item.parent_type) ||
                          proCategoryFilter.length === 0 ? (
                            <div
                              className={`${
                                selectedSubTypeFilter.includes(item.type)
                                  ? "selected-check-box-option pointer"
                                  : "check-box-options pointer"
                              }`}
                              onClick={() => handleProSubTypeToggle(item.type)}
                            >
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                //style={{ marginRight: 8 }}
                                checked={selectedSubTypeFilter.includes(
                                  item.type
                                )}
                              />

                              {item.type}
                            </div>
                          ) : (
                            <div
                              className={`${
                                selectedSubTypeFilter.includes(item.type)
                                  ? "selected-check-box-option blocked-pointer dis-color "
                                  : "check-box-options blocked-pointer dis-color"
                              }`}
                              //onClick={() => handleProSubTypeToggle(item.type)}
                            >
                              <Checkbox
                                disabled
                                icon={icon}
                                checkedIcon={checkedIcon}
                                //style={{ marginRight: 8 }}
                                checked={selectedSubTypeFilter.includes(
                                  item.type
                                )}
                              />

                              {item.type}
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {/* ########### filter 4 ########### */}
                    <div
                      className={`property-type-filter pointer position-relative border-top ${
                        openFurnishingOptions ? "arrow-up" : "arrow-down"
                      }`}
                      onClick={() =>
                        setOpenFurnishingOptions(!openFurnishingOptions)
                      }
                    >
                      <div>Furnishing Status</div>

                      <span className="selected">
                        {furnishingStatusFilter.length > 0 ? (
                          furnishingStatusFilter[0] +
                          (furnishingStatusFilter.length > 1
                            ? " + " +
                              (furnishingStatusFilter.length - 1) +
                              " more"
                            : "")
                        ) : (
                          <span className="text-danger ml-0"></span>
                        )}
                      </span>
                    </div>

                    {openFurnishingOptions &&
                      furnishingStatusOptions.map((item, index) => (
                        <div
                          className={`${
                            furnishingStatusFilter.includes(item.type)
                              ? "selected-check-box-option pointer"
                              : "check-box-options pointer"
                          }`}
                          onClick={() => handleToggleFurnishing(item.type)}
                        >
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            //style={{ marginRight: 8 }}
                            checked={furnishingStatusFilter.includes(item.type)}
                          />

                          {item.type}
                        </div>
                      ))}

                    {/* ########### filter 5 ########### */}

                    <div
                      className={`property-type-filter pointer position-relative border-top ${
                        openAuthorityOptions ? "arrow-up" : "arrow-down"
                      }`}
                      onClick={() =>
                        setOpenAuthorityOptions(!openAuthorityOptions)
                      }
                    >
                      <div>Authority Approved</div>

                      <span className="selected">
                        {authorityApprovedFilter.length > 0 ? (
                          authorityApprovedFilter[0] +
                          (authorityApprovedFilter.length > 1
                            ? " + " +
                              (authorityApprovedFilter.length - 1) +
                              " more"
                            : "")
                        ) : (
                          <span className="text-danger ml-0"></span>
                        )}
                      </span>
                    </div>

                    {openAuthorityOptions &&
                      authorityApprovedOptions.map((item, index) => (
                        <div
                          className={`${
                            authorityApprovedFilter.includes(item.type)
                              ? "selected-check-box-option pointer"
                              : "check-box-options pointer"
                          }`}
                          onClick={() => handleToggleAuthority(item.type)}
                        >
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            //style={{ marginRight: 8 }}
                            checked={authorityApprovedFilter.includes(
                              item.type
                            )}
                          />

                          {item.type}
                        </div>
                      ))}

                    {/* ########### filter 6 ########### */}

                    <div
                      className={`property-type-filter pointer position-relative border-top ${
                        openPossessionOptions ? "arrow-up" : "arrow-down"
                      }`}
                      onClick={() =>
                        setOpenPossessionOptions(!openPossessionOptions)
                      }
                    >
                      <div>Possession availability</div>

                      <span className="selected">
                        {possessionAvailableFilter.length > 0 ? (
                          possessionAvailableFilter[0] +
                          (possessionAvailableFilter.length > 1
                            ? " + " +
                              (possessionAvailableFilter.length - 1) +
                              " more"
                            : "")
                        ) : (
                          <span className="text-danger ml-0"></span>
                        )}
                      </span>
                    </div>

                    {openPossessionOptions &&
                      possessionAvailableOptions.map((item, index) => (
                        <div
                          className={`${
                            possessionAvailableFilter.includes(item.type)
                              ? "selected-check-box-option pointer"
                              : "check-box-options pointer"
                          }`}
                          onClick={() => handleTogglePossession(item.type)}
                        >
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            //style={{ marginRight: 8 }}
                            checked={possessionAvailableFilter.includes(
                              item.type
                            )}
                          />

                          {item.type}
                        </div>
                      ))}

                    {/* ########### filter 7 ########### */}
                    <div
                      className={`switch-filter pointer position-relative border-top `}
                    >
                      <div>Properties With Photos</div>
                      <div>
                        <Switch
                          size="small"
                          onClick={() => setProWithPhotos(!proWithPhotos)}
                        />
                      </div>
                    </div>

                    {/* ########### filter 8 ########### */}
                    <div
                      className={`switch-filter pointer position-relative border-top `}
                    >
                      <div>Parking Available</div>
                      <div>
                        <Switch
                          size="small"
                          onClick={() => setProWithParking(!proWithParking)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Sidebar2  handleForSale={handleForSale} handleForRent={handleForRent} />

               

              

                {ad2?.length > 0 && (
                  <div>
                    <div className="p-1 shadow ad-2-wrapper">
                      <div className=" ad-2">
                        {/* <img
                        src="/images/ownly-digital.png"
                        alt="no image"
                        className="ad-section"
                      /> */}
                        <AllPropertySlider
                          className="ad-section"
                          slides={ad2}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* {ad1?.length > 0 && (
                  <div className="p-1 shadow ">

                  
                
                  
                  <AdSlider3 className="ad-section" slides={ad1} />
                
              
              </div>
                )}  */}
                {/* ad section end */}

                <div>
                  <CreateAgentAd />
                </div>

                </div>
              </div>
            </div>

            {records?.length > 0 && (
             
              <Pagination
                count={nPages}
                color="primary"
                siblingCount={1}
                //page={currentPage} 
                shape="rounded"
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

export default AllProperties;
