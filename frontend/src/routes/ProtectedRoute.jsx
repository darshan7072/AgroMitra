import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        className="auth-loading-screen"
        role="status"
        aria-live="polite"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          backgroundColor: '#fbf9f4'
        }}
      >
        <Loader2 className="animate-spin text-primary" size={36} color="#15803d" />
        <p style={{ color: '#475569', fontWeight: 600 }}>Verifying farmer credentials...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect unauthenticated user to /login with state to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
