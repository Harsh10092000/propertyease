import React, { useEffect, useRef, useState } from "react";
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




const renderComplexContent = (item) => {
  return (
    <Link to={`/${item.pro_url}`} title="Click to view property" className="text-dark">
    <span className="text-wrap">
      {item.pro_area_size +
        " " +
        item.pro_area_size_unit +
        " " +
        item.pro_type?.split(",")[0] +
        " "}
      for {item.pro_ad_type === "Rent" ? "Rent" : "Sale"} in {item.pro_locality}
      ,&nbsp;
      {item.pro_city}
    </span>
    </Link>
  );
};

const renderResponsesViews = (item, totalResponses) => {
 
  return ( 
    parseInt(item.pro_views) > 0 || parseInt(item.pro_responses) > 0 ? 
    // <span>Views : {parseInt(item.pro_views) > 0 ? item.pro_views : 0 }  Responses : {parseInt(totalResponses) > 0 ? totalResponses : 0}</span>
    <div className="d-flex gap-3">
      {parseInt(item.pro_responses) > 0 ? <>
      <Link to={`/user/insights/${item.pro_id}`}><div className="info-badge info-badge-1">Views <span className="no-badge">{parseInt(item.pro_views) > 0 ? item.pro_views : 0 }</span></div></Link>
      <Link  to={`/user/insights/${item.pro_id}`}> <div className="info-badge info-badge-2">Responses <span className="no-badge">{parseInt(item.pro_responses) > 0 ? item.pro_responses : 0}</span></div></Link>
      </>: <>
    <div title="No responses yet" className="info-badge info-badge-1">Views <span className="no-badge">{parseInt(item.pro_views) > 0 ? item.pro_views : 0 }</span></div>
     <div title="No responses yet" className="info-badge info-badge-2">Responses <span className="no-badge">{parseInt(item.pro_responses) > 0 ? item.pro_responses : 0}</span></div>
    </>
   }
      </div>

    : <span>-</span>
   );
}


const renderConditional = (item, condition, transform, totalResponses) => {
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
      return item.pro_type?.split(",")[0];
    case "property_price":
      return item.pro_amt ? `${item.pro_amt} ${item.pro_amt_unit}` : "-";
    // case "property_date":
    //   return FormatDate(item.pro_date);
    case "property_title":
      return renderComplexContent(item);
    case "views":
      return renderResponsesViews(item, totalResponses);
    case "property_location":
      return transform ? transform(item) : "-";
    default:
      return null;
  }
};

// const dropdownButtons = (item, property, handleClickOpen, listProperty, updateSaleStatus) => {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setOpen(false);
//     }
//   };
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   return (
//     <>
//       <div ref={dropdownRef} className="action-dropdown-wrapper">
//         {item.pro_sale_status !== 1 ?
//         <span
//           onClick={() => setOpen(!open)}
//           className="action-dropdown arrow-down"
//         >
//           Actions
//         </span>
//         :  
//         <span
//         onClick={() => setOpen(!open)}
//         className="action-dropdown-blocked"
//       >
//         Sold Out
//       </span> }
//         {open && item.pro_sale_status !== 1 && (
//           <div className="action-menu">
//             {property.conditions.map((cond, index) =>
//               cond.condition === "edit_btn" ? (
//                 <div className="action-btn" ><Link className={cond.customClass} title={cond.title} to={`${cond.to}/${item.pro_url}`}  >{cond.icon} Edit</Link></div>
//               ) : cond.condition === "view_btn" ? (
//                 <div className="action-btn" ><a className={cond.customClass} title={cond.title} target="_blank" href={`/${item.pro_url}`} >{cond.icon} View</a></div>
//               ) : cond.condition === "listing_status" ? (
//                 <div className="action-btn" >{item[cond.checkval] === cond.cond1 || item[cond.checkval] === cond.cond2 ? (
//                   <button
//                     title={cond.delisttitle}
//                     className={cond.classdelist}
//                     onClick={() => handleClickOpen(item)}
//                   >
//                    {cond.icon2} {cond.displayVal2}
//                   </button>
//                 ) : (
//                   <button
//                     title={cond.listtitle}
//                     className={cond.classlist}
//                     onClick={() => listProperty(item)}
//                   >
//                    {cond.icon1} {cond.displayVal1}
//                   </button>
//                 )}</div>
//               ) : cond.condition === "sale_status" ? (
//                 <div className="action-btn" ><button
//                 title={cond.title}
//                 className={cond.customClass}
//                 onClick={() => updateSaleStatus(item)}
//               >
//                {cond.icon} Mark As Sold
//               </button></div>
//               ) : (
//                 ""
//               )
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };


