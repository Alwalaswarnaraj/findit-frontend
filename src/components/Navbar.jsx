// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { toast } from 'react-toastify';

const AuthLinks = ({ token, toggleMenu, handleLogout }) => (
  <>
    <Link
      to="/lost/report"
      className="text-gray-700 hover:text-blue-600"
      onClick={toggleMenu}
    >
      Report Lost
    </Link>
    <Link
      to="/found/report"
      className="text-gray-700 hover:text-blue-600"
      onClick={toggleMenu}
    >
      Report Found
    </Link>
    <Link
      to="#"
      onClick={(e) => {
        e.preventDefault();
        toggleMenu();
        toast.info("Coming soon!", { position: "top-center" });
      }}
      className="block text-gray-700"
    >
      Messages
    </Link>
    <Link
      to="/profile"
      className="text-gray-700 hover:text-blue-600"
      onClick={toggleMenu}
    >
      Profile
    </Link>
    <button
      onClick={handleLogout}
      className="text-red-600 hover:text-red-800"
    >
      Logout
    </button>
  </>
);

const NonAuthLinks = ({ toggleMenu }) => (
  <>
    <Link to="/login" className="text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
      Login
    </Link>
    <Link
      to="/register"
      className="text-gray-700 hover:text-blue-600"
      onClick={toggleMenu}
    >
      Register
    </Link>
  </>
);

const Navbar = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        toast.dismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          FindIt
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          {token ? (
            <AuthLinks token={token} toggleMenu={toggleMenu} handleLogout={handleLogout} />
          ) : (
            <NonAuthLinks toggleMenu={toggleMenu} />
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow">
          <Link to="/" onClick={toggleMenu} className="block text-gray-700">
            Home
          </Link>
          {token ? (
            <AuthLinks token={token} toggleMenu={toggleMenu} handleLogout={handleLogout} />
          ) : (
            <NonAuthLinks toggleMenu={toggleMenu} />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;