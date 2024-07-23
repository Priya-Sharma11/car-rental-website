import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import carImage from '../../public/Images/images1.jpeg';
import { useAuth } from '../store/auth';

const AboutTopbar = () => {
  const [pickupDate, setPickupDate] = useState('')
  const [carCategory, setCarCategory] = useState('');
  const { isLoggedIn, user } = useAuth();
  const [userName, setUserName] = useState('');
  
  const navigate = useNavigate();
  const handleSearch = () => {
    // Implement the logic to handle search and redirect to the services page
    navigate('/services');
  };
  useEffect(() => {
    if (isLoggedIn && user) {
      setUserName(user.name);
    } else {
      setUserName('');
    }
  }, [isLoggedIn, user, userName]);


  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={carImage} alt="Car" className="w-full h-[580px] object-cover" />
      <div className="absolute top-0 left-0 p-10  bg-opacity-50 rounded-lg">
        <h2 className="text-4xl font-bold text-blue-800 mb-4 font-serif"> Welcome{ isLoggedIn ? `, ${userName}` : ''} Plan Your Trip with Brothers Travels</h2>
        <p className="text-xl text-red-900 font-bold font-serif">Choose your perfect car, set your pickup date, and get ready for an amazing journey with us!</p>
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        <div className="bg-gray-700 p-6 rounded-full flex items-center space-x-4">
          <input
            type="date"
            className="bg-gray-900 text-white p-2 rounded-lg shadow-md outline-none"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            placeholder="Pickup Date"
          />
          <select
            className="bg-gray-900 text-white p-2 rounded-lg shadow-md outline-none"
            value={carCategory}
            onChange={(e) => setCarCategory(e.target.value)}
          >
            <option value="">Select a category</option>
              <option value="travellers">Travellers</option>
              <option value="luxury suv">Luxury SUV</option>
              <option value="PremiumSedan">Premium Sedan</option>
              <option value="luxurysedan">Luxury Sedan</option>
              <option value="buses">Buses</option>
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

export default AboutTopbar;
