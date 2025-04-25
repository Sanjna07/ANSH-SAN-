import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { darkMode } = useTheme();
  
  return (
    <footer className={`w-full ${darkMode ? 'bg-black' : 'bg-black'} py-8 sm:py-12 px-6 sm:px-12 flex flex-col md:flex-row justify-between gap-8 relative z-20`}>
      {/* Left Side */}
      <div className="flex flex-col items-center md:items-start">
        <p className="text-white text-lg sm:text-xl font-serif font-medium mb-2">ProjectPurna.com</p>
        <p className="text-white text-xs sm:text-sm mt-1">Made with Squarespace</p>
      </div>
      
      {/* Middle - Location */}
      <div className="flex flex-col items-center md:items-start">
        <p className="text-white text-base sm:text-lg font-serif font-medium mb-3 mr-0 md:mr-8">Location</p>
        <p className="text-white text-sm sm:text-base">Bennett University, Greater</p>
        <p className="text-white text-sm sm:text-base">Noida, India</p>
      </div>
      
      {/* Right Side - Contact */}
      <div className="flex flex-col items-center md:items-start">
        <p className="text-white text-base sm:text-lg font-serif font-medium mb-3">Contact</p>
        <p className="text-white text-sm sm:text-base">email@example.com</p>
        <p className="text-white text-sm sm:text-base">+91 (555) 555-5555</p>
      </div>
    </footer>
  );
}