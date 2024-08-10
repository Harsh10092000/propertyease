// import * as React from "react";
// import {
//   IconLogout,
//   IconStarFilled,
//   IconMenu2,
//   IconCategory2,
//   IconX,
//   IconCrown,
//   IconCaretDownFilled,
//   IconTicket,
// } from "@tabler/icons-react";
// import {
//   IconBuilding,
//   IconCategory,
//   IconEye,
//   IconUser,
// } from "@tabler/icons-react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { useContext, useState } from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItemText from "@mui/material/ListItemText";
// import { AuthContext } from "../../context/AuthContext";

// const User = () => {
//   const navigate = useNavigate();
//   const { currentUser, clearUser } = useContext(AuthContext);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [myPlans, setMyPlans] = useState(false);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const logout = () => {
//     localStorage.removeItem("user");
//     clearUser();
//   };

//   const [state, setState] = useState({
//     add: false,
//   });
//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }
//     setState({ ...state, [anchor]: open });
//   };
//   const closeDrawer = () => {
//     setState(false);
//   };

//   const items = [
//     {
//       icon: <IconBuilding className="sidebar-faicon" />,
//       name: "Add Property",
//       linkto: "/addproperty",
//     },
//     {
//       icon: <IconBuilding className="sidebar-faicon" />,
//       name: "View All Properties",
//       linkto: "/allproperties",
//     },
//     {
//       icon: <IconBuilding className="sidebar-faicon" />,
//       name: "My Listed Properties",
//       linkto: "/user/dashboard",
//     },
//     {
//       icon: <IconUser width={32} height={32} className="sidebar-faicon" />,
//       name: "My Profile",
//       linkto: `/user/user-profile/${currentUser[0].login_id}`,
//     },

//     {
//       icon: <IconEye className="sidebar-faicon" />,
//       name: "Shortlisted",
//       linkto: "/user/shortlisted",
//     },
//   ];

//   const list = (anchor) => (
//     <Box sx={{ width: 300 }} role="presentation">
//       {anchor === "add" ? (
//         <Box
//           sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
//           role="presentation"
//           onClick={toggleDrawer(anchor, false)}
//           onKeyDown={closeDrawer}
//         >
//           <div className="flex justify-between p-3 pt-4 ">
//             <div></div>
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <Link to="/">
//                   <img
//                     src="/images/logo.png"
//                     alt="Propertyease Logo"
//                     width={200}
//                     height={180}
//                     className="img-fluid logo-only-mobile"
//                   />
//                 </Link>
//               </div>
//               <div>
//                 <IconX
//                   className=" b-3 pointer text-slate-300"
//                   onClick={toggleDrawer("add", true)}
//                   title="Click to close Menu"
//                 />
//               </div>
//             </div>
//           </div>

//           <List className="">
//             {items.map((item, index) => (
//               <Link to={item.linkto} key={index}>
//                 <div className="p-3 m-2 d-flex pl-4 list-item">
//                   {/* <div className="list-item-icon">
//                   {item.icon}
//                   </div> */}

//                   <div className=" pl-3">
//                     <ListItemText
//                       className="list-item-text"
//                       primary={item.name}
//                     />
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </List>
//           <div className="p-3 m-2 d-flex pl-4 list-item">
//             <div className="list-item-text pl-3">Logout</div>
//           </div>
//         </Box>
//       ) : (
//         ""
//       )}
//     </Box>
//   );

//   return (
//     <React.Fragment>
//       <Drawer
//         anchor="left"
//         open={state["add"]}
//         onClose={toggleDrawer("add", false)}
//       >
//         {list("add")}
//       </Drawer>
//       <div>
//         <div className="studentLayout">
//           <nav className="navbar navbar-default navbar-fixed-top mobile-hidden-email">
//             {/* <div className="block web-hidden-pro">
//               <div className="dropdown">
//                 <div
//                   tabIndex={0}
//                   role="button"
//                   className="btn btn-ghost "
//                   aria-label="Menu"
//                 >
//                   <IconMenu2
//                     className="w-8 h-8 ml-3 mr-5"
//                     onClick={toggleDrawer("add", true)}
//                   />
//                 </div>
//               </div>
//             </div> */}
//             {/* <div className=" web-hidden-pro">

