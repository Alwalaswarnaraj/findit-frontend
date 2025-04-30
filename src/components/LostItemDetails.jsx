import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LostItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/lost/${id}`);
        setItem(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item:', error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const startConversation = async () => {
    if (!item || !item.user || !item.user._id) {
      console.error('No user info found for the item.');
      alert('Unable to contact owner. Please try again later.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/conversations',
        { receiverId: item.user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/messages/${res.data._id}`);
    } catch (err) {
      console.error('Failed to start conversation:', err);
      alert('Failed to start conversation. Please try again later.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow flex flex-col md:flex-row gap-6 items-start">
      {/* Left: Text Info */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <p className="text-sm text-gray-500 mb-2">
          Posted by: {item.user?.name || 'Unknown'}
        </p>

        {token && item.user?._id !== currentUserId && (
          <button
            onClick={startConversation}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Message Owner
          </button>
        )}
      </div>

      {/* Right: Image */}
      {item.image && (
        <div className="w-full md:w-64 flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default LostItemDetails;
