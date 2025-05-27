import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "./context/ThemeContext";

//domain y clientId: Se obtienen de las variables de entorno, así tus claves siguen seguras
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

//authorizationParams.redirect_uri: Es la URL a la que Auth0 redirigirá después de iniciar sesión. Normalmente es la raíz de tu app (window.location.origin).
createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <ThemeProvider>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Auth0Provider>
  </StrictMode>
);