//                   <IconMenu2
//                     className="w-8 h-8 ml-3 mr-5"
//                     onClick={toggleDrawer("add", true)}
//                   />

//             </div> */}
//             <div className="brand ">
//               <Link to="/">
//                 <img
//                   src="/images/logo.png"
//                   alt="Propertyease Logo"
//                   className="img-fluid logo-only-mobile"
//                 />
//               </Link>
//             </div>
//             <div id="navbar-menu" className="">
//               <ul className="nav">
//                 <Button
//                   id="basic-button"
//                   aria-controls={open ? "basic-menu" : undefined}
//                   aria-haspopup="true"
//                   aria-expanded={open ? "true" : undefined}
//                   onClick={handleClick}
//                 >
//                   {currentUser[0].login_email}
//                 </Button>
//                 <Menu
//                   id="basic-menu"
//                   anchorEl={anchorEl}
//                   open={open}
//                   onClose={handleClose}
//                   MenuListProps={{
//                     "aria-labelledby": "basic-button",
//                   }}
//                 >
//                   <MenuItem onClick={logout}>Logout</MenuItem>
//                 </Menu>
//               </ul>
//             </div>
//           </nav>
//           <a href="#" className="mobile-menu sidebar-icon-wrapper">
//             <span className="sidebar-icon">
//               <IconCategory2
//                 className="w-8 h-8 ml-3 mr-2 "
//                 onClick={toggleDrawer("add", true)}
//               />
//               {/* <FontAwesomeIcon
//             className="sidebar-faiconNew"
//             icon={faBars}
//             onClick={() => handleNewtoogleClick()}
//           /> */}
//             </span>
//             <div className="brand logo-wrapper">
//               <Link to="/">
//                 <img src="/images/white-logo.png" alt="Propertyease logo" />
//               </Link>
//             </div>
//           </a>
//           <div id="sidebar-nav" className={"sidebar mobile-show "}>
//             <div className="sidebar-scroll">
//               <div className="brand">
//                 <Link to="/">
//                   <img src="/images/white-logo.png" alt="Propertyease logo" />
//                 </Link>
//               </div>

//               <nav>
//                 <ul className="nav">
//                   <li>
//                     <Link to="/addproperty">
//                       <div
//                         title="Add Property"
//                         className="d-flex align-items-center"
//                       >
//                         <IconBuilding className="sidebar-faicon" />
//                         Add Property
//                       </div>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/allproperties">
//                       <a title="View All Properties">
//                         <IconEye />
//                         <span>View All Properties</span>
//                       </a>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/user/dashboard">
//                       <div
//                         title="My Listed Properties"
//                         className="d-flex align-items-center"
//                       >
//                         <IconCategory className="sidebar-faicon" />
//                         My Listed Properties
//                       </div>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={`/user/user-profile/${currentUser[0].login_id}`}>
//                       <div
//                         title="My Profile"
//                         className="d-flex align-items-center"
//                       >
//                         <IconUser className="sidebar-faicon" />
//                         My Profile
//                       </div>
//                     </Link>
//                   </li>

//                   {/* <li>
//                     <Link to="/user/dashboard">
//                       <div
//                         title="My Listed Properties"
//                         className="d-flex align-items-center"
//                       >
//                         <IconCategory className="sidebar-faicon" />
//                         Subscription
//                       </div>
//                     </Link>
//                   </li> */}
//                   <li>
//                     <a
//                       title="Property Listing Plans"
//                       onClick={() => setMyPlans(!myPlans)}
//                       className="pointer"
//                     >
//                       <div className="d-flex justify-content-between">
//                         <div>
//                           <IconCrown />
//                           <span>Subscription</span>
//                         </div>
//                         <div>
//                           <IconCaretDownFilled />
//                         </div>
//                       </div>
//                     </a>
//                   </li>
//                   {myPlans && (
//                     <>
//                       <li className="pl-3">
//                         <Link to="/user/mysubscription/">
//                           <a title="View All My Transactions">
//                             <IconEye />
//                             <span>View All My Transactions</span>
//                           </a>
//                         </Link>
//                       </li>
//                     </>
//                   )}

