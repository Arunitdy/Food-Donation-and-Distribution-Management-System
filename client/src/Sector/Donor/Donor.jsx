import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Donor.css';

export const Donor = () => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [donationHistory, setDonationHistory] = useState([]);

  const fetchDonationHistory = async () => {
    try {
      const response = await axios.get('/api/donor/history'); 
      setDonationHistory(response.data); 
    } catch (error) {
      console.error('Error fetching donation history:', error); 
    }
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    const newDonation = {
      foodType,
      quantity,
      expiryDate,
      pickupTime,
      address,
      phone,
      name,
      aadhaar,
      status: 'Pending',
    };

    try {
      const response = await axios.post('http://localhost:8080/donors/add', newDonation);
      console.log(response)
      //await axios.post('/api/donor/donate', newDonation);
      setDonationHistory([...donationHistory, newDonation]); 

      setFoodType('');
      setQuantity('');
      setExpiryDate('');
      setPickupTime('');
      setAddress('');
      setPhone('');
      setName('');
      setAadhaar('');
    } catch (error) {
      console.error('Error submitting donation:', error); 
    }
  };

  useEffect(() => {
    fetchDonationHistory(); 
  }, []); 

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
        {donationHistory.length > 0 ? (
          donationHistory.map((donation, index) => (
            <li key={index}>
              {`Name: ${donation.name}, Address: ${donation.address}, Phone: ${donation.phone}, Aadhaar: ${donation.aadhaar}, 
              Food: ${donation.foodType}, Quantity: ${donation.quantity}kg, Expiry: ${donation.expiryDate}, Pickup: ${donation.pickupTime}, Status: ${donation.status}`}
            </li>
          ))
        ) : (
          <p>No donation history available</p>
        )}
      </ul>
    </div>
  );
};
