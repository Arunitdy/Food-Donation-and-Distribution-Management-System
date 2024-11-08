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

  // Fetch Donations
  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/donors/all');
      console.log('Fetched Donations:', response.data); // Console log
      const validDonations = response.data.filter(donation => donation.status !== 'Accepted' && !isExpired(donation.expiryDate));
      setDonations(validDonations);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  // Fetch Receiver Requests
  const fetchReceiverRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/receivers/all');
      console.log('Fetched Receiver Requests:', response.data); // Console log
      setReceiverRequests(response.data.filter(request => request.status !== 'Accepted'));
    } catch (error) {
      console.error('Error fetching receiver requests:', error);
    }
  };

  // Handle Donation Action
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

  // Handle Accept Donation
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

  // Submit Donation
  const handleSubmitDonation = async () => {
    if (!donorDetails.name || !donorDetails.address || !donorDetails.phoneno || !donorDetails.foodType || !donorDetails.quantity) {
      alert('All fields are required!');
      return;
    }

    try {
      // Step 1: Delete the existing donation
      await axios.delete(`http://localhost:8080/donors/delete/${selectedDonationId}`);
      console.log(`Deleted donation with ID: ${selectedDonationId}`); // Console log

      // Step 2: Add the donation again with 'Pending' status
      const donationResponse = await axios.post('http://localhost:8080/donors/add', {
        ...donorDetails,
        status: 'Pending',
      });
      console.log('Added donation with Pending status:', donationResponse.data); // Console log

      // Step 3: Delete the receiver request and add it with 'Pending' status
      await axios.delete(`http://localhost:8080/receivers/delete/${selectedReceiverId}`);
      console.log(`Deleted receiver request with ID: ${selectedReceiverId}`); // Console log

      const receiverResponse = await axios.post('http://localhost:8080/receivers/add', {
        ...receiverDetails,
        status: 'Pending',
      });
      console.log('Added receiver request with Pending status:', receiverResponse.data); // Console log

      // Step 4: Send the delivery details
      await sendDeliveryDetails();

      // Refetch data after submitting
      fetchDonations();
      fetchReceiverRequests();
      setDonationFormVisible(false);
    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };

  // Submit Receiver
  const handleSubmitReceiver = async () => {
    if (!receiverDetails.name || !receiverDetails.address || !receiverDetails.phoneno || !receiverDetails.foodType || !receiverDetails.quantityNeeded) {
      alert('All fields are required!');
      return;
    }

    try {
      // Step 1: Delete the existing receiver request
      await axios.delete(`http://localhost:8080/receivers/delete/${selectedReceiverId}`);
      console.log(`Deleted receiver request with ID: ${selectedReceiverId}`); // Console log

      // Step 2: Add the receiver request again with 'Pending' status
      const receiverResponse = await axios.post('http://localhost:8080/receivers/add', {
        ...receiverDetails,
        status: 'Pending',
      });
      console.log('Added receiver request with Pending status:', receiverResponse.data); // Console log

      // Step 3: Delete the donation and add it with 'Accepted' status
      await axios.delete(`http://localhost:8080/donors/delete/${selectedDonationId}`);
      console.log(`Deleted donation with ID: ${selectedDonationId}`); // Console log

      const donorResponse = await axios.post('http://localhost:8080/donors/add', {
        ...donorDetails,
        status: 'Accepted',
      });
      console.log('Added donation with Accepted status:', donorResponse.data); // Console log

      // Step 4: Send the delivery details
      await sendDeliveryDetails();

      // Refetch data after submitting
      fetchDonations();
      fetchReceiverRequests();
      setReceiverFormVisible(false);
    } catch (error) {
      console.error('Error submitting receiver request:', error);
    }
  };

  // Check if Donation Expired
  const isExpired = (expiryDate) => {
    const today = new Date().toISOString().split('T')[0];
    return expiryDate <= today;
  };

  // Send Delivery Details
  const sendDeliveryDetails = async () => {
    const deliveryData = {
      donorName: donorDetails.name,
      donorAddress: donorDetails.address,
      donorPhone: donorDetails.phoneno,
      receiverName: receiverDetails.name,
      receiverAddress: receiverDetails.address,
      receiverPhone: receiverDetails.phoneno,
      foodType: donorDetails.foodType,
      quantity: donorDetails.quantity,
    };

    try {
      const response = await axios.post('http://localhost:8080/deliveries/create', deliveryData);
      console.log('Delivery details submitted successfully:', response.data); // Console log
      alert('Delivery details submitted successfully!');
    } catch (error) {
      console.error('Error submitting delivery details:', error);
    }
  };

  // Fetch Data on Component Mount
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
        <div className="form-modal">
          <h3>Submit Donation</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmitDonation(); }}>
            <label>Name:</label>
            <input
              type="text"
              value={donorDetails.name}
              onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
            />
            <label>Address:</label>
            <input
              type="text"
              value={donorDetails.address}
              onChange={(e) => setDonorDetails({ ...donorDetails, address: e.target.value })}
            />
            <label>Phone Number:</label>
            <input
              type="text"
              value={donorDetails.phoneno}
              onChange={(e) => setDonorDetails({ ...donorDetails, phoneno: e.target.value })}
            />
            <label>Food Type:</label>
            <input
              type="text"
              value={donorDetails.foodType}
              onChange={(e) => setDonorDetails({ ...donorDetails, foodType: e.target.value })}
            />
            <label>Quantity:</label>
            <input
              type="text"
              value={donorDetails.quantity}
              onChange={(e) => setDonorDetails({ ...donorDetails, quantity: e.target.value })}
            />
            <button type="submit">Submit Donation</button>
          </form>
        </div>
      )}

      {/* Receiver Form Modal */}
      {isReceiverFormVisible && (
        <div className="form-modal">
          <h3>Submit Receiver Request</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmitReceiver(); }}>
            <label>Name:</label>
            <input
              type="text"
              value={receiverDetails.name}
              onChange={(e) => setReceiverDetails({ ...receiverDetails, name: e.target.value })}
            />
            <label>Address:</label>
            <input
              type="text"
              value={receiverDetails.address}
              onChange={(e) => setReceiverDetails({ ...receiverDetails, address: e.target.value })}
            />
            <label>Phone Number:</label>
            <input
              type="text"
              value={receiverDetails.phoneno}
              onChange={(e) => setReceiverDetails({ ...receiverDetails, phoneno: e.target.value })}
            />
            <label>Food Type:</label>
            <input
              type="text"
              value={receiverDetails.foodType}
              onChange={(e) => setReceiverDetails({ ...receiverDetails, foodType: e.target.value })}
            />
            <label>Quantity Needed:</label>
            <input
              type="text"
              value={receiverDetails.quantityNeeded}
              onChange={(e) => setReceiverDetails({ ...receiverDetails, quantityNeeded: e.target.value })}
            />
            <button type="submit">Submit Receiver Request</button>
          </form>
        </div>
      )}
    </div>
  );
};
