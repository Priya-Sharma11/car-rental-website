import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useServiceContext } from '../store/servicecontext';
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import Banners from '../components/Banners';

const Services = () => {
  const { isLoading, services } = useServiceContext();

  const [cars, setCars] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryCars, setCategoryCars] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is ascending
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:4000/services/getAllCars');
        setCars(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCars();
  }, []);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    try {
      let response;
      if (category === '') {
        response = await axios.get('http://localhost:4000/services/getAllCars');
      } else {
        response = await axios.get(`http://localhost:4000/services/getCarByCategory/${category}`);
      }
      setCategoryCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleSortByPrice = (order) => {
    setSortOrder(order);
  };

  const sortCarsByPrice = (a, b) => {
    const priceA = parseFloat(a.Price);
    const priceB = parseFloat(b.Price);
    if (sortOrder === 'asc') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  };

  const sortedCars = selectedCategory ? categoryCars.slice().sort(sortCarsByPrice) : cars.slice().sort(sortCarsByPrice);

  const totalCarsLength = cars.length;
  const categoryLength = selectedCategory ? categoryCars.length : totalCarsLength;
  const availableCarsLength = cars.filter(car => car.available).length;

  if (!isLoggedIn) {
    return navigate('/loginForm');
  }
  const categoryColors = {
    'travellers': 'bg-pink-500',
    'PremiumSedan': 'bg-pink-800',
    'luxury suv': 'bg-green-500',
    'luxurysedan': 'bg-red-500',
    'buses': 'bg-purple-500',
  };
  
  const availableCars = sortedCars.filter(car => car.available);
  return (
    <div className='container mx-auto mt-20 pt-10 mb-12'>
      
      <div className="flex items-start p-6">
        <div className="mr-8">
          <span className='text-3xl font-bold mb-8 mt-12 pt-12 flex justify-center items-center bg-gradient-to-r from-red-500 to-black bg-clip-text text-transparent '> Category</span>
          <div className="mt-8">
            <div className="mb-8">
              <button
                className={` bg-blue-200 text-blue-900 w-full p-2 border border-gray-300 rounded-lg hover:bg-blue-300 text-lg font-medium w-48  ${selectedCategory === '' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleCategoryChange('')}
              >
                All Cars
              </button>
            </div>
            <div className="mb-8">
              <button
                className={`bg-blue-200 text-blue-900 w-full p-2 border border-gray-300 rounded-lg hover:bg-blue-300 text-lg font-medium w-48 ${selectedCategory === 'travellers' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleCategoryChange('travellers')}
              >
                Travellers
              </button>
            </div>
            <div className="mb-8">
              <button
                className={`bg-blue-200 text-blue-900 w-full p-2 border border-gray-300 rounded-lg hover:bg-blue-300 text-lg font-medium w-48 ${selectedCategory === 'luxury suv' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleCategoryChange('luxury suv')}
              >
                Luxury SUV
              </button>
            </div>
            <div className="mb-8">
              <button
                className={`bg-blue-200 text-blue-900 w-full p-2 border border-gray-300 rounded-lg hover:bg-blue-300 text-lg font-medium w-48 ${selectedCategory === 'luxurysedan' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleCategoryChange('luxurysedan')}
              >
                Luxury Sedan
              </button>
            </div>
            <div className="mb-8">
              <button
                className={`bg-blue-200 text-blue-900 w-full p-2 border border-gray-300 rounded-lg hover:bg-blue-300 text-lg font-medium w-48 ${selectedCategory === 'PremiumSedan' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleCategoryChange('PremiumSedan')}
              >
                Premium Sedan
              </button>
            </div>
            <div className="mb-8">
              <button
                className={`bg-blue-200 text-blue-900 w-full p-2 border border-gray-300 rounded-lg hover:bg-blue-300 text-lg font-medium w-48 ${selectedCategory === 'buses' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleCategoryChange('buses')}
              >
                Buses
              </button>
            </div>

          </div>
       
        </div>

        <div className="container mx-auto grid grid-cols-3 gap-8">
        <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="text-lg font-bold">
          <p className="text-2xl font-bold font-serif bg-gradient-to-r from-red-500 to-black bg-clip-text text-transparent">Cars Available: {availableCarsLength}</p>
        
        <div className="flex justify-end mt-4  ">
  <button
    className={`bg-Indigo-500 text-blue-900 px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-300 mr-4 ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : ''}`}
    onClick={() => handleSortByPrice('asc')}
  >
    Low to High
  </button>
  <button
    className={`bg-Indigo-200 text-blue-900 py-2 px-4 border border-gray-300 rounded-lg hover:bg-blue-300 ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : ''}`}
    onClick={() => handleSortByPrice('desc')}
  >
    High to Low
  </button>
</div>
</div>

      </div>
      </div>
          <h2 className="text-2xl font-bold mb-2 col-span-3">{selectedCategory || 'All'} Cars</h2>

          {availableCars.map((car, index) => (
  <NavLink key={index} to={`/singleService/${car._id}`} className="flex flex-col">
    <div className="bg-white shadow-md rounded-md p-6 border-black flex-grow relative">
      <img src={car.image} alt={car.Model} className="h-40 w-full object-cover mb-4" />
      <h2 className="text-xl font-bold mb-2">{car.Model}</h2>
      <div className="flex items-center mb-2">
        <MdOutlineAirlineSeatReclineNormal className="mr-2" />
        <p className='ml-2'>Seating Capacity: {car.SeatingCapacity}</p>
      </div>
      <div className="flex items-center">
        <GiMoneyStack className="mr-2" />
        <p className='ml-2'>Price: {car.Price}</p>
      </div>
      <span className={`text-white rounded-full px-2 py-1 absolute bottom-0 right-0 mb-8 transform -translate-x-1/4 ${categoryColors[car.category.toLowerCase()]}`}>
        {car.category}
      </span>
    </div>
  </NavLink>
))}

        </div>
        
      </div>
    </div>
  );
};

export default Services;
