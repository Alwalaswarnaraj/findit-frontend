import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";

const NavItem = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block text-lg text-gray-800 hover:text-blue-600 transition duration-200"
  >
    {label}
  </Link>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toast.dismiss();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setMenuOpen(false);
    navigate("/");
  };

  const handleToast = () => {
    toast.info("Coming soon!", { position: "top-center" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            FindIt
          </Link>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <div className="hidden md:flex space-x-6 items-center font-medium">
            <NavItem to="/" label="Home" />
            {token ? (
              <>
                <NavItem to="/lost/report" label="Report Lost" />
                <NavItem to="/found/report" label="Report Found" />
                <button onClick={handleToast} className="text-gray-800 hover:text-blue-600">
                  Messages
                </button>
                <NavItem to="/profile" label="Profile" />
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavItem to="/login" label="Login" />
                <NavItem to="/register" label="Register" />
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Clean dropdown menu for mobile (no overlay) */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out bg-white shadow-md rounded-b-xl ${
          menuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 px-4">
          <NavItem to="/" label="Home" onClick={() => setMenuOpen(false)} />
          {token ? (
            <>
              <NavItem to="/lost/report" label="Report Lost" onClick={() => setMenuOpen(false)} />
              <NavItem to="/found/report" label="Report Found" onClick={() => setMenuOpen(false)} />
              <button onClick={handleToast} className="text-gray-800 hover:text-blue-600">
                Messages
              </button>
              <NavItem to="/profile" label="Profile" onClick={() => setMenuOpen(false)} />
              <button
                onClick={handleLogout}
                className="text-red-600 cursor-pointer hover:text-red-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login" label="Login" onClick={() => setMenuOpen(false)} />
              <NavItem to="/register" label="Register" onClick={() => setMenuOpen(false)} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
