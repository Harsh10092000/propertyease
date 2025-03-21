import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { IconEye, IconTrashFilled, IconEdit } from "@tabler/icons-react";
import { Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Loader from "../../components/loader/Loader";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import moment from 'moment';
import { AdminDashUpperBody } from '../../components/adminDashboardComp/AdminDashTbody';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ViewCoupons = () => {
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
      .get(import.meta.env.VITE_BACKEND + "/api/admin/fetchCouponData")
      .then((res) => {
        setData(res.data);
      });
  }, [change]);

  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });
  useEffect(() => {
    data.forEach((item, i) => {
      item.coupon_modified_id = 16650 + parseInt(item.coupon_id);
    });
  }, [data]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All");
  const filteredData = data

    .filter(
      (code) =>
        code.coupon_name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        //code.ad_type.toLowerCase().includes(searchValue.toLowerCase()) ||
        code.coupon_modified_id.toString().startsWith(searchValue)
    );

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const deleteCoupon = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/admin/deleteCoupon/${id}`
      );
      setSearchValue("");
      setChange(change + 1);
      setSnack(true);
    } catch (err) {
      console.log(err);
    }
  };

  const [couponListingStatus, setCouponListingStatus] = useState({
    coupon_status: "",
    coupon_id: "",
  });

  const activateCoupon = async (id) => {
    //setOpen(false);
    setLoader(true);
    couponListingStatus.coupon_status = 0;
    couponListingStatus.coupon_id = id;
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/admin/updateCouponStatus",
      couponListingStatus
    );
    setChange(change + 1);
    setLoader(false);
    //setSnackQ(true);
  };

  const disableCoupon = async (id) => {
    //setOpen(false);
    setLoader(true);
    couponListingStatus.coupon_status = 1;
    couponListingStatus.coupon_id = id;
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/admin/updateCouponStatus",
      couponListingStatus
    );
    setChange(change + 1);
    setLoader(false);
    //setSnackQ(true);
  };

  return (
    <div className="container-fluid admin-dashboard admin-icon">
    {loader ? <Loader /> : ""}
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

    <AdminDashUpperBody
            data={data}
            //handleCurreentPage={handleCurreentPage}
            //filter={filter}
            //listingids={listingids}
            //handleFilterChange={handleFilterChange}
            //handleFilterChangeprop={handleFilterChangeprop}
            //handleSearchValue={handleSearchValue}
            //handleSelectedAction={handleSelectedAction}
            //filterChange={filterChange}
            //selectedAction={selectedAction}
            //listMultipleProperty={listMultipleProperty}
            heading={"All Coupons"}
            //filterOptions={filterOptions}
            //selectedActions={selectedActions}
            filterAva={false}
            selectedActionsAva={false}
            searchAva={false}
          />

    {/* <div className="card-body table-border-style"> */}
      {/* <h1>All Property Listing Plans</h1>
      <div className="row justify-content-between align-items-center my-2">
        <Pagination
          count={nPages}
          color="primary"
          onChange={(e, value) => setCurrentPage(value)}
          className="col-md-6"
        />
        <div className="col-md-6 d-flex justify-content-end">
         
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
      </div> */}

<div class="wg-box">
    <div className="card-body table-border-style table-text-infor">
      <div className="table-responsive">
        <table className="table table-hover">

    
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Coupon Id</th>
              <th>Coupon Code</th>
              <th>Coupon Name</th>
              <th>Coupon Amount</th>
              <th>Coupon Valid From</th>
              <th>Coupon Valid Till</th>
              <th>Coupon Status</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => (
              <tr key={index}>
                
                <td>{item.serial_no}</td>
                <td>{16650 + parseInt(item.coupon_id)}</td>
                <td>{item.coupon_code}</td>
                <td>{item.coupon_name}</td>
                <td>{item.coupon_amt}</td>
                
                {/* <td>{item.coupon_status === 1 ? "Listed" : "Delisted"}</td> */}

                <td>{moment(item.coupon_valid_from).format("MMMM DD YYYY")}</td>
                <td>{moment(item.coupon_valid_till).format("MMMM DD YYYY")}</td>
                <td>{parseInt(item.coupon_status) === 1 ? "Active" : "-"}</td>
                {/* <td>{moment(item.pro_plan_date).add(parseInt(item.pro_plan_validity), "days").format("MMMM DD YYYY")}</td>
                <td>Plan End {moment(moment(item.pro_plan_date).add(parseInt(item.pro_plan_validity) + 1, "days").format("MMMM DD YYYY")).fromNow()}</td> */}
                {/* <td>{moment(item.pro_plan_date).subtract(item.pro_plan_validity, 'days').fromNow()}</td>  */}
                {/* <td>{moment(item.pro_plan_date).fromNow()}</td> */}
                <td className="d-flex gap-3">
                  
                  { parseInt(item.coupon_status) === 1 ? (
                 
                    <button
                      title="Click to Disable Coupon"
                      className="btn btn-danger btn-sm vbtn mb-0"
                      // onClick={() => delistProperty(item)}
                      onClick={() => activateCoupon(item.coupon_id)}
                      disabled={item.status === "0" ? true : false}
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      title="Click to Enable Coupon"
                      className="btn btn-success btn-sm vbtn mb-0 ml-0"
                      onClick={() => disableCoupon(item.coupon_id)}
                      disabled={item.status === "0" ? true : false}
                    >
                    Enable
                    </button>
                  )}

                  
                  <Link title="Edit Your Coupon"  to={"/admin/editproplancoupon/" + item.coupon_id} className="dash-edit-btn font-awe-icon-edit">
                   
                      {/* <Link to={"/edit/" + item.pro_id}> */}

                    <FontAwesomeIcon
                              icon={faPencilAlt}
                              className="font-awe-icon-edit"
                              title="Edit property"
                            />
                    
                  </Link>
                  
                  <button
                    className="del shortlist-delete-btn"
                    title="Delete"
                    onClick={() => deleteCoupon(item.coupon_id)}
                  >
                    <FontAwesomeIcon
                             icon={faTrashCan}
                             className="font-awe-icon-delete "
                             delisttitle="Delete Property"
                           />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  // </div>
  )
}

export default ViewCoupons
