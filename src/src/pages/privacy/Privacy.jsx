import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <div>
      <Helmet>
        <title>
          Propertyease - Buy Best Property in Kurukshetra - Verified & Lowest
          Pricing
        </title>
        <meta
          name="description"
          content="Propertyease - Buy Best Property in Kurukshetra - Verified & Lowest Pricing"
        />
      </Helmet>
      <Navbar />

      <div className="container">
        <section className="main-content">
          <div className="container">
            <div className="col-md-12">
              <h2>Privacy Policy</h2>
              <p>
                Propertyease.in is a registered website founded in 2023, with
                the sole mission and objective of simplifying the transparent
                process of selling and buying property. Since we are committed
                to your right to privacy, we have drafted out a privacy policy
                with regard to your collected.
              </p>
              <p>
                We gather information from users/clients and guests who apply
                for the various services our site offers. It includes, but may
                not be limited to, email address, name, a user-specified
                password, mailing address, zip code and phone number but also
                collect additional information about your property.
              </p>
              <p>
                We collects information from our clients primarily to ensure
                that we give them the personalize and better experience to use
                our website.
              </p>
              <p>
                The information collected from any of our clients is shared with
                their approval to individuals and organizations. Propertyease
                does not sell, rent, or loan any identifiable information at the
                individual level regarding its customers to any third party. We
                may disclose to third party services certain personally
                identifiable information such as name, email, mobile number and
                information we collect as you access and use our service,
                including device information, location and network carrier. This
                information is shared with third party service providers so that
                we can personalize the app for you and perform behavioral
                analytics. Any information you give us is held with the utmost
                care and security and revealed unless you want it to. We are
                also bound to cooperate fully should a situation arise where we
                are required by law or legal process to provide information
                about a customer.
              </p>
              <p>
                If the Real estate professional, Builder, Agent/Broker or any
                individual has provided their contact information for everyone
                to see then users can contact them at their request.
              </p>
              <h4>Notice</h4>
              <p>
                We may change this Privacy Policy from time to time based on
                your comments or as a result of a change of policy in our
                company. If you have any questions regarding our Privacy
                Statement, please write in to info@Propertyease.in.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
