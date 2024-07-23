import React, { useState, useEffect } from 'react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/reviews/getAllReviews')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/reviews/deleteReviews/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      setReviews(reviews.filter(review => review._id !== id));
    })
    .catch(error => console.error('Error deleting review:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 mt-12 flex justify-center items-center text-blue-400">Customer Reviews</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 shadow-md rounded-lg overflow-hidden mb-12 ">
          <thead className="bg-purple-400 text-white ">
            <tr>
              <th className="py-3 px-4 text-left">Customer Name</th>
              <th className="py-3 px-4 text-center">Review</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-t border-gray-200 ">
                <td className="py-4 px-6">{review.customer_name}</td>
                <td className="py-4 px-6">{review.description}</td>
                <td className="py-4 px-6">{review.rating}</td>
                <td className="py-4 px-6">
                  <button
                    className="bg-red-400 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;
