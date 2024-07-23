import React, { useState } from 'react';
import axios from 'axios';

const CarCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryCars, setCategoryCars] = useState([]);

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    try {
      const response = await axios.get(`http://localhost:4000/services/getCarByCategory/${category}`);
      setCategoryCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  

  return (
    <div className="flex flex-col items-start p-4">
      <div className="flex items-center mb-4">
        <label htmlFor="category" className="mr-2">Select Category:</label>
        <select
          id="category"
          className="p-2 border border-gray-300 rounded"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          <option value="Travellers">Travellers</option>
          <option value="LuxurySUV">Luxury SUV</option>
          <option value="luxurysedan">Luxury Sedan</option>
          <option value="PremiumSedan">Premium Sedan</option>
          <option value="Buses">Buses</option>
          {/* Add more options as needed */}
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a1 1 0 0 1-.707-.293l-8-8a1 1 0 0 1 1.414-1.414L10 15.586l6.293-6.293a1 1 0 0 1 1.414 1.414l-7.999 8A1 1 0 0 1 10 18z" />
        </svg>
      </div>
      
      <div className="container mx-auto grid grid-cols-3 gap-8">
        <h2 className="text-xl font-semibold mb-2 col-span-3">Cars in {selectedCategory} category:</h2>
        {categoryCars.map((car, index) => (
          <div key={index} className="bg-white shadow-md rounded-md p-4 border-black">
            <img src={car.image} alt={car.Model} className="h-42 w-full object-cover mb-4" />
            
            <h2 className="text-xl font-semibold mb-2">{car.Model}</h2>
            <h3 className="text-lg font-semibold">{car.Model}</h3>
            <p>Transmission: {car.Transmission}</p>
            <p>Fuel Type: {car.FuelType}</p>
            <p>Seating Capacity: {car.SeatingCapacity}</p>
            <p>Price: {car.Price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCategories;
