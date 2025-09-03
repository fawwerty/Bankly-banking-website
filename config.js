// Frontend configuration for Laravel backend
// Updated to use environment variables for flexibility

// Use environment variables with fallbacks
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  API_PREFIX: API_PREFIX,
  SANCTUM_PREFIX: '/sanctum',
  
  // Laravel Sanctum endpoints
  CSRF_COOKIE: `${API_BASE_URL}/sanctum/csrf-cookie`,
  LOGIN: `${API_BASE_URL}${API_PREFIX}/auth/login`,
  REGISTER: `${API_BASE_URL}${API_PREFIX}/auth/register`,
  LOGOUT: `${API_BASE_URL}${API_PREFIX}/auth/logout`,
  USER: `${API_BASE_URL}${API_PREFIX}/user`,
  
  // Banking endpoints
  ACCOUNTS: `${API_BASE_URL}${API_PREFIX}/accounts`,
  TRANSACTIONS: `${API_BASE_URL}${API_PREFIX}/transactions`,
  TRANSFER: `${API_BASE_URL}${API_PREFIX}/transactions/transfer`,
  DEPOSIT: `${API_BASE_URL}${API_PREFIX}/transactions/deposit`,
  WITHDRAW: `${API_BASE_URL}${API_PREFIX}/transactions/withdraw`,
};

// Headers configuration for Laravel
export const API_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

// App configuration
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Banking System',
  version: '1.0.0',
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
  port: 5173,
};

// Feature flags
export const FEATURE_FLAGS = {
  analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  debug: import.meta.env.VITE_ENABLE_DEBUG !== 'false',
  securityHeaders: import.meta.env.VITE_ENABLE_SECURITY_HEADERS !== 'false',
  rateLimiting: import.meta.env.VITE_ENABLE_RATE_LIMITING !== 'false',
  bundleAnalyzer: import.meta.env.VITE_ENABLE_BUNDLE_ANALYZER === 'true',
  serviceWorker: import.meta.env.VITE_ENABLE_SERVICE_WORKER === 'true',
};
