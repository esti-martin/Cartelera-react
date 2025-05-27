# Correcciones y Mejoras en la Aplicación Cartelera-React

Este documento detalla los problemas identificados y las soluciones implementadas para mejorar la funcionalidad y la experiencia de usuario de la aplicación Cartelera-React.

## 1. Redirección Inesperada a `/home` Durante la Navegación y Búsqueda

- **Problema:**
  Al realizar una búsqueda o al hacer clic en una tarjeta de película para ver su información detallada (ruta `/movie/:id`), la aplicación redirigía automáticamente al usuario de vuelta a la página principal (`/home`). Esto ocurría porque el hook `useEffect` en `App.jsx` estaba configurado para redirigir a `/home` cada vez que `isAuthenticated` era `true`, sin considerar la ruta actual.

- **Archivo Principal Modificado:** `src/App.jsx`

- **Solución Detallada:**
  1.  **Importación de `useLocation`:** Se importó el hook `useLocation` de `react-router-dom` para poder acceder a la ruta actual dentro del `useEffect`.
      ```diff
      - import { Routes, Route, useNavigate } from "react-router-dom";
      + import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
      ```
  2.  **Acceso a la Ruta Actual:** Se obtuvo el objeto `location` usando `useLocation()`.
      ```javascript
      const location = useLocation();
      ```
  3.  **Modificación de la Lógica de Redirección en `useEffect`:**
      Se actualizó la condición dentro del `useEffect` para que la redirección a `/home` solo ocurriera si el usuario estaba autenticado (`isAuthenticated === true`) **Y** se encontraba en la ruta raíz (`location.pathname === "/"`).
      `diff
    useEffect(() => {
    - if (isAuthenticated) {
    + if (isAuthenticated && location.pathname === "/") {
        navigate("/home");
      }
    - }, [isAuthenticated, navigate]);
    + }, [isAuthenticated, navigate, location.pathname]);
    `
      Esto aseguró que la redirección a `/home` solo se ejecutara al iniciar sesión o si un usuario autenticado intentaba acceder directamente a la ruta raíz, pero no interferiría con la navegación a otras rutas protegidas.

## 2. Resultados de Búsqueda No Visibles

- **Problema:**
  Tras ingresar un término en el cuadro de búsqueda (`SearchBox.jsx`) y presionar Enter (o el botón de búsqueda), la URL cambiaba correctamente a `/search?q=terminoBuscado`, pero no se renderizaba ningún componente ni se mostraban resultados. La página permanecía igual o mostraba el componente de la ruta anterior.

- **Archivo Principal Modificado:** `src/App.jsx`

- **Solución Detallada:**
  1.  **Identificación de Ruta Faltante:** Se observó que no existía una definición de `Route` en `App.jsx` que correspondiera al `path="/search"`.
  2.  **Adición de la Ruta de Búsqueda:** Se añadió una nueva `Route` dentro del componente `Routes`. Esta ruta está protegida por `ProtectedRoute` y renderiza el componente `Search` (ubicado en `src/pages/auth/Search.jsx`) cuando la URL coincide con `/search`.
      `javascript
    // Dentro de <Routes> en App.jsx
    <Route
      path="/search"
      element={
        <ProtectedRoute>
          <Search />
        </ProtectedRoute>
      }
    />
    `
      Esto conectó la acción de búsqueda con el componente diseñado para obtener y mostrar los resultados.

## 3. Redirección a la Página de Inicio (`/`) al Recargar `/home` o Rutas Protegidas

- **Problema:**
  Cuando un usuario autenticado se encontraba en la página `/home` (o cualquier otra ruta protegida) y recargaba el navegador, era redirigido a la página de aterrizaje pública (`/`) en lugar de permanecer en la página actual.

- **Archivos Modificados:**

  - `src/App.jsx` (ajuste menor en `useEffect`)
  - `src/main.jsx` (modificación principal para la persistencia de Auth0)

