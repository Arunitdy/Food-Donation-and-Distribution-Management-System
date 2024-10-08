import React, { useState } from 'react';
import './Employee.css';

export const Employee = () => {
  const [tasks, setTasks] = useState([
    { task: 'Pickup from Donor A', status: 'Pending' },
    { task: 'Deliver to Recipient B', status: 'Completed' },
  ]);

  return (
    <div className="employee-page">
      <h1>Employee Dashboard</h1>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.task} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
};
