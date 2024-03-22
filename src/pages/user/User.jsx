import * as React from "react";
import { IconLogout, IconStarFilled } from "@tabler/icons-react";
import { IconBuilding, IconCategory, IconEye } from "@tabler/icons-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const User = () => {
  const navigate = useNavigate();
  const { currentUser, clearUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
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
  return (
    <div>
      <div className="studentLayout">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="brand">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="Propertyease Logo"
                className="img-fluid logo-only-mobile"
              />
            </Link>
          </div>
          <div id="navbar-menu">
            <ul className="nav">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {currentUser[0].login_email}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </ul>
          </div>
        </nav>
        <a href="#" className="mobile-menu">
          <span>
            {/* <FontAwesomeIcon
            className="sidebar-faiconNew"
            icon={faBars}
            onClick={() => handleNewtoogleClick()}
          /> */}
          </span>
          MENU
        </a>
        <div id="sidebar-nav" className={"sidebar mobile-show "}>
          <div className="sidebar-scroll">
            <div className="brand">
              <Link to="/">
                <img src="/images/white-logo.png" alt="Propertyease logo" />
              </Link>
            </div>

            <nav>
              <ul className="nav">
                <li>
                  <Link to="/user/dashboard">
                    <div
                      title="My Listed Properties"
                      className="d-flex align-items-center"
                    >
                      <IconCategory className="sidebar-faicon" />
                      My Listed Properties
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/addproperty">
                    <div
                      title="Add Property"
                      className="d-flex align-items-center"
                    >
                      <IconBuilding className="sidebar-faicon" />
                      Add Property
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/allproperties">
                    <a title="View All Properties">
                      <IconEye />
                      <span>View All Properties</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/user/shortlisted">
                    <a title="Shortlisted">
                      <IconStarFilled className="sidebar-faicon" />
                      <span>Shortlisted</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/user/userProfileForm">
                    <a title="userProfileForm">
                      <IconStarFilled className="sidebar-faicon" />
                      <span>userProfileForm</span>
                    </a>
                  </Link>
                </li>
                <li onClick={logout} className="pointer">
                  <a title="Logout">
                    <IconLogout className="sidebar-faicon" />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="mainmain">
        <Outlet />
      </div>
    </div>
  );
};

export default User;
