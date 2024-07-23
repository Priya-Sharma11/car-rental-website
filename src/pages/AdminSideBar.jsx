import React from "react";
import { NavLink } from "react-router-dom";
import navLinks from "../assets/dummyData/navLinks"

const AdminSideBar = () => {
  return (
    <div className="sidebar bg-blue-900 text-heading-color h-full w-64 fixed top-0 left-0 z-50 py-8 px-6">
      

      <div className="sidebar__content flex flex-col justify-between h-full">
        <div className="menu">
          <ul className="nav__list">
            {navLinks.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  activeClassName="nav__active"
                  className="nav__link flex items-center gap-2 py-2 px-4 rounded-md transition duration-300 hover:bg-gray-200"
                >
                  <i className={item.icon}></i>
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__bottom">
          <NavLink
            to="/logout"
            className="nav__link flex items-center gap-2 py-2 px-4 rounded-md transition duration-300 hover:bg-gray-200"
          >
            <i className="ri-logout-circle-r-line"></i> Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
