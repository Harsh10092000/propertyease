import { useEffect, useState } from "react";
import axios from "axios";
const AdminUsers = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/admin/fetchUsers")
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <div>
      <div className="card-body table-border-style">
        <h1>All Properties</h1>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.login_email}</td>
                  <td>+91{item.login_number}</td>
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
