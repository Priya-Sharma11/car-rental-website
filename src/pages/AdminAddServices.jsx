import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
const navigate = useNavigate();

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
      if (response.ok) {
      alert("Service Added Successfully");
      navigate("/admin/services");
      
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
  <div className='relative bg-gray-100 min-h-screen py-12'>
  <div className=' absolute inset-0 bg-cover bg-center opacity-90 ' style={{ backgroundImage: "url('../../Images/1.jpeg')"  ,backgroundSize: "cover", backgroundPosition: "center"}}>
    <div className='container mx-auto'>
      <div className="max-w-md mx-auto bg-white bg-opacity-0 shadow-md rounded px-8 mt-10 pt-6 pb-8 mb-4" style={{ marginLeft: "-5%" }}>
        <h2 className="text-4xl text-blue-700 font-bold font-serif text-center mb-4">Add Service</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            Model:
            <input
              type="text"
              name="Model"
              value={car.Model}
              onChange={handleChange}
              className="p-2 block w-full border-b border-gray-300 rounded-none bg-transparent "
              required
            />
          </label>
          <label className="block mb-4">
            Transmission:
            <input
              type="text"
              name="Transmission"
              value={car.Transmission}
              onChange={handleChange}
              className="p-2 block w-full border-b border-gray-300 rounded-none bg-transparent"
              required
            />
          </label>
          <label className="block mb-4">
            FuelType:
            <input
              type="text"
              name="FuelType"
              value={car.FuelType}
              onChange={handleChange}
              className="p-2 block w-full border-b border-gray-300 rounded-none bg-transparent"
              required
            />
          </label>
          <label className="block mb-4">
            SeatingCapacity:
            <input
              type="number"
              name="SeatingCapacity"
              value={car.SeatingCapacity}
              onChange={handleChange}
              className="p-2 block w-full border-b border-gray-300 rounded-none bg-transparent"
              required
            />
          </label>
          <label className="block mb-4">
            Price:
            <input
              type="text"
              name="Price"
              value={car.Price}
              onChange={handleChange}
              className="p-2 block w-full border-b border-gray-300 rounded-none bg-transparent"
              required
            />
          </label>
          <label className="block mb-4">
            Category:
            <select
              name="category"
              value={car.category}
              onChange={handleChange}
              className="p-2 block w-full border-b border-gray-100 rounded-none bg-transparent"
              required
            >
              <option value="">Select a category</option>
              <option value="travellers">Travellers</option>
              <option value="luxury suv">Luxury SUV</option>
              <option value="PremiumSedan">Premium Sedan</option>
              <option value="luxurysedan">Luxury Sedan</option>
              <option value="buses">Buses</option>
            </select>
          </label>
          <label className="block mb-4">
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
          <button type="submit" className="bg-pink-400 text-white hover:bg-pink-600 mt-4 px-4 py-2 rounded w-full">
            Add Car
          </button>
        </form>
      </div>
    </div>
  </div>
  </div>
);

};

export default AdminServices;
