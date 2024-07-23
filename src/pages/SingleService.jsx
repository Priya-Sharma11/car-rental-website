import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServiceContext } from "../store/servicecontext";
import PageNavigation from '../components/PageNavigation';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import Review from '../components/Review'; // Import the Review component
import AverageStarRating from './AverageStarRating';
import AddReviewForm from '../components/AddReviewForm';

const SingleService = () => {
  const { getServiceById, singleService } = useServiceContext();
  const { isLoggedIn, user } = useAuth(); // Get isLoggedIn and user from auth context

  const { id } = useParams();
  const {
    Model, FuelType, Price, SeatingCapacity, Transmission, category, image
  } = singleService;
  const [averageRating, setAverageRating] = useState(0); 

  useEffect(() => {
    const url = `http://localhost:4000/services/getCarDetails/${id}`;
    getServiceById(url);
  }, [id]);
  useEffect(() => {
    // Fetch reviews and calculate average rating
    const fetchAverageRating = async () => {
      try {
        const response = await fetch(`http://localhost:4000/reviews/averageRating/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAverageRating(data.averageRating);
        } else {
          console.error('Failed to fetch average rating');
        }
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [id]);

  return (
    <div className='container mx-auto mt-20 pt-12'>
      <div>
        <PageNavigation title={Model} />
        <div className='w-full grid grid-cols-2 gap-12 ml-8 pb-12'>
          <div>
            <img src={image} alt={Model} className='w-full h-auto mt-12 pt-12 mr-8' />
          </div>
          <div className='mt-12 pt-12 '>
            <h1 className='text-3xl font-bold font-serif text-purple-400 mb-7'>Category: {category}</h1>
            <div className="flex items-center mt-4">
              <span className="text-lg font-bold mr-2 mb-6"></span>
              <AverageStarRating averageRating={averageRating} />
            </div>
            <h2 className='text-2xl font-bold font-serif mb-8'>Model: {Model}</h2>
            <p className='text-xl font-roboto mb-4'>Fuel Type: {FuelType}</p>
            <p className='text-xl font-roboto mb-4'>Price: {Price}</p>
            <p className='text-xl font-roboto mb-4'>Seating Capacity: {SeatingCapacity}</p>
            <p className='text-xl font-roboto mb-4'>Transmission: {Transmission}</p>
            <Link to={`/bookings/${id}`}>
              <button className="px-6 py-3 rounded-full font-bold text-black-500 bg-red-100 shadow-md inline-flex space-x-2 hover:bg-green-200 transition-colors duration-300">BOOK NOW</button>
            </Link>
          </div>
        </div>
        <div className='mt-8 mb-8 flex justify-center'>
          <div className='w-full max-w-3xl'>
            <Review carId={id} isLoggedIn={isLoggedIn} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleService;
