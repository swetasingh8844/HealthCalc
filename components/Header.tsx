
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-md">H</div>
          <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">HealthCalc <span className="text-brand-600">Pro</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition">Home</Link>
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition">About</Link>
          <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition">Contact</Link>
          <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition">Privacy</Link>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 18v1m9-9h1M3 9h1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
        </nav>

        {/* Mobile Nav Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 18v1m9-9h1M3 9h1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 dark:text-gray-300 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4 gap-4">
            <Link onClick={() => setIsMenuOpen(false)} to="/" className="text-gray-600 dark:text-gray-300 font-medium">Home</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/about" className="text-gray-600 dark:text-gray-300 font-medium">About</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/contact" className="text-gray-600 dark:text-gray-300 font-medium">Contact</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/privacy-policy" className="text-gray-600 dark:text-gray-300 font-medium">Privacy Policy</Link>
          </div>
        </div>
      )}
    </header>
  );
};
