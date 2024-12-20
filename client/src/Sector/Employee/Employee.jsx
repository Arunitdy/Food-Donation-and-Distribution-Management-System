import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employee.css';

export const Employee = () => {
  const [tasks, setTasks] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    contact: ''
  });
  
  const [isDeliveryFormVisible, setDeliveryFormVisible] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Fetch all tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/employees/all'); 
      const validTasks = response.data;
      console.log('Fetched tasks:', validTasks);
      setTasks(validTasks);  
    } catch (error) {
      console.error('Error fetching tasks:', error); 
    }
  };

  // Helper function for deleting and adding task with updated status
  const updateTaskStatus = async (id, status, deliveryDetails = {}) => {
    try {
      // Delete existing task from Employee table
      await axios.delete(`http://localhost:8080/employees/delete/${id}`);

      // Add updated task with new status
      const updatedTask = {
        id,
        status,
        ...deliveryDetails
      };

      // Add updated task back to Employee table
      await axios.post('http://localhost:8080/employees/add', updatedTask);

      console.log(`Task ${status}:`, updatedTask);
      return updatedTask;
    } catch (error) {
      console.error(`Error updating task to ${status}:`, error);
      throw error;
    }
  };

  // Handle 'Take Delivery' button click
  const handleTakeDelivery = (id) => {
    setCurrentTaskId(id);
    setDeliveryFormVisible(true);  // Show the delivery form
  };

  // Handle the delivery form submission
  const handleSubmitDelivery = async () => {
    if (!deliveryDetails.name || !deliveryDetails.contact) {
      alert('Please fill in all the delivery details.');
      return;
    }

    try {
      const updatedTask = await updateTaskStatus(currentTaskId, 'Delivering', deliveryDetails);
      
      // Update the tasks list with the new status
      setTasks(tasks.map(task => 
        task.id === currentTaskId ? { ...task, status: 'Delivering', ...updatedTask } : task
      ));

      // Hide the delivery form
      setDeliveryFormVisible(false);
      setDeliveryDetails({ name: '', contact: '' });
    } catch (error) {
      alert('Error updating task to Delivering');
    }
  };

  // Handle 'Delivery Done' button click
  const handleDeliveryDone = async (id) => {
    try {
      const updatedTask = await updateTaskStatus(id, 'Delivered');
      
      // Update the tasks list with the new status
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, status: 'Delivered', ...updatedTask } : task
      ));

      console.log('Task delivered:', updatedTask);
    } catch (error) {
      alert('Error updating task to Delivered');
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
                <strong>Food Type:</strong> {task.foodType || 'N/A'}<br />
                <strong>Donor Address:</strong> {task.donor_address || 'N/A'}<br />
                <strong>Receiver Address:</strong> {task.receiver_address || 'N/A'}<br />
                <strong>Phone No:</strong> {task.phone || 'N/A'}<br />
                <strong>Expiry Date:</strong> {task.expiryDate ? new Date(task.expiryDate).toLocaleString() : 'N/A'}<br />
                <strong>Quantity:</strong> {task.quantity || 'N/A'}<br />
                <strong>Status:</strong> {task.status || 'Unknown Status'}<br />
                {task.status === 'ready to deliver' && (
                  <button onClick={() => handleTakeDelivery(task.id)}>Take Delivery</button>
                )}
                {task.status === 'Delivering' && (
                  <button onClick={() => handleDeliveryDone(task.id)}>Delivery Done</button>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>

      {/* Delivery Form Modal */}
      {isDeliveryFormVisible && (
        <div className="modal">
          <h2>Enter Delivery Boy Details</h2>
          <input
            type="text"
            placeholder="Delivery Boy's Name"
            value={deliveryDetails.name}
            onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Delivery Boy's Contact"
            value={deliveryDetails.contact}
            onChange={(e) => setDeliveryDetails({ ...deliveryDetails, contact: e.target.value })}
            required
          />
          <button onClick={handleSubmitDelivery}>Submit Delivery</button>
          <button onClick={() => setDeliveryFormVisible(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};
