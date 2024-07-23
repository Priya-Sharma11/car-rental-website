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
import ReviewCard from '../components/ReviewCard';
import axios from 'axios';
import AboutTopbar from '../components/AboutTopbar';


const About = () => {
  const { isLoggedIn, user } = useAuth();
  const [userName, setUserName] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:4000/reviews/getReview');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);
 
  useEffect(() => {
    if (isLoggedIn && user) {
      setUserName(user.name);
    } else {
      setUserName('');
    }
  }, [isLoggedIn, user, userName]);

  return (
    <div className="bg-gray-100 min-h-screen">
    
      <div className="container mx-auto mt-8 pt-20">
      <AboutTopbar/>
        <div className="text-center">
     

       {/*    <p className="text-3xl font-extrabold font-serif text-blue-600 mt-6">
            Welcome{ isLoggedIn ? `, ${userName}` : ''} to Brother's Travels
          </p> */}
          <h2 className="text-3xl font-bold text-red-600 mt-4 mb-6">
            Where Luxury Drives Excellence
          </h2>
        </div>
       
        <div className="container mx-auto text-left mt-8 px-4">
          <p className="mb-6 text-lg font-semibold text-gray-800 leading-relaxed">
            Welcome to Brothers Travels, your ultimate travel companion for all your transportation needs. We specialize in providing a wide range of taxis, SUVs, and Tempo Travellers, catering to both local trips within the NCR region and exciting outstation journeys.
          </p>
          <p className="mb-6 text-lg font-semibold text-gray-800 leading-relaxed">
            At Brothers Travels, we understand the importance of convenience and reliability when it comes to your travel arrangements. That's why we're dedicated to offering round-the-clock service availability, ensuring that you can book your cab at any time of the day or night.
          </p>
          <p className="mb-6 text-lg font-semibold text-gray-800 leading-relaxed">
            Our goal is to make your travel experience seamless and stress-free. Whether you're planning a weekend getaway with friends, a family vacation, or a business trip, you can trust Brothers Travels to provide you with comfortable and safe transportation options.
          </p>
          <p className="mb-6 text-lg font-semibold text-gray-800 leading-relaxed">
            Booking your cab with Brothers Travels is quick and easy. Simply click the link below to secure your transportation and embark on your next adventure with confidence. We look forward to being a part of your journey and helping you create unforgettable memories along the way.
          </p>
          <p className="mb-8 text-xl font-bold text-gray-600 leading-relaxed">
            “We pride ourselves on being just the right size chauffeured car business – not too big, not too small. This means we have a small but experienced team of drivers, dedicated to providing the highest quality service in town. We promise to always have a car that suits your needs and service with a smile. Book your next luxury ride today.”
          </p>
        </div>

        <Subfooter /> 

        <h1 className='flex justify-center items-center font-bold text-4xl font-serif text-blue-600 mt-12 pt-8 mb-8'>
          Customer's Reviews
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        <div className='container mx-auto mt-16 p-9'>
          <div className='text-center mb-8 mt-8'>
            <h1 className="text-4xl font-bold text-blue-600 relative inline-block">
              <span className="text-red-500">OUR </span>CLIENTS
              <span className="block w-full h-1 bg-blue-500 absolute bottom-0 left-0 transform scale-x-0 transition-transform origin-left duration-300"></span>
            </h1>
          </div>
      
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 mb-12 px-4">
            <div className="relative overflow-hidden transition-transform duration-300 transform hover:scale-105 shadow-lg rounded-md border border-gray-200">
              <img src={aaa} alt="AAA" className="w-full h-40 object-cover" />
            </div>
            <div className="relative overflow-hidden transition-transform duration-300 transform hover:scale-105 shadow-lg rounded-md border border-gray-200">
              <img src={bureau} alt="Bureau" className="w-full h-40 object-cover" />
            </div>
            <div className="relative overflow-hidden transition-transform duration-300 transform hover:scale-105 shadow-lg rounded-md border border-gray-200">
              <img src={hcl} alt="HCL" className="w-full h-40 object-cover" />
            </div>
            <div className="relative overflow-hidden transition-transform duration-300 transform hover:scale-105 shadow-lg rounded-md border border-gray-200">
              <img src={addverb} alt="Addverb" className="w-full h-40 object-cover" />
            </div>
            <div className="relative overflow-hidden transition-transform duration-300 transform hover:scale-105 shadow-lg rounded-md border border-gray-200">
              <img src={who} alt="WHO" className="w-full h-40 object-cover" />
            </div>
            <div className="relative overflow-hidden transition-transform duration-300 transform hover:scale-105 shadow-lg rounded-md border border-gray-200">
              <img src={emerson} alt="Emerson" className="w-full h-40 object-cover" />
            </div>
            <div className="relative overflow-hidden transition-transform duration-300 transform hover:scale-105 shadow-lg rounded-md border border-gray-200">
              <img src={dnv} alt="DNV" className="w-full h-40 object-cover" />
            </div>
            <div className="relative overflow-hidden transition-transform duration-300 transform hover:scale-105 shadow-lg rounded-md border border-gray-200">
              <img src={asian} alt="Asian" className="w-full h-40 object-cover" />
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default About;
