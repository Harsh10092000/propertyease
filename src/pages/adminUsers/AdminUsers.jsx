import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
const AdminUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/admin/fetchUsers1")
      .then((res) => {
        setData(res.data);
      });
  }, []);

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


  return (
    <div>
      <div className="card-body table-border-style">
        <h1>All Users</h1>
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
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Sno.</th>
                <th>User Id</th>
                <th>User Type</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  {/* <td>{index + 1}</td> */}
                  <td>{item.serial_no}</td>
                  <td>{item.login_id}</td>
                  <td>{item.agent_type !== null ? item.agent_type  : "-"}</td>

                  <td>{item.login_email}</td>
                  <td>+91{item.login_number}</td>
                  <td>{item.agent_type === "Agent" ? 
                  <Link to={`/agentProfile/${item.login_id}`}>
                   <button title="View Your Property"
                              className="btn btn-primary btn-sm vbtn"
                            >
                              <a className="btn btn-primary btn-sm ">
                                View Profile
                              </a>
                            </button>
                  </Link>
                  : <span className="pl-3">-</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
