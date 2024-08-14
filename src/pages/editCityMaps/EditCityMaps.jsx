

import React, { useState, useEffect } from "react";

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

import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { IconX } from "@tabler/icons-react";
import moment from "moment";
import { stateList } from "../addProperty/State";
import { FormStrcture } from "../../components/adminDashboardComp/AdminDashTbody";

const EditCityMaps1 = () => {
  const [cityState, setCityState] = useState();
  const [mapCategories, setMapCategories] = useState();
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/StateCityData`)
      .then((res) => {
        setCityState(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/cityMap/fetchMapCategory`)
      .then((res) => {
        setMapCategories(res.data);
      });
  }, []);

  const [mapData, setMapData] = useState({
    map_state: "",
    map_city: "",
    map_category: "",
    map_sub_category: "",
    map_image: "",
  });



  const [otherCity, setOtherCity] = useState("");
  const [otherCategory, setOtherCategory] = useState("");

  const { mapId } = useParams();
  //const mapId = 14;

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/cityMap/fetchMapDataById/${mapId}`)
      .then((res) => {
        setMapData({
          ...mapData,
          map_id: res.data[0].map_id,
          map_state: res.data[0].map_state,
          map_city: res.data[0].map_city,
          map_category: res.data[0].map_category,
          map_sub_category: res.data[0].map_sub_category,
          map_image: res.data[0].map_image,
        });
      });
  }, [mapId]);

  const [checkSubCat, setCheckSubCat] = useState("");
  const [subCatError, setSubCatError] = useState(true);

  useEffect(() => {
    setSubmitDisabled(true);
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/cityMap/checkSubCategory/${mapData.map_city}/${mapData.map_category}/${mapData.map_sub_category}`
      )
      .then((res) => {
        setCheckSubCat(res.data);
        setSubCatError(res.data.length > 0 && res.data[0].map_id != mapId ? true : false);
      });
  }, [mapData.map_sub_category]);

  const navigate = useNavigate();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loader, setLoader] = useState(false);

  

  const [formatError, setFormatError] = useState(false);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const maxFileSize = 20000000;
  const minFileSize = 10000;

  const [selectedFiles, setSelectedFiles] = useState(null);
  const formData = new FormData();

  const handleImage = (data) => {
    setFormatError(false);
    const pattern = /image-*/;
    for (let i = 0; i < data.length; i++) {
      if (data[i].type.match(pattern)) {
        setFormatError(false);
        if (data[i].size < maxFileSize && data[i].size > minFileSize) {
          formData.append(`files`, data[i]);
          setFileSizeExceeded(false);
        } else {
          setFileSizeExceeded(true);

          return;
        }
      } else {
        setFormatError(true);
      }
    }
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFiles(e.dataTransfer.files);
      handleImage(e.dataTransfer.files);
    }
  };

  const changeFormatting = (value) => {
    var val = value.toLowerCase().trim();
    var a = val.replace(/\s{2,}/g, " ");
    return a;
  };

  const handleClick = async () => {
    //e.preventDefault();
    
    mapData.map_category =
      mapData.map_category === "new_cat"
        ? changeFormatting(otherCategory)
        : changeFormatting(mapData.map_category);
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("image", selectedFiles !== null ? selectedFiles[0] : "");
      formData.append("map_city", mapData.map_city);
      formData.append("map_state", mapData.map_state);
      formData.append("map_category", mapData.map_category);
      formData.append("map_sub_category", mapData.map_sub_category);
      formData.append("map_image", mapData.map_image);
      formData.append("map_id", mapData.map_id);
      await axios.put(
        import.meta.env.VITE_BACKEND + "/api/cityMap/updateMap",
        formData
      );
      setLoader(false);
      navigate(`/admin/citymaps`);
      //navigate(`/user/user-profile/${currentUser[0].login_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const removeImage = () => {
    setMapData({ ...mapData, map_image: "" });
    setSelectedFiles(null);
    setFileSizeExceeded(false);
    setFormatError(false);
  };

  useEffect(() => {
    if (
      mapData.map_city !== "" &&
      mapData.map_category !== "" &&
      mapData.map_sub_category !== "" &&
      subCatError === false &&
      formatError === false &&
      fileSizeExceeded === false
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [mapData.map_city, mapData.map_category, mapData.map_sub_category, subCatError, fileSizeExceeded, formatError]);

  return (
   

      <>
      {loader && <Loader />}
       
      

        <div className="pro_flex">
          <FormControl sx={{ m: 1, width: ["100%"] }} size="small">
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mapData.map_state}
              label="State"
              onChange={(e) =>
                setMapData({
                  ...mapData,
                  map_state: e.target.value,
                  map_city: "",
                })
              }
            >
              {stateList.map((item, index) => (
                <MenuItem value={item.name} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {mapData.map_state === "" && (
            <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ m: 1, width: ["100%"] }} size="small">
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mapData.map_city}
              disabled={mapData.map_state === "" ? true : false}
              label="City"
              title={mapData.map_state === "" ? "Select State to add City" : ""}
              onChange={(e) => {
                setMapData({
                  ...mapData,
                  map_city: e.target.value,
                  
                });
              }}
            >
              {cityState &&
                cityState
                  .filter((i) => i.state === mapData.map_state)
                  .map((item, index) => (
                    <MenuItem value={item.district} key={index}>
                      {item.district}
                    </MenuItem>
                  ))}
            </Select>

            {mapData.map_city === "" && (
            <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
            )}
          </FormControl>
        </div>

        <div className="pro_flex">
          <FormControl sx={{ m: 1, width: ["100%"] }} size="small">
            <InputLabel id="demo-simple-select-label">Map Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mapData.map_category}
              label="Map Category"
              onChange={(e) =>
                setMapData({
                  ...mapData,
                  map_category: e.target.value,
                })
              }
            >
              {mapCategories?.filter(i => i.map_category !== "others")
              .map((item, index) => (
                <MenuItem value={item.map_category} key={index}>
                  {item.map_category[0].toUpperCase() +
                              item.map_category.slice(1)}
                </MenuItem>
              ))}
              <MenuItem value={"others"}>Others</MenuItem>
              <MenuItem value={"new_cat"}>Add New Category</MenuItem>
            </Select>

            {mapData.map_category === "" && (
            <FormHelperText sx={{ color: "red" }}>Required</FormHelperText>
            )}
          </FormControl>
        </div>

        {mapData.map_category === "new_cat" && (
          <div className="pro_flex">
            <TextField
              sx={{ m: 1, width: ["100%"] }}
              label="Enter Map Category"
              variant="outlined"
              size="small"
              inputProps={{ maxlength: 250 }}
              className="w-100"
              value={otherCategory}
              helperText={otherCategory.length < 1 ? "Required" : ""}
              FormHelperTextProps={{ sx: { color: "red" } }}
              onChange={(e) => {
                setOtherCategory(e.target.value.replace(/[^a-zA-Z 0-9]/g, ""));
              }}
            />
          </div>
        )}

        <div className="pro_flex">
          <TextField
            sx={{ m: 1, width: ["100%"] }}
            label="Enter Map Sub Category"
            variant="outlined"
            size="small"
            inputProps={{ maxlength: 250 }}
            className="w-100"
            value={mapData.map_sub_category}
           // helperText={mapData.map_sub_category.length < 1 ? "Required" : ""}
           helperText={
            mapData.map_sub_category.length < 1
              ? "Required"
              : checkSubCat.length > 0 && checkSubCat[0].map_id != mapId
              ? "Sub Category Already Exists"
              : ""
          }
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => {
              setMapData({
                ...mapData,
                map_sub_category: e.target.value.replace(/[^a-zA-Z 0-9]/g, ""),
              });
            }}
          />
        </div>

        <div className="m-2">
          <input
            type="file"
            id="file-1"
            class="hidden sr-only w-full "
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(event) => {
              setFormatError(false),
                setFileSizeExceeded(false),
                setSelectedFiles(event.target.files),
                handleImage(event.target.files);
            }}
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
          <div className=" ad-image w-100">
            {(selectedFiles != null && selectedFiles != undefined) ||
            mapData.map_image !== "" ? (
              // ? files.map((item) => (
              <div className="d-flex file-name-wrapper justify-content-between  ">
                <div className="file-name">{selectedFiles != null && selectedFiles != undefined
                    ? selectedFiles[0].name
                    : mapData.map_image}</div>
                <div
                  className="pointer text-[#C4C5C8]"
                  onClick={removeImage}
                  title="Click to remove selected file"
                >
                  <IconX />
                </div>
              </div>
            ) : (
              // ))
              ""
            )}
          </div>

          <div className="text-danger ml-2 error_msg ">
            {formatError ? "Invalid Format" : ""}
            {fileSizeExceeded
              ? "File size must be greater than 10KB and less than 20MB"
              : ""}
          </div>
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
            disabled={submitDisabled}
          >
            Submit
          </button>
        </div>
      
    </>
  );
};

const EditCityMaps = () => {
  return (
    
    <FormStrcture heading={"Edit City Map"}> 
      <EditCityMaps1 />
      </FormStrcture>
  );
};

export default EditCityMaps;
