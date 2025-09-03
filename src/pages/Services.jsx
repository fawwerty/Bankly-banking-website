import React from 'react';

const Services = () => {
  return (
    <div className="services-page">
      <div className="container">
        <h1>Our Services</h1>
        <div className="services-grid">
          <div className="service-card">
            <h3>Digital Banking</h3>
            <p>Access your accounts anytime, anywhere with our secure digital banking platform.</p>
          </div>
          <div className="service-card">
            <h3>Money Transfers</h3>
            <p>Send and receive money instantly with our fast and reliable transfer services.</p>
          </div>
          <div className="service-card">
            <h3>Savings & Investments</h3>
            <p>Grow your wealth with our competitive savings accounts and investment options.</p>
          </div>
          <div className="service-card">
            <h3>Loans & Credit</h3>
            <p>Get the financial support you need with our flexible loan and credit solutions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
