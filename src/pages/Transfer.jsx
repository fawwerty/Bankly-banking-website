import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bankingAPI } from '../api/laravelClient';

export default function Transfer() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transferData, setTransferData] = useState({
    fromAccountId: '',
    toAccountId: '',
    amount: '',
    description: '',
    transferType: 'internal'
  });
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    loadAccounts();
    loadRecipients();
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
          currency: 'USD'
        },
        {
          id: 2,
          type: 'savings',
          balance: 7250.94,
          accountNumber: '****5678',
          currency: 'USD'
        }
      ];
      setAccounts(mockAccounts);
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecipients = async () => {
    try {
      // Mock recipients - replace with actual API call
      const mockRecipients = [
        { id: 1, name: 'John Doe', accountNumber: '****9876', bank: 'SecureBank' },
        { id: 2, name: 'Jane Smith', accountNumber: '****5432', bank: 'TrustBank' }
      ];
      setRecipients(mockRecipients);
    } catch (error) {
      console.error('Error loading recipients:', error);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    
    try {
      // Validate transfer
      const fromAccount = accounts.find(acc => acc.id === parseInt(transferData.fromAccountId));
      if (!fromAccount) {
        alert('Please select a valid source account');
        return;
      }

      if (parseFloat(transferData.amount) > fromAccount.balance) {
        alert('Insufficient funds');
        return;
      }

      if (parseFloat(transferData.amount) <= 0) {
        alert('Please enter a valid amount');
        return;
      }

      // Mock transfer - replace with actual API call
      alert(`Transfer of GHS ${transferData.amount} completed successfully!`);
      
      // Reset form
      setTransferData({
        fromAccountId: '',
        toAccountId: '',
        amount: '',
        description: '',
        transferType: 'internal'
      });
      
      // Reload accounts
      loadAccounts();
    } catch (error) {
      console.error('Error processing transfer:', error);
      alert('Transfer failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferData(prev => ({ ...prev, [name]: value }));
  };

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
      <h1>Transfer Funds</h1>
      
      <div className="card" style={{ maxWidth: '600px', marginTop: '20px' }}>
        <form onSubmit={handleTransfer}>
          <div className="form-group">
            <label className="form-label">Transfer Type</label>
            <select 
              name="transferType" 
              value={transferData.transferType} 
              onChange={handleChange}
              className="form-control"
            >
              <option value="internal">Internal Transfer (Between your accounts)</option>
              <option value="external">External Transfer (To other accounts)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">From Account</label>
            <select 
              name="fromAccountId" 
              value={transferData.fromAccountId} 
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select account</option>
              {accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.type} ({account.accountNumber}) - GHS {account.balance.toFixed(2)} {account.currency}
                </option>
              ))}
            </select>
          </div>

          {transferData.transferType === 'internal' ? (
            <div className="form-group">
              <label className="form-label">To Account</label>
              <select 
                name="toAccountId" 
                value={transferData.toAccountId} 
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select account</option>
                {accounts.filter(acc => acc.id !== parseInt(transferData.fromAccountId)).map(account => (
                  <option key={account.id} value={account.id}>
                    {account.type} ({account.accountNumber}) - {account.currency}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Recipient</label>
              <select 
                name="toAccountId" 
                value={transferData.toAccountId} 
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select recipient</option>
                {recipients.map(recipient => (
                  <option key={recipient.id} value={recipient.id}>
                    {recipient.name} ({recipient.accountNumber}) - {recipient.bank}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Amount</label>
            <input 
              type="number"
              name="amount"
              value={transferData.amount}
              onChange={handleChange}
              className="form-control"
              min="0.01"
              step="0.01"
              required
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <input 
              type="text"
              name="description"
              value={transferData.description}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., Rent payment, Gift, etc."
            />
          </div>

          <button type="submit" className="btn btn-primary">Transfer Funds</button>
        </form>
      </div>

      <div className="card" style={{ marginTop: '30px' }}>
        <h3>Transfer History</h3>
        <p>Recent transfers will appear here.</p>
      </div>
    </div>
  );
}
