import {
  IconQuestionMark,
  IconSend,
  IconShare3,
  IconStarFilled,
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
import { Snackbar } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Property = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const proId = id.split("_")[1];
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertyDataById/${proId}`
      )
      .then((res) => {
        setData(res.data[0]);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchImagesWithId/${proId}`)
      .then((res) => {
        setImages(res.data);
      });
  }, []);
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
      } catch (err) {
        setErr(err.response.data);
        setSnack(true);
      }
    }
  };
  const [dialog, setDialog] = useState(false);

  return (
    <div>
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            As to shorlist the property you have to login first.
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
            background: "black",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack}
        autoHideDuration={1000}
        onClose={() => setSnack(false)}
        message={err ? err : "Property Has been Shortlisted"}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <EmblaCarousel slides={images} />
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
                    <Link

                    //   href={
                    //     "/property-listing/" + pageProps.mydata.propertyMainType
                    //   }
                    >
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
                    <div className="top" id="dynamic">
                      <h1 className="capitalize">
                        {data.pro_type ? data.pro_type.split(",")[0] : ""} For
                        {data.pro_ad_type === "New"
                          ? " Sale"
                          : " " + data.pro_ad_type}
                      </h1>
                      <div className="property-top-address">
                        {data.pro_locality + " , " + data.pro_city}
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <div className="property-price">
                            {"₹ " + data.pro_amt + " " + data.pro_amt_unit}
                          </div>
                          <div></div>
                          <button
                            className="btn btn-success"
                            title="Ask a Question"
                          >
                            <IconQuestionMark className="property-faicon" />
                            <span className="d-none d-md-inline">
                              Ask a question
                            </span>
                          </button>
                          <button
                            className="btn btn-danger"
                            title="Show Interest"
                          >
                            <IconSend className="property-faicon" />
                            <span className="mobile-hidden">
                              Interested in Buying
                            </span>
                          </button>
                          <button
                            className="btn btn-outline-primary ml-2"
                            title="Shortlist"
                            // onClick={handleBookmark}
                            onClick={shortlistProperty}
                          >
                            <IconStarFilled className="property-faicon" />
                            <span className="d-none d-md-inline">
                              Shortlist
                            </span>
                          </button>
                        </div>
                        <button className="share-property">
                          <a
                            rel="noreferrer nofollow"
                            className="facebook-share btn btn-primary"
                            href={`https://www.facebook.com/sharer.php?u=https://www.propertyease.in/property/${id}`}
                            target="_blank"
                          >
                            <span className="mobile-hidden">Facebook</span>
                            <IconShare3 />
                          </a>
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="leftblock">
                          <div className="photosection">
                            {images.length > 0 ? (
                              <EmblaCarousel
                                slides={images}
                                open={() => setOpen(true)}
                              />
                            ) : (
                              <img
                                src="/images/no-image-available-icon-vector.jpg"
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
                          <h6>
                            Property ID
                            <span className="propertypage-id">{id}</span>
                          </h6>
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
                                {"₹ " + data.pro_amt + " " + data.pro_amt_unit}
                              </div>
                            </div>
                            <div className="row moreDetail">
                              <div className="col-md-3 more-detail-right">
                                Address
                              </div>
                              <div className="col-md-9 more-detail-left">
                                {data.pro_locality},&nbsp;
                                {data.pro_city}
                              </div>
                            </div>
                            <div className="row moreDetail">
                              <div className="col-md-3 more-detail-right">
                                Facing Road Width
                              </div>
                              <div className="col-md-9 more-detail-left">
                                {data.pro_facing_road_width
                                  ? data.pro_facing_road_width
                                  : "-"}
                                {" " + data.pro_facing_road_unit}
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
