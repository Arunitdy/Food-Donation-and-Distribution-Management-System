import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Receiver.css';

export const Receiver = function () {
    console.log("Receiver jsx");

    const [formData, setFormData] = useState({
        name: '', 
        address: '', 
        phoneno: '', 
        foodType: '', 
        dateOfRequirement: '', 
        quantityNeeded: '', 
        preferredTime: '' 
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

        // Validate form data
        const { name, address, phoneno, foodType, dateOfRequirement, preferredTime, quantityNeeded } = formData;
        if (name && address && phoneno && foodType && dateOfRequirement && preferredTime && quantityNeeded) {
            console.log("Submitted Data:", formData);
            const newRequest = {
                ...formData,
                status: "Pending"
            };

            try {
                const response = await axios.post('http://localhost:8080/receivers/add', newRequest); 
                setDonationHistory([...receiverHistory, response.data]);
                setFormData({
                    name: '', 
                    address: '', 
                    phoneno: '', 
                    foodType: '', 
                    dateOfRequirement: '', 
                    quantityNeeded: '', 
                    preferredTime: '' 
                });
            } catch (error) {
                console.error('Error submitting the request:', error);
            }
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

                <div className='form-group'>
                    <label htmlFor="foodType">Type of Food</label>
                    <input
                        type="text"
                        id="foodType"
                        name="foodType"
                        value={formData.foodType}
                        onChange={handleChange}
                        placeholder="Enter type of food"
                        required
                    />
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
                        placeholder="Enter quantity (in kg)"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Request Assistance</button>
            </form>

            <h2>Your Previous Requests</h2>
            <ul className="previous-requests">
                {receiverHistory.map((receiver, index) => (
                    <li key={index} className={`request-item `}>
                        <strong>Name:</strong> {receiver.name} <br />
                        <strong>Address:</strong> {receiver.address} <br />
                        <strong>Phone:</strong> {receiver.phoneno} <br />
                        <strong>Food Type:</strong> {receiver.foodType} <br />
                        <strong>Date:</strong> {receiver.dateOfRequirement} <br />
                        <strong>Time:</strong> {receiver.preferredTime} <br />
                        <strong>Quantity:</strong> {receiver.quantityNeeded} kg <br />
                        <strong>Status:</strong> {receiver.status} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};
