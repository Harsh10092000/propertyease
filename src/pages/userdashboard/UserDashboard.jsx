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
        res.data.forEach((item, i) => {
          item.serial_no = i + 1;
        });
        setData(res.data);
      });
  }, []);
  useEffect(() => {
    data.forEach((item, i) => {
      item.pro_modified_id = 5000 + parseInt(item.pro_id);
    });
  }, [data]);

  //useEffect(() => {
  // data &&
  //   data.forEach((item, i) => {
  //     item.serial_no = i + 1;
  //   });
  // }, [data])

  const [searchValue, setSearchValue] = useState("");
  const filteredData = data.filter(
    (code) =>
      code.pro_locality.toLowerCase().includes(searchValue.toLowerCase()) ||
      code.pro_sub_district.toLowerCase().includes(searchValue.toLowerCase()) ||
      code.pro_pincode.startsWith(searchValue) ||
      code.pro_modified_id.toString().startsWith(searchValue) ||
      code.pro_city.toLowerCase().includes(searchValue.toLowerCase()) ||
      code.pro_state.toLowerCase().startsWith(searchValue.toLowerCase())
  );
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

  // Create a new string in the format "26 March 2024"
  //const formattedDate = `${day} ${month} ${year}`;

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
                      {/* <th>Property Type</th> */}
                      <th>Sale/Rent</th>
                      <th>Price</th>
                      <th>Posted On</th>
                      <th>Property Title</th>
                      {/* <th>Address</th> */}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    {records.map((item, index) => (
                      <tr key={index}>
                        <td>{item.serial_no}</td>
                        {/* <td>{5000 + parseInt(item.pro_id)}</td> */}
                        <td>{item.pro_type.split(",")[0]}</td>
                        <td>{item.pro_ad_type}</td>
                        <td>
                          {item.pro_amt
                            ? item.pro_amt + " " + item.pro_amt_unit
                            : "-"}
                        </td>
                        {/* <td>{item.pro_date }</td> */}
                        {<td>{FormatDate(item.pro_date)}</td>}
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
                        {/* <td>{item.pro_locality},&nbsp;
                                {item.pro_sub_district
                                  ? item.pro_sub_district + ", "
                                  : ""}
                                {item.pro_city},&nbsp;
                                  {item.pro_state}</td> */}
                        <td>
                          <button
                            title="Edit Your Property"
                            className="btn btn-primary btn-sm vbtn"
                          >
                            {/* <Link to={"/editProperty/" + item.pro_id}> */}
                            <Link to={`/editProperty/${
                                    item.pro_area_size.toLowerCase() +
                                    "-" +
                                    item.pro_area_size_unit.toLowerCase().replaceAll(" ","-").replaceAll(".", "") +
                                    "-"
                                  }${
                                    item.pro_type
                                      ? item.pro_type
                                          .split(",")[0]
                                          .toLowerCase()
                                          .replaceAll(" ", "-")
                                      : ""
                                  }-for-${
                                    item.pro_ad_type === "rent"
                                      ? "rent"
                                      : "sale"
                                  }-in-${item.pro_locality
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${item.pro_city
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${item.pro_id}`}>
                              <a
                                target="_blank"
                                className="btn btn-primary btn-sm "
                              >
                                <IconEdit className="admin-faicon" />
                              </a>
                            </Link>
                          </button>
                          <Link to={`/${
                                    item.pro_area_size.toLowerCase() +
                                    "-" +
                                    item.pro_area_size_unit.toLowerCase().replaceAll(" ","-").replaceAll(".", "") +
                                    "-"
                                  }${
                                    item.pro_type
                                      ? item.pro_type
                                          .split(",")[0]
                                          .toLowerCase()
                                          .replaceAll(" ", "-")
                                      : ""
                                  }-for-${
                                    item.pro_ad_type === "rent"
                                      ? "rent"
                                      : "sale"
                                  }-in-${item.pro_locality
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${item.pro_city
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${item.pro_id}`}>
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
