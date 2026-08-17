import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, Search, Menu, X, LogOut, LayoutDashboard, Settings, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, isLoggedIn, logout } = useAuth();
  const dropdownRef = useRef(null);

  // Scroll listener for sticky glassmorphic transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ease-in-out ${
      scrolled 
        ? 'bg-[#FAF8F2]/95 backdrop-blur-xl shadow-md border-b border-[#E0DDD2] py-3' 
        : 'bg-[#FAF8F2]/90 backdrop-blur-md py-5 border-b border-[#E0DDD2]/40'
    }`}>
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo group flex items-center gap-3 text-decoration-none">
          <div className="logo-pixel-grid transition-transform duration-300 group-hover:scale-110">
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
          <span className="brand-name font-extrabold text-xl tracking-tight text-[#1A1A1A] group-hover:text-[#D99B00] transition-colors duration-300">
            DigiToomasha
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `relative text-xs font-extrabold uppercase tracking-wider text-decoration-none transition-all duration-200 py-1 ${
                isActive 
                  ? 'text-[#D99B00] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#D99B00] after:rounded-full' 
                  : 'text-[#1A1A1A] hover:text-[#D99B00]'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) => 
              `relative inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-decoration-none transition-all duration-200 py-1 ${
                isActive 
                  ? 'text-[#D99B00] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#D99B00] after:rounded-full' 
                  : 'text-[#1A1A1A] hover:text-[#D99B00]'
              }`
            }
          >
            Services <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </NavLink>

          <NavLink
            to="/work"
            className={({ isActive }) => 
              `relative text-xs font-extrabold uppercase tracking-wider text-decoration-none transition-all duration-200 py-1 ${
                isActive 
                  ? 'text-[#D99B00] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#D99B00] after:rounded-full' 
                  : 'text-[#1A1A1A] hover:text-[#D99B00]'
              }`
            }
          >
            Work
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => 
              `relative text-xs font-extrabold uppercase tracking-wider text-decoration-none transition-all duration-200 py-1 ${
                isActive 
                  ? 'text-[#D99B00] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#D99B00] after:rounded-full' 
                  : 'text-[#1A1A1A] hover:text-[#D99B00]'
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/articles"
            className={({ isActive }) => 
              `relative text-xs font-extrabold uppercase tracking-wider text-decoration-none transition-all duration-200 py-1 ${
                isActive 
                  ? 'text-[#D99B00] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#D99B00] after:rounded-full' 
                  : 'text-[#1A1A1A] hover:text-[#D99B00]'
              }`
            }
          >
            Articles
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) => 
              `relative text-xs font-extrabold uppercase tracking-wider text-decoration-none transition-all duration-200 py-1 ${
                isActive 
                  ? 'text-[#D99B00] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#D99B00] after:rounded-full' 
                  : 'text-[#1A1A1A] hover:text-[#D99B00]'
              }`
            }
          >
            Jobs
          </NavLink>
        </nav>

        {/* Action Controls & Auth Section */}
        <div className="flex items-center gap-4">
          <Link 
            to="/articles" 
            className="w-10 h-10 rounded-full bg-[#EAE6D6] hover:bg-[#1E3A2B] hover:text-white flex items-center justify-center text-[#1A1A1A] transition-all duration-300 text-decoration-none"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Auth Controls */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2.5 bg-white border border-[#E0DDD2] px-3.5 py-1.5 rounded-full hover:border-[#1E3A2B] transition-all duration-200 shadow-sm"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-label="User Menu"
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#1E3A2B] flex items-center justify-center text-white text-xs font-bold">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.charAt(0) || 'U'
                  )}
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <span className="text-xs font-bold text-[#1A1A1A] hidden sm:inline-block">{user?.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-black/10 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 bg-[#FAF8F2] rounded-xl mb-2">
                    <p className="text-xs font-extrabold text-[#1A1A1A] truncate">{user?.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                    <span className="mt-1 inline-block text-[10px] bg-[#1E3A2B] text-white px-2 py-0.5 rounded-full font-mono uppercase font-bold">
                      {user?.role || 'Client'}
                    </span>
                  </div>

                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#1A1A1A] hover:bg-[#F3F4F6] rounded-xl transition-colors text-decoration-none"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Shield className="w-4 h-4 text-[#1E3A2B]" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  <Link 
                    to="/dashboard" 
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#1A1A1A] hover:bg-[#F3F4F6] rounded-xl transition-colors text-decoration-none"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4 text-gray-600" />
                    <span>Growth Dashboard</span>
                  </Link>

                  <Link 
                    to="/contact" 
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#1A1A1A] hover:bg-[#F3F4F6] rounded-xl transition-colors text-decoration-none"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span>Account Settings</span>
                  </Link>

                  <div className="my-1 border-t border-gray-100" />

                  <button
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login" 
                className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A] hover:text-[#D99B00] transition-colors text-decoration-none"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-[#1E3A2B] text-white px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider hover:bg-[#14291E] hover:scale-105 transition-all duration-300 shadow-md text-decoration-none"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            className="md:hidden w-10 h-10 rounded-full bg-[#EFEFEA] flex items-center justify-center text-[#111111] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-black/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <NavLink
            to="/"
            className="block text-sm font-extrabold uppercase tracking-wider text-[#111111] text-decoration-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className="block text-sm font-extrabold uppercase tracking-wider text-[#111111] text-decoration-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/work"
            className="block text-sm font-extrabold uppercase tracking-wider text-[#111111] text-decoration-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            Work
          </NavLink>
          <NavLink
            to="/about"
            className="block text-sm font-extrabold uppercase tracking-wider text-[#111111] text-decoration-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/articles"
            className="block text-sm font-extrabold uppercase tracking-wider text-[#111111] text-decoration-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            Articles
          </NavLink>
          <NavLink
            to="/jobs"
            className="block text-sm font-extrabold uppercase tracking-wider text-[#111111] text-decoration-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            Jobs
          </NavLink>

          <div className="border-t border-gray-100 my-4" />

          {isLoggedIn ? (
            <div className="space-y-3">
              <span className="block text-xs font-semibold text-gray-500">Signed in as {user?.name}</span>
              <button
                className="w-full bg-[#111111] text-white py-3 rounded-full text-xs font-extrabold uppercase tracking-wider"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full text-center bg-[#F3F4F6] text-[#111111] py-3 rounded-full text-xs font-extrabold uppercase tracking-wider text-decoration-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="w-full text-center bg-[#111111] text-white py-3 rounded-full text-xs font-extrabold uppercase tracking-wider text-decoration-none"
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
