import React, { useState ,useEffect} from 'react';
import CarCategories from './CarCategories';

const SliderImage = () => {
  const [current, setCurrent] = useState(1); // Changed initial value to 0
  const slides = [
    {
      url: "/Images/bus.png",
    },
    {
      url: "/Images/insideCar.jpg",
    },
    {
      url: "/Images/2.png",
    },
    {
      url: "/Images/3.png",
    },
    {
      url: "/Images/Tempo-Traveller.png",
    },
  ];

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); 

    return () => clearInterval(interval);
  }, [current]);
  
  return (
    <div className='dark:bg-black dark:text-white duration-300 relative'>
      
      < div className="flex mt-14 py-8">
      <div 
        style={{ backgroundImage: `url(${slides[current].url})`,backgroundPosition: `${current * -100}%`, transition: 'background-position-x 1s ease-in-out' }}
        className='w-[1000px] h-[580px] m-auto px-9 py-7 mt-13 items-center relative border border-transparent bg-center bg-cover duration-500'
      >   
        </div>
        
    </div>
    </div>
  );
};

export default SliderImage;
