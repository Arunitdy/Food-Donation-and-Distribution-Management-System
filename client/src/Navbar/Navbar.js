import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = ({ loginSignin, setSignupVisible, setLoginVisible, setLoginSignin }) => {
  const [navVisible, setNavVisible] = useState(false);
  const navigate = useNavigate();

  const toggleNavMenu = () => {
    setNavVisible(!navVisible);
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  const handleCloseNav = () => {
    setNavVisible(false); // Close nav when menu item is clicked
  };

  return (
    <div className="NavBar">
      <img className="NavBar-logo" src="logo.png" alt="logo" />
      <h1 className="NavBar-logo-name">FoodCare</h1>
      <button className="NavBar-Toggle" onClick={toggleNavMenu}>
        Menu {navVisible ? <span>&#9650;</span> : <span>&#9660;</span>}
      </button>

      <div className="NavButton">
        <Link to="/"><button className="Home individual-NavButton">Home</button></Link>
        <Link to="/about"><button className="About individual-NavButton">About</button></Link>
        <Link to="/services"><button className="Services individual-NavButton">Services</button></Link>
        <Link to="/contact"><button className="Contact individual-NavButton">Contact</button></Link>
        <Link to="/blog"><button className="Blog individual-NavButton">Blog</button></Link>
        <Link to="/help"><button className="Help individual-NavButton">Help</button></Link>
      </div>

      {navVisible && (
        <div className="NavButton-Popup">
          <Link to="/" onClick={handleCloseNav}><button className="Home individual-NavButton">Home</button></Link>
          <Link to="/about" onClick={handleCloseNav}><button className="About individual-NavButton">About</button></Link>
          <Link to="/services" onClick={handleCloseNav}><button className="Services individual-NavButton">Services</button></Link>
          <Link to="/contact" onClick={handleCloseNav}><button className="Contact individual-NavButton">Contact</button></Link>
          <Link to="/blog" onClick={handleCloseNav}><button className="Blog individual-NavButton">Blog</button></Link>
          <Link to="/help" onClick={handleCloseNav}><button className="Help individual-NavButton">Help</button></Link>
      
        </div>
      )}

      {!loginSignin ? (
        <div className="NavBar-Auth">
          <button className="SignUp-button-navBar" onClick={() => { setSignupVisible(true); setLoginVisible(false); }}>Sign Up</button>
          <button className="Login-button-navBar" onClick={() => { setSignupVisible(false); setLoginVisible(true); }}>Login</button>
        </div>
      ) : (
        <div className="NavBar-Auth">
          <button className="NavBar-Auth-profile-button" onClick={handleProfileClick}>
            <img className="NavBar-Auth-profile-button-img" src="profile.png" alt="profile" />
          </button>
        </div>
      )}
    </div>
  );
};
