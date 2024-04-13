import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconCurrencyDollar,
  IconDeviceMobile,
  IconGlobe,
  IconHome,
  IconPhone,
  IconScale,
  IconSchool,
  IconSquareRoundedCheckFilled,
  IconWorld,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Button, InputAdornment, Snackbar } from "@mui/material";
import axios from "axios";
import Loader from "../loader/Loader";
import { regEx } from "../../pages/regEx";
import SpeedDialComp from "../speedDail/SpeedDial";

const Footer = () => {
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnack = () => {
    setSnack(false);
  };

  const handleSubmit = async () => {
    setLoader(true);

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/contact/freeEnquiry",
        data
      );
      setLoader(false);
      handleClose();
      setSnack(true);
    } catch (err) {
      console.log(err);
    }
  };
  const [emailError, setEmailError] = useState(true);
  useEffect(() => {
    if (!regEx[0].emailRegex.test(data.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [data.email]);

  useEffect(() => {
    if (emailError === false && data.name !== "" && data.phone.length > 9) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [data, emailError]);
  return (
    <>
      <div>
        {loader ? <Loader /> : ""}
        <Snackbar
          ContentProps={{
            sx: {
              background: "green",
              color: "white",
            },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snack}
          autoHideDuration={1000}
          onClose={handleSnack}
          message="We Will Contact you soon !.."
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <img src="/images/logo.png" />
            <p className="font-weight-bold text-danger mb-0 call_headline ">
              Free Enquiry
            </p>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              id="name"
              name="name"
              label="Name"
              type="text"
              value={data.name}
              helperText={data.name === "" ? "Required" : ""}
              onChange={(e) =>
                setData({
                  ...data,
                  name: e.target.value.replace(/[^a-zA-Z ]/g, ""),
                })
              }
              inputProps={{
                maxLength: 40,
              }}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              inputProps={{
                maxLength: 40,
              }}
              helperText={emailError ? "Please enter valid email address" : ""}
              value={data.email}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value.replace(/[^a-zA-Z.@0-9/]/g, ""),
                })
              }
              fullWidth
              variant="standard"
            />
            <div className="mt-3">
              <TextField
                id="mobile"
                fullWidth
                autoFocus
                name="phone"
                helperText={
                  data.phone.length < 10
                    ? "Please enter valid phone number"
                    : ""
                }
                value={data.phone}
                inputProps={{
                  maxLength: 10,
                }}
                onChange={(e) =>
                  setData({
                    ...data,
                    phone: e.target.value.replace(
                      regEx[2].phoneNumberValidation,
                      ""
                    ),
                  })
                }
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91 </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </div>
            <div className="bg-gray-300 mt-4 py-4">
              <p className="font-weight-bold text-center">Our Promise</p>
              <div className="d-flex ">
                <div className="col-md-3 text-center ">
                  <IconSquareRoundedCheckFilled /> <br />
                  Assured <br /> Privacy
                </div>
                <div className="col-md-3 text-center ">
                  <IconSchool className=" text-red" />
                  <br />
                  Expert <br /> Consultation
                </div>
                <div className="col-md-3 text-center">
                  <IconWorld />
                  <br />
                  Free Site Visit
                </div>
                <div className="col-md-3 text-center">
                  <IconCurrencyDollar />
                  <br />
                  Best <br />
                  Price
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit} disabled={disabled}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <section className="find-services">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="categores-displays">
                  <div className="footer-logo">
                    <Link to="/">
                      <span className="logo">
                        <img src="/images/footer-white-logo.png" alt="logo" />
                      </span>
                    </Link>
                  </div>
                  {
                    // <p>All the information displayed is as posted by the User and displayed on the website for informational purposes only. Propertyease.in makes no representations and warranties of any kind, whether expressed or implied, for the Services and in relation to the accuracy or quality of any information transmitted or obtained at Propertyease.in. You are hereby strongly advised to verify all information including visiting the relevant authorities before taking any decision based on the contents displayed on the website.</p>
                  }
                  <p>
                    All the information displayed is as posted by the User and
                    displayed on the website for informational purposes only.
                    Propertyease.in
                  </p>
                  <div className="social_icon_f">
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
              <div className="col-md-2">
                <div className="categores-displays">
                  <p className="fontBig">Quick Links</p>
                  <ul>
                  <li>
                      <Link to="/contactus">
                        <a title="Contact Us">Contact Us</a>
                      </Link>
                    </li>
                  <li>
                      <Link to="/agentlist">
                        <a title="Our Agents<">Our Agents</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        <a title="About Us">About Us</a>
                      </Link>
                    </li>
                    <li>
                      <a
                        title="Click to view kurukshetra collector rates 2024-25"
                        href={`/DC-Rates-2024-25.pdf`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        DC Rates 2024-25
                      </a>
                    </li>
                    <li>
                      <Link to="/termsandconditions">
                        <a title="contactus">Terms &amp; Conditions</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacypolicy">
                        <a title="contactus">Privacy Policy</a>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="/documentsneededtobuyproperty.pdf"
                        title="Documents Needed to buy Property"
                      >
                        Documents Needed To Buy Property
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <div className="categores-displays">
                  <p className="fontBig">Residential / Plots</p>
                  <ul>
                    <li>
                      <Link to="/residential/apartment">
                        <a>Apartment</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/residential/independent-house">
                        <a>Independent House</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/residential/builder-floor">
                        <a>Builder Floor</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/residential/farm-house">
                        <a>Farm House</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/residential/raw-house">
                        <a>Raw House</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/residential/retirement-community">
                        <a>Retirement Community</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/residential/studio-apartment">
                        <a>Studio Apartment</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <div className="categores-displays">
                  <p className="fontBig">Land</p>
                  <ul>
                    <li>
                      <Link to="/land/residential-land">
                        <a>Residential Land</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/land/commercial-land">
                        <a>Commercial Land </a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/land/industrial-land">
                        <a>Industrial Land </a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/land/agricultural-land">
                        <a>Agricultural Land</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/land/farm-house-land">
                        <a>Farm House Land</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <div className="categores-displays">
                  <p className="fontBig">Commercial</p>
                  <ul>
                    <li>
                      <Link to="/commercial/retail-showroom">
                        <a>Retail Showroom</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/commercial/commercial-building">
                        <a>Commercial Building</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/commercial/office-complex">
                        <a>Office Complex</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/commercial/software-technology-park">
                        <a>Software Technology Park</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/commercial/warehouse">
                        <a>Warehouse</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/commercial/industrial-estate-contractors">
                        <a>Industrial Estate Contractors</a>
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
            <div className="row mb-5">
              <div className="col-md-6 d-md-flex justify-content-start">
                <p className="listed">
                  Copyright © {new Date().getFullYear()} Propertyease -
                  Information. All Rights Reserved
                </p>
              </div>
              <div className="col-md-6 d-md-flex justify-content-end">
                <p className="listed">
                  Powered By Balaji Properties
                </p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="fontFoot">Complete Support</div>
            <ul>
              <li className="mobile-hide">
                <a href="#" title="Get a Call" onClick={handleClickOpen}>
                  <span className="mr-1">
                    <IconDeviceMobile className="sidebar-faicon" />
                  </span>
                  <span className="mobile-hidden">Get a Call</span>
                </a>
              </li>
              <li className="mobile-hide">
                <a href="#" title="Site Visit" onClick={handleClickOpen}>
                  <span className="mr-1">
                    <IconGlobe className="sidebar-faicon" />
                  </span>
                  <span className="mobile-hidden">Site Visit</span>
                </a>
              </li>
              <li className="mobile-hide">
                <a href="#" title="Home Loan" onClick={handleClickOpen}>
                  <span className="mr-1">
                    <IconHome className="sidebar-faicon" />
                  </span>
                  <span className="mobile-hidden">Home Loan</span>
                </a>
              </li>
              <li className="mobile-hide">
                <a href="#" title="Legal Advise" onClick={handleClickOpen}>
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
      <SpeedDialComp />
    </>
  );
};

export default Footer;
