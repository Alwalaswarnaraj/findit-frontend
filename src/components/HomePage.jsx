import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlusCircle } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521120098171-bc2b2c65c6a1?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="bg-black bg-opacity-50 p-8 rounded-xl text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to FindIt</h1>
          <p className="text-lg mb-6">Connecting people through lost and found. Help someone or recover what you lost today!</p>
          <div className="flex justify-center gap-4">
            <Link to="/lost/report" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2 transition">
              <FaPlusCircle /> Report Lost
            </Link>
            <Link to="/found/report" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2 transition">
              <FaPlusCircle /> Report Found
            </Link>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">How FindIt Works</h2>
        <p className="text-gray-600 mb-10">FindIt helps people post and search for lost or found items. Whether it’s your pet, wallet, phone, or keys, we connect finders with seekers.</p>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">1. Report</h3>
            <p className="text-sm text-gray-700">Create a post describing what you lost or found, add details and images for better clarity.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">2. Connect</h3>
            <p className="text-sm text-gray-700">Browse listings or wait for someone to contact you through your provided info.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">3. Reunite</h3>
            <p className="text-sm text-gray-700">Help someone or get help — reunite lost items with their owners quickly and safely.</p>
          </div>
        </div>
      </section>

      {/* Recent Reports Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">🔍 Recent Reports</h2>
          <p className="text-gray-500 mb-4">Browse the latest lost or found items added by users.</p>
          <div className="text-gray-400">Coming soon...</div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
