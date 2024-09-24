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
  const [loginVisible, setLoginVisible] = useState(false); // Manage visibility of Login
  const signButtonRef = useRef(null);

  // Use custom hook for cleaner code
  useSignButtonListener(signButtonRef, setLoginVisible);

  return (
  <div className="App">
    <div> 
      {loginVisible && <Login setLoginVisible={setLoginVisible} />} {/* Render Login when visible */}
          
        <div className='NavBar'>
          {/* NavButton group */}
          <div className='NavButton'>
            <button className='Home individual-NavButton'>Home</button>
            <button className='Donor individual-NavButton'>Donor</button>
            <button className='Center individual-NavButton'>Center</button>
            <button className='Receiver individual-NavButton'>Receiver</button>
            <button className='Employee individual-NavButton'>Employee</button>
          </div>
          
          {/* New container for Create Account link and Login button */}
          <div className="NavBar-Auth">
            <a className='navBar-a-creat-new-account' href="#">
              Create a new account
            </a>
            <button className='Login-button-navBar' ref={signButtonRef}>Login</button>
          </div>
        </div>
      </div>
  </div>
  );
}

export default App;
