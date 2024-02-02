import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBuilding,
  IconDeviceMobile,
  IconGlobe,
  IconHome,
  IconMapPinFilled,
  IconPhone,
  IconScale,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      {/* <Modal show={modal} onHide={() => setModal(false)}>
        <section className={styles.bg}>
          <div className={styles.block}>
            <div className="heading_style">
              <h4 className={styles.heading}>PropertyEase Free Enquiry </h4>
            </div>
            <form method="post" id="register-form" className={styles.form}>
              <div className="input-group">
                <label id="nameLabel">
                  <input
                    type="text"
                    className={styles.input}
                    id="name"
                    name="name"
                    onChange={handleChange}
                    style={{ borderColor: nameBorderColor }}
                    placeholder="Name..."
                  />
                  <span id="namemsg" className="nameHit"></span>
                </label>
              </div>
              <div className="input-group">
                <label id="emailLabel">
                  <input
                    type="email"
                    className={styles.input}
                    id="email"
                    name="email"
                    onChange={handleChange}
                    style={{ borderColor: emailBorderColor }}
                    placeholder="Email..."
                  />
                  <span id="emailmsg" className="emailHit"></span>
                  <div className="error-msg">{emailError}</div>
                </label>
              </div>
              <div className="input-group">
                <label id="phoneLabel">
                  <PhoneInput
                    style={{ borderColor: phoneBorderColor, padding: "5px" }}
                    defaultCountry={"IN"}
                    required
                    name="number"
                    value={phone}
                    onChange={setphone}
                    className={styles.input}
                  />
                  <span id="phonemsg" className="phoneHit"></span>
                </label>
              </div>

              <div className="submit-my-form w-100">
                <div className="input-group text-right">
                  <div className="left-block" />
                  <button
                    type="button"
                    name="register"
                    className="btn btn-secondary"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={handleSubmit}
                    name="register"
                    className="btn btn-primary ml-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="our-promise">
            <h5>Our Promise</h5>
            <ul>
              <li>
                <span>
                  <FontAwesomeIcon
                    icon={faCheckSquare}
                    className="sidebar-faicon"
                  />
                </span>
                Assured <br /> Privacy
              </li>
              <li>
                <span>
                  <FontAwesomeIcon
                    icon={faUserGraduate}
                    className="sidebar-faicon"
                  />
                </span>
                Expert
                <br /> Consultation
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faGlobe} className="sidebar-faicon" />
                </span>
                Free <br />
                Site Visit
              </li>
              <li>
                <span>
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="sidebar-faicon"
                  />
                </span>
                Best
                <br /> price
              </li>
            </ul>
          </div>
        </section>
      </Modal> */}
      <section className="find-services">
        <div className="container">
          <div className="section-title">
            <h3>Find by Categories</h3>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="categores-display">
                <h6>
                  <Link to="/property-listing/Residential">
                    <a>
                      <span>
                        <IconHome className="sidebar-faicon" />
                      </span>
                      Residential / Plots
                    </a>
                  </Link>
                </h6>
                <ul>
                  <li>
                    <Link to="/property-listing/Residential">
                      <a to="#">Apartment</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Residential">
                      <a to="#">Independent House/Villa </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Residential">
                      <a to="#">Builder Floor </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Residential">
                      <a to="#">Farm House</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Residential">
                      <a to="#">Raw House</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Residential">
                      <a to="#">Retirement Community</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Residential">
                      <a to="#">Studio Apartment</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="categores-display">
                <h6>
                  <Link to="/property-listing/Plot">
                    <a>
                      <span>
                        <IconMapPinFilled className="sidebar-faicon" />
                      </span>
                      Land
                    </a>
                  </Link>
                </h6>
                <ul>
                  <li>
                    <Link to="/property-listing/Plot">
                      <a to="#">Residential Land </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Plot">
                      <a to="#">Commercial Land </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Plot">
                      <a to="#">Industrial Land </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Plot">
                      <a to="#">Agricultural Land</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Plot">
                      <a to="#">Farm House Land</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="categores-display">
                <h6>
                  <Link to="/property-listing/Commercial">
                    <a>
                      <span>
                        <IconBuilding className="sidebar-faicon" />
                      </span>
                      Commercial
                    </a>
                  </Link>
                </h6>
                <ul>
                  <li>
                    <Link to="/property-listing/Commercial">
                      <a to="#">Retail Showroom/Shop</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Commercial">
                      <a to="#">Commercial Building</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Commercial">
                      <a to="#">Office Complex</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Commercial">
                      <a to="#">IT/Software Technology Park</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Commercial">
                      <a to="#">Warehouse</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/property-listing/Commercial">
                      <a to="#">Industrial Estate Contractors</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <p>
                Copyright © {new Date().getFullYear()} Propertyease -
                Information. All Rights Reserved
              </p>
            </div>
            <div className="col-md-4">
              <div className="social_icons botom">
                <ul>
                  <li>
                    <div>
                      <a
                        title="facebook"
                        rel="noreferrer nofollow"
                        href="https://www.facebook.com/Propertyease.in/"
                        target="_blank"
                      >
                        <IconBrandFacebook />
                      </a>
                    </div>
                  </li>
                  <li>
                    <div>
                      <a
                        title="Instagram"
                        rel="noreferrer nofollow"
                        href="https://www.instagram.com/propertyease.in/"
                        target="_blank"
                      >
                        <IconBrandInstagram />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="footer-nav">
                <ul>
                  <li>
                    <Link to="/about">
                      <a title="contactus">About Us</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      title="Click to view kurukshetra collector rates 2024-25"
                      href={`${import.meta.env.VITE_URL}/DC-Rates-2024-25.pdf`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      DC Rates 2024-25
                    </a>
                  </li>

                  <li>
                    <Link to="/contact">
                      <a title="contactus">Contact Us</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/termsAndConditions">
                      <a title="contactus">Terms &amp; Conditions</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacypolicy">
                      <a title="contactus">Privacy Policy</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="Disclaimer">
            <p className="Disclaimer-content">
              All the information displayed is as posted by the User and
              displayed on the website for informational purposes only.
              Propertyease.in makes no representations and warranties of any
              kind, whether expressed or implied, for the Services and in
              relation to the accuracy or quality of any information transmitted
              or obtained at Propertyease.in. You are hereby strongly advised to
              verify all information including visiting the relevant authorities
              before taking any decision based on the contents displayed on the
              website.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <h5>Complete Support</h5>
          <ul>
            <li className="mobile-hide">
              <a href="#" title="Get a Call" onClick={() => setModal(true)}>
                <span className="mr-1">
                  <IconDeviceMobile className="sidebar-faicon" />
                </span>
                <span className="mobile-hidden">Get a Call</span>
              </a>
            </li>
            <li className="mobile-hide">
              <a href="#" title="Site Visit" onClick={() => setModal(true)}>
                <span className="mr-1">
                  <IconGlobe className="sidebar-faicon" />
                </span>
                <span className="mobile-hidden">Site Visit</span>
              </a>
            </li>
            <li className="mobile-hide">
              <a href="#" title="Home Loan" onClick={() => setModal(true)}>
                <span className="mr-1">
                  <IconHome className="sidebar-faicon" />
                </span>
                <span className="mobile-hidden">Home Loan</span>
              </a>
            </li>
            <li className="mobile-hide">
              <a href="#" title="Legal Advise" onClick={() => setModal(true)}>
                <span className="mr-1">
                  <IconScale className="sidebar-faicon" />
                </span>
                <span className="mobile-hidden">Legal Advise</span>
              </a>
            </li>

            <li>
              <a href="tel:9996716787" title="Call Now">
                <span className="mr-1">
                  <IconPhone className="sidebar-faicon" />
                </span>
                <span className="mobile-hidden">+91 99967 16787</span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
