import React, { useEffect } from "react";
import "./style.css";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

import logo from "../../assets/icons/main-icon.png";
import Mockup1 from "../../assets/images/Mockup1.png";

const ChangePassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const changePassword = async (data) => {
    const body = {
      id: id,
      resetCode: token,
      password: data.password,
      confirmPassword: data.confirm_password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/changePassword`,
        body
      );

      if (response.data.code === 1) {
        Swal.fire({
          title: "La contraseña fue actualizada exitosamente",
          icon: "success",
        });
        navigate("/", { replace: true });
      }

      if (response.data.code === -1) {
        if (response.data.message === "User does not exist") {
          Swal.fire({
            title:
              "El usuario tiene algun prblema, por favor comunicate con soporte",
            icon: "error",
          });
        } else if (
          response.data.message ===
          "The reset code is invalid or has already been used."
        ) {
          Swal.fire({
            title: "El código de reinicio no es válido o ya ha sido utilizado.",
            icon: "error",
          });
        } else {
          throw new Error(response);
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Algo salio mal intenta de nuevo mas tarde",
        icon: "error",
      });
    }
  };

  const chekToken = async () => {
    const body = {
      id: id,
      resetCode: token,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/checkTokenRestarPassword`,
        body
      );
      if (response.data.code === 1) {
        return;
      }

      if (
        response.data.message === "The password has been reset successfully."
      ) {
        Swal.fire({
          title: "La contraseña ya fue actualizada",
          icon: "warning",
        });
        navigate("/", { replace: true });
      }

      if (response.data.message === "User does not exist") {
        Swal.fire({
          title: "Algo salio mal, por favor solicite un nuevo enlace",
          icon: "error",
        });
        navigate("/", { replace: true });
      } else if (
        response.data.message ===
        "The reset code is invalid or has already been used."
      ) {
        Swal.fire({
          title: "El código de reinicio no es válido o ya ha sido utilizado.",
          icon: "error",
        });
        navigate("/", { replace: true });
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Swal.fire({
        title: "Algo salió mal, intenta de nuevo más tarde",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    chekToken();
  }, []);

  return (
    <div>
      <>
        <div className="form-wrapper">
          <div className="form-side">
            <a href="#" title="Logo">
              <img src={logo} className="logo" alt="Menu" />
            </a>
            <form
              className="my-form"
              onSubmit={handleSubmit(changePassword)}
              autoComplete="off"
            >
              <div className="form-welcome-row">
                <h1>Restaurar contraseña &#x1f501;</h1>
              </div>
              {/* Password */}
              <div className="text-field">
                <label htmlFor="password">
                  Password:
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    title="Mínimo 6 caracteres, al menos 1 alfabeto y 1 número."
                    {...register("password", {
                      required: "El campo es requerido",
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,}$/,
                        message:
                          "Mínimo 5 caracteres, al menos 1 letra, 1 número y 1 carácter especial.",
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
                    <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path>
                    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
                    <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
                  </svg>
                </label>
              </div>
              {errors.password && (
                <span className="alert-text">{errors.password.message}</span>
              )}
              {/* Confirm Password */}
              <div className="text-field">
                <label htmlFor="password">
                  Confirm Password:
                  <input
                    id="confirm_password"
                    type="password"
                    name="confirm_password"
                    placeholder="Your Password"
                    title="Ambas contraseñas deben ser iguales"
                    {...register("confirm_password", {
                      required: "El campo es requerido",
                      validate: (value) => {
                        const password =
                          document.getElementById("password").value;
                        return (
                          value === password || "Las contraseñas no coinciden"
                        );
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
                    <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path>
                    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
                    <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
                  </svg>
                </label>
              </div>
              {errors.confirm_password && (
                <span className="alert-text">
                  {errors.confirm_password.message}
                </span>
              )}
              <button type="submit" className="my-form__button">
                Enviar
              </button>
            </form>
          </div>
          <div className="info-side">
            <img src={Mockup1} alt="Mock" className="mockup" />
          </div>
        </div>
      </>
    </div>
  );
};

export default ChangePassword;
