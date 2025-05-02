import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Copy, MessageSquare } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";


const LostItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        toast.dismiss(); // Dismiss all toasts
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/api/lost/${id}`);
        setItem(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleCopy = () => {
    if (item?.contactInfo) {
      navigator.clipboard.writeText(item.contactInfo);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleComingSoon = () => {
    toast.info("Coming soon!", { position: "top-center" });
  };

  if (loading)
    return <p className="text-center mt-6 text-gray-500">Loading...</p>;
  if (!item)
    return <p className="text-center mt-6 text-gray-500">Item not found.</p>;

  return (
    <>
      <ToastContainer />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-3 text-gray-800">
            {item.title}
          </h2>
          <p className="text-gray-700 mb-4">{item.description}</p>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Location Lost:</strong> {item.location}
            </p>
            <p>
              <strong>Date Lost:</strong>{" "}
              {new Date(item.dateLost).toLocaleDateString()}
            </p>
            <p>
              <strong>Posted by:</strong> {item.user?.name || "Unknown"}
            </p>
          </div>

          <div className="mt-4 bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-800">Contact Info:</span>
              <button
                onClick={handleCopy}
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                <Copy size={16} className="mr-1" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-gray-700 break-all">{item.contactInfo}</p>
          </div>

          {token && item.user?._id !== currentUserId && (
            <button
              onClick={handleComingSoon}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <MessageSquare size={18} /> Message Owner
            </button>
          )}
        </div>

        {item.image && (
          <div className="w-full md:w-64 flex-shrink-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-auto rounded-xl object-cover shadow-md"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default LostItemDetails;
