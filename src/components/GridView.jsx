import React from 'react'

const GridView = ({service}) => {
  return (

    <div className="container mx-auto grid grid-cols-3 gap-9 ">
    {/* Your code for displaying services */}
    {service.map((car, index) => (
      
        <div className="flex flex-col bg-white shadow-md rounded-md p-4 border-black">
          {/* Display car information */}
          <img src={car.image} alt={car.Model} className="h-48 w-full object-cover mb-4" />
          <h2 className="text-xl font-bold mb-2">{car.Model}</h2>
          <p>Transmission: {car.Transmission}</p>
          <p>Fuel Type: {car.FuelType}</p>
          <p>Seating Capacity: {car.SeatingCapacity}</p>
          <p>Price: {car.Price}</p>
        </div>
      
    ))}
  </div>
  )
}

export default GridView
