# TODO - Frontend to Backend Integration Testing

## Authentication
- [ ] Test user registration via frontend form (POST /api/auth/register)
- [ ] Test user login with valid credentials (POST /api/auth/login)
- [ ] Test login failure with invalid credentials
- [ ] Test logout functionality (POST /api/auth/logout)
- [ ] Verify user data retrieval after login (GET /api/auth/user)

## Account Management
- [ ] Test fetching user accounts (GET /api/accounts)
- [ ] Test creating new account (POST /api/accounts)
- [ ] Test fetching specific account (GET /api/accounts/{id})
- [ ] Test updating account (PUT /api/accounts/{id})
- [ ] Test deleting account (DELETE /api/accounts/{id})

## Transactions
- [ ] Test fetching all transactions (GET /api/transactions)
- [ ] Test fetching transactions for specific account (GET /api/accounts/{id}/transactions)
- [ ] Test deposit transaction (POST /api/transactions/deposit)
- [ ] Test withdrawal transaction (POST /api/transactions/withdraw)
- [ ] Test transfer transaction (POST /api/transactions/transfer)

## General
- [ ] Verify error handling and messages on frontend
- [ ] Verify token storage and usage in localStorage
- [ ] Verify CSRF token handling and headers
- [ ] Verify role-based redirects after login (admin, teller, customer)
- [ ] Check console and network logs for errors during API calls

## Notes
- Backend must be running at http://127.0.0.1:8000
- Ensure CORS and Sanctum are properly configured on backend
- Use mock users for quick testing or register real users
