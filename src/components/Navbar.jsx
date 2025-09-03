import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getNavigationItems } from '../utils/roleUtils';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigationItems = user ? getNavigationItems(user) : [];

  return (
    <nav className="navbar">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="navbar-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '20px'
              }}>
                B
              </div>
              <span>Bankly</span>
            </div>
          </Link>
          
          <ul className="navbar-nav" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {user ? (
              <>
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <ThemeToggle />
                    <span style={{ color: '#6c757d', fontSize: '14px' }}>
                      {user.name} ({user.role})
                    </span>
                    <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                      Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/services" className="nav-link">Services</Link></li>
                <li><Link to="/about" className="nav-link">About</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>
                <li><ThemeToggle /></li>
                <li><Link to="/login" className="btn btn-primary">Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
