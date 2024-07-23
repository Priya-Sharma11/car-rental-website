import React from 'react';
import Service from './Service';

const GridView = ({ services }) => {
  console.log(services); 

  return (
    <div className="container mb-20 mt-12">
      <div className="grid grid-cols-3 gap-x-10 gap-y-12 mb-12">
        {
        services.map((curr) => {
          return <Service key={curr._id} {...curr} />
})}
      </div>
    </div>
  );
};

export default GridView;
