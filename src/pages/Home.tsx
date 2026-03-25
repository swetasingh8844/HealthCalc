import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

// ── Data ─────────────────────────────────────────────────────────────────────

const calculators = [
  { to: '/bmi-calculator',             icon: '📊', label: 'BMI Calculator',       desc: 'Check if your weight is in the healthy range for your height.' },
  { to: '/bmr-calculator',             icon: '🔥', label: 'BMR Calculator',       desc: 'Find how many calories your body burns at rest each day.' },
  { to: '/calorie-calculator',         icon: '🥗', label: 'Calorie Calculator',   desc: 'Get your personalised daily calorie target based on your goal.' },
  { to: '/ideal-weight-calculator',    icon: '⚖️', label: 'Ideal Weight',         desc: 'Discover your recommended healthy weight range.' },
  { to: '/water-intake-calculator',    icon: '💧', label: 'Water Intake',         desc: 'Calculate your daily hydration goal.' },
  { to: '/weight-loss-calculator',     icon: '📉', label: 'Weight Loss',          desc: 'Plan your calorie deficit and see your timeline.' },
  { to: '/body-fat-calculator',        icon: '🔬', label: 'Body Fat %',           desc: 'Estimate body fat using the US Navy & BMI method.' },
  { to: '/protein-intake-calculator',  icon: '🥩', label: 'Protein Intake',       desc: 'Know exactly how much protein your body needs daily.' },
  { to: '/life-expectancy-calculator', icon: '⏳', label: 'Life Expectancy',      desc: 'Get a science-backed estimate of your longevity.' },
  { to: '/unit-converter',             icon: '🔄', label: 'Unit Converter',       desc: 'Convert kg ↔ lbs and cm ↔ ft instantly.' },
];

