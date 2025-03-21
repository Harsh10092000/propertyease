import { useEffect, useState } from "react";
import axios from "axios";
import { IconEye, IconTrashFilled, IconEdit } from "@tabler/icons-react";
import { Checkbox, Snackbar } from "@mui/material";
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
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { AdminDashUpperBody } from "../../components/adminDashboardComp/AdminDashTbody";
import AdminDashTable from "../../components/adminDashboardComp/AdminDashTable";

const AdminPropertyPlans = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [change, setChange] = useState(0);
  const [snack, setSnack] = useState(false);
  const [loader, setLoader] = useState(false);
  const [listingids, setListingids] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  //const records = data.slice(firstIndex, lastIndex);
  //const nPages = Math.ceil(data.length / recordsPerPage);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/proplan/fetchProPlanData")
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
      item.plan_modified_id = 7000 + parseInt(item.pro_plan_id);
    });
  }, [data]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All");
  const filteredData = data
    // .filter((code) => {
    //   if (filter === "all_properties_ad_1") {
    //     return code.ad_type === "all_properties_ad_1";
    //   } else if (filter === "all_properties_ad_2") {
    //     return code.ad_type === "all_properties_ad_2";
    //   } else if (filter === "property_page_ad_1") {
    //     return code.ad_type === "property_page_ad_1";
    //   } else if (filter === "property_page_ad_2") {
    //     return code.ad_type === "property_page_ad_2";
    //   } else if (filter === "All") {
    //     return true;
    //   }
    // })
    .filter(
      (code) =>
        code.pro_plan_name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        //code.ad_type.toLowerCase().includes(searchValue.toLowerCase()) ||
        code.plan_modified_id.toString().startsWith(searchValue)
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

  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState("");
  const handleClickOpen = (data) => {    
    setDelId(data);
    setOpen(true);
  };

  const handleCurreentPage = (value) => {
    setCurrentPage(value);
  };


  

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };


  const theadArray = [
    // {
    //   value: (
    //     <Checkbox size="small" onClick={handleAllTypes} checked={allSelected} />
    //   ),
    // },
    { value: "Sno." },
    { value: "Plan Id" },
    { value: "Plan Name" },
    { value: "Plan Amount" },
    { value: "Created At" , customClass: "th-width-2"},
    { value: "Plan Validity (In Days)" },
    { value: "Actions", customClass: "th-width-14" },
  ];

  


  // const tbodyArray = [
  //   {value: "pro_ad_type"},
  //   {value: "pro_ad_type"},
  // ]





                 
                  // <td>{item.pro_plan_validity + " Days"}

  const tbodyArray = [
    // {
    //   value: `<Checkbox
    //   size="small"
    //   checked={listingids.includes(item.pro_id)}
    //   onClick={() => handleCheckboxChange(item.pro_id)}
    // />`,
    // },
    // {
    //   type: "checkbox",
    //   condition: "checkbox",
    //   checkcond: "listingids",
    //   checkval: "pro_id",
    //   size: "small",
    // },
    { value: "serial_no" },
    { value: "pro_plan_id", transform: (id) => 7000 + parseInt(id) },
    // { type: "pro_id", value: "pro_id", id: 5000 },
    { value: "pro_plan_name" },
    
    {value: "pro_plan_amt"},
    

    
    {
      value: "pro_plan_date",
      //transform: (date) => moment(date).format("MMMM DD YYYY"),
      transform: (date) => moment(date).format("DD MMM, YY"),
    },
    {
      value: "pro_plan_validity",
      transform: (val) => `${val} Days`,
    },

    
    {type: "conditional-btns-links",
      conditons: [

    {
      type: "link",
      condition: "edit_btn",
      icon: (
        <FontAwesomeIcon
          icon={faPencilAlt}
          className="font-awe-icon-edit"
          title="Edit property"
        />
      ),
      params: "pro_plan_id",
      to: "/admin/editpropertyplan",
      customClass: "dash-edit-btn",
    },
    

    // {
    //   type: "button",
    //   delisttitle: "Click to Dislist your property",
    //   listtitle: "Click to List your property",
    //   condition: "delete_btn",
    //   classdelist: "btn btn-danger btn-sm vbtn",
    //   classlist: "btn btn-success btn-sm vbtn",
    //   displayVal1: "List Again",
    //   displayVal2: "Delist",
    //   checkval: "pro_listed",
    //   cond1: 1,
    //   cond2: null,
    //   icon: (
    //     <FontAwesomeIcon
    //       icon={faPencilAlt}
    //       className="font-awe-icon-edit"
    //       title="Edit property"
    //     />
    //   ),
    // },
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
        handleCurreentPage={handleCurreentPage}
        //filter={filter}
        //listingids={listingids}
        //handleFilterChange={handleFilterChange}
        //handleFilterChangeprop={handleFilterChangeprop}
        handleSearchValue={handleSearchValue}
        //handleSelectedAction={handleSelectedAction}
        //filterChange={filterChange}
        //selectedAction={selectedAction}
        //listMultipleProperty={listMultipleProperty}
        heading={"All Property Listing Plans"}
        //filterOptions={filterOptions}
        //selectedActions={selectedActions}
        filterAva={false}
        selectedActionsAva={false}
        searchAva={true}
      />


      <AdminDashTable
        theadArray={theadArray}
        handleAllTypes={handleAllTypes}
        allSelected={allSelected}
        tbodyArray={tbodyArray}
        compData={records}
        //FormatDate={FormatDate}
        handleCheckboxChange={handleCheckboxChange}
        listingids={listingids}
        handleClickOpen={handleClickOpen}
        //listProperty={listProperty}
        context="dashboard"
        dataLoaded={dataLoaded}
        nPages={nPages}
        handleCurreentPage={handleCurreentPage}
        pagination={true}
      />

      {/* <div className="card-body table-border-style">
        <h1>All Property Listing Plans</h1>
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
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Plan Id</th>
                <th>Plan Name</th>
                <th>Plan Amount</th>
                <th>Created At</th>
                <th>Plan Validity (In Days)</th>
                
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  
                  <td>{item.serial_no}</td>
                  <td>{7000 + parseInt(item.pro_plan_id)}</td>
                  <td>{item.pro_plan_name}</td>
                  <td>{item.pro_plan_amt}</td>
                  
                 

                  <td>{moment(item.pro_plan_date).format("MMMM DD YYYY")}</td>
                  <td>{item.pro_plan_validity + " Days"}</td>
                  {/* <td>{moment(item.pro_plan_date).add(parseInt(item.pro_plan_validity), "days").format("MMMM DD YYYY")}</td>
                  <td>Plan End {moment(moment(item.pro_plan_date).add(parseInt(item.pro_plan_validity) + 1, "days").format("MMMM DD YYYY")).fromNow()}</td>
                  
                  <td className="d-flex gap-3">
                    
                    <Link to={"/admin/editpropertyplan/" + item.pro_plan_id}>
                      <button title="Edit Your Plan" className="view">
                        

                        <IconEdit className="" />
                      </button>
                    </Link>
                    
                    <button
                      className="del"
                      title="Delete"
                      onClick={() => deletePlan(item.pro_plan_id)}
                    >
                      <IconTrashFilled />
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  )
}

export default AdminPropertyPlans
