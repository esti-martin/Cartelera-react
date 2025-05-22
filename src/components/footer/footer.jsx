import React from 'react';
import './footer.css';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer border-t-2 border-white bg-zinc-900">
      <div className="footer-content bg-zinc-900">
        <img src={logo} alt="Logo" className="footer-logo bg-zinc-900" />
        <p className="footer-text">© {new Date().getFullYear()} Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
