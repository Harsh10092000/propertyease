import { IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
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

  return (
    <div className="card-body table-border-style">
      <h1>Interested In Properties</h1>
      <div className="row justify-content-between align-items-center my-2">
          <Pagination
            count={nPages}
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
            className="col-md-6"
          />
         
          
        </div>
      <div className="table-responsive">
      
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
            {records.map(
              (item, index) =>
                item.pro_id !== null && (
                  <tr key={index}>
                    {/* <td>{index + 1}</td> */}
                    <td>{item.serial_no}</td>
                    <td>{item.login_email}</td>
                    <td>+91{item.login_number}</td>
                    <td>{item.pro_type}</td>
                    <td>
                      {item.pro_locality},&nbsp;
                      {item.pro_sub_district
                        ? item.pro_sub_district + ", "
                        : ""}
                      {item.pro_city},&nbsp;
                      {item.pro_state}
                    </td>
                    <td className="d-flex gap-3">
                      <Link
                        to={`/${
                          item.pro_area_size.toLowerCase() +
                          "-" +
                          item.pro_area_size_unit
                            .toLowerCase()
                            .replaceAll(" ", "-")
                            .replaceAll(".", "") +
                          "-"
                        }${
                          item.pro_type
                            ? item.pro_type
                                .split(",")[0]
                                .toLowerCase()
                                .replaceAll(" ", "-")
                            : ""
                        }-for-${
                          item.pro_ad_type === "rent" ? "rent" : "sale"
                        }-in-${item.pro_locality
                          .toLowerCase()
                          .replaceAll(" ", "-")}-${item.pro_city
                          .toLowerCase()
                          .replaceAll(" ", "-")}-${item.pro_id}`}
                      >
                        <button className="view" title="View">
                          <IconEye />
                        </button>
                      </Link>

                      {/* <Link
                    to={`/property/${item.pro_type
                      .split(",")[0]
                      .replace(" ", "-")}-${item.pro_ad_type.replace(
                      " ",
                      "-"
                    )}_${item.pro_id}`}
                  >
                    <button className="view" title="View">
                      <IconEye />
                    </button>
                  </Link> */}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInterest;
