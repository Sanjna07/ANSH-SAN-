import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import teamData from '../data/team.json';

const TeamMember = ({ name, role, image, linkedin, description, index }) => {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl ${
        darkMode ? 'bg-stone-700/50' : 'bg-white/90'
      } shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(236,228,218,0.3)] transition-all duration-500 group hover:-translate-y-2`}>
        {/* Adjusted image container height */}
        <div className="relative overflow-hidden h-56 sm:h-64 md:h-72">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
          />
          {/* Adjusted padding for mobile */}
          <div className={`absolute inset-0 ${
            darkMode 
              ? 'bg-gradient-to-t from-stone-900 via-stone-900/50' 
              : 'bg-gradient-to-t from-stone-800/90 via-stone-800/30'
          } opacity-0 group-hover:opacity-100 transition-all duration-500`}>
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-[#ECE4DA] text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 leading-relaxed">
                {description}
              </p>
              <a 
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 text-xs sm:text-sm font-medium rounded-full ${
                  darkMode 
                    ? 'bg-[#ECE4DA] text-stone-800 hover:bg-white' 
                    : 'bg-[#ECE4DA] text-stone-800 hover:bg-stone-800 hover:text-[#ECE4DA]'
                } transition-all duration-300 transform hover:scale-105`}
              >
                <span>Connect</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Adjusted padding for mobile */}
        <div className="p-3 sm:p-4 md:p-6 relative border-t border-stone-200/10">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-0.5 ${
            darkMode ? 'bg-[#ECE4DA]/20' : 'bg-stone-200'
          } group-hover:w-24 sm:group-hover:w-32 transition-all duration-500`}></div>
          
          <h3 className={`text-lg sm:text-xl md:text-2xl font-serif mb-1 sm:mb-2 text-center ${
            darkMode ? 'text-[#ECE4DA]' : 'text-stone-800'
          } group-hover:scale-105 transition-transform duration-500`}>
            {name}
          </h3>
          <p className={`text-xs sm:text-sm font-medium text-center ${
            darkMode ? 'text-[#ECE4DA]/80' : 'text-stone-600'
          } group-hover:tracking-wider transition-all duration-500`}>
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

// In the grid container, adjust the gap for mobile
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8 relative">
  {teamData.teamMembers.map((member, index) => (
    <TeamMember key={member.id} {...member} index={index} />
  ))}
</div>

export default function Team() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Prevent body scroll when menu is open
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible, menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    // Update the main container to prevent horizontal overflow
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <header className={`w-full ${
        darkMode ? 'bg-[#ECE4DA] text-stone-800' : 'bg-stone-800 text-[#ECE4DA]'
      } sticky top-0 z-50 shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group z-20">
              <span className="text-xl sm:text-2xl font-serif transform transition-transform duration-300 group-hover:scale-105">
                Project Purna
              </span>
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden z-20 p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Mobile menu - Using opacity instead of horizontal translation */}
            <div className={`md:hidden fixed inset-0 ${
              darkMode ? 'bg-stone-800' : 'bg-[#ECE4DA]'
            } z-10 flex flex-col items-center justify-center space-y-8 transition-opacity duration-300 ${
              menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
              <Link to="/" className="text-lg font-medium" onClick={() => setMenuOpen(false)}>
                <span className={`${darkMode ? 'text-[#ECE4DA]' : 'text-stone-800'}`}>Home</span>
              </Link>
              <a href="#mission" className="text-lg font-medium" onClick={() => setMenuOpen(false)}>
                <span className={`${darkMode ? 'text-[#ECE4DA]' : 'text-stone-800'}`}>Our Mission</span>
              </a>
              <a href="#contact" className="text-lg font-medium" onClick={() => setMenuOpen(false)}>
                <span className={`${darkMode ? 'text-[#ECE4DA]' : 'text-stone-800'}`}>Contact</span>
              </a>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDarkMode();
                }}
                className={`p-2 rounded-full transition-all duration-300 ${
                  darkMode 
                    ? 'bg-[#ECE4DA] text-stone-800' 
                    : 'bg-stone-800 text-[#ECE4DA]'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <Link to="/" className="text-sm font-medium relative overflow-hidden group">
                <span className="relative z-10">Home</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  darkMode ? 'bg-stone-800' : 'bg-[#ECE4DA]'
                } transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100`}></span>
              </Link>

              <a href="#mission" className="text-sm font-medium relative overflow-hidden group">
                <span className="relative z-10">Our Mission</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  darkMode ? 'bg-stone-800' : 'bg-[#ECE4DA]'
                } transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100`}></span>
              </a>

              <a href="#contact" className="text-sm font-medium relative overflow-hidden group">
                <span className="relative z-10">Contact</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  darkMode ? 'bg-stone-800' : 'bg-[#ECE4DA]'
                } transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100`}></span>
              </a>

              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'bg-stone-800 text-[#ECE4DA]' 
                    : 'bg-[#ECE4DA] text-stone-800'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className={`flex-grow ${darkMode ? 'bg-stone-800' : 'bg-[#ECE4DA]'} pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-20 w-full`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Update title section for better mobile view */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 relative">
            <div className="relative inline-block">
              <h1 className={`text-3xl sm:text-5xl md:text-6xl font-serif mb-2 relative z-10 ${
                darkMode ? 'text-[#ECE4DA]' : 'text-stone-800'
              } tracking-tight px-2`}>
                Our Team
                <span className={`absolute -bottom-2 left-0 w-full h-1 ${
                  darkMode ? 'bg-[#ECE4DA]/20' : 'bg-stone-400'
                } transform origin-left transition-transform duration-500`}></span>
              </h1>
              <div className={`absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 text-4xl sm:text-7xl md:text-8xl font-bold opacity-5 whitespace-nowrap ${
                darkMode ? 'text-[#ECE4DA]' : 'text-stone-800'
              }`}>
                MEET THE TEAM
              </div>
            </div>
            <p className={`max-w-2xl mx-auto text-sm sm:text-lg mt-4 sm:mt-6 ${
              darkMode ? 'text-[#ECE4DA]/100' : 'text-stone-800'
            } font-dark tracking-wide px-4`}>
              Meet the passionate individuals dedicated to preserving and showcasing Bhojpur's rich heritage
            </p>
          </div>

          {/* Update team grid for better mobile layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 relative">
            {teamData.teamMembers.map((member, index) => (
              <TeamMember key={member.id} {...member} index={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  ); // Remove everything after this closing parenthesis
}