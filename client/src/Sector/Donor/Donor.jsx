import React, { useState } from 'react';
import './Donor.css';

export const Donor = () => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [address, setAddress] = useState(''); // New state for address
  const [phone, setPhone] = useState(''); // New state for phone number
  const [name, setName] = useState(''); // New state for donor name
  const [aadhaar, setAadhaar] = useState(''); // New state for Aadhaar number
  const [donationHistory, setDonationHistory] = useState([]);

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    // Handle donation logic
    setDonationHistory([
      ...donationHistory,
      { foodType, quantity, expiryDate, pickupTime, address, phone, name, aadhaar, status: 'Pending' }
    ]);
  };

  return (
    <div className="donor">
      <h1>Donor Page</h1>

      {/* Schedule Donation Form */}
      <form onSubmit={handleDonationSubmit}>
        <div>
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            placeholder="Enter your name" 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Address</label>
          <input 
            type="text" 
            value={address} 
            placeholder="Enter your address" 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input 
            type="tel" 
            value={phone} 
            placeholder="Enter your phone number" 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Aadhaar Number</label>
          <input 
            type="text" 
            value={aadhaar} 
            placeholder="Enter your Aadhaar number" 
            onChange={(e) => setAadhaar(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Food Type</label>
          <input 
            type="text" 
            value={foodType} 
            placeholder="Enter type of food" 
            onChange={(e) => setFoodType(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Quantity (Kg)</label>
          <input 
            type="number" 
            value={quantity} 
            placeholder="Enter quantity in kg" 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Expiry Date</label>
          <input 
            type="date" 
            value={expiryDate} 
            onChange={(e) => setExpiryDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Pickup Time</label>
          <input 
            type="time" 
            value={pickupTime} 
            onChange={(e) => setPickupTime(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Schedule Donation</button>
      </form>

      {/* Donation History */}
      <h2>Your Donation History</h2>
      <ul>
        {donationHistory.map((donation, index) => (
          <li key={index}>
            {`Name: ${donation.name}, Address: ${donation.address}, Phone: ${donation.phone}, Aadhaar: ${donation.aadhaar}, 
            Food: ${donation.foodType}, Quantity: ${donation.quantity}kg, Expiry: ${donation.expiryDate}, Pickup: ${donation.pickupTime}, Status: ${donation.status}`}
          </li>
        ))}
      </ul>
    </div>
  );
};
