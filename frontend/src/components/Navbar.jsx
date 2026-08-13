import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, Search, Menu, X, LogOut, LayoutDashboard, Settings, Bell, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { user, isLoggedIn, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar-container">
      {/* Brand Logo */}
      <Link to="/" className="navbar-logo">
        <div className="logo-pixel-grid">
          <span className="pixel dot-dark" />
          <span className="pixel dot-dark" />
          <span className="pixel dot-dark" />
          <span className="pixel dot-dark" />
          <span className="pixel dot-light" />
          <span className="pixel dot-dark" />
          <span className="pixel dot-dark" />
          <span className="pixel dot-dark" />
          <span className="pixel dot-dark" />
        </div>
        <span className="brand-name">DigiToomasha</span>
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-item nav-active' : 'nav-item')}
        >
          Home
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? 'nav-item nav-active' : 'nav-item')}
        >
          Services <ChevronDown className="chevron-icon" />
        </NavLink>
        <NavLink
          to="/work"
          className={({ isActive }) => (isActive ? 'nav-item nav-active' : 'nav-item')}
        >
          Work
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'nav-item nav-active' : 'nav-item')}
        >
          About
        </NavLink>
        <NavLink
          to="/articles"
          className={({ isActive }) => (isActive ? 'nav-item nav-active' : 'nav-item')}
        >
          Articles
        </NavLink>
      </nav>

      {/* Dedicated Auth & Action Section */}
      <div className="nav-actions">
        <Link to="/articles" className="icon-btn" aria-label="Search">
          <Search className="search-icon" />
        </Link>

        {/* Auth State Controls */}
        {isLoggedIn ? (
          <div className="user-profile-wrapper" ref={dropdownRef}>
            <button
              className="user-profile-badge"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              aria-label="User Menu"
            >
              <div className="avatar-img-box">
                <img src={user.avatar} alt={user.name} className="user-avatar-img" />
                <span className="online-indicator" />
              </div>
              <span className="user-name">{user.name}</span>
              <ChevronDown className={`dropdown-chevron ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="user-dropdown-menu">
                <div className="dropdown-user-header">
                  <span className="dropdown-user-name">{user.name}</span>
                  <span className="dropdown-user-email">{user.email}</span>
                  <span className="dropdown-role-badge">{user.role}</span>
                </div>

                <div className="dropdown-divider" />

                {/* Show Admin Link ONLY if user has admin role */}
                {user?.role === 'admin' && (
                  <Link to="/admin" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                    <Shield className="dropdown-icon" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}

                <Link to="/dashboard" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                  <LayoutDashboard className="dropdown-icon" />
                  <span>Growth Dashboard</span>
                </Link>

                <Link to="/contact" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                  <Settings className="dropdown-icon" />
                  <span>Account Settings</span>
                </Link>

                <div className="dropdown-divider" />

                <button
                  className="dropdown-item dropdown-logout-btn"
                  onClick={() => {
                    logout();
                    setUserDropdownOpen(false);
                  }}
                >
                  <LogOut className="dropdown-icon" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons-group">
            <Link to="/login" className="auth-signin-btn">
              Sign In
            </Link>
            <Link to="/signup" className="auth-signup-btn">
              Sign Up
            </Link>
          </div>
        )}

        {/* Mobile Hamburger Menu Icon */}
        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <NavLink
            to="/"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/work"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Work
          </NavLink>
          <NavLink
            to="/about"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/articles"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Articles
          </NavLink>

          <div className="dropdown-divider" />

          {isLoggedIn ? (
            <div className="mobile-auth-user">
              <span className="mobile-user-name">Signed in as {user.name}</span>
              <button
                className="auth-signup-btn mobile-logout-btn"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="mobile-auth-actions">
              <Link
                to="/login"
                className="auth-signin-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="auth-signup-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
