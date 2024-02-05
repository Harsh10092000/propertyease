import { IconEye, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const UserShortlisted = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchShortListProperty/${currentUser[0].login_id}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  console.log(data);
  return (
    <div className="container-fluid admin-dashboard admin-icon">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">All ShortlistedProperty</h1>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-6">
                  <h5>Shortlisted Property</h5>
                </div>
                <div className="col-md-6 text-right"></div>
              </div>
            </div>
            <div className="card-body table-border-style">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="col-md-4">Sno</th>
                      <th className="col-md-4 ">Address</th>
                      <th className="col-md-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((object, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{object.pro_locality}</td>
                          <td className="text-center">
                            <button
                              title="View"
                              className="btn btn-primary btn-sm vbtn"
                            >
                              <Link
                                href={"/property-profile/" + object.pro_id}
                                legacyBehavior
                              >
                                <a target="_blank">
                                  <IconEye />
                                </a>
                              </Link>
                            </button>
                            <button
                              title="Delete"
                              className="btn btn-danger btn-sm vbtn"
                              onClick={() => handleDelete(object._id)}
                            >
                              <IconTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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

export default UserShortlisted;
