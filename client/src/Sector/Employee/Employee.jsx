import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import './Employee.css';

export const Employee = () => {
  const [tasks, setTasks] = useState([]);

  
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/employee/');
      setTasks(response.data);  
    } catch (error) {
      console.error('Error fetching tasks:', error); 
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
            <li key={index}>
              {task.task} - {task.status}
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
};
