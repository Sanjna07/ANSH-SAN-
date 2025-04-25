import React, { useEffect, useRef, useState } from 'react';

// TypeScript interfaces for props and state
interface AnimationProps {
  delay?: number;
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

// Reusable animated components
const AnimatedSection: React.FC<SectionProps> = ({ children, className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
};

const TypingText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
        // Blink cursor for a while, then stop
        setTimeout(() => setShowCursor(false), 3000);
      }
    }, 80);
    
    return () => clearInterval(interval);
  }, [text]);
  
  return (
    <span className="inline-block">
      {displayText}
      {showCursor && <span className="animate-blink">|</span>}
    </span>
  );
};

// Additional content data for each section
const additionalContentData = {
  heritage: [
    {
      title: "Archaeological Research",
      text: "Our team conducts ongoing archaeological research at Bhojpur sites, using advanced techniques to uncover, document, and preserve historical artifacts and structures while minimizing disturbance to the original landscape."
    },
    {
      title: "Digital Preservation",
      text: "We're creating comprehensive digital archives of Bhojpur monuments using photogrammetry, 3D scanning, and high-resolution imaging. These digital replicas serve as both educational resources and preservation insurance against potential damage or decay."
    },
    {
      title: "Restoration Projects",
      text: "Working with expert conservationists, we undertake careful restoration projects that balance authenticity with structural integrity. Each project adheres to international conservation standards while respecting the original architectural vision."
    }
  ],
  education: [
    {
      title: "Interactive Learning Programs",
      text: "Our educational initiatives include immersive workshops where participants engage with historical crafts, architectural techniques, and cultural practices that shaped Bhojpur's monuments and heritage sites."
    },
    {
      title: "Academic Partnerships",
      text: "We collaborate with universities and research institutions worldwide to facilitate scholarly exchange, support research projects, and create internship opportunities that advance our understanding of Bhojpur's historical significance."
    },
    {
      title: "Digital Learning Resources",
      text: "Our growing collection of online resources includes virtual tours, interactive timelines, and educational videos that make Bhojpur's history accessible to global audiences of all ages and backgrounds."
    }
  ],
  community: [
    {
      title: "Local Artisan Support",
      text: "We provide training and economic opportunities to local craftspeople who practice traditional arts related to Bhojpur's cultural heritage, helping ensure these skills continue to thrive while creating sustainable livelihoods."
    },
    {
      title: "Heritage Tourism Development",
      text: "Through responsible tourism initiatives, we help local communities benefit economically from cultural heritage while ensuring visitor experiences are authentic, educational, and environmentally sustainable."
    },
    {
      title: "Community Heritage Councils",
      text: "We've established local heritage councils that empower community members to participate in preservation decision-making, propose initiatives, and serve as guardians of their historical and cultural patrimony."
    }
  ]
};

