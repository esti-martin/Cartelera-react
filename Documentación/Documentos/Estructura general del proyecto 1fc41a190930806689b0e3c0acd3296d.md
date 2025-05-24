# Estructura general del proyecto

## Estructura General del Proyecto

```
/cartelera-react
│
├── public/                 # Archivos estáticos como favicon, logo, etc.
├── src/                    # Código fuente principal
│   ├── assets/             # Imágenes, íconos, logos
│   ├── components/         # Componentes reutilizables
│   │   ├── navbar/         # Navbar para usuarios y visitantes
│   │   │   ├── auth/
│   │   │   │   └── NavbarAuth.jsx
│   │   │   └── guest/
│   │   │       └── NavbarGuest.jsx
│   │   ├── footer/         # Footer de la aplicación
│   │   ├── buttons/        # Botones reutilizables (ThemeToggleButton, etc.)
│   │   └── Auth0/          # Componentes relacionados a autenticación
│   │       └── ProtectedRoute.jsx
│   ├── hooks/              # Custom hooks (useTheme, useFetch, etc.)
│   ├── pages/              # Páginas principales
│   │   ├── guest/          # Páginas para usuarios no logueados
│   │   │   └── Landing.jsx
│   │   └── auth/           # Páginas protegidas
│   │       ├── Home.jsx
│   │       ├── FilmInfo.jsx
│   │       ├── Search.jsx
│   │       └── UserProfile.jsx
│   ├── styles/             # Estilos globales y de componentes
│   │   ├── index.css
│   │   └── variables.css
│   ├── App.jsx             # Enrutamiento y estructura principal
│   └── main.jsx            # Punto de entrada React + Auth0Provider
├── .env                   # Variables de entorno (Auth0, API Keys)
├── package.json           # Dependencias y scripts
└── vite.config.js         # Configuración de Vite
```

Esta estructura permite:

- Separar claramente la lógica de autenticación, diseño y rutas.
- Escalar el proyecto fácilmente.
- Reutilizar componentes como botones, Navbars y hooks.

---

## Consideraciones

- El sistema está preparado para manejar tanto rutas protegidas como interfaces condicionales basadas en la sesión.
- Toda la seguridad y gestión de tokens corre por cuenta de Auth0, reduciendo la carga en el frontend.
- El sistema de tema claro/oscuro mejora la accesibilidad visual para el usuario.
- La estructura modular facilita la escalabilidad y el mantenimiento.

---