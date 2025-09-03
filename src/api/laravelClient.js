import axios from 'axios';

// Laravel Sanctum compatible axios client
const laravelClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true, // Important for Laravel Sanctum
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
});

// Request interceptor for CSRF token
laravelClient.interceptors.request.use(async (config) => {
  // Get CSRF token from cookie if available
  const csrfToken = getCookie('XSRF-TOKEN');
  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
  }
  
  // Remove Authorization header for SPA cookie-based auth
  if (config.headers.Authorization) {
    delete config.headers.Authorization;
  }
  
  return config;
});

// Response interceptor for token handling
laravelClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear user data and redirect to login
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to get cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Laravel Sanctum authentication setup
export const authAPI = {
  // Get CSRF cookie first
  async getCSRFToken() {
    await laravelClient.get('/sanctum/csrf-cookie');
  },
  
  // Login
  async login(email, password) {
    await this.getCSRFToken();
    const response = await laravelClient.post('/api/auth/login', {
      email,
      password
    });
    
    // No token storage for SPA cookie auth
    localStorage.setItem('user_data', JSON.stringify(response.data.user));
    
    return response.data;
  },
  
  // Register
  async register(userData) {
    await this.getCSRFToken();
    const response = await laravelClient.post('/api/auth/register', userData);
    
    // No token storage for SPA cookie auth
    localStorage.setItem('user_data', JSON.stringify(response.data.user));
    
    return response.data;
  },
  
  // Logout
  async logout() {
    const response = await laravelClient.post('/api/auth/logout');
    localStorage.removeItem('user_data');
    return response.data;
  },
  
  // Get current user
  async getUser() {
    const response = await laravelClient.get('/api/auth/user');
    return response.data;
  }
};

// Banking API endpoints
export const bankingAPI = {
  // Accounts
  async getAccounts() {
    const response = await laravelClient.get('/api/accounts');
    return response.data;
  },
  
  async getAccount(id) {
    const response = await laravelClient.get(`/api/accounts/${id}`);
    return response.data;
  },
  
  // Transactions
  async getTransactions(accountId = null) {
    const url = accountId ? `/api/accounts/${accountId}/transactions` : '/api/transactions';
    const response = await laravelClient.get(url);
    return response.data;
  },
  
  // Transfer
  async transfer(data) {
    const response = await laravelClient.post('/api/transactions/transfer', data);
    return response.data;
  },
  
  // Deposit
  async deposit(data) {
    const response = await laravelClient.post('/api/transactions/deposit', data);
    return response.data;
  },
  
  // Withdraw
  async withdraw(data) {
    const response = await laravelClient.post('/api/transactions/withdraw', data);
    return response.data;
  }
};

export default laravelClient;
