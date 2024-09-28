import React from "react";
import DOMPurify from "dompurify";

import Loader from "../../components/loader/Loader";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  IconChevronDown,
  IconChevronUp,
  IconPlus,
  IconTrash,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import * as XLSX from "xlsx";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";

const InviteFromAdmin = () => {
  const [loader, setLoader] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [temp, setTemp] = useState();
  const [temp1, setTemp1] = useState();
  const [idExists, setIdExists] = useState(false);
  const [data, setData] = useState([]);
  const [addMaildata, setAddMaildata] = useState([]);
  const [invalidEmilErr, setInvalidEmilErr] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [showSelected, setShowSelected] = useState(false);

  const [openEmailDia, setOpenEmailDia] = useState(false);
  const [snackAdd, setSnackAdd] = useState(false);
  const [openEmailDel, setOpenEmailDel] = useState(false);
  const [snackDel, setSnackDel] = useState(false);

  const [delId, setDelId] = useState("");
  const [delMail, setDelMail] = useState("");
  const [change, setChange] = useState(1);
  const [snackMail, setSnackMail] = useState(false);

  const [showAlreadyUserEmails, setShowAlreadyUserEmails] = useState(true);
  const [showNotUserEmails, setShowNotUserEmails] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState("");

  const [mailContent, setMailContent] = useState([]);
  const [emailIdTobeAdded, setEmailIdTobeAdded] = useState([]);
  
  const [serverStatus, setServerStatus] = useState();
  // useEffect(() => {
  //   axios
  //   .get(import.meta.env.VITE_BACKEND + `/api/invite/verifyServer`)
  //   .then((res) => {
  //     if(res.status === 200) {
  //       console.log("sdf : "  , res.status);
  //       setServerStatus(true);
  //     } else {
  //       setServerStatus(false);
  //       console.log("sdf22 : " , res.status);
  //     }
      
  //   });
  // }, [])

  useEffect(() => {
    const verifyServer = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/invite/verifyServer`);
        if (res.status === 200) {
          setServerStatus(true);
        }
      } catch (error) {
        setServerStatus(false); 
      }
    };
    verifyServer();
  }, []);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/invite/getMailContactList`)
      .then((res) => {
        setContactList(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/invite/getMailContent`)
      .then((res) => {
        setMailContent(res.data);
      });
   
  }, [change]);

  const [emailConfigData, setEmailConfigData] = useState({
    email_reciever_id: [],
    email_sub: "",
    email_cont: "",
  });
  const [enEmailConfigData, setEnEmailConfigData] = useState({
    email_reciever_id: [],
    email_sub: "",
    email_cont: "",
  });

  const handleRemove = (id) => {
    console.log("id : ", id);
    let copy = [...emailConfigData.email_reciever_id];
    copy.splice(id, 1);
    setEmailConfigData((prevState) => ({
      ...prevState,
      email_reciever_id: copy,
    }));
  };

  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        if (temp.length > 0) {
          //const emailArray = temp.split(',').map(email => email.trim());

          const emailArray = temp
            .split(",")
            .map((item) => item.trim())
            .filter((email) => email)
            .filter((email, index, self) => self.indexOf(email) === index);

          const validEmails = emailArray.filter(
            (email) =>
              email.length > 0 &&
              !emailConfigData.email_reciever_id.includes(email) &&
              EMAIL_REGEX.test(email)
          );

          const invalidEmails = emailArray.filter(
            (email) => email.length > 0 && !EMAIL_REGEX.test(email)
          );

          if (validEmails.length > 0) {
            setEmailConfigData((prevState) => ({
              ...prevState,
              email_reciever_id: [
                ...prevState.email_reciever_id,
                ...validEmails,
              ],
            }));
          }

          if (invalidEmails.length > 0) {
            setTemp(invalidEmails.join(", "));
            setInvalidEmilErr(true);
          } else {
            setTemp("");
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [emailConfigData, temp]);

  // const handleDrag = function (e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (e.dataTransfer.files && e.dataTransfer.files[0]) {
  //     const file = e.dataTransfer.files[0];
  //     if (
  //       file.type ===
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
  //       file.type === "application/vnd.ms-excel"
  //     ) {
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         try {
  //           const workbook = XLSX.read(event.target.result, { type: "binary" });
  //           const sheetName = workbook.SheetNames[0];
  //           const sheet = workbook.Sheets[sheetName];
  //           const sheetData = XLSX.utils.sheet_to_json(sheet);
  //           setData(sheetData);
  //         } catch (error) {
  //           console.error("Error reading Excel file:", error);
  //         }
  //       };
  //       reader.readAsBinaryString(file);
  //     } else {
  //       console.error("Unsupported file type:", file.type);
  //     }
  //   }
  // };

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      fileInputRef.current.value = "";
    }
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

  const fileInputRef1 = useRef(null);

  const handleFileUpload1 = (e) => {
    const file = e.target.files[0];

    if (file) {
      fileInputRef1.current.value = "";
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      setAddMaildata(sheetData);
    };
    reader.readAsBinaryString(file);
  };



  useEffect(() => {
    if (addMaildata.length > 0) {
      const newEmails = addMaildata
        .map((item) => item.email)
        .filter((email) => email)
        .filter((email, index, self) => self.indexOf(email) === index);


      setEmailIdTobeAdded((prevState) => {
        const updatedEmails = newEmails.filter(
          (email) => !emailIdTobeAdded.includes(email)
        );

        if (updatedEmails.length > 0) {
          return [...prevState, ...updatedEmails];
          
        }
        return prevState;
      });
    }
  }, [addMaildata]);

  //console.log("emailIdTobeAdded : " , emailIdTobeAdded, addMaildata);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        if (temp1.length > 0) {
          //const emailArray = temp.split(',').map(email => email.trim());

          const emailArray = temp1
            .split(",")
            .map((item) => item.trim())
            .filter((email) => email)
            .filter((email, index, self) => self.indexOf(email) === index);

          const validEmails = emailArray.filter(
            (email) =>
              email.length > 0 &&
              !emailIdTobeAdded.includes(email) &&
              EMAIL_REGEX.test(email)
          );

          const invalidEmails = emailArray.filter(
            (email) => email.length > 0 && !EMAIL_REGEX.test(email)
          );

          if (validEmails.length > 0) {
            setEmailIdTobeAdded((prevState) => ([
              ...prevState,
                ...validEmails,
              
            ]));
          }

          if (invalidEmails.length > 0) {
            setTemp1(invalidEmails.join(", "));
            setInvalidEmilErr(true);
          } else {
            setTemp1("");
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [addMaildata, temp1]);

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
    emailConfigData.email_cont = editorRef.current.getContent();
    try {
      setLoader(true);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/invite/adminInvite",
        emailConfigData
      );
      setLoader(false);
      setSnackMail(true);
      setEmailConfigData({
        email_reciever_id: [],
        email_sub: "",
        email_cont: "",
      });
      editorRef.current.setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  const editorRef = useRef(null);

  useEffect(() => {
    // console.log(editorRef.current.getContent());

    if (
      emailConfigData.email_reciever_id !== "" &&
      emailConfigData.email_sub !== "" &&
      editorRef.current.getContent() !== "" &&
      invalidEmilErr === false &&
      idExists === false
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    emailConfigData.email_reciever_id,
    emailConfigData.email_sub,
    editorRef,
    invalidEmilErr,
    idExists,
  ]);

  const handleCheckboxChange = (email) => {
    if (emailConfigData.email_reciever_id.includes(email)) {
      const updatedReceivers = emailConfigData.email_reciever_id.filter(
        (i) => i !== email
      );
      // console.log(updatedReceivers)
      setEmailConfigData((prevState) => {
        return {
          ...prevState,
          email_reciever_id: [...updatedReceivers],
        };
      });
    } else {
      // console.log(email)
      setEmailConfigData((prevState) => {
        return {
          ...prevState,
          email_reciever_id: [...prevState.email_reciever_id, email],
        };
      });
    }
  };

  const handleCloseEmailDia = () => {
    setOpenEmailDia(false);
    setAddMaildata([]);
    setEmailIdTobeAdded([]);
  };

  const handleClickOpenDel = (id, email) => {
    setDelId(id);
    setDelMail(email);
    setOpenEmailDel(true);
  };

  const handleCloseEmailDel = () => {
    setOpenEmailDel(false);
  };

  
  
  const handleAddEmail = async () => {
    try {
      setOpenEmailDia(false);
      setLoader(true);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/invite/addSingleMail",
        // { email: emailIdTobeAdded }
        emailIdTobeAdded
      );

      setLoader(false);
      setChange(change + 1);
      setSnackAdd(true);
      setEmailIdTobeAdded("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEmail = async () => {
    //console.log(delId);
    try {
      setOpenEmailDel(false);
      setLoader(true);
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/invite/deleteMailContact/${delId}`
      );
      handleRemove(delMail);
      setLoader(false);
      setChange(change + 1);
      setSnackDel(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAllAlreadyUsers = () => {
    const alreadyUserEmails = contactList
      .filter((contact) => contact.already_user === 1)
      .map((contact) => contact.email);

    const allAlreadyUsersSelected = alreadyUserEmails.every((email) =>
      emailConfigData.email_reciever_id.includes(email)
    );

    setEmailConfigData((prevState) => {
      if (allAlreadyUsersSelected) {
        return {
          ...prevState,
          email_reciever_id: prevState.email_reciever_id.filter(
            (email) => !alreadyUserEmails.includes(email)
          ),
        };
      } else {
        const newEmails = alreadyUserEmails.filter(
          (email) => !prevState.email_reciever_id.includes(email)
        );
        return {
          ...prevState,
          email_reciever_id: [...prevState.email_reciever_id, ...newEmails],
        };
      }
    });
  };

  const handleAllNotUsers = () => {
    const alreadyUserEmails = contactList
      .filter((contact) => contact.already_user === 0)
      .map((contact) => contact.email);

    const allAlreadyUsersSelected = alreadyUserEmails.every((email) =>
      emailConfigData.email_reciever_id.includes(email)
    );

    setEmailConfigData((prevState) => {
      if (allAlreadyUsersSelected) {
        return {
          ...prevState,
          email_reciever_id: prevState.email_reciever_id.filter(
            (email) => !alreadyUserEmails.includes(email)
          ),
        };
      } else {
        const newEmails = alreadyUserEmails.filter(
          (email) => !prevState.email_reciever_id.includes(email)
        );
        return {
          ...prevState,
          email_reciever_id: [...prevState.email_reciever_id, ...newEmails],
        };
      }
    });
  };

  useEffect(() => {
    let searchWords = searchValue
      ?.toLowerCase()
      .split(",")
      .map((word) => word.trim());

    const filteredData = contactList.filter((contact) => {
      const parts = contact.email.split("@").flatMap((part) => part.split("."));
      const lowerCaseParts = parts.map((part) => part.toLowerCase());

      if (searchWords.length !== 0) {
        return searchWords.every((word) =>
          lowerCaseParts.some((part) => part.includes(word))
        );
      } else {
        return true;
      }
    });

    setResults(filteredData);
  }, [searchValue, contactList]);

 // console.log("serverStatus : " , serverStatus);

  return (
    
    
    <div className="row m-0">
      {loader && <Loader />}
      <Dialog
        open={openEmailDel}
        onClose={handleCloseEmailDel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove this Email? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will not be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmailDel}>Cancel</Button>
          <Button className="btn-danger" onClick={deleteEmail} autoFocus>
            Delete
          </Button>
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
        open={snackDel}
        autoHideDuration={1000}
        onClose={() => setSnackDel(false)}
        message={"Deleted Successfully"}
      />

      <Dialog
        open={openEmailDia}
        onClose={handleCloseEmailDia}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Email</DialogTitle>
        <DialogContent>
          <DialogContentText
            className="pt-2"
            id="alert-dialog-description"
            sx={{ width: ["500px"] }}
          >
            <p>Enter email or upload csv file to add multiple email ids</p>
            <TextField
              sx={{ width: ["100%"] }}
              label="Enter Email "
              variant="outlined"
              size="small"
              inputProps={{ maxlength: 500 }}
              className="w-100"
              //value={emailConfigData.email_reciever_id}
              //value={emailIdTobeAdded}
              helperText={emailIdTobeAdded < 1 ? "Required" : ""}
              FormHelperTextProps={{ sx: { color: "red" } }}
              // onChange={(e) => {
              //   setEmailConfigData({
              //     ...emailConfigData,
              //     email_sub: e.target.value.replace(/[^a-zA-Z 0-9 -]/g, ""),
              //   });
              // }}
              // onChange={(e) => {
              //   setEmailIdTobeAdded(e.target.value);
              // }}
              // onChange={(e) => {
              //   (e.target.value.replace(/[^a-zA-Z . ,0-9 @]/g, "")),
              //     setIdExists(false);
              //     setInvalidEmilErr(false);
              // }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <input
                      type="file"
                      id="file-2"
                      style={{ display: "none" }}
                      //accept="xlxs/csv"
                      accept=".xlsx, .csv"
                      onChange={handleFileUpload1}
                      ref={fileInputRef1}
                    />
                    <label
                      htmlFor="file-2"
                      className="mb-0"
                      title="Upload file"
                    >
                      <span
                        className="pl-1 pointer"
                        style={{ fontSize: "15px", color: "#3a3a3a" }}
                      >
                        Upload CSV File
                      </span>
                      <IconUpload
                        className="pl-1 pointer"
                        width={22}
                        height={22}
                      />
                    </label>
                  </InputAdornment>
                ),
              }}
              value={temp1}
              // helperText={
              //   emailConfigData.email_reciever_id.length < 1
              //     ? "Required"
              //     : ""
              // }
              //FormHelperTextProps={{ sx: { color: "red" } }}
              onChange={(e) => {
                setTemp1(
                  e.target.value.replace(/[^a-zA-Z . ,0-9 @]/g, "")
                ),
                  setIdExists(false);
                setInvalidEmilErr(false);
              }}
            />
           {emailIdTobeAdded.length > 0 ? <span>{emailIdTobeAdded.length} Email id Selected</span> : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="pr-4 mb-2">
          <button className="btn cancel-dia-btn" onClick={handleCloseEmailDia}>
            Cancel
          </button>
          <button
            className="btn add-email-btn"
            onClick={handleAddEmail}
            autoFocus
          >
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
        autoHideDuration={1000}
        onClose={() => setSnackAdd(false)}
        message={"Added Successfully"}
      />

      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackMail}
        autoHideDuration={2000}
        onClose={() => setSnackMail(false)}
        message={"Invitaion mail sent successfully"}
      />

      {/* <div>
        {mailContent.map((item) => (
         <div>
         {mailContent.map((item, index) => (
           <div
             key={index}
             dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.mail_content) }}
           />
         ))}
       </div>
        ))}
      </div> */}

      


{serverStatus === false &&
<>
<div className="overlay" />
      <div className="server-error mx-auto">
        <div>Server is not reachable</div>

      </div>
      </>
}

      <div className="col-md-8 ">
        {/* <FormStrcture heading={"Invite Users"} dynamic_col={12}> */}
        {/* <InviteForm selectedEmails={selectedEmails} /> */}
        <div className="broadcast-mail-wrapper">
          <div className="broadcast-mail-sec">
            {loader && <Loader />}

            <div>
              <div className="d-flex flex-column">
                <div
                  className="pro_flex"
                  style={{ width: "-webkit-fill-available" }}
                >
                  <TextField
                    sx={{ mt: 1, width: ["100%"] }}
                    label="Enter Reciever Email Id"
                    variant="outlined"
                    size="small"
                    inputProps={{ maxlength: 5000 }}
                    className="w-100"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <input
                            type="file"
                            id="file-1"
                            style={{ display: "none" }}
                            //accept="xlxs/csv"
                            accept=".xlsx, .csv"
                            onChange={handleFileUpload}
                            ref={fileInputRef}
                          />
                          <label
                            htmlFor="file-1"
                            className="mb-0"
                            title="Upload file"
                          >
                            <span
                              className="pl-1 pointer"
                              style={{ fontSize: "15px", color: "#3a3a3a" }}
                            >
                              Upload CSV File
                            </span>
                            <IconUpload
                              className="pl-1 pointer"
                              width={22}
                              height={22}
                            />
                          </label>
                        </InputAdornment>
                      ),
                    }}
                    value={temp}
                    // helperText={
                    //   emailConfigData.email_reciever_id.length < 1
                    //     ? "Required"
                    //     : ""
                    // }
                    FormHelperTextProps={{ sx: { color: "red" } }}
                    onChange={(e) => {
                      setTemp(
                        e.target.value.replace(/[^a-zA-Z . ,0-9 @]/g, "")
                      ),
                        setIdExists(false);
                      setInvalidEmilErr(false);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  {emailConfigData.email_reciever_id.length < 1 ? (
                    <div className="invite-user-helper-text float-left">
                      Required
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div
                    title="Click to download sample CSV sheet"
                    className="invite-user-helper-text float-right"
                  >
                    <a
                      href={`${import.meta.env.VITE_BACKEND}/sample-csv.csv`}
                      download
                    >
                      Download sample CSV sheet
                    </a>
                  </div>
                </div>
                {idExists && <div>Id already exists</div>}
                {invalidEmilErr && <div>Enter Correct Email</div>}

                {/* <div
            className="email-add-btn-wrapper-1 "
            onClick={(e) => {
              temp.length > 0 &&
              !emailConfigData.email_reciever_id.includes(temp)
                ? (setEmailConfigData({
                    ...emailConfigData,
                    email_reciever_id: [
                      ...emailConfigData.email_reciever_id,
                      temp,
                    ],
                  }),
                  setTemp(""))
                : setIdExists(true);
            }}
          >
            <div className="email-add-btn">Add</div>
          </div> */}
              </div>

              <div className="email-text-wrapper d-flex flex-wrap">
                {emailConfigData.email_reciever_id
                  .slice(0, 4)
                  .map((item, index) => (
                    <div className="email-text  mb-2">
                      {item}
                      <span onClick={() => handleRemove(index)}>
                        <IconX className="pointer" width={14} height={14} />
                      </span>
                    </div>
                  ))}

              {emailConfigData.email_reciever_id.length > 4 &&
                <div className="pointer email-text email-text-more mb-2" onClick={() => {
                  setShowList(false), setShowSelected(true);
                }}>
                  <span>
                    <IconPlus
                      style={{ marginBottom: "2px", paddingRight: "2px" }}
                      className="pointer"
                      width={14}
                      height={14}
                    />
                  </span>
                  {emailConfigData.email_reciever_id.length - 4} More
                </div>
}
              </div>
            </div>

            <div
              className="pro_flex"
              style={{ width: "-webkit-fill-available" }}
            >
              <TextField
                sx={{ mt: 1, mb: 1, width: ["100%"] }}
                label="Enter Email Subject"
                variant="outlined"
                size="small"
                inputProps={{ maxlength: 500 }}
                className="w-100"
                //value={emailConfigData.email_reciever_id}
                value={emailConfigData.email_sub}
                helperText={
                  emailConfigData.email_sub.length < 1 ? "Required" : ""
                }
                FormHelperTextProps={{ sx: { color: "red" } }}
                onChange={(e) => {
                  setEmailConfigData({
                    ...emailConfigData,
                    email_sub: e.target.value.replace(
                      /[^a-zA-Z 0-9 -!@#$%^&*()_+.,?"'`: ;{[ }]|]/g,
                      ""
                    ),
                  });
                }}
                // onChange={(e) => {
                //   (e.target.value.replace(/[^a-zA-Z . ,0-9 @]/g, "")),
                //     setIdExists(false);
                //     setInvalidEmilErr(false);
                // }}
              />
            </div>

            <Editor
              //apiKey='0diml40yxdoa0swdx4n51bjrnzbn4t1kjqscm1u92tz57w8j'

              //tinymce fake email : xiyeh63725@kwalah.com
              //tinymce fake id pass : Calinfo@123

              apiKey="rzsp0a9jg38irzw0wr4rcurbufs7gnq2jlgn31ocse5wl7kv"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
              init={{
                height: 360,
                menubar: true,
                // plugins: [
                //   'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount Import CSS Insert Date/Time'
                // ],
                // toolbar: 'undo redo blocks fontfamily fontsize bold italic underline strikethrough link image media table numlist bullist indent outdent | emoticons charmap | removeformat',
                plugins: [
                  // Core editing features
                  "anchor",
                  "autolink",
                  "charmap",
                  "codesample",
                  "emoticons",
                  "image",
                  "link",
                  "lists",
                  "media",
                  "searchreplace",
                  "table",
                  "visualblocks",
                  "wordcount",
                  "code",

                  //  premium features until Sep 17, 2024:
                ],
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | code",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />

            {/* <div className="m-2">
        <input
          type="file"
          id="file-1"
          class="hidden sr-only w-full "
          accept="xlxs"
          // onChange={(event) => {
          //   setFormatError(false),
          //     setFileSizeExceeded(false),
          //     setSelectedFiles(event.target.files),
          //     handleImage(event.target.files);
          // }}
          onChange={handleFileUpload}
        />
        <label
          htmlFor="file-1"
          className="mb-3"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="d-flex flex-column align-items-center border border-[#5a5c69] py-4 rounded-2 ">
            <div>Drop files here</div>
            <div className="py-1">Or</div>
            <div className="border py-2 px-4">Browse</div>
          </div>
        </label>
      </div> */}

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
        </div>
        {/* </FormStrcture> */}
      </div>
      <div className="col-md-4 contact-list-sec">
        <div className="contact-list-Wrapper">
          <div className="contact-list-header d-flex justify-content-between">
            <div className=" d-flex">
              <div
                onClick={() => {
                  setShowList(true), setShowSelected(false);
                }}
                className={`contact-list-header-item ${
                  showList && "selected-item"
                }`}
              >
                Contact List
              </div>
              <div
                onClick={() => {
                  setShowSelected(true), setShowList(false);
                }}
                className={`contact-list-header-item ${
                  showSelected && "selected-item"
                }`}
              >
                Selected
              </div>
            </div>
            <div
              className="add-email-btn-1 pointer text-success"
              onClick={() => setOpenEmailDia(true)}
            >
              <IconPlus width={19} height={19} className="mb-1" /> Add Email
            </div>
          </div>

          

          {showList && (
            <>
            
            <div className="contact-list-search">
            <input
              type="text"
              className="form-control "
              placeholder="Search for a Email"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
            <div>
              {contactList.some((i) => i.already_user === 1) && (
                <div
                  onClick={() =>
                    setShowAlreadyUserEmails(!showAlreadyUserEmails)
                  }
                  className="contact-list-type d-flex justify-content-between pointer"
                >
                  Already a User
                  {showAlreadyUserEmails ? (
                    <IconChevronUp />
                  ) : (
                    <IconChevronDown />
                  )}
                </div>
              )}

              {showAlreadyUserEmails && (
                <>
                  <div className="contact-list-item d-flex justify-content-between">
                    <div>
                      <Checkbox
                        size="small"
                        //onChange={() => handleCheckboxChange(item.email)}

                        checked={contactList
                          .filter((contact) => contact.already_user === 1)
                          .every((contact) =>
                            emailConfigData.email_reciever_id.includes(
                              contact.email
                            )
                          )}
                        onClick={() => handleAllAlreadyUsers()}
                      />
                      Select All
                    </div>
                  </div>
                  {results &&
                    results
                      .filter((i) => i.already_user === 1)
                      .map((item) => (
                        <div key={item.email}>
                          <div className="contact-list-item d-flex justify-content-between">
                            <div>
                              <Checkbox
                                size="small"
                                onChange={() =>
                                  handleCheckboxChange(item.email)
                                }
                                checked={emailConfigData.email_reciever_id.includes(
                                  item.email
                                )}
                              />
                              {item.email}
                            </div>
                            {/* <div>
              <IconTrash className="mr-3" />
            </div> */}
                          </div>
                        </div>
                      ))}
                </>
              )}
              {contactList.some((i) => i.already_user === 0) && (
                <div
                  onClick={() => setShowNotUserEmails(!showNotUserEmails)}
                  className="contact-list-type d-flex justify-content-between pointer"
                >
                  Not a User
                  {showNotUserEmails ? <IconChevronUp /> : <IconChevronDown />}
                </div>
              )}

              {showNotUserEmails && (
                <>
                  <div className="contact-list-item d-flex justify-content-between">
                    <div>
                      <Checkbox
                        size="small"
                        //onChange={() => handleCheckboxChange(item.email)}
                        checked={contactList
                          .filter((contact) => contact.already_user === 0)
                          .every((contact) =>
                            emailConfigData.email_reciever_id.includes(
                              contact.email
                            )
                          )}
                        onClick={() => handleAllNotUsers()}
                      />
                      Select All
                    </div>
                  </div>
                  {results &&
                    results
                      .filter((i) => i.already_user === 0)
                      .map((item) => (
                        <div key={item.email}>
                          <div className="contact-list-item d-flex justify-content-between">
                            <div>
                              <Checkbox
                                size="small"
                                onChange={() =>
                                  handleCheckboxChange(item.email)
                                }
                                checked={emailConfigData.email_reciever_id.includes(
                                  item.email
                                )}
                              />
                              {item.email}
                            </div>
                            <div>
                              <IconTrash
                                className="mr-3 pointer"
                                title="Delete Email"
                                onClick={() =>
                                  handleClickOpenDel(item.email_id, item.email)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                </>
              )}
            </div>
            </>
          )}

          {showSelected &&
            (emailConfigData.email_reciever_id.length > 0 ? (
              emailConfigData.email_reciever_id.map((item) => (
                <div className="contact-list-item">
                  <Checkbox
                    size="small"
                    onClick={() => handleCheckboxChange(item)}
                    checked
                  />

                  {item.length > 0 ? item : "No Id Selected"}
                </div>
              ))
            ) : (
              <div className="contact-list-item pl-4 pt-3">No Id Selected</div>
            ))}
        </div>
      </div>
    </div>
    
  );
};

export default InviteFromAdmin;




// default value
// tinymce.activeEditor.setContent("<p>Hello world!</p>");