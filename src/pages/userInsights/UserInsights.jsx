import React, { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  IconInfoSquareRounded,
  IconEye,
  IconMenuDeep,
  IconCheck,
} from "@tabler/icons-react";
import DashTable from "../../components/userDasboardComp/DashTable";
import moment from "moment";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Skeleton } from "@mui/material";

const UserInsights = () => {
  const { proid } = useParams();
  const { currentUser, clearUser } = useContext(AuthContext);
  const [selectedProperty, setSelectedProperty] = useState("Select");
  const [totalViews, setTotalViews] = useState("");
  const [totalResponses, setTotalResponses] = useState("");
  const [totalResponsesOnPro, setTotalResponsesOnPro] = useState("");
  const [totalViewsPro, setTotalViewsPro] = useState("");

  const [proId, setProId] = useState("");

  const [listingiInLast30, setListingiInLast30] = useState([]);
  const [data, setData] = useState([]);
  const [change, setChange] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openInfoCard, setOpenInfoCard] = useState(false);
  const [respondantData, setRespondantData] = useState([]);
  const [respondantDataByPro, setRespondantDataByPro] = useState([]);

  const [filter, setFilter] = useState("All");
  const [changeFilter, setChangeFilter] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    if (proid !== "all") {
      setProId(proid);
      setFilter(proid);
    } else {
      setFilter("All");
    }
  }, [proid]);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenInfoCard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchPropertyDataByUserId1/${currentUser[0].login_id}`
      )
      .then((res) => {
        if (res.data === "failed") {
          clearUser();
        } else {
          res.data.forEach((item, i) => {
            item.serial_no = i + 1;
          });
          setData(res.data);
          // setTotalViews(res.data.reduce((accumulator, currentObject) => {
          //   return parseInt(accumulator) + parseInt(currentObject.pro_views);
          // }, 0))
          res.data.forEach((object) => {
            if (object.pro_id == proId) {
              const areaSize = `${object.pro_area_size} ${object.pro_area_size_unit}`;
              const propertyType = object.pro_type.split(",")[0];
              const adType = object.pro_ad_type === "Rent" ? "Rent" : "Sale";
              const locality = object.pro_locality;
              const subDistrict = object.pro_sub_district
                ? `${object.pro_sub_district}, `
                : "";
              const city = object.pro_city;
              const state = object.pro_state;

              const description = `${areaSize} ${propertyType} for ${adType} in ${locality}, ${subDistrict}${city}, ${state}`;

              setSelectedProperty(description);
              setTotalViewsPro(object.pro_views);
              setTotalResponsesOnPro(object.pro_responses);
              
              //setFilter(description);
            }
          });
          setSkeleton(false);
        }
      });

    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchRespondentByUser/${currentUser[0].login_id}`
      )
      .then((res) => {
        if (res.data === "failed") {
          clearUser();
        } else {
          res.data.forEach((item, i) => {
            item.serial_no = i + 1;
          });
          setRespondantData(res.data);
        }
      });

    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchLast30DaysListings/${currentUser[0].login_id}`
      )
      .then((res) => {
        if (res.data === "failed") {
          clearUser();
        } else {
          setListingiInLast30(res.data);
        }
      });
  }, [change, proId]);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/pro/fetchRespondentByPro/${proId}`
      )
      .then((res) => {
        if (res.data === "failed") {
          clearUser();
        } else {
          res.data.forEach((item, i) => {
            item.serial_no = i + 1;
          });
          setRespondantDataByPro(res.data);
        }
      });
  }, [changeFilter, proId]);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/pro/fetchResponsesByProId/${proId}`
      )
      .then((res) => {
        if (res.data === "failed") {
          clearUser();
        } else {
          setTotalResponsesOnPro(res.data[0].interest_property_id);
        }
      });
  }, [proId]);

  useEffect(() => {
    setTotalViews(
      data.reduce((accumulator, currentObject) => {
        return parseInt(accumulator) + parseInt(currentObject.pro_views1);
      }, 0)
    );

    setTotalResponses(
      data.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.pro_responses;
      }, 0)
    );
  }, [data]);

  useEffect(() => {
    data.forEach((item, i) => {
      item.pro_modified_id = 5000 + parseInt(item.pro_id);
    });
  }, [data, change]);

  const sumOfSoldProperties = data.reduce(
    (sum, item) => sum + item.pro_sale_status,
    0
  );

  const theadArray = [
    { value: "Sno.", customClass: "text-center" },
    { value: "Property Id" },
    { value: "Sale/Rent" },
    { value: "Price" },
    { value: "Posted On" },
    { value: "Responses and Views", customClass: "th-width-16" },

    { value: "Status" },
    // { value: "Actions", customClass: "th-width-2" },
  ];

  const tbodyArray = [
    { value: "serial_no" },
    { value: "pro_id", transform: (id) => 5000 + parseInt(id) },
    // { type: "pro_id", value: "pro_id", id: 5000 },

    { value: "pro_ad_type" },
    { type: "conditional", condition: "property_price" },
    {
      value: "pro_creation_date",
      transform: (date) => moment(date).format("MMMM DD YYYY"),
    },
    // { type: "conditional", condition: "property_date" },

    {
      type: "conditional",
      condition: "views",
      totalResponses: { totalResponses },
    },
    { type: "conditional", condition: "status" },

    // {
    //   type: "conditional2",
    //   conditions: [
    //     {
    //       type: "link",
    //       condition: "view_btn",
    //       icon: (
    //         <IconEye className="action-edit-icon " height={19} width={19} />
    //       ),
    //       // icon: (
    //       //   <FontAwesomeIcon
    //       //     icon={faEye}
    //       //     className="action-edit-icon "
    //       //     title="View property"
    //       //   />
    //       // ),
    //       to: "/",
    //       customClass: "action_status_btn mr-2",
    //       tagType: "Link",
    //       title: "View property",
    //     },
    //   ],
    // },
  ];

  const theadArray1 = [
    { value: "Sno.", customClass: "text-center" },
    { value: "Name" },
    { value: "Email" },
    { value: "Phone" },
  ];

  const tbodyArray1 = [
    { value: "serial_no" },
    { value: "interested_name" },
    { value: "interested_email" },
    { value: "interested_phone" },
  ];

  useEffect(() => {
    setFilteredData(
      respondantData.filter((code) => {
        if (filter === "All") {
          return true;
        } else {
          console.log(code.pro_id, typeof filter, code.pro_id === filter);
          return code.pro_id == filter;
        }
      })
      // .filter(
      //   (code) =>
      //     code.pro_locality
      //       .toLowerCase()
      //       .includes(searchValue.toLowerCase()) ||
      //     code.pro_sub_district
      //       .toLowerCase()
      //       .includes(searchValue.toLowerCase()) ||
      //     code.pro_pincode.startsWith(searchValue) ||
      //     code.pro_modified_id.toString().startsWith(searchValue) ||
      //     code.pro_city.toLowerCase().includes(searchValue.toLowerCase()) ||
      //     code.pro_state.toLowerCase().startsWith(searchValue.toLowerCase())
      // )
    );
  }, [data, changeFilter]);

  //const records = filteredData.slice(firstIndex, lastIndex);

  const [maxProResponses, setMaxProResponses] = useState(0);

useEffect(() => {
  if (data.length > 0) {
    const maxResponses = data.reduce((maxRes, property) => {
      // Ensure property.pro_responses is parsed as an integer
      return parseInt(property.pro_responses, 10) > maxRes
        ? parseInt(property.pro_responses, 10)
        : maxRes;
    }, 0);

    setMaxProResponses(maxResponses);
  }
}, [data]);


  return (
    <>
      { skeleton ? (
                  <div className="container-fluid">
                 
            
                  
        
                  <div className="row user-profile-form-comp">
                    <div className="col-md-12">
                    <Skeleton variant="rectangular"  height={160} />
                    <Skeleton
                      variant="rectangular"
                      
                      height={100}
                      className="mt-3"
                    />
                    <Skeleton
                      variant="rectangular"
                      
                      height={250}
                      className="mt-3"
                    />
                    <Skeleton
                      variant="rectangular"
                      
                      height={250}
                      className="mt-3"
                    />
                 
                  </div>
                  </div>
                  </div>
                ) :
      maxProResponses > 0 ? (
        <div className="container-fluid admin-dashboard admin-icon">
          {/* {parseInt(listingiInLast30[0]?.plan_status) !== 2 && ( */}
            <div className="row info-card">
              <div className="col-lg-4 align-self-center mb-3 mb-lg-0">
                <div className="d-flex align-items-center flex-row flex-wrap">
                  <div className="position-relative mr-3">
                    {/* <img src="https://mannatthemes.com/rizz/default/assets/images/users/avatar-7.jpg" alt="" height="120" className="rounded-circle" /> */}

                    <img
                      src="/img/person.jpg"
                      alt=""
                      height="110"
                      width="107"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="info-card-name">
                    <h5 className="fw-semibold fs-22 mb-1">{currentUser[0].login_email}</h5>
                    {parseInt(listingiInLast30[0]?.plan_status) !== 1 && parseInt(listingiInLast30[0]?.plan_status) !== 2 ? <p className="mb-0 text-muted fw-medium">Free Membrship</p> : <p className="mb-0 text-muted fw-medium">Pro Membrship</p> }
                  </div>
                </div>
              </div>

              <div className="col-lg-8 ms-auto align-self-center">
                <div className="justify-content-center  info-card-sec-wrap">
                  <div className="border-dashed rounded border-theme-color info-card-sec mr-2 flex-grow-1 flex-basis-0">
                    <h5 className="fw-semibold fs-22 mb-1 info-heading-color">
                      {totalViews}
                    </h5>
                    <p className="text-muted mb-0 fw-medium">Total Views</p>
                  </div>
                  <div className="border-dashed rounded border-theme-color info-card-sec mr-2 flex-grow-1 flex-basis-0 ">
                    <h5 className="fw-semibold fs-22 mb-1 info-heading-color">
                      {totalResponses}
                    </h5>
                    <p className="text-muted mb-0 fw-medium">Total Responses</p>
                  </div>

                  {parseInt(listingiInLast30[0]?.plan_status) !== 1 && parseInt(listingiInLast30[0]?.plan_status) !== 2 &&
                  <div className="border-dashed rounded border-theme-color info-card-sec mr-2 flex-grow-1 flex-basis-0">
                    <h5 className="fw-semibold fs-22 mb-1 info-heading-color">
                      {5 - parseInt(listingiInLast30[0]?.pro_count)}
                    </h5>
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0 fw-medium">
                        Listing Remaining
                      </p>

                      <div className="info-popup">
                        <IconInfoSquareRounded
                          className="pointer"
                          onClick={() =>
                            setOpenInfoCard((prevState) => !prevState)
                          }
                        />
                        {openInfoCard && (
                          <div ref={dropdownRef} className="info-popup-card">
                            <p>
                              You have{" "}
                              {5 - parseInt(listingiInLast30[0]?.pro_count)}{" "}
                              more property listings available until
                              <span>
                                {" " +
                                  moment(listingiInLast30[0].pro_creation_date)
                                    .add(30, "days")
                                    .format("MMMM DD YYYY")}
                              </span>
                              . Upgrade to a Pro membership for unlimited
                              listings and enhanced features.
                            </p>

                            <div>
                              <Link
                                to="/pricing"
                                className="package-purchase-button"
                              >
                                Upgrade
                              </Link>
                              <a
                                href="#"
                                className="package-purchase-button-close"
                                onClick={() => setOpenInfoCard(false)}
                              >
                                Close
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
}
                  <div className="border-dashed rounded border-theme-color info-card-sec mr-2 flex-grow-1 flex-basis-0">
                    <h5 className="fw-semibold fs-22 mb-1 info-heading-color">
                      {sumOfSoldProperties}
                    </h5>
                    <p className="text-muted mb-0 fw-medium">Properties Sold</p>
                  </div>
                </div>
              </div>
            </div>
          {/* )} */}

          <div className="dashboard-upper-sec">
            <div className="dash-upper-text-content ">
              <IconMenuDeep /> Dasboard Navigation
            </div>
            {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">All Property</h1>
      </div> */}
            <div className="row justify-content-between align-items-center my-2">
              <div className="d-flex col-md-3 col-sm-12 ">
                <div className="d-flex justify-content-between">
                  <div className="dash-header-heading">
                    Property Insights
                    {/* <span className="badge">{data?.length}</span> */}
                  </div>
                  <div className="dash-upper-text-content-2">
                    {/* <IconMenuDeep /> <span className="dash-content-2">Dasboard Navigation</span> */}
                    <DashboardNavbar />
                  </div>
                </div>
              </div>
              {/* {console.log(selectedAction)} */}
              <div className="col-md-9 d-flex justify-content-end header-menu">
                <FormControl
                  sx={{ m: 1, width: ["100%"] }}
                  size="small"
                  className="col-md-6 "
                >
                  <InputLabel id="demo-simple-select-label">
                    Filter By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="Filter By"
                    // onChange={(e) => {
                    //   handleFilterChange(e.target.value), handleCurreentPage(1);
                    //   handleFilterChangeprop(filterChange + 1);
                    // }}
                    onChange={(e) => {
                      setFilter(e.target.value),
                        setChangeFilter(changeFilter + 1),
                        setProId(e.target.value);
                    }}
                  >
                    {/* <MenuItem  value="Select">Select</MenuItem> */}
                    <MenuItem value="All">All Properties</MenuItem>
                    {data.map(
                      (item) =>
                        item.pro_responses > 0 && (
                          <MenuItem
                            selected={
                              parseInt(item.pro_id) == parseInt(proId)
                                ? true
                                : false
                            }
                            value={item.pro_id}
                          >
                            {item.pro_area_size +
                              " " +
                              item.pro_area_size_unit +
                              " " +
                              item.pro_type.split(",")[0] +
                              " "}
                            for {item.pro_ad_type === "Rent" ? "Rent" : "Sale"}{" "}
                            in{" "}
                            <span className="text-capitalize">
                              {item.pro_locality}
                            </span>
                            ,&nbsp;
                            {item.pro_sub_district
                              ? item.pro_sub_district + ", "
                              : ""}
                            {item.pro_city},&nbsp;
                            {item.pro_state}
                          </MenuItem>
                        )
                    )}
                  </Select>
                </FormControl>

                {/* {searchAva && (
            <TextField
              variant="outlined"
              className="col-md-5 mt-2"
              size="small"
              label="Search for properties..."
              onChange={(e) => {
                handleCurreentPage(1);
                handleSearchValue(e.target.value);
                handleFilterChangeprop(filterChange + 1);
              }}
            />
          )} */}
              </div>
            </div>
          </div>

          <DashTable
            theadArray={theadArray}
            tbodyArray={tbodyArray}
            compData={filteredData}
            context="dashboard"
          />

          {respondantDataByPro.length > 0 && filter !== "All" && (
            <DashTable
              theadArray={theadArray1}
              tbodyArray={tbodyArray1}
              compData={respondantDataByPro}
              context="dashboard"
            />
          )}

          <div></div>
        </div>
      ) : (
        <div className="container-fluid">
         
    
          

          <div className="row user-profile-form-comp">
            <div className="col-md-12">
              <div className="user-profile-form-wrapper ">
                <div className="form-fields">
                  {/* <div>No Responses Yet</div> */}
                  <div className="sidebar-content-heading ml-2">
                    No Responses Yet
                    <div className=" mt-1 heading-divider"></div>
                  </div>

                  <div className="ml-2">
                    <div className="no-response-text">
                      It looks like your property hasn't received any responses
                      yet. Here are a few tips to help you get more engagement:
                    </div>

                    <div className="no-response-points">
                     <div className="no-response-sub-point"> <IconCheck />  Ensure your property listing is complete and includes high-quality photos.</div>
                     <div className="no-response-sub-point"><IconCheck /> Review your listing description and make sure it's compelling and accurate.</div>
                     <div className="no-response-sub-point"> <IconCheck /> Consider adjusting your pricing or property details to attract more interest.</div>
                     <div className="no-response-sub-point"><IconCheck /> Share your listing on social media or other platforms to reach a wider audience.</div>
                    </div>


{parseInt(listingiInLast30[0]?.plan_status) !== 1 && parseInt(listingiInLast30[0]?.plan_status) !== 2 &&
<div >


                    <div className="no-response-text">
                    For even better results, consider upgrading to our premium plan. Here’s what you’ll get with our premium features:
                    </div>

                    <div className="no-response-points">
                     <div className="no-response-sub-point"> <IconCheck /> Get more visibility with guaranteed views on your property listing, ensuring it reaches a larger audience.</div>
                     <div className="no-response-sub-point"><IconCheck /> Stand out with a featured listing that appears prominently on our site.</div>
                     <div className="no-response-sub-point"> <IconCheck />Showcase your property with immersive 360° images and videos, giving potential buyers or renters a comprehensive view.</div>
                     <div className="no-response-sub-point"><IconCheck /> Receive a professionally designed brochure for your property, making it easier to share and present to potential clients.</div>
                    </div>


                   

                    <div>
                    

                        <Link
                                to="/pricing"
                                className="package-purchase-button"
                              >
                                Upgrade
                              </Link>
                              <Link
                               to="/contactus"
                                className="package-purchase-button-close"
                                
                              >
                                Contact Us
                              </Link>
                    </div>

                    </div>
}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      )}
    </>
  );
};

export default UserInsights;
