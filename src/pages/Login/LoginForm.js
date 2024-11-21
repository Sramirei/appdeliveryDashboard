import React, { useContext } from "react";
import UserContext from "../../context/userContext";
import "./style.css";

import googleLogo from "../../assets/icons/google.png";
import appleLogo from "../../assets/icons/apple.png";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginForm = ({ changeForm }) => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
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
    if (user?.success === true) {
      Swal.fire({
        title: "success!",
        text: "Sesion iniciada Correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/home", { replace: true });
    }
  };

  return (
    <>
      <form
        className="my-form"
        onSubmit={handleSubmit(handleLogin)}
        autoComplete="off"
      >
        <div className="form-welcome-row">
          <h1>Create your account &#x1F44F;</h1>
        </div>
        <div className="socials-row">
          <a href="#" title="Use Google">
            <img src={googleLogo} alt="Google" />
            Use Google
          </a>
          <a href="#" title="Use Apple">
            <img src={appleLogo} alt="Apple" /> Use Apple
          </a>
        </div>
        <div className="divider">
          <div className="divider-line"></div> Or{" "}
          <div className="divider-line"></div>
        </div>
        <div className="text-field">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
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
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
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
        <div className="text-field">
          <label htmlFor="password">
            Password:
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              title="Minimum 6 characters at least 1 Alphabet and 1 Number"
              {...register("password", {
                required: "El campo es requerido",
              })}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
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
        <button type="submit" className="my-form__button">
          Login
        </button>
        <div className="my-form__actions">
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
