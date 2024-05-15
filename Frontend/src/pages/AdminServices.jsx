import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/layouts/AdminLayout';
import { Link , useNavigate} from 'react-router-dom';
import { useAuth } from '../store/auth';

const AdminServices = () => {
  const [cars, setCars] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryCars, setCategoryCars] = useState([]);

  const [updateData, setUpdateData] = useState({
    Model: '',
    Transmission: '',
    FuelType: '',
    SeatingCapacity: '',
    Price: '',
    image:'',
    category:''
  });

  const [showModal, setShowModal] = useState(false); 
  const [selectedCar, setSelectedCar] = useState(null); 

  const { authorizationToken } = useAuth();

    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:4000/services/getAllCars');
        setCars(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
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
  
  const handleUpdate = (car) => {
    setSelectedCar(car);
    console.log(selectedCar) // Set selected car details
    setShowModal(true); // Open modal
    setUpdateData({
      Model: car.Model,
      Transmission: car.Transmission,
      FuelType: car.FuelType,
      SeatingCapacity: car.SeatingCapacity,
      Price: car.Price,
      image: car.image,
      category: car.category
  })
}

const handleSaveChanges = async () => {
  try {
    const response = await axios.put(`http://localhost:4000/admin/updateCar/${selectedCar._id}`, updateData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationToken,
      },
    });
    const data = response.data;
    if (data.message) {
      alert(data.message);
      setShowModal(false); // Close the modal after updating the car
      fetchCars();
    } else {
      console.error('Failed to update car:', data.error);
      // Handle error scenario (e.g., display error message)
    }
  } catch (error) {
    console.error('Error updating car:', error);
    // Handle error scenario (e.g., display error message)
  }
};


  
  const convertToBase64 =(e)=>{
    console.log(e);
    var img = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload=()=>{
      console.log(reader.result);
      setUpdateData(prevState => ({ ...prevState, image: reader.result }));
    }
    reader.onerror=error=>{
      console.log("Error: ",error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleDeleteCar = async (car) => {
    try {
      const response = await axios.delete(`http://localhost:4000/admin/deleteCar/${car._id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = response.data;
      if (data.message) {
        console.log(data.message);
        fetchCars(); // Refresh the list of cars after successful deletion
      } else {
        console.error('Failed to delete car:', data.error);
        // Handle error scenario (e.g., display error message)
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      // Handle error scenario (e.g., display error message)
    }
  };
  
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
          <option value="Travellers">Travellers</option>
          <option value="LuxurySUV">Luxury SUV</option>
          <option value="luxurysedan">Luxury Sedan</option>
          <option value="PremiumSedan">Premium Sedan</option>
          <option value="Buses">Buses</option>
          <option value="">All Cars</option>
          {/* Add more options as needed */}
        </select>
       
      </div>
      
      <div className="container mx-auto grid grid-cols-3 gap-8">
        <h2 className="text-xl font-bold font-sans mb-2 col-span-3">Cars in {selectedCategory || 'All'} category:</h2>
        {filteredCars.map((car, index) => (
          
          <div key={index} className="bg-white shadow-md rounded-md p-4 border-black">
            <img src={car.image} alt={car.Model} className="h-42 w-full object-cover mb-4 " />
            
            <h2 className="text-xl font-bold font-serif mb-2">{car.Model}</h2>
            
            <p>Transmission: {car.Transmission}</p>
            <p>Fuel Type: {car.FuelType}</p> 
            <p>Seating Capacity: {car.SeatingCapacity}</p>
            <p>Price: {car.Price}</p>
            <button onClick={() => handleUpdate(car)}className="bg-emerald-600 hover:bg-green-700 text-white font-bold py-2 px-4 mr-12 ml-8 rounded focus:outline-none focus:shadow-outline mt-6"
            type="submit">Update </button>
            <button onClick={() => handleDeleteCar(car)}className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-12 rounded focus:outline-none focus:shadow-outline mt-6"
            type="submit">Delete </button>
          </div>
          
        ))}
      </div>
    </div>
    {showModal && selectedCar && (
        < div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Update Car Details</h3>
                    <div className="mt-2">
                      {/* Form fields for updating car details */}
                      <input
                        type="text"
                        name="Model"
                        value={updateData.Model}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 mb-2 w-full"
                        placeholder="Model"
                      />
                      <input
                        type="text"
                        name="Transmission"
                        value={updateData.Transmission}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 mb-2 w-full"
                        placeholder="Model"
                      />
                       <input
                        type="text"
                        name="FuelType"
                        value={updateData.FuelType}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 mb-2 w-full"
                        placeholder="Model"
                      />
                       <input
                        type="text"
                        name="SeatingCapacity"
                        value={updateData.SeatingCapacity}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 mb-2 w-full"
                        placeholder="Model"
                      />
                       <input
                        type="text"
                        name="Price"
                        value={updateData.Price}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded p-2 mb-2 w-full"
                        placeholder="Model"
                      />
                      <label>
            Image:
            <input
            accept='image/*'
              type='file'
              name='image'
              onChange={convertToBase64}
              className='block w-full mt-1'
              required
            />
           
          </label>
                      <label>
      
      Category:
      <select
        name="category"
        value={updateData.category}
        onChange={handleInputChange}
        className="mb-4 p-2 block w-full border border-gray-300 rounded-md"
        required
      >
        <option value="">Select a category</option>
        <option value="travellers">Travellers</option>
        <option value="luxury suv">Luxury SUV</option>
        <option value="premium sedan">Premium Sedan</option>
        <option value="luxury sedan">Luxury Sedan</option>
        <option value="buses">Buses</option>
      </select>
    </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleSaveChanges} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Save Changes
                  
                </button>
                <button onClick={() => setShowModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>  
    </div>
  )};
  </div>
)}


export default AdminServices;






