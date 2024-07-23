import React from 'react';
import axios from 'axios';
import { useFilterContext } from '../../store/filterContext';

const FilterSection = () => {
  const { fetchCarsByCategory } = useFilterContext(); 

  const handleCategoryClick = async (category) => {
    console.log('Category clicked:', category);
    try {
      await fetchCarsByCategory(category);
      console.log(category);
    } catch (error) {
      console.error('Error fetching cars by category:', error);
    }
  };

  const categories = ['Buses', 'Travellers', 'Luxury SUV', 'Luxury Sedan', 'Premium Sedan'];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 mt-12 pt-12 flex justify-center items-center">Category</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category, index) => (
          <div key={index} className="mb-4">
            <button 
              className="bg-blue-200 text-blue-900 px-6 py-4 rounded-lg hover:bg-blue-300 focus:outline-none focus:bg-blue-300 text-lg font-medium w-48 h-16"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
