import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Receiver.css';

export const Receiver = function () {
    console.log("Receiver jsx");

    const [formData, setFormData] = useState({
        name: '', 
        address: '', 
        phoneno: '', 
        foodType: 'Breakfast', // Default food type
        dateOfRequirement: '', 
        quantityNeeded: '', 
        preferredTime: '', 
        status: 'Pending' // Default status as per backend enum
    });

    const [receiverHistory, setDonationHistory] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const fetchReceiverHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8080/receivers/all'); 
            setDonationHistory(response.data);
        } catch (error) {
            console.error('Error fetching receiver history:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to the backend
            const response = await axios.post('http://localhost:8080/receivers/add', formData); 
            setDonationHistory([...receiverHistory, response.data]);
            setFormData({
                name: '', 
                address: '', 
                phoneno: '', 
                foodType: 'Breakfast', 
                dateOfRequirement: '', 
                quantityNeeded: '', 
                preferredTime: '', 
                status: 'Pending' // Reset status to default
            });
        } catch (error) {
            console.error('Error submitting the request:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/receivers/delete/${id}`);
            setDonationHistory(receiverHistory.filter(receiver => receiver.id !== id));
        } catch (error) {
            console.error('Error deleting the request:', error);
        }
    };

    useEffect(() => {
        fetchReceiverHistory();
    }, []); 

    return (
        <div className='receiver'>
            <h1 className='receiver-title'>Request Food Assistance</h1>

            <form onSubmit={handleSubmit} className='receiver-form'>
                <div className='form-group'>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="phoneno">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneno"
                        name="phoneno"
                        value={formData.phoneno}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>

                <div className='form-group foodType'>
                    <label htmlFor="foodType">Type of Food</label>
                    <select
                        id="foodType"
                        name="foodType"
                        value={formData.foodType}
                        onChange={handleChange}
                        required
                    >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor="dateOfRequirement">Date of Request</label>
                    <input
                        type="date"
                        id="dateOfRequirement"
                        name="dateOfRequirement"
                        value={formData.dateOfRequirement}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="preferredTime">Preferred Time</label>
                    <input
                        type="time"
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="quantityNeeded">Quantity Needed</label>
                    <input
                        type="number"
                        id="quantityNeeded"
                        name="quantityNeeded"
                        value={formData.quantityNeeded}
                        onChange={handleChange}
                        placeholder="Enter quantity (number of people)" 
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Request Assistance</button>
            </form>

            <h2>Your Previous Requests</h2>
            <ul className="previous-requests">
                {receiverHistory.map((receiver, index) => (
                    <li key={index} className="request-item">
                    <div>
                        <strong>Food Type:</strong> {receiver.foodType} &nbsp;
                        <strong>Quantity Needed:</strong> {receiver.quantityNeeded} &nbsp;
                        <strong>Address:</strong> {receiver.address} &nbsp;
                        <strong>Expiry Date:</strong> {receiver.dateOfRequirement} &nbsp;
                        <strong>Pickup Time:</strong> {receiver.preferredTime} &nbsp;
                        <strong>Name:</strong> {receiver.name} &nbsp;
                        <strong>Phone No:</strong> {receiver.phoneno} &nbsp;
                        <strong>Status:</strong> 
                        <span className={receiver.status === 'EXPIRED' ? 'status-expired' : 'status-active'}>
                        {receiver.status}
                        </span>
                    </div>
                    <button onClick={() => handleDelete(receiver.id)} className="delete-button">
                        Delete Request
                    </button>
                    </li>
                ))}
            </ul>

        </div>
    );
};
