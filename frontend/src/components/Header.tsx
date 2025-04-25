import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-[#ECE4DA] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl sm:text-2xl font-serif transition-transform duration-300 hover:scale-105 text-stone-800">
            Project Purna
          </Link>

          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-stone-800 hover:text-stone-600 transition-colors duration-300">Home</Link>
            <Link to="/mission" className="text-stone-800 hover:text-stone-600 transition-colors duration-300">Our Mission</Link>
            <Link to="/team" className="text-stone-800 hover:text-stone-600 transition-colors duration-300">Team</Link>
            <Link to="/contact" className="text-stone-800 hover:text-stone-600 transition-colors duration-300">Contact Us</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;