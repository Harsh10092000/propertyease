import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    otp: "",
  });
  const [otpf, setOtpf] = useState(false);
  const [err, setErr] = useState(null);
  const fetchOtp = async (e) => {
    e.preventDefault();
    try {
      await axios
        .get(import.meta.env.VITE_BACKEND + `/api/auth/sendOtp/${data.email}`)
        .then((res) => {
          setOtpf(true);
        });
    } catch (err) {
      setErr(err.response.data);
    }
  };
  const checkLogin = async () => {
    if (data.otp.length === 6) {
      await login(data);
      navigate("/user/dashboard");
    }
  };
  useEffect(() => {
    checkLogin();
  }, [data.otp]);
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
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  helperText={otpf ? "OTP sent" : err}
                />
                {otpf ? (
                  <TextField
                    label="OTP"
                    variant="outlined"
                    size="small"
                    className="w-100"
                    onChange={(e) => setData({ ...data, otp: e.target.value })}
                  />
                ) : (
                  ""
                )}

                <div className="input-group text-center">
                  <div className="left-block" />
                  <button className={"logina"} onClick={fetchOtp}>
                    Next
                  </button>
                </div>

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
