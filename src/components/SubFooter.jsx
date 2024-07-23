import React from "react";
import { IoMdContacts } from "react-icons/io";
import { MdCardTravel } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { Link } from "react-router-dom";

const Subfooter = () => {
  return (
    <div className="w-[1180px] grid grid-cols-1 md:grid-cols-2 rounded-lg shadow-md md:flex-row relative overflow-hidden ">
      <div className="ml-5 mt-4 rounded-lg shadow-md  relative overflow-hidden">
      <img
        src="/Images/about2.jpg"
        alt=""
        className="h-[30px] w-[650px] object-cover md:h-[40vh] lg:h-[40vh] rounded-lg"
      />
      </div>
      
      <div className="flex flex-col justify-center gap-8 md:px-16 px-8 py-8 md:my-0 my-8">
        <div className="flex items-center gap-5">
          <span className="bg-gray-200 shadow-lg text-2xl p-6 rounded-full">
            <MdCardTravel className="text-third-color" />
          </span>
          <div className="flex flex-col gap-2">
            <h5 className="text-2xl text-gray-900 font-bold">Wedding</h5>
            <p className="text-base text-gray-600">
              Seeking Wedding Transportation Services? Contact Us to Customize
              Your Special Day!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          
          <span className="bg-gray-200 shadow-lg text-2xl p-6 rounded-full">
          <Link to='/OurFleet'>
            <IoCarSport className="text-third-color" />
            </Link>
          </span>
          
          <div className="flex flex-col gap-2">
            <h5 className="text-2xl text-gray-900 font-bold">Our fleet</h5>
            <p className="text-base text-gray-600">
              Discover the Perfect Ride for Any Event - What’s Your Selection?
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="bg-gray-200 shadow-lg text-2xl p-6 rounded-full">
            <IoMdContacts className="text-third-color" />
          </span>
          <div className="flex flex-col gap-2">
            <h5 className="text-2xl text-gray-900 font-bold">About Us</h5>
            <p className="text-base text-gray-600">
              Discover Unmatched Luxury Travel with Limolux in Melbourne’s
              Finest Experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subfooter;
