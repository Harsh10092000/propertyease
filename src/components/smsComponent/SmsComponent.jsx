import React from 'react';
import axios from 'axios';


// const tlClient = axios.create({
//   baseURL: "https://api.textlocal.in/",
//   params: {
//     apiKey: "NTYzNjcxNmM0OTY1NGM3MzQ4NzA1MDRmMzI2ZjcwNGE=", 
//     sender: "PR8PEZ" ,
//     numbers: "917404302678" ,
//     otp: "123"
//   }
// });


// const smsClient = {
//   sendPartnerWelcomeMessage: (user) => {
//     if (user && user.phone && user.name) {
//       const params = new URLSearchParams();
//       console.log("params : " , params);
// //       params.append("numbers", `917404302678`); 
// //       params.append(
// //         "message",
// //         `Hi harsh,
// // Welcome to Propertyease.in, Download our app to get bookings from our customers with better pricing. 
// // `
// //       );
//       tlClient.get("/send", params)
//         .then(response => console.log('Message sent:', response))
//         .catch(error => console.error('Error sending message:', error));
//     }
//   },

//   sendVerificationMessage: (user) => {
//     if (user && user.phone) {
//       const params = new URLSearchParams();
//       params.append("numbers", `917404302678`); // Replace with the actual recipient number
//       params.append(
//         "message",
//         `Your propertyease verification code is 123`
//       );
//       tlClient.get("/send", params)
//         .then(response => console.log('Message sent:', response))
//         .catch(error => console.error('Error sending message:', error));
//     }
//   }
// };


const SmsComponent = (mobile_number, otp) => {
//   const user = {
//     phone: '7404302678',
//     name: 'Harsh'
//   };

//   const handleSendMessage = () => {
//     smsClient.sendPartnerWelcomeMessage(user);
//   };


  const handleClick = () => {

    //   var url = `https://api.textlocal.in/send/?apikey=${import.meta.env.SMS_API}&numbers=917404302678&sender=PROPEZ&message=` + encodeURIComponent(`Someone has invited to join propertyease.in , a real estate portal to list, manage your properties for free. Join Now!!`);
    

    var url = `https://api.textlocal.in/send/?apikey=${import.meta.env.SMS_API}&numbers=91${mobile_number}&sender=PROPEZ&message=` + encodeURIComponent(`Propertyease.in: ${otp} is your code for login. Your code expires in 10 minutes. Don't share your code.`);
      
    // var url = `https://api.textlocal.in/send/?apikey=${import.meta.env.SMS_API}&numbers=917404302678&sender=PROPEZ&message=` + encodeURIComponent(`Hi, Mukesh Chitra +91-9992498195 expressed interest in your property on propertyease.in`);
    
      axios
        .get(url)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  return (
    <div>
      <div onClick={handleClick} style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', textAlign: 'center' }}>
        Send Message
      </div>
    </div>
  );
};

export default SmsComponent;
