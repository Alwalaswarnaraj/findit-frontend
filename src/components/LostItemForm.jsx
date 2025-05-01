import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Adjust the import path as necessary

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
      const res = await api.post("/lost", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Lost item submitted:", res.data);
      navigate("/"); // redirect or show success
    } catch (err) {
      console.error("Error submitting lost item:", err);
      setError(err.response?.data?.message || "Failed to submit lost item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Report a Lost Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Item Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Item Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          rows="4"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location Lost"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="date"
          name="dateLost"
          value={formData.dateLost}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Your Contact Info"
          value={formData.contactInfo}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border px-4 py-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default LostItemForm;
