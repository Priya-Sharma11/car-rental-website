import React, { useEffect } from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import { useAuth } from '../../store/auth';

const Service = ({ _id, image, Model, Price, SeatingCapacity }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/loginForm")  
    }
  }, [isLoggedIn, navigate]);

  return (
    <NavLink to={`/singleService/${_id}`}>
      <div className="flex flex-col bg-white shadow-md rounded-md p-2 border-black relative overflow-hidden transform transition duration-300 hover:scale-105">
        <div className="w-full h-48 mb-4 overflow-hidden relative">
          <img
            src={image}
            alt={Model}
            className="w-full h-full object-cover"
          />
          <div className="overlay absolute inset-0 bg-gradient-to-r from-transparent to-black bg-opacity-0 hover:bg-opacity-30 transition duration-300"></div>
        </div>
        <h2 className="text-xl font-bold mb-2">{Model}</h2>
        <div className="flex justify-between">
          <p>Seating Capacity: {SeatingCapacity}</p>
          <p className="text-right">Price: {Price}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default Service;
