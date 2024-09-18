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
  IconUsers,
  IconChecklist,
  IconReportAnalytics,
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

const DashboardNavbar = () => {
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
      icon: <IconUser width={32} height={32} className="sidebar-faicon" />,
      name: "My Profile",
      linkto: `/user/user-profile/${currentUser[0].login_id}`,
    },
    {
      icon: <IconBuilding className="sidebar-faicon" />,
      name: (
        <>
          List Property <span className="blink-2 blink-3 d-none d-inline">free</span>
        </>
      ),
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
      icon: <IconChecklist className="sidebar-faicon" />,
      name: "Shortlisted",
      linkto: "/user/shortlisted",
    },
    {
      icon: <IconReportAnalytics className="sidebar-faicon" />,
      name: "Insights",
      linkto: "/user/Insights/all",
    },
   
    {
      icon: <IconUsers width={32} height={32} className="sidebar-faicon" />,
      name: "Invite Friends",
      linkto: `/user/invite-user`,
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
              <Link to={item.linkto} key={index}>
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
      <IconMenuDeep onClick={toggleDrawer("add", true)} />{" "}
      <span onClick={toggleDrawer("add", true)} className="dash-content-2">
        Dasboard Navigation
      </span>
    </React.Fragment>
  );
};

export default DashboardNavbar;
