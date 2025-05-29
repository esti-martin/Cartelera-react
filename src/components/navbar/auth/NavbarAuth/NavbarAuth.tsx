import { useEffect, useState } from "react";
import styles from "./NavbarAuth.module.css";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import SearchBox from "../SearchBox/SearchBox";
import ThemeButton from "@components/commons/theme-button/ThemeButton";
import { Link } from "react-router-dom";
import type { JSX } from "react";

function NavbarAuth(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efecto para bloquear el scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
        <ul className={styles.desktopLinks}>
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

      {/* Menú hamburguesa y versión móvil */}
      {isMenuOpen ? (
        <HiX
          className={styles.menuIcon}
          size={32}
          onClick={() => setIsMenuOpen(false)}
        />
      ) : (
        <HiMenu
          className={styles.menuIcon}
          size={32}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      )}

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul>
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
          <div className={styles.box}>
            <SearchBox />
          </div>
          <div className={styles.mobileButtons}>
            <Link to="/favoritos">
              <FaHeart color="red" size={28} />
            </Link>
            <Link to="/user">
              <CgProfile size={32} />
            </Link>
            <ThemeButton />
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarAuth;
