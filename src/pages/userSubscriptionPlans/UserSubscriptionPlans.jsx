import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Snackbar } from "@mui/material";
import Loader from "../../components/loader/Loader";
import UserNav from "../../components/userWrapper/UserNav";
import UserFilterSerach, {
  UserFilterDesgin,
} from "../../components/userWrapper/UserFilterSerach";
import UserTableStructure from "../../components/userWrapper/UserTableStructure";
import UserTableHead from "../../components/userWrapper/UserTableHead";
import UserTableBody from "../../components/userWrapper/UserTableBody";
import { TransformDate } from "../../components/userWrapper/TransformTernary";
import PlanStatus, {
  AdminGranted,
  NoActivePlan,
  PlanExpired,
} from "../../components/userWrapper/PlanStatus";

const UserSubscriptionPlans = () => {
  const { currentUser, clearUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [snackQ, setSnackQ] = useState(false);
  const [snack, setSnack] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [change, setChange] = useState(0);
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [activePlanData, setActivePlanData] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/proplan/fetchProPlanDataBId/${currentUser[0].login_id}`
      )
      .then((res) => {
        if (res.data === "failed") {
          clearUser();
        } else {
          res.data.forEach((item, i) => {
            item.serial_no = i + 1;
          });
          setData(res.data);
          setDataLoaded(true);
        }
      });

    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/proplan/fetchCurrentPlanDataById/${currentUser[0].login_id}`
      )
      .then((res) => {
        if (res.data === "failed") {
          clearUser();
        } else {
          setActivePlanData(res.data);
        }
      });
  }, []);

  useEffect(() => {
    data.forEach((item, i) => {
      item.tran_modified_id = 9000 + parseInt(item.tran_id);
    });
  }, [data, change]);

  const [filteredData, setFilteredData] = useState([]);
  const [filterChange, setFilterChange] = useState(1);

  useEffect(() => {
    setFilteredData(
      data.filter((code) => {
        if (filter === "Active") {
          return (
            parseInt(code.plan_status) === 1 || parseInt(code.plan_status) === 2
          );
        } else if (filter === "Expired") {
          return (
            (parseInt(code.plan_status) === 0 ||
              parseInt(code.plan_status) === 3) &&
            code.payment_status !== "Failed"
          );
        } else if (filter === "All") {
          return true;
        }
      })
      .filter((code) =>
         //code.tran_amt.toLowerCase().includes(searchValue.toLowerCase()) ||
         code.transaction_id.toLowerCase().toString().startsWith(searchValue.toLowerCase())
       )
    );
  }, [filterChange, data]);

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const theadArray = [
    // { value: "Transaction Id" },
    // { value: "Plan Name" },
    // { value: "Transaction Date" },
    // { value: "Transaction Amount" },
    // { value: "Plan Started On" },
    // { value: "Plan Expired On" },
    // { value: "Subscription Plan Status" },
    // // { value: "Payment Id" , customClass: "th-width-2" },
    // //{ value: "Order Id" },
    // { value: "Payment Status" },

    { value: "SNo." },
    { value: "Tran Id" },
    { value: "Plan Name" },
    { value: "Transaction Amount" },
    { value: "Plan Started On" },
    { value: "Plan Expired On" },
    // { value: "Order Id" },
    { value: "Payment Id" },
    // { value: "Plan Status" },
    { value: "Payment Status" },
  ];

  const handleCurreentPage = (value) => {
    setCurrentPage(value);
  };
  const handleFilterChange = (value) => {
    setFilter(value);
  };
  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  const handleFilterChangeprop = (value) => {
    setFilterChange(value);
  };

  const filterOptions = ["All", "Active", "Expired"];

  return (
    <div className="container-fluid admin-dashboard admin-icon">
      {loader ? <Loader /> : ""}
      <Snackbar
        ContentProps={{
          sx: {
            background: "red",
            color: "white",
            textAlign: "center",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackQ}
        autoHideDuration={1000}
        onClose={() => setSnackQ(false)}
        message={"Property Delisted"}
      />
      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
            textAlign: "center",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack}
        autoHideDuration={1000}
        onClose={() => setSnack(false)}
        message={"Property Listed"}
      />

      <UserNav data={data?.length} heading={"My Transactions"}>
        <UserFilterDesgin
          filterOptions={filterOptions}
          filter={filter}
          filterChange={filterChange}
          handleFilterChange={handleFilterChange}
          handleCurreentPage={handleCurreentPage}
          handleFilterChangeprop={handleFilterChangeprop}
        />
        <UserFilterSerach
          handleCurreentPage={handleCurreentPage}
          handleSearchValue={handleSearchValue}
          handleFilterChangeprop={handleFilterChangeprop}
          filterChange={filterChange}
        />
      </UserNav>
{console.log("activePlanData : " , activePlanData)}
      {activePlanData.length > 0 && ( activePlanData[0].is_lifetime_free === 1 ? (
        <AdminGranted />
      ) : activePlanData[0].login_plan_status === 0 ? (
        <NoActivePlan />
      ) : activePlanData[0].login_plan_status === 1 || activePlanData[0].login_plan_status === 2 ? (
        <div class="wg-box">
          <div className="card-body table-border-style table-text-infor">
            <PlanStatus activePlanData={activePlanData} />
          </div>
        </div>
      ) : activePlanData[0].login_plan_status === 3 ? (
        <div class="wg-box">
          <div className="card-body table-border-style table-text-infor">
            <PlanExpired activePlanData={activePlanData} />
          </div>
        </div>
      ) : (
        <></>
      ))}

      {/* <NoActivePlan />
        <AdminGranted /> */}

      {/* <DashUpperBody
        data={data}
        handleCurreentPage={handleCurreentPage}
        filter={filter}
        handleFilterChange={handleFilterChange}
        handleFilterChangeprop={handleFilterChangeprop}
        handleSearchValue={handleSearchValue}
        filterChange={filterChange}
        heading={"My Transactions"}
        filterOptions={filterOptions}
        filterAva={true}
        selectedActionsAva={false}
        searchAva={true}
      /> */}

      <UserTableStructure
        datalen={data?.length}
        pagination={true}
        nPages={nPages}
        handleCurreentPage={handleCurreentPage}
        recordsPerPage={recordsPerPage}
      >
        <UserTableHead theadArray={theadArray} />
        <UserTableBody>
          {records.map((item, index) => (
            <tr key={index}>
              <td>{item.serial_no}</td>
              <td>{item.transaction_id}</td>
              <td>{item.plan_name}</td>
              <td>{item.transaction_amt}</td>
              <td>{TransformDate(item.purchase_date)}</td>
              <td>{TransformDate(item.expiry_date)}</td>
              <td>{item.payment_id}</td>
              <td>{item.payment_status}</td>
            </tr>
          ))}
        </UserTableBody>
      </UserTableStructure>

      {/*     
      <DashTable
        theadArray={theadArray}
        tbodyArray={tbodyArray}
        compData={records}
        context="subpage"
        dataLoaded={dataLoaded}
        nPages={nPages}
        handleCurreentPage={handleCurreentPage}
        pagination={true}
      /> */}
    </div>
  );
};

export default UserSubscriptionPlans;
