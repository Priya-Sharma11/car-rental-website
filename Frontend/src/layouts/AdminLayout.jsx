import React from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { FaUser ,FaHome,FaRegListAlt,FaWpforms} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from '../../store/auth';
import AdminSideBar from '../../pages/AdminSideBar';


const AdminLayout = () => {
  const {user,isLoading}= useAuth();
  console.log("admin layout", user)

  if(isLoading){
    return <h1> Loading...</h1>
  }
  if(!user.isAdmin){
    return <Navigate to='/'/>
  } 
  

  return (
    <div className='container mx-auto mt-20 pt-20'>
      {/* <AdminSideBar/> */}
    <header>
      <div className="container">
        <nav>
          <ul className="flex gap-8">
          <li><NavLink to="/" className="flex items-center"><FaHome className="mr-1"/>Home</NavLink></li>

            <li><NavLink to="/admin/users" className="flex items-center"><FaUser className="mr-1"/>Users</NavLink></li>

            <li><NavLink to="/admin/contacts" className="flex items-center"><FaMessage className="mr-1"/>Contacts</NavLink></li>

            <li><NavLink to="/admin/addServices" className="flex items-center"><FaWpforms className="mr-1"/>Add Services</NavLink></li>

            <li><NavLink to="/admin/services" className="flex items-center">Services</NavLink></li>
            
            
          </ul>
        </nav>
      </div>
    </header>
    <Outlet/>
      
    </div>
  )
}

export default AdminLayout
