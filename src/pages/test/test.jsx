// import React from "react";
// import { useContext, useEffect, useState } from "react";

// const Test = () => {
//   const [timer, setTimer] = useState(true);
//   const [minutes, setMinutes] = useState(1);
//   const [seconds, setSeconds] = useState(50);
//   const [res, setRes] = useState("");
//   const[secondsLeft , setSecondsLeft] = useState("");
//   useEffect(() => {
//     if (seconds > 0 && timer === true) {
//       const intervalId = setInterval(() => {
//         setSeconds((prevTimer) => prevTimer - 1);
//         if (seconds === 1) {
//           //setMinutes(minutes - 1);
//           setSeconds(59);
//         }
//       }, 1000);
//       return () => clearInterval(intervalId);
//     } else {
//       setTimer(false);
//       console.log("seconds : " , seconds)
//       setSecondsLeft(seconds);
//       //setMinutes(1);
//       setSeconds(40);
//     }
//   }, []);

// console.log(minutes , seconds , timer)

//   return (
//     <div>
//       <div>
//         Timer
//         {timer === true ? (
//           <p>
//             Time Remaining: {0}:{seconds < 10 ? `0${seconds}` : seconds}
//           </p>
//         ) : (
//           <p>Didn't recieve OTP?</p>
//         )}
//       </div>
//       <div>question 1</div>
//       <div>
//         <div onClick={() => {setTimer(false) , setRes("b") }}>a</div>
//         <div onClick={() => {setTimer(false) , setRes("b") }}>b</div>
//         <div onClick={() => {setTimer(false) , setRes("b") }}>b</div>
//         <div onClick={() => {setTimer(false) , setRes("b") }}>c</div>
//       </div>

//       <div>
//         {res} 
//         {secondsLeft}
//       </div>
//     </div>
//   );
// };

// export default Test;










import React from 'react'
import { ACTION_TYPES } from './actions';
import { INITIAL_STATE , fetchReducer } from './reducer';
import { useContext, useEffect, useState } from "react";
import { useReducer } from 'react';


const Test = () => {

  const data = {
    id : "harsh",
    pass: "ram",
  }

  const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE);
  const handleClick = (data) => {
    dispatch({ type: ACTION_TYPES.FETCH_ADD, payload: data })
  }
  return (
    <div>
      <div onClick={() => handleClick(data)} >click</div>
      <div>{state.name}</div>
      {/* {state.userData.map((item) => {
        <div>
        <div>{item.id}</div>
        <div>{item.pass}</div>
        </div>
      })}
      {console.log(state.userData)} */}
    </div>
  )
}

export default Test
