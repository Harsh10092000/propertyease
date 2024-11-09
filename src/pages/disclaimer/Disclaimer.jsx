import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
const Disclaimer = () => {
  return (
    <>
      <Navbar />
      <div className="post-requierment-wrapper padding-top">
        {/* <div className=" post-requierment-heading ">Post Requirement</div> */}

        <h3 className="aboutus ml-2 mt-4">
          Disclaimer <div className="heading-divider"></div>
        </h3>

        <div className="ml-2 pt-2 pb-5 mb-5 text-dark">All images/information provided in this
                                  listing given by its owner, brokers or
                                  builders may be actual or used
                                  for illustrative purposes only and may not
                                  represent real individuals, places, or events.
                                   In real, images/information about this
                                  property may vary. Kindly verify the physical
                                  possession of the property and its owners and
                                  property documents and cross-check everything
                                  before any transaction. The company is not
                                  responsible for discrepancies found at any
                                  stage. Any resemblance to actual persons or
                                  copyrighted materials is purely coincidental.
                                  Unauthorized use or reproduction of these
                                  images/information is prohibited. If you
                                  believe any image/information violates your
                                  rights, don't hesitate to get in touch with us
                                  for prompt resolution.</div>
      </div>
      <Footer />
    </>
  );
};

export default Disclaimer;
