import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { Login } from "./Login/Login.js";

// Custom hook to handle event listener
function useSignButtonListener(ref, setLoginVisible) {
  useEffect(() => {
    const refCurrent = ref.current;
    console.log("refCurrent:",refCurrent)
    const handleClick = () => {
      console.log("sing button pressed")
      setLoginVisible(true);  // Show the Login component
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
  const [loginVisible, setLoginVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const signButtonRef = useRef(null);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      {/* Main NavBar */}
      <div className="NavBar">
        {loginVisible && <Login setLoginVisible={setLoginVisible} />}

        {/* Mobile menu button */}
        <button className="menu-button" onClick={handleMenuClick} ref={menuButtonRef}>
          ☰
        </button>

        {/* SideNav for small screens */}
        <div className={`SideNav ${isMenuOpen ? 'open' : ''}`}>
          <button className="Donor individual-NavButton">Donor</button>
          <button className="Center individual-NavButton">Center</button>
          <button className="Receiver individual-NavButton">Receiver</button>
          <button className="Employee individual-NavButton">Employee</button>
        </div>

        {/* Auth Buttons: Login and Create Account */}
        <div className="NavBar-Auth">
          <a className="navBar-a-create-new-account" href="#">Create a new account</a>
          <button className="Login-button-navBar" ref={signButtonRef}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default App;
