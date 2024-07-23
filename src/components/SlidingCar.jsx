import React from 'react';
import pic1 from '../../public/Images/3.png'
const SlidingCar = () => {
  return (
    <div className="relative overflow-hidden bg-gray-200">
      <div className="absolute top-0 left-0 w-full h-full flex items-center whitespace-nowrap slidingCars">
        <img src={pic1} alt="Car 1" className="inline-block h-40 mx-4" />
       {/*  <img src={addverb} alt="Car 2" className="inline-block h-40 mx-4" />
        <img src={asian} alt="Car 3" className="inline-block h-40 mx-4" />
        <img src={bureau} alt="Car 4" className="inline-block h-40 mx-4" />
        <img src={dnv} alt="Car 5" className="inline-block h-40 mx-4" />
        <img src={emerson} alt="Car 6" className="inline-block h-40 mx-4" />
        <img src={hcl} alt="Car 7" className="inline-block h-40 mx-4" />
        <img src={who} alt="Car 8" className="inline-block h-40 mx-4" /> */}
      </div>
    </div>
  );
};

export default SlidingCar;
