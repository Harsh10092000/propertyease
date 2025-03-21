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
import AdminDashTable from "../../components/adminDashboardComp/AdminDashTable";
import { AdminDashUpperBody } from "../../components/adminDashboardComp/AdminDashTbody";

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


    const theadArray = [
      // {
      //   value: (
      //     <Checkbox size="small" onClick={handleAllTypes} checked={allSelected} />
      //   ),
      // },
      { value: "Sno." },
      { value: "Transaction Id" },
      { value: "User Id" },
      { value: "Plan Name" },
      { value: "Transaction Date" },

      { value: "Plan Amount" },
      { value: "Discount" },
      { value: "Transaction Amount" },
      { value: "Plan Started On" },

      { value: "Plan Expired On" },
      { value: "Subscription Plan Status" },
      { value: "Payment Id" },
      { value: "Order Id" },
      { value: "Payment Status" },
      
    ];
  




    
    
  


    const tbodyArray = [
      
      { value: "serial_no" },
    
      { value: "tran_id", transform: (val) => val ? 9000 + val : "-"},
      { value: "user_id"},
      { value: "plan_name"},
      {
      value: "tran_date",
      transform: (date) => moment(date).format("MMMM DD YYYY"),
    },
 { value: "original_price", transform: (val) => {return parseInt(val) !== 0 && val !== null ? val : "-" }, },
 {
        value: "payment_discount",
        transform: (val) => {return parseInt(val) === 0 ?  "-" : val+"%" },
      },


      { value: "tran_amt"},
     
      {
        type: "conditional",
        condition: "payment_status",
        trueConditions: [
          {
            value: "list_plan_starts_on",
            transform: (item) => {
              return moment(item.list_plan_starts_on).format("MMMM DD YYYY");
            },
          },
          {
            value: "plan_end_date",
            transform: (item) => {
              const startDate = moment(item.list_plan_starts_on);
              const endDate = startDate.add(
                parseInt(item.list_plan_valid_for_days),
                "days"
              );
              return parseInt(item.plan_status) === 1 ||
                parseInt(item.plan_status) === 0
                ? endDate.format("MMMM DD YYYY")
                : "-";
            },
          },
          // {
          //   value: "plan_status",
          //   transform: (status) => {
          //     const statusMap =
          //     {
          //       1: "Active",
          //       2: "Access Granted By Admin",
          //       0: "Expired",
  
          //     };
          //     // const statusMap = {
          //     //   1: { text: "Active", className: "current-status-green" },
          //     //   2: { text: "Access Granted By Admin22", className: "current-status-green" },
          //     //   0: { text: "Expired", className: "current-status-red" },
          //     // };
          //     return statusMap[parseInt(status.plan_status)] ||"Access Removed By Admin"
          //   }
          // }
        ],
        falseConditions: [
          { value: "-", transform: () => "-" },
          { value: "-", transform: () => "-" },
          // { value: "-", transform: () => "-" }
        ],
      },

     
      {
        type: "plan_status_cond",
        statusMap: [
          { value: 1, text: "Active", className: "current-status-green" },
          {
            value: 2,
            text: "Access Granted By Admin",
            className: "current-status-green",
          },
          { value: 0, text: "Expired", className: "current-status-red" },
          {
            value: 3,
            text: "Access Removed By Admin",
            className: "current-status-red",
          },
        ],
      },

      { value: "payment_id"},
      { value: "order_id"},
      { value: "payment_status"},

    ];
   
    const handleCurreentPage = (value) => {
      setCurrentPage(value);
    };
    
    const handleSearchValue = (value) => {
      setSearchValue(value);
    };
    
  return (
    
     
      
     <div className="container-fluid admin-dashboard admin-icon">



      <AdminDashUpperBody
        data={data}
       
       // filter={filter}
        //listingids={listingids}
       // handleFilterChange={handleFilterChange}
        //handleFilterChangeprop={handleFilterChangeprop}
        handleSearchValue={handleSearchValue}
        //handleSelectedAction={handleSelectedAction}
        //filterChange={filterChange}
        //selectedAction={selectedAction}
        //listMultipleProperty={listMultipleProperty}
        heading={"All Tranactions"}
        //filterOptions={filterOptions}
        //selectedActions={selectedActions}
        filterAva={false}
        selectedActionsAva={false}
        searchAva={false}
      />


<AdminDashTable
        theadArray={theadArray}
        //handleAllTypes={handleAllTypes}
        //allSelected={allSelected}
        tbodyArray={tbodyArray}
        compData={records}
        //FormatDate={FormatDate}
        //handleCheckboxChange={handleCheckboxChange}
        //listingids={listingids}
        //handleClickOpen={handleClickOpen}
        //listProperty={listProperty}
        context="dashboard1"
        //dataLoaded={dataLoaded}
        nPages={nPages}
        handleCurreentPage={handleCurreentPage}
        pagination={true}
      />


        {/* <h1>All Property Listing Plans</h1>
        <div className="row justify-content-between align-items-center my-2">
          <Pagination
            count={nPages}
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
            className="col-md-6"
          />
          <div className="col-md-6 d-flex justify-content-end">
            /* <FormControl
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
            </FormControl> *
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
        </div> */}
     
    </div>
  )
}

export default AdminProPlanTran
