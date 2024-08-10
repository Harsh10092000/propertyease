import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Snackbar } from "@mui/material";
import Loader from "../../components/loader/Loader";
import moment from "moment";
import { DashUpperBody } from "../../components/userDasboardComp/DashTbody";
import DashTable from "../../components/userDasboardComp/DashTable";

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
      data
        .filter((code) => {
          if (filter === "Active") {
            return (
              parseInt(code.plan_status) === 1 ||
              parseInt(code.plan_status) === 2
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
        .filter(
          (code) =>
            code.tran_amt.toLowerCase().includes(searchValue.toLowerCase()) ||
            code.tran_modified_id.toString().startsWith(searchValue)
        )
    );
  }, [filterChange, data]);

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const theadArray = [
    { value: "SNo." },
    { value: "Transaction Id" },
    { value: "Plan Name" },
    { value: "Transaction Date" },
    { value: "Transaction Amount" },
    { value: "Plan Started On" },
    { value: "Plan Expired On" },
    { value: "Subscription Plan Status" },
    // { value: "Payment Id" , customClass: "th-width-2" },
    //{ value: "Order Id" },
    { value: "Payment Status" },
  ];

  const tbodyArray = [
    { value: "serial_no" },
    // { value: "tran_id", transform: (id) => 9000 + parseInt(id) },
    { value: "tran_modified_id" },
    { value: "plan_name" },
    {
      value: "tran_date",
      transform: (date) => moment(date).format("MMMM DD YYYY"),
    },
    { value: "tran_amt" },

    {
      type: "conditional",
      condition: "payment_status",
      trueConditions: [
        {
          value: "list_plan_starts_on",
          transform: (item) => {
            return moment(item.list_plan_starts_on).format("MMMM DD YYYY");
          },
        },
        {
          value: "plan_end_date",
          transform: (item) => {
            const startDate = moment(item.list_plan_starts_on);
            const endDate = startDate.add(
              parseInt(item.list_plan_valid_for_days),
              "days"
            );
            return parseInt(item.plan_status) === 1 ||
              parseInt(item.plan_status) === 0
              ? endDate.format("MMMM DD YYYY")
              : "-";
          },
        },
        // {
        //   value: "plan_status",
        //   transform: (status) => {
        //     const statusMap =
        //     {
        //       1: "Active",
        //       2: "Access Granted By Admin",
        //       0: "Expired",

        //     };
        //     // const statusMap = {
        //     //   1: { text: "Active", className: "current-status-green" },
        //     //   2: { text: "Access Granted By Admin22", className: "current-status-green" },
        //     //   0: { text: "Expired", className: "current-status-red" },
        //     // };
        //     return statusMap[parseInt(status.plan_status)] ||"Access Removed By Admin"
        //   }
        // }
      ],
      falseConditions: [
        { value: "-", transform: () => "-" },
        { value: "-", transform: () => "-" },
        // { value: "-", transform: () => "-" }
      ],
    },
    // { value: "payment_id" },
    // { value: "order_id" },
    {
      type: "plan_status_cond",
      statusMap: [
        { value: 1, text: "Active", className: "current-status-green" },
        {
          value: 2,
          text: "Access Granted By Admin",
          className: "current-status-green",
        },
        { value: 0, text: "Expired", className: "current-status-red" },
        {
          value: 3,
          text: "Access Removed By Admin",
          className: "current-status-red",
        },
      ],
    },

    { value: "payment_status" },
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

      <DashUpperBody
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
      />

      <DashTable
        theadArray={theadArray}
        tbodyArray={tbodyArray}
        compData={records}
        context="subpage"
        dataLoaded={dataLoaded}
        nPages={nPages}
        handleCurreentPage={handleCurreentPage}
        pagination={true}
      />

    </div>
  );
};

export default UserSubscriptionPlans;
