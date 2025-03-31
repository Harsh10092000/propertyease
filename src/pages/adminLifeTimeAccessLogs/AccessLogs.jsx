

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
import { AdminMenuLinkDesgin } from "../../components/adminWrapper/AdminMenuBtnLink";
import AdminDropdownDesgin from "../../components/adminWrapper/AdminDropdownDesgin";
import { IconEye, IconHome } from "@tabler/icons-react";


const AccessLogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);

  //const records = data.slice(firstIndex, lastIndex);
  //const nPages = Math.ceil(data.length / recordsPerPage);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/proplan/fetchAccessLogs")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });

//   useEffect(() => {
//     data.forEach((item, i) => {
//       item.log_modified_id = "LOG20" + item.log_id;
//     });
//     console.log(data);
//   }, [data]);

// useEffect(() => {
//     data.forEach((item, i) => {
//       item.log_modified_id = 200 + parseInt(item.log_id);
//     });
//     console.log(data);
//   }, [data]);


  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All");
  const filteredData = data.filter(
    (code) =>
        //code.log_modified_id?.toString().startsWith(searchValue) ||
      code.payment_status.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      code.log_id.toString().startsWith(searchValue) ||
      code.user_id.toString().startsWith(searchValue)
  );

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const theadArray = [
    { value: "Sno.", customClass: "th-width-5" },
    { value: "Log Id" },
    { value: "User Id" },
    { value: "Date" },
    { value: "Status" },
    { value: "Actions", customClass: "th-width-12" },
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
              <td>{item.serial_no}</td>
              <td>{item.log_id}</td>
              <td>{item.user_id}</td>
              <td>{TransformDate(item.created_at)}</td>
              <td>{item.payment_status == "granted" ? <span className="current-status-green">Access Granted By Admin</span> : <span className="current-status-red">Access Removed By Admin</span>}</td>
             
              <td>
                <AdminDropdownDesgin>
                  <AdminMenuLinkDesgin
                    className={"action_status_btn mr-2"}
                    title={"View Profile"}
                    to={`/agentProfile/${item.user_id}`}
                    icon={
                      <IconEye
                        className="action-edit-icon "
                        height={19}
                        width={19}
                      />
                    }
                    name={"View Profile"}
                  />
                  <AdminMenuLinkDesgin
                    className={"action_status_btn mr-2"}
                    title={"View Properties"}
                    to={`/view-properties/${item.user_id}`}
                    icon={
                      <IconHome
                        className="action-edit-icon "
                        height={19}
                        width={19}
                      />
                    }
                    name={"View Properties"}
                  />
                
                </AdminDropdownDesgin>
              </td>
            </tr>
          ))}
        </AdminTableBody>
      </AdminTableStructure>
    </div>
  );
};

export default AccessLogs;
