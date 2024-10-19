import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './Employee.css';

export const Employee = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/donors/all'); 
      const validTasks = response.data.filter(task => 
        new Date(task.expiryDate) > new Date() && 
        (task.status !== 'Delivered' || task.status === 'Accepted') 
      );
      console.log(validTasks);
      setTasks(validTasks);  
    } catch (error) {
      console.error('Error fetching tasks:', error); 
    }
  };

  const handleDelivering = async (id) => {
    try {
      await axios.put(`http://localhost:8080/donors/update/${id}`, { status: 'Delivering' });
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, status: 'Delivering' } : task
      ));
    } catch (error) {
      console.error('Error updating status to Delivering:', error);
    }
  };

  const handleDelivered = async (id) => {
    try {
      await axios.put(`http://localhost:8080/donors/update/${id}`, { status: 'Delivered' });
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, status: 'Delivered' } : task
      ));
    } catch (error) {
      console.error('Error updating status to Delivered:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);  

  return (
    <div className="employee">
      <h1>Employee Dashboard</h1>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index} className={`request-item ${task.status ? task.status.toLowerCase() : 'unknown'}`}>
              <div className="task-details">
                <strong>Food Type:</strong> {task.foodType}<br />
                <strong>Address:</strong> {task.address}<br />
                <strong>Phone No:</strong> {task.phoneno}<br />
                <strong>Expiry Date:</strong> {task.expiryDate}<br />
                <strong>Quantity:</strong> {task.quantity} kg<br />
                <strong>Status:</strong> {task.status ? task.status : 'Unknown Status'}
                {task.status !== 'Pending' && (
                  <button onClick={() => handleDelivering(task.id)}>Take Delivery</button>
                )}
                {task.status === 'Delivering' && (
                  <button onClick={() => handleDelivered(task.id)}>Delivery Done</button>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
};
