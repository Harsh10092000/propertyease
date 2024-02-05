import { IconChevronRight, IconStar } from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

const Listing = () => {
  const { cat } = useParams();
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertyDataByCat/${cat}`
      )
      .then((res) => {
        setData(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertySubCatNo`)
      .then((res) => {
        setSubData(res.data);
      });
  }, []);

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
                {data.map((object, index) => (
                  <div className="list-group" key={index}>
                    <div className="row">
                      <div className="col-md-auto flex-column text-center">
                        <div className="buiness-logo">
                          <Link
                            legacyBehavior
                            href={"/property-profile/" + object.slug}
                          >
                            {object.pro_type == "Commercial" ? (
                              <img
                                src="/img/commercial.jpg"
                                className="home-slider-img-fluid"
                                loading="lazy"
                                alt="house"
                              />
                            ) : object.pro_type == "Plot" ? (
                              <img
                                src="/img/plot-land.jpg"
                                className="home-slider-img-fluid"
                                loading="lazy"
                                alt="house"
                              />
                            ) : object.pro_type == "Residential" ? (
                              <img
                                src="/img/residential.jpg"
                                className="home-slider-img-fluid"
                                loading="lazy"
                                alt="house"
                              />
                            ) : (
                              ""
                            )}
                          </Link>
                        </div>
                      </div>

                      <div className="col" style={{ minWidth: 0 }}>
                        <div className="recent-box-serv">
                          <div className="recent-bus-content">
                            <h5 className="property-listing-type">
                              <Link
                                legacyBehavior
                                href={"/property-profile/" + object.slug}
                              >
                                <a>{object.pro_sub_cat}</a>
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
                                {object.pro_area_size} Sq. Feets (
                                {object.pro_width} Feet * {object.pro_length}{" "}
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
                                {object.pro_amt} Rupees
                              </li>
                              <li>
                                <img
                                  src="/img/possession.png"
                                  className="property-slider-icon"
                                />
                                <strong className="frontPropIcon">
                                  Possession{" "}
                                </strong>
                                {object.pro_possession}{" "}
                              </li>
                              <li>
                                <img
                                  src="/img/facing.png"
                                  className="property-slider-icon"
                                />
                                <strong className="frontPropIcon">
                                  Property Facing{" "}
                                </strong>
                                {object.pro_facing}
                              </li>
                            </ul>
                            <Link
                              legacyBehavior
                              href={"/property-profile/" + object.slug}
                            >
                              <a title="View More" className="btn-viewmore">
                                View More
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-1 shadow">
                <div className="p-3 font-weight-bold text-black">
                  Categories
                </div>
                {subData.map((sub, index) => (
                  <Link key={index}>
                    <div className="d-flex justify-content-between px-3 py-2">
                      <div>{sub.pro_type.split(",")[0]}</div>
                      <div>({sub.pro_sub_cat_number})</div>
                    </div>
                  </Link>
                ))}
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
