import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import {
  IconCircleCheck,
  IconCircleMinus,
  IconHome,
  IconEye
} from "@tabler/icons-react";
import { TextField } from "@mui/material";
import { AdminNav } from "../../components/adminWrapper/AdminNav";
import AdminTableStructure from "../../components/adminWrapper/AdminTableStructure";
import AdminTableHead from "../../components/adminWrapper/AdminTableHead";
import AdminTableBody from "../../components/adminWrapper/AdminTableBody";
import TransformTernary, {
  TransformDate,
  TransformId,
  TransformNumber,
  TransformPlanStatus,
  TransformTranId,
} from "../../components/adminWrapper/TransformTernary";
import AdminDropdownDesgin from "../../components/adminWrapper/AdminDropdownDesgin";
import {
  AdminMenuBtnDesgin,
  AdminMenuLinkDesgin,
} from "../../components/adminWrapper/AdminMenuBtnLink";


const AdminUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);

  const [change, setChange] = useState(1);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/admin/fetchUsers1")
      .then((res) => {
        setData(res.data);
      });
  }, [change]);

  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });

  const [searchValue, setSearchValue] = useState("");

  const filteredData = data.filter(
    (code) =>
      code.login_email.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      code.login_number.startsWith(searchValue) ||
      code.login_id.toString().startsWith(searchValue)
  );

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleClick = async (id) => {
    try {
      console.log("id : ", id);
      setLoader(true);
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/admin/grantAccessToListProperty",
        [id]
      );
      setChange(change + 1);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const removeAccess = async (id) => {
    setLoader(true);
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/admin/revokeAccessToListProperty",
      [id]
    );
    setChange(change + 1);
    setLoader(false);
    //setSnack(true);
  };

  const handleCurreentPage = (value) => {
    setCurrentPage(value);
  };

  const theadArray = [
    // { value: "Sno." },
    { value: "User Id" },
    { value: "User Type" },
    { value: "Email" },
    { value: "Phone" },
    { value: "Reg. Date", customClass: "th-width-2" },
    { value: "Properties listed in last 30 Days", customClass: "th-width-10" },
    { value: "Transaction Id" },
    { value: "Plan Status" },
    { value: "Actions", customClass: "th-width-12" },
  ];


  return (
    <div className="container-fluid admin-dashboard admin-icon">
      {loader ? <Loader /> : ""}

      <AdminNav data={data?.length} heading={"All Users"}>
        <TextField
          variant="outlined"
          className="col-md-5 mt-2"
          size="small"
          label="Search for Users"
          value={searchValue}
          onChange={(e) => {
            setCurrentPage(1);
            setSearchValue(e.target.value);
          }}
        />
      </AdminNav>

      <AdminTableStructure datalen={data?.length}
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
              <td>{item.login_id}</td>
              <td>{TransformTernary(item.agent_type)}</td>
              <td>{item.login_email}</td>
              <td>{TransformNumber(item.login_number)}</td>
              <td>{TransformDate(item.reg_date)}</td>
              <td>{TransformTernary(item.pro_count)}</td>
              {/* <td>{item.is_lifetime_free == 0 && item.paid_listings_remaining > 0 ? item.active_plan_id : "-"}</td> */}
              <td>
                {TransformTranId(
                  item.is_lifetime_free,
                  item.plan_status,
                  item.active_plan_id
                )}
              </td>
             
              <td>
                {TransformPlanStatus(
                  item.is_lifetime_free,
                  item.plan_status
                )}
              </td>
             
              <td>
                <AdminDropdownDesgin>
                  <AdminMenuLinkDesgin
                    className={"action_status_btn mr-2"}
                    title={"View Profile"}
                    to={`/agentProfile/${item.login_id}`}
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
                    to={`/view-properties/${item.login_id}`}
                    icon={
                      <IconHome
                        className="action-edit-icon "
                        height={19}
                        width={19}
                      />
                    }
                    name={"View Properties"}
                  />
                  {item.is_lifetime_free === 0 ? (
                    <AdminMenuBtnDesgin
                      className={"action_status_btn mr-2"}
                      title={"Grant Access"}
                      onClickFun={() => handleClick(item.login_id)}
                      icon={
                        <IconCircleCheck
                          className="action-edit-icon "
                          height={19}
                          width={19}
                        />
                      }
                      name={"Grant Access"}
                    />
                  ) : (
                    <AdminMenuBtnDesgin
                      className={"action_status_btn mr-2"}
                      title={"Revoke Access"}
                      onClickFun={() => removeAccess(item.login_id)}
                      icon={
                        <IconCircleMinus
                          className="action-edit-icon "
                          height={19}
                          width={19}
                        />
                      }
                      name={"Revoke Access"}
                    />
                  )}
                </AdminDropdownDesgin>
              </td>
            </tr>
          ))}
        </AdminTableBody>
       

      </AdminTableStructure>
      
    </div>

  );
};

export default AdminUsers;
