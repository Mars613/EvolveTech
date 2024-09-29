// src/Pages/Telemedicine.jsx
import React, { useEffect, useState } from 'react';

const Telemedicine = ({ socket }) => {
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
      <h2>Telemedicine Chat</h2>
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
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Telemedicine;
