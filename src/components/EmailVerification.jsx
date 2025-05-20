import React, { useState } from 'react';
import axios from 'axios';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [verified, setVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('/api/users/verify-otp', {email, otp}); // Adjust URL if needed
      setMessage(res.data.message);
      setVerified(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Email Verification
        </h2>

        <input
          type="email"
          className="w-full p-2 border mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full p-2 border mb-3 rounded"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Verify Email
        </button>

        {message && (
          <p
            className={`mt-4 text-center ${
              verified ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EmailVerification;
