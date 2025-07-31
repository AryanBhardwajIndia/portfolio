import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="./src/components/CV.pdf" target="_blank"><div className="resume-button">Résumé</div></a>
    </nav>
  );
};

export default Navbar;
