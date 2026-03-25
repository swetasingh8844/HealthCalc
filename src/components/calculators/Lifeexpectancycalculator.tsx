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
type Gender = 'male' | 'female';
type SmokingStatus = 'never' | 'former' | 'light' | 'heavy';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Diet = 'poor' | 'average' | 'good' | 'excellent';
type StressLevel = 'low' | 'moderate' | 'high' | 'very_high';
type SleepQuality = 'poor' | 'fair' | 'good' | 'excellent';
type AlcoholUse = 'none' | 'moderate' | 'heavy';

interface LifeExpectancyResult {
  baseExpectancy: number;
  adjustedExpectancy: number;
  yearsRemaining: number;
  adjustments: { factor: string; years: number; icon: string }[];
  lifePhase: string;
  phaseColor: string;
  phaseDesc: string;
  estimatedYear: number;
}

// ── Base life expectancy by gender (global average, slightly optimistic) ──────
const BASE: Record<Gender, number> = { male: 75, female: 80 };

// ── Score each factor ──────────────────────────────────────────────────────────
function calculateLifeExpectancy(
  age: number,
  gender: Gender,
  smoking: SmokingStatus,
  activity: ActivityLevel,
  diet: Diet,
  bmi: number | null,
  stress: StressLevel,
  sleep: SleepQuality,
  alcohol: AlcoholUse,
  hasDiabetes: boolean,
  hasHeartDisease: boolean,
  hasHypertension: boolean,
  familyLongevity: boolean,
  education: boolean,
  socialConnections: boolean
): LifeExpectancyResult {
  let base = BASE[gender];
  const adjustments: { factor: string; years: number; icon: string }[] = [];

  const add = (factor: string, years: number, icon: string) => {
    adjustments.push({ factor, years, icon });
    base += years;
  };

  // Smoking
  if (smoking === 'light')  add('Light smoking',       -5,  '🚬');
  if (smoking === 'heavy')  add('Heavy smoking',       -10, '🚬');
  if (smoking === 'former') add('Former smoker',       -2,  '🚬');

  // Activity
  if (activity === 'sedentary')   add('Sedentary lifestyle',     -3, '🪑');
  if (activity === 'light')       add('Light activity',          +1, '🚶');
  if (activity === 'moderate')    add('Moderate exercise',       +2, '🏃');
  if (activity === 'active')      add('Active lifestyle',        +3, '💪');
  if (activity === 'very_active') add('Very active lifestyle',   +4, '🏅');

  // Diet
  if (diet === 'poor')      add('Poor diet',           -3, '🍔');
  if (diet === 'average')   add('Average diet',        +0, '🥗');
  if (diet === 'good')      add('Good diet',           +2, '🥗');
  if (diet === 'excellent') add('Excellent diet',      +4, '🥗');

  // BMI
  if (bmi !== null) {
    if (bmi < 18.5)                add('Underweight BMI',        -2, '⚖️');
    else if (bmi >= 18.5 && bmi < 25) add('Healthy BMI',        +2, '⚖️');
    else if (bmi >= 25 && bmi < 30)   add('Overweight BMI',     -1, '⚖️');
    else if (bmi >= 30 && bmi < 35)   add('Obese BMI (Class I)', -3, '⚖️');
    else                              add('Obese BMI (Class II+)', -5, '⚖️');
  }

  // Stress
  if (stress === 'low')       add('Low stress',          +2, '😌');
  if (stress === 'high')      add('High stress',         -2, '😰');
  if (stress === 'very_high') add('Very high stress',    -4, '😰');

  // Sleep
  if (sleep === 'poor')      add('Poor sleep quality',   -3, '😴');
  if (sleep === 'fair')      add('Fair sleep',           -1, '😴');
  if (sleep === 'excellent') add('Excellent sleep',      +2, '😴');

  // Alcohol
  if (alcohol === 'moderate') add('Moderate alcohol',    -1, '🍷');
  if (alcohol === 'heavy')    add('Heavy alcohol use',   -5, '🍺');

  // Medical conditions
  if (hasDiabetes)      add('Type 2 diabetes',          -5, '🩺');
  if (hasHeartDisease)  add('Heart disease',            -6, '🫀');
  if (hasHypertension)  add('Hypertension',             -3, '🩺');

  // Protective factors
  if (familyLongevity)    add('Family history of longevity', +3, '👨‍👩‍👧');
  if (education)          add('Higher education',            +2, '🎓');
  if (socialConnections)  add('Strong social connections',   +2, '🤝');

  const adjusted = Math.min(105, Math.max(50, Math.round(base)));
  const yearsRemaining = Math.max(0, adjusted - age);
  const estimatedYear = new Date().getFullYear() + yearsRemaining;

  // Life phase
  let lifePhase = '', phaseColor = '', phaseDesc = '';
  const pct = (age / adjusted) * 100;
  if (pct < 25)       { lifePhase = 'Early Life';    phaseColor = 'text-green-600 dark:text-green-400';  phaseDesc = 'You are in the early chapter of a long journey.'; }
  else if (pct < 50)  { lifePhase = 'Prime Years';   phaseColor = 'text-brand-600 dark:text-brand-400';  phaseDesc = 'You are in your prime — building the life you want.'; }
  else if (pct < 70)  { lifePhase = 'Middle Years';  phaseColor = 'text-yellow-600 dark:text-yellow-400';phaseDesc = 'A pivotal time to double down on healthy habits.'; }
  else if (pct < 85)  { lifePhase = 'Later Years';   phaseColor = 'text-orange-600 dark:text-orange-400';phaseDesc = 'Every healthy choice compounds meaningfully now.'; }
  else                { lifePhase = 'Golden Years';  phaseColor = 'text-purple-600 dark:text-purple-400';phaseDesc = 'Focus on quality, connection, and joy each day.'; }

  return {
    baseExpectancy: BASE[gender],
    adjustedExpectancy: adjusted,
    yearsRemaining,
    adjustments,
    lifePhase,
    phaseColor,
    phaseDesc,
    estimatedYear,
  };
}

