import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios'; 

export const Login = ({ setLoginSiginin, setLoginVisible }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sector, setUserSector] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email === '' || password === '' || sector === '') {
            setErrorMessage('Please fill in all fields.');
            return;
        } else if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/login/all');
            const loginList = response.data; 
            const user = loginList.find(user => user.email === email && user.password === password);

            if (user) {
                console.log("Login successful:", user);
                setErrorMessage('Login successful!');
                alert("Login successful!");
                setLoginVisible(false); 
                setLoginSiginin(true);
                setIsSuccess(true);
                
                let sectorPage;
                if (sector === 'Donor') {
                    sectorPage = "/Donor";
                } else if (sector === "Inventory") {
                    sectorPage = "/Inventory";
                } else if (sector === 'Receiver') {
                    sectorPage = "/Receiver";
                } else if (sector === 'Employee') {
                    sectorPage = "/Employee";
                } else {
                    console.log("Error: Unrecognized sector.");
                    return;
                }
                navigate(sectorPage); 
            } else {
              
              console.log("Login faild:", user);
                setErrorMessage('Invalid email or password.');
            }
        } catch (error) {
            console.error('Error fetching login details:', error);
            setErrorMessage('Server error, please try again later.');
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
