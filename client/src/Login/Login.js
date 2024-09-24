import React, { useState } from 'react';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
//import { signInWithEmailAndPassword } from 'firebase/auth';
//import { auth } from '../firebase/firebase';

export const Login = ({ setLoginSiginin,setLoginVisible }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess,setIsSuccess]=useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === '' || password === '') {
      setErrorMessage('Please fill in all fields.');
      console.log("setErrorMessage:Please fill in all fields.")
      return;
    } else if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      console.log("setErrorMessage:Password must be at least 8 characters long.");
      return;
    }
   const logindata={email,password};
    try {
      //await signInWithEmailAndPassword(auth, email, password);
      
      const response = await axios.post('http://localhost:8080/login/add', logindata);
      const data=await response.json();
      console.log(data); 

      setErrorMessage('Login successful!');
      alert("login successful!");
      console.log('Login successful!');
      setLoginVisible(false); // Close login modal
      setLoginSiginin(false);
      setIsSuccess(true);
      navigate('/');  // Redirect to home page
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred during login.');
      console.log("setErrorMessage:'Invalid email or password.'");
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
    <button className="close-button" onClick={closeModal}>✕</button>
    <h2>Login</h2>
    {errorMessage && <p className="error-message" style={{ color: isSuccess ? 'green' : 'red' }}>    {errorMessage}</p>}
  
    <form onSubmit={handleSubmit}>
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
