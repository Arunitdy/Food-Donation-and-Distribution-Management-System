import React, { useState } from 'react';
import './Receiver.css';

export const Receiver = () => {
  const [request, setRequest] = useState('');
  const [foodRequests, setFoodRequests] = useState([]);

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setFoodRequests([...foodRequests, { request, status: 'Pending' }]);
  };

  return (
    <div className="receiver-page">
      <h1>Receiver Page</h1>
      <form onSubmit={handleRequestSubmit}>
        <label>Request Food</label>
        <input type="text" value={request} onChange={(e) => setRequest(e.target.value)} />
        <button type="submit">Submit Request</button>
      </form>

      <h2>Your Requests</h2>
      <ul>
        {foodRequests.map((request, index) => (
          <li key={index}>{request.request} - {request.status}</li>
        ))}
      </ul>
    </div>
  );
};
