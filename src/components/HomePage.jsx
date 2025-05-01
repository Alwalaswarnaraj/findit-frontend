import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaPlusCircle } from 'react-icons/fa';

const HomePage = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [lostPage, setLostPage] = useState(1);
  const [foundPage, setFoundPage] = useState(1);
  const [hasMoreLost, setHasMoreLost] = useState(true);
  const [hasMoreFound, setHasMoreFound] = useState(true);

  const fetchLostItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/lost?pageNumber=${lostPage}&pageSize=3`);
      const newItems = res.data.lostItems || res.data;
  
      setLostItems(prev => {
        const ids = new Set(prev.map(item => item._id));
        const filtered = newItems.filter(item => !ids.has(item._id));
        return [...prev, ...filtered];
      });
  
      setHasMoreLost(lostPage < res.data.pages);
    } catch (err) {
      console.error('Failed to fetch lost items:', err);
    }
  };
  
  const fetchFoundItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/found?pageNumber=${foundPage}&pageSize=3`);
      const newItems = res.data.foundItems || res.data;
  
      setFoundItems(prev => {
        const ids = new Set(prev.map(item => item._id));
        const filtered = newItems.filter(item => !ids.has(item._id));
        return [...prev, ...filtered];
      });
  
      setHasMoreFound(foundPage < res.data.pages);
    } catch (err) {
      console.error('Failed to fetch found items:', err);
    }
  };
  

  useEffect(() => {
    fetchLostItems();
  }, [lostPage]);

  useEffect(() => {
    fetchFoundItems();
  }, [foundPage]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521120098171-bc2b2c65c6a1?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-xl text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to FindIt</h1>
          <p className="text-lg mb-6">
            Connecting people through lost and found. Help someone or recover what you lost today!
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/lost/report"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2 transition"
            >
              <FaPlusCircle /> Report Lost
            </Link>
            <Link
              to="/found/report"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2 transition"
            >
              <FaPlusCircle /> Report Found
            </Link>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">How FindIt Works</h2>
        <p className="text-gray-600 mb-10">
          FindIt helps people post and search for lost or found items. Whether it’s your pet, wallet, phone, or keys,
          we connect finders with seekers.
        </p>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">1. Report</h3>
            <p className="text-sm text-gray-700">
              Create a post describing what you lost or found, add details and images for better clarity.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">2. Connect</h3>
            <p className="text-sm text-gray-700">
              Browse listings or wait for someone to contact you through your provided info.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">3. Reunite</h3>
            <p className="text-sm text-gray-700">
              Help someone or get help — reunite lost items with their owners quickly and safely.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Reports Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4">🔍 Recent Lost & Found Reports</h2>

          {/* Lost Items */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-red-600">📍 Recently Lost Items</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {lostItems.map((item) => (
                <Link
                  to={`/lost/${item._id}`}
                  key={item._id}
                  className="bg-white rounded shadow p-4 hover:shadow-md transition"
                >
                  {item.image && (
                    <img
                      src={`${item.image}`}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                  )}
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-600 truncate">{item.description}</p>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </Link>
              ))}
            </div>
            {hasMoreLost && (
              <button
                onClick={() => setLostPage((prev) => prev + 1)}
                className="mt-4 text-blue-600 hover:underline block"
              >
                Load More Lost Items
              </button>
            )}
            <Link to="/lost/all" className="text-blue-700 font-medium block mt-2 hover:underline">
              View All Lost Items →
            </Link>
          </div>

          {/* Found Items */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-3 text-green-600">✅ Recently Found Items</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {foundItems.map((item) => (
                <Link
                  to={`/found/${item._id}`}
                  key={item._id}
                  className="bg-white rounded shadow p-4 hover:shadow-md transition"
                >
                  {item.image && (
                    <img
                      src={`${item.image}`}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                  )}
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-600 truncate">{item.description}</p>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </Link>
              ))}
            </div>
            {hasMoreFound && (
              <button
                onClick={() => setFoundPage((prev) => prev + 1)}
                className="mt-4 text-blue-600 hover:underline block"
              >
                Load More Found Items
              </button>
            )}
            <Link to="/found/all" className="text-blue-700 font-medium block mt-2 hover:underline">
              View All Found Items →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
