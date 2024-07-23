import React from 'react';
import CarCategories from './CarCategories';

const SlideImage = () => {
  return (
   
    <div className='flex justify-center items-center py-2 mt-14 w-[1600px]'>
      <div className="mr-2"> 
        <img src="/Images/bus.png" alt="" className='w-full h-[580px] py-7 mt-13' />
      </div>
      
     {/*  <div className="ml-auto">
        <CarCategories />
      </div> */}
    </div>
 
    
  );
};

export default SlideImage;
