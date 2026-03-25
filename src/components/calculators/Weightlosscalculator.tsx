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

// ── Accordion FAQ Item (same as BMI / Water pages) ────────────────────────────
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
type Gender = 'male' | 'female';
type WeightLossRate = 'slow' | 'moderate' | 'fast';

interface WeightLossResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  dailyDeficit: number;
  weightToLose: number;
  weeksToGoal: number;
  monthsToGoal: number;
  targetDate: string;
  currentBMI: number;
  targetBMI: number;
  calorieCutPerDay: number;
}

// ── Calculation Logic ─────────────────────────────────────────────────────────
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const DEFICIT_MAP: Record<WeightLossRate, number> = {
  slow: 250,       // ~0.25 kg/week
  moderate: 500,   // ~0.5 kg/week
  fast: 750,       // ~0.75 kg/week
};

function calculateWeightLoss(
  currentWeightKg: number,
  targetWeightKg: number,
  heightCm: number,
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel,
  weightLossRate: WeightLossRate
): WeightLossResult {
  // Mifflin-St Jeor BMR
  const bmr =
    gender === 'male'
      ? 10 * currentWeightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * currentWeightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];
  const dailyDeficit = DEFICIT_MAP[weightLossRate];
  const targetCalories = Math.max(1200, tdee - dailyDeficit);
  const actualDeficit = tdee - targetCalories;

  const weightToLose = currentWeightKg - targetWeightKg;
  // 7700 kcal ≈ 1 kg fat
  const weeksToGoal = weightToLose > 0 ? Math.ceil((weightToLose * 7700) / (actualDeficit * 7)) : 0;
  const monthsToGoal = parseFloat((weeksToGoal / 4.33).toFixed(1));

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + weeksToGoal * 7);
  const formattedDate = targetDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const heightM = heightCm / 100;
  const currentBMI = currentWeightKg / (heightM * heightM);
  const targetBMI = targetWeightKg / (heightM * heightM);

  return {
    bmr,
    tdee,
    targetCalories,
    dailyDeficit: actualDeficit,
    weightToLose,
    weeksToGoal,
    monthsToGoal,
    targetDate: formattedDate,
    currentBMI,
    targetBMI,
    calorieCutPerDay: actualDeficit,
  };
}

