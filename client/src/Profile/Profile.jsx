import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export const Profile = ({ setLoginSiginin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication (set loginSiginin to false)
    setLoginSiginin(false);
    // Redirect to home page
    navigate('/');
  };

  const handleDeleteAccount = () => {
    // Add account deletion logic here
    alert('Account deleted successfully!');
    setLoginSiginin(false);
    navigate('/');
  };

  return (
    <div className="ProfilePage">
      <h1>User Profile</h1>
      <div className="UserDetails">
        {/* Display user details here */}
        <p>Username: User123</p>
        <p>Email: user@example.com</p>
      </div>
      <button className="LogoutButton" onClick={handleLogout}>Logout</button>
      <button className="DeleteAccountButton" onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};
