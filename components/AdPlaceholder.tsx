
import React from 'react';

interface AdPlaceholderProps {
  slot: string;
  className?: string;
  label?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot, className = '', label = 'Advertisement' }) => {
  return (
    <div className={`my-8 mx-auto w-full ad-placeholder min-h-[100px] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 ${className}`}>
      <div className="text-center p-4">
        <span className="block font-semibold text-gray-400 dark:text-gray-500">{label}</span>
        <span className="text-xs text-gray-300 dark:text-gray-600">Ad Slot: {slot}</span>
      </div>
    </div>
  );
};
