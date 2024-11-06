import React, { useState } from 'react';
import './Help.css';

export const Help = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add the user's message to the chat
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: input }]);

    const apiKey = 'AIzaSyCZ-dsLDmfV8N0qaVMhNkrJhAOmTcy-cvE'; // Move to backend for security
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const data = {
      contents: [
        {
          parts: [
            {
                text: `
                    Food Care is a user-friendly website designed to support food banks and charities in managing food donations and distributions. 
                    It connects donors, distribution centers, recipients, and volunteers to create a smooth process for getting food to those who need it.
            
                    Key functions include:
                    - **Donation Management**: Donors can easily log and track their donations, and centers receive notifications when donations hit certain levels.
                    - **Distribution Management**: Centers track inventory, schedule distributions, and receive alerts when food supplies are low.
                    - **Reporting and Accountability**: The platform offers detailed reports for tracking donations and distributions, providing transparency for all users.
            
                    Food Care is secure, using data encryption and restricted access, and can support a large number of users without slowing down. It’s accessible on any device, making it easy for users to get involved from anywhere. Future updates may add useful tools like barcode scanners and multilingual options to expand access and ease of use.
            
                    The project, detailed in a Software Requirements Specification (SRS) document by Aswaljith P R, Arun M, Usam bin Muhammed, and Abijith SL, outlines the platform’s goals and features to support effective development and deployment.
            
                    Respond to user questions with answers that are friendly, easy to understand, and based on the information provided here. Avoid extra symbols or technical language.
            
                    ${input}
                `
            }
            
          ]
        }
      ]
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      const aiResponse = result.candidates[0].content.parts[0].text;

      console.log(response);
      setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: aiResponse }]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <h1>How can i help you ?</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          required
        />
        <button className="Submit"type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Help;
