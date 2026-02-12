
import React, { useState } from 'react';
import { calculateDailyCalories } from '../../../utils/calculations';
import { ActivityLevel, WeightGoal } from '../../../types';
import { Helmet } from 'react-helmet-async';
import { UnitConverter } from '../../components/UnitConverter';
export const CalorieCalculator: React.FC = () => {
  const [bmr, setBmr] = useState<string>('');
  const [activity, setActivity] = useState<ActivityLevel>(ActivityLevel.Sedentary);
  const [goal, setGoal] = useState<WeightGoal>(WeightGoal.Maintain);
  const [result, setResult] = useState<number | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);


  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bmr) return;

    const bmrVal = parseFloat(bmr);
    const calories = calculateDailyCalories(bmrVal, activity, goal);
    setResult(calories);

    // Tracking Event
    // @ts-ignore
    window.gtag?.('event', 'calculate_calories', { 
      calorie_goal: goal,
      activity_level: activity 
    });
  };

  const handleReset = () => {
    setBmr('');
    setActivity(ActivityLevel.Sedentary);
    setGoal(WeightGoal.Maintain);
    setResult(null);
  };

  return (
    <>
    <Helmet>
  <title>Calorie Calculator - Calculate Your Daily Calorie Needs</title>
  <meta
    name="description"
    content="Calculate your daily calorie needs based on your age, weight, height, and activity level using our free calorie calculator."
  />
  <link rel="canonical" href="https://thefitcalculator.com/calorie-calculator" />
</Helmet>
 {/* <UnitConverter /> */}
    <section id="calorie-calculator" className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-brand-700 dark:text-brand-500">Daily Calorie Calculator</h2>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 italic">
        Tip: If you don't know your BMR, use the BMR calculator above first.
      </p>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Your BMR (Calories)</label>
          <input 
            type="number" 
            value={bmr}
            onChange={(e) => setBmr(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
            placeholder="e.g. 1800"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Activity Level</label>
          <select 
            value={activity}
            onChange={(e) => setActivity(parseFloat(e.target.value) as ActivityLevel)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
          >
            <option value={ActivityLevel.Sedentary}>Sedentary (Little to no exercise)</option>
            <option value={ActivityLevel.LightlyActive}>Lightly Active (Exercise 1-3 days/week)</option>
            <option value={ActivityLevel.ModeratelyActive}>Moderately Active (Exercise 3-5 days/week)</option>
            <option value={ActivityLevel.VeryActive}>Very Active (Hard exercise 6-7 days/week)</option>
            <option value={ActivityLevel.ExtraActive}>Extra Active (Very hard exercise & physical job)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Weight Goal</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Lose Weight', value: WeightGoal.Loss },
              { label: 'Maintain', value: WeightGoal.Maintain },
              { label: 'Gain Weight', value: WeightGoal.Gain },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setGoal(item.value)}
                className={`py-2 text-xs font-bold rounded-lg transition border ${
                  goal === item.value 
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md' 
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3 pt-2">
          <button 
            type="submit" 
            className="flex-1 bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition shadow-lg"
          >
            Calculate Calories
          </button>
          <button 
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Reset
          </button>
        </div>
      </form>

      {result !== null && (
        <div className="mt-8 p-6 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-100 dark:border-brand-800 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Share Button */}
    <p className="text-gray-600 dark:text-gray-400 font-medium">To reach your goal, you should consume:</p>
          <div className="flex items-end gap-3 my-2">
            <span className="text-5xl font-extrabold text-brand-700 dark:text-brand-400">{Math.round(result)}</span>
            <span className="text-xl font-bold mb-1 text-brand-600">calories/day</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-4">
            {goal === WeightGoal.Loss && "This includes a caloric deficit of 500 calories to support steady weight loss."}
            {goal === WeightGoal.Gain && "This includes a caloric surplus of 500 calories to support muscle or weight gain."}
            {goal === WeightGoal.Maintain && "This represents your Total Daily Energy Expenditure (TDEE) to maintain your current weight."}
          </p>
          <div className="mt-4 pt-4 border-t border-brand-200 dark:border-brand-800 text-[10px] text-gray-400 dark:text-gray-500 italic">
             <span>*Individual results may vary based on metabolism.</span>
          </div>
<button
  onClick={() => {
    const shareText = `My daily calorie need is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/calorie-calculator`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      navigator.share({
        title: "My Daily Calorie Result",
        text: shareText
      }).catch((error) => console.log("Share failed", error));
    } else {
      setShowShareOptions(true);
    }
  }}
  className="mt-4 text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline"
>
  Share Results
</button>
{showShareOptions && (
  <div className="mt-3 flex flex-wrap gap-2">
    {/* WhatsApp */}
    <a
      href={`https://wa.me/?text=${encodeURIComponent(
        `My daily calorie need is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/calorie-calculator`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm"
    >
      WhatsApp
    </a>

    {/* Telegram */}
    <a
      href={`https://t.me/share/url?text=${encodeURIComponent(
        `My daily calorie need is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/calorie-calculator`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm"
    >
      Telegram
    </a>

    {/* Email */}
    <a
      href={`mailto:?subject=My Daily Calorie Result&body=${encodeURIComponent(
        `My daily calorie need is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/calorie-calculator`
      )}`}
      className="px-3 py-2 bg-gray-700 text-white rounded-lg text-sm"
    >
      Email
    </a>

    {/* Copy */}
    <button
      onClick={() => {
        const text = `My daily calorie need is ${Math.round(result)} calories/day. Check yours at https://thefitcalculator.com/calorie-calculator`;
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
      }}
      className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm"
    >
      Copy
    </button>
  </div>
)}
</div>
      )}
   <br></br>
     <h3 className="text-xl font-bold mb-2">What is a Calorie Calculator?</h3>
  <p className="mb-3">
    A calorie calculator estimates the number of calories your body needs
    each day based on your age, weight, height, gender, and activity level.
  </p>
  <p>
    This helps you plan your diet for weight loss, weight gain, or maintaining
    your current weight in a healthy way.
     </p>
    <br></br>
    <h3 className="text-xl font-bold mb-4">Mastering Your Daily Calories</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Calculating your daily calorie needs is the first step toward effective weight management. This metric, often called Total Daily Energy Expenditure (TDEE), combines your BMR with the energy you burn during physical activity.
              </p>
 
   <h3 className="text-xl font-bold mb-2">Caloric Goals & Management</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To prepare your diet plan, you must first define your goal:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Weight Loss:</strong> Consuming roughly 500 calories less than your TDEE daily can lead to a healthy weight loss of about 1lb (0.5kg) per week.</li>
                <li><strong>Maintenance:</strong> Eating exactly what you burn keeps your weight steady.</li>
                <li><strong>Weight Gain:</strong> A caloric surplus, combined with resistance training, supports muscle development and weight gain.</li>
              </ul>
      <br></br>
    <h3 className="text-xl font-bold mb-2">How is Daily Calorie Need Calculated?</h3>
