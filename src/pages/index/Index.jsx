import { Link } from "react-router-dom";
import { IconSend, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import Dialog from "@mui/material/Dialog";
import { regEx } from "../regEx";
import { Snackbar } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import PropertyCard2 from "../../components/propertyCard2/PropertyCard2";
import RecentListHeader from "../../components/propertyCard2/RecentListHeader";
import AllPropertyButton from "../../components/propertyCard2/AllPropertyButton";

const Index = () => {
  const scrollContainerRef = useRef(null);

  const handleScroll = (e) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };


  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  

  
  const [searchValue, setSearchValue] = useState("");
  const [currentFilter, setCurrentFilter] = useState("All");
 

  const [propertyAdTypeFilter, setPropertyAdTypeFilter] =
    useState("All Properties");
  const [openPropertyAdTypeOptions, setOpenPropertyAdTypeOptions] =
    useState(false);

  const [propertyTypeFilter, setPropertyTypeFilter] =
    useState("Property Types ");
  const [openPropertyTypeOptions, setOpenPropertyTypeOptions] = useState(false);

  const latest_pro_btns = [
    {
      name: "All",
    },
    {
      name: "For Sale",
    },
    {
      name: "For Rent",
    },
    {
      name: "Independent House",
    },
    {
      name: "Residential Land",
    },
    {
      name: "Agricultural Land",
    },
  ];

 
  const [data, setData] = useState([]);
  const [subscribedUser, setSubscribedUser] = useState(false);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/pro/fetchPropertyData")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  useEffect(() => {
    if (currentUser && currentUser[0] && currentUser[0].login_email) {
      axios
        .get(
          import.meta.env.VITE_BACKEND +
            `/api/setting/fetchSubscriberDataById/${currentUser[0].login_email}`
        )
        .then((res) => {
          setSubscribedUser(res.data);
        });
    }
  }, [currentUser]);

 
  const handleClick = (index) => {
    navigate(
      `/allproperties?search=${searchValue}&proadtype=${propertyAdTypeFilter}&procat=${propertyTypeFilter}`
    );
  };

  const filteredData = data.filter((code) => {
    if (currentFilter === "For Sale") {
      return code.pro_ad_type === "Sale";
    } else if (currentFilter === "For Rent") {
      return code.pro_ad_type === "Rent";
    } else if (currentFilter === "Independent House") {
      return code.pro_type.split(",")[0] === "Independent House";
    } else if (currentFilter === "Residential Land") {
      return code.pro_type.split(",")[0] === "Residential Land";
    } else if (currentFilter === "Agricultural Land") {
      return code.pro_type.split(",")[0] === "Agricultural Land";
    } else if (currentFilter === "All") {
      return true;
    }
  });

  const options = {
    items: 2,
    margin: 10,
    transitionStyle: "backSlide",
    loop: true,
    autoplay: true,
    autoplaySpeed: 500,
    autoplayTimeout: 1000,
  };

  function updateOptions() {
    if (window.innerWidth <= 768) {
      options.items = 1;
    } else {
      options.items = 2;
    }
  }

  updateOptions();
  window.addEventListener("resize", updateOptions);


  const services = [
    {
      sub_heading: "Buy Property",
      content: `Your dream home awaits here.`,
      image: "images/services-icon-1.webp",
      link: "/allproperties",
      title: "Click to View All Properties",
      alt: `Buy Property on propertyease.in`,
    },
    {
      sub_heading: "Sell Property",
      content: `Sell fast with our help at a good cost.`,
      image: "images/services-icon-2.webp",
      link: "/addproperty",
      title: "List Property",
      alt: "Sale Property on propertyease.in",
    },
    {
      sub_heading: "Rent Property",
      content: `Find your perfect rental today.`,
      image: "images/services-icon-2.webp",
      link: "/addproperty",
      title: "List Property",
      alt: "Rent Property on propertyease.in",
    },
  ];

  const proType = [
    {
      heading: "Residential",
      image: "images/pro-type-1.webp",
      link: "/listing/residential",
      title: "Click to View All Residential Properties",
      alt: "Check out Residential properties on propertyease.in",
    },
    {
      heading: "Commercial",
      image: "images/pro-type-2.webp",
      link: "/listing/commercial",
      title: "Click to View All Commercial Properties",
      alt: "Check out Commercial properties on propertyease.in",
    },
    {
      heading: "Land",
      image: "images/pro-type-3.webp",
      link: "/listing/land",
      title: "Click to View All Land/Plots Properties",
      alt: "Check out Land properties on propertyease.in",
    },
  ];

  const directSearchButtons = [
    
    {
      heading: "Residential",
      image: "images/pro-type-1.webp",
      link: "/listing/residential",
      title: "Click to View All Residential Properties",
      alt: "Check out the best Residential properties on propertyease.in",
    },
    {
      heading: "Commercial",
      image: "images/pro-type-2.webp",
      link: "/listing/commercial",
      title: "Click to View All Commercial Properties",
      alt: "Check out best Commercial properties on propertyease.in",
    },
    {
      heading: "Land",
      image: "images/pro-type-3.webp",
      link: "/listing/land",
      title: "Click to View All Land/Plots Properties",
      alt: "Check out best Land properties on propertyease.in",
    },
    {
      heading: "Buy",
      image: "images/services-icon-1.webp",
      link: "/allproperties",
      title: "Click to View All Properties",
      alt: `Buy Properties on propertyease.in`,
    },
    {
      heading: "Rent",
      image: "images/services-icon-2.webp",
      link: "/addproperty",
      title: "List Property",
      alt: "Rent House on propertyease.in",
    },
    {
      heading: "List Property",
      image: "images/services-icon-2.webp",
      link: "/addproperty",
      title: "List Property",
      alt: "Sale propeties on propertyease.in",
    },
  ];

  const propertyTypeOptions = [
    { type: "All Properties" },
    { type: "Residential" },
    { type: "Commercial" },
    { type: "Land" },
  ];

  const propertyAdTypeOptions = [
    { type: "All Properties" },
    { type: "Sale" },
    { type: "Rent" },
  ];

  const propertyType = [
    { id: "t1", type: "Apartment" },
    { id: "t2", type: "Independent House" },
    { id: "t3", type: "Builder Floor" },
    { id: "t4", type: "Farm HouseRaw House" },
    { id: "t5", type: "Retirement Community" },
    { id: "t6", type: "Studio Apartment" },
    { id: "t7", type: "Residential Land" },
    { id: "t8", type: "Commercial Land" },
    { id: "t9", type: "Industrial Land" },
    { id: "t10", type: "Agricultural Land" },
    { id: "t11", type: "Farm House Land" },
    { id: "t12", type: "Retail Showroom" },
    { id: "t13", type: "Commercial Building" },
    { id: "t14", type: "Office Complex" },
    { id: "t15", type: "Software Technology Park" },
    { id: "t16", type: "Warehouse" },
    { id: "t18", type: "Industrial Estate" },
  ];

  const [subData, setSubData] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertySubCatNo`)
      .then((res) => {
        setSubData(res.data);
      });
  }, []);

  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [proData, setProData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/pro/fetchPropertyData")
      .then((res) => {
        setProData(res.data);
        //setSkeleton(false);
      });
  }, []);

 

  useEffect(() => {
    const unique1 = Array.from(
      new Set(proData?.slice(0, 60).map((item) => item.pro_city.trim()))
    );
    const uniqueState = Array.from(
      new Set(proData?.slice(0, 60).map((item) => item.pro_state.trim()))
    );

    const unique2 = Array.from(
      new Set(
        proData
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
        proData
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

 

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (subscribedUser !== true) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [subscribedUser]);

  const [popupData, setPopupData] = useState({
    name: "",
    phone: "",
    email: "",
  });

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
      setOpen(false);

      setPopupData({
        name: "",
        email: "",
        phone: "",
      });
    
    } catch (err) {
      console.log(err);
      err.response.data.code === "ER_DUP_ENTRY"
        ? setDupEntry("Already Subscribed ")
        : setSubError(true);
      setLoader(false);
    }
  };
  const [openSubSnack, setOpenSubSnack] = useState(false);
  const [loader, setLoader] = useState(false);
  const [step, setStep] = useState(false);
  const handleStep = () => {
    if (
      popupData.name !== "" &&
      popupData.phone.length > 9 &&
      popupData.phone.length < 11 &&
      emailError === false
    ) {
      setStep(false);

      handleSubmit();
    } else {
      setStep(true);
    }
  };

  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenPropertyAdTypeOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownRef1 = useRef(null);
  const handleClickOutside1 = (event) => {
    if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
      setOpenPropertyTypeOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside1);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside1);
    };
  }, []);

  const placeholderText = [
    "Search for a property",
    "Sector 7",
    "Kurukshetra",
    "Haryana",
  ];
  const [state, setState] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setState((s) => s + 1);
    }, 4000);
  }, []);

  const placeholder = placeholderText[state % placeholderText.length];


  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };
  
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
   
    <div>
    
      <Helmet>
       
        <link
          rel="preload"
          fetchpriority="high"
          as="image"
          href="https://propertyease.in/images/hero-2.webp"
          type="image/webp"
        />
        <title>Propertyease - Buy and Sell Property</title>
      </Helmet>
      <link rel="canonical" href="https://propertyease.in/" />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-wrapper"
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
                  onChange={(e) => {
                    setSubError(false);
                    setPopupData({
                      ...popupData,
                      name: e.target.value.replace(/[^a-zA-Z ]/g, ""),
                    });
                  }}
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
                  onChange={(e) => {
                    setSubError(false);
                    setPopupData({
                      ...popupData,
                      phone: e.target.value.replace(
                        regEx[2].phoneNumberValidation,
                        ""
                      ),
                    });
                  }}
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
                  });
                }}
              />
              <span className="popup-error-msg">
                {step && emailError
                  ? "Please enter valid email address"
                  : dupEntry.length > 1
                  ? dupEntry
                  : ""}
              </span>
            </div>
            
            <div>
              <button
                className="pf-submit hover-opacity"
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

      <Navbar />
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
        message={"Thank You for subscribing us."}
      />
      

      <div>
        <div className="image-cover hero-banner" data-select2-id="13">
          <div className="container" data-select2-id="12">
            <div className="row justify-content-center" data-select2-id="11">
              <div
                className="col-lg-9 col-md-11 col-sm-12 banner-text-wrapper"
                data-select2-id="10"
              >
                <div className="inner-banner-text ">
                  <h1 className={"h1-2"} >Ab property bechna kharidna hoga aasan
                  </h1>

                </div>
                <div className="banner-text-2 ">
                  <p className="shadow">Find Real Properties at Best Price</p>
                </div>
              </div>
            </div>
          </div>


          <div className="hero-search">
            <div className="container hero-search-wrapper">
             

              <div
                className="d-flex search-options-2"
                ref={scrollContainerRef}
                onWheel={handleScroll}
              >
                {directSearchButtons.map((item, index) => (
                 
                  <div className="inside-search-options-2">
                    <Link to={item.link} title={item.title}>
                      <div className="search-option-item-2">
                        <img
                          src={item.image}
                          className="card-img-top"
                          alt={item.alt}
                          height="36px"
                          width="45px"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="card-body px-0  pb-0">
                          <h4 className="card-title mb-0 ">{item.heading}</h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="row">
                <div
                  ref={dropdownRef}
                  style={{ zIndex: 9 }}
                  className={`col-md-2 all-types pointer position-relative ${
                    openPropertyAdTypeOptions ? "arrow-up" : "arrow-down"
                  }`}
                  onClick={() =>
                    
                    setOpenPropertyAdTypeOptions(
                      openPropertyAdTypeOptions ? false : true
                    )
                  }
                >
                  <div className="">{propertyAdTypeFilter}</div>
                  {openPropertyAdTypeOptions && (
                    <div className=" pro-ad-type-list-wrapper">
                      <div id="pro-ad-type-list">
                        {propertyAdTypeOptions.map((item) => (
                          <div
                            className={`${
                              propertyAdTypeFilter === item.type
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => {
                              setPropertyAdTypeFilter(item.type),
                                setOpenPropertyAdTypeOptions(false);
                            }}
                          >
                            {item.type}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                 
                </div>

                <div
                  ref={dropdownRef1}
                  className={`col-md-2 all-types pointer position-relative ${
                    openPropertyTypeOptions ? "arrow-up" : "arrow-down"
                  }`}
                  onClick={() =>
                    
                    setOpenPropertyTypeOptions(
                      openPropertyTypeOptions ? false : true
                    )
                  }
                >
                  <div className="">{propertyTypeFilter}</div>
                  {openPropertyTypeOptions && (
                    <div className=" pro-ad-type-list-wrapper">
                      <div id="pro-ad-type-list">
                        {propertyTypeOptions.map((item) => (
                          <div
                            className={`${
                              propertyTypeFilter === item.type ? "selected" : ""
                            }`}
                            onClick={() => {
                              setPropertyTypeFilter(item.type),
                                setOpenPropertyTypeOptions(false);
                            }}
                          >
                            {item.type}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                 
                </div>

                <div className="col-md d-flex">
                  <input
                    type="text"
                    className="form-control index-search"
                   
                    placeholder={placeholder}
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value), setOpenSuggestions(true);
                    }}
                  />
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
                    className="btn btn-primary w-100 "
                    onClick={handleClick}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          
        </div>

        

     

        {/* ########## New Recent List Section ########## */}

        <section className="most-view-Property mt-5 mb-5">
          <div className="container">
            <RecentListHeader />
            <div className="latest-pro-filter-wrapper">
              {latest_pro_btns.map((item) => (
                <button
                  className={`btn ${
                    currentFilter === item.name ? "active" : "latest-pro-filter"
                  }`}
                  onClick={() => setCurrentFilter(item.name)}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="container">
              <div className="row ">
                {filteredData.slice(0, 6).map((item, index) => (
                  <PropertyCard2
                    item={item}
                    currentUser={currentUser}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <AllPropertyButton />
          </div>
        </section>

        <section className="most-view-Property mt-5 mb-5">
          <div className="container">
           
          </div>
        </section>

        

       

        <div className="container about-us-wrapper-1">
          <div className="section-title text-left">
            
            <h3 className="aboutus">
              
              About Us
              <div className="heading-divider "></div>
            </h3>
            <p>
              Founded in 2023, Propertyease.in aims to make buying and selling
              property easy and stress-free. We connect buyers and sellers
              directly and provide helpful tools, detailed listings, and
              valuable information to support smart decisions. That is why we
              are the best property dealer in town. Our platform is designed for
              transparency and efficiency, ensuring a smooth and reliable
              experience. Whether you're buying your dream home or selling a
              property, Propertyease.in simplifies the process for you.
            </p>
          </div>

          <div className="row about-us-sec">
            <div className="col-md-6 about-us-left about-us-left-1">
              <div className="about-us-img-wrap about-img-left">
                <img
                  src="images/pro-about-6.webp"
                  className=""
                  alt="Buy a new home"
                  loading="lazy"
                  width="526px"
                  height="420px"
                  srcSet=""
                />
              </div>
            </div>

            <div className="col-lg-6 align-self-center about-us-right">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2--- mb-30">
                  <h4 className="section-subtitle section-subtitle-2--- ltn__secondary-color">
                    For Sellers
                  </h4>
                  <p>
                    We serve over 10,000 buyers across numerous countries, with
                    500 experts to guide you every step of the way.
                  </p>
                </div>
                <div className="ltn__feature-item ltn__feature-item-3">
                  <div className="ltn__feature-icon">
                    <span>
                      <img
                        src="images/about-us-1-3.webp"
                        className="about-us-icon"
                        alt="Sale Property on propertyease"
                        loading="lazy"
                        width="48px"
                        height="55px"
                      />
                    </span>
                  </div>
                  <div className="ltn__feature-info">
                    <h4>Find Buyers</h4>
                    <p>Find buyers effortlessly with our expert assistance.</p>
                  </div>
                </div>
                <div className="ltn__feature-item ltn__feature-item-3">
                  <div className="ltn__feature-icon">
                    <span>
                      <img
                        src="images/about-us-1-1.webp"
                        className="about-us-icon"
                        alt="Buy Property on propertyease"
                        loading="lazy"
                        width="55px"
                        height="55px"
                      />
                    </span>
                  </div>
                  <div className="ltn__feature-info">
                    <h4>Free Listings</h4>
                    <p>
                      List your property for free and attract potential buyers.
                    </p>
                  </div>
                </div>
                <div className="ltn__feature-item ltn__feature-item-3">
                  <div className="ltn__feature-icon">
                    <span>
                      <img
                        src="images/about-us-1-2.webp"
                        className="about-us-icon"
                        alt="List property for free on propertyease"
                        loading="lazy"
                        width="55px"
                        height="55px"
                      />
                    </span>
                  </div>
                  <div className="ltn__feature-info">
                    <h4>3D Tours</h4>
                    <p>Show off your property with virtual 3D tours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row about-us-sec about-us-sec-2">
            <div className="col-lg-6 align-self-center about-us-right">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2--- mb-30">
                  <h4 className="section-subtitle section-subtitle-2--- ltn__secondary-color">
                    For Buyers
                  </h4>
                  <p>
                    We help sellers list their properties for free and connect
                    with potential buyers and best selling experience.
                  </p>
                </div>
                <div className="ltn__feature-item ltn__feature-item-3">
                  <div className="ltn__feature-icon">
                    <span>
                      <img
                        src="images/about-us-1-5.png"
                        className="about-us-icon"
                        alt="Buy a new home"
                        loading="lazy"
                        width="55px"
                        height="55px"
                      />
                    </span>
                  </div>
                  <div className="ltn__feature-info">
                    <h4>Lots of Listings</h4>
                    <p>Browse a wide range of properties easily.</p>
                  </div>
                </div>
                <div className="ltn__feature-item ltn__feature-item-3">
                  <div className="ltn__feature-icon">
                    <span>
                      <img
                        src="images/about-us-1-2.webp"
                        className="about-us-icon"
                        alt="Buy a new home"
                        loading="lazy"
                        width="55px"
                        height="55px"
                      />
                    </span>
                  </div>
                  <div className="ltn__feature-info">
                    <h4>3D Tours</h4>
                    <p>
                      We offer immersive 3D tours to showcase your property.
                    </p>
                  </div>
                </div>
                <div className="ltn__feature-item ltn__feature-item-3">
                  <div className="ltn__feature-icon">
                    <span>
                      <img
                        src="images/about-us-1-4.webp"
                        className="about-us-icon"
                        alt="Buy a new home"
                        loading="lazy"
                        width="55px"
                        height="55px"
                      />
                    </span>
                  </div>
                  <div className="ltn__feature-info">
                    <h4>Meet Sellers</h4>
                    <p>
                      After you find a property you like, we'll set up a meeting
                      with the seller.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 about-us-left about-us-left-2">
              <div className="about-us-img-wrap about-img-left ">
                <img
                  src="images/pro-about-7.webp"
                  className=""
                  alt="Buy a new home"
                  loading="lazy"
                  width="534px"
                  height="420px"
                />
              </div>
            </div>
          </div>
        </div>

        <section className="business-banner">
          <div className="business-banner-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <span className="tadline">
                    Once you’ve settled on a Property
                  </span>
                  <h4 className="display-4 banner-heading">
                    Be inspired to achieve more, get on top
                    <br /> of every Property challenge today
                  </h4>
                  <Link
                    to="/postrequirement"
                    title="Post Requirement"
                    className="explore-more post-requiremnet"
                  >
                   
                    <span>
                      <IconSend />
                    </span>
                    Post Requirement
                    {/* </a> */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container services-wrapper">
          <div className="section-title text-left">
           
            <h3 className="aboutus">
              Services Offered
              <div className="heading-divider "></div>
            </h3>
            <p>
              We offer a variety of real estate services, including buying,
              selling, renting, and property management. As the best property
              dealer in town, our experts guide you through the market and help
              you reach your goals. Whether you're looking for a new home, an
              office space, or a rental property, we provide the best services.
            </p>
          </div>
          <div className="row services-wrapper-inside">
            {services.map((item) => (
              <div
                className="col-lg-4 mb-6 mb-lg-0 zoomIn animated"
                data-animate="zoomIn"
              >
                <div className="ser-card border-hover shadow-2 shadow-hover-lg-1   h-100 hover-change-image">
                  <div className="row ">
                    <div className="col-sm-3 ">
                      <img
                        src={item.image}
                        className=""
                        loading="lazy"
                        alt={item.alt}
                        width="126px"
                        height="101px"
                      />
                    </div>
                    <div className="col-sm-9 ser-text-wrapper">
                      <div>
                        <Link to={item.link} title={item.title}>
                          <div className="services-heading mb-2 d-flex align-items-center pointer ">
                            <div className="ser-heading ">
                              {item.sub_heading}
                            </div>

                            <span className="ser-icon">
                              <IconArrowNarrowRight
                                stroke={1}
                                height={32}
                                width={32}
                              />
                            </span>
                          </div>
                        </Link>

                        <div>
                          <p>{item.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="propery-type">
          <div className="container ">
            <div className="row">
              <div
                className="col-md-4 pr-xl-13 fadeInLeft animated"
                data-animate="fadeInLeft"
              >
                <h2 className="text-heading lh-1625">
                  Explore <br />
                  by Property Type
                </h2>
                <span className="heading-divider"></span>
               
                <Link to="/allproperties" title="Click to View All Properties">
                  <div className="pro-type-btn">
                    {Math.floor(data.length / 50) * 50}+ Available Properties
                    <i className="far fa-long-arrow-right ml-1"></i>
                  </div>
                </Link>
              </div>
              {proType.map((item) => (
                <div className="col-md">
                  <Link to={item.link} title={item.title}>
                    <div className="pro-type-card">
                      <img
                        src={item.image}
                        className="card-img-top"
                        alt={item.alt}
                        width="100px"
                        height="85px"
                        loading="lazy"
                      />
                      <div className="card-body px-0  pb-0">
                        <h4 className="card-title mb-0 ">{item.heading}</h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        
        <section className="top-categories mb-0 pb-0">
          <div className="container">
            <div className="section-title text-left">
              
              <h3 className="aboutus">
                Top Property Picks
                <div className="heading-divider "></div>
              </h3>
              <p>
                At Property Ease, we aim to make buying and selling homes easy
                and stress-free. As the best property dealer in the town, our
                team does thorough research to bring you the best property
                listings. Whether buying your dream home or selling your
                property, we're here to guide you with expert advice and
                personalized service every step of the way.
              </p>
            </div>
            
            <div className="row">
              {subData !== null &&
                subData
                  .sort((a, b) => b.pro_sub_cat_number - a.pro_sub_cat_number)
                  .slice(0, 6)
                  .map((item, index) => (
                    <div className="col-md-4">
                      <div className="pro-picks-card">
                        <div className="image">
                          <img
                            src={`images/pro-picks-${index + 1}.webp`}
                            alt="Top property picks on https://propertyease.in/"
                            loading="lazy"
                          />
                        </div>
                        <div className="content">
                          <h3>
                            <Link
                              title={item.pro_type.split(",")[0]}
                              to={`/${item.pro_type
                                .split(",")[1]
                                .toLowerCase()}/${item.pro_type
                                .split(",")[0]
                                .replaceAll(" ", "-")
                                .toLowerCase()}`}
                            >
                              {item.pro_type.split(",")[0]}
                            </Link>
                          </h3>
                          <span>({item.pro_sub_cat_number} Properties)</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        
        <section
          className="contact-us-setion py-lg-13 py-11"
          data-animated-id="8"
        >
          <div className="container">
            <div className="row">
              <div
                className="col-ld-6 col-sm-7 fadeInLeft animated d-flex align-items-center"
                data-animate="fadeInLeft"
              >
                <div className="left-sec">
                  <h2 className="contact-heading">
                    For more information about our services,
                    <span className="text-color"> get in touch</span> with our
                    expert consultants
                  </h2>
                  <p className="contact-text">
                    Take the first step towards your dream home by clicking
                    here...
                  </p>
                </div>
              </div>
              <div
                className="col-ld-6 col-sm-5 text-center mt-sm-0 mt-8 fadeInRight animated right-sec"
                data-animate="fadeInRight"
              >
                
                <p className=" phone-number-text">Call for help now!</p>
               
                <p className=" phone-number">89500 40151</p>
                <p className=" phone-number">99961 67778</p>

                
                <div
                  onClick={() => setOpen(true)}
                  className="btn btn-primary contact-btn "
                  title="Get Latest Property Updates "
                >
                  Get Latest Property Updates
                </div>
              </div>
            </div>
          </div>
        </section>



        
      </div>
      <Footer />
    </div>

  );
};

export default Index;
