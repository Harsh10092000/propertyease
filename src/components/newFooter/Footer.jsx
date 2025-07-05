
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
import "./footer.css";

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


  const quickLinks = [
    { lintto: "/contactus", type: "Contact Us", target: "_self" },
    { lintto: "/citymap/Kurukshetra", type: "Kurukshetra Maps", target: "_self" },
    // { lintto: "/agentlist", type: "Our Agents", target: "_self" },
    { lintto: "/about", type: "About Us", target: "_self" },
    { lintto: "/DC-Rates-2024-25.pdf", type: "DC Rates 2024-25" ,  target: "_blank" },
    { lintto: "/termsandconditions", type: "Terms & Conditions", target: "_self" },
    { lintto: "/privacypolicy", type: "Privacy Policy", target: "_self" },
    { lintto: "/documentsneededtobuyproperty.pdf", type: "Documents Needed To Buy Property", target: "_blank" },
  ];


  const plotsPropertyType = [
    { lintto: "/residential/apartment", type: "Apartment" },
    { lintto: "/residential/independent-house", type: "Independent House" },
    { lintto: "/residential/Builder-Floor", type: "Builder Floor" },
    { lintto: "/residential/independent-house", type: "Farm HouseRaw House" },
    { lintto: "/residential/Retirement-Community", type: "Retirement Community" },
    { lintto: "/residential/independent-house", type: "Studio Apartment" },

  ];

  const landPropertyType = [

    { lintto: "land/residential-land", type: "Residential Land" },
    { lintto: "land/commercial-land", type: "Commercial Land" },
    { lintto: "land/industrial-land", type: "Industrial Land" },
    { lintto: "land/agricultural-land", type: "Agricultural Land" },
    { lintto: "land/farm-house-land", type: "Farm House Land" },

  ];

  const CommercialPropertyType = [
    { lintto: "/commercial/retail-showroom", type: "Retail Showroom" },
    { lintto: "/commercial/commercial-building", type: "Commercial Building" },
    { lintto: "/commercial/office-complex", type: "Office Complex" },
    { lintto: "/commercial/software-technology-park", type: "Software Technology Park" },
    { lintto: "/commercial/warehouse", type: "Warehouse" },
    { lintto: "/commercial/industrial-estate", type: "Industrial Estate" },
  ];




  return (
    <>
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
    <footer id="app_footer">

      <div className="footer-content">
        <div className="footer-logo ">
          <img src="https://propertyease.in/images/logo.webp" alt="Propertyease" />
        </div>
        <div className="footer-items">
          <div className="footer-lists">
            <ul className="footer-lists-container">
              <li className="footer-list-heading">Quick Links</li>
              {quickLinks.map((item) => (
                <li className="footer-list-item">
                <Link to={item.lintto} target={item.target} >{item.type} </Link>
              </li>
              ))}


              
            </ul>
            <ul className="footer-lists-container">
              <li className="footer-list-heading">Residential/Plots</li>

              {plotsPropertyType.map((item) => (
                <li className="footer-list-item">
                <Link to={item.lintto}>{item.type} </Link>
              </li>
              ))}

              
             
            </ul>
            <ul className="footer-lists-container">
              <li className="footer-list-heading">Land</li>

              {landPropertyType.map((item) => (
                <li className="footer-list-item">
                <Link to={item.lintto}>{item.type} </Link>
              </li>
              ))}
             
            </ul>
            <ul className="footer-lists-container">
              <li className="footer-list-heading">Commercial</li>
              {CommercialPropertyType.map((item) => (
                <li className="footer-list-item">
                <Link to={item.lintto}>{item.type} </Link>
              </li>
              ))}
             
            </ul>
          </div>
          <div className="footer-inputs">
          <p className="pb-1">Subscribe Us</p>
          <p className="footer-inputs-para">Get the latest news about new properties and price updates.</p>
            <form className="footer-form">
              <input
                type="text"
                name="name"
                id="footer_name_input"
                placeholder="your name"
              />
              <input
                type="email"
                name="email"
                id="footer_email_input"
                placeholder="your email"
              />
              <input
                type="tel"
                name="Phone"
                id="footer_phone_input"
                placeholder="your phone no"
              />
              <button type="submit">
                Subscribe <i class="fa-solid fa-arrow-right"></i>{" "}
              </button>
            </form>
          </div>
        </div>
        <hr />
        <div className="footer-end">
          <small>
            Copyright © 2024 Propertyease - Information. All Rights Reserved | Designed & Developed by CAL info Training & Consultancy Private Limited
            {/* CAL info Training & Consultancy Private Limited */}
          </small>
          <div className="social">
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-facebook"></i>
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
                <a href="tel:8950040151" title="Call Now">
                  <span className="mr-1">
                    <IconPhone className="sidebar-faicon" />
                  </span>
                  <span className="mobile-hidden">+91 89500 40151</span>
                </a>
              </li>
              {/* <li>
                <a href="tel:9996167778" title="Call Now">
                  <span className="mr-1">
                    <IconPhone className="sidebar-faicon" />
                  </span>
                  <span className="mobile-hidden">+91 99967 16787</span>
                </a>
              </li> */}
              {/* <li>
                <a href="tel:9996167778" title="Call Now">
                  <span className="mr-1">
                    <IconPhone className="sidebar-faicon" />
                  </span>
                  <span className="mobile-hidden">+91 99961 67778
                  </span>
                </a>
              </li> */}
              {/* <li>
                <a href="tel:9996167778" title="Call Now">
                  <span className="mr-1">
                    <IconPhone className="sidebar-faicon" />
                  </span>
                  <span className="mobile-hidden">+91 89500 40151</span>
                </a>
              </li> */}
            </ul>
          </div>
    </footer>
    <SpeedDialComp />
    </>
  )
}

export default Footer



