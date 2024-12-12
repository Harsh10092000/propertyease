import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

 const Cleartoken = () => {
    const {clearUser } = useContext(AuthContext);
    const navigate = useNavigate();
    clearUser();
    navigate("/notfound");
}

export default Cleartoken
