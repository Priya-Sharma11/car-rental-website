import React from 'react';
import { useLocation } from 'react-router-dom';

const Bookings = () => {
  const location = useLocation();
  const { car } = location.state;

  return (
    <div className="container mx-auto mt-20 pt-10">
      <div className="flex flex-col items-start p-4">
        <h2 className="text-2xl font-bold mb-2">Booking Details</h2>
        <div className="bg-white shadow-md rounded-md p-4 border-black">
          <img src={car.image} alt={car.Model} className="h-42 w-full object-cover mb-4" />
          <h2 className="text-xl font-bold mb-2">{car.Model}</h2>
          <p>Seating Capacity: {car.SeatingCapacity}</p>
          <p>Price: {car.Price}</p>
          <p>Transmission: {car.Transmission}</p>
          <p>Fuel Type: {car.FuelType}</p>
        </div>
        {/* You can add a form here to collect booking information */}
      </div>
    </div>
  );
};

export default Bookings;
