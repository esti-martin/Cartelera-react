import styles from './NavbarGuest.module.css';
import LoginButton from './LoginButton/LoginButton.jsx';

function NavbarGuest() {
  return (
    <nav className={styles.nav}>
        <img src="/src/assets/logo.png" alt="logo Hooks & Chill" />
        <LoginButton/>
    </nav>
  );
}

export default NavbarGuest;