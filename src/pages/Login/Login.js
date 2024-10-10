import React, { useState } from "react";
import "./style.css";

import logo from "../../assets/icons/main-icon.png";
import Mockup1 from "../../assets/images/Mockup1.png";

//Components
import LoginForm from "./LoginForm";
import RestarPasswordForm from "./RestarPasswordForm";

const Login = () => {
  const [form, setForm] = useState("login");
  return (
    <>
      <div class="form-wrapper">
        <div class="form-side">
          <a href="#" title="Logo">
            <img src={logo} class="logo" alt="Menu" />
          </a>
          {form === "restart" ? (
            <RestarPasswordForm changeForm={setForm} />
          ) : (
            <LoginForm changeForm={setForm} />
          )}
        </div>
        <div class="info-side">
          <img src={Mockup1} alt="Mock" class="mockup" />
        </div>
      </div>
    </>
  );
};

export default Login;
