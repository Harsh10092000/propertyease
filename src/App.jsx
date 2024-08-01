import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Index from "./pages/index/Index";
import "./custom.css";
import Login from "./pages/login/Login";
import Listing from "./pages/listing/Listing";
import AllProperties from "./pages/allproperties/AllProperties";
import About from "./pages/about/About";
import Terms from "./pages/terms/Terms";
import Privacy from "./pages/privacy/Privacy";
import User from "./pages/user/User";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import UserShortlisted from "./pages/shortlisted/UserShortlisted";
import Property from "./pages/property/Property";
import { useLocation } from "react-router-dom";
import AddProperty from "./pages/addProperty/AddProperty";
import SubCat from "./pages/subCat/SubCat";
import EditProperty from "./pages/editProperty/EditProperty";
import NotFound from "./pages/notfound/NotFound";
import Admin from "./pages/admin/Admin";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import { AdminContext } from "./context/AdminContext";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import AdminInterest from "./pages/adminInterest/AdminInterest";
import NriService from "./pages/nriService/NriService";
import AdminUsers from "./pages/adminUsers/AdminUsers";
import PostRequirements from "./pages/postRequirements/PostRequirements";
import AdminShortlisted from "./pages/adminShortlisted/AdminShortlisted";
import Rent from "./pages/rent/Rent";
import Watermark from "./pages/watermark/Watermark";
import WatermarkOthers from "./pages/WatermarkOthers/WatermarkOthers";
import PostRequirement from "./pages/postRequirement/PostRequirement";
import AdminRequirement from "./pages/adminRequirement/AdminRequirement";
import UserProfileForm from "./pages/userProfileForm/UserProfileForm";
import AgentProifle from "./pages/agentProfile/AgentProifle";
import AgentsListing from "./pages/agentsListing/AgentsListing";
import AgentProperties from "./pages/agentProperties/AgentProperties";
import UserdashboardProfile from "./pages/userdashboardProfile/UserdashboardProfile";
import EditUserProfile from "./pages/edituserProfile/EditUserProfile";
//import ContactUs from "./pages/contactUs/contactUs";
import ContactUs from "./pages/contactUs/ContactUs";
import CityMaps from "./pages/cityMaps/CityMaps";

import AdsForm from "./pages/adsForm/AdsForm";
import AdminAd from "./pages/adminAd/AdminAd";
import EditAdsForm from "./pages/editAds/EditAdsForm";

import ViewUserProperties from "./pages/viewuserProperties/ViewUserProperties";

import PropertyPlanForm from "./pages/propertyPlanForm/PropertyPlanForm";
import EditPropertyPlanForm from "./pages/editPropertyPlanForm/EditPropertyPlanForm";
import AdminPropertyPlans from "./pages/adminPropertyPlans/AdminPropertyPlans";

import CityMapsForm from "./pages/cityMapsForm/CityMapsForm";
import AdminCityMaps from "./pages/adminCityMaps/AdminCityMaps";
import EditCityMaps from "./pages/editCityMaps/EditCityMaps";

import UserSubscriptionPlans from "./pages/userSubscriptionPlans/UserSubscriptionPlans";

import AdminProPlanTran from "./pages/adminProPlanTran/AdminProPlanTran";
import PaymentSucess from "./pages/paymentSuccess/PaymentSucess";

import SendJwt from "./components/SendJwt";
import PropertyByCity from "./pages/propertyByCity/PropertyByCity";

import ProPlanCouponForm from "./pages/proPlanCouponForm/ProPlanCouponForm"; 
import ViewCoupons from "./pages/adminCoupons/ViewCoupons";
import EditProPlanCoupon from "./pages/editProPlanCoupon/EditProPlanCoupon";

import EmailSet from "./pages/adminSettings/EmailSet";
import ChangePhoneNumber from "./pages/adminSettings/ChangePhoneNumber";
import EmailBoardcast from "./pages/adminSettings/EmailBoardcast";




