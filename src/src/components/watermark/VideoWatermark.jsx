import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { Cloudinary } from "@cloudinary/url-gen";

const VideoWatermark = () => {
  const [selectedVideo, setselectedVideo] = useState(null);
  const [pid, setPid] = useState(null);
  const [loader, setLoader] = useState(false);
  const [invalidFile, setInvalidFile] = useState(false);

  const cld = new Cloudinary({ cloud: { cloudName: "dqct40k0n" } });

  const handleFileChange = (event) => {
    //console.log(event[0].type);
    setInvalidFile(false);
    setselectedVideo(null);
    setPid(null);
    //const temp = event.target.files[0];
    const temp = event;
    if (!temp) return;
    //console.log("temp: ", temp[0].type);
    if (temp[0].type !== "video/mp4") {
      setInvalidFile(true);
    }
    setselectedVideo(event);
  };

  const handleUpload = async () => {
    if (!selectedVideo) {
      console.log("No File Selected");
      return;
    }
    setLoader(true);

    const formData = new FormData();
    formData.append(`files`, selectedVideo[0]);

    const ans = await axios.post(
      import.meta.env.VITE_BACKEND + "/api/watermark/uploadVideo",
      formData
    );
  
    setPid(ans.data.public_id);
  };

  function Video({ cloudName, watermarkId }) {
    if (pid) {
      let videoSource = `https://res.cloudinary.com/${cloudName}/video/upload`;

      videoSource += "/q_auto:best,w_600";
      const watermark = `l_${watermarkId.replace("/", ":")}`;

      videoSource += `/${watermark},g_south_east,w_100,x_20,y_20`;
      videoSource += `/${pid}.mp4`;
      setLoader(false);
      setselectedVideo(null);
      return (
        <video controls>
          <source src={videoSource} type="video/mp4" />
        </video>
      );
    }
  }

  const handleDrag1 = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop1 = function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("e.dataTransfer.files : " , e.dataTransfer.files);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  return (
    <div className="d-flex flex-column gap-12 justify-content-center p-5  ">
      <div className="  m-8">
        <input
          id="file-2"
          type="file"
          multiple
          className="hidden sr-only w-full"
          onChange={(e) => handleFileChange(e.target.files)}
        />
        <label
          htmlFor="file-2"
          className="border py-4 mx-2 rounded-2 border-secondary"
          onDragEnter={handleDrag1}
          onDragLeave={handleDrag1}
          onDragOver={handleDrag1}
          onDrop={handleDrop1}
        >
          {!selectedVideo && (
            <div className="d-flex flex-column align-items-center">
              <div>Drop Videos here</div>
              <div className="py-1">Or</div>
              <div className="border py-2 px-4">Browse</div>
            </div>
          )}

          {selectedVideo && (
            <div className="d-flex flex-column  align-items-center">
              <div className="py-3"></div>
              <div className="py-1">Download you updated file.</div>
              <div className="py-3"></div>
            </div>
          )}
        </label>
      </div>

{console.log(invalidFile , selectedVideo)}
      <div className="ml-2">
        {!loader ? (
          <button
            className={
              invalidFile === false  && selectedVideo !== null ? "btn btn-primary py-2 px-4" : "btn btn-secondary py-2 px-4"
            }
            onClick={handleUpload}
            disabled={invalidFile === false && selectedVideo !== null ? false : true}
          >
            Upload
          </button>
        ) : (
          ""
        )}
      </div>

      {loader ? <p>Processing your file ... Please wait </p> : ""}
      {loader ? <HashLoader /> : ""}
      {invalidFile ? (
        <p className="text-lg text-slate-500">
          Invalid File Format ( Supported Format : .mp4 )
        </p>
      ) : (
        ""
      )}
	  <div className="mt-4  embed-responsive embed-responsive-16by9">
	  {pid ? <Video cloudName="dqct40k0n" watermarkId="logo_2_nximfp" /> : ""}
	  </div>
    
    </div>
  );
};

export default VideoWatermark;
