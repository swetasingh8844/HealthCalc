import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
      <Link to="/" className="group flex items-center gap-3 text-gray-500 hover:text-brand-600 transition-all">
        <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="font-bold text-l uppercase tracking-widest">Home</span>
      </Link>

      <div className="flex flex-col items-center">
        <p className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">{title}</p>
        <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.3em]">{subtitle}</span>
      </div>

      {/* <div className="w-[72px]" /> */}
    </div>
  </header>
);

// ── Accordion FAQ Item (same as BMI page) ─────────────────────────────────────
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

// ── Types ─────────────────────────────────────────────────────────────────────
type UnitSystem = 'metric' | 'imperial';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Climate = 'cool' | 'moderate' | 'hot';

interface WaterResult {
  liters: number;
  glasses: number;
  oz: number;
  breakdown: { label: string; liters: number }[];
}

// ── Calculation Logic ─────────────────────────────────────────────────────────
function calculateWaterIntake(
  weightKg: number,
  activityLevel: ActivityLevel,
  climate: Climate,
  isPregnant: boolean,
  isBreastfeeding: boolean
): WaterResult {
  // Base: 35 ml per kg body weight (WHO/NHS standard)
  let base = weightKg * 0.035;

  const activityAdd: Record<ActivityLevel, number> = {
    sedentary: 0,
    light: 0.35,
    moderate: 0.6,
    active: 0.9,
    very_active: 1.2,
  };

  const climateAdd: Record<Climate, number> = {
    cool: 0,
    moderate: 0.3,
    hot: 0.6,
  };

  const activityLitres = activityAdd[activityLevel];
  const climateLitres = climateAdd[climate];
  const pregnancyLitres = isPregnant ? 0.3 : 0;
  const breastfeedingLitres = isBreastfeeding ? 0.7 : 0;

  const total = base + activityLitres + climateLitres + pregnancyLitres + breastfeedingLitres;

  const breakdown = [
    { label: 'Base intake', liters: base },
    ...(activityLitres > 0 ? [{ label: 'Activity adjustment', liters: activityLitres }] : []),
    ...(climateLitres > 0 ? [{ label: 'Climate adjustment', liters: climateLitres }] : []),
    ...(pregnancyLitres > 0 ? [{ label: 'Pregnancy adjustment', liters: pregnancyLitres }] : []),
    ...(breastfeedingLitres > 0 ? [{ label: 'Breastfeeding adjustment', liters: breastfeedingLitres }] : []),
  ];

  return {
    liters: total,
    glasses: Math.ceil(total / 0.25), // 250 ml per glass
    oz: Math.round(total * 33.814),
    breakdown,
  };
}

