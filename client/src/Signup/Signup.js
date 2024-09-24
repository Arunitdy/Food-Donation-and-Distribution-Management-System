// Signup.js
import './Signup.css';
import { auth } from '../firebase/firebase.js';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = ({ setSignupVisible, setLoginSiginin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate fields
    if (username === '' || email === '' || password === '') {
      setErrorMessage('Please fill in all fields.');
      return;
    } else if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    try {
      // Firebase authentication for creating new users
      const response= await createUserWithEmailAndPassword(auth,email, password);
      console.log(response);

      // You can optionally save the username to your backend or Firebase Realtime Database/Firestore
      setErrorMessage('Signup successful!');
      setIsSuccess(true);
      setSignupVisible(false); // Close signup modal
      setLoginSiginin(false); // Hide login and create account in NavBar
    } catch (error) {
      console.error('Error:', error.message);
      if((error.message.includes('auth/email-already-in-use')))
      {
        setErrorMessage('email already in use.');
      }else{
        setErrorMessage('An error occurred during signup. Please try again.');
      }
     
    }
  };

  const closeModal = () => {
    setSignupVisible(false);
  };

  return (
    <div className="signup-container">
      <button className="close-button" onClick={closeModal}>✖</button>
      <h2>Signup</h2>
      {errorMessage && (
        <p className="error-message" style={{ color: isSuccess ? 'green' : 'red' }}>
          {errorMessage}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            className="Signup-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            className="Signup-input"
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
            className="Signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="signup-container-Signup-button" type="submit">Signup</button>
      </form>
    </div>
  );
};

export { Signup };
