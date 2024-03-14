import {
  IconSend,
  IconShare3,
  IconStarFilled,
  IconBrandWhatsapp,
  IconBrandFacebook,
  IconX,
} from "@tabler/icons-react";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { IconChevronRight } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import EmblaCarousel from "../../components/slider/EmblaCarousel";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { AuthContext } from "../../context/AuthContext";
import { Skeleton, Snackbar } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "../../components/loader/Loader";
import { Helmet } from "react-helmet";
import PopSlider from "../../components/popSlider/PopSlider";
import { useNavigate } from "react-router-dom";

const Property = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const arrproId = id.split("-");
  const proId = arrproId[arrproId.length - 1];

  useEffect(() => {
    isNaN(proId) && navigate(`/notfound`);
  }, [proId]);

  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [shortlist, setShortlist] = useState(false);
  const [interested, setInterested] = useState(false);
  const [skeleton, setSkeleton] = useState(true);
  const [currentImage, setCurrentImage] = useState("");
  const checkShortlist = async () => {
    if (currentUser) {
      try {
        await axios.post(
          import.meta.env.VITE_BACKEND + "/api/pro/checkShortlist",
          { proId, cnctId: currentUser[0].login_id }
        );
        setShortlist(true);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const checkInterested = async () => {
    if (currentUser) {
      try {
        await axios.post(
          import.meta.env.VITE_BACKEND + "/api/pro/checkInterested",
          { proId, cnctId: currentUser[0].login_id }
        );
        setInterested(true);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const [proType, setProType] = useState("");
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertyDataById/${proId}`
      )
      .then((res) => {
        setData(res.data[0]);
        setProType(res.data[0].pro_type.split(",")[1]);
        setSkeleton(false);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchImagesWithId/${proId}`)
      .then((res) => {
        setImages([...res.data, { img_link: "default.png" }]);
      });
    checkShortlist();
    checkInterested();
  }, []);

  const [latestProperty, setLatestProperty] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/fetchLatestPropertyByCat/${proType}`
      )
      .then((res) => {
        setLatestProperty(res.data);
      });
  }, [data]);

  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);
  const [err, setErr] = useState(null);
  const shortlistProperty = async () => {
    if (!currentUser) {
      setDialog(true);
    } else {
      try {
        await axios.post(
          import.meta.env.VITE_BACKEND + "/api/pro/shortlistProperty",
          { userId: currentUser[0].login_id, propertyId: proId }
        );
        setSnack(true);
        checkShortlist();
      } catch (err) {
        setErr(err.response.data);
        setSnack(true);
      }
    }
  };

  const [dialog, setDialog] = useState(false);
  const askQuestion = () => {
    if (!currentUser) {
      setDialog(true);
    } else {
      sendQuestion();
    }
  };
  const [snackQ, setSnackQ] = useState(false);
  console.log("data , currentUser : ", data, currentUser);
  const sendQuestion = async () => {
    setLoader(true);
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/contact/askquestion",
        {
          userId: currentUser[0].login_email,
          phone: currentUser[0].login_number,
          propertySlug: id,
          proId,
          user_id: currentUser[0].login_id,
          pro_user_id: data.pro_user_id,
        }
      );
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/contact/interestShowed",
        {
          pro_user_id: data.pro_user_id,
        }
      );
      setLoader(false);
      setSnackQ(true);
      checkInterested();
    } catch (err) {
      console.log(err);
    }
  };
  const [sticky, setSticky] = useState(false);
  const handleScroll = () => {
    const scrollPosition = window.scrollY; // => scroll position
    if (scrollPosition > 100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function formatDate(dateString) {
    const formattedDate = dateString.replace(/-/g, "/");
    const date = new Date(formattedDate);
    const now = new Date();
    const diffTime = now - date;
    const diffSeconds = Math.floor(diffTime / 1000);

    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffSeconds < 60) {
      return "just now";
    } else if (diffMinutes < 60) {
      return diffMinutes + " minute" + (diffMinutes > 1 ? "s" : "") + " ago";
    } else if (diffHours < 24) {
      return diffHours + " hour" + (diffHours > 1 ? "s" : "") + " ago";
    } else if (diffDays < 7) {
      return diffDays + " day" + (diffDays > 1 ? "s" : "") + " ago";
    } else if (diffWeeks < 4) {
      return diffWeeks + " week" + (diffWeeks > 1 ? "s" : "") + " ago";
    } else if (diffMonths < 12) {
      return diffMonths + " month" + (diffMonths > 1 ? "s" : "") + " ago";
    } else {
      return diffYears + " year" + (diffYears > 1 ? "s" : "") + " ago";
    }
  }
  const location = window.location.href;
  const handleClose = () => {
    setOpen(false);
  };
  const handleCurrentImage = (item) => {
    setCurrentImage(item);
  };

  return (
    <div>
      <Helmet>
        <title>
          {`${data.pro_area_size + " " + data.pro_area_size_unit + " "}${
            data.pro_type ? data.pro_type.split(",")[0] : ""
          }
        for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in
        ${data.pro_locality}
        ${data.pro_city}
`}
        </title>
        <link rel="canonical" href={location} />
        <meta
          name="og:title"
          content={`${
            data.pro_area_size + " " + data.pro_area_size_unit + " "
          }${data.pro_type ? data.pro_type.split(",")[0] : ""}
        for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in
        ${data.pro_locality}
        ${data.pro_city}
`}
        />
        <meta
          name="og:image"
          content={
            images.length > 0
              ? import.meta.env.VITE_BACKEND +
                "/propertyImages/watermark/" +
                images[0].img_link
              : "/images/default.png"
          }
        />
        <meta
          name="description"
          content={`Check out this ${
            data.pro_area_size + " " + data.pro_area_size_unit + " "
          }${data.pro_type ? data.pro_type.split(",")[0] : ""}
        for ${
          data.pro_ad_type === "Rent" ? "Rent" : "Sale"
        }. It is an ideal investment opportunity in a prime ${
            data.pro_type ? data.pro_type.split(",")[0] : ""
          } area with verified property assurance.`}
        />
      </Helmet>

      {loader ? <Loader /> : ""}
      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
            textAlign: "center",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackQ}
        autoHideDuration={1000}
        onClose={() => setSnackQ(false)}
        message={
          "Thank You for showing interest in this property, we will get back to you soon."
        }
      />
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            As to shorlist the property or to show interest in Property you have
            to login first.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/login">
            <div>LOGIN</div>
          </Link>
        </DialogActions>
      </Dialog>
      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            display: "flex",
            justifyContent: "center",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack}
        autoHideDuration={2000}
        onClose={() => setSnack(false)}
        message={err ? err : "Property Has been Shortlisted"}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {/* <EmblaCarousel slides={images} /> */}
        <PopSlider
          slides={images}
          handleClose={handleClose}
          currentImage={currentImage}
        />
      </Modal>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <section className="property-view-outer">
                <ul className="coming-field-content">
                  <li>
                    <Link to="/">
                      <a>
                        Property Type
                        <span>
                          <IconChevronRight className="sidebar-faicon" />
                        </span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <a>
                        {data.pro_type ? data.pro_type.split(",")[1] : ""}
                        <IconChevronRight className="sidebar-faicon" />
                      </a>
                    </Link>
                  </li>
                  <li>{data.pro_sub_cat}</li>
                </ul>

                <div className="property-view-inner">
                  <div className="row">
                    <div
                      className={sticky ? "top newClass" : "top"}
                      id="dynamic"
                    >
                      <div
                        className="d-flex flex-column pt-2 pt-md-0 pl-3 pl-md-0 pr-3 pr-md-0"
                        style={{ gap: "0" }}
                      >
                        {!skeleton ? (
                          <h1 className="capitalize  pl-md-0 d-flex gap-3 align-items-center">
                            {data.pro_area_size +
                              " " +
                              data.pro_area_size_unit +
                              " "}
                            {data.pro_type ? data.pro_type.split(",")[0] : ""}{" "}
                            For
                            {" " + data.pro_ad_type}
                            {currentUser ? (
                              data.pro_user_id == currentUser[0].login_id ? (
                                ""
                              ) : (
                                <button
                                  className={
                                    shortlist ? "shortlisted" : "shortlist"
                                  }
                                  title="Shortlisted"
                                  onClick={shortlistProperty}
                                >
                                  <IconStarFilled className="shortlistIcon" />
                                </button>
                              )
                            ) : (
                              <button
                                className="shortlist"
                                title="Shortlist this property"
                                onClick={shortlistProperty}
                              >
                                <IconStarFilled className="shortlistIcon" />
                              </button>
                            )}
                          </h1>
                        ) : (
                          <Skeleton
                            variant="rectangular"
                            width={450}
                            height={28}
                          />
                        )}
                      </div>
                      {!skeleton ? (
                        <div className="property-top-address pl-3 pl-md-0 pb-0 text-capitalize">
                          {data.pro_locality},&nbsp;
                          {data.pro_sub_district
                            ? data.pro_sub_district + ", "
                            : ""}
                          {data.pro_city},&nbsp;
                          {data.pro_state}
                        </div>
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width={250}
                          height={19}
                          className="mt-1"
                        />
                      )}
                      {!skeleton ? (
                        <span className="listed pl-3 pl-md-0 ">
                          {/* Listed by {" " + data.pro_user_type} On {new Date(data.pro_date).toDateString()}  */}
                          Listed by {" " + data.pro_user_type}{" "}
                          {formatDate(new Date(data.pro_date).toDateString())}
                        </span>
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width={250}
                          height={14}
                          className="mt-1"
                        />
                      )}
                      <div className="d-flex align-items-center justify-content-between p-1">
                        {!skeleton ? (
                          <div className="d-flex align-items-center justify-content-between pl-md-0">
                            <div className="property-price">
                              {data.pro_amt
                                ? "₹" + data.pro_amt + " " + data.pro_amt_unit
                                : "Ask Price"}
                            </div>
                          </div>
                        ) : (
                          <Skeleton
                            variant="rectangular"
                            width={150}
                            height={40}
                            className="mt-1"
                          />
                        )}

                        <div className="d-flex gap-2 align-items-center">
                          {currentUser ? (
                            data.pro_user_id == currentUser[0].login_id ? (
                              ""
                            ) : (
                              <>
                                {interested ? (
                                  <button
                                    className="interest-showed"
                                    title="Already Contacted"
                                    onClick={askQuestion}
                                  >
                                    <IconSend />
                                    <span className="mobile-hidden">
                                      Already Contacted
                                    </span>
                                  </button>
                                ) : (
                                  <button
                                    className="interest"
                                    title="Contact Us"
                                    onClick={askQuestion}
                                  >
                                    <IconSend />
                                    <span className="">Contact Us</span>
                                  </button>
                                )}
                              </>
                            )
                          ) : (
                            <>
                              <button
                                className="interest"
                                title="Contact Us"
                                onClick={askQuestion}
                              >
                                <IconSend />
                                <span className="">Contact Us</span>
                              </button>
                            </>
                          )}
                          <button className="fb" title="Share On Facebook">
                            <a
                              rel="noreferrer nofollow"
                              href={`https://www.facebook.com/sharer.php?u=https://www.propertyease.in/property/${id}`}
                              target="_blank"
                              className="share-property"
                            >
                              <IconBrandFacebook />
                              <span
                                className="mobile-hidden"
                                style={{ fontWeight: "bold" }}
                              >
                                Share
                              </span>
                            </a>
                          </button>
                          <button className="wp pl-0" title="Share On Whatsapp">
                            <a
                              rel="noreferrer nofollow"
                              href={`https://api.whatsapp.com/send?text=https://www.propertyease.in/property/${id}`}
                              target="_blank"
                              className="share-propertywp"
                            >
                              <IconBrandWhatsapp />
                              <span className="mobile-hidden">Share</span>
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="leftblock">
                          <div className="photosection">
                            {console.log(currentImage)}
                            {images.length > 1 ? (
                              <EmblaCarousel
                                slides={images}
                                open={() => setOpen(true)}
                                handleCurrentImage={handleCurrentImage}
                              />
                            ) : (
                              <img
                                src="/images/default.png"
                                alt="No Image"
                                width={550}
                                height={550}
                                className="img-fluid"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={"property-side-detail"}>
                          <div style={{ fontSize: "10px" }}>
                            Property ID
                            <span className="propertypage-id">
                              {5000 + +proId}
                            </span>
                          </div>
                          <div className="property-no-detail">
                            <div className={"property-small-detail"}>
                              {data.pro_type ? (
                                data.pro_type.split(",")[1] == "Commercial" ||
                                data.pro_type.split(",")[1] == "Residential" ? (
                                  <>
                                    <div className="property-numbers">
                                      <img src="/img/bedroom.png" />
                                      <span className="propertyHeading">
                                        Bedroom(s)
                                      </span>
                                      <span className="propertyData">
                                        {data.pro_bedroom}
                                      </span>
                                    </div>
                                    <div className="property-numbers">
                                      <img src="/img/shower.png" />
                                      <span className="propertyHeading">
                                        Washroom(s)
                                      </span>
                                      <span className="propertyData">
                                        {data.pro_washrooms}
                                      </span>
                                    </div>
                                    <div className="property-numbers">
                                      <img src="/img/balcony.png" />
                                      <span className="propertyHeading">
                                        Balconies
                                      </span>
                                      <span className="propertyData">
                                        {data.pro_balcony}
                                      </span>
                                    </div>
                                    <div className="property-numbers">
                                      <img src="/img/tiles.png" />
                                      <span className="propertyHeading">
                                        Floor(s)
                                      </span>
                                      <span className="propertyData">
                                        {data.pro_floor}
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}

                              <div className="property-numbers">
                                <img src="/img/transfer.png" />
                                <span className="propertyHeading">
                                  Side Open(s)
                                </span>
                                <span className="propertyData">
                                  {data.pro_open_sides}
                                </span>
                              </div>
                              <div className="property-numbers">
                                <img src="/img/face-detection.png" />
                                <span className="propertyHeading">Facing</span>
                                <span className="propertyData">
                                  {data.pro_facing}
                                </span>
                              </div>
                              <div className="property-numbers">
                                <img src="/img/ownership.png" />
                                <span className="propertyHeading">
                                  Possession Available
                                </span>
                                <span className="propertyData">
                                  {data.pro_possession}
                                </span>
                              </div>
                              {data.pro_type == "Commercial" ||
                              data.pro_type == "Residential" ? (
                                <div className="property-numbers">
                                  <img src="/img/parking.png" />
                                  <span className="propertyHeading">
                                    Car Parking(s)
                                  </span>
                                  <span className="propertyData">
                                    {data.pro_parking}
                                  </span>
                                </div>
                              ) : (
                                <div className="property-numbers">
                                  <img src="/img/age.png" />
                                  <span className="propertyHeading">
                                    Property Age
                                  </span>
                                  <span className="propertyData">
                                    {data.pro_age}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className=" mmmm">
                            <div className="large-detials">
                              <img src="/img/meter.png" className="desc" />
                              <span className="propertyHeading">
                                Plot Size &amp; Dimension
                              </span>
                              <p>
                                <span className="propertyData">
                                  <span className="measure">
                                    {data.pro_width
                                      ? data.pro_width +
                                        " Feet * " +
                                        data.pro_length +
                                        " Feet"
                                      : "-"}
                                  </span>
                                </span>
                              </p>
                            </div>
                            <div className="large-detials">
                              <img src="/img/rent.png" className="desc" />
                              <span className="propertyHeading">
                                Already Rent
                              </span>
                              <p>
                                <span className="propertyData">
                                  {data.pro_rental_status}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className=" mmmm" id="interest">
                            <div className="large-detials">
                              <img
                                src="/img/ownership-type.png"
                                className="desc"
                              />
                              <span className="propertyHeading">
                                Type Of Ownership
                              </span>
                              <p>
                                <span className="propertyData">
                                  {data.pro_ownership_type}
                                </span>
                              </p>
                            </div>
                            <div className="large-detials">
                              <img src="/img/rent.png" className="desc" />
                              <span className="propertyHeading">
                                Authority Approval
                              </span>
                              <p>
                                <span className="propertyData">
                                  {data.pro_approval}
                                </span>
                              </p>
                            </div>
                          </div>
                          {data.pro_type ? (
                            data.pro_type.split(",")[1] == "Commercial" ||
                            data.pro_type.split(",")[1] == "Residential" ? (
                              <>
                                <div className=" mmmm">
                                  <div className="large-detials">
                                    <img src="/img/age.png" className="desc" />
                                    <span className="propertyHeading">
                                      Property Age
                                    </span>
                                    <p>
                                      <span className="propertyData">
                                        {data.pro_age}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="large-detials">
                                    <img
                                      src="/img/furnishing.png"
                                      className="desc"
                                    />
                                    <span className="propertyHeading">
                                      Furnishing
                                    </span>
                                    <p>
                                      <span className="propertyData">
                                        {data.pro_furnishing}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </>
                            ) : null
                          ) : (
                            ""
                          )}
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="property-more-detail">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="details">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="more-detail-heading">
                                  More Details
                                </div>
                              </div>
                            </div>
                            <div className="row moreDetail">
                              <div className="col-md-3 more-detail-right">
                                Price
                              </div>
                              <div className="col-md-9 more-detail-left">
                              {data.pro_amt
                                ? "₹" + data.pro_amt + " " + data.pro_amt_unit
                                : "Ask Price"}
                              </div>
                            </div>
                            <div className="row moreDetail">
                              <div className="col-md-3 more-detail-right">
                                Address
                              </div>
                              <div className="col-md-9 more-detail-left">
                                {data.pro_locality},&nbsp;
                                {data.pro_sub_district
                                  ? data.pro_sub_district + ", "
                                  : ""}
                                {data.pro_city},&nbsp;
                                {data.pro_state}
                              </div>
                            </div>
                            <div className="row moreDetail">
                              <div className="col-md-3 more-detail-right">
                                Facing Road Width
                              </div>
                              <div className="col-md-9 more-detail-left">
                                {data.pro_facing_road_width
                                  ? data.pro_facing_road_width +
                                    " " +
                                    data.pro_facing_road_unit
                                  : "-"}
                              </div>
                            </div>
                            <div className="row moreDetail">
                              <span className="col-md-3 more-detail-right">
                                Description &nbsp;
                              </span>
                              <span className="col-md-9 more-detail-left ">
                                {data.pro_desc}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <section className="most-view-Property mt-5 mb-5">
                      <div className="container">
                        <div className="section-title">
                          <h3>
                            Recent Listed <span>Properties</span>
                          </h3>
                          <p>
                            Looking for a service? Discover the most recent
                            service providers in your city, vetted and selected
                            by our dedicated team of analysts
                            <br /> based on feedback gathered from users like
                            you!
                          </p>
                        </div>
                        <div className="row">
                          {latestProperty.map((item, index) => (
                            <div className="col-md-4" key={index}>
                              <div className="uniBlock">
                                <div className="recent-box-serv">
                                  <div className="re-bus-img">
                                    <Link
                                      to={`/${
                                        item.pro_area_size.toLowerCase() +
                                        "-" +
                                        item.pro_area_size_unit.toLowerCase() +
                                        "-"
                                      }${
                                        item.pro_type
                                          ? item.pro_type
                                              .split(",")[0]
                                              .toLowerCase()
                                              .replaceAll(" ", "-")
                                          : ""
                                      }-for-${
                                        item.pro_ad_type === "rent"
                                          ? "rent"
                                          : "sale"
                                      }-in-${item.pro_locality
                                        .toLowerCase()
                                        .replaceAll(
                                          " ",
                                          "-"
                                        )}-${item.pro_city.toLowerCase()}-${
                                        item.pro_id
                                      }`}
                                    >
                                      {item.img_link ? (
                                        <img
                                          src={`${
                                            import.meta.env.VITE_BACKEND
                                          }/propertyImages/watermark/${
                                            item.img_link
                                          }`}
                                          alt="img"
                                        />
                                      ) : (
                                        <img
                                          src="/images/default.png"
                                          alt="no image"
                                        />
                                      )}
                                    </Link>
                                  </div>
                                  <div className="recent-bus-content">
                                    <h5 className="property-listing-type">
                                      <Link
                                        to={`/${
                                          item.pro_area_size.toLowerCase() +
                                          "-" +
                                          item.pro_area_size_unit.toLowerCase() +
                                          "-"
                                        }${
                                          item.pro_type
                                            ? item.pro_type
                                                .split(",")[0]
                                                .toLowerCase()
                                                .replaceAll(" ", "-")
                                            : ""
                                        }-for-${
                                          item.pro_ad_type === "rent"
                                            ? "rent"
                                            : "sale"
                                        }-in-${item.pro_locality
                                          .toLowerCase()
                                          .replaceAll(
                                            " ",
                                            "-"
                                          )}-${item.pro_city.toLowerCase()}-${
                                          item.pro_id
                                        }`}
                                      >
                                        <a>{item.pro_type.split(",")[0]}</a>
                                      </Link>
                                    </h5>
                                    <ul className="front-all-property-slider">
                                      <li className="text-capitalize">
                                        <img
                                          src="/img/location.png"
                                          className="property-slider-icon"
                                        />
                                        <strong className="frontPropIcon">
                                          Address&nbsp;{" "}
                                        </strong>
                                        {item.pro_locality},&nbsp;
                                        {item.pro_sub_district
                                          ? item.pro_sub_district + ", "
                                          : ""}
                                        {item.pro_city}
                                      </li>
                                      {item.plot_area_size ? (
                                        <li>
                                          <img
                                            src="/img/face-detection.png"
                                            className="property-slider-icon"
                                          />
                                          <strong className="frontPropIcon">
                                            Plot Size &nbsp;
                                          </strong>
                                          {item.plot_area_size}
                                        </li>
                                      ) : (
                                        ""
                                      )}
                                      {item.pro_width ? (
                                        <li>
                                          <img
                                            src="/img/meter.png"
                                            className="property-slider-icon"
                                          />
                                          <strong className="frontPropIcon">
                                            Dimension&nbsp;
                                          </strong>
                                          ({item.pro_width} Feet *{" "}
                                          {item.pro_length} Feet)
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
                                          Price{" "}
                                        </strong>
                                        &nbsp;
                                        {"₹ " +
                                          item.pro_amt +
                                          " " +
                                          item.pro_amt_unit}
                                      </li>

                                      <li>
                                        <img
                                          src="/img/facing.png"
                                          className="property-slider-icon"
                                        />
                                        <strong className="frontPropIcon">
                                          Property Facing
                                        </strong>
                                        &nbsp;
                                        {item.pro_facing}
                                      </li>
                                    </ul>
                                    <Link
                                      to={`/${
                                        item.pro_area_size.toLowerCase() +
                                        "-" +
                                        item.pro_area_size_unit.toLowerCase() +
                                        "-"
                                      }${
                                        item.pro_type
                                          ? item.pro_type
                                              .split(",")[0]
                                              .toLowerCase()
                                              .replaceAll(" ", "-")
                                          : ""
                                      }-for-${
                                        item.pro_ad_type === "rent"
                                          ? "rent"
                                          : "sale"
                                      }-in-${item.pro_locality
                                        .toLowerCase()
                                        .replaceAll(
                                          " ",
                                          "-"
                                        )}-${item.pro_city.toLowerCase()}-${
                                        item.pro_id
                                      }`}
                                    >
                                      <a title="View complete details of this property" className="btn-viewmore">View More</a>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      <div className="d-flex flex-row-reverse mt-4 mr-3">
                        <Link to={`/property/${proType}`}>
                          <a title="Click to view all properties" className="btn-viewall px-4 ">View All</a>
                        </Link>
                      </div>
                      </div>
                    </section>
                    <div className="property-more-detail">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="details">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="more-detail-heading">
                                  Disclaimer
                                </div>

                                <p>
                                  All the information displayed is as posted by
                                  the User and displayed on the website for
                                  informational purposes only. Propertyease.in
                                  makes no representations and warranties of any
                                  kind, whether expressed or implied, for the
                                  Services and in relation to the accuracy or
                                  quality of any information transmitted or
                                  obtained at Propertyease.in. You are hereby
                                  strongly advised to verify all information
                                  including visiting the relevant authorities
                                  before taking any decision based on the
                                  contents displayed on the website.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* <div className="imageTilesLeft" style={{ display: allPropertyPic }}>
            <div className="property-view-inner">
              <div className="property-top-address">
                <span className="moveLeft" onClick={hanldeAllDetails}>
                  <FontAwesomeIcon
                    className="sidebar-faicon"
                    icon={faChevronLeft}
                  />
                </span>
                {pageProps.mydata.locality}, {pageProps.mydata.city}
              </div>
              <ul className="masonryGrid">
                {photoValue.map((object, index) => (
                  <li key={index}>
                    <img
                      src={object}
                      className="allPic"
                      onClick={() => OpenDialog(object)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Property;
