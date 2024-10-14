import React, { useState , useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Login/Login';
import { Signup } from './Signup/Signup';
import { Home } from './Home/Home';
import { Navbar } from './Navbar/Navbar';
import { Footer } from './Footer/Footer';
import {Donor} from './Sector/Donor/Donor'
import { Inventory } from './Sector/Inventory/Inventory';
import { Receiver } from './Sector/Receiver/Receiver';
import { Employee } from './Sector/Employee/Employee';
import { Profile } from './Profile/Profile';

function App() {
  const [loginSiginin, setLoginSiginin] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'; 
  });
  const [signupVisible, setSignupVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', loginSiginin); 
  }, [loginSiginin]);

  return (
    <div className="App">
      <Navbar 
        loginSiginin={loginSiginin} 
        setSignupVisible={setSignupVisible} 
        setLoginVisible={setLoginVisible} 
        setLoginSiginin={setLoginSiginin} 
      />
      
      {signupVisible && (
        <Signup 
          setSignupVisible={setSignupVisible} 
          setLoginSiginin={setLoginSiginin} 
        />
      )}
      {loginVisible && (
        <Login 
          setLoginSiginin={setLoginSiginin} 
          setLoginVisible={setLoginVisible} 
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Donor" element={<Donor />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Receiver" element={<Receiver />} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/profile" element={<Profile setLoginSiginin={setLoginSiginin} />} />
      </Routes>

      <Footer />
    </div>
  );
}


export default App;