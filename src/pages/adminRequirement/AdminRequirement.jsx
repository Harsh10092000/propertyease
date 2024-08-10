import { IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { AdminDashUpperBody } from "../../components/adminDashboardComp/AdminDashTbody";
import AdminDashTable from "../../components/adminDashboardComp/AdminDashTable";
const AdminRequirement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/postRequirement/fetchReqData")
      .then((res) => {
        setData(res.data);
        
      });
  }, []);

  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });

  //useEffect(() => {
    data.forEach((item, i) => {
      item.query_id = 1000 + parseInt(item.data_id);
    });
  //}, [data]);
  const filteredData = data.filter(
    (code) =>
       code.query_id.toString().startsWith(searchValue) ||
      code.data_in_city.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const theadArray = [
    { value: "Sno." },
    { value: "Query Id" },
    { value: "Email" },
    { value: "Phone" },
    { value: "Property Type" },
    { value: "City" },
    { value: "Plot Size" },
    { value: "Client Budget" },
    { value: "Comments" },
  ];



  const tbodyArray = [
    { value: "serial_no" },
    { value: "data_id", transform: (id) => 1000 + parseInt(id) },
    { value: "data_email" },
    {
      value: "data_phone",
      transform: (val) => `+91 ${val}`,
    },
    { value: "data_pro_type" },
    { value: "data_in_city" },
    {
      value: "data_size",
      transform_1: (val) => {return val.data_pro_size + " " + val.data_pro_size_unit },
    },   
    { value: "data_price_quo" },     
    {
      type: "desc",
      transform_1: (val) => {
        return val.data_desc !== null && val.data_desc !== "" ? val.data_desc : "-";
      }
    },
   
  ];
  const handleCurreentPage = (value) => {
    setCurrentPage(value);
  };

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };


  return (
    <div className="container-fluid admin-dashboard admin-icon">
      
        

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
        heading={"Post Requirements"}
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

      
        {/* <div className="row justify-content-between align-items-center">
         
          <h1 className="pl-3">Post Requirements</h1>
          </div>
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
            label="Search for queries..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          
        </div> */}

      {/* <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Query Id</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Property Type</th>
              <th>City</th>
              <th>Ploat Size</th>

              <th>Client Budget</th>
              <th>Comments</th>
             
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => (
              <tr key={index}>
               
                <td>{item.serial_no}</td>
                <td>{1000 + parseInt(item.data_id)}</td>
                <td>{item.data_email}</td>
                <td>+91{item.data_phone}</td>
                <td>{item.data_pro_type}</td>
                <td>{item.data_in_city}</td>

                <td>{item.data_pro_size + " " + item.data_pro_size_unit}</td>
                <td>{item.data_price_quo}</td>
                
                <td>{item.data_desc !== null && item.data_desc !== "" ? item.data_desc : "-"}</td>
                {/* <td className="d-flex gap-3">
                  <Link
                    to={`/property/${item.pro_type
                      .split(",")[0]
                      .replace(" ", "-")}-${item.pro_ad_type.replace(
                      " ",
                      "-"
                    )}_${item.data_id}`}
                  >
                    <button className="view" title="View">
                      <IconEye />
                    </button>
                  </Link>
                </td> *
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default AdminRequirement;
