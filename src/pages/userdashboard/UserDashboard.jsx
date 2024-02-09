import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
const UserDashboard = () => {
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
  return (
    <div className="container-fluid admin-dashboard admin-icon">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">All Property</h1>
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
                      <th>Sale/Resale</th>
                      <th>Owner/Agent</th>
                      <th>Address</th>
                      <th>Locality</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.pro_ad_type}</td>
                        <td>{item.pro_user_type}</td>
                        <td>{item.pro_city}</td>
                        <td>{item.pro_locality}</td>
                        <td>
                          <button
                            title="Edit Your Property"
                            className="btn btn-primary btn-sm vbtn"
                          >
                            <Link
                              href={"/property-edit/" + item.id}
                              legacyBehavior
                            >
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
