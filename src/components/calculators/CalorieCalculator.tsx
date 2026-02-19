import React, { useState } from 'react';
import { calculateDailyCalories } from '../../../utils/calculations';
import { ActivityLevel, WeightGoal } from '../../../types';
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

export const CalorieCalculator: React.FC = () => {
  const [bmr, setBmr] = useState<string>('');
  const [activity, setActivity] = useState<ActivityLevel>(ActivityLevel.Sedentary);
  const [goal, setGoal] = useState<WeightGoal>(WeightGoal.Maintain);
  const [result, setResult] = useState<number | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
 const location = useLocation();
  const isCalculatorPage = location.pathname === "/calorie-calculator";


  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bmr) return;

    const bmrVal = parseFloat(bmr);
    const calories = calculateDailyCalories(bmrVal, activity, goal);
    setResult(calories);

    // @ts-ignore
    window.gtag?.('event', 'calculate_calories', {
      calorie_goal: goal,
      activity_level: activity,
    });
  };

  const handleReset = () => {
    setBmr('');
    setActivity(ActivityLevel.Sedentary);
    setGoal(WeightGoal.Maintain);
    setResult(null);
  };

  const goalLabel =
    goal === WeightGoal.Loss ? 'Lose Weight' : goal === WeightGoal.Gain ? 'Gain Weight' : 'Maintain Weight';

  const faqs = [
    {
      question: 'How many calories should I eat per day?',
      answer:
        'Your daily calorie needs depend on your age, sex, weight, height, and activity level. For most adults, daily needs range from around 1,600 to 3,000 calories. This calculator gives you a personalised estimate based on your BMR and chosen activity level. For weight loss, you would eat slightly less than this target; for muscle gain, slightly more.',
    },
    {
      question: 'Is 1,200 calories per day safe?',
      answer:
        'A 1,200 calorie/day diet is considered a very low calorie intake and is not appropriate for most people, especially men, taller women, or anyone who is physically active. Eating this low for extended periods can cause muscle loss, nutrient deficiencies, and metabolic adaptation (where your body slows down to conserve energy). Most registered dietitians recommend staying above your BMR and creating a moderate deficit of 300–500 calories below your TDEE instead.',
    },
    {
      question: 'How fast can I lose weight with a calorie deficit?',
      answer:
        'A daily deficit of approximately 500 calories below your TDEE will result in roughly 0.5 kg (1 pound) of fat loss per week — a rate widely considered safe and sustainable. More aggressive deficits (750–1,000 calories/day below TDEE) can accelerate loss but increase the risk of muscle loss and nutritional gaps. The best approach is a moderate deficit combined with adequate protein intake and regular exercise.',
    },
    {
      question: 'What is TDEE and how is it different from BMR?',
      answer:
        'BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest to sustain basic biological functions. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by an activity factor to account for the calories you burn through movement and exercise throughout the day. TDEE is the number you actually use to set calorie targets — eating at your TDEE maintains your weight, below it causes weight loss, and above it causes weight gain.',
    },
    {
      question: 'What activity level should I choose?',
      answer:
        'Choose the level that honestly reflects your typical week, not your ideal week. Sedentary means a desk job with little or no intentional exercise. Lightly active means 1–3 light workouts per week (e.g. casual walks or yoga). Moderately active means 3–5 days of genuine exercise. Very active means hard training 6–7 days a week. Extra active means twice-daily training or a physically demanding job like construction. Most people overestimate their activity level — when in doubt, go one level lower and adjust based on results.',
    },
    {
      question: 'Should I eat back the calories I burn during exercise?',
      answer:
        'This depends on how your target was calculated. If you already selected a high activity level (e.g. Very Active), your TDEE estimate already accounts for those calories burned — you should not eat them back. If you used a lower activity level as your base, then yes, some additional calories on heavy workout days can be appropriate. A practical approach is to set your activity level to reflect your non-gym days, then add roughly 50–70% of the calories burned during exercise sessions.',
    },
    {
      question: 'How do I adjust my calories if I stop losing weight?',
      answer:
        'Weight loss plateaus happen because your TDEE decreases as you lose weight and your body adapts to a lower calorie intake. When progress stalls for 2–3 weeks, you have two options: reduce calories by a further 100–200 kcal/day, or increase your activity level to create a larger deficit. Recalculating your BMR and TDEE at your new weight is also recommended every 5–10 kg of weight change, as the numbers will have shifted.',
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
        <title>Calorie Calculator - Calculate Your Daily Calorie Needs Free</title>
        {isCalculatorPage && (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )}
        <meta
          name="description"
          content="Calculate your daily calorie needs based on your BMR and activity level. Free online calorie calculator for weight loss, maintenance, and muscle gain."
        />
        <link rel="canonical" href="https://thefitcalculator.com/calorie-calculator" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Page Title ── */}
        <div className="text-center pb-2">
          {/* <span className="inline-block bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Free Online Tool</span> */}
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Daily Calorie Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg mx-auto">Enter your BMR and activity level to calculate exactly how many calories you need each day to reach your weight goal.</p>
        </div>

        {/* ── Calculator Card ── */}
        <section id="calorie-calculator" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">Daily Calorie Calculator (TDEE)</h2>
            <p className="text-brand-100 text-xs mt-0.5">Based on your BMR and activity level</p>
          </div>

          <div className="p-6">

            {/* Tip banner */}
            <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 mb-6">
              <span className="text-amber-500 text-sm mt-0.5">💡</span>
              <p className="text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
                <strong>Don't know your BMR?</strong> Use our{' '}
                <a href="/bmr-calculator" className="underline text-blue-500 font-bold hover:text-green-600 dark:hover:text-amber-200 transition-colors">
                  BMR Calculator
                </a>{' '}
                first to get your Basal Metabolic Rate, then enter it below.
              </p>
            </div>

            <form onSubmit={handleCalculate} className="space-y-5">

              {/* BMR Input */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Your BMR (calories / day)
                </label>
                <input
                  type="number"
                  value={bmr}
                  onChange={(e) => setBmr(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                  placeholder="e.g. 1800"
                  required
                  min="500"
                />
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Activity Level
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(parseFloat(e.target.value) as ActivityLevel)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition text-sm"
                >
                  <option value={ActivityLevel.Sedentary}>Sedentary — little or no exercise</option>
                  <option value={ActivityLevel.LightlyActive}>Lightly Active — exercise 1–3 days/week</option>
                  <option value={ActivityLevel.ModeratelyActive}>Moderately Active — exercise 3–5 days/week</option>
                  <option value={ActivityLevel.VeryActive}>Very Active — hard exercise 6–7 days/week</option>
                  <option value={ActivityLevel.ExtraActive}>Extra Active — very hard exercise or physical job</option>
                </select>
              </div>

              {/* Weight Goal */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Weight Goal
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Lose Weight', value: WeightGoal.Loss, desc: '−500 kcal' },
                    { label: 'Maintain', value: WeightGoal.Maintain, desc: 'at TDEE' },
                    { label: 'Gain Weight', value: WeightGoal.Gain, desc: '+500 kcal' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setGoal(item.value)}
                      className={`py-3 px-2 text-xs font-bold rounded-xl transition-all border flex flex-col items-center gap-0.5 ${
                        goal === item.value
                          ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className={`text-[10px] font-normal ${goal === item.value ? 'text-brand-100' : 'text-gray-400 dark:text-gray-500'}`}>{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-200 dark:shadow-none text-sm"
                >
                  Calculate Calories
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


                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Your Daily Target — {goalLabel}</p>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-6xl font-extrabold text-brand-700 dark:text-brand-400 leading-none">{Math.round(result)}</span>
                  <span className="text-xl font-bold mb-1 text-brand-600 dark:text-brand-400">calories / day</span>
                </div>

                {/* Macro suggestion cards */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'Protein', pct: 30, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-800', gPerKcal: 4 },
                    { label: 'Carbs', pct: 45, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-100 dark:border-yellow-800', gPerKcal: 4 },
                    { label: 'Fats', pct: 25, color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-100 dark:border-red-800', gPerKcal: 9 },
                  ].map((macro) => (
                    <div key={macro.label} className={`rounded-xl p-3 border text-center ${macro.bg} ${macro.border}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${macro.color}`}>{macro.label}</p>
                      <p className={`text-base font-extrabold ${macro.color}`}>{Math.round((result * macro.pct / 100) / macro.gPerKcal)}g</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">{macro.pct}% of calories</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 italic">
                  Suggested macro split (30/45/25). Adjust based on your personal dietary preferences.
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {goal === WeightGoal.Loss && 'This includes a caloric deficit of approximately 500 calories below your TDEE to support steady, sustainable fat loss of around 0.5 kg per week.'}
                  {goal === WeightGoal.Gain && 'This includes a caloric surplus of approximately 500 calories above your TDEE to support muscle and weight gain of around 0.5 kg per week.'}
                  {goal === WeightGoal.Maintain && 'This represents your Total Daily Energy Expenditure (TDEE) — the number of calories needed to maintain your current weight at your activity level.'}
                </p>

                <div className="mt-4 pt-4 border-t border-brand-100 dark:border-brand-800 flex flex-wrap justify-between items-center gap-2">
                  <button
                    onClick={() => {
                      const shareText = `My daily calorie target is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/calorie-calculator`;
                      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                      if (isMobile && navigator.share) {
                        navigator.share({ title: 'My Daily Calorie Result', text: shareText }).catch(() => {});
                      } else {
                        setShowShareOptions(true);
                      }
                    }}
                    className="text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    ↗ Share Results
                  </button>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 italic">*Individual results may vary. Consult a nutritionist.</span>
                </div>

                {showShareOptions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href={`https://wa.me/?text=${encodeURIComponent(`My daily calorie target is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/calorie-calculator`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold">WhatsApp</a>
                    <a href={`https://t.me/share/url?text=${encodeURIComponent(`My daily calorie target is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/calorie-calculator`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-semibold">Telegram</a>
                    <a href={`mailto:?subject=My Daily Calorie Result&body=${encodeURIComponent(`My daily calorie target is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/calorie-calculator`)}`} className="px-3 py-2 bg-gray-700 text-white rounded-lg text-xs font-semibold">Email</a>
                    <button onClick={() => { navigator.clipboard.writeText(`My daily calorie target is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/calorie-calculator`); alert('Copied to clipboard!'); }} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-xs font-semibold">Copy</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Content Section ── */}
        <section className="space-y-6">

          {/* What is a calorie calculator */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              What is a Calorie Calculator?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              A calorie calculator estimates the number of calories your body needs each day based on your Basal Metabolic Rate (BMR) and how physically active you are. The result — your Total Daily Energy Expenditure (TDEE) — is the number of calories you need to maintain your current weight. From there, you can apply a deficit or surplus to lose or gain weight in a controlled, evidence-based way.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Understanding Your Daily Calorie Needs
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Your daily calorie need is not a fixed number — it changes as your weight, age, muscle mass, and activity level change. This is why periodic recalculation is important, especially during periods of active weight loss or gain. Most people underestimate how many calories they burn and overestimate how many they consume, which is why using a calculated target rather than guessing leads to better results.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Caloric Goals by Objective
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { title: 'Weight Loss', badge: '−500 kcal/day', desc: 'Eating roughly 500 calories below your TDEE creates a weekly deficit of 3,500 kcal — approximately equivalent to 0.5 kg of fat loss per week.', color: 'border-blue-300 dark:border-blue-700', bg: 'bg-blue-50 dark:bg-blue-900/20', hColor: 'text-blue-700 dark:text-blue-300' },
                { title: 'Maintenance', badge: 'At TDEE', desc: 'Eating at your TDEE keeps your weight stable. This is the foundation for body recomposition — building muscle while maintaining weight.', color: 'border-green-300 dark:border-green-700', bg: 'bg-green-50 dark:bg-green-900/20', hColor: 'text-green-700 dark:text-green-300' },
                { title: 'Weight Gain', badge: '+500 kcal/day', desc: 'A 500 calorie daily surplus, combined with resistance training, supports lean muscle gain of around 0.5 kg per week.', color: 'border-yellow-300 dark:border-yellow-700', bg: 'bg-yellow-50 dark:bg-yellow-900/20', hColor: 'text-yellow-700 dark:text-yellow-300' },
              ].map((card) => (
                <div key={card.title} className={`rounded-xl p-4 border-l-4 ${card.bg} ${card.color}`}>
                  <p className={`text-sm font-bold mb-0.5 ${card.hColor}`}>{card.title}</p>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">{card.badge}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How it's calculated */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How is Daily Calorie Need Calculated?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Your daily calorie target is calculated in two steps: first your BMR is determined, then it is multiplied by an activity factor to estimate TDEE.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">Step 1 — BMR (Mifflin-St Jeor)</p>
                <p className="text-gray-600 dark:text-gray-300 font-bold text-sm leading-relaxed mb-1">Men: (10 × kg) + (6.25 × cm) − (5 × age) + 5</p>
                <p className="text-gray-600 dark:text-gray-300 font-bold text-sm leading-relaxed">Women: (10 × kg) + (6.25 × cm) − (5 × age) − 161</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">Step 2 — Activity Multiplier</p>
                <div className="space-y-1">
                  {[
                    { l: 'Sedentary', m: '× 1.2' },
                    { l: 'Lightly Active', m: '× 1.375' },
                    { l: 'Moderately Active', m: '× 1.55' },
                    { l: 'Very Active', m: '× 1.725' },
                    { l: 'Extra Active', m: '× 1.9' },
                  ].map((r) => (
                    <div key={r.l} className="flex justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-300">{r.l}</span>
                      <span className="font-bold text-brand-600 dark:text-brand-400">{r.m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-400 rounded-full inline-block"></span>
              Worked Example
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-200 dark:border-gray-600 text-sm">
              <p className="font-bold text-gray-800 dark:text-gray-100 mb-2">Male, 70 kg, 175 cm, 25 years old — Moderately Active:</p>
              <p className="text-gray-600 dark:text-gray-300 leading-loose">
                Step 1: BMR = (10 × 70) + (6.25 × 175) − (5 × 25) + 5 = <strong className="text-gray-800 dark:text-gray-100">1,674 kcal/day</strong><br />
                Step 2: TDEE = 1,674 × 1.55 = <strong className="text-brand-700 dark:text-brand-400">2,595 kcal/day</strong><br />
                To lose weight: 2,595 − 500 = <strong className="text-blue-600 dark:text-blue-400">2,095 kcal/day</strong><br />
                To gain weight: 2,595 + 500 = <strong className="text-yellow-600 dark:text-yellow-400">3,095 kcal/day</strong>
              </p>
            </div>
          </div>

          {/* Macros & Tips */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Understanding Macronutrients
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Once you know your calorie target, the next step is distributing those calories across the three macronutrients. The right split depends on your goal, but a general starting point used by many registered dietitians is:
            </p>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/60">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Macro</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Calories per gram</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">General target</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Key function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { macro: 'Protein', kcal: '4 kcal/g', target: '25–35%', fn: 'Muscle repair, satiety, immune function', dot: 'bg-blue-400', color: 'text-blue-600 dark:text-blue-400' },
                    { macro: 'Carbohydrates', kcal: '4 kcal/g', target: '40–55%', fn: 'Primary energy source, brain function', dot: 'bg-yellow-400', color: 'text-yellow-600 dark:text-yellow-400' },
                    { macro: 'Fats', kcal: '9 kcal/g', target: '20–35%', fn: 'Hormones, fat-soluble vitamins, cell health', dot: 'bg-red-400', color: 'text-red-500 dark:text-red-400' },
                  ].map((row) => (
                    <tr key={row.macro} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className={`px-4 py-3 font-semibold ${row.color}`}>
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.dot}`}></span>
                          {row.macro}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{row.kcal}</td>
                      <td className="px-4 py-3 text-brand-600 dark:text-brand-400 font-bold">{row.target}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{row.fn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Tips for Healthy Calorie Management
            </h2>
            <ul className="space-y-2">
              {[
                'Focus on whole, nutrient-dense foods — vegetables, lean proteins, whole grains, and healthy fats provide more satiety per calorie than processed foods',
                'Eat adequate protein at every meal — it has the highest thermic effect of all macros and helps preserve muscle during weight loss',
                'Stay hydrated — thirst is commonly mistaken for hunger, leading to unnecessary calorie consumption',
                'Exercise regularly — both cardio and strength training increase your TDEE and improve body composition',
                'Avoid extreme calorie restrictions — eating below your BMR for extended periods triggers metabolic adaptation and muscle loss',
                'Track your intake honestly for at least 2–4 weeks — data-driven adjustments are far more effective than guesswork',
              ].map((item) => (
                <li key={item}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5 marker:text-gray">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Limitations of Calorie Calculators
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
              Calorie calculators provide useful estimates, but they are not perfectly accurate for every individual:
            </p>
            <ul className="space-y-2 mb-5">
              {[
                'Activity multipliers are averages — individual variation means actual TDEE can differ by 10–20% from the estimate',
                'Do not account for non-exercise activity thermogenesis (NEAT) — unconscious movement like fidgeting varies widely between people',
                'Metabolic adaptation means your TDEE decreases as you lose weight, requiring regular recalculation',
                'Hormonal conditions (e.g. hypothyroidism, PCOS) can significantly lower actual metabolic rate',
                'Food label calorie counts have a legally permitted margin of error of up to 20% in many countries',
              ].map((item) => (
                <li key={item}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5 marker:text-gray">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Conclusion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Knowing your daily calorie target is one of the most practical tools in any nutrition or fitness plan. Whether your goal is weight loss, muscle gain, or simply eating better, a calorie calculator gives you a solid, evidence-based starting point. Use our free calorie calculator above to find your personalised target, then adjust over time based on real results. For best outcomes, pair this with a registered dietitian or nutritionist for tailored guidance.
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