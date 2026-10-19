const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Basic API client helper for AgroMitra
 */
export const checkHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error(`API health check failed with status: ${response.status}`);
  }
  return response.json();
};

export default {
  checkHealth
};
