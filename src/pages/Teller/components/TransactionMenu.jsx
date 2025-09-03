import { useState } from 'react';

export default function TransactionMenu({ onTransactionSelect, customerId }) {
  const [quickAmount, setQuickAmount] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  const transactionTypes = [
    {
      id: 'deposit',
      label: 'Deposit',
      icon: '💰',
      color: '#28a745',
      description: 'Add funds to account'
    },
    {
      id: 'withdrawal',
      label: 'Withdrawal',
      icon: '💸',
      color: '#dc3545',
      description: 'Remove funds from account'
    },
    {
      id: 'transfer',
      label: 'Transfer',
      icon: '🔄',
      color: '#007bff',
      description: 'Move funds between accounts'
    },
    {
      id: 'payment',
      label: 'Bill Payment',
      icon: '📄',
      color: '#6f42c1',
      description: 'Pay bills and utilities'
    },
    {
      id: 'check',
      label: 'Check Cashing',
      icon: '📋',
      color: '#fd7e14',
      description: 'Cash checks instantly'
    },
    {
      id: 'loan',
      label: 'Loan Payment',
      icon: '🏦',
      color: '#20c997',
      description: 'Make loan payments'
    }
  ];

  const quickAmounts = [50, 100, 200, 500, 1000, 2000];

  const handleTransaction = (type, amount = null) => {
    const transactionData = {
      type,
      amount: amount || quickAmount,
      customerId,
      timestamp: new Date().toISOString()
    };
    
    onTransactionSelect(transactionData);
    setQuickAmount('');
    setSelectedType(null);
  };

  return (
    <div className="transaction-menu">
      <h3>Quick Transactions</h3>
      
      <div className="transaction-grid">
        {transactionTypes.map(type => (
          <div
            key={type.id}
            className={`transaction-card ${selectedType === type.id ? 'selected' : ''}`}
            style={{ borderColor: type.color }}
            onClick={() => setSelectedType(type.id)}
          >
            <div className="transaction-icon" style={{ color: type.color }}>
              {type.icon}
            </div>
            <div className="transaction-info">
              <h4>{type.label}</h4>
              <p>{type.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedType && (
        <div className="quick-amount-section">
          <h4>Quick Amounts</h4>
          <div className="quick-amounts">
            {quickAmounts.map(amount => (
              <button
                key={amount}
                className="quick-amount-btn"
                onClick={() => handleTransaction(selectedType, amount)}
              >
                ${amount}
              </button>
            ))}
          </div>
          
          <div className="custom-amount">
            <input
              type="number"
              placeholder="Enter custom amount"
              value={quickAmount}
              onChange={(e) => setQuickAmount(e.target.value)}
            />
            <button
              onClick={() => handleTransaction(selectedType)}
              disabled={!quickAmount || quickAmount <= 0}
            >
              Process {transactionTypes.find(t => t.id === selectedType)?.label}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
