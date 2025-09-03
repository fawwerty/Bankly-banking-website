import { useState, useEffect } from 'react';
import { bankingAPI } from '../api/laravelClient';
import { validateTransaction } from '../utils/validation';
import { formatCurrency } from '../utils/validation';

export default function Deposit() {
  const [amount, setAmount] = useState('');
  const [accountId, setAccountId] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const response = await bankingAPI.getAccounts();
      setAccounts(response);
    } catch (error) {
      console.error('Error loading accounts:', error);
      setError('Failed to load accounts');
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate amount
    const validation = validateTransaction.amount(amount);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    if (!accountId) {
      setError('Please select an account');
      return;
    }

    setLoading(true);

    try {
      const response = await bankingAPI.deposit({ 
        accountId: parseInt(accountId), 
        amount: parseFloat(amount) 
      });
      
      setMessage(`Successfully deposited GHS ${formatCurrency(response.amount)}`);
      setAmount('');
      setAccountId('');
      
      // Refresh accounts to show updated balance
      loadAccounts();
    } catch (error) {
      console.error('Deposit failed:', error);
      setError(error.response?.data?.message || 'Deposit failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1>Deposit Funds</h1>
        <p>Add money to your account securely</p>
        
        <form onSubmit={handleDeposit}>
          <div className="form-group">
            <label className="form-label">Select Account</label>
            <select 
              value={accountId} 
              onChange={(e) => setAccountId(e.target.value)}
              className="form-control"
              required
            >
              <option value="">Choose account</option>
              {accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.type} ({account.accountNumber}) - {formatCurrency(account.balance)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Amount</label>
            <div className="input-group">
              <span className="input-group-text">GHS</span>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-control"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || !amount || !accountId}
          >
            {loading ? 'Processing...' : 'Deposit Funds'}
          </button>
        </form>

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
          <h4>Deposit Information</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>✅ Instant processing</li>
            <li>✅ No deposit fees</li>
            <li>✅ FDIC insured up to GHS 250,000</li>
            <li>✅ 24/7 availability</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
