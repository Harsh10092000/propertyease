import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const NoResult = (props) => {
  const [subDistrict, setSubDistrict] = useState();

  const [data, setData] = useState([]);
  const [city, setCity] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/pro/fetchLatestProperty")
      .then((res) => {
        setData(res.data);
        setCity(res.data[0].pro_city);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/pro/SubDistrictDataByCity/${city}`
      )
      .then((res) => {
        setSubDistrict(res.data);
      });
  }, [city]);


  return (
    <div className="m-1">
      
      {props.searchValue.length > 0 ? (
        <div className="pt-2 pb-3 alert alert-info">
          <div>
            <strong>
              We Couldn't find any matches for "
              {props.searchValue.replaceAll("%20", " ")}"
            </strong>
          </div>
          <div>Double check your search for any typos and spelling errors </div>
          <div>
            Try a different search term or check out some of our suggestions
            below
          </div>
        </div>
      ) : (
        <div className="pt-2 pb-3 alert alert-info">
          <div>
            <strong>No Properties Found</strong>
          </div>

          <div>Check out some of our suggestions below</div>
        </div>
      )}
      <div className="property-more-detail ">
        <div className="row">
          <div className="col-md-12">
            <div className="details">
              <div className="row">
                <div className="col-md-12">
                  <div className="more-detail-heading">
                    View Near By Properties
                  </div>
                  {subDistrict && data && (
                    <div className="d-flex flex-wrap tags-link ">
                      {subDistrict.map((item) => (
                        <Link
                          to={`/${data[0].pro_type
                            .split(",")[1]
                            .toLowerCase()}/${data[0].pro_type
                            .split(",")[0]
                            .replaceAll(" ", "-")
                            .toLowerCase()}?search=${item.sub_district}`}
                        >
                          <div className="loc-list mb-0">
                            <span className="text-dark">
                              {data[0].pro_type &&
                                data[0].pro_type.split(",")[0] +
                                  " in " +
                                  item.sub_district}{" "}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="most-view-Property mt-5">
        <div className="">
          <div className="section-title">
            <h3>
              Recent Listed <span>Properties</span>
            </h3>
            <p>
              Looking for a service? Discover the most recent service providers
              in your city, vetted and selected by our dedicated team of
              analysts based on feedback gathered from users like you!
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
                            className="recent-pro-img"
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
        </div>
      </section>
    </div>
  );
};

export default NoResult;
