import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/layouts/AdminLayout';
import { Link , useNavigate} from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [showAvailableCars, setShowAvailableCars] = useState(true);

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

  const handleToggleAvailability = async (carId) => {
    try {
      const response = await axios.put(`http://localhost:4000/services/toggleAvailability/${carId}`, null, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = response.data;
      if (data.message) {
        toast.success(data.message);
        fetchCars(); // Refresh the list of cars after successful toggling
      } else {
        console.error('Failed to toggle availability:', data.error);
        // Handle error scenario (e.g., display error message)
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
      // Handle error scenario (e.g., display error message)
    }
  };
  const handleToggleShowAvailableCars = () => {
    setShowAvailableCars(prevState => !prevState);
  };


  const filteredCars = selectedCategory ? categoryCars : cars;
  const displayCars = showAvailableCars ? filteredCars.filter(car => car.available) : filteredCars.filter(car => !car.available);
  return (
    <div className='container mx-auto '>
      <div className="flex items-start">
  <div className="flex flex-wrap flex-col">
  <label className="mr-4 mt-12 pt-12 mb-4 text-xl font-bold font-serif text-purple-600"> Category</label>
    <button
      className={`p-2 border border-blue-500 rounded mb-2 ${selectedCategory === '' && 'bg-blue-200'}`}
      onClick={() => handleCategoryChange('')}
    >
      All Cars
    </button>
    <button
      className={`p-2 border border-blue-500 rounded mb-2 ${selectedCategory === 'travellers' && 'bg-blue-200'}`}
      onClick={() => handleCategoryChange('travellers')}
    >
      Travellers
    </button>
    <button
      className={`p-2 border border-blue-500 rounded mb-2 ${selectedCategory === 'luxury suv' && 'bg-blue-200'}`}
      onClick={() => handleCategoryChange('luxury suv')}
    >
      Luxury SUV
    </button>
    <button
      className={`p-2 border border-blue-500 rounded mb-2 ${selectedCategory === 'luxurysedan' && 'bg-blue-200'}`}
      onClick={() => handleCategoryChange('luxurysedan')}
    >
      Luxury Sedan
    </button>
    <button
      className={`p-2 border border-blue-500 rounded mb-2 ${selectedCategory === 'PremiumSedan' && 'bg-blue-200'}`}
      onClick={() => handleCategoryChange('PremiumSedan')}
    >
      Premium Sedan
    </button>
    <button
      className={`p-2 border border-blue-500 rounded mb-2 ${selectedCategory === 'buses' && 'bg-blue-200'}`}
      onClick={() => handleCategoryChange('buses')}
    >
      Buses
    </button>
  </div>

 

  <div className="flex-grow">
  <div className="flex justify-center mt-12 mb-4">
  <button
  className={`p-2 border border-blue-500 rounded mb-2 mr-2 ${showAvailableCars ? 'bg-green-200 hover:bg-green-300' : 'hover:bg-green-300'} text-blue-900`}
  onClick={handleToggleShowAvailableCars}
>
  Available Cars
</button>
<button
  className={`p-2 border border-blue-500 rounded mb-2 ${!showAvailableCars ? 'bg-red-200 hover:bg-red-300' : ' hover:bg-red-400'} text-blue-900`}
  onClick={handleToggleShowAvailableCars}
>
  Unavailable Cars
</button>



            </div>
  <div className="container mx-auto grid grid-cols-3 gap-7 ">
   {/*  <h2 className="text-2xl font-bold font-sans mb-2 col-span-3 mt-12 pt-12 flex justify-center items-center">Cars in {selectedCategory || 'All'} category:</h2> */}
    
    {displayCars.map((car, index) => (
  <div key={index} className="mb-6 bg-gray-100 shadow-md rounded-md p-4 border-black w-full sm:w-auto" style={{ height: '500px' }}>

   <img src={car.image} alt={car.Model} className="h-32 w-full object-cover mb-4 rounded-lg" />
   <h2 className="text-xl font-bold font-serif mb-2">{car.Model}</h2>
   <p>Transmission: {car.Transmission}</p>
   <p>Fuel Type: {car.FuelType}</p> 
   <p>Seating Capacity: {car.SeatingCapacity}</p>
   <p>Price: {car.Price}</p>
 
   <p>Availability: {car.available ? 'Available' : 'Unavailable'}</p>
   <button
     onClick={() => handleToggleAvailability(car._id)}
     className={`bg-${car.available ? 'green' : 'red'}-500 hover:bg-${car.available ? 'green' : 'red'}-700 text-white font-bold py-2 px-4 mr-4 ml-7 rounded focus:outline-none focus:shadow-outline mt-6`}
     type="button"
   >
     {car.available ? 'Make Unavailable' : 'Make Available'}
   </button>
 
   <button onClick={() => handleUpdate(car)} className="bg-emerald-600 hover:bg-green-700 text-white font-bold py-2 px-4 mr-4 ml-4 rounded focus:outline-none focus:shadow-outline mt-6" type="submit">Update</button>
   <button onClick={() => handleDeleteCar(car)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6" type="submit">Delete</button>
 </div>
 
  
    ))}
  </div>
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
        <option value="luxurysuv">Luxury SUV</option>
        <option value="PremiumSedan">Premium Sedan</option>
        <option value="luxurysedan">Luxury Sedan</option>
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






