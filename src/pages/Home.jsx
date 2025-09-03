import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hover-underline">Welcome to Bankly</h1>
          <p>Your trusted partner for secure and convenient banking</p>
          {!user && (
            <Link to="/login" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Get Started Today
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">
            Banking Made Simple
          </h2>
          <div className="features-grid">
            <div className="card">
              <h3>💳 Digital Banking</h3>
              <p>Access your accounts 24/7 with our secure online banking platform. Transfer funds, pay bills, and manage your finances from anywhere.</p>
            </div>
            <div className="card">
              <h3>🔒 Security First</h3>
              <p>Your security is our priority. We use advanced encryption and multi-factor authentication to protect your accounts.</p>
            </div>
            <div className="card">
              <h3>📱 Mobile Banking</h3>
              <p>Bank on the go with our mobile app. Check balances, deposit checks, and make payments right from your phone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">
            Our Services
          </h2>
          <div className="services-grid">
            <div className="card">
              <h4>Checking Accounts</h4>
              <p>Flexible checking accounts with no monthly fees and free online banking.</p>
            </div>
            <div className="card">
              <h4>Savings Accounts</h4>
              <p>High-yield savings accounts to help your money grow faster.</p>
            </div>
            <div className="card">
              <h4>Loans & Mortgages</h4>
              <p>Competitive rates on personal loans, auto loans, and mortgages.</p>
            </div>
            <div className="card">
              <h4>Investment Services</h4>
              <p>Professional investment advice and portfolio management services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Join thousands of satisfied customers who trust Bankly with their financial needs.
          </p>
          {!user && (
            <Link to="/login" className="btn btn-primary cta-button">
              Open an Account
            </Link>
          )}
          <Link to="/contact" className="btn btn-secondary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
