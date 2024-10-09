import React, { useState } from "react";
import "./style.css";

//Assets
import logo from "../../assets/Login/ofin.png";

//Components
import LoginForm from "./LoginForm";
import RestarPasswordForm from "./RestarPasswordForm";

const Login = () => {
  const [form, setForm] = useState("login"); //Cambiar formulario de Login o restaurar contraseña
  return (
    <>
      <div class="form-wrapper">
        <div class="form-side">
          <a href="#" title="Logo">
            <img src={logo} class="logo" alt="Ofin" />
          </a>
          {form === "restart" ? (
            <RestarPasswordForm changeForm={setForm} />
          ) : (
            <LoginForm changeForm={setForm} />
          )}
        </div>
        <div class="info-side">
          <img src="/image.pnmg" alt="Mock" class="mockup" />
        </div>
      </div>
    </>
  );
};

export default Login;
