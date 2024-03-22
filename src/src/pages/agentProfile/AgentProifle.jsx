import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
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
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
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
                    Real Estate Agents in Sector 7{" "}
                    <span>
                      <IconChevronRight className="sidebar-faicon" />
                    </span>
                  </li>
                  <li>Tanwar Properties</li>
                </ul>

                <div className="property-view-inner">
                  <div className="row">
                    <div
                      className={sticky ? "top newClass" : "top"}
                      id="dynamic"
                    >
                      <div className="profile-block  pt-2 pt-md-0 pl-3 pl-md-0 pr-3 pr-md-0">
                        <div className="profile-left">
                          <div className="profile-pict">
                            <img src="/img/person.jpg" />
                          </div>
                          <div className="profile-info">
                            <h1 className="capitalize  pl-md-0 d-flex gap-3 align-items-center">
                              Tanwar Properties
                            </h1>
                            <div className="property-top-address pl-3 pl-md-0 pb-0 text-capitalize">
                              Sector 7, Kurukshetra
                            </div>
                            <span className="listed pl-3 pl-md-0 ">
                              {/* Listed by {" " + data.pro_user_type} On {new Date(data.pro_date).toDateString()}  */}
                              Listed by agent 2024-30-03
                            </span>
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
                          <button className="wp pl-0" title="Share On Whatsapp">
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
                                  About Tanwar Properties
                                </div>
                              </div>
                            </div>
                            <div class="row moreDetail">
                              <div class="col-md-12 ">
                                <p>
                                  Located in Kurukhetra (Haryana), Saini
                                  Properties has successfully established itself
                                  in the realty sector of Haryana. We have
                                  gained a reputation in the market due to the
                                  effort and motivation of our owner, Mr.
                                  Narinder Saini who is a dynamic entrepreneur
                                  in this realty domain.
                                </p>

                                <p>
                                  We have established good relationships with
                                  some of the trusted and brand names in the
                                  real estate market of Haryana and this gives a
                                  great benefit to our business. We offer some
                                  of the finest residential and commercial
                                  properties like builder floors,
                                  flats/apartments, and commercial spaces for
                                  sale/rent in the top localities of Gurgaon and
                                  Kurukshetra.
                                </p>

                                <p>
                                  The areas we cover in Gurgaon are Gurgaon
                                  Sector 3, Gurgaon Sector 32, and Gurgaon 29.
                                  The areas we cover in Kurukshetra are Ladwa,
                                  Pehowa, Shahbad, Thanesar, Sector 17, Sector
                                  4, Sector 29, Urban Estate, K.D.B Road, Kalal
                                  Majara, Salarpur Road, Pipli, Laxman Colony,
                                  Vashist Colony, Sector 2, Sector 3, Sector 5,
                                  Kirti Nagar, Sector-32, Sector 9, Sector 8, GT
                                  Road, Sector 7, Sector 31, Sector 13, Sector
                                  30, Kailash Nagar, etc.
                                </p>

                                <p>
                                  We serve as a project promoter and real estate
                                  agent/broker in the real estate market. We
                                  take sole marketing and selling of projects
                                  developed by renowned builders & developers
                                  and have appointed a talented team to market
                                  the projects which we have undertaken.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="property-more-detail">
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
                                <div className="loc-list">
                                  <a href="#">Gurgaon</a>
                                  <span>Sector 3 </span>
                                  <span>Sector 4 </span>
                                  <span>Sector 32 </span>
                                  <span>Sector 29</span>
                                </div>
                                <div className="loc-list">
                                  <a href="#">Kurukshetra</a>

                                  <span>Pehowa </span>
                                  <span>Shahbad </span>
                                  <span>Thanesar </span>
                                  <span>Sector 17 </span>
                                  <span>Sector 4 </span>
                                  <span>Sector 29</span>
                                  <span>Urban Estate </span>
                                  <span>K.D.B Road </span>
                                  <span>Kalal Majara </span>
                                  <span>Salarpur </span>
                                  <span>Road Pipli </span>
                                  <span>Laxman Colony </span>
                                  <span>Vashist Colony</span>
                                </div>
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
                                  <span>Flats / Apartments</span>
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
                                  <span>Warehouse / Godown</span>
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
                      <div className="profilepict"> <img src="/img/person.jpg" /></div>
                      <div className="agentdetail">
                        <h3>Jonathan Doe<span>Real Estate Agent</span></h3>

                        <div className="agent-deatil"> 
                        <ul>
                          <li><span><IconMapPin /></span><a href="#">Sector 5, Kurukshetra</a></li>
                          <li><span><IconBriefcase/></span><a href="#">4+ Year of Experience</a></li>
                          <li><span> <IconPhone /></span><a href="tel:9996716787">+91 99967 16787</a></li>
                          <li><span><IconWorld /></span> <a href="mailto:propertyease.in@gmail.com">propertyease.in@gmail.com</a></li>
                        </ul>                         
                        </div>

                        <div className="social-link">
                          <ul>
                            <li><a href="#"><IconBrandFacebook/></a></li>
                            <li><a href="#"><IconBrandWhatsapp/></a></li>
                            <li><a href="#"><IconBrandInstagram /></a></li>
                          </ul>
                        </div>
                       

                      </div>

                    </div>

                    <div className="agent-form">
                     <h5>Connect with Advertiser</h5>
                      <form>
                      <fieldset>
                      <legend>You Want to</legend>
                      <FormControlLabel value="female" control={<Radio />} label="Buy" />
                      <FormControlLabel value="male" control={<Radio />} label="Sell" />
                        <FormControlLabel value="other" control={<Radio />} label="Rent/PG" />
                        </fieldset>

                       <TextField id="outlined-basic" sx={{ width : ["100%"] , mb : 2 , mt : 2 }} label="Name" variant="outlined" />
                       <TextField id="outlined-basic" sx={{ width : ["100%"] , mb : 2 }} label="Email" variant="outlined"  />
                       <TextField id="outlined-basic" sx={{ width : ["100%"] , mb : 2 }} label="Phone no." variant="outlined"  />
                        <button className="login justify-content-center get-schedule">GET SCHEDULE</button>
                      </form>
                    </div>
                  </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AgentProifle
