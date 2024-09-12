import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { TextField } from "@mui/material";
import CryptoJS from "crypto-js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { IconX } from "@tabler/icons-react";
// import CustomTextField from "../../components/TextField";

const EmailSettings = (selectedOption) => {
  const [loader, setLoader] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [temp, setTemp] = useState();
  const [emailConfigData, setEmailConfigData] = useState({
    email_sender_name: "",
    email_sender_id: "",
    email_reciever_id: [],
  });

  const [enEmailConfigData, setEnEmailConfigData] = useState({
    email_sender_name: "",
    email_sender_id: "",
    email_reciever_id: [],
  });

  

  useEffect(() => {
    if (
      emailConfigData.email_sender_name !== "" &&
      emailConfigData.email_sender_id !== "" &&
      emailConfigData.email_reciever_id !== ""
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    emailConfigData.email_sender_name,
    emailConfigData.email_sender_id,
    emailConfigData.email_reciever_id,
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
    console.log(emailConfigData)
    setOpen(false);
    try {
      enEmailConfigData.email_sender_name = encryptAES(
        emailConfigData.email_sender_name
      );
      // enEmailConfigData.email_reciever_id = encryptAES(
      //   emailConfigData.email_reciever_id
      // );
      enEmailConfigData.email_reciever_id = 
        emailConfigData.email_reciever_id;
      enEmailConfigData.email_sender_id = encryptAES(
        emailConfigData.email_sender_id
      );

      setLoader(true);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/setting/emailGloablSetting",
        enEmailConfigData
      );

      setEmailConfigData({
        email_sender_name: "",
        email_sender_id: "",
        email_reciever_id: [],
      });
      setTemp("");
      setLoader(false);

      //navigate(`/admin/adslist`);
      //navigate(`/user/user-profile/${currentUser[0].login_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = (data) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = (id) => {
    let copy = [...emailConfigData.email_reciever_id];
    copy.splice(id, 1);
    setEmailConfigData((prevState) => ({
      ...prevState,
      email_reciever_id: copy,
    }));
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === "Enter") {
        console.log("Space clicked");
        setEmailConfigData({
          ...emailConfigData,
          email_reciever_id: [...emailConfigData.email_reciever_id, temp],
        });
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [emailConfigData]);

  const handleSpacePress = (e) => {
    console.log(e);
    if (e.key === "Enter") {
      console.log("Space clicked");
      setEmailConfigData({
        ...emailConfigData,
        email_reciever_id: [...emailConfigData.email_reciever_id, temp],
      });
    }
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

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Enter Sender Name"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 50 }}
            className="w-100"
            value={emailConfigData.email_sender_name}
            helperText={
              emailConfigData.email_sender_name.length < 1 ? "Required" : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setEmailConfigData({
                ...emailConfigData,
                email_sender_name: e.target.value.replace(/[^a-zA-Z / .0-9 @]/g, ""),
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
            value={emailConfigData.email_sender_id}
            helperText={
              emailConfigData.email_sender_id.length < 1 ? "Required" : ""
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setEmailConfigData({
                ...emailConfigData,
                email_sender_id: e.target.value.replace(
                  /[^a-zA-Z / .0-9 @]/g,
                  ""
                ),
              });
            }}
          />
        </div>

        <div className="d-flex">
          <div className="pro_flex" style={{ width: "-webkit-fill-available" }}>
            <TextField
              sx={{ m: 1, width: ["100%"] }}
              label="Enter Reciever Email Id"
              variant="outlined"
              size="small"
              inputProps={{ maxlength: 50 }}
              className="w-100"
              //value={emailConfigData.email_reciever_id}
              value={temp}
              helperText={
                emailConfigData.email_reciever_id.length < 1 ? "Required" : ""
              }
              FormHelperTextProps={{ sx: { color: "red" } }}
              // onChange={(e) => {
              //   setEmailConfigData({
              //     ...emailConfigData,
              //     email_reciever_id: e.target.value.replace(
              //       /[^a-zA-Z / . : 0-9 - #]/g,
              //       ""
              //     ),
              //   });
              // }}
              onChange={(e) => setTemp(e.target.value)}
            />
          </div>



          <div
            className="email-add-btn-wrapper "
            onClick={(e) =>
              temp.length > 0 && !emailConfigData.email_reciever_id.includes(temp) ? 
              setEmailConfigData({
                ...emailConfigData,
                email_reciever_id: [...emailConfigData.email_reciever_id, temp],
              }) : ""
            }
          >
            <div className="email-add-btn">Add</div>
          </div>
        </div>

        <div className="email-text-wrapper d-flex flex-wrap">
          {emailConfigData.email_reciever_id.map((item, index) => (
            <div className="email-text  mb-2">
              {item}
              <span onClick={() => handleRemove(index)}>
                <IconX className="pointer" width={14} height={14} />
              </span>
            </div>
          ))}
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

export default EmailSettings;
