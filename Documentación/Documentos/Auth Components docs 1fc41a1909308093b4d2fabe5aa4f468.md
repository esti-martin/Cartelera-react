# Auth Components docs

## Tecnología Principal

- **Auth0**: Se utiliza como proveedor de autenticación. Permite el inicio de sesión con proveedores sociales como Google y maneja los tokens de sesión de forma segura.

## Flujo de Autenticación

### 1. **Configuración Inicial (main.jsx)**

```
<Auth0Provider
  domain={domain}
  clientId={clientId}
  authorizationParams={{ redirect_uri: window.location.origin }}
  cacheLocation="localstorage"
>
  <Router>
    <App />
  </Router>
</Auth0Provider>
```

- **Auth0Provider** envuelve toda la app para habilitar el contexto de autenticación.
- Se usa `cacheLocation="localstorage"` para persistir la sesión incluso tras recargar.

---

### 2. **Protección de Rutas (App.jsx)**

```
<Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
```

- Se encapsulan rutas privadas con `<ProtectedRoute>`.
- `ProtectedRoute` verifica si el usuario está autenticado mediante el hook `useAuth0`.

```
import { useAuth0 } from "@auth0/auth0-react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return children;
}
```

---

### 3. **Redirección Automática en `App.jsx`**

```
useEffect(() => {
  if (isAuthenticated) navigate("/home");
}, [isAuthenticated]);
```

- Redirige automáticamente a /home si el usuario está logueado.

---

## Componentes Clave de Autenticación

### Navbar

- **NavbarGuest**: Navbar para visitantes no logueados (en /).
- **NavbarAuth**: Navbar para usuarios autenticados (desde /home en adelante).

Ambos renderizan de forma condicional según el estado de `isAuthenticated`:

```
{isAuthenticated ? <NavbarAuth /> : <NavbarGuest />}
```

### Botones de Acción

### Iniciar Sesión:

```
const { loginWithRedirect } = useAuth0();
<button onClick={() => loginWithRedirect()}>Iniciar sesión</button>
```

### Cerrar Sesión:

```
const { logout } = useAuth0();
<button onClick={() => logout({ returnTo: window.location.origin })}>Cerrar sesión</button>
```

---

## Estado de Autenticación

Disponible en cualquier componente con:

```
const { isAuthenticated, user, isLoading } = useAuth0();
```

Puedes usar esta información para personalizar el contenido mostrado, por ejemplo:

```
{isAuthenticated ? <p>Hola, {user.name}</p> : <p>Por favor inicia sesión</p>}
```

---

## Consideraciones

- El sistema está preparado para manejar tanto rutas protegidas como interfaces condicionales basadas en la sesión.
- Toda la seguridad y gestión de tokens corre por cuenta de Auth0, reduciendo la carga en el frontend.