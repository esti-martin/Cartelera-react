import styles from "./NavbarAuth.module.css";
import { CgProfile } from "react-icons/cg";
import SearchBox from "../SearchBox/SearchBox";

function NavbarAuth() {
  return (
    <nav className={styles.nav}>
      <section className={styles.logoNav}>
        <a href="/home">
          <img src="/src/assets/logo.png" alt="logo Hooks & Chill" />
        </a>
        <ul>
          <li>
            <a href="/home#Acción">Acción</a>
          </li>
          <li>
            <a href="/home#Comedia">Comedia</a>
          </li>
          <li>
            <a href="/home#Drama">Drama</a>
          </li>
        </ul>
      </section>
      <section className={styles.searchProfile}>
        <SearchBox />
        <botton>
          <CgProfile className={styles.searchIcon} size={32} />
        </botton>
      </section>
    </nav>
  );
}

export default NavbarAuth;
