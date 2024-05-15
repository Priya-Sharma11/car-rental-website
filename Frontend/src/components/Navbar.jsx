import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth';

function Navbar() {

  const { isLoggedIn, user, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setIsAdmin(user.isAdmin);
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name,
        email: user.email,
        password: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleUpdateProfile = () => {
    // Logic to update profile
    console.log('Updating profile data:', editData);
    // Close the modal after updating profile
    setShowEditModal(false);
  };

  return (
    <>
      <nav className="shadow-md bg-white dark:bg-dark dark:text-white duration-300 p-2  fixed  w-full z-20 top-10 " >
        <div className="container py-1 m-auto ">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold font-serif relative">
                <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text ">
                  Brother's
                </span>
                <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text ">
                  Travels
                </span>
              </h1>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-8 font-bold font-serif">
                <li><NavLink to="/" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">Home </NavLink></li>
                <li><NavLink to="/about" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300 ">About </NavLink></li>
                <li><NavLink to="/contact" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">Contact </NavLink></li>
                <li><NavLink to="/services" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">Services </NavLink></li>
                <li><NavLink to="/ourFleet" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">Our Fleet </NavLink></li>
                {isLoggedIn && isAdmin && (
    <li>
      <NavLink to="/admin" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">Admin </NavLink>
    </li>
  )}

  {/* User Profile Dropdown */}
  <li className="relative">
    <div className="flex items-center">
      <div className="relative group cursor-pointer" onClick={toggleDropdown}>
        <img src={user.image} alt="" className="rounded-full border border-gray-500 bg-gray-200 h-9 w-9 ml-12" />
        {showDropdown && (
          <ul className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
            <li><NavLink to={`/userProfile/${user._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Profile</NavLink></li>
            <li><NavLink to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Logout</NavLink></li>
          </ul>
        )}
      </div>
    </div>
  </li>
              </ul>
            </div>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar;
