import React from 'react';
import aboutUs from '../../../public/Images/aboutUS.jpg';
import watch from '../../../public/Images/24.png';
import customer from '../../../public/Images/customer.png';
import comfort from '../../../public/Images/comfort.png';
import cars from '../../../public/Images/cars.png';
import price from '../../../public/Images/price.png';
import maintained from '../../../public/Images/maintained.png';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className='bg-gradient-to-r from-gray-200 to-white py-14'>
      <div className="container w-[1020px] min-h-[820px] mb-12 z-12">
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2">
          <div>
            <h1 className='text-center text-red text-3xl font-serif font-bold mt-15 text-slate-700 '>Unlock Your Next Adventure</h1>
            <h3 className="flex text-center text-xl sm:text-xl font-bold text-justify mb-3 mt-6">Brothers Travels is your go-to travel partner, offering all types of taxis, SUVs, and Tempo Travellers for both local NCR trips and outstation journeys. With 24x7 service availability, we ensure convenience and reliability, making booking your cab effortless. Click the link below to secure your transportation and embark on your next adventure with Brothers Travels.</h3>
          </div>
         
          <div>
            <img src={aboutUs} alt="" class="w-60 h-auto mt-15" />
          </div>
          <Link to="/about">
          <button className="px-6 py-3 rounded-full font-bold text-black-500 bg-red-100 shadow-md inline-flex space-x-2 hover:bg-green-200 transition-colors duration-300">
                Get Started
              </button></Link>
        </div>
        <div className='text-center text-4xl font-serif font-bold mt-16 text-slate-800'>
          <p>Why us?</p>
        </div>
        {/* About Us section */}
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-3 gap-4 mt-12 mb-14">
       
          <div className="text-center">
            <div>
              <img src={watch} alt='time' width={80} height={80}/>
            </div>
            <p className="mt-2">24/7 Availability</p>
          </div>
          <div className="text-center">
            <div>
              <img src={price} alt='time' width={80} height={80}/>
            </div>
            <p className="mt-2">Best Price</p>
          </div>
          
          <div className="text-center">
            <div>
              <img src={cars} alt='time' width={80} height={80}/>
            </div>
            <p className="mt-2"> Luxurious Cars</p>
          </div>
          <div className="text-center mt-6">
            <div>
              <img src={maintained} alt='time' width={80} height={80}/>
            </div>
            <p className="mt-2">Well-maintained</p>
          </div>
       
          <div className="text-center mt-6">
            <div>
              <img src={comfort} alt='time' width={80} height={80}/>
            </div>
            <p className="mt-2">Comfortable</p>
          </div>
          <div className="text-center mt-6">
            <div>
              <img src={customer} alt='time' width={80} height={80}/>
            </div>
            <p className="mt-2">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs;
