import React from 'react';

const Security = () => {
  return (
    <div className="security-page">
      <div className="container">
        <h1>Security Center</h1>
        <p className="lead">Your security is our top priority. Learn how we protect your information and how you can stay safe.</p>
        
        <div className="security-grid">
          <div className="security-section">
            <h2>Our Security Measures</h2>
            <ul>
              <li><strong>256-bit SSL encryption</strong> for all data transmission</li>
              <li><strong>Two-factor authentication</strong> (2FA) available</li>
              <li><strong>Biometric login</strong> options (fingerprint, face recognition)</li>
              <li><strong>Real-time fraud monitoring</strong> and alerts</li>
              <li><strong>Secure data centers</strong> with 24/7 monitoring</li>
            </ul>
          </div>
          
          <div className="security-section">
            <h2>Your Security Checklist</h2>
            <ul>
              <li>Use strong, unique passwords</li>
              <li>Enable two-factor authentication</li>
              <li>Keep your devices and apps updated</li>
              <li>Never share your login credentials</li>
              <li>Monitor your account regularly</li>
              <li>Log out when using shared devices</li>
            </ul>
          </div>
          
          <div className="security-section">
            <h2>Recognizing Scams</h2>
            <p>Be aware of common scams:</p>
            <ul>
              <li>Phishing emails asking for personal information</li>
              <li>Fake websites that look like Bankly</li>
              <li>Phone calls claiming to be from your bank</li>
              <li>Text messages with suspicious links</li>
            </ul>
          </div>
          
          <div className="security-section">
            <h2>Report Security Issues</h2>
            <p>If you notice any suspicious activity:</p>
            <ul>
              <li>Contact us immediately at security@bankly.com</li>
              <li>Call our 24/7 security hotline: +1 (555) 123-4567</li>
              <li>Use the "Report Issue" feature in your account</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
