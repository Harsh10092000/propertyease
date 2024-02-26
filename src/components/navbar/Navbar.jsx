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
          <div className="header-center">
            <div className="main-search">
              <div id="highlightsearchdiv">
                <div className="form-group"></div>
              </div>
            </div>
          </div>
          <div className="header-right">
            <Link to="/allproperties">
              <span className="search">
                <IconSearch className="sidebar-faicon pr-1" />
                <span>
                  Search <span className="d-none d-md-inline">Properties</span>
                </span>
              </span>
            </Link>
            <Link to="/addproperty">
              <span className="add" title="List Property">
                <span>
                  <IconPlus className="sidebar-faicon" />
                </span>
                List Property
                <span className="blink d-none d-md-inline">Free</span>
              </span>
            </Link>
            {!currentUser ? (
              <Link to="/login">
                <span className="login" title="Get Started">
                  Get Started
                  <span>
                    <IconLogin className="sidebar-faicon" />
                  </span>
                </span>
              </Link>
            ) : (
              <Link to="/user/dashboard">
                <span className="login" title="Dashboard">
                  Dashboard
                  <IconArrowRight />
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
