import React from 'react';
import './Home.css';

export const Home = () => {
  return (
    <div className="home">{/* Role Explanation Section 
      <img 
        src=".https://nss-new-add-media.s3.ap-south-1.amazonaws.com/NSS_USA_site/2023/10/16104028/blogfooddonationdrice.jpg" 
        alt="Food Donation" 
      />*/}
      <div className="content">
        <h1>Welcome to FoodCare</h1>
        <p className="mission-statement">
          Our mission is to improve global health through food donations, connecting those in need with generous donors.
        </p>
        
        <div className="role-explanation">
          <h2>Who We Are</h2>
          <ul>
            <li><strong>Donors:</strong> Those who generously provide food to those in need.</li>
            <li><strong>Distribution Centers:</strong> Facilitate the collection and distribution of food.</li>
            <li><strong>Recipients:</strong> Individuals or families in need of food assistance.</li>
            <li><strong>Employees:</strong> Manage operations and facilitate the donation and distribution process.</li>
          </ul>
        </div>

        
      </div>
    </div>
  );
};
