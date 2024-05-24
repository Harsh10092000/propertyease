import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
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
import moment from "moment";

const UserSubscriptionPlans = () => {
  const { currentUser, clearUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [snackQ, setSnackQ] = useState(false);
  const [snack, setSnack] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [change, setChange] = useState(0);
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/proplan/fetchProPlanDataBId/${currentUser[0].login_id}`
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
  }, []);

  useEffect(() => {
    data.forEach((item, i) => {
      item.tran_modified_id = 5000 + parseInt(item.tran_id);
    });
  }, [data, change]);

  console.log("filter : " , filter)

  const filteredData = data
    .filter((code) => {
      if (filter === "Active") {
        return (parseInt(code.plan_status) === 1 || parseInt(code.plan_status) === 2);
      } else if (filter === "Expired") {
        return parseInt(code.plan_status) === 0;
      } else if (filter === "All") {
        return true;
      }
    })
    .filter(
      (code) =>
        code.tran_amt.toLowerCase().includes(searchValue.toLowerCase()) ||
        code.tran_modified_id.toString().startsWith(searchValue) 
    );

  
  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  return (
  <div>
<div className="container-fluid admin-dashboard admin-icon">
      {/* <Dialog
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
      </Dialog> */}
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
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Expired"}>
              Expired
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
                  <h5>All Transactions</h5>
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
                      <th>Transaction Id</th>
                      <th>Plan Name</th>
                      <th>Transaction Date</th>
                      <th>Transaction Amount</th>
                      <th>Plan Started On</th>
                      <th>Plan Expired On</th>
                      
                      <th>Subscription Plan Status</th>
                      <th>Payment Id</th>
                      <th>Order Id</th>
                      <th>Payment Status</th>
                      
                      {/* <th>Address</th> */}
                      {/* <th>Actions</th> */}
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    {records.map((item, index) => (
                      <tr key={index}>
                        <td>{item.serial_no}</td>
                        <td>{9000 + parseInt(item.tran_id)}</td>
                        <td>{item.plan_name}</td>
                        <td>{moment(item.tran_date).format("MMMM DD YYYY")}</td>
                        <td>{item.tran_amt }</td>
                        {item.payment_status !== "Failed" ?
                        <>
                        <td>{moment(item.list_plan_starts_on).format("MMMM DD YYYY")}</td>
                        <td>{(parseInt(item.plan_status) === 1 || parseInt(item.plan_status) === 0) ? moment(item.list_plan_starts_on).add(parseInt(item.list_plan_valid_for_days), "days").format("MMMM DD YYYY") : "-"}</td>
                        <td>{parseInt(item.plan_status) === 1 ? "Active" : parseInt(item.plan_status) === 2 ? "Access Granted By Admin" : parseInt(item.plan_status) === 0 ? "Expired" : "Access Removed By Admin"}</td>
                        </>
                        : <>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        </>
                        }
                        <td>{item.payment_id }</td>
                        <td>{item.order_id }</td>
                        <td>{item.payment_status }</td>
                        
                        {/* <td>{item.pro_date }</td> */}
                      
                        
                        {/* <td>{item.pro_locality},&nbsp;
                                {item.pro_sub_district
                                  ? item.pro_sub_district + ", "
                                  : ""}
                                {item.pro_city},&nbsp;
                                  {item.pro_state}</td> */}
                        {/* <td>
                          {item.pro_listed === 1 || item.pro_listed === null
                            ? "Listed"
                            : "Delisted"}
                        </td> */}
                       
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
  </div>
  );
};

export default UserSubscriptionPlans;
