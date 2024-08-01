import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { regEx } from "../regEx";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const PostRequirement = () => {
  const [userData, setUserData] = useState({
    data_name: "",
    data_phone: "",
    data_email: "",
    data_in_city: "",
    data_pro_type: "",
    data_pro_size: "",
    data_pro_size_unit: "Sq. Yards",
    data_price_quo: "",
    data_desc: "",
  });

  const navigate = useNavigate();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [emailFormatError, setEmailFormatError] = useState(true);
  const [loader , setLoader] = useState(false);
  useEffect(() => {
    if (!regEx[0].emailRegex.test(userData.data_email)) {
      setEmailFormatError(true);
    } else {
      setEmailFormatError(false);
    }
  }, [userData.data_email]);

  useEffect(() => {
    if (
      userData.data_name !== "" &&
      userData.data_phone.length > 9 &&
      emailFormatError === false &&
      userData.data_in_city !== "" &&
      userData.data_pro_type !== "" &&
      userData.data_pro_size !== "" &&
      userData.data_price_quo !== "" 
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(false);
    }
  }, [
    userData.data_name,
    userData.data_phone,
    emailFormatError,
    userData.data_in_city,
    userData.data_pro_type,
    userData.data_pro_size,
    userData.data_price_quo,
  ]);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate(`/allproperties`);
  };

  const handleClick = async (e) => {
   // setLoader(true);
    setOpen(true);
    e.preventDefault();
    try {
      await axios
        .post(
          import.meta.env.VITE_BACKEND + `/api/postRequirement/postRequirement`,
          userData
        )
        .then((res) => {
          setLoader(false);
          setOpen(true);
          setUserData({
            data_name: "",
            data_phone: "",
            data_email: "",
            data_in_city: "",
            data_pro_type: "",
            data_pro_size: "",
            data_pro_size_unit: "Sq. Yards",
            data_price_quo: "",
            data_desc: "",
          });
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
   
     
    
    <div>
      {loader && 
      <Loader /> }
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="fs-2">
        Thank you
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your Requirments has been successfully <br/>
            submitted.Thanks!
          </DialogContentText>
          <DialogActions>
          <button onClick={handleClose} className="px-4 btn btn-success">OK</button>
        </DialogActions>
              
        </DialogContent>
      </Dialog>
      <Navbar />
      <div className="post-requierment-wrapper padding-top">
        {/* <div className=" post-requierment-heading ">Post Requirement</div> */}

        <h3 className="aboutus ml-2">
        Post Requirement <div className="heading-divider"></div>
              </h3>

        <div className="ml-2 pt-2 pb-2 text-dark">Are you searching to buy any property? Please fill out this form to let us know about your preferred city, property type, and your budget. </div>
        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Name"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={userData.data_name}
            helperText={userData.data_name.length < 1 ? "Required" : ""}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setUserData({
                ...userData,
                data_name: e.target.value.replace(/[^a-zA-Z /]/g, ""),
              });
            }}
          />

          <TextField
            sx={{ m: 1, width: ["100%"] }}
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Phone Number"
            className="w-full"
            name="Phone Number"
            inputProps={{
              maxLength: 10,
            }}
            FormHelperTextProps={{ sx: { color: "red" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91 </InputAdornment>
              ),
            }}
            helperText={
              userData.data_phone.length < 10
                ? "Please enter a valid Phone Number"
                : ""
            }
            value={userData.data_phone}
            onChange={(e) =>
              setUserData({
                ...userData,
                data_phone: e.target.value.replace(/[^0-9/]/g, ""),
              })
            }
            required
          />
        </div>
        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Email"
            className="w-full"
            name="Email"
            FormHelperTextProps={{ sx: { color: "red" } }}
            inputProps={{ maxLength: 60 }}
            helperText={
              emailFormatError !== false
                ? "Please Enter Vaild email address"
                : ""
            }
            value={userData.data_email}
            onChange={(e) =>
              setUserData({
                ...userData,
                data_email: e.target.value.replace(/[^a-zA-Z.@0-9/]/g, ""),
              })
            }
            required
          />
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="City"
            className="w-full"
            name="City"
            FormHelperTextProps={{ sx: { color: "red" } }}
            inputProps={{ maxLength: 60 }}
            helperText={userData.data_in_city.length < 1 ? "Required" : ""}
            value={userData.data_in_city}
            onChange={(e) =>
              setUserData({
                ...userData,
                data_in_city: e.target.value.replace(/[^a-zA-Z /]/g, ""),
              })
            }
            required
          />
        </div>
        <div className="pro_flex">
          <div className="w-100 m-2 ">
            <FormControl
              sx={{ width: ["100%"] }}
              size="small"
              // error={propertyData.pro_type === "" ? true : false}
            >
              <InputLabel htmlFor="grouped-native-select">
                Property Type
              </InputLabel>
              <Select
                helpperText
                native
                defaultValue=""
                id="grouped-native-select"
                label="Property Type"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    data_pro_type: e.target.value,
                  })
                }
                value={userData.data_pro_type}
              >
                <option aria-label="None" value="" />
                <optgroup label="Residential">
                  <option value={"Apartment,Residential"}>Apartment</option>
                  <option value={"Independent House,Residential"}>
                    Independent House
                  </option>
                  <option value={"Builder Floor,Residential"}>
                    Builder Floor
                  </option>
                  <option value={"Farm  House,Residential"}>Farm House</option>
                  <option value={"Raw House,Residential"}>Raw House</option>
                  <option value={"Retirement Community,Residential"}>
                    Retirement Community
                  </option>
                  <option value={"Studio Apartment,Residential"}>
                    Studio Apartment
                  </option>
                </optgroup>
                <optgroup label="Land">
                  <option value={"Residential Land,Land"}>
                    Residential Land
                  </option>
                  <option value={"Commercial Land,Land"}>
                    Commercial Land
                  </option>
                  <option value={"Industrial Land,Land"}>
                    Industrial Land
                  </option>
                  <option value={"Agricultural Land,Land"}>
                    Agricultural Land
                  </option>
                  <option value={"Farm House Land,Land"}>
                    Farm House Land
                  </option>
                </optgroup>
                <optgroup label="Commercial">
                  <option value={"Retail Showroom,Commercial"}>
                    Retail Showroom
                  </option>
                  <option value={"Commercial Building,Commercial"}>
                    Commercial Building
                  </option>
                  <option value={"Office Complex,Commercial"}>
                    Office Complex
                  </option>
                  <option value={"Software Technology Park,Commercial"}>
                    Software Technology Park
                  </option>
                  <option value={"Warehouse,Commercial"}>Warehouse</option>
                  <option value={"Industrial Estate,Commercial"}>
                    Industrial Estate
                  </option>
                </optgroup>
              </Select>
              {userData.data_pro_type === "" && (
                <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="m-2 w-100 ">
            <TextField
              sx={{ width: ["70%"] }}
              id="outlined-basic"
              variant="outlined"
              size="small"
              required
              label="Area Plot Size"
              className="w-full pro_flex_select "
              name="Area Plot Size"
              inputProps={{ maxLength: 100 }}
              value={userData.data_pro_size}
              FormHelperTextProps={{ sx: { color: "red" } }}
              helperText={userData.data_pro_size === "" ? "Required" : ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  data_pro_size: e.target.value.replace(
                    regEx[1].numberValidation,
                    "$1"
                  ),
                })
              }
            />

            <FormControl
              sx={{ width: ["30%"] }}
              size="small"
              className="pro_flex_select2"
            >
              <Select
                id="demo-simple-select"
                value={userData.data_pro_size_unit}
                inputProps={{ "aria-label": "Without label" }}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    data_pro_size_unit: e.target.value,
                  })
                }
              >
                <MenuItem value={"Sq. Yards"}>Sq. Yards</MenuItem>
                <MenuItem value={"Sq. Mts"}>Sq. Mts</MenuItem>
                <MenuItem value={"Acres"}>Acres</MenuItem>
                <MenuItem value={"Marla"}>Marla</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="pro_flex">
          <FormControl sx={{ m: 1, width: ["100%"] }} size="small">
            <InputLabel id="demo-simple-select-label">
              Price Quotation
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Price Quotation"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  data_price_quo: e.target.value,
                })
              }
              value={userData.data_price_quo}
            >
              <MenuItem value="50 lakh to 1.5cr">50 lakh to 1.5cr</MenuItem>
              <MenuItem value="1.5cr to 2.5 cr">1.5cr to 2.5 cr</MenuItem>
              <MenuItem value="2.5cr to 3.5 cr">2.5cr to 3.5 cr</MenuItem>
              <MenuItem value="3.5cr and above">3.5cr and above</MenuItem>
            </Select>
            {userData.data_price_quo === "" && (
              <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
            )}
          </FormControl>
        </div>
        <div className="pro_flex">
          <TextField
            multiline
            sx={{ m: 1, width: ["100%"] }}
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Comments"
            className="w-full"
            name="Comments"
            inputProps={{ maxLength: 2000 }}
            value={userData.data_desc}
            helperText={
              userData.data_desc.length < 2000
                ? ""
                : "Description should be smaller than 2000 characters"
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            InputProps={{
              rows: 5,
            }}
            onChange={(e) =>
              setUserData({
                ...userData,
                data_desc: e.target.value.replace(/[^0-9A-Z a-z , . /]/g, ""),
              })
            }
          />
        </div>
        <div className="pro_flex justify-content-end">
          <button
            onClick={handleClick}
            type="button"
            class={
              submitDisabled
                ? "cursor-not-allowed-btn btn btn-secondary px-5 py-2 m-2"
                : "btn btn-primary px-5 py-2 m-2 "
            }
            disabled={submitDisabled}
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
   
  );
};

export default PostRequirement;