// ── Life Timeline Bar ────────────────────────────────────────────────────────
const LifeTimeline: React.FC<{ age: number; expectancy: number }> = ({ age, expectancy }) => {
  const livePct   = Math.min(100, (age / expectancy) * 100);
  const remainPct = 100 - livePct;
  return (
    <div className="mt-4 mb-2">
      <div className="flex rounded-full overflow-hidden h-5 border border-gray-200 dark:border-gray-700">
        <div
          className="bg-gradient-to-r from-brand-500 to-brand-400 flex items-center justify-center transition-all duration-700"
          style={{ width: `${livePct}%` }}
        >
          {livePct > 15 && <span className="text-[9px] text-white font-bold px-1">{age}y lived</span>}
        </div>
        <div
          className="bg-gradient-to-r from-green-300 to-green-400 dark:from-green-700 dark:to-green-600 flex items-center justify-center transition-all duration-700"
          style={{ width: `${remainPct}%` }}
        >
          {remainPct > 15 && <span className="text-[9px] text-white font-bold px-1">{expectancy - age}y ahead</span>}
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 font-medium">
        <span>Born</span>
        <span className="text-brand-600 dark:text-brand-400 font-bold">Now (age {age})</span>
        <span>Est. {expectancy} yrs</span>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
export const LifeExpectancyCalculator: React.FC = () => {
  const location = useLocation();
  const isCalculatorPage = location.pathname.startsWith('/life-expectancy-calculator');

  // Form state
  const [age, setAge]                     = useState('');
  const [gender, setGender]               = useState<Gender>('male');
  const [smoking, setSmoking]             = useState<SmokingStatus>('never');
  const [activity, setActivity]           = useState<ActivityLevel>('moderate');
  const [diet, setDiet]                   = useState<Diet>('average');
  const [bmiInput, setBmiInput]           = useState('');
  const [stress, setStress]               = useState<StressLevel>('moderate');
  const [sleep, setSleep]                 = useState<SleepQuality>('good');
  const [alcohol, setAlcohol]             = useState<AlcoholUse>('none');
  const [hasDiabetes, setHasDiabetes]     = useState(false);
  const [hasHeartDisease, setHasHeartDisease] = useState(false);
  const [hasHypertension, setHasHypertension] = useState(false);
  const [familyLongevity, setFamilyLongevity] = useState(false);
  const [education, setEducation]         = useState(false);
  const [socialConnections, setSocialConnections] = useState(false);
  const [result, setResult]               = useState<LifeExpectancyResult | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age);
    const bmi = bmiInput ? parseFloat(bmiInput) : null;
    const res = calculateLifeExpectancy(
      a, gender, smoking, activity, diet, bmi,
      stress, sleep, alcohol,
      hasDiabetes, hasHeartDisease, hasHypertension,
      familyLongevity, education, socialConnections
    );
    setResult(res);
    // @ts-ignore
    window.gtag?.('event', 'calculate_life_expectancy', { years: res.adjustedExpectancy });
  };

  const handleReset = () => {
    setAge(''); setBmiInput(''); setSmoking('never'); setActivity('moderate');
    setDiet('average'); setStress('moderate'); setSleep('good'); setAlcohol('none');
    setHasDiabetes(false); setHasHeartDisease(false); setHasHypertension(false);
    setFamilyLongevity(false); setEducation(false); setSocialConnections(false);
    setResult(null); setShowShareOptions(false);
  };

  // ── Option sets ──
  const smokingOpts  = [{ v: 'never' as SmokingStatus, l: 'Never smoked' }, { v: 'former' as SmokingStatus, l: 'Former smoker' }, { v: 'light' as SmokingStatus, l: 'Light smoker' }, { v: 'heavy' as SmokingStatus, l: 'Heavy smoker' }];
  const activityOpts = [{ v: 'sedentary' as ActivityLevel, l: 'Sedentary', d: 'No exercise' }, { v: 'light' as ActivityLevel, l: 'Light', d: '1–3 days/wk' }, { v: 'moderate' as ActivityLevel, l: 'Moderate', d: '3–5 days/wk' }, { v: 'active' as ActivityLevel, l: 'Active', d: '6–7 days/wk' }, { v: 'very_active' as ActivityLevel, l: 'Very Active', d: 'Intense daily' }];
  const dietOpts     = [{ v: 'poor' as Diet, l: '🍔 Poor', d: 'Mostly processed' }, { v: 'average' as Diet, l: '🍽️ Average', d: 'Mixed diet' }, { v: 'good' as Diet, l: '🥗 Good', d: 'Mostly whole foods' }, { v: 'excellent' as Diet, l: '🌿 Excellent', d: 'Plant-rich, clean' }];
  const stressOpts   = [{ v: 'low' as StressLevel, l: 'Low', d: 'Rarely stressed' }, { v: 'moderate' as StressLevel, l: 'Moderate', d: 'Occasionally stressed' }, { v: 'high' as StressLevel, l: 'High', d: 'Often stressed' }, { v: 'very_high' as StressLevel, l: 'Very High', d: 'Chronically stressed' }];
  const sleepOpts    = [{ v: 'poor' as SleepQuality, l: 'Poor', d: '<5 hrs / broken' }, { v: 'fair' as SleepQuality, l: 'Fair', d: '5–6 hrs' }, { v: 'good' as SleepQuality, l: 'Good', d: '7–8 hrs' }, { v: 'excellent' as SleepQuality, l: 'Excellent', d: '8+ hrs, restful' }];
  const alcoholOpts  = [{ v: 'none' as AlcoholUse, l: 'None', d: 'Non-drinker' }, { v: 'moderate' as AlcoholUse, l: 'Moderate', d: '1–7 drinks/wk' }, { v: 'heavy' as AlcoholUse, l: 'Heavy', d: '8+ drinks/wk' }];

  const medicalConditions = [
    { id: 'diabetes',     label: 'Type 2 Diabetes',  state: hasDiabetes,     setter: setHasDiabetes },
    { id: 'heart',        label: 'Heart Disease',     state: hasHeartDisease, setter: setHasHeartDisease },
    { id: 'hypertension', label: 'Hypertension',      state: hasHypertension, setter: setHasHypertension },
  ];

  const positiveFactors = [
    { id: 'family',  label: '👨‍👩‍👧 Family longevity (parents/grandparents lived 85+)', state: familyLongevity, setter: setFamilyLongevity },
    { id: 'edu',     label: '🎓 University / higher education completed',              state: education,      setter: setEducation },
    { id: 'social',  label: '🤝 Strong social connections & relationships',            state: socialConnections, setter: setSocialConnections },
  ];

  const faqs = [
    {
      question: 'How accurate is this life expectancy calculator?',
      answer: 'This calculator is an educational estimate based on established epidemiological risk factors and population-level data, not a clinical or actuarial tool. Each factor (smoking, exercise, BMI, etc.) is assigned an adjustment based on peer-reviewed research showing average years gained or lost at the population level. Individual results will vary significantly. Use this as a motivational wellness tool, not a medical prediction.',
    },
    {
      question: 'What factors have the biggest impact on life expectancy?',
      answer: 'Research consistently identifies smoking as the single largest modifiable risk factor — heavy smokers lose an average of 10 years of life compared to non-smokers. Physical inactivity, obesity, heavy alcohol use, chronic stress, poor sleep, and unmanaged chronic diseases (diabetes, heart disease, hypertension) also have substantial negative effects. On the positive side, regular exercise, a healthy diet, strong social relationships, and adequate sleep are the most powerful life-extending behaviours.',
    },
    {
      question: 'Why does gender affect life expectancy?',
      answer: 'On average, women live 4–7 years longer than men globally. This is attributed to a combination of biological factors (oestrogen\'s protective effect on the cardiovascular system, lower rates of early heart disease), behavioural factors (men are statistically more likely to smoke, drink heavily, and avoid medical care), and occupational differences. However, this gap has been narrowing in many countries as lifestyle behaviours converge.',
    },
    {
      question: 'Does family history really affect how long I will live?',
      answer: 'Yes — genetics accounts for roughly 20–30% of longevity variation. Having parents or grandparents who lived into their late 80s or beyond is a meaningful positive indicator. However, lifestyle choices are estimated to account for 70–80% of longevity outcomes. So while you cannot change your genes, the vast majority of your health destiny is shaped by your daily habits — making the modifiable factors far more impactful than inheritance alone.',
    },
    {
      question: 'How does stress affect life expectancy?',
      answer: 'Chronic psychological stress activates the body\'s stress response (cortisol, adrenaline), which — when chronically elevated — damages the cardiovascular system, suppresses immune function, disrupts sleep, and accelerates cellular ageing (telomere shortening). Studies suggest chronically stressed individuals have a risk of premature death 40–50% higher than those with low stress. Effective stress management through exercise, mindfulness, social connection, and adequate rest can significantly mitigate this.',
    },
    {
      question: 'Can I actually change my life expectancy?',
      answer: 'Absolutely. The majority of premature deaths are preventable through modifiable lifestyle choices. Quitting smoking adds an estimated 10 years. Regular exercise is associated with 3–5 additional years. Maintaining a healthy weight, managing blood pressure, eating a plant-rich diet, sleeping well, and limiting alcohol all contribute meaningfully. Research published in the journal Circulation estimated that adopting five healthy habits could extend life expectancy by over a decade.',
    },
    {
      question: 'Why does education affect life expectancy?',
      answer: 'Higher education is associated with significantly longer life across virtually all countries studied. The mechanism is multifactorial: educated individuals are more likely to have higher incomes, better access to healthcare, greater health literacy, lower rates of smoking and obesity, and more social and cognitive engagement. Education is one of the most powerful social determinants of health and longevity, with each additional level of schooling associated with 1–3 years of additional life expectancy.',
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

  const SelectRow: React.FC<{
    label: string;
    opts: { v: string; l: string; d?: string }[];
    value: string;
    onChange: (v: any) => void;
    cols?: number;
  }> = ({ label, opts, value, onChange, cols = 4 }) => (
    <div>
      <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</label>
      <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${Math.min(cols, opts.length)}, minmax(0, 1fr))` }}>
        {opts.map((opt) => (
          <button key={opt.v} type="button" onClick={() => onChange(opt.v)}
            className={`px-3 py-2.5 rounded-xl border text-left transition-all duration-200 ${value === opt.v ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400 hover:border-brand-300 dark:hover:border-brand-700'}`}>
            <p className="font-bold text-xs">{opt.l}</p>
            {opt.d && <p className="text-[10px] mt-0.5 opacity-75">{opt.d}</p>}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        {isCalculatorPage && <title>Free Life Expectancy Calculator – Estimate Your Lifespan Based on Lifestyle</title>}
        {isCalculatorPage && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
        {isCalculatorPage && <meta name="description" content="Estimate your life expectancy based on age, gender, smoking, exercise, diet, BMI, stress, sleep, and medical history. Free longevity calculator with personalised health insights." />}
        {isCalculatorPage && <link rel="canonical" href="https://thefitcalculator.com/life-expectancy-calculator" />}
        {isCalculatorPage && (
        <meta property="og:title" content="Free Life Expectancy Calculator – Estimate Your Lifespan Based on Lifestyle" />
        )}
        {isCalculatorPage && (
         <meta property="og:description" content="Estimate your life expectancy based on age, gender, smoking, exercise, diet, BMI, stress, sleep, and medical history. Free longevity calculator with personalised health insights." />

        )}
      </Helmet>

       <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader title="Life Expectancy" subtitle="Calculator" />
 
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Page Title ── */}
        <div className="text-center pb-2">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Life Expectancy Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg mx-auto">
            Answer questions about your lifestyle, health, and habits to get a personalised life expectancy estimate and see which factors are adding or subtracting years from your life.
          </p>
        </div>

        {/* ── Disclaimer banner ── */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-5 py-3 text-xs text-amber-800 dark:text-amber-300 flex gap-2 items-start">
          <span className="text-base mt-0.5 flex-shrink-0">⚠️</span>
          <span><strong>Educational tool only.</strong> This calculator provides a statistical estimate based on population-level research — it is not a medical prognosis. Results cannot predict your individual lifespan. Use it to understand how your habits affect longevity and motivate positive change.</span>
        </div>

        {/* ── Calculator Card ── */}
        <section id="life-expectancy-calculator" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

          <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">Estimate Your Life Expectancy</h2>
            <p className="text-brand-100 text-xs mt-0.5">Based on 15 lifestyle, health, and genetic factors</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleCalculate} className="space-y-6">

              {/* Section 1: Basic Info */}
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">① Basic Information</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                      placeholder="e.g. 35" required min="1" max="100" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">BMI (optional)</label>
                    <input type="number" value={bmiInput} onChange={(e) => setBmiInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                      placeholder="e.g. 23.5 — leave blank to skip" min="10" max="60" step="0.1" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gender</label>
                  <div className="flex gap-3">
                    {(['male', 'female'] as Gender[]).map((g) => (
                      <button key={g} type="button" onClick={() => setGender(g)}
                        className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${gender === g ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400 hover:border-brand-300'}`}>
                        {g === 'male' ? '♂ Male' : '♀ Female'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700" />

              {/* Section 2: Lifestyle */}
              <div className="space-y-5">
                <p className="text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400">② Lifestyle Factors</p>
                <SelectRow label="Smoking Status"  opts={smokingOpts.map(o => ({ v: o.v, l: o.l }))} value={smoking}   onChange={setSmoking}  cols={2} />
                <SelectRow label="Physical Activity" opts={activityOpts.map(o => ({ v: o.v, l: o.l, d: o.d }))} value={activity} onChange={setActivity} cols={5} />
                <SelectRow label="Diet Quality"    opts={dietOpts.map(o => ({ v: o.v, l: o.l, d: o.d }))} value={diet}   onChange={setDiet}   cols={4} />
                <SelectRow label="Alcohol Use"     opts={alcoholOpts.map(o => ({ v: o.v, l: o.l, d: o.d }))} value={alcohol} onChange={setAlcohol} cols={3} />
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700" />

              {/* Section 3: Mental Health & Sleep */}
              <div className="space-y-5">
                <p className="text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400">③ Mental Health & Sleep</p>
                <SelectRow label="Stress Level"   opts={stressOpts.map(o => ({ v: o.v, l: o.l, d: o.d }))} value={stress} onChange={setStress} cols={4} />
                <SelectRow label="Sleep Quality"  opts={sleepOpts.map(o => ({ v: o.v, l: o.l, d: o.d }))} value={sleep}  onChange={setSleep}  cols={4} />
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700" />

              {/* Section 4: Medical History */}
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">④ Medical Conditions (select all that apply)</p>
                <div className="flex flex-wrap gap-3">
                  {medicalConditions.map((item) => (
                    <label key={item.id}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border cursor-pointer transition-all duration-200 ${item.state ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400'}`}>
                      <input type="checkbox" checked={item.state} onChange={(e) => item.setter(e.target.checked)} className="w-4 h-4 accent-red-500" />
                      <span className="text-sm font-semibold">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700" />

              {/* Section 5: Positive Factors */}
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">⑤ Positive Longevity Factors (select all that apply)</p>
                <div className="space-y-2">
                  {positiveFactors.map((item) => (
                    <label key={item.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${item.state ? 'border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 text-gray-600 dark:text-gray-400'}`}>
                      <input type="checkbox" checked={item.state} onChange={(e) => item.setter(e.target.checked)} className="w-4 h-4 accent-green-600 flex-shrink-0" />
                      <span className="text-sm font-semibold">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-200 dark:shadow-none text-sm">
                  Calculate Life Expectancy
                </button>
                <button type="button" onClick={handleReset} className="px-5 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm">
                  Reset
                </button>
              </div>
            </form>

            {/* ── Result ── */}
            {result && (
              <div className="mt-6 rounded-2xl border border-brand-100 dark:border-brand-800 bg-white dark:bg-gray-900 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">

                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Your Estimated Life Expectancy</p>

                {/* Primary */}
                <div className="flex items-end gap-3 mb-1 flex-wrap">
                  <span className="text-6xl font-extrabold text-brand-700 dark:text-brand-400 leading-none">{result.adjustedExpectancy}</span>
                  <div className="mb-1">
                    <p className="text-lg font-bold text-gray-500">years</p>
                    <p className={`text-sm font-bold ${result.phaseColor}`}>{result.lifePhase}</p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                  {result.yearsRemaining} years remaining &nbsp;·&nbsp; Estimated year: <strong className="text-gray-700 dark:text-gray-300">{result.estimatedYear}</strong>
                </p>

                <LifeTimeline age={parseInt(age)} expectancy={result.adjustedExpectancy} />

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-3 mb-4">{result.phaseDesc}</p>

                {/* Secondary stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-3 text-center">
                    <p className="text-lg font-extrabold text-gray-700 dark:text-gray-300">{result.baseExpectancy}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Base ({gender})</p>
                  </div>
                  <div className="bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 rounded-xl px-3 py-3 text-center">
                    <p className="text-lg font-extrabold text-brand-700 dark:text-brand-400">{result.adjustedExpectancy}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Your Estimate</p>
                  </div>
                  <div className={`rounded-xl px-3 py-3 text-center border ${result.adjustedExpectancy >= result.baseExpectancy ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800'}`}>
                    <p className={`text-lg font-extrabold ${result.adjustedExpectancy >= result.baseExpectancy ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {result.adjustedExpectancy >= result.baseExpectancy ? '+' : ''}{result.adjustedExpectancy - result.baseExpectancy}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-0.5">vs Baseline</p>
                  </div>
                </div>

                {/* Adjustments breakdown */}
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-4 pt-3 pb-2">Factor Breakdown</p>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-72 overflow-y-auto">
                    {result.adjustments.map((adj, i) => (
                      <div key={i} className="flex justify-between items-center px-4 py-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                          <span>{adj.icon}</span>{adj.factor}
                        </span>
                        <span className={`text-sm font-bold tabular-nums ${adj.years > 0 ? 'text-green-600 dark:text-green-400' : adj.years < 0 ? 'text-red-500 dark:text-red-400' : 'text-gray-400'}`}>
                          {adj.years > 0 ? '+' : ''}{adj.years} yrs
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center px-4 py-2.5 bg-brand-50/50 dark:bg-brand-900/20 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-100">Net adjustment</span>
                    <span className={`text-sm font-extrabold ${result.adjustedExpectancy >= result.baseExpectancy ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                      {result.adjustedExpectancy >= result.baseExpectancy ? '+' : ''}{result.adjustedExpectancy - result.baseExpectancy} yrs → {result.adjustedExpectancy} years total
                    </span>
                  </div>
                </div>

                {/* Share */}
                <div className="pt-3 border-t border-brand-100 dark:border-brand-800 flex flex-wrap justify-between items-center gap-2">
                  <button
                    onClick={() => {
                      const shareText = `My estimated life expectancy is ${result.adjustedExpectancy} years (${result.yearsRemaining} years remaining). Calculate yours at https://thefitcalculator.com/life-expectancy-calculator`;
                      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                      if (isMobile && navigator.share) {
                        navigator.share({ title: 'My Life Expectancy', text: shareText }).catch(() => {});
                      } else setShowShareOptions(true);
                    }}
                    className="text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline flex items-center gap-1"
                  >↗ Share Results</button>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 italic">*Educational estimate only. Not a medical prediction.</span>
                </div>

                {showShareOptions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      { label: 'WhatsApp', bg: 'bg-green-500', href: `https://wa.me/?text=${encodeURIComponent(`My estimated life expectancy is ${result.adjustedExpectancy} years. Calculate yours at https://thefitcalculator.com/life-expectancy-calculator`)}` },
                      { label: 'Telegram', bg: 'bg-blue-500',  href: `https://t.me/share/url?text=${encodeURIComponent(`My estimated life expectancy is ${result.adjustedExpectancy} years. https://thefitcalculator.com/life-expectancy-calculator`)}` },
                      { label: 'Email',    bg: 'bg-gray-700',  href: `mailto:?subject=My Life Expectancy Estimate&body=${encodeURIComponent(`My estimated life expectancy is ${result.adjustedExpectancy} years (${result.yearsRemaining} years remaining). https://thefitcalculator.com/life-expectancy-calculator`)}` },
                    ].map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`px-3 py-2 ${s.bg} text-white rounded-lg text-xs font-semibold`}>{s.label}</a>)}
                    <button onClick={() => { navigator.clipboard.writeText(`My estimated life expectancy is ${result.adjustedExpectancy} years. https://thefitcalculator.com/life-expectancy-calculator`); alert('Copied!'); }} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-xs font-semibold">Copy</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Content ── */}
        <section className="space-y-6">

          {/* What factors / how calculated */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              What Determines Life Expectancy?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Life expectancy is shaped by a complex interplay of genetics, environment, and behaviour. Research suggests that lifestyle choices account for approximately 70–80% of longevity outcomes, with genetics contributing around 20–30%. This means the habits you build today have a far greater impact on your lifespan than your family history alone.
            </p>
            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How This Calculator Works
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Starting from a gender-based baseline life expectancy derived from global averages, the calculator applies positive and negative year adjustments for 15 evidence-based factors. Each adjustment reflects the average impact of that factor on lifespan at the population level, sourced from large-scale epidemiological studies and meta-analyses.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Risk Factors (subtract years)</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">Smoking, inactivity, poor diet, obesity, heavy alcohol, chronic stress, poor sleep, diabetes, heart disease, hypertension</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Protective Factors (add years)</p>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">Regular exercise, excellent diet, healthy BMI, low stress, quality sleep, family longevity, education, social connections</p>
              </div>
            </div>
          </div>

          {/* Impact table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Biggest Impact Factors on Longevity
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Ranked by estimated years of life gained or lost, based on population-level research.</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/60">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Factor</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Impact</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Direction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { factor: '🚬 Heavy smoking',            impact: '−10 years', dir: 'Negative', color: 'text-red-600 dark:text-red-400' },
                    { factor: '🫀 Heart disease',            impact: '−6 years',  dir: 'Negative', color: 'text-red-500 dark:text-red-400' },
                    { factor: '🍺 Heavy alcohol use',        impact: '−5 years',  dir: 'Negative', color: 'text-red-500 dark:text-red-400' },
                    { factor: '🩺 Type 2 diabetes',          impact: '−5 years',  dir: 'Negative', color: 'text-red-500 dark:text-red-400' },
                    { factor: '🏅 Very active lifestyle',    impact: '+4 years',  dir: 'Positive', color: 'text-green-600 dark:text-green-400' },
                    { factor: '🌿 Excellent diet',           impact: '+4 years',  dir: 'Positive', color: 'text-green-600 dark:text-green-400' },
                    { factor: '😰 Chronic high stress',      impact: '−4 years',  dir: 'Negative', color: 'text-orange-500 dark:text-orange-400' },
                    { factor: '👨‍👩‍👧 Family longevity',        impact: '+3 years',  dir: 'Positive', color: 'text-green-500 dark:text-green-400' },
                    { factor: '💪 Active lifestyle',         impact: '+3 years',  dir: 'Positive', color: 'text-green-500 dark:text-green-400' },
                    { factor: '😴 Poor sleep quality',       impact: '−3 years',  dir: 'Negative', color: 'text-orange-500 dark:text-orange-400' },
                  ].map((row) => (
                    <tr key={row.factor} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{row.factor}</td>
                      <td className={`px-4 py-3 font-bold ${row.color}`}>{row.impact}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${row.dir === 'Positive' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>{row.dir}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Evidence-Based Ways to Live Longer
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">The most impactful, research-backed longevity habits you can start today.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Move Every Day',
                  bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-100 dark:border-green-800', hColor: 'text-green-700 dark:text-green-300',
                  tips: ['150+ minutes of moderate aerobic activity per week is the threshold for significant benefit', 'Resistance training 2–3x/week preserves muscle mass and metabolic health into old age', 'Even 15–20 minutes of walking daily reduces all-cause mortality meaningfully', 'Avoid prolonged sitting — break it up every 45–60 minutes with movement'],
                },
                {
                  title: 'Eat for Longevity',
                  bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-100 dark:border-teal-800', hColor: 'text-teal-700 dark:text-teal-300',
                  tips: ['Mediterranean and plant-rich diets are most consistently linked to longer life', 'Minimise ultra-processed foods, added sugars, and refined carbohydrates', 'Eat a wide variety of vegetables, legumes, whole grains, and oily fish', 'Avoid extreme dietary restriction — sustainable, balanced eating beats crash diets'],
                },
                {
                  title: 'Protect Your Mental Health',
                  bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-100 dark:border-purple-800', hColor: 'text-purple-700 dark:text-purple-300',
                  tips: ['Chronic loneliness is as dangerous as smoking 15 cigarettes a day — invest in relationships', 'Regular mindfulness or meditation practice measurably reduces cortisol and inflammation', 'Purposeful work or volunteering is associated with longer life across many cultures', 'Prioritise 7–9 hours of quality sleep — it is the single most restorative health intervention'],
                },
                {
                  title: 'Manage Medical Risk',
                  bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-800', hColor: 'text-blue-700 dark:text-blue-300',
                  tips: ['Get regular health screenings — many life-threatening conditions are silent until advanced', 'Control blood pressure and blood sugar through diet, exercise, and medication if needed', 'Quit smoking — within 15 years, ex-smokers\' risk approaches that of non-smokers', 'Limit alcohol to fewer than 7 standard drinks per week for lower long-term risk'],
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
              Important Limitations
            </h2>
            <ul className="space-y-2 mb-5">
              {[
                'This is a statistical model — it estimates population averages, not individual outcomes',
                'Accident, infection, cancer, and other unpredictable events are not modelled',
                'Factor adjustments are additive simplifications; real interactions between risk factors are complex',
                'Does not account for country of residence, healthcare access, or environmental factors like air quality',
                'Results should never be used to make medical decisions or as a substitute for professional health advice',
                'The model is most meaningful as a motivational tool to understand which habits matter most',
              ].map((item) => <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">{item}</li>)}
            </ul>
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Conclusion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              While no calculator can predict exactly how long you will live, understanding which lifestyle factors add or subtract years is genuinely empowering. The science is clear: regular exercise, a balanced diet, quality sleep, low stress, not smoking, and strong social relationships are the most powerful levers you have. Small, consistent improvements compound over decades into a significantly longer and healthier life.
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