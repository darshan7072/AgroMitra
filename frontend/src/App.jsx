import React from 'react';
import './styles/App.css';

function App() {
  return (
    <div className="app-wrapper">
      <main className="container foundation-banner">
        <div className="foundation-card">
          <div className="badge-tag">
            <span className="badge-indicator"></span>
            Project Foundation Ready
          </div>
          <h1 className="foundation-title">AgroMitra</h1>
          <p className="foundation-subtitle">Smart Krushi Sahayak Platform</p>
          <p className="foundation-desc">
            Full-stack project foundation initialized successfully. Ready for feature modules and responsive layout development.
          </p>
          <div className="status-grid">
            <div className="status-item">
              <div className="status-label">Frontend</div>
              <div className="status-val">React + Vite</div>
            </div>
            <div className="status-item">
              <div className="status-label">Backend API</div>
              <div className="status-val">Node.js + Express</div>
            </div>
            <div className="status-item">
              <div className="status-label">Responsive Layout</div>
              <div className="status-val">Mobile • Tablet • Desktop</div>
            </div>
            <div className="status-item">
              <div className="status-label">Environment</div>
              <div className="status-val">Modular ES Modules</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
