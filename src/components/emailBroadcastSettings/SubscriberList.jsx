import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Snackbar } from "@mui/material";
import { IconTrashFilled } from "@tabler/icons-react";
const SubscriberList = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [change, setChange] = useState(1);
  const [loader, setLoader] = useState(false);
  const [snack, setSnack] = useState(false);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/setting/fetchSubscriberList")
      .then((res) => {
        setData(res.data);
      });
  }, [change]);

  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });

  const [searchValue, setSearchValue] = useState("");

//   const filteredData = data.filter(
//     (code) =>
//       code.login_email.toLowerCase().startsWith(searchValue.toLowerCase()) ||
//       code.login_number.startsWith(searchValue) ||
//       code.login_id.toString().startsWith(searchValue)
//   );

  const records = data.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(data.length / recordsPerPage);

  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState("");
  const handleClickOpen = (data) => {    
    setDelId(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteSub = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/maildigest/deleteSub/${delId}`
      );
      setSearchValue("")
      setChange(change + 1);
      setSnack(true);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this Subscriber? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          You will not be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="btn-danger" onClick={deleteSub} autoFocus>
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
        open={snack}
        autoHideDuration={1000}
        onClose={() => setSnack(false)}
        message={"Deleted Successfully"}
      />
      {loader ? <Loader /> : ""}
      <div className="card-body table-border-style">
        
        <div className="row justify-content-between align-items-center my-2">
          <Pagination
            count={nPages}
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
            className="col-md-6"
          />
          <TextField
            variant="outlined"
            className="col-md-3 mx-4 mx-md-0 mt-3"
            size="small"
            label="Search for properties..."
            value={searchValue}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchValue(e.target.value);
            }}
          />
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="text-center">
              <tr>
                <th>Sno.</th>
                <th>Subscriber Id</th>
                <th>Subscriber Name</th>
                <th>Subscriber Email</th>
                <th>Subscriber Phone</th>
                <th>
                Subscriber City
                </th>
                <th>Actions</th>
              </tr>
            </thead>

        
            <tbody className="text-center">
              {records.map((item, index) => (
                <tr key={index}>
                   <td>{item.serial_no}</td> 

                  <td>{item.sub_id}</td>
                  <td>{item.sub_name}</td>
                  <td>{item.sub_email !== null ? item.sub_email : "-"}</td>

                  <td>+91{item.sub_phone}</td>
                  <td>{item.sub_city !== null ? item.sub_city : "-"}</td>
                  <td>
                  <button
                      className="del"
                      title="Delete"
                      onClick={() => handleClickOpen(item.sub_id)}
                    >
                      <IconTrashFilled />
                    </button>
                    </td>

                  
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SubscriberList
