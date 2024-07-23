import React, { useEffect, useState } from 'react'
import AboutUs from '../components/HomePage/AboutUs';
import Services from '../components/HomePage/Services';
import Banners from '../components/Banners';
import CarList from '../components/HomePage/CarList'
import FeatureCarList from '../components/FeatureCarList';


const Home = () => {
 
  return (
    <div>
      <div className='relative'>
        <Banners  img="/Images/homebanner.jpg"
        text="Whether you’re after pure luxury or a high capacity transporter, we have a vehicle for any occasion." />
       </div>
        <AboutUs />
       <CarList/>
        
        <Services />
      
     
    </div>
  )
}

export default Home
