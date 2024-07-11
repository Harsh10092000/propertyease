import React from 'react';
import MailConfg from '../../components/mailSettings/MailConfg';
import EmailSettings from '../../components/mailSettings/EmailSettings';
import { useState } from 'react';


const EmailSet = () => {
  const [selectedOption, setSelectedOption] = useState("Mail Configuration");

  const emailConfigFormOpt = [
    {
      id: "1",
      option: "Mail Configuration",
    },

    {
      id: "2",
      option: "Email Settings",
    },
    {
      id: "3",
      option: "Email Broadcasts",
    },
  ];


  return (

    <div className="mail-settings ">
    <div className="settings-switch-wrapper">
          <div className="settings-switch">
            {emailConfigFormOpt.map((item) => (
              <div
                className={`  ${
                  selectedOption === item.option ? "selected-option" : "options"
                }  `}
                onClick={() => setSelectedOption(item.option)}
              >
                {item.option}
              </div>
            ))}
          </div>
        </div>

        {selectedOption === "Mail Configuration" ? (
        <div style={{width:"50%"}}>  <MailConfg selectedOption={selectedOption}/> </div>
) : selectedOption === "Email Settings" ? (
  <div style={{width:"50%"}}>  <EmailSettings selectedOption={selectedOption} /> </div>
) : selectedOption === "Email Broadcasts" ? (
  <div>Comming Soon</div>
) : (
  ""
)}
        </div>
  )
}

export default EmailSet



