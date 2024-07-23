import React from "react";
import whiteCar from "../../../public/Images/white-car.png";
import car2 from "../../../public/Images/car2.png";
import car5 from "../../../public/Images/car5.png";
import { Link } from "react-router-dom";

const carList = [
  {
    name: "BMW ",
    price: 9200,
    image: whiteCar,
    aosDelay: "0",
    person:5,
    category:"LuxurySedan",
  },
  {
    name: "KIA ",
    price: 8500,
    image: car2,
    aosDelay: "500",
    person:4,
    category:"PremiumSedan",
  },
  {
    name: "Scorpio ",
    price: 9800,
    image: car5,
    aosDelay: "1000",
    person:7,
    category:"LuxurySedan",
  },
];

const CarList = () => {
  return (
    <div className="pb-24">
      <div className="container ">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl text-purple-500 font-semibold font-serif flex justify-center items-center  mb-3 mt-4 pt-6"
        >
          Cars
        </h1>
        
        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 mt-5 pt-4">
            {carList.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px] mt-8">
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl text-irisBlueColor font-bold font-serif ">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>Price : {data.price}</p>
                    <p>Seating Capacity: {data.person} </p>
                   
                  </div>
                </div>
                <p className="text-xl font-semibold absolute top-0 left-3 ">
                 {data.category}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* End of car listing */}
        <div className="grid place-items-center mt-8">
          <Link to="/services">
          <button data-aos="fade-up" className="bg-purple-800 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6 mb-6">
            Get Started
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarList;