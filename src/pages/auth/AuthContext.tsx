// src/contexts/AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";

// 1. Tipo para el usuario
interface User {
  name: string;
  email: string;
  photoURL: string;
}

// 2. Tipo para el contexto
interface AuthContextType {
  user: User | null;
  logout: () => void;
}

// 3. Crear el contexto con tipo explícito
export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
});

// 4. Tipar las props del AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>({
    name: "Leire",
    email: "leire@example.com",
    photoURL: "https://i.pravatar.cc/100", // imagen de prueba
  });

  const logout = () => {
    setUser(null);
    // Aquí puedes redirigir si es necesario
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
