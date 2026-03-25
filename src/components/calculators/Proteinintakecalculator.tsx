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

// ── Accordion FAQ Item ────────────────────────────────────────────────────────
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-brand-400 dark:border-brand-500 shadow-sm' : 'border-gray-200 dark:border-gray-700'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug">{question}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-300 ${open ? 'bg-brand-600 rotate-45' : 'bg-gray-300 dark:bg-gray-600'}`}>+</span>
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
type Goal = 'lose_fat' | 'maintain' | 'build_muscle' | 'athletic_performance' | 'elderly';

interface ProteinResult {
  minGrams: number;
  maxGrams: number;
  midGrams: number;
  perKg: { min: number; max: number };
  mealsBreakdown: { meals: number; perMeal: number }[];
  goal: Goal;
  weightKg: number;
}

// ── Multipliers ───────────────────────────────────────────────────────────────
const GOAL_MULTIPLIERS: Record<Goal, { min: number; max: number; label: string; color: string; desc: string }> = {
  lose_fat:             { min: 1.6, max: 2.2, label: 'Fat Loss',              color: 'text-orange-600 dark:text-orange-400',  desc: 'Higher protein protects muscle during a calorie deficit.' },
  maintain:             { min: 1.2, max: 1.6, label: 'Maintain Weight',        color: 'text-blue-600 dark:text-blue-400',      desc: 'Adequate protein to sustain existing muscle mass.' },
  build_muscle:         { min: 1.6, max: 2.2, label: 'Build Muscle',           color: 'text-green-600 dark:text-green-400',    desc: 'Maximises muscle protein synthesis during a training stimulus.' },
  athletic_performance: { min: 1.8, max: 2.5, label: 'Athletic Performance',   color: 'text-purple-600 dark:text-purple-400',  desc: 'Supports recovery, endurance, and high-output training.' },
  elderly:              { min: 1.2, max: 1.8, label: 'Healthy Ageing (55+)',   color: 'text-teal-600 dark:text-teal-400',      desc: 'Counters age-related muscle loss (sarcopenia).' },
};

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary:   'Sedentary',
  light:       'Light Activity',
  moderate:    'Moderate',
  active:      'Active',
  very_active: 'Very Active',
};

// ── Calculation ───────────────────────────────────────────────────────────────
function calculateProtein(weightKg: number, goal: Goal): ProteinResult {
  const { min, max } = GOAL_MULTIPLIERS[goal];
  const minGrams = Math.round(weightKg * min);
  const maxGrams = Math.round(weightKg * max);
  const midGrams = Math.round((minGrams + maxGrams) / 2);

  const mealsBreakdown = [3, 4, 5, 6].map((meals) => ({
    meals,
    perMeal: Math.round(midGrams / meals),
  }));

  return { minGrams, maxGrams, midGrams, perKg: { min, max }, mealsBreakdown, goal, weightKg };
}

