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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const { currentUser } = useContext(AuthContext);
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
      path: "/login",
      element: (
        <Unprotected>
          <Login />
        </Unprotected>
      ),
    },
    {
      path: "/listing/:cat",
      element: <Listing />,
    },
    {
      path: "/allproperties",
      element: <AllProperties />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/termsAndConditions",
      element: <Terms />,
    },
    {
      path: "/privacypolicy",
      element: <Privacy />,
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
      path: "/property/:id",
      element: (
        <>
          <ScrollToTop />
          <Property />
        </>
      ),
    },
    {
      path: "addProperty",
      element: <AddProperty />,
    },
    {
      path: "/subCat/:cat",
      element: <SubCat />,
    },
    {
      path: "/editProperty/:id",
      element: <EditProperty />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
