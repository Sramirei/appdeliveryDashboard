import React, { useState, useEffect } from "react";
import "./style.css";
import { Navigate } from "react-router-dom";

import logo from "../../assets/icons/main-icon.png";
import Mockup1 from "../../assets/images/Mockup1.png";

//Components
import LoginForm from "./LoginForm";
import RestarPasswordForm from "./RestarPasswordForm";

const Login = ({ session }) => {
  const [form, setForm] = useState("login");

  if (session) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <div className="form-wrapper">
        <div className="form-side">
          <a href="#" title="Logo">
            <img src={logo} className="logo" alt="Menu" />
          </a>
          {form === "restart" ? (
            <RestarPasswordForm changeForm={setForm} />
          ) : (
            <LoginForm changeForm={setForm} />
          )}
        </div>
        <div className="info-side">
          <img src={Mockup1} alt="Mock" className="mockup" />
        </div>
      </div>
    </>
  );
};

export default Login;
