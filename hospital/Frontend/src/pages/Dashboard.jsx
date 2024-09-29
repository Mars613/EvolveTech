// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';

const Dashboard = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    const messageData = {
      room: "telemedicine", // Define a room for telemedicine
      message: messageInput,
    };
    socket.emit("message", messageData);
    setMessageInput(""); // Clear input field
  };

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data.message]); // Update messages on receiving new messages
    });

    return () => {
      socket.off("message"); // Clean up the listener on unmount
    };
  }, [socket]);

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="chat-window" style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '80%', marginRight: '5px' }}
      />
     
    </div>
  );
};

export default Dashboard;
