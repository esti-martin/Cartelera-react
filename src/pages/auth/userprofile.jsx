import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./userprofile.css";

function UserProfile() {
  const { user, logout } = useContext(AuthContext);

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

