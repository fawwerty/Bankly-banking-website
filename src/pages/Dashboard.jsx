import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  WalletOutlined, 
  DollarOutlined, 
  PieChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  SwapOutlined,
  PlusOutlined,
  MinusOutlined,
  UserOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import '../styles/customer-dashboard-modern.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data - replace with actual API calls
  const accountData = {
    checking: {
      balance: 5234.56,
      accountNumber: '****1234',
      transactions: [
        { id: 1, date: '2024-01-15', description: 'Grocery Store', amount: -85.32, type: 'debit' },
        { id: 2, date: '2024-01-14', description: 'Salary Deposit', amount: 2500.00, type: 'credit' },
        { id: 3, date: '2024-01-13', description: 'Electric Bill', amount: -120.00, type: 'debit' },
        { id: 4, date: '2024-01-12', description: 'Restaurant', amount: -45.67, type: 'debit' },
      ]
    },
    savings: {
      balance: 12500.50,
      accountNumber: '****5678',
      transactions: [
        { id: 1, date: '2024-01-15', description: 'Interest', amount: 12.50, type: 'credit' },
        { id: 2, date: '2024-01-10', description: 'Transfer from Checking', amount: 500.00, type: 'credit' },
      ]
    }
  };

  const recentTransactions = [...accountData.checking.transactions, ...accountData.savings.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const totalBalance = accountData.checking.balance + accountData.savings.balance;

  return (
    <div className="customer-dashboard-modern">
      {/* Header Section */}
      <div className="dashboard-header-modern">
        <div className="container">
          <div className="header-content">
            <h1 className="dashboard-title">
              <WalletOutlined className="title-icon" />
              Welcome back, {user?.name || 'User'}
            </h1>
            <p className="dashboard-subtitle">
              Manage your finances with ease and security
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Account Overview Cards */}
        <div className="stats-grid-modern">
          <div className="stat-card-modern">
            <div className="stat-icon-modern" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <WalletOutlined />
            </div>
            <div className="stat-content-modern">
              <h3>GHS {accountData.checking.balance.toLocaleString()}</h3>
              <p>Checking Account</p>
              <span className="stat-trend positive">Active</span>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-modern" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
              <PieChartOutlined />
            </div>
            <div className="stat-content-modern">
              <h3>GHS {accountData.savings.balance.toLocaleString()}</h3>
              <p>Savings Account</p>
              <span className="stat-trend positive">+1.2% this month</span>
            </div>
          </div>

          <div className="stat-card-modern">
            <div className="stat-icon-modern" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
              <DollarOutlined />
            </div>
            <div className="stat-content-modern">
              <h3>GHS {totalBalance.toLocaleString()}</h3>
              <p>Total Balance</p>
              <span className="stat-trend positive">+2.5% this month</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-modern">
          <h2>Quick Actions</h2>
          <div className="quick-actions-grid">
            <Link to="/accounts" className="quick-action-btn">
              <EyeOutlined className="action-icon" />
              <span className="action-text">View Accounts</span>
            </Link>
            <Link to="/transfer" className="quick-action-btn">
              <SwapOutlined className="action-icon" />
              <span className="action-text">Transfer Money</span>
            </Link>
            <Link to="/deposit" className="quick-action-btn">
              <PlusOutlined className="action-icon" />
              <span className="action-text">Deposit</span>
            </Link>
            <Link to="/withdraw" className="quick-action-btn">
              <MinusOutlined className="action-icon" />
              <span className="action-text">Withdraw</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="tab-navigation-modern">
          <div className="tab-header-modern">
            <button 
              className={`tab-btn-modern ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <HistoryOutlined /> Overview
            </button>
            <button 
              className={`tab-btn-modern ${activeTab === 'transactions' ? 'active' : ''}`}
              onClick={() => setActiveTab('transactions')}
            >
              <SwapOutlined /> Transactions
            </button>
            <button 
              className={`tab-btn-modern ${activeTab === 'transfer' ? 'active' : ''}`}
              onClick={() => setActiveTab('transfer')}
            >
              <SwapOutlined /> Transfer
            </button>
            <button 
              className={`tab-btn-modern ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <UserOutlined /> Profile
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content-modern">
            {activeTab === 'overview' && (
              <div>
                <h2>Recent Transactions</h2>
                <table className="transaction-table-modern">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.description}</td>
                        <td className={transaction.type === 'credit' ? 'amount-positive' : 'amount-negative'}>
                          {transaction.type === 'credit' ? '+' : '-'}GHS {Math.abs(transaction.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div>
                <h2>All Transactions</h2>
                <div className="card">
                  <p>Full transaction history would be displayed here with filtering and search options.</p>
                  <Link to="/transactions" className="btn btn-primary-modern">
                    <EyeOutlined />
                    View All Transactions
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'transfer' && (
              <div>
                <h2>Transfer Funds</h2>
                <div className="form-modern">
                  <form>
                    <div className="form-group-modern">
                      <label>From Account</label>
                      <select className="form-control-modern">
                        <option>Checking (...1234) - GHS {accountData.checking.balance.toFixed(2)}</option>
                        <option>Savings (...5678) - GHS {accountData.savings.balance.toFixed(2)}</option>
                      </select>
                    </div>
                    <div className="form-group-modern">
                      <label>To Account</label>
                      <input type="text" className="form-control-modern" placeholder="Account number or email" />
                    </div>
                    <div className="form-group-modern">
                      <label>Amount</label>
                      <input type="number" className="form-control-modern" placeholder="0.00" />
                    </div>
                    <button type="submit" className="btn btn-primary-modern">
                      <SwapOutlined />
                      Transfer Funds
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2>Profile Settings</h2>
                <div className="form-modern">
                  <div className="form-group-modern">
                    <label>Full Name</label>
                    <input type="text" className="form-control-modern" defaultValue={user?.name} />
                  </div>
                  <div className="form-group-modern">
                    <label>Email</label>
                    <input type="email" className="form-control-modern" defaultValue={user?.email} />
                  </div>
                  <div className="form-group-modern">
                    <label>Phone</label>
                    <input type="tel" className="form-control-modern" placeholder="Your phone number" />
                  </div>
                  <button className="btn btn-primary-modern">
                    <UserOutlined />
                    Update Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
