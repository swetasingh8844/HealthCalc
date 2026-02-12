
import React, { useState } from 'react';
import { calculateBMI, getBMICategory } from '../../../utils/calculations';
import { UnitSystem } from '../../../types';
import { Helmet } from 'react-helmet-async';
import { UnitConverter } from '../../components/UnitConverter';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [showShareOptions, setShowShareOptions] = useState(false);

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
      <title>BMI Calculator (Body Mass Index)- Free Online BMI Tool</title>
      <meta
        name="description"
        content="Calculate your Body Mass Index (BMI) instantly with our free online BMI calculator. Supports metric and imperial units."
      />
      <link rel="canonical" href="https://thefitcalculator.com/bmi-calculator" />
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
      onClick={() => {
        const shareText = `My BMI is ${result.bmi.toFixed(1)} (${result.category}). Check yours at https://thefitcalculator.com/bmi-calculator`;

        // Detect mobile
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isMobile && navigator.share) {
          // Mobile: open system share sheet
          navigator.share({
            title: "My BMI Result",
            text: shareText
          }).catch((error) => console.log("Share failed", error));
        } else {
          // Desktop: show share options
          setShowShareOptions(true);
        }
      }}
      className="text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline"
    >
      Share Results
    </button>

{showShareOptions && result && (
  <div className="mt-3 flex flex-wrap gap-2">
    {/* WhatsApp */}
    <a
      href={`https://wa.me/?text=${encodeURIComponent(
        `My BMI is ${result.bmi.toFixed(1)} (${result.category}). Check yours at https://thefitcalculator.com/bmi-calculator`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm"
    >
      WhatsApp
    </a>

    {/* Telegram */}
    <a
      href={`https://t.me/share/url?text=${encodeURIComponent(
        `My BMI is ${result.bmi.toFixed(1)} (${result.category}). Check yours at https://thefitcalculator.com/bmi-calculator`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm"
    >
      Telegram
    </a>

    {/* Email */}
    <a
      href={`mailto:?subject=My BMI Result&body=${encodeURIComponent(
        `My BMI is ${result.bmi.toFixed(1)} (${result.category}). Check yours at https://thefitcalculator.com/bmi-calculator`
      )}`}
      className="px-3 py-2 bg-gray-700 text-white rounded-lg text-sm"
    >
      Email
    </a>

    {/* Copy */}
    <button
      onClick={() => {
        const text = `My BMI is ${result.bmi.toFixed(1)} (${result.category}). Check yours at https://thefitcalculator.com/bmi-calculator`;
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
      }}
      className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm"
    >
      Copy
    </button>
  </div>
)}



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
  <br></br>
  <h3 className="text-xl font-bold mb-2">How is BMI Calculated?</h3>
<p className="mb-3">
  BMI is calculated using a simple mathematical formula based on your weight and height.
</p>

<h4 className="text-lg font-semibold mb-2">BMI Formula (Metric System)</h4>
<p className="mb-3">
  BMI = Weight (kg) ÷ Height (m²)
</p>

<p className="mb-3">
  Since this calculator takes height in centimeters (cm), it automatically converts your height into meters before performing the calculation.
</p>

<p className="mb-3">
  <strong>Example:</strong><br />
  Height: 170 cm (1.70 m)<br />
  Weight: 65 kg<br />
  BMI = 65 ÷ (1.70 × 1.70) = 22.49<br />
  BMI ≈ 22.5
</p>

<h3 className="text-xl font-bold mb-2">BMI Categories</h3>
<p className="mb-3">
  After calculating your BMI, your result falls into one of the following categories:
</p>

<ul className="list-disc pl-6 mb-3">
  <li><strong>Below 18.5</strong> – Underweight</li>
  <li><strong>18.5 – 24.9</strong> – Normal weight</li>
  <li><strong>25 – 29.9</strong> – Overweight</li>
  <li><strong>30 and above</strong> – Obese</li>
</ul>

<h3 className="text-xl font-bold mb-2">Healthy BMI Range</h3>
<p className="mb-3">
  A BMI between <strong>18.5 and 24.9</strong> is considered healthy for most adults. Maintaining a healthy BMI can reduce the risk of heart disease, diabetes, high blood pressure, and other health conditions.
</p>

<h3 className="text-xl font-bold mb-2">Is BMI Accurate?</h3>
<p className="mb-3">
  BMI is a useful screening tool, but it does not directly measure body fat. It may not be accurate for athletes or individuals with high muscle mass, as muscle weighs more than fat. For a complete health assessment, other measurements such as waist circumference and body fat percentage may be considered.
</p>

<h3 className="text-xl font-bold mb-2">Benefits of Using Our BMI Calculator</h3>
<ul className="list-disc pl-6 mb-3">
  <li>Instant and accurate results</li>
  <li>Uses metric system (kg and cm)</li>
  <li>Free and easy to use</li>
  <li>Helps track your health status</li>
</ul>

<h3 className="text-xl font-bold mb-2">Frequently Asked Questions (FAQs)</h3>

<h4 className="text-lg font-semibold mb-1">Is BMI different for men and women?</h4>
<p className="mb-3">
  The BMI formula is the same for men and women. However, body fat distribution may differ between genders.
</p>

<h4 className="text-lg font-semibold mb-1">Can children use this BMI calculator?</h4>
<p className="mb-3">
  BMI calculations for children and teenagers are age-specific and use percentile charts. This calculator is designed for adults.
</p>

<h4 className="text-lg font-semibold mb-1">How often should I check my BMI?</h4>
<p className="mb-3">
  You can check your BMI every few months to monitor changes in your weight and overall health.
</p>

<h3 className="text-xl font-bold mb-2">Conclusion</h3>
<p className="mb-3">
  BMI is a simple and effective way to assess whether your weight falls within a healthy range. Use our free BMI calculator to quickly determine your Body Mass Index and take the first step toward better health.
</p>

    </section>
   <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is BMI different for men and women?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The BMI formula is the same for men and women. However, body fat distribution may differ between genders."
          }
        },
        {
          "@type": "Question",
          "name": "Can children use this BMI calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BMI calculations for children and teenagers are age-specific and use percentile charts. This calculator is designed for adults."
          }
        },
        {
          "@type": "Question",
          "name": "How often should I check my BMI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can check your BMI every few months to monitor changes in your weight and overall health."
          }
        }
      ]
    })
  }}
/>

     </>
     
  );
};
