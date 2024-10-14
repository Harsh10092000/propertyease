import React from 'react'
import { useState, useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import { regEx } from '../../pages/regEx';
import {
    IconX,
  } from "@tabler/icons-react";
const SubscribeEmail = (props) => {
    const [open, setOpen] = useState(props.open);
    const handleClose = () => {
        setOpen(false);
      };
    const [popupData, setPopupData] = useState({
        name: "",
        phone: "",
        email: ""
      })

      //console.log("open : " , open);
    
      
    
      const [emailError, setEmailError] = useState(true);
      useEffect(() => {
        if (!regEx[0].emailRegex.test(popupData.email)) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
      }, [popupData.email]);
    
      const handleSubmit = async () => {
        setLoader(true);
        try {
          await axios.post(
            import.meta.env.VITE_BACKEND + "/api/maildigest/addSubscriberData",
            popupData
          );
          props.handleLoader(false);
          handleClose
          setPopupData({
            name: "",
            email: "",
            phone: ""
          });
          //setSnack(true);
        } catch (err) {
          console.log(err);
        }
      };

    const [step, setStep] = useState(false);
  const handleStep = () => {
    if (
      popupData.name !== "" &&
      popupData.phone.length > 9 && popupData.phone.length < 11 &&
      emailError === false 
    ) {
      setStep(false);
      
      handleSubmit();
    } else {
      setStep(true);
      
    }
  };
  return (
    <Dialog
        open={open}
        //onClose={props.handleSubDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-wrapper"
      >
        <div className="mail-popup">
          
          <div className="popup-heading-wrapper d-flex" >
          <div>
          <div className="popup-heading">Be the first to know!</div>
            <div className="popup-subheading">
            Subscribers are the first one to hear about new listed properties and best deals.
            </div>
          </div>
            
            <div onClick={handleClose} className="pointer" title="close"><IconX /></div>
          </div>
          <div className="popup-content-wrapper">
            <div className="popup-content-sec d-flex justify-content-between">
              <div className="mb-3">
                <input
                  className="pf-input-1 "
                  type="text"
                  placeholder="Name"
                  required
                  onChange={(e) =>
                    setPopupData({
                      ...popupData,
                      name: e.target.value.replace(
                        /[^a-zA-Z ]/g,
                        ""
                      ),
                    })
                  }
                />
                <span className="popup-error-msg">{step && popupData.name === "" ? "Required" : ""}</span>
              </div>
              <div className="mb-3">
                <input
                  className="pf-input-1 "
                  // type="text"
                  placeholder="Phone"
                  required
                  onChange={(e) =>
                    setPopupData({
                      ...popupData,
                      phone: e.target.value.replace(
                        regEx[2].phoneNumberValidation,
                        ""
                      ),
                    })
                  }
                />
                <span className="popup-error-msg">{step && popupData.phone.length !== 10
                                  ? "Phone number must be 10 digits."
                                  : ""}</span>
              </div>
            </div>
            <div className="mb-3">
              <input
                className="pf-input"
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setPopupData({
                    ...popupData,
                    email: e.target.value.replace(
                      /[^a-zA-Z.@0-9/]/g,
                      ""
                    ),
                  })
                }
              />
              <span className="popup-error-msg">{step && emailError
                                  ? "Please enter valid email address"
                                  : ""}</span>
            </div>
            <div className="popup-btn-text">
              Subscribe to recieve the latest news by email about properties.
              Unsubscribe any time.
            </div>
            <div>
              <button class="pf-submit hover-opacity" onClick={handleStep}
                              title="Click to Subscribe" >Subscribe</button>
            </div>
            <div className="popup-botton-text">
              We don't share data with anyone.
            </div>
          </div>
        </div>
      </Dialog>
  )
}

export default SubscribeEmail
