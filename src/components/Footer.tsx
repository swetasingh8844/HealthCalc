
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12 transition-colors duration-300 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">TheFitCalculator <span className="text-brand-500">Pro</span></h3>
            <p className="text-sm leading-relaxed">
              Your trusted hub for health calculators. We provide science-backed tools to help you track your wellness metrics and plan your health journey.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/bmi-calculator" className="hover:text-brand-500 transition-colors">BMI Calculator</Link></li>
              <li><Link to="/bmr-calculator" className="hover:text-brand-500 transition-colors">BMR Calculator</Link></li>
              <li><Link to="/calorie-calculator" className="hover:text-brand-500 transition-colors">Calorie Calculator</Link></li>
              <li><Link to="/ideal-weight-calculator" className="hover:text-brand-500 transition-colors">Ideal Weight</Link></li>
               <li><Link to="/unit-converter" className="hover:text-brand-500 transition-colors">Unit Converter</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-brand-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-500 transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs">
          <p className="mb-4">
            <strong className="text-white">Medical Disclaimer:</strong> The information provided on this website is for educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.
          </p>
          <p>&copy; {new Date().getFullYear()} TheFitCalculator Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
