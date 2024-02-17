import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { AdminContextProvider } from "./context/AdminContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <AdminContextProvider>
      <App />
    </AdminContextProvider>
  </AuthContextProvider>
);
