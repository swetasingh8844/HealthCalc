
import React, { useState } from 'react';
import { calculateIdealWeight } from '../../../utils/calculations';
import { UnitSystem, Gender } from '../../../types';
import { Helmet } from 'react-helmet-async';
import { UnitConverter } from '../../components/UnitConverter';
export const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [unit, setUnit] = useState<UnitSystem>(UnitSystem.Metric);
  const [result, setResult] = useState<number | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);


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
    <>
 {/* <UnitConverter /> */}
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
          {/* Share Button */}
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
<button
  onClick={() => {
    const weight =
      unit === UnitSystem.Metric
        ? result.toFixed(1) + " kg"
        : (result * 2.20462).toFixed(1) + " lbs";

    const shareText = `My ideal weight is ${weight}. Check yours at https://thefitcalculator.com/ideal-weight-calculator`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      navigator
        .share({
          title: "My Ideal Weight Result",
          text: shareText,
        })
        .catch(() => {});
    } else {
      setShowShareOptions(true);
    }
  }}
  className="mt-4 text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline"
>
  Share Results
</button>
{showShareOptions && (
  <div className="mt-3 flex flex-wrap gap-2">
    {/* WhatsApp */}
    <a
      href={`https://wa.me/?text=${encodeURIComponent(
        `My ideal weight is ${
          unit === UnitSystem.Metric
            ? result.toFixed(1) + " kg"
            : (result * 2.20462).toFixed(1) + " lbs"
        }. Check yours at https://thefitcalculator.com/ideal-weight-calculator`
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
        `My ideal weight is ${
          unit === UnitSystem.Metric
            ? result.toFixed(1) + " kg"
            : (result * 2.20462).toFixed(1) + " lbs"
        }. Check yours at https://thefitcalculator.com/ideal-weight-calculator`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm"
    >
      Telegram
    </a>

    {/* Email */}
    <a
      href={`mailto:?subject=My Ideal Weight Result&body=${encodeURIComponent(
        `My ideal weight is ${
          unit === UnitSystem.Metric
            ? result.toFixed(1) + " kg"
            : (result * 2.20462).toFixed(1) + " lbs"
        }. Check yours at https://thefitcalculator.com/ideal-weight-calculator`
      )}`}
      className="px-3 py-2 bg-gray-700 text-white rounded-lg text-sm"
    >
      Email
    </a>

    {/* Copy */}
    <button
      onClick={() => {
        const text = `My ideal weight is ${
          unit === UnitSystem.Metric
            ? result.toFixed(1) + " kg"
            : (result * 2.20462).toFixed(1) + " lbs"
        }. Check yours at https://thefitcalculator.com/ideal-weight-calculator`;
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
      }}
      className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm"
    >
      Copy
    </button>
  </div>
)}
</div>
      )}
      <br></br>
      <h3 className="text-xl font-bold mb-2">What is Ideal Body Weight?</h3>
  <p className="mb-3">
    "Ideal body weight" is an estimated healthy weight range based on your
    height and gender. It is often used as a guideline to maintain overall
    health and reduce the risk of diseases.
  </p>
    <h3 className="text-xl font-bold mb-2">Why It Matters</h3>
  <p>
    This calculator provides an approximate value. Your actual healthy weight
    may vary depending on muscle mass, body composition, and lifestyle.
  </p>
  <p className="text-gray-700 dark:text-gray-300 mb-4">
                While no single weight is perfect for everyone, staying within your recommended ideal range significantly reduces the risk of chronic conditions like hypertension, cardiovascular disease, and joint issues. It serves as a helpful target when you are preparing long-term diet and lifestyle plans.
              </p>
  <h3 className="text-xl font-bold mb-2">How is Ideal Body Weight Calculated?</h3>
<p className="mb-3">
  Ideal Body Weight (IBW) is calculated using medically recognized formulas
  that estimate a healthy weight based on height and gender.
</p>

<h4 className="text-lg font-semibold mb-2">Devine Formula</h4>

