import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { regEx } from "../regEx";
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
      await login(data);
      navigate("/user/dashboard");
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
    if (emailError) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
  }, [emailError]);

  useEffect(() => {
    if (err !== null) {
      setOtpRequet(false);
      setOtpf(null);
      setTimer(false);
    }
  }, [err]);

  return (
    <div>
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
                  className="w-100"
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value }),
                      setErr(null),
                      setOtpRequet(false);
                  }}
                  //helperText={otpf ? "OTP sent" : err}
                  // helperText={
                  //   emailError !== false ? emailError : otpf ? "OTP sent" : err
                  // }
                  helperText={emailError !== false ? emailError : err}
                  readOnly={otpRequet === true && err === null}
                  disabled={otpRequet === true && err === null}
                />

                {otpRequet && err === null && (
                  <div className="editOtp">
                    <div>{otpf ? "OTP sent" : err}</div>
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
                    className="w-100"
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
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
                      className="w-100"
                      onChange={(e) =>
                        setData({ ...data, otp: e.target.value })
                      }
                    />

                    {timer === true ? (
                      <p>
                        Time Remaining: {minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <p>Didn't recieve code?</p>
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
                        emailError === false ? "logina" : "nextDisabled"
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
                      Resend Otp
                    </button>
                  </div>
                )}
                <div className="submit-my-form">
                  <div className="row text-center">
                    <div className="col-md-12">
                      <p className={"link"}>Haven't created an account yet?</p>
                      <p className="text-center link_to_login">
                        <Link to="/register">
                          <a className={"registerb"}>Register Now</a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
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
