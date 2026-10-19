import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Smartphone, Leaf } from 'lucide-react';
import fallbackHeroSvg from '../assets/farm-hero-fallback.svg';

export default function Hero() {
  const [imgSrc, setImgSrc] = useState(
    'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80'
  );
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    setImgSrc(fallbackHeroSvg);
  };

  const handleScrollToFeatures = (e) => {
    e.preventDefault();
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Text & Actions */}
        <div className="hero-content">
          <div className="hero-badge">
            <Leaf size={16} className="hero-badge-icon" />
            <span>Smart Krushi Sahayak Platform</span>
          </div>

          <h1 className="hero-heading">
            Smart Farming, <br className="hero-heading-break" />
            <span className="hero-heading-accent">Better Future</span>
          </h1>

          <p className="hero-subtitle">
            Your trusted digital companion for smarter crop decisions, weather insights, and agricultural guidance.
          </p>

          <div className="hero-action-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">
              <span>Get Started</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href="#features"
              className="btn btn-outline btn-lg"
              onClick={handleScrollToFeatures}
            >
              <span>Explore Features</span>
            </a>
          </div>

          {/* Visual Highlight Describing Platform Purpose */}
          <div className="hero-highlights-card">
            <div className="highlight-pill">
              <ShieldCheck size={16} className="text-primary" />
              <span>Tailored for Indian Agriculture</span>
            </div>
            <div className="highlight-pill">
              <Smartphone size={16} className="text-primary" />
              <span>Optimized for All Smartphones</span>
            </div>
            <div className="highlight-pill">
              <CheckCircle2 size={16} className="text-primary" />
              <span>Free & Accessible to Every Farmer</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual with Graceful Fallback */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src={imgSrc}
              alt="Lush green agricultural farm fields under bright morning sun"
              className="hero-image"
              onError={handleImageError}
              loading="eager"
            />
            {/* Visual contextual badge */}
            <div className="hero-floating-card">
              <div className="floating-card-icon">
                <Leaf size={20} />
              </div>
              <div className="floating-card-text">
                <span className="floating-card-title">Sustainable Farming</span>
                <span className="floating-card-desc">Actionable Crop Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
