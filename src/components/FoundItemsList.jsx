import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../../api';

const FoundItemsList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get('/api/found');
        setItems(res.data.foundItems || res.data);
      } catch (err) {
        console.error('Failed to fetch found items:', err);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Found Items</h2>

      <input
        type="text"
        placeholder="Search by title or location..."
        className="mb-6 w-100 p-2 border rounded shadow  "
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500">No items found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Link
              to={`/found/item/${item._id}`}
              key={item._id}
              className="border rounded-2xl shadow p-4 bg-white hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>📍 {item.location}</span>
                <span>📅 {new Date(item.dateFound).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItemsList;
