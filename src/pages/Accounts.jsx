import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AccountCard from '../components/AccountCard';
import { bankingAPI } from '../api/laravelClient';

export default function Accounts() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    type: 'checking',
    currency: 'USD',
    initialDeposit: 0
  });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockAccounts = [
        {
          id: 1,
          type: 'checking',
          balance: 5234.56,
          accountNumber: '****1234',
          currency: 'USD',
          status: 'active',
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          type: 'savings',
          balance: 7250.94,
          accountNumber: '****5678',
          currency: 'USD',
          status: 'active',
          createdAt: '2024-01-10'
        }
      ];
      setAccounts(mockAccounts);
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      // Mock account creation - replace with actual API call
      const newAccountData = {
        id: Date.now(),
        type: newAccount.type,
        balance: newAccount.initialDeposit,
        accountNumber: '****' + Math.floor(Math.random() * 10000),
        currency: newAccount.currency,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setAccounts([...accounts, newAccountData]);
      setShowCreateForm(false);
      setNewAccount({ type: 'checking', currency: 'USD', initialDeposit: 0 });
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const accountTypes = [
    { value: 'checking', label: 'Checking Account' },
    { value: 'savings', label: 'Savings Account' },
    { value: 'business', label: 'Business Account' },
    { value: 'investment', label: 'Investment Account' }
  ];

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'GHS', label: 'Ghana Cedi (GHS)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' }
  ];

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 0' }}>
        <div className="text-center">
          <div className="spinner"></div>
          <p>Loading accounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>My Accounts</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          Create New Account
        </button>
      </div>

      {showCreateForm && (
        <div className="card" style={{ marginBottom: '30px', maxWidth: '500px' }}>
          <h3>Create New Account</h3>
          <form onSubmit={handleCreateAccount}>
            <div className="form-group">
              <label className="form-label">Account Type</label>
              <select 
                className="form-control"
                value={newAccount.type}
                onChange={(e) => setNewAccount({...newAccount, type: e.target.value})}
                required
              >
                {accountTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Currency</label>
              <select 
                className="form-control"
                value={newAccount.currency}
                onChange={(e) => setNewAccount({...newAccount, currency: e.target.value})}
                required
              >
                {currencies.map(currency => (
                  <option key={currency.value} value={currency.value}>{currency.label}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Initial Deposit</label>
              <input 
                type="number"
                className="form-control"
                value={newAccount.initialDeposit}
                onChange={(e) => setNewAccount({...newAccount, initialDeposit: parseFloat(e.target.value) || 0})}
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary">Create Account</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowCreateForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="dashboard-grid">
        {accounts.map(account => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>

      {accounts.length === 0 && (
        <div className="text-center" style={{ padding: '60px 0' }}>
          <h3>No accounts found</h3>
          <p>Create your first account to get started with banking.</p>
        </div>
      )}
    </div>
  );
}
