import React from "react";
import { FormStrcture } from "../../components/adminDashboardComp/AdminDashTbody";
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
import { IconPlus, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import * as XLSX from "xlsx";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {Dialog} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {Snackbar} from "@mui/material";
// export const InviteForm = ({ selectedEmails }) => {
//   const [loader, setLoader] = useState(false);
//   const [submitDisabled, setSubmitDisabled] = useState(true);
//   const [temp, setTemp] = useState();

//   const [idExists, setIdExists] = useState(false);
//   const [data, setData] = useState([]);
//   const [invalidEmilErr, setInvalidEmilErr] = useState(false);
//   const [emailConfigData, setEmailConfigData] = useState({
//     email_reciever_id: [],
//     email_sub: "",
//     email_cont: "",
//   });
//   const [enEmailConfigData, setEnEmailConfigData] = useState({
//     email_reciever_id: [],
//     email_sub: "",
//     email_cont: "",
//   });

//   useEffect(() => {
    

//     if (selectedEmails.length > 0) {
//       const emailArray = selectedEmails
//         // .split(",")
//         .map((item) => item.trim())
//         .filter((email) => email)
//         .filter((email, index, self) => self.indexOf(email) === index);

//       const validEmails = emailArray.filter(
//         (email) =>
//           email.length > 0 &&
//           !emailConfigData.email_reciever_id.includes(email) &&
//           EMAIL_REGEX.test(email)
//       );

//       const invalidEmails = emailArray.filter(
//         (email) => email.length > 0 && !EMAIL_REGEX.test(email)
//       );

//       if (validEmails.length > 0) {
//         setEmailConfigData((prevState) => ({
//           ...prevState,
//           email_reciever_id: [...prevState.email_reciever_id, ...validEmails],
//         }));
//       }
//     }
//   }, [selectedEmails]);

//   const handleRemove = (id) => {
//     let copy = [...emailConfigData.email_reciever_id];
//     copy.splice(id, 1);
//     setEmailConfigData((prevState) => ({
//       ...prevState,
//       email_reciever_id: copy,
//     }));

   
//   };

//   const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       console.log(event.keyCode, temp);
//       if (event.keyCode === 13) {
//         if (temp.length > 0) {
//           //const emailArray = temp.split(',').map(email => email.trim());

//           const emailArray = temp
//             .split(",")
//             .map((item) => item.trim())
//             .filter((email) => email)
//             .filter((email, index, self) => self.indexOf(email) === index);

//           const validEmails = emailArray.filter(
//             (email) =>
//               email.length > 0 &&
//               !emailConfigData.email_reciever_id.includes(email) &&
//               EMAIL_REGEX.test(email)
//           );

//           const invalidEmails = emailArray.filter(
//             (email) => email.length > 0 && !EMAIL_REGEX.test(email)
//           );

//           if (validEmails.length > 0) {
//             setEmailConfigData((prevState) => ({
//               ...prevState,
//               email_reciever_id: [
//                 ...prevState.email_reciever_id,
//                 ...validEmails,
//               ],
//             }));
//           }

//           if (invalidEmails.length > 0) {
//             setTemp(invalidEmails.join(", "));
//             setInvalidEmilErr(true);
//           } else {
//             setTemp("");
//           }
//         }
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [emailConfigData, temp]);

//   // const handleDrag = function (e) {
//   //   e.preventDefault();
//   //   e.stopPropagation();
//   // };

//   // const handleDrop = (e) => {
//   //   e.preventDefault();
//   //   e.stopPropagation();
//   //   if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//   //     const file = e.dataTransfer.files[0];
//   //     if (
//   //       file.type ===
//   //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
//   //       file.type === "application/vnd.ms-excel"
//   //     ) {
//   //       const reader = new FileReader();
//   //       reader.onload = (event) => {
//   //         try {
//   //           const workbook = XLSX.read(event.target.result, { type: "binary" });
//   //           const sheetName = workbook.SheetNames[0];
//   //           const sheet = workbook.Sheets[sheetName];
//   //           const sheetData = XLSX.utils.sheet_to_json(sheet);
//   //           setData(sheetData);
//   //         } catch (error) {
//   //           console.error("Error reading Excel file:", error);
//   //         }
//   //       };
//   //       reader.readAsBinaryString(file);
//   //     } else {
//   //       console.error("Unsupported file type:", file.type);
//   //     }
//   //   }
//   // };

