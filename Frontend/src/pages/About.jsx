import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import Subfooter from '../components/SubFooter';
import Banners from '../components/Banners';
import aaa from "../../public/Images/about/aaa.jpg";
import addverb from "../../public/Images/about/addverb.jpg";
import asian from "../../public/Images/about/asian.jpg";
import bureau from "../../public/Images/about/bureau.jpg";
import dnv from "../../public/Images/about/dnv.jpg";
import emerson from "../../public/Images/about/emerson.jpg";
import hcl from "../../public/Images/about/hcl.jpg";
import who from "../../public/Images/about/who.jpg";
import CustomerReview from '../components/CustomerReview';


const About = () => {
  const { isLoggedIn,user } = useAuth();
  const [userName, setUserName] = useState('');
 
  useEffect(() => {
    if (isLoggedIn && user) {
      setUserName(user.name);
    } else {
      setUserName('');
    }
  }, [isLoggedIn, user, userName]);
  
  return (
    <div className="container mx-auto mt-20 pt-20  ">
     <div className="text-center ">
  <p className="text-4xl font-bold font-serif text-blue-300">
    Welcome{ isLoggedIn ? `, ${userName}` : ''} to Brother's Travels
  </p>
  <h2 className="text-3xl font-bold text-red-500 mt-4 mb-6">
    Where Luxury Drives Excellence
  </h2>
</div>

      <Subfooter />
      <div className="container mx-auto text-left mt-8 px-4 ">
  <p className="mb-6 text-lg font-bold font-sans text-gray-800 leading-relaxed">
    Welcome to Brothers Travels, your ultimate travel companion for all your transportation needs. We specialize in providing a wide range of taxis, SUVs, and Tempo Travellers, catering to both local trips within the NCR region and exciting outstation journeys.
  </p>
  <p className="mb-6 text-lg font-bold text-gray-800 leading-relaxed">
    At Brothers Travels, we understand the importance of convenience and reliability when it comes to your travel arrangements. That's why we're dedicated to offering round-the-clock service availability, ensuring that you can book your cab at any time of the day or night.
  </p>
  <p className="mb-6 text-lg font-bold text-gray-800 leading-relaxed">
    Our goal is to make your travel experience seamless and stress-free. Whether you're planning a weekend getaway with friends, a family vacation, or a business trip, you can trust Brothers Travels to provide you with comfortable and safe transportation options.
  </p>
  <p className="mb-6 text-lg  font-bold text-gray-800 leading-relaxed">
    Booking your cab with Brothers Travels is quick and easy. Simply click the link below to secure your transportation and embark on your next adventure with confidence. We look forward to being a part of your journey and helping you create unforgettable memories along the way.
  </p>
  <p className="mb-8 text-xl font-bold text-gray-600 leading-relaxed">
    “We pride ourselves on being just the right size chauffeured car business – not too big, not too small. This means we have a small but experienced team of drivers, dedicated to providing the highest quality service in town. We promise to always have a car that suits your needs and service with a smile. Book your next luxury ride today.”
  </p>
</div>

      <div className='container mx-auto mt-8 p-9 '>
      <div className='text-center mb-8 mt-8 text-4xl font-bold'>
      <h1 className="text-center mb-4 mt-4 text-4xl font-bold relative">
    <span className="text-red-500">OUR </span>
    <span className="text-blue-500">CLIENTS</span>
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform origin-left"></span>
  </h1>
    </div>
  
    <div className="grid grid-cols-4 gap-12 mb-12">
      {/* First Row */}
      <div className="col-span-1">
        <div className="relative overflow-hidden transition duration-300 transform hover:scale-105 shadow-lg rounded-md border border-transparent">
          <img src={aaa} alt="Image 1" className="w-full h-40 object-cover" />
        </div>
      </div>
      <div className="col-span-1">
        <div className="relative overflow-hidden transition duration-300 transform hover:scale-105 shadow-lg rounded-md border border-transparent">
          <img src={bureau} alt="Image 2" className="w-full h-40 object-cover" />
        </div>
      </div>
      <div className="col-span-1">
        <div className="relative overflow-hidden transition duration-300 transform hover:scale-105 shadow-lg rounded-md border border-transparent">
          <img src={hcl} alt="Image 3" className="w-full h-40 object-cover" />
        </div>
      </div>
      <div className="col-span-1">
        <div className="relative overflow-hidden transition duration-300 transform hover:scale-105 shadow-lg rounded-md border border-transparent">
          <img src={addverb} alt="Image 4" className="w-full h-40 object-cover" />
        </div>
      </div>
      {/* Second Row */}
      <div className="col-span-1">
        <div className="relative overflow-hidden transition duration-300 transform hover:scale-105 shadow-lg rounded-md border border-transparent">
          <img src={who} alt="Image 5" className="w-full h-40 object-cover" />
        </div>
      </div>
      <div className="col-span-1">
        <div className="relative overflow-hidden transition duration-300 transform hover:scale-105 shadow-lg rounded-md border border-transparent">
          <img src={emerson} alt="Image 6" className="w-full h-40 object-cover" />
        </div>
      </div>
      <div className="col-span-1">
        <div className="relative overflow-hidden transition duration-300 transform hover:scale-105 shadow-lg rounded-md border border-transparent">
          <img src={dnv} alt="Image 7" className="w-full h-40 object-cover" />
        </div>
      </div>
      <div className="col-span-1">
        <div className="relative overflow-hidden transition duration-300 transform hover:scale-105 shadow-lg rounded-md border border-transparent">
          <img src={asian} alt="Image 8" className="w-full h-40 object-cover" />
        </div>
      </div>
    </div>
  </div>
  <CustomerReview/>
</div>

  );
};

export default About;
