// import { Link, Outlet, useNavigate } from "react-router-dom";
// import {
//   IconLogout,
//   IconMenu,
//   IconSend,
//   IconStar,
//   IconUser,
//   IconUsers,
//   IconSquareRoundedPlus,
//   IconEye,
//   IconAd,
//   IconCaretDownFilled,
//   IconHome,
//   IconTicket,
//   IconSettings,
//   IconMessage,
//   IconPhone,
// } from "@tabler/icons-react";
// import { useContext, useEffect, useState } from "react";
// import { AdminContext } from "../../context/AdminContext";

// const Admin = () => {
//   const { clearAdmin } = useContext(AdminContext);
//   const [adsSubMenu, setAdsSubMenu] = useState(false);
//   const [proPlanSubMenu, setProPlanSubMenu] = useState(false);
//   const [cityMapSubMenu, setCityMapSubMenu] = useState(false);
//   const [settingsMenu, setSettingsMenu] = useState(false);
//   const logout = () => {
//     localStorage.removeItem("admin");
//     clearAdmin();
//   };
//   return (
//     <div>
//       <div className="studentLayout">
//         <nav className="navbar navbar-default navbar-fixed-top">
//           <div className="brand">
//             <Link to="/admin/dashboard">
//               <img
//                 src="/images/logo.png"
//                 alt="Propertyease Logo"
//                 className="img-responsive logo-only-mobile"
//               />
//             </Link>
//           </div>
//         </nav>
//         <a to="#" className="mobile-menu">
//           <span>
//             <IconMenu />
//           </span>
//           MENU
//         </a>
//         <div id="sidebar-nav" className={"sidebar mobile-show"}>
//           <div className="sidebar-scroll">
//             <div className="brand">
//               <Link to="/">
//                 <img src="/images/white-logo.png" alt="coursemetnor Logo" />
//               </Link>
//             </div>
//             <nav>
//               <ul className="nav">
//                 <li>
//                   <Link to="/admin/dashboard">
//                     <a title="Dashboard">
//                       <IconUser />
//                       <span>Dashboard</span>
//                     </a>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/allUsers">
//                     <a title="All Users">
//                       <IconUsers />
//                       <span>All Users</span>
//                     </a>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/shortlisted">
//                     <a title="Shortlisted">
//                       <IconStar />
//                       <span>Shortlisted</span>
//                     </a>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/interested">
//                     <a title="Interested">
//                       <IconSend />
//                       <span>Interested</span>
//                     </a>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/requirements">
//                     <a title="Post Requirements">
//                       <IconSend />
//                       <span>Post Requirements</span>
//                     </a>
//                   </Link>
//                 </li>
//                 <li>
//                   <a
//                     title="Ads"
//                     onClick={() => setAdsSubMenu(!adsSubMenu)}
//                     className="pointer"
//                   >
//                     <div className="d-flex justify-content-between">
//                       <div>
//                         <IconAd />
//                         <span>Ads</span>
//                       </div>
//                       <div>
//                         <IconCaretDownFilled />
//                       </div>
//                     </div>
//                   </a>
//                 </li>
//                 {adsSubMenu && (
//                   <>
//                     <li className="pl-3">
//                       <Link to="/admin/adslist">
//                         <a title="Ads">
//                           <IconEye />
//                           <span>View Ads</span>
//                         </a>
//                       </Link>
//                     </li>
//                     <li className="pl-3">
//                       <Link to="/admin/adsform">
//                         <a title="Create Ads">
//                           <IconSquareRoundedPlus />
//                           <span>Create Ads</span>
//                         </a>
//                       </Link>
//                     </li>
//                   </>
//                 )}

//                 <li>
//                   <a
//                     title="Property Listing Plans"
//                     onClick={() => setProPlanSubMenu(!proPlanSubMenu)}
//                     className="pointer"
//                   >
//                     <div className="d-flex justify-content-between">
//                       <div>
//                         <IconHome />
//                         <span>Property Listing Plans</span>
//                       </div>
//                       <div>
//                         <IconCaretDownFilled />
//                       </div>
//                     </div>
//                   </a>
//                 </li>
//                 {proPlanSubMenu && (
//                   <>
//                     <li className="pl-3">
//                       <Link to="/admin/propertyplanform">
//                         <a title="Create Plans">
//                           <IconSquareRoundedPlus />
//                           <span>Create Plans</span>
//                         </a>
//                       </Link>
//                     </li>
//                     <li className="pl-3">
//                       <Link to="/admin/propertyplans">
//                         <a title="View Plans">
//                           <IconEye />
//                           <span>View Plans</span>
//                         </a>
//                       </Link>
//                     </li>

