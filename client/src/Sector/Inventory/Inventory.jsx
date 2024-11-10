import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';

export const Inventory = () => {
  const [donations, setDonations] = useState([]);
  const [receiverRequests, setReceiverRequests] = useState([]);
  const [donorDetails, setDonorDetails] = useState({
  expiryDate: '',
  pickupTime: '',
  address: '',  // Ensure 'address' is initialized
  phoneno: '',
  name: '',
  aadhaarno: ''
});

const [receiverDetails, setReceiverDetails] = useState({
  expiryDate: '',
  pickupTime: '',
  address: '',  // Ensure 'address' is initialized
  phoneno: '',
  name: '',
  aadhaarno: ''
});

  const [isDonationFormVisible, setDonationFormVisible] = useState(false);
  const [isReceiverFormVisible, setReceiverFormVisible] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null); 
  // Fetch Donations
  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/donors/all');
      setDonations(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  // Fetch Receiver Requests
  const fetchReceiverRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/receivers/all');
      setReceiverRequests(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching receiver requests:', error);
    }
  };

  // Handle Accept Donation
  const handleAcceptDonation = (donation) => {
    setDonorDetails({
      expiryDate: '',
      pickupTime: '',
      address: '',
      phoneno: '',
      name: '',
      aadhaarno: ''
    });
    setSelectedDonation(donation);
    setSelectedDonor(donation);
    setDonationFormVisible(true);
  };

  // Handle Donate to Receiver
  const handleDonate = (receiver) => {
    setReceiverDetails({
      expiryDate: '',
      pickupTime: '',
      address: '',
      phoneno: '',
      name: '',
      aadhaarno: ''
    });
    setSelectedReceiver(receiver);
    setReceiverFormVisible(true);
  };// Submit Donation
  const handleSubmitDonation = async () => {
    try {
      console.log("handleSubmitDonation");
      if (!donorDetails.expiryDate || !donorDetails.pickupTime || !donorDetails.address || !donorDetails.phoneno || !donorDetails.name || !donorDetails.aadhaarno) {
        alert('All fields are required!');
        return;
      }
  
      // Create a new donation object
      const newDonation = {
        foodType: selectedDonation.foodType,
        quantity: selectedDonation.quantity,
        expiryDate: donorDetails.expiryDate,
        pickupTime: donorDetails.pickupTime,
        address: donorDetails.address,
        phoneno: donorDetails.phoneno,
        name: donorDetails.name,
        aadhaarno: donorDetails.aadhaarno,
        status: 'ready to deliver'
      };
  
      // Send POST request to add the donation to the backend
      const donationResponse = await axios.post('http://localhost:8080/donors/add', newDonation);
      console.log('Donation added successfully:', donationResponse.data);
  
      // Delete receiver request
      if (selectedDonor?.id) {
        const donationResponsedelete = await axios.delete(`http://localhost:8080/donors/delete/${selectedDonor.id}`);
        console.log("receiverRequestsdelete:", donationResponsedelete.data);
      }
  
      // Create an employee object from the donor details
      const newEmployee = {
        name: donorDetails.name,
        email: donorDetails.email, // If available
        phone: donorDetails.phoneno,
        donorAddress: donorDetails.address,
        foodType: selectedDonation.foodType,
        receiverAddress: donorDetails.address, // Adjust according to your logic
        status: 'ready to deliver'
      };
  
      // Send POST request to add the employee to the backend
      const employeeResponse = await axios.post('http://localhost:8080/employees/add', newEmployee);
      console.log('Employee added successfully:', employeeResponse.data);
  
    // Reset the form and close the modal
    setDonationFormVisible(false);
    setSelectedDonor(null);  // Reset selectedDonor state
    fetchDonations();  // Refresh the list of donations
    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };
  
  // Submit Receiver
  const handleSubmitReceiver = async () => {
    console.log("handleSubmitReceiver");
    try {
      if (!receiverDetails.expiryDate || !receiverDetails.pickupTime || !receiverDetails.address || !receiverDetails.phoneno || !receiverDetails.name || !receiverDetails.aadhaarno) {
        alert('All fields are required!');
        return;
      }
  
      // Create a new receiver request object with default status
      const newReceiverRequest = {
        name: receiverDetails.name,
        address: receiverDetails.address,
        phoneno: receiverDetails.phoneno,
        foodType: selectedReceiver.foodType,
        pickupTime: receiverDetails.pickupTime,
        quantity: selectedReceiver.quantity,
        expiryDate: receiverDetails.expiryDate,
        aadhaarno: receiverDetails.aadhaarno,
        status: 'ready to deliver' // Set default status here
      };
  
      // Send POST request to add the receiver request to the backend
      const receiverResponse = await axios.post('http://localhost:8080/receivers/add', newReceiverRequest);
      console.log('Receiver request added successfully:', receiverResponse.data);
  
      // Delete receiver request
      if (selectedReceiver?.id) {
        const receiverResponsedelete = await axios.delete(`http://localhost:8080/receivers/delete/${selectedReceiver.id}`);
        console.log("receiverRequestsdelete:", receiverResponsedelete.data);
      }
  
      // Create an employee object from the receiver details
      const newEmployee = {
        name: receiverDetails.name,
        email: receiverDetails.email, // If available
        phone: receiverDetails.phoneno,
        receiverAddress: receiverDetails.address,
        foodType: selectedReceiver.foodType,
        donorAddress: receiverDetails.address, // Adjust according to your logic
         status: 'ready to deliver'
      };
  
      // Send POST request to add the employee to the backend
      const employeeResponse = await axios.post('http://localhost:8080/employees/add', newEmployee);
      console.log('Employee added successfully:', employeeResponse.data);
  
      // Reset the form and close the modal
      setReceiverFormVisible(false);
      fetchReceiverRequests();  // Refresh the list of receiver requests
    } catch (error) {
      console.error('Error submitting receiver request:', error);
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
            {
              receiverRequests
                .filter((request) => request.status.toLowerCase() === 'pending') // Filtering requests with "pending" status
                .map((request) => (
                  <li key={request.id} className="request-item">
                    <strong>Food Type:</strong> {request.foodType || 'N/A'} <br />
                    <strong>Quantity:</strong> {request.quantityNeeded || 'N/A'} <br />
                    <strong>Expiry Date:</strong> {request.dateOfRequirement ||'N/A'} <br />
                    <strong>Pickup Time:</strong> {request.preferredTime || 'N/A'} <br />
                    <strong>Address:</strong> {request.address || 'N/A'} <br />
                    <strong>Phone Number:</strong> {request.phoneno || 'N/A'} <br />
                    <strong>Name:</strong> {request.name || 'N/A'} <br />
                    <strong>Aadhaar Number:</strong> {'N/A'} <br />
                    <button className="allbutton" onClick={() => handleDonate(request)}>Donate</button>
                  </li>
                ))
            }
          </ul>
          
          )}
        </div>

        <div className="list-section">
          <h2>Donations</h2>
          {donations.length === 0 ? (
            <p>No incoming donations.</p>
          ) : (
            <ul className="donations-list">
            {
              donations
                .filter((donation) => donation.status.toLowerCase() === 'pending') // Filter donations with 'pending' status
                .map((donation) => (
                  <li key={donation.id} className="donation-item">
                    <strong>Food Type:</strong> {donation.foodType || 'N/A'} <br />
                    <strong>Quantity:</strong> {donation.quantity || 'N/A'} <br />
                    <strong>Expiry Date:</strong> {donation.expiryDate || 'N/A'} <br />
                    <strong>Pickup Time:</strong> {donation.pickupTime || 'N/A'} <br />
                    <strong>Address:</strong> {donation.address || 'N/A'} <br />
                    <strong>Phone Number:</strong> {donation.phoneno || 'N/A'} <br />
                    <strong>Name:</strong> {donation.name || 'N/A'} <br />
                    <strong>Aadhaar Number:</strong> { 'N/A'} <br />
                    <button className="allbutton" onClick={() => handleAcceptDonation(donation)}>Accept Donation</button>
                  </li>
                ))
            }

            </ul>
          )}
        </div>
      </div>

      {/* Donation Form Modal */}
        {isDonationFormVisible && (
          <div className="form-modal">
            <button className="close-button" onClick={() => setDonationFormVisible(false)}>×</button>
            <h3>Submit Donation</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitDonation(); }}>
              <div className='modalsub'>
              <label>Food Type:</label>
              <input type="text" value={selectedDonation.foodType} readOnly />
              <label>Quantity:</label>
              <input type="text" value={selectedDonation.quantity} readOnly />
              <label>Expiry Date:</label>
              <input type="date" onChange={(e) => setDonorDetails({ ...donorDetails, expiryDate: e.target.value })} />
              <label>Pickup Time:</label>
              <input type="time" onChange={(e) => setDonorDetails({ ...donorDetails, pickupTime: e.target.value })} />
              </div>
              <div className='modalsub'>
              <label>Address:</label>
              <input type="text" onChange={(e) => setDonorDetails({ ...donorDetails, address: e.target.value })} />
              <label>Phone Number:</label>
              <input type="text" onChange={(e) => setDonorDetails({ ...donorDetails, phoneno: e.target.value })} />
              <label>Name:</label>
              <input type="text" onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })} />
              <label>Aadhaar Number:</label>
              <input type="text" onChange={(e) => setDonorDetails({ ...donorDetails, aadhaarno: e.target.value })} />
              <button type="submit" className="allbutton">Submit</button>
              </div>
            </form>
          </div>
        )}

        {/* Receiver Form Modal */}
        {isReceiverFormVisible && (
          <div className="form-modal">
            <button className="close-button" onClick={() => setReceiverFormVisible(false)}>×</button>
            <h3>Submit Receiver Request</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitReceiver(); }}>
              <div className='modalsub'>
                <label>Food Type:</label>
                <input type="text" value={selectedReceiver.foodType} readOnly />
                <label>Quantity:</label>
                <input type="text" value={selectedReceiver.quantity} readOnly />
                <label>Expiry Date:</label>
                <input type="date" onChange={(e) => setReceiverDetails({ ...receiverDetails, expiryDate: e.target.value })} />
                <label>Pickup Time:</label>
                <input type="time" onChange={(e) => setReceiverDetails({ ...receiverDetails, pickupTime: e.target.value })} />
              </div>
              <div className='modalsub'>
                <label>Address:</label>
                <input type="text" onChange={(e) => setReceiverDetails({ ...receiverDetails, address: e.target.value })} />
                <label>Phone Number:</label>
                <input type="text" onChange={(e) => setReceiverDetails({ ...receiverDetails, phoneno: e.target.value })} />
                <label>Name:</label>
                <input type="text" onChange={(e) => setReceiverDetails({ ...receiverDetails, name: e.target.value })} />
                <label>Aadhaar Number:</label>
                <input type="text" onChange={(e) => setReceiverDetails({ ...receiverDetails, aadhaarno: e.target.value })} />
                <button type="submit" className="allbutton">Submit</button>
              </div>
            </form>
          </div>
        )}

    </div>
  );
};
