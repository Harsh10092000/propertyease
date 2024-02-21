import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";

const AdminShortlisted = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/admin/fetchInterested")
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <div className="card-body table-border-style">
      <h1>Shortlisted</h1>
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
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.login_email}</td>
                <td>+91{item.login_number}</td>
                <td>{item.pro_type}</td>
                <td>{item.pro_locality + ", " + item.pro_city}</td>
                <td className="d-flex gap-3">
                  <Link
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
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminShortlisted;
