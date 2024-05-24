import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

 const Cleartoken = () => {
    console.log(" Cleartoken ............")
    const {clearUser } = useContext(AuthContext);
    console.log(" Cleartoken 11111")
    const navigate = useNavigate();
    console.log(" Cleartoken 22222")
    clearUser();
    console.log(" Cleartoken 33333")
    navigate("/notfound");
    console.log(" done ...........")
}

export default Cleartoken
