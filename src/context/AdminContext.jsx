import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );
  const adminlogin = async (inputs) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND + "/api/auth/checkAdmin",
        inputs
      );
      setAdmin(res.data);
    } catch (err) {
      throw err;
      // return false;
    }
  };
  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [admin]);
  const clearAdmin = () => {
    setAdmin(null);
  };
  return (
    <AdminContext.Provider value={{ clearAdmin, admin, adminlogin }}>
      {children}
    </AdminContext.Provider>
  );
};
