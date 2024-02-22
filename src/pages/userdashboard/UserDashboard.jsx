import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchPropertyDataByUserId/${currentUser[0].login_id}`
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);
  useEffect(() => {
    data.forEach((item, i) => {
      item.pro_modified_id = 5000 + parseInt(item.pro_id);
    });
  } , [data])
  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });
  const [searchValue, setSearchValue] = useState("");
  const filteredData = data.filter(
    (code) =>
      code.pro_locality.toLowerCase().includes(searchValue.toLowerCase()) ||
      code.pro_pincode.startsWith(searchValue) ||
      code.pro_modified_id.toString().startsWith(searchValue) ||
      code.pro_city.toLowerCase().includes(searchValue.toLowerCase())
  );
  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);
  return (
    
    <div className="container-fluid admin-dashboard admin-icon">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">All Property</h1>
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
          label="Search for properties..."
          onChange={(e) => {
            setCurrentPage(1);
            setSearchValue(e.target.value);
          }}
        />
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-6">
                  <h5>Property List</h5>
                </div>
                <div className="col-md-6 text-right"></div>
              </div>
            </div>
            <div className="card-body table-border-style">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>SNo.</th>
                      <th>Property Id</th>
                      <th>Sale/Resale</th>
                      <th>Property Title</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    {records.map((item, index) => (
                      <tr key={index}>
                        <td>{item.serial_no}</td>
                        <td>{5000 + parseInt(item.pro_id)}</td>
                        <td>{item.pro_ad_type}</td>
                        <td>
                          {" "}
                          <span className="text-wrap">
                            {item.pro_area_size +
                              " " +
                              item.pro_area_size_unit +
                              " " +
                              item.pro_type.split(",")[0] +
                              " "}
                            for {item.pro_ad_type === "Rent" ? "Rent" : "Sale"}{" "}
                            in {item.pro_locality}
                            ,&nbsp;
                            {item.pro_city}
                          </span>
                        </td>
                        <td>{item.pro_locality + ", " + item.pro_city}</td>
                        <td>
                          <button
                            title="Edit Your Property"
                            className="btn btn-primary btn-sm vbtn"
                          >
                            <Link to={"/editProperty/" + item.pro_id}>
                              <a
                                target="_blank"
                                className="btn btn-primary btn-sm "
                              >
                                <IconEdit className="admin-faicon" />
                              </a>
                            </Link>
                          </button>
                          <Link
                            to={`/property/${item.pro_type
                              .split(",")[0]
                              .replace(" ", "-")}-${item.pro_ad_type.replace(
                              " ",
                              "-"
                            )}_${item.pro_id}`}
                          >
                            <button
                              title="View Your Property"
                              className="btn btn-primary btn-sm vbtn"
                            >
                              <a className="btn btn-primary btn-sm ">
                                <IconEye className="admin-faicon" />
                              </a>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
