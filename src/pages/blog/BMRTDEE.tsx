import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
const isBMRvsTDEEPage = location.pathname === "/fitness-blog/bmr-vs-tdee";
const BMRvsTDEE: React.FC = () => {

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tocItems = [
    { label: 'What is BMR?',                      id: 'what-is-bmr' },
    { label: 'What is TDEE?',                     id: 'what-is-tdee' },
    { label: 'BMR vs TDEE — key difference',      id: 'difference' },
    { label: 'How BMR is calculated',             id: 'bmr-formula' },
    { label: 'Activity multipliers explained',    id: 'activity-multipliers' },
    { label: 'How to use these numbers',          id: 'how-to-use' },
    { label: 'Common mistakes',                   id: 'mistakes' },
    { label: 'Indian context',                    id: 'indian-context' },
    { label: 'The bottom line',                   id: 'conclusion' },
  ];

  return (
    <>
      <Helmet>
    <title>
      BMR vs TDEE — What's the Difference? – TheFitCalculator
    </title>
    <meta
      name="description"
      content="BMR and TDEE explained clearly. Learn what Basal Metabolic Rate and Total Daily Energy Expenditure mean, how they're calculated, and how to use them to reach your weight goal."
    />
    <link
      rel="canonical"
      href="https://thefitcalculator.com/fitness-blog/bmr-vs-tdee"
    />
    <meta
      property="og:title"
      content="BMR vs TDEE — What's the Difference? – TheFitCalculator"
    />
    <meta
      property="og:description"
      content="Understand the difference between BMR and TDEE and how they help manage calories, metabolism, and weight goals."
    />
    <meta
      property="og:url"
      content="https://thefitcalculator.com/fitness-blog/bmr-vs-tdee"
    />
  <meta property="og:type" content="article" />
</Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
      
              {/* Header */}
              <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                  <Link to="/fitness-blog" className="group flex items-center gap-3 text-gray-500 hover:text-brand-600 transition-all">
                    <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30 transition-colors">
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-l uppercase tracking-widest">Blog Page</span>
                  </Link>
      
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">Fitness</h1>
                    <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.3em]">Blog</span>
                  </div>
                </div>
              </header>
       <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">

          {/* MAIN CONTENT */}
          <article className="flex-1 min-w-0 space-y-6">

            {/* Header */}
            <div>
              <span className="inline-block bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                🔥 BMR Guide
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                BMR vs TDEE — What's the Difference and Why It Matters
              </h1>
              <div className="flex flex-wrap items-center gap-4 py-3 border-t border-b border-gray-100 dark:border-gray-700 text-xs text-gray-400">
                {/* <span>✍️ Sweta Singh</span> */}
                <span>🕐 7 min read</span>
                <span>📖 ~1,600 words</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-orange-700 dark:text-orange-300">Note:</strong> This article is for general informational purposes. Calorie needs vary between individuals. Consult a doctor or dietitian for personalised guidance.
            </div>

            {/* Body */}
            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">

              <p>
                If you have ever tried to figure out how many calories to eat, you have probably come across the terms BMR and TDEE. They are often used interchangeably — but they mean very different things. Using the wrong number can cause your entire calorie plan to be off by 500–1,000 calories per day.
              </p>

              {/* Section 1 */}
              <h2 id="what-is-bmr" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                What is BMR?
              </h2>
              <p>
                BMR stands for <strong className="text-gray-800 dark:text-gray-200">Basal Metabolic Rate</strong>. It is the number of calories your body burns at complete rest — just to keep you alive. Think of it as the energy your body needs to breathe, circulate blood, regulate temperature, and keep organs functioning if you did absolutely nothing all day.
              </p>

              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-2">Simple analogy</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  BMR is like the fuel a car uses just sitting idle with the engine running — no driving, no air conditioning, just the engine ticking over. It keeps you alive but does not account for any movement.
                </p>
              </div>

              <p>
                BMR is influenced by your age, height, weight, and gender. Muscle mass also plays a significant role — people with more muscle burn more calories at rest than people with more body fat at the same weight.
              </p>

              {/* Section 2 */}
              <h2 id="what-is-tdee" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                What is TDEE?
              </h2>
              <p>
                TDEE stands for <strong className="text-gray-800 dark:text-gray-200">Total Daily Energy Expenditure</strong>. It is the total number of calories you actually burn in a day — including all physical activity, exercise, and even the energy used to digest food.
              </p>

              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">Simple analogy</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  TDEE is the total fuel used for the whole day — idling, short trips, long highway drives, and everything in between. It reflects your real life, not just the baseline.
                </p>
              </div>

              <p>
                TDEE is always higher than BMR. For most people, TDEE is 1.2–1.9× their BMR depending on how active they are.
              </p>

              {/* Section 3 */}
              <h2 id="difference" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                BMR vs TDEE — The Key Difference
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="text-left px-3 py-2 font-bold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-600">Factor</th>
                      <th className="text-left px-3 py-2 font-bold text-orange-600 dark:text-orange-400 border border-gray-100 dark:border-gray-600">BMR</th>
                      <th className="text-left px-3 py-2 font-bold text-brand-600 dark:text-brand-400 border border-gray-100 dark:border-gray-600">TDEE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { factor: 'What it measures', bmr: 'Calories burned at complete rest', tdee: 'Total calories burned in a real day' },
                      { factor: 'Includes exercise?', bmr: 'No', tdee: 'Yes' },
                      { factor: 'Includes daily movement?', bmr: 'No', tdee: 'Yes' },
                      { factor: 'Includes digestion?', bmr: 'No', tdee: 'Yes' },
                      { factor: 'Used for', bmr: 'Understanding your baseline', tdee: 'Planning your actual calorie intake' },
                      { factor: 'Relative value', bmr: 'Lower number', tdee: 'Always higher than BMR' },
                    ].map((r, i) => (
                      <tr key={r.factor} className={i % 2 === 0 ? 'bg-gray dark:bg-gray-850' : 'bg-gray-90 dark:bg-gray-750'}>
                        <td className="px-3 py-2 font-medium text-gray-750 dark:text-gray-350 border border-gray-100 dark:border-gray-700">{r.factor}</td>
                        <td className="px-3 py-2 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700">{r.bmr}</td>
                        <td className="px-3 py-2 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700">{r.tdee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg p-4 text-sm">
                <strong className="text-red-700 dark:text-red-300">Common mistake:</strong> Many people calculate their BMR and eat at that number, thinking it is their daily calorie need. It is not — BMR is just the starting point. Eating at your BMR while being active creates a much larger deficit than intended and can cause fatigue, muscle loss, and metabolic slowdown.
              </div>

              {/* Section 4 */}
              <h2 id="bmr-formula" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                How BMR is Calculated
              </h2>
              <p>
                The most widely used formula is the <strong className="text-gray-800 dark:text-gray-200">Mifflin-St Jeor equation</strong>, which is considered more accurate than older formulas for most adults:
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    gender: '👨 Men',
                    formula: 'BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5',
                    example: 'Man, 30 years, 75 kg, 175 cm → BMR = 750 + 1093.75 − 150 + 5 = 1,699 kcal',
                  },
                  {
                    gender: '👩 Women',
                    formula: 'BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161',
                    example: 'Woman, 28 years, 60 kg, 162 cm → BMR = 600 + 1012.5 − 140 − 161 = 1,311 kcal',
                  },
                ].map((f) => (
                  <div key={f.gender} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                    <p className="font-bold text-gray-900 dark:text-white text-sm mb-2">{f.gender}</p>
                    <p className="text-xs font-mono bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-brand-600 dark:text-brand-400 mb-2 leading-relaxed">{f.formula}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400"><strong className="text-gray-700 dark:text-gray-300">Example:</strong> {f.example}</p>
                  </div>
                ))}
              </div>

              <p>
                You don't need to do this manually — the <Link to="/bmr-calculator" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">BMR Calculator</Link> does it instantly with your measurements.
              </p>

              {/* Section 5 */}
              <h2 id="activity-multipliers" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Activity Multipliers — How BMR Becomes TDEE
              </h2>
              <p>
                To get your TDEE, multiply your BMR by an activity factor that reflects your daily lifestyle:
              </p>

              <div className="space-y-2">
                {[
                  { level: 'Sedentary', desc: 'Desk job, little or no exercise', multiplier: '× 1.2', example: 'BMR 1,700 → TDEE ~2,040 kcal' },
                  { level: 'Lightly active', desc: 'Light exercise 1–3 days/week', multiplier: '× 1.375', example: 'BMR 1,700 → TDEE ~2,338 kcal' },
                  { level: 'Moderately active', desc: 'Moderate exercise 3–5 days/week', multiplier: '× 1.55', example: 'BMR 1,700 → TDEE ~2,635 kcal' },
                  { level: 'Very active', desc: 'Hard exercise 6–7 days/week', multiplier: '× 1.725', example: 'BMR 1,700 → TDEE ~2,933 kcal' },
                  { level: 'Extra active', desc: 'Physical job + hard daily training', multiplier: '× 1.9', example: 'BMR 1,700 → TDEE ~3,230 kcal' },
                ].map((a) => (
                  <div key={a.level} className="flex gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 items-center">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{a.level}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{a.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-extrabold text-brand-600 dark:text-brand-400">{a.multiplier}</p>
                      <p className="text-xs text-gray-400">{a.example}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg p-4 text-sm">
                <strong className="text-amber-800 dark:text-amber-300">Tip for Indians:</strong> Most office workers fall into "sedentary" or "lightly active" — not "moderately active" as many assume. Overestimating your activity level is one of the most common reasons calorie plans fail.
              </div>

              {/* Section 6 */}
              <h2 id="how-to-use" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                How to Use BMR and TDEE to Reach Your Goal
              </h2>

              <div className="space-y-3">
                {[
                  {
                    goal: '🎯 Lose weight',
                    color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
                    titleColor: 'text-red-700 dark:text-red-300',
                    steps: [
                      'Calculate your TDEE',
                      'Subtract 300–500 kcal from your TDEE',
                      'This is your daily calorie target',
                      'Never eat below your BMR without medical supervision',
                    ],
                    example: 'TDEE 2,200 kcal → eat 1,700–1,900 kcal/day → lose ~0.4–0.5 kg/week',
                  },
                  {
                    goal: '⚖️ Maintain weight',
                    color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
                    titleColor: 'text-blue-700 dark:text-blue-300',
                    steps: [
                      'Calculate your TDEE',
                      'Eat at your TDEE number',
                      'Adjust slightly if weight drifts up or down over weeks',
                    ],
                    example: 'TDEE 2,200 kcal → eat 2,200 kcal/day → weight stays stable',
                  },
                  {
                    goal: '💪 Gain muscle',
                    color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
                    titleColor: 'text-green-700 dark:text-green-300',
                    steps: [
                      'Calculate your TDEE',
                      'Add 200–300 kcal above TDEE',
                      'Ensure high protein intake (1.6–2.2g per kg body weight)',
                      'Combine with resistance training',
                    ],
                    example: 'TDEE 2,200 kcal → eat 2,400–2,500 kcal/day → gradual lean muscle gain',
                  },
                ].map((g) => (
                  <div key={g.goal} className={`border rounded-xl p-4 ${g.color}`}>
                    <p className={`font-bold text-sm mb-2 ${g.titleColor}`}>{g.goal}</p>
                    <ul className="space-y-1 mb-3">
                      {g.steps.map((s, i) => (
                        <li key={i} className="flex gap-2 text-xs text-gray-600 dark:text-gray-300">
                          <span className="text-brand-500 flex-shrink-0">{i + 1}.</span>{s}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-black/20 rounded-lg px-2 py-1.5">
                      📌 {g.example}
                    </p>
                  </div>
                ))}
              </div>

              {/* Section 7 */}
              <h2 id="mistakes" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Common Mistakes When Using BMR and TDEE
              </h2>
              <div className="space-y-2">
                {[
                  { n: 1, mistake: 'Eating at BMR instead of TDEE', fix: 'BMR is not your calorie target. Always calculate TDEE and set your intake relative to that.' },
                  { n: 2, mistake: 'Overestimating activity level', fix: 'If you sit at a desk and walk 3,000 steps a day, you are sedentary — not lightly active. Be honest with your activity multiplier.' },
                  { n: 3, mistake: 'Not adjusting as weight changes', fix: 'As your weight drops, your BMR drops too. Recalculate every 4–6 weeks or when you notice a plateau.' },
                  { n: 4, mistake: 'Treating these as exact numbers', fix: 'BMR and TDEE are estimates with a margin of error of 10–15%. Use them as a starting point and adjust based on real results.' },
                  { n: 5, mistake: 'Ignoring non-exercise activity', fix: 'Fidgeting, standing, walking around the house — this "NEAT" (Non-Exercise Activity Thermogenesis) can add or remove 200–500 kcal/day.' },
                ].map((m) => (
                  <div key={m.n} className="flex gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                    <div className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold flex-shrink-0">{m.n}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{m.mistake}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Fix: {m.fix}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 8 */}
              <h2 id="indian-context" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Why This Matters Specifically for Indians
              </h2>
              <p>
                Research on South Asian populations has found that Indians tend to have a lower BMR relative to body weight compared to Western populations — partly due to lower muscle mass and the "thin-fat" body composition pattern discussed in the <Link to="/fitness-blog/bmi-india-guide" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">BMI India guide</Link>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: 'Lower muscle mass = lower BMR', desc: 'Muscle burns roughly 3× more calories at rest than fat. Indians with low muscle mass have lower resting calorie burn — meaning their TDEE is also lower.' },
                  { title: 'Sedentary lifestyle amplifies this', desc: 'A desk-working Indian adult with low activity may have a TDEE of just 1,600–1,900 kcal — leaving little room for error in a weight loss plan.' },
                  { title: 'Standard formulas may overestimate', desc: 'BMR formulas were developed on Western populations. For some Indians, actual BMR may be 5–10% lower than what the formula predicts.' },
                  { title: 'Protein is especially important', desc: 'Eating adequate protein while in a deficit is critical for Indians to preserve muscle and avoid further lowering BMR over time.' },
                ].map((item) => (
                  <div key={item.title} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3">
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <h2 id="conclusion" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                The Bottom Line
              </h2>
              <p>
                BMR is what your body burns doing nothing. TDEE is what it burns living your actual life. Your calorie intake should always be set relative to TDEE — not BMR. Calculate both, choose the right activity multiplier honestly, and adjust every few weeks based on actual results rather than sticking rigidly to a fixed number.
              </p>

              {/* Quick summary */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'BMR', desc: 'Calories burned at rest. Your biological minimum. Never eat at this number while active.', color: 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20', textColor: 'text-orange-700 dark:text-orange-300' },
                  { label: 'TDEE', desc: 'Total calories burned daily. Your real starting point for any calorie plan.', color: 'border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/20', textColor: 'text-brand-700 dark:text-brand-300' },
                ].map((s) => (
                  <div key={s.label} className={`border rounded-xl p-4 ${s.color}`}>
                    <p className={`text-lg font-extrabold mb-1 ${s.textColor}`}>{s.label}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
                <p className="font-bold text-orange-700 dark:text-orange-300 mb-3">Calculate your BMR now:</p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/bmr-calculator" className="text-xs font-bold px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition">BMR Calculator →</Link>
                  <Link to="/calorie-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">Calorie Calculator</Link>
                  <Link to="/bmi-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">BMI Calculator</Link>
                  <Link to="/ideal-weight-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">Ideal Weight</Link>
                 <Link to="/water-intake-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">Water Intake Calculator</Link>
                  <Link to="/weight-loss-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">Weight Loss Calculator</Link>
                   <Link to="/body-fat-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">Body Fat Calculator</Link>
                   <Link to="/protein-intake-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">Protein Intake Calculator</Link>
                </div>
              </div>

              {/* References */}
              {/* <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">References</p>
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400 dark:text-gray-500">
                  <li>Mifflin, M.D. et al. (1990). A new predictive equation for resting energy expenditure in healthy individuals. <em>American Journal of Clinical Nutrition.</em></li>
                  <li>Harris, J.A. & Benedict, F.G. (1918). A biometric study of human basal metabolism. <em>PNAS.</em></li>
                  <li>Deurenberg, P. et al. (2002). Validation of a prediction equation for fat mass using ethnicity-specific constants. <em>Asia Pacific Journal of Clinical Nutrition.</em></li>
                  <li>Indian Council of Medical Research (ICMR). Nutrient Requirements and Recommended Dietary Allowances for Indians.</li>
                </ol>
              </div> */}

            </div>

            {/* Related Articles */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { to: '/fitness-blog/calorie-intake-guide', title: 'Calorie Intake Guide for Weight Loss in India' },
                  { to: '/fitness-blog/bmi-india-guide', title: 'BMI in India: What Your Number Really Means' },
                  { to: '/fitness-blog/body-fat-percentage', title: 'Healthy Body Fat % by Age & Gender' },
                  { to: '/fitness-blog/weight-loss-without-starving', title: 'Lose Weight Without Starving' },
                ].map((a) => (
                  <Link key={a.to} to={a.to} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition flex items-center justify-between gap-2">
                    {a.title} <span className="text-brand-500 flex-shrink-0">→</span>
                  </Link>
                ))}
              </div>
            </div>
            
          </article>

          {/* STICKY SIDEBAR */}
          <aside className="hidden lg:flex flex-col gap-4 w-56 flex-shrink-0 sticky top-24">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4">
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
                📋 In this article
              </h4>
              <ul className="space-y-1">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="w-full text-left flex gap-2 items-start px-2 py-1.5 rounded-lg text-xs text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
                    >
                      <span className="text-brand-500 flex-shrink-0 mt-0.5">›</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
         </div>
        </div>
      </div>
    </>
  );
};

export { BMRvsTDEE };
export default BMRvsTDEE;