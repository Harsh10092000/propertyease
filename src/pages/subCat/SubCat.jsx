import { IconChevronRight } from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const SubCat = () => {
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
  }, [cat]);

  return (
    <div>
      <Helmet>
        <title>Propertyease - {cat}</title>
      </Helmet>
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
                            to={`/property/${object.pro_type
                              .split(",")[0]
                              .replace(" ", "-")}-${object.pro_ad_type.replace(
                              " ",
                              "-"
                            )}_${object.pro_id}`}
                          >
                            {object.img_link ? (
                              <img
                                src={`${
                                  import.meta.env.VITE_BACKEND
                                }/propertyImages/watermark/${object.img_link}`}
                                alt="img"
                              />
                            ) : (
                              <img
                                src="/images/no-image-available-icon-vector.jpg"
                                alt="no image"
                              />
                            )}
                          </Link>
                        </div>
                      </div>

                      <div className="col" style={{ minWidth: 0 }}>
                        <div className="recent-box-serv">
                          <div className="recent-bus-content">
                            <h5 className="property-listing-type">
                              <Link
                                to={`/property/${object.pro_type
                                  .split(",")[0]
                                  .replace(
                                    " ",
                                    "-"
                                  )}-${object.pro_ad_type.replace(" ", "-")}_${
                                  object.pro_id
                                }`}
                              >
                                <a className="text-wrap">
                                  {object.pro_type.split(",")[0]} for{" "}
                                  {object.pro_ad_type === "Rent"
                                    ? "Rent"
                                    : "Sale"}{" "}
                                  in {object.pro_locality}
                                  ,&nbsp;
                                  {object.pro_city}
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
                                {object.pro_locality},&nbsp;
                                {object.pro_city}
                              </li>
                              {object.pro_width ? (
                                <li>
                                  <img
                                    src="/img/meter.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    Dimension&nbsp;
                                  </strong>
                                  ({object.pro_width} Feet * {object.pro_length}{" "}
                                  Feet)
                                </li>
                              ) : (
                                ""
                              )}
                              <li>
                                <img
                                  src="/img/rupee.png"
                                  className="property-slider-icon"
                                />
                                <strong className="frontPropIcon">
                                  Price{" "}
                                </strong>
                                &nbsp;
                                {"₹" +
                                  object.pro_amt +
                                  " " +
                                  object.pro_amt_unit}
                              </li>

                              <li>
                                <img
                                  src="/img/facing.png"
                                  className="property-slider-icon"
                                />
                                <strong className="frontPropIcon">
                                  Property Facing
                                </strong>
                                &nbsp;{object.pro_facing}
                              </li>
                            </ul>
                            <Link
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
                  <Link
                    to={`/subCat/${sub.pro_type.split(",")[0]}`}
                    key={index}
                  >
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

export default SubCat;
