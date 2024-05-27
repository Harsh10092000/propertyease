import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { IconChecks, IconHome, IconPlus } from '@tabler/icons-react';
import { Link } from "react-router-dom";

const PaymentSucess = (props) => {
  return (
    <div>
      {/* <Navbar /> */}
      <div class="container success-msg-wrapper">
        {console.log(props)}
        <div className="message-box _success">
          <div>
            {/* <div>
              <IconChecks />
               <img src="/img/payment-tik.png" /> 
            </div>  */}
            <div className="pb-3 success-heading" ><IconChecks height={"40px"} width={"40px"} className="mr-2"  />Payment Successful!</div>
          </div>
          <div className="pb-3 success-msg">Thank You! Your payment of Rs. {props.paymentAmt} has been recieived</div>
          <div className=" success-msg">
            Order Id : {props.orderId} <span className="left-border"></span> Payment Id : {props.paymentId}
          </div>
          <div className="d-flex justify-content-center mt-2">
          <Link to="/allproperties" className="mr-3">
                <span className="search justify-content-center" title="Go To Home">
                  <IconHome className="sidebar-faicon " />
                  <span>
                    Go To Home
                  </span>
                </span>
              </Link>
            {/* <Link to="/addproperty" className="list-property"> */}
                <span className="add" title="List Property" onClick={props.handleChange}>
                  <span>
                    <IconPlus className="sidebar-faicon" />
                  </span>
                  List Property
                   {/* <span className="blink d-none d-inline">Free</span>  */}
                </span>
              {/* </Link> */}
          </div>
        </div>

        {/* <div class="message-box _success">
          <i class="fa fa-check-circle" aria-hidden="true"></i>
          <h2> Your payment was successful </h2>
          <p>
            {" "}
            Thank you for your payment. we will <br />. be in contact with more
            details shortly{" "}
          </p>
        </div> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default PaymentSucess;
