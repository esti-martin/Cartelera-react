import styles from './NavbarGuest.module.css';
import LoginButton from './LoginButton/LoginButton';
import type { JSX } from "react";


function NavbarGuest(): JSX.Element  {
  return (
    <nav className={styles.nav}>
        <img src="/logo.png" alt="logo Hooks & Chill" />
        <LoginButton />
    </nav>
  );
}

export default NavbarGuest;