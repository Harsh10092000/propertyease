import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const NriService = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <section className="main-content">
          <div className="aboutus-content">
            <div className="col-md-12">
              <h2>NRI Services</h2>
              <p>
                Over the past few years, there has been a noticeable upswing in
                the Indian real estate market. Although this motivates locals to
                invest right away, NRIs are still difficult to find because of
                concerns about effective management. Finding an agency that will
                handle the purchasing, selling, renting, or leasing transaction
                in India without any shady or underhanded deals is extremely
                difficult for the majority of Indian nationals living abroad.
              </p>
              <p>
                With its reputation as the preferred choice for both buyers and
                realtors, Propertyease.in has established itself in the real
                estate industry. Whether the project consists of residential
                units, commercial spaces, plots, farmhouses, or villas,
                Propertyease.in cracks the finest offers available. The
                Propertyease.in group has an abundance of knowledge about the
                realty industry and has created a special response team to cater
                to the needs of Non-Resident Indians.
              </p>

              <ol>
                <li>
                  <strong>Commercial and Residential Space Leasing:</strong> One
                  of the numerous strengths of the Propertyease.in team is the
                  hassle-free leasing of both commercial and residential
                  properties.
                </li>
                <li>
                  <strong>Guidance and Assistance with Finances:</strong> Any
                  real estate transaction involves complex financial
                  considerations. Because it is well-versed in these nuances,
                  Propertyease.in helps clients apply for loans and provides
                  advice on them.
                </li>
                <li>
                  <strong>Property Management:</strong> Only for our far-flung
                  customers, Propertyease.in provides comprehensive property
                  management at incredibly low costs. With complete transparency
                  guaranteed, non-resident Indians (NRIs) can oversee the
                  purchase, sale, leasing, and upkeep of their property from the
                  comfort of their own homes.
                </li>
              </ol>
              <ul>
                <h3>Special NRI Services</h3>
                <p>
                  Propertyease range of selective services for NRIs includes:
                </p>
                <li>
                  Encouraging prospects for real estate investment, purchase,
                  lease, and sale anywhere in India
                </li>
                <li>
                  Making financial transfers easier while adhering to legal and
                  tax regulations
                </li>
                <li>Help and advice available right now</li>
                <li>Comprehensive Services for Real Estate Administration</li>
                <li>
                  {" "}
                  Using Propertyease official website to keep the client
                  informed about developments in Indian real estate
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default NriService;
