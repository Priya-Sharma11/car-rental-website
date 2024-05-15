import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Contact from './pages/Contact';
import About from './pages/About';
import Admin from './components/Admin/Admin';
import { Error } from './pages/Error';
import Logout from './pages/Logout';
import AdminLayout from './components/layouts/AdminLayout';
import Footer from './components/Footer';
import AdminUsers from './pages/AdminUsers';
import AdminContacts from './pages/AdminContacts';
import AdminAddServices from './pages/AdminAddServices';
import OurFleet from './pages/OurFleet';
import Booking from "./pages/Booking"
import TopNavBar from './components/TopNavBar';
import AdminServices from './pages/AdminServices';
import Navbar from './components/Navbar';
import SingleService from './pages/SingleService';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/loginForm';
import Service from './pages/Service';
import Services from './pages/Services';
import CarList from './pages/CarList';
import UserProfile from './pages/UserProfile';
import ServicePage from './pages/ServicePage';






const App = () => {
  return (
    <div>
      
    <Router>
      <TopNavBar />
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route  path='/about' element={<About/>}/>
      <Route  path='/contact' element={<Contact/>}/>
     {/*  <Route  path='/services' element={<Service/>}/> */}
   {/*    <Route path="/login" element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>  */}
      <Route path='*' element={<Error/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/ourFleet" element={<OurFleet/>}/>
      <Route path="/bookings/:id" element={<Booking/>}/>    
      {/* <Route path="/service" element={<Service/>}/>    */} 
      <Route path="/singleService/:id" element={<SingleService/>}/>     
      <Route path="/loginForm" element={<LoginForm/>}/>     
      <Route path="/registerForm" element={<RegisterForm/>}/>     
    {/*   <Route path="/services" element={<Services/>}/>  */}    
      <Route path="/services" element={<Service/>}/>     
      <Route path="/carsList" element={<CarList/>}/>     
      <Route path="/servicePage" element={<ServicePage/>}/>     
   
      <Route path="/userProfile/:id" element={<UserProfile/>}/>     
         
      

      <Route path="/admin" element={<AdminLayout/>}> 
      <Route path="users" element={<AdminUsers/>}/>
      <Route path="contacts" element={<AdminContacts/>}/>
      <Route path="addServices" element={<AdminAddServices/>}/>
      <Route path="services" element={<AdminServices/>}/>
      
      </Route>
      
      </Routes>
      <Footer/>
    </Router>
    </div>
  )
}

export default App
