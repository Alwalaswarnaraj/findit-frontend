// LostItemForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LostItemForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    dateLost: "",
    contactInfo: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (image) data.append("image", image);

    try {
      const res = await api.post("/api/lost", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Lost item submitted:", res.data);
      toast.success("Lost item submitted successfully!");
      setFormData({ title: "", description: "", location: "", dateLost: "", contactInfo: "" });
      setImage(null);
      // navigate("/"); // redirect or show success
    } catch (err) {
      console.error("Error submitting lost item:", err);
      const errorMessage = err.response?.data?.message || "Failed to submit lost item";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Report a Lost Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Item Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Item Title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Item Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Item Description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location Lost:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location Lost"
            value={formData.location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="dateLost" className="block text-gray-700 text-sm font-bold mb-2">Date Lost:</label>
          <input
            type="date"
            id="dateLost"
            name="dateLost"
            value={formData.dateLost}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="contactInfo" className="block text-gray-700 text-sm font-bold mb-2">Your Contact Info:</label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            placeholder="Your Contact Info"
            value={formData.contactInfo}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image (Optional):</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-sm italic">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Lost Item"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default LostItemForm;