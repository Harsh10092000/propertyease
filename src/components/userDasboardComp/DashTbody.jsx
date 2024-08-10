import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import DashboardNavbar from "../dashboardNavbar/DashboardNavbar";
import { IconMenuDeep } from "@tabler/icons-react";
import { faHeading } from "@fortawesome/free-solid-svg-icons";

const renderComplexContent = (item) => {
  return (
    <span className="text-wrap">
      {item.pro_area_size +
        " " +
        item.pro_area_size_unit +
        " " +
        item.pro_type.split(",")[0] +
        " "}
      for {item.pro_ad_type === "Rent" ? "Rent" : "Sale"} in {item.pro_locality}
      ,&nbsp;
      {item.pro_city}
    </span>
  );
};

const renderConditional = (item, condition, transform) => {
  switch (condition) {
    case "status":
      return item.pro_listed === 1 || item.pro_listed === null ? (
        <span className="current-status-green">Listed</span>
      ) : (
        <span className="current-status-red">Delisted</span>
      );
    case "property_type":
      return item.pro_type.split(",")[0];
    case "property_price":
      return item.pro_amt ? `${item.pro_amt} ${item.pro_amt_unit}` : "-";
    // case "property_date":
    //   return FormatDate(item.pro_date);
    case "property_title":
      return renderComplexContent(item);
    case "property_location":
      return transform ? transform(item) : "-";
    default:
      return null;
  }
};

const renderConditionalLink = (item, condition, icon, to, customClass) => {
  switch (condition) {
    case "edit_btn":
      return (
        <Link className={customClass} to={`${to}/${item.pro_url}`} title="Edit Property">
          {icon}
        </Link>
      );
    case "view_btn":
      return (
        <Link
          className={customClass}
          //target="_blank"
          to={`${to}${item.pro_url}`}
          title="View Property"
        >
          {icon}
        </Link>
      );
    default:
      return null;
  }
};

const renderConditionalCheckbox = (
  item,
  condition,
  checkcond,
  checkval,
  handleCheckboxChange,
  listingids
) => {
  console.log(checkcond);
  switch (condition) {
    case "checkbox":
      return (
        <Checkbox
          size="small"
          checked={listingids.includes(item[checkval])}
          onClick={() => handleCheckboxChange(item[checkval])}
        />
      );

    default:
      return null;
  }
};

const renderConditionalButton = (
  item,
  condition,
  delisttitle,
  listtitle,
  classdelist,
  classlist,
  displayVal1,
  displayVal2,
  checkval,
  handleClickOpen,
  listProperty,
  cond1,
  cond2,
  icon,
  onClick,
  customClass
) => {
  switch (condition) {
    case "list_delist_btn":
      return (
        <>
          {item[checkval] === cond1 || item[checkval] === cond2 ? (
            <button
              title={delisttitle}
              className={classdelist}
              onClick={() => handleClickOpen(item)}
            >
              {displayVal2}
            </button>
          ) : (
            <button
              title={listtitle}
              className={classlist}
              onClick={() => listProperty(item)}
            >
              {displayVal1}
            </button>
          )}
        </>
      );
    case "delete_btn":
      return (
        <button
          title={delisttitle}
          //className={classdelist}
          className={customClass}
          onClick={() => onClick(item)}
        >
          {icon}
        </button>
      );
    default:
      return null;
  }
};

