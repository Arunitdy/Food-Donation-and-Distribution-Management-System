import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios'; // Import Axios
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

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
      
     // await createUserWithEmailAndPassword(auth, email, password);
      const response = await axios.get('http://localhost:8080/login/all', userInfo);
      console.log(response.data); 
      console.log(userInfo);
      setErrorMessage('Login successful!');
      alert("Login successful!");
      setLoginVisible(false); // Close login modal
      setLoginSiginin(true);
      setIsSuccess(true);
      let sectorPage;
      if( sector === 'Donor' ){
        console.log("Donor");
        sectorPage="/Donor";
       
      } else if( sector === "Inventory" ){
        console.log("Inventory");
        sectorPage="/Inventory";
          
      }else if( sector === 'Receiver' ){
        console.log("Receiver");
        sectorPage="/Receiver";
       
      }else if( sector === 'Employee' ){
        console.log("Employee");
        sectorPage="/Employee";
       
      }else{
        console.log("error to navigate to sector page");
      }
      navigate(sectorPage); 
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
            <option value="Inventory">Inventory</option>
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
