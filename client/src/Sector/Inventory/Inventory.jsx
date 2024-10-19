import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Inventory.css';

export const Inventory = () => {
  const [donations, setDonations] = useState([]);
  const [inventory, setInventory] = useState({ apples: 50, bread: 30 });

  
  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/inventory/all'); 
      setDonations(response.data); 
    } catch (error) {
      console.error('Error fetching donations:', error); 
    }
  };

  const acceptDonation = async (id) => {
    try {
      await axios.post(`/api/donations/${id}/accept`); 
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

  useEffect(() => {
    fetchDonations(); 
  }, []); 

  return (
    <div className="Inventory">
      <h1>Distribution Inventory</h1>
      <h2>Incoming Donations</h2>
      {donations.length === 0 ? (
        <p>No incoming donations.</p>
      ) : (
        <ul>
         {/*} {donations.map((donation) => (
            <li key={donation.id}>
              {donation.foodType} - {donation.quantity} 
              <button onClick={() => acceptDonation(donation.id)}>Accept</button>
            </li>
         ))}*/}
        </ul>
      )}

      <h2>Inventory</h2>
      <p>Apples: {inventory.apples}</p>
      <p>Bread: {inventory.bread}</p>
    </div>
  );
};
