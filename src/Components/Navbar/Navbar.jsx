import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar-header">
      <Link to="/" className="navbar-logo">
        Agro<span>Guide</span>
      </Link>
      <nav className="navbar-nav">
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/farm-check" className={({ isActive }) => (isActive ? 'active' : '')}>
              Farm Check
            </NavLink>
          </li>
          <li>
            <NavLink to="/crop-doctor" className={({ isActive }) => (isActive ? 'active' : '')}>
              Crop Doctor
            </NavLink>
          </li>
          <li>
            <NavLink to="/problem-solver" className={({ isActive }) => (isActive ? 'active' : '')}>
              Problem Solver
            </NavLink>
          </li>
          <li>
            <NavLink to="/schemes" className={({ isActive }) => (isActive ? 'active' : '')}>
              Schemes
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
