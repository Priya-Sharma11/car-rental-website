import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Contact from './pages/Contact';
import About from './pages/About';
/* import Admin from './components/Admin/Admin'; */
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
import Services from './pages/Services';
import CarList from './pages/CarList';
import AdminBookings from './pages/AdminBookings';
import UserProfiles from './pages/UserProfiles';
import AdminReviews from './pages/AdminReviews';
import AdminDashboard from './pages/AdminDashboard';






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
      <Route path='*' element={<Error/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/ourFleet" element={<OurFleet/>}/>
      <Route path="/bookings/:id" element={<Booking/>}/>    
      {/* <Route path="/service" element={<Service/>}/>    */} 
      <Route path="/singleService/:id" element={<SingleService/>}/>     
      <Route path="/loginForm" element={<LoginForm/>}/>     
      <Route path="/registerForm" element={<RegisterForm/>}/>     
     <Route path="/services" element={<Services/>}/>    
      <Route path="/carsList" element={<CarList/>}/>          
      <Route path="/userProfiles/:id" element={<UserProfiles/>}/>     
{/*       <Route path="/userProfile/:id" element={<UserProfile/>}/>     
     */}
         
      

      <Route path="/admin" element={<AdminLayout/>}> 
      <Route path="users" element={<AdminUsers/>}/>
      <Route path="contacts" element={<AdminContacts/>}/>
      <Route path="addServices" element={<AdminAddServices/>}/>
      <Route path="services" element={<AdminServices/>}/>
      <Route path="bookings" element={<AdminBookings/>}/>
      <Route path="reviews" element={<AdminReviews/>}/>
      <Route path="dashboard" element={<AdminDashboard/>}/>
      
      </Route>
      
      </Routes>
      <Footer/>
    </Router>
    </div>
  )
}

export default App
