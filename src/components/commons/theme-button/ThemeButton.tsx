import { JSX, useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = (): JSX.Element => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-2xl transition-all text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700"
      aria-label="Cambiar tema"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
