import React from 'react';

const StarRating = ({ rating, setRating }) => {
  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 cursor-pointer stroke-current ${
            index < rating ? 'text-yellow-300' : 'text-gray-200'
          }`}
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          onClick={() => handleClick(index + 1)}
        >
          <path
            d="M21.3 8.74l-5.52-.76L12 3 8.22 8.74l-5.52.76 4.02 4.12L6.31 20 12 16.27 17.69 20l-1.73-6.14 4.02-4.12z"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
