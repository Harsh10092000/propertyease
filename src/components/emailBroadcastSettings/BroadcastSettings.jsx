import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { TextField } from "@mui/material";
import CryptoJS from "crypto-js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
// import CustomTextField from "../../components/TextField";

import dayjs from "dayjs";

import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

const BroadcastSettings = (selectedOption) => {
  const [value, setValue] = useState(dayjs("2018-01-01T14:30:00.000Z"));
  //const [value, setValue] = useState();
  const [loader, setLoader] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [emailBroadcastData, setEmailBroadcastData] = useState({
    email_subject: "New Property Listed",
    email_days: "1",
    email_sender_id: "noreply@propertyease.in",
    email_hr: "",
    email_min: "",
    email_permissions: "",
    email_sender_name: "Propertyease",
  });

  const [enEmailBroadcastData, setEnEmailBroadcastData] = useState({
    email_subject: "",
    email_days: "",
    email_sender_id: "",
    email_hr: "",
    email_min: "",
    email_permissions: "",
    email_sender_name: "",
  });

  const [listingMail, setListingMail] = useState(1);
  const listingMailSwitch = [
    { key: 1, value: "Yes" },
    { key: 0, value: "No" },
  ];

  useEffect(() => {
    if (
      emailBroadcastData.email_subject !== "" &&
      emailBroadcastData.email_days !== "" &&
      emailBroadcastData.email_sender_id !== "" &&
      emailBroadcastData.email_sender_name !== "" &&
      value !== "" &&
      listingMail === 0
    ) {
      setSubmitDisabled(false);
    } else if (listingMail === 1) {  
      setSubmitDisabled(false);
    
    } else {
      setSubmitDisabled(true);
    }
  }, [
    emailBroadcastData.email_subject,
    emailBroadcastData.email_days,
    emailBroadcastData.email_sender_id,
    value,
    listingMail,
    emailBroadcastData.email_sender_name
  ]);

  const encryptAES = (plaintext) => {
    const key = import.meta.env.VITE_BACKEND1;
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const keyWithSalt = CryptoJS.PBKDF2(key, salt, {
      keySize: 256 / 32,
      iterations: 1000,
    });
    const encrypted = CryptoJS.AES.encrypt(plaintext, keyWithSalt, {
      iv: salt,
    }).toString();
    const saltedEncrypted = salt.toString(CryptoJS.enc.Base64) + encrypted;
    return saltedEncrypted;
  };

  const handleClick = async () => {

    if(listingMail === 0) {
      enEmailBroadcastData.email_hr = value.$H;
      enEmailBroadcastData.email_min = value.$m;
      enEmailBroadcastData.email_permissions = listingMail;
      setOpen(false);
      try {
        enEmailBroadcastData.email_subject = encryptAES(
          emailBroadcastData.email_subject
        );
  
        enEmailBroadcastData.email_sender_id = encryptAES(
          emailBroadcastData.email_sender_id
        );
  
        enEmailBroadcastData.email_days = encryptAES(emailBroadcastData.email_days);
        enEmailBroadcastData.email_sender_name = encryptAES(emailBroadcastData.email_sender_name);
        
        //emailBroadcastData.email_time = encryptAES(value);
        setLoader(true);
        await axios.post(
          import.meta.env.VITE_BACKEND +
            "/api/setting/emailConfigBroadcastSetting",
          emailBroadcastData
        );
  
        setEmailBroadcastData({
          email_subject: "",
          email_days: "",
          email_sender_id: "",
          email_sender_name: "",
        });
        setLoader(false);
  
        //navigate(`/admin/adslist`);
        //navigate(`/user/user-profile/${currentUser[0].login_id}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        setOpen(false);
        setLoader(true);
        await axios.post(
          import.meta.env.VITE_BACKEND +
            "/api/setting/sendEmailPermissions", listingMail
        );
        setLoader(false);
        
      } catch (err) {
        console.log(err);
      }
    }
  };

  
  const [open, setOpen] = useState(false);
  const handleClickOpen = (data) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure? "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will not be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button className="btn-primary" onClick={handleClick}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {loader && <Loader />}

      <div>
        <div className="pl-2 pt-2 pb-2 pr-2">
        <div className="w-100  mb-1 sendMailSwitch ">
              <span className="pro_heading">Send Email everytime when new property listed ?</span>
              <div className="d-flex flex-wrap ">
                {listingMailSwitch.map((item) => (
                  <div
                    className={
                      listingMail === item.key
                        ? "pro_radio_btn_1 pro_selected"
                        : "pro_radio_btn_1"
                    }
                    onClick={(e) => {
                      setListingMail(item.key);
                    }}
                  >
                    {item.value}
                  </div>
                ))}
              </div>
              
            </div>
        </div>


{listingMail === 0 &&
<div>

<div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Enter Sender Name"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={emailBroadcastData.email_sender_name}
            helperText={
              emailBroadcastData.email_sender_name.length < 1 ? "Required" : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setEmailBroadcastData({
                ...emailBroadcastData,
                email_sender_name: e.target.value.replace(
                  /[^a-zA-Z ]/g,
                  ""
                ),
              });
            }}
          />
        </div>

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Enter Sender Email Id"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={emailBroadcastData.email_sender_id}
            helperText={
              emailBroadcastData.email_sender_id.length < 1 ? "Required" : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setEmailBroadcastData({
                ...emailBroadcastData,
                email_sender_id: e.target.value.replace(
                  /[^a-zA-Z / . : 0-9 - #]/g,
                  ""
                ),
              });
            }}
          />
        </div>

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Enter Email Subject"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={emailBroadcastData.email_subject}
            helperText={
              emailBroadcastData.email_subject.length < 1 ? "Required" : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setEmailBroadcastData({
                ...emailBroadcastData,
                email_subject: e.target.value.replace(
                  /[^a-zA-Z / . : 0-9 - #]/g,
                  ""
                ),
              });
            }}
          />
        </div>

        <div className="d-flex m-1">
          <div className="w-100 mr-2">
            <TextField
              sx={{ width: ["100%"] }}
              label="Send Email (In days)"
              variant="outlined"
              // size="small"
              inputProps={{ maxlength: 10 }}
              className="w-100"
              value={emailBroadcastData.email_days}
              helperText={
                emailBroadcastData.email_days.length < 1 ? "Required" : ""
              }
              FormHelperTextProps={{ sx: { color: "red" } }}
              onChange={(e) => {
                setEmailBroadcastData({
                  ...emailBroadcastData,
                  email_days: e.target.value.replace(/[^0-9]/g, ""),
                });
              }}
            />
          </div>

          <div className="w-100 ml-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <MobileTimePicker
                  label="Select Time"
                  value={value}
                  className="w-100"
                  helperText=""
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>
        </div>
        </div>
}
        <div className="pro_flex justify-content-end">
          <button
            onClick={handleClickOpen}
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
    </div>
  );
};

export default BroadcastSettings;
