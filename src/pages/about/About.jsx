// import React from "react";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";

// const About = () => {
//   return (
//     <div>
//       <Navbar />
//       <div className="container">
//         <section className="main-content">
//           <div className="aboutus-content">
//             <div className="col-md-12">
//               <h2>About Us</h2>
//               <p>
//                 Founded in 2023, Propertyease.in aims to make buying and selling
//                 property easy and stress-free. We connect buyers and sellers
//                 directly and provide helpful tools, detailed listings, and
//                 valuable information to support smart decisions. That is why we
//                 are the best property dealer in town.
//               </p>
//               <p>
//                 Our platform is designed for transparency and efficiency,
//                 ensuring a smooth and reliable experience. Whether you're buying
//                 your dream home or selling a property, Propertyease.in
//                 simplifies the process for you.
//               </p>


//               <p>
//                 <b>For Sellers:</b>
//               </p>
//               <ol>
//                 <li>
//                   <strong>Find Buyers:</strong> Connect with interested buyers quickly.
//                 </li>
//                 <li>
//                   <strong>Free Listings:</strong> List your property for free to reach more people.
//                 </li>
//                 <li>
//                   <strong>3D Tours:</strong> Show off your property with virtual 3D tours.
//                 </li>
//               </ol>


//               <p>
//                 <b>For Buyers:</b>
//               </p>
//               <ol>
//                 <li>
//                   <strong>Lots of Listings:</strong> Browse a wide range of properties easily.
//                 </li>
//                 <li>
//                   <strong>3D Tours:</strong>  Explore properties online with 3D tours to save time.
//                 </li>
//                 <li>
//                   <strong>Meet Sellers:</strong> After you find a property you like, we'll set up a meeting with the seller.
//                 </li>
//               </ol>


//               <p>
//                 <b>Our Core Values:</b>
//               </p>
//               <ol>
//                 <li>
//                   <strong>Transparency:</strong> We keep you informed throughout
//                   the process.
//                 </li>
//                 <li>
//                   <strong>Support:</strong> We help you from the first step to
//                   the last, offering a range of services for a smooth
//                   experience.
//                 </li>
//                 <li>
//                   <strong>Convenience:</strong> Our 3D tours and floor plans let
//                   you explore properties from home.
//                 </li>
//               </ol>
//             </div>
//           </div>
//         </section>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default About;



import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div>
      <Helmet>
      <title>Propertyease - About Us</title>
      <meta name="description" content="Discover who we are at Propertyease.in, a trusted real estate platform dedicated to helping you find your perfect property. Learn about our team, mission, and commitment to providing top-notch real estate services in your area." />
      <link
          rel="canonical"
          href="https://propertyease.in/about"
        ></link>
      </Helmet>
      <Navbar />
      <div className="container">
        <section className="main-content">
          <div className="aboutus-content">
            <div className="col-md-12">
              <h2>About Us</h2>
              <p>
                Propertyease.in is a registered website founded in 2023, with
                the sole mission and objective of simplifying the transparent
                process of selling and buying property. Our purpose is to start
                this website to minimize the gap between seller and buyer and
                provide them convenience in their choice to decide about the
                property. For sellers, we find out the potential buyers from
                their properties and also offer them to list their property for
                free on a website and also offer them to set up a 3D View or
                virtual tour of their property.
              </p>
              <p>
                Also, We help buyers to search out a list of properties on a
                website or also to show them the first 3DView or virtual tours
                of the property before visiting sellers, which helps them to
                minimize the cost. And once they like the virtual tour of the
                property, then we arrange the physical meeting with the sellers.
              </p>
              <p>
                <b>Our 3 core working principles:</b>
              </p>
              <ol>
                <li>
                  <strong>Transparency:</strong> Our whole process is fully
                  transparent and ethical ,and you will be getting updates in
                  every single step.
                </li>
                <li>
                  <strong>Assistance:</strong> We assist our clients from deal
                  start/meeting to execution/completion and offer them an
                  extended range of services to give them a better experience.
                </li>
                <li>
                  <strong>Convenience:</strong> We constantly innovate and find
                  new ways to make property search easier for you. Our 3D Floor
                  Plans &amp; Virtual Tours ensure that you get a feel of the
                  property without even having to visit it.
                </li>
              </ol>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;