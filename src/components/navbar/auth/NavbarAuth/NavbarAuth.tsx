import styles from "./NavbarAuth.module.css";
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa"; // <- Añadido
import SearchBox from "../SearchBox/SearchBox";
import ThemeButton from "@components/commons/theme-button/ThemeButton";
import { Link } from "react-router-dom";
import type { JSX } from "react";

function NavbarAuth(): JSX.Element {
  return (
    <nav className={styles.nav}>
      <section className={styles.logoNav}>
        <a className="bg-transparent" href="/home">
          <img
            className="bg-transparent"
            src="/logo.png"
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

        {/* Enlace a favoritos con icono de corazón */}
        <Link to="/favoritos" className={styles.profileLink}>
          <FaHeart className={styles.searchIcon} color="red" size={28} />
        </Link>

        {/* Enlace al perfil de usuario */}
        <Link to="/user" className={styles.profileLink}>
          <CgProfile className={styles.searchIcon} size={32} />
        </Link>

        <ThemeButton />
      </section>
    </nav>
  );
}

export default NavbarAuth;
