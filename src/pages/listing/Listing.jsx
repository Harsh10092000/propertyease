import { IconChevronRight } from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Listing = () => {
  const { cat } = useParams();
  return (
    <div>
      <Navbar />
      <section className="search-block">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ul className="coming-field-content">
              <li>
                <Link to="/">
                  <a>
                    Home
                    <span>
                      <IconChevronRight className="sidebar-faicon" />
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <a>
                    {/* {schoolDetails} */}
                    {cat}
                    <span>
                      <IconChevronRight className="sidebar-faicon" />
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="row">
            <div className="row col-md-8">
              <div className="col-md-12">
                {/* {pageProps.mydata.map((object, i) => {
                  return (
                    <div className="list-group" key={i}>
                      <div className="row">
                        <div className="col-md-auto flex-column text-center">
                          <div className="buiness-logo">
                            <Link
                              legacyBehavior
                              href={"/property-profile/" + object.slug}
                            >
                              <a
                              // target="_blank"
                              >
                                {object.profilePic == "" ||
                                object.profilePic == undefined ? (
                                  <>
                                    {object.propertyMainType == "Commercial" ? (
                                      <img
                                        src="/img/commercial.jpg"
                                        loading="lazy"
                                        alt="house"
                                      />
                                    ) : null}
                                    {object.propertyMainType == "Plot" ? (
                                      <img
                                        src="/img/plot-land.jpg"
                                        loading="lazy"
                                        alt="house"
                                      />
                                    ) : null}
                                    {object.propertyMainType ==
                                    "Residential" ? (
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
                                      src={object.profilePic}
                                      loading="lazy"
                                      alt="house"
                                    />
                                  </>
                                )}
                              </a>
                            </Link>
                          </div>
                        </div>

                        <div className="col" style={{ minWidth: 0 }}>
                          <div className="recent-box-serv">
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
                                  href={"/property-profile/" + object.slug}
                                >
                                  <a
                                  // target="_blank"
                                  >
                                    {object.propertyType}
                                  </a>
                                </Link>
                              </h5>
                              <ul>
                                <li>
                                  <img
                                    src="/img/meter.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    Plot Size &amp; Dimension{" "}
                                  </strong>
                                  {object.plotSize} Sq.{object.PlotDimension}(
                                  {object.plotWidth} Feet * {object.plotLenght}{" "}
                                  Feet){" "}
                                </li>
                                <li>
                                  <img
                                    src="/img/rupee.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    Price{" "}
                                  </strong>
                                  {object.amountExpected}{" "}
                                  {object.amountCurrency}
                                  {pageProps.mydata.priceNegotiable === "Yes"
                                    ? "(Negotiable)"
                                    : "(Fixed Price)"}
                                </li>
                                <li>
                                  <img
                                    src="/img/possession.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    Possession{" "}
                                  </strong>
                                  {object.possession}{" "}
                                </li>
                                <li>
                                  <img
                                    src="/img/facing.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    Property Facing
                                  </strong>{" "}
                                  {object.propertyFacing}
                                </li>
                              </ul>
                              <Link
                                legacyBehavior
                                href={"/property-profile/" + object.slug}
                              >
                                <a
                                  title="View More"
                                  // target="_blank"
                                  className="btn-viewmore"
                                >
                                  View More
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })} */}
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-1 shadow">
                <div className="p-3 font-weight-bold text-black">
                  Categories
                </div>
                {/* {cat.map((item, index) => (
                  <Link
                    href={"/properties/" + item._id.replaceAll(" ", "-")}
                    key={index}
                  >
                    <div className="d-flex justify-content-between px-3 py-2">
                      <div>{item._id}</div>
                      <div>({item.count})</div>
                    </div>
                  </Link>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Listing;
