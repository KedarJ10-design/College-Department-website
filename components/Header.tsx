import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect to toggle a class on the body to prevent scrolling when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup function to remove the class if the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">
            <NavLink to="/" onClick={closeMenu}>
              <span className="logo-icon" role="img" aria-label="University Logo">🎓</span>
              CS Department
            </NavLink>
          </h1>
          <nav className={isMenuOpen ? 'is-open' : ''}>
            <ul>
              <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Home</NavLink></li>
              <li><NavLink to="/faculty" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Faculty</NavLink></li>
              <li><NavLink to="/courses" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Courses</NavLink></li>
              <li><NavLink to="/achievements" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Achievements</NavLink></li>
              <li><NavLink to="/news" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>News & Events</NavLink></li>
              <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Contact</NavLink></li>
            </ul>
          </nav>
          <button className={`hamburger-menu ${isMenuOpen ? 'is-open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;