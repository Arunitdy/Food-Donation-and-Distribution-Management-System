import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';


export const Inventory = () => {
  const [donations, setDonations] = useState([]);
  const [inventory, setInventory] = useState({ apples: 50, bread: 30 });

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/donors/all');
      setDonations(response.data.filter(donation => donation.status !== 'Accepted'));
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const acceptDonation = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/donors/update/${id}`, { status: 'Accepted' });
      
      const donation = donations.find((donation) => donation.id === id);
      if (donation) {
        setInventory((prevInventory) => ({
          ...prevInventory,
          [donation.foodType.toLowerCase()]: (prevInventory[donation.foodType.toLowerCase()] || 0) + donation.quantity,
        }));
      }

      setDonations(donations.filter((donation) => donation.id !== id));
    } catch (error) {
      console.error('Error accepting donation:', error);
    }
  };

  const isExpired = (expiryDate) => {
    const today = new Date().toISOString().split('T')[0]; 
    return expiryDate <= today; 
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="inventory">
      <h1>Distribution Inventory</h1>
      <h2>Incoming Donations</h2>
      {donations.length === 0 ? (
        <p>No incoming donations.</p>
      ) : (
        <ul className="donations-list">
          {donations.map((donation) => (
            <li key={donation.id} className="donation-item">
              <strong>Food Type:</strong> {donation.foodType} <br />
              <strong>Quantity:</strong> {donation.quantity}  <br />
              <strong>Expiry Date:</strong> {donation.expiryDate} <br />
              <strong>Pickup Time:</strong> {donation.pickupTime} <br />
              <strong>Status:</strong> {donation.status} <br />
              {!isExpired(donation.expiryDate) && (
                <button onClick={() => acceptDonation(donation.id)}>Accept Donation</button>
              )}
              {isExpired(donation.expiryDate) && (
                <p style={{ color: 'red' }}>Expired</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {/*<h2>Inventory</h2>
      <div className="inventory-details">
        {Object.keys(inventory).map((item) => (
          <p key={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}: {inventory[item]}
          </p>
        ))}
      </div>*/}
    </div>
  );
};
