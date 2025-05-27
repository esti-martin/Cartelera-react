Briefing Document: Cartelera React - Visión General y Componentes Principales

Fecha: 26 de Mayo de 2024

Fuentes:

Auth Components docs
Build flow
Estructura general del proyecto
Hooks personalizados
1. Descripción General del Proyecto

Cartelera React es una aplicación web construida con React que visualiza información de películas obtenida a través de la API de TheMovieDB. El proyecto destaca por su implementación de autenticación utilizando Auth0, un sistema de gestión de temas (claro/oscuro) y una arquitectura de ruteo que diferencia entre áreas públicas y privadas. La construcción del proyecto se gestiona con Vite, apreciado por su velocidad y compatibilidad con TailwindCSS.

2. Tecnologías Principales

Las tecnologías fundamentales empleadas en el proyecto son:

React: Biblioteca principal para la interfaz de usuario.
Vite: Sistema de construcción eficiente.
TailwindCSS: Framework CSS utilitario para estilizado rápido.
React Router DOM: Manejo de la navegación y ruteo de la aplicación.
Auth0: Proveedor de autenticación para gestionar inicios y cierres de sesión de forma segura.
React Icons: Librería para la iconografía.
3. Estructura General y Flujo de la Aplicación

La estructura del proyecto está diseñada para separar la lógica de autenticación, diseño y ruteo, facilitando la escalabilidad y reutilización de componentes.

El flujo general de la aplicación sigue los siguientes pasos:

Renderizado Inicial (main.jsx): La aplicación se inicializa envolviendo toda la estructura dentro del Auth0Provider para habilitar el contexto de autenticación. También se inyecta el router (BrowserRouter) y se renderiza el componente principal App.jsx. La sesión se persiste en el localStorage utilizando cacheLocation="localstorage" en el Auth0Provider.
Sistema de Rutas (App.jsx): En App.jsx, se utiliza el hook useAuth0() para determinar el estado de autenticación del usuario. Basado en este estado, se muestra el NavbarAuth para usuarios autenticados o el NavbarGuest para visitantes. La aplicación redirige automáticamente a /home si el usuario ya ha iniciado sesión.
Protección de Rutas: Las rutas que requieren autenticación están encapsuladas por el componente <ProtectedRoute>, que verifica si el usuario está autenticado antes de permitir el acceso.
4. Componentes Clave de Autenticación y Navegación

Auth0Provider: Componente que envuelve la aplicación y habilita el contexto de autenticación, gestionando los tokens de sesión de forma segura.
ProtectedRoute: Componente de orden superior (HOC) utilizado para proteger rutas, asegurando que solo los usuarios autenticados puedan acceder a ellas.
Navbar:NavbarGuest: Barra de navegación visible para usuarios no autenticados (típicamente en la landing page /).
NavbarAuth: Barra de navegación para usuarios autenticados (desde /home en adelante). Incluye secciones y una funcionalidad de buscador. Ambos componentes se renderizan condicionalmente según el estado de isAuthenticated.
useAuth0: Hook proporcionado por la librería de Auth0 que permite acceder al estado de autenticación (isAuthenticated, loginWithRedirect, logout, user, etc.) en cualquier componente funcional. "Puedes usar esta información para personalizar el contenido mostrado".
5. Estado de Autenticación

El estado de autenticación es accesible en cualquier componente que utilice el hook useAuth0(). Esto permite adaptar la interfaz de usuario y la funcionalidad basándose en si el usuario está logueado o no. "Disponible en cualquier componente con const { user, isAuthenticated, isLoading } = useAuth0();"

6. Flujo de Búsqueda y Detalles de Película

Search Flow:SearchBox: Componente de input que, al realizar una búsqueda, redirige al usuario a la ruta /search?q=... con el término de búsqueda como parámetro.
Search.jsx: Utiliza el hook useSearchParams() para obtener el término de búsqueda de la URL y realizar la llamada correspondiente a la API de TheMovieDB. Los resultados se muestran utilizando el componente CardMd.
Detalles de Película: Al hacer clic en cualquier componente de tarjeta de película (CardSlider, CardMd, etc.), el usuario es navegado a la ruta /movie/:id. El componente FilmInfo extrae el id de los parámetros de la URL, llama a la API para obtener detalles extendidos de la película y los renderiza utilizando el componente CardLg.
7. Cambio de Tema (Claro / Oscuro)

La aplicación implementa un sistema de cambio de tema visual:

Se utiliza un estado global gestionado con ThemeContext.
Se aplica la clase CSS correspondiente (dark o light) al elemento <html> mediante un useEffect.
Existe un componente ThemeToggle que utiliza iconos de React Icons para permitir al usuario cambiar entre los modos claro y oscuro.
Se utiliza un hook personalizado useTheme para encapsular la lógica de manejo del tema. Este hook inicializa el tema como "dark" por defecto, permite cambiar entre modos y aplica la clase adecuada al <html>. Es utilizado por ThemeToggleButton.
8. Consideraciones Clave y Futuras Mejoras

El sistema está diseñado para manejar tanto rutas protegidas como interfaces condicionales basadas en el estado de la sesión.
"Toda la seguridad y gestión de tokens corre por cuenta de Auth0, reduciendo la carga en el frontend."
El sistema de tema claro/oscuro contribuye a mejorar la accesibilidad visual.
La estructura modular facilita la escalabilidad y el mantenimiento del proyecto.
Las futuras mejoras consideradas incluyen: Lazy loading para FilmInfo y Search, implementación de tests con Vitest y MSW, cacheo de resultados de búsqueda con Zustand o TanStack Query, y paginación de resultados.
