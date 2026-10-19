import React, { useEffect } from 'react';
import { X, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * Modal to clearly notify farmers and evaluators that Authentication
 * (Registration/Login) is scheduled for the upcoming feature update.
 */
export default function AuthNoticeModal({ isOpen, onClose, mode = 'login' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isRegister = mode === 'register';

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-icon-badge">
            <Sparkles size={24} className="text-primary" />
          </div>
          <span className="modal-tag">Platform Roadmap Notice</span>
          <h2 id="modal-title" className="modal-title">
            {isRegister ? 'Farmer Registration' : 'Farmer Portal Login'}
          </h2>
          <p className="modal-subtitle">
            Authentication is currently in progress and will be available in the next feature milestone.
          </p>
        </div>

        <div className="modal-body">
          <div className="modal-info-box">
            <div className="info-box-title">
              <CheckCircle2 size={18} className="text-success" />
              What will be included in the next update:
            </div>
            <ul className="info-box-list">
              <li>Secure mobile & email registration for Indian farmers</li>
              <li>Personalized farm profiles (soil type, land area, regional location)</li>
              <li>Encrypted authentication & protected farmer dashboard</li>
              <li>Saved advisories and customized crop alerts</li>
            </ul>
          </div>
          <p className="modal-note">
            In compliance with our phased roadmap, please explore the landing page features and sections below.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={onClose}
          >
            Understood, Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
}
