import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/conversations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConversations(res.data);
    };

    fetchConversations();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>
      <ul className="space-y-2">
        {conversations.map((conv) => {
          const other = conv.participants.find(p => p._id !== JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id);
          return (
            <li key={conv._id} className="border p-3 rounded hover:bg-gray-100">
              <Link to={`/conversations/${conv._id}`}>
                Chat with {other?.name || 'Unknown'}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Conversations;
