import {
  IconArrowRight,
  IconSearch,
  IconHome,
  IconLogin,
  IconPlus,
} from "@tabler/icons-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <header
      className="main-header"
      style={{ background: "rgba(254,254,254,0.5)" }}
    >
      <div className="container-fluid ">
        <div className="header-block">
          <div className="header-left">
            <Link to="/">
              <span className="logo">
                <img src="/images/logo.png" alt="logo" />
              </span>
            </Link>
          </div>
          {/* <div className="header-center">
            <div className="main-search">
              <div id="highlightsearchdiv">
                <div className="form-group"></div>
              </div>
            </div>
          </div> */}
          <div className="header-right d-flex flex-row ">
            <div className=" header-1">
            <Link to="/allproperties">
              <span className="search justify-content-center">
                <IconSearch className="sidebar-faicon pr-1"  />
                <span>
                  Search <span className="d-none d-inline">Properties</span>
                </span>
              </span>
            </Link>
            <Link to="/addproperty" className="list-property">
              <span className="add" title="List Property">
                <span>
                  <IconPlus className="sidebar-faicon" />
                </span>
                List Property
                <span className="blink d-none d-inline">Free</span>
              </span>
            </Link>
            </div>
            <div className=" header-2">
            <Link to="/postRequirement">
              <span className="post-requiremnet justify-content-center" title="Post Requiremnet">
                <span>
                  <IconPlus className="sidebar-faicon" />
                </span>
                Post Requirement
                
              </span>
            </Link>
            {!currentUser ? (
              <Link to="/login" className="get-started">
                <span className="login justify-content-center" title="Get Started">
                  Get Started
                  <span>
                    <IconLogin className="sidebar-faicon" />
                  </span>
                </span>
              </Link>
            ) : (
              <Link to="/user/dashboard" className="dashboard text-center">
                <div className="login text-center" title="Dashboard">
                  Dashboard
                  <IconArrowRight />
                </div>
              </Link>
            )}
            </div>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
