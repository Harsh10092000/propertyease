"use client";
import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { Cloudinary } from "@cloudinary/url-gen";

const ImageWatermark = () => {
    const [formatError, setFormatError] = useState(false);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 1000000;
  const minFileSize = 10000;
  const formData = new FormData();
  //const maxSize = 9000;
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [txt, showtxt] = useState(false);
  const [btn, setBtn] = useState(true);
  const [invalidFile, setInvalidFile] = useState(true);
  const [numFile, setNumFile] = useState(0);
  const [circle, showCircle] = useState(false);
  const [less, setLess] = useState(true);
  const [maxFile, setMaxFile] = useState(false);
  const [prev, setprev] = useState(true);

  const handleImage = (data) => {
    setFormatError(false);
    const pattern = /image-*/;
    for (let i = 0; i < data.length; i++) {
      
      if (data[i].type.match(pattern)) {
        setFormatError(false);
        setBtn(false);
        if (data[i].size < maxFileSize && data[i].size > minFileSize) {
          formData.append(`files`, data[i]);
          setFileSizeExceeded(false);
          setBtn(false);
        } else {
          setFileSizeExceeded(true);
          setBtn(true);
          return;
        }
      } else {
        setFormatError(true);
        setBtn(true);
        return;
      }
    }
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = function (e) {
    setBtn(true)
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFiles(e.dataTransfer.files);
      handleImage(e.dataTransfer.files);
    }
  };

  let files = "";

  if (selectedFiles !== null && selectedFiles !== undefined) {
    files = Array.from(selectedFiles);
  }



  const handleUpload = async () => {
    for (let i = 0; i < selectedFiles.length; i++) {
      console.log(`file ${i + 1} uploading`);
      formData.append(`files`, selectedFiles[i]);
    }
    setprev(false);
    showCircle(false);
    await axios.post(
      import.meta.env.VITE_BACKEND + "/api/watermark/upload",
      formData
    );
  };

  const handleDownload = async (e) => {
    setBtn(true);
    e.preventDefault();
    showtxt(true);
    showCircle(true);
    await axios
      .get(import.meta.env.VITE_BACKEND + `/api/watermark/download`, {
        responseType: "blob",
      })
      .then((res) => {
        console.log(res.data);
        fileDownload(res.data, "watermarked.zip");
      });

    setSelectedFiles(null);
    showtxt(false);
    showCircle(false);
    setNumFile(0);
    setprev(true);
  };

  return (
    <div className="d-flex flex-column gap-12 justify-content-center p-5  ">
      
      <div className="  m-8">
        <input
          multiple
          type="file"
          id="file-1"
          class="hidden sr-only w-full"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={(event) => {
            setFormatError(false),
              setFileSizeExceeded(false),
              setSelectedFiles(event.target.files),
              setBtn(true),
              handleImage(event.target.files);
          }}
        />
        <label
          htmlFor="file-1"
          className="border py-4 mx-2 rounded-2 border-secondary"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {prev && (
            <div className="d-flex flex-column align-items-center">
              <div>Drop files here</div>
              <div className="py-1">Or</div>
              <div className="border py-2 px-4">Browse</div>
            </div>
          )}

          {!prev && (
            <div className="d-flex flex-column  align-items-center">
              <div className="py-3"></div>
              <div className="py-1">Download you updated file.</div>
              <div className="py-3"></div>
            </div>
          )}
        </label>
       
        <div>
          {selectedFiles != null && selectedFiles != undefined && prev !== false 
            ? files.map((item) => (
                <div className="ml-2">
                  <div>{item.name}</div>
                  <div></div>
                </div>
              ))
            : ""}
        </div>

        <div className="text-danger ml-2 ">
          {formatError ? "Invalid File Format ( Accepted format are : jpg, png, jpeg, webp)" : ""}
          {fileSizeExceeded
            ? "File Size is below 10kb"
            : ""}
        </div>
      </div>


      <div className="ml-2">
        {prev && (
          <button
            className={btn ? "btn btn-secondary p-2 px-4" : "btn btn-primary py-2 px-4" }
            disabled={btn}
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
        {!prev && !circle && (
          <button
            className="btn btn-primary"
            onClick={handleDownload}
          >
            Download
          </button>
         )} 
      </div>

      

      {txt && (
        <div className="text-slate-500 text-xl">
          Downloading {numFile} Files ...
        </div>
      )}
      {circle && <HashLoader />}
      
    </div>
    
  );
};

export default ImageWatermark;
