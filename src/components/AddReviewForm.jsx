import React, { useState } from 'react';
import StarRating from './StarRating';

const AddReviewForm = ({ addReview }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    try {
      await addReview(rating, description);

      setRating(0);
      setDescription('');
      setError('');
    } catch (error) {
      console.error('Error adding review:', error);
      setError('Failed to add review');
    }
  };

  return (
    <div className="flex justify-center items-center  w-full">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl">
        <h3 className="text-2xl font-bold font-serif mb-4 text-center text-indigo-800">Add Your Review</h3>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="rating" className="block text-xl font-medium text-gray-700 mb-4">
              Rating
            </label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-xl mb-4 font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add your review here..."
              rows={4}
              className="mt-1 p-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewForm;
