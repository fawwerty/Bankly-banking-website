import { useState, useEffect } from 'react';
import { bankingAPI } from '../../api/laravelClient';

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: 'all',
    dateRange: 'all',
    userId: '',
    accountId: ''
  });

  useEffect(() => {
    loadAllTransactions();
  }, []);

  const loadAllTransactions = async () => {
    try {
      setLoading(true);
      const response = await bankingAPI.getAllTransactions();
      setTransactions(response);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filter.type !== 'all' && transaction.type !== filter.type) return false;
    if (filter.userId && !transaction.userId?.toString().includes(filter.userId)) return false;
    if (filter.accountId && !transaction.accountNumber?.includes(filter.accountId)) return false;
    
    // Date range filtering
    if (filter.dateRange !== 'all') {
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      
      switch (filter.dateRange) {
        case 'today':
          return transactionDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return transactionDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return transactionDate >= monthAgo;
        default:
          return true;
      }
    }
    
    return true;
  });

  const transactionTypes = [
    { value: 'all', label: 'All Transactions' },
    { value: 'deposit', label: 'Deposits' },
    { value: 'withdrawal', label: 'Withdrawals' },
    { value: 'transfer', label: 'Transfers' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const calculateTotals = () => {
    const totals = {
      deposits: 0,
      withdrawals: 0,
      transfers: 0,
      totalVolume: 0
    };
    
    filteredTransactions.forEach(transaction => {
      totals.totalVolume += transaction.amount;
      if (transaction.type === 'deposit') {
        totals.deposits += transaction.amount;
      } else if (transaction.type === 'withdrawal') {
        totals.withdrawals += Math.abs(transaction.amount);
      } else if (transaction.type === 'transfer') {
        totals.transfers += Math.abs(transaction.amount);
      }
    });
    
    return totals;
  };

  const totals = calculateTotals();

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 0' }}>
        <div className="text-center">
          <div className="spinner"></div>
          <p>Loading all transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1>All System Transactions</h1>
      
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Filter Transactions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Transaction Type</label>
            <select 
              name="type"
              value={filter.type}
              onChange={handleFilterChange}
              className="form-control"
            >
              {transactionTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Date Range</label>
            <select 
              name="dateRange"
              value={filter.dateRange}
              onChange={handleFilterChange}
              className="form-control"
            >
              {dateRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">User ID</label>
            <input
              type="text"
              name="userId"
              value={filter.userId}
              onChange={handleFilterChange}
              className="form-control"
              placeholder="Filter by user ID"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Account Number</label>
            <input
              type="text"
              name="accountId"
              value={filter.accountId}
              onChange={handleFilterChange}
              className="form-control"
              placeholder="Filter by account"
            />
          </div>
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '30px' }}>
        <div className="stat-card">
          <div className="stat-value">GHS{totals.deposits.toFixed(2)}</div>
          <div className="stat-label">Total Deposits</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">GHS{totals.withdrawals.toFixed(2)}</div>
          <div className="stat-label">Total Withdrawals</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">GHS{totals.transfers.toFixed(2)}</div>
          <div className="stat-label">Total Transfers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">GHS{totals.totalVolume.toFixed(2)}</div>
          <div className="stat-label">Total Volume</div>
        </div>
      </div>

      <div className="card">
        <h3>All Transactions ({filteredTransactions.length})</h3>
        {filteredTransactions.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>User</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Description</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Account</th>
                  <th style={{ textAlign: 'right', padding: '12px' }}>Amount</th>
                  <th style={{ textAlign: 'right', padding: '12px' }}>Balance After</th>
                  <th style={{ textAlign: 'center', padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(transaction => (
                  <tr key={transaction.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px' }}>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>{transaction.userName || 'N/A'}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`badge badge-${transaction.type}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{transaction.description}</td>
                    <td style={{ padding: '12px' }}>{transaction.accountNumber}</td>
                    <td style={{ textAlign: 'right', padding: '12px' }}>
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px' }}>
                      ${transaction.balanceAfter?.toFixed(2) || 'N/A'}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>
                      <span className={`badge badge-${transaction.status || 'completed'}`}>
                        {transaction.status || 'completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center" style={{ padding: '40px 0' }}>
            <h3>No transactions found</h3>
            <p>No transactions match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
