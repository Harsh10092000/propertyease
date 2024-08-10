// import { useNavigate, useParams, Link } from "react-router-dom";
// import { IconMail, IconPhone } from "@tabler/icons-react";
// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const UserdashboardProfile = () => {
//   const { currentUser, clearUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   //const userId = 16;
//   const { userId } = useParams();
//   const [agentData, setAgentData] = useState({
//     agent_id: "",
//     agent_name: "",
//     agent_email: "{",
//     agent_phone: "",
//     agent_exp: "",
//     agent_state: "",
//     agent_city: "",
//     agent_sub_district: "",
//     agent_locality: "",
//     agent_comapnay_name: "",
//     agent_company_website: "",
//     agent_desc: "",
//     agent_work_area: "",
//     agent_image: "",
//     agent_type: "",
//     user_cnct_id: "",
//     Sale_Count: "",
//     Rent_Count: "",
//     work_city: "",
//     work_state: "",
//     work_sub_district: "",
//   });

//   useEffect(() => {
//     axios
//       .get(
//         import.meta.env.VITE_BACKEND +
//           `/api/agent/fetchAgentDataByUserId/${userId}`
//       )
//       .then((res) => {
//         //setAgentData(res.data[0]);
//         if (res.data === "failed") {
//           clearUser();
//         }
//         res.data.length > 0
//           ? setAgentData({
//               agent_id: res.data[0].agent_id,
//               agent_name: res.data[0].agent_name,
//               agent_email: res.data[0].agent_email,
//               agent_phone: res.data[0].agent_phone,
//               agent_exp: res.data[0].agent_exp,
//               agent_state: res.data[0].agent_state,
//               agent_city: res.data[0].agent_city,
//               agent_sub_district: res.data[0].agent_sub_district,
//               agent_locality: res.data[0].agent_locality,
//               agent_comapnay_name: res.data[0].agent_comapnay_name,
//               agent_company_website: res.data[0].agent_company_website,
//               agent_desc: res.data[0].agent_desc,
//               agent_work_area: res.data[0].agent_work_area,
//               agent_image: res.data[0].agent_image,
//               agent_type: res.data[0].agent_type,
//               user_cnct_id: res.data[0].user_cnct_id,
//               Sale_Count: res.data[0].Sale_Count,
//               Rent_Count: res.data[0].Rent_Count,
//               work_city: res.data[0].work_city,
//               work_state: res.data[0].work_state,
//               work_sub_district: res.data[0].work_sub_district,
//             })
//           : "";

//         if (res.data.length === 0) {
//           navigate("/user/user-profile-form");
//         }
//       });
//     // axios
//     //   .get(
//     //     import.meta.env.VITE_BACKEND +
//     //       `/api/agent/fetchAgentWorkPlace/${agentId}`
//     //   )
//     //   .then((res) => {
//     //     setAgentWorkPlaceData(res.data);
//     //   });
//     // axios
//     //   .get(
//     //     import.meta.env.VITE_BACKEND +
//     //       `/api/agent/fetchAgentWorkState/${agentId}`
//     //   )
//     //   .then((res) => {
//     //     setAgentWorkPlaceState(res.data[0].work_state);
//     //   });
//   }, []);

  

//   // useEffect(() => {
//   //   if (agentData.agent_type.length < 1) {
//   //     console.log("agentData.agent_type : " , agentData.agent_type);
//   //     navigate("/user/user-profile-form");
//   //   }
//   // }, [agentData]);

