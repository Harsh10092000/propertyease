

import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";
import { HashLoader } from "react-spinners";

const ImageWatermark = () => {
  const [formatError, setFormatError] = useState(false);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const minFileSize = 10000;
  const formData = new FormData();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [txt, showtxt] = useState(false);
  const [btn, setBtn] = useState(true);
  const [numFile, setNumFile] = useState(0);
  const [circle, showCircle] = useState(false);
  const [prev, setprev] = useState(true);
	const [type, setType] = useState('cm');
  const [maxFileError , setMaxFileError] = useState(false);

  const handleType = (e) => {
		const { name, value } = e.target;
		setType(value);
	};

  const handleImage = (data) => {

    setFormatError(false);
    const pattern = /image-*/;
    for (let i = 0; i < data.length; i++) {
      if (data[i].type.match(pattern) && data.length < 11 ) {
        setFormatError(false);
        setBtn(false);
        if (data[i].size > minFileSize) {
          formData.append(`files`, data[i]);
          setFileSizeExceeded(false);
          setBtn(false);
        } else {
          setFileSizeExceeded(true);
          setBtn(true);
          return;
        }
      } else {
        setMaxFileError(true)
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
    setFormatError(false),
    setFileSizeExceeded(false),
    setMaxFileError(false),
    setBtn(true);
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
    formData.append('typeLogo', type);
    setprev(false);
    showCircle(false);
    await axios.post(
      import.meta.env.VITE_BACKEND + "/api/watermark2/upload",
      formData
    );
  };

  const handleDownload = async (e) => {
    setBtn(true);
    e.preventDefault();
    showtxt(true);
    showCircle(true);
    await axios
      .get(import.meta.env.VITE_BACKEND + `/api/watermark2/download`, {
        responseType: "blob",
      })
      .then((res) => {
        console.log(res.data);
        fileDownload(res.data, "wm-" + Date.now() + ".zip");
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
              setMaxFileError(false),
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

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="cm"
              onChange={handleType}
						 defaultChecked
            />
            <label class="form-check-label mb-0" for="inlineRadio1">
            CourseMentor
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="iwin"
              onChange={handleType}
            />
            <label class="form-check-label mb-0" for="inlineRadio2">
             Iwin
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              
              value="both"
              onChange={handleType}
            />
            <label class="form-check-label mb-0" for="inlineRadio3">
              Both
            </label>
          </div>
        </div>
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
          {maxFileError === true ? 
          "Maximum file exceeded (10 Files are allowed)"
          : formatError
            ? "Invalid File Format ( Accepted format are : jpg, png, jpeg, webp)"
            : ""}
          {fileSizeExceeded ? "File Size is below 10kb" : ""}
        </div>
      </div>

      <div className="ml-2">
        {prev && (
          <button
            className={
              btn ? "btn btn-secondary p-2 px-4" : "btn btn-primary py-2 px-4"
            }
            disabled={btn}
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
        {!prev && !circle && (
          <button className="btn btn-primary" onClick={handleDownload}>
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
