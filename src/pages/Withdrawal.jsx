import { useState, useEffect } from 'react';
import { bankingAPI } from '../api/laravelClient';
import { MinusOutlined, WalletOutlined, DollarOutlined, LoadingOutlined } from '@ant-design/icons';
import '../styles/customer-dashboard-modern.css';

export default function Withdrawal() {
  const [amount, setAmount] = useState('');
  const [accountId, setAccountId] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const response = await bankingAPI.getAccounts();
      setAccounts(response);
    } catch (error) {
      console.error('Error loading accounts:', error);
      setMessage('Failed to load accounts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    
    if (amount <= 0) {
      setMessage('Amount must be greater than zero.');
      setSubmitting(false);
      return;
    }

    const selectedAccount = accounts.find(acc => acc.id === parseInt(accountId));
    if (!selectedAccount) {
      setMessage('Please select a valid account.');
      setSubmitting(false);
      return;
    }

    if (parseFloat(amount) > selectedAccount.balance) {
      setMessage('Insufficient funds for this withdrawal.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await bankingAPI.withdraw({ accountId, amount });
      setMessage(`Successfully withdrew GHS ${response.amount} from account ${accountId}`);
      setAmount('');
      setAccountId('');
      loadAccounts(); // Refresh account balances
    } catch (error) {
      console.error('Withdrawal failed:', error);
      setMessage('Withdrawal failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="customer-dashboard-modern">
        <div className="dashboard-header-modern">
          <div className="container">
            <div className="header-content">
              <h1 className="dashboard-title">
                <MinusOutlined className="title-icon" />
                Withdraw Funds
              </h1>
              <p className="dashboard-subtitle">
                Access your money securely
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="form-modern">
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <LoadingOutlined style={{ fontSize: '48px', color: '#667eea' }} />
              <p style={{ marginTop: '20px' }}>Loading accounts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-dashboard-modern">
      {/* Header Section */}
      <div className="dashboard-header-modern">
        <div className="container">
          <div className="header-content">
            <h1 className="dashboard-title">
              <MinusOutlined className="title-icon" />
              Withdraw Funds
            </h1>
            <p className="dashboard-subtitle">
              Access your money securely
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="form-modern">
          <form onSubmit={handleWithdrawal}>
            <div className="form-group-modern">
              <label>
                <WalletOutlined style={{ marginRight: '8px' }} />
                Select Account
              </label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="form-control-modern"
                required
                disabled={submitting}
              >
                <option value="">Choose an account to withdraw from</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.type} ({account.accountNumber}) - GHS {account.balance.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group-modern">
              <label>
                <DollarOutlined style={{ marginRight: '8px' }} />
                Amount (GHS)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter withdrawal amount"
                min="0.01"
                step="0.01"
                className="form-control-modern"
                required
                disabled={submitting}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary-modern"
              disabled={submitting}
              style={{ width: '100%' }}
            >
              {submitting ? (
                <>
                  <LoadingOutlined />
                  Processing...
                </>
              ) : (
                <>
                  <MinusOutlined />
                  Withdraw Funds
                </>
              )}
            </button>
          </form>

          {message && (
            <div className={`message-modern ${message.includes('Successfully') ? 'message-success' : 'message-error'}`}>
              {message}
            </div>
          )}

          {/* Account Summary */}
          {accountId && (
            <div style={{ marginTop: '30px', padding: '20px', background: '#f7fafc', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: '15px', color: '#2d3748' }}>Account Summary</h3>
              {(() => {
                const selectedAccount = accounts.find(acc => acc.id === parseInt(accountId));
                if (!selectedAccount) return null;
                
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <strong>Account Type:</strong>
                      <br />
                      {selectedAccount.type}
                    </div>
                    <div>
                      <strong>Account Number:</strong>
                      <br />
                      {selectedAccount.accountNumber}
                    </div>
                    <div>
                      <strong>Current Balance:</strong>
                      <br />
                      GHS {selectedAccount.balance.toFixed(2)}
                    </div>
                    <div>
                      <strong>After Withdrawal:</strong>
                      <br />
                      <span style={{ 
                        color: selectedAccount.balance - parseFloat(amount || 0) < 0 ? '#e53e3e' : '#38a169',
                        fontWeight: '600'
                      }}>
                        GHS {(selectedAccount.balance - parseFloat(amount || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
