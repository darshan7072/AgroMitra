import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Sprout, Menu, X, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react';

export default function Navbar({ onOpenAuth }) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const handleRegisterClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/register');
  };

  const handleLogout = async () => {
    setIsMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo & Name */}
        <Link
          to="/"
          className="brand-logo-link"
          onClick={(e) => handleNavLinkClick(e, 'home')}
          aria-label="AgroMitra Home"
        >
          <div className="brand-icon-wrapper">
            <Sprout size={24} className="brand-sprout-icon" />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">AgroMitra</span>
            <span className="brand-subtitle">Smart Krushi Sahayak</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links-list">
            <li>
              <a
                href="#home"
                className="nav-link"
                onClick={(e) => handleNavLinkClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="nav-link"
                onClick={(e) => handleNavLinkClick(e, 'features')}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="nav-link"
                onClick={(e) => handleNavLinkClick(e, 'about')}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-link"
                onClick={(e) => handleNavLinkClick(e, 'contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Auth Action Buttons */}
        <div className="desktop-auth-actions">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn-primary btn-sm">
                <LayoutDashboard size={16} />
                <span>Dashboard ({user?.name?.split(' ')[0]})</span>
              </Link>
              <button
                type="button"
                className="btn btn-outline btn-sm dash-logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleLoginClick}
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRegisterClick}
              >
                <UserPlus size={16} />
                <span>Create Account</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer / Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-drawer"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <div className="container mobile-drawer-content">
            <nav className="mobile-nav-links">
              <a
                href="#home"
                className="mobile-nav-link"
                onClick={(e) => handleNavLinkClick(e, 'home')}
              >
                Home
              </a>
              <a
                href="#features"
                className="mobile-nav-link"
                onClick={(e) => handleNavLinkClick(e, 'features')}
              >
                Features
              </a>
              <a
                href="#about"
                className="mobile-nav-link"
                onClick={(e) => handleNavLinkClick(e, 'about')}
              >
                About
              </a>
              <a
                href="#contact"
                className="mobile-nav-link"
                onClick={(e) => handleNavLinkClick(e, 'contact')}
              >
                Contact
              </a>
            </nav>

            <div className="mobile-drawer-auth">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="btn btn-primary btn-block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard size={16} />
                    <span>Open Dashboard</span>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline btn-block dash-logout-btn"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-outline btn-block"
                    onClick={handleLoginClick}
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={handleRegisterClick}
                  >
                    <UserPlus size={16} />
                    <span>Create Account</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
