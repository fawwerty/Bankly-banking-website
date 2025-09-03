// Transaction categorization utilities
export const transactionCategories = {
  INCOME: {
    SALARY: 'Salary',
    BONUS: 'Bonus',
    INTEREST: 'Interest',
    DIVIDEND: 'Dividend',
    REFUND: 'Refund',
    GIFT: 'Gift',
    OTHER_INCOME: 'Other Income'
  },
  
  EXPENSES: {
    UTILITIES: 'Utilities',
    GROCERIES: 'Groceries',
    TRANSPORT: 'Transport',
    DINING: 'Dining',
    ENTERTAINMENT: 'Entertainment',
    SHOPPING: 'Shopping',
    HEALTHCARE: 'Healthcare',
    EDUCATION: 'Education',
    TRAVEL: 'Travel',
    RENT: 'Rent',
    INSURANCE: 'Insurance',
    SUBSCRIPTION: 'Subscription',
    OTHER_EXPENSE: 'Other Expense'
  },
  
  TRANSFER: {
    INTERNAL: 'Internal Transfer',
    EXTERNAL: 'External Transfer',
    INVESTMENT: 'Investment Transfer'
  }
};

// Auto-categorize transaction based on description
export const autoCategorize = (description, amount) => {
  const desc = description.toLowerCase();
  
  // Income categories
  if (desc.includes('salary') || desc.includes('payroll')) {
    return transactionCategories.INCOME.SALARY;
  }
  if (desc.includes('bonus') || desc.includes('commission')) {
    return transactionCategories.INCOME.BONUS;
  }
  if (desc.includes('interest') || desc.includes('dividend')) {
    return transactionCategories.INCOME.INTEREST;
  }
  if (desc.includes('refund') || desc.includes('return')) {
    return transactionCategories.INCOME.REFUND;
  }
  
  // Expense categories
  if (desc.includes('grocery') || desc.includes('supermarket')) {
    return transactionCategories.EXPENSES.GROCERIES;
  }
  if (desc.includes('restaurant') || desc.includes('food') || desc.includes('dining')) {
    return transactionCategories.EXPENSES.DINING;
  }
  if (desc.includes('uber') || desc.includes('taxi') || desc.includes('transport')) {
    return transactionCategories.EXPENSES.TRANSPORT;
  }
  if (desc.includes('electric') || desc.includes('water') || desc.includes('gas') || desc.includes('utility')) {
    return transactionCategories.EXPENSES.UTILITIES;
  }
  if (desc.includes('netflix') || desc.includes('spotify') || desc.includes('subscription')) {
    return transactionCategories.EXPENSES.SUBSCRIPTION;
  }
  if (desc.includes('rent') || desc.includes('lease')) {
    return transactionCategories.EXPENSES.RENT;
  }
  if (desc.includes('insurance')) {
    return transactionCategories.EXPENSES.INSURANCE;
  }
  if (desc.includes('health') || desc.includes('medical') || desc.includes('doctor')) {
    return transactionCategories.EXPENSES.HEALTHCARE;
  }
  if (desc.includes('travel') || desc.includes('flight') || desc.includes('hotel')) {
    return transactionCategories.EXPENSES.TRAVEL;
  }
  if (desc.includes('shopping') || desc.includes('amazon') || desc.includes('store')) {
    return transactionCategories.EXPENSES.SHOPPING;
  }
  
  // Default categorization based on amount
  if (amount > 0) {
    return transactionCategories.INCOME.OTHER_INCOME;
  } else {
    return transactionCategories.EXPENSES.OTHER_EXPENSE;
  }
};

// Get category color
export const getCategoryColor = (category) => {
  const colors = {
    [transactionCategories.INCOME.SALARY]: '#4CAF50',
    [transactionCategories.INCOME.BONUS]: '#8BC34A',
    [transactionCategories.INCOME.INTEREST]: '#CDDC39',
    [transactionCategories.EXPENSES.GROCERIES]: '#FF9800',
    [transactionCategories.EXPENSES.DINING]: '#FF5722',
    [transactionCategories.EXPENSES.TRANSPORT]: '#2196F3',
    [transactionCategories.EXPENSES.UTILITIES]: '#9C27B0',
    [transactionCategories.EXPENSES.RENT]: '#F44336',
    [transactionCategories.EXPENSES.INSURANCE]: '#607D8B',
    [transactionCategories.EXPENSES.HEALTHCARE]: '#E91E63',
    [transactionCategories.EXPENSES.TRAVEL]: '#795548',
    [transactionCategories.EXPENSES.SHOPPING]: '#FF9800',
    [transactionCategories.EXPENSES.SUBSCRIPTION]: '#673AB7',
    [transactionCategories.TRANSFER.INTERNAL]: '#3F51B5',
    [transactionCategories.TRANSFER.EXTERNAL]: '#009688'
  };
  
  return colors[category] || '#9E9E9E';
};

// Calculate spending by category
export const calculateSpendingByCategory = (transactions) => {
  const spending = {};
  
  transactions.forEach(transaction => {
    const category = transaction.category || 'Uncategorized';
    if (!spending[category]) {
      spending[category] = 0;
    }
    spending[category] += Math.abs(transaction.amount);
  });
  
  return spending;
};

// Get top spending categories
export const getTopSpendingCategories = (transactions, limit = 5) => {
  const spending = calculateSpendingByCategory(transactions);
  return Object.entries(spending)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([category, amount]) => ({ category, amount }));
};

// Generate spending report
export const generateSpendingReport = (transactions, startDate, endDate) => {
  const filteredTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
  
  const spending = calculateSpendingByCategory(filteredTransactions);
  const totalSpending = Object.values(spending).reduce((sum, amount) => sum + amount, 0);
  
  return {
    totalSpending,
    spendingByCategory: spending,
    topCategories: getTopSpendingCategories(filteredTransactions),
    transactionCount: filteredTransactions.length
  };
};

// Format transaction for display
export const formatTransaction = (transaction) => {
  return {
    ...transaction,
    formattedAmount: new Intl.NumberFormat('en-US', {
      style: 'currency',
    currency: 'GHS'
    }).format(transaction.amount),
    formattedDate: new Date(transaction.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    category: transaction.category || autoCategorize(transaction.description, transaction.amount),
    color: getCategoryColor(transaction.category || autoCategorize(transaction.description, transaction.amount))
  };
};