//   return (
//     <div>
//       {
//         // agentData.agent_type.length < 1 ? (
//         //   console.log("dfg"),
//         //   navigate("/user/user-profile-form")
//         // ) :
//         agentData.agent_type === "Agent" ? (
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-md-9">
//                 <div className="user-profile">
//                   <div className="main-conetnt-1">
//                     <div className="content">
//                       <div class="card ">
//                         <div class="card-info">
//                           {/* <img src="/img/home.jpg" /> */}
//                           <div className="profilepict ">
//                             {agentData.agent_image ? (
//                               <img
//                                 src={`${
//                                   import.meta.env.VITE_BACKEND
//                                 }/userImages/${agentData.agent_image}`}
//                                 alt="img"
//                               />
//                             ) : (
//                               <img src="/img/person.jpg" />
//                             )}
//                           </div>
//                           <div class="profileinfo">
//                             <div className="d-flex justify-content-between">
//                               <div className="text-wrap text-bold user-name ">
//                                 {agentData.agent_name}
//                               </div>
//                             </div>
//                             <div className="company-name">
//                               Real Estate Agent
//                             </div>
//                             <div className="company-name">
//                               {/* Sector 7, Kurukshetra, Haryana */}
//                               {agentData.agent_city
//                                 ? agentData.agent_city + ","
//                                 : ""}{" "}
//                               {agentData.agent_state
//                                 ? agentData.agent_state
//                                 : ""}
//                             </div>
//                             <div className="mt-2">
//                               <div class="desc pr-4 d-flex align-items-center">
//                                 <div>
//                                   <IconMail className="mr-1" />
//                                 </div>
//                                 <div>{agentData.agent_email}</div>
//                               </div>
//                             </div>
//                             <div className="mt-1">
//                               <div class="desc d-flex align-items-center">
//                                 <div>
//                                   <IconPhone className="mr-1" />
//                                 </div>
//                                 <div className="text-center">
//                                   {agentData.agent_phone}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="d-flex">
//                         <div className="view-profile-button">
//                             <Link to={`/agentProfile/${userId}`}>
//                               <button className="btn btn-primary">
//                                 View Profile
//                               </button>
//                             </Link>
//                           </div>
//                           {/* <div className="edit-profile-btn-wrapper"> */}
//                           <div className="pl-2">
//                             <Link
//                               to={`/user/edit-user-profile/${agentData.agent_id}`}
//                             >
//                               <button type="button" class="btn btn-outline-primary">
//                                 Edit Profile
//                               </button>
//                             </Link>
//                           </div>
                          
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="profile-details">
//                   <div className="sec-heading ">About the Agent</div>
//                   <div className="btm-border">
//                     We are a group of experienced professionals who specialize
//                     in Other renting of residential properties. We deal in
//                     Multistorey Apartment, Builder Floor Apartment, Residential
//                     House ,Villa, Residential Plot, Penthouse, Studio Apartment,
//                     Commercial Land, Commercial Office Space, Commercial Shop,
//                     Commercial Showroom, Industrial Building ,Industrial Land
//                     ,Industrial Shed, Office in IT Park/ SEZ, Warehouse/ Godown
//                     bungalows in Gurgaon .With our voluminous experience and
//                     in-depth market knowledge, we ensure quick deal closure.
//                   </div>
//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Dealing In</div>
//                     <div className="w-75 sec-2">
//                       Sale/Lease, Pre-launch, Original Booking, Resale, Others
//                     </div>
//                   </div>
//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Properity Types Deals in</div>
//                     <div className="w-75 sec-2">
//                       {agentData.agent_work_area }
//                     </div>
//                   </div>

