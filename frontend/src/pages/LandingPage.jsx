import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import About from '../components/About.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';
import AuthNoticeModal from '../components/AuthNoticeModal.jsx';
import '../styles/landing.css';

export default function LandingPage() {
  const [authModalState, setAuthModalState] = useState({
    isOpen: false,
    mode: 'login' // 'login' | 'register'
  });

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalState({
      isOpen: true,
      mode
    });
  };

  const handleCloseAuth = () => {
    setAuthModalState((prev) => ({
      ...prev,
      isOpen: false
    }));
  };

  const handleFeatureClick = (featureTitle) => {
    // Scrolls to about section or shows friendly info
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page-layout">
      {/* Navigation */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* Main Sections */}
      <main id="main-content">
        <Hero onOpenAuth={handleOpenAuth} />
        <Features onCardClick={handleFeatureClick} />
        <About />
        <CTA onOpenAuth={handleOpenAuth} />
      </main>

      {/* Footer & Contact */}
      <Footer onOpenAuth={handleOpenAuth} />

      {/* Modal for Auth/Portal Notice */}
      <AuthNoticeModal
        isOpen={authModalState.isOpen}
        onClose={handleCloseAuth}
        mode={authModalState.mode}
      />
    </div>
  );
}
