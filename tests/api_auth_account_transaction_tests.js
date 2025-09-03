/**
 * Automated API tests for authentication, account, and transaction endpoints.
 * Uses axios for HTTP requests.
 */

import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';
const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
});

let cookies = '';
let authToken = '';

async function getCSRFToken() {
  const response = await client.get('/sanctum/csrf-cookie');
  cookies = response.headers['set-cookie'] || [];
}

async function registerUser(userData) {
  await getCSRFToken();
  const response = await client.post('/api/auth/register', userData, {
    headers: { Cookie: cookies.join('; ') }
  });
  return response.data.data;
}

async function loginUser(email, password) {
  await getCSRFToken();
  const response = await client.post('/api/auth/login', { email, password }, {
    headers: { Cookie: cookies.join('; ') }
  });
  authToken = response.data.data.token;
  return response.data.data;
}

async function logoutUser() {
  const response = await client.post('/api/auth/logout', {}, {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  authToken = '';
  return response.data;
}

async function getCurrentUser() {
  console.log('Sending request with token:', authToken);
  const response = await client.get('/api/auth/user', {
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return response.data;
}

async function getAccounts() {
  const response = await client.get('/api/accounts', {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  return response.data;
}

async function createAccount(accountData) {
  const response = await client.post('/api/accounts', accountData, {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  return response.data;
}

async function getAccount(accountId) {
  const response = await client.get(`/api/accounts/${accountId}`, {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  return response.data;
}

async function updateAccount(accountId, accountData) {
  const response = await client.put(`/api/accounts/${accountId}`, accountData, {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  return response.data;
}

async function deleteAccount(accountId) {
  const response = await client.delete(`/api/accounts/${accountId}`, {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  return response.data;
}

async function getTransactions() {
  const response = await client.get('/api/transactions', {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  return response.data;
}

async function getTransaction(transactionId) {
  const response = await client.get(`/api/transactions/${transactionId}`, {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  return response.data;
}

async function getAccountTransactions(accountId) {
  const response = await client.get(`/api/accounts/${accountId}/transactions`, {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  return response.data;
}

async function transferFunds(transferData) {
  const response = await client.post('/api/transactions/transfer', transferData, {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  return response.data;
}

async function depositFunds(depositData) {
  const response = await client.post('/api/transactions/deposit', depositData, {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  return response.data;
}

async function withdrawFunds(withdrawData) {
  const response = await client.post('/api/transactions/withdraw', withdrawData, {
    headers: { Authorization: `Bearer ${authToken}` },
    withCredentials: true
  });
  return response.data;
}

async function runTests() {
  try {
    console.log('Starting API tests...');

    // Test registration for admin, teller, customer, and new user
    const timestamp = Date.now();
    const users = [
      { name: 'Admin User', email: `admin_${timestamp}@bank.com`, password: 'password123', password_confirmation: 'password123', role: 'admin' },
      { name: 'Teller User', email: `teller_${timestamp}@bank.com`, password: 'password123', password_confirmation: 'password123', role: 'teller' },
      { name: 'Customer User', email: `customer_${timestamp}@bank.com`, password: 'password123', password_confirmation: 'password123', role: 'customer' },
      { name: 'New User', email: `testuser_${timestamp}@example.com`, password: 'password123', password_confirmation: 'password123', role: 'customer' }
    ];

    for (const user of users) {
      console.log(`Registering user: ${user.email}`);
      const regResult = await registerUser(user);
      console.log('Registration result:', regResult);

      console.log(`Logging in user: ${user.email}`);
      const loginResult = await loginUser(user.email, user.password);
      console.log('Login result:', loginResult);

      console.log(`Getting current user for: ${user.email}`);
      const currentUser = await getCurrentUser();
      console.log('Current user:', currentUser);

      console.log(`Listing accounts for: ${user.email}`);
      const accounts = await getAccounts();
      console.log('Accounts:', accounts);

      console.log(`Creating account for: ${user.email}`);
      const newAccount = {
        name: 'Test Account',
        account_type: 'checking',
        balance: 1000
      };
      const createdAccount = await createAccount(newAccount);
      console.log('Created account:', createdAccount);

      console.log(`Logging out user: ${user.email}`);
      const logoutResult = await logoutUser();
      console.log('Logout result:', logoutResult);
    }

    // Additional tests for transaction endpoints can be added here

    console.log('API tests completed successfully.');
  } catch (error) {
    console.error('API test error:', error.response ? error.response.data : error.message);
  }
}

runTests();