// ── Protein Bar Visual ────────────────────────────────────────────────────────
const ProteinBar: React.FC<{ min: number; max: number; mid: number }> = ({ min, max, mid }) => {
  const refMax = Math.max(max * 1.25, 250);
  const minPct = (min / refMax) * 100;
  const maxPct = (max / refMax) * 100;
  const midPct = (mid / refMax) * 100;
  return (
    <div className="mt-4 mb-2">
      <div className="relative h-4 rounded-full bg-gray-100 dark:bg-gray-700 overflow-visible">
        {/* range fill */}
        <div
          className="absolute top-0 h-4 rounded-full bg-brand-200 dark:bg-brand-800 transition-all duration-700"
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
        />
        {/* mid marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-brand-600 rounded-full shadow-md border-2 border-white dark:border-gray-900 transition-all duration-700"
          style={{ left: `calc(${midPct}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 font-medium">
        <span>{min}g (min)</span>
        <span className="text-brand-600 dark:text-brand-400 font-bold">{mid}g (target)</span>
        <span>{max}g (max)</span>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
export const ProteinIntakeCalculator: React.FC = () => {
  const location = useLocation();
  const isCalculatorPage = location.pathname.startsWith('/protein-intake-calculator');

  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('build_muscle');
  const [result, setResult] = useState<ProteinResult | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const toKg = (v: number) => unit === 'imperial' ? v * 0.453592 : v;
  const wLabel = unit === 'metric' ? 'kg' : 'lbs';

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const weightKg = toKg(parseFloat(weight));
    const res = calculateProtein(weightKg, goal);
    setResult(res);
    // @ts-ignore
    window.gtag?.('event', 'calculate_protein_intake', { goal, grams: res.midGrams });
  };

  const handleReset = () => {
    setWeight(''); setActivityLevel('moderate'); setGoal('build_muscle');
    setResult(null); setShowShareOptions(false);
  };

  const goalOptions: { value: Goal; icon: string; label: string; desc: string }[] = [
    { value: 'lose_fat',             icon: '🔥', label: 'Lose Fat',             desc: 'Cut calories, keep muscle' },
    { value: 'maintain',             icon: '⚖️', label: 'Maintain Weight',      desc: 'Stay at current level' },
    { value: 'build_muscle',         icon: '💪', label: 'Build Muscle',         desc: 'Maximise hypertrophy' },
    { value: 'athletic_performance', icon: '🏅', label: 'Athletic Performance', desc: 'Endurance & power sports' },
    { value: 'elderly',              icon: '🧓', label: 'Healthy Ageing',        desc: 'Prevent muscle loss (55+)' },
  ];

  const activityOptions: { value: ActivityLevel; label: string; desc: string }[] = [
    { value: 'sedentary',   label: 'Sedentary',   desc: 'Little or no exercise' },
    { value: 'light',       label: 'Light',        desc: '1–3 days/week' },
    { value: 'moderate',    label: 'Moderate',     desc: '3–5 days/week' },
    { value: 'active',      label: 'Active',       desc: '6–7 days/week' },
    { value: 'very_active', label: 'Very Active',  desc: 'Twice daily / intense' },
  ];

  const foodSources = [
    { food: 'Chicken breast (100g)',  protein: 31, cal: 165,  tag: 'Lean meat' },
    { food: 'Eggs (1 large)',         protein: 6,  cal: 70,   tag: 'Whole food' },
    { food: 'Greek yogurt (200g)',    protein: 20, cal: 130,  tag: 'Dairy' },
    { food: 'Cottage cheese (200g)', protein: 24, cal: 170,  tag: 'Dairy' },
    { food: 'Tuna (100g, canned)',   protein: 26, cal: 110,  tag: 'Fish' },
    { food: 'Lentils (100g cooked)', protein: 9,  cal: 116,  tag: 'Plant-based' },
    { food: 'Tofu (100g)',           protein: 8,  cal: 76,   tag: 'Plant-based' },
    { food: 'Whey protein (1 scoop)',protein: 25, cal: 120,  tag: 'Supplement' },
    { food: 'Black beans (100g)',    protein: 8,  cal: 132,  tag: 'Plant-based' },
    { food: 'Paneer (100g)',         protein: 18, cal: 265,  tag: 'Dairy' },
    { food: 'Salmon (100g)',         protein: 25, cal: 208,  tag: 'Fish' },
    { food: 'Almonds (30g)',         protein: 6,  cal: 173,  tag: 'Nuts' },
  ];

  const tagColors: Record<string, string> = {
    'Lean meat':   'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    'Whole food':  'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    'Dairy':       'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'Fish':        'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
    'Plant-based': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    'Supplement':  'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    'Nuts':        'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  };

  const faqs = [
    {
      question: 'How much protein do I need per day?',
      answer: 'Protein needs vary widely based on your goals, body weight, and activity level. The WHO minimum to prevent deficiency is 0.8g/kg/day, but this is far below what is optimal for body composition. For most active adults, 1.6–2.2g per kg of body weight per day is the well-evidenced range for maximising muscle retention and growth. Athletes and those in aggressive fat loss phases may benefit from the upper end of this range.',
    },
    {
      question: 'Does more protein always mean more muscle?',
      answer: 'Not beyond a certain threshold. Research suggests that protein intakes above approximately 2.2g/kg/day provide no additional muscle-building benefit for most people. Beyond this point, excess protein is simply oxidised for energy or converted to glucose. The key is hitting your target consistently every day rather than eating excessive amounts on some days and too little on others.',
    },
    {
      question: 'How much protein can my body absorb in one meal?',
      answer: 'The idea that the body can only absorb 20–30g of protein per meal is a myth. Your body can digest and absorb virtually all the protein you consume — the question is rate and efficiency. Research by Dr. Trommelen and colleagues suggests that up to 100g of protein from a single meal can contribute to muscle protein synthesis over a 12-hour period. However, spreading 30–50g across 3–5 meals appears to optimise muscle protein synthesis throughout the day.',
    },
    {
      question: 'Is plant protein as effective as animal protein?',
      answer: 'Animal proteins (meat, fish, dairy, eggs) are generally considered complete proteins with all essential amino acids in optimal ratios and high leucine content — the amino acid most responsible for triggering muscle protein synthesis. Plant proteins are often incomplete or lower in leucine, but this can be overcome by eating a variety of plant sources and/or consuming slightly more total protein. Blending rice and pea protein is a particularly effective plant-based strategy.',
    },
    {
      question: 'When should I eat protein — does timing matter?',
      answer: 'Protein timing has a modest effect compared to total daily intake. That said, research supports consuming 20–40g of protein within 2 hours of resistance training to support recovery. A protein-rich meal before bed (e.g. cottage cheese or casein) also supports overnight muscle protein synthesis. The most important factor is hitting your daily total — distribute protein evenly across 3–5 meals rather than consuming most of it in one sitting.',
    },
    {
      question: 'Can high protein intake damage my kidneys?',
      answer: 'In healthy individuals with no pre-existing kidney disease, high protein intakes — even above 3g/kg/day — have not been shown to cause kidney damage in the scientific literature. The concern originated from studies in people with existing kidney disease, where protein restriction is medically warranted. If you have a history of kidney problems, consult your doctor before significantly increasing protein intake.',
    },
    {
      question: 'What are the best high-protein foods for vegetarians and vegans?',
      answer: 'Strong plant-based protein sources include tofu, tempeh, edamame, lentils, chickpeas, black beans, seitan, quinoa, and soy products. For lacto-vegetarians, paneer, Greek yogurt, cottage cheese, and whey protein are excellent options. Pea protein and rice protein supplements are popular and effective for vegans. Combining a variety of sources throughout the day ensures you get a full spectrum of essential amino acids.',
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
        {isCalculatorPage && <title>Free Protein Intake Calculator – Daily Protein Needs by Weight & Goal</title>}
        {isCalculatorPage && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
        {isCalculatorPage && <meta name="description" content="Calculate your daily protein intake based on body weight, activity level, and fitness goal. Free protein calculator for muscle gain, fat loss, athletes, and healthy ageing." />}
        {isCalculatorPage && <link rel="canonical" href="https://thefitcalculator.com/protein-intake-calculator" />}
        {isCalculatorPage && (
        <meta property="og:title" content="Free Protein Intake Calculator – Daily Protein Needs by Weight & Goal" />
        )}
        {isCalculatorPage && (
         <meta property="og:description" content="Calculate your daily protein intake based on body weight, activity level, and fitness goal. Free protein calculator for muscle gain, fat loss, athletes, and healthy ageing." />

        )}
      </Helmet>

       <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader title="Protein Intake" subtitle="Calculator" />
 
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Page Title ── */}
        <div className="text-center pb-2">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Protein Intake Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg mx-auto">
            Enter your body weight and fitness goal to calculate your personalised daily protein target in grams, with a per-meal breakdown and food source guide.
          </p>
        </div>

        {/* ── Calculator Card ── */}
        <section id="protein-intake-calculator" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

          <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">Calculate Your Daily Protein Intake</h2>
            <p className="text-brand-100 text-xs mt-0.5">Based on body weight × evidence-based multipliers by goal</p>
          </div>

          <div className="p-6">

            {/* Unit Toggle */}
             <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl">
                {(['metric', 'imperial'] as UnitSystem[]).map((u) => (
                  <button key={u} onClick={() => { setUnit(u); setResult(null); }}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${unit === u ? 'bg-white dark:bg-gray-800 text-brand-700 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                    {u === 'metric' ? 'Metric (kg)' : 'Imperial (lbs)'}
                  </button>
                ))}
                
              </div>
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
                  Body Weight ({wLabel})
                </label>
                <input
                  type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                  placeholder={unit === 'metric' ? 'e.g. 75' : 'e.g. 165'} required min="1" step="0.1"
                />
              </div>

              {/* Fitness Goal */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fitness Goal</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {goalOptions.map((opt) => (
                    <button key={opt.value} type="button" onClick={() => setGoal(opt.value)}
                      className={`px-3 py-3 rounded-xl border text-left transition-all duration-200 ${goal === opt.value ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400 hover:border-brand-300 dark:hover:border-brand-700'}`}>
                      <span className="text-lg block mb-0.5">{opt.icon}</span>
                      <p className="font-bold text-xs">{opt.label}</p>
                      <p className="text-[10px] mt-0.5 opacity-75">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {activityOptions.map((opt) => (
                    <button key={opt.value} type="button" onClick={() => setActivityLevel(opt.value)}
                      className={`px-3 py-2.5 rounded-xl border text-left transition-all duration-200 ${activityLevel === opt.value ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400 hover:border-brand-300 dark:hover:border-brand-700'}`}>
                      <p className="font-bold text-xs">{opt.label}</p>
                      <p className="text-[10px] mt-0.5 opacity-75">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-200 dark:shadow-none text-sm">
                  Calculate Protein Intake
                </button>
                <button type="button" onClick={handleReset} className="px-5 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm">
                  Reset
                </button>
              </div>
            </form>

            {/* ── Result ── */}
            {result && (
              <div className="mt-6 rounded-2xl border border-brand-100 dark:border-brand-800 bg-white dark:bg-gray-900 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">

                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Your Daily Protein Goal</p>

                {/* Primary result */}
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-6xl font-extrabold text-brand-700 dark:text-brand-400 leading-none">{result.midGrams}</span>
                  <span className="text-2xl font-bold text-gray-400 mb-1">g/day</span>
                  <span className={`text-sm font-bold mb-2 ${GOAL_MULTIPLIERS[result.goal].color}`}>{GOAL_MULTIPLIERS[result.goal].label}</span>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                  Range: <strong className="text-gray-700 dark:text-gray-300">{result.minGrams}g – {result.maxGrams}g/day</strong>
                  &nbsp;·&nbsp; {result.perKg.min}–{result.perKg.max}g per kg body weight
                </p>

                <ProteinBar min={result.minGrams} max={result.maxGrams} mid={result.midGrams} />

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-3 mb-4">
                  {GOAL_MULTIPLIERS[result.goal].desc}
                </p>

                {/* Per-meal breakdown */}
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Per-Meal Breakdown (based on {result.midGrams}g target)</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {result.mealsBreakdown.map((m) => (
                      <div key={m.meals} className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-3 text-center">
                        <p className="text-xl font-extrabold text-brand-700 dark:text-brand-400">{m.perMeal}g</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-0.5">per meal</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">{m.meals} meals/day</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly total */}
                <div className="bg-black-50 dark:bg-black-900/20 border border-yellow-100 dark:border-yellow-800 rounded-xl px-4 py-3 mb-4 text-sm text-brand-800 dark:text-brand-300">
                  🗓️ <strong>Weekly protein target:</strong> {(result.midGrams * 7).toLocaleString()}g &nbsp;·&nbsp;
                  <strong>Monthly:</strong> ~{(result.midGrams * 30).toLocaleString()}g
                </div>

                {/* Share */}
                <div className="pt-3 border-t border-brand-100 dark:border-brand-800 flex flex-wrap justify-between items-center gap-2">
                  <button
                    onClick={() => {
                      const shareText = `My daily protein target is ${result.midGrams}g (${result.minGrams}–${result.maxGrams}g). Calculate yours at https://thefitcalculator.com/protein-intake-calculator`;
                      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                      if (isMobile && navigator.share) {
                        navigator.share({ title: 'My Protein Intake Goal', text: shareText }).catch(() => {});
                      } else {
                        setShowShareOptions(true);
                      }
                    }}
                    className="text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline flex items-center gap-1"
                  >↗ Share Results</button>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 italic">*Medical Disclaimer: Consult a doctor.</span>
                </div>

                {showShareOptions && result && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      { label: 'WhatsApp', bg: 'bg-green-500', href: `https://wa.me/?text=${encodeURIComponent(`My daily protein target is ${result.midGrams}g. Calculate yours at https://thefitcalculator.com/protein-intake-calculator`)}` },
                      { label: 'Telegram', bg: 'bg-blue-500',  href: `https://t.me/share/url?text=${encodeURIComponent(`My daily protein target is ${result.midGrams}g. https://thefitcalculator.com/protein-intake-calculator`)}` },
                      { label: 'Email',    bg: 'bg-gray-700',  href: `mailto:?subject=My Protein Intake Goal&body=${encodeURIComponent(`My daily protein target is ${result.midGrams}g (${result.minGrams}–${result.maxGrams}g). https://thefitcalculator.com/protein-intake-calculator`)}` },
                    ].map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`px-3 py-2 ${s.bg} text-white rounded-lg text-xs font-semibold`}>{s.label}</a>)}
                    <button onClick={() => { navigator.clipboard.writeText(`My daily protein target is ${result.midGrams}g. https://thefitcalculator.com/protein-intake-calculator`); alert('Copied!'); }} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-xs font-semibold">Copy</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Content ── */}
        <section className="space-y-6">

          {/* What is / Formula */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Why Protein Intake Matters
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Protein is the most important macronutrient for body composition. It is essential for building and repairing muscle tissue, supporting immune function, producing enzymes and hormones, and maintaining a healthy metabolism. Unlike carbohydrates and fats, the body has no dedicated protein storage — this makes consistent daily intake critical.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How Your Protein Target is Calculated
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              This calculator uses evidence-based multipliers (grams of protein per kilogram of body weight) validated by leading sports nutrition research bodies including the International Society of Sports Nutrition (ISSN) and the American College of Sports Medicine (ACSM).
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Formula</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm">Protein (g) = Weight (kg) × Multiplier</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">Multiplier varies by goal (1.2 – 2.5 g/kg)</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">Imperial</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm">lbs are auto-converted to kg</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">Results always shown in grams per day</p>
              </div>
            </div>
          </div>

          {/* Goal multipliers table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Protein Targets by Goal
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Evidence-based protein multipliers from ISSN, ACSM, and published meta-analyses.</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/60">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Goal</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">g/kg/day</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {Object.entries(GOAL_MULTIPLIERS).map(([key, val]) => {
                    const icons: Record<string, string> = { lose_fat: '🔥', maintain: '⚖️', build_muscle: '💪', athletic_performance: '🏅', elderly: '🧓' };
                    return (
                      <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className={`px-4 py-3 font-semibold ${val.color}`}>
                          <span className="flex items-center gap-2">{icons[key]} {val.label}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{val.min} – {val.max}</td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{val.desc}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* High protein foods table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Top High-Protein Foods
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Common foods ranked by protein content per typical serving, including plant-based and Indian dietary staples.</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/60">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Food</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Protein</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Calories</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {foodSources.map((row) => (
                    <tr key={row.food} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{row.food}</td>
                      <td className="px-4 py-3 font-bold text-brand-700 dark:text-brand-400">{row.protein}g</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.cal} kcal</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[row.tag]}`}>{row.tag}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips by goal */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How to Hit Your Protein Target Daily
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Practical strategies to consistently reach your daily protein goal without obsessing over every gram.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Meal Planning',
                  bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-100 dark:border-green-800', hColor: 'text-green-700 dark:text-green-300',
                  tips: [
                    'Build every meal around a protein source first, then add carbs and fats',
                    'Batch cook chicken, eggs, lentils, or paneer at the start of each week',
                    'Keep high-protein snacks available: Greek yogurt, boiled eggs, roasted chickpeas',
                    'Use a food tracking app for 4–6 weeks to build intuitive portion awareness',
                  ],
                },
                {
                  title: 'Spreading Intake',
                  bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-800', hColor: 'text-blue-700 dark:text-blue-300',
                  tips: [
                    'Aim for 30–50g of protein per meal across 3–5 meals per day',
                    'Never skip breakfast — start the day with a high-protein meal to set the pace',
                    'Add a protein-rich snack before bed to support overnight muscle repair',
                    'If eating 2 large meals, ensure each contains at least 40–50g protein',
                  ],
                },
                {
                  title: 'Plant-Based Strategies',
                  bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-100 dark:border-teal-800', hColor: 'text-teal-700 dark:text-teal-300',
                  tips: [
                    'Combine rice + lentils or roti + dal for a complete amino acid profile',
                    'Include tofu, tempeh, or edamame as primary protein sources',
                    'Add pea or rice protein powder to smoothies, oats, or doughs',
                    'Eat slightly more total protein than the calculator suggests (10–15% more) to account for lower amino acid bioavailability',
                  ],
                },
                {
                  title: 'Supplement Wisely',
                  bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-100 dark:border-purple-800', hColor: 'text-purple-700 dark:text-purple-300',
                  tips: [
                    'Whey protein is fast-digesting — ideal post-workout or between meals',
                    'Casein is slow-digesting — best before sleep for overnight recovery',
                    'Supplements should fill gaps, not replace whole food protein sources',
                    'Look for products with minimal ingredients and third-party testing certificates',
                  ],
                },
              ].map((card) => (
                <div key={card.title} className={`p-4 rounded-xl border ${card.bg} ${card.border}`}>
                  <h3 className={`font-bold mb-3 text-sm ${card.hColor}`}>{card.title}</h3>
                  <ul className="space-y-1.5">{card.tips.map((t) => <li key={t} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">{t}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>

          {/* Limitations + Conclusion */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Limitations of This Calculator
            </h2>
            <ul className="space-y-2 mb-5">
              {[
                'Uses total body weight, not lean body mass — muscular individuals may get a slightly conservative estimate',
                'Does not distinguish between protein source quality — plant and animal proteins differ in bioavailability',
                'Activity level is a self-reported estimate and introduces variability in results',
                'Does not account for medical conditions (kidney disease, liver conditions) where protein restriction may be needed',
                'Protein needs during pregnancy and breastfeeding are higher and require individualised guidance',
                'The calculator provides a range — individual optimal intake varies based on genetics, gut health, and training specifics',
              ].map((item) => <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">{item}</li>)}
            </ul>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Conclusion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Protein is the cornerstone of any serious body composition or fitness goal. Use this free protein intake calculator to set a clear daily target, distribute it across meals, and build a diet around high-quality sources. Consistency over weeks and months — not perfection on any single day — is what drives lasting results. When in doubt, speak with a registered dietitian for a plan tailored to your specific health and performance needs.
            </p>
          </div>

          {/* FAQ */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />)}
            </div>
          </div>

        </section>
      </div>
      </div>
    </>
  );
};