import React, { useContext } from "react";
import UserContext from "../../context/userContext";
import "./style.css";

import googleLogo from "../../assets/icons/google.png";
import appleLogo from "../../assets/icons/apple.png";

import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

const LoginForm = ({ changeForm }) => {
  const { login } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleLogin = async (data) => {
    const body = {
      correo: data.email,
      password: data.password,
    };

    const user = await login(body);
    if (user.success === true) {
      <Navigate to="/home" replace />;
    }
  };

  return (
    <>
      <form
        class="my-form"
        onSubmit={handleSubmit(handleLogin)}
        autoComplete="off"
      >
        <div class="form-welcome-row">
          <h1>Create your account &#x1F44F;</h1>
        </div>
        <div class="socials-row">
          <a href="#" title="Use Google">
            <img src={googleLogo} alt="Google" />
            Use Google
          </a>
          <a href="#" title="Use Apple">
            <img src={appleLogo} alt="Apple" /> Use Apple
          </a>
        </div>
        <div class="divider">
          <div class="divider-line"></div> Or <div class="divider-line"></div>
        </div>
        <div class="text-field">
          <label for="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              autocomplete="off"
              placeholder="Your Email"
              {...register("email", {
                required: "El campo es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ingresa un Correo valido",
                },
              })}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
              <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28"></path>
            </svg>
          </label>
        </div>
        {errors.email && (
          <span className="alert-text">{errors.email.message}</span>
        )}
        <div class="text-field">
          <label for="password">
            Password:
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              title="Minimum 6 characters at least 1 Alphabet and 1 Number"
              {...register("password", {
                required: "El campo es requerido",
                // pattern: {
                //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
                //   message:
                //     "Mínimo 5 caracteres, al menos 1 alfabeto y 1 número.",
                // },
              })}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path>
              <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
              <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
            </svg>
          </label>
        </div>
        {errors.password && (
          <span className="alert-text">{errors.password.message}</span>
        )}
        <button type="submit" class="my-form__button">
          Login
        </button>
        <div class="my-form__actions">
          <a
            type="button"
            title="Reset Password"
            onClick={(e) => changeForm("restart")}
          >
            Restaurar Contraseña
          </a>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
