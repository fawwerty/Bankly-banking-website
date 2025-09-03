// Transaction validation utilities
export const validateTransaction = {
  // Validate amount
  amount: (amount, minAmount = 0.01, maxAmount = 1000000) => {
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount)) {
      return { valid: false, error: 'Amount must be a valid number' };
    }
    
    if (numAmount <= 0) {
      return { valid: false, error: 'Amount must be greater than zero' };
    }
    
    if (numAmount < minAmount) {
      return { valid: false, error: `Amount must be at least GHS ${minAmount}` };
    }
    
    if (numAmount > maxAmount) {
      return { valid: false, error: `Amount cannot exceed GHS ${maxAmount}` };
    }
    
    return { valid: true };
  },

  // Validate account
  account: (account) => {
    if (!account) {
      return { valid: false, error: 'Account is required' };
    }
    
    if (!account.id) {
      return { valid: false, error: 'Invalid account' };
    }
    
    if (account.status !== 'active') {
      return { valid: false, error: 'Account is not active' };
    }
    
    return { valid: true };
  },

  // Validate sufficient funds
  sufficientFunds: (amount, balance) => {
    if (parseFloat(amount) > parseFloat(balance)) {
      return { valid: false, error: 'Insufficient funds' };
    }
    
    return { valid: true };
  },

  // Validate transfer
  transfer: (fromAccount, toAccount, amount) => {
    // Check if accounts are the same
    if (fromAccount.id === toAccount.id) {
      return { valid: false, error: 'Cannot transfer to the same account' };
    }
    
    // Check if accounts are active
    const fromValidation = validateTransaction.account(fromAccount);
    if (!fromValidation.valid) return fromValidation;
    
    const toValidation = validateTransaction.account(toAccount);
    if (!toValidation.valid) return toValidation;
    
    // Check sufficient funds
    const fundsValidation = validateTransaction.sufficientFunds(amount, fromAccount.balance);
    if (!fundsValidation.valid) return fundsValidation;
    
    return { valid: true };
  },

  // Validate deposit
  deposit: (account, amount) => {
    const accountValidation = validateTransaction.account(account);
    if (!accountValidation.valid) return accountValidation;
    
    const amountValidation = validateTransaction.amount(amount);
    if (!amountValidation.valid) return amountValidation;
    
    return { valid: true };
  },

  // Validate withdrawal
  withdrawal: (account, amount) => {
    const accountValidation = validateTransaction.account(account);
    if (!accountValidation.valid) return accountValidation;
    
    const amountValidation = validateTransaction.amount(amount);
    if (!amountValidation.valid) return amountValidation;
    
    const fundsValidation = validateTransaction.sufficientFunds(amount, account.balance);
    if (!fundsValidation.valid) return fundsValidation;
    
    return { valid: true };
  },

  // Daily limit validation
  dailyLimit: (amount, dailyTotal, limit = 10000) => {
    const newTotal = parseFloat(dailyTotal) + parseFloat(amount);
    
    if (newTotal > limit) {
      return { 
        valid: false, 
        error: `Daily limit exceeded. You can only transfer GHS ${limit - dailyTotal} more today` 
      };
    }
    
    return { valid: true };
  }
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS'
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Generate transaction reference
export const generateTransactionRef = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `TXN-${timestamp}-${random}`.toUpperCase();
};
