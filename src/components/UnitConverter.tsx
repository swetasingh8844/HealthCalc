import React, { useState } from 'react';

export const UnitConverter: React.FC = () => {
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inch'>('cm');

  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');

  // Height conversion
  const convertHeight = () => {
    if (!height) return '';
    const value = parseFloat(height);

    if (heightUnit === 'cm') {
      return (value / 2.54).toFixed(2) + ' inch';
    } else {
      return (value * 2.54).toFixed(2) + ' cm';
    }
  };

  // Weight conversion
  const convertWeight = () => {
    if (!weight) return '';
    const value = parseFloat(weight);

    if (weightUnit === 'kg') {
      return (value * 2.20462).toFixed(2) + ' lbs';
    } else {
      return (value / 2.20462).toFixed(2) + ' kg';
    }
  };

  return (
    <div className="flex justify-center my-6">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 w-full max-w-xs text-center">

        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Unit Converter
        </h3>

        {/* Height Converter */}
        <div className="mb-5">
          <div className="flex gap-2 mb-2">
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'inch')}
             className="border rounded-lg px-2 py-2 text-sm text-black bg-white"
            >
              <option value="cm">cm</option>
              <option value="inch">inch</option>
            </select>

            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Height in ${heightUnit}`}
             className="w-full px-3 py-2 rounded-lg border border-gray-300 text-center text-black placeholder-black focus:ring-2 focus:ring-brand-500 outline-none"

            />
          </div>

          {height && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {convertHeight()}
            </p>
          )}
        </div>

        {/* Weight Converter */}
        <div>
          <div className="flex gap-2 mb-2">
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lbs')}
              className="border rounded-lg px-2 py-2 text-sm text-black bg-white"

            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>

            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Weight in ${weightUnit}`}
             className="w-full px-3 py-2 rounded-lg border border-gray-300 text-center text-black placeholder-black focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          {weight && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {convertWeight()}
            </p>
          )}
          <center>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center max-w-md mx-auto">
  This quick unit converter is provided for your convenience so you can easily
  switch between metric and imperial units without leaving the page. 
</p>
<br></br>
 <div className="text-center mb-2">
  <p className="font-bold text-black">
    Converts cm ↔ inches and kg ↔ lbs in both directions.
  </p>
</div>
        </center>
        </div>
      </div>
      <div>
        
    

  </div>
    </div>
  );
  
};
