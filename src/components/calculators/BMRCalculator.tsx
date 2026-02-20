import React, { useState } from 'react';
import { calculateBMR } from '../../../utils/calculations';
import { UnitSystem, Gender } from '../../../types';
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

export const BMRCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [unit, setUnit] = useState<UnitSystem>(UnitSystem.Metric);
  const [result, setResult] = useState<number | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const location = useLocation();
  const isCalculatorPage = location.pathname === "/bmr-calculator";

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !height || !age) return;

    let w = parseFloat(weight);
    let h = parseFloat(height);
    const a = parseInt(age);

    if (unit === UnitSystem.Imperial) {
      w = w * 0.453592;
      h = h * 2.54;
    }

    const bmrValue = calculateBMR(gender, w, h, a);
    setResult(bmrValue);

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

  const faqs = [
    {
      question: 'Is BMR the same for men and women?',
      answer:
        'No — men typically have a higher BMR than women at the same weight, height, and age. This is primarily because men tend to carry more lean muscle mass, which is metabolically more active than fat tissue and burns more calories even at rest. The Harris-Benedict and Mifflin-St Jeor formulas both account for this difference by using different constants for each sex.',
    },
    {
      question: 'Does BMR decrease with age?',
      answer:
        'Yes. BMR naturally declines as you age, typically by around 1–2% per decade after your mid-twenties. This happens mainly because muscle mass decreases with age (a process called sarcopenia), and muscle tissue burns significantly more calories at rest than fat. Staying physically active and maintaining muscle through strength training can help slow this metabolic decline.',
    },
    {
      question: 'How often should I calculate my BMR?',
      answer:
        'You should recalculate your BMR any time your body composition changes significantly — for example, after notable weight loss or gain, if you have started or stopped a consistent strength training program, or after a major birthday milestone (every 5–10 years is a reasonable interval for general monitoring). BMR also changes during pregnancy and illness, so recalculation during those periods is a good idea.',
    },
    {
      question: 'What is the difference between BMR and TDEE?',
      answer:
        'BMR (Basal Metabolic Rate) is the number of calories your body needs to sustain basic functions — breathing, circulation, organ function — while at complete rest. TDEE (Total Daily Energy Expenditure) takes your BMR and multiplies it by an activity factor to account for movement throughout the day. For example, someone with a BMR of 1,600 calories who exercises moderately might have a TDEE of around 2,480 calories. TDEE is the number you use when setting calorie targets for weight loss or gain.',
    },
    {
      question: 'Can I use BMR to lose weight?',
      answer:
        'Yes — your BMR is the starting point for any weight management plan. To lose weight, you need to consume fewer calories than your TDEE (your BMR adjusted for activity level). A safe and sustainable deficit is generally 300–500 calories below your TDEE per day, resulting in roughly 0.3–0.5 kg of fat loss per week. Eating below your BMR for extended periods is not recommended, as it can cause muscle loss and metabolic adaptation.',
    },
    {
      question: 'Which BMR formula does this calculator use?',
      answer:
        'This calculator uses the Mifflin-St Jeor equation, which is widely considered the most accurate formula for estimating BMR in the general population. It was developed in 1990 and validated across multiple studies. The Harris-Benedict formula (revised in 1984) is also commonly used and produces similar results. For most people the difference between the two is small — typically within 50–100 calories per day.',
    },
    {
      question: 'How can I increase my BMR naturally?',
      answer:
        'The most effective way to raise your BMR is to increase your lean muscle mass through regular resistance training, since muscle tissue burns roughly 3 times more calories at rest than fat tissue. Other strategies include eating sufficient protein (which has a higher thermic effect than carbohydrates or fat), staying adequately hydrated, prioritising 7–9 hours of quality sleep per night, and avoiding prolonged very-low-calorie diets that cause your metabolism to down-regulate.',
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
        <title>BMR Calculator - Calculate Your Basal Metabolic Rate Free</title>
        )}
         {isCalculatorPage && (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
       />
       )}
        {isCalculatorPage && (
        <meta
          name="description"
          content="Calculate your Basal Metabolic Rate (BMR) instantly with our free online BMR calculator. Uses the Mifflin-St Jeor equation. Supports metric and imperial units."
        />
        )}
         {isCalculatorPage && (
        <link rel="canonical" href="https://thefitcalculator.com/bmr-calculator" />
         )}
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Page Title ── */}
        <div className="text-center pb-2">
          {/* <span className="inline-block bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Free Online Tool</span> */}
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">BMR Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg mx-auto">Find out how many calories your body burns at rest. Enter your details below to calculate your Basal Metabolic Rate using the Mifflin-St Jeor equation.</p>
        </div>

        {/* ── Calculator Card ── */}
        <section id="bmr-calculator" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">BMR Calculator (Mifflin-St Jeor)</h2>
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
                  <path d="M7 16V4m0 0L3 8m4-4 4 4" /><path d="M17 8v12m0 0 4-4m-4 4-4-4" />
                </svg>
               Open Unit Converter <br />
              <span className="inline-block mt-1">→</span>

              </a>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition text-sm"
                  >
                    <option value={Gender.Male}>Male</option>
                    <option value={Gender.Female}>Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Age (years)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                    placeholder="e.g. 25"
                    required
                    min="1"
                  />
                </div>
              </div>

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
                  Calculate BMR
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
            {result !== null && (
             <div className="mt-6 rounded-2xl border border-brand-100 dark:border-brand-800 bg-white dark:bg-gray-900 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">


                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Your Result</p>
                <div className="flex items-end gap-3 mb-3">
                  <span className="text-6xl font-extrabold text-brand-700 dark:text-brand-400 leading-none">{Math.round(result)}</span>
                  <span className="text-xl font-bold mb-1 text-brand-600 dark:text-brand-400">calories / day</span>
                </div>

                {/* TDEE estimate breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 mb-4">
                  {[
                    { label: 'Sedentary', multiplier: 1.2 },
                    { label: 'Light Exercise', multiplier: 1.375 },
                    { label: 'Moderate', multiplier: 1.55 },
                    { label: 'Very Active', multiplier: 1.725 },
                  ].map((level) => (
                    <div key={level.label} className="bg-white dark:bg-gray-700 rounded-xl p-3 border border-brand-100 dark:border-brand-800 text-center">
                      <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">{level.label}</p>
                      <p className="text-base font-extrabold text-brand-700 dark:text-brand-400">{Math.round(result * level.multiplier)}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">kcal/day</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 italic">
                  TDEE estimates above show your total daily calorie needs at different activity levels.
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  This is the number of calories your body needs to maintain basic physiological functions — breathing, circulation, and cell production — while completely at rest.
                </p>

                <div className="mt-4 pt-4 border-t border-brand-100 dark:border-brand-800 flex flex-wrap justify-between items-center gap-2">
                  <button
                    onClick={() => {
                      const shareText = `My BMR is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/bmr-calculator`;
                      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                      if (isMobile && navigator.share) {
                        navigator.share({ title: 'My BMR Result', text: shareText }).catch(() => {});
                      } else {
                        setShowShareOptions(true);
                      }
                    }}
                    className="text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    ↗ Share Results
                  </button>
                  <div className="flex gap-3 text-[10px] text-gray-400 dark:text-gray-500 italic">
                    <span>*Mifflin-St Jeor formula</span>
                    <span>Medical Disclaimer: Consult a nutritionist.</span>
                  </div>
                </div>

                {showShareOptions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href={`https://wa.me/?text=${encodeURIComponent(`My BMR is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/bmr-calculator`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold">WhatsApp</a>
                    <a href={`https://t.me/share/url?text=${encodeURIComponent(`My BMR is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/bmr-calculator`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-semibold">Telegram</a>
                    <a href={`mailto:?subject=My BMR Result&body=${encodeURIComponent(`My BMR is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/bmr-calculator`)}`} className="px-3 py-2 bg-gray-700 text-white rounded-lg text-xs font-semibold">Email</a>
                    <button onClick={() => { navigator.clipboard.writeText(`My BMR is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/bmr-calculator`); alert('Copied to clipboard!'); }} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-xs font-semibold">Copy</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Content Section ── */}
        <section className="space-y-6">

          {/* What is BMR */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              What is BMR?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Basal Metabolic Rate (BMR) is the number of calories your body needs to sustain its essential biological functions while at complete rest — things like breathing, blood circulation, maintaining body temperature, and cell repair. Think of it as the energy cost of simply being alive. Even if you spent the entire day lying still without moving, your body would still burn this many calories.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Why is BMR Important?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Your BMR is the foundation of your entire daily calorie budget. Every weight management strategy — whether you are trying to lose fat, build muscle, or simply maintain your current weight — starts with knowing your BMR. Without it, calorie targets are little more than guesswork. Knowing your BMR also helps you understand why your energy needs change as you age, gain or lose muscle, or change your activity level.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Factors That Influence Your BMR
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
              Several biological and lifestyle factors determine how high or low your BMR is:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: 'Muscle Mass', desc: 'Muscle burns roughly 3× more calories at rest than fat. More muscle = higher BMR.', color: 'border-brand-300 dark:border-brand-700' },
                { label: 'Age', desc: 'BMR declines naturally with age as muscle mass decreases — typically 1–2% per decade after 25.', color: 'border-blue-300 dark:border-blue-700' },
                { label: 'Gender', desc: 'Men generally have a higher BMR than women at the same measurements due to greater lean mass.', color: 'border-green-300 dark:border-green-700' },
                { label: 'Genetics', desc: 'Some people are born with naturally faster or slower metabolisms due to inherited traits.', color: 'border-yellow-300 dark:border-yellow-700' },
                { label: 'Body Size', desc: 'Taller and heavier individuals generally have a higher BMR because they have more tissue to maintain.', color: 'border-purple-300 dark:border-purple-700' },
                { label: 'Hormones', desc: 'Thyroid hormones, cortisol, and insulin all significantly impact metabolic rate.', color: 'border-red-300 dark:border-red-700' },
              ].map((item) => (
                <div key={item.label} className={`p-3 rounded-xl border-l-4 bg-gray-50 dark:bg-gray-700/40 ${item.color}`}>
                  <p className="text-sm font-bold text-gray-800 dark:text-white mb-0.5">{item.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How it's calculated */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How is BMR Calculated?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              This calculator uses the <strong className="text-gray-800 dark:text-gray-100">Mifflin-St Jeor equation</strong>, developed in 1990 and widely regarded as the most accurate BMR formula for the general adult population. It takes into account your weight, height, age, and sex.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">For Men</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm leading-relaxed">BMR = (10 × kg) + (6.25 × cm) − (5 × age) + 5</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">For Women</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm leading-relaxed">BMR = (10 × kg) + (6.25 × cm) − (5 × age) − 161</p>
              </div>
            </div>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-400 rounded-full inline-block"></span>
              Worked Example
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-200 dark:border-gray-600 text-sm">
              <p className="font-bold text-gray-800 dark:text-gray-100 mb-2">Male, 70 kg, 175 cm, 25 years old:</p>
              <p className="text-gray-600 dark:text-gray-300 leading-loose">
                BMR = (10 × 70) + (6.25 × 175) − (5 × 25) + 5<br />
                BMR = 700 + 1,093.75 − 125 + 5<br />
                <strong className="text-brand-700 dark:text-brand-400">BMR ≈ 1,674 calories / day</strong>
              </p>
            </div>
          </div>

          {/* BMR vs TDEE */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              BMR vs TDEE — What's the Difference?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              BMR tells you how many calories your body burns at rest. TDEE (Total Daily Energy Expenditure) tells you how many you actually burn across the full day including activity. To get your TDEE, multiply your BMR by an activity factor:
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/60">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Activity Level</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { level: 'Sedentary', desc: 'Little or no exercise, desk job', mult: '× 1.2', dot: 'bg-gray-400' },
                    { level: 'Lightly Active', desc: '1–3 days of light exercise per week', mult: '× 1.375', dot: 'bg-blue-400' },
                    { level: 'Moderately Active', desc: '3–5 days of moderate exercise per week', mult: '× 1.55', dot: 'bg-yellow-400' },
                    { level: 'Very Active', desc: '6–7 days of hard exercise per week', mult: '× 1.725', dot: 'bg-orange-400' },
                    { level: 'Extra Active', desc: 'Very hard training or physical job', mult: '× 1.9', dot: 'bg-red-400' },
                  ].map((row) => (
                    <tr key={row.level} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.dot}`}></span>
                          {row.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.desc}</td>
                      <td className="px-4 py-3 font-bold text-brand-600 dark:text-brand-400">{row.mult}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Using BMR */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How to Use Your BMR
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Once you know your BMR and TDEE, you can set calorie targets aligned with your goals:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Lose Weight', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-800', hColor: 'text-blue-700 dark:text-blue-300', tips: ['Eat 300–500 calories below your TDEE', 'Never eat below your BMR long-term', 'Combine with cardio and strength training', 'Aim for 0.5–1 kg loss per week'] },
                { title: 'Maintain Weight', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-100 dark:border-green-800', hColor: 'text-green-700 dark:text-green-300', tips: ['Eat at or close to your TDEE', 'Monitor weight weekly and adjust', 'Stay consistent with activity levels', 'Focus on diet quality, not just quantity'] },
                { title: 'Build Muscle', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-100 dark:border-yellow-800', hColor: 'text-yellow-700 dark:text-yellow-300', tips: ['Eat 200–300 calories above your TDEE', 'Prioritise protein (1.6–2.2 g per kg)', 'Focus on progressive resistance training', 'Expect 0.25–0.5 kg gain per week'] },
              ].map((card) => (
                <div key={card.title} className={`p-4 rounded-xl border ${card.bg} ${card.border}`}>
                  <h3 className={`font-bold mb-3 text-sm ${card.hColor}`}>{card.title}</h3>
                  <ul className="space-y-1.5">
                    {card.tips.map((tip) => (
                      <li key={tip}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How to Increase Your BMR Naturally
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
              While genetics and age affect your baseline metabolic rate, there are proven strategies to raise it over time:
            </p>
            <ul className="space-y-2">
              {[
                'Build lean muscle through regular resistance training — muscle tissue burns more calories at rest than fat',
                'Eat adequate protein at every meal — protein has a higher thermic effect than carbs or fat, meaning your body burns more calories digesting it',
                'Stay hydrated — even mild dehydration can slow metabolism',
                'Get 7–9 hours of quality sleep per night — sleep deprivation lowers metabolic rate and disrupts appetite hormones',
                'Avoid prolonged very-low-calorie diets — they cause your body to down-regulate metabolism as a survival response',
              ].map((item) => (
                <li key={item}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Limitations of BMR Calculators
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
              BMR formulas are population-level estimates and have inherent limitations when applied to individuals:
            </p>
            <ul className="space-y-2 mb-5">
              {[
                'Do not account for individual body composition — two people with the same weight may have very different muscle-to-fat ratios',
                'May be less accurate for athletes, elderly individuals, or people with metabolic conditions like hypothyroidism',
                'Activity multipliers used to estimate TDEE are approximate and can vary significantly by individual',
                'Do not factor in non-exercise activity thermogenesis (NEAT) — calories burned through fidgeting, posture, and daily tasks',
                'Pregnancy, illness, and certain medications can significantly alter actual metabolic rate',
              ].map((item) => (
                <li key={item}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Conclusion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Understanding your Basal Metabolic Rate is one of the most valuable steps you can take toward managing your weight and improving your nutrition. Your BMR gives you a scientifically grounded starting point — from there, you can calculate your TDEE, set appropriate calorie targets, and build a smarter plan aligned with your health goals. Use our free BMR calculator above to get your personalised result, and consider consulting a registered dietitian for tailored guidance.
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