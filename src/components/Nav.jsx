import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="nav-bar flex">
        <p className="title">CookBook Pro</p>

        {/* Desktop nav links */}
        <div className="nav-cluster">
          <NavLink to="/"><span>Home</span></NavLink>
          <NavLink to="/about"><span>About</span></NavLink>
          <NavLink to="/recipes"><span>Recipes</span></NavLink>
          <NavLink to="/tips"><span>Chef Tips</span></NavLink>
          <NavLink to="/favorites"><span>Favorites</span></NavLink>
        </div>

        {/* Hamburger button — visible on mobile only */}
        <button
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu} />
      )}

      {/* Slide-in mobile menu */}
      <nav className={`mobile-menu ${isMenuOpen ? "open" : ""}`} aria-hidden={!isMenuOpen}>
        <NavLink to="/" onClick={closeMenu}><span>Home</span></NavLink>
        <NavLink to="/about" onClick={closeMenu}><span>About</span></NavLink>
        <NavLink to="/recipes" onClick={closeMenu}><span>Recipes</span></NavLink>
        <NavLink to="/tips" onClick={closeMenu}><span>Chef Tips</span></NavLink>
        <NavLink to="/favorites" onClick={closeMenu}><span>Favorites</span></NavLink>
      </nav>
    </>
  );
};

export default Nav;
