import React, { useRef, useEffect } from 'react';
import './App.css';
import {Login ,signinFunction} from "./Login/Login.js";

// Custom hook to handle event listener
function useSignButtonListener(ref) {
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('click', () => {
        signinFunction();
      });
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('click', () => {
          signinFunction()
        });
      }
    };
  }, [ref]);
}

function App() {
  const signButtonRef = useRef(null);

  // Use custom hook for cleaner code
  useSignButtonListener(signButtonRef);

  return (
    <div className="App">
      <div className='NavBar'>
        <Login />
        <div className='NavButton'>
          <button className='Donor individual-NavButton'>Donor</button>
          <button className='Center individual-NavButton'>Center</button>
          <button className='Receiver individual-NavButton'>Receiver</button>
          <button className='Employee individual-NavButton'>Employee</button>
        </div>
        <button className='Sign' ref={signButtonRef}>Sign_</button>
      </div>
    </div>
  );
}

export default App;
