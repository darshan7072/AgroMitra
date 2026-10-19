// In Vite dev, '/api' is proxied to http://localhost:5000/api via vite.config.js
// If VITE_API_BASE_URL is explicitly set, it takes precedence.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Common fetch helper ensuring credentials (cookies) and JSON headers are sent
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  let response;
  try {
    response = await fetch(url, {
      ...options,
      credentials: 'include', // Ensures HttpOnly cookie is attached
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });
  } catch (networkError) {
    const error = new Error(
      'Unable to connect to the AgroMitra server. Please verify the backend is running on port 5000.'
    );
    error.isNetworkError = true;
    error.original = networkError;
    throw error;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.message || `Server request failed with status ${response.status}`
    );
    error.status = response.status;
    error.code = data.code;
    error.data = data;
    throw error;
  }

  return data;
};

/**
 * Register a new farmer account
 */
export const registerUser = async (userData) => {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};

/**
 * Login with email and password
 */
export const loginUser = async (credentials) => {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
};

/**
 * Log out and clear the session cookie
 */
export const logoutUser = async () => {
  return request('/auth/logout', {
    method: 'POST'
  });
};

/**
 * Fetch the authenticated farmer's profile
 */
export const getCurrentUser = async () => {
  return request('/auth/me', {
    method: 'GET'
  });
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
};
