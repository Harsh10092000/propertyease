import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { regEx } from "../regEx";
import { Helmet } from "react-helmet";
import "../register/register.css";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    otp: "",
    phone: "",
  });
  const [otpf, setOtpf] = useState(false);
  const [err, setErr] = useState(null);
  const [timer, setTimer] = useState(false);
  const [otpRequet, setOtpRequet] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [loginStatus, setLoginStatus] = useState("");
  const [numberErr, setNumberErr] = useState(null);
  const [numberFormatErr, setNumberFormatErr] = useState(null);
  const addUser = async (e) => {
    e.preventDefault();
    try {
      setTimer(true);
      setOtpRequet(true);
      await axios
        .post(import.meta.env.VITE_BACKEND + `/api/auth/addUser`, data)
        .then((res) => {
          setOtpf(true);
        });
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const fetchOtp = async (e) => {
    e.preventDefault();
    try {
      setTimer(true);
      setOtpRequet(true);
      await axios
        .get(import.meta.env.VITE_BACKEND + `/api/auth/sendOtp/${data.email}`)
        .then((res) => {
          setOtpf(true);
        });
    } catch (err) {
      setErr(err.response.data);
    }
  };

  useEffect(() => {
    if (seconds > 0 && timer === true) {
      const intervalId = setInterval(() => {
        setSeconds((prevTimer) => prevTimer - 1);
        if (minutes > 0 && seconds === 1) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setTimer(false);
      setMinutes(1);
      setSeconds(30);
    }
  }, [fetchOtp]);

  const checkLogin = async () => {
    if (data.otp.length === 6) {
      const result = await login(data);
      if (result !== false) {
        navigate("/user/dashboard");
      } else {
        setLoginStatus("Wrong Otp Entered");
      }
    }
  };
  useEffect(() => {
    checkLogin();
  }, [data.otp]);

  const [emailError, setEmailerror] = useState(true);
  useEffect(() => {
    if (!regEx[0].emailRegex.test(data.email)) {
      setEmailerror("Please enter a valid email address");
    } else {
      setEmailerror(false);
    }
  }, [data.email]);

  const [nextDisabled, setNextDisabled] = useState(true);
  useEffect(() => {
    if (err !== null) {
      if (
        numberErr !== true &&
        emailError === false &&
        err !== null &&
        numberFormatErr !== true
      ) {
        setNextDisabled(false);
      } else {
        setNextDisabled(true);
      }
    }
  }, [emailError, err, numberFormatErr, numberErr]);

  useEffect(() => {
    if (err === null) {
      if (emailError === false && err === null) {
        setNextDisabled(false);
      } else {
        setNextDisabled(true);
      }
    }
  }, [emailError, err]);

  useEffect(() => {
    if (err !== null) {
      setOtpRequet(false);
      setOtpf(null);
      setTimer(false);
    }
  }, [err]);

  const verifyNumber = async () => {
    try {
      await axios
        .get(
          import.meta.env.VITE_BACKEND + `/api/auth/verifyNumber/${data.phone}`
        )
        .then((res) => setNumberErr(res.data));
    } catch (err) {
      setNumberErr(null);
    }
  };

  useEffect(() => {
    if (data.phone.length > 9) {
      console.log("verifyNumber");
      verifyNumber();
      setNumberFormatErr(null);
    } else {
      setNumberFormatErr(true);
    }
  }, [data.phone]);

  return (
    <div>
      <Helmet>
        <title>Propertyease - Login</title>
      </Helmet>
      <Navbar />
      <section className={"bg"}>
        <div>
          <div className="f-logo">
            <img src="/images/logo.png" alt="logo" />
          </div>
          <div className={"block"}>
            <div className="heading_style">
              <h4 className={"heading"}>LogIn</h4>
            </div>
            <div>
              <form method="post" className={"form"}>
                <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={data.email}
                  className="w-100"
                  FormHelperTextProps={{ sx: { color: "red" } }}
                  onChange={(e) => {
                    setData({
                      ...data,
                      email: e.target.value.replace(/[^a-zA-Z.@0-9]/g, ""),
                    }),
                      setErr(null),
                      setOtpRequet(false);
                  }}
                  helperText={emailError ? emailError : ""}
                  readOnly={otpRequet === true && err === null}
                  disabled={otpRequet === true && err === null}
                />

                {otpRequet && err === null && (
                  <div className="editOtp">
                    <div>{otpf ? "Check Mail for OTP" : err}</div>
                    <div
                      onClick={() => (
                        setOtpRequet(false),
                        setMinutes(1),
                        setSeconds(30),
                        setOtpf(false),
                        setErr(null)
                      )}
                    >
                      Edit
                    </div>
                  </div>
                )}

                {err !== null ? (
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                    inputProps={{ maxlength: 10 }}
                    className="w-100"
                    value={data.phone}
                    FormHelperTextProps={{ sx: { color: "red" } }}
                    helperText={
                      numberFormatErr !== null
                        ? "Please enter a valid Phone Number"
                        : numberErr === true
                        ? "Phone Number Already Registered"
                        : ""
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        phone: e.target.value.replace(
                          regEx[2].phoneNumberValidation,
                          ""
                        ),
                      })
                    }
                  />
                ) : (
                  ""
                )}

                {otpf && otpRequet ? (
                  <div className="otpWrapper">
                    <TextField
                      label="OTP"
                      variant="outlined"
                      size="small"
                      inputProps={{ maxlength: 6 }}
                      className="w-100"
                      value={data.otp}
                      onChange={(e) => {
                        setData({
                          ...data,
                          otp: e.target.value.replace(
                            regEx[2].phoneNumberValidation,
                            ""
                          ),
                        }),
                          setLoginStatus("");
                      }}
                    />

                    {timer === true ? (
                      <p>
                        Time Remaining: {minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <p>Didn't recieve OTP?</p>
                    )}
                  </div>
                ) : (
                  ""
                )}

                {otpRequet === false ? (
                  <div className="input-group text-center">
                    <div className="left-block" />
                    <button
                      className={
                        nextDisabled === false ? "logina" : "nextDisabled"
                      }
                      onClick={data.phone === "" ? fetchOtp : addUser}
                      disabled={nextDisabled}
                    >
                      Next
                    </button>
                  </div>
                ) : (
                  <div className="input-group text-center">
                    <div className="left-block" />
                    <button
                      className={timer === true ? "nextDisabled " : "logina"}
                      onClick={fetchOtp}
                      disabled={timer === true ? true : false}
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
                <div style={{ color: "red" }}>{loginStatus}</div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