//                   <li>
//                     <Link to="/user/shortlisted">
//                       <a title="Shortlisted">
//                         <IconStarFilled className="sidebar-faicon" />
//                         <span>Shortlisted</span>
//                       </a>
//                     </Link>
//                   </li>
//                   {/* <li>
//                   <Link to="/user/userProfileForm">
//                     <a title="userProfileForm">
//                       <IconStarFilled className="sidebar-faicon" />
//                       <span>userProfileForm</span>
//                     </a>
//                   </Link>
//                 </li> */}
//                   <li onClick={logout} className="pointer">
//                     <a title="Logout">
//                       <IconLogout className="sidebar-faicon" />
//                       <span>Logout</span>
//                     </a>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         </div>
//         <div className="mainmain">
//           <Outlet />
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default User;

import * as React from "react";
import {
  IconLogout,
  IconStarFilled,
  IconMenu2,
  IconCategory2,
  IconX,
  IconCrown,
  IconCaretDownFilled,
  IconTicket,
} from "@tabler/icons-react";
import {
  IconBuilding,
  IconCategory,
  IconEye,
  IconUser,
} from "@tabler/icons-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { AuthContext } from "../../context/AuthContext";
import "./User.css";

//import Navbar from "../../components/navbar2/Navbar";
import Navbar from "../../components/navbar/Navbar";

const User = () => {
  const navigate = useNavigate();
  const { currentUser, clearUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myPlans, setMyPlans] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.removeItem("user");
    clearUser();
  };

  const [selectedOption, setSelectedOption] = useState("My Listed Properties");

  const [state, setState] = useState({
    add: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const closeDrawer = () => {
    setState(false);
  };

  const items = [
    {
      icon: <IconBuilding className="sidebar-faicon" />,
      name: "Add Property",
      linkto: "/addproperty",
    },
    {
      icon: <IconBuilding className="sidebar-faicon" />,
      name: "View All Properties",
      linkto: "/allproperties",
    },
    {
      icon: <IconBuilding className="sidebar-faicon" />,
      name: "My Listed Properties",
      linkto: "/user/dashboard",
    },
    {
      icon: <IconUser width={32} height={32} className="sidebar-faicon" />,
      name: "My Profile",
      linkto: `/user/user-profile/${currentUser[0].login_id}`,
    },

    {
      icon: <IconCrown width={32} height={32} className="sidebar-faicon" />,
      name: "Subscription",
      linkto: null,
      subItems: [
        {
          icon: <IconEye className="sidebar-faicon" />,
          name: "View All My Transactions",
          linkto: "/user/mysubscription",
        },
      ],
    },

    {
      icon: <IconEye className="sidebar-faicon" />,
      name: "Shortlisted",
      linkto: "/user/shortlisted",
    },
  ];

  const list = (anchor) => (
    <Box sx={{ width: 300 }} role="presentation">
      {anchor === "add" ? (
        <Box
          sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={closeDrawer}
        >
          <div className="flex justify-between p-3 pt-4 ">
            <div></div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link to="/">
                  <img
                    src="/images/logo.png"
                    alt="Propertyease Logo"
                    width={200}
                    height={180}
                    className="img-fluid logo-only-mobile"
                  />
                </Link>
              </div>
              <div>
                <IconX
                  className=" b-3 pointer text-slate-300"
                  onClick={toggleDrawer("add", true)}
                  title="Click to close Menu"
                />
              </div>
            </div>
          </div>

          <List className="">
            {items.map((item, index) => (
              <Link to={item.linkto !== null && item.linkto} key={index}>
                <div className="p-3 m-2 d-flex pl-4 list-item">
                  {/* <div className="list-item-icon">
                  {item.icon}
                  </div> */}

                  <div className=" pl-3">
                    <ListItemText
                      className="list-item-text"
                      primary={item.name}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </List>
          <div className="p-3 m-2 d-flex pl-4 list-item">
            <div className="list-item-text pl-3">Logout</div>
          </div>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={state["add"]}
        onClose={toggleDrawer("add", false)}
      >
        {list("add")}
      </Drawer>
      <Navbar className="" />
      <div className="dashboard-wrapper">
        <div>
          <div className="user-dash-left ">
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
              <div className="user-dash-left-item pointer" onClick={logout}>
                <span className="pr-2">
                  <IconLogout
                    width={32}
                    height={32}
                    className="sidebar-faicon"
                  />
                </span>
                Log Out
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

export default User;
