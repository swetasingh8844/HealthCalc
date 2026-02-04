
import React, { useState } from 'react';
import { calculateIdealWeight } from '../../utils/calculations';
import { UnitSystem, Gender } from '../../types';

export const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [unit, setUnit] = useState<UnitSystem>(UnitSystem.Metric);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height) return;

    let h = parseFloat(height);

    if (unit === UnitSystem.Imperial) {
      h = h * 2.54; // inches to cm
    }

    const idealWeight = calculateIdealWeight(gender, h);
    setResult(idealWeight);
    
    // Tracking Event
    // @ts-ignore
    window.gtag?.('event', 'calculate_ideal_weight', { 
      ideal_weight_val: idealWeight.toFixed(1),
      gender: gender 
    });
  };

  const handleReset = () => {
    setHeight('');
    setGender(Gender.Male);
    setResult(null);
  };

  return (
    <section id="ideal-weight-calculator" className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-brand-700 dark:text-brand-500">Ideal Weight Calculator</h2>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setUnit(UnitSystem.Metric)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${unit === UnitSystem.Metric ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
        >
          Metric (cm)
        </button>
        <button 
          onClick={() => setUnit(UnitSystem.Imperial)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${unit === UnitSystem.Imperial ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
        >
          Imperial (inches)
        </button>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Gender</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setGender(Gender.Male)}
              className={`flex-1 py-3 rounded-xl border font-bold transition ${gender === Gender.Male ? 'bg-brand-600 text-white border-brand-600 shadow-md' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setGender(Gender.Female)}
              className={`flex-1 py-3 rounded-xl border font-bold transition ${gender === Gender.Female ? 'bg-brand-600 text-white border-brand-600 shadow-md' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
            >
              Female
            </button>
          </div>
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
            Calculate Ideal Weight
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

      {result !== null && (
        <div className="mt-8 p-6 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-100 dark:border-brand-800 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="text-gray-600 dark:text-gray-400 font-medium">Your recommended ideal weight is approximately:</p>
          <div className="flex items-end gap-3 my-2">
            <span className="text-5xl font-extrabold text-brand-700 dark:text-brand-400">
              {unit === UnitSystem.Metric ? result.toFixed(1) : (result * 2.20462).toFixed(1)}
            </span>
            <span className="text-xl font-bold mb-1 text-brand-600">{unit === UnitSystem.Metric ? 'kg' : 'lbs'}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-4">
            Based on the Devine formula. Ideal weight varies by body composition and age.
          </p>
          <div className="mt-4 pt-4 border-t border-brand-200 dark:border-brand-800 text-[10px] text-gray-400 dark:text-gray-500 italic">
             <span>*Consult with a professional for a personalized assessment.</span>
          </div>
        </div>
      )}
    </section>
  );
};
