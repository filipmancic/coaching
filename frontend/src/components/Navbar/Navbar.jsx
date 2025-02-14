import React, { useState } from "react";
import {Link} from "react-router-dom"
import "./Navbar.css";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <nav className="navbar">
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <div className="d-flex">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Pocetna</Link>
          </li>
          <li>
            <Link to="/programi" onClick={() => setMenuOpen(false)}>Programi</Link>
          </li>
          <li>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          </li>
        </div>
        <div className="logo">
          <img src="/img/logo2.png" alt="Logo" />
        </div>
        <div className="d-flex">
          <li>
            <Link to="/o-meni" onClick={() => setMenuOpen(false)}>O meni</Link>
          </li>
          <li>
            <Link to="/moj-profil" onClick={() => setMenuOpen(false)}>Moj profil</Link>
          </li>
          <li>
            <Link to="/kontakt" onClick={() => setMenuOpen(false)}>Kontakt</Link>
          </li>
        </div>
      </ul>
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
      );
}
