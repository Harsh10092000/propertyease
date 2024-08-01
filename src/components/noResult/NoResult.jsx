import React from "react";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import RecentListHeader from "../propertyCard2/RecentListHeader";
import PropertyCard2 from "../propertyCard2/PropertyCard2";

import { AuthContext } from "../../context/AuthContext";
import AllPropertyButton from "../propertyCard2/AllPropertyButton";

const NoResult = (props) => {
  const {currentUser} = useContext(AuthContext);
  let pageLocation = useLocation();


  const [subDistrict, setSubDistrict] = useState();

  const [data, setData] = useState([]);
  const [city, setCity] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(
    props.userCurrLocation
  );

  const propertyType = [
    { type: "View Residential Properties", link: "/listing/residential" },
    { type: "View Commerical Properties", link: "/listing/commercial" },
    { type: "View Land/Plots Properties", link: "/listing/land" },
  ];

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/pro/fetchLatestProperty")
      .then((res) => {
        setData(res.data);
        setCity(res.data[0].pro_city);
      });
    if (currentLocation !== "All India") {
      axios
        .get(
          import.meta.env.VITE_BACKEND +
            `/api/pro/fetchLatestPropertyByCity/${currentLocation}`
        )
        .then((res) => {
          setData(res.data);
          setCity(res.data[0].pro_city);
        });
    }
  }, [currentLocation]);



  const [location, setLocation] = useState(null);
  useEffect(() => {
    //console.log("currentLocation : " , currentLocation)
    // const locations = currentLocation
    //   .filter((location) => location !== "District")
    //   .join(" ");
    //console.log("locations : " , locations)
    currentLocation !== ""
      ? axios
          .get(
            import.meta.env.VITE_BACKEND +
              `/api/pro/SubDistrictDataByCity/${currentLocation}`
          )
          .then((res) => {
            setSubDistrict(res.data);
          })
      : axios
          .get(
            import.meta.env.VITE_BACKEND +
              `/api/pro/SubDistrictDataByCity/${city}`
          )
          .then((res) => {
            setSubDistrict(res.data);
          });
  }, [city, currentLocation, location]);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //const latitude = "328.6818";
    // const longitude = "77.2290";
    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    axios
      .get(
        `https://us1.locationiq.com/v1/reverse?key=pk.3eb0dad6a47a7a08dd01b454f38ad2be&lat=${latitude}&lon=${longitude}&format=json&`

        //`https://api.geoapify.com/v1/geocode/reverse?lat=28.6818&lon=77.2290&apiKey=825008d9e23247daa5600c3878106833`
        //`https://geocode.maps.co/reverse?lat=28.6818&lon=77.2290&api_key=65fa9be01b679584333361bhid151b9`
      )
      .then((res) => {
        //setSearchValue(res.data.features[0].properties.city.trim());
        //setCurrentLocation(res.data.features[0].properties.city.trim());
        //setLocation(res.data.features[0].properties.city);
        setLocation(res.data);
        //setCurrentLocation(res.data.address.state_district.split(" "));
      });
  }
  useEffect(() => {
    handleLocationClick();
  }, []);

  return (
    <div className="m-1">
      {props.searchValue?.length > 0 ? (
        <div className="pt-2 pb-3 alert alert-info">
          <div>
            <strong>
              We Couldn't find any matches for "
              {props.searchValue.replaceAll("%20", " ")}"
            </strong>
          </div>
          <div>Double check your search for any typos and spelling errors </div>
          <div>
            Try a different search term or check out some of our suggestions
            below
          </div>
        </div>
      ) : (
        <div className="pt-2 pb-3 alert alert-info">
          <div>
            <strong>No Properties Found</strong>
          </div>

          <div>Check out some of our suggestions below</div>
        </div>
      )}
      <div className="property-more-detail ">
        <div className="row">
          <div className="col-md-12">
            <div className="details">
              <div className="row">
                {pageLocation.pathname === "/allproperties" ||
                pageLocation.pathname.startsWith("/rental") ? (
                  <div className="col-md-12">
                    
                    <div className="more-detail-heading">View Properties</div>
                    {subDistrict &&
                    data?.length > 0 &&
                    currentLocation !== "All India" ? (
                      <div className="d-flex flex-wrap tags-link ">
                        {subDistrict.map((item) => (
                          <Link
                            // to={`/${data[0].pro_type
                            //   .split(",")[1]
                            //   .toLowerCase()}/${data[0].pro_type
                            //   .split(",")[0]
                            //   .replaceAll(" ", "-")
                            //   .toLowerCase()}?search=${item.sub_district}`}
                            onClick={() =>
                              props.handleSearchValue(item.sub_district)
                            }
                          >
                            {/* <div className="loc-list mb-0">
                              <span className="text-dark font-weight-bold">
                                {data[0].pro_type &&
                                  data[0].pro_type.split(",")[0] +
                                    " in " +
                                    item.sub_district}{" "}
                              </span>
                            </div> */}
                            <div className="loc-list mb-0">
                              <span className="text-dark font-weight-bold">
                                {"Properties" + " in " + item.sub_district}{" "}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="d-flex flex-wrap tags-link ">
                        {propertyType.map((item) => (
                          <Link to={item.link}>
                            <div
                              className="loc-list mb-0 pointer"
                              onClick={() => props.handleSearchValue("")}
                            >
                              <span className="text-dark font-weight-bold">
                                {item.type}
                              </span>
                            </div>
                          </Link>
                        ))}
                        <div
                          className="loc-list mb-0 pointer"
                          onClick={() => props.handleSearchValue("")}
                        >
                          <span className="text-dark font-weight-bold">
                            View All Properties
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : pageLocation.pathname.startsWith("/property") ? (
                  <div className="col-md-12">
                    <div className="more-detail-heading">View Properties</div>
                    {subDistrict &&
                    data?.length > 0 &&
                    currentLocation !== "All India" ? (
                      <div className="d-flex flex-wrap tags-link ">
                        {subDistrict.map((item) => (
                          <Link
                            to={`/${data[0].pro_type
                              .split(",")[1]
                              .toLowerCase()}/${data[0].pro_type
                              .split(",")[0]
                              .replaceAll(" ", "-")
                              .toLowerCase()}?search=${item.sub_district}`}
                          >
                            <div className="loc-list mb-0">
                              <span className="text-dark font-weight-bold">
                                {data[0].pro_type &&
                                  data[0].pro_type.split(",")[0] +
                                    " in " +
                                    item.sub_district}{" "}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="d-flex flex-wrap tags-link ">
                        {propertyType.map((item) => (
                          <Link to={item.link}>
                            <div
                              className="loc-list mb-0 pointer"
                              onClick={() => props.handleSearchValue("")}
                            >
                              <span className="text-dark font-weight-bold">
                                {item.type}
                              </span>
                            </div>
                          </Link>
                        ))}
                        <Link to="/allproperties">
                          <div
                            className="loc-list mb-0 pointer"
                            onClick={() => props.handleSearchValue("")}
                          >
                            <span className="text-dark font-weight-bold">
                              View All Properties
                            </span>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : pageLocation.pathname.startsWith("/land") ||
                  pageLocation.pathname.startsWith("/commercial") ||
                  pageLocation.pathname.startsWith("/residential") ? (
                  <div className="col-md-12">
                    <div className="more-detail-heading">View Properties</div>
                    {subDistrict &&
                    data?.length > 0 &&
                    currentLocation !== "All India" ? (
                      <div className="d-flex flex-wrap tags-link ">
                        {subDistrict.map((item) => (
                          <Link
                            // to={`/${data[0].pro_type
                            //   .split(",")[1]
                            //   .toLowerCase()}/${data[0].pro_type
                            //   .split(",")[0]
                            //   .replaceAll(" ", "-")
                            //   .toLowerCase()}?search=${item.sub_district}`}
                            to={`/${pageLocation.pathname
                              ?.split("/")[1]
                              .toLowerCase()}/${pageLocation.pathname
                              ?.split("/")[2]
                              .replaceAll(" ", "-")
                              .toLowerCase()}?search=${item.sub_district}`}
                            //to={`/${pageLocation.pathname?.split("/")[1]/pageLocation.pathname?.split("/")[1]}`}
                          >
                            <div className="loc-list mb-0">
                              <span className="text-dark font-weight-bold">
                                {pageLocation.pathname
                                  ?.split("/")[2]
                                  .charAt(0)
                                  .toUpperCase() +
                                  pageLocation.pathname
                                    ?.split("/")[2]
                                    .slice(1)
                                    .replaceAll("-", " ") +
                                  " in " +
                                  item.sub_district}{" "}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="d-flex flex-wrap tags-link ">
                        {propertyType.map((item) => (
                          <Link to={item.link}>
                            <div
                              className="loc-list mb-0 pointer"
                              onClick={() => props.handleSearchValue("")}
                            >
                              <span className="text-dark font-weight-bold">
                                {item.type}
                              </span>
                            </div>
                          </Link>
                        ))}
                        <div
                          className="loc-list mb-0 pointer"
                          onClick={() => props.handleSearchValue("")}
                        >
                          <span className="text-dark font-weight-bold">
                            View All Properties
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="col-md-12">
                    <div className="more-detail-heading">View Properties</div>
                  <div className="d-flex flex-wrap tags-link ">
                        {propertyType.map((item) => (
                          <Link to={item.link}>
                            <div
                              className="loc-list mb-0 pointer"
                              onClick={() => props.handleSearchValue("")}
                            >
                              <span className="text-dark font-weight-bold">
                                {item.type}
                              </span>
                            </div>
                          </Link>
                        ))}
                        <div
                          className="loc-list mb-0 pointer"
                          onClick={() => props.handleSearchValue("")}
                        >
                          <span className="text-dark font-weight-bold">
                            View All Properties
                          </span>
                        </div>
                      </div>
                      </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="most-view-Property mt-5">
        <div className="">
         <RecentListHeader />
          <div className="row">
            {data.slice(0, 2).map((item, index) => (
             <PropertyCard2 item={item} currentUser={currentUser} index={index} col={"6"} padding={"px-3"}/>
            ))}
           
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default NoResult;