// const dropdownButtons = (item, property, handleClickOpen, listProperty, updateSaleStatus, open, handleOpenMenu, dropdownRef) => {
//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       handleOpenMenu(false);
//     }
//   };
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   return (
    
//       <div ref={dropdownRef} className="action-dropdown-wrapper">
//         {item.pro_sale_status !== 1 ?
//         <span
//           onClick={() => handleOpenMenu(!open)}
//           className="action-dropdown arrow-down"
//         >
//           Actions
//         </span>
//         :  
//         <span
        
//         className="action-dropdown-blocked"
//       >
//         Sold Out
//       </span> }
//         {open && item.pro_sale_status !== 1 && (
//           <div className="action-menu">
//             {property.conditions.map((cond) =>
//               cond.condition === "edit_btn" ? (
//                 <div className="action-btn" ><Link className={cond.customClass} title={cond.title} to={`${cond.to}/${item.pro_url}`}  >{cond.icon} Edit</Link></div>
//               ) : cond.condition === "view_btn" ? (
//                 <div className="action-btn" ><a className={cond.customClass} title={cond.title} target="_blank" href={`/${item.pro_url}`} >{cond.icon} View</a></div>
//               ) : cond.condition === "listing_status" ? (
//                 <div className="action-btn" >{item[cond.checkval] === cond.cond1 || item[cond.checkval] === cond.cond2 ? (
//                   <button
//                     title={cond.delisttitle}
//                     className={cond.classdelist}
//                     onClick={() => handleClickOpen(item)}
//                   >
//                    {cond.icon2} {cond.displayVal2}
//                   </button>
//                 ) : (
//                   <button
//                     title={cond.listtitle}
//                     className={cond.classlist}
//                     onClick={() => listProperty(item)}
//                   >
//                    {cond.icon1} {cond.displayVal1}
//                   </button>
//                 )}</div>
//               ) : cond.condition === "sale_status" ? (
//                 <div className="action-btn" ><button
//                 title={cond.title}
//                 className={cond.customClass}
//                 onClick={() => updateSaleStatus(item)}
//               >
//                {cond.icon} Mark As Sold
//               </button></div>
//               ) : (
//                 ""
//               )
//             )}
//           </div>
//          )}
//       </div>
    
//   );
// };




const renderConditionalLink = (item, condition, icon, to, customClass) => {
  switch (condition) {
    case "edit_btn":
      return (
        <Link
          className={customClass}
          to={`${to}/${item.pro_url}`}
          title="Edit Property"
        >
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



const DropdownMenu = ({item, property, handleClickOpen, listProperty, updateSaleStatus }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setOpen(prev => !prev);

  return (
    <div ref={dropdownRef} className="action-dropdown-wrapper">
      {/* {item.pro_sale_status !== 1 ? ( */}
        <>
          <span
            onClick={toggleDropdown}
            className="action-dropdown arrow-down"
            
          >
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
                      {item[cond.checkval] === cond.cond1 || item[cond.checkval] === cond.cond2 ? (
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
                       {item[cond.checkval] === 0 ?
                      <button
                        title={cond.title}
                        className={cond.customClass}
                        onClick={() => updateSaleStatus(item, 1)}
                      >
                        {cond.icon} Mark As Sold
                      </button>
                      : 
                      <button
                        title={cond.title}
                        className={cond.customClass}
                        onClick={() => updateSaleStatus(item, 0)}
                      >
                        {cond.icon} Mark As Unsold
                      </button>
                       }
                    </div>
                  );
                }
                if (cond.condition === "delete_btn") {
                  return (
                    <div
                      key={index}
                      className="action-btn action_status_del_btn"
                    >
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
        <span className="action-dropdown-blocked">
          Sold Out
        </span>
      )} */}
    </div>
  );
};


const DropdownButtons = (item, property, handleClickOpen, listProperty, updateSaleStatus ) => {
  return (
    <>
  
        <DropdownMenu
          //key={index}
          item={item}
          property={property}
          handleClickOpen={handleClickOpen}
          listProperty={listProperty}
          updateSaleStatus={updateSaleStatus}
        />
     
    </>
  );
};



const DashTbody = ({
  tbodyArray,
  compData,
  handleCheckboxChange,
  listingids,
  handleClickOpen,
  listProperty,
  updateSaleStatus
}) => {
  // const [open, setOpen] = useState(false);
  // const dropdownRef = useRef(null);
  
  // const handleOpenMenu = (value) => {
  //   setOpen(value);
  // }
  
  
  return (
    <tbody className="text-black">
      {compData.map((item, index) => (
        <tr key={index}>
          {tbodyArray.map((property, idx) => (
            <td key={idx}>
              {property.type === "conditional"
                ? renderConditional(
                    item,
                    property.condition,
                    property.transform,
                    property.totalResponses
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
                : property.type === "conditional2"
                ? DropdownButtons(item, property, handleClickOpen,
                  listProperty,updateSaleStatus)
                : property.type === "conditional-btns-links"
                ? property.conditons.map((cond, index) => {
                    if (cond.type === "link") {
                      return renderConditionalLink(
                        item,
                        cond.condition,
                        cond.icon,
                        cond.to,
                        cond.customClass
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
                : item[property.value]}
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
  searchAva,
  updateMultipleSaleStatus,
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
        {/* {console.log(selectedAction)} */}
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
                
                <MenuItem
                  disabled={listingids.length === 0}
                  value={"Mark as Sold Out"}
                  onClick={() => updateMultipleSaleStatus(1)}
                >
                  Mark as Sold Out
                </MenuItem>

                <MenuItem
                disabled={listingids.length === 0}
                value={"Mark as Unsold"}
                onClick={() => updateMultipleSaleStatus(0)}
              >
                Mark as Unsold
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