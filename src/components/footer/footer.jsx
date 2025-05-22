import React from 'react';
import './footer.css';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer border-t-2 border-white bg-black">
      <div className="footer-content bg-black">
        <img src={logo} alt="Logo" className="footer-logo bg-black" />
        <p className="footer-text">© {new Date().getFullYear()} Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
