// src/contexts/AuthContext.jsx
import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Leire",
    email: "leire@example.com",
    photoURL: "https://i.pravatar.cc/100", // imagen de prueba
  });

  const logout = () => {
    setUser(null);
    // También puedes redirigir al login si hace falta
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
