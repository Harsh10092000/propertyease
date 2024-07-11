import React from 'react';
import MailConfigBoradcast from '../../components/emailBroadcastSettings/MailConfigBoradcast';
import BroadcastSettings from '../../components/emailBroadcastSettings/BroadcastSettings';
import { useState } from 'react';
import SubscriberList from '../../components/emailBroadcastSettings/SubscriberList';

const EmailBoardcast = () => {
  const [selectedOption, setSelectedOption] = useState("Mail Configuration");

  const emailConfigFormOpt = [
    {
      id: "1",
      option: "Mail Configuration",
    },

    {
      id: "2",
      option: "Broadcasts Settings",
    },
    {
      id: "3",
      option: "Subscriber List",
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
       <div style={{width:"50%"}}>   <MailConfigBoradcast selectedOption={selectedOption}/></div>
) : selectedOption === "Broadcasts Settings" ? (
  <div style={{width:"50%"}}><BroadcastSettings selectedOption={selectedOption}/></div>
) : selectedOption === "Subscriber List" ? (
  <div> <SubscriberList selectedOption={selectedOption}/></div>
) : (
  ""
)}
        </div>
  )
}

export default EmailBoardcast
