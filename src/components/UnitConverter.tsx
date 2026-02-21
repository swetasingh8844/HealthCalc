import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export const UnitConverter: React.FC = () => {
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inch'>('cm');

  const [feetHeight, setFeetHeight] = useState('');
  const [feetUnit, setFeetUnit] = useState<'cm' | 'feet'>('cm');

  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');

  // cm ↔ inch
  const convertHeight = () => {
    if (!height) return null;
    const value = parseFloat(height);
    if (isNaN(value)) return null;
    return heightUnit === 'cm'
      ? { result: (value / 2.54).toFixed(2), unit: 'inches' }
      : { result: (value * 2.54).toFixed(2), unit: 'cm' };
  };

  // kg ↔ lbs
  const convertWeight = () => {
    if (!weight) return null;
    const value = parseFloat(weight);
    if (isNaN(value)) return null;
    return weightUnit === 'kg'
      ? { result: (value * 2.20462).toFixed(2), unit: 'lbs' }
      : { result: (value / 2.20462).toFixed(2), unit: 'kg' };
  };

  // cm ↔ feet & inches
  const convertFeetHeight = () => {
    if (!feetHeight) return null;
    const value = parseFloat(feetHeight);
    if (isNaN(value)) return null;
    if (feetUnit === 'cm') {
      const totalInches = value / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = (totalInches % 12).toFixed(1);
      return { result: `${feet} ft ${inches} in`, unit: '' };
    }
    return { result: (value * 30.48).toFixed(2), unit: 'cm' };
  };

  const hResult = convertHeight();
  const wResult = convertWeight();
  const fResult = convertFeetHeight();

  const ResultBox = ({ result, unit, color }: { result: string; unit: string; color: string }) => (
    <div className={`mt-3 rounded-xl px-4 py-3 text-center border ${color}`}>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Result</p>
      <p className="text-2xl font-extrabold">{result}</p>
      {unit && <p className="text-sm font-semibold">{unit}</p>}
    </div>
  );

  const EmptyBox = () => (
    <div className="mt-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl px-4 py-3 text-center border border-gray-100 dark:border-gray-700">
      <p className="text-xs text-gray-400 dark:text-gray-500">Enter a value to see the result</p>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Unit Converter – Convert kg to lbs, cm to Feet & Inches Instantly | TheFitCalculator</title>
        <meta name="description" content="Free unit converter for height and weight. Convert cm to inches, inches to cm, kg to lbs, lbs to kg, and cm to feet & inches instantly before using BMI, BMR, or calorie calculators." />
        <meta property="og:title" content="Unit Converter – Height & Weight Conversion Tool | TheFitCalculator" />
        <meta property="og:description" content="Convert cm to inches and kg to lbs instantly. Free online unit converter for health calculations." />
        <meta property="og:url" content="https://thefitcalculator.com/unit-converter" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://thefitcalculator.com/unit-converter" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Page Title ── */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl px-8 py-10 relative overflow-hidden shadow-lg">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
          <div className="relative">
            <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Free Online Tool
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Unit Converter</h1>
            <p className="text-brand-100 text-sm max-w-lg leading-relaxed">
              Convert between metric and imperial units instantly — cm ↔ inches, cm ↔ feet &amp; inches, and kg ↔ lbs. No sign-up required.
            </p>
          </div>
        </div>

        {/* ── Tip Banner ── */}
        <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
          <span className="text-amber-500 text-sm mt-0.5">💡</span>
          <p className="text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
            <strong>Tip:</strong> Use this converter before entering your measurements into our{' '}
            <a href="/bmi-calculator" className="underline text-blue-500 font-bold hover:text-amber-600 dark:hover:text-amber-200">BMI</a>,{' '}
            <a href="/bmr-calculator" className="underline text-blue-500 font-bold hover:text-amber-600 dark:hover:text-amber-200">BMR</a>, or{' '}
            <a href="/ideal-weight-calculator" className="underline text-blue-500 font-bold hover:text-amber-600 dark:hover:text-amber-200">Ideal Weight</a> calculators.
          </p>
        </div>

        {/* ── Converter Cards ── */}
        <div className="grid sm:grid-cols-3 gap-5">

          {/* cm ↔ inches */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-3">
              <h2 className="text-white font-bold text-sm">Height — cm ↔ inches</h2>
              <p className="text-brand-100 text-xs mt-0.5">Centimetres and inches</p>
            </div>
            <div className="p-5">
              <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Convert from</label>
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl mb-3">
                {(['cm', 'inch'] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => { setHeightUnit(u); setHeight(''); }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${heightUnit === u ? 'bg-white dark:bg-gray-800 text-brand-700 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {u === 'cm' ? 'cm → in' : 'in → cm'}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={`Enter ${heightUnit === 'cm' ? 'cm' : 'inches'}`}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm text-center"
                min="0" step="0.1"
              />
              {hResult
                ? <div className="mt-3 bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 rounded-xl px-4 py-3 text-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Result</p>
                    <p className="text-2xl font-extrabold text-brand-700 dark:text-brand-400">{hResult.result}</p>
                    <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">{hResult.unit}</p>
                  </div>
                : <EmptyBox />
              }
            </div>
          </div>

          {/* cm ↔ feet & inches */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3">
              <h2 className="text-white font-bold text-sm">Height — cm ↔ ft & in</h2>
              <p className="text-blue-100 text-xs mt-0.5">Centimetres and feet/inches</p>
            </div>
            <div className="p-5">
              <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Convert from</label>
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl mb-3">
                {(['cm', 'feet'] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => { setFeetUnit(u); setFeetHeight(''); }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${feetUnit === u ? 'bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {u === 'cm' ? 'cm → ft' : 'ft → cm'}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={feetHeight}
                onChange={(e) => setFeetHeight(e.target.value)}
                placeholder={`Enter ${feetUnit === 'cm' ? 'cm' : 'feet'}`}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm text-center"
                min="0" step="0.1"
              />
              {fResult
                ? <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl px-4 py-3 text-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Result</p>
                    <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-400">{fResult.result}</p>
                    {fResult.unit && <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{fResult.unit}</p>}
                  </div>
                : <EmptyBox />
              }
            </div>
          </div>

          {/* kg ↔ lbs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-5 py-3">
              <h2 className="text-white font-bold text-sm">Weight — kg ↔ lbs</h2>
              <p className="text-green-100 text-xs mt-0.5">Kilograms and pounds</p>
            </div>
            <div className="p-5">
              <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Convert from</label>
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl mb-3">
                {(['kg', 'lbs'] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => { setWeightUnit(u); setWeight(''); }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${weightUnit === u ? 'bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {u === 'kg' ? 'kg → lbs' : 'lbs → kg'}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={`Enter ${weightUnit}`}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm text-center"
                min="0" step="0.1"
              />
              {wResult
                ? <div className="mt-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl px-4 py-3 text-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Result</p>
                    <p className="text-2xl font-extrabold text-green-700 dark:text-green-400">{wResult.result}</p>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">{wResult.unit}</p>
                  </div>
                : <EmptyBox />
              }
            </div>
          </div>

        </div>

        {/* ── Quick Reference Tables ── */}
        <div className="grid sm:grid-cols-2 gap-5">

          {/* Height table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="text-base font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-500 rounded-full inline-block"></span>
              Height Reference — cm to ft & in
            </h2>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/60">
                    <th className="px-3 py-2 text-left font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">cm</th>
                    <th className="px-3 py-2 text-left font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">ft & in</th>
                    <th className="px-3 py-2 text-left font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">inches</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { cm: 150, ft: "4'11\"", inch: '59.1' },
                    { cm: 155, ft: "5'1\"",  inch: '61.0' },
                    { cm: 160, ft: "5'3\"",  inch: '63.0' },
                    { cm: 165, ft: "5'5\"",  inch: '65.0' },
                    { cm: 170, ft: "5'7\"",  inch: '66.9' },
                    { cm: 175, ft: "5'9\"",  inch: '68.9' },
                    { cm: 180, ft: "5'11\"", inch: '70.9' },
                    { cm: 185, ft: "6'1\"",  inch: '72.8' },
                    { cm: 190, ft: "6'3\"",  inch: '74.8' },
                  ].map((row) => (
                    <tr key={row.cm} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-3 py-2 font-semibold text-brand-600 dark:text-brand-400">{row.cm}</td>
                      <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{row.ft}</td>
                      <td className="px-3 py-2 text-gray-500 dark:text-gray-400">{row.inch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Weight table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="text-base font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-4 bg-green-500 rounded-full inline-block"></span>
              Weight Reference — kg to lbs
            </h2>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/60">
                    <th className="px-3 py-2 text-left font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">kg</th>
                    <th className="px-3 py-2 text-left font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">lbs</th>
                    <th className="px-3 py-2 text-left font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">stone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { kg: 45, lbs: '99.2',  st: '7 st 1 lb'  },
                    { kg: 50, lbs: '110.2', st: '7 st 12 lb' },
                    { kg: 55, lbs: '121.3', st: '8 st 9 lb'  },
                    { kg: 60, lbs: '132.3', st: '9 st 6 lb'  },
                    { kg: 65, lbs: '143.3', st: '10 st 3 lb' },
                    { kg: 70, lbs: '154.3', st: '11 st 0 lb' },
                    { kg: 75, lbs: '165.3', st: '11 st 11 lb'},
                    { kg: 80, lbs: '176.4', st: '12 st 8 lb' },
                    { kg: 90, lbs: '198.4', st: '14 st 2 lb' },
                  ].map((row) => (
                    <tr key={row.kg} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-3 py-2 font-semibold text-green-600 dark:text-green-400">{row.kg}</td>
                      <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{row.lbs}</td>
                      <td className="px-3 py-2 text-gray-500 dark:text-gray-400">{row.st}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* ── Why Use Section ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
            Why Use a Unit Converter for Health Calculations?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
            Health calculators like BMI and BMR require measurements in either metric (cm / kg) or imperial (inches / lbs). A conversion error produces inaccurate results — this free converter ensures you always enter the right numbers.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: 'cm ↔ inches',       desc: 'Used by BMI, BMR, and ideal weight calculators that ask for height in cm or inches.',                             color: 'border-brand-300 dark:border-brand-700', bg: 'bg-yellow-50 dark:bg-yellow-900/20',  hColor: 'text-brand-700 dark:text-brand-300' },
              { label: 'cm ↔ feet & inches', desc: "Convert your height in feet and inches (e.g. 5'10\") to centimetres for metric calculators.",                     color: 'border-blue-300 dark:border-blue-700',  bg: 'bg-blue-50 dark:bg-blue-900/20',   hColor: 'text-blue-700 dark:text-blue-300'  },
              { label: 'kg ↔ lbs',           desc: 'Convert your weight between kilograms and pounds to match the unit system your calculator uses.',                  color: 'border-green-300 dark:border-green-700', bg: 'bg-green-50 dark:bg-green-900/20', hColor: 'text-green-700 dark:text-green-300' },
            ].map((item) => (
              <div key={item.label} className={`p-4 rounded-xl border-l-4 ${item.bg} ${item.color}`}>
                <p className={`text-sm font-bold mb-1 ${item.hColor}`}>{item.label}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        

      </div>
    </>
  );
};