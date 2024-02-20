import { useEffect, useState } from "react";
import axios from "axios";
import { IconEye, IconTrashFilled } from "@tabler/icons-react";
import { Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [change, setChange] = useState(0);
  const [snack, setSnack] = useState(false);
  const records = data.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(data.length / recordsPerPage);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/admin/fetchAll")
      .then((res) => {
        setData(res.data);
      });
  }, [change]);
  const deleteProperty = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/admin/deletePro/${id}`
      );
      setChange(change + 1);
      setSnack(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
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
      <div className="card-body table-border-style">
        <h1>
          All Properties
          <Pagination
            count={nPages}
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
          />
        </h1>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Sale/Resale</th>
                <th>Owner/Agent</th>
                <th>Property Type</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.pro_ad_type}</td>
                  <td>{item.pro_user_type}</td>
                  <td>{item.pro_type}</td>
                  <td>{item.login_email}</td>
                  <td>+91{item.login_number}</td>
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
                    <button
                      className="del"
                      title="Delete"
                      onClick={() => deleteProperty(item.pro_id)}
                    >
                      <IconTrashFilled />
                    </button>
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

export default AdminDashboard;
