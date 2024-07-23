import React from 'react';
import { NavLink, Navigate, Outlet,Link } from 'react-router-dom';
import { useAuth } from '../store/auth';

const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  console.log("admin layout", user);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!user.isAdmin) {
    return <Navigate to='/' />;
  }

  const cardClasses = "flex items-center justify-center w-60 h-40 border rounded-lg text-white font-semibold transition-all duration-300 bg-blue-500 hover:bg-blue-600";

  return (
    <div className='container mx-auto mt-20 pt-20'>
      <header>
        <div className="container mx-auto">
          <h1 className='flex justify-center items-center text-5xl font-bold font-serif text-blue-400 mb-12'>Admin Dashboard</h1>
          <nav>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mb-12 pb-12 pt-12 ml-12">
              <li>
                <NavLink to="/" className={cardClasses}>
                  Home
                </NavLink>
              </li>
              <li>
                <Link to="/admin/users" className={cardClasses}>
                  Users
                </Link>
              </li>
              <li>
                <NavLink to="/admin/contacts" className={cardClasses}>
                  Contacts
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/addServices" className={cardClasses}>
                  Add Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/services" className={cardClasses}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/bookings" className={cardClasses}>
                  Bookings
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
