import React from "react";
import { Link } from "react-router-dom";
import { IconEye, IconBrandWhatsapp } from "@tabler/icons-react";

const PropertyCard = ({ object, index, currentUser, DateTime }) => {
  return (
    <div className="list-group" key={index}>
      <div className="row">
        <div className="col-md-auto flex-column text-center">
          <div className="buiness-logo">
            <Link to={`/${object.pro_url}`}>
              {object.img_link ? (
                <div>
                  <img
                    src={`${
                      import.meta.env.VITE_BACKEND
                    }/propertyImages/watermark/${object.img_link}`}
                    alt="img"
                  />
                  <div className="top-left-2">
                    {object.pro_views !== null &&
                      parseInt(object.pro_views) > 0 && (
                        <li className="property-view-count ">
                          <IconEye width={20} height={20} className="icon" />
                          {/* <span className="mobile-hidden pr-1">
                                            Views
                                          </span> */}
                          {object.pro_views}
                        </li>
                      )}
                  </div>
                </div>
              ) : (
                <div>
                  <img src="/images/default.png" alt="no image" />
                  <div className="top-left-2">
                    {object.pro_views !== null &&
                      parseInt(object.pro_views) > 0 && (
                        <li className="property-view-count ">
                          <IconEye width={20} height={20} className="icon" />
                          {/* <span className="mobile-hidden pr-1">
                                            Views
                                          </span> */}
                          {object.pro_views}
                        </li>
                      )}
                  </div>
                </div>
              )}
            </Link>
          </div>
        </div>

        <div className="col" style={{ minWidth: 0 }}>
          <div className="recent-box-serv">
            <div className="recent-bus-content">
              <div className="property-listing-type">
                <Link to={`/${object.pro_url}`}>
                  <span className="text-wrap text-bold">
                    {object.pro_area_size +
                      " " +
                      object.pro_area_size_unit +
                      " " +
                      object.pro_type.split(",")[0] +
                      " "}
                    for {object.pro_ad_type === "Rent" ? "Rent" : "Sale"} in{" "}
                    <span className="text-capitalize">
                      {object.pro_locality}
                    </span>
                    ,&nbsp;
                    {object.pro_sub_district
                      ? object.pro_sub_district + ", "
                      : ""}
                    {object.pro_city},&nbsp;
                    {object.pro_state}
                  </span>
                </Link>
              </div>
              <ul>
                <li className="text-capitalize">
                  <img
                    src="/img/location.png"
                    className="property-slider-icon"
                  />
                  <strong className="frontPropIcon"></strong>
                  {object.pro_locality},&nbsp;
                  {object.pro_city}
                </li>
                {object.pro_width ? (
                  <li>
                    <img
                      src="/img/meter.png"
                      className="property-slider-icon"
                    />
                    <strong className="frontPropIcon">Dimension&nbsp;</strong>
                    {object.pro_width} Feet * {object.pro_length + " "}
                    Feet
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <img src="/img/rupee.png" className="property-slider-icon" />
                  <strong className="frontPropIcon">
                    {object.pro_amt && "Price"}
                  </strong>
                  &nbsp;
                  {object.pro_amt
                    ? "₹" + object.pro_amt + " " + object.pro_amt_unit
                    : "Ask Price"}
                </li>

                <li>
                  <img src="/img/facing.png" className="property-slider-icon" />
                  <strong className="frontPropIcon">Property Facing</strong>
                  &nbsp;{object.pro_facing}
                </li>
              </ul>
              {/* <Link
                              to={`/property/${object.pro_type
                                .split(",")[0]
                                .replace(
                                  " ",
                                  "-"
                                )}-${object.pro_ad_type.replace(" ", "-")}_${
                                object.pro_id
                              }`}
                            >
                              <a title="View More" className="btn-viewmore">
                                View More
                              </a>
                            </Link> */}
            </div>
            <div className="pt-3 d-flex justify-content-between align-items-center listing-details-wrapper">
              <div className=" listed pl-md-0 listing-details">
                {object.user_type === "Agent" &&
                object.pro_user_type === "Agent" ? (
                  <Link
                    to={`/agentProfile/${object.pro_user_id}`}
                    title="Click to View Agent Profile"
                  >
                    Listed by{" "}
                    {currentUser &&
                    object.pro_user_id == currentUser[0].login_id
                      ? "Me "
                      : object.agent_name +
                        " (" +
                        object.pro_user_type +
                        ")" +
                        " "}
                  </Link>
                ) : (
                  "Listed by " +
                  (currentUser && object.pro_user_id == currentUser[0].login_id
                    ? "Me "
                    : object.pro_user_type + " ")
                )}
                <br />
                {DateTime(object.pro_date)}
              </div>

              <div className="d-flex listing-buttons">
                <div className="mr-2 mt-1 ">
                  <Link to={`/${object.pro_url}`}>
                    <a
                      title="View complete details of this property"
                      className=" btn-viewmore"
                    >
                      View More
                    </a>
                  </Link>
                </div>

                <div>
                  <a
                    rel="noreferrer nofollow"
                    href={`https://wa.me/919996716787?text=https://www.propertyease.in/${object.pro_url}`}
                    target="_blank"
                    className="conatct-propertywp"
                    title=" Whatsapp/Contact for this property"
                  >
                    <IconBrandWhatsapp />
                    <span className="pl-1">Whatsapp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
