import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
    IconBuilding,
    IconCircleArrowRightFilled,
    IconHome,
    IconHomePlus,
    IconMapPinFilled,
    IconSend,
  } from "@tabler/icons-react";
const RecentProperties = () => {
    const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/pro/fetchLatestProperty")
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <section className="most-view-Property mt-5">
          <div className="">
            <div className="section-title">
              <h3>
                Recent Listed <span>Properties</span>
              </h3>
              <p>
                Looking for a service? Discover the most recent service
                providers in your city, vetted and selected by our dedicated
                team of analysts
                 based on feedback gathered from users like you!
              </p>
            </div>
            <div className="row">
              {data.slice(0, 2).map((item, index) => (
                <div className="col-md-6" key={index}>
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
                            )}-${item.pro_city.toLowerCase()}-${item.pro_id}`}
                        >
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
                              )}-${item.pro_city.toLowerCase()}-${item.pro_id}`}
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
                            )}-${item.pro_city.toLowerCase()}-${item.pro_id}`}
                        >
                          <a title="View complete details of this property" className="btn-viewmore">View More</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default RecentProperties
