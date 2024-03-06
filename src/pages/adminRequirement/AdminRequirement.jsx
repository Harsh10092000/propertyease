import { IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
const AdminRequirement = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/postRequirement/fetchReqData")
      .then((res) => {
        setData(res.data);
        
      });
  }, []);
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

  return (
    <div className="card-body table-border-style">
      
        
      
        <div className="row justify-content-between align-items-center">
         
          <h1 className="pl-3">Interested In Properties</h1>
          <div className="col-md-3 ">

          <TextField
            variant="outlined"
            size="small"
            label="Search for queries..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          </div>
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
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{1000 + parseInt(item.data_id)}</td>
                <td>{item.data_email}</td>
                <td>+91{item.data_phone}</td>
                <td>{item.data_pro_type}</td>
                <td>{item.data_in_city}</td>

                <td>{item.data_pro_size + " " + item.data_pro_size_unit}</td>
                <td>{item.data_price_quo}</td>
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
