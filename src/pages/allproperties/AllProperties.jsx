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
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Skeleton } from "@mui/material";
import DateTime from "../../dateTime";

//import { history } from 'react-router-dom';
//import  HistoryRouterProps  from "react-router-dom";

const AllProperties = () => {
  // const url = new URL(window.location.href);
  // const originURL = url.origin;
  //const result = window.location.origin;
  var origin_url = document.referrer;
  //console.log("origin_url : ", origin_url );
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [skeleton, setSkeleton] = useState(true);

  // const changeReferrerUrl = () => {
  //   console.log("Dfg")
  //   HistoryRouterProps.replaceState(null, null, window.location.origin);
  // };

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

  useEffect(() => {
    if(origin_url.startsWith("https://propertyease.in/") === false && origin_url.startsWith("https://www.propertyease.in/") === false) {

      axios.post(import.meta.env.VITE_BACKEND + "/api/pro/addOrigin", [origin_url]);
      origin_url = window.location.origin;
    } 
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredData = data
    .filter((code) => {
      if (filter === "Sale") {
        return code.pro_ad_type === "Sale";
      } else if (filter === "Rent") {
        return code.pro_ad_type === "Rent";
      } else if (filter === "All") {
        return true;
      }
    })
    .filter(
      (code) =>
        code.pro_locality.toLowerCase().includes(searchValue.toLowerCase()) ||
        code.pro_sub_district
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        code.pro_pincode.startsWith(searchValue) ||
        code.pro_modified_id.toString().startsWith(searchValue) ||
        code.pro_city.toLowerCase().includes(searchValue.toLowerCase()) ||
        code.pro_state.toLowerCase().startsWith(searchValue.toLowerCase())
    );
  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  return (
    <div>
      <Helmet>
        <title>Propertyease - All Properties</title>
      </Helmet>
      <Navbar />
      <div className={"main"}>
        <section className="main-content">
          <div className="container">
            <div className="title">
              <h2>
                All Properties
                <span className="ml-2 numberProperties">{data.length}</span>
              </h2>

              <div className="row align-items-center my-2 mx-1 gap-3">
                <TextField
                  variant="outlined"
                  className="col-md-6 mx-4 mx-md-0"
                  size="small"
                  label="Search for properties..."
                  placeholder="e.g. Sector 7 "
                  onChange={(e) => {
                    setCurrentPage(1);
                    setSearchValue(e.target.value);
                  }}
                />
                <FormControl
                  sx={{ m: 1, width: ["100%"] }}
                  size="small"
                  className="col-md-3 mx-4 mx-md-0"
                >
                  <InputLabel id="demo-simple-select-label">
                    Filter By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="Filter By"
                    onChange={(e) => {
                      setFilter(e.target.value), setCurrentPage(1);
                    }}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Sale"}>Sale</MenuItem>
                    <MenuItem value={"Rent"}>Rent</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9">
                {!skeleton ? (
                  records.map((object, index) => (
                    <div className="list-group" key={index}>
                      <div className="row">
                        <div className="col-md-auto flex-column text-center">
                          <div className="buiness-logo">
                            <Link
                              to={`/${
                                object.pro_area_size.toLowerCase() +
                                "-" +
                                object.pro_area_size_unit.toLowerCase() +
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
                                    object.pro_area_size_unit.toLowerCase() +
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
                                      object.pro_area_size_unit.toLowerCase() +
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
                                      object.pro_area_size_unit.toLowerCase() +
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
                  ))
                ) : (
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
              </div>
            </div>

            <Pagination
              count={nPages}
              color="primary"
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              className="col-md-6 mx-auto py-2"
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AllProperties;