//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Experience</div>
//                     <div className="w-75 sec-2">
//                       {agentData.agent_exp} Years
//                     </div>
//                   </div>
//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Operating In States</div>
//                     <div className="w-75 sec-2">{agentData.work_state}</div>
//                   </div>
//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Operating In Cities</div>
//                     <div className="w-75 sec-2">
//                       {agentData.work_city.length > 0
//                         ? agentData.work_city.replaceAll(",", ", ")
//                         : "-"}
//                     </div>
//                   </div>
//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Operating In Sub Districts</div>
//                     <div className="w-75 sec-2">
//                       {agentData.work_sub_district.length > 0
//                         ? agentData.work_sub_district.replaceAll(",", ", ")
//                         : "-"}
//                     </div>
//                   </div>
//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Property For Sale</div>
//                     <div className="w-75 sec-2">{agentData.Sale_Count}</div>
//                   </div>
//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Property For Rent</div>
//                     <div className="w-75 sec-2">{agentData.Rent_Count}</div>
//                   </div>
//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Company Name</div>
//                     <div className="w-75 sec-2">
//                       {agentData.agent_comapnay_name}
//                     </div>
//                   </div>
//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Company Website</div>
//                     <div className="w-75 sec-2">
//                       {agentData.agent_company_website}
//                     </div>
//                   </div>
//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Address</div>
//                     <div className="w-75 sec-2">
//                       {/* No.7,Ground Floor,Dharam Tower,Near Bharat Petrol Pump, golf
//                   Course Extn. Road. , Gurgaon, Delhi NCR 122018 India */}
//                       {agentData.agent_locality
//                         ? agentData.agent_locality[0].toUpperCase() +
//                           agentData.agent_locality.slice(1) +
//                           ","
//                         : ""}{" "}
//                       {agentData.agent_sub_district
//                         ? agentData.agent_sub_district + ","
//                         : ""}{" "}
//                       {agentData.agent_city ? agentData.agent_city + "," : ""}{" "}
//                       {agentData.agent_state ? agentData.agent_state : ""}
//                     </div>
//                   </div>
//                   {/* <div className="edit-profile-btn-wrapper">
//                     <Link to={`/user/edit-user-profile/${agentData.agent_id}`}>
//                       <button type="button" class="btn edit-btn">
//                         Edit Profile
//                       </button>
//                     </Link>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : agentData.agent_type === "Owner" ? (
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-md-9">
//                 <div className="user-profile">
//                   <div className="main-conetnt-1">
//                     <div className="content">
//                       <div class="card ">
//                         <div class="card-info">
//                           {/* <img src="/img/home.jpg" /> */}
//                           <div className="profilepict ">
//                             {/* <img src="/img/person.jpg" /> */}
//                             {agentData.agent_image ? (
//                               <img
//                                 src={`${
//                                   import.meta.env.VITE_BACKEND
//                                 }/userImages/${agentData.agent_image}`}
//                                 alt="img"
//                               />
//                             ) : (
//                               <img src="/img/person.jpg" />
//                             )}
//                           </div>
//                           <div class="profileinfo">
//                             <div className="d-flex justify-content-between">
//                               <div className="text-wrap text-bold user-name ">
//                                 {agentData.agent_name}
//                               </div>
//                             </div>
//                             <div className="company-name">Property Owner</div>
//                             <div className="company-name">
//                               {/* Sector 7, Kurukshetra, Haryana */}
//                               {agentData.agent_city
//                                 ? agentData.agent_city + ","
//                                 : ""}{" "}
//                               {agentData.agent_state
//                                 ? agentData.agent_state
//                                 : ""}
//                             </div>
//                             <div className="mt-2">
//                               <div class="desc pr-4 d-flex align-items-center">
//                                 <div>
//                                   <IconMail className="mr-1" />
//                                 </div>
//                                 <div>{agentData.agent_email}</div>
//                               </div>
//                             </div>
//                             <div className="mt-1">
//                               <div class="desc d-flex align-items-center">
//                                 <div>
//                                   <IconPhone className="mr-1" />
//                                 </div>
//                                 <div className="text-center">
//                                   {agentData.agent_phone}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="profile-details">
//                   <div className="sec-heading btm-border">About the User</div>

//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Property For Sale</div>
//                     <div className="w-75 sec-2">{agentData.Sale_Count}</div>
//                   </div>
//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Property For Rent</div>
//                     <div className="w-75 sec-2">{agentData.Rent_Count}</div>
//                   </div>

//                   <div className="btm-border d-flex user-details">
//                     <div className="w-25 sec-1">Address</div>
//                     <div className="w-75 sec-2">
//                       {agentData.agent_locality
//                         ? agentData.agent_locality[0].toUpperCase() +
//                           agentData.agent_locality.slice(1) +
//                           ","
//                         : ""}{" "}
//                       {agentData.agent_sub_district
//                         ? agentData.agent_sub_district + ","
//                         : ""}{" "}
//                       {agentData.agent_city ? agentData.agent_city + "," : ""}{" "}
//                       {agentData.agent_state ? agentData.agent_state : ""}
//                     </div>
//                   </div>
//                   <div className="edit-profile-btn-wrapper">
//                     <Link to={`/user/edit-user-profile/${agentData.agent_id}`}>
//                       <button type="button" class="btn edit-btn">
//                         Edit Profile
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           ""
//         )
//       }
//     </div>
//   );
// };

