import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function CustomerInformationPanel({ customerId, onCustomerUpdate }) {
  const { user } = useAuth();
  const [customer, setCustomer] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId]);

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual endpoint
      const mockCustomer = {
        id: customerId,
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1-555-0123',
        address: '123 Main St, City, State 12345',
        photo: '/images/default-avatar.png',
        idVerified: true,
        memberSince: '2022-03-15'
      };

      const mockAccounts = [
        {
          id: 'acc001',
          type: 'Checking',
          number: '****5678',
          balance: 5423.50,
          status: 'Active'
        },
        {
          id: 'acc002',
          type: 'Savings',
          number: '****9012',
          balance: 12500.00,
          status: 'Active'
        }
      ];

      const mockTransactions = [
        {
          id: 'txn001',
          date: '2024-01-15',
          description: 'Grocery Store',
          amount: -85.32,
          type: 'debit'
        },
        {
          id: 'txn002',
          date: '2024-01-14',
          description: 'Payroll Deposit',
          amount: 2500.00,
          type: 'credit'
        },
        {
          id: 'txn003',
          date: '2024-01-13',
          description: 'Online Transfer',
          amount: -200.00,
          type: 'debit'
        }
      ];

      setCustomer(mockCustomer);
      setAccounts(mockAccounts);
      setRecentTransactions(mockTransactions);
    } catch (err) {
      setError('Failed to load customer data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading customer information...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!customer) return <div className="empty">Select a customer to view details</div>;

  return (
    <div className="customer-panel">
      <div className="customer-header">
        <div className="customer-photo">
          <img 
            src={customer.photo} 
            alt={customer.name}
            style={{ width: '60px', height: '60px', borderRadius: '50%' }}
          />
        </div>
        <div className="customer-info">
          <h3>{customer.name}</h3>
          <p className="customer-id">ID: {customer.id}</p>
          {customer.idVerified && <span className="verified-badge">✓ Verified</span>}
        </div>
      </div>

      <div className="customer-details">
        <div className="detail-section">
          <h4>Contact Information</h4>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Member Since:</strong> {new Date(customer.memberSince).toLocaleDateString()}</p>
        </div>

        <div className="detail-section">
          <h4>Accounts Summary</h4>
          {accounts.map(account => (
            <div key={account.id} className="account-item">
              <span className="account-type">{account.type}</span>
              <span className="account-number">{account.number}</span>
              <span className="account-balance">${account.balance.toFixed(2)}</span>
              <span className={`account-status ${account.status.toLowerCase()}`}>{account.status}</span>
            </div>
          ))}
        </div>

        <div className="detail-section">
          <h4>Recent Transactions</h4>
          <div className="transactions-list">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</div>
                <div className="transaction-description">{transaction.description}</div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
