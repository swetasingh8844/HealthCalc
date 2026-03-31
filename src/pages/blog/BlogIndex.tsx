import React from 'react';
 import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

const BlogIndex: React.FC = () => {
  const articles = [
    {
      slug: '/fitness-blog/bmi-india-guide',
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
      slug: '/fitness-blog/calorie-intake-guide',
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
      slug: '/fitness-blog/bmr-vs-tdee',
      emoji: '🔥',
      cat: 'BMR',
      catColor: 'text-orange-600 dark:text-orange-400',
      catBg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      title: "BMR vs TDEE — What's the Difference and Why It Matters",
      desc: 'A clear breakdown of Basal Metabolic Rate vs Total Daily Energy Expenditure, how activity multipliers work, and how to use both numbers to reach your weight goal.',
      author: 'Sweta Singh',
      read: '6–7 min read',
      featured: false,
    },
    {
      slug: '/fitness-blog/body-fat-percentage',
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
      slug: '/fitness-blog/weight-loss-without-starving',
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
   const location = useLocation();
  const isBlogPage = location.pathname === '/fitness-blog';

  return (
    <>
      <Helmet>
  {isBlogPage && (
    <title>Health & Fitness Blog – TheFitCalculator</title>
  )}
  {isBlogPage && (
    <meta name="description" content="Science-backed articles/blog on BMI, calories, BMR, and healthy weight management for Indians. Expert health education from TheFitCalculator." />
  )}  
  {isBlogPage && ( 
    <link rel="canonical" href="https://thefitcalculator.com/fitness-blog" />
  )}
  {isBlogPage && (
    <meta property="og:title" content="Health & Fitness Blog – TheFitCalculator" />
  )}
  {isBlogPage && ( 
    <meta property="og:description" content="Science-backed articles/blog on BMI, calories, BMR, and healthy weight management for Indians. Expert health education from TheFitCalculator." />
  )}
  {isBlogPage && (
    <meta property="og:url" content="https://thefitcalculator.com/fitness-blog" />
  )}
</Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
      
              {/* Header */}
              <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                  <Link to="/" className="group flex items-center gap-3 text-gray-500 hover:text-brand-600 transition-all">
                    <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30 transition-colors">
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-l uppercase tracking-widest">Home</span>
                  </Link>
      
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">Fitness</h1>
                    <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.3em]">Blog</span>
                  </div>
                </div>
              </header>

        {/* ── Page Content ── */}
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

          {/* Page Header */}
          <div className="text-center pb-2">
            <span className="inline-block bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Health Education
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Fitness & Health Blog
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg mx-auto">
              Science-backed articles on BMI, calories, BMR, and healthy weight management <br></br>It help you understand your numbers.
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
              {/* <span>✍️ {featured.author}</span> */}
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
                    {/* <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
                        SS
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{article.author}</span>
                    </div> */}
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-100 group-hover:text-brand-600 transition-colors">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export { BlogIndex };
export default BlogIndex;