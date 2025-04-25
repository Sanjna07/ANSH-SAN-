import React, { useEffect, useState } from 'react';

const Loader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds in milliseconds
    const interval = 25; // Update every 25ms
    const increment = 100 / (duration / interval); // Calculate increment to complete in 2.5s

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 50);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-[#1a1a1a] flex items-center justify-center z-50 overflow-hidden">
      <div className="relative">
        {/* Animated background circles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border-8 border-white/5 rounded-full animate-ping"
            style={{
              animationDelay: `${i * 0.5}s`,
              width: `${400 + i * 40}px`,
              height: `${400 + i * 40}px`,
              left: `${-200 - i * 20}px`,
              top: `${-200 - i * 20}px`,
            }}
          />
        ))}

        {/* Main content container */}
        <div className="relative z-10 text-center">
          <div className="relative w-48 h-48 mx-auto">
            {/* Rotating border */}
            <div className="absolute inset-0 rounded-full border-4 border-t-[#ECE4DA] border-r-[#ECE4DA]/50 border-b-[#ECE4DA]/30 border-l-transparent animate-spin"></div>
            
            {/* Logo container */}
            <div className="absolute inset-2 bg-[#1a1a1a] rounded-full p-2 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dub7qyv8e/image/upload/v1745415861/rc7l7llvhflv87uciq1g.jpg"
                alt="Project Purna Logo"
                className="w-36 h-36 object-contain rounded-full animate-pulse"
              />
            </div>
          </div>

          {/* Title with animated underline */}
          <div className="mt-8 relative">
            <h2 className="text-4xl font-serif font-bold text-[#ECE4DA] tracking-wider">
              Project Purna
            </h2>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#ECE4DA] to-transparent mt-2 animate-pulse"></div>
          </div>

          {/* Progress indicator */}
          <div className="mt-8 relative">
            <svg className="w-20 h-20 mx-auto" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#333"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#ECE4DA"
                strokeWidth="8"
                strokeDasharray={`${progress * 2.83}, 283`}
                transform="rotate(-90 50 50)"
                className="transition-all duration-300"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[#ECE4DA] font-bold">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;