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
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
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
type Gender = 'male' | 'female';
type Method = 'navy' | 'bmi';

interface BodyFatResult {
  bodyFatPct: number;
  fatMassKg: number;
  leanMassKg: number;
  category: string;
  color: string;
  description: string;
  method: Method;
}

// ── Category Logic ────────────────────────────────────────────────────────────
function getBodyFatCategory(pct: number, gender: Gender): { category: string; color: string; description: string } {
  const ranges =
    gender === 'male'
      ? [
          { max: 6,  category: 'Essential Fat',  color: 'text-blue-600 dark:text-blue-400',   description: 'Below the minimum fat level required for basic physiological functions. Only seen in elite athletes briefly and is not sustainable or healthy long-term.' },
          { max: 14, category: 'Athletic',        color: 'text-green-600 dark:text-green-400', description: 'Typical of competitive athletes and highly active individuals. Excellent muscular definition with very low fat stores.' },
          { max: 18, category: 'Fitness',         color: 'text-teal-600 dark:text-teal-400',   description: 'A fit and healthy range associated with regular exercise. Good muscle tone with moderate definition.' },
          { max: 25, category: 'Average',         color: 'text-yellow-600 dark:text-yellow-400',description: 'Typical of the general adult population. Some fat present but no significant health risk at this level.' },
          { max: Infinity, category: 'Obese',     color: 'text-red-600 dark:text-red-400',     description: 'Excess body fat associated with increased risk of type 2 diabetes, heart disease, and other chronic conditions. Medical guidance is recommended.' },
        ]
      : [
          { max: 14, category: 'Essential Fat',  color: 'text-blue-600 dark:text-blue-400',   description: 'Below the minimum fat level required for hormonal function and reproductive health. Not sustainable for women and can cause serious health issues.' },
          { max: 21, category: 'Athletic',        color: 'text-green-600 dark:text-green-400', description: 'Typical of female competitive athletes. Excellent fitness with very visible muscle definition and low fat stores.' },
          { max: 25, category: 'Fitness',         color: 'text-teal-600 dark:text-teal-400',   description: 'A healthy and fit range for women who exercise regularly. Good tone and definition with healthy fat levels.' },
          { max: 32, category: 'Average',         color: 'text-yellow-600 dark:text-yellow-400',description: 'Typical of the general adult female population. Acceptable range but approaching the upper end of healthy.' },
          { max: Infinity, category: 'Obese',     color: 'text-red-600 dark:text-red-400',     description: 'Excess body fat posing significant health risks. A consultation with a healthcare professional and registered dietitian is strongly advised.' },
        ];

  const match = ranges.find((r) => pct <= r.max)!;
  return { category: match.category, color: match.color, description: match.description };
}

// ── Navy Method (US Navy) ─────────────────────────────────────────────────────
function calcNavy(
  gender: Gender,
  heightCm: number,
  neckCm: number,
  waistCm: number,
  hipCm: number | null,
  weightKg: number
): BodyFatResult {
  let pct: number;
  if (gender === 'male') {
    pct = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
  } else {
    pct = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + (hipCm ?? 0) - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
  }
  pct = Math.max(3, Math.min(60, pct));
  const fatMassKg = (pct / 100) * weightKg;
  const leanMassKg = weightKg - fatMassKg;
  const cat = getBodyFatCategory(pct, gender);
  return { bodyFatPct: pct, fatMassKg, leanMassKg, method: 'navy', ...cat };
}

// ── BMI-based Method ──────────────────────────────────────────────────────────
function calcBMI(
  gender: Gender,
  heightCm: number,
  weightKg: number,
  age: number
): BodyFatResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  // Deurenberg formula
  const pct = 1.2 * bmi + 0.23 * age - 10.8 * (gender === 'male' ? 1 : 0) - 5.4;
  const clamped = Math.max(3, Math.min(60, pct));
  const fatMassKg = (clamped / 100) * weightKg;
  const leanMassKg = weightKg - fatMassKg;
  const cat = getBodyFatCategory(clamped, gender);
  return { bodyFatPct: clamped, fatMassKg, leanMassKg, method: 'bmi', ...cat };
}

