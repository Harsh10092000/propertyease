import React from "react";
import "./PlanStatus.css";
import { TransformDate } from "./TransformTernary";

const PlanStatus = ({activePlanData}) => {
 
  return (

        <div fluid className="container plan-status-container">
          <div className="plan-name-tag">
            <div className="plan-status-heading admin-granted-heading">
              Active Plan <span className="">Standard</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <div className="plan-status-item">
                <div className="plan-status-heading">Transaction Id</div>
                <div className="plan-status-val">{activePlanData[0].transaction_id}</div>
              </div>
            </div>
            <div className="col-md">
              <div className="plan-status-item">
                <div className="plan-status-heading">Purchase Date</div>
                <div className="plan-status-val">{TransformDate(activePlanData[0].purchase_date)}</div>
              </div>
            </div>
            <div className="col-md">
              <div className="plan-status-item">
                <div className="plan-status-heading">Expiery Date</div>
                <div className="plan-status-val">{TransformDate(activePlanData[0].expiry_date)}</div>
              </div>
            </div>
            <div className="col-md">
              <div className="plan-status-item">
                <div className="plan-status-heading">
                  Paid Listing Available
                </div>
                <div className="plan-status-val">{activePlanData[0].paid_listings_remaining}</div>
              </div>
            </div>
            <div className="col-md">
              <div className="plan-status-item">
                <div className="plan-status-heading">
                  Free Listing Available
                </div>
                <div className="plan-status-val">{activePlanData[0].free_listings_remaining}</div>
              </div>
            </div>
            <div className="col-md">
              <div className="">
                <div className="plan-status-heading">Transaction Amount</div>
                <div className="plan-status-val">Rs {activePlanData[0].transaction_amt}</div>
              </div>
            </div>

           {/*  <div className="col-md">
              <div className="">
                <div className="plan-status-heading">Payment ID</div>
                <div className="plan-status-val">pay_QBlKpMOgkHAIFY</div>
              </div>
            </div> */}
          </div>
        </div>
    
  );
};




const NoActivePlan = () => {
  return (
    <div className="no-plan-container ">
        <div className="container-fluid">
        <div className="row">
      <div className="col-md-12 no-plan-heading">No Active Plan!</div>
      <div className="col-md-12 no-plan-text">
        Subscribe now and unlock a world of unlimited benefits waiting just for you! Don’t miss out on taking your experience to the next level!
      </div>
      <div className="col-md-6">
      <ul className="benefits-list">
        <li>Post unlimited listings</li>
        <li>Unlock premium features</li>
        <li>Boost your business!</li>
        
      </ul>
      </div>

      <div className="col-md-6">
      <ul className="benefits-list">
        
        <li>Get priority customer support</li>
        <li>Access exclusive analytics tools</li>
        <li>Enjoy faster listing approvals</li>
      </ul>
      </div>
      <div className="col-md-12 free-listing-text">
        Free Listings Remaining: <span className="">5</span>
      </div>
      <button className="btn btn-upgrade mt-3">Subscribe Now</button>
      </div>
      </div>
      <style jsx>{`
        .no-plan-container {
         
          margin: 20px auto;
          padding: 25px;
          background: linear-gradient(135deg, #ffffff, #f1f5f9);
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          
          
        }

        .no-plan-heading {
          font-size: 22px;
          font-weight: 700;
          color: #d32f2f; /* Red for emphasis */
          margin-bottom: 12px;
          
        }

        .no-plan-text {
          font-size: 15px;
          color: #555;
          line-height: 1.5;
          margin-bottom: 18px;
          font-style: italic;
        }

        .benefits-list {
          list-style-type: none;
          padding: 0;
          margin-bottom: 20px;
          text-align: left;
          
        }

        .benefits-list li {
          font-size: 14px;
          color: #333;
          margin-bottom: 8px;
          position: relative;
          padding-left: 25px;
        }

        .benefits-list li:before {
          content: "✔";
          color: #1976d2;
          position: absolute;
          left: 0;
          font-size: 16px;
        }

        .free-listing-text {
          font-size: 16px;
          color: #333;
          font-weight: 600;
          margin-bottom: 10px;
        }

       
        .btn-upgrade {
          background-color: #1976d2;
          color: white;
          padding: 10px 25px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 25px;
          border: none;
          transition: all 0.3s ease;
        }

        .btn-upgrade:hover {
          background-color: #115293;
          transform: scale(1.05);
          color: white;
        }
      `}</style>
    </div>
  );
};



