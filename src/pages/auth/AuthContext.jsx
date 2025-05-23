// src/contexts/AuthContext.jsx
import { createContext, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading, logout: auth0Logout } = useAuth0();

  const logout = () => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
