import { Link } from "react-router-dom";
import {
  IconBuilding,
  IconCircleArrowRightFilled,
  IconHome,
  IconHomePlus,
  IconMapPinFilled,
} from "@tabler/icons-react";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { IconPhone } from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
const Index = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/pro/fetchLatestProperty")
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        <section className="slider-home">
          <img src="/images/banner1.jpg" alt="banner" />
          <div className="slide-heading">
            <h1 className="display-4">
              Ab property bechna kharidna hoga aasan
            </h1>
          </div>
        </section>
        <section className="top-categories">
          <div className="container">
            <div className="section-title">
              <h3>
                Top Property <span>Categories</span>
              </h3>
              <p>
                Above all else, we value trust. In the real estate industry, we
                deal with every aspect of the buyers' or sellers' needs. It is
                our ongoing goal to present consumers with the most thoroughly
                researched lists and to highlight the most popular properties.
              </p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="cate-box">
                  <Link to="/listing/residential">
                    <div className="cat-img-icon">
                      <div className="cate-img">
                        <img
                          src="img/residential.jpg"
                          alt="home-services"
                          width="352px"
                          height="240px"
                        />
                      </div>
                      <div className="cate-name-icon flex flex-col items-center gap-1">
                        <span>
                          <IconHome />
                        </span>
                        <h5>Residential</h5>
                      </div>
                    </div>
                  </Link>
                  <div className="cateories-list">
                    <ul>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Independent House</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Builder Floor</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Farm House</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Raw House</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Retirement Community</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Studio Apartment</a>
                      </li>
                    </ul>
                    <Link to="/listing/residential">
                      <a className="btn-viewmore">View More</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="cate-box">
                  <Link to="/listing/land">
                    <a>
                      <div className="cat-img-icon">
                        <div className="cate-img">
                          <img
                            src="img/plot-land.jpg"
                            alt="home-services"
                            width="352px"
                            height="240px"
                          />
                        </div>
                        <div className="cate-name-icon">
                          <span>
                            <IconMapPinFilled />
                          </span>
                          <h5>Land / Plots</h5>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <div className="cateories-list">
                    <ul>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Residential Land</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Commercial Land</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Industrial Land</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Agricultural Land</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Farm House Land</a>
                      </li>
                    </ul>
                    <Link to="/listing/land">
                      <a className="btn-viewmore">View More</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="cate-box">
                  <Link to="/listing/commercial">
                    <a>
                      <div className="cat-img-icon">
                        <div className="cate-img">
                          <img
                            src="img/commercial.jpg"
                            alt="home-services"
                            width="352px"
                            height="240px"
                          />
                        </div>
                        <div className="cate-name-icon">
                          <span>
                            <IconBuilding />
                          </span>
                          <h5>Commercial</h5>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <div className="cateories-list">
                    <ul>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Retail Showroom/Shop</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Commercial Building</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Office Complex</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">IT/Software Technology Park</a>
                      </li>
                      <li>
                        <span>
                          <IconCircleCheckFilled className="sidebar-faicon" />
                        </span>
                        <a href="#">Warehouse</a>
                      </li>
                    </ul>

                    <Link to="/listing/commercial">
                      <a className="btn-viewmore">View More</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business-banner">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <span className="tadline">
                  Once you’ve settled on a Property
                </span>
                <h4 className="display-4 banner-heading">
                  Be inspired to achieve more, get on top
                  <br /> of every Property challenge today
                </h4>
                <Link to="/addproperty">
                  <a className="explore-more">
                    Be Interested
                    <span>
                      <IconCircleArrowRightFilled />
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="most-view-Property mt-5">
          <div className="container">
            <div className="section-title">
              <h3>
                Recent Listed <span>Properties</span>
              </h3>
              <p>
                Looking for a service? Discover the most recent service
                providers in your city, vetted and selected by our dedicated
                team of analysts
                <br /> based on feedback gathered from users like you!
              </p>
            </div>
            <div className="row">
              {data.map((item, index) => (
                <div className="uniBlock" key={index}>
                  <div className="recent-box-serv">
                    <div className="re-bus-img">
                      <Link href={"/property-profile/" + item.slug}>
                        <a>
                          {item.pro_type == "Commercial" ? (
                            <img
                              src="/img/commercial.jpg"
                              className="home-slider-img-fluid"
                              loading="lazy"
                              alt="house"
                            />
                          ) : item.pro_type == "Plot" ? (
                            <img
                              src="/img/plot-land.jpg"
                              className="home-slider-img-fluid"
                              loading="lazy"
                              alt="house"
                            />
                          ) : item.pro_type == "Residential" ? (
                            <img
                              src="/img/residential.jpg"
                              className="home-slider-img-fluid"
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
                      <h5 className="property-listing-type">
                        <Link href={"/property-profile/" + item.slug}>
                          <a>{item.pro_sub_cat}</a>
                        </Link>
                      </h5>
                      <ul className="front-all-property-slider">
                        <li className="text-capitalize">
                          <img
                            src="/img/location.png"
                            className="property-slider-icon"
                          />
                          <strong className="frontPropIcon">Address </strong>
                          {/* {object.slug.replaceAll("-", " ")}Icon */}
                        </li>
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
                          &nbsp;
                          {item.pro_facing}
                        </li>
                      </ul>
                      <Link href={"/property-profile/" + item.slug}>
                        <a target="_blank" className="btn-viewmore">
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
        <section className="promation">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="prom-left">
                  <h4>
                    Are you looking for buyers where <br />
                    you can get the best deal?
                  </h4>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="prom-right">
                  <h4>
                    List on Propertyease for <span className="free">FREE!</span>
                  </h4>
                  <Link to="">
                    <div className="btn btn-primary w-75 d-flex justify-content-center align-items-center gap-4">
                      <IconHomePlus />
                      Add Property
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="call-to-action">
          <div className="container">
            <div className="course-help-question">
              <div className="course-help-question__content">
                <h3>Don't miss out on this opportunity! </h3>
                <p className="course-help-question__text">
                  Take the first step towards your dream home by clicking
                  here...
                </p>
              </div>
              <div className="course-help-question__btn-wrap ">
                <a href="tel:9996716787" className="btn-resiter-earing">
                  <span>
                    <IconPhone />
                  </span>
                  <div className="ph-content">
                    <strong>TALK TO EXPERTS</strong>
                    <br />
                    Call: +91 99967 16787
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
