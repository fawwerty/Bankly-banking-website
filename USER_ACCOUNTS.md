# Banking System User Accounts

## System Overview

This banking frontend application has multiple authentication systems with various user accounts stored in different locations.

## Available Login Credentials

### Mock Users (Hardcoded in AuthContext.jsx)

| Email | Password | Role | Name | Permissions |
|-------|----------|------|------|-------------|
| `admin@bank.com` | *any password* | Admin | Admin User | Full system access |
| `teller@bank.com` | *any password* | Teller | Teller User | Accounts, Transactions |
| `customer@bank.com` | *any password* | Customer | Customer User | Own accounts, Own transactions |
| *any other email* | *any password* | Customer | Demo Customer | Own accounts, Own transactions |

**Note**: The mock authentication system accepts any password for these email addresses.

### Enhanced Authentication System
The enhanced system connects to a Laravel backend (http://127.0.0.1:8000) and requires actual user registration. No predefined credentials available.

## Storage Locations

### LocalStorage Keys
The system stores user data in multiple localStorage locations:

1. **Basic Auth System**:
   - `token` - Authentication token
   - `user` - User account data (JSON)

2. **Enhanced Auth System**:
   - `auth_token` - Authentication token  
   - `user_data` - User account data (JSON)

3. **Laravel Integration**:
   - `laravel_token` - Laravel Sanctum token
   - `user` - User account data (JSON)

4. **Theme Preferences**:
   - `darkMode` - UI theme setting

### Cookies
- `XSRF-TOKEN` - CSRF protection token for Laravel backend

## User Roles and Permissions

### Admin
- Full system access
- User management capabilities
- System settings access
- Audit log viewing

### Teller  
- Account management
- Transaction processing
- Customer service functions
- Limited system access

### Customer
- View own accounts
- Perform transactions on own accounts
- Basic banking operations
- No administrative privileges

## Authentication Systems

### 1. Mock Authentication (AuthContext.jsx)
- For development/testing
- Accepts any password with predefined emails
- Stores data in localStorage
- No backend connection required

### 2. Enhanced Authentication (EnhancedAuthContext.jsx)  
- Connects to Laravel backend
- Requires actual user registration
- Uses Laravel Sanctum for authentication
- More secure token-based system

### 3. Laravel Integration (laravelClient.js)
- Direct backend API integration
- Uses CSRF token protection
- Proper session management
- Production-ready authentication

## Security Notes

1. **Mock users should not be used in production**
2. **Multiple authentication systems may cause conflicts**
3. **User data is stored in browser localStorage (vulnerable to XSS)**
4. **Consider implementing more secure storage mechanisms**
5. **Regularly audit stored authentication tokens**

## Testing Recommendations

1. Use mock users for quick testing during development
2. Test enhanced authentication with actual backend for production scenarios
3. Verify role-based access controls work correctly
4. Test token expiration and session management
5. Check for proper logout functionality across all systems

## Backend Requirements

For the enhanced authentication to work, ensure:
- Laravel backend is running on http://127.0.0.1:8000
- Sanctum package is installed and configured
- CORS settings allow frontend connections
- Database has user accounts for testing

## Quick Start

1. **For quick testing**: Use any of the mock email addresses with any password
2. **For backend testing**: Register real users through the registration form
3. **Admin access**: Use `admin@bank.com` with any password for full access

---

*This document was generated based on code analysis of the banking frontend application.*
