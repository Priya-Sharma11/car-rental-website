import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';

const AdminBookings = () => {
  const [previousBookings, setPreviousBookings] = useState([]);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [showPrevious, setShowPrevious] = useState(true);
  const { authorizationToken } = useAuth();

  const getBookingsData = async () => {
    try {
      const response = await fetch("http://localhost:4000/admin/bookings", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      console.log("Data from server:", data);
      if (response.ok) {
        // Filter bookings into previous and current bookings
        const currentDate = new Date();
        const previous = data.previousBookings;
        const current = data.currentBookings;
        
        setPreviousBookings(previous);
        setCurrentBookings(current);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getBookingsData();
  }, []);

  const handleToggleBookings = () => {
    console.log("Toggle button clicked");
    setShowPrevious(!showPrevious);
  };
  

  return (
    <div className="mx-auto">
      <h1 className="mt-12 pt-12 mb-8 text-4xl font-bold font-serif relative flex justify-center items-center ">
        <span className="bg-gradient-to-r from-blue-500 to-red-500 text-transparent bg-clip-text">
          All Bookings
        </span>
      </h1>
      
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-4">
        <button className={`mx-2 py-2 px-4 rounded ${showPrevious ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={handleToggleBookings}>Previous Bookings</button>
        <button className={`mx-2 py-2 px-4 rounded ${showPrevious ? 'bg-gray-200 text-gray-800' : 'bg-purple-500 text-white'}`} onClick={handleToggleBookings}>Current Bookings</button>
      </div>

      {/* Bookings Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">{showPrevious ? 'Previous Bookings' : 'Current Bookings'}</h3>
        <table className="table-auto w-full border-collapse mb-12">
          {/* Table headers */}
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone Number</th>
              <th className="px-4 py-2 border">Car</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Pickup Date</th>
              <th className="px-4 py-2 border">Pickup Time</th>
              <th className="px-4 py-2 border">Source</th>
              <th className="px-4 py-2 border">Destination</th>
              <th className="px-4 py-2 border">Persons</th>
              {/* Add other headers as needed */}
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {showPrevious ? (
              previousBookings.map((booking, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-2 border">{booking.name}</td>
                  <td className="px-4 py-2 border">{booking.email}</td>
                  <td className="px-4 py-2 border">{booking.phoneNumber}</td>
                  <td className="px-4 py-2 border">{booking.carData && booking.carData.Model}</td>
                  <td className="px-4 py-2 border">{booking.carData && booking.carData.Price}</td>
                  <td className="px-4 py-2 border">{booking.carData && booking.carData.category}</td>
                  <td className="px-4 py-2 border">{booking.pickupDate}</td>
                  <td className="px-4 py-2 border">{booking.pickupTime}</td>
                  <td className="px-4 py-2 border">{booking.source}</td>
                  <td className="px-4 py-2 border">{booking.destination}</td>
                  <td className="px-4 py-2 border">{booking.persons}</td>
                </tr>
              ))
            ) : (
              currentBookings.map((booking, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-4 py-2 border">{booking.name}</td>
                  <td className="px-4 py-2 border">{booking.email}</td>
                  <td className="px-4 py-2 border">{booking.phoneNumber}</td>
                  <td className="px-4 py-2 border">{booking.carData && booking.carData.Model}</td>
                  <td className="px-4 py-2 border">{booking.carData && booking.carData.Price}</td>
                  <td className="px-4 py-2 border">{booking.carData && booking.carData.category}</td>
                  <td className="px-4 py-2 border">{booking.pickupDate}</td>
                  <td className="px-4 py-2 border">{booking.pickupTime}</td>
                  <td className="px-4 py-2 border">{booking.source}</td>
                  <td className="px-4 py-2 border">{booking.destination}</td>
                  <td className="px-4 py-2 border">{booking.persons}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default AdminBookings;
