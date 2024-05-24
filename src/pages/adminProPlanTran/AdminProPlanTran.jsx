import { useEffect, useState } from "react";
import axios from "axios";
import { IconEye, IconTrashFilled, IconEdit } from "@tabler/icons-react";
import { Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import moment from "moment";

const AdminProPlanTran = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const [data, setData] = useState([]);
    const [change, setChange] = useState(0);
    const [snack, setSnack] = useState(false);
    const [loader, setLoader] = useState(false);
    //const records = data.slice(firstIndex, lastIndex);
    //const nPages = Math.ceil(data.length / recordsPerPage);
    useEffect(() => {
      axios
        .get(import.meta.env.VITE_BACKEND + "/api/proplan/fetchProPlanTran")
        .then((res) => {
          setData(res.data);
        });
    }, []);
  
    data.forEach((item, i) => {
      item.serial_no = i + 1;
    });
    useEffect(() => {
      data.forEach((item, i) => {
        item.tran_modified_id = 9000 + parseInt(item.tran_id);
      });
    }, [data]);
    const [searchValue, setSearchValue] = useState("");
    const [filter, setFilter] = useState("All");
    const filteredData = data
      
      .filter(
        (code) =>
          code.plan_name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
          //code.ad_type.toLowerCase().includes(searchValue.toLowerCase()) ||
          code.tran_modified_id.toString().startsWith(searchValue) ||
          code.payment_id.toString().startsWith(searchValue) ||
          code.order_id.toString().startsWith(searchValue)
      );
      
      
    const records = filteredData.slice(firstIndex, lastIndex);
    const nPages = Math.ceil(filteredData.length / recordsPerPage);
  
    const deletePlan = async (id) => {
      try {
        await axios.delete(
          import.meta.env.VITE_BACKEND + `/api/proplan/deleteProPlan/${id}`
        );
        setSearchValue("");
        setChange(change + 1);
        setSnack(true);
      } catch (err) {
        console.log(err);
      }
    };
  
    const [planListingStatus, setPlanListingStatus] = useState({
      pro_plan_listed: "",
      pro_plan_id: "",
    });
  
    const hidePlan = async (id) => {
      //setOpen(false);
      setLoader(true);
      planListingStatus.pro_plan_listed = 0;
      planListingStatus.pro_plan_id = id;
      await axios.put(
        import.meta.env.VITE_BACKEND + "/api/proplan/updateProPlanStatus",
        planListingStatus
      );
      setChange(change + 1);
      setLoader(false);
      //setSnackQ(true);
    };
  
    const showPlan = async (id) => {
      //setOpen(false);
      setLoader(true);
      planListingStatus.pro_plan_listed = 1;
      planListingStatus.pro_plan_id = id;
      await axios.put(
        import.meta.env.VITE_BACKEND + "/api/proplan/updateProPlanStatus",
        planListingStatus
      );
      setChange(change + 1);
      setLoader(false);
      //setSnackQ(true);
    };
    
  return (
    <div>
     
      
      <div className="card-body table-border-style">
        <h1>All Property Listing Plans</h1>
        <div className="row justify-content-between align-items-center my-2">
          <Pagination
            count={nPages}
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
            className="col-md-6"
          />
          <div className="col-md-6 d-flex justify-content-end">
            {/* <FormControl
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
                <MenuItem value={"all_properties_ad_1"}>
                  Property Page Ad 1
                </MenuItem>
                <MenuItem value={"all_properties_ad_2"}>
                  All Properties Ad 2
                </MenuItem>
                <MenuItem value={"property_page_ad_1"}>
                  Property Page Ad 1
                </MenuItem>
                <MenuItem value={"property_page_ad_2"}>
                  Property Page Ad 2
                </MenuItem>
              </Select>
            </FormControl> */}
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
              <th>SNo.</th>
                      <th>Transaction Id</th>
                      <th>User Id</th>
                      <th>Plan Name</th>
                      <th>Transaction Date</th>
                      <th>Plan Amount</th>
                      <th>Discount</th>
                      <th>Transaction Amount</th>
                      <th>Plan Started On</th>
                      <th>Plan Expired On</th>
                      
                      <th>Subscription Plan Status</th>
                      <th>Payment Id</th>
                      <th>Order Id</th>
                      <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  <td>{item.serial_no}</td>
                        <td>{9000 + parseInt(item.tran_id)}</td>
                        <td>{item.user_id}</td>
                        <td>{item.plan_name}</td>
                        <td>{moment(item.tran_date).format("MMMM DD YYYY")}</td>
                        
                        <td>{item.original_price }</td>
                        <td>{parseInt(item.payment_discount) !== 0 ? item.payment_discount+"%" : "-" }</td>
                        
                        <td>{item.tran_amt }</td>
                        {item.payment_status !== "Failed" ?
                        <>
                        <td>{moment(item.list_plan_starts_on).format("MMMM DD YYYY")}</td>

                        <td>{(parseInt(item.plan_status) === 1 || parseInt(item.plan_status) === 0) ? moment(item.list_plan_starts_on).add(parseInt(item.list_plan_valid_for_days), "days").format("MMMM DD YYYY") : "-"}</td>
                       
                        <td>{parseInt(item.plan_status) === 1 ? "Active" : parseInt(item.plan_status) === 2 ? "Access Granted By Admin" : parseInt(item.plan_status) === 3 ? "Access Removed By Admin" : "Expired"}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminProPlanTran
