import React from 'react';
import { Sprout, CloudSun, FlaskConical, Landmark, ArrowUpRight } from 'lucide-react';

const FEATURE_LIST = [
  {
    id: 'crop-recommendations',
    icon: Sprout,
    title: 'Crop Recommendations',
    tag: 'Agronomy',
    description:
      'Data-backed crop suggestions matched to your region, soil type, and growing season to help plan your sowing cycles effectively.'
  },
  {
    id: 'weather-updates',
    icon: CloudSun,
    title: 'Weather Updates',
    tag: 'Forecasts',
    description:
      'Clear, localized weather observations covering temperature and precipitation to help you schedule irrigation and harvest windows.'
  },
  {
    id: 'soil-fertilizer',
    icon: FlaskConical,
    title: 'Soil and Fertilizer Guidance',
    tag: 'Soil Health',
    description:
      'Practical recommendations on soil enrichment, balanced NPK nutrients, organic compost, and crop rotation for healthier fields.'
  },
  {
    id: 'gov-schemes',
    icon: Landmark,
    title: 'Government Agriculture Schemes',
    tag: 'Welfare',
    description:
      'Essential summaries, eligibility criteria, and official links for central and state farmer subsidy programs and initiatives.'
  }
];

export default function Features({ onCardClick }) {
  return (
    <section id="features" className="features-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-eyebrow">Platform Capabilities</span>
          <h2 className="section-title">Designed for Modern Agriculture</h2>
          <p className="section-subtitle">
            AgroMitra organizes essential farming resources into clear, easy-to-use digital modules.
          </p>
        </div>

        {/* Features Responsive Grid */}
        <div className="features-grid">
          {FEATURE_LIST.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.id} className="feature-card">
                <div className="feature-card-top">
                  <div className="feature-icon-wrapper">
                    <Icon size={24} className="feature-icon" />
                  </div>
                  <span className="feature-tag">{feat.tag}</span>
                </div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-description">{feat.description}</p>
                <div className="feature-card-footer">
                  <button
                    type="button"
                    className="feature-learn-more"
                    onClick={() => onCardClick(feat.title)}
                  >
                    <span>Module Overview</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
