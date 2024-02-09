import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = async (inputs) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND + "/api/auth/checkLogin",
        { inputs }
      );
      setCurrentUser(res.data);
      console.log(res.data);
    } catch (err) {
      return false;
    }
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  const clearUser = () => {
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider value={{ currentUser, login, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};
