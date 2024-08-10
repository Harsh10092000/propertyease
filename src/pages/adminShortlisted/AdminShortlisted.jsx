import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";
import Pagination from "@mui/material/Pagination";
import { AdminDashUpperBody } from "../../components/adminDashboardComp/AdminDashTbody";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import {
  faEye,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import AdminDashTable from "../../components/adminDashboardComp/AdminDashTable";

const AdminShortlisted = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/admin/fetchShorlist")
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
    { value: "Email" },
    { value: "Phone" },
    { value: "Property Type" },
    { value: "Address" },
    { value: "Status" },
    { value: "Actions" },
  ];

  

  

  const tbodyArray = [
   
    
    { value: "serial_no" },
    { value: "pro_id", transform: (id) => 5000 + parseInt(id) },
    { value: "login_email" },
    {
      value: "login_number",
      transform: (val) => `+91 ${val}`,
    },
    { value: "pro_type" },
    { type: "conditional", condition: "status" },
    // { type: "conditional", condition: "status" },

    // {item.pro_locality},&nbsp;
    //                             {item.pro_sub_district
    //                               ? item.pro_sub_district + ", "
    //                               : ""}
    //                             {item.pro_city},&nbsp;
    //                               {item.pro_state}

    {
      type: "address",
      transform_1: (val) => {
        return `${val.pro_locality}, ${val.pro_sub_district ? val.pro_sub_district + ", " : ""}${val.pro_city}, ${val.pro_state}`;
      }
    },
    {type: "conditional-btns-links",
      conditons: [

    // {
    //   type: "link",
    //   condition: "edit_btn",
    //   icon: (
    //     <FontAwesomeIcon
    //       icon={faPencilAlt}
    //       className="font-awe-icon-edit"
    //       title="Edit property"
    //     />
    //   ),
    //   to: "/editProperty",
    //   customClass: "dash-edit-btn",
    // },
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

    // {
    //   type: "button",
    //   delisttitle: "Click to Dislist your property",
    //   listtitle: "Click to List your property",
    //   condition: "list_delist_btn",
    //   classdelist: "btn btn-danger btn-sm vbtn",
    //   classlist: "btn btn-success btn-sm vbtn",
    //   displayVal1: "List Again",
    //   displayVal2: "Delist",
    //   checkval: "pro_listed",
    //   cond1: 1,
    //   cond2: null,
    // },
  ]}
    // {value: `Actions`},
  ];
  const handleCurreentPage = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container-fluid admin-dashboard admin-icon">
      {/* <h1>Shortlisted</h1>
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
        heading={"All Shortlisted Properties"}
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

      {/* <div className="table-responsive">
      
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Property Type</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => (
               item.pro_id !== null &&
              <tr key={index}>
                
                <td>{item.serial_no}</td>
                <td>{item.login_email}</td>
                <td>+91{item.login_number}</td>
                <td>{item.pro_type}</td>
                <td>{item.pro_locality},&nbsp;
                                {item.pro_sub_district
                                  ? item.pro_sub_district + ", "
                                  : ""}
                                {item.pro_city},&nbsp;
                                  {item.pro_state}</td>
                <td className="d-flex gap-3">
                  
                  <Link
                  to={`/${item.pro_url}`}
                        // to={`/${
                        //   item.pro_area_size.toLowerCase() +
                        //   "-" +
                        //   item.pro_area_size_unit
                        //     .toLowerCase()
                        //     .replaceAll(" ", "-")
                        //     .replaceAll(".", "") +
                        //   "-"
                        // }${
                        //   item.pro_type
                        //     ? item.pro_type
                        //         .split(",")[0]
                        //         .toLowerCase()
                        //         .replaceAll(" ", "-")
                        //     : ""
                        // }-for-${
                        //   item.pro_ad_type === "rent" ? "rent" : "sale"
                        // }-in-${item.pro_locality
                        //   .toLowerCase()
                        //   .replaceAll(" ", "-")}-${item.pro_city
                        //   .toLowerCase()
                        //   .replaceAll(" ", "-")}-${item.pro_id}`}
                      >
                        <button className="view" title="View">
                          <IconEye />
                        </button>
                      </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default AdminShortlisted;
