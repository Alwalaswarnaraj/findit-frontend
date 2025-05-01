import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">FindIt</Link>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          {token && (
            <>
              <Link to="/lost/report" className="text-gray-700 hover:text-blue-600">Report Lost</Link>
              <Link to="/found/report" className="text-gray-700 hover:text-blue-600">Report Found</Link>
              <Link to="/conversations" className="text-gray-700 hover:text-blue-600">Messages</Link>
            </>
          )}
          {token ? (
            <button onClick={handleLogout} className="text-red-600 hover:text-red-800">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow">
          <Link to="/" onClick={toggleMenu} className="block text-gray-700">Home</Link>
          {token && (
            <>
              <Link to="/report-lost" onClick={toggleMenu} className="block text-gray-700">Report Lost</Link>
              <Link to="/report-found" onClick={toggleMenu} className="block text-gray-700">Report Found</Link>
              <Link to="/conversations/" onClick={toggleMenu} className="block text-gray-700">Messages</Link>
            </>
          )}
          {token ? (
            <button onClick={() => { toggleMenu(); handleLogout(); }} className="text-red-600">Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="block text-gray-700">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="block text-gray-700">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