// ── Water Drop Progress Icon ──────────────────────────────────────────────────
const WaterGauge: React.FC<{ liters: number }> = ({ liters }) => {
  // Visual gauge: 1L = 0%, 4L = 100%
  const pct = Math.min(100, Math.max(0, ((liters - 1) / 3) * 100));
  const color =
    pct < 33 ? '#60a5fa' : pct < 66 ? '#34d399' : '#3b82f6';

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="dropClip">
            <path d="M40 8 C40 8 14 36 14 52 C14 66.36 25.64 74 40 74 C54.36 74 66 66.36 66 52 C66 36 40 8 40 8Z" />
          </clipPath>
        </defs>
        {/* Drop outline */}
        <path
          d="M40 8 C40 8 14 36 14 52 C14 66.36 25.64 74 40 74 C54.36 74 66 66.36 66 52 C66 36 40 8 40 8Z"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2.5"
        />
        {/* Fill */}
        <rect
          x="14"
          y={74 - (66 * pct) / 100}
          width="52"
          height={(66 * pct) / 100}
          fill={color}
          clipPath="url(#dropClip)"
          style={{ transition: 'all 0.7s ease' }}
          opacity="0.85"
        />
        {/* Shine */}
        <ellipse cx="32" cy="42" rx="4" ry="7" fill="white" opacity="0.25" transform="rotate(-20 32 42)" />
      </svg>
      <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Daily Goal</span>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
export const WaterIntakeCalculator: React.FC = () => {
  const location = useLocation();
  const isCalculatorPage = location.pathname.startsWith('/water-intake-calculator');

  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [climate, setClimate] = useState<Climate>('moderate');
  const [isPregnant, setIsPregnant] = useState(false);
  const [isBreastfeeding, setIsBreastfeeding] = useState(false);
  const [result, setResult] = useState<WaterResult | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;

    let weightKg = parseFloat(weight);
    if (unit === 'imperial') weightKg = weightKg * 0.453592;

    const res = calculateWaterIntake(weightKg, activityLevel, climate, isPregnant, isBreastfeeding);
    setResult(res);

    // @ts-ignore
    window.gtag?.('event', 'calculate_water_intake', { liters: res.liters.toFixed(1) });
  };

  const handleReset = () => {
    setWeight('');
    setActivityLevel('moderate');
    setClimate('moderate');
    setIsPregnant(false);
    setIsBreastfeeding(false);
    setResult(null);
    setShowShareOptions(false);
  };

  const activityOptions: { value: ActivityLevel; label: string; desc: string }[] = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { value: 'light', label: 'Light', desc: '1–3 days/week' },
    { value: 'moderate', label: 'Moderate', desc: '3–5 days/week' },
    { value: 'active', label: 'Active', desc: '6–7 days/week' },
    { value: 'very_active', label: 'Very Active', desc: 'Twice daily / intense' },
  ];

  const climateOptions: { value: Climate; label: string; emoji: string }[] = [
    { value: 'cool', label: 'Cool / Cold', emoji: '❄️' },
    { value: 'moderate', label: 'Moderate', emoji: '🌤️' },
    { value: 'hot', label: 'Hot / Humid', emoji: '☀️' },
  ];

  const faqs = [
    {
      question: 'How much water should I drink per day?',
      answer:
        'General guidelines suggest around 2–3.5 litres per day for most adults, but the optimal amount varies significantly based on your body weight, activity level, climate, and health status. This calculator uses the widely accepted formula of 35 ml per kilogram of body weight as a base, then adjusts for exercise and environmental factors.',
    },
    {
      question: 'Does tea, coffee, and juice count toward my daily water intake?',
      answer:
        'Yes — all beverages contribute to hydration, including tea, coffee, milk, and juice. Even caffeinated drinks like coffee and tea count, despite the mild diuretic effect of caffeine. However, water remains the best choice as it contains no calories, sugar, or caffeine. Plain water, herbal teas, and water-rich foods like cucumber and watermelon are the most efficient sources of hydration.',
    },
    {
      question: 'Can I drink too much water?',
      answer:
        'Yes — drinking excessively large amounts of water in a short period can cause a rare but serious condition called hyponatraemia (water intoxication), where sodium levels in the blood become dangerously diluted. This is uncommon in everyday life but has occurred in extreme endurance events. For most people, thirst is a reliable guide — drink when thirsty and aim to produce pale yellow urine throughout the day.',
    },
    {
      question: 'Does exercise change how much water I need?',
      answer:
        'Absolutely. Physical activity increases fluid loss through sweat and breathing. For every hour of moderate-intensity exercise, you may lose between 0.5 and 1 litre of fluid depending on body size and temperature. This calculator adds an appropriate hydration buffer based on your selected activity level. On days with intense exercise in heat, your needs may be even higher than this estimate.',
    },
    {
      question: 'Why do I need more water in hot or humid weather?',
      answer:
        'In hot or humid climates, your body sweats more to regulate temperature, which significantly increases fluid loss. High humidity makes it harder for sweat to evaporate, so your body produces even more to cool down. For people living in or visiting tropical or desert climates, daily water needs can be 0.5–1 litre higher than in temperate conditions.',
    },
    // {
    //   question: 'Should pregnant or breastfeeding women drink more water?',
    //   answer:
    //     'Yes. During pregnancy, extra fluid is needed to form amniotic fluid, support increased blood volume, and aid foetal development — typically an additional 300 ml per day above normal intake. During breastfeeding, needs increase further by around 700 ml per day to account for fluid used in milk production. This calculator includes these adjustments when selected.',
    // },
    {
      question: 'What are the signs of dehydration?',
      answer:
        'Mild dehydration can cause thirst, dark yellow urine, dry mouth, fatigue, and difficulty concentrating. More significant dehydration may lead to headaches, dizziness, reduced urine output, and dry skin. A practical day-to-day guide is urine colour — aim for pale straw yellow. Dark amber or infrequent urination suggests you need to increase fluid intake.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <Helmet>
        {isCalculatorPage && (
          <title>Free Water Intake Calculator – Daily Water Needs by Weight & Activity</title>
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
            content="Calculate your daily water intake based on body weight, activity level, and climate. Free hydration calculator in litres, glasses, and oz for men and women."
          />
        )}
        {isCalculatorPage && (
          <link rel="canonical" href="https://thefitcalculator.com/water-intake-calculator" />
        )}
        {isCalculatorPage && (
        <meta property="og:title" content="Free Water Intake Calculator – Daily Water Needs by Weight & Activity" />
        )}
        {isCalculatorPage && (
         <meta property="og:description" content="Calculate your daily water intake based on body weight, activity level, and climate. Free hydration calculator in litres, glasses, and oz for men and women." />

        )}
      </Helmet>

       <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader title="Water Intake" subtitle="Calculator" />
 
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Page Title ── */}
        <div className="text-center pb-2">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Water Intake Calculator - Calculate Your Daily Water Intake
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg mx-auto">
            Enter your weight, activity level, and climate to calculate your personalised daily water intake goal in litres, glasses, and fluid ounces.
          </p>
        </div>

        {/* ── Calculator Card ── */}
        <section id="water-intake-calculator" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">Water Intake Calculator</h2>
            <p className="text-brand-100 text-xs mt-0.5">Supports Metric and Imperial units</p>
          </div>

          <div className="p-6">
            {/* Unit Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl">
                <button
                  onClick={() => setUnit('metric')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${unit === 'metric' ? 'bg-white dark:bg-gray-800 text-brand-700 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  Metric (kg)
                </button>
                <button
                  onClick={() => setUnit('imperial')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${unit === 'imperial' ? 'bg-white dark:bg-gray-800 text-brand-700 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  Imperial (lbs)
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
           
            <form onSubmit={handleCalculate} className="space-y-5">

              {/* Weight */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Body Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                  placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
                  required
                  min="1"
                  step="0.1"
                />
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Activity Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {activityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setActivityLevel(opt.value)}
                      className={`px-3 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                        activityLevel === opt.value
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                          : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400 hover:border-brand-300 dark:hover:border-brand-700'
                      }`}
                    >
                      <p className="font-bold text-xs">{opt.label}</p>
                      <p className="text-[10px] mt-0.5 opacity-75">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Climate */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Climate / Environment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {climateOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setClimate(opt.value)}
                      className={`px-3 py-3 rounded-xl border text-center transition-all duration-200 ${
                        climate === opt.value
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                          : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400 hover:border-brand-300 dark:hover:border-brand-700'
                      }`}
                    >
                      <span className="text-lg block mb-0.5">{opt.emoji}</span>
                      <span className="font-semibold text-xs">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Conditions */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Special Conditions (optional)
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'pregnant', label: 'Pregnant', state: isPregnant, setter: setIsPregnant },
                    { id: 'breastfeeding', label: 'Breastfeeding', state: isBreastfeeding, setter: setIsBreastfeeding },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                        item.state
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                          : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.state}
                        onChange={(e) => item.setter(e.target.checked)}
                        className="w-4 h-4 accent-brand-600"
                      />
                      <span className="text-sm font-semibold">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-200 dark:shadow-none text-sm"
                >
                  Calculate Water Intake
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

            {/* ── Result ── */}
            {result && (
              <div className="mt-6 rounded-2xl border border-brand-100 dark:border-brand-800 bg-white dark:bg-gray-900 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">

                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Your Daily Water Goal</p>

                <div className="flex items-center gap-6 mb-4 flex-wrap">
                  <WaterGauge liters={result.liters} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-6xl font-extrabold text-brand-700 dark:text-brand-400 leading-none">
                        {result.liters.toFixed(1)}
                      </span>
                      <span className="text-2xl font-bold text-gray-400 mb-1">L</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">per day</p>

                    {/* Secondary metrics */}
                    <div className="flex flex-wrap gap-3 mt-3">
                      <div className="bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-xl px-4 py-2 text-center">
                        <p className="text-xl font-extrabold text-brand-700 dark:text-brand-400">{result.glasses}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Glasses (250ml)</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2 text-center">
                        <p className="text-xl font-extrabold text-gray-700 dark:text-gray-300">{result.oz}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Fluid Ounces</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-4 pt-3 pb-2">Intake Breakdown</p>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {result.breakdown.map((item) => (
                      <div key={item.label} className="flex justify-between items-center px-4 py-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
                          +{(item.liters * 1000).toFixed(0)} ml
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center px-4 py-2 bg-brand-50/50 dark:bg-brand-900/20">
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-100">Total</span>
                      <span className="text-sm font-extrabold text-brand-700 dark:text-brand-400">
                        {result.liters.toFixed(2)} L ({(result.liters * 1000).toFixed(0)} ml)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-brand-100 dark:border-brand-800 flex flex-wrap justify-between items-center gap-2">
                  <button
                    onClick={() => {
                      const shareText = `My daily water intake goal is ${result.liters.toFixed(1)}L (${result.glasses} glasses). Calculate yours at https://thefitcalculator.com/water-intake-calculator`;
                      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                      if (isMobile && navigator.share) {
                        navigator.share({ title: 'My Water Intake Goal', text: shareText }).catch(() => {});
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
                    <a href={`https://wa.me/?text=${encodeURIComponent(`My daily water intake goal is ${result.liters.toFixed(1)}L (${result.glasses} glasses). Calculate yours at https://thefitcalculator.com/water-intake-calculator`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold">WhatsApp</a>
                    <a href={`https://t.me/share/url?text=${encodeURIComponent(`My daily water intake goal is ${result.liters.toFixed(1)}L (${result.glasses} glasses). Calculate yours at https://thefitcalculator.com/water-intake-calculator`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-semibold">Telegram</a>
                    <a href={`mailto:?subject=My Water Intake Goal&body=${encodeURIComponent(`My daily water intake goal is ${result.liters.toFixed(1)}L (${result.glasses} glasses). Calculate yours at https://thefitcalculator.com/water-intake-calculator`)}`} className="px-3 py-2 bg-gray-700 text-white rounded-lg text-xs font-semibold">Email</a>
                    <button onClick={() => { navigator.clipboard.writeText(`My daily water intake goal is ${result.liters.toFixed(1)}L (${result.glasses} glasses). Calculate yours at https://thefitcalculator.com/water-intake-calculator`); alert('Copied to clipboard!'); }} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-xs font-semibold">Copy</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Content Section ── */}
        <section className="space-y-6">

          {/* What is Water Intake / Why Calculate */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Why Does Daily Water Intake Matter?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Water makes up approximately 60% of the human body and is essential for virtually every biological function — from regulating body temperature and lubricating joints to transporting nutrients and flushing out waste. Even mild dehydration of 1–2% of body weight can impair cognitive performance, physical endurance, and mood.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How is Your Water Intake Calculated?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              This calculator uses a science-backed formula that starts with a base intake of 35 ml per kilogram of body weight — a standard recommended by nutritionists and health authorities — and then applies adjustments for physical activity and climate. Additional increments are added for pregnancy and breastfeeding based on NHS and WHO guidance.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Base Formula</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm">Daily Intake = Weight (kg) × 35 ml</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">Adjusted for activity, climate &amp; life stage.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">Imperial Conversion</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm">Weight in lbs is auto-converted to kg</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">Results are always shown in litres and oz.</p>
              </div>
            </div>
          </div>

          {/* Factors & Accuracy */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Factors That Affect Your Water Needs
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Your daily hydration needs are not fixed — they shift based on a range of personal and environmental factors. Understanding these helps you stay better hydrated in all conditions.
            </p>
            <ul className="space-y-2 mb-5">
              {[
                'Body weight — heavier individuals need more water to support greater body mass',
                'Physical activity — exercise increases fluid loss through sweat and respiration',
                'Climate and temperature — hot or humid environments dramatically raise sweat loss',
                'Diet — water-rich foods (fruits, vegetables, soups) contribute to total intake',
                'Health status — fever, diarrhoea, or vomiting increases fluid requirements',
                'Pregnancy and breastfeeding — both stages significantly increase daily water needs',
                'Altitude — high-altitude environments cause greater respiratory water loss',
              ].map((item) => (
                <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">{item}</li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Benefits of Using Our Water Intake Calculator
            </h2>
            <ul className="space-y-2">
              {[
                'Personalised results based on your weight, activity, and climate',
                'Supports both metric (kg) and imperial (lbs) units',
                'Shows results in litres, 250 ml glasses, and fluid ounces',
                'Includes adjustments for pregnancy and breastfeeding',
                'Free to use with no account or sign-up required',
              ].map((item) => (
                <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">{item}</li>
              ))}
            </ul>
          </div>

          {/* Hydration Tips by Activity */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Hydration Tips by Activity Level
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Practical, evidence-based hydration strategies for different lifestyles. Always consult a healthcare provider if you have specific medical needs.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Sedentary / Office Worker',
                  bg: 'bg-blue-50 dark:bg-blue-900/20',
                  border: 'border-blue-100 dark:border-blue-800',
                  hColor: 'text-blue-700 dark:text-blue-300',
                  tips: [
                    'Keep a 1-litre water bottle on your desk as a visual reminder',
                    'Drink a full glass of water first thing in the morning',
                    'Set hourly reminders to take a few sips throughout the workday',
                    'Opt for water or herbal tea instead of sugary drinks',
                  ],
                },
                {
                  title: 'Moderately Active',
                  bg: 'bg-green-50 dark:bg-green-900/20',
                  border: 'border-green-100 dark:border-green-800',
                  hColor: 'text-green-700 dark:text-green-300',
                  tips: [
                    'Drink 400–600 ml of water before a workout',
                    'Sip 150–250 ml every 15–20 minutes during exercise',
                    'Rehydrate with water and electrolytes after intense sessions',
                    'Check urine colour — pale yellow means you are well hydrated',
                  ],
                },
                {
                  title: 'Hot or Humid Climate',
                  bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                  border: 'border-yellow-100 dark:border-yellow-800',
                  hColor: 'text-yellow-700 dark:text-yellow-300',
                  tips: [
                    'Increase intake by 500–750 ml above your normal goal on hot days',
                    'Carry water whenever outdoors — dehydration can set in fast',
                    'Consider electrolyte drinks if sweating heavily for over an hour',
                    'Eat water-rich foods: cucumber, watermelon, oranges, and tomatoes',
                  ],
                },
                {
                  title: 'Pregnant / Breastfeeding',
                  bg: 'bg-pink-50 dark:bg-pink-900/20',
                  border: 'border-pink-100 dark:border-pink-800',
                  hColor: 'text-pink-700 dark:text-pink-300',
                  tips: [
                    'Aim for an extra 300 ml/day during pregnancy above your baseline',
                    'During breastfeeding, add an additional ~700 ml per day',
                    'Drink a glass of water each time you nurse or breastfeed',
                    'Speak with your midwife or OB-GYN for personalised guidance',
                  ],
                },
              ].map((card) => (
                <div key={card.title} className={`p-4 rounded-xl border ${card.bg} ${card.border}`}>
                  <h3 className={`font-bold mb-3 text-sm ${card.hColor}`}>{card.title}</h3>
                  <ul className="space-y-1.5">
                    {card.tips.map((tip) => (
                      <li key={tip} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">{tip}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Hydration Signs Table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Urine Colour Hydration Guide
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Urine colour is one of the most reliable everyday indicators of hydration status. Use this guide to check how well-hydrated you are throughout the day.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/60">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Colour</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { colour: 'Colourless / Very pale', status: 'Over-hydrated', action: 'Reduce intake slightly', color: 'text-blue-400', dot: 'bg-blue-200' },
                    { colour: 'Pale straw / Light yellow', status: 'Well hydrated ✓', action: 'Keep it up', color: 'text-green-600 dark:text-green-400', dot: 'bg-yellow-200' },
                    { colour: 'Yellow', status: 'Adequately hydrated', action: 'Drink a glass of water soon', color: 'text-yellow-600 dark:text-yellow-400', dot: 'bg-yellow-400' },
                    { colour: 'Dark yellow', status: 'Mildly dehydrated', action: 'Drink water now', color: 'text-orange-600 dark:text-orange-400', dot: 'bg-yellow-600' },
                    { colour: 'Amber / Orange', status: 'Dehydrated', action: 'Drink water immediately', color: 'text-red-500 dark:text-red-400', dot: 'bg-orange-500' },
                    { colour: 'Brown / Dark brown', status: 'Severely dehydrated', action: 'Seek medical attention', color: 'text-red-700 dark:text-red-500', dot: 'bg-red-700' },
                  ].map((row) => (
                    <tr key={row.colour} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                        <span className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full flex-shrink-0 ${row.dot}`}></span>
                          {row.colour}
                        </span>
                      </td>
                      <td className={`px-4 py-3 font-semibold ${row.color}`}>{row.status}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Limitations */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Limitations of Water Intake Calculators
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
              This calculator provides a reliable personalised estimate, but it has inherent limitations. Real-world hydration needs are highly variable and can change day to day.
            </p>
            <ul className="space-y-2 mb-5">
              {[
                'Does not account for water obtained from solid food (typically 20–30% of total intake)',
                'Cannot factor in individual kidney function or specific medical conditions',
                'Does not adjust for medications that affect fluid retention or excretion',
                'Sweat rate varies significantly between individuals, even at the same activity level',
                'Does not account for rapid changes in health status such as illness, fever, or surgery',
                'Not intended for use in children, infants, or those with chronic kidney disease',
              ].map((item) => (
                <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">{item}</li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Conclusion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Staying properly hydrated is one of the simplest and most impactful things you can do for your health. Use this free water intake calculator to set a personalised daily goal, then track your progress with a reusable water bottle. When in doubt, let thirst and urine colour be your guides — and always consult a healthcare professional for advice tailored to your specific health needs.
            </p>
          </div>

          {/* ── FAQ Section ── */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

        </section>
      </div>
      </div>
    </>
  );
};