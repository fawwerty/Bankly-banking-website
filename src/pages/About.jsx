import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>About Bankly</h1>
        <div className="about-content">
          <p>
            Welcome to Bankly, your trusted partner in modern banking solutions. We are dedicated to providing 
            innovative financial services that make your life easier and more convenient.
          </p>
          <p>
            Founded with the vision of making banking accessible to everyone, Bankly combines cutting-edge technology 
            with personalized service to deliver exceptional banking experiences.
          </p>
          <div className="features">
            <h2>Our Mission</h2>
            <ul>
              <li>Provide secure and reliable banking services</li>
              <li>Make financial services accessible to everyone</li>
              <li>Deliver exceptional customer experiences</li>
              <li>Drive innovation in the banking sector</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
