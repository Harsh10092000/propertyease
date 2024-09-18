import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
//import DashboardNavbar from "../dashboardNavbar/DashboardNavbar";
import { IconCaretDown, IconMenuDeep } from "@tabler/icons-react";
import { faHeading } from "@fortawesome/free-solid-svg-icons";
import AdminDashNavbar from "./AdminDashNavbar";

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
      return item.pro_sale_status === 0 ? (
        item.pro_listed === 1 || item.pro_listed === null ? (
          <span className="current-status-green">Listed</span>
        ) : (
          <span className="current-status-red">Delisted</span>
        )
      ) : (
        <span className="current-status-blue ">Sold Out</span>
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

const renderConditionalLink = (
  item,
  condition,
  icon,
  params,
  to,
  customClass
) => {
  switch (condition) {
    case "edit_btn":
      return (
        <Link className={`${customClass} mr-3`} to={`${to}/${item[params]}`}>
          {icon}
        </Link>
      );
    case "view_btn":
      return (
        <Link
          className={`${customClass} mr-3`}
          //target="_blank"
          to={`${to}${item.pro_url}`}
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

const renderViewProfileButton = (
  item,
  icon,
  to,
  customClass,
  span,
  transform
) => {
  return (
    // <Link className={customClass} to={transform(item)}>
    //   <span>
    //     <span>{icon}</span> <span className="hover_text">{span}</span>
    //   </span>
    // </Link>
    <Link className={`${customClass} mr-3`} to={transform(item)}>
      {icon}
    </Link>
  );
};

const renderViewProfileButton3 = (
  transform,
  item,
  icon,
  to,
  customClass,
  delisttitle,
  listtitle,
  displayVal1,
  displayVal2
) => {
  return parseInt(item.pro_plan_added_slots) === 5000 ? (
    <button
      className={`${customClass} min-btn-width btn-col-red`}
      //className={customClass}
      onClick={() => transform(item.pro_plan_added_slots, item.tran_id)}
    >
      
      <span>{icon}</span> <span className="hover_text">{displayVal2}</span>
    </button>
  ) : item.plan_status == 0 ? (
    <button
      className={`${customClass} min-btn-width btn-col-green`}
      //className={customClass}
      onClick={() => transform(item.pro_plan_added_slots, item.login_id)}
    >
      <span>{icon}</span> <span className="hover_text">{displayVal1}</span>\
      
    </button>
  ) : (
    <button
      //className={`${customClass} min-btn-width pointer-disabled `}
      className={customClass}
      disabled
    >
      <span>{icon}</span> <span className="hover_text">Plan Active</span>
      
    </button>
  );
};

// {parseInt(item.pro_plan_added_slots) === 5000 ? (
//   <button
//     title="Remove Access"
//     className="btn btn-danger btn-sm vbtn"
//     onClick={() => removeAccess(item.tran_id)}
//   >
//     Remove Access
//   </button>
// ) : item.plan_status == 0 ? (
//   <button
//     title="Grant Access to list Property"
//     className="btn btn-success btn-sm vbtn"
//     onClick={() => handleClick(item.login_id)}
//   >
//     Grant Access <br /> to list Property
//   </button>
// ) : (
//   <button
//     title="Plan Activated"
//     className="btn btn-primary btn-sm vbtn blocked-pointer"
//     disabled
//   >
//     Plan Activated
//   </button>
// )}


const renderActionButton = (cond, item, index) => {
  const isViewProfile = cond.condition === "view_profile";
  const isViewProfile3 = cond.condition === "view_profile_3";

  const handleClick = (val) => {
    if (isViewProfile3) {
      // Call the appropriate function based on val1
      val === 5000 ? removeAccess(val) : handleClick(val);
    }
  };

  return (
    <div key={index} className="action-btn">
      <div
        className={`${cond.customClass} mr-3`}
        onClick={isViewProfile ? cond.transform(item) : "#"}
        //onClick={isViewProfile3 ? () => handleClick(item) : undefined}
      >
        {cond.icon} {isViewProfile ? cond.span : cond.displayVal1 || cond.displayVal2}
      </div>
    </div>
  );
};

const DropdownMenu = ({
  item,
  property,
  handleClickOpen,
  //handleClickOpenDel,
  listProperty,
  //deleteProperty,
  updateSaleStatus,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setOpen((prev) => !prev);

  

  return (
    <div ref={dropdownRef} className="action-dropdown-wrapper">
      {/* {item.pro_sale_status !== 1 ? ( */}
      <>
        <span onClick={toggleDropdown} className="action-dropdown arrow-down">
          Actions
        </span>

        {open && (
          <div className="action-menu">
            {property.conditions.map((cond, index) => {
              if (cond.condition === "edit_btn") {
                return (
                  <div key={index} className="action-btn">
                    <Link
                      className={cond.customClass}
                      title={cond.title}
                      to={`${cond.to}/${item.pro_url}`}
                    >
                      {cond.icon} Edit
                    </Link>
                  </div>
                );
              }
              if (cond.condition === "view_profile") {
                return (
                  <div key={index} className="action-btn">
                    <Link
                      className={`${cond.customClass} mr-3`}
                      to={cond.transform(item)}
                    >
                      {cond.icon} {cond.span}
                    </Link>
                  </div>
                );
              }
              if (cond.condition === "view_profile_3") {
                return (
                  <div key={index} className="action-btn">
      {/* <div
        className={`${cond.customClass} mr-3`}
        //to={isViewProfile ? cond.transform(item) : "#"}
        onClick={() => cond.transform(item.pro_id) }
      >
        {cond.icon} {cond.displayVal1}
      </div> */}
      {parseInt(item.pro_plan_added_slots) === 5000 ? (
                      <div
                        title={cond.displayVal2}
                        className={cond.customClass}
                        onClick={() => cond.transform(item.pro_plan_added_slots, item.tran_id)}
                      >
                        {cond.icon2} {cond.displayVal2}
                      </div>
                    ) : item.plan_status == 0 ? (
                      <div
                        title={cond.displayVal1}
                        className={cond.customClass}
                        onClick={() => cond.transform(item.pro_plan_added_slots, item.login_id)}
                      >
                        {cond.icon1} {cond.displayVal1}
                      </div>
                    ) : ""}
    </div> 
//      <button
//      className={`${customClass} min-btn-width btn-col-red`}
//      //className={customClass}
//      onClick={() => transform(item.pro_plan_added_slots, item.tran_id)}
//    >
     
//      <span>{icon}</span> <span className="hover_text">{displayVal2}</span>
//    </button>
//  ) : item.plan_status == 0 ? (
//    <button
//      className={`${customClass} min-btn-width btn-col-green`}
//      //className={customClass}
//      onClick={() => transform(item.pro_plan_added_slots, item.login_id)}
//    >
//      <span>{icon}</span> <span className="hover_text">{displayVal1}</span>\
     
//    </button>
                );
              }
              if (cond.condition === "view_btn") {
                return (
                  <div key={index} className="action-btn">
                    <a
                      className={cond.customClass}
                      title={cond.title}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`/${item.pro_url}`}
                    >
                      {cond.icon} View
                    </a>
                  </div>
                );
              }
              if (cond.condition === "listing_status") {
                return (
                  <div key={index} className="action-btn">
                    {item[cond.checkval] === cond.cond1 ||
                    item[cond.checkval] === cond.cond2 ? (
                      <button
                        title={cond.delisttitle}
                        className={cond.classdelist}
                        onClick={() => handleClickOpen(item)}
                      >
                        {cond.icon2} {cond.displayVal2}
                      </button>
                    ) : (
                      <button
                        title={cond.listtitle}
                        className={cond.classlist}
                        onClick={() => listProperty(item)}
                      >
                        {cond.icon1} {cond.displayVal1}
                      </button>
                    )}
                  </div>
                );
              }
              if (cond.condition === "sale_status") {
                return (
                  <div key={index} className="action-btn">
                    {item[cond.checkval] === 0 ? (
                      <button
                        title={cond.title}
                        className={cond.customClass}
                        onClick={() => updateSaleStatus(item, 1)}
                      >
                        {cond.icon} Mark As Sold
                      </button>
                    ) : (
                      <button
                        title={cond.title}
                        className={cond.customClass}
                        onClick={() => updateSaleStatus(item, 0)}
                      >
                        {cond.icon} Mark As Unsold
                      </button>
                    )}
                  </div>
                );
              }
              if (cond.condition === "delete_btn") {
                return (
                  <div key={index} className="action-btn action_status_del_btn">
                    <button
                      title={cond.title}
                      //className={classdelist}
                      className={cond.customClass}
                      onClick={() => cond.onClick(item)}
                    >
                      {cond.icon} Delete
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </>
      {/* ) : (
        <span className="action-dropdown-blocked">Sold Out</span>
      )} */}
    </div>
  );
};

const DropdownButtons = (
  item,
  property,
  handleClickOpen,
  //handleClickOpenDel,
  listProperty,
  //deleteProperty,
  updateSaleStatus
) => {
  return (
    <>
      <DropdownMenu
        //key={index}
        item={item}
        property={property}
        handleClickOpen={handleClickOpen}
        //handleClickOpenDel={handleClickOpenDel}
        listProperty={listProperty}
        //deleteProperty={deleteProperty}
        updateSaleStatus={updateSaleStatus}
      />
    </>
  );
};

const AdminDashTbody = ({
  tbodyArray,
  compData,
  handleCheckboxChange,
  listingids,
  handleClickOpen,
  //handleClickOpenDel,
  listProperty,
  //deleteProperty,
  updateSaleStatus,
}) => {
  return (
    <tbody className="text-black">
      {compData.map(
        (item, index) =>
          item.pro_id !== null && (
            <tr key={index}>
              {tbodyArray.map((property, idx) => (
                <td key={idx}>
                  {property.type === "conditional"
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
                    : property.type === "plan_status"
                    ? renderPlanStatusColumn2(item)
                    : property.type === "conditional2"
                    ? DropdownButtons(
                        item,
                        property,
                        handleClickOpen,
                        //handleClickOpenDel,
                        listProperty,
                        //deleteProperty,
                        updateSaleStatus
                      )
                    : property.type === "conditional-btns-links"
                    ? property.conditons.map((cond, index) => {
                        if (cond.type === "link") {
                          return renderConditionalLink(
                            item,
                            cond.condition,
                            cond.icon,
                            cond.params,
                            cond.to,
                            cond.customClass
                          );
                        } else if (
                          cond.type === "view_profile" ||
                          cond.type === "view_profile_pro"
                        ) {
                          return renderViewProfileButton(
                            item,
                            cond.icon,
                            cond.to,
                            cond.customClass,
                            cond.span,
                            cond.transform
                          );
                        } else if (cond.type === "view_profile_3") {
                          return renderViewProfileButton3(
                            cond.transform,
                            item,
                            cond.icon,
                            cond.to,
                            cond.customClass,
                            cond.delisttitle,
                            cond.listtitle,
                            cond.displayVal1,
                            cond.displayVal2
                          );
                        } else if (cond.type === "button") {
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
                    : property.transform
                    ? property.transform(item[property.value])
                    : property.transform_1
                    ? property.transform_1(item)
                    : item[property.value]}
                </td>
              ))}
            </tr>
          )
      )}
    </tbody>
  );
};

export default AdminDashTbody;

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

const renderPlanStatusColumn2 = (item) => {
  // return item.plan_status == 0 && item.payment_status !== "Failed" ? (

  //     <span className="current-status-red">Expired</span>

  // ) :

  return item.plan_status == 1 ? (
    <span className="current-status-green">Active</span>
  ) : item.plan_status == 2 ? (
    <span className="current-status-green">Access Granted By Admin</span>
  ) : item.plan_status == 3 ? (
    <span className="current-status-red">Access Removed By Admin</span>
  ) : (
    "-"
  );
};

const renderPlanStatusColumn = (item) => {
  return item.plan_status == 0 && item.payment_status !== "Failed" ? (
    <td>
      <span className="current-status-red">Expired</span>{" "}
    </td>
  ) : item.plan_status == 1 ? (
    <td>
      <span className="current-status-green">Active</span>
    </td>
  ) : item.plan_status == 2 ? (
    <td>
      <span className="current-status-green line-height-18">
        Access Granted <br />
        By Admin
      </span>
    </td>
  ) : item.plan_status == 3 ? (
    <td>
      <span className="current-status-red line-height-18">
        Access Removed <br />
        By Admin
      </span>{" "}
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

export const AdminDashUpperBody = ({
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
  searchAva,
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
              <AdminDashNavbar />
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end header-menu">
          {filterAva && (
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
          )}

          {selectedActionsAva && (
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
              <InputLabel id="demo-simple-select-label">
                With selected
              </InputLabel>
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
          )}

          {searchAva && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export const FormHeading = ({ heading }) => {
  return (
    <div className="sidebar-content-heading ml-2">
      {heading}
      <div className=" mt-1 heading-divider"></div>
    </div>
  );
};

export const FormStrcture = ({ heading, children, dynamic_col }) => {
  return (
    <div className="container-fluid">
      <div className="profile-form-upper-section">
        <AdminDashUpperBody
          heading={heading}
          filterAva={false}
          selectedActionsAva={false}
          searchAva={false}
        />
      </div>

      <div className="row user-profile-form-comp">
        <div className={`col-md-${dynamic_col || "6"}`}>
          <div className="user-profile-form-wrapper ">
            <div className="form-fields">
              <div className="sidebar-content-heading ml-2">
                {heading}
                <div className=" mt-1 heading-divider"></div>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
