import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { IconMail, IconPhone } from "@tabler/icons-react";

const UserdashboardProfile = () => {
  return (
    // <div class="container">
    //   <div class="main-body">
    //     <nav aria-label="breadcrumb" class="main-breadcrumb">
    //       <ol class="breadcrumb">
    //         <li class="breadcrumb-item">
    //           <a href="index.html">Home</a>
    //         </li>
    //         <li class="breadcrumb-item">
    //           <a href="javascript:void(0)">User</a>
    //         </li>
    //         <li class="breadcrumb-item active" aria-current="page">
    //           User Profile
    //         </li>
    //       </ol>
    //     </nav>

    //     <div class="row gutters-sm">
    //       <div class="col-md-4 mb-3">
    //         <div class="card">
    //           <div class="card-body">
    //             <div class="d-flex flex-column align-items-center text-center">
    //               <img
    //                 src="https://bootdey.com/img/Content/avatar/avatar7.png"
    //                 alt="Admin"
    //                 class="rounded-circle"
    //                 width="150"
    //               />
    //               <div class="mt-2">
    //                 <h3>John Doe</h3>
    //                 <h4 class="titleClass mb-1">Owner</h4>
    //                 <h5 className="subtitleClass ">State</h5>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="col-md-8">
    //         <div class="card mb-3">
    //           <div class="card-body">
    //             <div class="row">
    //               <div class="col-sm-3">
    //                 <h4 class="mb-0 fontClass" >Full Name</h4>
    //               </div>
    //               <div class="col-sm-9 text-secondary fontClass ">Kenneth Valdez</div>
    //             </div>
    //             <hr />
    //             <div class="row">
    //               <div class="col-sm-3">
    //                 <h4 class="mb-0 fontClass" >Email</h4>
    //               </div>
    //               <div class="col-sm-9 text-secondary fontClass ">fip@jukmuh.al</div>
    //             </div>
    //             <hr />
    //             <div class="row">
    //               <div class="col-sm-3">
    //                 <h4 class="mb-0 fontClass" >Phone</h4>
    //               </div>
    //               <div class="col-sm-9 text-secondary fontClass ">(239) 816-9029</div>
    //             </div>
    //             <hr />

    //             <div class="row">
    //               <div class="col-sm-3">
    //                 <h4 class="mb-0 fontClass" >Address</h4>
    //               </div>
    //               <div class="col-sm-9 text-secondary fontClass ">
    //                 Bay Area, San Francisco, CA
    //               </div>
    //             </div>
    //             <hr />
    //             <div class="row">
    //                 <div class="col-sm-12">
    //                   <a class="btn btn-info " target="__blank" href="">Edit</a>
    //                 </div>
    //               </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    //         <div class="d-flex justify-content-center">
    // <div class="row px-5">

    //       <div class="col-xs-12 col-sm-9">

    //         <div class="panel panel-default">
    //           <div class="panel-heading">
    //           <h4 class="panel-title">User profile</h4>
    //           </div>
    //           <div class="panel-body">
    //             <div class="profile__avatar">
    //               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1LkTJ5KzvdCWYgCWVk6HRZy2ADPwEus4iuQ&usqp=CAU" alt="..."/>
    //             </div>
    //             <div class="profile__header">
    //               <h4>Richard Roe <small>Administrator</small></h4>
    //               <p class="text-muted">
    //                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nostrum odio cum repellat veniam eligendi rem cumque magnam autem delectus qui.
    //               </p>
    //             </div>
    //           </div>
    //         </div>

    //         <div class="panel panel-default">
    //           <div class="panel-heading">
    //           <h4 class="panel-title">User info</h4>
    //           </div>
    //           <div class="panel-body">
    //             <table class="table profile__table">
    //               <tbody>
    //                 <tr>
    //                   <th><strong>Name</strong></th>
    //                   <td>Name</td>
    //                 </tr>

    //                 <tr>
    //                   <th><strong>State</strong></th>
    //                   <td>Haryana</td>
    //                 </tr>
    //                 <tr>
    //                   <th><strong>City</strong></th>
    //                   <td>Kurukshetra</td>
    //                 </tr>
    //                 <tr>
    //                   <th><strong>Sub-District</strong></th>
    //                   <td>Thanesar</td>
    //                 </tr>
    //                 <tr>
    //                   <th><strong>Experience (in Years)</strong></th>
    //                   <td>3</td>
    //                 </tr>

    //                 <tr>
    //                   <th><strong>Locality</strong></th>
    //                   <td>Sec-17</td>
    //                 </tr><tr>
    //                   <th><strong>Company Name</strong></th>
    //                   <td>test Industries</td>
    //                 </tr><tr>
    //                   <th><strong>Website</strong></th>
    //                   <td>www.propezy.com</td>
    //                 </tr><tr>
    //                   <th><strong>Properites Deals in</strong></th>
    //                   <td>studio, residential, farm house</td>
    //                 </tr><tr>
    //                   <th><strong>Deals in States</strong></th>
    //                   <td>Haryana, Himachal Pradesh</td>
    //                 </tr><tr>
    //                   <th><strong>Deals in Cities</strong></th>
    //                   <td>Kaithal, Kullu</td>
    //                 </tr><tr>
    //                   <th><strong>Deals in Localities</strong></th>
    //                   <td>Thanesar, Tapri, Umri</td>
    //                 </tr>

    //               </tbody>
    //             </table>
    //           </div>
    //         </div>

    //  </div>

    //       <div class="col-xs-12 col-sm-3">
    //         <div class="profile__contact-info">
    //           <div class="profile__contact-info-item">
    //             <div class="profile__contact-info-icon">
    //               <i class="fa fa-phone"></i>
    //             </div>
    //             <div class="profile__contact-info-body">
    //               <h5 class="profile__contact-info-heading">Phone number</h5>
    //               (000)987-65-43
    //             </div>
    //           </div>
    //           <div class="profile__contact-info-item">
    //             <div class="profile__contact-info-icon">
    //               <i class="fa fa-phone"></i>
    //             </div>
    //           </div>
    //           <div class="profile__contact-info-item">
    //             <div class="profile__contact-info-icon">
    //               <i class="fa fa-envelope-square"></i>
    //             </div>
    //             <div class="profile__contact-info-body">
    //               <h5 class="profile__contact-info-heading">E-mail address</h5>
    //               <a href="mailto:admin@domain.com">admin@domain.com</a>
    //             </div>
    //           </div>
    //           <div class="profile__contact-info-item">
    //             <div class="profile__contact-info-icon">
    //               <i class="fa fa-map-marker"></i>
    //             </div>
    //             <div class="profile__contact-info-body">
    //               <h5 class="profile__contact-info-heading">Work address</h5>
    //               Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    //             </div>
    //           </div>
    //         </div>

    //       </div>

    //     </div>
    // </div>

    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            <div className="user-profile">
              <div className="main-conetnt-1">
                <div className="content">
                  <div class="card ">
                    <div class="card-info">
                      {/* <img src="/img/home.jpg" /> */}
                      <div className="profilepict ">
                        <img src="/img/person.jpg" />
                      </div>
                      <div class="profileinfo">
                        <div className="d-flex justify-content-between">
                          <div className="text-wrap text-bold user-name ">
                            Mohit Arya
                          </div>
                        </div>
                        <div className="company-name">Property Owner</div>
                        <div className="company-name">
                          Sector 7, Kurukshetra, Haryana
                        </div>
                        <div className="d-flex mt-4 ">
                          <div>
                            <p class="desc pr-4">
                              <IconMail />
                              Stevens@gmail.com{" "}
                            </p>
                          </div>
                          <div>
                            <p class="desc">
                              <IconPhone />
                              9078347823
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-details">
              <div className="sec-heading">Profile Details</div>
              {/* <div className="d-flex">
                <div className="sec-1">
                  <div className="sec-1-heading">Experience </div>
                  <div className="sec-1-heading">Company Name</div>
                  <div className="sec-1-heading">Comapany Website</div>
                  <div className="sec-1-heading">Properites Deals in</div>
                  <div className="sec-1-heading">Deals in States</div>
                  <div className="sec-1-heading">Deals in Cities</div>
                  <div className="sec-1-heading">Deals in Localities</div>
                </div>
                <div className="sec-2">
                  <div>3 Years</div>
                  <div>Calinfo</div>
                  <div>https://calinfo.in/</div>
                  <div>Studio, Residential, Farm house</div>
                  <div>Haryana, Himachal Pradesh</div>
                  <div>Kaithal, Kullu</div>
                  <div>Thanesar, Tapri, Umri</div>
                </div>
              </div> */}

              <div className="d-flex ab">
                <div className="a">3 Years</div>
                <div className="b">Properites Deals in</div>
              </div>
              <div className="d-flex ab">
                <div className="a">Company Name</div>
                <div className="b">Calinfo</div>
              </div>
              <div className="d-flex ab">
                <div className="a">Comapany Website</div>
                <div className="b">https://calinfo.in/</div>
              </div>
              <div className="d-flex ab">
                <div className="a">Properites Deals in</div>
                <div className="b">Studio, Residential, Farm house</div>
              </div>
              <div className="d-flex ab">
                <div className="a">Deals in States</div>
                <div className="b">Haryana, Himachal Pradesh</div>
              </div>
              <div className="d-flex ab">
                <div className="a">Deals in Cities</div>
                <div className="b">
                  Kaithal, Kullu, Kaithal, Kullu, Kaithal, Kullu, Kaithal,
                  Kullu, Kaithal, Kullu, Kaithal, Kullu, Kaithal, Kullu,
                  Kaithal, Kullu, Kaithal, Kullu, Kaithal, Kullu
                </div>
              </div>
              <div className="d-flex ab">
                <div className="a">Deals in States</div>
                <div className="b">
                  Thanesar, Tapri, Umri, Thanesar, Tapri, Umri, Thanesar, Tapri,
                  Umri, Thanesar, Tapri, Umri, Thanesar, Tapri, Umri, Thanesar,
                  Tapri, Umri, Thanesar, Tapri, Umri, Thanesar, Tapri, Umri,
                  Thanesar, Tapri, Umri, Thanesar, Tapri, Umri, Thanesar, Tapri,
                  Umri
                </div>
              </div>
            </div>
            {/* <div className="profile-header d-flex">
              <div class="profile__avatar">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1LkTJ5KzvdCWYgCWVk6HRZy2ADPwEus4iuQ&usqp=CAU"
                  alt="..."
                />
              </div>
              <div className="">
                <div>Mohit Arya</div>
               
                    <div>Owner</div>
                    <div>SF, Bay Area</div>
                    <div>Stevens@gmail.com</div>
                    <div>8967236766</div>
                
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserdashboardProfile;
