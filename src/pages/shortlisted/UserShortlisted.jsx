import { IconEye, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Snackbar } from "@mui/material";

import { Checkbox } from "@mui/material";
import DashTable from "../../components/userDasboardComp/DashTable";
import "../userdashboard/UserDashboard.css";

import {
  faEye,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DashUpperBody } from "../../components/userDasboardComp/DashTbody";
import moment from "moment";

const UserShortlisted = () => {
  const { currentUser, clearUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchShortListProperty/${currentUser[0].login_id}`
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
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [count]);
  const handleDelete = async (delId) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/pro/deleteShortlist/${delId}`
      );
      setCount(count + 1);
      setSnack(true);
    } catch (err) {
      console.log(err);
    }
  };
  const [snack, setSnack] = useState(false);

  // const theadArray = [
  //   // {
  //   //   value: <Checkbox size="small" />,
  //   // },
  //   { value: "Sno." },
  //   { value: "Address" , customClass: "th-width-1" },
  //   { value: "Actions" , colspan: 2, customClass: "th-width-2" },
  //   {value: ""}
  // ];


  const [filterChange, setFilterChange] = useState(1);

  const handleFilterChangeprop = (value) => {
    setFilterChange(value);
  };


  // const tbodyArray = [
  //   // {
  //   //   type: "checkbox",
  //   //   condition: "checkbox",
  //   //   checkcond: "listingids",
  //   //   checkval: "pro_id",
  //   // },
  //   { value: "serial_no" }, 
  //   {
  //     type: "conditional",
  //     condition: "property_location", 
  //     transform: (item) => (
  //       <>
  //         {item.pro_locality},&nbsp;
  //         {item.pro_sub_district ? item.pro_sub_district + ", " : ""}
  //         {item.pro_city},&nbsp;
  //         {item.pro_state}
  //       </>
  //     ),
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
  //     customClass: "dash-edit-btn",
  //   },
  //   {
  //     type: "button",
  //     condition: "delete_btn",
  //     onClick: (object) => handleDelete(object.shortlist_id),
  //     icon: (
  //       <FontAwesomeIcon
  //         icon={faTrashCan}
  //         className="font-awe-icon-delete "
  //         title="Delete Shortlisted Property"
  //       />
  //     ),
  //     to: "/",
  //     customClass: "dash-edit-btn",
  //   },
  //   {value: ""}
  //   // {
  //   //   type: "action",
  //   //   condition: "actions",
  //   //   buttons: [
  //   //     {
  //   //       type: "link",
  //   //       condition: "view_btn",
  //   //       icon: <IconEye />,
  //   //       to: `/${item.pro_url}`,
  //   //       customClass: "btn btn-primary btn-sm vbtn",
  //   //       title: "View",
  //   //     },
  //   //     {
  //   //       type: "button",
  //   //       condition: "delete_btn",
  //   //       icon: <IconTrash />,
  //   //       onClick: (object) => handleDelete(object.shortlist_id),
  //   //       customClass: "btn btn-danger btn-sm vbtn",
  //   //       title: "Delete",
  //   //     },
  //   //   ],
  //   // },
  // ];
  // const handleCurreentPage = (value) => {
  //   setCurrentPage(value)
  // }



  const theadArray = [
   
    { value: "Sno." },
    { value: "Status" },
    { value: "Property Type" },
    { value: "Sale/Rent" },
    { value: "Price" },
    { value: "Posted On" },
    { value: "Property Title", customClass: "th-width-28" },
    { value: "Actions" },
  ];

  // const tbodyArray = [
  //   {value: "pro_ad_type"},
  //   {value: "pro_ad_type"},
  // ]

  const tbodyArray = [
    
    { value: "serial_no" },
 ,
    // { type: "pro_id", value: "pro_id", id: 5000 },
    { type: "conditional", condition: "status" },
    { type: "conditional", condition: "property_type" },
    { value: "pro_ad_type" },
    { type: "conditional", condition: "property_price" },
    {
      value: "pro_creation_date",
      transform: (date) => moment(date).format("MMMM DD YYYY"),
    },
    // { type: "conditional", condition: "property_date" },
    { type: "conditional", condition: "property_title" },


    {type: "conditional-btns-links",
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
      customClass: "dash-edit-btn mr-2",
    },

    

    {
          type: "button",
          condition: "delete_btn",
          onClick: (object) => handleDelete(object.shortlist_id),
          icon: (
            <FontAwesomeIcon
              icon={faTrashCan}
              className="font-awe-icon-delete "
              title="Delete Shortlisted Property"
            />
          ),
          to: "/",
          customClass: "shortlist-delete-btn ",
        },

  ]
  }
    // {value: `Actions`},
  ];
  const handleCurreentPage = (value) => {
    setCurrentPage(value);
  };


  return (
    <div className="container-fluid admin-dashboard admin-icon">
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

<DashUpperBody
        data={data}
        //handleCurreentPage={handleCurreentPage}
        heading={"My Shortlisted Properties"}
        filterAva={false}
        selectedActionsAva={false}
        searchAva={false}
        
      />

      
     

      <DashTable 
        theadArray={theadArray} 
        tbodyArray={tbodyArray}
        context="dashboard" 
        compData={data}
        dataLoaded={dataLoaded}
        // nPages={nPages}
        // handleCurreentPage={handleCurreentPage}
        pagination={false}
      />


     
    </div>
  );
};

export default UserShortlisted;