<p className="mb-3">
  Your daily calorie requirement is calculated in two steps:
</p>

<ol className="list-decimal pl-6 mb-3 space-y-2">
  <li>First, your Basal Metabolic Rate (BMR) is calculated.</li>
  <li>Then, your BMR is multiplied by an activity factor to estimate your Total Daily Energy Expenditure (TDEE).</li>
</ol>

<h4 className="text-lg font-semibold mb-2">Step 1: BMR Formula (Mifflin-St Jeor)</h4>
<p className="mb-3">
  <strong>For Men:</strong><br />
  BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5
</p>

<p className="mb-3">
  <strong>For Women:</strong><br />
  BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161
</p>

<h4 className="text-lg font-semibold mb-2">Step 2: Activity Multipliers</h4>
<ul className="list-disc pl-6 mb-3">
  <li><strong>Sedentary:</strong> BMR × 1.2 (little or no exercise)</li>
  <li><strong>Lightly active:</strong> BMR × 1.375 (light exercise 1–3 days/week)</li>
  <li><strong>Moderately active:</strong> BMR × 1.55 (moderate exercise 3–5 days/week)</li>
  <li><strong>Very active:</strong> BMR × 1.725 (hard exercise 6–7 days/week)</li>
  <li><strong>Extra active:</strong> BMR × 1.9 (very intense exercise or physical job)</li>
