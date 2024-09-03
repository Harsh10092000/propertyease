import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const PropertyCard2 = ({item, currentUser, index, col, padding}) => {
  return (
    <div className={`col-md-${col || 4} pb-4  ${padding} mobile-res-card-2`} key={index} >
                    <div className="uniBlock">
                      <div className="recent-box-serv-1">
                        <div className="re-bus-img-1">
                          <Link to={`/${item.pro_url}`}>
                            {item.img_link ? (
                              <img
                                src={`${
                                  import.meta.env.VITE_BACKEND
                                }/propertyImages/watermark/${item.img_link}`}
                                alt="img"
                                className="rec-img"
                              />
                            ) : (
                              <img className="rec-img" src="https://hips.hearstapps.com/hmg-prod/images/edc100123egan-002-6500742f5feb7.jpg?crop=0.688xw:1.00xh;0.157xw,0&resize=1200:*" alt="no image" />
                            )}
                          </Link>


                          {item.pro_type.split(",")[1] !== "Land" &&
                          <div className="rec-img-overlay">
                            {item.pro_bedroom > 0 && item.pro_washrooms > 0 && item.pro_parking > 0 ?
                            <div className="inside-rec-img-overlay ">
                              
                              
                              <div className="mr-3 d-flex inside-rec-img-overlay-wrap">
                                <div>
                                  <svg
                                    className="inside-rec-img-overlay-svg fill-current mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                  >
                                    <path d="M480,226.15V80a48,48,0,0,0-48-48H80A48,48,0,0,0,32,80V226.15C13.74,231,0,246.89,0,266.67V472a8,8,0,0,0,8,8H24a8,8,0,0,0,8-8V416H480v56a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V266.67C512,246.89,498.26,231,480,226.15ZM64,192a32,32,0,0,1,32-32H208a32,32,0,0,1,32,32v32H64Zm384,32H272V192a32,32,0,0,1,32-32H416a32,32,0,0,1,32,32ZM80,64H432a16,16,0,0,1,16,16v56.9a63.27,63.27,0,0,0-32-8.9H304a63.9,63.9,0,0,0-48,21.71A63.9,63.9,0,0,0,208,128H96a63.27,63.27,0,0,0-32,8.9V80A16,16,0,0,1,80,64ZM32,384V266.67A10.69,10.69,0,0,1,42.67,256H469.33A10.69,10.69,0,0,1,480,266.67V384Z"></path>
                                  </svg>
                                </div>
                                <div className="inside-rec-img-overlay-text">
                                  {item.pro_bedroom}
                                </div>
                              </div>
                              <div className="mr-3 d-flex inside-rec-img-overlay-wrap">
                                <div>
                                  <svg
                                    className="inside-rec-img-overlay-svg fill-current mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 480 512"
                                  >
                                    <path d="M423.18 195.81l-24.94-76.58C387.51 86.29 356.81 64 322.17 64H157.83c-34.64 0-65.34 22.29-76.07 55.22L56.82 195.8C24.02 205.79 0 235.92 0 271.99V400c0 26.47 21.53 48 48 48h16c26.47 0 48-21.53 48-48v-16h256v16c0 26.47 21.53 48 48 48h16c26.47 0 48-21.53 48-48V271.99c0-36.07-24.02-66.2-56.82-76.18zm-310.99-66.67c6.46-19.82 24.8-33.14 45.64-33.14h164.34c20.84 0 39.18 13.32 45.64 33.13l20.47 62.85H91.72l20.47-62.84zM80 400c0 8.83-7.19 16-16 16H48c-8.81 0-16-7.17-16-16v-16h48v16zm368 0c0 8.83-7.19 16-16 16h-16c-8.81 0-16-7.17-16-16v-16h48v16zm0-80.01v32H32v-80c0-26.47 21.53-48 48-48h320c26.47 0 48 21.53 48 48v48zM104.8 248C78.84 248 60 264.8 60 287.95c0 23.15 18.84 39.95 44.8 39.95l10.14.1c39.21 0 45.0616.1 45.06-32.08 0-24.68-31.1-47.92-55.2-47.92zm10.14 56c-3.51 0-7.02-.1-10.14-.1-12.48 0-20.8-6.38-20.8-15.95S92.32 272 104.8 272s31.2 14.36 31.2 23.93c0 7.17-10.53 8.07-21.06 8.07zm260.26-56c-24.1 0-55.2 23.24-55.2 47.93 0 11.98 5.85 32.08 45.06 32.08l10.14-.1c25.96 0 44.8-16.8 44.8-39.95 0-23.16-18.84-39.96-44.8-39.96zm0 55.9c-3.12 0-6.63.1-10.14.1-10.53 0-21.06-.9-21.06-8.07 0-9.57 18.72-23.93 31.2-23.93s20.8 6.38 20.8 15.95-8.32 15.95-20.8 15.95z"></path>
                                  </svg>
                                </div>{" "}
                                <div className="inside-rec-img-overlay-text">
                                  {item.pro_washrooms}
                                </div>
                              </div>
                              <div className="d-flex inside-rec-img-overlay-wrap">
                                <div>
                                  <svg
                                    className="inside-rec-img-overlay-svg fill-current mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                  >
                                    <path d="M504,256H64V61.25a29.26,29.26,0,0,1,49.94-20.69L139.18,65.8A71.49,71.49,0,0,0,128,104c0,20.3,8.8,38.21,22.34,51.26L138.58,167a8,8,0,0,0,0,11.31l11.31,11.32a8,8,0,0,0,11.32,0L285.66,65.21a8,8,0,0,0,0-11.32L274.34,42.58a8,8,0,0,0-11.31,0L251.26,54.34C238.21,40.8,220.3,32,200,32a71.44,71.44,0,0,0-38.2,11.18L136.56,18A61.24,61.24,0,0,0,32,61.25V256H8a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H32v96c0,41.74,26.8,76.9,64,90.12V504a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V480H384v24a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V474.12c37.2-13.22,64-48.38,64-90.12V288h24a8,8,0,0,0,8-8V264A8,8,0,0,0,504,256ZM228.71,76.9,172.9,132.71A38.67,38.67,0,0,1,160,104a40,40,0,0,1,40-40A38.67,38.67,0,0,1,228.71,76.9ZM448,384a64.07,64.07,0,0,1-64,64H128a64.07,64.07,0,0,1-64-64V288H448Z"></path>
                                  </svg>
                                </div>{" "}
                                <div className="inside-rec-img-overlay-text">
                                  {item.pro_parking}
                                </div>{" "}
                              </div>
                              </div>
                            : item.pro_furnishing === "Fully Furnished" && item.pro_rental_status === "No" && item.pro_possession === "Immediate" ?
                            <div className="inside-rec-img-overlay "><div className="text-dark">Ready To Move</div></div> : item.pro_furnishing === "Fully Furnished" ?
                            <div className="inside-rec-img-overlay "><div className="text-dark"> Fully Furnished </div></div>
                             : ""} 
                            
                          </div>
                          }
                        </div>

                         {/* ###### card text section ###### */}
                        <div className="rec-card-content ">
                          <div className="rec-card-header">
                            <div className="rec-heading"><Link className="rec-heading-link" to={`/${item.pro_url}`}>
                            {item.pro_type.split(",")[0]}
                          </Link></div>
                            <div className="rec-sub-heading">
                              
                              {item.pro_locality},&nbsp;
                            {item.pro_sub_district
                              ? item.pro_sub_district + ", "
                              : ""}
                            {item.pro_city}
                            </div>
                          </div>
                           {/* /* ######  card text detail 1 ###### * */}

                           <div className="d-flex justify-content-between">
                            <div className="details">
                              <div className="">
                              {/* <img
                                src="/img/rupee.png"
                                className="property-slider-icon"
                              /> */}
                              
                              </div>
                              <div>
                                {/* <div className="details-1">Price</div> */}
                                <div className="details-2">{"₹ " + item.pro_amt + " " + item.pro_amt_unit} <span className="right-border mx-2 mobile-hidden"></span>  {item.pro_area_size + " " + item.pro_area_size_unit} </div>
                              </div>
                            </div>
                           
                            {/* <div className="details">
                              <div className="">
                                <svg
                                  className="svg-icon inline-block xl:w-4 xl:h-4 mr-3 fill-current text-gray-800"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                >
                                  <path d="M570.53,242,512,190.75V48a16,16,0,0,0-16-16H400a16,16,0,0,0-16,16V78.75L298.53,4a16,16,0,0,0-21.06,0L5.47,242a16,16,0,0,0,21.07,24.09L64,233.27V464a48.05,48.05,0,0,0,48,48H464a48.05,48.05,0,0,0,48-48V233.27l37.46,32.79A16,16,0,0,0,570.53,242ZM480,464a16,16,0,0,1-16,16H112a16,16,0,0,1-16-16V205.27l192-168,192,168Zm0-301.25-64-56V64h64ZM208,218.67V325.34A26.75,26.75,0,0,0,234.66,352H341.3A26.76,26.76,0,0,0,368,325.34V218.67A26.75,26.75,0,0,0,341.3,192H234.66A26.74,26.74,0,0,0,208,218.67ZM240,224h96v96H240Z"></path>
                                </svg>
                              </div>
                              <div>
                                <div className="details-1">Price</div>
                                <div className="details-2">50 Thousand</div>
                              </div>
                            </div> */}
                          </div> 
                          </div>
                          <div className="rec-footer d-flex justify-content-between">
                            <div className="details d-block">
                              <div className="details-1">
                              {item.user_type === "Agent" &&
                item.pro_user_type === "Agent" ? (
                  <Link
                  className="user-profile-link"
                    to={`/agentProfile/${item.pro_user_id}`}
                    title="Click to View Agent Profile"
                  >
                    Listed by{" "}
                    {currentUser &&
                    item.pro_user_id == currentUser[0].login_id
                      ? "Me "
                      : item.agent_name
                        }
                  </Link>
                ) : (
                  "Listed by " +
                  (currentUser && item.pro_user_id == currentUser[0].login_id
                    ? "Me "
                    : item.pro_user_type + " ")
                )}
                              </div>
                              <div className="details-2">
                                {/* {moment(item.pro_creation_date).add(5,"h").add(30, "minutes").fromNow()} */}
                                {moment(data.pro_creation_date).fromNow()}

                              </div>
                            </div>
                            <div className="details"> <Link to={`/${item.pro_url}`}>
                          <a
                            title="View complete details of this property"
                            className="btn-viewmore rec-btn-view-more"
                          >
                            View More
                          </a>
                        </Link></div>
                          </div>
                        

                        {/* * <div className="recent-bus-content">
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
                        </div> * */}
                      </div>
                    </div>
                  </div>
  )
}

export default PropertyCard2
