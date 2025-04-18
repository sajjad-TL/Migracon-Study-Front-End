import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./context/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GOOGLE_CLIENT_ID =
  "1096874794393-kpphuq91om905lk4papttobq3mv9bfsf.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <UserProvider>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
