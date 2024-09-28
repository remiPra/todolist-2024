import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaListUl, FaUserAlt, FaCog } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-around items-center h-16">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-blue-500' : 'text-gray-600'}`}>
          <FaHome className="text-2xl" />
          <span className="text-xs mt-1">Accueil</span>
        </NavLink>
        <NavLink to="/todo" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-blue-500' : 'text-gray-600'}`}>
          <FaListUl className="text-2xl" />
          <span className="text-xs mt-1">To-Do</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-blue-500' : 'text-gray-600'}`}>
          <FaUserAlt className="text-2xl" />
          <span className="text-xs mt-1">Profil</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-blue-500' : 'text-gray-600'}`}>
          <FaCog className="text-2xl" />
          <span className="text-xs mt-1">Réglages</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;