// export default UserdashboardProfile;








import { useNavigate, useParams, Link } from "react-router-dom";
import { IconMail, IconPhone } from "@tabler/icons-react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
//import pp from "./pp.png"
const UserdashboardProfile = () => {
  const { currentUser, clearUser } = useContext(AuthContext);
  const navigate = useNavigate();
  //const userId = 16;
  const { userId } = useParams();
  const [agentData, setAgentData] = useState({
    agent_id: "",
    agent_name: "",
    agent_email: "{",
    agent_phone: "",
    agent_exp: "",
    agent_state: "",
    agent_city: "",
    agent_sub_district: "",
    agent_locality: "",
    agent_comapnay_name: "",
    agent_company_website: "",
    agent_desc: "",
    agent_work_area: "",
    agent_image: "",
    agent_type: "",
    user_cnct_id: "",
    Sale_Count: "",
    Rent_Count: "",
    work_city: "",
    work_state: "",
    work_sub_district: "",
  });

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_BACKEND +
        `/api/agent/fetchAgentDataByUserId/${userId}`
      )
      .then((res) => {
        //setAgentData(res.data[0]);
        if (res.data === "failed") {
          clearUser();
        }
        res.data.length > 0
          ? setAgentData({
            agent_id: res.data[0].agent_id,
            agent_name: res.data[0].agent_name,
            agent_email: res.data[0].agent_email,
            agent_phone: res.data[0].agent_phone,
            agent_exp: res.data[0].agent_exp,
            agent_state: res.data[0].agent_state,
            agent_city: res.data[0].agent_city,
            agent_sub_district: res.data[0].agent_sub_district,
            agent_locality: res.data[0].agent_locality,
            agent_comapnay_name: res.data[0].agent_comapnay_name,
            agent_company_website: res.data[0].agent_company_website,
            agent_desc: res.data[0].agent_desc,
            agent_work_area: res.data[0].agent_work_area,
            agent_image: res.data[0].agent_image,
            agent_type: res.data[0].agent_type,
            user_cnct_id: res.data[0].user_cnct_id,
            Sale_Count: res.data[0].Sale_Count,
            Rent_Count: res.data[0].Rent_Count,
            work_city: res.data[0].work_city,
            work_state: res.data[0].work_state,
            work_sub_district: res.data[0].work_sub_district,
          })
          : "";

        if (res.data.length === 0) {
          navigate("/user/user-profile-form");
        }
      });
  
  }, []);


 const checkValExists = (val) => {
  return val ? val : "-"
 }

  return (
    <div>
      {
        // agentData.agent_type.length < 1 ? (
        //   console.log("dfg"),
        //   navigate("/user/user-profile-form")
        // ) :
        agentData.agent_type === "Agent" ? (
          <div className="container-fluid">
            <div className="row">
              <div className="pro-cont-main">
                <div className="user-profile">
                  <div className="main-conetnt-1">
                    <div className="content">
                      <div class="card ">
                        <div class="card-info">
                        <div class="left">
                             
                              <img src="/img/person.jpg" />
                            </div>
                          
                          <div class="profileinfo">
                            <div className="d-flex justify-content-between">
                              <div className="text-wrap text-bold user-name ">
                                {agentData.agent_name}
                              </div>
                            </div>
                            <div className="company-name">
                              Real Estate Agent
                            </div>
                            <div className="company-name">
                            
                              {agentData.agent_city
                                ? agentData.agent_city + ","
                                : ""}{" "}
                              {agentData.agent_state
                                ? agentData.agent_state
                                : ""}
                            </div>
                            <div className="mt-2">
                              <div class="desc pr-4 d-flex align-items-center">
                                <div>
                                  <IconMail className="mr-1" />
                                </div>
                                <div>{agentData.agent_email}</div>
                              </div>
                            </div>
                            <div className="mt-1">
                              <div class="desc d-flex align-items-center">
                                <div>
                                  <IconPhone className="mr-1" />
                                </div>
                                <div className="text-center">
                                  {agentData.agent_phone}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="profile-page-btns">
                          <div className="view-profile-button">
                            <Link to={`/agentProfile/${userId}`}>
                              <button className="btn btn-primary">
                                View Profile
                              </button>
                            </Link>
                          </div>
                        
                          <div className="pl-2">
                            <Link
                              to={`/user/edit-user-profile/${agentData.agent_id}`}
                            >
                              <button type="button" class="btn btn-outline-primary">
                                Edit Profile
                              </button>
                            </Link>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-details">
                  <div className="pro-cont-sub">
                    <h5 className="sec-heading">About You <div className="mt-2 heading-divider"></div></h5>
                    <div className="btm-border">
                      We are a group of experienced professionals who specialize
                      in Other renting of residential properties. We deal in
                      Multistorey Apartment, Builder Floor Apartment, Residential
                      House ,Villa, Residential Plot, Penthouse, Studio Apartment,
                      Commercial Land, Commercial Office Space, Commercial Shop,
                      Commercial Showroom, Industrial Building ,Industrial Land
                      ,Industrial Shed, Office in IT Park/ SEZ, Warehouse/ Godown
                      bungalows in Gurgaon .With our voluminous experience and
                      in-depth market knowledge, we ensure quick deal closure.
                    </div>
                    <div className="btm-border d-flex user-details">
                      <div className="w-25 sec-1">Dealing In</div>
                      <div className="w-75 sec-2">
                        Sale/Lease, Pre-launch, Original Booking, Resale, Others
                      </div>
                    </div>
                    <div className="btm-border d-flex user-details">
                      <div className="w-25 sec-1">Properity Types Deals in</div>
                      <div className="w-75 sec-2">
                        {agentData.agent_work_area}
                      </div>
                    </div>

                    <div className="btm-border d-flex user-details">
                      <div className="w-25 sec-1">Experience</div>
                      <div className="w-75 sec-2">
                        {agentData.agent_exp} Years
                      </div>
                    </div>
                  </div>
                  <div className="pro-cont-sub">
                    <h5 className="sec-heading">Operations<div className="mt-2 heading-divider"></div></h5>
                    <div className="btm-border d-flex user-details">
                      <div className="w-25 sec-1">Operating In States</div>
                      <div className="w-75 sec-2">{agentData.work_state}</div>
                    </div>

                    <div className="btm-border d-flex user-details">
                      <div className="w-25 sec-1">Operating In Cities</div>
                      <div className="w-75 sec-2">
                        {agentData.work_city.length > 0
                          ? agentData.work_city.replaceAll(",", ", ")
                          : "-"}
                      </div>
                    </div>
                    <div className="btm-border d-flex user-details">
                      <div className="w-25 sec-1">Operating In Sub Districts</div>
                      <div className="w-75 sec-2">
                        {agentData.work_sub_district.length > 0
                          ? agentData.work_sub_district.replaceAll(",", ", ")
                          : "-"}
                      </div>
                    </div>
                    <div className="btm-border d-flex user-details">
                      <div className="w-25 sec-1">Property For Sale</div>
                      <div className="w-75 sec-2">{checkValExists(agentData.Sale_Count) }</div>
                    </div>
                    <div className="btm-border d-flex user-details">
                      <div className="w-25 sec-1">Property For Rent</div>
                      <div className="w-75 sec-2">{checkValExists(agentData.Rent_Count)}</div>
                    </div>
                  </div>
                  <div className="pro-cont-sub">
                    <h5 className="sec-heading"> Company Details <div className="mt-2 heading-divider"></div></h5>
                    <div className="btm-border d-flex user-details">
                      <div className="w-25 sec-1">Company Name</div>
                      <div className="w-75 sec-2">
                        {checkValExists(agentData.agent_comapnay_name)}
                      </div>
                    </div>
                    <div className="btm-border d-flex user-details">
                      <div className="w-25 sec-1">Company Website</div>
                      <div className="w-75 sec-2">
                        {checkValExists(agentData.agent_company_website)}
                      </div>
                    </div>
                    <div className="btm-border d-flex user-details">
                      <div className="w-25 sec-1">Address</div>
                      <div className="w-75 sec-2">
                       
                        {agentData.agent_locality
                          ? agentData.agent_locality[0].toUpperCase() +
                          agentData.agent_locality.slice(1) +
                          ","
                          : ""}{" "}
                        {agentData.agent_sub_district
                          ? agentData.agent_sub_district + ","
                          : ""}{" "}
                        {agentData.agent_city ? agentData.agent_city + "," : ""}{" "}
                        {agentData.agent_state ? agentData.agent_state : ""}
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        ) : agentData.agent_type === "Owner" ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="user-profile">
                  <div className="main-conetnt-1">
                    <div className="content">
                      <div class="card ">
                        <div class="card-info">
                          {/* <img src="/img/home.jpg" /> */}
                          <div className="profilepict ">
                            {/* <img src="/img/person.jpg" /> */}
                            {agentData.agent_image ? (
                              <img className="profile-img"
                                src={`${import.meta.env.VITE_BACKEND
                                  }/userImages/${agentData.agent_image}`}
                                alt="img"
                              />
                            ) : (
                              <img src="/img/person.jpg" />
                            )}
                          </div>
                          <div class="profileinfo">
                            <div className="d-flex justify-content-between">
                              <div className="text-wrap text-bold user-name ">
                                {agentData.agent_name}
                              </div>
                            </div>
                            <div className="company-name">Property Owner</div>
                            <div className="company-name">
                              {/* Sector 7, Kurukshetra, Haryana */}
                              {agentData.agent_city
                                ? agentData.agent_city + ","
                                : ""}{" "}
                              {agentData.agent_state
                                ? agentData.agent_state
                                : ""}
                            </div>
                            <div className="mt-2">
                              <div class="desc pr-4 d-flex align-items-center">
                                <div>
                                  <IconMail className="mr-1" />
                                </div>
                                <div>{agentData.agent_email}</div>
                              </div>
                            </div>
                            <div className="mt-1">
                              <div class="desc d-flex align-items-center">
                                <div>
                                  <IconPhone className="mr-1" />
                                </div>
                                <div className="text-center">
                                  {agentData.agent_phone}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-details">
                  <div className="sec-heading btm-border">About the User</div>

                  <div className="btm-border d-flex user-details">
                    <div className="w-25 sec-1">Property For Sale</div>
                    <div className="w-75 sec-2">{checkValExists(agentData.Sale_Count)}</div>
                  </div>
                  <div className="btm-border d-flex user-details">
                    <div className="w-25 sec-1">Property For Rent</div>
                    <div className="w-75 sec-2">{checkValExists(agentData.Rent_Count)}</div>
                  </div>

                  <div className="btm-border d-flex user-details">
                    <div className="w-25 sec-1">Address</div>
                    <div className="w-75 sec-2">
                      {agentData.agent_locality
                        ? agentData.agent_locality[0].toUpperCase() +
                        agentData.agent_locality.slice(1) +
                        ","
                        : ""}{" "}
                      {agentData.agent_sub_district
                        ? agentData.agent_sub_district + ","
                        : ""}{" "}
                      {agentData.agent_city ? agentData.agent_city + "," : ""}{" "}
                      {agentData.agent_state ? agentData.agent_state : ""}
                    </div>
                  </div>
                  <div className="edit-profile-btn-wrapper">
                    <Link to={`/user/edit-user-profile/${agentData.agent_id}`}>
                      <button type="button" class="btn edit-btn">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )
      }
    </div>
  );
};

export default UserdashboardProfile;
