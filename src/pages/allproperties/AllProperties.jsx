import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const AllProperties = () => {
  return (
    <div>
      <Navbar />
      <div className={"main"}>
        <section className="main-content">
          <div className="container">
            <div className="title">
              <h2>All Property</h2>
            </div>
            {/* <div className="row">
              {data.map((item, index) => (
                <div className="col-md-12 " key={index}>
                  <div className="view-pro-box">
                    <div className="buiness-logo">
                      <Link
                        legacyBehavior
                        href={"/property-profile/" + item.slug}
                      >
                        <a>
                          {item.profilePic == "" ||
                          item.profilePic == undefined ? (
                            <>
                              {item.propertyMainType == "Commercial" ? (
                                <img
                                  src="/img/commercial.jpg"
                                  loading="lazy"
                                  alt="house"
                                />
                              ) : null}
                              {item.propertyMainType == "Plot" ? (
                                <img
                                  src="/img/plot-land.jpg"
                                  loading="lazy"
                                  alt="house"
                                />
                              ) : null}
                              {item.propertyMainType == "Residential" ? (
                                <img
                                  src="/img/residential.jpg"
                                  loading="lazy"
                                  alt="house"
                                />
                              ) : null}
                            </>
                          ) : (
                            <>
                              {" "}
                              <img
                                src={item.profilePic}
                                loading="lazy"
                                alt="house"
                              />
                            </>
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
                        <Link
                          legacyBehavior
                          href={"/property-profile/" + item.slug}
                        >
                          <a>{item.propertyType}</a>
                        </Link>
                      </h5>
                      <ul>
                        <li className="text-capitalize">
                          <img
                            src="/img/location.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon"></strong>
                          {item.slug.replaceAll("-", " ")}{" "}
                        </li>
                        <li>
                          <img
                            src="/img/face-detection.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon">
                            Plot Size&nbsp;
                          </strong>
                          {item.plotSize} Sq.{item.PlotDimension}
                        </li>
                        <li>
                          <img
                            src="/img/meter.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon">
                            Dimension&nbsp;
                          </strong>
                          ({item.plotWidth} Feet * {item.plotLenght} Feet)
                        </li>
                        <li>
                          <img
                            src="/img/rupee.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon">Price </strong>
                          {item.amountExpected} {item.amountCurrency}
                        </li>

                        <li>
                          <img
                            src="/img/facing.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon">
                            Property Facing
                          </strong>{" "}
                          {item.propertyFacing}
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
            </div> */}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AllProperties;
