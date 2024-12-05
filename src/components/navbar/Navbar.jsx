import React from "react";
import {
  IconChevronDown,
  IconX,
  IconMenuDeep,
} from "@tabler/icons-react";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import "./navbar.css";


const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [rentData, setRentData] = useState([]);
  const [saleData, setSaleData] = useState([]);
  const [showBuyOptions, setShowBuyOptions] = useState();
  const [showRentOptions, setShowRentOptions] = useState();

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/salePropertyTotal`)
      .then((res) => {
        setSaleData(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/rentalPropertyTotal`)
      .then((res) => {
        setRentData(res.data);
      });
  }, []);

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
    setShowBuyOptions(false);
    setShowBuyOptions(false);
  };

  const items = [
   
    {
      name: "Quick List Property",
      linkto: "/quick-list",
    },
    
    {
      name: "Dashboard",
      linkto: "/user/dashboard",
    },
    {
      name: "Post Requirement",
      linkto: "/postrequirement",
    },
    {
      name: "Contact Us",
      linkto: "/contactus",
    },
  ];

  const closeDrawer2 = () => {
    toggleDrawer("add", false);
    setShowBuyOptions(false);
    setShowBuyOptions(false);
  };

  const list = (anchor) => (
    <Box sx={{ width: 300 }} role="presentation">
      {anchor === "add" ? (
        <Box
          sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
          role="presentation"
          // onClick={toggleDrawer(anchor, false)}
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
                  //  loading="lazy"
                    className="img-fluid logo-only-mobile"
                  />
                </Link>
              </div>
              <div>
                <IconX
                  className=" b-3 pointer text-slate-300"
                  onClick={closeDrawer}
                  title="Click to close Menu"
                />
              </div>
            </div>
          </div>
{/* 
 <Link to="/allproperties" className="search-pro-mobile pointer mt-4">
            Search Properties
            </Link> */}
          <List className="">
            {items.map((item, index) => (
              <Link to={item.linkto} key={index}>
                <div className="p-3 m-2 d-flex pl-4 list-item">
                  {/* <div className="list-item-icon">
                  {item.icon}
                  </div> */}

                  <div className={` pl-3 ${item.customCss} `}>
                    <ListItemText
                      className="list-item-text"
                      primary={item.name}
                      onClick={closeDrawer2}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </List>
          <div className="p-3 m-2 d-flex pl-4 list-item d-flex pointer">
            <div
              className="list-item-text pl-3 pointer"
              onClick={() => setShowBuyOptions(!showBuyOptions)}
            >
              Buy
            </div>
            <div onClick={() => setShowBuyOptions(!showBuyOptions)}>
              <IconChevronDown />
            </div>
          </div>
          {showBuyOptions &&
            saleData.map((item, index) => (
              <Link
                to={`/properties/sale/${item.pro_type
                  .split(",")[0]
                  .replaceAll(" ", "-")
                  .toLowerCase()}`}
                key={index}
              >
                <div
                  className="p-3 m-2 d-flex pl-5 list-item"
                  onClick={() => {
                    setShowBuyOptions(false),
                      setShowRentOptions(false),
                      toggleDrawer("add", false),
                      setState(false);
                  }}
                >
                  <div className="list-item-text pl-3">
                    {item.pro_type.split(",")[0]} for sale
                  </div>
                </div>
              </Link>
            ))}
          <div className="p-3 m-2 d-flex pl-4 list-item pointer">
            <div
              className="list-item-text pl-3 pointer"
              onClick={() => {
                setShowRentOptions(!showRentOptions);
              }}
            >
              Rent
            </div>
            <div
              onClick={() => {
                setShowRentOptions(!showRentOptions);
              }}
            >
              <IconChevronDown />
            </div>
          </div>
          {showRentOptions &&
            rentData.map((item, index) => (
              <Link
                to={`/properties/rent/${item.pro_type
                  .split(",")[0]
                  .replaceAll(" ", "-")
                  .toLowerCase()}`}
                key={index}
              >
                <div
                  className="p-3 m-2 d-flex pl-5 list-item"
                  onClick={() => {
                    setShowBuyOptions(false),
                      setShowRentOptions(false),
                      toggleDrawer("add", false),
                      setState(false);
                  }}
                >
                  <div className="list-item-text pl-3">
                    {item.pro_type.split(",")[0]} for rent
                  </div>
                </div>
              </Link>
            ))}
{/* {
      name: "Search Properties",
      linkto: "/allproperties",
      customCss: "search-pro-mobile",
    }, */}
            <Link to="/allproperties" className="search-pro-mobile pointer mt-4">
            Search Properties
            </Link>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
  
  const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <React.Fragment>
     
      <Drawer
        anchor="left"
        open={state["add"]}
        onClose={toggleDrawer("add", false)}
      >
        {list("add")}
      </Drawer>

      <div className={isScrolled ? 'new-navbar-wrapper mb-5' : 'new-navbar-wrapper-2'}>
        <div className={isScrolled ? "d-flex justify-content-between new-navbar" : "d-flex justify-content-between new-navbar-2" }>
          <div>
            <Link to="/">
              <span className="logo">
                <img src="/images/logo.png" alt="Propertyease.in"  width="228px"
                    height="60px" decoding="async" />
              </span>
            </Link>
          </div>
          <div className="new-menu">
        
            <div className="buy-menu new-navbar-item">
              <span
                className="rent justify-content-center pointer"
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <span>Buy</span>
                <IconChevronDown className="sidebar-faicon " />
              </span>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,

                      width: 10,
                      left: 14,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <div className="row">
                  <div className="col-md-12">
                    <MenuItem
                      onClick={handleClose}
                      className=" bg-white no-pointer"
                      style={{ cursor: "default" }}
                    >
                      Property Types
                    </MenuItem>

                    <Divider />

                    {saleData.map((item, index) => (
                      <Link
                        to={`/properties/sale/${item.pro_type
                          .split(",")[0]
                          .replaceAll(" ", "-")
                          .toLowerCase()}`}
                        key={index}
                      >
                        <MenuItem onClick={handleClose}>
                          {item.pro_type.split(",")[0]} for sale
                        </MenuItem>
                      </Link>
                    ))}
                  </div>
                </div>
              </Menu>
            </div>
            <div className="rent-menu new-navbar-item">
              <span
                className="rent justify-content-center pointer"
                onClick={handleClick2}
                aria-controls={open2 ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open2 ? "true" : undefined}
              >
                <span>Rent</span>
                <IconChevronDown className="sidebar-faicon " />
              </span>
              <Menu
                anchorEl={anchorEl2}
                id="account-menu"
                open={open2}
                onClose={handleClose2}
                onClick={handleClose2}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,

                      width: 10,
                      left: 14,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <div className="row">
                  <div className="col-md-12">
                    <MenuItem
                      onClick={handleClose2}
                      className="bg-white no-pointer"
                      style={{ cursor: "default" }}
                    >
                      Property Types
                    </MenuItem>
                    <Divider />
                    {rentData.map((item, index) => (
                      <Link
                        to={`/properties/rent/${item.pro_type
                          .split(",")[0]
                          .replaceAll(" ", "-")
                          .toLowerCase()}`}
                        key={index}
                      >
                        <MenuItem onClick={handleClose2}>
                          {item.pro_type.split(",")[0]} for rent
                        </MenuItem>
                      </Link>
                    ))}
                  </div>
                </div>
              </Menu>
            </div>

            <div className="new-navbar-item pr-3">
              <Link to="/postrequirement" title="Post Requirement">
                <div className="new-navbar-item-content">Post Requirement</div>
              </Link>
            </div>


            
            <div className="new-navbar-item pr-3 ">
              <Link to={"/allproperties"} className="text-black">
                <span className="new-navbar-item-content search-pro">
                  
                  Search Properties
                </span>
              </Link>
            </div>
            <div className="new-navbar-item">
              <Link to="/contactus" title="Contact Us">
                <div className="new-navbar-item-content">Contact Us</div>
              </Link>
            </div>
          </div>

          <div className="d-flex align-items-center">
          

            <div className="pr-3 new-navbar-item-search new-navbar-btn-2 ">
              {!currentUser ? (
                <Link to="/login" className="">
                  <span className="new-navbar-item-content" title="Get Started">
                    Get Started
                   
                  </span>
                </Link>
              ) : (
                <Link to="/user/dashboard" className="">
                  <div className="new-navbar-item-content" title="Dashboard">
                    Dashboard
                  </div>
                </Link>
              )}
            </div>

            <div className="new-navbar-btn-wrapper">
              <div className="new-navbar-item-content new-navbar-btn">
               
                <Link to={"/quick-list"} className="text-white">
                 <span className="pr-1">Quick List <span className="hide-name">Property</span></span> 
                  <span class="blink-2 d-none d-inline">Free</span>
                </Link>
              </div>
            </div>
            <div
              onClick={toggleDrawer("add", true)}
              className="drawer-btn new-mobile-nav "
            >
              <IconMenuDeep />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