//                     <li className="pl-3">
//                       <Link to="/admin/propertyplantranactions">
//                         <a title="View Transactions">
//                           <IconEye />
//                           <span>View Transactions</span>
//                         </a>
//                       </Link>
//                     </li>

//                     <li className="pl-3">
//                       <Link to="/admin/addcoupon">
//                         <a title="Add Discount Coupon">
//                           <IconTicket />
//                           <span>Add Discount Coupon</span>
//                         </a>
//                       </Link>
//                     </li>

//                     <li className="pl-3">
//                       <Link to="/admin/viewcoupons">
//                         <a title="View Coupons">
//                           <IconEye />
//                           <span>View Coupons</span>
//                         </a>
//                       </Link>
//                     </li>
//                   </>
//                 )}

//                 <li>
//                   <a
//                     title="Property Listing Plans"
//                     onClick={() => setCityMapSubMenu(!cityMapSubMenu)}
//                     className="pointer"
//                   >
//                     <div className="d-flex justify-content-between">
//                       <div>
//                         <IconHome />
//                         <span>City Maps</span>
//                       </div>
//                       <div>
//                         <IconCaretDownFilled />
//                       </div>
//                     </div>
//                   </a>
//                 </li>
//                 {cityMapSubMenu && (
//                   <>
//                     <li className="pl-3">
//                       <Link to="/admin/citymaps">
//                         <a title="View Maps">
//                           <IconEye />
//                           <span>View Maps</span>
//                         </a>
//                       </Link>
//                     </li>
//                     <li className="pl-3">
//                       <Link to="/admin/citymapsform">
//                         <a title="Add Maps">
//                           <IconSquareRoundedPlus />
//                           <span>Add Maps</span>
//                         </a>
//                       </Link>
//                     </li>
//                   </>
//                 )}

//                 <li className="pointer">
//                   <a
//                     onClick={() => setSettingsMenu(!settingsMenu)}
//                     title="Settings"
//                   >
//                     <div className="d-flex justify-content-between">
//                       <div>
//                         <IconSettings />
//                         <span>Settings</span>
//                       </div>
//                       <div>
//                         <IconCaretDownFilled />
//                       </div>
//                     </div>
//                   </a>
//                 </li>
//                 {settingsMenu && (
//                   <>
//                     <li className="pl-3">
//                       <Link to="/admin/emailsettings">
//                         <a title="Email Settings">
//                           <IconMessage />
//                           <span>Email Settings</span>
//                         </a>
//                       </Link>
//                     </li>
//                     <li className="pl-3">
//                       <Link to="/admin/numbersettings">
//                         <a title="Phone Number Settings">
//                           <IconPhone />
//                           <span>Phone Number Settings</span>
//                         </a>
//                       </Link>
//                     </li>
//                     <li className="pl-3">
//                       <Link to="/admin/mailbroadcast">
//                         <a title="Email Broadcast Settings">
//                           <IconPhone />
//                           <span>Email Broadcast Settings</span>
//                         </a>
//                       </Link>
//                     </li>

//                   </>
//                 )}

//                 <li onClick={logout} className="pointer">
//                   <a title="Logout">
//                     <IconLogout />
//                     <span>Logout</span>
//                   </a>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className="mainmain">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Admin;

