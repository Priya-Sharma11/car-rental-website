import React from 'react'
import { useServiceContext } from '../store/servicecontext'
import { NavLink } from 'react-router-dom';
import { useFilterContext } from '../store/filterContext';


const CarList = () => {
  const {services} = useServiceContext();
  return (
    <div className="container mx-auto grid grid-cols-3 gap-9 mb-12 mt-20 pt-20">
    {/* Your code for displaying services */}
    {services.map((car, index) => (
      <NavLink key={index} to={`/singleService/${car._id}`} >
        <div className="flex flex-col bg-white shadow-md rounded-md p-2 border-black">
          {/* Display car information */}
          <img src={car.image} alt={car.Model} className="h-28 w-full object-cover mb-4" />
          <h2 className="text-xl font-bold mb-2">{car.Model}</h2>
          {/* <p>Transmission: {car.Transmission}</p>
          <p>Fuel Type: {car.FuelType}</p> */}
          <p>Seating Capacity: {car.SeatingCapacity}</p>
          <p >Price: {car.Price}</p>
        </div>
      </NavLink>
    ))}
  </div>
  )
}

export default CarList
