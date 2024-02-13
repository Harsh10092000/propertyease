import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="main-content">
        <div className="full-width-header">
          <Navbar />
        </div>
        <div className="col-md-12 error-content">
          <div className="error-pict">
            <img src="/images/404-error.webp" alt="dev logo" />
          </div>
          <Link to="/" className="btn btn-primary mt-5">
            Go To Home page
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
