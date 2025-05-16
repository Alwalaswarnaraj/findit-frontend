import React, { useEffect, useState } from 'react';
import { UserCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import api from '../services/api';

const ItemCard = ({ item, type, onDelete }) => (
  <div key={item._id} className="border rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-lg transition relative">
    {item.image ? (
      <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
    ) : (
      <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm italic">No Image</div>
    )}
    <div className="p-4 space-y-1">
      <h4 className={`font-bold ${type === 'lost' ? 'text-red-700' : 'text-green-700'}`}>{item.title}</h4>
      <p className="text-sm text-gray-700">{item.description}</p>
      <p className="text-sm text-gray-500">📍 {item.location}</p>
      <p className="text-sm text-gray-400">📅 {new Date(type === 'lost' ? item.dateLost : item.dateFound).toLocaleDateString()}</p>
    </div>
    <button
      onClick={() => onDelete(type, item._id)}
      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow text-red-600 hover:text-red-800"
      title="Delete"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  </div>
);

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [userRes, lostRes, foundRes] = await Promise.all([
          api.get('/api/users/me', { headers }),
          api.get('/api/lost/mine', { headers }),
          api.get('/api/found/mine', { headers }),
        ]);
        setUser(userRes.data);
        setLostItems(Array.isArray(lostRes.data) ? lostRes.data : []);
        setFoundItems(Array.isArray(foundRes.data) ? foundRes.data : []);
      } catch (err) {
        console.error('Error loading profile or items:', err);
      }
    };
    fetchData();
  }, [token]);

  const deleteItem = async (type, id) => {
    const confirm = window.confirm('Are you sure you want to delete this item?');
    if (!confirm) return;

    try {
      const headers = { Authorization: `Bearer ${token}` };
      let response;
      if (type === 'lost') {
        response = await api.delete(`/api/lost/${id}`, { headers });
        if (response.status === 200) {
          setLostItems(prev => prev.filter(item => item._id !== id));
        } else {
          console.error('Failed to delete lost item:', response.data);
          alert(`Failed to delete lost item: ${response.data?.message || 'An error occurred'}`);
        }
      } else {
        response = await api.delete(`/api/found/${id}`, { headers });
        if (response.status === 200) {
          setFoundItems(prev => prev.filter(item => item._id !== id));
        } else {
          console.error('Failed to delete found item:', response.data);
          alert(`Failed to delete found item: ${response.data?.message || 'An error occurred'}`);
        }
      }
    } catch (err) {
      console.error('Failed to delete item:', err);
      alert(`Failed to delete item: ${err.response?.data?.message || 'An unexpected error occurred'}`);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow border border-gray-200">
      <div className="flex items-center space-x-6">
        <UserCircleIcon className="h-20 w-20 text-gray-400" />
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Welcome, {user.name}!</h2>
          <p className="text-gray-500">Here are your profile details and reports.</p>
        </div>
      </div>

      <div className="mt-6 border-t pt-6 space-y-2 text-gray-700">
        <div><span className="font-medium">Full Name:</span> {user.name}</div>
        <div><span className="font-medium">Email:</span> {user.email}</div>
        {/* <div><span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</div> */}
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-red-600 mb-4">🛑 Your Lost Reports</h3>
        {lostItems.length === 0 ? (
          <p className="text-gray-500">No lost items reported yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostItems.map(item => (
              <ItemCard key={item._id} item={item} type="lost" onDelete={deleteItem} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-green-600 mb-4">✅ Your Found Reports</h3>
        {foundItems.length === 0 ? (
          <p className="text-gray-500">No found items reported yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundItems.map(item => (
              <ItemCard key={item._id} item={item} type="found" onDelete={deleteItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;