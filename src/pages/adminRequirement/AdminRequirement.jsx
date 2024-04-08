import { IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
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

  return (
    <div className="card-body table-border-style">
      
        
      
        <div className="row justify-content-between align-items-center">
         
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
          
        </div>

      <div className="table-responsive">
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
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => (
              <tr key={index}>
                {/* <td>{index + 1}</td> */}
                <td>{item.serial_no}</td>
                <td>{1000 + parseInt(item.data_id)}</td>
                <td>{item.data_email}</td>
                <td>+91{item.data_phone}</td>
                <td>{item.data_pro_type}</td>
                <td>{item.data_in_city}</td>

                <td>{item.data_pro_size + " " + item.data_pro_size_unit}</td>
                <td>{item.data_price_quo}</td>
                {console.log(item.data_desc)}
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
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRequirement;
