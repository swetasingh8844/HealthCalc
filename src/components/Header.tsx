import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageTranslator from './LanguageTranslator';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalcDropdownOpen, setIsCalcDropdownOpen] = useState(false);
  const [calcPos, setCalcPos] = useState({ top: 0, left: 0 });
  const calcRef = useRef<HTMLDivElement>(null);
  const calcButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const calculators = [
    { to: '/bmi-calculator',            label: 'BMI Calculator',      icon: '📊', desc: 'Body Mass Index' },
    { to: '/bmr-calculator',            label: 'BMR Calculator',      icon: '🔥', desc: 'Basal Metabolic Rate' },
    { to: '/ideal-weight-calculator',   label: 'Ideal Weight',        icon: '⚖️', desc: 'Healthy weight range' },
    { to: '/calorie-calculator',        label: 'Calorie Calculator',  icon: '🥗', desc: 'Daily calorie needs' },
    { to: '/water-intake-calculator',   label: 'Water Intake',        icon: '💧', desc: 'Daily Hydration Goal' },
    { to: '/weight-loss-calculator',    label: 'Weight Loss',         icon: '📉', desc: 'Calorie Deficit & Timeline' },
    { to: '/body-fat-calculator',       label: 'Body Fat %',          icon: '🔬', desc: 'US Navy & BMI Method' },
    { to: '/protein-intake-calculator', label: 'Protein Intake',      icon: '🥩', desc: 'Daily Protein Goal' },
    { to: '/life-expectancy-calculator',label: 'Life Expectancy',     icon: '⏳', desc: 'Longevity Estimate' },
    { to: '/unit-converter',            label: 'Unit Converter',      icon: '🔄', desc: 'kg ↔ lbs, cm ↔ ft' },
  ];

  const isCalcActive = calculators.some(c => location.pathname === c.to);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (calcRef.current && !calcRef.current.contains(e.target as Node))
        setIsCalcDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setIsCalcDropdownOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const DarkToggle = () => (
    <button
      onClick={toggleDarkMode}
      className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shrink-0"
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
  );

  const nl = (path: string) =>
    `text-[18px] font-semibold transition px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
      location.pathname === path
        ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20'
        : 'text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-gray-700'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-screen-3xl mx-auto px-4 md:px-8 h-16 md:h-24 flex items-center gap-2">

        {/* Logo */}
        <Link to="/" className="text-lg md:text-2xl font-black text-gray-900 dark:text-white tracking-tight shrink-0 mr-2 md:mr-6">
          TheFit<span className="text-brand-600">Calculator</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5 flex-1 min-w-0 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none min-w-0">
            <Link to="/"               className={nl('/')}>Home</Link>
            <Link to="/about"          className={nl('/about')}>About</Link>
            <Link to="/contact"        className={nl('/contact')}>Contact</Link>
            <Link to="/privacy-policy" className={nl('/privacy-policy')}>Privacy</Link>
          </div>

          {/* Calculators dropdown */}
          <div className="relative shrink-0 overflow-visible" ref={calcRef}>
            <button
              ref={calcButtonRef}
              onClick={() => {
                if (calcButtonRef.current) {
                  const rect = calcButtonRef.current.getBoundingClientRect();
                  setCalcPos({ top: rect.bottom + 8, left: rect.left });
                }
                setIsCalcDropdownOpen(o => !o);
              }}
              className={`flex items-center gap-1 text-[18px] font-semibold transition px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
                isCalcActive || isCalcDropdownOpen
                  ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20'
                  : 'text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Calculators
              <svg className={`w-3 h-3 transition-transform ${isCalcDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCalcDropdownOpen && (
              <div
                style={{ top: `${calcPos.top}px`, left: `${calcPos.left}px`, position: 'fixed' }}
                className="w-64 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl z-[99999]"
              >
                <div className="p-2">
                  {calculators.map(calc => (
                    <Link key={calc.to} to={calc.to}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        location.pathname === calc.to
                          ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="text-base w-6 text-center shrink-0">{calc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight">{calc.label}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{calc.desc}</p>
                      </div>
                      {location.pathname === calc.to && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                      )}
                    </Link>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-400 text-center">All calculators are free — no sign-up needed</p>
                </div>
              </div>
            )}
          </div>

          <Link to="/fitness-blog"         className={nl('/fitness-blog')}>📝 Blog</Link>
          <Link to="/fitness-shop"         className={nl('/fitness-shop')}>🛒 Shop</Link>
          <Link to="/fitness-guide-videos" className={nl('/fitness-guide-videos')}>🎬 Fitness Videos</Link>
          <Link to="/fitness-news"         className={nl('/fitness-news')}>📰 News</Link>
          <Link to="/fitness-reels"        className={nl('/fitness-reels')}>🎞️ FitReels</Link>
        </nav>

        {/* Desktop right */}
        <div className="hidden xl:flex items-center gap-2 shrink-0 ml-auto">
          <LanguageTranslator />
          <DarkToggle />
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-2 xl:hidden ml-auto">
          <LanguageTranslator />
          <DarkToggle />
          <button
            onClick={() => setIsMenuOpen(o => !o)}
            className="p-1.5 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 max-h-[80vh] overflow-y-auto">
          <div className="px-3 py-4 flex flex-col gap-3">

            {/* Main nav links — 2 column grid */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1 mb-2">Pages</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { to: '/',               label: '🏠 Home' },
                  { to: '/about',          label: 'ℹ️ About' },
                  { to: '/contact',        label: '✉️ Contact' },
                  { to: '/privacy-policy', label: '🔒 Privacy' },
                  { to: '/fitness-blog',   label: '📝 Blog' },
                  { to: '/fitness-shop',   label: '🛒 Shop' },
                  { to: '/fitness-reels',  label: '🎞️ FitReels' },
                  { to: '/fitness-guide-videos', label: '🎬 Fitness Videos' },
                  { to: '/fitness-news',   label: '📰 News' },
                ].map(link => (
                  <Link key={link.to} to={link.to}
                    className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition text-center ${
                      location.pathname === link.to
                        ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
                        : 'text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-brand-50 dark:hover:bg-brand-900/20'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Calculators — 2 column grid */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1 mb-2">🧮 Calculators</p>
              <div className="grid grid-cols-2 gap-1.5">
                {calculators.map(calc => (
                  <Link key={calc.to} to={calc.to}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition ${
                      location.pathname === calc.to
                        ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                        : 'text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-brand-50 dark:hover:bg-brand-900/20'
                    }`}
                  >
                    <span className="text-base shrink-0">{calc.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold leading-tight truncate">{calc.label}</p>
                      <p className="text-[10px] text-gray-400 truncate">{calc.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};