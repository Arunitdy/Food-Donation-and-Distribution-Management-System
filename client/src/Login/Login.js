import './Login.css';
import {auth} from '../firebase/firebase.js';
import React, { useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';

const Login = ({ setLoginVisible, setLoginSiginin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Change color of error message

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    //  email  password validation
    if (email === '' || password === '') {
      setErrorMessage('Please fill in all fields.');
      console.log('setErrorMessage:Please fill in all fields.');
      return;
    } else if (password.length < 2) {
      setErrorMessage('Password must be at least 8 characters long.');
      console.log('setErrorMessage:Password must be at least 8 characters long.');
      return;
    }

    // API call to backend for authentication
    const loginData = { email, password };
    console.log(loginData);
    /*
    try {
      const response = await fetch('http://localhost:8080/login/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.success) {
        setErrorMessage('Login successful!');
        setIsSuccess(true);
        console.log('Login successful!');
        setLoginVisible(false); // Close login modal
        setLoginSiginin(false); // Hide login and create account in NavBar
      } 
      else {
        setErrorMessage('Invalid email or password.');
      }
*/try{

      await signInWithEmailAndPassword(auth,email,password)
      alert("login");
      setErrorMessage('Login successful!');
      setIsSuccess(true);
      console.log('Login successful!');
      setLoginVisible(false); // Close login modal
      setLoginSiginin(false); // Hide login and create account in NavBar
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const closeModal = () => {
    console.log("close login");
    setLoginVisible(false); 
    /*
    const inputs = document.querySelectorAll(".Login-input");
    inputs.forEach(input => {
        input.value = "";
    });
    */
  };

  return (
    <div className="login-container">
      <button className="close-button" onClick={closeModal}>✖</button>
      <h2>Login</h2>
      {errorMessage && (
        <p className="error-message" style={{ color: isSuccess ? 'green' : 'red' }}>
          {errorMessage}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            className="Login-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className="Login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="login-container-Login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export { Login };
