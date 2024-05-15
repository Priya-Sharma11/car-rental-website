import React, { useEffect, useState } from 'react';
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { useAuth } from '../store/auth';

const AdminServices = () => {
  const [car, setCar] = useState({
    Model: '',
    Transmission: '',
    FuelType: '',
    SeatingCapacity: 0,
    Price: '',
    image:'',
    category: ''
    
  });
 /*  const [image,setImage]=useState(''); */
/*   console.log(image,12); */


const { authorizationToken } = useAuth();

  const handleChange = (e) => {
    setCar({...car,[e.target.name]:e.target.value});
  };

  //image 
  const convertToBase64 =(e)=>{
    console.log(e);
    var img = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload=()=>{
      console.log(reader.result);
      setCar({...car, image: reader.result})
    }
    reader.onerror=error=>{
      console.log("Error: ",error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/admin/addCars", {
        method: "POST",
        
        body: JSON.stringify({
          Model:car.Model,
          Transmission:car.Transmission,
          FuelType:car.FuelType,
          SeatingCapacity:car.SeatingCapacity,
          Price:car.Price,
          image:car.image,
          category:car.category
        }),
        headers: {
          "Content-Type":"application/json",
          Authorization: authorizationToken 
        },
      });
      const data = await response.json();
      if (data.success === true) {
        toast.success("Service Added Successfully");
        setCar({
          Model: '',
          Transmission: '',
          FuelType: '',
          SeatingCapacity: 0,
          Price: '',
          image: '',
          category: ''
        })
      }
    } catch (error) {
      console.log(error);
    }   
}


  return (
    <div className='container mx-auto mt-20'>
      
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <label>
          Model:
          <input
            type="text"
            name="Model"
            value={car.Model}
            onChange={handleChange}
            className="mb-4 p-2 block w-full border border-gray-300 rounded-md"

            required
          />
        </label>
        <label>
        Transmission:
          <input
            type="text"
            name="Transmission"
            value={car.Transmission}
            onChange={handleChange}
            className="mb-4 p-2 block w-full border border-gray-300 rounded-md"

            required
          />
        </label>

        <label>
        FuelType:
          <input
            type="text"
            name="FuelType"
            value={car.FuelType}
            onChange={handleChange}
            className="mb-4 p-2 block w-full border border-gray-300 rounded-md"

            required
          />
        </label>

        <label>
        SeatingCapacity:
          <input
            type="text"
            name="SeatingCapacity"
            value={car.SeatingCapacity}
            onChange={handleChange}
            className="mb-4 p-2 block w-full border border-gray-300 rounded-md"

            required
          />
        </label>

        <label>
        Price:
          <input
            type="text"
            name="Price"
            value={car.Price}
            onChange={handleChange}
            className="mb-4 p-2 block w-full border border-gray-300 rounded-md"

            required
          />
        </label>
        <label>
      
            Category:
            <select
              name="category"
              value={car.category}
              onChange={handleChange}
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
        {/* Other input fields */}
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
        <button type="submit" className="bg-blue-500 text-white mt-4 px-4 py-2 rounded">
          Add Car
        </button>
      </form>
    </div>
    </div>
  );
};

export default AdminServices;
