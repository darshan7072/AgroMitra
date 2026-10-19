import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Sprout, Eye, EyeOff, LogIn, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import '../styles/auth.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Destination after login
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email.trim() || !formData.password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      await login(formData.email.trim(), formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        {/* Top Header & Home Navigation */}
        <div className="auth-top-nav">
          <Link to="/" className="back-home-link" aria-label="Return to AgroMitra homepage">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Card */}
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo-badge" aria-label="AgroMitra">
              <Sprout size={28} className="auth-sprout-icon" />
            </Link>
            <span className="auth-badge-label">Farmer Portal Login</span>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to manage your crops, check weather advisories, and access your protected farmer dashboard.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="auth-alert auth-alert-danger" role="alert">
              <AlertCircle size={18} className="alert-icon" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required-star">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                required
                className="form-input"
                placeholder="e.g. farmer.ramesh@gmail.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password" className="form-label">
                  Password <span className="required-star">*</span>
                </label>
              </div>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  className="form-input password-input"
                  placeholder="Enter your account password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg auth-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Log In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Switch to Registration */}
          <div className="auth-footer-prompt">
            <p>
              New to AgroMitra?{' '}
              <Link to="/register" className="auth-switch-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Security / Help Note */}
        <div className="auth-trust-note">
          <span>🔒 Protected by secure HttpOnly authentication</span>
        </div>
      </div>
    </div>
  );
}