// ── Progress Arc SVG ─────────────────────────────────────────────────────────
const ProgressRing: React.FC<{ current: number; target: number; unit: string }> = ({ current, target, unit }) => {
  const pct = Math.min(100, Math.max(0, (target / current) * 100));
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="#e5e7eb" strokeWidth="7" className="dark:stroke-gray-700" />
        <circle
          cx="44" cy="44" r={r} fill="none"
          stroke="#16a34a" strokeWidth="7"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text x="44" y="40" textAnchor="middle" className="fill-gray-800 dark:fill-gray-100" fontSize="13" fontWeight="700">{target}</text>
        <text x="44" y="54" textAnchor="middle" className="fill-gray-400" fontSize="9" fontWeight="600">{unit}</text>
      </svg>
      <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Target</span>
    </div>
  );
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard: React.FC<{ label: string; value: string; sub?: string; accent?: boolean }> = ({ label, value, sub, accent }) => (
  <div className={`rounded-xl border px-4 py-3 text-center ${accent ? 'bg-brand-50 dark:bg-brand-900/30 border-brand-100 dark:border-brand-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}>
    <p className={`text-xl font-extrabold ${accent ? 'text-brand-700 dark:text-brand-400' : 'text-gray-800 dark:text-gray-100'}`}>{value}</p>
    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{label}</p>
    {sub && <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>}
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
export const WeightLossCalculator: React.FC = () => {
  const location = useLocation();
  const isCalculatorPage = location.pathname.startsWith('/weight-loss-calculator');

  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [weightLossRate, setWeightLossRate] = useState<WeightLossRate>('moderate');
  const [result, setResult] = useState<WeightLossResult | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [error, setError] = useState('');

  const toKg = (v: number) => unit === 'imperial' ? v * 0.453592 : v;
  const toCm = (v: number) => unit === 'imperial' ? v * 2.54 : v;
  const fromKg = (v: number) => unit === 'imperial' ? v / 0.453592 : v;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cw = toKg(parseFloat(currentWeight));
    const tw = toKg(parseFloat(targetWeight));
    const h = toCm(parseFloat(height));
    const a = parseInt(age);

    if (tw >= cw) {
      setError('Target weight must be less than your current weight.');
      return;
    }
    if (a < 15 || a > 100) {
      setError('Please enter a valid age between 15 and 100.');
      return;
    }

    const res = calculateWeightLoss(cw, tw, h, a, gender, activityLevel, weightLossRate);
    setResult(res);

    // @ts-ignore
    window.gtag?.('event', 'calculate_weight_loss', { weeks: res.weeksToGoal });
  };

  const handleReset = () => {
    setAge(''); setCurrentWeight(''); setTargetWeight(''); setHeight('');
    setGender('male'); setActivityLevel('moderate'); setWeightLossRate('moderate');
    setResult(null); setError(''); setShowShareOptions(false);
  };

  const activityOptions: { value: ActivityLevel; label: string; desc: string }[] = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { value: 'light', label: 'Light', desc: '1–3 days/week' },
    { value: 'moderate', label: 'Moderate', desc: '3–5 days/week' },
    { value: 'active', label: 'Active', desc: '6–7 days/week' },
    { value: 'very_active', label: 'Very Active', desc: 'Twice daily / intense' },
  ];

  const rateOptions: { value: WeightLossRate; label: string; desc: string; color: string }[] = [
    { value: 'slow', label: 'Slow & Steady', desc: '~0.25 kg/week', color: 'text-blue-600 dark:text-blue-400' },
    { value: 'moderate', label: 'Recommended', desc: '~0.5 kg/week', color: 'text-green-600 dark:text-green-400' },
    { value: 'fast', label: 'Aggressive', desc: '~0.75 kg/week', color: 'text-orange-600 dark:text-orange-400' },
  ];

  const faqs = [
    {
      question: 'How is my calorie target calculated?',
      answer:
        'This calculator uses the Mifflin-St Jeor equation — the most validated formula for estimating Basal Metabolic Rate (BMR) in clinical settings. BMR is then multiplied by an activity factor to give your Total Daily Energy Expenditure (TDEE). Your chosen calorie deficit is subtracted from TDEE to produce your daily calorie target. A minimum floor of 1,200 calories/day is applied for safety.',
    },
    {
      question: 'How much weight can I safely lose per week?',
      answer:
        'Most health authorities, including the NHS and CDC, recommend losing 0.5–1 kg (1–2 lbs) per week as a safe and sustainable rate. Losing faster than this often results in muscle loss, nutrient deficiencies, and a higher likelihood of regaining weight. Our "Recommended" rate of ~0.5 kg/week sits in the middle of this safe range.',
    },
    {
      question: 'What is TDEE and why does it matter?',
      answer:
        'TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day accounting for all activity. It is calculated by multiplying your BMR by an activity multiplier. Your TDEE is the calorie level at which your weight stays stable. Eating below your TDEE creates a deficit that drives fat loss.',
    },
    {
      question: 'Why is 1,200 calories the minimum shown?',
      answer:
        'Consuming fewer than 1,200 calories per day (for women) or 1,500 calories per day (for men) is generally considered unsafe without medical supervision. Very low calorie diets can cause muscle loss, nutritional deficiencies, gallstones, and a significant slowdown in metabolism. This calculator applies a 1,200 kcal/day floor to keep estimates safe.',
    },
    {
      question: 'Does the calculator account for weight loss slowing down over time?',
      answer:
        'No — the timeline is based on a constant rate, which is a simplification. In reality, as you lose weight your BMR decreases, meaning you burn fewer calories at rest and the deficit narrows over time. Weight loss often slows in the later stages. The estimate is best used as a motivational target, not a guaranteed deadline.',
    },
    {
      question: 'Should I eat back calories burned through exercise?',
      answer:
        'This depends on your approach. This calculator already factors in your activity level when estimating TDEE, so your exercise is partially built into the calorie target. If you undertake additional intense exercise beyond your chosen activity level, eating back a portion (50–75%) of those extra calories can prevent excessive fatigue and preserve muscle mass.',
    },
    {
      question: 'Is weight loss just about cutting calories?',
      answer:
        'Calories are the primary driver of weight change, but quality matters too. A diet built on whole foods, adequate protein (1.6–2.2g per kg body weight), fibre, and healthy fats supports muscle retention, satiety, and metabolic health during a deficit. Sleep, stress management, and resistance training are also critical to sustainable, healthy weight loss.',
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

  const weightLabel = unit === 'metric' ? 'kg' : 'lbs';
  const heightLabel = unit === 'metric' ? 'cm' : 'inches';

  return (
    <>
      <Helmet>
        {isCalculatorPage && (
          <title>Free Weight Loss Calculator – Calorie Deficit, TDEE & Timeline Estimator</title>
        )}
        {isCalculatorPage && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
        {isCalculatorPage && (
          <meta name="description" content="Calculate your daily calorie target, calorie deficit, and estimated weight loss timeline based on your weight, height, age, and activity level. Free weight loss calculator for men and women." />
        )}
        {isCalculatorPage && (
          <link rel="canonical" href="https://thefitcalculator.com/weight-loss-calculator" />
        )}
        {isCalculatorPage && (
        <meta property="og:title" content="Free Weight Loss Calculator – Calorie Deficit, TDEE & Timeline Estimator" />
        )}
        {isCalculatorPage && (
         <meta property="og:description" content="Calculate your daily calorie target, calorie deficit, and estimated weight loss timeline based on your weight, height, age, and activity level. Free weight loss calculator for men and women." />

        )}
      </Helmet>

       <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader title="Weight Loss" subtitle="Calculator" />
 
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* ── Page Title ── */}
        <div className="text-center pb-2">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Weight Loss Calculator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg mx-auto">
            Enter your details to calculate your daily calorie target, estimated calorie deficit, and how long it will take to reach your goal weight. Supports metric and imperial units.
          </p>
        </div>

        {/* ── Calculator Card ── */}
        <section id="weight-loss-calculator" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">Calculate Your Weight Loss Plan</h2>
            <p className="text-brand-100 text-xs mt-0.5">Based on Mifflin-St Jeor BMR &amp; TDEE formula</p>
          </div>

          <div className="p-6">

            {/* Unit Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl">
                {(['metric', 'imperial'] as UnitSystem[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => { setUnit(u); setResult(null); }}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${unit === u ? 'bg-white dark:bg-gray-800 text-brand-700 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                  >
                    {u === 'metric' ? 'Metric (kg / cm)' : 'Imperial (lbs / in)'}
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

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gender</label>
                <div className="flex gap-3">
                  {(['male', 'female'] as Gender[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 capitalize ${gender === g ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400 hover:border-brand-300'}`}
                    >
                      {g === 'male' ? '♂ Male' : '♀ Female'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age + Height */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Age (years)</label>
                  <input
                    type="number" value={age} onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                    placeholder="e.g. 30" required min="15" max="100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Height ({heightLabel})</label>
                  <input
                    type="number" value={height} onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                    placeholder={unit === 'metric' ? 'e.g. 170' : 'e.g. 67'} required min="1" step="0.1"
                  />
                </div>
              </div>

              {/* Current + Target Weight */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Weight ({weightLabel})</label>
                  <input
                    type="number" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                    placeholder={unit === 'metric' ? 'e.g. 85' : 'e.g. 187'} required min="1" step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Target Weight ({weightLabel})</label>
                  <input
                    type="number" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                    placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'} required min="1" step="0.1"
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {activityOptions.map((opt) => (
                    <button
                      key={opt.value} type="button" onClick={() => setActivityLevel(opt.value)}
                      className={`px-3 py-2.5 rounded-xl border text-left transition-all duration-200 ${activityLevel === opt.value ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400 hover:border-brand-300 dark:hover:border-brand-700'}`}
                    >
                      <p className="font-bold text-xs">{opt.label}</p>
                      <p className="text-[10px] mt-0.5 opacity-75">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Loss Rate */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weight Loss Rate</label>
                <div className="grid grid-cols-3 gap-2">
                  {rateOptions.map((opt) => (
                    <button
                      key={opt.value} type="button" onClick={() => setWeightLossRate(opt.value)}
                      className={`px-3 py-3 rounded-xl border text-center transition-all duration-200 ${weightLossRate === opt.value ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 hover:border-brand-300 dark:hover:border-brand-700'}`}
                    >
                      <p className={`font-bold text-xs ${weightLossRate === opt.value ? 'text-brand-700 dark:text-brand-300' : opt.color}`}>{opt.label}</p>
                      <p className="text-[10px] mt-0.5 text-gray-500 dark:text-gray-400">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-xl px-4 py-3 font-medium">
                  ⚠ {error}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-200 dark:shadow-none text-sm">
                  Calculate Weight Loss Plan
                </button>
                <button type="button" onClick={handleReset} className="px-5 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm">
                  Reset
                </button>
              </div>
            </form>

            {/* ── Result ── */}
            {result && (
              <div className="mt-6 rounded-2xl border border-brand-100 dark:border-brand-800 bg-white dark:bg-gray-900 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">

                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Your Weight Loss Plan</p>

                {/* Top: ring + primary stats */}
                <div className="flex items-center gap-6 flex-wrap mb-4">
                  <ProgressRing
                    current={parseFloat(currentWeight)}
                    target={parseFloat(targetWeight)}
                    unit={weightLabel}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-5xl font-extrabold text-brand-700 dark:text-brand-400 leading-none">
                        {Math.round(result.targetCalories)}
                      </span>
                      <span className="text-lg font-bold text-gray-400 mb-1">kcal/day</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Your daily calorie target</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-3 py-2 text-center">
                        <p className="text-base font-extrabold text-red-600 dark:text-red-400">−{Math.round(result.calorieCutPerDay)}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">kcal deficit/day</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl px-3 py-2 text-center">
                        <p className="text-base font-extrabold text-green-600 dark:text-green-400">
                          {result.monthsToGoal} mo
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">to goal</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-2 text-center">
                        <p className="text-base font-extrabold text-gray-700 dark:text-gray-300">{result.weeksToGoal}w</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">weeks</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  <StatCard label="BMR" value={`${Math.round(result.bmr)} kcal`} sub="at rest" />
                  <StatCard label="TDEE" value={`${Math.round(result.tdee)} kcal`} sub="maintenance" />
                  <StatCard label="To Lose" value={`${fromKg(result.weightToLose).toFixed(1)} ${weightLabel}`} accent />
                  <StatCard label="Goal Date" value={result.targetDate.split(' ')[1]} sub={`${result.targetDate.split(' ')[0]} ${result.targetDate.split(' ')[2]}`} accent />
                </div>

                {/* BMI change */}
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700 p-4 mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">BMI Change</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-orange-500">{result.currentBMI.toFixed(1)}</p>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Current BMI</p>
                    </div>
                    <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden min-w-16">
                      <div
                        className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-orange-400 to-green-500 transition-all duration-700"
                        style={{ width: `${Math.min(100, (result.targetBMI / result.currentBMI) * 100)}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">{result.targetBMI.toFixed(1)}</p>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Target BMI</p>
                    </div>
                  </div>
                </div>

                {/* Weekly plan hint */}
                <div className="bg-white-50 dark:bg-white-900/20 border border-brand-100 dark:border-yellow-800 rounded-xl px-4 py-3 mb-4 text-sm text-black-800 dark:text-black-300">
                  💡 <strong>Weekly calorie budget:</strong> {(Math.round(result.targetCalories) * 7).toLocaleString()} kcal &nbsp;·&nbsp;
                  Deficit: {(Math.round(result.calorieCutPerDay) * 7).toLocaleString()} kcal/week
                </div>

                <div className="pt-3 border-t border-brand-100 dark:border-brand-800 flex flex-wrap justify-between items-center gap-2">
                  <button
                    onClick={() => {
                      const shareText = `My weight loss goal: lose ${fromKg(result.weightToLose).toFixed(1)}${weightLabel} in ${result.monthsToGoal} months on ${Math.round(result.targetCalories)} kcal/day. Calculate yours at https://thefitcalculator.com/weight-loss-calculator`;
                      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                      if (isMobile && navigator.share) {
                        navigator.share({ title: 'My Weight Loss Plan', text: shareText }).catch(() => {});
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
                    {[
                      { label: 'WhatsApp', bg: 'bg-green-500', href: `https://wa.me/?text=${encodeURIComponent(`My weight loss goal: lose ${fromKg(result.weightToLose).toFixed(1)}${weightLabel} in ${result.monthsToGoal} months. Calculate yours at https://thefitcalculator.com/weight-loss-calculator`)}` },
                      { label: 'Telegram', bg: 'bg-blue-500', href: `https://t.me/share/url?text=${encodeURIComponent(`My weight loss goal: lose ${fromKg(result.weightToLose).toFixed(1)}${weightLabel} in ${result.monthsToGoal} months. Calculate yours at https://thefitcalculator.com/weight-loss-calculator`)}` },
                      { label: 'Email', bg: 'bg-gray-700', href: `mailto:?subject=My Weight Loss Plan&body=${encodeURIComponent(`My weight loss goal: lose ${fromKg(result.weightToLose).toFixed(1)}${weightLabel} in ${result.monthsToGoal} months on ${Math.round(result.targetCalories)} kcal/day. https://thefitcalculator.com/weight-loss-calculator`)}` },
                    ].map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`px-3 py-2 ${s.bg} text-white rounded-lg text-xs font-semibold`}>{s.label}</a>
                    ))}
                    <button onClick={() => { navigator.clipboard.writeText(`My weight loss plan: ${Math.round(result.targetCalories)} kcal/day. https://thefitcalculator.com/weight-loss-calculator`); alert('Copied!'); }} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-xs font-semibold">Copy</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Content Section ── */}
        <section className="space-y-6">

          {/* What is / How it works */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How Does This Weight Loss Calculator Work?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              This calculator uses the <strong className="text-gray-800 dark:text-gray-100">Mifflin-St Jeor equation</strong> — the most clinically validated formula for estimating Basal Metabolic Rate (BMR). BMR is multiplied by an activity factor to give your Total Daily Energy Expenditure (TDEE), which represents the calories needed to maintain your current weight. A safe calorie deficit is then subtracted to create your personalised weight loss target.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              The Formula Behind Your Result
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">BMR (Male)</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm">(10 × kg) + (6.25 × cm) − (5 × age) + 5</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">BMR (Female)</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm">(10 × kg) + (6.25 × cm) − (5 × age) − 161</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">TDEE</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm">BMR × Activity Multiplier (1.2 – 1.9)</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-1">Daily Target</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm">TDEE − Deficit (250–750 kcal/day)</p>
              </div>
            </div>
          </div>

          {/* Calorie deficit explained */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Understanding Calorie Deficit
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              A calorie deficit occurs when you consume fewer calories than your body burns. Since approximately 7,700 kcal equals 1 kg of body fat, a consistent daily deficit of 500 kcal leads to roughly 0.5 kg of fat loss per week. This calculator gives you three deficit levels to choose from based on your preference.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/60">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Daily Deficit</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Weekly Loss</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { rate: 'Slow & Steady', deficit: '~250 kcal', loss: '~0.25 kg/week', best: 'Maintaining muscle, beginners', color: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-400' },
                    { rate: 'Recommended', deficit: '~500 kcal', loss: '~0.5 kg/week', best: 'Most adults, sustainable long-term', color: 'text-green-600 dark:text-green-400', dot: 'bg-green-400' },
                    { rate: 'Aggressive', deficit: '~750 kcal', loss: '~0.75 kg/week', best: 'Short-term push, with supervision', color: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-400' },
                  ].map((row) => (
                    <tr key={row.rate} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className={`px-4 py-3 font-semibold ${row.color}`}>
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.dot}`}></span>
                          {row.rate}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{row.deficit}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{row.loss}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.best}</td>
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
              Evidence-Based Weight Loss Tips
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Practical strategies to help you hit your calorie target and sustain results long-term.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Nutrition Strategy',
                  bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-100 dark:border-green-800', hColor: 'text-green-700 dark:text-green-300',
                  tips: [
                    'Prioritise protein — aim for 1.6–2.2g per kg of body weight daily',
                    'Fill half your plate with non-starchy vegetables at each meal',
                    'Track calories with an app for at least 4–6 weeks to build awareness',
                    'Choose whole foods over processed — they are more filling per calorie',
                    'Reduce liquid calories: sugary drinks, alcohol, and high-calorie coffees',
                  ],
                },
                {
                  title: 'Exercise & Activity',
                  bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-800', hColor: 'text-blue-700 dark:text-blue-300',
                  tips: [
                    'Combine cardio with strength training to preserve muscle during a deficit',
                    'Aim for at least 150 minutes of moderate aerobic activity per week',
                    'Increase daily non-exercise movement (steps, walking, standing)',
                    'Resistance training 2–4x/week prevents metabolic slowdown',
                    'Even a 20-minute daily walk significantly increases total calorie burn',
                  ],
                },
                {
                  title: 'Mindset & Habits',
                  bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-100 dark:border-yellow-800', hColor: 'text-yellow-700 dark:text-yellow-300',
                  tips: [
                    'Set small weekly goals rather than focusing only on the end target',
                    'Weigh yourself at the same time each week — daily weighing is misleading',
                    'Plan meals in advance to avoid high-calorie impulsive food choices',
                    'Allow flexibility — one higher-calorie day won\'t derail your progress',
                  ],
                },
                {
                  title: 'Sleep & Recovery',
                  bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-100 dark:border-purple-800', hColor: 'text-purple-700 dark:text-purple-300',
                  tips: [
                    'Poor sleep increases hunger hormones (ghrelin) and reduces satiety (leptin)',
                    'Aim for 7–9 hours of quality sleep per night for optimal fat loss',
                    'High chronic stress elevates cortisol, which promotes fat storage',
                    'Manage stress with exercise, mindfulness, or time in nature',
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

          {/* Limitations + Conclusion */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Limitations of This Calculator
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
              This tool provides a scientifically grounded estimate, but individual results will vary. Use it as a starting point, not a precise prescription.
            </p>
            <ul className="space-y-2 mb-5">
              {[
                'BMR formulas are estimates — actual metabolic rate varies by genetics, body composition, and health status',
                'The timeline assumes a constant rate of loss, but metabolism slows as you lose weight',
                'Does not account for hormonal conditions such as hypothyroidism or PCOS that affect weight loss',
                'Muscle gain from resistance training can mask fat loss on the scale',
                'Not suitable for individuals under 15, those who are pregnant, or people with eating disorders',
                'A 1,200 kcal/day floor is applied — for very low BMRs this may still be insufficient without medical guidance',
              ].map((item) => (
                <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">{item}</li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Conclusion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              This free weight loss calculator gives you a clear, personalised starting point — your daily calorie target, your estimated timeline, and an overview of how your BMI will change. Pair your calorie goal with a high-protein diet, regular exercise, quality sleep, and consistent tracking for the best results. Always consult a doctor or registered dietitian before making significant changes to your diet, particularly if you have any underlying health conditions.
            </p>
          </div>

          {/* ── FAQ ── */}
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