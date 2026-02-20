import React from 'react';
import { BMICalculator } from '../components/calculators/BMICalculator';
import { BMRCalculator } from '../components/calculators/BMRCalculator';
import { CalorieCalculator } from '../components/calculators/CalorieCalculator';
import { Helmet } from 'react-helmet-async';
import { IdealWeightCalculator } from '../components/calculators/IdealWeightCalculator';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { useLocation } from 'react-router-dom';
import { UnitConverter } from '../components/UnitConverter';

export const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>TheFitCalculator | Free BMI, BMR, Calorie & Ideal Weight Calculator</title>
        <link rel="canonical" href="https://thefitcalculator.com/" />
        <meta name="description" content="Free online health calculators for BMI, BMR, daily calorie needs, and ideal weight. Science-backed formulas, instant results, metric and imperial units supported." />
        <meta property="og:title" content="TheFitCalculator | Free BMI, BMR, Calorie & Ideal Weight Calculator" />
        <meta property="og:description" content="Free online health calculators for BMI, BMR, daily calorie needs, and ideal weight. Science-backed formulas, instant results." />
        <meta property="og:url" content="https://thefitcalculator.com/" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* <AdPlaceholder slot="top-banner" className="h-[90px]" /> */}

      <div className="max-w-7xl mx-auto px-4 py-8">

           <h1 className="sr-only">
             Free BMI, BMR, Calorie and Ideal Weight Calculator
         </h1>
        {/* ── Hero ── */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl px-8 py-12 mb-10 relative overflow-hidden shadow-lg">
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
          <div className="relative max-w-2xl">
            <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Free Online Health Tools
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Calculate Your Health Metrics{' '}
              <span className="text-brand-200">Instantly</span>
            </h1>
            <p className="text-brand-100 text-base leading-relaxed max-w-xl">
              Free, science-backed calculators for BMI, BMR, daily calories, and ideal weight.
              No sign-up. No fees. Results in seconds.
            </p>
          </div>
        </div>

        {/* ── Main layout ── */}
        {/* On mobile: sidebar comes FIRST (order-1), calculators SECOND (order-2) */}
        {/* On desktop (lg): sidebar goes to the right column naturally */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Right Sidebar — order-1 on mobile, natural on desktop ── */}
          <aside className="space-y-6 order-1 lg:order-2 lg:col-start-3">

            {/* <AdPlaceholder slot="sidebar-top" className="min-h-[250px] hidden lg:flex" /> */}

            {/* Quick Health Tips */}
            <div className="bg-gradient-to-br from-brand-600 to-brand-700 p-6 rounded-2xl text-white shadow-lg">
              <h3 className="text-base font-bold mb-4">💡 Quick Health Tips</h3>
              <ul className="space-y-3">
                {[
                  'Check your BMI every few months to monitor changes in your weight and health.',
                  'Your BMR decreases as you age — recalculate it every year or after significant weight change.',
                  'A daily deficit of 500 calories below your TDEE leads to roughly 0.5 kg of fat loss per week.',
                  'Ideal weight is a range, not a fixed number — focus on body composition over the scale.',
                  'Stay hydrated — thirst is often mistaken for hunger, leading to extra calories.',
                ].map((tip) => (
                  <li key={tip} className="flex gap-2 text-xs text-brand-100 leading-relaxed">
                    <span className="flex-shrink-0 mt-0.5 text-brand-300">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculator quick links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <h3 className="text-base font-bold mb-4 text-gray-900 dark:text-white">Our Calculators</h3>
              <div className="space-y-2">
                {[
                  { label: 'BMI Calculator',    sub: 'Body Mass Index',      href: 'bmi-calculator',          dot: 'bg-brand-500'  },
                  { label: 'BMR Calculator',    sub: 'Basal Metabolic Rate', href: 'bmr-calculator',          dot: 'bg-blue-500'   },
                  { label: 'Calorie Calculator',sub: 'Daily TDEE & Goals',   href: 'calorie-calculator',      dot: 'bg-green-500'  },
                  { label: 'Ideal Weight',      sub: 'Devine Formula',       href: 'ideal-weight-calculator', dot: 'bg-yellow-500' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-700/50 transition-colors group"
                  >
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.dot}`} />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{item.label}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{item.sub}</p>
                    </div>
                    <span className="ml-auto text-gray-300 dark:text-gray-600 group-hover:text-red-500 transition-colors text-sm">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Formulas */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-white">Formulas We Use</h3>
              <div className="space-y-3">
                {[
                  { label: 'BMI',          formula: 'Weight (kg) ÷ Height (m)²', source: 'WHO Standard'     },
                  { label: 'BMR',          formula: 'Mifflin-St Jeor Equation',  source: 'Validated 1990'   },
                  { label: 'Ideal Weight', formula: 'Devine Formula',             source: 'Clinical standard' },
                  { label: 'TDEE',         formula: 'BMR × Activity Factor',      source: 'Harris-Benedict'  },
                ].map((item) => (
                  <div key={item.label} className="border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{item.label}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">{item.source}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{item.formula}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* <AdPlaceholder slot="sidebar-bottom" className="min-h-[250px]" /> */}

            {/* Unit Converter link */}
            <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-700 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-brand-700 dark:text-brand-300 mb-1">Need to Convert Units?</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                Convert cm ↔ ft &amp; inches, kg ↔ lbs instantly before entering your measurements.
              </p>
              <a
                href="/unit-converter"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 bg-white dark:bg-gray-800 border border-brand-200 dark:border-brand-700 px-4 py-2 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 16V4m0 0L3 8m4-4 4 4" /><path d="M17 8v12m0 0 4-4m-4 4-4-4" />
                </svg>
                Open Unit Converter →
              </a>
            </div>

          </aside>

          {/* ── Left: Calculators — order-2 on mobile, natural on desktop ── */}
          <div className="lg:col-span-2 space-y-10 order-2 lg:order-1 lg:col-start-1 lg:row-start-1">

            <BMICalculator />
            {/* <AdPlaceholder slot="mid-1" className="h-[100px]" /> */}

            <BMRCalculator />
            {/* <AdPlaceholder slot="mid-2" className="h-[100px]" /> */}

            <CalorieCalculator />
            {/* <AdPlaceholder slot="mid-3" className="h-[100px]" /> */}

            <IdealWeightCalculator />

            {/* How to use */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
                How to Use These Calculators
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Follow these steps in order for the most accurate results.</p>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Start with BMI',               color: 'bg-brand-600', desc: 'Enter your height and weight to calculate your Body Mass Index. This tells you whether your current weight is within a healthy range for your height.' },
                  { step: '2', title: 'Calculate Your BMR',           color: 'bg-blue-500',  desc: 'Add your age and gender to find your Basal Metabolic Rate — the calories your body burns at rest. This is the foundation for all calorie planning.' },
                  { step: '3', title: 'Find Your Daily Calories (TDEE)', color: 'bg-green-500', desc: 'Enter your BMR from step 2 into the Calorie Calculator, select your activity level and goal (lose / maintain / gain), and get your personalised daily calorie target.' },
                  { step: '4', title: 'Check Your Ideal Weight',      color: 'bg-yellow-500', desc: 'Use the Ideal Weight Calculator to see your recommended healthy weight range based on your height and gender using the Devine formula.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${item.color} text-white text-sm font-extrabold flex items-center justify-center shadow-sm`}>
                      {item.step}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800 dark:text-white mb-0.5">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why TheFitCalculator */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
                Why TheFitCalculator?
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: '🔬', title: 'Science-Backed',   desc: 'We use the same WHO, Mifflin-St Jeor, and Devine formulas used by doctors and registered dietitians worldwide.' },
                  { icon: '🔒', title: 'Private by Design', desc: 'All calculations happen inside your browser. Your height, weight, and age are never sent to any server.' },
                  { icon: '🆓', title: 'Always Free',       desc: 'No subscription, no sign-up, no hidden fees. Every calculator on this site is completely free to use.' },
                ].map((v) => (
                  <div key={v.title} className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-200 dark:border-gray-600 text-center">
                    <div className="text-2xl mb-2">{v.icon}</div>
                    <p className="font-bold text-sm text-gray-800 dark:text-white mb-1">{v.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* <AdPlaceholder slot="footer-banner" className="h-[90px]" /> */}
    </>
  );
};

export default Home;
