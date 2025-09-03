import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isTeller } from '../utils/roleUtils';
import '../styles/teller-portal.css';

export default function TellerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isTeller(user)) {
    navigate('/dashboard');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tellerMenu = [
    { path: '/teller/dashboard', label: 'Dashboard', icon: '🏦' },
    { path: '/teller/accounts', label: 'Manage Accounts', icon: '💳' },
    { path: '/teller/transactions', label: 'Process Transactions', icon: '💸' },
    { path: '/teller/customers', label: 'Customer Service', icon: '👤' },
    { path: '/teller/reports', label: 'Daily Reports', icon: '📊' }
  ];

  return (
    <div className="teller-layout">
      {/* Sidebar */}
      <aside className="teller-sidebar">
        <div className="teller-sidebar-header">
          <h3>Teller Portal</h3>
          <p>Welcome, {user?.name}</p>
        </div>

        <nav>
          <ul className="teller-nav">
            {tellerMenu.map((item) => (
              <li key={item.path} className="teller-nav-item">
                <Link
                  to={item.path}
                  className="teller-nav-link"
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
            className="teller-logout-btn"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="teller-main-content">
        <Outlet />
      </main>
    </div>
  );
}