// ── Gauge Bar ─────────────────────────────────────────────────────────────────
const BodyFatGauge: React.FC<{ pct: number; gender: Gender }> = ({ pct, gender }) => {
  const max = gender === 'male' ? 35 : 45;
  const min = gender === 'male' ? 3 : 10;
  const gaugeVal = ((Math.min(max, Math.max(min, pct)) - min) / (max - min)) * 100;
  return (
    <div className="mt-4 mb-2">
      <div className="relative h-3 rounded-full overflow-visible" style={{ background: 'linear-gradient(to right, #60a5fa 0%, #34d399 20%, #86efac 38%, #fbbf24 60%, #f87171 80%, #ef4444 100%)' }}>
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-gray-700 dark:border-gray-200 rounded-full shadow-md transition-all duration-700"
          style={{ left: `calc(${gaugeVal}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 font-medium">
        {gender === 'male'
          ? <><span>Essential</span><span>Athletic</span><span>Fitness</span><span>Average</span><span>Obese</span></>
          : <><span>Essential</span><span>Athletic</span><span>Fitness</span><span>Average</span><span>Obese</span></>}
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
export const BodyFatCalculator: React.FC = () => {
  const location = useLocation();
  const isCalculatorPage = location.pathname.startsWith('/body-fat-calculator');

  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [method, setMethod] = useState<Method>('navy');

  // Shared
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');

  // Navy-specific
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');

  const [result, setResult] = useState<BodyFatResult | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [error, setError] = useState('');

  const toCm = (v: number) => unit === 'imperial' ? v * 2.54 : v;
  const toKg = (v: number) => unit === 'imperial' ? v * 0.453592 : v;

  const wLabel = unit === 'metric' ? 'kg' : 'lbs';
  const hLabel = unit === 'metric' ? 'cm' : 'inches';
  const mLabel = unit === 'metric' ? 'cm' : 'inches';

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const wKg = toKg(parseFloat(weight));
    const hCm = toCm(parseFloat(height));

    if (method === 'navy') {
      const nCm = toCm(parseFloat(neck));
      const waCm = toCm(parseFloat(waist));
      const hpCm = gender === 'female' ? toCm(parseFloat(hip)) : null;

      if (gender === 'female' && !hip) { setError('Hip measurement is required for females.'); return; }
      if (nCm >= waCm) { setError('Waist measurement must be greater than neck measurement.'); return; }

      const res = calcNavy(gender, hCm, nCm, waCm, hpCm, wKg);
      setResult(res);
    } else {
      const a = parseInt(age);
      if (!a || a < 15 || a > 100) { setError('Please enter a valid age between 15 and 100.'); return; }
      const res = calcBMI(gender, hCm, wKg, a);
      setResult(res);
    }

    // @ts-ignore
    window.gtag?.('event', 'calculate_body_fat');
  };

  const handleReset = () => {
    setWeight(''); setHeight(''); setAge('');
    setNeck(''); setWaist(''); setHip('');
    setResult(null); setError(''); setShowShareOptions(false);
  };

  const faqs = [
    {
      question: 'What is the US Navy body fat method?',
      answer: 'The US Navy method estimates body fat percentage using circumference measurements — neck, waist, and hips (for women) — along with height. It uses a logarithmic formula validated by the US military. While not as accurate as DEXA scanning, it is significantly more precise than BMI-based estimates because it indirectly accounts for fat distribution rather than just total weight.',
    },
    {
      question: 'How accurate is this body fat calculator?',
      answer: 'The US Navy method has a margin of error of approximately 3–4% compared to DEXA scans for most adults. The BMI-based Deurenberg formula has a slightly higher error range of 4–6%. For the most accurate result, use the Navy method with careful measurements taken first thing in the morning. Neither method matches clinical tools like DEXA, hydrostatic weighing, or Bod Pod.',
    },
    {
      question: 'What is a healthy body fat percentage?',
      answer: 'For men, a healthy body fat range is generally 8–19%, with the fitness range considered 15–18% and athletic range 6–13%. For women, healthy ranges are higher due to essential fat needed for hormonal and reproductive function — typically 21–32% is considered healthy, with the fitness range at 21–24% and athletic range at 14–20%.',
    },
    {
      question: 'Why do women have higher body fat than men?',
      answer: 'Women naturally carry more body fat than men due to biological differences including higher levels of oestrogen, which promotes fat storage, and the need for greater fat reserves to support pregnancy and lactation. Women also carry more sex-specific fat in the breasts, hips, and thighs. This is normal and healthy — the gender-specific ranges in this calculator account for these differences.',
    },
    {
      question: 'How do I measure my waist and neck correctly?',
      answer: 'For the neck, measure just below the larynx (Adam\'s apple) with the tape perpendicular to the long axis of the neck. For the waist, measure at the narrowest point — typically just above the navel, keeping the tape horizontal and not pulled too tight. For hips (women), measure at the widest point around the buttocks. Take all measurements first thing in the morning before eating.',
    },
    {
      question: 'What is lean body mass?',
      answer: 'Lean body mass (LBM) is everything in your body that is not fat — including muscle, bone, organs, water, and connective tissue. It is calculated as your total body weight minus your fat mass. Lean mass is critical for metabolic health; higher lean mass means a higher resting metabolic rate, better insulin sensitivity, and greater functional strength.',
    },
    {
      question: 'Can I reduce body fat without losing weight?',
      answer: 'Yes — this is called body recomposition, and it is common in people who are new to resistance training or returning after a break. By lifting weights and eating sufficient protein (1.6–2.2g/kg/day) at or near your calorie maintenance level, you can simultaneously build muscle and lose fat. The scale may not move, but your body fat percentage will decrease and your physique will change significantly.',
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

  const categoryTableMale = [
    { cat: 'Essential Fat', range: '2 – 5%',   risk: 'Not sustainable',          color: 'text-blue-600 dark:text-blue-400',   dot: 'bg-blue-400' },
    { cat: 'Athletic',      range: '6 – 13%',   risk: 'Excellent',                color: 'text-green-600 dark:text-green-400', dot: 'bg-green-400' },
    { cat: 'Fitness',       range: '14 – 17%',  risk: 'Very good',                color: 'text-teal-600 dark:text-teal-400',   dot: 'bg-teal-400' },
    { cat: 'Average',       range: '18 – 24%',  risk: 'Acceptable',               color: 'text-yellow-600 dark:text-yellow-400',dot: 'bg-yellow-400' },
    { cat: 'Obese',         range: '25%+',       risk: 'High health risk',         color: 'text-red-600 dark:text-red-400',     dot: 'bg-red-500' },
  ];

  const categoryTableFemale = [
    { cat: 'Essential Fat', range: '10 – 13%',  risk: 'Not sustainable',          color: 'text-blue-600 dark:text-blue-400',   dot: 'bg-blue-400' },
    { cat: 'Athletic',      range: '14 – 20%',  risk: 'Excellent',                color: 'text-green-600 dark:text-green-400', dot: 'bg-green-400' },
    { cat: 'Fitness',       range: '21 – 24%',  risk: 'Very good',                color: 'text-teal-600 dark:text-teal-400',   dot: 'bg-teal-400' },
    { cat: 'Average',       range: '25 – 31%',  risk: 'Acceptable',               color: 'text-yellow-600 dark:text-yellow-400',dot: 'bg-yellow-400' },
    { cat: 'Obese',         range: '32%+',       risk: 'High health risk',         color: 'text-red-600 dark:text-red-400',     dot: 'bg-red-500' },
  ];

  return (
    <>
      <Helmet>
        {isCalculatorPage && (
          <title>Free Body Fat Percentage Calculator – US Navy & BMI Method for Men & Women</title>
        )}
        {isCalculatorPage && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
        {isCalculatorPage && (
          <meta name="description" content="Calculate your body fat percentage using the US Navy method or BMI-based formula. Free body fat calculator for men and women with category, fat mass, and lean mass results." />
        )}
        {isCalculatorPage && (
          <link rel="canonical" href="https://thefitcalculator.com/body-fat-calculator" />
        )}
        {isCalculatorPage && (
        <meta property="og:title" content="Free Body Fat Percentage Calculator – US Navy & BMI Method for Men & Women" />
        )}
        {isCalculatorPage && (
         <meta property="og:description" content="Calculate your body fat percentage using the US Navy method or BMI-based formula. Free body fat calculator for men and women with category, fat mass, and lean mass results." />

        )}
      </Helmet>

       <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader title="Body Fat" subtitle="Calculator" />
 
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Page Title ── */}
        <div className="text-center pb-2">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Body Fat Percentage Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg mx-auto">
            Estimate your body fat percentage using the accurate US Navy circumference method or the BMI-based formula. Get your fat mass, lean mass, and body fat category instantly.
          </p>
        </div>

        {/* ── Calculator Card ── */}
        <section id="body-fat-calculator" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

          <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">Calculate Your Body Fat %</h2>
            <p className="text-brand-100 text-xs mt-0.5">US Navy method or BMI-based estimate</p>
          </div>

          <div className="p-6">

            {/* Unit Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl">
                {(['metric', 'imperial'] as UnitSystem[]).map((u) => (
                  <button key={u} onClick={() => { setUnit(u); setResult(null); }}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${unit === u ? 'bg-white dark:bg-gray-800 text-brand-700 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
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

              {/* Method Toggle */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Calculation Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { value: 'navy' as Method, label: '📏 US Navy Method', desc: 'More accurate — uses body measurements' },
                    { value: 'bmi'  as Method, label: '⚖️ BMI-Based Method', desc: 'Quick estimate — uses weight & height only' },
                  ]).map((opt) => (
                    <button key={opt.value} type="button" onClick={() => { setMethod(opt.value); setResult(null); setError(''); }}
                      className={`px-4 py-3 rounded-xl border text-left transition-all duration-200 ${method === opt.value ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400 hover:border-brand-300'}`}>
                      <p className="font-bold text-sm">{opt.label}</p>
                      <p className="text-[11px] mt-0.5 opacity-75">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gender</label>
                <div className="flex gap-3">
                  {(['male', 'female'] as Gender[]).map((g) => (
                    <button key={g} type="button" onClick={() => { setGender(g); setResult(null); }}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 capitalize ${gender === g ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400 hover:border-brand-300'}`}>
                      {g === 'male' ? '♂ Male' : '♀ Female'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight + Height */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weight ({wLabel})</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                    placeholder={unit === 'metric' ? 'e.g. 80' : 'e.g. 176'} required min="1" step="0.1" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Height ({hLabel})</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                    placeholder={unit === 'metric' ? 'e.g. 175' : 'e.g. 69'} required min="1" step="0.1" />
                </div>
              </div>

              {/* BMI method needs age */}
              {method === 'bmi' && (
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Age (years)</label>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                    placeholder="e.g. 30" required min="15" max="100" />
                </div>
              )}

              {/* Navy method measurements */}
              {method === 'navy' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl px-4 py-3 text-xs text-blue-700 dark:text-blue-300">
                    📏 <strong>Measurement tips:</strong> Use a flexible tape measure. Measure at the widest/narrowest points first thing in the morning. Keep tape snug but not compressing skin.
                  </div>
                  <div className={`grid gap-4 ${gender === 'female' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Neck ({mLabel})</label>
                      <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                        placeholder={unit === 'metric' ? 'e.g. 38' : 'e.g. 15'} required min="1" step="0.1" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Waist ({mLabel})</label>
                      <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                        placeholder={unit === 'metric' ? 'e.g. 85' : 'e.g. 33'} required min="1" step="0.1" />
                    </div>
                    {gender === 'female' && (
                      <div>
                        <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hip ({mLabel})</label>
                        <input type="number" value={hip} onChange={(e) => setHip(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                          placeholder={unit === 'metric' ? 'e.g. 95' : 'e.g. 37'} required min="1" step="0.1" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-xl px-4 py-3 font-medium">
                  ⚠ {error}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-200 dark:shadow-none text-sm">
                  Calculate Body Fat %
                </button>
                <button type="button" onClick={handleReset} className="px-5 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm">
                  Reset
                </button>
              </div>
            </form>

            {/* ── Result ── */}
            {result && (
              <div className="mt-6 rounded-2xl border border-brand-100 dark:border-brand-800 bg-white dark:bg-gray-900 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">

                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Your Result</p>

                <div className="flex items-end gap-3 mb-1">
                  <span className="text-6xl font-extrabold text-brand-700 dark:text-brand-400 leading-none">
                    {result.bodyFatPct.toFixed(1)}%
                  </span>
                  <span className={`text-xl font-bold mb-1 ${result.color}`}>{result.category}</span>
                </div>

                <BodyFatGauge pct={result.bodyFatPct} gender={gender} />

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-3 mb-4">
                  {result.description}
                </p>

                {/* Fat / Lean breakdown */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-4 py-3 text-center">
                    <p className="text-2xl font-extrabold text-red-600 dark:text-red-400">{result.fatMassKg.toFixed(1)} {wLabel === 'lbs' ? 'lbs' : 'kg'}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Fat Mass</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl px-4 py-3 text-center">
                    <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">{result.leanMassKg.toFixed(1)} {wLabel === 'lbs' ? 'lbs' : 'kg'}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Lean Mass</p>
                  </div>
                </div>

                {/* Visual body composition bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
                    <span>Body Composition</span>
                    <span>{result.bodyFatPct.toFixed(1)}% fat · {(100 - result.bodyFatPct).toFixed(1)}% lean</span>
                  </div>
                  <div className="h-4 rounded-full overflow-hidden bg-green-100 dark:bg-green-900/30 flex">
                    <div
                      className="h-full bg-red-400 dark:bg-red-500 rounded-l-full transition-all duration-700 flex items-center justify-center"
                      style={{ width: `${result.bodyFatPct}%` }}
                    >
                      {result.bodyFatPct > 12 && <span className="text-[9px] text-white font-bold">Fat</span>}
                    </div>
                    <div className="h-full flex-1 bg-green-400 dark:bg-green-600 rounded-r-full flex items-center justify-center">
                      <span className="text-[9px] text-white font-bold">Lean</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700 px-4 py-2.5 mb-4 text-xs text-gray-500 dark:text-gray-400">
                  Method used: <strong className="text-gray-700 dark:text-gray-300">{result.method === 'navy' ? 'US Navy Circumference Method' : 'BMI-Based Deurenberg Formula'}</strong>
                  {result.method === 'bmi' && ' — for a more accurate result, switch to the US Navy method above.'}
                </div>

                <div className="pt-3 border-t border-brand-100 dark:border-brand-800 flex flex-wrap justify-between items-center gap-2">
                  <button
                    onClick={() => {
                      const shareText = `My body fat is ${result.bodyFatPct.toFixed(1)}% (${result.category}). Check yours at https://thefitcalculator.com/body-fat-calculator`;
                      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                      if (isMobile && navigator.share) {
                        navigator.share({ title: 'My Body Fat Result', text: shareText }).catch(() => {});
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

                {showShareOptions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      { label: 'WhatsApp', bg: 'bg-green-500', href: `https://wa.me/?text=${encodeURIComponent(`My body fat is ${result.bodyFatPct.toFixed(1)}% (${result.category}). Check yours at https://thefitcalculator.com/body-fat-calculator`)}` },
                      { label: 'Telegram', bg: 'bg-blue-500',  href: `https://t.me/share/url?text=${encodeURIComponent(`My body fat is ${result.bodyFatPct.toFixed(1)}% (${result.category}). https://thefitcalculator.com/body-fat-calculator`)}` },
                      { label: 'Email',    bg: 'bg-gray-700',  href: `mailto:?subject=My Body Fat Result&body=${encodeURIComponent(`My body fat is ${result.bodyFatPct.toFixed(1)}% (${result.category}). https://thefitcalculator.com/body-fat-calculator`)}` },
                    ].map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`px-3 py-2 ${s.bg} text-white rounded-lg text-xs font-semibold`}>{s.label}</a>)}
                    <button onClick={() => { navigator.clipboard.writeText(`My body fat is ${result.bodyFatPct.toFixed(1)}% (${result.category}). https://thefitcalculator.com/body-fat-calculator`); alert('Copied!'); }} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-xs font-semibold">Copy</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Content Section ── */}
        <section className="space-y-6">

          {/* What is / Why */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              What is Body Fat Percentage?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Body fat percentage is the proportion of your total body weight that is made up of fat tissue. Unlike BMI — which only uses height and weight — body fat percentage directly reflects your body composition, distinguishing between fat mass and lean mass (muscle, bone, organs, and water). It is one of the most meaningful indicators of overall fitness and metabolic health.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Two Calculation Methods Explained
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">📏 US Navy Method</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">Uses neck, waist (and hip for women) circumferences with height in a logarithmic formula. Validated by the US military. Error range: ~3–4% vs DEXA. <strong className="text-gray-800 dark:text-gray-100">Recommended for accuracy.</strong></p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">⚖️ BMI-Based Method</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">Uses the Deurenberg formula: body fat % = (1.2 × BMI) + (0.23 × age) − (10.8 × gender factor) − 5.4. Quicker but less precise. Error range: ~4–6%.</p>
              </div>
            </div>
          </div>

          {/* Category Tables */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Body Fat % Categories
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Based on American Council on Exercise (ACE) classifications for adult men and women.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[{ label: 'Men', rows: categoryTableMale }, { label: 'Women', rows: categoryTableFemale }].map((tbl) => (
                <div key={tbl.label}>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{tbl.label}</p>
                  <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700/60">
                          <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Category</th>
                          <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Range</th>
                          <th className="px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Health</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {tbl.rows.map((row) => (
                          <tr key={row.cat} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <td className={`px-3 py-2.5 font-semibold text-xs ${row.color}`}>
                              <span className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${row.dot}`}></span>{row.cat}</span>
                            </td>
                            <td className="px-3 py-2.5 text-gray-700 dark:text-gray-300 text-xs font-medium">{row.range}</td>
                            <td className="px-3 py-2.5 text-gray-500 dark:text-gray-400 text-xs">{row.risk}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How to Reduce Body Fat by Category
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Evidence-based strategies based on where your body fat currently falls.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Athletic / Fitness Range — Maintain',
                  bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-100 dark:border-green-800', hColor: 'text-green-700 dark:text-green-300',
                  tips: ['Maintain current training frequency and intensity', 'Prioritise protein intake (1.8–2.2g/kg) to preserve lean mass', 'Avoid unnecessary calorie restriction — you\'re in an excellent range', 'Monitor body composition every 3 months rather than weight alone'],
                },
                {
                  title: 'Average Range — Improve',
                  bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-100 dark:border-yellow-800', hColor: 'text-yellow-700 dark:text-yellow-300',
                  tips: ['Add 2–3 resistance training sessions per week to build lean mass', 'Create a moderate 300–500 kcal daily deficit through diet and exercise', 'Reduce ultra-processed foods and added sugars', 'Aim for 8,000–10,000 steps per day to increase NEAT (non-exercise activity)'],
                },
                {
                  title: 'Obese Range — Reduce',
                  bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-100 dark:border-red-800', hColor: 'text-red-700 dark:text-red-300',
                  tips: ['Consult a doctor before starting a structured fat loss programme', 'Begin with low-impact exercise: walking, swimming, or cycling', 'Focus on dietary changes first — nutrition drives the majority of fat loss', 'Aim for a realistic deficit of 500 kcal/day for ~0.5 kg/week fat loss'],
                },
                {
                  title: 'General — Body Recomposition',
                  bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-800', hColor: 'text-blue-700 dark:text-blue-300',
                  tips: ['Lift weights 3–4x per week — this is the #1 tool for improving body composition', 'Eat sufficient protein at every meal to support muscle protein synthesis', 'Sleep 7–9 hours — poor sleep raises fat-storing hormones like cortisol', 'Track progress with measurements and photos, not just the scale'],
                },
              ].map((card) => (
                <div key={card.title} className={`p-4 rounded-xl border ${card.bg} ${card.border}`}>
                  <h3 className={`font-bold mb-3 text-sm ${card.hColor}`}>{card.title}</h3>
                  <ul className="space-y-1.5">{card.tips.map((t) => <li key={t} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">{t}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>

          {/* Limitations */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Limitations of Body Fat Calculators
            </h2>
            <ul className="space-y-2 mb-5">
              {[
                'Circumference-based methods assume average fat distribution — results vary for individuals with unusual proportions',
                'Neither method accounts for visceral fat (deep abdominal fat), which carries the greatest health risk',
                'Measurement error of just 1–2 cm can shift results by 1–3%',
                'Results are less reliable for very muscular individuals, elderly people, and those with oedema',
                'Not validated for use in children, pregnant women, or people with limb amputations',
                'Gold standard methods (DEXA, hydrostatic weighing, Bod Pod) remain significantly more accurate',
              ].map((item) => <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">{item}</li>)}
            </ul>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Conclusion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Body fat percentage is a far more meaningful health metric than weight or BMI alone — it tells you how much of your body is functional, metabolically active tissue versus stored fat. Use this free calculator as a reliable starting point, track changes over time rather than single readings, and consider consulting a healthcare professional or certified fitness specialist for a full body composition assessment.
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