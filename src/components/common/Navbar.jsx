import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function Navbar({ onOpenConsultation }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { buyerLocation } = useMarketplace();

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      {/* Top Banner Ticker */}
      <div className="navbar-topbar">
        <div className="topbar-content container">
          <div className="topbar-location">
            <span className="location-tag">AGRO-DISTRICT</span>
            <span>
              Target Zone: <strong>{buyerLocation?.districtName}, {buyerLocation?.stateName}</strong>
            </span>
          </div>

          <div className="topbar-auth">
            {currentUser ? (
              <div className="user-profile-badge">
                <Link to="/profile" className="profile-topbar-link">
                  <span className="user-initials">
                    {currentUser.avatarInitials || currentUser.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="user-name">{currentUser.name}</span>
                  <span className="user-role-pill">
                    {currentUser.role?.toUpperCase()}
                  </span>
                </Link>
                <button onClick={logout} className="logout-btn" title="Sign out">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/profile" className="seller-login-quick-btn">
                Sign In / Profile
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="navbar-main container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-logo-circle">
            <span className="brand-monogram">AG</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">AgroGuide</span>
            <span className="brand-subtitle">Smart Agriculture &amp; Direct Krishi Portal</span>
          </div>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span className="menu-btn-label">{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
        </button>

        {/* Desktop & Mobile Navigation Links */}
        <div className={`nav-links-wrapper ${isMobileMenuOpen ? 'open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/farm-health"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Farm Health &amp; Eco
          </NavLink>

          <NavLink
            to="/schemes"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Govt Schemes
          </NavLink>

          <NavLink
            to="/marketplace"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Marketplace
          </NavLink>

          <NavLink
            to="/consultation"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Consultation
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Profile
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About
          </NavLink>

          
        </div>
      </nav>
    </header>
  );
}
