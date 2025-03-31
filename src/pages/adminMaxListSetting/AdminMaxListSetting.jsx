import { AdminDashUpperBody, FormHeading } from "../../components/adminDashboardComp/AdminDashTbody";
import Loader from '../../components/loader/Loader';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

const AdminMaxListSetting = () => {
      const [loader, setLoader] = useState(false);
      const [data, setData] = useState([]);
      const [change, setChange] = useState(0);
      const [snack, setSnack] = useState(false);
      const [submitDisabled, setSubmitDisabled] = useState(true);
      const [proRemovalSetting, setProRemovalSetting] = useState({
        max_listing: "",
      });
      useEffect(() => {
        axios
          .get(import.meta.env.VITE_BACKEND + "/api/proplan/maxfreelisting")
          .then((res) => {
            setData(res.data);
          });
      }, [change]);


        useEffect(() => {
          if (
            proRemovalSetting.max_listing !== ""
          ) {
            setSubmitDisabled(false);
          } else {
            setSubmitDisabled(true);
          }
        }, [proRemovalSetting]);

        const handleClick = async () => {
          //e.preventDefault();
          try {
            setLoader(true);  
            await axios.put(
              import.meta.env.VITE_BACKEND + "/api/proplan/updateMaxFreeListing",
              proRemovalSetting
            );
            setLoader(false);
            setChange(change + 1);
            proRemovalSetting.max_listing = "";
            //navigate(`/admin/propertyautoremoval`);
            //navigate(`/user/user-profile/${currentUser[0].login_id}`);
          } catch (err) {
            console.log(err);
          }
        };
      
  return (
    <div className="container-fluid">
    {loader && <Loader />}

    <div className="profile-form-upper-section">
      <AdminDashUpperBody
      heading={"Maximum Free Listings in a Month"}
      filterAva={false}
      selectedActionsAva={false}
      searchAva={false}
    />
</div>

<div className="row user-profile-form-comp">
    <div className="col-md-6">

<div className="user-profile-form-wrapper ">
    <div className="form-fields">
    <FormHeading heading={"Maximum Free Listings in a Month"} />
    <div className="ml-2">
        Current Limit - {data.length > 0 && data[0].max_free_listing_val} 
    </div>
    <div className="pro_flex">
              <TextField
                sx={{ m: 1, width: ["100%"] }}
                label="Enter Max Limit"
                variant="outlined"
                size="small"
                inputProps={{ maxlength: 5 }}
                className="w-100"
                value={proRemovalSetting.max_listing}
                helperText={proRemovalSetting.max_listing.length < 1 ? "Required" : ""}
                FormHelperTextProps={{ sx: { color: "red" } }}
                onChange={(e) => {
                  setProRemovalSetting({
                    ...proRemovalSetting,
                    max_listing: e.target.value.replace(/[^0-9]/g, ""),
                  });
                }}
              />
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
    </div>
</div>
    </div>
    </div>
    </div>
  )
}

export default AdminMaxListSetting
