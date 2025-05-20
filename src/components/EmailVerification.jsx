import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${baseURL}/api/users/verify-otp`, {
        email,
        otp,
      });

      toast.success(res.data.message || 'Email verified successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Delay for UX
    } catch (err) {
      const message = err.response?.data?.message || 'Verification failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Verify Your Email
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700 font-medium">OTP</label>
          <input
            type="text"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter OTP sent to your email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
