import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Login/Login';
import { Signup } from './Signup/Signup';
import { Home } from './Home/Home';
import { Navbar } from './Navbar/Navbar';
import { Footer } from './Footer/Footer';

function App() {
  const [loginSiginin, setLoginSiginin] = useState(true);
  const [signupVisible, setSignupVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  return (
    <div className="App">
      <Navbar 
        loginSiginin={loginSiginin} 
        setSignupVisible={setSignupVisible} 
        setLoginVisible={setLoginVisible} 
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Removed login and signup from routes */}
      </Routes>

      {/* Only show the modals when their respective states are true */}
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
      
      <Footer />
    </div>
  );
}

export default App;