</ul>

<h3 className="text-xl font-bold mb-2">Example Calculation</h3>
<p className="mb-3">
  <strong>Example:</strong><br />
  Weight: 70 kg<br />
  Height: 175 cm<br />
  Age: 25 years<br />
  Activity Level: Moderately active
</p>

<p className="mb-3">
  Step 1: BMR ≈ 1674 calories/day<br />
  Step 2: TDEE = 1674 × 1.55 = 2594.7 calories/day <br />
        TDEE ≈ 2595 calories/day
</p>

<p className="mb-3">
  So, this person needs approximately <strong>2594 calories per day</strong> to maintain their current weight.
</p>

<h3 className="text-xl font-bold mb-2">Tips for Healthy Calorie Management</h3>
<ul className="list-disc pl-6 mb-3">
  <li>Focus on whole, nutrient-dense foods</li>
  <li>Include enough protein in your diet</li>
  <li>Stay hydrated throughout the day</li>
  <li>Exercise regularly</li>
  <li>Avoid extreme calorie restrictions</li>
</ul>

<h3 className="text-xl font-bold mb-2">Why Use a Calorie Calculator?</h3>
<ul className="list-disc pl-6 mb-3">
  <li>Helps you plan a balanced diet</li>
  <li>Supports weight loss or weight gain goals</li>
  <li>Improves fitness and performance</li>
  <li>Provides personalized calorie estimates</li>
</ul>

<h3 className="text-xl font-bold mb-2">Frequently Asked Questions (FAQs)</h3>

<h4 className="text-lg font-semibold mb-1">How many calories should I eat per day?</h4>
<p className="mb-3">
  The number of calories you need depends on your age, gender, weight, height,
  and activity level. This calculator provides a personalized estimate.
</p>

<h4 className="text-lg font-semibold mb-1">Is 1200 calories per day safe?</h4>
<p className="mb-3">
  A 1200-calorie diet may be suitable for some individuals, but it is not
  appropriate for everyone. Always ensure you are meeting your nutritional
  needs.
</p>

<h4 className="text-lg font-semibold mb-1">How fast can I lose weight with a calorie deficit?</h4>
<p className="mb-3">
  A deficit of about 500 calories per day can lead to a safe and steady weight
  loss of around 0.5 kg (1 pound) per week.
</p>

<h3 className="text-xl font-bold mb-2">Conclusion</h3>
<p className="mb-3">
  A calorie calculator helps you understand your daily energy needs and
  supports better nutrition and fitness decisions. Use our free calorie
  calculator to plan your diet and reach your health goals safely.
</p>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many calories should I eat per day?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The number of calories you need depends on your age, gender, weight, height, and activity level. This calculator provides a personalized estimate."
          }
        },
        {
          "@type": "Question",
          "name": "Is 1200 calories per day safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 1200-calorie diet may be suitable for some individuals, but it is not appropriate for everyone. Always ensure you are meeting your nutritional needs."
          }
        },
        {
          "@type": "Question",
          "name": "How fast can I lose weight with a calorie deficit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A deficit of about 500 calories per day can lead to a safe and steady weight loss of around 0.5 kg (1 pound) per week."
          }
        }
      ]
    })
  }}
/>

  </section>
    </>
  );
};
