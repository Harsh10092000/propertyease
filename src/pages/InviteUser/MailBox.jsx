import React from 'react'
import InviteFromAdmin from './InviteFromAdmin'
import Inbox from './Inbox'
import { useState } from 'react'

const MailBox = () => {
    const [selectedOption, setSelectedOption] = useState(1);
    
  return (
    <div>
      <div className="mail-page-tabs">
        <div onClick={() => setSelectedOption(1)} 
        className={`${selectedOption === 1 ? 'menu-item-selected' : 'menu-item'}`}
        >Send Mail</div>
        
    
        <div onClick={() => setSelectedOption(2)} className= {`${selectedOption === 2 ? "menu-item-selected" : "menu-item"}`}>
            Inbox</div>
      </div>
      {selectedOption === 1 ? 
       <InviteFromAdmin /> 
       : <Inbox />
      }
    </div>
  )
}

export default MailBox
