import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isAdmin } from '../utils/roleUtils';
import '../styles/admin-dashboard.css';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin(user)) {
    navigate('/dashboard');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const adminMenu = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'User Management', icon: '👥' },
    { path: '/admin/accounts', label: 'All Accounts', icon: '💰' },
    { path: '/admin/transactions', label: 'All Transactions', icon: '📈' },
    { path: '/admin/audit', label: 'Audit Logs', icon: '📋' },
    { path: '/admin/settings', label: 'System Settings', icon: '⚙️' }
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h3>Admin Panel</h3>
          <p>Welcome, {user?.name}</p>
        </div>

        <nav>
          <ul className="admin-nav">
            {adminMenu.map((item) => (
              <li key={item.path} className="admin-nav-item">
                <Link
                  to={item.path}
                  className="admin-nav-link"
                >
                  <span style={{ marginRight: '10px' }}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <button
            onClick={handleLogout}
            className="admin-logout-btn"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}
