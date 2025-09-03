# Banking System Testing Guide

## 🧪 Testing Checklist

### 1. Component Testing

#### A. Authentication Flow
```bash
# Test login functionality
npm run dev
# Navigate to http://localhost:5173/login
# Test with valid credentials
# Test with invalid credentials
# Test password reset flow
```

#### B. Transaction Components
```bash
# Test deposit functionality
# Navigate to http://localhost:5173/deposit
# Test positive amounts
# Test negative amounts (should fail)
# Test zero amounts (should fail)

# Test withdrawal functionality
# Navigate to http://localhost:5173/withdraw
# Test with sufficient funds
# Test with insufficient funds (should fail)

# Test transfer functionality
# Navigate to http://localhost:5173/transfer
# Test internal transfers
# Test external transfers
# Test with insufficient funds
```

#### C. Responsive Design Testing
```bash
# Test on different screen sizes
# Mobile: 375px width
# Tablet: 768px width
# Desktop: 1440px width

# Use browser dev tools responsive mode
```

### 2. API Testing Commands

#### A. Authentication Endpoints
```bash
# Test login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test registration
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password","password_confirmation":"password"}'
```

#### B. Transaction Endpoints
```bash
# Test deposit
curl -X POST http://localhost:8000/api/transactions/deposit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"accountId":1,"amount":100.00}'

# Test withdrawal
curl -X POST http://localhost:8000/api/transactions/withdraw \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"accountId":1,"amount":50.00}'

# Test transfer
curl -X POST http://localhost:8000/api/transactions/transfer \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"fromAccountId":1,"toAccountId":2,"amount":25.00}'
```

### 3. Manual Testing Steps

#### A. Login Flow
1. Navigate to http://localhost:5173/login
2. Enter valid credentials
3. Verify successful redirect to dashboard
4. Test logout functionality

#### B. Dashboard Testing
1. Verify account balances display correctly
2. Test transaction history loading
3. Test filtering and sorting
4. Verify responsive design on mobile

#### C. Transaction Testing
1. **Deposit Testing**
   - Navigate to /deposit
   - Enter amount: 100.00
   - Verify balance updates
   - Check transaction appears in history

2. **Withdrawal Testing**
   - Navigate to /withdraw
   - Enter amount: 50.00
   - Verify balance decreases
   - Test insufficient funds error

3. **Transfer Testing**
   - Navigate to /transfer
   - Select from and to accounts
   - Enter amount: 25.00
   - Verify both balances update
   - Check transaction records

#### D. Responsive Design Testing
1. **Mobile Testing (375px)**
   - Test all buttons are touch-friendly
   - Verify text is readable
   - Test horizontal scrolling if needed

2. **Tablet Testing (768px)**
   - Test grid layouts adjust correctly
   - Verify navigation is accessible

3. **Desktop Testing (1440px)**
   - Test full-width layouts
   - Verify hover states work

### 4. Automated Testing Setup

#### A. Install Testing Dependencies
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

#### B. Create Test Files
```bash
# Create test directory
mkdir -p src/__tests__

# Create component tests
touch src/__tests__/Login.test.jsx
touch src/__tests__/Dashboard.test.jsx
touch src/__tests__/Transactions.test.jsx
```

#### C. Run Tests
```bash
# Run all tests
npm test

# Run specific test
npm test Login.test.jsx

# Run tests in watch mode
npm test -- --watch
```

### 5. Performance Testing

#### A. Lighthouse Testing
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run performance test
lighthouse http://localhost:5173 --output=json --output-path=./lighthouse-report.json
```

#### B. Bundle Analysis
```bash
# Build and analyze bundle
npm run build
npm run analyze
```

### 6. Security Testing

#### A. Security Headers Check
```bash
# Test security headers
curl -I http://localhost:5173
# Verify headers: X-Frame-Options, X-Content-Type-Options, etc.
```

#### B. Input Validation Testing
```bash
# Test XSS protection
# Try entering: <script>alert('XSS')</script> in forms
# Verify it's sanitized

# Test SQL injection
# Try entering: ' OR '1'='1 in login forms
# Verify it's rejected
```

### 7. Accessibility Testing

#### A. Keyboard Navigation
1. Test all interactive elements with Tab key
2. Verify focus indicators are visible
3. Test Enter and Space key functionality

#### B. Screen Reader Testing
1. Enable screen reader
2. Test all form labels
3. Verify alt text for images
4. Test ARIA attributes

### 8. Cross-Browser Testing

#### A. Browser Testing Checklist
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 9. Error Handling Testing

#### A. Network Error Testing
1. Disconnect internet and test offline behavior
2. Test 404 pages
3. Test 500 error pages
4. Test timeout scenarios

#### B. Form Validation Testing
1. Test required field validation
2. Test email format validation
3. Test password strength validation
4. Test numeric input validation

### 10. Quick Test Commands

```bash
# Start development server
npm run dev

# Run all tests
npm test

# Check for console errors
npm run dev -- --verbose

# Check accessibility
npm run audit
```

## 🎯 Testing Results Summary

After running all tests, you should see:
- ✅ All components render without errors
- ✅ All API endpoints respond correctly
- ✅ All forms validate properly
- ✅ All responsive breakpoints work correctly
- ✅ All accessibility requirements are met
- ✅ All security measures are in place
- ✅ All performance metrics are acceptable

## 🚨 Common Issues to Check

1. **Console Errors**: Check browser console for any errors
2. **Network Requests**: Verify all API calls succeed
3. **Responsive Design**: Test on actual devices, not just browser dev tools
4. **Performance**: Check Lighthouse scores are above 90
5. **Security**: Verify all security headers are present
6. **Accessibility**: Ensure keyboard navigation works throughout

## 📊 Testing Checklist

- [ ] Login/Register flow works correctly
- [ ] Dashboard displays all data properly
- [ ] Transactions work (deposit, withdraw, transfer)
- [ ] Responsive design works on all screen sizes
- [ ] All API endpoints respond correctly
- [ ] Error handling works appropriately
- [ ] Accessibility requirements are met
- [ ] Performance metrics are acceptable
- [ ] Security measures are in place
- [ ] Cross-browser compatibility is verified
