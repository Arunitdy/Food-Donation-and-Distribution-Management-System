import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';

export const Inventory = () => {
  const [donations, setDonations] = useState([]);
  const [receiverRequests, setReceiverRequests] = useState([]);
  const [donorDetails, setDonorDetails] = useState({
    name: '',
    address: '',
    phoneno: '',
    foodType: '',
    quantity: ''
  });
  const [receiverDetails, setReceiverDetails] = useState({
    name: '',
    address: '',
    phoneno: '',
    foodType: '',
    quantityNeeded: ''
  });
  const [isDonationFormVisible, setDonationFormVisible] = useState(false);
  const [isReceiverFormVisible, setReceiverFormVisible] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [selectedReceiverId, setSelectedReceiverId] = useState(null);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/donors/all');
      const validDonations = response.data.filter(donation => donation.status !== 'Accepted' && !isExpired(donation.expiryDate));
      setDonations(validDonations);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const fetchReceiverRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/receivers/all');
      setReceiverRequests(response.data.filter(request => request.status !== 'Accepted'));
    } catch (error) {
      console.error('Error fetching receiver requests:', error);
    }
  };

  const handleDonate = (receiverId) => {
    const receiver = receiverRequests.find(req => req.id === receiverId);
    setReceiverDetails({
      name: receiver.name,
      address: receiver.address,
      phoneno: receiver.phoneno,
      foodType: receiver.foodType,
      quantityNeeded: receiver.quantityNeeded
    });
    setSelectedReceiverId(receiverId);
    setReceiverFormVisible(true);
  };

  const handleAcceptDonation = (donationId) => {
    const donation = donations.find(don => don.id === donationId);
    setDonorDetails({
      name: donation.donorName,
      address: donation.donorAddress,
      phoneno: donation.donorPhone,
      foodType: donation.foodType,
      quantity: donation.quantity
    });
    setSelectedDonationId(donationId);
    setDonationFormVisible(true);
  };

  const handleSubmitDonation = async () => {
    if (!donorDetails.name || !donorDetails.address || !donorDetails.phoneno || !donorDetails.foodType || !donorDetails.quantity) {
      alert('All fields are required!');
      return;
    }

    try {
      // Step 1: Delete the existing donation
      await axios.delete(`http://localhost:8080/donors/delete/${selectedDonationId}`);

      // Step 2: Add the donation again with 'Pending' status
      await axios.post('http://localhost:8080/donors/add', {
        ...donorDetails,
        status: 'Pending',
      });

      // Step 3: Delete the receiver request and add it with 'Pending' status
      await axios.delete(`http://localhost:8080/receivers/delete/${selectedReceiverId}`);
      await axios.post('http://localhost:8080/receivers/add', {
        ...receiverDetails,
        status: 'Pending',
      });

      // Refetch data after submitting
      fetchDonations();
      fetchReceiverRequests();
      setDonationFormVisible(false);
    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };

  const handleSubmitReceiver = async () => {
    if (!receiverDetails.name || !receiverDetails.address || !receiverDetails.phoneno || !receiverDetails.foodType || !receiverDetails.quantityNeeded) {
      alert('All fields are required!');
      return;
    }

    try {
      // Step 1: Delete the existing receiver request
      await axios.delete(`http://localhost:8080/receivers/delete/${selectedReceiverId}`);

      // Step 2: Add the receiver request again with 'Pending' status
      await axios.post('http://localhost:8080/receivers/add', {
        ...receiverDetails,
        status: 'Pending',
      });

      // Step 3: Delete the donation and add it with 'Accepted' status
      await axios.delete(`http://localhost:8080/donors/delete/${selectedDonationId}`);
      await axios.post('http://localhost:8080/donors/add', {
        ...donorDetails,
        status: 'Accepted',
      });

      // Refetch data after submitting
      fetchDonations();
      fetchReceiverRequests();
      setReceiverFormVisible(false);
    } catch (error) {
      console.error('Error submitting receiver request:', error);
    }
  };

  const isExpired = (expiryDate) => {
    const today = new Date().toISOString().split('T')[0];
    return expiryDate <= today;
  };

  useEffect(() => {
    fetchDonations();
    fetchReceiverRequests();
  }, []);

  return (
    <div className="inventory">
      <h1>Distribution Inventory</h1>
      <div className="list-container">
        <div className="list-section">
          <h2>Receiver Requests</h2>
          {receiverRequests.length === 0 ? (
            <p>No incoming receiver requests.</p>
          ) : (
            <ul className="requests-list">
              {receiverRequests.map((request) => (
                <li key={request.id} className="request-item">
                  <strong>Food Type:</strong> {request.foodType} <br />
                  <strong>Quantity Needed:</strong> {request.quantityNeeded} <br />
                  <strong>Preferred Time:</strong> {request.preferredTime} <br />
                  <strong>Status:</strong> {request.status} <br />
                  <button onClick={() => handleDonate(request.id)}>Donate</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="list-section">
          <h2>Donate</h2>
          {donations.length === 0 ? (
            <p>No incoming donations.</p>
          ) : (
            <ul className="donations-list">
              {donations.map((donation) => (
                <li key={donation.id} className="donation-item">
                  <strong>Food Type:</strong> {donation.foodType} <br />
                  <strong>Quantity:</strong> {donation.quantity} <br />
                  <strong>Status:</strong> {donation.status} <br />
                  {!isExpired(donation.expiryDate) && (
                    <button onClick={() => handleAcceptDonation(donation.id)}>Accept Donation</button>
                  )}
                  {isExpired(donation.expiryDate) && (
                    <p style={{ color: 'red' }}>Expired</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Donation Form Modal */}
      {isDonationFormVisible && (
        <div className="modal">
          <h2>Enter Donor Details</h2>
          <input
            type="text"
            placeholder="Name"
            value={donorDetails.name}
            onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={donorDetails.address}
            onChange={(e) => setDonorDetails({ ...donorDetails, address: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={donorDetails.phoneno}
            onChange={(e) => setDonorDetails({ ...donorDetails, phoneno: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Food Type"
            value={donorDetails.foodType}
            onChange={(e) => setDonorDetails({ ...donorDetails, foodType: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={donorDetails.quantity}
            onChange={(e) => setDonorDetails({ ...donorDetails, quantity: e.target.value })}
            required
          />
          <button onClick={handleSubmitDonation}>Submit Donation</button>
          <button onClick={() => setDonationFormVisible(false)}>Cancel</button>
        </div>
      )}

      {/* Receiver Form Modal */}
      {isReceiverFormVisible && (
        <div className="modal">
          <h2>Enter Receiver Details</h2>
          <input
            type="text"
            placeholder="Name"
            value={receiverDetails.name}
            onChange={(e) => setReceiverDetails({ ...receiverDetails, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={receiverDetails.address}
            onChange={(e) => setReceiverDetails({ ...receiverDetails, address: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={receiverDetails.phoneno}
            onChange={(e) => setReceiverDetails({ ...receiverDetails, phoneno: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Food Type"
            value={receiverDetails.foodType}
            onChange={(e) => setReceiverDetails({ ...receiverDetails, foodType: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantity Needed"
            value={receiverDetails.quantityNeeded}
            onChange={(e) => setReceiverDetails({ ...receiverDetails, quantityNeeded: e.target.value })}
            required
          />
          <button onClick={handleSubmitReceiver}>Submit Request</button>
          <button onClick={() => setReceiverFormVisible(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};
