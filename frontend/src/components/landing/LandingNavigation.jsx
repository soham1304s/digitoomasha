import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, LayoutDashboard, Shield, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '../../context/AuthContext';
import gsap from 'gsap';

export const LandingNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to('.landing-mobile-menu-overlay', { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power3.inOut' });
      gsap.fromTo(
        '.landing-mobile-item',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.2, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to('.landing-mobile-menu-overlay', { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: 'power3.inOut' });
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Articles', href: '/articles' },
    { label: 'Jobs', href: '/jobs' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-3 transition-all duration-300">
        <div className={cn(
          "max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500",
          isScrolled 
            ? "bg-[#F7F7F4]/90 backdrop-blur-xl border border-black/10 shadow-lg shadow-black/5" 
            : "bg-white/60 backdrop-blur-md border border-black/5"
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-base font-black tracking-widest uppercase text-[#111111]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3157FF] animate-pulse"></span>
            DIGITOOMASHA
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-7 m-0 p-0 list-none">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-xs font-semibold uppercase tracking-wider text-[#686868] hover:text-[#111111] transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3157FF] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth / Actions */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="text-xs font-bold px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 border border-purple-200 hover:bg-purple-600 hover:text-white transition-all flex items-center gap-1.5"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/dashboard"
                    className="text-xs font-bold px-4 py-2 rounded-full bg-[#111111] text-white hover:bg-[#3157FF] transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-xs font-semibold uppercase tracking-wider text-[#686868] hover:text-[#111111] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="text-xs font-bold px-4 py-2 rounded-full bg-[#3157FF] text-white hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <Link
                to="/contact"
                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-[#111111] text-white rounded-full px-5 py-2 hover:bg-[#3157FF] transition-all duration-300 shadow-sm"
              >
                Let's Talk
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#111111] focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div 
        className="landing-mobile-menu-overlay fixed inset-0 bg-[#F7F7F4] z-40 flex flex-col justify-center items-center px-6" 
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        <ul className="flex flex-col items-center gap-6 m-0 p-0 list-none text-center">
          {navLinks.map((item) => (
            <li key={item.label} className="overflow-hidden">
              <Link
                to={item.href}
                className="landing-mobile-item text-4xl font-bold tracking-tight text-[#111111] block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {isLoggedIn ? (
            <>
              <li className="mt-4 overflow-hidden">
                <Link
                  to="/dashboard"
                  className="landing-mobile-item text-2xl font-bold text-[#3157FF] flex items-center gap-2 justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-6 h-6" /> Growth Dashboard
                </Link>
              </li>
              {user?.role === 'admin' && (
                <li className="overflow-hidden">
                  <Link
                    to="/admin"
                    className="landing-mobile-item text-2xl font-bold text-purple-600 flex items-center gap-2 justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Shield className="w-6 h-6" /> Admin Portal
                  </Link>
                </li>
              )}
              <li className="overflow-hidden">
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="landing-mobile-item text-xl font-bold text-red-500 flex items-center gap-2 justify-center mt-2"
                >
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </li>
            </>
          ) : (
            <li className="mt-6 flex flex-col gap-4 items-center">
              <Link
                to="/login"
                className="landing-mobile-item text-2xl font-bold text-[#111111]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="landing-mobile-item text-xl font-bold text-white bg-[#3157FF] px-8 py-3 rounded-full shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          )}

          <li className="mt-6 overflow-hidden">
            <Link
              to="/contact"
              className="landing-mobile-item text-lg font-bold flex items-center gap-2 bg-[#111111] text-white px-8 py-3.5 rounded-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Let's Talk <ArrowRight className="w-5 h-5" />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