//   const fileInputRef = useRef(null);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       fileInputRef.current.value = "";
//     }
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const workbook = XLSX.read(event.target.result, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const sheetData = XLSX.utils.sheet_to_json(sheet);
//       setData(sheetData);
//     };
//     reader.readAsBinaryString(file);
//   };

//   useEffect(() => {
//     if (data.length > 0) {
//       const newEmails = data
//         .map((item) => item.email)
//         .filter((email) => email)
//         .filter((email, index, self) => self.indexOf(email) === index);
//       setEmailConfigData((prevState) => {
//         const updatedEmails = newEmails.filter(
//           (email) => !prevState.email_reciever_id.includes(email)
//         );

//         if (updatedEmails.length > 0) {
//           return {
//             ...prevState,
//             email_reciever_id: [
//               ...prevState.email_reciever_id,
//               ...updatedEmails,
//             ],
//           };
//         }
//         return prevState;
//       });
//     }
//   }, [data]);

//   const handleClick = async () => {
//     emailConfigData.email_cont = editorRef.current.getContent();
//     console.log(editorRef.current.getContent(), emailConfigData);
//     try {
//       setLoader(true);
//       await axios.post(
//         import.meta.env.VITE_BACKEND + "/api/invite/adminInvite",
//         emailConfigData
//       );
//       setLoader(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const editorRef = useRef(null);

//   useEffect(() => {
//     // console.log(editorRef.current.getContent());

//     if (
//       emailConfigData.email_reciever_id !== "" &&
//       emailConfigData.email_sub !== "" &&
//       editorRef.current.getContent() !== "" &&
//       invalidEmilErr === false &&
//       idExists === false
//     ) {
//       setSubmitDisabled(false);
//     } else {
//       setSubmitDisabled(true);
//     }
//   }, [
//     emailConfigData.email_reciever_id,
//     emailConfigData.email_sub,
//     editorRef,
//     invalidEmilErr,
//     idExists,
//   ]);

//   return (
//     <>
//       {loader && <Loader />}

//       <div>
//         <div className="d-flex">
//           <div className="pro_flex" style={{ width: "-webkit-fill-available" }}>
//             <TextField
//               sx={{ m: 1, width: ["100%"] }}
//               label="Enter Reciever Email Id"
//               variant="outlined"
//               size="small"
//               inputProps={{ maxlength: 500 }}
//               className="w-100"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <input
//                       type="file"
//                       id="file-1"
//                       style={{ display: "none" }}
//                       accept="xlxs"
//                       onChange={handleFileUpload}
//                       ref={fileInputRef}
//                     />
//                     <label
//                       htmlFor="file-1"
//                       className="mb-0"
//                       title="Upload file"
//                     >
//                       <IconUpload
//                         className="pl-1 pointer"
//                         width={22}
//                         height={22}
//                       />
//                     </label>
//                   </InputAdornment>
//                 ),
//               }}
//               value={temp}
//               helperText={
//                 emailConfigData.email_reciever_id.length < 1 ? "Required" : ""
//               }
//               FormHelperTextProps={{ sx: { color: "red" } }}
              
//               onChange={(e) => {
//                 setTemp(e.target.value.replace(/[^a-zA-Z . ,0-9 @]/g, "")),
//                   setIdExists(false);
//                 setInvalidEmilErr(false);
//               }}
//             />
//           </div>

//           {idExists && <div>Id already exists</div>}
//           {invalidEmilErr && <div>Enter Correct Email</div>}

//           {/* <div
//             className="email-add-btn-wrapper-1 "
//             onClick={(e) => {
//               temp.length > 0 &&
//               !emailConfigData.email_reciever_id.includes(temp)
//                 ? (setEmailConfigData({
//                     ...emailConfigData,
//                     email_reciever_id: [
//                       ...emailConfigData.email_reciever_id,
//                       temp,
//                     ],
//                   }),
//                   setTemp(""))
//                 : setIdExists(true);
//             }}
//           >
//             <div className="email-add-btn">Add</div>
//           </div> */}
//         </div>

//         <div className="email-text-wrapper d-flex flex-wrap">
//           {emailConfigData.email_reciever_id.map((item, index) => (
//             <div className="email-text  mb-2">
//               {item}
//               <span onClick={() => handleRemove(index)}>
//                 <IconX className="pointer" width={14} height={14} />
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="pro_flex" style={{ width: "-webkit-fill-available" }}>
//         <TextField
//           sx={{ m: 1, width: ["100%"] }}
//           label="Enter Email Subject"
//           variant="outlined"
//           size="small"
//           inputProps={{ maxlength: 500 }}
//           className="w-100"
//           //value={emailConfigData.email_reciever_id}
//           value={emailConfigData.email_sub}
//           helperText={emailConfigData.email_sub.length < 1 ? "Required" : ""}
//           FormHelperTextProps={{ sx: { color: "red" } }}
//           onChange={(e) => {
//             setEmailConfigData({
//               ...emailConfigData,
//               email_sub: e.target.value.replace(/[^a-zA-Z 0-9 -]/g, ""),
//             });
//           }}
//           // onChange={(e) => {
//           //   (e.target.value.replace(/[^a-zA-Z . ,0-9 @]/g, "")),
//           //     setIdExists(false);
//           //     setInvalidEmilErr(false);
//           // }}
//         />
//       </div>

//       <Editor
//         //apiKey='0diml40yxdoa0swdx4n51bjrnzbn4t1kjqscm1u92tz57w8j'

//         //tinymce fake email : xiyeh63725@kwalah.com
//         //tinymce fake id pass : Calinfo@123

//         apiKey="rzsp0a9jg38irzw0wr4rcurbufs7gnq2jlgn31ocse5wl7kv"
//         onInit={(_evt, editor) => (editorRef.current = editor)}
//         initialValue="<p>This is the initial content of the editor.</p>"
//         init={{
//           height: 300,
//           menubar: true,
//           // plugins: [
//           //   'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount Import CSS Insert Date/Time'
//           // ],
//           // toolbar: 'undo redo blocks fontfamily fontsize bold italic underline strikethrough link image media table numlist bullist indent outdent | emoticons charmap | removeformat',
//           plugins: [
//             // Core editing features
//             "anchor",
//             "autolink",
//             "charmap",
//             "codesample",
//             "emoticons",
//             "image",
//             "link",
//             "lists",
//             "media",
//             "searchreplace",
//             "table",
//             "visualblocks",
//             "wordcount",

//             //  premium features until Sep 17, 2024:
//           ],
//           toolbar:
//             "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
//           content_style:
//             "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//         }}
//       />

//       {/* <div className="m-2">
//         <input
//           type="file"
//           id="file-1"
//           class="hidden sr-only w-full "
//           accept="xlxs"
//           // onChange={(event) => {
//           //   setFormatError(false),
//           //     setFileSizeExceeded(false),
//           //     setSelectedFiles(event.target.files),
//           //     handleImage(event.target.files);
//           // }}
//           onChange={handleFileUpload}
//         />
//         <label
//           htmlFor="file-1"
//           className="mb-3"
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <div className="d-flex flex-column align-items-center border border-[#5a5c69] py-4 rounded-2 ">
//             <div>Drop files here</div>
//             <div className="py-1">Or</div>
//             <div className="border py-2 px-4">Browse</div>
//           </div>
//         </label>
//       </div> */}

//       <div className="pro_flex justify-content-end">
//         <button
//           onClick={handleClick}
//           type="button"
//           class={
//             submitDisabled
//               ? "cursor-not-allowed-btn btn btn-secondary px-5 py-2 m-2"
//               : "btn btn-primary px-5 py-2 m-2 "
//           }
//           disabled={submitDisabled}
//         >
//           Submit
//         </button>
//       </div>
//     </>
//   );
// };

const InviteFromAdmin = () => {

  const [loader, setLoader] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [temp, setTemp] = useState();

  const [idExists, setIdExists] = useState(false);
  const [data, setData] = useState([]);
  const [invalidEmilErr, setInvalidEmilErr] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [showSelected, setShowSelected] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);
  
  const [openEmailDia , setOpenEmailDia] = useState(false);
  const [snackAdd , setSnackAdd] = useState(false);
  const [openEmailDel , setOpenEmailDel] = useState(false);
  const [snackDel , setSnackDel] = useState(false);

  const [delId, setDelId] = useState("");
  const [delMail, setDelMail] = useState("");
  const [change , setChange] = useState(1);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/invite/getMailContactList`)
      .then((res) => {
        setContactList(res.data);
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
    console.log("id : " , id);
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
      const updatedReceivers = emailConfigData.email_reciever_id.filter(i => i !== email);
      // console.log(updatedReceivers)
      setEmailConfigData((prevState) => {
        return {
          ...prevState,
          email_reciever_id: [
            ...updatedReceivers
          ],
        };
    });
    } else {
      // console.log(email)
    setEmailConfigData((prevState) => {
        return {
          ...prevState,
          email_reciever_id: [
            ...prevState.email_reciever_id,
            email
          ],
        };
    
    });
  }
  };

  
  const handleCloseEmailDia = () => {
    setOpenEmailDia(false);
  }


  const handleClickOpenDel = (id,email) => {
    setDelId(id);
    setDelMail(email);
    setOpenEmailDel(true);
  }

  const handleCloseEmailDel = () => {
    setOpenEmailDel(false);
  }

  const [emailIdTobeAdded, setEmailIdTobeAdded] = useState("");

  const handleAddEmail = async () => {
    try {
      setOpenEmailDia(false);
      setLoader(true);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/invite/addSingleMail",
        { email: emailIdTobeAdded }
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
    console.log(delId);
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


  
  return (
    <div className="row m-0">

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
         <DialogTitle id="alert-dialog-title">
          Add Email
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="pt-2" id="alert-dialog-description" sx={{ width: ["500px"] }}>
          <TextField
          sx={{  width: ["100%"] }}
          label="Enter Email "
          variant="outlined"
          size="small"
          inputProps={{ maxlength: 500 }}
          className="w-100"
          //value={emailConfigData.email_reciever_id}
          value={emailIdTobeAdded}
          helperText={emailIdTobeAdded < 1 ? "Required" : ""}
          FormHelperTextProps={{ sx: { color: "red" } }}
          // onChange={(e) => {
          //   setEmailConfigData({
          //     ...emailConfigData,
          //     email_sub: e.target.value.replace(/[^a-zA-Z 0-9 -]/g, ""),
          //   });
          // }}
          onChange={(e) => {
            setEmailIdTobeAdded(e.target.value)
          }}
          // onChange={(e) => {
          //   (e.target.value.replace(/[^a-zA-Z . ,0-9 @]/g, "")),
          //     setIdExists(false);
          //     setInvalidEmilErr(false);
          // }}
        />
          </DialogContentText>
        </DialogContent>
        <DialogActions className="pr-4 mb-2">
          <button className="btn cancel-dia-btn" onClick={handleCloseEmailDia}>Cancel</button>
          <button className="btn add-email-btn" 
         onClick={handleAddEmail} 
          autoFocus>
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

      <div className="col-md-8 ">
        {/* <FormStrcture heading={"Invite Users"} dynamic_col={12}> */}
          {/* <InviteForm selectedEmails={selectedEmails} /> */}
          <div className="broadcast-mail-wrapper">
          <div className="broadcast-mail-sec">
      {loader && <Loader />}

      <div>
        <div className="d-flex">
          <div className="pro_flex" style={{ width: "-webkit-fill-available" }}>
            <TextField
              sx={{ mt: 1, mb:1, width: ["100%"] }}
              label="Enter Reciever Email Id"
              variant="outlined"
              size="small"
              inputProps={{ maxlength: 500 }}
              className="w-100"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <input
                      type="file"
                      id="file-1"
                      style={{ display: "none" }}
                      accept="xlxs"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                    />
                    <label
                      htmlFor="file-1"
                      className="mb-0"
                      title="Upload file"
                    >
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
              helperText={
                emailConfigData.email_reciever_id.length < 1 ? "Required" : ""
              }
              FormHelperTextProps={{ sx: { color: "red" } }}
              
              onChange={(e) => {
                setTemp(e.target.value.replace(/[^a-zA-Z . ,0-9 @]/g, "")),
                  setIdExists(false);
                setInvalidEmilErr(false);
              }}
            />
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
          {emailConfigData.email_reciever_id.map((item, index) => (
            <div className="email-text  mb-2">
              {item}
              <span onClick={() => handleRemove(index)}>
                <IconX className="pointer" width={14} height={14} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pro_flex" style={{ width: "-webkit-fill-available" }}>
        <TextField
          sx={{ mt: 1, mb:1, width: ["100%"] }}
          label="Enter Email Subject"
          variant="outlined"
          size="small"
          inputProps={{ maxlength: 500 }}
          className="w-100"
          //value={emailConfigData.email_reciever_id}
          value={emailConfigData.email_sub}
          helperText={emailConfigData.email_sub.length < 1 ? "Required" : ""}
          FormHelperTextProps={{ sx: { color: "red" } }}
          onChange={(e) => {
            setEmailConfigData({
              ...emailConfigData,
              email_sub: e.target.value.replace(/[^a-zA-Z 0-9 -]/g, ""),
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
            'code'

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
              className={`contact-list-header-item ${showList && "selected-item"}`}
              
            >
              Contact List
            </div>
            <div
              onClick={() => {
                setShowSelected(true), setShowList(false);
              }}
              className={`contact-list-header-item ${showSelected && "selected-item"}`}
            >
              Selected
            </div>
            </div>
            <div className="add-email-btn-1 pointer text-success" onClick={() => setOpenEmailDia(true)}  >
              <IconPlus width={19} height={19} className="mb-1"/> Add Email
            </div>
          </div>

          {/* {showList && (
            <div className="contact-list-item">
              <Checkbox
                size="small"
                //onClick={handleAllTypes}
                //checked={allSelected}
                // className="checkbox-alignment"
              />
              Select All
            </div>
          )} */}

          {/* {showList &&
          

          (
            {contactList
              .filter(i => i.already_user === 1) === true  && <div>Already User</div>}
            contactList
              .filter(i => i.already_user === 1)
              .map((item) => (
                <div>
                <div className="contact-list-item d-flex justify-content-between">
                  <div >
                  <Checkbox
                    size="small"
                    onClick={() => handleCheckboxChange(item.email)}
                    checked={emailConfigData.email_reciever_id.includes(item.email)}
                    // className="checkbox-alignment"
                  />
                  {item.email}
                  </div>
                  <div>
                    <IconTrash className="mr-3" />
                  </div>
                </div>
                </div>
              )))} */}


{showList && (
  <div>
   
    {contactList.some(i => i.already_user === 1) && (
      <div className="contact-list-type"> Already User</div>
    )}

   
    {contactList
      .filter(i => i.already_user === 1)
      .map((item) => (
        <div key={item.email}>
          <div className="contact-list-item d-flex justify-content-between">
            <div>
              <Checkbox
                size="small"
                onChange={() => handleCheckboxChange(item.email)}
                checked={emailConfigData.email_reciever_id.includes(item.email)}
              />
              {item.email}
            </div>
            {/* <div>
              <IconTrash className="mr-3" />
            </div> */}
          </div>
        </div>
      ))}

 
    {contactList.some(i => i.already_user === 0) && (
      <div className="contact-list-type">Not a User</div>
    )}
    {contactList
      .filter(i => i.already_user === 0)
      .map((item) => (
        <div key={item.email}>
          <div className="contact-list-item d-flex justify-content-between">
            <div>
              <Checkbox
                size="small"
                onChange={() => handleCheckboxChange(item.email)}
                checked={emailConfigData.email_reciever_id.includes(item.email)}
              />
              {item.email}
            </div>
            <div>
              <IconTrash className="mr-3 pointer" title="Delete Email" onClick={() => handleClickOpenDel(item.email_id, item.email)} />
            </div>
          </div>
        </div>
      ))}
  </div>
)}


          {showSelected && (
          
          emailConfigData.email_reciever_id.length > 0 ?
            emailConfigData.email_reciever_id.map((item) => (
              <div className="contact-list-item">
                <Checkbox
                  size="small"
                  onClick={() => handleCheckboxChange(item)}
                  checked
                />
                
                {item.length > 0 ? item : "No Id Selected"}
              </div>
            )) :
            <div className="contact-list-item pl-4 pt-3"
            >No Id Selected</div>)
          }
        </div>
      </div>
    </div>
  );
};

export default InviteFromAdmin;