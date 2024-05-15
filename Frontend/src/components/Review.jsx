import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';
import AddReviewForm from './AddReviewForm';

const Review = ({ carId, isLoggedIn, user }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
          customer_name: user.name, // Pass logged-in user's name
          rating,
          description,
        }),
      });
      if (response.ok) {
        // Fetch reviews again to update the list
        fetchReviews();
      } else {
        setError('Failed to add review');
      }
    } catch (error) {
      setError('Error adding review');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
      <span id="about"></span>
      <div className="container">
        {/* Header */}
        <div className="space-y-4 pb-12">
          <p
            data-aos="fade-up"
            className="text-3xl font-semibold text-center sm:text-4xl font-serif"
          >
            Customer Reviews
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
        {reviews.map((review, index) => (
  <div
    key={index}
    className={`card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300 rounded-lg`}
    data-aos="fade-up"
    data-aos-delay={100 * index}
  >
    <div className="grid place-items-center">
    <img
        src={review.user?.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZeQl0LtnM37UdRF6YYK6rVmfYDmw7O_DmGDZ4Ro67fw&s'} // Provide a default image path if user or image is undefined
        alt=""
        className="rounded-full w-20 h-20"
      />
    </div>
    <div className="text-2xl">⭐⭐⭐⭐⭐</div>
    <p>{review.description}</p>
    <p className="text-center font-semibold">{review.customer_name}</p>
  </div>
))}


        </div>
        {isLoggedIn && (
          <div className="mt-4 ">
            <AddReviewForm addReview={addReview} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