const AdminGranted = () => {
    return (
      <div className="admin-granted-container">
        <div className="admin-granted-heading">Access Granted by Admin</div>
        <div className="admin-granted-text">
        Great news! Admin has granted you special access to list unlimited properties and unlock premium features. Make the most of it!
        </div>
  
        <div className="admin-warning-text">
          Note: Admin can revoke this access at any time, so ensure you adhere to the platform guidelines.
        </div>
  
       
  
        {/* Scoped styles */}
        <style jsx>{`
          .admin-granted-container {
           
            margin: 20px auto;
            padding: 25px;
            background: linear-gradient(135deg, #ffffff, #e8f5e9);
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            text-align: left;
      
          }
  
         
          .admin-granted-heading {
            font-size: 22px;
            font-weight: 700;
            color: #2e7d32;
            margin-bottom: 12px;
            
          }
  
          .admin-granted-text {
            font-size: 15px;
            color: #555;
            line-height: 1.5;
            margin-bottom: 18px;
          }
  
          .admin-warning-text {
            font-size: 14px;
            color: #d32f2f;
            font-weight: 500;
            margin-bottom: 20px;
            font-style: italic;
          }
  
          .btn-admin-access {
            background-color: #2e7d32;
            color: white;
            padding: 10px 25px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 25px;
            border: none;
            transition: all 0.3s ease;
          }
  
          .btn-admin-access:hover {
            background-color: #1b5e20;
            transform: scale(1.05);
          }
        `}</style>
      </div>
    );
  };
  


  const PlanExpired = ({activePlanData}) => {
 
    return (
  
          <div fluid className="container plan-status-container">
            <div className="plan-name-tag">
              <div className="plan-status-heading admin-granted-heading">
                Plan Expired <span className="">Standard</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md">
                <div className="plan-status-item">
                  <div className="plan-status-heading">Transaction Id</div>
                  <div className="plan-status-val">{activePlanData[0].transaction_id}</div>
                </div>
              </div>
              <div className="col-md">
                <div className="plan-status-item">
                  <div className="plan-status-heading">Purchase Date</div>
                  <div className="plan-status-val">{TransformDate(activePlanData[0].purchase_date)}</div>
                </div>
              </div>
              <div className="col-md">
                <div className="plan-status-item">
                  <div className="plan-status-heading">Expired On</div>
                  <div className="plan-status-val">{TransformDate(activePlanData[0].expiry_date)}</div>
                </div>
              </div>
              <div className="col-md">
                <div className="plan-status-item">
                  <div className="plan-status-heading">
                    Paid Listing Available
                  </div>
                  <div className="plan-status-val">{activePlanData[0].paid_listings_remaining}</div>
                </div>
              </div>
              <div className="col-md">
                <div className="plan-status-item">
                  <div className="plan-status-heading">
                    Free Listing Available
                  </div>
                  <div className="plan-status-val">{activePlanData[0].free_listings_remaining}</div>
                </div>
              </div>
              <div className="col-md">
                <div className="">
                  <div className="plan-status-heading">Transaction Amount</div>
                  <div className="plan-status-val">Rs {activePlanData[0].transaction_amt}</div>
                </div>
              </div>
  
             {/*  <div className="col-md">
                <div className="">
                  <div className="plan-status-heading">Payment ID</div>
                  <div className="plan-status-val">pay_QBlKpMOgkHAIFY</div>
                </div>
              </div> */}
            </div>
          </div>
      
    );
  };
  


export default PlanStatus;
export {NoActivePlan, AdminGranted, PlanExpired};
