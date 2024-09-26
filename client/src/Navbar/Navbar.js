import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = ({ loginSiginin, setSignupVisible, setLoginVisible }) => {
  const [navVisible, setNavVisible] = useState(false);
  const navigate = useNavigate();

  const toggleNavMenu = () => {
    setNavVisible(!navVisible);
  };

  return (
    <div className="NavBar">
      <img className="NavBar-logo" src="logo.png" alt="logo" />
      <h1 className='NavBar-logo-name'>FoodCare</h1>
      <button className="NavBar-Toggle" onClick={toggleNavMenu}>
        Menu {navVisible ? <span>&#9650;</span> : <span>&#9660;</span>}
      </button>

      <div className="NavButton">
          <Link to="/"><button className="Home individual-NavButton">Home</button></Link>
          <Link to='/'> <button className="Donor individual-NavButton">About</button></Link>
          <Link to="/"><button className="Services individual-NavButton">Services</button></Link>
          <Link to="/"><button className="Contact individual-NavButton">Contact</button></Link>
          <Link to="/"><button className="Blog individual-NavButton">Blog</button></Link>
      </div>

      {navVisible && (
        <div className="NavButton-Popup">
          <Link to="/"><button className="Home individual-NavButton">Home</button></Link>
          <Link to='/'><button className="Donor individual-NavButton">About</button></Link>
          <Link to="/"><button className="Services individual-NavButton">Services</button></Link>
          <Link to="/"><button className="Contact individual-NavButton">Contact</button></Link>
          <Link to="/"><button className="Blog individual-NavButton">Blog</button></Link>
        </div>
      )}

      {loginSiginin ? (
        <div className="NavBar-Auth">
          <button className="SignUp-button-navBar" onClick={() => setSignupVisible(true)}>Sign Up</button>
          <button className="Login-button-navBar" onClick={() => setLoginVisible(true)}>Login</button>
        </div>
      ) : (
        <div className="NavBar-Auth">
          <button className='NavBar-Auth-profile-button'>
            <img className="NavBar-Auth-profile-button-img" src='profile.png' alt='profile'/>
          </button>
        </div>
      )}
    </div>
  );
};
