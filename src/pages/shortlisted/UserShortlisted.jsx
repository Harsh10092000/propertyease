import { IconEye, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Snackbar } from "@mui/material";
const UserShortlisted = () => {
  const { currentUser, clearUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [dataLoaded , setDataLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchShortListProperty/${currentUser[0].login_id}`
      )

      .then((res) => {
        console.log("res.data : ", res.data);
        if (res.data === "failed") {
          clearUser();
        } else {
          setData(res.data);
          setDataLoaded(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [count]);
  const handleDelete = async (delId) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/pro/deleteShortlist/${delId}`
      );
      setCount(count + 1);
      setSnack(true);
    } catch (err) {
      console.log(err);
    }
  };
  const [snack, setSnack] = useState(false);
  console.log(data);
  return (
    <div className="container-fluid admin-dashboard admin-icon">
      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack}
        autoHideDuration={1000}
        onClose={() => setSnack(false)}
        message={"Deleted Successfully"}
      />
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">All Shortlisted Property</h1>
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
                    {data.map(
                      (object, i) =>
                        object.pro_id !== null && (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>
                              {object.pro_locality},&nbsp;
                              {object.pro_sub_district
                                ? object.pro_sub_district + ", "
                                : ""}
                              {object.pro_city},&nbsp;
                              {object.pro_state}
                            </td>
                            <td className="text-center">
                              <button
                                title="View"
                                className="btn btn-primary btn-sm vbtn"
                              >
                                <Link to={`/${object.pro_url}`}>
                                  <a>
                                    <IconEye />
                                  </a>
                                </Link>
                              </button>
                              <button
                                title="Delete"
                                className="btn btn-danger btn-sm vbtn"
                                onClick={() =>
                                  handleDelete(object.shortlist_id)
                                }
                              >
                                <IconTrash />
                              </button>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
                {dataLoaded === true && data.length === 0 && (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="no-record-msg pt-2 pb-2">No Records Found</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserShortlisted;
