import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        {/* Contact Banner & Quick Info */}
        <div className="footer-contact-bar">
          <div className="contact-item">
            <div className="contact-icon-box">
              <Mail size={18} />
            </div>
            <div>
              <span className="contact-label">Email Support</span>
              <a href="mailto:support@agromitra.in" className="contact-value">
                support@agromitra.in
              </a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon-box">
              <Phone size={18} />
            </div>
            <div>
              <span className="contact-label">Farmer Helpline (Toll-Free Placeholder)</span>
              <span className="contact-value">1800-AGRO-MITRA</span>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon-box">
              <MapPin size={18} />
            </div>
            <div>
              <span className="contact-label">Platform Origin</span>
              <span className="contact-value">Dedicated to Indian Agriculture</span>
            </div>
          </div>
        </div>

        {/* Main Footer Navigation & Branding */}
        <div className="footer-main-grid">
          {/* Brand Info */}
          <div className="footer-col-brand">
            <div className="footer-logo">
              <div className="brand-icon-wrapper">
                <Sprout size={22} className="brand-sprout-icon" />
              </div>
              <span className="brand-title">AgroMitra</span>
            </div>
            <p className="footer-tagline">
              Smart Krushi Sahayak Platform — Empowering Indian farmers with accessible, reliable agricultural insights for a resilient future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>
                  Home
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>
                  Features & Modules
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>
                  About Our Mission
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Planned Features */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Key Modules</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>
                  Crop Advisory
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>
                  Weather Forecasts
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>
                  Soil Nutrients
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>
                  Government Schemes
                </a>
              </li>
            </ul>
          </div>

          {/* Account Portal Links */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Farmer Portal</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/login" className="footer-text-btn">
                  Portal Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="footer-text-btn">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-text-btn">
                  Farmer Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="footer-bottom-bar">
          <p className="footer-disclaimer">
            AgroMitra is an informational agricultural advisory platform. All agronomy, weather, and scheme information is designed to support, not replace, local agricultural extension officers and verified government portals.
          </p>
          <div className="footer-copyright-row">
            <span>&copy; {new Date().getFullYear()} AgroMitra. Built for Indian Farmers.</span>
            <span className="built-with-love">
              Made with <Heart size={14} className="heart-icon" /> for Indian Krushi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
