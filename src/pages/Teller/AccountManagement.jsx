import { useState, useEffect } from 'react';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
  UserAddOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import '../../styles/teller-dashboard-modern.css';

export default function AccountManagement({ tellerId }) {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('view');
  const [formData, setFormData] = useState({
    accountNumber: '',
    customerName: '',
    accountType: 'savings',
    balance: 0,
    status: 'active',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Simulate account data
    const mockAccounts = [
      {
        id: 1,
        accountNumber: 'ACC-2024-0001',
        customerName: 'Alice Johnson',
        accountType: 'Savings',
        balance: 15420.50,
        status: 'Active',
        email: 'alice@email.com',
        phone: '+1-555-0123',
        address: '123 Main St, City, State 12345',
        createdAt: '2024-01-01',
        lastTransaction: '2024-01-15'
      },
      {
        id: 2,
        accountNumber: 'ACC-2024-0002',
        customerName: 'Bob Smith',
        accountType: 'Checking',
        balance: 8750.25,
        status: 'Active',
        email: 'bob@email.com',
        phone: '+1-555-0124',
        address: '456 Oak Ave, City, State 12346',
        createdAt: '2024-01-05',
        lastTransaction: '2024-01-14'
      },
      {
        id: 3,
        accountNumber: 'ACC-2024-0003',
        customerName: 'Carol Davis',
        accountType: 'Business',
        balance: 45250.00,
        status: 'Active',
        email: 'carol@business.com',
        phone: '+1-555-0125',
        address: '789 Business Blvd, City, State 12347',
        createdAt: '2024-01-10',
        lastTransaction: '2024-01-15'
      },
      {
        id: 4,
        accountNumber: 'ACC-2024-0004',
        customerName: 'David Wilson',
        accountType: 'Savings',
        balance: 3200.00,
        status: 'Frozen',
        email: 'david@email.com',
        phone: '+1-555-0126',
        address: '321 Pine St, City, State 12348',
        createdAt: '2024-01-12',
        lastTransaction: '2024-01-10'
      }
    ];

    setAccounts(mockAccounts);
  }, []);

  const filteredAccounts = accounts.filter(account =>
    account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateAccount = () => {
    setModalType('create');
    setFormData({
      accountNumber: `ACC-2024-${String(accounts.length + 1).padStart(4, '0')}`,
      customerName: '',
      accountType: 'savings',
      balance: 0,
      status: 'active',
      email: '',
      phone: '',
      address: ''
    });
    setShowModal(true);
  };

  const handleViewAccount = (account) => {
    setSelectedAccount(account);
    setModalType('view');
    setShowModal(true);
  };

  const handleEditAccount = (account) => {
    setSelectedAccount(account);
    setFormData(account);
    setModalType('edit');
    setShowModal(true);
  };

  const handleToggleStatus = (accountId, currentStatus) => {
    setAccounts(prev => 
      prev.map(account => 
        account.id === accountId 
          ? { ...account, status: currentStatus === 'Active' ? 'Frozen' : 'Active' }
          : account
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'create') {
      const newAccount = {
        ...formData,
        id: accounts.length + 1,
        createdAt: new Date().toISOString().split('T')[0],
        lastTransaction: new Date().toISOString().split('T')[0]
      };
      setAccounts(prev => [...prev, newAccount]);
    } else if (modalType === 'edit' && selectedAccount) {
      setAccounts(prev => 
        prev.map(account => 
          account.id === selectedAccount.id ? { ...account, ...formData } : account
        )
      );
    }
    
    setShowModal(false);
    setSelectedAccount(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#52c41a';
      case 'Frozen': return '#ff4d4f';
      case 'Closed': return '#d9d9d9';
      default: return '#d9d9d9';
    }
  };

  const getAccountTypeColor = (type) => {
    switch (type) {
      case 'Savings': return '#1890ff';
      case 'Checking': return '#722ed1';
      case 'Business': return '#faad14';
      default: return '#d9d9d9';
    }
  };

  return (
    <div className="teller-dashboard-modern">
      {/* Header Section */}
      <div className="dashboard-header-modern">
        <div className="header-content">
          <h1 className="dashboard-title">
            <UserAddOutlined className="title-icon" />
            Account Management
          </h1>
          <p className="dashboard-subtitle">
            Manage customer accounts, view details, and perform account operations
          </p>
        </div>
        
        <div className="teller-info-modern">
          <div className="teller-badge">
            <span className="teller-id">Teller ID: {tellerId}</span>
            <span className="status-indicator online">
              <div className="status-dot"></div>
              Online
            </span>
          </div>
          <div className="current-time">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="content-card">
        <div className="card-header">
          <h2>
            <SearchOutlined />
            Search Accounts
          </h2>
        </div>
        <div className="card-content">
          <div className="search-bar-modern">
            <input
              type="text"
              placeholder="Search by name, account number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="content-card">
        <div className="card-header">
          <h2>
            <FileTextOutlined />
            Customer Accounts
          </h2>
          <button className="btn-approve" onClick={handleCreateAccount}>
            <UserAddOutlined />
            Create New Account
          </button>
        </div>
        <div className="card-content">
          <div className="modern-table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Account Number</th>
                  <th>Customer Name</th>
                  <th>Account Type</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Last Transaction</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map(account => (
                  <tr key={account.id} className="table-row">
                    <td>
                      <div className="customer-info">
                        <div className="customer-name">{account.accountNumber}</div>
                      </div>
                    </td>
                    <td>{account.customerName}</td>
                    <td>
                      <span className={`transaction-type ${account.accountType.toLowerCase()}`}>
                        {account.accountType}
                      </span>
                    </td>
                    <td className="amount-cell">
                      <span className="amount deposit">GHS {account.balance.toLocaleString()}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${account.status.toLowerCase()}`}>
                        {account.status}
                      </span>
                    </td>
                    <td className="time-cell">{account.lastTransaction}</td>
                    <td>
                      <div className="approval-actions">
                        <button 
                          className="btn-approve"
                          onClick={() => handleViewAccount(account)}
                          title="View Account Details"
                        >
                          <EyeOutlined />
                        </button>
                        <button 
                          className="btn-approve"
                          onClick={() => handleEditAccount(account)}
                          title="Edit Account"
                        >
                          <EditOutlined />
                        </button>
                        <button 
                          className="btn-reject"
                          onClick={() => handleToggleStatus(account.id, account.status)}
                          title={account.status === 'Active' ? 'Freeze Account' : 'Activate Account'}
                        >
                          {account.status === 'Active' ? <LockOutlined /> : <UnlockOutlined />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay-enhanced">
          <div className="modal-enhanced">
            <div className="modal-header-enhanced">
              <h2>
                {modalType === 'create' ? 'Create New Account' : 
                 modalType === 'edit' ? 'Edit Account' : 'Account Details'}
              </h2>
              <button className="close-btn-enhanced" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group-enhanced">
                <label>Account Number</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  readOnly
                  className="form-control readonly"
                />
              </div>

              <div className="form-group-enhanced">
                <label>Customer Name *</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  required
                  readOnly={modalType === 'view'}
                  className="form-control"
                />
              </div>

              <div className="form-group-enhanced">
                <label>Account Type</label>
                <select
                  value={formData.accountType}
                  onChange={(e) => setFormData({...formData, accountType: e.target.value})}
                  disabled={modalType === 'view'}
                  className="form-control"
                >
                  <option value="savings">Savings</option>
                  <option value="checking">Checking</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <div className="form-group-enhanced">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  readOnly={modalType === 'view'}
                  className="form-control"
                />
              </div>

              <div className="form-group-enhanced">
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  readOnly={modalType === 'view'}
                  className="form-control"
                />
              </div>

              <div className="form-group-enhanced">
                <label>Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  readOnly={modalType === 'view'}
                  className="form-control"
                />
              </div>

              <div className="form-group-enhanced">
                <label>Current Balance</label>
                <input
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({...formData, balance: parseFloat(e.target.value)})}
                  readOnly={modalType === 'view'}
                  step="0.01"
                  className="form-control"
                />
              </div>

              {modalType !== 'view' && (
                <div className="modal-actions-enhanced">
                  <button type="submit" className="btn-approve">
                    {modalType === 'create' ? 'Create Account' : 'Save Changes'}
                  </button>
                  <button type="button" className="btn-reject" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
