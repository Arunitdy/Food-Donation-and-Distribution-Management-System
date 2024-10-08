import React, { useState } from 'react';
import './Donor.css';

export const Donor = () => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [donationHistory, setDonationHistory] = useState([]);

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    // Handle donation logic
    setDonationHistory([...donationHistory, { foodType, quantity, expiryDate, pickupTime, status: 'Pending' }]);
  };

  return (
    <div className="donor">
      <h1>Donor Page</h1>

      {/* Schedule Donation Form */}
      <form onSubmit={handleDonationSubmit}>
        <div>
          <label>Food Type</label>
          <input type="text" value={foodType}  placeholder="Enter type of Food"onChange={(e) => setFoodType(e.target.value)} />
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" value={quantity} placeholder="Kg"onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div>
          <label>Expiry Date</label>
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </div>
        <div>
          <label>Pickup Time</label>
          <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
        </div>
        <button type="submit">Schedule Donation</button>
      </form>

      {/* Donation History */}
      <h2>Your Donation History</h2>
      <ul>
        {donationHistory.map((donation, index) => (
          <li key={index}>{`${donation.foodType} -${donation.quantity} -${donation.expiryDate}- ${donation.pickupTime} - ${donation.status}`}</li>
        ))}
      </ul>
    </div>
  );
};
