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
import { useContext, useEffect } from "react";
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
      path: "/allproperties",
      element: <AllProperties />,
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
          element: <UserDashboard />,
        },
        {
          path: "shortlisted",
          element: <UserShortlisted />,
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
      element: <AddProperty />,
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
      path: "/editProperty/:id",

      element: (
        <ProtectedRoute>
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
          <Admin />
        </ProtectedAdmin>
      ),
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
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
      path: "/watermark2",
      element: <WatermarkOthers />,
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
