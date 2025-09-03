import React from 'react';

const Help = () => {
  return (
    <div className="help-page">
      <div className="container">
        <h1>Help & Support</h1>
        <p className="lead">We're here to help you with any questions or issues you may have.</p>
        
        <div className="help-grid">
          <div className="help-section">
            <h2>Getting Started</h2>
            <ul>
              <li><a href="#account-setup">How to set up your account</a></li>
              <li><a href="#first-login">First time login guide</a></li>
              <li><a href="#security-setup">Setting up security features</a></li>
            </ul>
          </div>
          
          <div className="help-section">
            <h2>Account Management</h2>
            <ul>
              <li><a href="#profile-update">Updating your profile</a></li>
              <li><a href="#password-reset">Resetting your password</a></li>
              <li><a href="#account-recovery">Account recovery process</a></li>
            </ul>
          </div>
          
          <div className="help-section">
            <h2>Transactions</h2>
            <ul>
              <li><a href="#transfer-money">How to transfer money</a></li>
              <li><a href="#payment-methods">Accepted payment methods</a></li>
              <li><a href="#transaction-history">Viewing transaction history</a></li>
            </ul>
          </div>
          
          <div className="help-section">
            <h2>Contact Support</h2>
            <p>If you can't find what you're looking for, our support team is ready to help:</p>
            <ul>
              <li>Email: support@bankly.com</li>
              <li>Phone: +233 (555) 123-4567</li>
              <li>Live Chat: Available 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
