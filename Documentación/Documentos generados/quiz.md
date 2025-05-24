Quiz

¿Qué proveedor de autenticación se utiliza en la aplicación y para qué sirve principalmente?
Describe la función del componente Auth0Provider en la configuración inicial.
¿Cómo se protegen las rutas privadas en la aplicación?
¿Qué hook de Auth0 se utiliza para verificar si un usuario está autenticado?
Explica la diferencia entre NavbarGuest y NavbarAuth.
¿Cómo puede un componente acceder al estado de autenticación del usuario?
¿Qué sistema de construcción se utiliza en el proyecto y por qué?
¿Qué tecnología se usa para el sistema de tema claro/oscuro?
¿Qué hace el hook personalizado useTheme?
¿Qué beneficio principal se menciona sobre el uso de Auth0 para la seguridad y gestión de tokens?
Clave de Respuestas del Quiz

Se utiliza Auth0 como proveedor de autenticación. Sirve para gestionar el inicio de sesión, incluyendo proveedores sociales, y manejar los tokens de sesión de forma segura.
El componente Auth0Provider envuelve toda la aplicación para habilitar el contexto de autenticación, permitiendo que otros componentes accedan al estado y funciones de Auth0.
Las rutas privadas se protegen encapsulándolas con el componente <ProtectedRoute>.
El hook useAuth0 se utiliza para verificar si el usuario está autenticado.
NavbarGuest es la barra de navegación que se muestra a los visitantes no logueados (en la página de inicio), mientras que NavbarAuth es la barra de navegación para los usuarios autenticados (desde la página /home en adelante).
Un componente puede acceder al estado de autenticación del usuario utilizando el hook useAuth0().
Se utiliza Vite como sistema de construcción. Se elige por su rapidez, simplicidad y compatibilidad con TailwindCSS.
El sistema de tema claro/oscuro se gestiona con un estado global utilizando ThemeContext.
El hook useTheme es un hook personalizado que maneja el tema visual, inicializándolo, permitiendo cambiar entre modos claro/oscuro y aplicando la clase CSS correspondiente al elemento <html>.
El principal beneficio es que Auth0 se encarga de toda la seguridad y gestión de tokens, reduciendo la carga en el frontend.
Preguntas de Ensayo

Explica detalladamente el flujo de autenticación en la aplicación, desde la configuración inicial hasta la protección de rutas y la visualización condicional de componentes.
Compara y contrasta las funciones y el uso de NavbarGuest y NavbarAuth en el contexto del sistema de ruteo público/privado de la aplicación.
Analiza cómo la estructura de carpetas del proyecto facilita la escalabilidad, el mantenimiento y la reutilización de componentes.
Describe la implementación del sistema de tema claro/oscuro, incluyendo cómo se maneja el estado, la aplicación de estilos y la interacción del usuario a través del ThemeToggle.
Discute las consideraciones y las futuras mejores prácticas mencionadas en la documentación, explicando cómo podrían mejorar la aplicación.
Glosario de Términos Clave

Auth0: Proveedor de servicios de autenticación utilizado para gestionar el inicio de sesión y la seguridad de tokens.
Auth0Provider: Componente que envuelve la aplicación para habilitar el contexto de autenticación de Auth0.
cacheLocation="localstorage": Configuración utilizada con Auth0Provider para persistir la sesión del usuario en el almacenamiento local del navegador.
ProtectedRoute: Componente (Higher-Order Component o componente de orden superior) utilizado para encapsular y proteger rutas que solo deben ser accesibles para usuarios autenticados.
useAuth0: Hook de React proporcionado por Auth0 que permite acceder al estado de autenticación (como isAuthenticated) y a las funciones de login/logout.
isAuthenticated: Propiedad disponible a través de useAuth0 que indica si el usuario ha iniciado sesión.
NavbarGuest: Componente de barra de navegación para usuarios no autenticados.
NavbarAuth: Componente de barra de navegación para usuarios autenticados.
Vite: Sistema de construcción rápido para aplicaciones web, utilizado en el proyecto por su eficiencia.
TailwindCSS: Framework de CSS utilitario que permite estilizar la aplicación rápidamente usando clases predefinidas.
React Router DOM: Biblioteca para manejar la navegación y el ruteo dentro de una aplicación React de una sola página.
React Icons: Librería que proporciona una gran colección de iconos populares como componentes de React.
BrowserRouter: Componente de react-router-dom que utiliza la API de historial del navegador (HTML5 history API) para mantener la interfaz de usuario sincronizada con la URL.
useSearchParams: Hook de react-router-dom que permite acceder y manipular los parámetros de búsqueda de la URL.
useTheme: Hook personalizado para gestionar el estado y la lógica del tema claro/oscuro de la aplicación.
ThemeContext: Contexto de React utilizado para compartir el estado del tema a través de la aplicación.
ThemeToggle: Componente interactivo (generalmente un botón) que permite al usuario cambiar entre los temas claro y oscuro.
CardMd / CardLg: Componentes utilizados para mostrar información de películas en diferentes tamaños (mediano y grande).
FilmInfo: Componente responsable de obtener y mostrar los detalles extendidos de una película específica.
Lazy loading: Técnica de optimización para cargar componentes o recursos solo cuando son necesarios.
Vitest: Framework de testing rápido para aplicaciones basadas en Vite.
MSW (Mock Service Worker): Librería para simular APIs y servicios en el lado del cliente durante el desarrollo y testing.
Zustand / TanStack Query: Librerías mencionadas como posibles futuras mejoras para el cacheo y la gestión del estado asíncrono.
