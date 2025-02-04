import React, { useState, useContext } from "react";
import {
  Checkbox,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Skeleton,
  DialogContentText,
} from "@mui/material";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { AuthContext } from "../../context/AuthContext";

const RenewProperty = ({ openRenewPopup, handleOpenRenewPopup, item, handleChange, change }) => {
    const { currentUser } = useContext(AuthContext);
  const [snack, setSnack] = useState(false);
  const [loader, setLoader] = useState(false);
  //const [change, setChange] = useState(1);
  const [proRenewStatus, setProSaleStatus] = useState({
    pro_renew_date: "",
    pro_id: "",
  });
  const handleClose = () => {
    handleOpenRenewPopup(false);
  };
  //console.log("item 1 : " , item);
  const extendPropertyRenewDate = async (item) => {
    //console.log("item 2 : " , item);
    setLoader(true);
    proRenewStatus.pro_renew_date = item.pro_renew_date;
    proRenewStatus.pro_id = item.pro_id;
    proRenewStatus.pro_url = item.pro_url;
    proRenewStatus.login_email = currentUser[0].login_email;
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/pro/extendPropertyRenewDate",
      proRenewStatus
    );
    //setChange(change + 1);
    handleChange(change + 1);
    setLoader(false);
    setSnack(true);
  };
  return (
    <div>
      {loader && <Loader />}
      <Dialog
        open={openRenewPopup}
        onClose={handleClose}
        //onClose={handleCloseDel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Renew Property? "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will be able to relist it and continue <br />showcasing your property.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            className="btn-success"
            onClick={() => extendPropertyRenewDate(item)}
            autoFocus
          >
            Renew Now
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
            textAlign: "center",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack}
        autoHideDuration={1000}
        onClose={() => setSnack(false)}
        message={"Property Successfully Renewed!"}
      />
    </div>
  );
};

export default RenewProperty;
