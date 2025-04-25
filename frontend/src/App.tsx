import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Home from './components/home';
import Middle from './components/middle';
import Team from './components/team';
import { ContactUs } from './components/contactus';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import OurMissionContent from './components/ourmission';
import Footer from './components/footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    console.log('Loader completed'); // Add debug log
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        {isLoading ? (
          <Loader onLoadingComplete={handleLoadingComplete} />
        ) : (
          <>
            <Routes>
              <Route path="/" element={
                <>
                  <Home />
                  <Middle />
                </>
              } />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/mission" element={<OurMissionContent />} />
            </Routes>
            <Footer />
          </>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;