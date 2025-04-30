import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FoundItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/found/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error('Failed to fetch item:', err);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
      <p className="text-gray-700 mb-2">{item.description}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Date Found:</strong> {new Date(item.dateFound).toLocaleDateString()}</p>
      <p><strong>Contact:</strong> {item.contactInfo}</p>
      {item.image && (
        <img src={item.image} alt={item.title} className="mt-4 rounded" />
      )}
    </div>
  );
};

export default FoundItemDetails;
