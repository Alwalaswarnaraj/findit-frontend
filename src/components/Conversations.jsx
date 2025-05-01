import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import api from '../../api';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get('/conversations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConversations(res.data);
      } catch (err) {
        console.error('Error fetching conversations:', err.response?.data || err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchConversations();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      await api.delete(`http://localhost:5000/api/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove the deleted conversation from the state
      setConversations(prevConversations =>
        prevConversations.filter(c => c._id !== conversationId)
      );
      alert('Conversation deleted.');
    } catch (error) {
      console.error('Error deleting conversation:', error);
      alert('Failed to delete conversation.');
    }
  };

  if (loading) {
    return <div>Loading conversations...</div>; // Or a more sophisticated loader
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>
      <ul className="space-y-2">
        {conversations.map((conv) => {
          const other = conv.participants.find(
            (p) => p._id !== JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
          );
          // Check for conv.messages before accessing its properties
          const lastMessage = conv.messages && conv.messages.length > 0 ? conv.messages[0] : { text: 'No messages yet', createdAt: conv.createdAt };

          return (
            <li key={conv._id} className="border p-3 rounded hover:bg-gray-100 flex items-center justify-between">
              <Link to={`/messages/${conv._id}`} className="block flex-1">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{other?.name || 'Unknown'}</div>
                    <div className="text-sm text-gray-500">
                      {lastMessage.text}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatDate(lastMessage.createdAt)}
                  </div>
                </div>
              </Link>
              <button
                onClick={() => handleDeleteConversation(conv._id)}
                className="ml-4 bg-transparent border-none cursor-pointer"
                title="Delete Conversation"
              >
                <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Conversations;
