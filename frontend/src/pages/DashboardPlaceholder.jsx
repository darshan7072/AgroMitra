import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  Sprout,
  LogOut,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import '../styles/dashboard.css';

export default function DashboardPlaceholder() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
      navigate('/login', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Recent';

  return (
    <div className="dashboard-layout">
      {/* Top Header */}
      <header className="dashboard-header">
        <div className="container dashboard-header-container">
          <Link to="/" className="dash-brand-link" aria-label="AgroMitra Home">
            <div className="brand-icon-wrapper">
              <Sprout size={22} className="brand-sprout-icon" />
            </div>
            <div>
              <span className="brand-title">AgroMitra</span>
              <span className="brand-subtitle">Krushi Dashboard</span>
            </div>
          </Link>

          <div className="dash-user-actions">
            <span className="dash-greeting-pill">
              <span className="online-indicator"></span>
              {user?.name || 'Farmer'}
            </span>
            <button
              type="button"
              className="btn btn-outline btn-sm dash-logout-btn"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut size={16} />
              <span>{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container dashboard-main">
        {/* Welcome Banner */}
        <div className="dashboard-welcome-card">
          <div className="welcome-badge">
            <ShieldCheck size={16} />
            <span>Authenticated Farmer Portal</span>
          </div>
          <h1 className="welcome-heading">
            Namaste, {user?.name || 'Farmer'}! 🙏
          </h1>
          <p className="welcome-subtitle">
            Your AgroMitra farmer profile is active and securely protected with session cookies.
          </p>

          {/* Quick Farmer Profile Card */}
          <div className="profile-details-grid">
            <div className="profile-detail-item">
              <div className="detail-icon">
                <User size={18} />
              </div>
              <div>
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{user?.name}</span>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="detail-icon">
                <Mail size={18} />
              </div>
              <div>
                <span className="detail-label">Registered Email</span>
                <span className="detail-value">{user?.email}</span>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="detail-icon">
                <Phone size={18} />
              </div>
              <div>
                <span className="detail-label">Mobile Number</span>
                <span className="detail-value">+91 {user?.mobile}</span>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="detail-icon">
                <Calendar size={18} />
              </div>
              <div>
                <span className="detail-label">Member Since</span>
                <span className="detail-value">{memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Roadmap Notice */}
        <div className="dashboard-milestone-card">
          <div className="milestone-header">
            <div className="milestone-icon-wrap">
              <Sparkles size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="milestone-title">Next Feature: Full Krushi Assistant Suite</h2>
              <p className="milestone-desc">
                Secure authentication (Feature 2) is complete. The interactive modules below will be connected in subsequent releases.
              </p>
            </div>
          </div>

          <div className="milestone-modules-grid">
            <div className="milestone-module-box">
              <div className="module-status-chip">Coming Soon</div>
              <h3 className="module-name">🌾 Crop Advisory Engine</h3>
              <p className="module-desc">
                Personalized crop rotation, seasonal recommendations, and harvest scheduling.
              </p>
            </div>

            <div className="milestone-module-box">
              <div className="module-status-chip">Coming Soon</div>
              <h3 className="module-name">🌦️ Localized Weather & Rain Alerts</h3>
              <p className="module-desc">
                Real-time rainfall forecasts and temperature advisories for your farm location.
              </p>
            </div>

            <div className="milestone-module-box">
              <div className="module-status-chip">Coming Soon</div>
              <h3 className="module-name">🧪 Soil Nutrients & Fertilizer Guide</h3>
              <p className="module-desc">
                Soil health recommendations and organic fertilizer dosage calculators.
              </p>
            </div>

            <div className="milestone-module-box">
              <div className="module-status-chip">Coming Soon</div>
              <h3 className="module-name">🏛️ Government Subsidy Portal</h3>
              <p className="module-desc">
                Direct application assistance for PM-Kisan and state agricultural welfare schemes.
              </p>
            </div>
          </div>

          <div className="milestone-footer-bar">
            <Link to="/" className="btn btn-outline">
              <span>View Public Landing Page</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
