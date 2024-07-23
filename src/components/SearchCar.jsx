import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SearchCar = () => {
  const todayDate= new Date().toISOString().split('T')[0];

  const [pickupDate,setPickupDate]=useState(todayDate);
  const [pickupErrorMessage, setPickupErrorMessage]=useState('');

  const[dropOffDate, setDropOffDate]=useState(todayDate);
  const [dropoffErrorMessage, setDropoffErrorMessage]=useState('');

 
  const handlePickupDate=(e)=>{
    const selectPickupDate=e.target.value;
    if(selectPickupDate<todayDate){
      setPickupErrorMessage("Invalid Date. Please Select a date on or after today");
    }else{
      setPickupErrorMessage('');
      setPickupDate(selectPickupDate);
    }
  }

  const handleDropOffDate=(e)=>{
    const selectDropOffDate=e.target.value;
    if(selectDropOffDate<todayDate){
      setDropoffErrorMessage("Invalid Date. Please Select a date on or after today");
    }else{
      setDropoffErrorMessage('');
      setDropOffDate(selectDropOffDate);
    }
  }
  return (
    <div className="bg-gray-280 p-11 shadow-lg rounded-lg max-w-[1500px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        {/* First column */}
        <div className="flex flex-col w-full sm:w-1/2 space-y-4 sm:space-y-2 space-x-2 sm:space-x-10 sm:flex-row sm:items-center mr-8 mb-2">
          <div className="flex items-center">
            <label htmlFor="pickupDate" className="mr-2 ml-9 text-black text-2xl font-bold">Pickup Date
            <input type="date" id="pickupDate" className="border border-white rounded px-3 py-2 bg-gray-400 text-white mt-3"
            value={pickupDate}
            onChange={handlePickupDate}/> 
            {pickupErrorMessage && <p className='text-sm text-red-500 text-size-20px mt-4'>{pickupErrorMessage}</p>}
            </label>
            
          </div>
          <div className="flex items-center">
            <label htmlFor="pickupLocation" className="mr-8 ml-9 text-black  text-2xl font-bold">Pickup Location
            <select id="pickupLocation" className="border border-white rounded px-2 py-1 bg-gray-400 text-white">
              <option value="location1">Noida</option>
              <option value="location2">Delhi</option>
              <option value="location3">Haryana</option>
            </select>
            </label>
          </div>
        </div>
        {/* Second column */}
        <div className="flex flex-col w-full sm:w-1/2 space-y-4 sm:space-y-2 sm:space-x-14 sm:flex-row sm:items-center">
        <div className="flex items-center justify-end">
            <label htmlFor="dropoffDate" className="mr-2 text-black  text-2xl font-bold">Drop-off Date
            <input type="date" id="dropoffDate" className="border border-white rounded px-3 py-2 bg-gray-400 text-white mt-3" 
            value={dropOffDate}
            onChange={handleDropOffDate}
             />
             {dropoffErrorMessage && <p className='text-sm text-red-500 text-size-20px mt-4'>{dropoffErrorMessage}</p>}
            </label>
          </div>
          <div className="flex items-center">
            <label htmlFor="dropoffLocation" className="mr-2 ml-3 text-black  text-2xl font-bold">Drop-off Location
            <select id="dropoffLocation" className="border border-white rounded px-2 py-1 bg-gray-400 text-white">
              <option value="location1">Noida</option>
              <option value="location2">Delhi</option>
              <option value="location3">Haryana</option>
            </select>
            </label>
          </div>
          
        </div>
        {/* Third column */}
        <div className="flex flex-col w-full sm:w-1/2 pl-12">
          <Link to="/login"> 
          <button className="bg-red-500 hover:bg-red-600 text-white text-2xl font-bold px-4 py-3 rounded w-[200px] flex justify-center items-center">Get Car<FaSearch className='ml-5 text-xl'/></button></Link> 
        </div>
      </div>
    </div>
  );
};

export default SearchCar;
