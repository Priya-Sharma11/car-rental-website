import React from "react";
import 'tailwindcss/tailwind.css';

const Banners = ({ img, title, text, backgroundColor = "#f5f5f5" }) => {
  return (
    <div className="">
      <div
        className="h-[40vh] lg:h-[90vh] bg-no-repeat bg-center bg-cover relative flex justify-center items-center"
        style={{ backgroundImage: `url(${img})`, backgroundColor }}
      >
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.2)] bg-black opacity-40"></div>

        <div className="w-full lg:w-[70%] text-white text-center">
          <h1 className="text-2xl lg:text-7xl font-medium text-third-color mb-2 lg:mb-5">
            {title}
          </h1>
          <div className="relative overflow-hidden h-12 md:h-16 lg:h-20">
            <h2 className="absolute whitespace-nowrap animate-marquee text-lg md:text-4xl leading-6 md:leading-[55px]">
              {text}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
