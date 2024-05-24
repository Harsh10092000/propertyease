import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Loader from "../../components/loader/Loader";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Cleartoken from "../../components/Cleartoken";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const { currentUser, clearUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [snackQ, setSnackQ] = useState(false);
  const [snack, setSnack] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [change, setChange] = useState(0);
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    
     axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchPropertyDataByUserId1/${currentUser[0].login_id}`
      )
      .then((res) => {
        console.log("res.data : " , res.data)
        if (res.data === "failed") {
          clearUser();
        } else {

          res.data.forEach((item, i) => {
            item.serial_no = i + 1;
          });
          setData(res.data);
          
        }
      });
  }, [change]);
  useEffect(() => {
    data.forEach((item, i) => {
      item.pro_modified_id = 5000 + parseInt(item.pro_id);
    });
  }, [data, change]);

  //useEffect(() => {
  // data &&
  //   data.forEach((item, i) => {
  //     item.serial_no = i + 1;
  //   });
  // }, [data])

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
        code.pro_locality.toLowerCase().includes(searchValue.toLowerCase()) ||
        code.pro_sub_district
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        code.pro_pincode.startsWith(searchValue) ||
        code.pro_modified_id.toString().startsWith(searchValue) ||
        code.pro_city.toLowerCase().includes(searchValue.toLowerCase()) ||
        code.pro_state.toLowerCase().startsWith(searchValue.toLowerCase())
    );

  // const [records, setRecords] = useState([]);
  // useEffect(() => {
  //   console.log(filteredData)
  //   setRecords(filteredData.slice(firstIndex, lastIndex));
  // }, [filteredData,change]);
  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const [proDate, setProDate] = useState("");
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

  const [proListingStatus, setProListingStatus] = useState({
    pro_listed: "",
    pro_id: "",
  });

  const [open, setOpen] = React.useState(false);
  const [data1 , setData1] = useState();
  const handleClickOpen = (data) => {
    
    setData1(data);
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const delistProperty = async () => {
    setOpen(false);
    setLoader(true);
    proListingStatus.pro_listed = 0;
    proListingStatus.pro_id = data1.pro_id;
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/pro/updateProListingStatus",
      proListingStatus
    );
    setChange(change + 1);
    setLoader(false);
    setSnackQ(true);
    
  };

  const listProperty = async (data) => {
    
    setLoader(true);
    proListingStatus.pro_listed = 1;
    proListingStatus.pro_id = data.pro_id;
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/pro/updateProListingStatus",
      proListingStatus
    );
    setChange(change + 1);
    
    setLoader(false);
    setSnack(true);

  };

 
  // Create a new string in the format "26 March 2024"
  //const formattedDate = `${day} ${month} ${year}`;

  return (
    <div className="container-fluid admin-dashboard admin-icon">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delist this property? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          You can relist the property at any time.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={delistProperty} autoFocus>
            Delist
          </Button>
        </DialogActions>
      </Dialog>
      {loader ? <Loader /> : ""}
      <Snackbar
        ContentProps={{
          sx: {
            background: "red",
            color: "white",
            textAlign: "center",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackQ}
        autoHideDuration={1000}
        onClose={() => setSnackQ(false)}
        message={"Property Delisted"}
      />
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
        message={"Property Listed"}
      />
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">All Property</h1>
      </div>
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
              <MenuItem value={"Delisted Properties"}>
                Delisted Properties
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            className="col-md-5 mt-2"
            size="small"
            label="Search for properties..."
            onChange={(e) => {
              setCurrentPage(1);
              setSearchValue(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-6">
                  <h5>Property List</h5>
                </div>
                <div className="col-md-6 text-right"></div>
              </div>
            </div>
            <div className="card-body table-border-style">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>SNo.</th>
                      <th>Property Id</th>
                      {/* <th>Property Type</th> */}
                      <th>Sale/Rent</th>
                      <th>Price</th>
                      <th>Posted On</th>
                      <th>Property Title</th>
                      <th>Status</th>
                      {/* <th>Address</th> */}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    {records.map((item, index) => (
                      <tr key={index}>
                        <td>{item.serial_no}</td>
                        {/* <td>{5000 + parseInt(item.pro_id)}</td> */}
                        <td>{item.pro_type.split(",")[0]}</td>
                        <td>{item.pro_ad_type}</td>
                        <td>
                          {item.pro_amt
                            ? item.pro_amt + " " + item.pro_amt_unit
                            : "-"}
                        </td>
                        {/* <td>{item.pro_date }</td> */}
                        {<td>{FormatDate(item.pro_date)}</td>}
                        <td>
                          {" "}
                          <span className="text-wrap">
                            {item.pro_area_size +
                              " " +
                              item.pro_area_size_unit +
                              " " +
                              item.pro_type.split(",")[0] +
                              " "}
                            for {item.pro_ad_type === "Rent" ? "Rent" : "Sale"}{" "}
                            in {item.pro_locality}
                            ,&nbsp;
                            {item.pro_city}
                          </span>
                        </td>
                        {/* <td>{item.pro_locality},&nbsp;
                                {item.pro_sub_district
                                  ? item.pro_sub_district + ", "
                                  : ""}
                                {item.pro_city},&nbsp;
                                  {item.pro_state}</td> */}
                        <td>
                          {item.pro_listed === 1 || item.pro_listed === null
                            ? "Listed"
                            : "Delisted"}
                        </td>
                        <td>
                          <button
                            title="Edit Your Property"
                            className="btn btn-primary btn-sm vbtn"
                          >
                            {/* <Link to={"/editProperty/" + item.pro_id}> */}
                            <Link
                            to={`/editProperty/${item.pro_url}`}
                            //   to={`/editProperty/${
                            //     item.pro_area_size.toLowerCase() +
                            //     "-" +
                            //     item.pro_area_size_unit
                            //       .toLowerCase()
                            //       .replaceAll(" ", "-")
                            //       .replaceAll(".", "") +
                            //     "-"
                            //   }${
                            //     item.pro_type
                            //       ? item.pro_type
                            //           .split(",")[0]
                            //           .toLowerCase()
                            //           .replaceAll(" ", "-")
                            //       : ""
                            //   }-for-${
                            //     item.pro_ad_type === "rent" ? "rent" : "sale"
                            //   }-in-${item.pro_locality.replace(/\s+$/, "")
                            //     .toLowerCase()
                            //     .replaceAll(" ", "-")}-${item.pro_city
                            //     .toLowerCase()
                            //     .replaceAll(" ", "-")}-${item.pro_id}`}
                             >
                              <a
                                target="_blank"
                                className="btn btn-primary btn-sm "
                              >
                                <IconEdit className="admin-faicon" />
                              </a>
                            </Link>
                          </button>
                          <Link
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
                            <button
                              title="View Your Property"
                              className="btn btn-primary btn-sm vbtn"
                            >
                              <a className="btn btn-primary btn-sm ">
                                <IconEye className="admin-faicon" />
                              </a>
                            </button>
                          </Link>

                          {item.pro_listed === 1 || item.pro_listed === null ? (
                            <button
                              title="Click to Dislist your property"
                              className="btn btn-danger btn-sm vbtn"
                              // onClick={() => delistProperty(item)}
                              onClick={() => handleClickOpen(item)}
                            >
                              Delist
                            </button>
                          ) : (
                            <button
                              title="Click to List your property"
                              className="btn btn-success btn-sm vbtn"
                              onClick={() => listProperty(item)}
                            >
                              List
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