import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  IconLogout,
  IconMenu,
  IconSend,
  IconStar,
  IconUser,
  IconUsers,
  IconSquareRoundedPlus,
  IconEye,
  IconAd,
  IconCaretDownFilled,
  IconHome,
  IconTicket,
  IconSettings,
  IconMessage,
  IconPhone,
  IconMap,
  IconDashboard
} from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import "./admin.css";
import React from "react";
//import Navbar from "../../components/navbar2/Navbar";
import Navbar from "../../components/navbar/Navbar";
const Admin = () => {
  const { clearAdmin } = useContext(AdminContext);
  const [adsSubMenu, setAdsSubMenu] = useState(false);
  const [proPlanSubMenu, setProPlanSubMenu] = useState(false);
  const [cityMapSubMenu, setCityMapSubMenu] = useState(false);
  const [settingsMenu, setSettingsMenu] = useState(false);

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const [selectedOption, setSelectedOption] = useState("Dashboard");

  const logout = () => {
    localStorage.removeItem("admin");
    clearAdmin();
  };

  const items = [
    {
      icon: <IconDashboard className="sidebar-faicon" />,
      name: "Dashboard",
      linkto: "/admin/dashboard",
    },

    {
      icon: <IconUsers className="sidebar-faicon" />,
      name: "All Users",
      linkto: "/admin/allUsers",
    },
    {
      icon: <IconStar className="sidebar-faicon" />,
      name: "Shortlisted",
      linkto: "/admin/shortlisted",
    },
    {
      icon: <IconUser width={32} height={32} className="sidebar-faicon" />,
      name: "Interested",
      linkto: `/admin/interested`,
    },

    {
      icon: <IconUser width={32} height={32} className="sidebar-faicon" />,
      name: "Post Requirements",
      linkto: `/admin/requirements`,
    },

    {
      icon: <IconAd width={32} height={32} className="sidebar-faicon" />,
      name: "Ads",
      linkto: null,
      subItems: [
        {
          icon: <IconEye className="sidebar-faicon" />,
          name: "View Ads",
          linkto: "/admin/adslist",
        },
        {
          icon: <IconSquareRoundedPlus className="sidebar-faicon" />,
          name: "Create Ads",
          linkto: "/admin/adsform",
        },
      ],
    },

    {
      icon: <IconHome width={32} height={32} className="sidebar-faicon" />,
      name: "Property Listing Plans",
      linkto: null,
      subItems: [
        {
          icon: <IconSquareRoundedPlus className="sidebar-faicon" />,
          name: "Create Plans",
          linkto: "/admin/propertyplanform",
        },
        {
          icon: <IconEye className="sidebar-faicon" />,
          name: "View Plans",
          linkto: "/admin/propertyplans",
        },

        {
          icon: <IconEye className="sidebar-faicon" />,
          name: "View Transactions",
          linkto: "/admin/propertyplantranactions",
        },

        {
          icon: <IconSquareRoundedPlus className="sidebar-faicon" />,
          name: "Add Discount Coupon",
          linkto: "/admin/addcoupon",
        },

        {
          icon: <IconEye className="sidebar-faicon" />,
          name: "View Coupons",
          linkto: "/admin/viewcoupons",
        },
      ],
    },

    {
      icon: <IconMap width={32} height={32} className="sidebar-faicon" />,
      name: "City Maps",
      linkto: null,
      subItems: [
        {
          icon: <IconEye className="sidebar-faicon" />,
          name: "View Maps",
          linkto: "/admin/citymaps",
        },
        {
          icon: <IconSquareRoundedPlus className="sidebar-faicon" />,
          name: "Add Maps",
          linkto: "/admin/citymapsform",
        },
      ],
    },

    {
      icon: <IconSettings width={32} height={32} className="sidebar-faicon" />,
      name: "Settings",
      linkto: null,
      subItems: [
        {
          icon: <IconMessage className="sidebar-faicon" />,
          name: "Email Settings",
          linkto: "/admin/emailsettings",
        },
        {
          icon: <IconPhone className="sidebar-faicon" />,
          name: "Phone Number Settings",
          linkto: "/admin/numbersettings",
        },
        {
          icon: <IconPhone className="sidebar-faicon" />,
          name: "Email Broadcast Settings",
          linkto: "/admin/mailbroadcast",
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      {/* <Drawer
      anchor="left"
      open={state["add"]}
      onClose={toggleDrawer("add", false)}
    >
      {list("add")}
    </Drawer> */}
      <Navbar className="" />
      <div className="dashboard-wrapper">
        <div>
          <div className="user-dash-left">
            <div className="inner-user-dash-left">
              {items.map((item) =>
                item.subItems ? (
                  <div>
                    <div
                      onClick={() => {
                        if (item.subItems) {
                          setOpenSubMenu(
                            openSubMenu === item.name ? null : item.name
                          );
                        }
                      }}
                      className={`user-dash-left-item ${
                        selectedOption === item.name && "selected-dash-option"
                      }`}
                    >
                      <span className="pr-2">{item.icon}</span>
                      {item.name}
                    </div>

                    {openSubMenu === item.name && item.subItems && (
                      <div className="pl-3">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link to={subItem.linkto} key={subIndex}>
                            <div
                              onClick={() => setSelectedOption(subItem.name)}
                              className={`user-dash-left-item ${
                                selectedOption === subItem.name &&
                                "selected-dash-option"
                              }`}
                            >
                              <span className="pr-2">{subItem.icon}</span>
                              {subItem.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={item.linkto}>
                    <div
                      onClick={() => setSelectedOption(item.name)}
                      className={`user-dash-left-item ${
                        selectedOption === item.name && "selected-dash-option"
                      }`}
                    >
                      <span className="pr-2">{item.icon}</span>
                      {item.name}
                    </div>
                  </Link>
                )
              )}
              <div onClick={logout} className="user-dash-left-item pointer ">
                <span className="pr-2">
                  <IconLogout
                    width={32}
                    height={32}
                    className="sidebar-faicon"
                  />
                </span>
                Logout
              </div>
            </div>
          </div>

          <div className="mainmain">
            <Outlet />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;


