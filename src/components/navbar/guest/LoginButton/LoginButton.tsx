import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../../commons/Button/Button.jsx"; 
import type { JSX } from "react";

const LoginButton = (): JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  //loginWithRedirect es una función que te da Auth0 (gracias al hook useAuth0). Su trabajo es redirigir al usuario a la página de login de Auth0.

  return (
    <Button onClick={() => loginWithRedirect()}>
      Iniciar sesión
    </Button>
  );
};

export default LoginButton;
