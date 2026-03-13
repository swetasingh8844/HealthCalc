import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const WeightLossGuide: React.FC = () => {

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tocItems = [
    { label: 'Why crash diets fail',              id: 'why-crash-diets-fail' },
    { label: 'What actually causes fat loss',     id: 'fat-loss-science' },
    { label: 'Eat less without feeling hungry',   id: 'eat-less-no-hunger' },
    { label: 'Foods that keep you full',          id: 'filling-foods' },
    { label: 'Indian meal strategies',            id: 'indian-strategies' },
    { label: 'The role of exercise',              id: 'exercise' },
    { label: 'Habits that matter most',           id: 'habits' },
    { label: 'How fast should you lose weight?',  id: 'how-fast' },
    { label: 'The bottom line',                   id: 'conclusion' },
  ];

  return (
    <>
      <Helmet>
        <title>How to Lose Weight Without Starving Yourself – TheFitCalculator</title>
        <meta name="description" content="Why crash diets fail, how to create a calorie deficit without hunger, filling Indian foods for weight loss, and a sustainable approach to losing fat without restriction." />
        <link rel="canonical" href="https://thefitcalculator.com/blog/weight-loss-without-starving" />
      </Helmet>

      <style>{`html { scroll-padding-top: 80px; }`}</style>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">

          <article className="flex-1 min-w-0 space-y-6">

            {/* Header */}
            <div>
              <span className="inline-block bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                🌿 Weight Loss
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                How to Lose Weight Without Starving Yourself
              </h1>
              <div className="flex flex-wrap items-center gap-4 py-3 border-t border-b border-gray-100 dark:border-gray-700 text-xs text-gray-400">
                <span>✍️ Sweta Singh</span>
                <span>🕐 8 min read</span>
                <span>📖 ~1,800 words</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-teal-700 dark:text-teal-300">Note:</strong> This article is for general information only. If you have underlying health conditions, consult a doctor before making significant dietary changes.
            </div>

            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">

              <p>
                The most common approach to weight loss — eating as little as possible — is also the one most likely to fail. Severe restriction triggers hunger, slows metabolism, causes muscle loss, and almost always ends in rebound weight gain. There is a better way: lose fat steadily by eating less than you burn, while staying full enough that the plan is actually sustainable.
              </p>

              {/* Section 1 */}
              <h2 id="why-crash-diets-fail" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Why Crash Diets Fail
              </h2>
              <p>When you drastically cut calories, several things happen simultaneously — and none of them are helpful:</p>
              <div className="space-y-2">
                {[
                  { title: 'Metabolic slowdown', desc: 'Your body interprets extreme restriction as starvation and lowers its resting metabolic rate (BMR). You burn fewer calories doing the same activities — sometimes 15–25% fewer within weeks.' },
                  { title: 'Muscle loss', desc: 'Without enough protein and calories, your body breaks down muscle for energy. This lowers BMR further and leaves you weaker even as the scale drops.' },
                  { title: 'Hormonal hunger signals intensify', desc: 'Ghrelin (the hunger hormone) rises and leptin (the satiety hormone) drops. Your brain is actively fighting your diet — making food feel more rewarding and hunger feel more urgent.' },
                  { title: 'Rebound weight gain', desc: 'When you eventually eat normally again (and almost everyone does), a slower metabolism means the same food intake now causes weight to return — often exceeding the original weight.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 bg-white dark:bg-gray-800 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
                    <span className="text-red-500 flex-shrink-0 font-bold text-base">✗</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg p-4 text-sm">
                <strong className="text-amber-800 dark:text-amber-300">Research finding:</strong> Studies consistently show that 80–95% of people who lose weight through severe calorie restriction regain most or all of it within 1–5 years — largely due to metabolic adaptation and hormonal changes.
              </div>

              {/* Section 2 */}
              <h2 id="fat-loss-science" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                What Actually Causes Fat Loss
              </h2>
              <p>
                Fat loss comes down to one principle: eating fewer calories than your body burns over time. But the size of that gap matters enormously.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Too small a deficit', range: '< 200 kcal/day', result: 'Minimal fat loss. Easy to maintain but very slow progress.', color: 'border-blue-200 dark:border-blue-800' },
                  { label: 'Optimal deficit', range: '300–500 kcal/day', result: 'Steady fat loss of 0.3–0.5 kg/week. Manageable hunger. Preserves muscle.', color: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10' },
                  { label: 'Too large a deficit', range: '> 750 kcal/day', result: 'Fast initial loss but triggers metabolic slowdown, muscle loss, and intense hunger.', color: 'border-red-200 dark:border-red-800' },
                ].map((d) => (
                  <div key={d.label} className={`border rounded-xl p-3 bg-white dark:bg-gray-800 ${d.color}`}>
                    <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">{d.label}</p>
                    <p className="text-xs font-mono text-brand-600 dark:text-brand-400 mb-1">{d.range}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{d.result}</p>
                  </div>
                ))}
              </div>
              <p>
                The goal is the middle column — a deficit small enough to be sustainable, large enough to make real progress. Calculate your TDEE using the <Link to="/calorie-calculator" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">Calorie Calculator</Link>, then subtract 300–500 kcal from that number.
              </p>

              {/* Section 3 */}
              <h2 id="eat-less-no-hunger" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                How to Eat Less Without Feeling Hungry
              </h2>
              <p>
                Hunger is the main reason diets fail. The key is not willpower — it is choosing foods and eating patterns that keep hunger low on fewer calories. Three factors drive satiety:
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { factor: 'Protein', desc: 'Most filling macro per calorie. Raises satiety hormones and suppresses ghrelin for hours. Target 1.2–1.6g per kg of body weight daily.', icon: '🥩' },
                  { factor: 'Fibre', desc: 'Slows digestion, expands in the stomach, and feeds gut bacteria that produce satiety signals. Found in vegetables, legumes, and whole grains.', icon: '🥦' },
                  { factor: 'Volume', desc: 'High-water-content foods take up more stomach space per calorie. Vegetables, soups, and fruits create more fullness than the same calories from dense foods.', icon: '🥗' },
                ].map((f) => (
                  <div key={f.factor} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center">
                    <span className="text-2xl block mb-2">{f.icon}</span>
                    <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">{f.factor}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Section 4 */}
              <h2 id="filling-foods" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                High-Satiety Indian Foods (Low Calories, High Fullness)
              </h2>
              <p>These foods give maximum fullness per calorie — the foundation of eating less without hunger:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-teal-50 dark:bg-teal-900/30">
                      <th className="text-left px-3 py-2 font-bold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700">Food</th>
                      <th className="text-center px-3 py-2 font-bold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700">Calories</th>
                      <th className="text-left px-3 py-2 font-bold text-teal-600 dark:text-teal-400 border border-gray-100 dark:border-gray-700">Why it fills you up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { food: 'Dal (1 cup cooked)', cal: '180–220', why: 'High protein + fibre. Slow digestion.' },
                      { food: 'Eggs (2 whole)', cal: '140', why: 'High protein. Proven to reduce next-meal intake.' },
                      { food: 'Curd / dahi (1 cup)', cal: '100–120', why: 'Protein + probiotics. Thick texture creates fullness.' },
                      { food: 'Cucumber (1 large)', cal: '25', why: '96% water. Very high volume, near-zero calories.' },
                      { food: 'Spinach / palak (2 cups)', cal: '14', why: 'Extreme volume, minimal calories. Rich in fibre.' },
                      { food: 'Moong dal chilla (2 pieces)', cal: '180', why: 'Protein-rich. More filling than equivalent bread.' },
                      { food: 'Chaas / buttermilk (1 glass)', cal: '35–50', why: 'High volume, very low calories. Good between meals.' },
                      { food: 'Rajma / kidney beans (1 cup)', cal: '210', why: 'Protein + fibre combo. Very high satiety index.' },
                      { food: 'Chicken breast (100g grilled)', cal: '165', why: 'Highest protein per calorie of common meats.' },
                      { food: 'Oats (1 cup cooked)', cal: '150', why: 'Beta-glucan fibre delays stomach emptying for hours.' },
                    ].map((r, i) => (
                      <tr key={r.food} className={i % 2 === 0 ? 'bg-gray dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}>
                        <td className="px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700">{r.food}</td>
                        <td className="px-3 py-2 text-center font-semibold text-brand-600 dark:text-brand-400 border border-gray-100 dark:border-gray-700">{r.cal}</td>
                        <td className="px-3 py-2 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">{r.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Section 5 */}
              <h2 id="indian-strategies" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Practical Indian Meal Strategies
              </h2>
              <div className="space-y-2">
                {[
                  { tip: 'Start every meal with a salad or soup', desc: 'Eating vegetables or clear soup first increases meal volume and triggers early satiety signals — reducing total calorie intake by 10–15% without conscious effort.' },
                  { tip: 'Use smaller plates and bowls', desc: 'Research consistently shows that plate size influences how much we serve and eat. A full smaller plate feels like more food than a half-empty large plate.' },
                  { tip: 'Add a protein source to every meal', desc: 'Dal, curd, paneer, eggs, or chicken at every meal significantly increases satiety and reduces cravings 2–3 hours later.' },
                  { tip: 'Replace one roti with extra sabzi', desc: 'Swapping one roti (70–80 kcal) for an extra serving of vegetables adds volume and fibre while reducing total calories.' },
                  { tip: 'Eat slowly — take at least 20 minutes per meal', desc: 'Satiety hormones take 15–20 minutes to reach the brain after eating begins. Eating fast bypasses these signals, leading to overconsumption before fullness is felt.' },
                  { tip: 'Drink water before and during meals', desc: 'Drinking 500 ml of water 30 minutes before a meal reduces calorie intake at that meal by an average of 13% according to clinical studies.' },
                ].map((s) => (
                  <div key={s.tip} className="flex gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3">
                    <span className="text-teal-500 flex-shrink-0 font-bold">✓</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.tip}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 6 */}
              <h2 id="exercise" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                The Role of Exercise
              </h2>
              <p>
                Exercise is important — but not primarily because it burns calories during the session. A 45-minute walk burns roughly 200–250 calories, which is equivalent to one roti with dal. The real value of exercise is different:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: 'Resistance training preserves muscle', desc: 'When losing weight, resistance training ensures the weight lost is mostly fat rather than muscle. This keeps your BMR higher and improves body composition.', icon: '💪' },
                  { title: 'Cardio improves fat burning efficiency', desc: 'Regular aerobic exercise improves how efficiently your body uses fat as fuel — especially at moderate intensities during daily activities.', icon: '🏃' },
                  { title: 'Exercise counters metabolic slowdown', desc: 'Regular exercise partially offsets the metabolic adaptation that happens during a calorie deficit — keeping you burning more calories even at rest.', icon: '🔥' },
                  { title: 'Improves appetite regulation', desc: 'Regular exercisers tend to have better-regulated hunger hormones — less reactive hunger spikes and more stable energy throughout the day.', icon: '⚖️' },
                ].map((e) => (
                  <div key={e.title} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3">
                    <p className="text-lg mb-1">{e.icon}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{e.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{e.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg p-4 text-sm">
                <strong className="text-blue-700 dark:text-blue-300">Practical minimum:</strong> 150 minutes of moderate activity per week (like brisk walking) plus 2 sessions of resistance training covers most of the benefits for weight loss and metabolic health.
              </div>

              {/* Section 7 */}
              <h2 id="habits" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Non-Diet Habits That Drive Weight Loss
              </h2>
              <div className="space-y-2">
                {[
                  { n: 1, habit: 'Sleep 7–8 hours consistently', desc: 'Poor sleep raises ghrelin (hunger hormone) by up to 24% and lowers leptin (fullness hormone). People who sleep less eat significantly more the next day without realising it.' },
                  { n: 2, habit: 'Manage stress actively', desc: 'Chronic stress raises cortisol, which directly increases appetite and promotes fat storage around the abdomen — independent of how well you eat.' },
                  { n: 3, habit: 'Increase daily steps', desc: 'NEAT (Non-Exercise Activity Thermogenesis) — walking, standing, fidgeting — can account for 200–500 kcal per day. Aiming for 8,000–10,000 steps costs no gym time.' },
                  { n: 4, habit: 'Plan meals in advance', desc: 'People who plan what they will eat in advance consistently make lower-calorie choices and are less likely to order food or eat impulsively when hungry.' },
                  { n: 5, habit: 'Track what you eat for at least 2 weeks', desc: 'Self-monitoring is one of the strongest predictors of weight loss success. Even a brief tracking period builds calorie awareness that persists long after you stop counting.' },
                ].map((h) => (
                  <div key={h.n} className="flex gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                    <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-bold flex-shrink-0">{h.n}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{h.habit}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 8 */}
              <h2 id="how-fast" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                How Fast Should You Lose Weight?
              </h2>
              <p>
                Faster is not better when it comes to fat loss. The evidence strongly supports slower, steadier loss:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { rate: '0.25–0.5 kg / week', label: 'Recommended rate', desc: 'Preserves muscle, keeps hunger manageable, allows metabolic adaptation to happen gradually.', good: true },
                  { rate: '> 1 kg / week', label: 'Too fast', desc: 'Likely losing muscle and water. Hunger becomes severe. Metabolic rate drops sharply. Unsustainable.', good: false },
                ].map((r) => (
                  <div key={r.rate} className={`border rounded-xl p-4 ${r.good ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                    <p className={`text-lg font-extrabold mb-1 ${r.good ? 'text-green-700 dark:text-green-300' : 'text-red-600 dark:text-red-400'}`}>{r.rate}</p>
                    <p className={`text-xs font-bold mb-1 ${r.good ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{r.label}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{r.desc}</p>
                  </div>
                ))}
              </div>
              <p>
                At 0.5 kg/week, losing 5 kg takes 10 weeks. That sounds slow — but it is the rate most likely to stay off permanently. Rapid loss almost always means rapid regain.
              </p>

              {/* Conclusion */}
              <h2 id="conclusion" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                The Bottom Line
              </h2>
              <p>
                Losing weight without starving is not about willpower — it is about strategy. A moderate calorie deficit, high-protein meals built around filling Indian foods, regular movement, and good sleep create conditions where fat loss happens steadily without the hunger and misery of crash dieting. The plan you can actually follow for months is infinitely better than the perfect plan you abandon after two weeks.
              </p>

              {/* CTA */}
              <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-4">
                <p className="font-bold text-teal-700 dark:text-teal-300 mb-3">Find your starting numbers:</p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/calorie-calculator" className="text-xs font-bold px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition">Calorie Calculator →</Link>
                  <Link to="/bmr-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">BMR Calculator</Link>
                  <Link to="/bmi-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">BMI Calculator</Link>
                  <Link to="/ideal-weight-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">Ideal Weight</Link>
                </div>
              </div>

              {/* <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">References</p>
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400 dark:text-gray-500">
                  <li>Rosenbaum, M. & Leibel, R.L. (2010). Adaptive thermogenesis in humans. <em>International Journal of Obesity.</em></li>
                  <li>Sumithran, P. et al. (2011). Long-term persistence of hormonal adaptations to weight loss. <em>New England Journal of Medicine.</em></li>
                  <li>Weigle, D.S. et al. (2005). High-protein diet produces sustained reductions in appetite. <em>American Journal of Clinical Nutrition.</em></li>
                  <li>Van Walleghen, E.L. et al. (2007). Pre-meal water consumption reduces meal energy intake. <em>Obesity.</em></li>
                </ol>
              </div> */}

            </div>

            {/* Related Articles */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { to: '/blog/calorie-intake-guide', title: 'Calorie Intake Guide for Weight Loss in India' },
                  { to: '/blog/bmi-india-guide', title: 'BMI in India: What Your Number Really Means' },
                  { to: '/blog/bmr-vs-tdee', title: "BMR vs TDEE — What's the Difference?" },
                  { to: '/blog/body-fat-percentage', title: 'Healthy Body Fat % by Age & Gender' },
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

export { WeightLossGuide };
export default WeightLossGuide;