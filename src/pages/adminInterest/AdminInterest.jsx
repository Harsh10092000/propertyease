
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import AdminDashTable from "../../components/adminDashboardComp/AdminDashTable";
import { AdminDashUpperBody } from "../../components/adminDashboardComp/AdminDashTbody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
const AdminInterest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/admin/fetchInterested")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });

  const records = data.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(data.length / recordsPerPage);

  const theadArray = [
    { value: "Sno." },
    { value: "Property Id" },
    { value: "Name" },
    { value: "Email" },
    { value: "Phone" },
    {value: "Date"},
    { value: "Property Type" },
    { value: "Address",  customClass: "th-width-14" },
    
    { value: "Actions" },
  ];


  const tbodyArray = [
    { value: "serial_no" },
    { value: "pro_id", transform: (id) => 5000 + parseInt(id) },
    { value: "interested_name" },
    { value: "interested_email" },
    {
      value: "interested_phone",
      transform: (val) => `+91 ${val}`,
    },
    {
      value: "interested_DATE",
      transform: (date) => moment(date).format("MMMM DD YYYY"),
    },
    

    { value: "pro_type" },
                         
    {
      type: "address",
      transform_1: (val) => {
        return `${val.pro_locality}, ${val.pro_sub_district ? val.pro_sub_district + ", " : ""}${val.pro_city}, ${val.pro_state}`;
      }
    },
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
      customClass: "dash-edit-btn",
    },
  ]}
  ];
  const handleCurreentPage = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container-fluid admin-dashboard admin-icon">
      {/* <h1>Interested In Properties</h1>
      <div className="row justify-content-between align-items-center my-2">
          <Pagination
            count={nPages}
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
            className="col-md-6"
          />
         
          
        </div> */}

        <AdminDashUpperBody
        data={data}
        handleCurreentPage={handleCurreentPage}
        //filter={filter}
        //listingids={listingids}
        //handleFilterChange={handleFilterChange}
        //handleFilterChangeprop={handleFilterChangeprop}
        //handleSearchValue={handleSearchValue}
        //handleSelectedAction={handleSelectedAction}
        //filterChange={filterChange}
        //selectedAction={selectedAction}
        //listMultipleProperty={listMultipleProperty}
        heading={"All Interested Properties"}
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
        context="dashboard"
        //dataLoaded={dataLoaded}
        nPages={nPages}
        handleCurreentPage={handleCurreentPage}
        pagination={true}
      />

      
    </div>
  );
};

export default AdminInterest;
