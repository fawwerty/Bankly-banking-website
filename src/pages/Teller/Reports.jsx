import { useState, useEffect } from 'react';
import { 
  BarChartOutlined, 
  LineChartOutlined, 
  PieChartOutlined,
  DownloadOutlined,
  CalendarOutlined,
  FilterOutlined,
  TeamOutlined
} from '@ant-design/icons';
import '../../styles/teller-dashboard-modern.css';

export default function Reports({ tellerId }) {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const [reportData, setReportData] = useState({
    summary: {
      totalTransactions: 1247,
      totalAmount: 847500.50,
      averageTransaction: 680.00,
      deposits: 750,
      withdrawals: 497,
      transfers: 0
    },
    dailyData: [
      { date: '2024-01-15', deposits: 12500, withdrawals: 8500, transfers: 0 },
      { date: '2024-01-14', deposits: 15200, withdrawals: 9800, transfers: 0 },
      { date: '2024-01-13', deposits: 8900, withdrawals: 6200, transfers: 0 },
      { date: '2024-01-12', deposits: 18700, withdrawals: 12300, transfers: 0 },
      { date: '2024-01-11', deposits: 22100, withdrawals: 15600, transfers: 0 },
      { date: '2024-01-10', deposits: 16800, withdrawals: 11200, transfers: 0 },
      { date: '2024-01-09', deposits: 14300, withdrawals: 9700, transfers: 0 }
    ],
    topCustomers: [
      { name: 'Alice Johnson', totalAmount: 45000, transactions: 23 },
      { name: 'Bob Smith', totalAmount: 38500, transactions: 31 },
      { name: 'Carol Davis', totalAmount: 32200, transactions: 18 },
      { name: 'David Wilson', totalAmount: 28700, transactions: 27 },
      { name: 'Emma Brown', totalAmount: 25100, transactions: 15 }
    ],
    transactionTypes: [
      { type: 'Deposits', count: 750, amount: 425000 },
      { type: 'Withdrawals', count: 497, amount: 422500.50 },
      { type: 'Transfers', count: 0, amount: 0 }
    ]
  });

  const generateReport = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const exportReport = (format) => {
    // Simulate export functionality
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#52c41a';
      case 'Frozen': return '#ff4d4f';
      case 'Closed': return '#d9d9d9';
      default: return '#d9d9d9';
    }
  };

  return (
    <div className="teller-dashboard-modern">
      {/* Header Section */}
      <div className="dashboard-header-modern">
        <div className="header-content">
          <h1 className="dashboard-title">
            <BarChartOutlined className="title-icon" />
            Reports & Analytics
          </h1>
          <p className="dashboard-subtitle">
            Comprehensive transaction and account reports for better insights
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

      {/* Report Controls */}
      <div className="content-card">
        <div className="card-header">
          <h2>
            <FilterOutlined />
            Report Controls
          </h2>
        </div>
        <div className="card-content">
          <div className="report-controls-modern">
            <div className="control-group-modern">
              <label>Report Type</label>
              <select 
                value={reportType} 
                onChange={(e) => setReportType(e.target.value)}
                className="form-control"
              >
                <option value="daily">Daily Summary</option>
                <option value="weekly">Weekly Summary</option>
                <option value="monthly">Monthly Summary</option>
                <option value="quarterly">Quarterly Summary</option>
                <option value="annual">Annual Summary</option>
              </select>
            </div>

            <div className="control-group-modern">
              <label>Date Range</label>
              <div className="date-inputs-modern">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="form-control"
                />
                <span>to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="form-control"
                />
              </div>
            </div>

            <button 
              className="btn-approve" 
              onClick={generateReport}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid-modern">
        <div className="stat-card-modern">
          <div className="stat-icon-modern" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            <BarChartOutlined />
          </div>
          <div className="stat-content-modern">
            <h3>{reportData.summary.totalTransactions.toLocaleString()}</h3>
            <p>Total Transactions</p>
            <span className="stat-trend positive">+12.5% this week</span>
          </div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-icon-modern" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
            <LineChartOutlined />
          </div>
          <div className="stat-content-modern">
            <h3>${reportData.summary.totalAmount.toLocaleString()}</h3>
            <p>Total Amount</p>
            <span className="stat-trend positive">+8.2% this week</span>
          </div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-icon-modern" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
            <PieChartOutlined />
          </div>
          <div className="stat-content-modern">
            <h3>${reportData.summary.averageTransaction.toLocaleString()}</h3>
            <p>Average Transaction</p>
            <span className="stat-trend neutral">Stable</span>
          </div>
        </div>

        <div className="stat-card-modern">
          <div className="stat-icon-modern" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
            <CalendarOutlined />
          </div>
          <div className="stat-content-modern">
            <h3>{reportData.dailyData.length}</h3>
            <p>Days Analyzed</p>
            <span className="stat-trend positive">Last 7 days</span>
          </div>
        </div>
      </div>

      {/* Transaction Breakdown */}
      <div className="content-card">
        <div className="card-header">
          <h2>
            <PieChartOutlined />
            Transaction Breakdown
          </h2>
        </div>
        <div className="card-content">
          <div className="breakdown-grid-modern">
            <div className="breakdown-card-modern">
              <h3>Deposits</h3>
              <div className="breakdown-stats-modern">
                <span className="count">{reportData.summary.deposits} transactions</span>
                <span className="amount">${reportData.transactionTypes[0].amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="breakdown-card-modern">
              <h3>Withdrawals</h3>
              <div className="breakdown-stats-modern">
                <span className="count">{reportData.summary.withdrawals} transactions</span>
                <span className="amount">${reportData.transactionTypes[1].amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="breakdown-card-modern">
              <h3>Transfers</h3>
              <div className="breakdown-stats-modern">
                <span className="count">{reportData.summary.transfers} transactions</span>
                <span className="amount">${reportData.transactionTypes[2].amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="content-card">
        <div className="card-header">
          <h2>
            <TeamOutlined />
            Top Customers by Transaction Volume
          </h2>
        </div>
        <div className="card-content">
          <div className="modern-table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Customer Name</th>
                  <th>Total Amount</th>
                  <th>Transactions</th>
                  <th>Average per Transaction</th>
                </tr>
              </thead>
              <tbody>
                {reportData.topCustomers.map((customer, index) => (
                  <tr key={index} className="table-row">
                    <td>#{index + 1}</td>
                    <td>{customer.name}</td>
                    <td className="amount-cell">
                      <span className="amount deposit">${customer.totalAmount.toLocaleString()}</span>
                    </td>
                    <td>{customer.transactions}</td>
                    <td className="amount-cell">
                      <span className="amount">${(customer.totalAmount / customer.transactions).toFixed(2)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Daily Activity Chart */}
      <div className="content-card">
        <div className="card-header">
          <h2>
            <LineChartOutlined />
            Daily Activity Trend
          </h2>
        </div>
        <div className="card-content">
          <div className="chart-container-modern">
            <div className="chart-placeholder-modern">
              <BarChartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              <p>Daily transaction activity chart would be displayed here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="content-card">
        <div className="card-header">
          <h2>
            <DownloadOutlined />
            Export Report
          </h2>
        </div>
        <div className="card-content">
          <div className="export-options-modern">
            <button className="btn-approve" onClick={() => exportReport('pdf')}>
              <DownloadOutlined />
              Export as PDF
            </button>
            <button className="btn-approve" onClick={() => exportReport('excel')}>
              <DownloadOutlined />
              Export as Excel
            </button>
            <button className="btn-approve" onClick={() => exportReport('csv')}>
              <DownloadOutlined />
              Export as CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
