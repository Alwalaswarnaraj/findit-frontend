import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../../api';

const RecentReports = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([
          api.get('http://localhost:5000/api/feed/lost'),
          api.get('http://localhost:5000/api/feed/found')
        ]);
        setLostItems(lostRes.data);
        setFoundItems(foundRes.data);
      } catch (err) {
        console.error('Error loading reports:', err);
      }
    };

    fetchReports();
  }, []);

  const renderItemCard = (item, type) => (
    <Link
      to={`/${type}/${item._id}`}
      key={item._id}
      className="flex items-start gap-4 border rounded p-3 hover:shadow transition"
    >
      <img
        src={item.image || '/placeholder.jpg'}
        alt={item.title}
        className="w-20 h-20 object-cover rounded"
      />
      <div>
        <h4 className="text-lg font-semibold text-blue-700">{item.title}</h4>
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
        <p className="text-xs text-gray-400 mt-1">By: {item.user?.name}</p>
      </div>
    </Link>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Recent Reports</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Lost Items */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Lost Items</h3>
          <div className="space-y-3">
            {lostItems.map(item => renderItemCard(item, 'lost'))}
          </div>
        </div>

        {/* Found Items */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Found Items</h3>
          <div className="space-y-3">
            {foundItems.map(item => renderItemCard(item, 'found'))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentReports;
