import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";
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

  return (
    <div>
      <Helmet>
        <title>Propertyease - All Properties</title>
      </Helmet>
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
                        to={`/property/${item.pro_type
                          .split(",")[0]
                          .replace(" ", "-")}-${item.pro_ad_type.replace(
                          " ",
                          "-"
                        )}_${item.pro_id}`}
                      >
                        <a>
                          {item.img_link ? (
                            <img
                              src={`${
                                import.meta.env.VITE_BACKEND
                              }/propertyImages/watermark/${item.img_link}`}
                              alt="img"
                            />
                          ) : (
                            <img
                              src="/images/no-image-available-icon-vector.jpg"
                              alt="no image"
                            />
                          )}
                        </a>
                      </Link>
                    </div>
                    <div className="recent-bus-content">
                      <h5 className="property-listing-type">
                        <Link
                          to={`/property/${item.pro_type
                            .split(",")[0]
                            .replace(" ", "-")}-${item.pro_ad_type.replace(
                            " ",
                            "-"
                          )}_${item.pro_id}`}
                        >
                          <a className="text-wrap">
                            {item.pro_type.split(",")[0]} In {item.pro_locality}
                            ,&nbsp;
                            {item.pro_city}
                          </a>
                        </Link>
                      </h5>
                      <ul>
                        <li className="text-capitalize">
                          <img
                            src="/img/location.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon"></strong>
                          {item.pro_locality},&nbsp;
                          {item.pro_city}
                        </li>
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
                          &nbsp;{"₹" + item.pro_amt + " " + item.pro_amt_unit}
                        </li>

                        <li>
                          <img
                            src="/img/facing.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon">
                            Property Facing
                          </strong>
                          &nbsp;{item.pro_facing}
                        </li>
                      </ul>
                      <Link
                        to={`/property/${item.pro_type
                          .split(",")[0]
                          .replace(" ", "-")}-${item.pro_ad_type.replace(
                          " ",
                          "-"
                        )}_${item.pro_id}`}
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
