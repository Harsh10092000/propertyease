import { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { AdminNav } from "../../components/adminWrapper/AdminNav";
import AdminTableStructure from "../../components/adminWrapper/AdminTableStructure";
import AdminTableHead from "../../components/adminWrapper/AdminTableHead";
import AdminTableBody from "../../components/adminWrapper/AdminTableBody";
import {
  TransformDate,
} from "../../components/adminWrapper/TransformTernary";


const AdminProPlanTran = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);

  //const records = data.slice(firstIndex, lastIndex);
  //const nPages = Math.ceil(data.length / recordsPerPage);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/proplan/fetchProPlanTran")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });
  useEffect(() => {
    data.forEach((item, i) => {
      item.tran_modified_id = 9000 + parseInt(item.tran_id);
    });
  }, [data]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All");
  const filteredData = data.filter(
    (code) =>
      code.plan_name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      //code.ad_type.toLowerCase().includes(searchValue.toLowerCase()) ||
      code.tran_modified_id.toString().startsWith(searchValue) ||
      code.payment_id.toString().startsWith(searchValue) ||
      code.order_id.toString().startsWith(searchValue)
  );

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const theadArray = [
    // { value: "Sno." },
    { value: "Tran Id" },
    { value: "User Id" },
    { value: "Plan Id" },
    { value: "Plan Name" },
    { value: "Plan Amount" },
    { value: "Transaction Amount" },
    { value: "Discount" },
    { value: "Plan Started On" },
    { value: "Plan Expired On" },
    // { value: "Order Id" },
    { value: "Payment Id" },
    { value: "Payment Status" },
    { value: "Plan Status" },
  ];

  const handleCurreentPage = (value) => {
    setCurrentPage(value);
  };

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  return (
    <div className="container-fluid admin-dashboard admin-icon">
      <AdminNav data={data?.length} heading={"All Tranactions"}>
        <TextField
          variant="outlined"
          className="col-md-5 mt-2"
          size="small"
          label="Search Tranactions"
          value={searchValue}
          onChange={(e) => {
            setCurrentPage(1);
            setSearchValue(e.target.value);
          }}
        />
      </AdminNav>


      <AdminTableStructure
        datalen={data?.length}
        pagination={true}
        nPages={nPages}
        handleCurreentPage={handleCurreentPage}
        recordsPerPage={recordsPerPage}
      >
        <AdminTableHead theadArray={theadArray} />
        <AdminTableBody>
          {records.map((item, index) => (
            <tr key={index}>
              {/* <td>{item.serial_no}</td> */}
              <td>{item.transaction_id}</td>
              <td>{item.user_id}</td>
              <td>{item.plan_id}</td>
              <td>{item.plan_name}</td>
              <td>₹ {item.plan_amt}</td>
              <td>₹ {item.transaction_amt}</td>
              <td>{item.plan_dis}</td>
              <td>{TransformDate(item.purchase_date)}</td>
              <td>{TransformDate(item.expiry_date)}</td>

              {/* <td>{item.order_id}</td> */}
              <td>{item.payment_id}</td>

              <td>{item.payment_status}</td>
              <td>
                {item.plan_status === 1 ? (
                  <span className="current-status-green">Active</span>
                ) : (
                  <span className="current-status-red">Expired</span>
                )}
              </td>
            </tr>
          ))}
        </AdminTableBody>
      </AdminTableStructure>
    </div>
  );
};

export default AdminProPlanTran;
