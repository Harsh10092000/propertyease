import { Link } from "react-router-dom";
import {
  IconSend,
  IconArrowNarrowRight,
  IconArrowRight,
  IconAdjustmentsHorizontal,
  IconCaretUpFilled,
  IconCaretDownFilled,
  IconBath,
  IconCurrencyRupee,
  IconX,
} from "@tabler/icons-react";
import { BedAlt, RupeeSign } from "react-flaticons";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Divider, InputAdornment } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
//import Navbar from "../../components/navbar2/Navbar";
import Footer from "../../components/footer/Footer";
//import Footer from "../../components/newFooter/Footer";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
//import EmblaCarousel from './EmblaCarousel'
// import OwlCarousel from "react-owl-carousel2";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import Loader from "../../components/loader/Loader";
import Dialog from "@mui/material/Dialog";
import { regEx } from "../regEx";
//import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { Snackbar } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import moment from "moment";
import PropertyCard2 from "../../components/propertyCard2/PropertyCard2";
import RecentListHeader from "../../components/propertyCard2/RecentListHeader";
import AllPropertyButton from "../../components/propertyCard2/AllPropertyButton";

// import Reviews from "../../components/reviews/Reviews";

const Index = () => {

// const OPTIONS = { align: 'start', dragFree: true, loop: true }
// const SLIDE_COUNT = 5
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const testData = [
    {
      name: "Anita Sharma",
      content: `This real estate broker made the home-buying process so easy for us. They understood our needs and showed us several options within our budget. We are very happy with our new home!`,
      city: "Mohali",
    },
    {
      name: "Vikram Patel",
      content: `Propertyease helped us buy the perfect 3BHK flat in a great neighborhood at a very reasonable price. We had spoken to many home-selling agents before, but this one stood out.`,
      city: "Mohali",
    },
    {
      name: "Ritesh",
      content: `I found the perfect office space for my business thanks to this real estate broker. They listened to what I needed and found several great options for me to choose from.`,
      city: "Gurugram",
    },
    {
      name: "Rabia Mullick",
      content: `I had been struggling to find a rental property in a good area, but propertyease came through for me. They were very knowledgeable about the market and helped me find exactly what I wanted. Now i can say that they are best property dealers for rental properties.`,
      city: "Kurukshetra",
    },
    {
      name: "Sanjay Kumar",
      content: `Working with this real estate broker was a fantastic experience. They were always available to answer my questions and guided me through buying my first home.`,
      city: "Ambala",
    },
    {
      name: "Namit Garg",
      content: `I am incredibly impressed by how this real estate broker works. They helped me meet many sellers and landowners who were interested in selling.`,
      city: "Ambala",
    },
    {
      name: "Priya Singh",
      content: `I was looking to sell my house quickly, and the broker did it in no time. They were professional and efficient and got me a great price.
      .
            `,
      city: "Chandigarh",
    },
  ];

  const cities = [{ district: "All India" }];
  const [location, setLocation] = useState("All India");
  const [cityData, setCityData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [currentFilter, setCurrentFilter] = useState("All");
  const [proTypeFilter, setProTypeFilter] = useState("All");
  const [proSubTypeFilter, setProSubTypeFilter] = useState(["t1", "t2"]);

  const [propertyTypeFilter, setPropertyTypeFilter] =
    useState("All Properties");
  const [openPropertyTypeOptions, setOpenPropertyTypeOptions] = useState(false);

  const [propertyAdTypeFilter, setPropertyAdTypeFilter] =
    useState("All Properties");
  const [openPropertyAdTypeOptions, setOpenPropertyAdTypeOptions] =
    useState(false);

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

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/StateDistinctCityData`)
      .then((res) => {
        setCityData(res.data);
      });
  }, []);

  const [data, setData] = useState([]);
  const [subscribedUser , setSubscribedUser] = useState(false);
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
      .get(import.meta.env.VITE_BACKEND + `/api/setting/fetchSubscriberDataById/${currentUser[0].login_email}`)
      .then((res) => {
        setSubscribedUser(res.data);
      });
    }
  }, [currentUser]);


  // const handleClick = (index) => {
  //   var newArr = selectedTypes.join(",").replaceAll(",", "-");

  //   navigate(
  //     `/allproperties?search=${searchValue}&cat=${proTypeFilter}&proSubTypeFilter=${newArr}`
  //   );
  // };

  const handleClick = (index) => {
    //var newArr = selectedTypes.join(",").replaceAll(",", "-");
    navigate(
      `/allproperties?search=${searchValue}&proadtype=${propertyAdTypeFilter}`
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

  const forSellers = [
    {
      sub_heading: "Find Buyers",
      content: `Connect with interested buyers quickly.`,
    },
    {
      sub_heading: "Free Listings",
      content: `List your property for free to reach more people.
        `,
    },
    {
      sub_heading: "3D Tours",
      content: `Show off your property with virtual 3D tours.
        `,
    },
  ];

  const forBuyers = [
    {
      sub_heading: "Lots of Listings",
      content: `Browse a wide range of properties easily.`,
    },
    {
      sub_heading: "3D Tours",
      content: `Explore properties online with 3D tours to save time.
        `,
    },
    {
      sub_heading: "Meet Sellers",
      content: `After you find a property you like, we'll set up a meeting with the seller.
        `,
    },
  ];

  const services = [
    {
      sub_heading: "Buy Property",
      content: `Your dream home awaits here.`,
      image: "images/services-icon-1.webp",
      link: "/allproperties",
      title: "Click to View All Properties",
      alt: `Buy Property on propertyease.in`
    },
    {
      sub_heading: "Sell Property",
      content: `Sell fast with our help at a good cost.`,
      image: "images/services-icon-2.webp",
      link: "/addproperty",
      title: "List Property",
      alt: "Sale Property on propertyease.in"
    },
    {
      sub_heading: "Rent Property",
      content: `Find your perfect rental today.`,
      image: "images/services-icon-2.webp",
      link: "/addproperty",
      title: "List Property",
      alt: "Rent Property on propertyease.in"
    },
    // {
    //   sub_heading: "Rent Property",
    //   content: `After you find a property you like, we'll set up a meeting with the seller.`,
    //   image: "",
    // },
  ];

  const proType = [
    {
      heading: "Residential",
      image: "images/pro-type-1.webp",
      link: "/listing/residential",
      title: "Click to View All Residential Properties",
      alt: "Check out Residential properties on propertyease.in"
    },
    {
      heading: "Commerical",
      image: "images/pro-type-2.webp",
      link: "/listing/commercial",
      title: "Click to View All Commerical Properties",
      alt: "Check out Commerical properties on propertyease.in"
    },
    {
      heading: "Land",
      image: "images/pro-type-3.webp",
      link: "/listing/land",
      title: "Click to View All Land/Plots Properties",
      alt: "Check out Land properties on propertyease.in"
    },
  ];

  const propertyTypeOptions = [
    { type: "All Properties" },
    { type: "Residential" },
    { type: "Commerical" },
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

  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTypeToggle = (id) => {
    console.log(id);
    if (selectedTypes.includes(id)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== id));
    } else {
      setSelectedTypes([...selectedTypes, id]);
    }
  };

  const handleAllTypes = () => {
    setSelectedTypes((prevSelectedTypes) => {
      const updatedTypes = propertyType
        .map((item) => item.id)
        .filter((type) => !prevSelectedTypes.includes(type));
      return [...prevSelectedTypes, ...updatedTypes];
    });
  };

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

  // const viewerRef = useRef(null); // Initialize with null
  // useEffect(() => {
  //   //if (!viewerRef.current) return;
  //   viewerRef.current.animate({
  //     yaw: Math.PI / 2,
  //     pitch: "20deg",
  //     zoom: 40,
  //     speed: "2rpm",
  //     time_anim: "0",
  //   });
  // }, [proData]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = (data) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(subscribedUser !== true) {

      const timer = setTimeout(() => {
        setOpen(true);
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
      setOpenSubSnack(true);
      //setSnack(true);
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* <div onClick={() => setOpen(true)}>open dialog</div> */}
      <Helmet>
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
            {/* <div className="popup-btn-text">
              Subscribe to recieve the latest news by email about properties.
              Unsubscribe any time.
            </div> */}
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
      {/* <div onClick={handleClickOpen}>Open Dialog</div> */}

      <div>
        <div className="image-cover hero-banner" data-select2-id="13">
          <div className="container" data-select2-id="12">
            <div className="row justify-content-center" data-select2-id="11">
              <div
                className="col-lg-9 col-md-11 col-sm-12 banner-text-wrapper"
                data-select2-id="10"
              >
                <div className="inner-banner-text ">
                  <h1>Ab property bechna kharidna hoga aasan</h1>
                </div>
                <div className="banner-text-2 ">
                  <p className="shadow">Find Real Properties at Best Price</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-search">
            <div className="container hero-search-wrapper">
              <div className="row">
                <div
                   className={`col-md-3 all-types pointer position-relative ${
                    openPropertyAdTypeOptions ? "arrow-up" : "arrow-down"
                  }`}
                  onClick={() =>
                    setOpenPropertyAdTypeOptions(!openPropertyAdTypeOptions)
                  }
                >
                  <div className="">{propertyAdTypeFilter}</div>
                  {openPropertyAdTypeOptions && (
                    <div ref={dropdownRef} className=" pro-ad-type-list-wrapper">
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
                  {/* <div className="location-icon-3">
                    <IconCaretUpFilled />
                  </div> */}
                </div>

                <div className="col-md">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a property"
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

                  {/* <div className="location-icon">
                    <IconAdjustmentsHorizontal />
                  </div> */}
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
          {/* {openPropertyAdTypeOptions && (
            <div className="container pro-ad-type-list-wrapper">
              <div id="pro-ad-type-list">
                {propertyAdTypeOptions.map((item) => (
                  <div
                    className={`${
                      propertyAdTypeFilter === item.type ? "selected" : ""
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
          )} */}
        </div>

        {/* ########## Featured properties ########## */}

        {/* <section className="featured-properties mt-5 mb-5">
          <div className="container">
            <div className="section-title">
              <h3>
                Featured <span>Properties</span>
              </h3>
            </div>
            <div className="row">
              <div className="featured-properties-wrapper">
                <div className="cusstom-bg-slider-gray d-flex">
                  <div className="card border-0 col-md-6">
                    <ReactPhotoSphereViewer
                      ref={viewerRef}
                      //src="/images/360-9.png"
                      src="https://media.macphun.com/img/uploads/macphun/blog/2432/1_360DegreePhotographyGuidetoPerfectingPanoramas.jpg"
                      height={"100%"}
                      width={"530px"}
                    />
                    <div className="card-img-overlay p-2">
                      <span className="badge mr-2 badge-orange">Featured</span>
                      <span className="badge mr-2 badge-primary">For Sale</span>
                    </div>
                  </div>

                  <div className=" col-md-6 featured-properties-right">
                    <Link className="" tabindex="0">
                      <h2 className="my-0">
                        6 Marla Residential Land for Sale in Sector 30,
                        Thanesar, Kurukshetra, Haryana
                      </h2>
                    </Link>
                    <p className="sub-heading">
                      Sector 30, Kurukshetra, Haryana
                    </p>
                    <p className="item-desc">
                      Lorem ipsum dolor sit amet, consec tetur cing elit.
                      Suspeor sit amet, cons ndisse suscorem ipsum dolor sit.
                    </p>

                    <div className="property-details">
                      <div className="row property-details-sec">
                        <div className="col-md-6 d-flex">
                          <BedAlt
                            color="#0ec6d5"
                            size="20px"
                            className=" mr-2"
                          />
                          3 Bedrooms
                        </div>
                        <div className="col-md-6 d-flex">
                          <IconBath
                            color="#0ec6d5"
                            size="20px"
                            className=" mr-2"
                          />
                          3 Bathrooms
                        </div>
                      </div>

                      <div className="row property-details-sec">
                        <div className="col-md-6 d-flex">
                          <BedAlt
                            color="#0ec6d5"
                            size="20px"
                            className=" mr-2"
                          />
                          3 Bedrooms
                        </div>
                        <div className="col-md-6 d-flex">
                          <IconBath
                            color="#0ec6d5"
                            size="20px"
                            className=" mr-2"
                          />
                          3 Bathrooms
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between border-top property-details-footer">
                      <div className="fs-20 font-weight-bold text-heading mb-1 d-flex pricing-sec">
                        <IconCurrencyRupee
                          color="black"
                          size="26px"
                          className=" mr-1 rupee-icon"
                        />
                        55 Lac
                      </div>
                      <div className="pro-btns">
                        <button className="btn btn-outline-primary mr-3">
                          View More
                        </button>
                        <button className="btn btn-primary">Whatsapp</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

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
               
                <PropertyCard2 item={item} currentUser={currentUser} index={index}/>
                ))}

                
              </div>
            </div>

           <AllPropertyButton />

          </div>
        </section>

        <section className="most-view-Property mt-5 mb-5">
          <div className="container">
            {/* <div className="section-title">
              <h3>
                Recent Listed <span>Properties</span>
              </h3>
              <p>
                Looking for a service? Discover the most recent service
                providers in your city, vetted and selected by our dedicated
                team of analysts
                <br /> based on feedback gathered from users like you!
              </p>
            </div>
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
            </div> */}
            {/* <div className="row">
              {filteredData.slice(0, 6).map((item, index) => (
                <div className="col-md-4 pb-4" key={index}>
                  <div className="uniBlock">
                    <div className="recent-box-serv">
                      <div className="re-bus-img">
                        <Link to={`/${item.pro_url}`}>
                          {item.img_link ? (
                            <img
                              src={`${
                                import.meta.env.VITE_BACKEND
                              }/propertyImages/watermark/${item.img_link}`}
                              alt="img"
                            />
                          ) : (
                            <img src="/images/default.png" alt="no image" />
                          )}
                        </Link>
                      </div>
                      <div className="recent-bus-content">
                        <h5 className="property-listing-type">
                          <Link to={`/${item.pro_url}`}>
                            <a>{item.pro_type.split(",")[0]}</a>
                          </Link>
                        </h5>
                        <ul className="front-all-property-slider">
                          <li className="text-capitalize">
                            <img
                              src="/img/location.png"
                              className="property-slider-icon"
                            />
                            <strong className="frontPropIcon">
                              Address&nbsp;{" "}
                            </strong>
                            {item.pro_locality},&nbsp;
                            {item.pro_sub_district
                              ? item.pro_sub_district + ", "
                              : ""}
                            {item.pro_city}
                          </li>
                          {item.plot_area_size ? (
                            <li>
                              <img
                                src="/img/face-detection.png"
                                className="property-slider-icon"
                              />
                              <strong className="frontPropIcon">
                                Plot Size &nbsp;
                              </strong>
                              {item.plot_area_size}
                            </li>
                          ) : (
                            ""
                          )}
                          {item.pro_width ? (
                            <li>
                              <img
                                src="/img/meter.png"
                                className="property-slider-icon"
                              />
                              <strong className="frontPropIcon">
                                Dimension&nbsp;
                              </strong>
                              ({item.pro_width} Feet * {item.pro_length} Feet)
                            </li>
                          ) : (
                            ""
                          )}

                          <li>
                            <img
                              src="/img/rupee.png"
                              className="property-slider-icon"
                            />
                            <strong className="frontPropIcon">Price </strong>
                            &nbsp;
                            {"₹ " + item.pro_amt + " " + item.pro_amt_unit}
                          </li>

                          <li>
                            <img
                              src="/img/facing.png"
                              className="property-slider-icon"
                            />
                            <strong className="frontPropIcon">
                              Property Facing
                            </strong>
                            &nbsp;
                            {item.pro_facing}
                          </li>
                        </ul>
                        <Link to={`/${item.pro_url}`}>
                          <a
                            title="View complete details of this property"
                            className="btn-viewmore"
                          >
                            View More
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
            {/* <div className="text-center">
              <Link
                to={`/allproperties`}
                title="Click to view all properties"
                className="btn btn-lg see-all-pro"
              >
                See all properties
                <IconArrowRight className="ml-1" />
              </Link>
            </div> */}

            {/* <div className="d-flex flex-row-reverse  mr-3">
              <Link to={`/allproperties`}>
                <a
                  title="Click to view all properties"
                  className="btn-viewall px-4 "
                >
                  View All
                </a>
              </Link>
            </div> */}
          </div>
        </section>

        {/* <div className="container">
          <div
            className="row justify-content-center"
            data-cues="slideInUp"
            data-disabled="true"
          >
            <div
              className=" col-md-4 animation-wrapper"
              data-cue="slideInUp"
              data-show="true"
            >
              <div className="category-card">
                <div className="image">
                  <img src="assets/images/category/category1.png" alt="image" />
                </div>
                <div className="content">
                  <h3>
                    <a href="property-grid.html">Residential</a>
                  </h3>
                  <span>(26 Properties)</span>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 animation-wrapper"
              data-cue="slideInUp"
              data-show="true"
            >
              <div className="category-card">
                <div className="image">
                  <img src="assets/images/category/category2.png" alt="image" />
                </div>
                <div className="content">
                  <h3>
                    <a href="property-grid.html">Commercial</a>
                  </h3>
                  <span>(33 Properties)</span>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 animation-wrapper"
              data-cue="slideInUp"
              data-show="true"
            >
              <div className="category-card">
                <div className="image">
                  <img src="assets/images/category/category3.png" alt="image" />
                </div>
                <div className="content">
                  <h3>
                    <a href="property-grid.html">Vacation &amp; Resort</a>
                  </h3>
                  <span>(37 Properties)</span>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 animation-wrapper"
              data-cue="slideInUp"
              data-show="true"
            >
              <div className="category-card">
                <div className="image">
                  <img src="assets/images/category/category4.png" alt="image" />
                </div>
                <div className="content">
                  <h3>
                    <a href="property-grid.html">The Land</a>
                  </h3>
                  <span>(54 Properties)</span>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 animation-wrapper"
              data-cue="slideInUp"
              data-show="true"
            >
              <div className="category-card">
                <div className="image">
                  <img src="assets/images/category/category5.png" alt="image" />
                </div>
                <div className="content">
                  <h3>
                    <a href="property-grid.html">New Construction</a>
                  </h3>
                  <span>(123 Properties)</span>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 animation-wrapper"
              data-cue="slideInUp"
              data-show="true"
            >
              <div className="category-card">
                <div className="image">
                  <img src="assets/images/category/category6.png" alt="image" />
                </div>
                <div className="content">
                  <h3>
                    <a href="property-grid.html">Luxury Estate</a>
                  </h3>
                  <span>(355 Properties)</span>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 animation-wrapper"
              data-cue="slideInUp"
              data-show="true"
            >
              <div className="category-card">
                <div className="image">
                  <img src="assets/images/category/category7.png" alt="image" />
                </div>
                <div className="content">
                  <h3>
                    <a href="property-grid.html">Eco-Friendly</a>
                  </h3>
                  <span>(89 Properties)</span>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 animation-wrapper"
              data-cue="slideInUp"
              data-show="true"
            >
              <div className="category-card">
                <div className="image">
                  <img src="assets/images/category/category8.png" alt="image" />
                </div>
                <div className="content">
                  <h3>
                    <a href="property-grid.html">Historic Properties</a>
                  </h3>
                  <span>(17 Properties)</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <section className="about-us-wrapper mt-5 mb-5">
          <div className="container">
            <div className="row ">
              <div className="col-md-6">
                <img
                  src="/images/about-us.png"
                  alt="banner"
                  className="about-us-img"
                />
              </div>
              <div className="col-md-6 about-us-text">
                <h3>About Us</h3>
                <p>
                  Founded in 2023, Propertyease.in aims to make buying and
                  selling property easy and stress-free. We connect buyers and
                  sellers directly and provide helpful tools, detailed listings,
                  and valuable information to support smart decisions. That is
                  why we are the best property dealer in town.
                </p>
                <p>
                  Our platform is designed for transparency and efficiency,
                  ensuring a smooth and reliable experience. Whether you're
                  buying your dream home or selling a property, Propertyease.in
                  simplifies the process for you.
                </p>
              </div>
            </div>

            <div className="row about-us-wrapper-2">
              <div className="col-md-6 ">
                <div className="sec-card">
                  <div>
                    <div className="main-heading">For Sellers</div>
                  </div>

                  {forSellers.map((item) => (
                    <div>
                      <div className="sub-heading">
                        <span>
                          <IconCheckbox />
                        </span>{" "}
                        {item.sub_heading}
                      </div>
                      <p>{item.content}</p>
                    </div>
                  ))}

                  <div>
                    <button className="btn btn-primary">
                      Sell Your Property
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6 ">
                <div className="sec-card">
                  <div>
                    <div className="main-heading">For Buyers</div>
                  </div>
                  {forBuyers.map((item) => (
                    <div>
                      <div className="sub-heading">
                        <span>
                          <IconCheckbox />
                        </span>{" "}
                        {item.sub_heading}
                      </div>
                      <p>{item.content}</p>
                    </div>
                  ))}
                  <div>
                    <button className="btn btn-primary">Buy Property</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <div className="container about-us-wrapper-1">
          <div className="section-title text-left">
            {/* <h3>
              About <span>Us</span>
            </h3> */}
             <h3 className="aboutus">
               {/* <div className="d-dlex justify-content-between">
                <div>About Us </div>  <div className="text-center">
              <Link
                to={`/allproperties`}
                title="Click to view all properties"
                className="btn btn-lg see-all-pro"
              >
                See all properties
                <IconArrowRight className="ml-1" />
              </Link>
            </div></div> */}
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
                <Link to="/postrequirement" title="Post Requirement" className="explore-more post-requiremnet">
                  {/* <a
                    className="explore-more post-requiremnet"
                    
                  > */}
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
            {/* <h3>
              Services <span>Offered</span>
            </h3> */}
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
                      <img src={item.image} className="" alt={item.alt} />
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
                {/* <p className="mb-6">
                  Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe
                  ndisse suscipit
                </p> */}
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
                        alt={item.heading}
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

        {/* <div className="choose-us-wrapper choose-us-bg">
          
          <div className="container">
            <div className="section-title pt-5 pb-5">
            <h3 className="">
              Why Choose <span>Us?</span>
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
        </div>
        </div> */}
        {/* <div className="row mt-7 mb-6 mb-lg-11">
          <div className="col-lg-6 mb-6 mb-lg-0">
            <div
              className="media rounded-lg bg-white border border-hover shadow-xs-2 shadow-hover-lg-1 px-7 py-8 hover-change-image flex-column flex-sm-row h-100 fadeInUp animated"
              data-animate="fadeInUp"
            >
              <img
                src="images/group-16.png"
                alt="Buy a new home"
                className="mb-6 mb-sm-0 mr-sm-6"
              />
              <div className="media-body">
                <a
                  href="#"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <h4 className="fs-20 lh-1625 text-secondary mb-1">
                    Buy a new home
                  </h4>
                  <div className="position-relative d-flex align-items-center ml-2">
                    <span className="image text-primary position-absolute pos-fixed-left-center fs-16">
                      <i className="fal fa-long-arrow-right"></i>
                    </span>
                    <span className="text-primary fs-42 lh-1 hover-image d-flex align-items-center">
                      <svg className="icon icon-long-arrow">
                        <use xlink:href="#icon-long-arrow"></use>
                      </svg>
                    </span>
                  </div>
                </a>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe
                  ndisse suscipit
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-6 mb-lg-0">
            <div
              className="media rounded-lg bg-white border border-hover shadow-xs-2 shadow-hover-lg-1 px-7 py-8 hover-change-image flex-column flex-sm-row h-100 fadeInUp animated"
              data-animate="fadeInUp"
            >
              <img
                src="images/group-17.png"
                alt="Sell a home"
                className="mb-6 mb-sm-0 mr-sm-6"
              />
              <div className="media-body">
                <a
                  href="#"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <h4 className="fs-20 lh-1625 text-secondary mb-1">Sell a home</h4>
                  <div className="position-relative d-flex align-items-center ml-2">
                    <span className="image text-primary position-absolute pos-fixed-left-center fs-16">
                      <i className="fal fa-long-arrow-right"></i>
                    </span>
                    <span className="text-primary fs-42 lh-1 hover-image d-flex align-items-center">
                      <svg className="icon icon-long-arrow">
                        <use xlink:href="#icon-long-arrow"></use>
                      </svg>
                    </span>
                  </div>
                </a>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe
                  ndisse suscipit
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <section className="top-categories mb-0 pb-0">
          <div className="container">
            <div className="section-title text-left">
              {/* <h3>
                Top Property <span>Picks</span>
              </h3> */}
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
            {/* <div className="row">
              <div className="col-md-4">
                <div className="cate-box">
                  <Link to={"/property/residential"}>
                    <div className="cat-img-icon">
                      <div className="cate-img">
                        <img
                          src="img/residential.jpg"
                          alt="home-services"
                          width="352px"
                          height="240px"
                        />
                      </div>
                      <div className="cate-name-icon flex flex-col items-center gap-1">
                        <span>
                          <IconHome />
                        </span>
                        <h5>Residential</h5>
                      </div>
                    </div>
                  </Link>
                  <div className="cateories-list">
                    <ul>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Independent House</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Builder Floor</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Farm House</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Raw House</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Retirement Community</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Studio Apartment</a>
                      </li>
                    </ul>
                    <Link to={"/property/residential"}>
                      <a
                        title="Click to view all properties"
                        className="btn-viewmore"
                      >
                        View More
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="cate-box">
                  <Link to="/property/land">
                    <a>
                      <div className="cat-img-icon">
                        <div className="cate-img">
                          <img
                            src="img/plot-land.jpg"
                            alt="home-services"
                            width="352px"
                            height="240px"
                          />
                        </div>
                        <div className="cate-name-icon">
                          <span>
                            <IconMapPinFilled />
                          </span>
                          <h5>Land / Plots</h5>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <div className="cateories-list">
                    <ul>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Residential Land</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Commercial Land</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Industrial Land</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Agricultural Land</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Farm House Land</a>
                      </li>
                    </ul>
                    <Link to={"/property/land"}>
                      <a
                        title="Click to view all properties"
                        className="btn-viewmore"
                      >
                        View More
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="cate-box">
                  <Link to={"/property/commercial"}>
                    <a>
                      <div className="cat-img-icon">
                        <div className="cate-img">
                          <img
                            src="img/commercial.jpg"
                            alt="home-services"
                            width="352px"
                            height="240px"
                          />
                        </div>
                        <div className="cate-name-icon">
                          <span>
                            <IconBuilding />
                          </span>
                          <h5>Commercial</h5>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <div className="cateories-list">
                    <ul>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Retail Showroom/Shop</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Commercial Building</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Office Complex</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">IT/Software Technology Park</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Warehouse</a>
                      </li>
                    </ul>

                    <Link to={"/property/commercial"}>
                      <a
                        title="Click to view all properties "
                        className="btn-viewmore"
                      >
                        View More
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}
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

        {/* <section className="promation">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="prom-left">
                  <h4>
                    Are you looking for buyers where <br />
                    you can get the best deal?
                  </h4>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="prom-right ">
                  <h4>
                    List on Propertyease for <span className="free">FREE!</span>
                  </h4>
                  <Link
                    to="/addproperty"
                    className="d-flex justify-content-center"
                    title="List Property"
                  >
                    <div className="btn btn-primary w-75 d-flex justify-content-center align-items-center gap-4">
                      
                      <IconPlus />
                      &nbsp; List Property
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section className="call-to-action">
          <div className="container">
            <div className="course-help-question">
              <div className="course-help-question__content">
                <h3>Don't miss out on this opportunity! </h3>
                <p className="course-help-question__text">
                  Take the first step towards your dream home by clicking
                  here...
                </p>
              </div>
              <div className="course-help-question__btn-wrap ">
                <a href="tel:9996716787" className="btn-resiter-earing">
                  <span>
                    <IconPhone />
                  </span>
                  <div className="ph-content" style={{ fontSize: "18px" }}>
                    <strong>TALK TO EXPERTS</strong>
                    <br />

                    <div>Call: +91 99967 16787</div>
                    <div>Call: +91 89500 40151</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section> */}

        {/* <div className="container">
          <div className="section-title">
            <h3>
              Our <span>Testimonials</span>
            </h3>
          </div>
          <OwlCarousel options={options2}>
            {testData.map((testimonial, index) => (
              <div key={index} className="testimonial">
                <h3 className="title">{testimonial.name}</h3>
                <p className="description">{testimonial.content}</p>
              </div>
            ))}
          </OwlCarousel>
        </div> */}

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
                {/* <IconPhone className="contact-us-icon" /> */}
                <p className=" phone-number-text">Call for help now!</p>
                {/* <p className=" phone-number">99967 16787</p> */}
                <p className=" phone-number">89500 40151</p>
                <p className=" phone-number">99961 67778</p>

                <Link to="/contactus" className="btn btn-primary contact-btn ">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* <Reviews slides={SLIDES} options={OPTIONS} />*/}

        {/* <div className="container pt-5">
          <div className="section-title">
            <h3>
              What People <span>Says</span>
            </h3>
            <p>
              We place huge value on strong relationships and have seen and the
              benefit they bring to our business. Customer feedback is vital in
              helping us to get it right.
            </p>
          </div>
          <div className="row pb-5">
            <OwlCarousel options={options}>
              {testData.map((testimonial, index) => (
                <div className="review-wrapper" key={index} data-set={index}>
                  <div className="testimonial__block-card bg-reviews">
                    <p>{testimonial.content}</p>
                  </div>
                  <div className="testimonial__block-users">
                    <div className="testimonial__block-users-name">
                      {testimonial.name} <br />
                      <span className="testimonial_city">
                        {testimonial.city}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
