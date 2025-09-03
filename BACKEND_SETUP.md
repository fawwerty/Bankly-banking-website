# Laravel Backend Connection Guide

## ✅ Frontend Successfully Configured for Laravel Backend

Your banking frontend is now configured to connect with your Laravel backend running on `http://127.0.0.1:8000`.

## 🔗 Connection Details

### Backend Configuration (Laravel)
- **URL**: `http://127.0.0.1:8000`
- **Authentication**: Laravel Sanctum
- **Database**: SQLite (`database/database.sqlite`)

### Frontend Configuration
- **URL**: `http://localhost:8000` (Vite dev server)
- **API Client**: Laravel Sanctum compatible
- **CSRF Protection**: Enabled

## 🚀 Quick Start

### 1. Start Laravel Backend
```bash
# In your Laravel backend directory
php artisan serve --host=127.0.0.1 --port=8000
```

### 2. Start Frontend
```bash
# In your banking-frontend directory
npm run dev
```

### 3. Access Application
- Frontend: http://localhost:8000
- Backend API: http://127.0.0.1:8000/api

## 🔧 Laravel Backend Setup

### Required Laravel Packages
```bash
# Install Laravel Sanctum
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Environment Configuration (.env)
Your Laravel `.env` file is already configured correctly:
- Sanctum stateful domains include localhost
- SQLite database configured
- CORS settings ready

### Database Setup
```bash
# Create database file
touch database/database.sqlite

# Run migrations
php artisan migrate

# Seed database (optional)
php artisan db:seed
```

### API Routes Setup
Create these routes in your Laravel `routes/api.php`:

```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Sanctum CSRF cookie
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});

// Authentication routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'current']);
    Route::apiResource('accounts', AccountController::class);
    Route::apiResource('transactions', TransactionController::class);
    Route::post('/transactions/transfer', [TransactionController::class, 'transfer']);
    Route::post('/transactions/deposit', [TransactionController::class, 'deposit']);
    Route::post('/transactions/withdraw', [TransactionController::class, 'withdraw']);
});
```

### CORS Configuration
Ensure your Laravel CORS is configured for the frontend:

```php
// config/cors.php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:8000', 'http://127.0.0.1:8000'],
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
```

## 📱 Frontend API Usage

### Authentication
```javascript
import { authAPI } from './src/api/laravelClient';

// Login
const user = await authAPI.login('user@example.com', 'password');

// Register
const newUser = await authAPI.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secret',
  password_confirmation: 'secret'
});

// Logout
await authAPI.logout();
```

### Banking Operations
```javascript
import { bankingAPI } from './src/api/laravelClient';

// Get accounts
const accounts = await bankingAPI.getAccounts();

// Get transactions
const transactions = await bankingAPI.getTransactions(accountId);

// Transfer money
await bankingAPI.transfer({
  from_account_id: 1,
  to_account_id: 2,
  amount: 100.00,
  description: 'Rent payment'
});
```

## ✅ Verification Steps

1. **Backend Running**: Check `http://127.0.0.1:8000/api/health`
2. **Frontend Connected**: Check browser console for API calls
3. **Authentication**: Test login/register functionality
4. **Database**: Verify data is being saved to `database/database.sqlite`

## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**: Ensure Laravel CORS is properly configured
2. **CSRF Token**: The frontend automatically handles CSRF tokens
3. **Database**: Make sure `database/database.sqlite` exists and is writable
4. **Port Conflict**: Change ports in configuration if needed

### Debug Commands
```bash
# Check Laravel routes
php artisan route:list

# Test database connection
php artisan tinker
>>> DB::connection()->getPdo()
```

Your frontend is now fully configured to work with your Laravel backend!
