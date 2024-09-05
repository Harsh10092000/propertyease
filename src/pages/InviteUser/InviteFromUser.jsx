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
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import * as XLSX from "xlsx";

export const InviteForm = () => {
  const [loader, setLoader] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [temp, setTemp] = useState();
  const [idExists, setIdExists] = useState(false);
  const [data, setData] = useState([]);
  const [emailConfigData, setEmailConfigData] = useState({
    email_reciever_id: [],
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
 
    try {
      setLoader(true);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/invite/adminInvite",
        emailConfigData
      );
      setLoader(false)
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      {loader && <Loader />}

      <div>
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
              onChange={(e) => {
                setTemp(e.target.value), setIdExists(false);
              }}
            />
          </div>

          {idExists && <div>Id already exists</div>}

          <div
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
      </div>

      <div className="m-2">
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
            //disabled={submitDisabled}
          >
            Submit
          </button>
        </div>
    </>
  );
};

const InviteFromUser = () => {
  return (
    <FormStrcture heading={"Invite Users"}>
      <InviteForm />
    </FormStrcture>
  );
};

export default InviteFromUser;