- **Solución Detallada:**
  1.  **Simplificación del `useEffect` en `App.jsx` (Intento Intermedio Fallido y Corrección):**
      - Inicialmente, se intentó usar `sessionStorage` en el `useEffect` de `App.jsx` para evitar la redirección a `/home` en cada recarga si ya se estaba en una ruta autenticada. Esto no resolvió el problema subyacente de la pérdida momentánea del estado de autenticación durante la recarga.
      - Posteriormente, se simplificó el `useEffect` para que su única responsabilidad fuera redirigir a `/home` si `isAuthenticated` es `true` y `location.pathname === "/"`.
        ```javascript
        // En App.jsx
        useEffect(() => {
          if (isAuthenticated && location.pathname === "/") {
            navigate("/home");
          }
        }, [isAuthenticated, location.pathname, navigate]);
        ```
  2.  **Configuración de Persistencia en `Auth0Provider` (`src/main.jsx`):**
      La causa principal del problema era que Auth0, por defecto, podría no estar persistiendo el estado de autenticación de manera robusta entre recargas de página (puede usar almacenamiento en memoria).
      Se añadió la propiedad `cacheLocation="localstorage"` al componente `Auth0Provider` en `src/main.jsx`.
      ```diff
      // En src/main.jsx
      createRoot(document.getElementById("root")).render(
        <StrictMode>
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
              redirect_uri: window.location.origin
            }}
      +     cacheLocation="localstorage" // Añadido para persistencia
          >
            <Router>
              <App />
            </Router>
          </Auth0Provider>
        </StrictMode>
      );
      ```
      Al usar `localstorage`, Auth0 guarda la información de la sesión de forma persistente en el navegador del usuario. Esto permite que, al recargar la página, `Auth0Provider` pueda restaurar rápidamente el estado de autenticación, evitando que `ProtectedRoute` redirija al usuario a `/` debido a una detección momentánea de "no autenticado".

## 4. Botón de Perfil en `NavbarAuth` No Funcional

- **Problema:**
  En la barra de navegación para usuarios autenticados (`NavbarAuth.jsx`), el icono de perfil (representado por `CgProfile`) estaba presente pero no realizaba ninguna acción al hacer clic en él. No redirigía a la página de perfil del usuario.

- **Archivo Principal Modificado:** `src/components/navbar/auth/NavbarAuth/NavbarAuth.jsx`

- **Solución Detallada:**
  1.  **Importación de `Link`:** Se importó el componente `Link` de `react-router-dom`.
      ```diff
      + import { Link } from "react-router-dom";
      ```
  2.  **Reemplazo de `<button>` por `<Link>`:** El icono `CgProfile` estaba envuelto en una etiqueta `<button>` que no tenía ningún manejador de eventos `onClick` ni estaba vinculada a la navegación. Se reemplazó la etiqueta `<button>` por el componente `<Link>`, configurando su prop `to` para que apunte a la ruta `/user`.
      `diff
    // En NavbarAuth.jsx
    <section className={styles.searchProfile}>
      <SearchBox />
    - <button>
    + <Link to="/user" className={styles.profileLink}> // Se asume que styles.profileLink existe o se añade para estilos
        <CgProfile className={styles.searchIcon} size={32} />
    - </button>
    + </Link>
    </section>
    `
      Esto transformó el icono de perfil en un enlace de navegación funcional que dirige al usuario a su página de perfil.

## 5. Página de Perfil de Usuario Vacía o Mostrando Datos Incorrectos

- **Problema:**
  Al acceder a la página de perfil del usuario (`/user`), esta se mostraba en blanco, o mostraba un mensaje de "No estás logueado", o (si se hubiera dejado el estado inicial) mostraría datos quemados en lugar de la información del usuario autenticado a través de Auth0.

- **Archivos Modificados:**

  - `src/App.jsx` (para proveer el contexto de autenticación)
  - `src/pages/auth/AuthContext.jsx` (para usar datos de Auth0 en el contexto)
  - `src/pages/auth/UserProfile.jsx` (para consumir y mostrar correctamente los datos de Auth0)

