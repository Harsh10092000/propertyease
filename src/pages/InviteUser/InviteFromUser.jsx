import React from "react";

import Loader from "../../components/loader/Loader";
import {
  TextField
} from "@mui/material";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
  IconBrandWhatsapp,
  IconCopy,
  IconMail,
  IconX,
} from "@tabler/icons-react";
import * as XLSX from "xlsx";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Snackbar } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";


export const InviteForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [openEmailDia, setOpenEmailDia] = useState(false);
  const [snackAdd, setSnackAdd] = useState(false);
  const [loader, setLoader] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [temp, setTemp] = useState();
  const [idExists, setIdExists] = useState(false);
  const [data, setData] = useState([]);

  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [emailConfigData, setEmailConfigData] = useState({
    email_reciever_id: [],
    email_sender_name: ""
  });
  const [enEmailConfigData, setEnEmailConfigData] = useState({
    email_reciever_id: [],
  });

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

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop22 = function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.dataTransfer.files[0]);
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      setData(sheetData);
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      ) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const workbook = XLSX.read(event.target.result, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(sheet);
            setData(sheetData);
          } catch (error) {
            console.error("Error reading Excel file:", error);
          }
        };
        reader.readAsBinaryString(file);
      } else {
        console.error("Unsupported file type:", file.type);
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      setData(sheetData);
    };
    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    if (data.length > 0) {
      const newEmails = data
        .map((item) => item.email)
        .filter((email) => email)
        .filter((email, index, self) => self.indexOf(email) === index);
      setEmailConfigData((prevState) => {
        const updatedEmails = newEmails.filter(
          (email) => !prevState.email_reciever_id.includes(email)
        );
        console.log(newEmails, updatedEmails);
        if (updatedEmails.length > 0) {
          return {
            ...prevState,
            email_reciever_id: [
              ...prevState.email_reciever_id,
              ...updatedEmails,
            ],
          };
        }
        return prevState;
      });
    }
  }, [data]);

  const handleClick = async () => {
    
    emailConfigData.email_sender_name = currentUser[0].login_email
    try {
      setOpenEmailDia(false);
      setLoader(true);
      
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/invite/userInvite",
        emailConfigData
      );
      
      setLoader(false);
      setSnackAdd(true)
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseEmailDia = () => {
    setOpenEmailDia(false);
  };

  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = () => {
    const textToCopy = "https://propertyease.in/";

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000); 
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        setCopySuccess('Failed to copy');
      });
  };

  const [errorMessage, setErrorMessage] = useState('');
  const handleAddEmail = () => {
    if (temp.length === 0) {
      setErrorMessage('Email cannot be empty.');
    } else if (emailConfigData.email_reciever_id.includes(temp)) {
      setErrorMessage('This email is already in the list.');
    } else if (!EMAIL_REGEX.test(temp)) {
      setErrorMessage('Please enter a valid email address.');
    } else {
      setEmailConfigData({
        ...emailConfigData,
        email_reciever_id: [...emailConfigData.email_reciever_id, temp],
      });
      setTemp('');
      setErrorMessage(''); 
    }
  };

  return (
    // <>
    //   {loader && <Loader />}

    //   <div>
    //     <div className="d-flex">
    //       <div className="pro_flex" style={{ width: "-webkit-fill-available" }}>
    //         <TextField
    //           sx={{ m: 1, width: ["100%"] }}
    //           label="Enter Reciever Email Id"
    //           variant="outlined"
    //           size="small"
    //           inputProps={{ maxlength: 50 }}
    //           className="w-100"
    //           //value={emailConfigData.email_reciever_id}
    //           value={temp}
    //           helperText={
    //             emailConfigData.email_reciever_id.length < 1 ? "Required" : ""
    //           }
    //           FormHelperTextProps={{ sx: { color: "red" } }}
    //           // onChange={(e) => {
    //           //   setEmailConfigData({
    //           //     ...emailConfigData,
    //           //     email_reciever_id: e.target.value.replace(
    //           //       /[^a-zA-Z / . : 0-9 - #]/g,
    //           //       ""
    //           //     ),
    //           //   });
    //           // }}
    //           onChange={(e) => {
    //             setTemp(e.target.value), setIdExists(false);
    //           }}
    //         />
    //       </div>

    //       {idExists && <div>Id already exists</div>}

    //       <div
    //         className="email-add-btn-wrapper-1 "
    //         onClick={(e) => {
    //           temp.length > 0 &&
    //           !emailConfigData.email_reciever_id.includes(temp)
    //             ? (setEmailConfigData({
    //                 ...emailConfigData,
    //                 email_reciever_id: [
    //                   ...emailConfigData.email_reciever_id,
    //                   temp,
    //                 ],
    //               }),
    //               setTemp(""))
    //             : setIdExists(true);
    //         }}
    //       >
    //         <div className="email-add-btn">Add</div>
    //       </div>
    //     </div>

    //     <div className="email-text-wrapper d-flex flex-wrap">
    //       {emailConfigData.email_reciever_id.map((item, index) => (
    //         <div className="email-text  mb-2">
    //           {item}
    //           <span onClick={() => handleRemove(index)}>
    //             <IconX className="pointer" width={14} height={14} />
    //           </span>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   <div className="pro_flex justify-content-end">
    //       <button
    //         onClick={handleClick}
    //         type="button"
    //         class={
    //           submitDisabled
    //             ? "cursor-not-allowed-btn btn btn-secondary px-5 py-2 m-2"
    //             : "btn btn-primary px-5 py-2 m-2 "
    //         }
    //         //disabled={submitDisabled}
    //       >
    //         Submit
    //       </button>
    //     </div>
    // </>

    <>
    {loader && <Loader />}
      <Dialog
        open={openEmailDia}
        onClose={handleCloseEmailDia}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Invite Friends</DialogTitle>
        <DialogContent>
          <DialogContentText
            className="pt-2"
            id="alert-dialog-description"
            sx={{ width: ["500px"] }}
          >
            <div
              className="pro_flex d-flex"
              style={{ width: "-webkit-fill-available" }}
            >
              <TextField
                sx={{ m: 1, mb: 0, width: ["100%"] }}
                label="Enter Reciever Email Id"
                variant="outlined"
                size="small"
                inputProps={{ maxlength: 50 }}
                className="w-100"
                
                value={temp}
                helperText={
                  emailConfigData.email_reciever_id.length < 1 && errorMessage === "" ? "Required" : ""
                }
                FormHelperTextProps={{ sx: { color: "red" } }}
                
                onChange={(e) => {
                  setTemp(e.target.value.replace(/[^a-zA-Z . ,0-9 @]/g, "")), setErrorMessage("");
                }}
              />
              <div
                className="email-add-btn-wrapper-1 pt-2"
               
                onClick={handleAddEmail}
              >
                <div className="email-add-btn">Add</div>
              </div>
            </div>

            {errorMessage && (
              <div className="popup-error-msg-1 ">{errorMessage}</div>
            )}

            <div className="email-text-wrapper d-flex flex-wrap mt-2">
              {emailConfigData.email_reciever_id.map((item, index) => (
                <div className="email-text  mb-2">
                  {item}
                  <span onClick={() => handleRemove(index)}>
                    <IconX className="pointer" width={14} height={14} />
                  </span>
                </div>
              ))}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="pr-4 mb-2">
          <button className="btn cancel-dia-btn" onClick={handleCloseEmailDia}>
            Cancel
          </button>
          <button className="btn add-email-btn" onClick={handleClick} autoFocus>
            Submit
          </button>
        </DialogActions>
      </Dialog>
      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackAdd}
        autoHideDuration={1500}
        onClose={() => setSnackAdd(false)}
        message={"Invitaion mail sent successfully"}
      />

      <div className="invite-friends-wrapper">
        <div className="invite-friends-heading">Invite Friends and connect</div>

        <div className="invite-friends-text">
          Invite your friends to join our community and enjoy exclusive
          benefits. 
          {/* For every successful referral, you'll receive [reward].
          Share your unique referral link and start earning today! */}
        </div>

        {/* <div>
        <div className="share-type d-flex">
         <IconCopy className="share-type-icon" height={26} width={26}/> 
         
         <div>
          <div className="share-type-name">
          Copy To clipboard
          </div>
         <div className="share-type-link">
          Propertyease.in
         </div>
         </div>
         
        </div>

        <div className="share-type">
         <IconBrandWhatsapp className="share-type-icon" height={26} width={26} /> Whatsapp
        </div>

        <div className="share-type">
         <IconMail className="share-type-icon" height={26} width={26} /> Email
        </div>

        </div> */}

        <div className="container pl-0">
          <div className="row share-rypr-sec-2">
            <div className="col-md-4">
              <div className="share-type d-flex pointer" onClick={handleCopy}>
                <IconCopy className="share-type-icon" height={26} width={26} />

                <div>
                  {copySuccess == "" ? 
                  <div className="share-type-name">Copy To clipboard</div>
                  : 
                  <div className="share-type-name">Copied To clipboard</div>
                  }
                  <div className="share-type-link">Propertyease.in</div>
                </div>
              </div>

              
            </div>

            <div className="col-md-4">
              <a
                href={`https://api.whatsapp.com/send?text=Someone has invited to join propertyease.in, a real estate portal to list, manage your properties for free. Join Now!!`}
              >
                <div className="share-type share-type-one pointer">
                  <IconBrandWhatsapp
                    className="share-type-icon"
                    height={26}
                    width={26}
                  />
                  Whatsapp
                </div>
              </a>
            </div>
            <div className="col-md-4">
              <div
                className="share-type share-type-two pointer"
                onClick={() => setOpenEmailDia(true)}
              >
                <IconMail className="share-type-icon" height={26} width={26} />{" "}
                Email
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InviteFromUser = () => {
  return (
    // <FormStrcture heading={"Share and Connect"}>
    // <FormStrcture >
    <div className="conatiner-fluid">
      <div className="row ml-0 mr-0">
        <div className="col-md-7">
          <InviteForm />
        </div>
      </div>
    </div>

    // </FormStrcture>
  );
};

export default InviteFromUser;
