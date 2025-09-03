import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function TransactionProcessing() {
  const { user } = useAuth();
  const [transactionType, setTransactionType] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleTransaction = () => {
    if (amount <= 0) {
      setMessage('Amount must be greater than zero.');
      return;
    }

    // Simulate transaction processing
    setMessage(`Successfully processed ${transactionType} of GHS ${amount} for account ${accountNumber}`);
    setAmount('');
    setAccountNumber('');
  };

  return (
    <div>
      <h1>Transaction Processing</h1>
      <p>Process customer deposits, withdrawals, and transfers</p>

      <div className="form-container" style={{ maxWidth: '500px' }}>
        <div className="form-group">
          <label className="form-label">Transaction Type</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="form-select"
          >
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Amount (GHS)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="form-input"
          />
        </div>

        <button
          onClick={handleTransaction}
          className="form-button"
        >
          Process Transaction
        </button>

        {message && (
          <div className="form-message">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
