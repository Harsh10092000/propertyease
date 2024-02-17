import { IconLogout, IconUserPlus } from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";
import { TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminlogin, admin } = useContext(AdminContext);
  const [change, setChange] = useState(0);
  const [data, setData] = useState({
    email: "",
    pass: "",
  });
  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, [change]);
  const [err, setErr] = useState(null);
  const login = async () => {
    try {
      await adminlogin(data);
      setChange(change + 1);
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div>
      <Navbar />
      <section className="signup-section upper-form-heading">
        <div className="container">
          <div className="outer-signup">
            <div className="heading_style">
              <h4>
                <span>
                  <IconUserPlus />
                </span>
                Login Here
              </h4>
              <p>
                Login to your existing Propertyease account with providing the
                following information.
              </p>
            </div>
            <div className="admin-form">
              <form method="post" id="register-form">
                <TextField
                  label="Email"
                  variant="standard"
                  size="small"
                  type="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-100"
                  error={err ? true : false}
                />
                <TextField
                  label="Password"
                  variant="standard"
                  size="small"
                  className="w-100 mt-3"
                  type="password"
                  error={err ? true : false}
                  helperText={err ? err : ""}
                  onChange={(e) => setData({ ...data, pass: e.target.value })}
                />
                <div className="submit-my-form text-center">
                  <div className="row text-center">
                    <div className="col-md-12">
                      <div className="left-block" />
                      <button
                        type="button"
                        name="register"
                        className="btn btn-primary admin-login
                    "
                        onClick={login}
                      >
                        Login
                        <span>
                          <IconLogout />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