const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// const Origin =()=>{
//   const [referrer,setRefferer]=useState("")
//   useEffect(()=>{
//     console.log(referrer)
//     setRefferer(document.referrer)
//     console.log(referrer)
//   },[])
//   return null;
// }

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const { admin } = useContext(AdminContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const Unprotected = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/user/dashboard" />;
    }
    return children;
  };
  const ProtectedAdmin = ({ children }) => {
    if (!admin) {
      return <Navigate to="/adminlogin" />;
    }
    return children;
  };
  const UnprotectedAdmin = ({ children }) => {
    if (admin) {
      return <Navigate to="/admin/dashboard" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/notfound",
      element: <NotFound />,
    },
    {
      path: "/login",
      element: (
        <Unprotected>
          <Login />
        </Unprotected>
      ),
    },
    {
      path: "/property/:cat",
      element: <Listing />,
    },

    
    {
      path: "/contactus",

      element: (
        <>
          <ScrollToTop />
          <ContactUs />
        </>
      ),
    },
    {
      path: "/allproperties",
      element: (
        <>
          {/* <Origin/> */}
          <AllProperties />
        </>
      ),
    },

   

    {
      path: "/about",
      element: (
        <>
          <ScrollToTop />
          <About />
        </>
      ),
    },
    {
      path: "/termsandconditions",
      element: (
        <>
          <ScrollToTop />
          <Terms />
        </>
      ),
    },
    {
      path: "/privacypolicy",
      element: (
        <>
          <ScrollToTop />
          <Privacy />
        </>
      ),
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      ),

      
      children: [
        {
          path: "dashboard",
          element: (
            <>
              <SendJwt />
              <UserDashboard />
            </>
          ),
        },
        {
          path: "shortlisted",
          element: (
            <>
              <SendJwt /> <UserShortlisted />
            </>
          ),
        },
        {
          path: "user-profile-form",
          element:  (
            <>
              <SendJwt /><UserProfileForm />,
              </>
          ),
        },
        {
          path: "user-profile/:userId",
          element: (
            <>
              <SendJwt />
              <UserdashboardProfile />
            </>
          ),
        },
        {
          path: "edit-user-profile/:agentId",
          element: (
            <>
              <SendJwt />
              <EditUserProfile />
            </>
          ),
        },
        {
          path: "mysubscription",
          element: (
            <>
              <SendJwt />
              <UserSubscriptionPlans />
            </>
          ),
        },
      ],
    },
    {
      path: "/:id",
      element: (
        <>
          <ScrollToTop />
          <Property />
        </>
      ),
    },
    {
      path: "addproperty",
      element: (
        <>
          <ScrollToTop />
          <AddProperty />
        </>
      ),
    },
    {
      path: "/:id/:cat",
      element: <SubCat />,
    },
    {
      path: "/rental/:cat",
      element: <Rent />,
    },
    // {
    //   path: "/payment-succesful",
    //   element: <PaymentSucess />,
    // },
    {
      path: "/editProperty/:id1",

      element: (
        <ProtectedRoute>
          <SendJwt />
          <ScrollToTop />
          <EditProperty />
        </ProtectedRoute>
      ),
    },
    {
      path: "/adminlogin",

      element: (
        <UnprotectedAdmin>
          <AdminLogin />
        </UnprotectedAdmin>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedAdmin>
          <ScrollToTop />
          <Admin />
        </ProtectedAdmin>
      ),
      children: [
        {
          path: "dashboard",
          element: <><ScrollToTop /> <AdminDashboard /></> ,
        },
        {
          path: "interested",
          element: <AdminInterest />,
        },
        {
          path: "allUsers",
          element: <AdminUsers />,
        },
        {
          path: "shortlisted",
          element: <AdminShortlisted />,
        },
        {
          path: "requirements",
          element: <AdminRequirement />,
        },
        {
          path: "adsform",
          element: <AdsForm />,
        },
        {
          path: "adslist",
          element: <AdminAd />,
        },
        {
          path: "edit/:adId",
          element: <EditAdsForm />,
        },

        {
          path: "propertyplanform",
          element: <PropertyPlanForm />,
        },
        {
          path: "editpropertyplan/:planId",
          element: <EditPropertyPlanForm />,
        },
        {
          path: "propertyplans",
          element: <AdminPropertyPlans />,
        },
        {
          path: "citymapsform",
          element: <CityMapsForm />,
        },
        {
          path: "citymaps",
          element: <AdminCityMaps />,
        },
        {
          path: "editcitymap/:mapId",
          element: <EditCityMaps />,
        },
        {
          path: "propertyplantranactions",
          element: <AdminProPlanTran />,
        },
        {
          path: "addcoupon",
          element: <ProPlanCouponForm />,
        },
        {
          path: "viewcoupons",
          element: <ViewCoupons />,
        },
        {
          path: "editproplancoupon/:couponId",
          element: <EditProPlanCoupon />,
        },
        {
          path: "emailsettings",
          element: <EmailSet />,
        },
        {
          path: "numbersettings",
          element: <ChangePhoneNumber />,
        },
        {
          path: "mailbroadcast",
          element: <EmailBoardcast />,
        },
        
      ],
    },
    {
      path: "/nriservice",
      element: (
        <>
          <ScrollToTop />
          <NriService />
        </>
      ),
    },
    {
      path: "/postrequirements",
      element: <PostRequirements />,
    },
    {
      path: "/watermark",
      element: <Watermark />,
    },
    {
      path: "/agentProfile/:userId",
      element: (
        <>
          <ScrollToTop />
          <AgentProifle />
        </>
      ),
    },
    {
      path: "/view-properties/:userId",
      element: (
        <>
          <ScrollToTop />
          <ViewUserProperties />
        </>
      ),
    },

    {
      path: "/watermark2",
      element: <WatermarkOthers />,
    },
    {
      path: "/agentList",
      element: <AgentsListing />,
    },
    {
      path: "/agentproperties/:id",
      element: <AgentProperties />,
    },
    {
      // path: "/properties/:adType/:proType/:proCity",
      path: "/properties/:adType/:proType",
      element: 
      (<>
      <ScrollToTop />
      <PropertyByCity />
      </>
    ),
    },
    {
      path: "/citymap/:city",
      element: (
        <>
          <ScrollToTop />
          <CityMaps />
        </>
      ),
    },
    {
      path: "/postrequirement",
      element: (
        <>
          <ScrollToTop />
          <PostRequirement />
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;