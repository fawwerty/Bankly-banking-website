import React from 'react';

const Policy = () => {
  return (
    <div className="policy-page">
      <div className="container">
        <h1>Privacy Policy & Terms</h1>
        <p className="lead">Learn about how we protect your privacy and the terms of using our services.</p>
        
        <div className="policy-grid">
          <div className="policy-section">
            <h2>Privacy Policy</h2>
            <h3>Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you create an account, make a transaction, or contact customer support.</p>
            
            <h3>How We Use Your Information</h3>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To process transactions and send notifications</li>
              <li>To improve our products and services</li>
              <li>To comply with legal and regulatory requirements</li>
            </ul>
            
            <h3>Information Sharing</h3>
            <p>We do not sell your personal information. We only share information as necessary to provide our services or as required by law.</p>
          </div>
          
          <div className="policy-section">
            <h2>Terms of Service</h2>
            <h3>Account Usage</h3>
            <ul>
              <li>You must be 18 years or older to use our services</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must comply with all applicable laws and regulations</li>
            </ul>
            
            <h3>Service Limitations</h3>
            <p>Our services are provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages.</p>
            
            <h3>Changes to Terms</h3>
            <p>We may update these terms from time to time. We will notify you of any material changes via email or through the app.</p>
          </div>
          
          <div className="policy-section">
            <h2>Cookie Policy</h2>
            <p>We use cookies to improve your experience, analyze site traffic, and personalize content. You can control cookie settings in your browser.</p>
            
            <h3>Types of Cookies We Use</h3>
            <ul>
              <li>Essential cookies for basic functionality</li>
              <li>Analytics cookies to understand usage</li>
              <li>Preference cookies to remember your settings</li>
            </ul>
          </div>
          
          <div className="policy-section">
            <h2>Contact Us</h2>
            <p>If you have questions about our policies:</p>
            <ul>
              <li>Email: legal@bankly.com</li>
              <li>Mail: Bankly Legal Department, 123 Banking Street, Accra, MP 10001</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
