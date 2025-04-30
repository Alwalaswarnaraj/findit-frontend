import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FoundItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/found');
        setItems(res.data.foundItems || res.data); // supports paginated or flat responses
      } catch (err) {
        console.error('Failed to fetch found items:', err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Found Items</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              to={`/found/item/${item._id}`}
              key={item._id}
              className="block border rounded-xl shadow p-4 bg-white hover:shadow-lg transition"
            >
              {/* Display the image if available */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-50 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm">📍 {item.location}</p>
              <p className="text-sm">📅 {new Date(item.dateFound).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItemsList;
