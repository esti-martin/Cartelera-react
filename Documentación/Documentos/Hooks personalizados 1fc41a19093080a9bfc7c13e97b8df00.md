# Hooks personalizados

### useTheme (Modo Claro/Oscuro)

Hook personalizado para manejar el tema visual:

```
import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, []);

  return { theme, toggleTheme };
}
```

Este hook:

- Inicializa el tema como "dark".
- Permite cambiar entre modos claro y oscuro.
- Aplica la clase correspondiente (`dark` o `light`) al `<html>`.

Este hook es utilizado por el componente `ThemeToggleButton` para manejar el cambio de tema desde un botón visual.

---

##