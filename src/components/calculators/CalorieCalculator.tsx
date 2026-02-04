
import React, { useState } from 'react';
import { calculateDailyCalories } from '../../../utils/calculations';
import { ActivityLevel, WeightGoal } from '../../../types';

export const CalorieCalculator: React.FC = () => {
  const [bmr, setBmr] = useState<string>('');
  const [activity, setActivity] = useState<ActivityLevel>(ActivityLevel.Sedentary);
  const [goal, setGoal] = useState<WeightGoal>(WeightGoal.Maintain);
  const [result, setResult] = useState<number | null>(null);

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
        </div>
      )}
    </section>
  );
};
