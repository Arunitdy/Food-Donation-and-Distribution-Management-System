import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios'; // Import Axios
import { auth } from '../firebase/firebase'; // You might still want to keep Firebase for authentication

export const Login = ({ setLoginSiginin, setLoginVisible }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sector, setUserSector] = useState(''); // State for sector
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input fields
    if (email === '' || password === '' || sector === '') {
      setErrorMessage('Please fill in all fields.');
      return;
    } else if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    const userInfo = {
      email,
      password,
      sector
    };

    try {
      // Make a POST request to your login API
      const response = await axios.post('https://api.example.com/login', userInfo);
      console.log(response.data); // Handle the response as needed
      setErrorMessage('Login successful!');
      alert("Login successful!");
      setLoginVisible(false); // Close login modal
      setLoginSiginin(false);
      setIsSuccess(true);
      navigate('/');  // Redirect to home page
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Invalid email or password.');
    }
  };

  const closeModal = () => {
    setLoginVisible(false);
  };

  return (
    <div className="login-container">
      <button className="close-button" onClick={closeModal}>✕</button>
      <h2>Login</h2>
      {errorMessage && <p className="error-message" style={{ color: isSuccess ? 'green' : 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Sector</label>
          <select
            className="Login-input"
            value={sector} 
            onChange={(e) => setUserSector(e.target.value)}  
            required
          >
            <option value="" disabled>Select your sector</option>
            <option value="Donor">Donor</option>
            <option value="Center">Center</option>
            <option value="Receiver">Receiver</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            className="Login-input"  
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            className="Login-input"  
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-container-Login-button">Login</button>
      </form>
    </div>
  );
};
