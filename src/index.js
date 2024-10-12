import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./context/userContext";

//Traducciones
// import navbar_es from "./translations/es/navbar.json";
// import navbar_en from "./translations/en/navbar.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("lng") || "es",
  resources: {
    es: {
      // navbar: navbar_es,
    },
    us: {
      // navbar: navbar_en,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <UserProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </UserProvider>
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();