<p className="mb-3">
  <strong>For Men:</strong><br />
  50 kg + 2.3 kg for each inch over 5 feet
</p>

<p className="mb-3">
  <strong>For Women:</strong><br />
  45.5 kg + 2.3 kg for each inch over 5 feet
</p>

<h3 className="text-xl font-bold mb-2">Example Calculation</h3>
<p className="mb-3">
  <strong>Example (Male, 5'10"):</strong><br />
  5 feet = Base weight 50 kg<br />
  Extra 10 inches × 2.3 kg = 23 kg<br />
  Ideal Weight = 50 + 23 = <strong>73 kg</strong>
</p>

<h3 className="text-xl font-bold mb-2">Healthy Weight Range</h3>
<p className="mb-3">
  Your ideal body weight is usually given as a range rather than a single
  number. This range allows flexibility for different body compositions and
  muscle mass levels.
</p>

<ul className="list-disc pl-6 mb-3">
  <li>Lower end of range – Leaner body type</li>
  <li>Middle range – Balanced body composition</li>
  <li>Higher end – More muscle mass</li>
</ul>

<h3 className="text-xl font-bold mb-2">Factors That Affect Ideal Weight</h3>
<ul className="list-disc pl-6 mb-3">
  <li><strong>Muscle Mass:</strong> More muscle increases healthy weight.</li>
  <li><strong>Body Frame Size:</strong> Small, medium, or large bone structure.</li>
  <li><strong>Age:</strong> Metabolism changes over time.</li>
  <li><strong>Activity Level:</strong> Active individuals may weigh more due to muscle.</li>
</ul>

<h3 className="text-xl font-bold mb-2">Difference Between BMI and Ideal Weight</h3>
<p className="mb-3">
  <strong>BMI</strong> measures whether your weight is appropriate for your height.
  <br />
  <strong>Ideal Weight</strong> estimates what your healthy weight should be.
</p>

<h3 className="text-xl font-bold mb-2">Benefits of Knowing Your Ideal Weight</h3>
<ul className="list-disc pl-6 mb-3">
  <li>Helps set realistic fitness goals</li>
  <li>Reduces risk of heart disease and diabetes</li>
  <li>Improves long-term health planning</li>
  <li>Supports healthy weight management</li>
</ul>

<h3 className="text-xl font-bold mb-2">Frequently Asked Questions (FAQs)</h3>

<h4 className="text-lg font-semibold mb-1">Is ideal body weight the same for everyone?</h4>
<p className="mb-3">
  No. Ideal weight varies depending on gender, height, muscle mass,
  and overall body composition.
</p>

<h4 className="text-lg font-semibold mb-1">Can athletes weigh more than their ideal weight?</h4>
<p className="mb-3">
  Yes. Athletes often have more muscle mass, which can increase body weight
  without increasing body fat.
</p>

<h4 className="text-lg font-semibold mb-1">Should I aim for the exact ideal weight?</h4>
<p className="mb-3">
  Ideal weight should be used as a guideline. Focus on overall health,
  strength, and sustainable lifestyle habits rather than a specific number.
</p>

<h3 className="text-xl font-bold mb-2">Conclusion</h3>
<p className="mb-3">
  Knowing your ideal body weight helps you set healthy and realistic goals.
  Use our free Ideal Weight Calculator to determine your recommended range
  and start building a healthier lifestyle today.
</p>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is ideal body weight the same for everyone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Ideal weight varies depending on gender, height, muscle mass, and overall body composition."
          }
        },
        {
          "@type": "Question",
          "name": "Can athletes weigh more than their ideal weight?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Athletes often have more muscle mass, which can increase body weight without increasing body fat."
          }
        },
        {
          "@type": "Question",
          "name": "Should I aim for the exact ideal weight?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ideal weight should be used as a guideline. Focus on overall health, strength, and sustainable lifestyle habits rather than a specific number."
          }
        }
      ]
    })
  }}
/>

    </section>
    </>

  );
};
