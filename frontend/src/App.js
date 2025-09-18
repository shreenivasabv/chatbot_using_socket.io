import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("botReply", (reply) => {
      setChat((prev) => [...prev, { sender: "Bot", text: reply }]);
    });
    return () => socket.off("botReply");
  }, []);

  const sendMessage = () => {
    socket.emit("userMessage", msg);
    setChat((prev) => [...prev, { sender: "You", text: msg }]);
    setMsg("");
  };

  return (
    <div>
      <h2>Real-Time Chatbot</h2>
      <div>
        {chat.map((c, i) => (
          <p key={i}><b>{c.sender}:</b> {c.text}</p>
        ))}
      </div>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
