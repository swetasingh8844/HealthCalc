import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalcDropdownOpen, setIsCalcDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const calculators = [
    { to: '/bmi-calculator',          label: 'BMI Calculator',     icon: '📊', desc: 'Body Mass Index' },
    { to: '/bmr-calculator',          label: 'BMR Calculator',     icon: '🔥', desc: 'Basal Metabolic Rate' },
    { to: '/ideal-weight-calculator', label: 'Ideal Weight',       icon: '⚖️', desc: 'Healthy weight range' },
    { to: '/calorie-calculator',      label: 'Calorie Calculator', icon: '🥗', desc: 'Daily calorie needs' },
    { to: '/unit-converter',          label: 'Unit Converter',     icon: '🔄', desc: 'kg ↔ lbs, cm ↔ ft' },
  ];

  const isCalcActive = calculators.some(c => location.pathname === c.to);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCalcDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setIsCalcDropdownOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
          TheFitCalculator <span className="text-brand-600">Pro</span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex gap-1 items-center">

          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            Home
          </Link>

          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            About
          </Link>

           <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            Contact
          </Link>

           <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            Privacy
          </Link>

          {/* ── Calculators Dropdown ── */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsCalcDropdownOpen(!isCalcDropdownOpen)}
              className={`flex items-center gap-1.5 font-medium transition px-3 py-2 rounded-lg ${
                isCalcActive || isCalcDropdownOpen
                  ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20'
                  : 'text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Calculators
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isCalcDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Panel */}
            {isCalcDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2">
                  {calculators.map((calc) => (
                    <Link
                      key={calc.to}
                      to={calc.to}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        location.pathname === calc.to
                          ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="text-xl w-8 text-center flex-shrink-0">{calc.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold leading-tight">{calc.label}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{calc.desc}</p>
                      </div>
                      {location.pathname === calc.to && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                      )}
                    </Link>
                  ))}
                </div>
                <div className="px-4 pb-3 pt-1 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                    All calculators are free — no sign-up needed
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            📝 Blog
          </Link>

          <Link to="/shop" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            🛒 Shop
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ml-1"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 18v1m9-9h1M3 9h1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </nav>

        {/* ── Mobile Actions ── */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 18v1m9-9h1M3 9h1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
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

      {/* ── Mobile Menu ── */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4 gap-1">

            <Link to="/" className="text-gray-600 dark:text-gray-300 font-medium px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 font-medium px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 font-medium px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              Contact
            </Link>
            <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-300 font-medium px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              Privacy Policy
            </Link>

            {/* Calculators group */}
            <div className="mt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 mb-1.5">
                🧮 Calculators
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl overflow-hidden">
                {calculators.map((calc, i) => (
                  <Link
                    key={calc.to}
                    to={calc.to}
                    className={`flex items-center gap-3 px-3 py-2.5 transition ${
                      i < calculators.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                    } ${
                      location.pathname === calc.to
                        ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{calc.icon}</span>
                    <div>
                      <p className="text-sm font-semibold">{calc.label}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{calc.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/blog" className="text-gray-600 dark:text-gray-300 font-medium px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 mt-1">
              Blog
            </Link>
            <Link to="/shop" className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-3 py-2.5 rounded-lg text-center mt-1 transition">
              🛒 Shop
            </Link>

          </div>
        </div>
      )}
    </header>
  );
};