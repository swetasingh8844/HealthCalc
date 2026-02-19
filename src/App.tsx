import React, { useEffect, useState } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// import { BrowserRouter as Router} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About, PrivacyPolicy, ContactUs } from './pages/StaticPages';
import {BMICalculator} from "./components/calculators/BMICalculator";
import {BMRCalculator} from "./components/calculators/BMRCalculator";
import {IdealWeightCalculator} from "./components/calculators/IdealWeightCalculator";
import { CalorieCalculator } from './components/calculators/CalorieCalculator';
import { UnitConverter } from './components/UnitConverter';

import { TermsOfService } from './pages/TermsofService'; 
// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // const showConverter =
  //   location.pathname === "/"
    // location.pathname === "/bmi-calculator" ||
    // location.pathname === "/bmr-calculator" ||
    // location.pathname === "/calorie-calculator" ||
    // location.pathname === "/ideal-weight-calculator";

  return (
    <>
      {/* {showConverter && (
        <div className="container mx-auto px-4 py-6">
          <UnitConverter />
        </div>
      )} */}
      {children}
    </>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    
    <HelmetProvider>
      <div className="min-h-screen flex flex-col font-sans selection:bg-brand-100 selection:text-brand-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ScrollToTop />
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex-grow">
          {/* <div className="container mx-auto px-4 py-6">
    <UnitConverter />
  </div>   */}
            <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            <Route path="/bmr-calculator" element={<BMRCalculator />} />
            <Route path="/ideal-weight-calculator" element={<IdealWeightCalculator />} />
            <Route path="/calorie-calculator" element={<CalorieCalculator />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
          </Layout>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default App;  

