import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bankingAPI } from '../api/laravelClient';

export default function EnhancedTransfer() {
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
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadAccounts();
    loadRecipients();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const response = await bankingAPI.getAccounts();
      setAccounts(response);
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecipients = async () => {
    try {
      // This would typically come from a recipients API
      const response = await bankingAPI.getRecipients?.() || [];
      setRecipients(response);
    } catch (error) {
      console.error('Error loading recipients:', error);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    
    if (transferData.amount <= 0) {
      setMessage('Amount must be greater than zero.');
      return;
    }

    const fromAccount = accounts.find(acc => acc.id === parseInt(transferData.fromAccountId));
    if (!fromAccount) {
      setMessage('Please select a valid source account.');
      return;
    }

    if (parseFloat(transferData.amount) > fromAccount.balance) {
      setMessage('Insufficient funds for this transfer.');
      return;
    }

    try {
      let response;
      
      if (transferData.transferType === 'internal') {
        // Internal transfer between user's accounts
        response = await bankingAPI.transfer({
          fromAccountId: transferData.fromAccountId,
          toAccountId: transferData.toAccountId,
          amount: transferData.amount,
          description: transferData.description
        });
      } else {
        // External transfer to other users
        response = await bankingAPI.externalTransfer({
          fromAccountId: transferData.fromAccountId,
          toAccountId: transferData.toAccountId,
          amount: transferData.amount,
          description: transferData.description
        });
      }

      setMessage(`Transfer of GHS ${response.amount} completed successfully!`);
      
      // Reset form
      setTransferData({
        fromAccountId: '',
        toAccountId: '',
        amount: '',
        description: '',
        transferType: 'internal'
      });
      
      // Reload accounts to update balances
      loadAccounts();
    } catch (error) {
      console.error('Transfer failed:', error);
      setMessage('Transfer failed. Please try again.');
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
            <label className="form-label">Amount (GHS)</label>
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
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
