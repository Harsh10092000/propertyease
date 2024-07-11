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

const MailConfigBoradcast = (selectedOption) => {
  const [loader, setLoader] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [emailConfigData, setEmailConfigData] = useState({
    email_config_host: "",
    email_config_port: "",
    email_config_email: "",
    email_config_new_pass: "",
    email_config_old_pass: "",
  });

  const [enEmailConfigData, setEnEmailConfigData] = useState({
    email_config_host: "",
    email_config_port: "",
    email_config_email: "",
    email_config_new_pass: "",
    email_config_old_pass: "",
  });

  const emailConfigFormOpt = [
    {
      id: "1",
      option: "Mail Configuration",
    },

    {
      id: "2",
      option: "Email Settings",
    },
    {
      id: "3",
      option: "Contact Us Email",
    },
  ];

  useEffect(() => {
    if (
      emailConfigData.email_config_host !== "" &&
      emailConfigData.email_config_port !== "" &&
      emailConfigData.email_config_email !== "" &&
      emailConfigData.email_config_old_pass !== "" &&
      emailConfigData.email_config_new_pass !== ""
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    emailConfigData.email_config_host,
    emailConfigData.email_config_port,
    emailConfigData.email_config_email,
    emailConfigData.email_config_old_pass,
    emailConfigData.email_config_new_pass,
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


  const [oldPassError, setOldPassError] = useState()
  const handleClick = async () => {
    setOpen(false);
    try {
      enEmailConfigData.email_config_host = encryptAES(
        emailConfigData.email_config_host
      );
      enEmailConfigData.email_config_new_pass = encryptAES(
        emailConfigData.email_config_new_pass
      );

      enEmailConfigData.email_config_email = encryptAES(
        emailConfigData.email_config_email
      );
      enEmailConfigData.email_config_old_pass = encryptAES(
        emailConfigData.email_config_old_pass
      );
      enEmailConfigData.email_config_port = encryptAES(
        emailConfigData.email_config_port
      );

      setLoader(true);
      await axios
        .post(
          import.meta.env.VITE_BACKEND + "/api/setting/emailConfigSetting2",
          enEmailConfigData
        )
        
      setEmailConfigData({
        email_config_host: "",
        email_config_port: "",
        email_config_email: "",
        email_config_new_pass: "",
        email_config_old_pass: "",
      });
      setLoader(false);

      //navigate(`/admin/adslist`);
      //navigate(`/user/user-profile/${currentUser[0].login_id}`);
    } catch (err) {
      //console.log("err : ", err.response.data);
      setLoader(false);
      setOldPassError(err.response.data); 
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
        <div className="pl-2 pt-2 pb-2"></div>

        {/* <div><CustomTextField label="test" variant="outlined"
                size="small" /></div> */}

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Enter Host"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={emailConfigData.email_config_host}
            helperText={
              emailConfigData.email_config_host.length < 1 ? "Required" : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setEmailConfigData({
                ...emailConfigData,
                email_config_host: e.target.value.replace(
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
            label="Enter Port Number"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 10 }}
            className="w-100"
            value={emailConfigData.email_config_port}
            helperText={
              emailConfigData.email_config_port.length < 1 ? "Required" : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setEmailConfigData({
                ...emailConfigData,
                email_config_port: e.target.value.replace(/[^0-9]/g, ""),
              });
            }}
          />
        </div>

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Enter Email Id"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={emailConfigData.email_config_email}
            helperText={
              emailConfigData.email_config_email.length < 1 ? "Required" : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setEmailConfigData({
                ...emailConfigData,
                email_config_email: e.target.value.replace(
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
            label="Enter Old Password"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={emailConfigData.email_config_old_pass}
            helperText={
              emailConfigData.email_config_old_pass.length < 1 ? "Required" : oldPassError.length > 1 ? oldPassError : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setOldPassError("");
              setEmailConfigData({
                ...emailConfigData,
                email_config_old_pass: e.target.value.replace(
                  /[^a-zA-Z / . : 0-9 - #@!$%^&*_+|}{?><":}]/g,
                  ""
                ),
              });
            }}
          />
        </div>

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Enter New Password"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={emailConfigData.email_config_new_pass}
            helperText={
              emailConfigData.email_config_new_pass.length < 1 ? "Required" : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setEmailConfigData({
                ...emailConfigData,
                email_config_new_pass: e.target.value.replace(
                  /[^a-zA-Z / . : 0-9 - #@!$%^&*_+|}{?><":}]/g,
                  ""
                ),
              });
            }}
          />
        </div>

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

export default MailConfigBoradcast;
