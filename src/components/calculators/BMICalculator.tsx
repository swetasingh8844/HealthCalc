
import React, { useState } from 'react';
import { calculateBMI, getBMICategory } from '../../../utils/calculations';
import { UnitSystem } from '../../../types';
import { Helmet } from 'react-helmet-async';
import { UnitConverter } from '../../components/UnitConverter';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<UnitSystem>(UnitSystem.Metric);
  const [result, setResult] = useState<{ bmi: number; category: string; color: string; description: string } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !height) return;

    let w = parseFloat(weight);
    let h = parseFloat(height);

    if (unit === UnitSystem.Imperial) {
      w = w * 0.453592; // lbs to kg
      h = h * 2.54; // inches to cm
    }

    const bmi = calculateBMI(w, h);
    const cat = getBMICategory(bmi);
    setResult({ bmi, ...cat });
    
    // Tracking Event
    // @ts-ignore
    window.gtag?.('event', 'calculate_bmi', { bmi_value: bmi.toFixed(1) });
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
      <>
    <Helmet>
      <title>BMI Calculator - Free Online BMI Tool</title>
      <meta
        name="description"
        content="Calculate your Body Mass Index (BMI) instantly with our free online BMI calculator. Supports metric and imperial units."
      />
      <link rel="canonical" href="https://thefitcalculator.com/bmi" />
    </Helmet>


    <section id="bmi-calculator" className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-brand-700 dark:text-brand-500">BMI Calculator for Adults</h2>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setUnit(UnitSystem.Metric)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${unit === UnitSystem.Metric ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
        >
          Metric (kg/cm)
        </button>
        <button 
          onClick={() => setUnit(UnitSystem.Imperial)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${unit === UnitSystem.Imperial ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
        >
          Imperial (lbs/in)
        </button>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Weight ({unit === UnitSystem.Metric ? 'kg' : 'lbs'})</label>
          <input 
            type="number" 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
            placeholder={`Enter weight in ${unit === UnitSystem.Metric ? 'kilograms' : 'pounds'}`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Height ({unit === UnitSystem.Metric ? 'cm' : 'inches'})</label>
          <input 
            type="number" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
            placeholder={`Enter height in ${unit === UnitSystem.Metric ? 'centimeters' : 'inches'}`}
            required
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <button 
            type="submit" 
            className="flex-1 bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition shadow-lg"
          >
            Calculate BMI
          </button>
          <button 
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-100 dark:border-brand-800 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="text-gray-600 dark:text-gray-400 font-medium">Your BMI is:</p>
          <div className="flex items-end gap-3 my-2">
            <span className="text-5xl font-extrabold text-brand-700 dark:text-brand-400">{result.bmi.toFixed(1)}</span>
            <span className={`text-xl font-bold mb-1 ${result.color}`}>{result.category}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-4">
            {result.description}
          </p>
          <div className="mt-4 pt-4 border-t border-brand-200 dark:border-brand-800 flex justify-between items-center">
             <button 
              onClick={() => alert('Results saved to clipboard!')}
              className="text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline"
             >
               Share Results
             </button>
             <span className="text-[10px] text-gray-400 dark:text-gray-500 italic">*Medical Disclaimer: Consult a doctor.</span>
          </div>
        </div>
      )}
      <br></br>
      <h3 className="text-xl font-bold mb-2">What is BMI?</h3>
   
  <p className="mb-3">
    Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults. It is defined as the weight in kilograms divided by the square of the height in metres (kg/m²).
  </p>

   <h3 className="text-xl font-bold mb-2">Why Calculate Your BMI?</h3>
  <p>
    While BMI is not a direct measure of body fatness, it provides a reliable indicator for most people. It is used as a screening tool to identify potential weight problems for adults. However, BMI does not take into account muscle mass, bone density, and overall body composition.
  </p>
    </section>
     </>
  );
};
