import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoundItemForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [token]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    dateFound: "",
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

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (image) data.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/found", data);
      console.log("Found item submitted successfully:", res.data);
      // Reset the form or show success message
    } catch (err) {
      console.error("Error submitting found item:", err);
      setError("Failed to submit found item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4">Report a Found Item</h2>
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
          placeholder="Location Found"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="date"
          name="dateFound"
          value={formData.dateFound}
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

export default FoundItemForm;
