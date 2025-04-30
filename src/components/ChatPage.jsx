import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChatPage = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const fetchMessages = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/conversations/${conversationId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/conversations/${conversationId}/messages`, { text }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setText('');
    fetchMessages();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="border rounded p-4 h-96 overflow-y-auto bg-gray-50 mb-4">
        {messages.map(msg => (
          <div key={msg._id} className="mb-2">
            <strong>{msg.sender.name}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-l"
          placeholder="Type a message"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
