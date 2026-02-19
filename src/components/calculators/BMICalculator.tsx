import React, { useState } from 'react';
import { calculateBMI, getBMICategory } from '../../../utils/calculations';
import { UnitSystem } from '../../../types';
import { Helmet } from 'react-helmet-async';
import { UnitConverter } from '../../components/UnitConverter';
import { useLocation } from "react-router-dom";

// ── Accordion FAQ Item ────────────────────────────────────────────────────────
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-brand-400 dark:border-brand-500 shadow-sm' : 'border-gray-200 dark:border-gray-700'}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug">{question}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-300 ${open ? 'bg-brand-600 rotate-45' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-3 bg-gray-50 dark:bg-gray-900/40 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [unit, setUnit] = useState<UnitSystem>(UnitSystem.Metric);
  const [result, setResult] = useState<{ bmi: number; category: string; color: string; description: string } | null>(null);
   const location = useLocation();
  const isCalculatorPage = location.pathname === "/bmi-calculator";

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !height) return;

    let w = parseFloat(weight);
    let h = parseFloat(height);

    if (unit === UnitSystem.Imperial) {
      w = w * 0.453592;
      h = h * 2.54;
    }

    const bmi = calculateBMI(w, h);
    const cat = getBMICategory(bmi);
    setResult({ bmi, ...cat });

    // @ts-ignore
    window.gtag?.('event', 'calculate_bmi', { bmi_value: bmi.toFixed(1) });
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  // BMI gauge percent (clamped 10–40)
  const gaugePct = result
    ? ((Math.max(10, Math.min(40, result.bmi)) - 10) / 30) * 100
    : null;

  const faqs = [
    {
      question: 'Is BMI different for men and women?',
      answer:
        'The BMI formula is identical for men and women — it uses the same weight-divided-by-height-squared calculation regardless of gender. However, women naturally carry a higher percentage of body fat than men at the same BMI value, due to biological differences in hormones and body composition. The standard WHO BMI ranges apply to both men and women for general health screening purposes.',
    },
    {
      question: 'Can children use this BMI calculator?',
      answer:
        "No — this calculator is designed for adults aged 18 and over only. BMI for children and teenagers (ages 2–19) uses the same formula but results are interpreted using age- and sex-specific growth charts and BMI-for-age percentile rankings, not the fixed ranges used for adults. If you need to assess BMI for a child, please use a dedicated paediatric BMI tool and consult your child's doctor.",
    },
    {
      question: 'How often should I check my BMI?',
      answer:
        'For most adults, checking your BMI every 3 to 6 months is sufficient if you are actively working on your weight. For general health monitoring with no specific weight goals, once or twice a year is adequate. Daily or weekly checks are unnecessary — your weight naturally fluctuates by 1–2 kg throughout the day due to hydration, meals, and activity levels.',
    },
    {
      question: 'What is a healthy BMI range?',
      answer:
        'According to the World Health Organization, a BMI between 18.5 and 24.9 is considered healthy for most adults. A BMI below 18.5 is classified as underweight, 25–29.9 as overweight, and 30 or above indicates obesity. Some health authorities recommend slightly lower cut-off points for certain ethnic groups — for example, South Asian and East Asian populations may face increased health risks at a BMI above 23.',
    },
    {
      question: 'Does BMI apply during pregnancy?',
      answer:
        'BMI is not a reliable or appropriate measure during pregnancy. Weight naturally and healthily increases throughout pregnancy to support the growing baby, placenta, and amniotic fluid. All weight monitoring during pregnancy should be guided by your midwife, OB-GYN, or healthcare provider rather than a standard BMI calculator.',
    },
    {
      question: 'Can I have a normal BMI but still be unhealthy?',
      answer:
        'Yes — this is sometimes referred to as "normal-weight obesity." A person can fall within the normal BMI range (18.5–24.9) while still carrying excess body fat, particularly around the abdomen, and having low muscle mass. This is why waist circumference and body composition measurements are valuable complementary tools alongside BMI.',
    },
    {
      question: 'Is BMI the same as body fat percentage?',
      answer:
        'No — BMI and body fat percentage are two distinct measurements. BMI is calculated purely from your weight and height and gives no direct information about how much of your body is fat versus muscle or bone. Body fat percentage, measured through DEXA scans or bioelectrical impedance, directly measures the proportion of fat in your body — entirely independent of your BMI.',
    },
  ];
  const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.answer.replace(/<[^>]+>/g, ""), // removes HTML if any
    },
  })),
};

  return (
    <>
      <Helmet>
        {isCalculatorPage && (
        <title>BMI Calculator (Body Mass Index) - Free Online BMI Tool</title>
        )}
         {isCalculatorPage && (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )}
        <meta
          name="description"
          content="Calculate your Body Mass Index (BMI) instantly with our free online BMI calculator. Supports metric and imperial units. See your BMI category and personalized health tips."
        />
        <link rel="canonical" href="https://thefitcalculator.com/bmi-calculator" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Page Title ── */}
        <div className="text-center pb-2">
          {/* <span className="inline-block bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Free Online Tool</span> */}
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">BMI Calculator for Adults</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg mx-auto">Enter your weight and height below to instantly calculate your Body Mass Index and find out what your result means for your health.</p>
        </div>

        {/* ── Calculator Card ── */}
        <section id="bmi-calculator" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">Calculate Your BMI</h2>
            <p className="text-brand-100 text-xs mt-0.5">Supports Metric and Imperial units</p>
          </div>

          <div className="p-6">
            {/* Unit Toggle + Converter Link */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl">
                <button
                  onClick={() => setUnit(UnitSystem.Metric)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${unit === UnitSystem.Metric ? 'bg-white dark:bg-gray-800 text-brand-700 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  Metric (kg / cm)
                </button>
                <button
                  onClick={() => setUnit(UnitSystem.Imperial)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${unit === UnitSystem.Imperial ? 'bg-white dark:bg-gray-800 text-brand-700 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  Imperial (lbs / in)
                </button>
              </div>

              {/* Unit Converter Link */}
              <a
                href="/unit-converter"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700 px-3 py-2 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 16V4m0 0L3 8m4-4 4 4"/><path d="M17 8v12m0 0 4-4m-4 4-4-4"/>
                </svg>
                Open Unit Converter <br />
              <span className="inline-block mt-1">→</span>

                {/* Convert cm ↔ ft·in &amp; kg ↔ lbs */}
              </a>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Weight ({unit === UnitSystem.Metric ? 'kg' : 'lbs'})
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                    placeholder={unit === UnitSystem.Metric ? 'e.g. 70' : 'e.g. 154'}
                    required
                    min="1"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Height ({unit === UnitSystem.Metric ? 'cm' : 'inches'})
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                    placeholder={unit === UnitSystem.Metric ? 'e.g. 175' : 'e.g. 69'}
                    required
                    min="1"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-200 dark:shadow-none text-sm"
                >
                  Calculate BMI
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Result */}
            {result && (
             <div className="mt-6 rounded-2xl border border-brand-100 dark:border-brand-800 bg-white dark:bg-gray-900 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">


                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Your Result</p>
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-6xl font-extrabold text-brand-700 dark:text-brand-400 leading-none">{result.bmi.toFixed(1)}</span>
                  <span className={`text-xl font-bold mb-1 ${result.color}`}>{result.category}</span>
                </div>

                {/* Gauge Bar */}
                {gaugePct !== null && (
                  <div className="mt-4 mb-3">
                    <div className="relative h-3 rounded-full overflow-visible" style={{ background: 'linear-gradient(to right, #60a5fa 0%, #34d399 28%, #fbbf24 50%, #f87171 75%, #ef4444 100%)' }}>
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-gray-700 dark:border-gray-200 rounded-full shadow-md transition-all duration-700"
                        style={{ left: `calc(${gaugePct}% - 10px)` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 font-medium">
                      <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
                    </div>
                  </div>
                )}

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-3">
                  {result.description}
                </p>

                <div className="mt-4 pt-4 border-t border-brand-100 dark:border-brand-800 flex flex-wrap justify-between items-center gap-2">
                  <button
                    onClick={() => {
                      const shareText = `My BMI is ${result.bmi.toFixed(1)} (${result.category}). Check yours at https://thefitcalculator.com/bmi-calculator`;
                      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                      if (isMobile && navigator.share) {
                        navigator.share({ title: 'My BMI Result', text: shareText }).catch(() => {});
                      } else {
                        setShowShareOptions(true);
                      }
                    }}
                    className="text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    ↗ Share Results
                  </button>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 italic">*Medical Disclaimer: Consult a doctor.</span>
                </div>

                {showShareOptions && result && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href={`https://wa.me/?text=${encodeURIComponent(`My BMI is ${result.bmi.toFixed(1)} (${result.category}). Check yours at https://thefitcalculator.com/bmi-calculator`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold">WhatsApp</a>
                    <a href={`https://t.me/share/url?text=${encodeURIComponent(`My BMI is ${result.bmi.toFixed(1)} (${result.category}). Check yours at https://thefitcalculator.com/bmi-calculator`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-semibold">Telegram</a>
                    <a href={`mailto:?subject=My BMI Result&body=${encodeURIComponent(`My BMI is ${result.bmi.toFixed(1)} (${result.category}). Check yours at https://thefitcalculator.com/bmi-calculator`)}`} className="px-3 py-2 bg-gray-700 text-white rounded-lg text-xs font-semibold">Email</a>
                    <button onClick={() => { navigator.clipboard.writeText(`My BMI is ${result.bmi.toFixed(1)} (${result.category}). Check yours at https://thefitcalculator.com/bmi-calculator`); alert('Copied to clipboard!'); }} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-xs font-semibold">Copy</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Content Section ── */}
        <section className="space-y-6">

          {/* What is BMI */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              What is BMI?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Body Mass Index (BMI) is a simple numerical value calculated from your weight and height, used worldwide to screen for weight categories that may lead to health problems. It is defined as your weight in kilograms divided by the square of your height in metres (kg/m²). While BMI is not a diagnostic tool on its own, it serves as a reliable and accessible first step in identifying potential weight-related health risks for most adults.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Why Calculate Your BMI?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Knowing your BMI helps you understand whether your current weight is within a healthy range for your height. It is used globally as a screening tool to identify adults who may be at risk of obesity-related conditions such as type 2 diabetes, heart disease, and high blood pressure. Tracking your BMI over time can also help you monitor the impact of lifestyle changes on your overall health.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How is BMI Calculated?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              BMI is calculated using a straightforward formula based on your weight and height. The calculation differs slightly depending on whether you use metric or imperial units.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Metric System</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm">BMI = Weight (kg) ÷ Height (m)²</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">Height in cm is auto-converted to metres.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">Imperial System</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm">BMI = [Weight (lbs) ÷ Height (in)²] × 703</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">Units are converted automatically.</p>
              </div>
            </div>
          </div>

          {/* Healthy Range & Accuracy */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Healthy BMI Range
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              According to the World Health Organization (WHO), a BMI between <strong className="text-gray-800 dark:text-gray-100">18.5 and 24.9</strong> is considered healthy for most adults. Staying within this range is associated with a significantly lower risk of chronic conditions including heart disease, type 2 diabetes, and high blood pressure.
            </p>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Is BMI Accurate?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              BMI is a useful screening tool, but it has real limitations at the individual level. It does not distinguish between fat mass and lean muscle mass — a muscular athlete may register as "overweight" despite having very low body fat. For a more complete assessment, consider waist circumference, waist-to-hip ratio, and body fat percentage alongside BMI.
            </p>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Benefits of Using Our BMI Calculator
            </h2>
            <ul className="space-y-2">
              {[
                'Instant and accurate results in seconds',
                'Supports both metric (kg/cm) and imperial (lbs/in) units',
                'Completely free with no sign-up required',
                'Shows your BMI category with a clear health description',
                'Helps you track changes in your weight and health over time',
              ].map((item) => (
                <li key={item}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* BMI Categories */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              BMI Categories (WHO Standard)
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">The WHO defines the following BMI ranges for adults aged 18 and over.</p>
           <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/60">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">BMI Range</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Health Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { cat: 'Underweight', range: 'Below 18.5', risk: 'Nutritional deficiency risk', color: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-400' },
                    { cat: 'Normal weight', range: '18.5 – 24.9', risk: 'Low risk', color: 'text-green-600 dark:text-green-400', dot: 'bg-green-400' },
                    { cat: 'Overweight', range: '25 – 29.9', risk: 'Moderate risk', color: 'text-yellow-600 dark:text-yellow-400', dot: 'bg-yellow-400' },
                    { cat: 'Obese (Class I)', range: '30 – 34.9', risk: 'High risk', color: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-400' },
                    { cat: 'Obese (Class II)', range: '35 – 39.9', risk: 'Very high risk', color: 'text-red-500 dark:text-red-400', dot: 'bg-red-400' },
                    { cat: 'Obese (Class III)', range: '40 and above', risk: 'Extremely high risk', color: 'text-red-700 dark:text-red-500', dot: 'bg-red-600' },
                  ].map((row) => (
                    <tr key={row.cat} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className={`px-4 py-3 font-semibold ${row.color}`}>
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.dot}`}></span>
                          {row.cat}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{row.range}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Health Tips by BMI Category
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Practical, evidence-based steps depending on where your BMI falls. Always consult a healthcare provider before making major changes.</p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'If Underweight',
                  bg: 'bg-blue-50 dark:bg-blue-900/20',
                  border: 'border-blue-100 dark:border-blue-800',
                  hColor: 'text-blue-700 dark:text-blue-300',
                  tips: [
                    'Gradually increase daily calories with nutrient-dense whole foods',
                    'Eat protein-rich foods: eggs, legumes, dairy, lean meats',
                    'Add strength training to build lean muscle mass',
                    'Aim for 3 meals and 2–3 healthy snacks per day',
                    'Consider a registered dietitian for a personalised plan',
                  ],
                },
                {
                  title: 'If Normal Weight',
                  bg: 'bg-green-50 dark:bg-green-900/20',
                  border: 'border-green-100 dark:border-green-800',
                  hColor: 'text-green-700 dark:text-green-300',
                  tips: [
                    'Maintain a balanced diet rich in vegetables and whole grains',
                    'Stay active with at least 150 minutes of moderate exercise weekly',
                    'Monitor your weight every few months to catch changes early',
                    'Prioritise quality sleep and stress management',
                  ],
                },
                {
                  title: 'If Overweight',
                  bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                  border: 'border-yellow-100 dark:border-yellow-800',
                  hColor: 'text-yellow-700 dark:text-yellow-300',
                  tips: [
                    'Aim for a modest calorie reduction — 500 kcal/day less can help',
                    'Increase daily movement: walking, cycling, or swimming all count',
                    'Reduce ultra-processed, sugary, and high-fat foods',
                    'Track meals with an app to build awareness of portion sizes',
                    'Set realistic goals — 0.5–1 kg per week is sustainable',
                  ],
                },
                {
                  title: 'If Obese',
                  bg: 'bg-red-50 dark:bg-red-900/20',
                  border: 'border-red-100 dark:border-red-800',
                  hColor: 'text-red-700 dark:text-red-300',
                  tips: [
                    'Consult a doctor or specialist before starting any weight-loss plan',
                    'Begin with low-impact exercise such as walking or water aerobics',
                    'Focus on long-term sustainable habits rather than crash diets',
                    'Consider support from a dietitian or structured weight-loss program',
                  ],
                },
              ].map((card) => (
                <div key={card.title} className={`p-4 rounded-xl border ${card.bg} ${card.border}`}>
                  <h3 className={`font-bold mb-3 text-sm ${card.hColor}`}>{card.title}</h3>
                  <ul className="space-y-1.5">
                    {card.tips.map((tip) => (
                      <li key={tip}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5" style={{ borderColor: 'currentColor' }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Limitations */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Limitations of BMI
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
              BMI is a widely used tool, but it is important to understand what it cannot tell you. Always consider it alongside other health indicators and professional medical advice.
            </p>
            <ul className="space-y-2 mb-5">
              {[
                'Does not directly measure body fat percentage',
                'Cannot distinguish between fat mass and lean muscle mass',
                'May misclassify muscular athletes as overweight or obese',
                'Does not reflect fat distribution — abdominal fat carries higher risk',
                'May underestimate risk in older adults with low muscle mass',
                'Does not fully account for ethnicity — some groups face risk at lower BMI values',
                'Not applicable to children, teenagers, or pregnant women',
              ].map((item) => (
                <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5"> {item}
              </li>

              ))}
            </ul>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Conclusion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              BMI is a simple, fast, and widely accepted way to assess whether your weight is within a healthy range. While it has real limitations, it remains a valuable starting point for understanding your health. Use our free BMI calculator to get your result instantly, and consider speaking with a healthcare professional to interpret what your number means for your individual health journey.
            </p>
          </div>

          {/* ── FAQ Section ── */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Frequently Asked Questions
            </h2>
            {/* <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Click any question to reveal the answer.</p> */}

            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

        </section>
      </div>

    </>
  );
};