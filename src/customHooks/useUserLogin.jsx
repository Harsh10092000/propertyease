import React, { useContext, useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ACTION_TYPES } from "../pages/addProperty/FetchActionTypes";
import { INITIAL_STATE, fetchReducer } from "../pages/addProperty/FetchReducer";
import axios from "axios";
import { regEx } from "../pages/regEx";
const useUserLogin = (userData, setUserData, currentUser) => {
    const { 
     login } = useContext(AuthContext);
    const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE);
    const [numberError, setNumberError] = useState(true);
    const [loginStatus, setLoginStatus] = useState("");
    const [getOtp, setGetOtp] = useState(false);
    const [change, setChange] = useState(0);
    const [loader, setLoader] = useState(false);
    const [prevData, setPrevData] = useState();
    const [upcomingDate, setUpcomingDate] = useState();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    console.log("Opening dialog");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserData({ ...userData, number: "" });
   dispatch({ type: ACTION_TYPES.DIALOG_CLOSE });
  };

    // const [userData, setUserData] = useState({
    //     email: "",
    //     number: "",
    //     otp: "",
    //   });


      const verifyEmail = async () => {
        console.log("fg")
        try {
          await axios
            .get(
              import.meta.env.VITE_BACKEND +
                `/api/auth/verifyEmail/${userData.email}`
            )
            .then((res) => dispatch({ type: ACTION_TYPES.UNSET_FETCH_ERROR }));
        } catch (err) {
          dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: err.response.data });
        }
      };

      const verifyNumber = async () => {
        try {
          await axios
            .get(
              import.meta.env.VITE_BACKEND +
                `/api/auth/verifyNumber/${userData.number}`
            )
            .then((res) =>
              dispatch({ type: ACTION_TYPES.SET_PHONE_ERROR, payload: res.data })
            );
        } catch (err) {
          dispatch({ type: ACTION_TYPES.UNSET_PHONE_ERROR });
        }
      };
    
      useEffect(() => {
        dispatch({ type: ACTION_TYPES.UNSET_FETCH_ERROR });
        if (!regEx[0].emailRegex.test(userData.email)) {
          dispatch({ type: ACTION_TYPES.SET_FORMAT_ERROR });
        } else {
          dispatch({ type: ACTION_TYPES.UNSET_FORMAT_ERROR });
          verifyEmail();
        }
      }, [userData.email]);
    
      useEffect(() => {
        if (userData.number.length > 9) {
          verifyNumber();
          setNumberError(false);
        } else {
          setNumberError(true);
        }
      }, [userData.number]);
    
      const fetchOtp = async () => {
        // if(step1 === false) {
    
        setLoader(true);
        //e.preventDefault();
        try {
          dispatch({ type: ACTION_TYPES.FETCH_START });
          await axios
            .get(
              import.meta.env.VITE_BACKEND + `/api/auth/sendOtp/${userData.email}`
            )
            .then((res) => {
              
              dispatch({ type: ACTION_TYPES.FETCH_SUCCESS });
              console.log("done");
              handleClickOpen();
            });
          setLoader(false);
        } catch (err) {
          console.log("err.response : " , err.response);
          dispatch({ type: ACTION_TYPES.OTP_ERROR, payload: err.response.data });
          handleClickOpen();
          setLoader(false);
        }
        // } else {
        //   setStep1(true);
        // }
      };
    
      console.log("loader in hook : " , loader);

      const addUser = async (e) => {
        userData.phone = userData.number;
        e.preventDefault();
        try {
          setGetOtp(true);
          handleClickOpen();
          dispatch({ type: ACTION_TYPES.FETCH_START });
          await axios
            .post(import.meta.env.VITE_BACKEND + `/api/auth/addUser`, userData)
            .then((res) => {
              dispatch({ type: ACTION_TYPES.FETCH_SUCCESS });
              dispatch({ type: ACTION_TYPES.UNSET_FETCH_ERROR });
            });
        } catch (err) {
          dispatch({ type: ACTION_TYPES.OTP_ERROR, payload: err.response.data });
        }
      };
    
      useEffect(() => {
        if (state.seconds > 0 && state.timer === true) {
          const intervalId = setInterval(() => {
            dispatch({ type: ACTION_TYPES.DECREASE_SECONDS });
            if (state.minutes > 0 && state.seconds === 1) {
              dispatch({ type: ACTION_TYPES.DECREASE_MINUTES });
              dispatch({ type: ACTION_TYPES.CHANGE_SECONDS });
            }
          }, 1000);
          return () => clearInterval(intervalId);
        } else {
          dispatch({ type: ACTION_TYPES.CHANGE_TIMER });
        }
      }, [state.timer, state.seconds, state.minutes]);
    
      const checkLogin = async () => {
        if (userData.otp.length === 6) {
          const result = await login(userData);
          if (result !== false) {
            setChange(change + 1);
    
            axios
              .get(
                import.meta.env.VITE_BACKEND +
                  `/api/pro/fetchPropertiesAddInLast30Days/${
                    currentUser && currentUser[0].login_id
                  }`
              )
              .then((res) => {
                setPrevData(res.data[0]);
                setUpcomingDate(
                  res.data[0].pro_creation_date !== null &&
                    moment(res.data[0].pro_creation_date)
                      .add(30, "days")
                      .format("MMMM DD YYYY")
                );
                res.data[0].pro_count >= 5 && handleClose(), handleNextStep();
              });
    
            //  ( prevData.length > 0 &&
            //     handleNextStep() )
    
            handleClose();
          } else {
            setLoginStatus("Wrong OTP Entered");
          }
        }
      };
    
      useEffect(() => {
        checkLogin();
      }, [userData.otp]);

  
      console.log("prevData in custom hook : " , prevData);

      return {
        state,
        verifyEmail,
        verifyNumber,
        fetchOtp,
        addUser,
        checkLogin,
        numberError,
        getOtp,
        change,
        setChange,
        loader,
        loginStatus,
        prevData,
        upcomingDate,
        open,
        handleClose
      };
    };
    


export default useUserLogin
