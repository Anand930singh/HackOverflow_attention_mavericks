// Footer.js
import React from 'react';
import './Footer.css'; // Importing CSS for styling
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>Information about the government agency or organization.</p>
        </div>
        <div className="footer-column">
          <h3>Important Notices</h3>
          <ul>
            <li>Announcement 1</li>
            <li>Notice 1</li>
            <li>Additional Item 1</li>
            <li>Additional Item 2</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            {/* Add more links as needed */}
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <div className="social-icons">
            <FaFacebook className="icon" />
            <FaInstagram className="icon" />
            <FaLinkedin className="icon" />
            <FaYoutube className="icon" />
            <FaEnvelope className="icon" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
