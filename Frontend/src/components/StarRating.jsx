import React from 'react';

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star

  // Add full filled stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 fill-current text-yellow-400"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 1.032l1.95 3.99 4.415.642a.75.75 0 0 1 .416 1.279l-3.2 3.118.758 4.413a.75.75 0 0 1-1.088.791L10 13.37l-3.851 2.026a.75.75 0 0 1-1.088-.79l.757-4.413-3.2-3.118a.75.75 0 0 1 .416-1.28l4.415-.642L10 1.031zm0 2.269L8.594 5.156a.75.75 0 0 1-.688.41l-4.01.582 2.905 2.832a.75.75 0 0 1 .216.664l-.686 4.002 3.58-1.884a.75.75 0 0 1 .698 0l3.58 1.884-.687-4.002a.75.75 0 0 1 .216-.664l2.905-2.832-4.01-.582a.75.75 0 0 1-.688-.41L10 3.3z"
        />
      </svg>
    );
  }

  // Add half star if exists
  if (hasHalfStar) {
    stars.push(
      <svg
        key="half"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 fill-current text-yellow-400"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 1.032l1.95 3.99 4.415.642a.75.75 0 0 1 .416 1.279l-3.2 3.118.758 4.413a.75.75 0 0 1-1.088.791L10 13.37l-3.851 2.026a.75.75 0 0 1-1.088-.79l.757-4.413-3.2-3.118a.75.75 0 0 1 .416-1.28l4.415-.642L10 1.031zm0 2.269L8.594 5.156a.75.75 0 0 1-.688.41l-4.01.582 2.905 2.832a.75.75 0 0 1 .216.664l-.686 4.002 3.58-1.884a.75.75 0 0 1 .698 0l3.58 1.884-.687-4.002a.75.75 0 0 1 .216-.664l2.905-2.832-4.01-.582a.75.75 0 0 1-.688-.41L10 3.3z"
        />
      </svg>
    );
  }

  // Add empty stars if needed
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg
        key={`empty-${i}`}
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 fill-current text-gray-300"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 1.032l1.95 3.99 4.415.642a.75.75 0 0 1 .416 1.279l-3.2 3.118.758 4.413a.75.75 0 0 1-1.088.791L10 13.37l-3.851 2.026a.75.75 0 0 1-1.088-.79l.757-4.413-3.2-3.118a.75.75 0 0 1 .416-1.28l4.415-.642L10 1.031zm0 2.269L8.594 5.156a.75.75 0 0 1-.688.41l-4.01.582 2.905 2.832a.75.75 0 0 1 .216.664l-.686 4.002 3.58-1.884a.75.75 0 0 1 .698 0l3.58 1.884-.687-4.002a.75.75 0 0 1 .216-.664l2.905-2.832-4.01-.582a.75.75 0 0 1-.688-.41L10 3.3z"
        />
      </svg>
    );
  }

  // Return the stars
  return <div className="flex">{stars}</div>;
};

export default StarRating;
