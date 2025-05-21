import styles from './NavbarAuth.module.css';
import { CgProfile } from "react-icons/cg";

function NavbarAuth() {
  return (
    <nav className={styles.nav}>
      <section>
        <img src="/src/assets/logo.png" alt="logo Hooks & Chill" />
        <ul>
          <li><a href="#Acción">Acción</a></li>
          <li><a href="#Comedia">Comedia</a></li>
          <li><a href="#Drama">Drama</a></li>
        </ul>
      </section>
        <botton>
          <CgProfile size={32}/>
        </botton>
    </nav>
  );
}

export default NavbarAuth;