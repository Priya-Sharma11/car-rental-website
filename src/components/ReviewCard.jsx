import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-gray-200 shadow-md rounded-md p-4 border-black w-full sm:w-auto mb-8   ">
      <div className="text-center mb-4">
        <img src={review.image} alt={review.customer_name} className="h-20 w-20 rounded-full object-cover mx-auto mb-2" />
        <h2 className="text-lg font-semibold">{review.customer_name}</h2>
      </div>
      <p className="text-gray-800 p-6 font-serif font-semiBold">{review.description}</p>
    </div>
  );
};

export default ReviewCard;
