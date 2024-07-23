import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import AddReviewForm from './AddReviewForm';

const Review = ({ carId, isLoggedIn, user }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchReviews();
    }
  }, [isLoggedIn]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:4000/reviews/reviews/${carId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        setError('Failed to fetch reviews');
      }
    } catch (error) {
      setError('Error fetching reviews');
    }
  };

  const addReview = async (rating, description) => {
    try {
      const response = await fetch(`http://localhost:4000/reviews/newReview/${carId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: user.name,
          rating,
          description,
          image: user.image
        }),
      });
      if (response.ok) {
        fetchReviews();
      } else {
        setError('Failed to add review');
      }
    } catch (error) {
      setError('Error adding review');
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:4000/reviews/deleteReview/${reviewId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchReviews();
      } else {
        setError('Failed to delete review');
      }
    } catch (error) {
      setError('Error deleting review');
    }
  };

  const reportReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:4000/reviews/reportReview/${reviewId}`, {
        method: 'POST',
      });
      if (response.ok) {
        fetchReviews();
      } else {
        setError('Failed to report review');
      }
    } catch (error) {
      setError('Error reporting review');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
      <span id="about"></span>
      <div className="container">
        <div className="flex flex-col">
          {reviews.length > 0 && <h2 className="font-bold text-2xl text-center font-serif mb-10 ">Customer's Review</h2>}
          {reviews.map((review, index) => (
            <div key={index} className="flex items-start space-x-6 mb-12">
              <img
                src={review.image || 'default-image-path.jpg'}
                alt={review.customer_name}
                className="rounded-full w-12 h-12"
              />
              <div>
                <p className="font-semibold">{review.customer_name}</p>
                <p>{review.description}</p>
                {user && user.isAdmin && (
                  <div className="mt-2 flex space-x-4">
                    <button
                      onClick={() => deleteReview(review._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                   {/*  <button
                      onClick={() => reportReview(review._id)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      Report
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isLoggedIn && (
        <div className="mt-12">
          <AddReviewForm addReview={addReview} />
        </div>
      )}
    </div>
  );
};

export default Review;

