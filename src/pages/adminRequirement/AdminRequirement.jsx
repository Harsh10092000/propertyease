import { IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminRequirement = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/postRequirement/fetchReqData")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  console.log(data)

  return (
    <div className="card-body table-border-style">
      <h1>Interested In Properties</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Property Type</th>
              <th>City</th>
              <th>Ploat Size</th>
              
              <th>Quotation Price</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
          

            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
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
