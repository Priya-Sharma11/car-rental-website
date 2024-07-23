import React from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { FaHome,FaUser,FaRegListAlt,FaWpforms,FaCalendarCheck } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();  

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!user.isAdmin) {
    return <Navigate to='/' />;
  }

  const sidebarWidth = "200px"; // Adjust the width of the sidebar here
  const sidebarStyles = {
    width: sidebarWidth,
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#f3f4f6', // Adjust the background color of the sidebar
    borderRight: '1px solid #ccc', // Adjust the border style of the sidebar
  };

  const contentStyles = {
    marginLeft: sidebarWidth,
    paddingTop: '20px',
  };

  const linkClasses = "block mb-4 flex justify-center items-center p-2 rounded-lg text-white font-semibold transition-all duration-300 bg-gradient-to-r from-blue-300 to-purple-300 hover:text-blue-900 hover:shadow-lg hover:scale-95";

  const iconSize = "h-6 w-6 mr-3"; // Adjust the size of the icons here

  return (
    <div className='container mx-auto mt-20 flex justify-center'>
   
        <div className="container mx-auto ">
          <div style={sidebarStyles}>
            <h1 className='text-xl font-bold font-serif text-blue-400 mt-12 pt-12'>Admin Dashboard</h1>
            <nav>
              <ul className="space-y-8 mr-4 mt-2 pt-12 ">
                <li>
                  <NavLink to="/" className={linkClasses}>
                    <FaHome className={iconSize} />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/users" className={linkClasses}>
                     <FaUser className={iconSize} /> 
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/contacts" className={linkClasses}>
                    <FaMessage className={iconSize} /> 
                    Contacts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/addServices" className={linkClasses}>
                    <FaRegListAlt className={iconSize} /> 
                    Add Services
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/services" className={linkClasses}>
                    {<FaWpforms className={iconSize} />}
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/bookings" className={linkClasses}>
                   { <FaCalendarCheck className={iconSize} />}
                    Bookings
                  </NavLink>
                  </li>
                  <li>
                  <NavLink to="/admin/reviews" className={linkClasses}>
                  {/*  { <FaCalendarCheck className={iconSize} />} */}
                    Reviews
                  </NavLink>
                </li>
               
              </ul>
            </nav>
          </div>
          <div style={contentStyles}>
            <Outlet />
          </div>
        </div>
    
    </div>
  );
};

export default AdminLayout;
