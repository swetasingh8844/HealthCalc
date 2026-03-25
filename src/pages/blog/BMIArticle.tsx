import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
const isBMIBlogPage = location.pathname === "/fitness-blog/bmi-india-guide";
const BMIArticle: React.FC = () => {

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tocItems = [
    { label: 'Where BMI came from',        id: 'where-bmi-came-from' },
    { label: 'Wrong numbers for Indians',  id: 'wrong-numbers' },
    { label: 'The thin-fat problem',       id: 'thin-fat' },
    { label: 'Waist circumference',        id: 'waist' },
    { label: 'What to do next',            id: 'action-plan' },
    { label: 'Indian lifestyle factors',   id: 'lifestyle' },
    { label: 'The bottom line',            id: 'conclusion' },
  ];

  return (
    <>
      <Helmet>
    <title>
      BMI in India: What Your Number Really Means for South Asians – TheFitCalculator
    </title>
    <meta
      name="description"
      content="Why standard BMI ranges may not be accurate for Indians. Learn about South Asian BMI thresholds, visceral fat risks, and what to do after you know your BMI."
    />
    <link
      rel="canonical"
      href="https://thefitcalculator.com/fitness-blog/bmi-india-guide"
    />
    <meta
      property="og:title"
      content="BMI in India: What Your Number Really Means for South Asians – TheFitCalculator"
    />
    <meta
      property="og:description"
      content="Why BMI ranges may not be accurate for Indians and South Asians."
    />
    <meta
      property="og:url"
      content="https://thefitcalculator.com/fitness-blog/bmi-india-guide"
    />
 <meta property="og:type" content="article" />
</Helmet>

      {/* Add scroll-padding so sticky header doesn't cover the heading */}
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
              <span className="inline-block bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                📊 BMI Guide
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                BMI in India: What Your Number Really Means for South Asians
              </h1>
              <div className="flex flex-wrap items-center gap-4 py-3 border-t border-b border-gray-100 dark:border-gray-700 text-xs text-gray-400">
                {/* <span>✍️ Sweta Singh</span> */}
                <span>🕐 8 min read</span>
                <span>📖 ~1,800 words</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-blue-700 dark:text-blue-300">Note:</strong> This article is for informational purposes only and does not replace medical advice. Consult a doctor for personal health decisions.
            </div>

            {/* Body */}
            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">

              <p>
               Most Indians have checked their BMI at some point — but the number can be confusing. The standard BMI chart was not made keeping Indian bodies in mind. So if you rely on it alone, you might think your health is fine when it actually may not be.
              </p>

              {/* Section 1 */}
              <h2 id="where-bmi-came-from" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Where BMI Came From
              </h2>
              <p>
                BMI was created in the 1830s by a Belgian mathematician named Adolphe Quetelet. He was not a doctor. He made it using data from European men only. In the 1970s, doctors started using it as a health tool worldwide. The problem is nobody tested it on South Asian people before making it a global standard. But it became one anyway.
              </p>
              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg p-4 text-sm">
                <strong className="text-amber-800 dark:text-amber-300">Worth knowing:</strong> The BMI cutoffs most doctors still use today are based entirely on 19th-century European data.
              </div>

              {/* Section 2 */}
              <h2 id="wrong-numbers" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Why the Standard Numbers Are Wrong for Indians
              </h2>
              <p>
               Studies done across India and South Asia have found that Indians tend to get type 2 diabetes, high blood pressure, and heart disease even when their BMI is lower than what is considered risky for Western people. The World Health Organization noticed this in 2004 and said Asian countries should use lower BMI cut-off numbers. India's own health body, the ICMR, now follows different BMI thresholds in its guidelines.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { num: '23', label: 'Overweight threshold for Indians (global standard is 25)' },
                  { num: '27.5', label: 'Obesity threshold for Indians (global standard is 30)' },
                  { num: '2×', label: 'Higher diabetes risk for Indians at the same BMI as Europeans' },
                ].map((s) => (
                  <div key={s.num} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 text-center">
                    <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">{s.num}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg p-4 text-sm">
                <strong className="text-red-700 dark:text-red-300">What this means practically:</strong> A BMI of 24 looks "normal" on a standard chart — but by Indian health guidelines, that is already overweight. A BMI of 26 would be classified as obese by Indian standards, not just overweight.
              </div>

              {/* Section 3 */}
              <h2 id="thin-fat" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                The "Thin-Fat" Problem
              </h2>
              <p>
                South Asians tend to carry more body fat compared to muscle, even when their BMI looks normal. A lot of this fat sits around the internal organs — this is called visceral fat. This is where the term "thin-fat" comes from. A person can look slim and have a normal BMI but still have enough fat inside their body to cause serious health problems.
               </p>
              <p>
              Visceral fat is harmful because it releases harmful substances directly into the blood. This raises the risk of insulin resistance, fatty liver, and heart disease — even in people who do not look overweight at all.
              </p>

              {/* Section 4 */}
              <h2 id="waist" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                A Better Check: Waist Circumference
              </h2>
              <p>
                Waist circumference is a more direct indicator of visceral fat than BMI. Indian health guidelines recommend:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Men', val: '≤ 90 cm' },
                  { label: 'Women', val: '≤ 80 cm' },
                ].map((r) => (
                  <div key={r.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{r.label} — safe range</p>
                    <p className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{r.val}</p>
                  </div>
                ))}
              </div>
              <p>Measure at the level of your navel, after a normal exhale. Anything above these values indicates elevated abdominal fat risk — regardless of what your BMI says.</p>

              {/* Section 5 */}
              <h2 id="action-plan" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                What to Do After Checking Your BMI
              </h2>
              <div className="space-y-3">
                {[
                  { n: 1, title: 'Measure your waist', desc: 'Compare against Indian thresholds — 90 cm for men, 80 cm for women.' },
                  { n: 2, title: 'Calculate your daily calorie needs', desc: 'Use the BMR Calculator to find your baseline, then adjust for your activity level.' },
                  { n: 3, title: 'Get a basic blood panel', desc: 'Fasting blood glucose, HbA1c, and lipid profile reveal risks that BMI cannot show.' },
                  { n: 4, title: 'Set a realistic goal', desc: 'Target a healthy waist circumference, not just a BMI number. Use the Ideal Weight Calculator as a reference.' },
                  { n: 5, title: 'Reduce visceral fat specifically', desc: 'Aerobic exercise, cutting refined carbs, better sleep, and managing stress all directly reduce visceral fat.' },
                ].map((step) => (
                  <div key={step.n} className="flex gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                    <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{step.n}</div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{step.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 6 */}
              <h2 id="lifestyle" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Indian Lifestyle Factors That Make This Worse
              </h2>
              {[
                { title: 'Sedentary work', text: "Long desk hours reduce muscle mass and lower your resting metabolism over time — both worsen the thin-fat pattern." },
                { title: 'Refined carbohydrate-heavy diets', text: 'White rice, maida, and sweetened drinks cause frequent blood sugar spikes that directly promote visceral fat storage.' },
                { title: 'Poor sleep', text: 'Sleeping fewer than 6 hours raises cortisol and increases appetite — both independently linked to abdominal fat gain.' },
                { title: 'Chronic stress', text: 'High cortisol from sustained stress specifically drives fat storage around the abdomen, separate from diet and exercise.' },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="text-sm font-bold text-brand-600 dark:text-brand-400 mt-4 mb-1">{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}

              {/* Conclusion */}
              <h2 id="conclusion" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                The Bottom Line
              </h2>
              <p>
                BMI is a useful starting point, but for Indians it needs context. A "normal" result by global standards can still indicate real health risk. Check your waist measurement alongside BMI, and use blood tests to catch what neither number can show.
              </p>

              {/* CTA */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="font-bold text-blue-700 dark:text-blue-300 mb-3">Use our free calculators to go further:</p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/bmi-calculator" className="text-xs font-bold px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition">BMI Calculator →</Link>
                  <Link to="/bmr-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">BMR Calculator</Link>
                  <Link to="/calorie-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">Calorie Calculator</Link>
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
                  <li>World Health Organization (2004). Appropriate body-mass index for Asian populations. <em>The Lancet.</em></li>
                  <li>Indian Council of Medical Research (ICMR). Nutrient Requirements and Recommended Dietary Allowances for Indians.</li>
                  <li>Misra, A. & Khurana, L. (2011). Obesity-related non-communicable diseases: South Asians vs White Caucasians. <em>International Journal of Obesity.</em></li>
                  <li>Keys, A. et al. (1972). Indices of relative weight and obesity. <em>Journal of Chronic Diseases.</em></li>
                </ol>
              </div> */}

            </div>

            {/* Related Articles */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { to: '/fitness-blog/calorie-intake-guide', title: 'Calorie Intake Guide for Weight Loss in India' },
                  { to: '/fitness-blog/bmr-vs-tdee', title: "BMR vs TDEE — What's the Difference?" },
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

export { BMIArticle };
export default BMIArticle;