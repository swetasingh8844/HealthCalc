
import React, { useState } from 'react';
import { calculateBMR } from '../../../utils/calculations';
import { UnitSystem, Gender } from '../../../types';
import { Helmet } from 'react-helmet-async';
import { UnitConverter } from '../../components/UnitConverter';
export const BMRCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [unit, setUnit] = useState<UnitSystem>(UnitSystem.Metric);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !height || !age) return;

    let w = parseFloat(weight);
    let h = parseFloat(height);
    const a = parseInt(age);

    if (unit === UnitSystem.Imperial) {
      w = w * 0.453592; // lbs to kg
      h = h * 2.54; // inches to cm
    }

    const bmrValue = calculateBMR(gender, w, h, a);
    setResult(bmrValue);
    
    // Tracking Event
    // @ts-ignore
    window.gtag?.('event', 'calculate_bmr', { bmr_value: bmrValue.toFixed(0) });
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setGender(Gender.Male);
    setResult(null);
  };

  return (
    <>
    <Helmet>
  <title>BMR Calculator - Basal Metabolic Rate Calculator</title>
  <meta
    name="description"
    content="Use our BMR calculator to estimate your basal metabolic rate and understand how many calories your body needs at rest."
  />
  <link rel="canonical" href="https://thefitcalculator.com/bmr" />
</Helmet>
 {/* <UnitConverter /> */}
    <section id="bmr-calculator" className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-brand-700 dark:text-brand-500">BMR Calculator (Harris-Benedict)</h2>
      
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Gender</label>
            <select 
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
            >
              <option value={Gender.Male}>Male</option>
              <option value={Gender.Female}>Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Age (years)</label>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
              placeholder="e.g. 25"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Weight ({unit === UnitSystem.Metric ? 'kg' : 'lbs'})</label>
          <input 
            type="number" 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
            placeholder={`Enter weight in ${unit === UnitSystem.Metric ? 'kg' : 'lbs'}`}
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
            placeholder={`Enter height in ${unit === UnitSystem.Metric ? 'cm' : 'inches'}`}
            required
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <button 
            type="submit" 
            className="flex-1 bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition shadow-lg"
          >
            Calculate BMR
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
          <p className="text-gray-600 dark:text-gray-400 font-medium">Your Basal Metabolic Rate (BMR) is:</p>
          <div className="flex items-end gap-3 my-2">
            <span className="text-5xl font-extrabold text-brand-700 dark:text-brand-400">{Math.round(result)}</span>
            <span className="text-xl font-bold mb-1 text-brand-600">calories/day</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-4">
            This is the number of calories your body needs to maintain basic physiological functions while at rest.
          </p>
          <div className="mt-4 pt-4 border-t border-brand-200 dark:border-brand-800 flex justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 italic">
             <span>*Calculated using the Harris-Benedict formula.</span>
             <span>Medical Disclaimer: Consult a nutritionist.</span>
          </div>
        </div>
      )}
      <br></br>
      <h3 className="text-xl font-bold mb-2">What is BMR?</h3>
   
  <p className="mb-3">
     Basal Metabolic Rate (BMR) is the number of calories your body needs to
    perform basic functions like breathing, circulation, and cell production
    while at rest.
  </p>

   <h3 className="text-xl font-bold mb-2">Understanding BMR</h3>
  <p>
   Your BMR represents the minimum amount of energy (calories) your body requires to keep its vital systems functioning—like breathing, blood circulation, and cell production—while at complete rest.
  </p>
   <br></br>
  <h3 className="text-xl font-bold mb-2">Factors Influencing BMR</h3>
  <p>
  Several variables determine your metabolic rate:
  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Muscle Mass:</strong> Muscle burns more energy at rest than fat, so higher muscle mass increases BMR.</li>
                <li><strong>Age:</strong> Metabolic rate typically slows down as we age due to changes in muscle tissue.</li>
                <li><strong>Gender:</strong> Men generally have a slightly higher BMR because they often possess more lean muscle mass.</li>
                <li><strong>Genetics:</strong> Individual metabolic traits can vary based on your family history.</li>
              </ul>
  </p>
    </section>
    </>
  );
};
