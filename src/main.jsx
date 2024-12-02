import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { AdminContextProvider } from "./context/AdminContext.jsx";
// import TagManager from 'react-gtm-module'

// const tagManagerArgs = {
//   gtmId: 'G-7MLLD7SP2K'
// }

// TagManager.initialize(tagManagerArgs)

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <AuthContextProvider>
    <AdminContextProvider>
      <App />
    </AdminContextProvider>
  </AuthContextProvider>
);
