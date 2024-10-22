import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Donation Section */}
        <div className="footer-column">
          <h3>How to Donate</h3>
          <ul>
            <li><a href="#">For Individuals</a></li>
            <li><a href="#">For Businesses</a></li>
            <li><a href="#">For Nonprofits</a></li>
            <li><a href="#">For Developers</a></li>
            <li><a href="#">For Local Communities</a></li>
          </ul>
        </div>

        {/* Tools & API Section */}
        <div className="footer-column">
          <h3>Tools & API</h3>
          <ul>
            <li><a href="#">Donation API</a></li>
            <li><a href="#">Integration Tools</a></li>
            <li><a href="#">Real-time Distribution</a></li>
            <li><a href="#">Resource Management</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* App & Social Section */}
        <div className="footer-column">
          <div className="footer-logo">FoodCare</div>
          <p className="footer-description">
            FoodCare is a platform that helps individuals and businesses donate excess food to those in need. Through advanced algorithms, we ensure fast, fair, and efficient distribution.
          </p>

          <div className="app-buttons">
            <img className="app-button-download" src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
            <img className="app-button-download" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" />
          </div>
        </div>
      </div>

      {/* Social Media Links 
      <div className="social">
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src='https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-large-size-PNG.png' alt="Facebook" className="fa fa-facebook" />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTEEj5FJorXllMEvr7SNuA14DJX6DV7eu09Q&s' alt="Instagram" className="fa fa-instagram" />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrIbiofxGclX20CWBDtpmjOcbbuqEJS6PrSQ&s' alt="LinkedIn" className="fa fa-linkedin" />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZjIr23tvjBqyt4fGvtFEVdRaQmbRcgMZLuXHfE7Lj0EbMJHy4Q4bm7ZvBQRxMHu435c&usqp=CAU' alt="YouTube" className="fa fa-youtube" />
        </a>
      </div>
*/}
      {/* Footer Links */}
      <div className="footer-link-container">
        <div className="footer-links">
          <a className="link" href="#terms-of-service">Terms of Service</a>
          <a className="link" href="#general-terms">General Terms and Conditions</a>
          <a className="link" href="#privacy-policy">Privacy Policy</a>
          <p className="footer-copyright">&copy; 2019-2024 NETFLAIRS TECHNOLOGY - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


