import React from 'react';
import './Blog.css';


export const  Blog = () => {
  return (
    <div className="blog">
      <h1>Blog</h1>
      <article>
        <h2>The Importance of Food Donation</h2>
        <p>
          Food donation is a vital aspect of reducing food waste and helping those in need. In our communities,
          organizations are stepping up to connect donors with recipients, ensuring that surplus food is 
          efficiently distributed to those who require it most.
        </p>
      </article>
      <article>
        <h2>How Our System Works</h2>
        <p>
          Our Food Donation and Distribution Management System simplifies the donation and distribution process. 
          It enables users to log donations, track inventory, and generate reports for better accountability and transparency.
        </p>
      </article>
    </div>
  );
};
