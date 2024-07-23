import { React, useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth';

function Navbar() {
  const { isLoggedIn, user, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

 /*  if (isLoading) {
    return <div>Loading...</div>;
  } */

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <nav className="shadow-md bg-white dark:bg-dark dark:text-white duration-300 p-2 fixed w-full z-20 top-10">
        <div className="container py-1 m-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold font-serif relative">
                <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
                  Brother's
                </span>
                <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
                  Travels
                </span>
              </h1>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-8 font-bold font-serif">
                <li>
                  <NavLink to="/" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/services" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ourFleet" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">
                    Our Fleet
                  </NavLink>
                </li>
                {!isLoggedIn && (
                  <li>
                    <NavLink to="/loginForm" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">
                      Login
                    </NavLink>
                  </li>
                )}
                {isLoggedIn && (
                  <>
                    {isAdmin && (
                      <li>
                        <NavLink to="/admin/dashboard" className="nav-link hover:border-b-2 hover:border-purple-600 hover:transform hover:scale-110 transition duration-300">
                          Admin
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <div className="relative group cursor-pointer" ref={dropdownRef}>
                        <img
                          src={user.image}
                          alt="Profile"
                          className="rounded-full border border-gray-500 bg-gray-200 h-9 w-9 ml-12"
                          onClick={toggleDropdown}
                        />
                        {showDropdown && (
                          <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                            <li>
                              <NavLink to={`/userProfiles/${user._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                                Profile
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                                Logout
                              </NavLink>
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
