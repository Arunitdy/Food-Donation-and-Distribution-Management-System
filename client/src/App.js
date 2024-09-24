import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { Login } from "./Login/Login.js";

function useSignButtonListener(ref, setLoginVisible) {
  useEffect(() => {
    const refCurrent = ref.current;
    console.log("refCurrent:",refCurrent)
    const handleClick = () => {
      console.log("Sign button pressed");
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

function App() {
  const [loginVisible, setLoginVisible] = useState(false); // Manage visibility of Login
  const [navVisible, setNavVisible] = useState(false); // For NavButton popup visibility
  const signButtonRef = useRef(null);
  const [loginSiginin, setLoginSiginin] = useState(true); // To toggle login and create-account visibility

  // Use custom hook for cleaner code
  useSignButtonListener(signButtonRef, setLoginVisible);

  const toggleNavMenu = () => {
    setNavVisible(!navVisible);
  };

  return (
    <div className="App">
      {loginVisible && <Login setLoginVisible={setLoginVisible} setLoginSiginin={setLoginSiginin} />}
      
      <div className="body">
        <div className="NavBar">
          <img className="NavBar-logo" src="logo.png" alt="logo" />

          <button className="NavBar-Toggle" onClick={toggleNavMenu}>Menu 
             {navVisible ? <span>&#9650;</span> : <span>&#9660;</span>}  
          </button>
          {navVisible ? (
            <div className="NavButton-Popup">
              <button className="individual-NavButton">Home</button>
              <button className="individual-NavButton">Donor</button>
              <button className="individual-NavButton">Center</button>
              <button className="individual-NavButton">Receiver</button>
              <button className="individual-NavButton">Employee</button>
            </div>
          ):(
          <div className="NavButton">
            <button className="Home individual-NavButton">Home</button>
            <button className="Donor individual-NavButton">Donor</button>
            <button className="Center individual-NavButton">Center</button>
            <button className="Receiver individual-NavButton">Receiver</button>
            <button className="Employee individual-NavButton">Employee</button>
          </div>)}
          
          {loginSiginin ? (
            <div className="NavBar-Auth">
              <a className="navBar-a-creat-new-account" href="#">
                Create a new account
              </a>
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
      </div>
    </div>
  );
}

export default App;
