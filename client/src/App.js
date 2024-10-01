import React, { useState , useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Login/Login';
import { Signup } from './Signup/Signup';
import { Home } from './Home/Home';
import { Navbar } from './Navbar/Navbar';
import { Footer } from './Footer/Footer';
import {Donor} from './Sector/Donor/Donor'
import { Center } from './Sector/Center/Center';
import { Receiver } from './Sector/Receiver/Receiver';
import { Employee } from './Sector/Employee/Employee';

function App() {
  const [loginSiginin, setLoginSiginin] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'; // Default to 'true' if logged in
  });
  const [signupVisible, setSignupVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', loginSiginin); // Store login state in local storage
  }, [loginSiginin]);

  return (
    <div className="App">
      <Navbar 
        loginSiginin={loginSiginin} 
        setSignupVisible={setSignupVisible} 
        setLoginVisible={setLoginVisible} 
        setLoginSiginin={setLoginSiginin} 
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Donor" element={<Donor />} />
        <Route path="/Center" element={<Center />} />
        <Route path="/Receiver" element={<Receiver />} />
        <Route path="/Employee" element={<Employee />} />
      </Routes>

      {signupVisible && (
        <Signup 
          setSignupVisible={setSignupVisible} 
          setLoginSiginin={setLoginSiginin} // Ensure this gets updated correctly
        />
      )}
      {loginVisible && (
        <Login 
          setLoginSiginin={setLoginSiginin} 
          setLoginVisible={setLoginVisible} 
        />
      )}

      <Footer />
    </div>
  );
}


export default App;
