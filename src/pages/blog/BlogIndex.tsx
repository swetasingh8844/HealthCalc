import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const BlogIndex: React.FC = () => {
  const articles = [
    {
      slug: '/blog/bmi-india-guide',
      emoji: '📊',
      cat: 'BMI Guide',
      catColor: 'text-blue-600 dark:text-blue-400',
      catBg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      title: 'BMI in India: What Your Number Really Means for South Asians',
      desc: 'Why standard BMI thresholds may not be accurate for Indians, the thin-fat Indian phenotype, visceral fat risks, and a step-by-step action plan after you know your BMI.',
      author: 'Sweta Singh',
      read: '8–10 min read',
      featured: true,
    },
    {
      slug: '/blog/calorie-intake-guide',
      emoji: '🥗',
      cat: 'Nutrition',
      catColor: 'text-green-600 dark:text-green-400',
      catBg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      title: 'Calorie Intake Guide for Weight Loss in India',
      desc: 'Hidden calories in dal, roti and chai, smart food swaps, a full Indian meal plan, week-by-week body changes, and how to eat at restaurants without derailing progress.',
      author: 'Sweta Singh',
      read: '9–10 min read',
      featured: false,
    },
    {
      slug: '/blog/bmr-vs-tdee',
      emoji: '🔥',
      cat: 'BMR',
      catColor: 'text-orange-600 dark:text-orange-400',
      catBg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      title: 'BMR vs TDEE — What\'s the Difference and Why It Matters',
      desc: 'A clear breakdown of Basal Metabolic Rate vs Total Daily Energy Expenditure, how activity multipliers work, and how to use both numbers to reach your weight goal.',
      author: 'Sweta Singh',
      read: '6–7 min read',
      featured: false,
    },
    {
      slug: '/blog/body-fat-percentage',
      emoji: '📏',
      cat: 'Body Composition',
      catColor: 'text-purple-600 dark:text-purple-400',
      catBg: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      title: 'Healthy Body Fat Percentage by Age and Gender',
      desc: 'Body fat percentage is a more accurate health indicator than BMI alone. Learn what ranges are healthy for your age and gender, and how to measure it at home.',
      author: 'Sweta Singh',
      read: '7 min read',
      featured: false,
    },
    {
      slug: '/blog/weight-loss-without-starving',
      emoji: '🌿',
      cat: 'Weight Loss',
      catColor: 'text-teal-600 dark:text-teal-400',
      catBg: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
      title: 'How to Lose Weight Without Starving Yourself',
      desc: 'Why crash diets fail, the psychology of sustainable fat loss, and a science-backed approach to creating a deficit without hunger, restriction, or burnout.',
      author: 'Sweta Singh',
      read: '8 min read',
      featured: false,
    },
  ];

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <Helmet>
        <title>Health & Fitness Blog – TheFitCalculator</title>
        <meta name="description" content="Science-backed articles on BMI, calories, BMR, and healthy weight management for Indians. Expert health education from TheFitCalculator." />
        <link rel="canonical" href="https://thefitcalculator.com/blog" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Page Header */}
        <div className="text-center pb-2">
          <span className="inline-block bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Health Education
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Fitness & Health Blog
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg mx-auto">
            Science-backed articles on BMI, calories, BMR, and healthy weight management — written to help you understand your numbers.
          </p>
        </div>

        {/* Featured Article */}
        <Link
          to={featured.slug}
          className="block bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 hover:opacity-95 transition-all hover:-translate-y-1 shadow-lg shadow-brand-200 dark:shadow-none"
        >
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            ⭐ Featured Article
          </span>
          <h2 className="text-xl font-extrabold text-white mb-2 leading-snug">
            {featured.emoji} {featured.title}
          </h2>
          <p className="text-brand-100 text-sm leading-relaxed mb-4">{featured.desc}</p>
          <div className="flex items-center gap-4 text-brand-200 text-xs">
            <span>✍️ {featured.author}</span>
            <span>🕐 {featured.read}</span>
            <span className="ml-auto font-bold text-white">Read Article →</span>
          </div>
        </Link>

        {/* All Articles */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">All Articles</h2>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400">{articles.length} articles</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {rest.map((article) => (
              <Link
                key={article.slug}
                to={article.slug}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex flex-col gap-3 hover:border-brand-400 dark:hover:border-brand-500 hover:-translate-y-1 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${article.catBg} ${article.catColor}`}>
                    {article.emoji} {article.cat}
                  </span>
                  <span className="text-xs text-gray-400">🕐 {article.read}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                  {article.desc}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
                      SS
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{article.author}</span>
                  </div>
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Calculators CTA */}
        {/* <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="font-bold text-gray-900 dark:text-white text-sm">Try our free calculators</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Get your personalised health numbers instantly — no sign-up needed.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'BMI', to: '/bmi-calculator' },
              { label: 'BMR', to: '/bmr-calculator' },
              { label: 'Calories', to: '/calorie-calculator' },
              { label: 'Ideal Weight', to: '/ideal-weight-calculator' },
            ].map((c) => (
              <Link key={c.to} to={c.to} className="text-xs font-semibold px-3 py-1.5 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-700 rounded-lg hover:bg-brand-100 transition">
                {c.label}
              </Link>
            ))}
          </div>
        </div> */}

      </div>
    </>
  );
};

export { BlogIndex };
export default BlogIndex;