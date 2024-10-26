import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Login/Login';
import { Signup } from './Signup/Signup';
import { Home } from './Home/Home';
import { Navbar } from './Navbar/Navbar';
import { Footer } from './Footer/Footer';
import { Donor } from './Sector/Donor/Donor';
import { Inventory } from './Sector/Inventory/Inventory';
import { Receiver } from './Sector/Receiver/Receiver';
import { Employee } from './Sector/Employee/Employee';
import { Profile } from './Profile/Profile';
import { About } from './Other/About/About';
import { Contact } from './Other/Contact/Contact';
import { Blog } from './Other/Blog/Blog';
import { Services } from './Other/Service/Service';

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
        <Route path="/donor" element={<Donor />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/receiver" element={<Receiver />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/profile" element={<Profile setLoginSiginin={setLoginSiginin} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<Services />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
