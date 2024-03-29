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
import DateTime from "../../dateTime";

const Property = () => {
  const curr_date = Date.now();
  const date = new Date(1710738331821);
  console.log(date);
  date.setUTCHours(date.getUTCHours() + 5);
  date.setUTCMinutes(date.getUTCMinutes() + 30);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  const formattedTimestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const arrproId = id.split("-");
  const proId = arrproId[arrproId.length - 1];

  useEffect(() => {
    isNaN(proId) && navigate(`/notfound`);
  }, [proId]);

  const propertyType = [
    { type: "View Residentail Properties", link: "/property/residential" },
    { type: "View Commerical Properties", link: "/property/commercial" },
    { type: "View Land/Plots Properties", link: "/property/land" },
  ];

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

  const propertyType1 = [
    // {
    //   type: "Residential Land",
    //   description: `${data.pro_area_size} ${data.pro_area_size_unit} ${
    //     data.pro_type ? data.pro_type.split(",")[0] : ""
    //   } for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in ${
    //     data.pro_locality ? data.pro_locality + ", " : ""
    //   }${data.pro_sub_district ? data.pro_sub_district + ", " : ""}${
    //     data.pro_city
    //   }. Pretty, calm setting with lovely views. Gently sloping ground is perfect for building your dream home.
    //   The property is ideal for multiple-purpose use because of the good connectivity with the city.
    //   Utilities are ready, so you can start building right away. Neighborhood rules help keep things looking nice.
    //   Flexible zoning for different property uses. Low taxes and HOA fees.
    //   This is an excellent chance to invest in or build your peaceful natural hideaway.`,
    // },
    // {
    //   type: "Independent House",
    //   description: `${data.pro_area_size} ${data.pro_area_size_unit} ${
    //     data.pro_type ? data.pro_type.split(",")[0] : ""
    //   } for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in ${
    //     data.pro_locality ? data.pro_locality + ", " : ""
    //   }${data.pro_sub_district ? data.pro_sub_district + ", " : ""}${
    //     data.pro_city
    //   }. Pretty, calm setting with lovely views. Gently sloping ground is perfect for building your dream home.
    //   The property is ideal for multiple-purpose use because of the good connectivity with the city.
    //   Utilities are ready, so you can start building right away. Neighborhood rules help keep things looking nice.
    //   Flexible zoning for different property uses. Low taxes and HOA fees.
    //   This is an excellent chance to invest in or build your peaceful natural hideaway.`,
    // },

    {
      type: "Apartment",
      description: `${data.pro_area_size} ${data.pro_area_size_unit} ${
        data.pro_type ? data.pro_type.split(",")[0] : ""
      } for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in ${
        data.pro_locality ? data.pro_locality + ", " : ""
      }${data.pro_sub_district ? data.pro_sub_district + ", " : ""}${
        data.pro_city
      } is available. The open floor plan is 
      bright and airy, with huge windows that let in tons of natural light. The kitchen is a chef's dream - gorgeous countertops and 
      enough space to cook for a crowd comfortably. 
      It is in the city's heart but feels like a relaxing urban oasis. Contact us now to make this apartment yours. 
      `,
    },

    {
      type: "Independent House",
      description: `This stunning ${data.pro_area_size} ${
        data.pro_area_size_unit
      } ${data.pro_type ? data.pro_type.split(",")[0] : ""} for ${
        data.pro_ad_type === "Rent" ? "Rent" : "Sale"
      } in ${data.pro_locality ? data.pro_locality + ", " : ""}${
        data.pro_sub_district ? data.pro_sub_district + ", " : ""
      }${data.pro_city} is a total 
      showstopper when you pull up. Its open layout is perfect for entertaining, with huge windows that flood the place with natural 
      light. 
      The kitchen will make you want to quit your job and become a chef. It has premium appliances and a gorgeous island just for 
      hosting parties. 
      Upstairs, the master suite is a private oasis with a nice bathroom and comfortable surroundings. 
      This beauty checks every box in one of the most sought-after neighborhoods.
      `,
    },

    {
      type: "Builder Floor",
      description: `This ${data.pro_area_size} ${data.pro_area_size_unit} ${
        data.pro_type ? data.pro_type.split(",")[0] : ""
      } for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in ${
        data.pro_locality ? data.pro_locality + ", " : ""
      }${data.pro_sub_district ? data.pro_sub_district + ", " : ""}${
        data.pro_city
      } is lovely. It's a blank slate ready for you to work your magic and make it 
    completely yours. The open layout is perfect for getting that creativity flowing - will you go modern and sleek or 
    have more of a cozy vibe? And with those oversized windows, you'll have natural light for days. 

    All the best shops, restaurants, you name it, it is nicely connected to all the necessary places. 
    Don't miss this opportunity to build your dream place from the ground up. This baby's ready for you to make it home.
    `,
    },
    {
      type: "Farm HouseRaw House",
      description: `Checkout the ${data.pro_area_size} ${
        data.pro_area_size_unit
      } ${data.pro_type ? data.pro_type.split(",")[0] : ""} for ${
        data.pro_ad_type === "Rent" ? "Rent" : "Sale"
      } in ${data.pro_locality ? data.pro_locality + ", " : ""}${
        data.pro_sub_district ? data.pro_sub_district + ", " : ""
      }${
        data.pro_city
      }, it is an absolute blank canvas ready for your creativity! It 
    needs some TLC, but that's the fun part. Imagine stripping it down and making it exactly how you want - a concept kitchen with a 
    sweet island for all your hosting needs, a cozy living room with amazing built-ins, and maybe even an extra bedroom for your 
    at-home gym. 

    The possibilities are endless when you start from scratch! The location can't be beat—a quiet residential street minutes from 
    all the action. I'm telling you, get in on this fixer-upper before somebody else scoops it up. Roll up those sleeves and make 
    this place your masterpiece!
    `,
    },
    {
      type: "Retirement Community",
      description: `Discover a vibrant community designed exclusively for those seeking an active and 
    enriching retirement lifestyle. This ${data.pro_area_size} ${
        data.pro_area_size_unit
      } ${data.pro_type ? data.pro_type.split(",")[0] : ""} for ${
        data.pro_ad_type === "Rent" ? "Rent" : "Sale"
      } in ${data.pro_locality ? data.pro_locality + ", " : ""}${
        data.pro_sub_district ? data.pro_sub_district + ", " : ""
      }${
        data.pro_city
      } offers an array of amenities tailored to promote well-being and social connections. 

    Enjoy a maintenance-free lifestyle in beautifully appointed homes while enjoying access to the best recreational facilities. 
    Experience a carefree and fulfilling retirement in this warm and welcoming community.
    `,
    },
    {
      type: "Studio Apartment",
      description: `A studio apartment is a compact living space typically featuring a combined bedroom, 
    living room, kitchen area, and separate bathroom. It's designed to maximize functionality in a limited space, offering individuals 
    or couples a convenient and often affordable housing option.

    This ${data.pro_area_size} ${data.pro_area_size_unit} ${
        data.pro_type ? data.pro_type.split(",")[0] : ""
      } for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in ${
        data.pro_locality ? data.pro_locality + ", " : ""
      }${data.pro_sub_district ? data.pro_sub_district + ", " : ""}${
        data.pro_city
      } will meet all your expectations and requirements. If you are interested, Contact us now.
    `,
    },
    {
      type: "Residential Land",
      description: `Check-out ${data.pro_area_size} ${
        data.pro_area_size_unit
      } ${data.pro_type ? data.pro_type.split(",")[0] : ""} for ${
        data.pro_ad_type === "Rent" ? "Rent" : "Sale"
      } in ${data.pro_locality ? data.pro_locality + ", " : ""}${
        data.pro_sub_district ? data.pro_sub_district + ", " : ""
      }${data.pro_city}.
     Its neighborhood is great for a dream home. Located near the supermarket. A lovely backyard was recently renovated, with a 
     patio ideal for entertaining guests. Good schools, parks, and shops are nearby. Whether you are moving in tomorrow or today, 
     this house is ready to be occupied. If you want a residential property at a key location, contact us now!
    `,
    },
    {
      type: "Commercial Land",
      description: `Great ${data.pro_area_size} ${data.pro_area_size_unit} ${
        data.pro_type ? data.pro_type.split(",")[0] : ""
      } for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in ${
        data.pro_locality ? data.pro_locality + ", " : ""
      }${data.pro_sub_district ? data.pro_sub_district + ", " : ""}${
        data.pro_city
      } in a 
    convenient spot. Lots of parking spaces. Easy to see from the road. Flexible open spaces inside. Secure entry. Close to highways 
    and shopping areas. Perfect place for your executing your commercial goals 

    Great commercial Property is available at key locations at affordable rates! Don't miss this fantastic opportunity!
    `,
    },
    {
      type: "Industrial Land",
      description: `Check out the ${data.pro_area_size} ${
        data.pro_area_size_unit
      } ${data.pro_type ? data.pro_type.split(",")[0] : ""} for ${
        data.pro_ad_type === "Rent" ? "Rent" : "Sale"
      } in ${data.pro_locality ? data.pro_locality + ", " : ""}${
        data.pro_sub_district ? data.pro_sub_district + ", " : ""
      }${data.pro_city} set 
    aside for factories, warehouses, and other large workplaces. It is located in areas with good roads, power, and water for big 
    buildings and machinery. The lots are big enough to fit the manufacturing plants and storage facilities. 

    The highway's connectivity makes goods and products easily transportable. Contact us if you want to acquire the perfect piece 
    of land to set up an industry. 
    `,
    },
    {
      type: "Agricultural Land",
      description: `When we refer to agricultural land, we mean areas where people grow crops, raise livestock, and 
      do other farming activities. Get the ${data.pro_area_size} ${
        data.pro_area_size_unit
      } ${data.pro_type ? data.pro_type.split(",")[0] : ""} for ${
        data.pro_ad_type === "Rent" ? "Rent" : "Sale"
      } in ${data.pro_locality ? data.pro_locality + ", " : ""}${
        data.pro_sub_district ? data.pro_sub_district + ", " : ""
      }${data.pro_city} in 
      rural or semi-rural settings. These lands have ample space for seedbeds and pasturing. 
      Zoning laws prevent non-agricultural uses on these lands to maintain the purpose and the continuation of food production 
      in an agricultural economy. If you are interested in this land, contact us now. 
    `,
    },
    {
      type: "Farm House Land",
      description: `${data.pro_area_size} ${data.pro_area_size_unit} ${
        data.pro_type ? data.pro_type.split(",")[0] : ""
      } for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in ${
        data.pro_locality ? data.pro_locality + ", " : ""
      }${data.pro_sub_district ? data.pro_sub_district + ", " : ""}${
        data.pro_city
      } is perfect for a farmhouse that combines residential living with agricultural 
    activities. These properties often feature a primary dwelling, such as a traditional farmhouse or a modern home, surrounded by 
    ample acreage suitable for farming operations. 
    Farmhouse properties offer a blend of rural tranquility and self-sustaining agricultural lifestyle, appealing to those 
    seeking a connection to the land and a taste of country living.
    `,
    },
    {
      type: "Retail Showroom",
      description: `A retail showroom is a dedicated space where products or merchandise are displayed and 
    showcased to potential customers. It is a physical location for retailers to present their offerings, allowing customers to
     view, inspect, and experience the products in person. 
    Check this amazing place ${data.pro_area_size} ${data.pro_area_size_unit} ${
        data.pro_type ? data.pro_type.split(",")[0] : ""
      } for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in ${
        data.pro_locality ? data.pro_locality + ", " : ""
      }${data.pro_sub_district ? data.pro_sub_district + ", " : ""}${
        data.pro_city
      }, for a perfect 
    start to your business. Contact us for more details.
    `,
    },
    {
      type: "Commercial Building",
      description: `Rare opportunity to own a well-maintained ${
        data.pro_area_size
      } ${data.pro_area_size_unit} ${
        data.pro_type ? data.pro_type.split(",")[0] : ""
      } for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in ${
        data.pro_locality ? data.pro_locality + ", " : ""
      }${data.pro_sub_district ? data.pro_sub_district + ", " : ""}${
        data.pro_city
      }. This versatile building features spacious open floor plans and ample natural 
      lighting, making it suitable for various businesses. 
    With its strategic location, high visibility, and convenient access to major transportation routes, this property offers 
    excellent exposure and accessibility for your thriving enterprise. Don't miss this chance to secure a prime commercial space 
    that caters to your business needs.
    `,
    },
    {
      type: "Office Complex",
      description: `Check this prime ${data.pro_area_size} ${
        data.pro_area_size_unit
      } ${data.pro_type ? data.pro_type.split(",")[0] : ""} for ${
        data.pro_ad_type === "Rent" ? "Rent" : "Sale"
      } in ${data.pro_locality ? data.pro_locality + ", " : ""}${
        data.pro_sub_district ? data.pro_sub_district + ", " : ""
      }${
        data.pro_city
      }, It is a real gem in the city's heart. Its sleek, modern design 
    and floor-to-ceiling windows make it a bright and inspiring workplace. The open layouts encourage collaboration, while 
    the private offices provide plenty of space for heads-down focus. 
    The location can't be beat, it is perfect for all your office needs. If you want to upgrade your office space, this complex 
    checks all the boxes.
    `,
    },
    {
      type: "Software Technology Park",
      description: `This innovative ${data.pro_area_size} ${
        data.pro_area_size_unit
      } ${data.pro_type ? data.pro_type.split(",")[0] : ""} for ${
        data.pro_ad_type === "Rent" ? "Rent" : "Sale"
      } in ${data.pro_locality ? data.pro_locality + ", " : ""}${
        data.pro_sub_district ? data.pro_sub_district + ", " : ""
      }${data.pro_city} is home to some of the brightest minds in tech. 
    The vibe is amazing, with startups and established companies collaborating under one roof. The spaces are designed for productivity. 
    Whether you're a coding guru or the next Zuckerberg, this park has everything you need to improve your software game. 
    For more details, please contact us. 
    `,
    },
    {
      type: "Warehouse",
      description: `This ${data.pro_area_size} ${data.pro_area_size_unit} ${
        data.pro_type ? data.pro_type.split(",")[0] : ""
      } for ${data.pro_ad_type === "Rent" ? "Rent" : "Sale"} in ${
        data.pro_locality ? data.pro_locality + ", " : ""
      }${data.pro_sub_district ? data.pro_sub_district + ", " : ""}${
        data.pro_city
      } warehouse means business. With its prime location right off the highway, you 
    have straight shipping and receiving connectivity. 
    It's not just massive—it's smart, too. It has top-notch security systems and climate-controlled areas to protect your goods. 
    Whether you're stocking up on inventory or fulfilling orders left and right, this place has you covered. For a warehouse that 
    works as hard as you do, drive on over and check it out.
    `,
    },
    {
      type: "Industrial Estate",
      description: `Checkout this ${data.pro_area_size} ${
        data.pro_area_size_unit
      } ${data.pro_type ? data.pro_type.split(",")[0] : ""} for ${
        data.pro_ad_type === "Rent" ? "Rent" : "Sale"
      } in ${data.pro_locality ? data.pro_locality + ", " : ""}${
        data.pro_sub_district ? data.pro_sub_district + ", " : ""
      }${
        data.pro_city
      }, made for hard-working contractors like you. Its location is 
    prime real estate with easy access to all the major roads and highways. The utilities include heavy-duty power, water, and 
    sewage. You name it—this place can handle it all. 
    Security is also high-quality—24/7 patrols and world-class systems protect your assets. Whether you're in construction, 
    manufacturing, or the trades, this estate has everything a thriving industrial business needs. For more details, contact us. 
    `,
    },
  ];

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

  const location = window.location.href;
  const handleClose = () => {
    setOpen(false);
  };
  const handleCurrentImage = (item) => {
    setCurrentImage(item);
  };

  const [subDistrict, setSubDistrict] = useState();
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
          `/api/pro/SubDistrictDataByCity/${data.pro_city}`
      )
      .then((res) => {
        setSubDistrict(res.data);
      });
  }, [data.pro_city]);

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
                            {" " + data.pro_ad_type} in{" "}
                            {/* <span className="text-capitalize"> */}
                              {data.pro_locality + ","}
                            {/* </span> */}
                            {data.pro_sub_district
                              ? data.pro_sub_district + ", "
                              : ""}
                            {data.pro_city},&nbsp;
                            {data.pro_state}
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
                          Listed by {" " + data.pro_user_type}{" "}
                          {DateTime(data.pro_date)}
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
                          <div className="d-flex align-items-center justify-content-between pl-md-0 ">
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
                                      Already
                                    </span>
                                    <span className="">Contacted</span>
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
                            {images.length > 1 ? (
                              <EmblaCarousel
                                pro_area_size={data.pro_area_size}
                                pro_area_size_unit={data.pro_area_size_unit}
                                pro_type={data.pro_type}
                                pro_ad_type={data.pro_ad_type}
                                pro_city={data.pro_city}
                                slides={images}
                                open={() => setOpen(true)}
                                handleCurrentImage={handleCurrentImage}
                              />
                            ) : (
                              <img
                                src="/images/default.png"
                                //alt="No Image"
                                // alt={
                                //   data.pro_area_size +
                                //   " " +
                                //   data.pro_area_size_unit +
                                //   " " +
                                //   data.pro_type && data.pro_type.split(",")[0] +
                                //   " For" +
                                //   " " +
                                //   data.pro_ad_type +
                                //   " in " +
                                //   data.pro_city
                                // }
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
                    <div className="property-more-detail">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="details">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="more-detail-heading">
                                  View Near By Properties
                                </div>
                                {subDistrict && data ? (
                                  <div className="d-flex flex-wrap tags-link ">
                                    {subDistrict.map((item) => (
                                      <Link
                                        to={`/${data.pro_type
                                          .split(",")[1]
                                          .toLowerCase()}/${data.pro_type
                                          .split(",")[0]
                                          .replaceAll(" ", "-")
                                          .toLowerCase()}?search=${
                                          item.sub_district
                                        }`}
                                      >
                                        <div className="loc-list mb-0">
                                          <span className="text-dark font-weight-bold">
                                            {data.pro_type &&
                                              data.pro_type.split(",")[0] +
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
                                        <div className="loc-list mb-0">
                                          <span className="text-dark font-weight-bold">
                                            {item.type}
                                          </span>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="property-more-detail">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="details">
                            <div className="row">
                              {data.pro_type && (
                                <div className="col-md-12">
                                  <div className="more-detail-heading">
                                    Additional Features
                                  </div>

                                  {data.pro_type.split(",")[1] ===
                                  "Residential" ? (
                                    <p>
                                      Its neighborhood is great for a dream
                                      home. Located near the{" "}
                                      {data.pro_sub_district
                                        ? data.pro_sub_district + ", "
                                        : ""}
                                      {data.pro_city}. A lovely backyard was
                                      recently renovated, with a patio ideal for
                                      entertaining guests. Good schools, parks,
                                      and shops are nearby. Whether you are
                                      moving in tomorrow or today, this house is
                                      ready to be occupied.
                                    </p>
                                  ) : data.pro_type.split(",")[1] ==
                                    "Commercial" ? (
                                    <p>
                                      {data.pro_area_size +
                                        " " +
                                        data.pro_area_size_unit +
                                        " "}
                                      {data.pro_type
                                        ? data.pro_type.split(",")[0]
                                        : ""}
                                      for{" "}
                                      {data.pro_ad_type === "Rent"
                                        ? "Rent"
                                        : "Sale"}{" "}
                                      in
                                      {data.pro_locality
                                        ? data.pro_locality + ", "
                                        : ""}
                                      {data.pro_sub_district
                                        ? data.pro_sub_district + ", "
                                        : ""}
                                      {data.pro_city}
                                      in a convenient spot. Lots of parking
                                      spaces. Easy to see from the road.
                                      Flexible open spaces inside. Secure entry.
                                      Close to highways and shopping areas.
                                      Perfect place for your executing your
                                      commercial goals Great commercial property
                                      is available at key locations at
                                      affordable rates! Don't miss this
                                      fantastic opportunity!
                                    </p>
                                  ) : data.pro_type.split(",")[1] === "Land" ? (
                                    <p>
                                      {data.pro_area_size +
                                        " " +
                                        data.pro_area_size_unit +
                                        " "}
                                      {data.pro_type
                                        ? data.pro_type.split(",")[0]
                                        : ""}
                                      for{" "}
                                      {data.pro_ad_type === "Rent"
                                        ? "Rent"
                                        : "Sale"}{" "}
                                      in
                                      {data.pro_locality
                                        ? " " + data.pro_locality + ", "
                                        : ""}
                                      {data.pro_sub_district
                                        ? data.pro_sub_district + ", "
                                        : ""}
                                      {data.pro_city}. Pretty, calm setting with
                                      lovely views. Gently sloping ground is
                                      perfect for building your dream home. The
                                      property is ideal for multiple-purpose use
                                      because of the good connectivity with the
                                      city. Utilities are ready, so you can
                                      start building right away. Neighborhood
                                      rules help keep things looking nice.
                                      Flexible zoning for different property
                                      uses. Low taxes and HOA fees. This is an
                                      excellent chance to invest in or build
                                      your peaceful natural hideaway.
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    <div className="property-more-detail">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="details">
                            <div className="row">
                              {data.pro_type && (
                                <div className="col-md-12">
                                  <div className="more-detail-heading">
                                    More About this Property
                                  </div>

                                  {/* {data.pro_type.split(",")[1] ===
                                  "Residential" ? (
                                    <p>
                                      Its neighborhood is great for a dream
                                      home. Located near the{" "}
                                      {data.pro_sub_district
                                        ? data.pro_sub_district + ", "
                                        : ""}
                                      {data.pro_city}. A lovely backyard was
                                      recently renovated, with a patio ideal for
                                      entertaining guests. Good schools, parks,
                                      and shops are nearby. Whether you are
                                      moving in tomorrow or today, this house is
                                      ready to be occupied.
                                    </p>
                                  ) 
                            
                                  : (
                                    ""
                                  
                                  )} */}

                                  {propertyType1.map(
                                    (item) =>
                                      data.pro_type.split(",")[0] ===
                                        item.type && <p>{item.description}</p>
                                  )}
                                </div>
                              )}
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
                                      <a
                                        title="View complete details of this property"
                                        className="btn-viewmore"
                                      >
                                        View More
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="d-flex flex-row-reverse mt-4 mr-3">
                          <Link to={`/property/${proType}`}>
                            <a
                              title="Click to view all properties"
                              className="btn-viewall px-4 "
                            >
                              View All
                            </a>
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
