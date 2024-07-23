import React, { useState } from 'react';
import { useRouter } from 'next/router';
import carImage from '../../public/Images/about/aaa.jpg';

const CarBooking = () => {
  const [pickupDate, setPickupDate] = useState('');
  const [carCategory, setCarCategory] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    // Implement the logic to handle search and redirect to the services page
    router.push('/services');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 mb-6 md:mb-0">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Plan Your Trip with Brothers Travels</h2>
        <p className="text-lg text-gray-600">Choose your perfect car, set your pickup date, and get ready for an amazing journey with us!</p>
      </div>
      <div className="md:w-1/2 mb-6 md:mb-0">
        <img src={carImage} alt="Car" className="w-full h-auto rounded-lg shadow-md" />
      </div>
      <div className="w-full md:w-auto flex justify-center mt-6">
        <div className="bg-gray-100 p-4 rounded-full flex items-center space-x-4">
          <input
            type="date"
            className="bg-white p-2 rounded-lg shadow-md outline-none"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            placeholder="Pickup Date"
          />
          <select
            className="bg-white p-2 rounded-lg shadow-md outline-none"
            value={carCategory}
            onChange={(e) => setCarCategory(e.target.value)}
          >
            <option value="">Select Car Category</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-lg shadow-md"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutBo;
