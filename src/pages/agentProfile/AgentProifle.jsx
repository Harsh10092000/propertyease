import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {
  IconSend,
  IconShare3,
  IconStarFilled,
  IconBrandWhatsapp,
  IconBrandFacebook,
  IconX,
  IconChevronRight,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconWorld,
  IconBrandInstagram,
  IconAsterisk,
} from "@tabler/icons-react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { regEx } from "../regEx";
import { InputAdornment, Snackbar } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";

const AgentProifle = () => {
  const { currentUser } = useContext(AuthContext);
  //const { agentId } = useParams();
  //const { userId } = useParams();
  const { userId } = useParams();
  const arrproId = userId.split("-");
  const agentId = arrproId[arrproId.length - 1];

  const propertyUserType = [
    { value: "Buy" },
    { value: "Sale" },
    { value: "Rent" },
  ];

  const [snack, setSnack] = useState(false);
  const [sticky, setSticky] = useState(false);
  const handleScroll = () => {
    const scrollPosition = window.scrollY; // => scroll position
    if (scrollPosition > 100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  //const agentId = 20;
  const [agentData, setAgentData] = useState();
  const [agentWorkPlaceData, setAgentWorkPlaceData] = useState();
  const [agentWorkPlaceState, setAgentWorkPlaceState] = useState("");
  const [properties, setProperties] = useState([]);
  const [latestProperties, setLatestProperties] = useState([]);
  const [propertyNo, setPropertyNo] = useState([]);
  const [saleCount, setSaleCount] = useState();
  const [rentCount, setRentCount] = useState();

  const propertyType = [
    { type: "View Residentail Properties", link: "/property/residential" },
    { type: "View Commerical Properties", link: "/property/commercial" },
    { type: "View Land/Plots Properties", link: "/property/land" },
    { type: "View All Properties", link: "/allproperties" },
  ];

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/agent/fetchAgentData1/${agentId}`
      )
      .then((res) => {
        //console.log("res : ", res.data, res.data.agentData[0]);
        setAgentData(res.data.agentData[0]);
        setAgentWorkPlaceData(res.data.agentWorkPlaceData);
        setAgentWorkPlaceState(res.data.agentWorkStateData[0].work_state);
      });
    // axios
    //   .get(
    //     import.meta.env.VITE_BACKEND + `/api/agent/fetchAgentData/${agentId}`
    //   )
    //   .then((res) => {
    //     setAgentData(res.data[0]);
    //   });
    // axios
    //   .get(
    //     import.meta.env.VITE_BACKEND +
    //       `/api/agent/fetchAgentWorkPlace/${agentId}`
    //   )
    //   .then((res) => {
    //     setAgentWorkPlaceData(res.data);
    //   });
    // axios
    //   .get(
    //     import.meta.env.VITE_BACKEND +
    //       `/api/agent/fetchAgentWorkState/${agentId}`
    //   )
    //   .then((res) => {
    //     setAgentWorkPlaceState(res.data[0].work_state);
    //   });
  }, []);



  useEffect(() => {
    axios
      // .get(
      //   import.meta.env.VITE_BACKEND +
      //     `/api/agent/fetchpPropertiesByUser/${currentUser[0].login_id}`
      // )
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/agent/fetchpPropertiesByUser/${agentData?.user_cnct_id}`
      )
      .then((res) => {
        setProperties(res.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchLatestProperty`)
      .then((res) => {
        setLatestProperties(res.data);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/agent/fetchPropertyNo/${agentData?.user_cnct_id}`
      )
      .then((res) => {
        setPropertyNo(res.data);
        setSaleCount(res.data[0].Sale_Count);
        setRentCount(res.data[0].Rent_Count);
      });
  }, [agentData]);

  //console.log("saleCount : ", saleCount);

  // console.log(agentData, agentWorkPlaceData);
  //   {
  //     "agent_id": 5,
  //     "agent_name": "Haesh",
  //     "agent_email": "harshgupta.calinfo@gamil.com",
  //     "agent_phone": "9867543467",
  //     "agent_exp": "1-3",
  //     "agent_state": "Haryana",
  //     "agent_city": "Kurukshetra",
  //     "agent_sub_district": "Babain St",
  //     "agent_locality": "Sector 13",
  //     "agent_comapnay_name": "Calinfo",
  //     "agent_company_website": "Calinfo.com",
  //     "agent_desc": "testing"
  // }

  const splitDistrict = (value) => {
    const a = value.split(",");
    return a.map((item) => {
      return <span>{item}</span>;
    });
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    queryType: "",
    agentname: "",
    agentemail: "",
    agentphone: "",
    agentid: "",
  });

  const handleSubmit = async () => {
    data.agentname = agentData.agent_name;
    data.agentemail = agentData.agent_email;
    data.agentphone = agentData.agent_phone;
    data.agentid = agentData.agent_id;
    setLoader(true);
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/contact/contactAgent",
        data
      );
      setLoader(false);
      setData({
        name: "",
        email: "",
        phone: "",
        queryType: "",
        agentname: "",
        agentemail: "",
        agentphone: "",
        agentid: "",
      });
      setSnack(true);
    } catch (err) {
      console.log(err);
    }
  };

  //console.log("data : ", data);

  const handleSnack = () => {
    setSnack(false);
  };

  const [step, setStep] = useState(false);
  const handleStep = () => {
    if (
      data.name !== "" &&
      data.phone.length > 9 &&
      emailError === false &&
      data.queryType !== ""
    ) {
      setStep(false);
      handleSubmit();
    } else {
      setStep(true);
    }
  };

  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [emailError, setEmailError] = useState(true);
  useEffect(() => {
    if (!regEx[0].emailRegex.test(data.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [data.email]);

  useEffect(() => {
    if (emailError === false && data.name !== "" && data.phone.length > 9) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [data, emailError]);

  const formatString = (str) => str.toLowerCase().replace(/ /g, '-');

  return (
    <div>
      <Navbar />
      {loader ? <Loader /> : ""}
      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack}
        autoHideDuration={1000}
        onClose={handleSnack}
        message="We Will Contact you soon !.."
      />
      <div className="container padding-top">
        <div className="row">
          <div className="col-md-12">
            <div>
              {agentData && (
                <section className="property-view-outer">
                  <ul className="coming-field-content">
                    <li>
                      <Link to="/agentlist">
                        <a>
                          All Brokers
                          <span>
                            <IconChevronRight className="sidebar-faicon" />
                          </span>
                        </a>
                      </Link>
                    </li>

                    <li>
                      {/* <Link>
                        <a> */}
                      Real Estate Brokers in {agentData.agent_state}
                      <IconChevronRight className="sidebar-faicon" />
                      {/* </a>
                      </Link> */}
                    </li>

                    {agentData.agent_city !== "" && (
                      <li>
                        Real Estate Brokers in {agentData.agent_city}
                        <span>
                          <IconChevronRight className="sidebar-faicon" />
                        </span>
                      </li>
                    )}

                    <li>{agentData.agent_name}</li>
                  </ul>

                  <div className="property-view-inner agent-profile-wrapper">
                    <div className="row">
                      <div
                        className={sticky ? "top newClass" : "top"}
                        id="dynamic"
                      >
                        <div className="profile-block  pt-2 pt-md-0 pl-3 pl-md-0 pr-3 pr-md-0">
                          <div className="profile-left">
                            <div className="profile-pict">
                              {/* <img src="/img/person.jpg"  /> */}

                              {agentData.agent_image ? (
                                <img
                                  src={`${
                                    import.meta.env.VITE_BACKEND
                                  }/userImages/${agentData.agent_image}`}
                                  alt="img"
                                />
                              ) : (
                                <img src="/img/person.jpg" />
                              )}
                            </div>
                            <div className="profile-info d-flex justify-content-between w-100">
                              <div>
                                <h1 className="capitalize pl-md-0 d-flex gap-3 align-items-center agent-name">
                                  {agentData.agent_name}
                                </h1>
                                <div className="property-top-address pl-md-0 pl-0 pb-0 text-capitalize ">
                                  {/* <span>
                                    {agentData.agent_locality &&
                                      agentData.agent_locality + ", "}
                                  </span> */}
                                  {/* <span>
                                    {agentData.agent_sub_district &&
                                      agentData.agent_sub_district + ", "}
                                  </span> */}
                                  <span>
                                    {agentData.agent_city &&
                                      agentData.agent_city + ", "}
                                  </span>
                                  <span>
                                    {agentData.agent_state &&
                                      agentData.agent_state}
                                  </span>
                                </div>
                                <div className="pt-1 mobile-hidden-pro">
                                  {saleCount !== null && rentCount !== null ? (
                                    <>
                                      <div title="Click to view properties ">
                                        <Link
                                          to={`/agentproperties/Sale-${agentData?.user_cnct_id}`}
                                          className="loc-list agent-profile-loc-list"
                                        >
                                          <span>
                                            {saleCount} Property for sale
                                          </span>
                                        </Link>

                                        <Link
                                          to={`/agentproperties/Rent-${agentData?.user_cnct_id}`}
                                          className="loc-list agent-profile-loc-list"
                                        >
                                          <span>
                                            {rentCount} Property for rent
                                          </span>
                                        </Link>
                                      </div>
                                    </>
                                  ) : saleCount !== null ||
                                    rentCount !== null ? (
                                    <>
                                      <div>
                                        <Link
                                          title="Click to view properties"
                                          className="loc-list agent-profile-loc-list"
                                          to={`/agentproperties/${
                                            saleCount !== null ? "Sale" : "Rent"
                                          }-${agentData?.user_cnct_id}`}
                                        >
                                          <span>
                                            {saleCount + " Property for sale" ||
                                              rentCount + " Property for rent"}
                                          </span>
                                        </Link>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="loc-list ">
                                      <span>0 Properties Listed</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="socail-icon-share ">
                                <button
                                  className="fb pl-0"
                                  title="Share On Facebook"
                                >
                                  <a
                                    rel="noreferrer nofollow"
                                    href={`https://www.facebook.com/sharer.php?u=https://www.propertyease.in/agentProfile/${formatString(agentData.agent_name)}-in-${formatString(agentData.agent_sub_district)}-${formatString(agentData.agent_city)}-${formatString(agentData.agent_state)}-${agentData.user_cnct_id}`}
                                    target="_blank"
                                    className="share-property"
                                  >
                                    <IconBrandFacebook />
                                    <span
                                      className=""
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Share
                                    </span>
                                  </a>
                                </button>
                                <button
                                  className="wp pl-0"
                                  title="Share On Whatsapp"
                                >
                                  <a
                                    rel="noreferrer nofollow"
                                    href={`https://api.whatsapp.com/send?text=https://www.propertyease.in/agentProfile/${formatString(agentData.agent_name)}-in-${formatString(agentData.agent_sub_district)}-${formatString(agentData.agent_city)}-${formatString(agentData.agent_state)}-${agentData.user_cnct_id}`}
                                    target="_blank"
                                    className="share-propertywp"
                                  >
                                    <IconBrandWhatsapp />
                                    <span className="">Share</span>
                                  </a>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 pt-md-0 pl-3 pl-md-0 pr-3 pr-md-0 web-hidden-pro">
                          {saleCount !== null && rentCount !== null ? (
                            <>
                              <div title="Click to view properties ">
                                <Link
                                  to={`/agentproperties/Sale-${agentData?.user_cnct_id}`}
                                  className="loc-list agent-profile-loc-list"
                                >
                                  <span>{saleCount} Property for sale</span>
                                </Link>

                                <Link
                                  to={`/agentproperties/Rent-${agentData?.user_cnct_id}`}
                                  className="loc-list agent-profile-loc-list"
                                >
                                  <span>{rentCount} Property for rent</span>
                                </Link>
                              </div>
                            </>
                          ) : saleCount !== null || rentCount !== null ? (
                            <>
                              <div>
                                <Link
                                  title="Click to view properties"
                                  className="loc-list agent-profile-loc-list"
                                  to={`/agentproperties/${
                                    saleCount !== null ? "Sale" : "Rent"
                                  }-${agentData?.user_cnct_id}`}
                                >
                                  <span>
                                    {saleCount + " Property for sale" ||
                                      rentCount + " Property for rent"}
                                  </span>
                                </Link>
                              </div>
                            </>
                          ) : (
                            <div className="loc-list ">
                              <span>0 Properties Listed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-8">
                      <div class="property-more-detail">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="details">
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="more-detail-heading">
                                    About {agentData.agent_name}
                                  </div>
                                </div>
                              </div>
                              <div class="row moreDetail">
                                {agentData.agent_desc === null ||
                                agentData.agent_desc === "" ? (
                                  <div class="col-md-12 ">
                                    {/* <p>
                                    Located in Kurukhetra (Haryana), Saini
                                    Properties has successfully established
                                    itself in the realty sector of Haryana. We
                                    have gained a reputation in the market due
                                    to the effort and motivation of our owner,
                                    Mr. Narinder Saini who is a dynamic
                                    entrepreneur in this realty domain.
                                  </p>

                                  <p>
                                    We have established good relationships with
                                    some of the trusted and brand names in the
                                    real estate market of Haryana and this gives
                                    a great benefit to our business. We offer
                                    some of the finest residential and
                                    commercial properties like builder floors,
                                    flats/apartments, and commercial spaces for
                                    sale/rent in the top localities of Gurgaon
                                    and Kurukshetra.
                                  </p>

                                  <p>
                                    The areas we cover in Gurgaon are Gurgaon
                                    Sector 3, Gurgaon Sector 32, and Gurgaon 29.
                                    The areas we cover in Kurukshetra are Ladwa,
                                    Pehowa, Shahbad, Thanesar, Sector 17, Sector
                                    4, Sector 29, Urban Estate, K.D.B Road,
                                    Kalal Majara, Salarpur Road, Pipli, Laxman
                                    Colony, Vashist Colony, Sector 2, Sector 3,
                                    Sector 5, Kirti Nagar, Sector-32, Sector 9,
                                    Sector 8, GT Road, Sector 7, Sector 31,
                                    Sector 13, Sector 30, Kailash Nagar, etc.
                                  </p>

                                  <p>
                                    We serve as a project promoter and real
                                    estate agent/broker in the real estate
                                    market. We take sole marketing and selling
                                    of projects developed by renowned builders &
                                    developers and have appointed a talented
                                    team to market the projects which we have
                                    undertaken.
                                  </p> */}
                                    <p>
                                      {agentData.agent_comapnay_name
                                        ? agentData.agent_comapnay_name + " is "
                                        : agentData.agent_name +
                                          ", real estate broker, "}{" "}
                                      located in{" "}
                                      {agentData.agent_city
                                        ? agentData.agent_city +
                                          ", " +
                                          agentData.agent_state
                                        : agentData.agent_state}
                                      , where it has successfully positioned
                                      itself in {agentData.agent_state + "'"}{" "}
                                      real estate sector. Thanks to the
                                      enterprising spirit of its owner,{" "}
                                      {agentData.agent_comapnay_name
                                        ? agentData.agent_name + ", "
                                        : ""}
                                      who has been our motivation throughout, we
                                      have made a name for ourselves.
                                    </p>
                                    <p>
                                      We conduct business with some well-known
                                      brand names associated with{" "}
                                      {agentData.agent_state + "'"} real estate
                                      industry. We have builder floors,
                                      flats/apartments, and commercial spaces
                                      available in prime localities of{" "}
                                      {agentWorkPlaceData?.length > 0
                                        ? agentWorkPlaceData[0].work_city +
                                          " for "
                                        : ""}{" "}
                                      sale and rent.
                                    </p>

                                    <p>
                                      We act as real estate market project
                                      facilitators, sales brokers, or brokers. We
                                      carry out sole marketing and selling of
                                      projects developed by the top-most
                                      builders & developers and therefore
                                      employed an efficient team for marketing
                                      those undertakings we handled.
                                    </p>
                                  </div>
                                ) : (
                                  <div class="col-md-12 ">
                                    <p>{agentData.agent_desc}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="property-more-detail remove-margin">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="details">
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="more-detail-heading">
                                    Deals In Localities
                                  </div>
                                </div>
                              </div>

                              <div class="row moreDetail">
                                <div class="col-md-12 more-detail-right">
                                  {/* <div className="loc-list">
                                  <a href="#">Gurgaon</a>
                                  <span>Sector 3 </span>
                                  <span>Sector 4 </span>
                                  <span>Sector 32 </span>
                                  <span>Sector 29</span>
                                </div> */}

                                  {agentWorkPlaceData?.length > 0 ? (
                                    agentWorkPlaceData.map((item) => (
                                      <div className="loc-list">
                                        <a href="#">{item.work_city}</a>
                                        {splitDistrict(item.work_sub_district)}
                                      </div>
                                    ))
                                  ) : (
                                    <div className="loc-list">
                                      <a href="#">{agentWorkPlaceState}</a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div class="details">
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="more-detail-heading">
                                    Property Type Deals In
                                  </div>
                                </div>
                              </div>
                              <div class="row moreDetail">
                                <div class="col-md-12 more-detail-right">
                                  <div className="loc-list">
                                    {agentData.agent_work_area
                                      .split(",")
                                      .map((item) => (
                                        <span>{item} </span>
                                      ))}
                                    {/* <span>Flats / Apartments</span>
                                    <span>Independent House </span>
                                    <span>Builder Floor</span>
                                    <span>Farm House </span>
                                    <span>Residential Land / Plots </span>
                                    <span>Penthouse </span>
                                    <span>Commercial Shops </span>
                                    <span>Showrooms </span>
                                    <span>Office Space </span>
                                    <span>Business Center </span>
                                    <span>Farm / Agricultural Land </span>
                                    <span>Commercial Plots </span>

                                    <span>Industrial Land </span>
                                    <span>Warehouse / Godown</span> */}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="details">
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="more-detail-heading">
                                    Properties and Projects Available
                                  </div>
                                  <div class="row moreDetail">
                                    <div class="col-md-12 more-detail-right">
                                      {/* <div className="loc-list">
                                      {propertyNo.length > 0 ? 
                                      <><span>{propertyNo[0].Sale_Count ? propertyNo[0].Sale_Count : "0"}  Properties for Sale</span>
                                      <span>{propertyNo[0].Rent_Count ? propertyNo[0].Rent_Count : "0"}  Properties for Rent</span></>
                                     : "" }
                                    
                                  </div> */}
                                      {saleCount !== null &&
                                      rentCount !== null ? (
                                        <>
                                          <div title="Click to view properties">
                                            <Link
                                              to={`/agentproperties/Sale-${agentData?.user_cnct_id}`}
                                              className="loc-list agent-profile-loc-list"
                                            >
                                              <span>
                                                {saleCount} Property for sale
                                              </span>
                                            </Link>

                                            <Link
                                              to={`/agentproperties/Rent-${agentData?.user_cnct_id}`}
                                              className="loc-list agent-profile-loc-list"
                                            >
                                              <span>
                                                {rentCount} Property for rent
                                              </span>
                                            </Link>
                                          </div>
                                        </>
                                      ) : saleCount !== null ||
                                        rentCount !== null ? (
                                        <>
                                          <div>
                                            <Link
                                              title="Click to view properties"
                                              className="loc-list agent-profile-loc-list"
                                              to={`/agentproperties/${
                                                saleCount !== null
                                                  ? "Sale"
                                                  : "Rent"
                                              }-${agentData?.user_cnct_id}`}
                                            >
                                              <span>
                                                {saleCount +
                                                  " Property for sale" ||
                                                  rentCount +
                                                    " Property for rent"}
                                              </span>
                                            </Link>
                                          </div>
                                        </>
                                      ) : (
                                        <div className="loc-list ">
                                          <span>0 Properties Listed</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="details">
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="more-detail-heading">
                                    Services Offered
                                  </div>
                                </div>
                              </div>
                              <div class="row moreDetail">
                                <div class="col-md-12 more-detail-right">
                                  <div className="loc-list">
                                    <span>Real Estate Brokers</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="details">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="more-detail-heading">
                                    View Properties
                                  </div>
                                  <div className="d-flex flex-wrap tags-link ">
                                    {propertyType.map((item) => (
                                      <Link
                                        to={item.link}
                                        title={`Click to ${item.type}`}
                                      >
                                        <div className="loc-list mb-0">
                                          <span className="text-dark font-weight-bold">
                                            {item.type}
                                          </span>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="siderbar-profile">
                        <div className="card-block">
                          <div className="profilepict ">
                            {" "}
                            {agentData.agent_image ? (
                              <img
                                src={`${
                                  import.meta.env.VITE_BACKEND
                                }/userImages/${agentData.agent_image}`}
                                alt="img"
                              />
                            ) : (
                              <img src="/img/person.jpg" />
                            )}
                          </div>
                          <div className="agentdetail">
                            <h3>
                              {agentData.agent_name}
                              <span>Real Estate Broker</span>
                            </h3>

                            <div className="agent-deatil">
                              <ul>
                                <li>
                                  <span>
                                    <IconMapPin />
                                  </span>
                                  {/* <a href="#"> */}
                                  {agentData.agent_city
                                    ? agentData.agent_city +
                                      ", " +
                                      agentData.agent_state
                                    : agentData.agent_state}
                                  {/* </a> */}
                                </li>
                                <li>
                                  <span>
                                    <IconBriefcase />
                                  </span>
                                  {/* <a href="#"> */}
                                  {agentData.agent_exp} Year of Experience
                                  {/* </a> */}
                                </li>
                                <li>
                                  <span>
                                    {" "}
                                    <IconPhone />
                                  </span>
                                  {/* <a href="tel:9996716787"> */}
                                  +91 {agentData.agent_phone.slice(0, 5)}
                                  <span className="fs-1">xxxxx</span>
                                  {/* </a> */}
                                </li>
                                <li>
                                  <span>
                                    <IconWorld />
                                  </span>{" "}
                                  {/* <a href="mailto:propertyease.in@gmail.com"> */}
                                  {agentData.agent_email.slice(0, 2)}
                                  <span className="fs-1 mr-0">xxxxx</span>@
                                  {agentData.agent_email.split("@")[1]}
                                  {/* </a> */}
                                </li>
                              </ul>
                            </div>

                            {/* <div className="social-link">
                              <ul>
                                <li>
                                  <a href="#">
                                    <IconBrandFacebook />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <IconBrandWhatsapp />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <IconBrandInstagram />
                                  </a>
                                </li>
                              </ul>
                            </div> */}
                          </div>
                        </div>

                        <div className="agent-form">
                          <h5>Connect with Broker</h5>

                          {/* <fieldset>
                              <legend>You Want to</legend>
                              <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Buy"
                              />
                              <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Sell"
                              />
                              <FormControlLabel
                                value="other"
                                control={<Radio />}
                                label="Rent/PG"
                              />
                            </fieldset> */}
                          <div className="w-100 m-1 section-1">
                            <span className="pro_heading">You want to ?</span>
                            <div className="d-flex mb-1">
                              {propertyUserType.map((item) => (
                                <div
                                  onClick={(e) => {
                                    setData({
                                      ...data,
                                      queryType: item.value,
                                    });
                                  }}
                                  className={
                                    data.queryType === item.value
                                      ? "pro_radio_btn_1 pro_selected mb-1"
                                      : "pro_radio_btn_1 mb-1"
                                  }
                                >
                                  {item.value}
                                </div>
                              ))}
                            </div>
                            {step && data.queryType === "" && (
                              <div className="error_msg">Required</div>
                            )}
                          </div>

                          <div className="mb-3">
                            <TextField
                              sx={{ m: 1, width: ["100%"] }}
                              //required
                              id="name"
                              name="name"
                              label="Name"
                              type="text"
                              value={data.name}
                              size="small"
                              FormHelperTextProps={{ sx: { color: "red" } }}
                              helperText={
                                step && data.name === "" ? "Required" : ""
                              }
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  name: e.target.value.replace(
                                    /[^a-zA-Z ]/g,
                                    ""
                                  ),
                                })
                              }
                              inputProps={{
                                maxLength: 40,
                              }}
                              fullWidth
                              variant="standard"
                            />

                            <TextField
                              sx={{ m: 1, width: ["100%"] }}
                              size="small"
                              //required
                              id="email"
                              name="email"
                              label="Email Address"
                              type="email"
                              inputProps={{
                                maxLength: 40,
                              }}
                              FormHelperTextProps={{ sx: { color: "red" } }}
                              helperText={
                                step && emailError
                                  ? "Please enter valid email address"
                                  : ""
                              }
                              value={data.email}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  email: e.target.value.replace(
                                    /[^a-zA-Z.@0-9/]/g,
                                    ""
                                  ),
                                })
                              }
                              fullWidth
                              variant="standard"
                            />
                            <TextField
                              sx={{ m: 1, mt: 2, width: ["100%"] }}
                              id="outlined-basic"
                              fullWidth
                              variant="standard"
                              className="w-full"
                              inputProps={{ maxLength: 10 }}
                              FormHelperTextProps={{ sx: { color: "red" } }}
                              helperText={
                                step && data.phone.length < 10
                                  ? "Please enter valid phone number"
                                  : ""
                              }
                              value={data.phone}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  phone: e.target.value.replace(
                                    regEx[2].phoneNumberValidation,
                                    ""
                                  ),
                                })
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    +91
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>

                          <button
                            onClick={handleStep}
                            className={`login justify-content-center get-schedule ${
                              currentUser && currentUser[0].login_id == agentData.user_cnct_id
                                ? " btn-secondary hover:btn-secondary"
                                : "login-hover"
                            }`}
                            disabled={
                              currentUser && currentUser[0].login_id == agentData.user_cnct_id
                            }
                            title={
                              currentUser && currentUser[0].login_id ==
                                agentData.user_cnct_id &&
                              "Can't Contact to this Profile"
                            }
                            //className={currentUser[0].login_id == agentData.user_cnct_id & "button-secondary"}
                          >
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              <section className="most-view-Property mt-5 mb-5">
                <div className="container">
                  <div className="section-title">
                    <h3>
                      Recent Listed <span>Properties</span>
                      {properties.length > 0
                        ? " by" + " " + agentData.agent_name
                        : ""}
                    </h3>
                    <p>
                      Looking for a service? Discover the most recent service
                      providers in your city, vetted and selected by our
                      dedicated team of analysts
                      <br /> based on feedback gathered from users like you!
                    </p>
                  </div>
                  <div className="row">
                    {(properties.length > 0
                      ? properties
                      : latestProperties
                    ).map((item, index) => (
                      <div className="col-md-4 pb-4" key={index}>
                        <div className="uniBlock">
                          <div className="recent-box-serv">
                            <div className="re-bus-img">
                              <Link
                                to={`/${
                                  item.pro_area_size.toLowerCase() +
                                  "-" +
                                  item.pro_area_size_unit.toLowerCase() +
                                  "-"
                                }${
                                  item.pro_type
                                    ? item.pro_type
                                        .split(",")[0]
                                        .toLowerCase()
                                        .replaceAll(" ", "-")
                                    : ""
                                }-for-${
                                  item.pro_ad_type === "rent" ? "rent" : "sale"
                                }-in-${item.pro_locality
                                  .toLowerCase()
                                  .replaceAll(
                                    " ",
                                    "-"
                                  )}-${item.pro_city.toLowerCase()}-${
                                  item.pro_id
                                }`}
                              >
                                {item.img_link ? (
                                  <img
                                    src={`${
                                      import.meta.env.VITE_BACKEND
                                    }/propertyImages/watermark/${
                                      item.img_link
                                    }`}
                                    alt="img"
                                  />
                                ) : (
                                  <img
                                    src="/images/default.png"
                                    alt="no image"
                                  />
                                )}
                              </Link>
                            </div>
                            <div className="recent-bus-content">
                              <h5 className="property-listing-type">
                                <Link
                                  to={`/${
                                    item.pro_area_size.toLowerCase() +
                                    "-" +
                                    item.pro_area_size_unit.toLowerCase() +
                                    "-"
                                  }${
                                    item.pro_type
                                      ? item.pro_type
                                          .split(",")[0]
                                          .toLowerCase()
                                          .replaceAll(" ", "-")
                                      : ""
                                  }-for-${
                                    item.pro_ad_type === "rent"
                                      ? "rent"
                                      : "sale"
                                  }-in-${item.pro_locality
                                    .toLowerCase()
                                    .replaceAll(
                                      " ",
                                      "-"
                                    )}-${item.pro_city.toLowerCase()}-${
                                    item.pro_id
                                  }`}
                                >
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
                                    ({item.pro_width} Feet * {item.pro_length}{" "}
                                    Feet)
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
                                    Price{" "}
                                  </strong>
                                  &nbsp;
                                  {"₹ " +
                                    item.pro_amt +
                                    " " +
                                    item.pro_amt_unit}
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
                              <Link
                                to={`/${
                                  item.pro_area_size.toLowerCase() +
                                  "-" +
                                  item.pro_area_size_unit.toLowerCase() +
                                  "-"
                                }${
                                  item.pro_type
                                    ? item.pro_type
                                        .split(",")[0]
                                        .toLowerCase()
                                        .replaceAll(" ", "-")
                                    : ""
                                }-for-${
                                  item.pro_ad_type === "rent" ? "rent" : "sale"
                                }-in-${item.pro_locality
                                  .toLowerCase()
                                  .replaceAll(
                                    " ",
                                    "-"
                                  )}-${item.pro_city.toLowerCase()}-${
                                  item.pro_id
                                }`}
                              >
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
                  </div>
                  <div className="d-flex flex-row-reverse mr-3">
                    <Link
                      title="Click to view all properties"
                      className="btn-viewall px-4 "
                      to={
                        properties.length > 0
                          ? `/agentproperties/All-${agentData?.user_cnct_id}`
                          : `/allproperties`
                      }
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </section>
              <div className="property-more-detail">
                <div className="row">
                  <div className="col-md-12">
                    <div className="details">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="more-detail-heading">Disclaimer</div>

                          <p>
                            All the information displayed is as posted by the
                            User and displayed on the website for informational
                            purposes only. Propertyease.in makes no
                            representations and warranties of any kind, whether
                            expressed or implied, for the Services and in
                            relation to the accuracy or quality of any
                            information transmitted or obtained at
                            Propertyease.in. You are hereby strongly advised to
                            verify all information including visiting the
                            relevant authorities before taking any decision
                            based on the contents displayed on the website.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AgentProifle;
