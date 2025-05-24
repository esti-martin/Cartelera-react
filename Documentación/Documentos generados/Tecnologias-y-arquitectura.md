¿Qué tecnología principal se utiliza para la autenticación en la aplicación Cartelera React?
Se utiliza Auth0 como proveedor de autenticación. Auth0 gestiona el inicio de sesión, incluyendo proveedores sociales como Google, y se encarga de la gestión segura de los tokens de sesión.

¿Cómo se configura la aplicación para que la autenticación esté disponible en toda la aplicación y persista la sesión?
La autenticación se configura envolviendo toda la aplicación principal (en main.jsx) con el componente Auth0Provider. Para asegurar que la sesión persista incluso después de recargar la página, se utiliza la opción cacheLocation="localstorage".

¿De qué manera la aplicación protege las rutas y cómo detecta si un usuario está autenticado?
Las rutas que requieren autenticación están envueltas por un componente ProtectedRoute. Este componente utiliza el hook useAuth0 para verificar el estado de autenticación del usuario. Si el usuario no está autenticado, ProtectedRoute impide el acceso a la ruta.

¿Cómo se adapta la interfaz de usuario, específicamente la barra de navegación (Navbar), según el estado de autenticación del usuario?
La aplicación renderiza condicionalmente dos versiones de la barra de navegación: NavbarGuest para visitantes no autenticados (en la página principal /) y NavbarAuth para usuarios autenticados (desde /home en adelante). La selección de qué Navbar mostrar se basa en el estado isAuthenticated proporcionado por el hook useAuth0.

¿Qué sistema de construcción se utiliza en el proyecto y por qué?
Se utiliza Vite como sistema de construcción. La elección de Vite se basa en su rapidez, simplicidad y compatibilidad con TailwindCSS, que se utiliza para los estilos.

Además de la autenticación, ¿qué otra funcionalidad de personalización visual importante se implementa y cómo funciona?
Se implementa un sistema de gestión de temas (oscuro/claro). Esta funcionalidad utiliza un estado global manejado con ThemeContext y un hook personalizado useTheme. La clase CSS correspondiente (dark o light) se aplica al elemento <html> utilizando useEffect para cambiar el estilo de la interfaz. Un componente ThemeToggle permite al usuario alternar entre los temas.

¿Cómo influye la estructura general del proyecto en su mantenimiento y escalabilidad?
La estructura general del proyecto está diseñada para separar claramente la lógica (autenticación, diseño, rutas) y facilitar la escalabilidad y el mantenimiento. La modularidad de la estructura permite reutilizar componentes (botones, Navbars, hooks) y manejar fácilmente tanto rutas protegidas como interfaces condicionales basadas en la sesión.

¿Cuál es el beneficio principal de delegar la seguridad y la gestión de tokens a Auth0 en el frontend?
El beneficio principal es que reduce significativamente la carga de trabajo en el frontend en lo que respecta a la seguridad y la gestión de tokens. Toda la complejidad de manejar sesiones seguras, tokens y la interacción con proveedores de identidad es gestionada por Auth0, permitiendo que el desarrollo del frontend se centre en la interfaz y la lógica de negocio.


