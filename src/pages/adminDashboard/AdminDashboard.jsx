import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconEye, IconTrashFilled } from "@tabler/icons-react";
import { Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { TextField, FormControl, Select, InputLabel, MenuItem   } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [change, setChange] = useState(0);
  const [snack, setSnack] = useState(false);
  //const records = data.slice(firstIndex, lastIndex);
  //const nPages = Math.ceil(data.length / recordsPerPage);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/admin/fetchAll")
      .then((res) => {
        setData(res.data);
      });
  }, [change]);

  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });
  useEffect(() => {
    data.forEach((item, i) => {
      item.pro_modified_id = 5000 + parseInt(item.pro_id);
    });
  } , [data])

  const FormatDate = (dateString) => {
    if (dateString.includes("-")) {
      () => setProDate(dateString);
      const date = new Date(dateString);

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const formattedDate = date.toLocaleDateString("en-US", options);

      return formattedDate;
    } else {
      const date = new Date(parseInt(dateString));
      date.setUTCHours(date.getUTCHours() + 5);
      date.setUTCMinutes(date.getUTCMinutes() + 30);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      // const hours = String(date.getUTCHours()).padStart(2, "0");
      // const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      // const seconds = String(date.getUTCSeconds()).padStart(2, "0");
      // const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const formattedTimestamp = `${year}-${month}-${day} `;
      const date2 = new Date(formattedTimestamp);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = date2.toLocaleDateString("en-US", options);
      return formattedDate;
    }
  };

  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All");
  const filteredData = data
  .filter((code) => {
    if (filter === "Listed Properties") {
      return code.pro_listed === 1 || code.pro_listed === null;
    } else if (filter === "Delisted Properties") {
      return code.pro_listed == 0;
    } else if (filter === "All") {
      return true;
    }
  })
  .filter(
    (code) =>
      code.pro_locality.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      code.pro_sub_district.toLowerCase().includes(searchValue.toLowerCase()) ||
      code.pro_pincode.startsWith(searchValue) ||
      code.pro_modified_id.toString().startsWith(searchValue) ||
      code.pro_city.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      code.pro_state.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState("");
  const handleClickOpen = (data) => {    
    setDelId(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteProperty = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/admin/deletePro/${delId}`
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
          {"Delete this property? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          You will not be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className="btn-danger" onClick={deleteProperty} autoFocus>
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
      <div className="card-body table-border-style">
        <h1>All Properties</h1>
        <div className="row justify-content-between align-items-center my-2">
          <Pagination
            count={nPages}
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
            className="col-md-6"
          />
          <div className="col-md-6 d-flex justify-content-end">
          <FormControl
          sx={{ m: 1, width: ["100%"] }}
          size="small"
          className="col-md-3 "
        >
          <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Filter By"
            onChange={(e) => {
              setFilter(e.target.value), setCurrentPage(1);
            }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Listed Properties"}>Listed Properties</MenuItem>
            <MenuItem value={"Delisted Properties"}>Delisted Properties</MenuItem>
          </Select>
        </FormControl>
        <TextField
            variant="outlined"
            className="col-md-5 mt-2"
            size="small"
            label="Search for properties..."
            value={searchValue}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchValue(e.target.value);
            }}
          />
          </div>

          
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Property Id</th>
                <th>Sale/Resale</th>
                <th>Owner/Agent</th>
                <th>Property Type</th>
                <th>Posted On</th>
                <th>Status</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  <td>{item.serial_no}</td>
                  <td>{5000 + parseInt(item.pro_id)}</td>
                  <td>{item.pro_ad_type}</td>
                  <td>{item.pro_user_type}</td>
                  <td>{item.pro_type}</td>
                  {<td>{FormatDate(item.pro_date)}</td>}
                  <td>{item.pro_listed === 1 || item.pro_listed === null ? "Listed" : "Delisted"}</td>
                  <td>{item.login_email}</td>
                  <td>+91{item.login_number}</td>
                  <td>{item.pro_locality},&nbsp;
                                {item.pro_sub_district
                                  ? item.pro_sub_district + ", "
                                  : ""}
                                {item.pro_city},&nbsp;
                                  {item.pro_state}</td>
                  <td className="d-flex gap-3">
                    {/* <Link
                      // to={`/property/${item.pro_type
                      //   .split(",")[0]
                      //   .replace(" ", "-")}-${item.pro_ad_type.replace(
                      //   " ",
                      //   "-"
                      // )}_${item.pro_id}`}
                      to={`/${item.pro_id}`}
                    >
                      <button className="view" title="View">
                        <IconEye />
                      </button>
                    </Link> */}
                    <Link
                    target="_blank"
                    to={`/${item.pro_url}`}
                        // to={`/${
                        //   item.pro_area_size.toLowerCase() +
                        //   "-" +
                        //   item.pro_area_size_unit
                        //     .toLowerCase()
                        //     .replaceAll(" ", "-")
                        //     .replaceAll(".", "") +
                        //   "-"
                        // }${
                        //   item.pro_type
                        //     ? item.pro_type
                        //         .split(",")[0]
                        //         .toLowerCase()
                        //         .replaceAll(" ", "-")
                        //     : ""
                        // }-for-${
                        //   item.pro_ad_type === "rent" ? "rent" : "sale"
                        // }-in-${item.pro_locality.replace(/\s+$/, "")
                        //   .toLowerCase()
                        //   .replaceAll(" ", "-")}-${item.pro_city
                        //   .toLowerCase()
                        //   .replaceAll(" ", "-")}-${item.pro_id}`}
                      >
                        <button className="view" title="View">
                          <IconEye />
                        </button>
                      </Link>
                    <button
                      className="del"
                      title="Delete"
                      onClick={() => handleClickOpen(item.pro_id)}
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
  );
};

export default AdminDashboard;
