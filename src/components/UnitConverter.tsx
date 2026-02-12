import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
export const UnitConverter: React.FC = () => {
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inch'>('cm');
  const [feetHeight, setFeetHeight] = useState('');
  const [feetUnit, setFeetUnit] = useState<'cm' | 'feet'>('cm');

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


  const convertFeetHeight = () => {
  if (!feetHeight) return '';
  const value = parseFloat(feetHeight);

  if (feetUnit === 'cm') {
    const inches = value / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = (inches % 12).toFixed(1);
    return `${feet} ft ${remainingInches} in`;
  } else {
    // feet to cm
    return (value * 30.48).toFixed(2) + ' cm';
  }
};

  return (
    <div className="flex justify-center my-6">
      <Helmet>
  <title>Unit Converter | cm to inches, kg to lbs</title>

  <meta
    name="description"
    content="Convert height and weight easily. Convert cm to inches and kg to lbs instantly."
  />

  <meta property="og:title" content="Unit Converter | cm to inches, kg to lbs" />
  <meta
    property="og:description"
    content="Convert cm to inches and kg to lbs instantly."
  />
  <meta property="og:url" content="https://thefitcalculator.com/unit-converter" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://thefitcalculator.com/unit-converter" />
</Helmet>

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
      {/* cm ↔ feet Converter */}
<div className="mb-5">
  <div className="flex gap-2 mb-2">
    <select
      value={feetUnit}
      onChange={(e) => setFeetUnit(e.target.value as 'cm' | 'feet')}
      className="border rounded-lg px-2 py-2 text-sm text-black bg-white"
    >
      <option value="cm">cm</option>
      <option value="feet">feet</option>
    </select>

    <input
      type="number"
      value={feetHeight}
      onChange={(e) => setFeetHeight(e.target.value)}
      placeholder={`Height in ${feetUnit}`}
      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-center text-black placeholder-black focus:ring-2 focus:ring-brand-500 outline-none"
    />
  </div>
  <center>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center max-w-md mx-auto">
 Since many users measure their height in feet and inches, this converter allows them to quickly convert cm ↔ feet & inches for accurate calculations.
</p>
</center>
  {feetHeight && (
    <p className="text-sm text-gray-600 dark:text-gray-300">
      {convertFeetHeight()}
    </p>
  )}
  
</div>

        </div>
      </div>
      <div>
        
    

  </div>
    </div>
  );
  
};
