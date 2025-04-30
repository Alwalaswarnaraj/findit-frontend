import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // ✅ Import toast from react-toastify

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '', // Added phone field
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('token');
  
  // Redirect to home page if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/'); // Redirect to home page if user is logged in
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        toast.success('Registration successful!'); // ✅ Success toast
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      toast.error(error); // ✅ Error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          minLength="6"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p>Already have an account? 
          <button 
            onClick={() => navigate('/login')} 
            className="text-blue-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
