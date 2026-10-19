import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  registerUser as apiRegister,
  loginUser as apiLogin,
  logoutUser as apiLogout,
  getCurrentUser as apiGetMe
} from '../services/auth.service.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check auth status on initial load by contacting /api/auth/me
  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiGetMe();
      if (data && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      // 401 just means guest / not logged in
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Login handler
  const login = async (email, password) => {
    setError(null);
    try {
      const data = await apiLogin({ email, password });
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  // Register handler
  const register = async (formData) => {
    setError(null);
    try {
      const data = await apiRegister(formData);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn('Logout request warning:', err.message);
    } finally {
      setUser(null);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuthStatus,
    clearError,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
