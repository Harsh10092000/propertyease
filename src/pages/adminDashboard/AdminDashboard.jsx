import React, { useEffect, useState } from "react";
import axios from "axios";

import { Snackbar } from "@mui/material";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import "./admindashboard.css";
import { Checkbox } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Loader from "../../components/loader/Loader";
import {
  faEye,
  faPencilAlt,
  faTrashCan,

} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import AdminDashTable from "../../components/adminDashboardComp/AdminDashTable";
import { AdminDashUpperBody } from "../../components/adminDashboardComp/AdminDashTbody";
import { IconEdit, IconEye, IconHomeOff, IconTrash } from "@tabler/icons-react";
import { IconHome } from "@tabler/icons-react";
import { IconCheckbox } from "@tabler/icons-react";

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [change, setChange] = useState(0);
  const [snackQ, setSnackQ] = useState(false);
  const [snack, setSnack] = useState(false);
  const [snackDel, setSnackDel] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [listingids, setListingids] = useState([]);
  const [loader, setLoader] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  //const records = data.slice(firstIndex, lastIndex);
  //const nPages = Math.ceil(data.length / recordsPerPage);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/admin/fetchAll")
      .then((res) => {
        setData(res.data);
        setDataLoaded(true);
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

  const [openDel, setOpenDel] = useState(false);
  const [delId, setDelId] = useState("");
  const handleClickOpenDel = (data) => {    
    setDelId(data);
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const deleteProperty = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/admin/deletePro/${delId}`
      );
      setSearchValue("")
      setChange(change + 1);
      setSnackDel(true);
      setOpenDel(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [proListingStatus, setProListingStatus] = useState({
    pro_listed: "",
    pro_id: "",
  });

  
  const [proSaleStatus, setProSaleStatus] = useState({
    sale_status: "",
    pro_id: "",
  });

  const [open, setOpen] = useState(false);
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
  


  const handleCheckboxChange = (itemProId) => {
    
    setListingids((prevState) => {
      if (prevState.includes(itemProId)) {
        // If the ID is already in the array, remove it
        // setAllSelected(false);
        return prevState.filter((id) => id !== itemProId);
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
    if (listingids.length === records.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [listingids, records]);

  const handleAllTypes = () => {
    
    if (listingids.length === records.length) {
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

  const updateSaleStatus = async (data, val) => {
    setLoader(true);
    proSaleStatus.sale_status = val;
    proSaleStatus.pro_id = data.pro_id;
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/pro/updateSaleStatus",
      proSaleStatus
    );
    setChange(change + 1);
    setLoader(false);
    setSnack(true);
  };

  const updateMultipleSaleStatus = async (sale_status) => {
    setLoader(true);
    // proListingStatus.pro_listed = 1;
    // proListingStatus.pro_id = listingids;
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/pro/updateMultipleSaleStatus",
      { sale_status: sale_status, listingids: listingids }
    );
    setChange(change + 1);
    setLoader(false);
    setSnack(true);
  };


  const theadArray = [
    {
      value: (
        <Checkbox size="small" onClick={handleAllTypes} checked={allSelected} className="checkbox-alignment" />
      ),
    },
    { value: "Sno." },
    { value: "Id" },
    { value: "Sale/Resale" },
    { value: "User" },
    { value: "Property Type" },
    
    { value: "Posted On" },
    { value: "Status" },
    { value: "Email" },
    { value: "Phone" },
    { value: "Address" },
    { value: "Actions", customClass: "th-width-2" },
  ];

  


  // const tbodyArray = [
  //   {value: "pro_ad_type"},
  //   {value: "pro_ad_type"},
  // ]

  const tbodyArray = [
    // {
    //   value: `<Checkbox
    //   size="small"
    //   checked={listingids.includes(item.pro_id)}
    //   onClick={() => handleCheckboxChange(item.pro_id)}
    // />`,
    // },
    {
      type: "checkbox",
      condition: "checkbox",
      checkcond: "listingids",
      checkval: "pro_id",
      size: "small",
    },
    { value: "serial_no" },
    { value: "pro_id", transform: (id) => 5000 + parseInt(id) },
    // { type: "pro_id", value: "pro_id", id: 5000 },
    { value: "pro_ad_type" },
    
    {value: "pro_user_type"},
    
    { value: "pro_type" },
    
    {
      value: "pro_creation_date",
      transform: (date) => moment(date).format("MMMM DD YYYY"),
    },
    { type: "conditional", condition: "status" },
    { value: "login_email" },
    {
      value: "login_number",
      transform: (val) => `+91 ${val}`,
    },
                  
    // { type: "conditional", condition: "property_date" },
    { type: "conditional", condition: "property_title" },

    

    {
      type: "conditional2",
      conditions: [
       
        {
          type: "link",
          condition: "view_btn",
          icon: <IconEye className="action-edit-icon " height={19} width={19} />,
          // icon: (
          //   <FontAwesomeIcon
          //     icon={faEye}
          //     className="action-edit-icon "
          //     title="View property"
          //   />
          // ),
          to: "/",
          customClass: "action_status_btn mr-2",
          tagType: "Link",
          title:"View property"
        },

        {
          condition: "listing_status",
          delisttitle: "Click to Dislist your property",
          listtitle: "Click to List your property",
          icon1: <IconHome className="action-edit-icon " height={18} width={18} />,
          icon2: <IconHomeOff className="action-edit-icon " height={18} width={18} />,
          classdelist: "btn btn-sm vbtn action_status_btn",
          classlist: "btn btn-sm vbtn action_status_btn",
          displayVal1: "List Again",
          displayVal2: "Delist",
          checkval: "pro_listed",
          cond1: 1,
          cond2: null,
        },

        {
          condition: "sale_status",
          title: "Click to mark your property as sold",
          icon: <IconCheckbox className="action-edit-icon " height={18} width={18} />,
          customClass: "btn btn-sm vbtn action_status_btn",
          titleUnsold: "Click to mark your property as unsold",
          icon2: <IconCheckbox className="action-edit-icon " height={18} width={18} />,
          checkval: "pro_sale_status"
         
        },

        {
          type: "button",
          condition: "delete_btn",
          onClick: (object) => handleClickOpenDel(object.pro_id),
          title: "Delete Property",
          // icon: (
          //   <FontAwesomeIcon
          //     icon={faTrashCan}
          //     className="font-awe-icon-delete "
          //   />
          // ),
          icon: <IconTrash className="action-edit-icon " height={18} width={18} />,
          to: "/",
          customClass: "btn btn-sm vbtn action_status_btn ",
        },
      ],
    },

    {type: "conditional-btns-links-1",
      conditons: [

   
    {
      type: "link",
      condition: "view_btn",
      icon: (
        <FontAwesomeIcon
          icon={faEye}
          className="font-awe-icon-delete "
          title="View property"
        />
      ),
      to: "/",
      customClass: "dash-edit-btn",
    },

    
    {
      type: "button",
      condition: "delete_btn",
      onClick: (object) => handleClickOpen(object.pro_id),
      icon: (
        <FontAwesomeIcon
          icon={faTrashCan}
          className="font-awe-icon-delete "
          delisttitle="Delete Property"
        />
      ),
      to: "/",
      customClass: "shortlist-delete-btn",
    },
  ]}
    // {value: `Actions`},
  ];

  const [filterChange, setFilterChange] = useState(1);

  const handleCurreentPage = (value) => {
    setCurrentPage(value);
  };


  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleFilterChangeprop = (value) => {
    setFilterChange(value);
  };

  const handleSelectedAction = (value) => {
    setSelectedAction(value);
  };

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  const filterOptions = ["All", "Listed Properties", "Delisted Properties"];
  const selectedActions = ["List Again", "Delist Properties"];

  return (
    <div className="container-fluid admin-dashboard admin-icon">
      <Dialog
        open={openDel}
        onClose={handleCloseDel}
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
          <Button onClick={handleCloseDel}>Cancel</Button>
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
        open={snackDel}
        autoHideDuration={1000}
        onClose={() => setSnackDel(false)}
        message={"Deleted Successfully"}
      />


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

      {/* <div className="card-body table-border-style"> */}
        {/* <h1>All Properties</h1>
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

          
        </div> */}

{/* <div className="dashboard-upper-sec">
        <div className="dash-upper-text-content ">
          <IconMenuDeep /> Dasboard Navigation
        </div>
        
        <div className="row justify-content-between align-items-center my-2">
          <div className="d-flex col-md-6 col-sm-12 ">
            <div className="d-flex justify-content-between">
              <div className="dash-header-heading">
                All Properties<span class="badge">{data.length}</span>
              </div>
              <div className="dash-upper-text-content-2">
                
                /* <DashboardNavbar /> *
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-end header-menu">
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
                <MenuItem value={"Listed Properties"}>
                  Listed Properties
                </MenuItem>
                <MenuItem value={"Delisted Properties"}>
                  Delisted Properties
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ m: 1, width: ["100%"] }}
              size="small"
              className="col-md-3 "
              //disabled={listingids.length === 0}
              // title={
              //   listingids.length === 0
              //     ? "Select item to perform this action"
              //     : ""
              // }
            >
              <InputLabel id="demo-simple-select-label">
                With selected
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={selectedAction}
                label="With selected"
                onChange={(e) => {
                  setSelectedAction(e.target.value), setCurrentPage(1);
                }}
              >
                <MenuItem
                  //disabled={listingids.length === 0}
                  value={"Listed Properties"}
                  //onClick={() => listMultipleProperty(1)}
                >
                  List Again
                </MenuItem>
                <MenuItem
                  //disabled={listingids.length === 0}
                  value={"Delisted Properties"}
                  //onClick={() => listMultipleProperty(0)}
                >
                  Delist Properties
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
      </div> */}


      <AdminDashUpperBody
        data={data}
        handleCurreentPage={handleCurreentPage}
        filter={filter}
        //listingids={listingids}
        handleFilterChange={handleFilterChange}
        handleFilterChangeprop={handleFilterChangeprop}
        handleSearchValue={handleSearchValue}
        handleSelectedAction={handleSelectedAction}
        filterChange={filterChange}
        //selectedAction={selectedAction}
        //listMultipleProperty={listMultipleProperty}
        heading={"All Properties"}
        filterOptions={filterOptions}
        //selectedActions={selectedActions}
        filterAva={true}
        selectedActionsAva={false}
        searchAva={true}
      />


      <AdminDashTable
        theadArray={theadArray}
        handleAllTypes={handleAllTypes}
        allSelected={allSelected}
        tbodyArray={tbodyArray}
        compData={records}
        FormatDate={FormatDate}
        handleCheckboxChange={handleCheckboxChange}
        listingids={listingids}
        handleClickOpen={handleClickOpen}
        // handleClickOpenDel={handleClickOpenDel}
        listProperty={listProperty}
        //deleteProperty={deleteProperty}
        context="dashboard"
        dataLoaded={dataLoaded}
        nPages={nPages}
        handleCurreentPage={handleCurreentPage}
        pagination={true}
        updateSaleStatus={updateSaleStatus}
      />

{/* 
        <div class="wg-box">
        <div className="card-body table-border-style table-text-infor">
        <div className="table-responsive">
          <table className="table table-hover">

            <thead className="head">
              <tr>
                
              <th>
                    <Checkbox size="small"  />
                  </th>
                <th  className="table-head">Sno.</th>
                <th className="table-head">Property Id</th>
                <th className="table-head">Sale/Resale</th>
                <th className="table-head">Owner/Agent</th>
                <th className="table-head">Property Type</th>
                <th className="table-head">Posted On</th>
                <th className="table-head">Status</th>
                <th className="table-head">Email</th>
                <th className="table-head">Phone</th>
                <th className="table-head">Address</th>
                <th colSpan={2} className="table-head">Actions</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {records.map((item, index) => (
                <tr key={index}>
                  <td>
                      <Checkbox size="small" 
                      // checked={listingids.includes(item.pro_id)} 
                      // onClick={() => handleCheckboxChange(item.pro_id)} 
                      />
                    </td>
                  <td>{item.serial_no}</td>
                  <td>{5000 + parseInt(item.pro_id)}</td>
                  <td>{item.pro_ad_type}</td>
                  <td>{item.pro_user_type}</td>
                  <td>{item.pro_type}</td>
                  {<td>{FormatDate(item.pro_date)}</td>}

                  <td>
                      {item.pro_listed === 1 || item.pro_listed === null ? (
                        <span className="current-status-green" >Listed</span>
                      ) : (
                        <span className="current-status-red">Delisted</span>
                      )}
                    </td>

               

                  <td>{item.login_email}</td>
                  <td>+91{item.login_number}</td>
                  <td>{item.pro_locality},&nbsp;
                                {item.pro_sub_district
                                  ? item.pro_sub_district + ", "
                                  : ""}
                                {item.pro_city},&nbsp;
                                  {item.pro_state}</td>
                  

                  <td className="pr-0">
                     
                        
                        <Link
                          target="_blank"
                          to={`/${item.pro_url}`}
                          className="dash-edit-btn"
                        >
                         
                          <FontAwesomeIcon
                            icon={faEye}
                            className="font-awe-icon-edit"
                            title="View property"
                          />
                        </Link>
                       
                        </td>
                        <td>
                        <button
                          className="dash-delete-btn"
                          onClick={() => handleClickOpen(item.pro_id)}
                        >
                         
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="font-awe-icon-delete "
                            title="Delete property"
                          />
                        </button>

                       
                      
                    </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
        </div>
        </div> */}

        {/* {records.length > 0 && (
            <Pagination
              count={nPages}
              color="primary"
              onChange={(e, value) => setCurrentPage(value)}
              className="pb-5 d-flex justify-content-center"
            />
        )} */}
      {/* </div> */}
    </div>
  );
};

export default AdminDashboard;
