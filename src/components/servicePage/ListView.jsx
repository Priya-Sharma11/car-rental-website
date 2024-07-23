import React from 'react';
import { NavLink } from 'react-router-dom';

const ListView = ({ services }) => {
  return (
    <div className="container mx-auto">
      <div>
        {
        services.map((curr) => {
          const { _id,Model, Price, image, category, SeatingCapacity, FuelType } = curr;

          return (
            <div key={curr._id} className="flex items-center gap-4 mb-4">
              {/* Image */}
              <div className="w-1/2 relative overflow-hidden">
                <img src={image} alt={Model} className="w-full transition-transform duration-300 transform hover:scale-105" />
              </div>
              {/* Data */}
              <div className="w-1/2 ml-4">
                <h3>{Model}</h3>
                <p>{category}</p>
                <p>Seating Capacity: {SeatingCapacity}</p>
                <p>Fuel Type: {FuelType}</p>
                <p>Price: {Price}</p>
                <NavLink to={`/singleService/${_id}`}>
                <button>
                Read More
                </button>
              </NavLink>
              </div>
            
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListView;
