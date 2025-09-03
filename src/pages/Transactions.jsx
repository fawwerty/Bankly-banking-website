import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TransactionCard from '../components/TransactionCard';
import { bankingAPI } from '../api/laravelClient';

export default function Transactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: 'all',
    dateRange: 'all',
    accountId: 'all'
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await bankingAPI.getTransactions();
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
    if (filter.accountId !== 'all' && !transaction.accountNumber.includes(filter.accountId)) return false;
    
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
      transfers: 0
    };
    
    filteredTransactions.forEach(transaction => {
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
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1>Transaction History</h1>
      
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
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '30px' }}>
        <div className="stat-card">
          <div className="stat-value">${totals.deposits.toFixed(2)}</div>
          <div className="stat-label">Total Deposits</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${totals.withdrawals.toFixed(2)}</div>
          <div className="stat-label">Total Withdrawals</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${totals.transfers.toFixed(2)}</div>
          <div className="stat-label">Total Transfers</div>
        </div>
      </div>

      <div className="card">
        <h3>All Transactions</h3>
        {filteredTransactions.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Date</th>
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
                  <TransactionCard key={transaction.id} transaction={transaction} />
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
