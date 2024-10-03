import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const CityMaps = () => {
    const { city } = useParams();
    const [data, setData] = useState([]);
    const [subCatData, setSubCatData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [subData, setSubData] = useState([]);
    const [rentData, setRentData] = useState([]);
  
    useEffect(() => {
      axios
        .get(import.meta.env.VITE_BACKEND + `/api/cityMap/fetchMapData1/${city}`)
        .then((res) => {
          setData(res.data.data1);
          setSubCatData(res.data.data2);
          setCityData(res.data.data3);
        });
    }, [city]);
  
    useEffect(() => {
      axios
        .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertySubCatNo`)
        .then((res) => {
          setSubData(res.data);
        });
  
      axios
        .get(import.meta.env.VITE_BACKEND + `/api/pro/rentalPropertyTotal`)
        .then((res) => {
          setRentData(res.data);
        });
    }, []);
    return (
      <div>
         <meta  name="keywords" content={`Kurukshetra map, Kurukshetra city map, Kurukshetra Sector 29, Kurukshetra Sector 30, Kurukshetra Sector 31, Kurukshetra Sector 32, Kurukshetra Sector 7, Kurukshetra Sector 2, Kurukshetra Sector 4, Kurukshetra Sector 5 , Kurukshetra Sector 3 , Kurukshetra Sector 9, Kurukshetra Sector 8, Kurukshetra Sector 2 Commerical, kurukshetra Kohinoor City, kurukshetra Shree Vardhman City, Property for sale in kurukshetra, Sale in Kurukshetra, Properties in kurukshetra, Top real estate agents near me, Commercial real estate, Residential real estate, haryana, rent house, Property, Propertyease, houses for rent, mls,real estate agent, property for sale,  for sale near me, home, realtor, houses for sale Sale, Rent, Buy, India, Best Property, Kurukshetra City Map, Tehsil Map of District Kurukshetra, Maps of Kurukshetra,  `} />
        <Navbar />
        <div className="main padding-top">
          <section className="main-content">
            <div className="container">
              <div className="title">
                <h2>
                  {city} Maps 
                  <span className="ml-2 numberProperties">{data.length}</span>
                </h2>
                <div className="row ">
                  <div className="col-md-9">
                  {subCatData.map((subCat) => (
                    <div key={subCat.map_category} className="px-2 pb-2 w-100 ">
                      <div className="map-cat-heading">{subCat.map_category}</div>
                      <div className="row pb-4">
                        {data
                          .filter((i) => i.map_category === subCat.map_category)
                          .map((item, index) => (
                            <div key={index} className="col-md-6 py-4">
                              <a
                                href={`${
                                  import.meta.env.VITE_BACKEND
                                }/mapImages/${item.map_image}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  width="100%"
                                  height="85%"
                                  src={`${
                                    import.meta.env.VITE_BACKEND
                                  }/mapImages/${item.map_image}`}
                                  alt={`Checkout ${item.map_sub_category !== "Kurukshetra" ? item.map_sub_category+" Kurukshetra" : ""} map. Explore everything about ${item.map_sub_category}`} 
                                />
                              </a>
                              <div className="pt-2 sub-heading">{item.map_sub_category}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                  </div>
                  <div className="col-md-3 d-flex flex-column gap-3">

{cityData.length > 1 &&
                  <div>
                    <div className="p-1 shadow">
                      <div className="p-3 font-weight-bold text-black">Other Maps</div>
                      {cityData.map((item, index) => (
                        <Link
                          to={`/citymap/${item.map_city
                          }`}
                          key={index}
                        >
                          <div className="d-flex justify-content-between px-3 py-2">
                            <div>{item.map_city}{" "} Maps</div> 
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
}

                  <div>
                    <div className="p-1 shadow">
                      <div className="p-3 font-weight-bold text-black">
                        For Sale
                      </div>
                      {subData.map((sub, index) => (
                        <Link
                          to={`/${sub.pro_type
                            .split(",")[1]
                            .toLowerCase()}/${sub.pro_type
                            .split(",")[0]
                            .replaceAll(" ", "-")
                            .toLowerCase()}`}
                          key={index}
                        >
                          <div className="d-flex justify-content-between px-3 py-2">
                            <div>{sub.pro_type.split(",")[0]}</div>
                            <div>({sub.pro_sub_cat_number})</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
  
                  <div>
                    <div className="p-1 shadow">
                      <div className="p-3 font-weight-bold text-black">Rent</div>
                      {rentData.map((rent, index) => (
                        <Link
                          to={`/rental/${rent.pro_type
                            .split(",")[0]
                            .replaceAll(" ", "-")
                            .toLowerCase()}`}
                          key={index}
                        >
                          <div className="d-flex justify-content-between px-3 py-2">
                            <div>{rent.pro_type.split(",")[0]}</div>
                            <div>({rent.pro_sub_cat_number})</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
  
                  
                  
                </div>
                </div>
                
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  };

export default CityMaps
