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
        <Navbar />
        <div className={"main"}>
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
                                  alt="img"
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
