import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const isBodyFatPage = location.pathname === "/blog/body-fat-percentage";
const BodyFatPercentage: React.FC = () => {

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tocItems = [
    { label: 'What is body fat percentage?',      id: 'what-is-bfp' },
    { label: 'Why it matters more than BMI',      id: 'vs-bmi' },
    { label: 'Healthy ranges by age & gender',    id: 'healthy-ranges' },
    { label: 'Body fat categories explained',     id: 'categories' },
    { label: 'What affects body fat %',           id: 'what-affects' },
    { label: 'How to reduce body fat',            id: 'how-to-reduce' },
    { label: 'Indian context',                    id: 'indian-context' },
    { label: 'The bottom line',                   id: 'conclusion' },
  ];

  return (
    <>
      <Helmet>
  {isBodyFatPage && (
    <title>
      Healthy Body Fat Percentage by Age and Gender – TheFitCalculator
    </title>
  )}

  {isBodyFatPage && (
    <meta
      name="description"
      content="What is a healthy body fat percentage for your age and gender? Learn the ranges, how to measure body fat at home, and how it differs for Indians."
    />
  )}

  {isBodyFatPage && (
    <link
      rel="canonical"
      href="https://thefitcalculator.com/blog/body-fat-percentage"
    />
  )}

  {isBodyFatPage && (
    <meta
      property="og:title"
      content="Healthy Body Fat Percentage by Age and Gender – TheFitCalculator"
    />
  )}

  {isBodyFatPage && (
    <meta
      property="og:description"
      content="Discover healthy body fat percentage ranges by age and gender and learn how to measure and improve your body composition."
    />
  )}

  {isBodyFatPage && (
    <meta
      property="og:url"
      content="https://thefitcalculator.com/blog/body-fat-percentage"
    />
  )}

  {isBodyFatPage && <meta property="og:type" content="article" />}
</Helmet>

      <style>{`html { scroll-padding-top: 80px; }`}</style>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">

          <article className="flex-1 min-w-0 space-y-6">

            {/* Header */}
            <div>
              <span className="inline-block bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                📏 Body Composition
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                Healthy Body Fat Percentage by Age and Gender
              </h1>
              <div className="flex flex-wrap items-center gap-4 py-3 border-t border-b border-gray-100 dark:border-gray-700 text-xs text-gray-400">
                <span>✍️ Sweta Singh</span>
                <span>🕐 7 min read</span>
                <span>📖 ~1,600 words</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-purple-700 dark:text-purple-300">Note:</strong> This article is for general information only. Body fat ranges are population-based estimates. Consult a doctor for a personal health assessment.
            </div>

            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">

              <p>
                Body fat percentage tells you how much of your total weight is fat versus everything else — muscle, bone, water, and organs. It is one of the most useful indicators of health and fitness, yet most people only track their weight or BMI, both of which can be deeply misleading.
              </p>

              {/* Section 1 */}
              <h2 id="what-is-bfp" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                What Is Body Fat Percentage?
              </h2>
              <p>
                Body fat percentage (BFP) is the proportion of your total body weight that comes from fat tissue. For example, if you weigh 70 kg and have 14 kg of fat, your body fat percentage is 20%.
              </p>
              <p>
                Not all body fat is the same. There are two main types:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { type: 'Essential fat', desc: 'The minimum fat needed for survival and normal body function — hormones, organ protection, nerve insulation. Men need at least 2–5%, women need 10–13% due to reproductive functions.', color: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20', label: 'text-blue-700 dark:text-blue-300' },
                  { type: 'Storage fat', desc: 'Fat accumulated beyond essential needs. Some is subcutaneous (under the skin) and relatively harmless. Visceral fat (around organs) is the dangerous kind — linked to diabetes, heart disease, and metabolic disorders.', color: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20', label: 'text-red-700 dark:text-red-300' },
                ].map((f) => (
                  <div key={f.type} className={`border rounded-xl p-4 ${f.color}`}>
                    <p className={`font-bold text-sm mb-1 ${f.label}`}>{f.type}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Section 2 */}
              <h2 id="vs-bmi" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Why Body Fat % Matters More Than BMI
              </h2>
              <p>
                BMI only measures the ratio of weight to height. It cannot distinguish between fat and muscle. Two people with identical BMI readings can have completely different body compositions — and therefore completely different health risks.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: 'Person A', weight: '80 kg', bmi: '26 — Overweight', muscle: 'High muscle (athlete)', fat: '12% body fat', risk: 'Low metabolic risk', good: true },
                  { name: 'Person B', weight: '80 kg', bmi: '26 — Overweight', muscle: 'Low muscle (sedentary)', fat: '32% body fat', risk: 'High metabolic risk', good: false },
                ].map((p) => (
                  <div key={p.name} className={`bg-white dark:bg-gray-800 border rounded-xl p-4 ${p.good ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'}`}>
                    <p className="font-bold text-gray-900 dark:text-white text-sm mb-2">{p.name}</p>
                    {[
                      { label: 'Weight', val: p.weight },
                      { label: 'BMI', val: p.bmi },
                      { label: 'Muscle', val: p.muscle },
                      { label: 'Body fat', val: p.fat },
                      { label: 'Risk', val: p.risk },
                    ].map((r) => (
                      <div key={r.label} className="flex justify-between text-xs py-0.5">
                        <span className="text-gray-500 dark:text-gray-400">{r.label}</span>
                        <span className={`font-semibold ${r.label === 'Risk' ? (p.good ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') : 'text-gray-700 dark:text-gray-300'}`}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <p>Both have the same BMI. Only body fat percentage reveals who is actually at risk.</p>

              {/* Section 3 */}
              <h2 id="healthy-ranges" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Healthy Body Fat Ranges by Age and Gender
              </h2>
              <p>
                Body fat ranges increase with age as metabolism slows and muscle mass naturally declines. Women naturally carry more essential fat than men due to hormonal and reproductive biology.
              </p>

              {/* Women table */}
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">👩 Women</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-purple-50 dark:bg-purple-900/30">
                        <th className="text-left px-3 py-2 font-bold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700">Age</th>
                        <th className="text-center px-3 py-2 font-bold text-blue-600 dark:text-blue-400 border border-gray-100 dark:border-gray-700">Athletic</th>
                        <th className="text-center px-3 py-2 font-bold text-green-600 dark:text-green-400 border border-gray-100 dark:border-gray-700">Healthy</th>
                        <th className="text-center px-3 py-2 font-bold text-amber-600 dark:text-amber-400 border border-gray-100 dark:border-gray-700">Acceptable</th>
                        <th className="text-center px-3 py-2 font-bold text-red-600 dark:text-red-400 border border-gray-100 dark:border-gray-700">Obese</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { age: '20–29', athletic: '14–17%', healthy: '17–24%', acceptable: '24–31%', obese: '31%+' },
                        { age: '30–39', athletic: '15–18%', healthy: '18–25%', acceptable: '25–32%', obese: '32%+' },
                        { age: '40–49', athletic: '17–20%', healthy: '20–27%', acceptable: '27–34%', obese: '34%+' },
                        { age: '50–59', athletic: '18–22%', healthy: '22–30%', acceptable: '30–36%', obese: '36%+' },
                        { age: '60+',   athletic: '19–23%', healthy: '23–31%', acceptable: '31–38%', obese: '38%+' },
                      ].map((r, i) => (
                        <tr key={r.age} className={i % 2 === 0 ? 'bg-gray dark:bg-gray-850' : 'bg-gray-50 dark:bg-gray-800'}>
                          <td className="px-3 py-2 font-semibold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700">{r.age}</td>
                          <td className="px-3 py-2 text-center text-blue-600 dark:text-blue-400 border border-gray-100 dark:border-gray-700">{r.athletic}</td>
                          <td className="px-3 py-2 text-center text-green-600 dark:text-green-400 font-semibold border border-gray-100 dark:border-gray-700">{r.healthy}</td>
                          <td className="px-3 py-2 text-center text-amber-600 dark:text-amber-400 border border-gray-100 dark:border-gray-700">{r.acceptable}</td>
                          <td className="px-3 py-2 text-center text-red-600 dark:text-red-400 border border-gray-100 dark:border-gray-700">{r.obese}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Men table */}
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">👨 Men</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-blue-50 dark:bg-blue-900/30">
                        <th className="text-left px-3 py-2 font-bold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700">Age</th>
                        <th className="text-center px-3 py-2 font-bold text-blue-600 dark:text-blue-400 border border-gray-100 dark:border-gray-700">Athletic</th>
                        <th className="text-center px-3 py-2 font-bold text-green-600 dark:text-green-400 border border-gray-100 dark:border-gray-700">Healthy</th>
                        <th className="text-center px-3 py-2 font-bold text-amber-600 dark:text-amber-400 border border-gray-100 dark:border-gray-700">Acceptable</th>
                        <th className="text-center px-3 py-2 font-bold text-red-600 dark:text-red-400 border border-gray-100 dark:border-gray-700">Obese</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { age: '20–29', athletic: '6–13%',  healthy: '13–20%', acceptable: '20–25%', obese: '25%+' },
                        { age: '30–39', athletic: '8–14%',  healthy: '14–21%', acceptable: '21–26%', obese: '26%+' },
                        { age: '40–49', athletic: '10–16%', healthy: '16–23%', acceptable: '23–28%', obese: '28%+' },
                        { age: '50–59', athletic: '11–17%', healthy: '17–24%', acceptable: '24–30%', obese: '30%+' },
                        { age: '60+',   athletic: '12–18%', healthy: '18–25%', acceptable: '25–31%', obese: '31%+' },
                      ].map((r, i) => (
                        <tr key={r.age} className={i % 2 === 0 ? 'bg-gray dark:bg-gray-850' : 'bg-gray-50 dark:bg-gray-800'}>
                          <td className="px-3 py-2 font-semibold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700">{r.age}</td>
                          <td className="px-3 py-2 text-center text-blue-600 dark:text-blue-400 border border-gray-100 dark:border-gray-700">{r.athletic}</td>
                          <td className="px-3 py-2 text-center text-green-600 dark:text-green-400 font-semibold border border-gray-100 dark:border-gray-700">{r.healthy}</td>
                          <td className="px-3 py-2 text-center text-amber-600 dark:text-amber-400 border border-gray-100 dark:border-gray-700">{r.acceptable}</td>
                          <td className="px-3 py-2 text-center text-red-600 dark:text-red-400 border border-gray-100 dark:border-gray-700">{r.obese}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 4 */}
              <h2 id="categories" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Body Fat Categories Explained
              </h2>
              <div className="space-y-2">
                {[
                  { cat: 'Essential fat', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', label: 'text-blue-700 dark:text-blue-300', desc: 'The minimum needed for survival. Going below this causes hormonal disruption, organ damage, and serious health consequences. Not a target — a floor.' },
                  { cat: 'Athletic',      color: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800', label: 'text-indigo-700 dark:text-indigo-300', desc: 'Typical of trained athletes and people who exercise regularly with high intensity. Excellent health markers, but difficult to maintain long-term without structured training.' },
                  { cat: 'Healthy',       color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', label: 'text-green-700 dark:text-green-300', desc: 'The ideal range for most people. Associated with good metabolic health, low disease risk, and sustainable energy levels. This is the target for most healthy adults.' },
                  { cat: 'Acceptable',    color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', label: 'text-amber-700 dark:text-amber-300', desc: 'Above ideal but not yet clinically obese. Metabolic risk begins to rise, especially if fat is concentrated around the abdomen. A prompt to take action, not a crisis.' },
                  { cat: 'Obese',         color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800', label: 'text-red-700 dark:text-red-300', desc: 'High excess fat associated with significantly elevated risk of type 2 diabetes, heart disease, hypertension, sleep apnea, and joint problems. Medical guidance recommended.' },
                ].map((c) => (
                  <div key={c.cat} className={`border rounded-xl p-3 ${c.color}`}>
                    <p className={`font-bold text-sm mb-1 ${c.label}`}>{c.cat}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{c.desc}</p>
                  </div>
                ))}
              </div>

              {/* Section 5 */}
              {/* <h2 id="how-to-measure" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                How to Measure Body Fat at Home
              </h2>
              <p>You don't need a lab to get a reasonable estimate. Here are the most practical methods:</p>
              <div className="space-y-3">
                {[
                  { method: 'Smart body composition scale', accuracy: 'Moderate', cost: '₹1,500–₹5,000', how: 'Sends a small electrical current through your body (bioelectrical impedance). Results vary based on hydration — measure at the same time each day for consistency.', rating: '⭐⭐⭐' },
                  { method: 'Waist-to-height ratio', accuracy: 'Good proxy', cost: 'Free', how: 'Divide your waist circumference by your height (both in same unit). A ratio below 0.5 is generally healthy. Simple and surprisingly accurate for metabolic risk assessment.', rating: '⭐⭐⭐⭐' },
                  { method: 'Skinfold callipers', accuracy: 'Good', cost: '₹300–₹800', how: 'Measures thickness of fat folds at specific body sites. Requires practice or a trained person to measure accurately. More reliable than scales if done correctly.', rating: '⭐⭐⭐⭐' },
                  { method: 'DEXA scan', accuracy: 'Most accurate', cost: '₹3,000–₹8,000', how: 'Gold standard. Available at some hospitals and fitness labs. Gives a detailed breakdown of fat, muscle, and bone density by body region.', rating: '⭐⭐⭐⭐⭐' },
                ].map((m) => (
                  <div key={m.method} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{m.method}</p>
                      <span className="text-xs">{m.rating}</span>
                    </div>
                    <div className="flex gap-4 mb-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Accuracy: <strong className="text-gray-700 dark:text-gray-300">{m.accuracy}</strong></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Cost: <strong className="text-gray-700 dark:text-gray-300">{m.cost}</strong></span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{m.how}</p>
                  </div>
                ))}
              </div> */}

              {/* Section 6 */}
              <h2 id="what-affects" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                What Affects Body Fat Percentage
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { factor: 'Age', desc: 'Muscle mass naturally declines from your 30s (sarcopenia). Fat tends to accumulate even if weight stays the same.' },
                  { factor: 'Gender', desc: 'Women need more essential fat due to oestrogen and reproductive biology. Female ranges are naturally 8–10% higher than male ranges.' },
                  { factor: 'Genetics', desc: 'Where your body stores fat — and how readily it does so — is partly genetic. Some people store more visceral fat; others store subcutaneous fat.' },
                  { factor: 'Diet', desc: 'Sustained calorie surplus, especially from refined carbohydrates and saturated fats, drives fat accumulation faster than muscle gain.' },
                  { factor: 'Exercise', desc: 'Resistance training builds muscle and raises BMR. Cardio burns calories. Both together reduce fat percentage more effectively than either alone.' },
                  { factor: 'Sleep & stress', desc: 'Poor sleep and high cortisol directly increase fat storage — particularly visceral fat — independent of diet and exercise habits.' },
                ].map((f) => (
                  <div key={f.factor} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3">
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{f.factor}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Section 7 */}
              <h2 id="how-to-reduce" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                How to Reduce Body Fat Percentage
              </h2>
              <div className="space-y-2">
                {[
                  { n: 1, title: 'Create a moderate calorie deficit', desc: 'Eat 300–500 kcal below your TDEE. This forces the body to use stored fat for energy without causing muscle loss.' },
                  { n: 2, title: 'Prioritise protein', desc: 'Eating 1.6–2.2g of protein per kg of body weight preserves muscle while losing fat — improving your body fat percentage even as weight drops.' },
                  { n: 3, title: 'Add resistance training', desc: 'Lifting weights or bodyweight training builds muscle. More muscle raises BMR and directly lowers your body fat percentage over time.' },
                  { n: 4, title: 'Include cardio for fat burning', desc: 'Moderate cardio (walking, cycling, swimming) 3–5 times per week accelerates fat loss without excessive muscle breakdown.' },
                  { n: 5, title: 'Fix sleep and manage stress', desc: 'Consistent 7–8 hours of sleep and lower cortisol levels directly reduce visceral fat accumulation — often without any change in diet.' },
                ].map((s) => (
                  <div key={s.n} className="flex gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                    <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{s.n}</div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{s.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 8 */}
              <h2 id="indian-context" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                What This Means for Indians
              </h2>
              <p>
                Standard body fat ranges were developed primarily from Western populations. For Indians, the same concerns that apply to BMI thresholds also apply here — South Asians tend to carry more visceral fat at lower body fat percentages.
              </p>
              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg p-4 text-sm">
                <strong className="text-amber-800 dark:text-amber-300">Key point for Indians:</strong> An Indian adult at 22% body fat may carry significantly more visceral fat than a European adult at 22% body fat — due to the thin-fat phenotype. Waist circumference remains the most practical additional check: above 90 cm for men and 80 cm for women signals high visceral fat risk regardless of total body fat percentage.
              </div>

              {/* Conclusion */}
              <h2 id="conclusion" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                The Bottom Line
              </h2>
              <p>
                Body fat percentage is a more complete picture of health than either weight or BMI alone. Aim for the healthy range for your age and gender, measure periodically using a consistent method, and combine this data with waist circumference for the most accurate self-assessment possible without a clinic visit.
              </p>

              {/* CTA */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                <p className="font-bold text-purple-700 dark:text-purple-300 mb-3">Know your health numbers:</p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/bmi-calculator" className="text-xs font-bold px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition">BMI Calculator →</Link>
                  <Link to="/bmr-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">BMR Calculator</Link>
                  <Link to="/calorie-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">Calorie Calculator</Link>
                  <Link to="/ideal-weight-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">Ideal Weight</Link>
                </div>
              </div>

              {/* <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">References</p>
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400 dark:text-gray-500">
                  <li>Gallagher, D. et al. (2000). Healthy percentage body fat ranges. <em>American Journal of Clinical Nutrition.</em></li>
                  <li>World Health Organization (2004). Appropriate BMI for Asian populations. <em>The Lancet.</em></li>
                  <li>Misra, A. & Khurana, L. (2011). Obesity in South Asians. <em>International Journal of Obesity.</em></li>
                  <li>ICMR. Nutrient Requirements and Recommended Dietary Allowances for Indians.</li>
                </ol>
              </div> */}

            </div>

            {/* Related Articles */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { to: '/blog/bmi-india-guide', title: 'BMI in India: What Your Number Really Means' },
                  { to: '/blog/bmr-vs-tdee', title: "BMR vs TDEE — What's the Difference?" },
                  { to: '/blog/calorie-intake-guide', title: 'Calorie Intake Guide for Weight Loss in India' },
                  { to: '/blog/weight-loss-without-starving', title: 'Lose Weight Without Starving' },
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
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">📋 In this article</h4>
              <ul className="space-y-1">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <button onClick={() => scrollTo(item.id)} className="w-full text-left flex gap-2 items-start px-2 py-1.5 rounded-lg text-xs text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all">
                      <span className="text-brand-500 flex-shrink-0 mt-0.5">›</span>{item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
          </aside>

        </div>
      </div>
    </>
  );
};

export { BodyFatPercentage };
export default BodyFatPercentage;