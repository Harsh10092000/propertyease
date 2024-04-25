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
  IconCaretDownFilled
} from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const Admin = () => {
  const { clearAdmin } = useContext(AdminContext);
  const [adsSubMenu, setAdsSubMenu] = useState(false);
  const logout = () => {
    localStorage.removeItem("admin");
    clearAdmin();
  };
  return (
    <div>
      <div className="studentLayout">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="brand">
            <Link to="/admin/dashboard">
              <img
                src="/images/logo.png"
                alt="Propertyease Logo"
                className="img-responsive logo-only-mobile"
              />
            </Link>
          </div>
        </nav>
        <a to="#" className="mobile-menu">
          <span>
            <IconMenu />
          </span>
          MENU
        </a>
        <div id="sidebar-nav" className={"sidebar mobile-show"}>
          <div className="sidebar-scroll">
            <div className="brand">
              <Link to="/">
                <img src="/images/white-logo.png" alt="coursemetnor Logo" />
              </Link>
            </div>
            <nav>
              <ul className="nav">
                <li>
                  <Link to="/admin/dashboard">
                    <a title="Dashboard">
                      <IconUser />
                      <span>Dashboard</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/allUsers">
                    <a title="All Users">
                      <IconUsers />
                      <span>All Users</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/shortlisted">
                    <a title="Shortlisted">
                      <IconStar />
                      <span>Shortlisted</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/interested">
                    <a title="Interested">
                      <IconSend />
                      <span>Interested</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/requirements">
                    <a title="Post Requirements">
                      <IconSend />
                      <span>Post Requirements</span>
                    </a>
                  </Link>
                </li>
                <li>
                  {/* <Link to="/admin/adslist"> */}
                    <a title="Ads" onClick={() => setAdsSubMenu(!adsSubMenu)}>
                      <div className="d-flex justify-content-between">

                        <div>
                      <IconAd />
                      <span>Ads</span>
                     </div>
                      <div><IconCaretDownFilled /></div>
                      </div>
                    </a>
                    
                  {/* </Link> */}
                </li>
                {adsSubMenu &&
                <>
                <li className="pl-3">
                  <Link to="/admin/adslist">
                    <a title="Ads">
                      <IconEye />
                      <span>View Ads</span>
                    </a>
                  </Link>
                </li>
                <li className="pl-3">
                  <Link to="/admin/adsform">
                    <a title="Create Ads">
                      <IconSquareRoundedPlus />
                      <span>Create Ads</span>
                    </a>
                  </Link>
                </li>
                </>
                }
                <li onClick={logout} className="pointer">
                  <a title="Logout">
                    <IconLogout />
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

export default Admin;
