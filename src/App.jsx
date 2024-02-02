import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./pages/index/Index";
import "./custom.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Listing from "./pages/listing/Listing";
import AllProperties from "./pages/allproperties/AllProperties";
import About from "./pages/about/About";
import Terms from "./pages/terms/Terms";
import Privacy from "./pages/privacy/Privacy";
import User from "./pages/user/User";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
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
      element: <User />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
