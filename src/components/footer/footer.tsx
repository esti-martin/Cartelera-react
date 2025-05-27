import React from "react";
import "./footer.css";
import logo from "../../../public/logo.png";

const Footer = () => {
  return (
    <footer className="footer border-t-2 border-slate-300 dark:border-gray-700 bg-slate-100 dark:bg-zinc-900">
      <div className="footer-content">
        <img src={logo} alt="Logo" className="footer-logo" />
        <p className="footer-text">
          © {new Date().getFullYear()} Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
