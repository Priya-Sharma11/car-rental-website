import React, { useEffect, useState } from 'react'
import { FaLocationArrow,FaMobileAlt,FaPhoneAlt ,FaInstagram,FaFacebook,FaLinkedin,FaRegCopyright } from "react-icons/fa";
import {MdOutlineMarkEmailUnread} from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';

const Links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },  
  {
    title: "Services",
    link: "/services",
  },
  
  {
    title: "OurFleet",
    link: "/ourFleet",
  },
  
];

const Footer = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.isAdmin);
    }
  }, [user]);
 
  return (
    <div className='bg-slate-200 dark:text-white duration-300'>
     
   <div className="container">
   {!isAdmin && (
   <div className="bg-gray-100 dark:bg-gray-500 flex justify-center items-center py-2 w-70 ">
          <div className="bg-white dark:bg-gray-500 p-5 rounded-lg shadow-md flex items-center w-1/2">
            <p className="flex items-center text-lg">
              <HiMiniQuestionMarkCircle className="mr-2 text-primary" />
              Have a Question? Contact Us!
            <div className="ml-20 flex items-center">
              <FaPhoneAlt className="mr-2" />
              <p>9711490031</p>
            </div>
            </p>
          </div>
        </div>
            )}
        <section>
    <div className="grid md:grid-cols-3 py-5">
      <div className="py-8 px-4">
        <h1 className="text-xl sm:text-3xl font-bold sm:text-left text-justify mb-3">Brother's travels</h1>
        <p>Brothers Travels is your go-to travel partner, offering all types of taxis, SUVs, and Tempo Travellers for both local NCR trips and outstation journeys. With 24x7 service availability, we ensure convenience and reliability, making booking your cab effortless. Click the link below to secure your transportation and embark on your next adventure with Brothers Travels.</p>
        <br/>
        
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
        <div>
          <div className="py-8 px-4">
            <h1 className='sm:text-xl text-l font-bold sm:text-left text-justify mb-3 font-bold'>
              Important Links
            </h1>
            <ul className={`flex flex-col gap-3 font-bold   `}>
                  {Links.map((link) => (
                    <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-500 dark:text-gray-200">
                      <span>&#11162;</span>
                      <Link to={link.link}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
          </div>
        </div>
     
      <div className="">
      
          <div className="py-8 px-4">
            <h1 className='sm:text-xl text-xl font-bold sm:text-left text-justify mb-3 '>
              Head Office
            </h1>
            <div>
          <FaLocationArrow className="flex items-center gap-3 "/>
          
          <p className='mt-4 mb-2'>Noida: C-199,Sector-71</p>
          
          <p>Delhi: # 201 Gahlan Residency, Chandra park,Old Palam Road Dwarka Sector-15, New Delhi 110078</p>
        </div>
          </div>
        </div>
        <div className="">
      <div className="py-8 px-10">
        <h1 className='sm:text-xl text-xl font-bold sm:text-left text-justify mb-3 '>
          Contact Us
        </h1>
    <div className="flex items-center gap-4 mt-3">
      <FaMobileAlt/>
      <p>9999603060</p>
    </div>
    <div className="flex items-center gap-4 mt-3 ">
      <FaMobileAlt/>
      <p>9711490031</p>
    </div>
    
  
<div className="flex items-center gap-4 mt-3 mb-3">
  <MdOutlineMarkEmailUnread />
  <a href="mailto:brothers.travels@yahoo.com">brothers.travels@yahoo.com</a>
</div>
    <div flex items-center gap-4 mt-5>
    <p className="office__info">Office Time: 10am-7pm</p>
    </div>
    
    <div className="flex items-center gap-4 mt-4">
      <a href="https://www.instagram.com/brotherstravels_/">
      <FaInstagram className="text-3xl hover:text-primary duration-300 ml-12"/>
      </a>
     
      </div>
      </div>
    </div>
    
    <div className='flex justify-center'>
  <div className="footer-bottom ">
    
    <p className="pt-4 text-m font-bold">© Copyright @2024 Developed by Brother's Travels | All Rights Reserved!</p>
  </div>
</div>
    </div>
    </div>
    </section>
   </div>
   </div>
  )
}

export default Footer