- **Solución Detallada:**

  1.  **Proveer `AuthProvider` en `src/App.jsx`:**
      El `AuthContext` (definido en `AuthContext.jsx`) necesitaba ser provisto a los componentes que lo consumirían. Se importó `AuthProvider` y se utilizó para envolver la estructura principal de rutas y componentes dentro de `App.jsx`.

      ```diff
      // En App.jsx
      + import { AuthProvider } from "@pages/auth/AuthContext";

      export default function App() {
        // ... (otros hooks y lógica) ...
      - const { isAuthenticated, isLoading } = useAuth0(); // 'user' de useAuth0 se renombró para evitar conflicto
      + const { user: auth0User, isAuthenticated, isLoading } = useAuth0();
        // ...
        return (
      -   <>
      +   <AuthProvider>
            {/* Navbar y Routes */}
            {isAuthenticated ? <NavbarAuth /> : <NavbarGuest />}
            <Routes>
              {/* ...definiciones de rutas... */}
            </Routes>
            <Footer />
      -   </>
      +   </AuthProvider>
        );
      }
      ```

      También se renombró la variable `user` destructurada de `useAuth0()` a `auth0User` para evitar un conflicto de nombres con la variable `user` que provendría del `AuthContext`.

  2.  **Actualización de `AuthContext.jsx` para Usar Datos de Auth0:**
      El `AuthProvider` en `AuthContext.jsx` originalmente usaba un estado local con datos de usuario quemados. Se modificó para que:

      - Importara y utilizara `useAuth0()`.
      - Obtuviera `user`, `isAuthenticated`, `isLoading` y `logout` (renombrada a `auth0Logout`) del hook `useAuth0`.
      - Proveyera estos valores (el `user` real de Auth0 y una función `logout` que llama a `auth0Logout` con redirección) a través del `AuthContext.Provider`.

      ```diff
      // En src/pages/auth/AuthContext.jsx
      - import { createContext, useState, useContext } from "react";
      + import { createContext, useContext } from "react"; // Se eliminó useState
      + import { useAuth0 } from "@auth0/auth0-react";

      export const AuthProvider = ({ children }) => {
      - const [user, setUser] = useState({ /* datos quemados */ });
      + const { user, isAuthenticated, isLoading, logout: auth0Logout } = useAuth0();

      const logout = () => {
      -   setUser(null);
      +   auth0Logout({ logoutParams: { returnTo: window.location.origin } });
        };

        return (
      -   <AuthContext.Provider value={{ user, logout }}>
      +   <AuthContext.Provider value={{ user, isAuthenticated, isLoading, logout }}>
            {children}
          </AuthContext.Provider>
        );
      };
      ```

  3.  **Actualización de `UserProfile.jsx` para Consumir Datos de Auth0 del Contexto:**
      El componente `UserProfile.jsx` se actualizó para:

      - Consumir `user`, `logout`, `isAuthenticated`, e `isLoading` del `AuthContext`.
      - Manejar el estado `isLoading` mostrando un mensaje de "Cargando perfil...".
      - Mostrar un mensaje apropiado si `!isAuthenticated` o `!user`.
      - Acceder a las propiedades correctas del objeto `user` de Auth0 (ej: `user.picture` en lugar de `user.photoURL`, `user.name`, `user.email`, y opcionalmente `user.nickname`).

      ```diff
      // En src/pages/auth/UserProfile.jsx
      function UserProfile() {
      - const { user, logout } = useContext(AuthContext);
      + const { user, logout, isAuthenticated, isLoading } = useContext(AuthContext);

      + if (isLoading) {
      +   return <p>Cargando perfil...</p>;
      + }

      - if (!user) return <p>No estás logueado</p>;
      + if (!isAuthenticated || !user) {
      +   return <p>No estás logueado o no se pudo cargar la información del usuario.</p>;
      + }

        return (
          // Se añadió pt-36 para posible navbar fija
      -   <div className="user-profile">
      +   <div className="user-profile pt-36">
      -     <img src={user.photoURL} alt="Perfil" className="profile-img" />
      +     <img src={user.picture} alt={`Perfil de ${user.name}`} className="profile-img" />
            <div className="user-info">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
      +       {user.nickname && <p>Nickname: {user.nickname}</p>}
            </div>
      -     <button onClick={logout}>Cerrar sesión</button>
      +     <button onClick={logout} className="logout-button">Cerrar sesión</button>
          </div>
        );
      }
      ```

Estos cambios aseguraron que la página de perfil mostrara la información correcta del usuario autenticado con Auth0 y que la funcionalidad de cierre de sesión operara como se esperaba.
