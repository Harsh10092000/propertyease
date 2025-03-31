import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";
import "../userdashboard/UserDashboard.css";
import moment from "moment";
import { DashUpperBody } from "../../components/userDasboardComp/DashTbody";
import DashTable from "../../components/userDasboardComp/DashTable";
import {
  IconEdit,
  IconEye,
  IconHome,
  IconHomeCheck,
  IconHomeOff,
  IconUser,
  IconCheckbox,
  IconTrash
} from "@tabler/icons-react";
import { Checkbox, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, Button, Skeleton,DialogContentText  } from "@mui/material";


const ListedProperties = () => {
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

  const [totalViews, setTotalViews] = useState("");
  const [totalResponses, setTotalResponses] = useState("");
  const [listingiInLast30, setListingiInLast30] = useState([]);

  const [openInfoCard, setOpenInfoCard] = useState(false);
  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchListedPropertyDataById/${currentUser[0].login_id}`
      )
      .then((res) => {
        if (res.data === "failed") {
          clearUser();
        } else {
          res.data.forEach((item, i) => {
            item.serial_no = i + 1;
          });
          setData(res.data);
          setDataLoaded(true);
          setSkeleton(false);
        }
      });

    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchLast30DaysListings/${currentUser[0].login_id}`
      )
      .then((res) => {
        if (res.data === "failed") {
          clearUser();
        } else {
          setListingiInLast30(res.data);
        }
      });
  }, [change]);

  useEffect(() => {
    setTotalViews(
      data.reduce((accumulator, currentObject) => {
        return parseInt(accumulator) + parseInt(currentObject.pro_views1);
      }, 0)
    );

    setTotalResponses(
      data.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.pro_responses;
      }, 0)
    );
  }, [data]);

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
          return false;  // Add a default return value for safety
        })
        .filter((code) => {
          const normalizedSearchValue = searchValue.toLowerCase();
          
          return (
            (code.pro_locality && code.pro_locality.toLowerCase().includes(normalizedSearchValue)) ||
            (code.pro_sub_district && code.pro_sub_district.toLowerCase().includes(normalizedSearchValue)) ||
            (code.pro_pincode && code.pro_pincode.startsWith(searchValue)) ||
            (code.pro_modified_id && code.pro_modified_id.toString().startsWith(searchValue)) ||
            (code.pro_city && code.pro_city.toLowerCase().includes(normalizedSearchValue)) ||
            (code.pro_state && code.pro_state.toLowerCase().startsWith(normalizedSearchValue)) ||
            (code.pro_ad_type && code.pro_ad_type.toLowerCase().startsWith(normalizedSearchValue))
          );
        })
    );
  }, [filterChange, data, searchValue]);
  


 

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);


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
      setSearchValue("");
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
    
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/pro/updateMultipleSaleStatus",
      { sale_status: sale_status, listingids: listingids }
    );
    setChange(change + 1);
    setLoader(false);
    setSnack(true);
  };

  const handleCheckboxChange = (itemProId) => {
    setListingids((prevState) => {
      if (prevState.includes(itemProId)) {
       
        return prevState.filter((id) => id !== itemProId);
      } else {
        
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
    // { value: "Sno." },
    { value: "propertyease Id" },

    { value: "Property Type" },
    { value: "Sale/Rent" },
    { value: "Price"  },
    
    { value: "Posted On", customClass: "th-width-7" },
    { value: "Expired On", customClass: "th-width-8" },
    // { value: "Property Title", customClass: "th-width-16" },
    { value: "Responses and Views", customClass: "th-width-10" },
    { value: "Status" },
   
    { value: "Actions", customClass: "th-width-10" },
    { value: "Remarks", customClass: "th-width-12" },
  ];

  const tbodyArray = [
    
    {
      type: "checkbox",
      condition: "checkbox",
      checkcond: "listingids",
      checkval: "pro_id",
      size: "small",
    },
    // { value: "serial_no" },
    { value: "pro_id", transform: (id) => 5000 + parseInt(id) },
    // { type: "pro_id", value: "pro_id", id: 5000 },

    { type: "conditional", condition: "property_type" },
    { value: "pro_ad_type" },
    { type: "conditional", condition: "property_price" },
    {
      value: "pro_creation_date",
      //transform: (date) => moment(date).format("MMMM DD YYYY"),
      transform: (date) => moment(date).format("DD MMM, YY"),
    },
    {
      value: "pro_renew_date",
      //transform: (date) => moment(date).format("MMMM DD YYYY"),
      transform: (date) => moment(date).format("DD MMM, YY"),
    },
    // { type: "conditional", condition: "property_date" },
    // { type: "conditional", condition: "property_title" },
    {
      type: "conditional",
      condition: "views-2",
      totalResponses: { totalResponses },
    },
    { type: "conditional", condition: "status" },
   
    

    {
      type: "conditional2",
      conditions: [
        {
          type: "link",
          condition: "view_btn",
          icon: (
            <IconEye className="action-edit-icon " height={19} width={19} />
          ),
          
          to: "/",
          customClass: "action_status_btn mr-2",
          tagType: "Link",
          title: "View property",
        },
        {
          type: "link",
          condition: "edit_btn",
          
          icon: (
            <IconEdit className="action-edit-icon " height={19} width={19} />
          ),
          to: "/editProperty",
          customClass: "action_status_btn mr-2",
          tagType: "a",
          title: "Edit property",
        },

        {
          condition: "listing_status",
          delisttitle: "Click to Dislist your property",
          listtitle: "Click to List your property",
          icon1: (
            <IconHome className="action-edit-icon " height={18} width={18} />
          ),
          icon2: (
            <IconHomeOff className="action-edit-icon " height={18} width={18} />
          ),
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
          icon: (
            <IconCheckbox
              className="action-edit-icon "
              height={18}
              width={18}
            />
          ),
          customClass: "btn btn-sm vbtn action_status_btn",
          titleUnsold: "Click to mark your property as unsold",
          icon2: (
            <IconCheckbox
              className="action-edit-icon "
              height={18}
              width={18}
            />
          ),
          checkval: "pro_sale_status",
        },

        {
          type: "button",
          condition: "delete_btn",
          onClick: (object) => handleClickOpenDel(object.pro_id),
          title: "Delete Property",
          icon: (
            <IconTrash className="action-edit-icon " height={18} width={18} />
          ),
          to: "/",
          customClass: "btn btn-sm vbtn action_status_btn ",
        },
      ],
    },
    { type: "conditionalRemark", condition: "pro_pincode"  },
  ];




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

  const handleChange = (value) => {
    setChange(value);
  };

  const filterOptions = ["All", "Listed Properties", "Delisted Properties"];
  const selectedActions = ["List Again", "Delist Properties"];

  const [infoCard, setInfoCard] = useState([]);

  useEffect(() => {
    // Initialize the state when component mounts or values change
    setInfoCard([
      { value: "Free Membership", text: "Your current package" },
      { value: totalViews, text: "Total Views" },
      { value: totalResponses, text: "Total Responses" },
      { value: "5", text: "Listing Included" },
      { value: "5", text: "Listing Remaining" },
      { value: "5", text: "Listing Remaining" },
      { value: "5", text: "Listing Remaining" },
      { value: "5", text: "Listing Remaining" },
      { value: "5", text: "Listing Remaining" },
    ]);
  }, [totalViews, totalResponses]);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenInfoCard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sumOfSoldProperties = data.reduce(
    (sum, item) => sum + item.pro_sale_status,
    0
  );

 

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

      {/* {parseInt(listingiInLast30[0]?.plan_status) !== 2 && ( */}
      <div className="row info-card">
        <div className="col-lg-3 align-self-center mb-3 mb-lg-0 d-flex align-items-center">
          {/* <div className="d-flex align-items-center flex-row flex-wrap"> */}
          <div className="position-relative mr-3">

            <img
              src="/img/person.jpg"
              alt=""
              height="70"
              width="70"
              className="rounded-circle"
            />

          </div>
          <div className="info-card-name">
            <h5 className="fw-semibold name-font-size mb-1">
              {currentUser[0].login_email}
            </h5>
            {parseInt(listingiInLast30[0]?.plan_status) !== 1 &&
            parseInt(listingiInLast30[0]?.plan_status) !== 2 ? (
              <p className="mb-0 text-muted fw-medium">Free Membership</p>
            ) : (
              <p className="mb-0 text-muted fw-medium">Pro Membership</p>
            )}
          </div>
          {/* </div> */}
        </div>

        <div className="col-lg-9 ms-auto align-self-center">
          <div className="  info-card-sec-wrap">
            <div className="col-md-3 dashborad-info-card d-flex border-dashed dashborad-info-card-bg-1 rounded border-theme-color info-card-sec mr-2 flex-grow-1 flex-basis-0">
              <div className="info-card-icon-wrapper">
                <div className="info-card-icon">
                  <IconEye />
                </div>
              </div>

              <div className="">
                <h5 className="fw-semibold fs-22 mb-0 mt-1 info-heading-color">
                  {totalViews}
                </h5>
                <p className="text-muted mb-0 fw-medium">Total Views</p>
              </div>
            </div>

            <div className="col-md-3 dashborad-info-card dashborad-info-card-bg-2 border-dashed rounded border-theme-color info-card-sec mr-2 flex-grow-1 flex-basis-0 ">
              <div className="info-card-icon-wrapper">
                <div className="info-card-icon">
                  <IconUser />
                </div>
              </div>
              <div className="">
                <h5 className="fw-semibold fs-22 mb-0 mt-1 info-heading-color">
                  {totalResponses}
                </h5>
                <p className="text-muted mb-0 fw-medium">Total Responses</p>
              </div>
            </div>

            
            <div className="col-md-3 dashborad-info-card dashborad-info-card-bg-4 border-dashed rounded border-theme-color info-card-sec mr-2 flex-grow-1 flex-basis-0">
              <div className="info-card-icon-wrapper">
                <div className="info-card-icon">
                  <IconHomeCheck />
                </div>
              </div>
              <div className="">
                <h5 className="fw-semibold fs-22 mb-0 mt-1 info-heading-color">
                  {sumOfSoldProperties}
                </h5>
                <p className="text-muted mb-0 fw-medium">Properties Sold</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>


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
        handleChange={handleChange}
        change={change}
      />
    </div>
     
    
  );
};

export default ListedProperties;