const fitnessContent = [
  {
    to: '/fitness-guide-videos',
    icon: '🎬',
    label: 'Yoga & Meditation Videos',
    desc: 'Youtube videos to meditate, do yoga, improve flexibility, relieve stress, sleep better, and more.',
    tag: 'Fitness Guide Videos',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  {
    to: '/fitness-reels',
    icon: '🎞️',
    label: 'Fitness Reels & Short Videos',
    desc: 'Quick reels on workout tips — swipe through on the go.',
    tag: 'Reels',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-200 dark:border-violet-800',
  },
  {
    to: '/fitness-news',
    icon: '📰',
    label: 'Daily Fitness News',
    desc: 'Stay updated with the latest health, nutrition, and fitness news.',
    tag: 'News',
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    border: 'border-sky-200 dark:border-sky-800',
  },
  {
    to: '/fitness-blog',
    icon: '📝',
    label: 'Health & Fitness Blog',
    desc: 'In-depth articles on weight management, nutrition science, workout tips, and healthy habits.',
    tag: 'Blog',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
  },
  {
    to: '/fitness-shop',
    icon: '🛒',
    label: 'Fitness Gear Shop',
    desc: 'Browse hand-picked fitness equipment, supplements, and wellness products.',
    tag: 'Shop',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-200 dark:border-rose-800',
  },
];

const healthTips = [
  'Check your BMI every few months to monitor changes in weight and health.',
  'Your BMR decreases as you age — recalculate it every year.',
  'A 500 cal/day deficit leads to ~0.5 kg fat loss per week.',
  'Ideal weight is a range — focus on body composition, not just the scale.',
  'Thirst is often mistaken for hunger — stay hydrated.',
  'Skipping breakfast does not automatically help you lose weight — total daily calories matter more.',
  'Muscle weighs more than fat — the scale going up does not always mean you are getting unhealthy.',
  'Walking 8,000 to 10,000 steps a day burns more calories than most people think.',
  'Poor sleep increases hunger hormones — bad sleep and weight gain are directly connected.',
  'Protein keeps you full longer than carbs or fat — eat enough of it at every meal.',
  'You cannot out-exercise a bad diet — food choices matter more than workout hours.',
  'Eating slowly gives your brain time to register fullness — fast eaters tend to overeat.',
  'Stress raises cortisol which encourages fat storage especially around the belly.',
  'Strength training boosts your metabolism for hours after the workout ends.',
  'Drinking water before a meal reduces how much you eat without any effort.',
];

// const formulas = [
//   { label: 'BMI',          formula: 'Weight (kg) ÷ Height (m)²',  source: 'WHO Standard'     },
//   { label: 'BMR',          formula: 'Mifflin-St Jeor Equation',    source: 'Validated 1990'   },
//   { label: 'Ideal Weight', formula: 'Devine Formula',               source: 'Clinical standard'},
//   { label: 'TDEE',         formula: 'BMR × Activity Factor',        source: 'Harris-Benedict'  },
// ];

// ── Component ─────────────────────────────────────────────────────────────────

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
        <meta property="og:image" content="https://thefitcalculator.com/logo1.png" />
        <meta name="twitter:image" content="https://thefitcalculator.com/logo1.png" />
      </Helmet>

      <h1 className="sr-only">Free BMI, BMR, Calorie and Ideal Weight Calculator</h1>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">

        {/* ── Hero ── */}
        <motion.div {...fade(0)}
          className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl px-8 py-12 relative overflow-hidden shadow-lg"
        >
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
          <div className="relative max-w-2xl">
            <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Free Online Health Tools
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Calculate Your Health Metrics{' '}
              <span className="text-brand-200">Instantly</span>
            </h2>
            <p className="text-brand-100 text-base leading-relaxed max-w-xl">
             Your complete health hub. Free calculators for BMI, BMR, calories, body fat, protein, water intake and more. Plus fitness videos, yoga guides, daily news, and curated gear — everything in one place.
            </p>
          </div>
        </motion.div>

        {/* ── Main 3-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left col: Calculators + Content ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Calculators grid */}
            <motion.section {...fade(0.1)}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1 h-5 bg-brand-500 rounded-full" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Health Calculators</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {calculators.map((c, i) => (
                  <motion.div key={c.to} {...fade(0.12 + i * 0.04)}>
                    <Link
                      to={c.to}
                      className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                        {c.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
                          {c.label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{c.desc}</p>
                      </div>
                      <span className="text-gray-700 dark:text-gray-200 group-hover:text-brand-500 transition-colors text-sm shrink-0 mt-0.5">→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Fitness content links */}
            <motion.section {...fade(0.3)}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1 h-5 bg-emerald-500 rounded-full" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fitness Content</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {fitnessContent.map((item, i) => (
                  <motion.div key={item.to} {...fade(0.32 + i * 0.06)}>
                    <Link
                      to={item.to}
                      className={`group flex flex-col gap-3 p-5 rounded-2xl border ${item.bg} ${item.border} hover:shadow-lg transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform`}>
                          {item.icon}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                          {item.tag}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-1">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-200 group-hover:text-brand-500 transition-colors">
                        Explore →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Why TheFitCalculator */}
            <motion.section {...fade(0.5)}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-5 bg-brand-500 rounded-full" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why TheFitCalculator?</h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: '🔬', title: 'Science-Backed',    desc: 'WHO, Mifflin-St Jeor, and Devine formulas used by doctors worldwide.' },
                    { icon: '🔒', title: 'Private by Design', desc: 'All calculations happen in your browser — your data never leaves your device.' },
                    { icon: '🆓', title: 'Always Free',       desc: 'No subscription, no sign-up, no hidden fees. Every tool is completely free.' },
                  ].map(v => (
                    <div key={v.title} className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-200 dark:border-gray-600 text-center">
                      <div className="text-2xl mb-2">{v.icon}</div>
                      <p className="font-bold text-sm text-gray-800 dark:text-white mb-1">{v.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

          </div>

          {/* ── Right sidebar ── */}
          <aside className="space-y-6">

            {/* Health Tips */}
            <motion.div {...fade(0.15)}
              className="bg-gradient-to-br from-brand-600 to-brand-700 p-6 rounded-2xl text-white shadow-lg"
            >
              <h3 className="text-base font-bold mb-4">💡 Quick Health Tips</h3>
              <ul className="space-y-3">
                {healthTips.map(tip => (
                  <li key={tip} className="flex gap-2 text-xs text-brand-100 leading-relaxed">
                    <span className="shrink-0 mt-0.5 text-brand-300">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Formulas */}
            {/* <motion.div {...fade(0.2)}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5"
            >
              <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-white">Formulas We Use</h3>
              <div className="space-y-3"> */}
                {/* {formulas.map(item => (
                  <div key={item.label} className="border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{item.label}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">{item.source}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{item.formula}</p>
                  </div>
                ))} */}
              {/* </div>
            </motion.div> */}

            {/* Unit Converter CTA */}
            <motion.div {...fade(0.25)}
              className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-700 rounded-2xl p-5"
            >
              <h3 className="text-sm font-bold text-brand-700 dark:text-brand-300 mb-1">Need to Convert Units?</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                Convert cm ↔ ft &amp; inches, kg ↔ lbs instantly before entering your measurements.
              </p>
              <Link
                to="/unit-converter"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 bg-white dark:bg-gray-800 border border-brand-200 dark:border-brand-700 px-4 py-2 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 16V4m0 0L3 8m4-4 4 4" /><path d="M17 8v12m0 0 4-4m-4 4-4-4" />
                </svg>
                Open Unit Converter →
              </Link>
            </motion.div>

            {/* Quick links to content */}
            <motion.div {...fade(0.3)}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5"
            >
              <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-white">Explore More</h3>
              <div className="space-y-2">
                {fitnessContent.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex-1">
                      {item.tag}
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 group-hover:text-brand-500 transition-colors text-sm">→</span>
                  </Link>
                ))}
              </div>
            </motion.div>

          </aside>
        </div>
      </div>
    </>
  );
};

export default Home;