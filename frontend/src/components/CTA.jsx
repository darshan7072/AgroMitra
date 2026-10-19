import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <div className="cta-content">
            <div className="cta-badge">
              <Sparkles size={16} />
              <span>Join AgroMitra</span>
            </div>
            <h2 className="cta-heading">Ready to Transform Your Farming Journey?</h2>
            <p className="cta-subtitle">
              Join Indian farmers discovering smarter agricultural practices, reliable weather guidance, and government scheme opportunities.
            </p>

            <div className="cta-features-inline">
              <span className="inline-check">
                <CheckCircle2 size={16} /> 100% Free Platform
              </span>
              <span className="inline-check">
                <CheckCircle2 size={16} /> Mobile-Friendly
              </span>
              <span className="inline-check">
                <CheckCircle2 size={16} /> Instant Account Registration
              </span>
            </div>

            <div className="cta-button-wrapper">
              <Link to="/register" className="btn btn-cta-light btn-lg">
                <span>Get Started with AgroMitra</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
