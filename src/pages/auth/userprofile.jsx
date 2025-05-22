import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./userprofile.css";
import { useAuth0 } from "@auth0/auth0-react";

function UserProfile() {
  const { user, logout, isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  if (!isAuthenticated || !user) {
    return <p>No estás logueado o no se pudo cargar la información del usuario.</p>;
  }

  return (
    <div className="user-profile pt-36">
      <img src={user.picture} alt={`Perfil de ${user.name}`} className="profile-img" />
      <div className="user-info">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {user.nickname && <p>Nickname: {user.nickname}</p>}
      </div>
      <button onClick={logout} className="logout-button">
        Cerrar sesión
      </button>
    </div>
  );
}

export default UserProfile;

