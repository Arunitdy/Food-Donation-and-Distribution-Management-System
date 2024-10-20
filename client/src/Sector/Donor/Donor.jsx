import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Donor.css';

export const Donor = () => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [address, setAddress] = useState('');
  const [phoneno, setPhone] = useState('');
  const [name, setName] = useState('');
  const [aadhaarno, setAadhaar] = useState('');
  const [donationHistory, setDonationHistory] = useState([]);
  const [receiverRequests, setReceiverRequests] = useState([]);

  // Fetch donation history
  const fetchDonationHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/donors/all');
      setDonationHistory(response.data);
    } catch (error) {
      console.error('Error fetching donation history:', error);
    }
  };

  // Fetch receiver requests
  const fetchReceiverRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/receivers/all'); 
      setReceiverRequests(response.data);
    } catch (error) {
      console.error('Error fetching receiver requests:', error);
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
      phoneno,
      name,
      aadhaarno,
      status: 'Pending',
    };

    try {
      const response = await axios.post('http://localhost:8080/donors/add', newDonation);
      setDonationHistory([...donationHistory, response.data]);
      // Reset form fields
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

  // Handle deleting donations
  const handleDeleteDonation = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/donors/delete/${id}`);
      setDonationHistory(donationHistory.filter(donation => donation.id !== id));
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  // Handle accepting a receiver request
  const handleAcceptRequest = async (id) => {
    try {
      await axios.put(`http://localhost:8080/receivers/update/${id}`, { status: 'Accepted' }); // Update status to 'Accepted'
      setReceiverRequests(receiverRequests.map(request => 
        request.id === id ? { ...request, status: 'Accepted' } : request
      ));
    } catch (error) {
      console.error('Error accepting the request:', error);
    }
  };

  useEffect(() => {
    fetchDonationHistory();
    fetchReceiverRequests(); // Fetch receiver requests on component mount
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
            type="number" 
            value={phoneno} 
            placeholder="Enter your phone number" 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Aadhaar Number</label>
          <input 
            type="number" 
            value={aadhaarno} 
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
            placeholder="Enter quantity (number of people)" 
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
      <ul className="donor-requests">
        {donationHistory.length > 0 ? (
          donationHistory.map((donation, index) => (
            <li key={index} className={`request-item`}>
              <div className="task-details">
                <strong>Name:</strong> {donation.name || 'N/A'}<br />
                <strong>Address:</strong> {donation.address || 'N/A'}<br />
                <strong>Phone:</strong> {donation.phoneno || 'N/A'}<br />
                <strong>Aadhaar:</strong> {donation.aadhaarno || 'N/A'}<br />
                <strong>Food Type:</strong> {donation.foodType || 'N/A'}<br />
                <strong>Quantity:</strong> {donation.quantity} <br />
                <strong>Expiry Date:</strong> {donation.expiryDate}<br />
                <strong>Pickup Time:</strong> {donation.pickupTime}<br />
                <strong>Status:</strong> {donation.status || 'N/A'}
                {donation.status !== 'Delivering' && (
                  <button onClick={() => handleDeleteDonation(donation.id)}>Delete</button>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>No donation history available</p>
        )}
      </ul>

      {/* Receiver Requests */}
      <h2>Receiver Requests</h2>
      <ul className="receiver-requests">
        {receiverRequests.length > 0 ? (
          receiverRequests.map((request, index) => (
            <li key={index} className={`request-item`}>
              <div className="task-details">
                <strong>Name:</strong> {request.name}<br />
                <strong>Food Type:</strong> {request.foodType}<br />
                <strong>Quantity Needed:</strong> {request.quantityNeeded} kg<br />
                <strong>Status:</strong> {request.status}
                <button onClick={() => handleAcceptRequest(request.id)} className="donate-button">
                  Donate
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No receiver requests available</p>
        )}
      </ul>
    </div>
  );
};
