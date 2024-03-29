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
} from "@tabler/icons-react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AgentProifle = () => {
  const [sticky, setSticky] = useState(false);
  const handleScroll = () => {
    const scrollPosition = window.scrollY; // => scroll position
    if (scrollPosition > 100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  const agentId = 20;
  const [agentData, setAgentData] = useState();
  const [agentWorkPlaceData, setAgentWorkPlaceData] = useState();
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/agent/fetchAgentData/${agentId}`
      )
      .then((res) => {
        setAgentData(res.data[0]);
      });
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/agent/fetchAgentWorkPlace/${agentId}`
      )
      .then((res) => {
        setAgentWorkPlaceData(res.data);
      });
  }, []);

  console.log(agentData, agentWorkPlaceData);
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

  const solitDistrict = (value) => {
    const a = value.split(",");
    return a.map((item) => {
      return <span>{item}</span>; 
    });
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              {agentData && (
                <section className="property-view-outer">
                  <ul className="coming-field-content">
                    <li>
                      <Link to="/">
                        <a>
                          Property Type
                          <span>
                            <IconChevronRight className="sidebar-faicon" />
                          </span>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <a>
                          Real Estate Agents in Kurukshetra
                          <IconChevronRight className="sidebar-faicon" />
                        </a>
                      </Link>
                    </li>
                    <li>
                      Real Estate Agents in {agentData.agent_city}{" "}
                      <span>
                        <IconChevronRight className="sidebar-faicon" />
                      </span>
                    </li>
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
                              {agentData.agent_inage ? (
                                <img
                                  src={`${
                                    import.meta.env.VITE_BACKEND
                                  }/public/userImages/${
                                    agentData.agent_inage
                                  }`}
                                  alt="img"
                                />
                              ) : (
                                <img src="/img/person.jpg"  />
                              )}
                            </div>
                            <div className="profile-info">
                              <h1 className="capitalize  pl-md-0 d-flex gap-3 align-items-center">
                                {agentData.agent_name}
                              </h1>
                              <div className="property-top-address pl-3 pl-md-0 pb-0 text-capitalize">
                                {agentData.agent_locality +
                                  ", " +
                                  agentData.agent_sub_district +
                                  ", " +
                                  agentData.agent_city +
                                  ", " +
                                  agentData.agent_state}
                              </div>
                              {/* <span className="listed pl-3 pl-md-0 ">
                               Listed by {" " + data.pro_user_type} On {new Date(data.pro_date).toDateString()}  
                              Listed by agent 2024-30-03
                            </span> */}
                              {/* <button
                              className="interest"
                              title="Contact Us"
                              //onClick={askQuestion}
                            >
                              <IconSend />
                              <span className="">Contact Us</span>
                            </button> */}
                            </div>
                          </div>
                          <div className="socail-icon-share">
                            <button className="fb" title="Share On Facebook">
                              <a
                                rel="noreferrer nofollow"
                                //href={`https://www.facebook.com/sharer.php?u=https://www.propertyease.in/property/${id}`}
                                target="_blank"
                                className="share-property"
                              >
                                <IconBrandFacebook />
                                <span
                                  className="mobile-hidden"
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
                                //href={`https://api.whatsapp.com/send?text=https://www.propertyease.in/property/${id}`}
                                target="_blank"
                                className="share-propertywp"
                              >
                                <IconBrandWhatsapp />
                                <span className="mobile-hidden">Share</span>
                              </a>
                            </button>
                          </div>
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
                                <div class="col-md-12 ">
                                  <p>
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
                                  </p>

                                  
                                </div>
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

                                  {agentWorkPlaceData?.map((item) => (
                                    <div className="loc-list">
                                      <a href="#">{item.work_city}</a>
                                      {solitDistrict(item.work_sub_district)}
                                     
                                    </div>
                                  ))}
                                 
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
                                    {agentData.agent_work_area.split(",").map((item) => (
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
                                    Services Offered
                                  </div>
                                </div>
                              </div>
                              <div class="row moreDetail">
                                <div class="col-md-12 more-detail-right">
                                  <div className="loc-list">
                                    <span>Real Estate Agents</span>
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
                                </div>
                              </div>
                              <div class="row moreDetail">
                                <div class="col-md-12 more-detail-right">
                                  <div className="loc-list">
                                    <span>11 Residential Plot for Sale</span>
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
                            <img src="/img/person.jpg" />
                          </div>
                          <div className="agentdetail">
                            <h3>
                              {agentData.agent_name}
                              <span>Real Estate Agent</span>
                            </h3>

                            <div className="agent-deatil">
                              <ul>
                                <li>
                                  <span>
                                    <IconMapPin />
                                  </span>
                                  <a href="#">
                                    {
                                      agentData.agent_city +
                                      ", " +
                                      agentData.agent_state}
                                  </a>
                                </li>
                                <li>
                                  <span>
                                    <IconBriefcase />
                                  </span>
                                  <a href="#">
                                    {agentData.agent_exp} Year of Experience
                                  </a>
                                </li>
                                <li>
                                  <span>
                                    {" "}
                                    <IconPhone />
                                  </span>
                                  <a href="tel:9996716787">
                                    +91 {agentData.agent_phone}
                                  </a>
                                </li>
                                <li>
                                  <span>
                                    <IconWorld />
                                  </span>{" "}
                                  <a href="mailto:propertyease.in@gmail.com">
                                    {agentData.agent_email}
                                  </a>
                                </li>
                              </ul>
                            </div>

                            <div className="social-link">
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
                            </div>
                          </div>
                        </div>

                        <div className="agent-form">
                          <h5>Connect with Advertiser</h5>
                          <form>
                            <fieldset>
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
                            </fieldset>

                            <TextField
                              id="outlined-basic"
                              sx={{ width: ["100%"], mb: 2, mt: 2 }}
                              label="Name"
                              variant="outlined"
                            />
                            <TextField
                              id="outlined-basic"
                              sx={{ width: ["100%"], mb: 2 }}
                              label="Email"
                              variant="outlined"
                            />
                            <TextField
                              id="outlined-basic"
                              sx={{ width: ["100%"], mb: 2 }}
                              label="Phone no."
                              variant="outlined"
                            />
                            <button className="login justify-content-center get-schedule">
                              GET SCHEDULE
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AgentProifle;
