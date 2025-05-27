import styles from "./NavbarAuth.module.css";
import { CgProfile } from "react-icons/cg";
import SearchBox from "../SearchBox/SearchBox";
import ThemeButton from "@components/commons/theme-button/ThemeButton";
import { Link } from "react-router-dom";

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
            <a className="dark:text-white text-black" href="/home#Acción">
              Acción
            </a>
          </li>
          <li className="bg-transparent">
            <a className="dark:text-white text-black" href="/home#Comedia">
              Comedia
            </a>
          </li>
          <li className="bg-transparent">
            <a className="dark:text-white text-black" href="/home#Drama">
              Drama
            </a>
          </li>
        </ul>
      </section>
      <section className={styles.searchProfile}>
        <SearchBox />
        <Link to="/user" className={styles.profileLink}>
          <CgProfile className={styles.searchIcon} size={32} />
        </Link>
        <ThemeButton />
      </section>
    </nav>
  );
}

export default NavbarAuth;
