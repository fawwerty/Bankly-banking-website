import { useAuth } from '../../context/AuthContext';
import CashflowGraph from '../../components/CashflowGraph'; // Import the cashflow graph component
import '../../styles/admin-dashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Customers', value: '1,234', color: '#3498db' },
    { label: 'Total Vendors', value: '567', color: '#2ecc71' },
    { label: 'Total Invoices', value: '1,890', color: '#e74c3c' },
    { label: 'Total Bills', value: '300', color: '#f39c12' }
  ];

  const recentInvoices = [
    { id: 1, invoice: 'INV-001', date: '2024-01-15', recipient: 'Marilyn Wurman', amount: 'GHS 500', status: 'Paid' },
    { id: 2, invoice: 'INV-002', date: '2024-01-14', recipient: 'John Doe', amount: 'GHS 300', status: 'Pending' },
    { id: 3, invoice: 'INV-003', date: '2024-01-13', recipient: 'Jane Smith', amount: 'GHS 450', status: 'Overdue' },
    { id: 4, invoice: 'INV-004', date: '2024-01-12', recipient: 'Bob Wilson', amount: 'GHS 700', status: 'Paid' }
  ];

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome back, {user?.name}</p>

      {/* Cashflow Graph */}
      <CashflowGraph />

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-stat-card">
            <h3 className="admin-stat-value" style={{ color: stat.color }}>{stat.value}</h3>
            <p className="admin-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Invoices */}
      <div className="admin-content-card">
        <h2>Recent Invoices</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Date</th>
              <th>Recipient</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoice}</td>
                <td>{invoice.date}</td>
                <td>{invoice.recipient}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
