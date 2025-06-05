import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around">
        <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
        <li><a href="#" className="text-white hover:text-gray-300">About</a></li>
        <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;