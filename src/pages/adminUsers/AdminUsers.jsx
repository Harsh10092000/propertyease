import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
const AdminUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
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

  
 

  return (
    <div>
      {loader ? <Loader /> : ""}
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
            <thead className="text-center">
              <tr>
                <th>Sno.</th>
                <th>User Id</th>
                <th>User Type</th>
                <th>Email</th>
                <th>Phone</th>
                <th>
                  Properties listed <br />
                  in last 30 Days
                </th>
                <th>Transaction Id</th>
                <th>Plan Status</th>
                <th>
                  Property Listing <br />
                  Access
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {records.map((item, index) => (
                <tr key={index}>
                  {/* <td>{index + 1}</td> */}
                  <td>{item.serial_no}</td>
                  <td>{item.login_id}</td>
                  <td>{item.agent_type !== null ? item.agent_type : "-"}</td>

                  <td>{item.login_email}</td>
                  <td>+91{item.login_number}</td>
                  <td>{item.pro_count !== null ? item.pro_count : "-"}</td>
                  <td>{item.tran_id != 0 ? 9000 + item.tran_id : "-"}</td>
                  {/* <td>{item.plan_status != 0 ? "Plan Active" : "-"}</td> */}

                  <td>
                    {parseInt(item.plan_status) === 1
                      ? "Active"
                      : parseInt(item.plan_status) === 2
                      ? "Access Granted By Admin"
                      : parseInt(item.plan_status) === 3
                      ? "Access Remove By Admin"
                      : "-"}
                  </td>

                  <td>
                    {parseInt(item.pro_plan_added_slots) === 5000 ? (
                      <button
                        title="Remove Access"
                        className="btn btn-danger btn-sm vbtn"
                        onClick={() => removeAccess(item.tran_id)}
                      >
                        Remove Access
                      </button>
                    ) : item.plan_status == 0 ? (
                      <button
                        title="Grant Access to list Property"
                        className="btn btn-success btn-sm vbtn"
                        onClick={() => handleClick(item.login_id)}
                      >
                        Grant Access <br /> to list Property
                      </button>
                    ) : (
                      <button
                        title="Plan Activated"
                        className="btn btn-primary btn-sm vbtn blocked-pointer"
                        disabled
                      >
                        Plan Activated
                      </button>
                    )}
                  </td>
                  <td>
                    {item.agent_type === "Agent" &&
                    item.count_of_properties !== null ? (
                      <>
                        <Link to={`/view-properties/${item.login_id}`}>
                          <button
                            title="View Your Property"
                            className="btn btn-primary btn-sm vbtn"
                          >
                            <a className="btn btn-primary btn-sm ">
                              View Properties
                            </a>
                          </button>
                        </Link>
                        <Link to={`/agentProfile/${item.login_id}`}>
                          <button
                            title="View Your Property"
                            className="btn btn-primary btn-sm vbtn"
                          >
                            <a className="btn btn-primary btn-sm ">
                              View Profile
                            </a>
                          </button>
                        </Link>
                      </>
                    ) : item.agent_type === "Agent" ? (
                      <Link to={`/agentProfile/${item.login_id}`}>
                        <button
                          title="View Your Property"
                          className="btn btn-primary btn-sm vbtn"
                        >
                          <a className="btn btn-primary btn-sm ">
                            View Profile
                          </a>
                        </button>
                      </Link>
                    ) : item.count_of_properties !== null ? (
                      <Link to={`/view-properties/${item.login_id}`}>
                        <button
                          title="View Your Property"
                          className="btn btn-primary btn-sm vbtn"
                        >
                          <a className="btn btn-primary btn-sm ">
                            View Properties
                          </a>
                        </button>
                      </Link>
                    ) : (
                      <span className="pl-3">-</span>
                    )}
                  </td>
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
