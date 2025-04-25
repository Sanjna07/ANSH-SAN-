import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

// Remove these imports
// import darkModeLogo from '../assets/dark-mode-logo.png';
// import lightModeLogo from '../assets/light-mode-logo.png';

export default function ProjectPurna() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [text, setText] = useState('');
  const fullText = "THE MISSION TO COMPLETE THE UNFINISHED.";
  const [scrollY, setScrollY] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Improved scroll button logic
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollButton(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimized typing animation
  useEffect(() => {
    setIsLoaded(true);
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeText = () => {
      if (isDeleting) {
        setText(prev => prev.slice(0, -1));
        if (text.length === 0) {
          isDeleting = false;
          timeoutId = setTimeout(typeText, 1000);
          return;
        }
      } else {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === fullText.length) {
          isDeleting = true;
          timeoutId = setTimeout(typeText, 2000);
          return;
        }
      }
      timeoutId = setTimeout(typeText, isDeleting ? 50 : 150);
    };

    timeoutId = setTimeout(typeText, 500);
    return () => clearTimeout(timeoutId);
  }, [text, fullText]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Fixed background with fallback color */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0 bg-stone-900"
        style={{ 
          backgroundImage: "url('https://res.cloudinary.com/dub7qyv8e/image/upload/v1745351111/ChatGPT_Image_Apr_21_2025_12_07_41_AM_w0ojn6.png')",
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      ></div>
      
      {/* Dark overlay with reduced opacity */}
      <div className="fixed inset-0 bg-black opacity-30 z-0"></div>
      
      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Navigation - Modified dark mode toggle */}
        <nav className={`flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4 md:p-6 lg:px-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="text-white text-lg sm:text-xl md:text-2xl font-medium mb-2 sm:mb-0 hover:scale-105 transition-transform duration-300">Project Purna</div>
          
          {/* Mobile-optimized navigation links */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:space-x-8 text-white">
            <button 
              onClick={toggleDarkMode}
              className="p-2 hover:bg-stone-600/20 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <a href="#mission" className="hover:underline text-sm sm:text-base md:text-lg relative group px-2">
              <Link 
                to="/mission" 
                className={`text-lg font-medium ${
                  darkMode ? 'text-stone-200 hover:text-white' : 'text-stone-200 hover:text-white'
                } transition-colors duration-300`}
              >
                Our Mission
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            
            <Link to="/team" className="hover:underline text-sm sm:text-base md:text-lg relative group px-2">
              Meet Our Team
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link to="/contact" className="hover:underline text-sm sm:text-base md:text-lg relative group px-2">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </nav>

        {/* Main Hero Content - Improved for mobile */}
        <div className={`flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 h-[85vh] sm:min-h-[80vh] pt-12 pb-4 sm:pt-20 md:pt-24 md:pb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-dark mb-2 sm:mb-4 md:mb-6 tracking-wider sm:tracking-widest uppercase font-serif transition-all duration-700 leading-relaxed">
            <span className="inline-block border-r-2 border-white animate-pulse">
              {text}
            </span>
          </h1>
          
          <div className={`max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-4 sm:mb-3 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <p className="text-white text-sm sm:text-base md:text-lg px-2 sm:px-4 py-1 sm:py-2 leading-relaxed font-serif">
              We are a collective of historians, architects, artisans, spiritual leaders, and 
              cultural conservationists working toward completing the unfinished Bhojeshwar 
              Temple. Guided by ancient blueprints, historical texts, and cutting-edge 
              restoration methods, we aim to bring King Bhoja's forgotten vision to life.
            </p>
          </div>

          <Link to="/mission">
            <button
              className={`mt-4 sm:mt-4 md:mt-8 bg-stone-300 hover:bg-stone-400 text-stone-800 font-serif tracking-wider uppercase py-2 sm:py-3 px-6 sm:px-8 md:px-12 rounded-full transition-all duration-500 text-xs sm:text-sm md:text-base hover:scale-110 hover:shadow-lg hover:tracking-widest ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Learn more
            </button>
          </Link>

          {/* Add scroll down arrow */}
          <div className={`mt-12 animate-bounce transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-white cursor-pointer" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        
        {/* Empty space to allow scrolling for parallax effect */}
        <div className="h-[30vh] bg-gradient-to-b from-transparent to-stone-900/30"></div>
        
        {/* Keep your original footer here */}
        <div className="min-h-screen bg-gradient-to-b from-transparent to-stone-900/90 flex flex-col items-center justify-center p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-8 animate-on-scroll">Our Vision</h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed animate-on-scroll">
              Project Purna envisions a world where the architectural and spiritual legacy of King Bhoja 
              is fully realized. We believe that by completing the unfinished Bhojeshwar Temple, 
              we not only honor our ancestors but also create a living monument that connects past, 
              present, and future generations.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-stone-800/50 p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:bg-stone-800/70">
                <h3 className="text-xl font-medium mb-3">Preservation</h3>
                <p>Protecting and restoring the existing structure using traditional techniques</p>
              </div>
              
              <div className="bg-stone-800/50 p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:bg-stone-800/70">
                <h3 className="text-xl font-medium mb-3">Completion</h3>
                <p>Finishing the temple according to ancient architectural principles</p>
              </div>
              
              <div className="bg-stone-800/50 p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:bg-stone-800/70">
                <h3 className="text-xl font-medium mb-3">Education</h3>
                <p>Sharing the cultural and historical significance with the world</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll to top button - moved inside return */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-stone-700/50 hover:bg-stone-600/70 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}