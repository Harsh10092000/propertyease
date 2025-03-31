// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user5")) || null
//   );
//   const login = async (inputs) => {
//     try {
//       const res = await axios.post(
//         import.meta.env.VITE_BACKEND + "/api/auth/checkLogin",
//         { inputs }
//       );
//      // setCurrentUser(res.data);
//      setCurrentUser(res.data.data);
//     localStorage.setItem('token', JSON.stringify(res.data.token));
//     localStorage.setItem('msg', JSON.stringify(res.data.message));
//       console.log(res.data);
//     } catch (err) {
//       return false;
//     }
//   };
//   useEffect(() => {
//     localStorage.setItem("user5", JSON.stringify(currentUser));
//   }, [currentUser]);
//   const clearUser = () => {
//     setCurrentUser(null);
//   };
//   return (
//     <AuthContext.Provider value={{ currentUser, login, clearUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// export const AuthContext = createContext();

// const tokenBlacklist = new Set();

// export const AuthContextProvider = ({ children }) => {
//   const [token, setToken] = useState();
//   const [decodedUserData, setDecodedUserData] = useState();
//   // const [currentUser, setCurrentUser] = useState(decodedUserData || null);
//   const [currentUser, setCurrentUser] = useState();

//   useEffect(() => {
//     const userToken = localStorage.getItem("user5");
//     setToken(userToken);
//     if (userToken !== null && userToken !== "undefined") {
//       //console.log("userToken : " , userToken, userToken[token])
//       const decodedUser = jwtDecode(JSON.stringify(userToken));
//       setDecodedUserData([decodedUser]);
//       setCurrentUser([decodedUser]);
//     }
//     else {
//       setCurrentUser(null);
//     }
//   }, []);
//   console.log("decodedUserData : " , decodedUserData);
  
//   const login = async (inputs) => {
//     try {
//       const res = await axios.post(
//         import.meta.env.VITE_BACKEND + "/api/auth/checkLogin",
//         { inputs }
//       );

//       console.log(res.data.token);
//       setToken(res.data.token);

//       const decodedToken = jwtDecode(JSON.stringify(res.data.token));
//       localStorage.setItem("user5", JSON.stringify(res.data.token));
//       setCurrentUser([decodedToken]);
//       //localStorage.setItem('token', JSON.stringify(res.data.token));
//     } catch (err) {
//       return false;
//     }
//   };

//   // useEffect(() => {
//   //   localStorage.setItem("user5", JSON.stringify(currentUser));
//   // }, [currentUser]);
//   const clearUser = () => {
//     setCurrentUser(null);
//     const token = req.headers['authorization'];
    
//     tokenBlacklist.add(token);
//   };
//   return (
//     <AuthContext.Provider value={{ currentUser, login, clearUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

//import jwt from 'jsonwebtoken';


//const secretKey = "sdfhj@j13j24";

export const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [decodedUserData, setDecodedUserData] = useState();
  // const [currentUser, setCurrentUser] = useState(decodedUserData || null);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user5");
   
    //const stringifyData = JSON.parse(userToken);
    //console.log("userToken : " ,stringifyData, stringifyData[0].login_id);
    // if (stringifyData[0].login_id) {
    //   const token = jwt.sign(stringifyData, secretKey, {
    //     expiresIn: "15d",
    //   });

    //   console.log("3333333 : " , token);
    //   //setCurrentUser(null);
    //   //localStorage.removeItem("user5");

    // }
    setToken(userToken);
    if (userToken !== null && userToken !== "undefined") {
      //console.log("userToken : " , userToken, userToken[token])
      const decodedUser = jwtDecode(JSON.stringify(userToken));
      setDecodedUserData([decodedUser]);
      setCurrentUser([decodedUser]);
    }
    else {
      setCurrentUser(null);
    }
  }, []);
  console.log("decodedUserData : " , decodedUserData);
  
  const login = async (inputs) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND + "/api/auth/checkLogin",
        { inputs }
      );

      console.log(res.data.token);
      setToken(res.data.token);

      
      Cookies.set('jwt2', JSON.stringify(res.data.refreshToken), { httpOnly: true });

      const decodedToken = jwtDecode(JSON.stringify(res.data.token));
      localStorage.setItem("user5", JSON.stringify(res.data.token));
      setCurrentUser([decodedToken]);
      //localStorage.setItem('token', JSON.stringify(res.data.token));
    } catch (err) {
      return false;
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("user5", JSON.stringify(currentUser));
  // }, [currentUser]);
  const clearUser = () => {
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider value={{ currentUser, login, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

