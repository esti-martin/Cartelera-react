import styles from "./NavbarAuth.module.css";
import { CgProfile } from "react-icons/cg";
import SearchBox from "../SearchBox/SearchBox";

function NavbarAuth() {
  return (
    <nav className={styles.nav}>
      <section className={styles.logoNav}>
        <a className="bg-transparent" href="/home">
          <img
            className="bg-transparent"
            src="/src/assets/logo.png"
            alt="logo Hooks & Chill"
          />
        </a>
        <ul className="bg-transparent">
          <li className="bg-transparent">
            <a href="/home#Acción">Acción</a>
          </li>
          <li className="bg-transparent">
            <a href="/home#Comedia">Comedia</a>
          </li>
          <li className="bg-transparent">
            <a href="/home#Drama">Drama</a>
          </li>
        </ul>
      </section>
      <section className={styles.searchProfile}>
        <SearchBox />
        <button>
          <CgProfile className={styles.searchIcon} size={32} />
        </button>
      </section>
    </nav>
  );
}

export default NavbarAuth;
