import './Login.css';
import React, { useState } from 'react';

const Login = ({ setLoginVisible, setLoginSiginin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Change color of error message

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Basic validation
    if (email === '' || password === '') {
      setErrorMessage('Please fill in all fields.');
      console.log('setErrorMessage:Please fill in all fields.');
      return;
    } else if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      console.log('setErrorMessage:Password must be at least 8 characters long.');
      return;
    }

    // API call to backend for authentication
    const loginData = { email, password };
    console.log(loginData);
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
        // Handle successful login (e.g., save token, redirect)
        setErrorMessage('Login successful!');
        setIsSuccess(true);
        console.log('Login successful!');
        setLoginVisible(false); // Close login modal
        setLoginSiginin(false); // Hide login and create account in NavBar
      } else {
        // Handle failed login
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
      
      setLoginVisible(false); // Close login modal
      setLoginSiginin(false); // Hide login and create account in NavBar
    }
  };

  const closeModal = () => {
    console.log("close login");
    setLoginVisible(false); // Close the login component
   
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
