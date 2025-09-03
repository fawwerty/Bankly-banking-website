import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import laravelClient from '../../api/laravelClient';

export default function AdminAccounts() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await laravelClient.get('/admin/accounts');
      
      if (response.data.success) {
        setAccounts(response.data.accounts);
      } else {
        setError('Failed to fetch accounts');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter and sort accounts
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = searchTerm === '' || 
      account.account_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || account.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'balance':
        aValue = a.balance;
        bValue = b.balance;
        break;
      case 'account_number':
        aValue = a.account_number;
        bValue = b.account_number;
        break;
      case 'user_name':
        aValue = a.user?.name || '';
        bValue = b.user?.name || '';
        break;
      default:
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (loading) {
    return <div>Loading system accounts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h1>System-Wide Account Management</h1>
        <p>Overview of all bank accounts managed by the admin</p>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#3498db', margin: '0 0 10px 0' }}>{accounts.length}</h3>
          <p style={{ margin: 0, color: '#666' }}>Total Accounts</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#2ecc71', margin: '0 0 10px 0' }}>
            {formatCurrency(accounts.reduce((total, account) => total + (account.balance || 0), 0))}
          </h3>
          <p style={{ margin: 0, color: '#666' }}>Total System Balance</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              flex: '1',
              minWidth: '200px'
            }}
          />
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="created_at">Date Created</option>
            <option value="balance">Balance</option>
            <option value="account_number">Account Number</option>
            <option value="user_name">User Name</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Accounts Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Account Number</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Account Holder</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Balance</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {sortedAccounts.map((account) => (
                <tr key={account.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '14px' }}>
                    {account.account_number}
                  </td>
                  <td style={{ padding: '12px' }}>{account.user?.name || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{account.user?.email || 'N/A'}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>
                    {formatCurrency(account.balance)}
                  </td>
                  <td style={{ padding: '12px' }}>{account.type}</td>
                  <td style={{ padding: '12px' }}>{account.status}</td>
                  <td style={{ padding: '12px' }}>{formatDate(account.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
