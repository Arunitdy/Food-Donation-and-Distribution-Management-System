
import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { Login } from "./Login/Login.js";
import { Signup } from "./Signup/Signup.js"; 

function useSignButtonListener(ref, setLoginVisible) {
  useEffect(() => {
    const refCurrent = ref.current;
    console.log("refCurrent:", refCurrent);
    const handleClick = () => {
      console.log("Login button pressed");
      setLoginVisible(true);
    };

    if (refCurrent) {
      refCurrent.addEventListener('click', handleClick);
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('click', handleClick);
      }
    };
  }, [ref, setLoginVisible]);
}

function useSignupButtonListener(ref, setSignupVisible) {
  useEffect(() => {
    const refCurrent = ref.current;
    console.log("refCurrent:", refCurrent);
    const handleClick = () => {
      console.log("Signup button pressed");
      setSignupVisible(true);
    };

    if (refCurrent) {
      refCurrent.addEventListener('click', handleClick);
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('click', handleClick);
      }
    };
  }, [ref, setSignupVisible]);
}

function App() {
  const [loginVisible, setLoginVisible] = useState(false); // Manage visibility of Login
  const [signupVisible, setSignupVisible] = useState(false); // Manage visibility of Signup
  const [navVisible, setNavVisible] = useState(false); // For NavButton popup visibility
  const signButtonRef = useRef(null);
  const signupButtonRef = useRef(null); // Ref for the Signup button
  const [loginSiginin, setLoginSiginin] = useState(true); // To toggle login and create-account visibility

  // Use custom hooks for cleaner code
  useSignButtonListener(signButtonRef, setLoginVisible);
  useSignupButtonListener(signupButtonRef, setSignupVisible); // Signup button listener

  const toggleNavMenu = () => {
    setNavVisible(!navVisible);
  };

  return (
    <div className="App">
      {loginVisible && <Login setLoginVisible={setLoginVisible} setLoginSiginin={setLoginSiginin} />}
      {signupVisible && <Signup setSignupVisible={setSignupVisible} setLoginSiginin={setLoginSiginin} />}
      <div className="body">
        <div className="NavBar">
          <img className="NavBar-logo" src="logo.png" alt="logo" />
          <h1 className='NavBar-logo-name'>FoodCare</h1>
          <button className="NavBar-Toggle" onClick={toggleNavMenu}>
            Menu {navVisible ? <span>&#9650;</span> : <span>&#9660;</span>}
          </button>
          <div className="NavButton">
            <button className="Home individual-NavButton">Home</button>
            <button className="Donor individual-NavButton">Donor</button>
            <button className="Center individual-NavButton">Center</button>
            <button className="Receiver individual-NavButton">Receiver</button>
            <button className="Employee individual-NavButton">Employee</button>
          </div>

          {navVisible && (
            <div className="NavButton-Popup">
              <button className="Home individual-NavButton">HOME</button>
              <button className="Donor individual-NavButton">DONOR</button>
              <button className="Center individual-NavButton">CENTER</button>
              <button className="Receiver individual-NavButton">RECEIVER</button>
              <button className="Employee individual-NavButton">EMPLOYEE</button>
            </div>
          )}
          
          {loginSiginin ? (
            <div className="NavBar-Auth">
              <button className="SignUp-button-navBar" ref={signupButtonRef}>Sign Up</button> {/* Sign Up Button */}
              <button className="Login-button-navBar" ref={signButtonRef}>Login</button>
            </div>
          ) : (
            <div className="NavBar-Auth">
              <button className='NavBar-Auth-profile-button'>
                <img className="NavBar-Auth-profile-button-img" src='profile.png' alt='profile'/>
              </button>
            </div>
          )}
        </div>
     

        <footer class="footer">
            <div class="footer-container">
              
                <div class="footer-column">
                    <h3>How to Donate</h3>
                    <ul>
                        <li><a href="#">For Individuals</a></li>
                        <li><a href="#">For Businesses</a></li>
                        <li><a href="#">For Nonprofits</a></li>
                        <li><a href="#">For Developers</a></li>
                        <li><a href="#">For Local Communities</a></li>
                    </ul>
                </div>

              
                <div class="footer-column">
                    <h3>Tools & API</h3>
                    <ul>
                        <li><a href="#">Donation API</a></li>
                        <li><a href="#">Integration Tools</a></li>
                        <li><a href="#">Real-time Distribution</a></li>
                        <li><a href="#">Resource Management</a></li>
                    </ul>
                </div>

                
                <div class="footer-column">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Refund Policy</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <div class="footer-logo"> FoodCare</div>
                    <p class="footer-description">FoodCare is a platform that helps individuals and businesses donate excess food to those in need. Through advanced algorithms, we ensure fast, fair, and efficient distribution.</p>
                    
                  
                    <div class="app-buttons">
                        <img  className="app-button-download"src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play"/>
                        <img  className="app-button-download"src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="App Store"/>
                    </div>
                </div>
               
                 
            </div>
            <div class="social">
                      <a href="" target="_blank">
                         <img src='https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-large-size-PNG.png' class="fa fa-facebook"/>
                      </a>
                      <a href="" target="_blank">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTEEj5FJorXllMEvr7SNuA14DJX6DV7eu09Q&s' class="fa fa-instagram"/>
                      </a>
                      <a href="" target="_blank">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrIbiofxGclX20CWBDtpmjOcbbuqEJS6PrSQ&s' class="fa fa-linkedin"/>
                      </a>
                      <a href="g" target="_blank">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZjIr23tvjBqyt4fGvtFEVdRaQmbRcgMZLuXHfE7Lj0EbMJHy4Q4bm7ZvBQRxMHu435c&usqp=CAU' class="fa fa-youtube"/>                    
                      </a>
            </div>
            <div class="footer-link-container">
              <div class="footer-links">
                <a className='link ' href="#terms-of-service">Terms of Service</a>
                <a className='link ' href="#general-terms">General Terms and Conditions</a>
                <a className='link ' href="#privacy-policy">Privacy Policy</a>
                <a class="footer-copyright">&copy; 2019-2024 NETFLAIRS TECHNOLOGY - All rights reserved.</a>
              </div>
          </div>    
        </footer>
      </div>
    </div>
  );
}

export default App;
