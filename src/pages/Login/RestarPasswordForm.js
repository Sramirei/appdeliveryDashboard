import React from "react";

const RestarPasswordForm = ({ changeForm }) => {
  return (
    <>
      <form class="my-form">
        <div class="form-welcome-row">
          <h1>Recuperar contraseña &#x21a9;</h1>
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
              required
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
        <a type="submit" class="my-form__button">
          Enviar
        </a>
        <div class="my-form__actions">
          <a type="button" title="return" onClick={(e) => changeForm("login")}>
            Regresar
          </a>
        </div>
      </form>
    </>
  );
};

export default RestarPasswordForm;
