import { useAuthContext } from "./AuthContext";
import "./userprofile.css";

// Define una interfaz para el usuario
interface User {
  name: string;
  email: string;
  photoURL: string;
}

function UserProfile() {
  const { user, logout } = useAuthContext();

  if (!user) return <p>No estás logueado</p>;

  return (
    <div className="user-profile">
      <img src={user.photoURL} alt="Perfil" className="profile-img" />
      <div className="user-info">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default UserProfile;
