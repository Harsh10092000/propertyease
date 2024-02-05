import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
const AllProperties = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/pro/fetchPropertyData")
      .then((res) => {
        setData(res.data);
      });
  }, []);
  console.log(data);
  return (
    <div>
      <Navbar />
      <div className={"main"}>
        <section className="main-content">
          <div className="container">
            <div className="title">
              <h2>All Property</h2>
            </div>
            <div className="row">
              {data.map((item, index) => (
                <div className="col-md-12 " key={index}>
                  <div className="view-pro-box">
                    <div className="buiness-logo">
                      <Link
                        legacyBehavior
                        href={"/property-profile/" + item.slug}
                      >
                        <a>
                          {item.pro_type == "Commercial" ? (
                            <img
                              src="/img/commercial.jpg"
                              loading="lazy"
                              alt="house"
                            />
                          ) : item.pro_type == "Plot" ? (
                            <img
                              src="/img/plot-land.jpg"
                              loading="lazy"
                              alt="house"
                            />
                          ) : item.pro_type == "Residential" ? (
                            <img
                              src="/img/residential.jpg"
                              loading="lazy"
                              alt="house"
                            />
                          ) : (
                            ""
                          )}
                        </a>
                      </Link>
                    </div>
                    <div className="recent-bus-content">
                      <div className="intersted-shortlist">
                        <span></span>
                        <a
                          rel="nofollow"
                          title="Shortlist"
                          href="#"
                          className="btn-shortlist"
                        >
                          <span>
                            <i className="far fa-star" />
                          </span>
                        </a>
                      </div>
                      <h5 className="property-listing-type">
                        <Link to={"/listing/" + item.slug}>
                          <a>{item.pro_sub_cat}</a>
                        </Link>
                      </h5>
                      <ul>
                        <li className="text-capitalize">
                          <img
                            src="/img/location.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon"></strong>
                          {/* {item.slug.replaceAll("-", " ")}{" "} */}
                        </li>
                        <li>
                          <img
                            src="/img/face-detection.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon">
                            Plot Size&nbsp;
                          </strong>
                          {item.plot_area_size}
                        </li>
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
                        <li>
                          <img
                            src="/img/rupee.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon">Price </strong>
                          {item.pro_amt}
                        </li>

                        <li>
                          <img
                            src="/img/facing.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon">
                            Property Facing
                          </strong>
                          {item.pro_facing}
                        </li>
                      </ul>
                      <Link
                        legacyBehavior
                        href={"/property-profile/" + item.slug}
                      >
                        <a title="View More" className="btn-viewmore">
                          View More
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AllProperties;
