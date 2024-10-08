import React, { useState } from 'react';
import './Center.css';

export const Center = () => {
  const [donations, setDonations] = useState([]);
  const [inventory, setInventory] = useState({ apples: 50, bread: 30 });

  const acceptDonation = (id) => {
    // Logic to accept a donation
    setDonations(donations.filter((donation) => donation.id !== id));
  };

  return (
    <div className="center-page">
      <h1>Distribution Center</h1>
      <h2>Incoming Donations</h2>
      {donations.length === 0 ? <p>No incoming donations.</p> : 
        <ul>
          {donations.map((donation) => (
            <li key={donation.id}>
              {donation.foodType} - {donation.quantity} <button onClick={() => acceptDonation(donation.id)}>Accept</button>
            </li>
          ))}
        </ul>
      }

      <h2>Inventory</h2>
      <p>Apples: {inventory.apples}</p>
      <p>Bread: {inventory.bread}</p>
      {/* Add more inventory tracking here */}
    </div>
  );
};
