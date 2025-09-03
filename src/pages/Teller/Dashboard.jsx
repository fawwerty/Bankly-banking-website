import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarOutlined, 
  UserOutlined, 
  FileTextOutlined, 
  SecurityScanOutlined,
  BellOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  BankOutlined,
  TransactionOutlined,
  SafetyCertificateOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import '../../styles/teller-dashboard-modern.css';

export default function TellerDashboard({ tellerId }) {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalAmount: 0,
    pendingApprovals: 0,
    activeCustomers: 0,
    dailyRevenue: 0,
    weeklyRevenue: 0
  });

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Simulate dashboard data
      const mockStats = {
        totalTransactions: 1247,
        totalAmount: 847500.50,
        pendingApprovals: 3,
        activeCustomers: 89,
        dailyRevenue: 12500.75,
        weeklyRevenue: 87500.25
      };

      const mockTransactions = [
        {
          id: 1,
          customerName: "Alice Johnson",
          type: "Deposit",
          amount: 5000.00,
          timestamp: "2024-01-15 09:30:00",
          status: "Completed",
          accountNumber: "ACC-2024-0001"
        },
        {
          id: 2,
          customerName: "Bob Smith",
          type: "Withdrawal",
          amount: 2000.00,
          timestamp: "2024-01-15 10:15:00",
          status: "Completed",
          accountNumber: "ACC-2024-0002"
        },
        {
          id: 3,
          customerName: "Carol Davis",
          type: "Transfer",
          amount: 3500.00,
          timestamp: "2024-01-15 11:00:00",
          status: "Pending",
          accountNumber: "ACC-2024-0003"
        },
        {
          id: 4,
          customerName: "David Wilson",
          type: "Deposit",
          amount: 7500.00,
          timestamp: "2024-01-15 11:45:00",
          status: "Completed",
          accountNumber: "ACC-2024-0004"
        },
        {
          id: 5,
          customerName: "Emma Brown",
          type: "Withdrawal",
          amount: 1200.00,
          timestamp: "2024-01-15 12:30:00",
          status: "Completed",
          accountNumber: "ACC-2024-0005"
        }
      ];

      const mockApprovals = [
        {
          id: 1,
          customerName: "David Wilson",
          type: "Large Withdrawal",
          amount: 10000.00,
          reason: "Manager approval required",
          requestedAt: "2024-01-15 08:45:00",
          accountNumber: "ACC-2024-0004"
        },
        {
          id: 2,
          customerName: "Emma Brown",
          type: "Account Opening",
          amount: 0,
          reason: "New customer verification",
          requestedAt: "2024-01-15 09:20:00",
          accountNumber: "NEW-ACCOUNT"
        },
        {
          id: 3,
          customerName: "Frank Miller",
          type: "Loan Application",
          amount: 25000.00,
          reason: "Loan approval required",
          requestedAt: "2024-01-15 10:30:00",
          accountNumber: "LOAN-2024-0001"
        }
      ];

      const mockNotifications = [
        {
          id: 1,
          type: 'warning',
          title: 'Daily Cash Limit',
          message: 'Approaching daily cash limit',
          time: '5 min ago',
          read: false
        },
        {
          id: 2,
          type: 'info',
          title: 'System Update',
          message: 'New features available in transaction processing',
          time: '1 hour ago',
          read: true
        },
        {
          id: 3,
          type: 'success',
          title: 'Backup Complete',
          message: 'Daily backup completed successfully',
          time: '2 hours ago',
          read: true
        }
      ];

      setStats(mockStats);
      setRecentTransactions(mockTransactions);
      setPendingApprovals(mockApprovals);
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'Pending': return '#f59e0b';
      case 'Failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Completed': { bg: '#d1fae5', text: '#065f46', border: '#34d399' },
      'Pending': { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' },
      'Failed': { bg: '#fee2e2', text: '#b91c1c', border: '#ef4444' }
    };
    
    const color = colors[status] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
    
    return (
      <span 
        className="status-badge"
        style={{ 
          backgroundColor: color.bg,
          color: color.text,
          border: `1px solid ${color.border}`
        }}
      >
        {status}
      </span>
    );
  };

  const handleApprove = (approvalId) => {
    setPendingApprovals(prev => prev.filter(approval => approval.id !== approvalId));
    // Simulate API call
  };

  const handleReject = (approvalId) => {
    setPendingApprovals(prev => prev.filter(approval => approval.id !== approvalId));
    // Simulate API call
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDateTime = (dateTime) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateTime));
  };

  if (isLoading) {
    return (
      <div className="teller-dashboard-modern">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="teller-dashboard-modern">
      {/* Header Section */}
      <div className="dashboard-header-modern">
        <div className="header-content">
          <h1 className="dashboard-title">
            <BankOutlined className="title-icon" />
            Teller Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's your daily overview and quick access to banking operations
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

      {/* Stats Grid */}
      <div className="stats-grid-modern">
        <div className="stat-card-modern">
          <div className="stat-icon-modern" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            <DollarOutlined />
          </div>
          <div className="stat-content-modern">
            <h3>{formatCurrency(stats.totalAmount)}</h3>
            <p>Total Processed</p>
            <span className="stat-trend positive">+12.5% today</span>
          </div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-icon-modern" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
            <BarChartOutlined />
          </div>
          <div className="stat-content-modern">
            <h3>{stats.totalTransactions.toLocaleString()}</h3>
            <p>Transactions</p>
            <span className="stat-trend positive">+8.2% this week</span>
          </div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-icon-modern" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
            <ClockCircleOutlined />
          </div>
          <div className="stat-content-modern">
            <h3>{stats.pendingApprovals}</h3>
            <p>Pending Approvals</p>
            <span className="stat-trend neutral">Requires attention</span>
          </div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-icon-modern" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
            <TeamOutlined />
          </div>
          <div className="stat-content-modern">
            <h3>{stats.activeCustomers}</h3>
            <p>Active Customers</p>
            <span className="stat-trend positive">+3 today</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-content-grid">
        {/* Recent Transactions */}
        <div className="content-card">
          <div className="card-header">
            <h2>
              <TransactionOutlined />
              Recent Transactions
            </h2>
            <span className="view-all-link">View All →</span>
          </div>
          <div className="card-content">
            <div className="modern-table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map(transaction => (
                    <tr key={transaction.id} className="table-row">
                      <td>
                        <div className="customer-info">
                          <div className="customer-name">{transaction.customerName}</div>
                          <div className="account-number">{transaction.accountNumber}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`transaction-type ${transaction.type.toLowerCase()}`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="amount-cell">
                        <span className={`amount ${transaction.type.toLowerCase()}`}>
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td className="time-cell">
                        {formatDateTime(transaction.timestamp)}
                      </td>
                      <td>
                        {getStatusBadge(transaction.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="content-card">
          <div className="card-header">
            <h2>
              <SafetyCertificateOutlined />
              Pending Approvals
            </h2>
            <span className="badge">{pendingApprovals.length}</span>
          </div>
          <div className="card-content">
            <div className="approvals-list">
              {pendingApprovals.map(approval => (
                <div key={approval.id} className="approval-item">
                  <div className="approval-info">
                    <div className="approval-customer">
                      <strong>{approval.customerName}</strong>
                      <span className="account-number">{approval.accountNumber}</span>
                    </div>
                    <div className="approval-details">
                      <span className="approval-type">{approval.type}</span>
                      {approval.amount > 0 && (
                        <span className="approval-amount">{formatCurrency(approval.amount)}</span>
                      )}
                    </div>
                    <div className="approval-reason">{approval.reason}</div>
                    <div className="approval-time">
                      Requested: {formatDateTime(approval.requestedAt)}
                    </div>
                  </div>
              <div className="approval-actions" style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn-approve"
                  onClick={() => handleApprove(approval.id)}
                >
                  Approve
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleReject(approval.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="content-card">
          <div className="card-header">
            <h2>
              <BellOutlined />
              Quick Actions
            </h2>
          </div>
          <div className="card-content">
            <div className="quick-actions-grid">
              <Link to="/teller/transactions" className="action-card-modern">
                <div className="action-icon">
                  <DollarOutlined />
                </div>
                <div className="action-content">
                  <h4>Process Transaction</h4>
                  <p>Handle deposits, withdrawals, and transfers</p>
                </div>
                <div className="action-arrow">→</div>
              </Link>

              <Link to="/teller/accounts" className="action-card-modern">
                <div className="action-icon">
                  <UserOutlined />
                </div>
                <div className="action-content">
                  <h4>Manage Accounts</h4>
                  <p>View and manage customer accounts</p>
                </div>
                <div className="action-arrow">→</div>
              </Link>

              <Link to="/teller/Reports" className="action-card-modern">
                <div className="action-icon">
                  <FileTextOutlined />
                </div>
                <div className="action-content">
                  <h4>View Reports</h4>
                  <p>Access transaction reports and analytics</p>
                </div>
                <div className="action-arrow">→</div>
              </Link>

              <Link to="/security" className="action-card-modern">
                <div className="action-icon">
                  <SecurityScanOutlined />
                </div>
                <div className="action-content">
                  <h4>Security Tools</h4>
                  <p>Security and verification tools</p>
                </div>
                <div className="action-arrow">→</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="content-card">
          <div className="card-header">
            <h2>
              <BellOutlined />
              Notifications
            </h2>
            <span className="badge">{notifications.filter(n => !n.read).length}</span>
          </div>
          <div className="card-content">
            <div className="notifications-list">
              {notifications.map(notification => (
                <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                  <div className="notification-icon">
                    {notification.type === 'warning' && <ExclamationCircleOutlined />}
                    {notification.type === 'info' && <InfoCircleOutlined />}
                    {notification.type === 'success' && <CheckCircleOutlined />}
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {!notification.read && <div className="unread-dot"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
