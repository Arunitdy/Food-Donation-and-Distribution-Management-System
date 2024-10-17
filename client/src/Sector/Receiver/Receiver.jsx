import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Receiver.css';

export const Receiver = function () {
    console.log("Receiver jsx");

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        foodType: '',
        date: '',
        time: '',
        quantity: ''
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
            const response = await axios.get('/api/receiver-requests'); 
            setDonationHistory(response.data);
        } catch (error) {
            console.error('Error fetching receiver history:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, address, phone, foodType, date, time, quantity } = formData;

        if (name && address && phone && foodType && date && time && quantity) {
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
                    phone: '', 
                    foodType: '', 
                    date: '', 
                    time: '', 
                    quantity: '' 
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
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
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
                    <label htmlFor="date">Date of Request</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="time">Preferred Time</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="quantity">Quantity Needed</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
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
                    <li key={index} className={`request-item ${receiver.status.toLowerCase()}`}>
                        <strong>Name:</strong> {receiver.name} <br />
                        <strong>Address:</strong> {receiver.address} <br />
                        <strong>Phone:</strong> {receiver.phone} <br />
                        <strong>Food Type:</strong> {receiver.foodType} <br />
                        <strong>Date:</strong> {receiver.date} <br />
                        <strong>Time:</strong> {receiver.time} <br />
                        <strong>Quantity:</strong> {receiver.quantity} kg <br />
                        <strong>Status:</strong> {receiver.status} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};
