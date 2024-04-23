import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IconBrandWhatsapp, IconMapPin } from "@tabler/icons-react";
import { Skeleton, Snackbar } from "@mui/material";
import DateTime from "../../dateTime";
import NoResult from "../../components/noResult/NoResult";
import { InputAdornment } from "@mui/material";
import SearchBar from "../../components/searchBar/SearchBar";

import AdSlider2 from "../../components/adslider/AdSlider2";
import AdSlider3 from "../../components/adslider/AdSlider3";

const AllProperties = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  //const [suggestions, setSuggestions] = useState();
  //const [openSuggestions, setOpenSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  //const [filter, setFilter] = useState("All");
  const [userCurrLocation, setUserCurrLocation] = useState("");
  const [locationSnack, setLocationSnack] = useState(false);

  const handleLocationSnack = (value) => {
    setLocationSnack(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/pro/fetchPropertyData")
      .then((res) => {
        setData(res.data);
        setSkeleton(false);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertySubCatNo`)
      .then((res) => {
        setSubData(res.data);
      });

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/rentalPropertyTotal`)
      .then((res) => {
        setRentData(res.data);
      });
  }, []);

  useEffect(() => {
    data.forEach((item, i) => {
      item.pro_modified_id = 5000 + parseInt(item.pro_id);
    });
  }, [data]);

  var origin_url = document.referrer;
  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem("origin_url"));
    if (items === null) {
      if (
        origin_url.startsWith("https://propertyease.in/") === false &&
        origin_url.startsWith("https://www.propertyease.in/") === false &&
        origin_url !== null &&
        origin_url !== ""
      ) {
        sessionStorage.setItem("origin_url", JSON.stringify(origin_url));
        axios.post(import.meta.env.VITE_BACKEND + "/api/pro/addOrigin", [
          origin_url,
        ]);
      }
    }
  }, []);

  const [records, setRecords] = useState([]);
  const [nPages, setNPages] = useState(0);

  const handleRecordsChange = (newRecords) => {
    setRecords(newRecords);
  };

  const handleNPagesChange = (newNPages) => {
    setNPages(newNPages);
  };

  const handleSearchValue = (value) => {
    console.log(value);
    setSearchValue(value);
  };

  const handleUserLocation = (value) => {
    setUserCurrLocation(value);
  };

  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const [ad1, setAd1] = useState();
  const [ad2, setAd2] = useState();
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ad/fetchAdData2`)
      .then((res) => {
        setAd1(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/ad/fetchAdData3`)
      .then((res) => {
        setAd2(res.data);
      });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Propertyease - All Properties</title>
      </Helmet>
      <Navbar />
      {/* <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
            textAlign: "center",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={locationSnack}
        autoHideDuration={1000}
        onClose={() => setLocationSnack(false)}
        message={
          "Thank You for showing interest in this property, we will get back to you soon."
        }
      /> */}
      <div className={"main"}>
        <section className="main-content">
          <div className="container">
            <div className="title">
              <h2>
                All Properties
                <span className="ml-2 numberProperties">{data.length}</span>
              </h2>

              <SearchBar
                handleNPagesChange={handleNPagesChange}
                handleRecordsChange={handleRecordsChange}
                data={data}
                handleSearchValue={handleSearchValue}
                handleUserLocation={handleUserLocation}
                searchValue={searchValue}
                handleLocationSnack={handleLocationSnack}
                handleCurrentPage={handleCurrentPage}
                currentPage={currentPage}
              />
            </div>
            <div className="row">
              <div className="col-md-9">
                {!skeleton &&
                  records.length > 0 &&
                  records.slice(0, 2).map((object, index) => (
                    <div className="list-group" key={index}>
                      <div className="row">
                        <div className="col-md-auto flex-column text-center">
                          <div className="buiness-logo">
                            <Link
                              to={`/${
                                object.pro_area_size.toLowerCase() +
                                "-" +
                                object.pro_area_size_unit
                                  .toLowerCase()
                                  .replaceAll(" ", "-")
                                  .replaceAll(".", "") +
                                "-"
                              }${
                                object.pro_type
                                  ? object.pro_type
                                      .split(",")[0]
                                      .toLowerCase()
                                      .replaceAll(" ", "-")
                                  : ""
                              }-for-${
                                object.pro_ad_type === "rent" ? "rent" : "sale"
                              }-in-${object.pro_locality
                                .toLowerCase()
                                .replaceAll(" ", "-")}-${object.pro_city
                                .toLowerCase()
                                .replaceAll(" ", "-")}-${object.pro_id}`}
                            >
                              {object.img_link ? (
                                <img
                                  src={`${
                                    import.meta.env.VITE_BACKEND
                                  }/propertyImages/watermark/${
                                    object.img_link
                                  }`}
                                  alt="img"
                                />
                              ) : (
                                <img src="/images/default.png" alt="no image" />
                              )}
                            </Link>
                          </div>
                        </div>

                        <div className="col" style={{ minWidth: 0 }}>
                          <div className="recent-box-serv">
                            <div className="recent-bus-content">
                              <div className="property-listing-type">
                                <Link
                                  to={`/${
                                    object.pro_area_size.toLowerCase() +
                                    "-" +
                                    object.pro_area_size_unit
                                      .toLowerCase()
                                      .replaceAll(" ", "-")
                                      .replaceAll(".", "") +
                                    "-"
                                  }${
                                    object.pro_type
                                      ? object.pro_type
                                          .split(",")[0]
                                          .toLowerCase()
                                          .replaceAll(" ", "-")
                                      : ""
                                  }-for-${
                                    object.pro_ad_type === "rent"
                                      ? "rent"
                                      : "sale"
                                  }-in-${object.pro_locality
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${object.pro_city
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${object.pro_id}`}
                                >
                                  <span className="text-wrap text-bold">
                                    {object.pro_area_size +
                                      " " +
                                      object.pro_area_size_unit +
                                      " " +
                                      object.pro_type.split(",")[0] +
                                      " "}
                                    for{" "}
                                    {object.pro_ad_type === "Rent"
                                      ? "Rent"
                                      : "Sale"}{" "}
                                    in{" "}
                                    <span className="text-capitalize">
                                      {object.pro_locality}
                                    </span>
                                    ,&nbsp;
                                    {object.pro_sub_district
                                      ? object.pro_sub_district + ", "
                                      : ""}
                                    {object.pro_city},&nbsp;
                                    {object.pro_state}
                                  </span>
                                </Link>
                              </div>
                              <ul>
                                <li className="text-capitalize">
                                  <img
                                    src="/img/location.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon"></strong>
                                  {object.pro_locality},&nbsp;
                                  {object.pro_city}
                                </li>
                                {object.pro_width ? (
                                  <li>
                                    <img
                                      src="/img/meter.png"
                                      className="property-slider-icon"
                                    />
                                    <strong className="frontPropIcon">
                                      Dimension&nbsp;
                                    </strong>
                                    {object.pro_width} Feet *{" "}
                                    {object.pro_length + " "}
                                    Feet
                                  </li>
                                ) : (
                                  ""
                                )}
                                <li>
                                  <img
                                    src="/img/rupee.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    {object.pro_amt && "Price"}
                                  </strong>
                                  &nbsp;
                                  {object.pro_amt
                                    ? "₹" +
                                      object.pro_amt +
                                      " " +
                                      object.pro_amt_unit
                                    : "Ask Price"}
                                </li>

                                <li>
                                  <img
                                    src="/img/facing.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    Property Facing
                                  </strong>
                                  &nbsp;{object.pro_facing}
                                </li>
                              </ul>
                              {/* <Link
                              to={`/property/${object.pro_type
                                .split(",")[0]
                                .replace(
                                  " ",
                                  "-"
                                )}-${object.pro_ad_type.replace(" ", "-")}_${
                                object.pro_id
                              }`}
                            >
                              <a title="View More" className="btn-viewmore">
                                View More
                              </a>
                            </Link> */}
                            </div>
                            <div className="pt-3 d-flex justify-content-between  align-items-center">
                              <div className="listed pl-md-0  ">
                                Listed
                                <br />
                                {/* {formatDate(
                                  new Date(object.pro_date).toDateString()
                                )} */}
                                {DateTime(object.pro_date)}
                              </div>
                              <div className="d-flex">
                                <div className="mr-2 mt-1 ">
                                  <Link
                                    to={`/${
                                      object.pro_area_size.toLowerCase() +
                                      "-" +
                                      object.pro_area_size_unit
                                        .toLowerCase()
                                        .replaceAll(" ", "-")
                                        .replaceAll(".", "") +
                                      "-"
                                    }${
                                      object.pro_type
                                        ? object.pro_type
                                            .split(",")[0]
                                            .toLowerCase()
                                            .replaceAll(" ", "-")
                                        : ""
                                    }-for-${
                                      object.pro_ad_type === "rent"
                                        ? "rent"
                                        : "sale"
                                    }-in-${object.pro_locality
                                      .replace(/\s$/, "")
                                      .toLowerCase()
                                      .replaceAll(" ", "-")}-${object.pro_city
                                      .toLowerCase()
                                      .replaceAll(" ", "-")}-${object.pro_id}`}
                                  >
                                    <a
                                      title="View complete details of this property"
                                      className=" btn-viewmore"
                                    >
                                      View More
                                    </a>
                                  </Link>
                                </div>
                                <div>
                                  <a
                                    rel="noreferrer nofollow"
                                    href={`https://wa.me/919996716787?text=https://www.propertyease.in/${
                                      object.pro_area_size.toLowerCase() +
                                      "-" +
                                      object.pro_area_size_unit
                                        .toLowerCase()
                                        .replaceAll(" ", "-")
                                        .replaceAll(".", "") +
                                      "-"
                                    }${
                                      object.pro_type
                                        ? object.pro_type
                                            .split(",")[0]
                                            .toLowerCase()
                                            .replaceAll(" ", "-")
                                        : ""
                                    }-for-${
                                      object.pro_ad_type === "rent"
                                        ? "rent"
                                        : "sale"
                                    }-in-${object.pro_locality
                                      .toLowerCase()
                                      .replaceAll(" ", "-")}-${object.pro_city
                                      .toLowerCase()
                                      .replaceAll(" ", "-")}-${object.pro_id}`}
                                    target="_blank"
                                    className="conatct-propertywp"
                                    title=" Whatsapp/Contact for this property"
                                  >
                                    <IconBrandWhatsapp />
                                    <span className="pl-1">Whatsapp</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {skeleton && (
                  <div>
                    <Skeleton variant="rectangular" width={813} height={200} />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                  </div>
                )}
                {records.length < 1 && (
                  <NoResult
                    searchValue={searchValue}
                    userCurrLocation={userCurrLocation}
                    handleSearchValue={handleSearchValue}
                  />
                )}

                {/* ad section start */}
                {/* <div className="list-group ">
                  <div className="row">
                    <div className="col-md-auto flex-column text-center">
                      <img
                        src="/images/bizease.png"
                        alt="no image"
                        className="ad-section"
                      />
                    </div>
                  </div>
                </div> */}

                {ad1?.length > 0 && (
                  <div className="list-group ">

                   <div className=" row">
                <div className="col-md-auto flex-column text-center ad-1" >
                  
                  <AdSlider2 className="ad-section" slides={ad1} />
                </div>
              </div>
              </div>
                )} 

                {/* ad section end */}
                {!skeleton &&
                  records.length > 0 &&
                  records.slice(2).map((object, index) => (
                    <div className="list-group" key={index}>
                      <div className="row">
                        <div className="col-md-auto flex-column text-center">
                          <div className="buiness-logo">
                            <Link
                              to={`/${
                                object.pro_area_size.toLowerCase() +
                                "-" +
                                object.pro_area_size_unit
                                  .toLowerCase()
                                  .replaceAll(" ", "-")
                                  .replaceAll(".", "") +
                                "-"
                              }${
                                object.pro_type
                                  ? object.pro_type
                                      .split(",")[0]
                                      .toLowerCase()
                                      .replaceAll(" ", "-")
                                  : ""
                              }-for-${
                                object.pro_ad_type === "rent" ? "rent" : "sale"
                              }-in-${object.pro_locality
                                .toLowerCase()
                                .replaceAll(" ", "-")}-${object.pro_city
                                .toLowerCase()
                                .replaceAll(" ", "-")}-${object.pro_id}`}
                            >
                              {object.img_link ? (
                                <img
                                  src={`${
                                    import.meta.env.VITE_BACKEND
                                  }/propertyImages/watermark/${
                                    object.img_link
                                  }`}
                                  alt="img"
                                />
                              ) : (
                                <img src="/images/default.png" alt="no image" />
                              )}
                            </Link>
                          </div>
                        </div>

                        <div className="col" style={{ minWidth: 0 }}>
                          <div className="recent-box-serv">
                            <div className="recent-bus-content">
                              <div className="property-listing-type">
                                <Link
                                  to={`/${
                                    object.pro_area_size.toLowerCase() +
                                    "-" +
                                    object.pro_area_size_unit
                                      .toLowerCase()
                                      .replaceAll(" ", "-")
                                      .replaceAll(".", "") +
                                    "-"
                                  }${
                                    object.pro_type
                                      ? object.pro_type
                                          .split(",")[0]
                                          .toLowerCase()
                                          .replaceAll(" ", "-")
                                      : ""
                                  }-for-${
                                    object.pro_ad_type === "rent"
                                      ? "rent"
                                      : "sale"
                                  }-in-${object.pro_locality
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${object.pro_city
                                    .toLowerCase()
                                    .replaceAll(" ", "-")}-${object.pro_id}`}
                                >
                                  <span className="text-wrap text-bold">
                                    {object.pro_area_size +
                                      " " +
                                      object.pro_area_size_unit +
                                      " " +
                                      object.pro_type.split(",")[0] +
                                      " "}
                                    for{" "}
                                    {object.pro_ad_type === "Rent"
                                      ? "Rent"
                                      : "Sale"}{" "}
                                    in{" "}
                                    <span className="text-capitalize">
                                      {object.pro_locality}
                                    </span>
                                    ,&nbsp;
                                    {object.pro_sub_district
                                      ? object.pro_sub_district + ", "
                                      : ""}
                                    {object.pro_city},&nbsp;
                                    {object.pro_state}
                                  </span>
                                </Link>
                              </div>
                              <ul>
                                <li className="text-capitalize">
                                  <img
                                    src="/img/location.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon"></strong>
                                  {object.pro_locality},&nbsp;
                                  {object.pro_city}
                                </li>
                                {object.pro_width ? (
                                  <li>
                                    <img
                                      src="/img/meter.png"
                                      className="property-slider-icon"
                                    />
                                    <strong className="frontPropIcon">
                                      Dimension&nbsp;
                                    </strong>
                                    {object.pro_width} Feet *{" "}
                                    {object.pro_length + " "}
                                    Feet
                                  </li>
                                ) : (
                                  ""
                                )}
                                <li>
                                  <img
                                    src="/img/rupee.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    {object.pro_amt && "Price"}
                                  </strong>
                                  &nbsp;
                                  {object.pro_amt
                                    ? "₹" +
                                      object.pro_amt +
                                      " " +
                                      object.pro_amt_unit
                                    : "Ask Price"}
                                </li>

                                <li>
                                  <img
                                    src="/img/facing.png"
                                    className="property-slider-icon"
                                  />
                                  <strong className="frontPropIcon">
                                    Property Facing
                                  </strong>
                                  &nbsp;{object.pro_facing}
                                </li>
                              </ul>
                              {/* <Link
                              to={`/property/${object.pro_type
                                .split(",")[0]
                                .replace(
                                  " ",
                                  "-"
                                )}-${object.pro_ad_type.replace(" ", "-")}_${
                                object.pro_id
                              }`}
                            >
                              <a title="View More" className="btn-viewmore">
                                View More
                              </a>
                            </Link> */}
                            </div>
                            <div className="pt-3 d-flex justify-content-between  align-items-center">
                              <div className="listed pl-md-0  ">
                                Listed
                                <br />
                                {/* {formatDate(
                                  new Date(object.pro_date).toDateString()
                                )} */}
                                {DateTime(object.pro_date)}
                              </div>
                              <div className="d-flex">
                                <div className="mr-2 mt-1 ">
                                  <Link
                                    to={`/${
                                      object.pro_area_size.toLowerCase() +
                                      "-" +
                                      object.pro_area_size_unit
                                        .toLowerCase()
                                        .replaceAll(" ", "-")
                                        .replaceAll(".", "") +
                                      "-"
                                    }${
                                      object.pro_type
                                        ? object.pro_type
                                            .split(",")[0]
                                            .toLowerCase()
                                            .replaceAll(" ", "-")
                                        : ""
                                    }-for-${
                                      object.pro_ad_type === "rent"
                                        ? "rent"
                                        : "sale"
                                    }-in-${object.pro_locality
                                      .toLowerCase()
                                      .replaceAll(" ", "-")}-${object.pro_city
                                      .toLowerCase()
                                      .replaceAll(" ", "-")}-${object.pro_id}`}
                                  >
                                    <a
                                      title="View complete details of this property"
                                      className=" btn-viewmore"
                                    >
                                      View More
                                    </a>
                                  </Link>
                                </div>
                                <div>
                                  <a
                                    rel="noreferrer nofollow"
                                    href={`https://wa.me/919996716787?text=https://www.propertyease.in/${
                                      object.pro_area_size.toLowerCase() +
                                      "-" +
                                      object.pro_area_size_unit
                                        .toLowerCase()
                                        .replaceAll(" ", "-")
                                        .replaceAll(".", "") +
                                      "-"
                                    }${
                                      object.pro_type
                                        ? object.pro_type
                                            .split(",")[0]
                                            .toLowerCase()
                                            .replaceAll(" ", "-")
                                        : ""
                                    }-for-${
                                      object.pro_ad_type === "rent"
                                        ? "rent"
                                        : "sale"
                                    }-in-${object.pro_locality
                                      .toLowerCase()
                                      .replaceAll(" ", "-")}-${object.pro_city
                                      .toLowerCase()
                                      .replaceAll(" ", "-")}-${object.pro_id}`}
                                    target="_blank"
                                    className="conatct-propertywp"
                                    title=" Whatsapp/Contact for this property"
                                  >
                                    <IconBrandWhatsapp />
                                    <span className="pl-1">Whatsapp</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {skeleton && (
                  <div>
                    <Skeleton variant="rectangular" width={813} height={200} />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                    <Skeleton
                      variant="rectangular"
                      width={813}
                      height={200}
                      className="mt-3"
                    />
                  </div>
                )}
                {records.length < 1 && (
                  <NoResult
                    searchValue={searchValue}
                    userCurrLocation={userCurrLocation}
                    handleSearchValue={handleSearchValue}
                  />
                )}
              </div>
              <div className="col-md-3 d-flex flex-column gap-3">
                <div>
                  <div className="p-1 shadow">
                    <div className="p-3 font-weight-bold text-black">
                      For Sale
                    </div>
                    {subData.map((sub, index) => (
                      <Link
                        to={`/${sub.pro_type
                          .split(",")[1]
                          .toLowerCase()}/${sub.pro_type
                          .split(",")[0]
                          .replaceAll(" ", "-")
                          .toLowerCase()}`}
                        key={index}
                      >
                        <div className="d-flex justify-content-between px-3 py-2">
                          <div>{sub.pro_type.split(",")[0]}</div>
                          <div>({sub.pro_sub_cat_number})</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="p-1 shadow">
                    <div className="p-3 font-weight-bold text-black">Rent</div>
                    {rentData.map((rent, index) => (
                      <Link
                        to={`/rental/${rent.pro_type
                          .split(",")[0]
                          .replaceAll(" ", "-")
                          .toLowerCase()}`}
                        key={index}
                      >
                        <div className="d-flex justify-content-between px-3 py-2">
                          <div>{rent.pro_type.split(",")[0]}</div>
                          <div>({rent.pro_sub_cat_number})</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* ad section start */}
                {ad2?.length > 0 && (
                <div>
                  <div className="p-1 shadow ad-2-wrapper">
                    <div className=" ad-2">
                    {/* <img
                        src="/images/ownly-digital.png"
                        alt="no image"
                        className="ad-section"
                      /> */}
                      <AdSlider3 className="ad-section" slides={ad2} />
                      </div>
                  </div>
                </div>
                )}
                {/* {ad1?.length > 0 && (
                  <div className="p-1 shadow ">

                  
                
                  
                  <AdSlider3 className="ad-section" slides={ad1} />
                
              
              </div>
                )}  */}
                {/* ad section end */}
              </div>
            </div>

            {records.length > 0 && (
              <Pagination
                count={nPages}
                color="primary"
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                className="col-md-6 mx-auto py-2"
              />
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AllProperties;
