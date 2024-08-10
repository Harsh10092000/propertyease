import React from "react";
import {
  IconLogout,
  IconStarFilled,
  IconMenu2,
  IconCategory2,
  IconX,
  IconCrown,
  IconCaretDownFilled,
  IconTicket,
  IconMenuDeep,
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

const AdminDashNavbar = () => {
  const navigate = useNavigate();
  const { currentUser, clearUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myPlans, setMyPlans] = useState(false);
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
  const [openSubMenu, setOpenSubMenu] = useState(null);

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
      //icon: <IconUsers className="sidebar-faicon" />,
      name: "Dashboard",
      linkto: "/admin/dashboard",
    },

    {
      //icon: <IconUsers className="sidebar-faicon" />,
      name: "All Users",
      linkto: "/admin/allUsers",
    },
    {
      //icon: <IconStar className="sidebar-faicon" />,
      name: "Shortlisted",
      linkto: "/admin/shortlisted",
    },
    {
      //icon: <IconUser width={32} height={32} className="sidebar-faicon" />,
      name: "Interested",
      linkto: `/admin/interested`,
    },

    {
      //icon: <IconUser width={32} height={32} className="sidebar-faicon" />,
      name: "Post Requirements",
      linkto: `/admin/requirements`,
    },

    {
      //icon: <IconAd width={32} height={32} className="sidebar-faicon" />,
      name: "Ads",
      linkto: null,
      subItems: [
        {
          //icon: <IconEye className="sidebar-faicon" />,
          name: "View Ads",
          linkto: "/admin/adslist",
        },
        {
          //icon: <IconSquareRoundedPlus className="sidebar-faicon" />,
          name: "Create Ads",
          linkto: "/admin/adsform",
        },
      ],
    },

    {
      //icon: <IconHome width={32} height={32} className="sidebar-faicon" />,
      name: "Property Listing Plans",
      linkto: null,
      subItems: [
        {
          //icon: <IconSquareRoundedPlus className="sidebar-faicon" />,
          name: "Create Plans",
          linkto: "/admin/propertyplanform",
        },
        {
          //icon: <IconEye className="sidebar-faicon" />,
          name: "View Plans",
          linkto: "/admin/propertyplans",
        },

        {
          //icon: <IconEye className="sidebar-faicon" />,
          name: "View Transactions",
          linkto: "/admin/propertyplantranactions",
        },

        {
          //icon: <IconSquareRoundedPlus className="sidebar-faicon" />,
          name: "Add Discount Coupon",
          linkto: "/admin/addcoupon",
        },

        {
          //icon: <IconEye className="sidebar-faicon" />,
          name: "View Coupons",
          linkto: "/admin/viewcoupons",
        },
      ],
    },

    {
     // icon: <IconHome width={32} height={32} className="sidebar-faicon" />,
      name: "City Maps",
      linkto: null,
      subItems: [
        {
        //  icon: <IconEye className="sidebar-faicon" />,
          name: "View Maps",
          linkto: "/admin/citymaps",
        },
        {
        //  icon: <IconSquareRoundedPlus className="sidebar-faicon" />,
          name: "Add Maps",
          linkto: "/admin/citymapsform",
        },
      ],
    },

    {
      //icon: <IconSettings width={32} height={32} className="sidebar-faicon" />,
      name: "Settings",
      linkto: null,
      subItems: [
        {
         // icon: <IconMessage className="sidebar-faicon" />,
          name: "Email Settings",
          linkto: "/admin/emailsettings",
        },
        {
         // icon: <IconPhone className="sidebar-faicon" />,
          name: "Phone Number Settings",
          linkto: "/admin/numbersettings",
        },
        {
        //  icon: <IconPhone className="sidebar-faicon" />,
          name: "Email Broadcast Settings",
          linkto: "/admin/mailbroadcast",
        },
      ],
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
                              {/* <span className="pr-2">{subItem.icon}</span> */}
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
                      {/* <span className="pr-2">{item.icon}</span> */}
                      {item.name}
                    </div>
                  </Link>
                )
              )}
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
      <IconMenuDeep onClick={toggleDrawer("add", true)} />{" "}
      <span onClick={toggleDrawer("add", true)} className="dash-content-2">
        Dasboard Navigation
      </span>
    </React.Fragment>
  );
};

export default AdminDashNavbar;

