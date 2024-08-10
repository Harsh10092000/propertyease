

import "./table.css";

import React, { useContext, useEffect, useState } from "react";
import axios, { all } from "axios";
import { AuthContext } from "../../context/AuthContext";
import { IconEdit, IconEye, IconMenuDeep } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Snackbar } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Loader from "../loader/Loader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Cleartoken from "../Cleartoken";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEye,
  faPencilAlt,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import DashboardNavbar from "../dashboardNavbar/DashboardNavbar";



const UserdashboardTable = ({data}) => {

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const { currentUser, clearUser } = useContext(AuthContext);
//   const [data, setData] = useState([]);
  const [snackQ, setSnackQ] = useState(false);
  const [snack, setSnack] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [change, setChange] = useState(0);
  const [filter, setFilter] = useState("All");
  const [selectedAction, setSelectedAction] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [listingids, setListingids] = useState([]);

  
  const [allSelected, setAllSelected ] = useState(false);


  console.log(currentUser);

  //const allSelected = data.every(item => listingids.includes(item.pro_id));

//   useEffect(() => {
//     axios
//       .get(
//         import.meta.env.VITE_BACKEND +
//           `/api/pro/fetchPropertyDataByUserId1/${currentUser[0].login_id}`
//       )
//       .then((res) => {
//         console.log("res.data : ", res.data);
//         if (res.data === "failed") {
//           clearUser();
//         } else {
//           res.data.forEach((item, i) => {
//             item.serial_no = i + 1;
//           });
//           setData(res.data);
//           setDataLoaded(true);
//         }
//       });
//   }, [change]);
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
  const [data1, setData1] = useState();
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

  const listMultipleProperty = async (list_status) => {
    setLoader(true);
    // proListingStatus.pro_listed = 1;
    // proListingStatus.pro_id = listingids;
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/pro/updateProListingMultipleStatus",
     { pro_listed: list_status, listingids: listingids }
    );
    setChange(change + 1);

    setLoader(false);
    setSnack(true);
  };


  const handleCheckboxChange = (itemProId) => {
    setListingids(prevState => {
      if (prevState.includes(itemProId)) {
        // If the ID is already in the array, remove it
        // setAllSelected(false);
        return prevState.filter(id => id !== itemProId);
      } else {
        // Otherwise, add the ID to the array
        // if(listingids.length === data.length) { 
        //   setAllSelected(true);
        // }
        return [...prevState, itemProId];
      }
    });
  };



  useEffect(() => {
    console.log(listingids.length, records.length)
    if(listingids.length === records.length) { 
      
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [listingids, records])


  const handleAllTypes = () => {
    console.log()
    if(listingids.length === records.length) {
      setListingids([]);
      //setAllSelected(false);
    } else {
      setListingids((prevListingIds) => {
        //setAllSelected(true);
        const updatedTypes = records
          .map((item) => item.pro_id)
          .filter((pro_id) => !prevListingIds.includes(pro_id));
        return [...prevListingIds, ...updatedTypes];
      });
    }
    
  };

  // Create a new string in the format "26 March 2024"
  //const formattedDate = `${day} ${month} ${year}`;

  return (
         <div class="wg-box">
        <div className="card-body table-border-style table-text-infor">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="head">
                <tr className="">
                  <th>
                    <Checkbox size="small" onClick={handleAllTypes} checked={allSelected} />
                  </th>

                  <th className="table-head">SNo.</th>
                  <th className="table-head">Property Id</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Property Type</th>
                  <th className="table-head">Sale/Rent</th>
                  <th className="table-head">Price</th>
                  <th className="table-head">Posted On</th>
                  <th className="table-head">Property Title</th>
                  
                  {/* <th>Address</th> */}
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {records.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox size="small" checked={listingids.includes(item.pro_id)} 
                      onClick={() => handleCheckboxChange(item.pro_id)} />
                    </td>
                    <td>{item.serial_no}</td>
                    <td>{5000 + parseInt(item.pro_id)}</td>
                    <td>
                      {item.pro_listed === 1 || item.pro_listed === null ? (
                        <span className="current-status-green" >Listed</span>
                      ) : (
                        <span className="current-status-red">Delisted</span>
                      )}
                    </td>
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
                        for {item.pro_ad_type === "Rent" ? "Rent" : "Sale"} in{" "}
                        {item.pro_locality}
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

<div>

                      {/* <Link to={"/editProperty/" + item.pro_id}> */}
                      <Link to={`/editProperty/${item.pro_url}`} className="dash-edit-btn mr-2">
                        {/* <a
                                target="_blank"
                                className="btn btn-primary btn-sm "
                              >
                                <IconEdit className="admin-faicon" />
                              </a> */}
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="font-awe-icon-edit"
                          title="Edit property"
                        />
                      </Link>

                      {/* <button
                          title="Click to Dislist your property"
                          className="btn btn-light btn-sm vbtn mx-auto"
                          // onClick={() => delistProperty(item)}
                          onClick={() => handleClickOpen(item)}
                        >
                          <FontAwesomeIcon
                          icon={faEye}
                          className="font-awe-icon-delete"
                          title="View property"
                        />
                        </button>
                         */}
                      <Link target="_blank" to={`/${item.pro_url}`} className="dash-edit-btn">
                        {/* <button
                              title="View Your Property"
                              className="btn btn-primary btn-sm vbtn"
                            >
                              <a className="btn btn-primary btn-sm ">
                                <IconEye className="admin-faicon" />
                              </a>
                            </button> */}
                        <FontAwesomeIcon
                          icon={faEye}
                          className="font-awe-icon-delete "
                          title="View property"
                        />
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
                          List Again
                        </button>
                      )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {dataLoaded === true && records.length === 0 && (
              <div className="d-flex align-items-center justify-content-center">
                <div className="no-record-msg pt-2 pb-2">No Records Found</div>
              </div>
            )}
          </div>

          {/* <ul class="wg-pagination justify-center">
        <li><a href="/#"><i class="icon-keyboard_arrow_left"></i></a></li>
        <li><a href="/#">1</a></li>
        <li class="active"><a href="/#">2</a></li>
        <li><a href="/#">3</a></li>
        <li><a href="/#">4</a></li>
        <li><a href="/#">...</a></li>
        <li><a href="/#">20</a></li>
        <li><a href="/#"><i class="icon-keyboard_arrow_right"></i></a></li>
    </ul> */}
    {records.length > 0 &&
          <Pagination
            count={nPages}
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
            // className="col-md-6"
          /> }
        </div>
      </div>
  )
}

export default UserdashboardTable
