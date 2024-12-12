import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/index/Index";
import "./custom.css";
import Login from "./pages/login/Login";
import Listing from "./pages/listing/Listing";
import AllProperties from "./pages/allproperties/AllProperties";
import About from "./pages/about/About";
import Terms from "./pages/terms/Terms";
import Privacy from "./pages/privacy/Privacy";
import User from "./pages/user/User";
//import UserDashboard from "./pages/userdashboard/UserDashboard";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
//import UserShortlisted from "./pages/shortlisted/UserShortlisted";
import Property from "./pages/property/Property";
import { useLocation } from "react-router-dom";
import AddProperty from "./pages/addProperty/AddProperty";
import SubCat from "./pages/subCat/SubCat";
import EditProperty from "./pages/editProperty/EditProperty";
import NotFound from "./pages/notfound/NotFound";
import Admin from "./pages/admin/Admin";
//import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
//import { AdminContext } from "./context/AdminContext";
//import AdminLogin from "./pages/adminLogin/AdminLogin";
//import AdminInterest from "./pages/adminInterest/AdminInterest";
import NriService from "./pages/nriService/NriService";
//import AdminUsers from "./pages/adminUsers/AdminUsers";
import PostRequirements from "./pages/postRequirements/PostRequirements";
//import AdminShortlisted from "./pages/adminShortlisted/AdminShortlisted";
import Rent from "./pages/rent/Rent";
import Watermark from "./pages/watermark/Watermark";
import WatermarkOthers from "./pages/WatermarkOthers/WatermarkOthers";
import PostRequirement from "./pages/postRequirement/PostRequirement";
//import AdminRequirement from "./pages/adminRequirement/AdminRequirement";
//import UserProfileForm from "./pages/userProfileForm/UserProfileForm";
import AgentProifle from "./pages/agentProfile/AgentProifle";
import AgentsListing from "./pages/agentsListing/AgentsListing";
import AgentProperties from "./pages/agentProperties/AgentProperties";
//import UserdashboardProfile from "./pages/userdashboardProfile/UserdashboardProfile";
//import EditUserProfile from "./pages/edituserProfile/EditUserProfile";
//import ContactUs from "./pages/contactUs/contactUs";
import ContactUs from "./pages/contactUs/ContactUs";
import CityMaps from "./pages/cityMaps/CityMaps";

//import AdsForm from "./pages/adsForm/AdsForm";
//import AdminAd from "./pages/adminAd/AdminAd";
//import EditAdsForm from "./pages/editAds/EditAdsForm";

import ViewUserProperties from "./pages/viewuserProperties/ViewUserProperties";

//import PropertyPlanForm from "./pages/propertyPlanForm/PropertyPlanForm";
//import EditPropertyPlanForm from "./pages/editPropertyPlanForm/EditPropertyPlanForm";
//import AdminPropertyPlans from "./pages/adminPropertyPlans/AdminPropertyPlans";

//import CityMapsForm from "./pages/cityMapsForm/CityMapsForm";
//import AdminCityMaps from "./pages/adminCityMaps/AdminCityMaps";
//import EditCityMaps from "./pages/editCityMaps/EditCityMaps";

//import UserSubscriptionPlans from "./pages/userSubscriptionPlans/UserSubscriptionPlans";

//import AdminProPlanTran from "./pages/adminProPlanTran/AdminProPlanTran";
//import PaymentSucess from "./pages/paymentSuccess/PaymentSucess";

import SendJwt from "./components/SendJwt";
import PropertyByCity from "./pages/propertyByCity/PropertyByCity";

//import ProPlanCouponForm from "./pages/proPlanCouponForm/ProPlanCouponForm"; 
//import ViewCoupons from "./pages/adminCoupons/ViewCoupons";
//import EditProPlanCoupon from "./pages/editProPlanCoupon/EditProPlanCoupon";

//import EmailSet from "./pages/adminSettings/EmailSet";
//import ChangePhoneNumber from "./pages/adminSettings/ChangePhoneNumber";
//import EmailBoardcast from "./pages/adminSettings/EmailBoardcast";

import Package1 from "./pages/premimumPackages/Package1";
//import UserInsights from "./pages/userInsights/UserInsights";
//import InviteFromUser from "./pages/InviteUser/InviteFromUser";
import SmsComponent from "./components/smsComponent/SmsComponent";
import QuickListing from "./pages/quickListing/QuickListing";
import MailBox from "./pages/InviteUser/MailBox";
import { HelmetProvider } from 'react-helmet-async';
import Disclaimer from "./pages/disclaimer/Disclaimer";
import redirectionData from './components/Redirection.json';



const UserDashboard = lazy(() => import('./pages/userdashboard/UserDashboard'));
const UserInsights = lazy(() => import('./pages/userInsights/UserInsights'));
const UserShortlisted = lazy(() => import('./pages/shortlisted/UserShortlisted'));
const UserProfileForm = lazy(() => import('./pages/userProfileForm/UserProfileForm'));
const UserdashboardProfile = lazy(() => import('./pages/userdashboardProfile/UserdashboardProfile'));
const EditUserProfile = lazy(() => import('./pages/edituserProfile/EditUserProfile'));
const InviteFromUser = lazy(() => import('./pages/InviteUser/InviteFromUser'));
const UserSubscriptionPlans = lazy(() => import('./pages/userSubscriptionPlans/UserSubscriptionPlans'));


