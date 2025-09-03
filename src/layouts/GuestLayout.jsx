import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function GuestLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#212529', 
        color: 'white', 
        padding: '40px 0', 
        marginTop: 'auto' 
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '40px' 
          }}>
            <div>
              <h3 style={{ marginBottom: '20px' }}>Bankly</h3>
              <p>Your trusted partner for secure and convenient banking solutions.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '20px' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '10px' }}><a href="/about" style={{ color: '#adb5bd', textDecoration: 'none' }}>About Us</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/services" style={{ color: '#adb5bd', textDecoration: 'none' }}>Services</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/contact" style={{ color: '#adb5bd', textDecoration: 'none' }}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '20px' }}>Support</h4>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '10px' }}><a href="/help" style={{ color: '#adb5bd', textDecoration: 'none' }}>Help Center</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/security" style={{ color: '#adb5bd', textDecoration: 'none' }}>Security</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/policy" style={{ color: '#adb5bd', textDecoration: 'none' }}>Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '20px' }}>Contact</h4>
              <p style={{ color: '#adb5bd' }}>Phone: 1-800-BANKLY-1</p>
              <p style={{ color: '#adb5bd' }}>Email: support@bankly.com</p>
            </div>
          </div>
          {/* Social Media Section */}
          <div className="social-media">
            <ul>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f icon"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter icon"></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram icon"></i>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in icon"></i>
                </a>
              </li>
            </ul>
          </div>

          <div style={{ 
            borderTop: '1px solid #495057', 
            marginTop: '20px', 
            paddingTop: '20px', 
            textAlign: 'center',
            color: '#adb5bd'
          }}>
            <p>&copy; 2024 Bankly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
