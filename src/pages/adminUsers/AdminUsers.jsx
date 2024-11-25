import { useEffect, useState } from "react";
import axios from "axios";

import Loader from "../../components/loader/Loader";
import AdminDashTable from "../../components/adminDashboardComp/AdminDashTable";
import { AdminDashUpperBody } from "../../components/adminDashboardComp/AdminDashTbody";

import moment from "moment";
import {IconCircleCheck, IconCircleMinus, IconHome } from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";

const AdminUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);

  const [change, setChange] = useState(1);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/admin/fetchUsers1")
      .then((res) => {
        setData(res.data);
      });
  }, [change]);

  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });

  const [searchValue, setSearchValue] = useState("");

  const filteredData = data.filter(
    (code) =>
      code.login_email.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      code.login_number.startsWith(searchValue) ||
      code.login_id.toString().startsWith(searchValue)
  );

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleClick = async (id) => {
    try {
      console.log("id : ", id);
      setLoader(true);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/admin/grantAccessToListProperty",
        [id]
      );
      setChange(change + 1);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const removeAccess = async (id) => {
    setLoader(true);
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/admin/revokeAccessToListProperty",
      [id]
    );
    setChange(change + 1);
    setLoader(false);
    //setSnack(true);
  };




  
  const handleCurreentPage = (value) => {
    setCurrentPage(value);
  };
  
  
  const theadArray = [
    // {
    //   value: (
    //     <Checkbox size="small" onClick={handleAllTypes} checked={allSelected} />
    //   ),
    // },
    { value: "Sno." },
    { value: "User Id" },
    { value: "User Type" },
    { value: "Email" },
    { value: "Phone" },
    { value: "Reg. Date" , customClass: "th-width-2" },
    
    { value: "Properties listed in last 30 Days", customClass: "th-width-10" },
    // { value: "Properties Auto Inactive in", customClass: "th-width-10" },
    { value: "Transaction Id" },
    { value: "Plan Status" },
    // { value: "Property Listing Access" },
    { value: "Actions", customClass: "th-width-12" },
  ];

  
  // const tbodyArray = [
  //   {value: "pro_ad_type"},
  //   {value: "pro_ad_type"},
  // ]

  function transformValue(val) {
    if (val === null) {
      return "30 Days";
    }
    if (val === "0") {
      return "-";
    }
    if (val !== 0) {
      return val + "Days";
    }
  }

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
    { value: "login_id"},
    // { type: "pro_id", value: "pro_id", id: 5000 },
    {value: "agent_type", transform: (val) => val ? val : "-" },
    { value: "login_email" },
    {
      value: "login_number",
      transform: (val) => `+91 ${val}`,
    },
    {
      value: "reg_date",
      // transform: (date) => moment(date).format("MMMM DD YYYY"),
      transform: (date) => moment(date).format("DD MMM, YY"),
    },
    
    { value: "pro_count", transform: (val) => val ? val : "-"},
    // { value: "pro_auto_inactive", transform: (val) => transformValue(val)},
    { value: "tran_id", transform: (val) => val ? 9000 + val : "-"},

    // {parseInt(item.plan_status) === 1
    //   ? "Active"
    //   : parseInt(item.plan_status) === 2
    //   ? "Access Granted By Admin"
    //   : parseInt(item.plan_status) === 3
    //   ? "Access Remove By Admin"
    //   : "-"}

    // {
    //   value: "plan_status",
    //   transform: (val) => { 
    //     const planStatusOptions = {
    //       1 : "Active",
    //       2 : "Access Granted By Admin",
    //       3 : "Access Remove By Admin"
    //     }
    //    return val ? planStatusOptions[parseInt(val)] : "-" },
    // },
    { type: "plan_status"},
    
                  
    // { type: "conditional", condition: "property_date" },
    // { type: "conditional", condition: "property_title" },

  //   {type: "conditional-btns-links",
  //     conditons: [

  //   {
  //     type: "view_profile",
  //     condition: "view_profile",
  //     icon: <IconUserSearch />,
  //     span: "View Profile",
  //     to: "/",
  //     customClass: "dash-edit-btn view_profile_btn mr-3",
  //     transform: (val) => `/agentProfile/${val.login_id}`,
      
  //   },

  //   {
  //     type: "view_profile_pro",
  //     condition: "view_profile",
  //     icon: <IconHome />,
  //     span: "View Properties",
  //     to: "/",
  //     customClass: "dash-edit-btn view_profile_pro_btn mr-3",
  //     transform: (val) => `/view-properties/${val.login_id}`,
  //   },

  //   {
  //     transform: (val1, val2 ) => { val1 == 5000 ? removeAccess(val2) : handleClick(val2) },
  //     type: "view_profile_3",
  //     //condition: "view_profile",
  //     icon: <IconHome />,
  //     to: "/",
  //     customClass: "dash-edit-btn view_profile_btn_3 mr-3",
  //     displayVal1: "Grant Access",
  //     displayVal2: "Revoke Access",
    
  //   },

  //   // {
  //   //     type: "button",
  //   //     delisttitle: "Remove Access",
  //   //     listtitle: "Grant Access to List Property",
  //   //     condition: "list_delist_btn",
  //   //     classdelist: "btn btn-danger btn-sm vbtn",
  //   //     classlist: "btn btn-success btn-sm vbtn",
  //   //     displayVal1: "Grant Access to List Property",
  //   //     displayVal2: "Remove Access",
  //   //     checkval: "pro_listed",
  //   //     cond1: 1,
  //   //     cond2: null,
  //   //   },
  //   // {
  //   //   type: "link",
  //   //   condition: "view_btn",
  //   //   icon: "View Profile",
  //   //   to: "/",
  //   //   customClass: "dash-edit-btn",
  //   // },

  //   // {
  //   //   type: "button",
  //   //   delisttitle: "Click to Dislist your property",
  //   //   listtitle: "Click to List your property",
  //   //   condition: "list_delist_btn",
  //   //   classdelist: "btn btn-danger btn-sm vbtn",
  //   //   classlist: "btn btn-success btn-sm vbtn",
  //   //   displayVal1: "Grant Access to List Property",
  //   //   displayVal2: "Remove Access",
  //   //   checkval: "pro_listed",
  //   //   cond1: 1,
  //   //   cond2: null,
  //   // },
  // ]}

    // {value: `Actions`},


    {
      type: "conditional2",
      conditions: [
       

        {
              type: "view_profile",
              condition: "view_profile",
              icon: <IconEye className="action-edit-icon " height={19} width={19} />,
              span: "View Profile",
              to: "/",
              customClass: "action_status_btn mr-2",
              transform: (val) => `/agentProfile/${val.login_id}`,
              
            },
        
            {
              type: "view_profile",
              condition: "view_profile",
              icon: <IconHome className="action-edit-icon " height={19} width={19} />,
              span: "View Properties",
              to: "/",
              customClass: "action_status_btn mr-2",
              transform: (val) => `/view-properties/${val.login_id}`,
            },

            // {
            //   type: "view_profile",
            //   condition: "view_profile",
            //   icon: <IconHome className="action-edit-icon " height={19} width={19} />,
            //   span: "View Properties",
            //   to: "/",
            //   customClass: "action_status_btn mr-2",
            //   transform: (val) => `/view-properties/${val.login_id}`,
            // },


            {
              type: "view_profile_3",
              condition: "view_profile_3",
                  transform: (val1, val2 ) => { val1 == 5000 ? removeAccess(val2) : handleClick(val2) },
                 
                  icon1: <IconCircleCheck className="action-edit-icon " height={19} width={19} />,
                  icon2: <IconCircleMinus className="action-edit-icon " height={19} width={19} />,
                  to: "/",
                  customClass: "action_status_btn mr-2",
                  displayVal1: "Grant Access",
                  displayVal2: "Revoke Access",
                
                },

        // {
        //   type: "link",
        //   condition: "view_btn",
        //   icon: <IconEye className="action-edit-icon " height={19} width={19} />,
        //   // icon: (
        //   //   <FontAwesomeIcon
        //   //     icon={faEye}
        //   //     className="action-edit-icon "
        //   //     title="View property"
        //   //   />
        //   // ),
        //   to: "/",
        //   customClass: "action_status_btn mr-2",
        //   tagType: "Link",
        //   title:"View property"
        // },

        // {
        //   condition: "listing_status",
        //   delisttitle: "Click to Dislist your property",
        //   listtitle: "Click to List your property",
        //   icon1: <IconHome className="action-edit-icon " height={18} width={18} />,
        //   icon2: <IconHomeOff className="action-edit-icon " height={18} width={18} />,
        //   classdelist: "btn btn-sm vbtn action_status_btn",
        //   classlist: "btn btn-sm vbtn action_status_btn",
        //   displayVal1: "List Again",
        //   displayVal2: "Delist",
        //   checkval: "pro_listed",
        //   cond1: 1,
        //   cond2: null,
        // },

        // {
        //   condition: "sale_status",
        //   title: "Click to mark your property as sold",
        //   icon: <IconCheckbox className="action-edit-icon " height={18} width={18} />,
        //   customClass: "btn btn-sm vbtn action_status_btn",
        //   titleUnsold: "Click to mark your property as unsold",
        //   icon2: <IconCheckbox className="action-edit-icon " height={18} width={18} />,
        //   checkval: "pro_sale_status"
         
        // },

        // {
        //   type: "button",
        //   condition: "delete_btn",
        //   onClick: (object) => handleClickOpenDel(object.pro_id),
        //   title: "Delete Property",
        //   // icon: (
        //   //   <FontAwesomeIcon
        //   //     icon={faTrashCan}
        //   //     className="font-awe-icon-delete "
        //   //   />
        //   // ),
        //   icon: <IconTrash className="action-edit-icon " height={18} width={18} />,
        //   to: "/",
        //   customClass: "btn btn-sm vbtn action_status_btn ",
        // },
      ],
    },

  ];
 

  return (
    <div className="container-fluid admin-dashboard admin-icon">
      {loader ? <Loader /> : ""}
      {/* <div className="card-body table-border-style"> */}
        {/* <h1>All Users</h1>
        <div className="row justify-content-between align-items-center my-2">
           <Pagination
            count={nPages}
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
            className="col-md-6"
          /> 
          <TextField
            variant="outlined"
            className="col-md-3 mx-4 mx-md-0 mt-3"
            size="small"
            label="Search for properties..."
            value={searchValue}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchValue(e.target.value);
            }}
          />
        </div> */}
        

        <AdminDashUpperBody
        data={data}
       handleCurreentPage={handleCurreentPage}
       // filter={filter}
        //listingids={listingids}
       // handleFilterChange={handleFilterChange}
        //handleFilterChangeprop={handleFilterChangeprop}
        //handleSearchValue={handleSearchValue}
        //handleSelectedAction={handleSelectedAction}
        //filterChange={filterChange}
        //selectedAction={selectedAction}
        //listMultipleProperty={listMultipleProperty}
        heading={"All Users"}
        //filterOptions={filterOptions}
        //selectedActions={selectedActions}
        filterAva={false}
        selectedActionsAva={false}
        searchAva={true}
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
        context="dashboard"
        //dataLoaded={dataLoaded}
        nPages={nPages}
        handleCurreentPage={handleCurreentPage}
        pagination={true}
      />


      
      </div>
    // </div>
  );
};

export default AdminUsers;
