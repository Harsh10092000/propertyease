import { IconStarFilled } from "@tabler/icons-react";
import {
  IconBuilding,
  IconCategory,
  IconEye,
  IconLogout,
  IconMenu2,
  IconStar,
  IconUser,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const User = () => {
  return (
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
            <li></li>
            <div className="logout-hovarable">
              <a
                title="Logout"
                className="nav-link dropdown-toggle"
                href="#collapseEleven"
                id="userDropdown"
                role="button"
                data-bs-toggle="collapse"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-lg-inline text-gray-600 small">
                  {/* {userEmail} */}Akshit
                </span>
                <IconUser className="sidebar-faicon" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
                id="collapseEleven"
                data-bs-parent="#accordion"
              >
                <p
                  className="dropdown-item logout"
                  //   onClick={(e) => logout()}
                  href=""
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  {/* <FontAwesomeIcon
                    className="sidebar-faicon"
                    icon={faSignOutAlt}
                  /> */}
                  Logout
                </p>
              </div>
            </div>
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
              <img src="/images/white-logo.png" alt="coursemetnor Logo" />
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
                <Link legacyBehavior href="/addproperty">
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
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default User;
