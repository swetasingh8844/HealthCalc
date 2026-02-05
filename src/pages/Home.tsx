
import React from 'react';
import { BMICalculator } from '../components/calculators/BMICalculator';
import { BMRCalculator } from '../components/calculators/BMRCalculator';
import { CalorieCalculator } from '../components/calculators/CalorieCalculator';
import { IdealWeightCalculator } from '../components/calculators/IdealWeightCalculator';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Ad */}
      <AdPlaceholder slot="top-banner" className="h-[90px]" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
              Calculate Your Health Metrics <span className="text-brand-600 dark:text-brand-500">Instantly</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              Use our suite of free, professional health tools to track your progress. From BMI calculations to daily calorie needs, we've got you covered.
            </p>
          </header>

          <BMICalculator />

          <BMRCalculator />

          <CalorieCalculator />

          <IdealWeightCalculator />

          {/* In-content Ad */}
          <AdPlaceholder slot="mid-content" className="h-[250px]" />

          <article className="prose prose-brand dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">What is BMI?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults. It is defined as the weight in kilograms divided by the square of the height in metres (kg/m²).
              </p>
              <h3 className="text-xl font-bold mb-2">Why Calculate Your BMI?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                While BMI is not a direct measure of body fatness, it provides a reliable indicator for most people. It is used as a screening tool to identify potential weight problems for adults. However, BMI does not take into account muscle mass, bone density, and overall body composition.
              </p>
            </section>

            <hr className="border-gray-100 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">Understanding BMR (Basal Metabolic Rate)</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your BMR represents the minimum amount of energy (calories) your body requires to keep its vital systems functioning—like breathing, blood circulation, and cell production—while at complete rest. 
              </p>
              <h3 className="text-xl font-bold mb-2">Factors Influencing BMR</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Several variables determine your metabolic rate:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Muscle Mass:</strong> Muscle burns more energy at rest than fat, so higher muscle mass increases BMR.</li>
                <li><strong>Age:</strong> Metabolic rate typically slows down as we age due to changes in muscle tissue.</li>
                <li><strong>Gender:</strong> Men generally have a slightly higher BMR because they often possess more lean muscle mass.</li>
                <li><strong>Genetics:</strong> Individual metabolic traits can vary based on your family history.</li>
              </ul>
            </section>

            <hr className="border-gray-100 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">Mastering Your Daily Calories</h2>
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
            </section>

            <hr className="border-gray-100 dark:border-gray-700" />

            <section>
              <h2 className="text-2xl font-bold mb-4">The Science of Ideal Weight</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "Ideal weight" is an estimated healthy range derived from extensive population studies. Our calculator uses the Devine Formula, a standard medical reference point for clinical assessments.
              </p>
              <h3 className="text-xl font-bold mb-2">Why It Matters</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                While no single weight is perfect for everyone, staying within your recommended ideal range significantly reduces the risk of chronic conditions like hypertension, cardiovascular disease, and joint issues. It serves as a helpful target when you are preparing long-term diet and lifestyle plans.
              </p>
            </section>
          </article>
        </div>

        <aside className="space-y-8">
          {/* Sidebar Ad */}
          <AdPlaceholder slot="sidebar-top" className="h-[600px] hidden lg:flex" label="Premium Partner" />

          <div className="bg-brand-600 dark:bg-brand-700 p-6 rounded-2xl text-white shadow-lg">
            <h3 className="text-xl font-bold mb-3">Quick Health Tips</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="bg-brand-400 dark:bg-brand-500 p-1 rounded-full h-fit mt-1">✓</span>
                <span className="text-sm">Calculate your BMI regularly to stay within healthy ranges.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-brand-400 dark:bg-brand-500 p-1 rounded-full h-fit mt-1">✓</span>
                <span className="text-sm">Use BMR to understand your baseline caloric needs at rest.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-brand-400 dark:bg-brand-500 p-1 rounded-full h-fit mt-1">✓</span>
                <span className="text-sm">Knowing your ideal weight helps set realistic fitness goals.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Why Use HealthCalculator Pro?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We provide accurate calculations based on established medical formulas like Harris-Benedict and BMI standards to help you prepare your own diet and health plans effectively.
            </p>
          </div>

          <AdPlaceholder slot="sidebar-bottom" className="h-[250px]" />
        </aside>
      </div>

      {/* Footer Ad */}
      <AdPlaceholder slot="footer-banner" className="h-[90px]" />
    </div>
  );
};
