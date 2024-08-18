import React, { useContext, useEffect, useState } from "react";
import axios, { all } from "axios";
import { AuthContext } from "../../context/AuthContext";

import { Checkbox, Snackbar } from "@mui/material";

import Loader from "../../components/loader/Loader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import "./UserDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import { faEye, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import { DashUpperBody } from "../../components/userDasboardComp/DashTbody";

import DashTable from "../../components/userDasboardComp/DashTable";
import { IconCheck, IconEdit, IconEye, IconHome, IconHomeOff } from "@tabler/icons-react";
import { IconCheckbox } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";

const UserDashboard = () => {
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
  const [selectedAction, setSelectedAction] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [listingids, setListingids] = useState([]);
  const [snackDel, setSnackDel] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  //const allSelected = data.every(item => listingids.includes(item.pro_id));

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchPropertyDataByUserId1/${currentUser[0].login_id}`
      )
      .then((res) => {
        console.log("res.data : ", res.data);
        if (res.data === "failed") {
          clearUser();
        } else {
          res.data.forEach((item, i) => {
            item.serial_no = i + 1;
          });
          setData(res.data);
          setDataLoaded(true);
        }
      });
  }, [change]);

  useEffect(() => {
    data.forEach((item, i) => {
      item.pro_modified_id = 5000 + parseInt(item.pro_id);
    });
  }, [data, change]);

  const [filterChange, setFilterChange] = useState(1);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      data
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
            code.pro_locality
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            code.pro_sub_district
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            code.pro_pincode.startsWith(searchValue) ||
            code.pro_modified_id.toString().startsWith(searchValue) ||
            code.pro_city.toLowerCase().includes(searchValue.toLowerCase()) ||
            code.pro_state.toLowerCase().startsWith(searchValue.toLowerCase())
        )
    );
  }, [filterChange, data]);

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

  const [proSaleStatus, setProSaleStatus] = useState({
    sale_status: "",
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

  const handleCheckboxChange = (itemProId) => {
    console.log(itemProId);
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
    console.log();
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

  const theadArray = [
    {
      value: (
        <Checkbox
          size="small"
          onClick={handleAllTypes}
          checked={allSelected}
          className="checkbox-alignment"
        />
      ),
    },
    { value: "Sno." },
    { value: "Property Id" },

    { value: "Property Type" },
    { value: "Sale/Rent" },
    { value: "Price" },
    { value: "Posted On" },
    { value: "Property Title", customClass: "th-width-28" },
    { value: "Status" },
    { value: "Actions" },
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

    { type: "conditional", condition: "property_type" },
    { value: "pro_ad_type" },
    { type: "conditional", condition: "property_price" },
    {
      value: "pro_creation_date",
      transform: (date) => moment(date).format("MMMM DD YYYY"),
    },
    // { type: "conditional", condition: "property_date" },
    { type: "conditional", condition: "property_title" },
    { type: "conditional", condition: "status" },
    // {
    //   type: "conditional2",
    //   condition: "status",
    //   icon: (
    //     <FontAwesomeIcon
    //       icon={faPencilAlt}
    //       className="action-edit-icon "
    //       title="Edit property"
    //     />
    //   ),
    //   to: "/editProperty",
    // },

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
          type: "link",
          condition: "edit_btn",
          // icon: (
          //   <FontAwesomeIcon
          //     icon={faPencilAlt}
          //     className="action-edit-icon "
          //     title="Edit property"
          //   />
          // ),
          icon: <IconEdit className="action-edit-icon " height={19} width={19} />,
          to: "/editProperty",
          customClass: "action_status_btn mr-2",
          tagType: "a",
          title:"Edit property"
        },
        

        {
          condition: "listing_status",
          delisttitle: "Click to Dislist your property",
          listtitle: "Click to List your property",
          icon1: <IconHome className="action-edit-icon " height={18} width={18} />,
          icon2: <IconHomeOff className="action-edit-icon " height={18} width={18} />,
          classdelist: "btn btn-sm vbtn action_status_btn",
          classlist: "btn btn-sm vbtn action_status_btn",
          displayVal1: "Active",
          displayVal2: "Inactive",
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
          icon: <IconTrash className="action-edit-icon " height={18} width={18} />,
          to: "/",
          customClass: "btn btn-sm vbtn action_status_btn ",
        },

      ],
    },

    //   {type: "conditional-btns-links",
    //     conditons: [

    //   {

    //     type: "link",
    //     condition: "edit_btn",
    //     icon: (
    //       <FontAwesomeIcon
    //         icon={faPencilAlt}
    //         className="font-awe-icon-edit "
    //         title="Edit property"
    //       />
    //     ),
    //     to: "/editProperty",
    //     customClass: "dash-edit-btn mr-2",
    //   },
    //   {
    //     type: "link",
    //     condition: "view_btn",
    //     icon: (
    //       <FontAwesomeIcon
    //         icon={faEye}
    //         className="font-awe-icon-delete "
    //         title="View property"
    //       />
    //     ),
    //     to: "/",
    //     customClass: "dash-edit-btn mr-2",
    //   },

    //   {
    //     type: "button",
    //     delisttitle: "Click to Dislist your property",
    //     listtitle: "Click to List your property",
    //     condition: "list_delist_btn",
    //     classdelist: "btn btn-danger btn-sm vbtn",
    //     classlist: "btn btn-success btn-sm vbtn",
    //     displayVal1: "List Again",
    //     displayVal2: "Delist",
    //     checkval: "pro_listed",
    //     cond1: 1,
    //     cond2: null,
    //   },
    // ]
    // }
    // {value: `Actions`},
  ];

  // Create a new string in the format "26 March 2024"
  //const formattedDate = `${day} ${month} ${year}`;

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

      <DashUpperBody
        data={data}
        handleCurreentPage={handleCurreentPage}
        filter={filter}
        listingids={listingids}
        handleFilterChange={handleFilterChange}
        handleFilterChangeprop={handleFilterChangeprop}
        handleSearchValue={handleSearchValue}
        handleSelectedAction={handleSelectedAction}
        filterChange={filterChange}
        selectedAction={selectedAction}
        listMultipleProperty={listMultipleProperty}
        heading={"My Properties"}
        filterOptions={filterOptions}
        selectedActions={selectedActions}
        filterAva={true}
        selectedActionsAva={true}
        searchAva={true}
        updateMultipleSaleStatus={updateMultipleSaleStatus}
      />

      <DashTable
        theadArray={theadArray}
        handleAllTypes={handleAllTypes}
        allSelected={allSelected}
        tbodyArray={tbodyArray}
        compData={records}
        FormatDate={FormatDate}
        handleCheckboxChange={handleCheckboxChange}
        listingids={listingids}
        handleClickOpen={handleClickOpen}
        listProperty={listProperty}
        context="dashboard"
        dataLoaded={dataLoaded}
        nPages={nPages}
        handleCurreentPage={handleCurreentPage}
        pagination={true}
        updateSaleStatus={updateSaleStatus}
      />
    </div>
  );
};

export default UserDashboard;