const OurMissionContent: React.FC = () => {
  // For running text animation
  const [isLoaded, setIsLoaded] = useState(false);
  // For dark mode toggle
  const [darkMode, setDarkMode] = useState(false);
  // For expanded content in different sections
  const [expandedSections, setExpandedSections] = useState({
    heritage: false,
    education: false,
    community: false
  });
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Initialize any global animations
    const animateBackgroundElements = () => {
      const particles = document.querySelectorAll('.bg-particle');
      particles.forEach((particle: Element) => {
        const htmlElement = particle as HTMLElement;
        htmlElement.style.animationDuration = `${Math.random() * 15 + 10}s`;
        htmlElement.style.animationDelay = `${Math.random() * 5}s`;
      });
    };
    
    animateBackgroundElements();
  }, []);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Toggle expanded content for specific section
  const toggleExpand = (section: 'heritage' | 'education' | 'community') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div className={`${darkMode ? 'bg-stone-800 text-gray-200' : 'bg-[#ECE4DA] text-stone-800'} overflow-x-hidden transition-colors duration-300`}>
      {/* Header with home button and dark mode toggle */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-stone-800' : 'bg-stone-800'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-[#ECE4DA] font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Home
          </a>
          
          <button 
            onClick={toggleDarkMode} 
            className="text-[#ECE4DA] p-2 rounded-full transition-colors duration-300 hover:bg-opacity-20 hover:bg-white"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section with enhanced professional styling */}
      <section className={`relative py-8 overflow-hidden ${darkMode ? 'bg-stone-700' : 'bg-stone-700'} transition-colors duration-300`}>
        {/* Subtle grid background for texture */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/20/20')] bg-repeat opacity-5"></div>
        
        {/* Main content container with precise alignment */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <AnimatedSection className="mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ECE4DA] tracking-tight">
              Our <span className={`${darkMode ? 'text-[#f8d8bd]' : 'text-[#f8d8bd]'} transition-colors duration-300 hover:text-[#ECE4DA]`}>Mission</span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection>
            <div className="h-1 w-16 md:w-24 bg-[#ECE4DA] mx-auto mb-6 md:mb-8 transition-all duration-700 hover:w-32"></div>
          </AnimatedSection>
          
          <AnimatedSection className="max-w-2xl mx-auto text-lg md:text-xl text-[#ECE4DA]">
            <TypingText text="Preserving and promoting the rich historical heritage of Bhojpur and its monumental treasures for future generations." />
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Content with precisely aligned grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        {/* First content row */}
        <AnimatedSection className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-32 items-start">
          {/* Image section with sticky positioning */}
          <div className="md:sticky md:top-24 self-start">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <div className="relative">
                <img 
                  src="https://i0.wp.com/compass.rauias.com/wp-content/uploads/2024/03/image-105.png?resize=666%2C387&ssl=1" 
                  alt="Historic Bhojpur Monument" 
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-[#ECE4DA] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="font-medium text-sm">Bhojpur Temple - 11th Century</h4>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content section with expandable text */}
          <div className="flex flex-col justify-center space-y-4">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 relative inline-block group ${darkMode ? 'text-gray-200' : 'text-stone-800'}`}>
              <span className="transition-all duration-300 hover:text-stone-700">
                Preserving Our Heritage
              </span>
              <span className={`absolute -bottom-2 left-0 w-16 h-0.5 ${darkMode ? 'bg-gray-400' : 'bg-stone-800'} transition-all duration-500 group-hover:w-full`}></span>
            </h2>
            
            <p className={`${darkMode ? 'text-gray-300' : 'text-stone-700'} leading-relaxed`}>
              At Purna, we are dedicated to the preservation, documentation, and celebration of the historical monuments of Bhojpur. 
              Our team of historians, archaeologists, and cultural enthusiasts work tirelessly to ensure these architectural marvels 
              receive the attention and care they deserve.
            </p>
            
            <p className={`${darkMode ? 'text-gray-300' : 'text-stone-700'} leading-relaxed`}>
              We believe that these monuments are not just structures of stone and mortar but living testaments to our rich cultural 
              heritage and historical legacy that must be protected for generations to come.
            </p>
            
            {/* Expandable content section */}
            <div className="pt-4">
              {expandedSections.heritage && (
                <div className={`${darkMode ? 'bg-stone-700 text-gray-300' : 'bg-[#ECE4DA] text-stone-800'} p-4 rounded-lg mb-4 transition-all duration-300`}>
                  {additionalContentData.heritage.map((content, index) => (
                    <div 
                      key={index} 
                      className={`mb-6 transform transition-all duration-500 delay-${index * 200}`}
                    >
                      <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-stone-700'}`}>
                        {content.title}
                      </h4>
                      <p className="leading-relaxed">{content.text}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <button 
                onClick={() => toggleExpand('heritage')}
                className={`mt-2 px-4 md:px-6 py-2 md:py-3 ${darkMode ? 'bg-[#c6b8a7] hover:bg-[#d8cabe]' : 'bg-stone-800 hover:bg-stone-700'} text-[#ab8152] rounded-lg transition-all duration-300 overflow-hidden relative group`}
              >
                <span className="relative z-10 flex items-center">
                  {expandedSections.heritage ? "Show Less" : "Learn More"}
                  <svg 
                    className={`w-5 h-5 ml-2 transition-transform duration-300 ${expandedSections.heritage ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                <span className={`absolute top-0 left-0 w-full h-full ${darkMode ? 'bg-[#d8cabe]' : 'bg-stone-700'} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`}></span>
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Second content row with symmetrical layout */}
        <AnimatedSection className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-32 items-start">
          <div className="flex flex-col justify-center space-y-4 order-2 md:order-1">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 relative inline-block group ${darkMode ? 'text-gray-200' : 'text-stone-800'}`}>
              <span className="transition-all duration-300 hover:text-stone-700">
                Education & Awareness
              </span>
              <span className={`absolute -bottom-2 left-0 w-16 h-0.5 ${darkMode ? 'bg-gray-400' : 'bg-stone-800'} transition-all duration-500 group-hover:w-full`}></span>
            </h2>
            
            <p className={`${darkMode ? 'text-gray-300' : 'text-stone-700'} leading-relaxed`}>
              We strive to create awareness about the historical significance of Bhojpur's monuments through educational 
              programs, guided tours, publications, and digital resources. By sharing stories of our past, we hope to 
              inspire appreciation for our cultural roots.
            </p>
            
            <p className={`${darkMode ? 'text-gray-300' : 'text-stone-700'} leading-relaxed`}>
              Our initiatives include workshops for students, training local guides, and creating accessible content 
              that brings history to life for everyone, regardless of their background or prior knowledge.
            </p>
            
            {/* Expandable content section */}
            <div className="pt-4">
              {expandedSections.education && (
                <div className={`${darkMode ? 'bg-stone-700 text-gray-300' : 'bg-[#ECE4DA] text-stone-800'} p-4 rounded-lg mb-4 transition-all duration-300`}>
                  {additionalContentData.education.map((content, index) => (
                    <div 
                      key={index} 
                      className={`mb-6 transform transition-all duration-500 delay-${index * 200}`}
                    >
                      <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-stone-700'}`}>
                        {content.title}
                      </h4>
                      <p className="leading-relaxed">{content.text}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <button 
                onClick={() => toggleExpand('education')}
                className={`mt-2 px-4 md:px-6 py-2 md:py-3 ${darkMode ? 'bg-[#c6b8a7] hover:bg-[#d8cabe]' : 'bg-stone-800 hover:bg-stone-700'} text-[#ab8152] rounded-lg transition-all duration-300 overflow-hidden relative group`}
              >
                <span className="relative z-10 flex items-center">
                  {expandedSections.education ? "Show Less" : "Learn More"}
                  <svg 
                    className={`w-5 h-5 ml-2 transition-transform duration-300 ${expandedSections.education ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                <span className={`absolute top-0 left-0 w-full h-full ${darkMode ? 'bg-[#d8cabe]' : 'bg-stone-700'} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`}></span>
              </button>
            </div>
            
            {/* Running text with professional styling - made responsive */}
            <div className="pt-6 overflow-hidden relative h-6">
              <div className={`whitespace-nowrap transition-transform duration-[20s] ease-linear ${isLoaded ? 'animate-marquee' : ''}`}>
                <span className={`inline-block mx-2 md:mx-4 ${darkMode ? 'text-gray-400' : 'text-stone-500'} text-xs md:text-sm`}>Historical Tours</span>
                <span className="inline-block mx-1 text-stone-400">•</span>
                <span className={`inline-block mx-2 md:mx-4 ${darkMode ? 'text-gray-400' : 'text-stone-500'} text-xs md:text-sm`}>Educational Workshops</span>
                <span className="inline-block mx-1 text-stone-400">•</span>
                <span className={`inline-block mx-2 md:mx-4 ${darkMode ? 'text-gray-400' : 'text-stone-500'} text-xs md:text-sm`}>Digital Archives</span>
                <span className="inline-block mx-1 text-stone-400">•</span>
                <span className={`inline-block mx-2 md:mx-4 ${darkMode ? 'text-gray-400' : 'text-stone-500'} text-xs md:text-sm`}>Cultural Programs</span>
                <span className="inline-block mx-1 text-stone-400">•</span>
                <span className={`inline-block mx-2 md:mx-4 ${darkMode ? 'text-gray-400' : 'text-stone-500'} text-xs md:text-sm`}>Historical Tours</span>
              </div>
            </div>
          </div>
          
          {/* Fixed the responsiveness of this image */}
          <div className="group order-1 md:order-2 transition-all duration-500 transform hover:translate-y-1">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <div className="relative w-full h-0 pb-[60%]">
                <img 
                  src="https://kevinstandagephotography.wordpress.com/wp-content/uploads/2018/03/ksp_2879.jpg" 
                  alt="Educational Tour at Monument" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-[#ECE4DA] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="font-medium text-sm">Educational Tour for Local Students</h4>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Third content row with perfect symmetry */}
        <AnimatedSection className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="group transition-all duration-500 transform hover:translate-y-1">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <div className="relative w-full h-0 pb-[60%]">
                <img 
                  src="https://th-i.thgim.com/public/entertainment/music/f3pimm/article69348459.ece/alternates/LANDSCAPE_1200/21fr_Bhojeswara%20temple%201.jpg" 
                  alt="Conservation Efforts" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-[#ECE4DA] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="font-medium text-sm">Community Conservation Project</h4>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center space-y-4">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 relative inline-block group ${darkMode ? 'text-gray-200' : 'text-stone-800'}`}>
              <span className="transition-all duration-300 hover:text-stone-700">
                Community Involvement
              </span>
              <span className={`absolute -bottom-2 left-0 w-16 h-0.5 ${darkMode ? 'bg-gray-400' : 'bg-stone-800'} transition-all duration-500 group-hover:w-full`}></span>
            </h2>
            
            <p className={`${darkMode ? 'text-gray-300' : 'text-stone-700'} leading-relaxed`}>
              We firmly believe that preserving our heritage is a collective responsibility. That's why we actively 
              engage local communities, encouraging them to participate in conservation efforts and become stewards 
              of their own historical treasures.
            </p>
            
            <p className={`${darkMode ? 'text-gray-300' : 'text-stone-700'} leading-relaxed`}>
              Through collaborative projects, volunteer programs, and sustainable tourism initiatives, we aim to create 
              a model where cultural preservation contributes to community development and economic growth.
            </p>
            
            {/* Expandable content section */}
            <div className="pt-4">
              {expandedSections.community && (
                <div className={`${darkMode ? 'bg-stone-700 text-gray-300' : 'bg-[#ece4da] text-stone-800'} p-4 rounded-lg mb-4 overflow-y-auto transition-all duration-300`}>
                  {additionalContentData.community.map((content, index) => (
                    <div 
                      key={index} 
                      className={`mb-6 transform transition-all duration-500 delay-${index * 200}`}
                    >
                      <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-stone-700'}`}>
                        {content.title}
                      </h4>
                      <p className="leading-relaxed">{content.text}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <button 
                onClick={() => toggleExpand('community')}
                className={`mt-2 px-4 md:px-6 py-2 md:py-3 ${darkMode ? 'bg-[#c6b8a7] hover:bg-[#d8cabe]' : 'bg-stone-800 hover:bg-stone-700'} text-[#ab8152] rounded-lg transition-all duration-300 overflow-hidden relative group`}
              >
                <span className="relative z-10 flex items-center">
                  {expandedSections.community ? "Show Less" : "Learn More"}
                  <svg 
                    className={`w-5 h-5 ml-2 transition-transform duration-300 ${expandedSections.community ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                <span className={`absolute top-0 left-0 w-full h-full ${darkMode ? 'bg-[#d8cabe]' : 'bg-stone-700'} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`}></span>
              </button>
            </div>
            
            <div className="pt-6 flex flex-wrap gap-2">
              {["Volunteer", "Participate", "Contribute", "Learn"].map((tag, index) => (
                <span 
                  key={tag}
                  className={`inline-block px-2 md:px-3 py-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-[#ECE4DA]' : 'bg-stone-200 hover:bg-stone-300 text-stone-700'} rounded-full text-xs md:text-sm transition-all duration-300 transform hover:-translate-y-1 animate-fade-in`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Values Section with professional cards and symmetrical layout */}
      <section className={`${darkMode ? 'bg-stone-700' : 'bg-[#c6b8a7]'} py-10 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 inline-block relative ${darkMode ? 'text-[#ECE4DA]' : 'text-stone-800'}`}>
              Our Core Values
              <span className={`absolute left-0 right-0 bottom-0 h-0.5 ${darkMode ? 'bg-[#ECE4DA]' : 'bg-stone-800'} transform scale-x-0 transition-transform duration-700 group-hover:scale-x-100`}></span>
            </h2>
            <div className={`h-1 w-16 md:w-24 ${darkMode ? 'bg-[#ECE4DA]' : 'bg-stone-800'} mx-auto transition-all duration-700 hover:w-32`}></div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                title: "Authenticity", 
                description: "We are committed to accurate historical representation and authentic preservation techniques that honor the original craftsmanship of Bhojpur's monuments.",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd"></path>
                  </svg>
                )
              },
              { 
                title: "Accessibility", 
                description: "We believe historical knowledge should be accessible to all. We strive to make information about Bhojpur's heritage available through multiple channels and formats.",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                  </svg>
                )
              },
              { 
                title: "Sustainability", 
                description: "Our preservation efforts are designed with the future in mind, balancing conservation needs with sustainable tourism and responsible resource management.",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd"></path>
                    <path fillRule="evenodd" d="M10 4c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556z" clipRule="evenodd"></path>
                  </svg>
                )
              }
            ].map((value, index) => (
              <AnimatedSection 
                key={value.title} 
                className={`${darkMode ? 'bg-stone-800 text-[#ECE4DA]' : 'bg-[#ECE4DA]'} p-6 md:p-8 rounded-lg shadow-md transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-[#c6b8a7] text-stone-800' : 'bg-stone-800 text-[#ECE4DA]'} flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110`}>
                    {value.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold">{value.title}</h3>
                </div>
                <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-stone-700'}`}>{value.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action with professional design - improved footer text responsiveness */}
      <section className="py-10 text-center relative">
        {/* Subtle background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className={`bg-particle absolute rounded-full ${darkMode ? 'bg-gray-500' : 'bg-stone-800'} opacity-5`}
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`
              }}
            ></div>
          ))}
        </div>
        
        <AnimatedSection className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-[#ECE4DA]' : 'text-stone-800'}`}>Join Our Mission</h2>
          <div className={`h-1 w-16 md:w-24 ${darkMode ? 'bg-[#c6b8a7]' : 'bg-stone-800'} mx-auto mb-6 md:mb-8 transition-all duration-700 hover:w-32`}></div>
          
          <p className={`mb-8 md:mb-12 text-base md:text-lg ${darkMode ? 'text-gray-300' : 'text-stone-700'} leading-relaxed`}>
            Whether you're a history enthusiast, a conservationist, or simply someone who cares about preserving our shared heritage, 
            there are many ways to support our mission. Together, we can ensure that the historical monuments of Bhojpur continue to 
            inspire future generations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button className={`${darkMode ? 'bg-[#c6b8a7] hover:bg-[#d8cabe]' : 'bg-stone-800 hover:bg-stone-700'} text-[#967249] px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
              Support Our Work
            </button>
            <button className={`border-2 ${darkMode ? 'border-[#c6b8a7] text-[#c6b8a7] hover:bg-[#c6b8a7]' : 'border-stone-800 text-stone-800 hover:bg-stone-800'} px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium shadow-md transition-all duration-300 hover:text-[#ECE4DA] hover:shadow-lg transform hover:-translate-y-1`}>
              Volunteer With Us
            </button>
          </div>
          
          {/* Professional running text footer */}
          <div className="mt-16 overflow-hidden h-6">
            <div className={`whitespace-nowrap transition-transform duration-[25s] ease-linear ${isLoaded ? 'animate-marquee-slow' : ''}`}>
              {[
                "Preserving History", "Celebrating Culture", "Protecting Monuments", 
                "Sharing Knowledge", "Building Community", "Honoring Traditions"
              ].map((text, index) => (
                <React.Fragment key={index}>
                  <span className={`inline-block mx-4 ${darkMode ? 'text-gray-400' : 'text-stone-500'}`}>{text}</span>
                  {index < 5 && <span className="inline-block mx-1 text-stone-400">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes scrollDown {
          0% { transform: translateY(0); opacity: 1; }
          75% { transform: translateY(6px); opacity: 0; }
          80% { transform: translateY(0); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0); }
        }
        
        @keyframes marquee {
          from { transform: translateX(100%); }
          to { transform: translateX(-100%); }
        }
        
        @keyframes marquee-slow {
          from { transform: translateX(100%); }
          to { transform: translateX(-120%); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s forwards;
        }
        
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
        
        .animate-scroll-down {
          animation: scrollDown 2s ease-in-out infinite;
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        .animate-marquee-slow {
          animation: marquee-slow 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OurMissionContent;