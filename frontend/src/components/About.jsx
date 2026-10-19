import React from 'react';
import { Target, Users, BookOpen, Layers } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Text Narrative */}
          <div className="about-narrative">
            <span className="section-eyebrow">Our Mission</span>
            <h2 className="section-title">Bridging the Information Gap for Indian Farmers</h2>
            <p className="about-paragraph">
              Farming is the backbone of our nation, yet critical agricultural guidance is often fragmented across multiple sources, hard to read, or unavailable in time.
            </p>
            <p className="about-paragraph">
              <strong>AgroMitra — Smart Krushi Sahayak Platform</strong> is created to bring essential agronomy insights, local weather observations, soil management practices, and government welfare schemes together in one accessible digital platform.
            </p>
            <p className="about-paragraph">
              Whether you farm a single acre or multiple hectares, our goal is to deliver clear, straightforward information straight to your smartphone without confusion or jargon.
            </p>

            <div className="about-commitments-list">
              <div className="commitment-item">
                <div className="commitment-icon-wrap">
                  <BookOpen size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="commitment-title">Single Source of Agricultural Truth</h4>
                  <p className="commitment-desc">
                    Consolidated guidance so you spend less time searching and more time nurturing your harvest.
                  </p>
                </div>
              </div>

              <div className="commitment-item">
                <div className="commitment-icon-wrap">
                  <Users size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="commitment-title">Designed with Farmers in Mind</h4>
                  <p className="commitment-desc">
                    High contrast, legible typography, and intuitive navigation that works seamlessly on any mobile screen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Pillar Cards */}
          <div className="about-cards-column">
            <div className="about-card highlight-card">
              <div className="about-card-icon">
                <Target size={28} />
              </div>
              <h3 className="about-card-title">Simple & Transparent</h3>
              <p className="about-card-desc">
                No complex technical terms or overwhelming charts. Every recommendation is presented in clear, practical steps you can implement on the field.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card-icon">
                <Layers size={28} />
              </div>
              <h3 className="about-card-title">All-in-One Digital Hub</h3>
              <p className="about-card-desc">
                From pre-sowing decisions and soil preparation to harvest weather tracking and subsidy eligibility, everything is unified under one roof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
