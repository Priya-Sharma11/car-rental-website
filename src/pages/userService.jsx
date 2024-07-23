import React, { useState, useEffect,createContext } from 'react';
import axios from 'axios';
import { Link , NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useServiceContext } from "../store/servicecontext";
import GridView from '../components/servicePage/GridView';

const userService = () => {
  
  const { isLoading, services } = useServiceContext();

  const [cars, setCars] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryCars, setCategoryCars] = useState([]);
  
  const [selectCar,setSelectCar] = useState(null);
  const [showModal, setShowModal]=useState(false);

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

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    try {
      const response = await axios.get(`http://localhost:4000/services/getCarByCategory/${category}`);
      setCategoryCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  }

  if (!isLoggedIn) {
    return navigate("/login")
  } 

  const handleBookNow = async (car) => {
    console.log("selected car",selectedCarDetails);
    await selectedCarDetails(car.id);
    navigate("/bookings");
    /* setSelectCar(car);

    console.log(selectCar);
    history.push({
      pathname: "/bookings",
      state: { car: car }
    }); */
  /*   setShowModal(true); */
  };
  
  useEffect(() => {
    console.log(selectCar);
  }, [selectCar]);

  const filteredCars = selectedCategory ? categoryCars : cars;
  return (
    
    <div className='container mx-auto mt-20 pt-10'>
      
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
          <option value="travellers">Travellers</option>
          <option value="LuxurySUV">Luxury SUV</option>
          <option value="luxurysedan">Luxury Sedan</option>
          <option value="PremiumSedan">Premium Sedan</option>
          <option value="buses">Buses</option>
          <option value="">All Cars</option>
          {/* Add more options as needed */}
        </select>
       
      </div>
      
      <div className="container mx-auto grid grid-cols-3 gap-8">
        <h2 className="text-2xl font-bold mb-2 col-span-3">Cars in {selectedCategory || 'All'} category:</h2>
        {filteredCars.map((car, index) => (
        
          <div key={index} className="bg-white shadow-md rounded-md p-4 border-black">
            <img src={car.image} alt={car.Model} className="h-42 w-full object-cover mb-4" />
            <h2 className="text-xl font-bold  mb-2">{car.Model}</h2>
            {/* <p>Transmission: {car.Transmission}</p>
            <p>Fuel Type: {car.FuelType}</p> */}
            <p>Seating Capacity: {car.SeatingCapacity}</p>
            <p>Price: {car.Price}</p>
             <button onClick={() => handleBookNow(car)} className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6"
            type="submit">Book Now </button>
          </div>
         
        ))}
      </div>
      
    </div>
       
   
    </div>
  );
};

export default userService;






