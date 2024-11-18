import React from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const RestarPasswordForm = ({ changeForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const restPaswoord = async (data) => {
    const body = { email: data.email };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/restarPassword`,
        body
      );
      if (response.data.code === 1) {
        Swal.fire({
          title: "Se envio exitosamente el enlace para restaurar la contraseña",
          icon: "success",
        });
        changeForm("login");
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="my-form" onSubmit={handleSubmit(restPaswoord)}>
        <div className="form-welcome-row">
          <h1>Recuperar contraseña &#x21a9;</h1>
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
              required
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
        <button type="submit" className="my-form__button">
          Enviar
        </button>
        <div className="my-form__actions">
          <a type="button" title="return" onClick={(e) => changeForm("login")}>
            Regresar
          </a>
        </div>
      </form>
    </>
  );
};

export default RestarPasswordForm;