const AdminDashboard = lazy(() => import("./pages/adminDashboard/AdminDashboard"));
const AdminInterest = lazy(() => import("./pages/adminInterest/AdminInterest"));
const AdminUsers = lazy(() => import("./pages/adminUsers/AdminUsers"));
const AdminShortlisted = lazy(() => import("./pages/adminShortlisted/AdminShortlisted"));
const AdminRequirement = lazy(() => import("./pages/adminRequirement/AdminRequirement"));
const AdsForm = lazy(() => import("./pages/adsForm/AdsForm"));
const AdminAd = lazy(() => import("./pages/adminAd/AdminAd"));
const EditAdsForm = lazy(() => import("./pages/editAds/EditAdsForm"));
const PropertyPlanForm = lazy(() => import("./pages/propertyPlanForm/PropertyPlanForm"));
const EditPropertyPlanForm = lazy(() => import("./pages/editPropertyPlanForm/EditPropertyPlanForm"));
const AdminPropertyPlans = lazy(() => import("./pages/adminPropertyPlans/AdminPropertyPlans"));
const AdminCityMaps = lazy(() => import("./pages/adminCityMaps/AdminCityMaps"));
const EditCityMaps = lazy(() => import("./pages/editCityMaps/EditCityMaps"));
const AdminProPlanTran = lazy(() => import("./pages/adminProPlanTran/AdminProPlanTran"));
const ViewCoupons = lazy(() => import("./pages/adminCoupons/ViewCoupons"));
const EditProPlanCoupon = lazy(() => import("./pages/editProPlanCoupon/EditProPlanCoupon"));
const EmailSet = lazy(() => import("./pages/adminSettings/EmailSet"));
const ChangePhoneNumber = lazy(() => import("./pages/adminSettings/ChangePhoneNumber"));
const EmailBoardcast = lazy(() => import("./pages/adminSettings/EmailBoardcast"));


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};


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


  const redirections = redirectionData.map((item, index) => ({
    path: item.old_url, 
    element: <Navigate key={index} to={item.new_url} />
  }));
  

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
      path: "/pricing",
      element: <Package1 />,
    },
    {
      path: "/disclaimer",
      element: <Disclaimer />,
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
            <Suspense fallback={<div>Loading...</div>}>
              <SendJwt />
              <UserDashboard />
            </Suspense>
          ),
        },
        {
          path: "insights/:proid",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SendJwt />
              <UserInsights />
            </Suspense>
          ),
        },
        {
          path: "shortlisted",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SendJwt />
              <UserShortlisted />
            </Suspense>
          ),
        },
        {
          path: "user-profile-form",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SendJwt />
              <UserProfileForm />
            </Suspense>
          ),
        },
        {
          path: "user-profile/:userId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SendJwt />
              <UserdashboardProfile />
            </Suspense>
          ),
        },
        {
          path: "edit-user-profile/:agentId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SendJwt />
              <EditUserProfile />
            </Suspense>
          ),
        },
        {
          path: "invite-user",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SendJwt />
              <InviteFromUser />
            </Suspense>
          ),
        },
        {
          path: "mysubscription",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SendJwt />
              <UserSubscriptionPlans />
            </Suspense>
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
    {
      path: "/sms",
      element: <SmsComponent />,
    },
     {
      path: "/quick-list",
      element: <QuickListing />,
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
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminDashboard />
            </Suspense>
          ),
        },
        {
          path: "interested",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminInterest />
            </Suspense>
          ),
        },
        {
          path: "allUsers",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminUsers />
            </Suspense>
          ),
        },
        {
          path: "shortlisted",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminShortlisted />
            </Suspense>
          ),
        },
        {
          path: "requirements",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRequirement />
            </Suspense>
          ),
        },
        {
          path: "adsform",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdsForm />
            </Suspense>
          ),
        },
        {
          path: "adslist",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminAd />
            </Suspense>
          ),
        },
        {
          path: "edit/:adId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <EditAdsForm />
            </Suspense>
          ),
        },
        {
          path: "propertyplanform",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <PropertyPlanForm />
            </Suspense>
          ),
        },
        {
          path: "editpropertyplan/:planId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <EditPropertyPlanForm />
            </Suspense>
          ),
        },
        {
          path: "propertyplans",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminPropertyPlans />
            </Suspense>
          ),
        },
        {
          path: "citymapsform",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CityMapsForm />
            </Suspense>
          ),
        },
        {
          path: "citymaps",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminCityMaps />
            </Suspense>
          ),
        },
        {
          path: "editcitymap/:mapId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <EditCityMaps />
            </Suspense>
          ),
        },
        {
          path: "propertyplantranactions",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminProPlanTran />
            </Suspense>
          ),
        },
        {
          path: "coupons",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ViewCoupons />
            </Suspense>
          ),
        },
        {
          path: "editcoupon/:couponId",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <EditProPlanCoupon />
            </Suspense>
          ),
        },
        {
          path: "emailsettings",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <EmailSet />
            </Suspense>
          ),
        },
        {
          path: "changephonenumber",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ChangePhoneNumber />
            </Suspense>
          ),
        },
        {
          path: "emailboardcast",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <EmailBoardcast />
            </Suspense>
          ),
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
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
    </>
  );
};

export default App;