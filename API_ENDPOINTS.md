# Banking System API Endpoints

## Base URL
- **Development**: `http://127.0.0.1:8000`
- **Production**: *Configure in laravelClient.js*

## Authentication Endpoints

### 1. Get CSRF Token
- **Endpoint**: `GET /sanctum/csrf-cookie`
- **Purpose**: Get CSRF token for Laravel Sanctum authentication
- **Headers**: 
  - `Accept: application/json`
  - `X-Requested-With: XMLHttpRequest`
- **Response**: Sets CSRF cookie

### 2. User Login
- **Endpoint**: `POST /api/auth/login`
- **Purpose**: Authenticate user and get access token
- **Headers**:
  - `Content-Type: application/json`
  - `X-XSRF-TOKEN: {csrf_token}` (from cookie)
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "laravel_sanctum_token",
    "user": {
      "id": 1,
      "name": "User Name",
      "email": "user@example.com",
      "role": "customer|teller|admin"
    }
  }
  ```

### 3. User Registration
- **Endpoint**: `POST /api/auth/register`
- **Purpose**: Create new user account
- **Headers**:
  - `Content-Type: application/json`
  - `X-XSRF-TOKEN: {csrf_token}`
- **Request Body**:
  ```json
  {
    "name": "Full Name",
    "email": "user@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }
  ```
- **Response**: Same as login response

### 4. User Logout
- **Endpoint**: `POST /api/auth/logout`
- **Purpose**: Invalidate user session
- **Headers**:
  - `Authorization: Bearer {token}`
  - `X-XSRF-TOKEN: {csrf_token}`
- **Response**: Success message

### 5. Get Current User
- **Endpoint**: `GET /api/user`
- **Purpose**: Get authenticated user details
- **Headers**:
  - `Authorization: Bearer {token}`
- **Response**: User object

## Account Management Endpoints

### 6. Get All Accounts
- **Endpoint**: `GET /api/accounts`
- **Purpose**: Get list of user accounts
- **Headers**:
  - `Authorization: Bearer {token}`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "account_number": "1234567890",
      "type": "checking|savings",
      "balance": 1000.50,
      "currency": "USD",
      "status": "active"
    }
  ]
  ```

### 7. Get Single Account
- **Endpoint**: `GET /api/accounts/{id}`
- **Purpose**: Get specific account details
- **Headers**:
  - `Authorization: Bearer {token}`
- **Response**: Single account object

## Transaction Endpoints

### 8. Get All Transactions
- **Endpoint**: `GET /api/transactions`
- **Purpose**: Get all user transactions
- **Headers**:
  - `Authorization: Bearer {token}`
- **Response**: Array of transaction objects

### 9. Get Account Transactions
- **Endpoint**: `GET /api/accounts/{accountId}/transactions`
- **Purpose**: Get transactions for specific account
- **Headers**:
  - `Authorization: Bearer {token}`
- **Response**: Array of transaction objects

### 10. Transfer Funds
- **Endpoint**: `POST /api/transactions/transfer`
- **Purpose**: Transfer money between accounts
- **Headers**:
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "from_account_id": 1,
    "to_account_id": 2,
    "amount": 100.00,
    "description": "Transfer description"
  }
  ```
- **Response**: Transaction details

### 11. Deposit Funds
- **Endpoint**: `POST /api/transactions/deposit`
- **Purpose**: Deposit money into account
- **Headers**:
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "account_id": 1,
    "amount": 100.00,
    "description": "Deposit description"
  }
  ```
- **Response**: Transaction details

### 12. Withdraw Funds
- **Endpoint**: `POST /api/transactions/withdraw`
- **Purpose**: Withdraw money from account
- **Headers**:
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "account_id": 1,
    "amount": 100.00,
    "description": "Withdrawal description"
  }
  ```
- **Response**: Transaction details

## Admin Endpoints (Role-based access)

### 13. Get All Users (Admin)
- **Endpoint**: `GET /api/admin/users`
- **Purpose**: Get all system users (admin only)
- **Headers**:
  - `Authorization: Bearer {token}`
- **Response**: Array of user objects

### 14. Get System Reports (Admin/Teller)
- **Endpoint**: `GET /api/admin/reports`
- **Purpose**: Get system reports and analytics
- **Headers**:
  - `Authorization: Bearer {token}`
- **Response**: Report data

## Headers Reference

### Common Headers
- `Accept: application/json` - Expect JSON response
- `Content-Type: application/json` - Send JSON data
- `X-Requested-With: XMLHttpRequest` - Identify as AJAX request

### Authentication Headers
- `X-XSRF-TOKEN: {token}` - CSRF protection (from cookie)
- `Authorization: Bearer {jwt_token}` - JWT authentication

## Error Responses

### Common Error Format
```json
{
  "message": "Error description",
  "errors": {
    "field": ["Error message"]
  }
}
```

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

## Testing with Postman

### Setup:
1. Set base URL to `http://127.0.0.1:8000`
2. Enable cookies in Postman settings
3. First call `/sanctum/csrf-cookie` to get CSRF token
4. Include `X-XSRF-TOKEN` header with token from cookie

### Authentication Flow:
1. GET `/sanctum/csrf-cookie` (gets CSRF token cookie)
2. POST `/api/auth/login` with credentials
3. Use returned token in `Authorization: Bearer {token}` header
4. Make authenticated requests

### Example Login Request:
```http
POST /api/auth/login
Content-Type: application/json
X-XSRF-TOKEN: your_csrf_token_here

{
  "email": "admin@bank.com",
  "password": "password123"
}
```

## Notes
- Backend must be running on port 8000 for development
- CORS must be configured to allow frontend requests
- Laravel Sanctum package required for authentication
- Database must be properly seeded with test data
