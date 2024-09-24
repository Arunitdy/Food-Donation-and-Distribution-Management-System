import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const Signup = ({ setSignupVisible, setLoginSiginin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

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
      await createUserWithEmailAndPassword(auth, email, password);
      setErrorMessage('Signup successful!');
      setIsSuccess(true); // Indicate success
      setSignupVisible(false); // Close signup modal
      setLoginSiginin(false);
      navigate('/'); // Redirect to home page
    } catch (error) {
      setErrorMessage(error.message.includes('auth/email-already-in-use') ? 'Email already in use.' : 'An error occurred during signup.');
    }
  };

  const closeModel = () => {
    setSignupVisible(false);
  };

  return (
    <div className="signup-container">
      <button className="close-button" onClick={closeModel}>✕</button> 
      <h2>Signup</h2>
      {errorMessage && <p className="error-message" style={{ color: isSuccess ? 'green' : 'red' }}>{errorMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input 
            type="text" 
            className="Signup-input"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder='Enter your username'
            required
          />
        </div>
        
        <div>
          <label>Email</label>
          <input 
            type="email" 
            className="Signup-input"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter your email'
            required
          />
        </div>
        
        <div>
          <label>Password</label>
          <input 
            type="password" 
            className="Signup-input"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Enter your password'
            required
          />
        </div>
        
        <button type="submit" className="signup-container-Signup-button">Signup</button>
      </form>
    </div>
  );
};
