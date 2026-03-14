import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const isCalorieGuidePage = location.pathname === "/blog/calorie-intake-guide";
const CalorieGuide: React.FC = () => {

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tocItems = [
    { label: 'How many calories you need',        id: 'calories-needed' },
    { label: 'How much deficit to lose weight',   id: 'deficit' },
    { label: 'Hidden calories in Indian food',    id: 'hidden-calories' },
    { label: 'Smart food swaps',                  id: 'food-swaps' },
    { label: 'Sample 1,600 kcal meal plan',       id: 'meal-plan' },
    { label: 'Week-by-week body changes',         id: 'week-by-week' },
    { label: 'Eating out tips',                   id: 'eating-out' },
    { label: 'Why protein matters',               id: 'protein' },
    { label: '5 common mistakes',                 id: 'mistakes' },
    { label: 'The bottom line',                   id: 'conclusion' },
  ];

  return (
    <>
      <Helmet>
  {isCalorieGuidePage && (
    <title>
      Calorie Intake Guide for Weight Loss in India – TheFitCalculator
    </title>
  )}

  {isCalorieGuidePage && (
    <meta
      name="description"
      content="How many calories do Indians actually need? Hidden calories in dal, roti and chai, smart food swaps, a sample Indian meal plan, and how to lose weight without starving."
    />
  )}

  {isCalorieGuidePage && (
    <link
      rel="canonical"
      href="https://thefitcalculator.com/blog/calorie-intake-guide"
    />
  )}

  {isCalorieGuidePage && (
    <meta
      property="og:title"
      content="Calorie Intake Guide for Weight Loss in India – TheFitCalculator"
    />
  )}

  {isCalorieGuidePage && (
    <meta
      property="og:description"
      content="Learn how many calories Indians need daily, hidden calories in common foods, and how to lose weight with a balanced Indian diet."
    />
  )}

  {isCalorieGuidePage && (
    <meta
      property="og:url"
      content="https://thefitcalculator.com/blog/calorie-intake-guide"
    />
  )}

  {isCalorieGuidePage && <meta property="og:type" content="article" />}
</Helmet>

      <style>{`html { scroll-padding-top: 80px; }`}</style>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">

          {/* MAIN CONTENT */}
          <article className="flex-1 min-w-0 space-y-6">

            {/* Header */}
            <div>
              <span className="inline-block bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                🥗 Nutrition Guide
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                Calorie Intake Guide for Weight Loss in India
              </h1>
              <div className="flex flex-wrap items-center gap-4 py-3 border-t border-b border-gray-100 dark:border-gray-700 text-xs text-gray-400">
                <span>✍️ Sweta Singh</span>
                <span>🕐 9 min read</span>
                <span>📖 ~2,000 words</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-green-700 dark:text-green-300">Note:</strong> This article is for general information only. Individual calorie needs vary based on age, health conditions, and activity level. Consult a doctor or dietitian for personalised advice.
            </div>

            {/* Body */}
            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">

              <p>
                Calorie counting has a reputation for being complicated — but the core idea is straightforward. Weight changes when the calories you eat consistently differ from the calories your body burns. This guide breaks down how that works specifically for Indian diets, where hidden calories are everywhere and portion sizes are rarely discussed.
              </p>

              {/* Section 1 */}
              <h2 id="calories-needed" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                How Many Calories Does an Average Indian Adult Need?
              </h2>
              <p>
                Your total daily calorie need — called TDEE (Total Daily Energy Expenditure) — depends on your height, weight, age, gender, and how active you are. As a rough guide:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Sedentary woman (office job, little exercise)', cal: '1,600 – 1,800 kcal' },
                  { label: 'Sedentary man (office job, little exercise)', cal: '1,900 – 2,200 kcal' },
                  { label: 'Moderately active woman', cal: '1,800 – 2,100 kcal' },
                  { label: 'Moderately active man', cal: '2,200 – 2,600 kcal' },
                ].map((r) => (
                  <div key={r.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 flex justify-between items-center gap-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{r.label}</p>
                    <p className="text-sm font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap">{r.cal}</p>
                  </div>
                ))}
              </div>
              <p>
                These are estimates. Use the <Link to="/calorie-calculator" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">Calorie Calculator</Link> to get a number based on your actual measurements.
              </p>

              {/* Section 2 */}
              <h2 id="deficit" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                How Much of a Deficit Do You Need to Lose Weight?
              </h2>
              <p>
                One kilogram of body fat is roughly 7,700 calories. To lose 0.5 kg per week — a safe, sustainable rate — you need to eat about 550 calories less than you burn each day.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Conservative', deficit: '−300 kcal/day', result: '~0.3 kg/week' },
                  { label: 'Standard', deficit: '−500 kcal/day', result: '~0.5 kg/week' },
                  { label: 'Aggressive', deficit: '−750 kcal/day', result: '~0.7 kg/week' },
                ].map((r) => (
                  <div key={r.label} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 text-center">
                    <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">{r.label}</p>
                    <p className="text-sm font-extrabold text-brand-600 dark:text-brand-400">{r.deficit}</p>
                    <p className="text-xs text-gray-400 mt-1">{r.result}</p>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg p-4 text-sm">
                <strong className="text-amber-800 dark:text-amber-300">Important:</strong> Eating below 1,200 kcal/day for women or 1,500 kcal/day for men is not recommended without medical supervision. Very low calorie diets slow your metabolism and cause muscle loss.
              </div>

              {/* Section 3 */}
              <h2 id="hidden-calories" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Hidden Calories in Common Indian Foods
              </h2>
              <p>
                The biggest obstacle for most Indians is not knowing how many calories are actually in everyday meals. Cooking oil alone adds 120 calories per tablespoon — and most Indian cooking uses 3–5 tablespoons per meal.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="text-left px-3 py-2 font-bold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-600">Food</th>
                      <th className="text-left px-3 py-2 font-bold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-600">Serving</th>
                      <th className="text-right px-3 py-2 font-bold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-600">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { food: 'Dal tadka (restaurant)', serving: '1 bowl (200g)', cal: '280–320' },
                      { food: 'Roti (homemade, no ghee)', serving: '1 medium', cal: '70–80' },
                      { food: 'Roti (with ghee, restaurant)', serving: '1 medium', cal: '130–150' },
                      { food: 'White rice', serving: '1 cup cooked (200g)', cal: '260' },
                      { food: 'Paneer butter masala', serving: '1 serving (150g)', cal: '350–400' },
                      { food: 'Samosa', serving: '1 piece', cal: '150–200' },
                      { food: 'Chai with milk & sugar', serving: '1 cup (200ml)', cal: '60–90' },
                      { food: 'Chole bhature', serving: '1 plate (2 bhaturas)', cal: '650–750' },
                      { food: 'Butter chicken', serving: '1 serving (150g)', cal: '300–360' },
                      { food: 'Masala dosa', serving: '1 piece', cal: '200–250' },
                      { food: 'Lassi (sweet)', serving: '1 glass (300ml)', cal: '250–300' },
                      { food: 'Cooking oil (any)', serving: '1 tbsp', cal: '120' },
                    ].map((r, i) => (
                      <tr key={r.food} className={i % 2 === 0 ? 'bg-gray dark:bg-white-850' : 'bg-gray-50 dark:bg-gray-800'}>
                        <td className="px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700">{r.food}</td>
                        <td className="px-3 py-2 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">{r.serving}</td>
                        <td className="px-3 py-2 text-right font-semibold text-brand-600 dark:text-brand-400 border border-gray-100 dark:border-gray-700">{r.cal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Section 4 */}
              <h2 id="food-swaps" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Smart Indian Food Swaps
              </h2>
              <p>You don't need to give up Indian food to lose weight. Small swaps make a large difference over time:</p>
              <div className="space-y-2">
                {[
                  { from: 'White rice (1 cup)', to: 'Brown rice or millets (1 cup)', saving: '−40–60 kcal + more fibre' },
                  { from: 'Roti with ghee', to: 'Plain roti', saving: '−50–70 kcal per roti' },
                  { from: 'Sweet lassi (1 glass)', to: 'Chaas / buttermilk (1 glass)', saving: '−180–200 kcal' },
                  { from: 'Fried samosa (2 pieces)', to: 'Baked samosa (2 pieces)', saving: '−150–180 kcal' },
                  { from: 'Full-cream milk chai (2 cups)', to: 'Low-fat milk chai, no sugar (2 cups)', saving: '−80–120 kcal' },
                  { from: 'Fruit juice (1 glass)', to: 'Whole fruit', saving: '−80–100 kcal + more fibre' },
                ].map((s) => (
                  <div key={s.from} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 flex gap-3 items-center">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-through">{s.from}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">→ {s.to}</p>
                    </div>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 whitespace-nowrap bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">{s.saving}</span>
                  </div>
                ))}
              </div>

              {/* Section 5 */}
              <h2 id="meal-plan" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Sample 1,600 kcal Indian Meal Plan
              </h2>
              <p>This is an example for a moderately active woman aiming to lose weight. Adjust portions up or down based on your calorie target.</p>
              <div className="space-y-2">
                {[
                  { time: '7:00 AM', meal: 'Breakfast', items: '2 egg whites + 1 whole egg omelette with vegetables, 1 multigrain roti, 1 cup low-fat chai (no sugar)', cal: '320 kcal' },
                  { time: '10:30 AM', meal: 'Mid-morning', items: '1 small apple or 1 banana', cal: '80 kcal' },
                  { time: '1:00 PM', meal: 'Lunch', items: '1 cup brown rice, 1 cup dal (minimal oil), 1 cup sabzi, small salad with cucumber and tomato', cal: '480 kcal' },
                  { time: '4:00 PM', meal: 'Evening snack', items: '1 cup chaas (buttermilk) or a small handful of roasted chana', cal: '100 kcal' },
                  { time: '7:30 PM', meal: 'Dinner', items: '2 plain rotis, 1 cup dal or sabzi, 1 cup curd', cal: '420 kcal' },
                  { time: 'Total', meal: '', items: '', cal: '~1,400–1,600 kcal' },
                ].map((r) => (
                  <div key={r.time} className={`flex gap-3 rounded-xl p-3 border ${r.time === 'Total' ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}>
                    <div className="w-20 flex-shrink-0">
                      <p className="text-xs font-bold text-brand-600 dark:text-brand-400">{r.time}</p>
                      {r.meal && <p className="text-xs text-gray-500 dark:text-gray-400">{r.meal}</p>}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 dark:text-gray-300">{r.items}</p>
                    </div>
                    <p className={`text-xs font-bold whitespace-nowrap ${r.time === 'Total' ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400'}`}>{r.cal}</p>
                  </div>
                ))}
              </div>

              {/* Section 6 */}
              <h2 id="week-by-week" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                What Actually Happens to Your Body Week by Week
              </h2>
              <div className="space-y-3">
                {[
                  { week: 'Week 1–2', title: 'Water weight loss', text: 'The first drop on the scale is mostly water, not fat. Reducing carbohydrates and salt causes your body to release stored water. This can be 1–3 kg and is not the same as fat loss.' },
                  { week: 'Week 3–6', title: 'True fat loss begins', text: 'With a consistent deficit, the body starts burning stored fat. Expect 0.3–0.7 kg per week of actual fat loss. Energy levels may dip slightly as your body adapts.' },
                  { week: 'Week 6–10', title: 'Metabolic adaptation', text: 'Your body becomes more efficient at using fewer calories. Weight loss may slow even if you are eating the same amount. This is normal — not a plateau caused by failure.' },
                  { week: 'Week 10+', title: 'Plateau — adjust the plan', text: 'Most people hit a plateau here. Options: reduce calories slightly further, increase exercise, or add a weekly refeed day at maintenance calories to reset metabolic rate.' },
                ].map((s) => (
                  <div key={s.week} className="flex gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                    <div className="w-20 flex-shrink-0 text-center">
                      <span className="inline-block bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold px-2 py-1 rounded-lg">{s.week}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{s.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 7 */}
              <h2 id="eating-out" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Eating Out and Family Functions
              </h2>
              <p>Indian social life revolves around food — weddings, festivals, family dinners. Complete avoidance is neither realistic nor necessary. A few practical strategies:</p>
              <div className="space-y-2">
                {[
                  { tip: 'Eat a small protein-rich snack before going out', desc: 'Arriving hungry leads to significantly overeating. A small meal beforehand helps you make calmer choices.' },
                  { tip: 'Choose grilled, tandoori, or dry preparations', desc: 'Curries and gravies are where oil calories hide. Tandoori chicken has roughly half the calories of butter chicken.' },
                  { tip: 'Control portions, not food types', desc: 'At functions, you can eat most things — just take smaller servings. One bite of everything beats a full plate of three things.' },
                  { tip: 'Account for the meal in your day', desc: 'If you know lunch will be heavy, eat a lighter breakfast and skip the evening snack.' },
                ].map((t) => (
                  <div key={t.tip} className="flex gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3">
                    <span className="text-brand-500 flex-shrink-0 font-bold">✓</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.tip}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 8 */}
              <h2 id="protein" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                Why Protein Is the Most Important Macro
              </h2>
              <p>Indian diets are typically low in protein — most people get far less than recommended. Protein matters most for weight loss because:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: 'High thermic effect', desc: 'Your body burns 25–30% of protein calories just digesting it. Fat and carbs burn 3–8%.' },
                  { title: 'Preserves muscle', desc: 'In a calorie deficit, protein prevents muscle loss so the weight you lose is mostly fat.' },
                  { title: 'Reduces hunger', desc: 'Protein keeps you full longer than carbohydrates or fat at the same calorie count.' },
                ].map((p) => (
                  <div key={p.title} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3">
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{p.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{p.desc}</p>
                  </div>
                ))}
              </div>
              <p>Target at least <strong className="text-gray-800 dark:text-gray-200">1.2–1.6g of protein per kg of body weight</strong> daily. Good Indian sources: dal, paneer, curd, eggs, chicken, fish, tofu, and soya chunks.</p>

              {/* Section 9 */}
              <h2 id="mistakes" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                5 Common Calorie Mistakes Indians Make
              </h2>
              <div className="space-y-2">
                {[
                  { n: 1, mistake: 'Underestimating cooking oil', fix: 'Measure oil with a spoon instead of pouring freely. Each tablespoon is 120 calories.' },
                  { n: 2, mistake: 'Drinking calories without realising', fix: 'Sweet chai, lassi, juices, and cold drinks add 300–600 kcal daily for many people.' },
                  { n: 3, mistake: 'Eating "healthy" foods in large amounts', fix: 'Nuts, ghee, peanut butter, and fruit are nutritious but calorie-dense. Portions still matter.' },
                  { n: 4, mistake: 'Skipping meals and overeating later', fix: 'Skipping breakfast or lunch typically leads to larger dinners and late-night snacking.' },
                  { n: 5, mistake: 'Weighing yourself daily and losing motivation', fix: 'Weight fluctuates 1–2 kg daily due to water, food, and hormones. Weigh weekly, at the same time.' },
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

              {/* Conclusion */}
              <h2 id="conclusion" className="text-xl font-bold text-gray-900 dark:text-white pt-4 pb-2 border-b border-gray-100 dark:border-gray-700">
                The Bottom Line
              </h2>
              <p>
                Calorie management does not require giving up Indian food or counting every grain of rice forever. The biggest wins come from identifying where hidden calories are entering your diet, making a handful of sustainable swaps, and eating enough protein to preserve muscle while losing fat. Start with knowing your number — use the calculator below.
              </p>

              {/* CTA */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <p className="font-bold text-green-700 dark:text-green-300 mb-3">Calculate your personal calorie target:</p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/calorie-calculator" className="text-xs font-bold px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition">Calorie Calculator →</Link>
                  <Link to="/bmr-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">BMR Calculator</Link>
                  <Link to="/bmi-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">BMI Calculator</Link>
                  <Link to="/ideal-weight-calculator" className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-brand-600 dark:text-brand-400 rounded-lg hover:bg-gray-50 transition">Ideal Weight</Link>
                </div>
              </div>

            </div>

            {/* Related Articles */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { to: '/blog/bmi-india-guide', title: 'BMI in India: What Your Number Really Means' },
                  { to: '/blog/bmr-vs-tdee', title: "BMR vs TDEE — What's the Difference?" },
                  { to: '/blog/body-fat-percentage', title: 'Healthy Body Fat % by Age & Gender' },
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
    </>
  );
};

export { CalorieGuide };
export default CalorieGuide;