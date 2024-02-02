import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { IconUser } from "@tabler/icons-react";
import "./register.css";
import Footer from "../../components/footer/Footer";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const Register = () => {
  const [data, setData] = useState({
    reg_name: "",
    reg_email: "",
    reg_phone: "",
  });
  const [err, setErr] = useState(null);
  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND + "/api/auth/addUser",
        data
      );
      setOpen(true);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Registered Successfully
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please Login with your credentials.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Navbar />
      <section className={"bg"}>
        <div>
          <div className="f-logo">
            <img src="/images/logo.png" alt="logo" />
          </div>
          <div className={"block"}>
            <div className="heading_style">
              <h4 className={"heading"}>Signup</h4>
            </div>
            <form method="post" id="register-form" className={"form"}>
              <TextField
                label="Name"
                variant="outlined"
                size="small"
                className="w-100"
                name="reg_name"
                required
                onChange={handleChange}
              />

              <TextField
                label="Email"
                variant="outlined"
                size="small"
                className="w-100"
                name="reg_email"
                required
                onChange={handleChange}
                helperText={err}
              />

              <TextField
                label="Phone Number"
                variant="outlined"
                size="small"
                className="w-100"
                name="reg_phone"
                required
                onChange={handleChange}
              />

              <div className="form-check input-group con mt-2">
                <label className="form-check-label" style={{ color: "black" }}>
                  <input
                    type="checkbox"
                    name="tnc_accept"
                    id="agreePolicy"
                    className="form-check-input"
                    defaultChecked
                  />
                  By registering us, I agree to&nbsp;
                  <Link legacyBehavior href="/privacypolicy">
                    <span className="text-black text-decoration-underline">
                      Privacy Policy
                    </span>
                  </Link>
                  &nbsp; and &nbsp;
                  <Link legacyBehavior href="/termsAndConditions">
                    <span className="text-black text-decoration-underline">
                      Terms & Conditions
                    </span>
                  </Link>
                  &nbsp; of this website.
                </label>
              </div>
              <div className="submit-my-form ">
                <div className="input-group text-center">
                  <div className="left-block" />
                  <button
                    type="button"
                    className={"register"}
                    onClick={handleClick}
                  >
                    <span>
                      <IconUser />
                    </span>
                    Register
                  </button>
                </div>
                <div className="row text-center">
                  <div className="col-md-12">
                    <p className="text-black  link_to_login mt-2">
                      Already have an account !
                    </p>
                    <p className="text-center link_to_login">
                      <Link to="/login">
                        <a className={"registerb"}>Login</a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Register;
