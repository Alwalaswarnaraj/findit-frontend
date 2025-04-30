import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">FindIt</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/lost/all" className="hover:underline">Lost Items</Link>
          <Link to="/found/all" className="hover:underline">Found Items</Link>
          <Link to="/register" className="hover:underline">Register</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          {/* Add more links later like Login/Profile */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