const DashTbody = ({
  tbodyArray,
  compData,
  handleCheckboxChange,
  listingids,
  handleClickOpen,
  listProperty,
}) => {
  return (
    <tbody className="text-black">
      {compData.map((item, index) => (
        <tr key={index}>
          {tbodyArray.map((property, idx) => (
            <td key={idx}>
              {
                property.type === "conditional"
                  ? renderConditional(
                      item,
                      property.condition,
                      property.transform
                    )
                  : property.type === "checkbox"
                  ? renderConditionalCheckbox(
                      item,
                      property.condition,
                      property.checkcond,
                      property.checkval,
                      handleCheckboxChange,
                      listingids
                    )
                  : property.type === "conditional-btns-links"  ? 
                  property.conditons.map((cond, index) => { 
                    if (cond.type === "link") {
                      return renderConditionalLink(
                        item,
                        cond.condition,
                        cond.icon,
                        cond.to,
                        cond.customClass
                      )
                    }
                    else if (cond.type === "button") {
                      return renderConditionalButton(
                        item,
                        cond.condition,
                        cond.delisttitle,
                        cond.listtitle,
                        cond.classdelist,
                        cond.classlist,
                        cond.displayVal1,
                        cond.displayVal2,
                        cond.checkval,
                        handleClickOpen,
                        listProperty,
                        cond.cond1,
                        cond.cond2,
                        cond.icon,
                        cond.onClick,
                        cond.customClass
                      );
                    }
                  })
                  : property.transform ? property.transform(item[property.value]) : item[property.value]
                
              }
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default DashTbody;

// const transformed = col.transform ? col.transform(item) : { text: item[col.value], className: "" };
//   return (
//     <td key={index} className={transformed.className}>
//       {transformed.text}
//     </td>
//   );

const renderConditionalColumn = (
  item,
  condition,
  trueConditions,
  falseConditions
) => {
  if (item[condition] !== "Failed") {
    return trueConditions.map((col, index) => (
      <td key={index}>
        {col.transform ? col.transform(item) : item[col.value]}
      </td>
    ));
  } else {
    return falseConditions.map((col, index) => (
      <td key={index}>
        {col.transform ? col.transform(item) : item[col.value]}
      </td>
    ));
  }
};

const renderPlanStatusColumn = (item) => {
  return item.plan_status == 0 && item.payment_status !== "Failed" ? (
    <td>
      {" "}
      <span className="current-status-red">Expired</span>{" "}
    </td>
  ) : item.plan_status == 1 ? (
    <td>
      <span className="current-status-green">Active</span>
    </td>
  ) : item.plan_status == 2 ? (
    <td>
      {" "}
      <span className="current-status-green">Access Granted By Admin</span>
    </td>
  ) : item.plan_status == 3 ? (
    <td>
      <span className="current-status-red">Access Removed By Admin</span>{" "}
    </td>
  ) : (
    <td>-</td>
  );
};

export const DashTbodySub = ({ tbodyArray, compData }) => {
  return (
    <tbody>
      {compData.map((item, index) => (
        <tr key={index}>
          {tbodyArray.map((column, colIndex) => {
            if (column.type === "conditional") {
              return renderConditionalColumn(
                item,
                column.condition,
                column.trueConditions,
                column.falseConditions,
                colIndex
              );
            } else if (column.type === "plan_status_cond") {
              return renderPlanStatusColumn(item);
            } else {
              return (
                <td key={colIndex}>
                  {column.transform
                    ? column.transform(item[column.value])
                    : item[column.value]}
                </td>
              );
            }
          })}
        </tr>
      ))}
    </tbody>
  );
};

// {tbodyArray.map((column, colIndex) => {
//   if (column.type === 'conditional') {
//     return renderConditionalColumn(item, column.condition, column.trueConditions, column.falseConditions, colIndex);
//   } else if (column.type === 'plan_status_cond') {
//     return renderPlanStatusColumn(item, column, colIndex);
//   } else {
//     return (
//       <td key={colIndex}>
//         {column.transform ? column.transform(item[column.value]) : item[column.value]}
//       </td>
//     );
//   }
// })}

export const DashUpperBody = ({
  data,
  filter,
  listingids,
  handleFilterChange,
  handleFilterChangeprop,
  handleSearchValue,
  handleSelectedAction,
  handleCurreentPage,
  filterChange,
  selectedAction,
  listMultipleProperty,
  heading,
  filterOptions,
  selectedActions,
  filterAva,
  selectedActionsAva,
  searchAva
}) => {
  return (
    <div className="dashboard-upper-sec">
      <div className="dash-upper-text-content ">
        <IconMenuDeep /> Dasboard Navigation
      </div>
      {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">All Property</h1>
      </div> */}
      <div className="row justify-content-between align-items-center my-2">
        <div className="d-flex col-md-6 col-sm-12 ">
          <div className="d-flex justify-content-between">
            <div className="dash-header-heading">
              {heading}
              <span class="badge">{data?.length}</span>
            </div>
            <div className="dash-upper-text-content-2">
              {/* <IconMenuDeep /> <span className="dash-content-2">Dasboard Navigation</span> */}
              <DashboardNavbar />
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end header-menu">

        {filterAva &&

          <FormControl
            sx={{ m: 1, width: ["100%"] }}
            size="small"
            className="col-md-3 "
          >
            <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter By"
              onChange={(e) => {
                handleFilterChange(e.target.value), handleCurreentPage(1);
                handleFilterChangeprop(filterChange + 1);
              }}
            >
              {filterOptions.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
}


{selectedActionsAva &&

          <FormControl
            sx={{ m: 1, width: ["100%"] }}
            size="small"
            className="col-md-3 "
            disabled={listingids.length === 0}
            title={
              listingids.length === 0
                ? "Select item to perform this action"
                : ""
            }
          >
            <InputLabel id="demo-simple-select-label">With selected</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedAction}
              label="With selected"
              onChange={(e) => {
                handleSelectedAction(e.target.value), handleCurreentPage(1);
              }}
            >
              <MenuItem
                disabled={listingids.length === 0}
                value={"Listed Properties"}
                onClick={() => listMultipleProperty(1)}
              >
                List Again
              </MenuItem>
              <MenuItem
                disabled={listingids.length === 0}
                value={"Delisted Properties"}
                onClick={() => listMultipleProperty(0)}
              >
                Delist Properties
              </MenuItem>
            </Select>
          </FormControl>
}

{searchAva &&
          <TextField
            variant="outlined"
            className="col-md-5 mt-2"
            size="small"
            label="Search for properties..."
            onChange={(e) => {
              handleCurreentPage(1);
              handleSearchValue(e.target.value);
              handleFilterChangeprop(filterChange + 1);
            }}
          />
}
        </div>
      </div>
    </div>
  );
};
