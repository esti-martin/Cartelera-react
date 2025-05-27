import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define la forma del contexto
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Crea el contexto con valor inicial nulo, será definido en el provider
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props del provider, children es ReactNode (cualquier elemento React)
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("theme") || "dark"
      : "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para consumir el contexto
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }
  return context;
};
