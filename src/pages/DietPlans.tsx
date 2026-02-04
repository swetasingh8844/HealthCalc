
import React from 'react';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const DietPlans: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-6 text-gray-900">Customized Diet Plans for Your Goals</h1>
      <p className="text-lg text-gray-600 mb-10 max-w-3xl">Whether you're looking to lose weight or gain muscle, nutrition is 80% of the battle. Explore our recommended meal structures for optimal results.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-green-600 border-b pb-2">Vegetarian Weight Loss Plan</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-800">Breakfast (8:00 AM)</h4>
              <p className="text-sm text-gray-600">Oatmeal with berries, flaxseeds, and a handful of almonds.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Lunch (1:30 PM)</h4>
              <p className="text-sm text-gray-600">Quinoa salad with chickpeas, cucumber, avocado, and lemon dressing.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Dinner (7:30 PM)</h4>
              <p className="text-sm text-gray-600">Lentil soup with sautéed spinach and a small portion of brown rice.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-red-600 border-b pb-2">Non-Vegetarian Muscle Gain Plan</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-800">Breakfast (8:00 AM)</h4>
              <p className="text-sm text-gray-600">3 Scrambled eggs with whole grain toast and sliced avocado.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Lunch (1:30 PM)</h4>
              <p className="text-sm text-gray-600">Grilled chicken breast (200g) with sweet potato and steamed broccoli.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Dinner (7:30 PM)</h4>
              <p className="text-sm text-gray-600">Baked Salmon with asparagus and a side of jasmine rice.</p>
            </div>
          </div>
        </section>
      </div>

      <AdPlaceholder slot="diet-mid" className="h-[250px]" />

      <div className="mt-12 bg-gray-50 p-8 rounded-2xl border border-dashed border-gray-300">
        <h3 className="text-xl font-bold mb-4">Key Nutrition Tips</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <li className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-bold mb-1">Portion Control</h4>
            <p className="text-xs text-gray-600">Use smaller plates to naturally reduce calorie intake without feeling deprived.</p>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-bold mb-1">High Fiber</h4>
            <p className="text-xs text-gray-600">Vegetables and whole grains keep you full longer and support digestion.</p>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-bold mb-1">Stay Hydrated</h4>
            <p className="text-xs text-gray-600">Drinking water before meals can help reduce overeating.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
