import React, { useState } from 'react';
import { calculateIdealWeight } from '../../../utils/calculations';
import { UnitSystem, Gender } from '../../../types';
import { Helmet } from 'react-helmet-async';
import { UnitConverter } from '../../components/UnitConverter';

// ── Accordion FAQ Item ────────────────────────────────────────────────────────
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-brand-400 dark:border-brand-500 shadow-sm' : 'border-gray-200 dark:border-gray-700'}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug">{question}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-300 ${open ? 'bg-brand-600 rotate-45' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-3 bg-gray-50 dark:bg-gray-900/40 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};

export const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [unit, setUnit] = useState<UnitSystem>(UnitSystem.Metric);
  const [result, setResult] = useState<number | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height) return;

    let h = parseFloat(height);

    if (unit === UnitSystem.Imperial) {
      h = h * 2.54; // inches to cm
    }

    const idealWeight = calculateIdealWeight(gender, h);
    setResult(idealWeight);

    // @ts-ignore
    window.gtag?.('event', 'calculate_ideal_weight', {
      ideal_weight_val: idealWeight.toFixed(1),
      gender: gender,
    });
  };

  const handleReset = () => {
    setHeight('');
    setGender(Gender.Male);
    setResult(null);
  };

  const displayWeight = result !== null
    ? unit === UnitSystem.Metric
      ? `${result.toFixed(1)} kg`
      : `${(result * 2.20462).toFixed(1)} lbs`
    : '';

  // ±5 kg range
  const rangeLow = result !== null
    ? unit === UnitSystem.Metric
      ? (result - 5).toFixed(1)
      : ((result - 5) * 2.20462).toFixed(1)
    : '';
  const rangeHigh = result !== null
    ? unit === UnitSystem.Metric
      ? (result + 5).toFixed(1)
      : ((result + 5) * 2.20462).toFixed(1)
    : '';
  const weightUnit = unit === UnitSystem.Metric ? 'kg' : 'lbs';

  const faqs = [
    {
      question: 'Is ideal body weight the same for everyone?',
      answer:
        'No — ideal body weight is an estimate, not a universal fixed number. Even two people with identical height and gender can have different healthy weights due to differences in muscle mass, bone density, frame size, and body composition. The Devine formula used by this calculator provides a useful starting point, but the result should always be interpreted alongside other health indicators and professional advice.',
    },
    {
      question: 'Can athletes weigh more than their ideal weight?',
      answer:
        'Yes, absolutely. Athletes and individuals who train regularly with weights often carry significantly more lean muscle mass than the average person. Since muscle is denser and heavier than fat, their total body weight may exceed the ideal weight estimate while their body fat percentage remains very low. In these cases, ideal weight formulas are poor indicators of health — body composition analysis is more appropriate.',
    },
    {
      question: 'Should I aim for the exact ideal weight?',
      answer:
        'No — ideal body weight should be treated as a general guideline and a useful reference point, not a rigid target. A healthy weight range of approximately ±5 kg around the calculated ideal is typically considered acceptable for most adults. More importantly, focus on how you feel, your energy levels, strength, cardiovascular fitness, and long-term sustainable habits rather than achieving a specific number on the scale.',
    },
    {
      question: 'What is the Devine formula and how accurate is it?',
      answer:
        'The Devine formula was developed in 1974 by Dr. B.J. Devine, originally to calculate drug dosages in clinical medicine — not specifically as a weight goal for healthy adults. For men: IBW = 50 kg + 2.3 kg per inch over 5 feet. For women: IBW = 45.5 kg + 2.3 kg per inch over 5 feet. It is widely used but has limitations — it was derived from a relatively small population and does not account for muscle mass, frame size, ethnicity, or age. Other formulas like Robinson, Miller, and Hamwi exist and produce slightly different results.',
    },
    {
      question: 'How is ideal weight different from BMI?',
      answer:
        'BMI (Body Mass Index) tells you whether your current weight is appropriate relative to your height by calculating a single number and placing it in a category (underweight, normal, overweight, obese). Ideal body weight, on the other hand, gives you a target weight in kg or lbs that is considered healthy for your specific height and gender. Both are useful screening tools, but neither accounts for body composition — two people with the same BMI or ideal weight can have very different amounts of muscle and fat.',
    },
    {
      question: 'Does ideal weight change with age?',
      answer:
        'The Devine formula itself does not change with age — it gives the same result regardless of whether you are 25 or 65. However, in practice, body composition does change significantly with age. Adults typically lose muscle mass after their mid-thirties (sarcopenia) and may naturally weigh less while carrying more body fat. Some clinicians suggest that slightly higher body weight in older adults (65+) may actually be protective against frailty and illness. Always discuss age-appropriate weight goals with your healthcare provider.',
    },
    {
      question: 'What is a healthy weight range rather than a single number?',
      answer:
        'Because body composition varies so widely between individuals, most health professionals prefer to work with a weight range rather than a single ideal number. A common approach is to use the calculated ideal weight as the midpoint and allow ±5 kg (±11 lbs) as an acceptable healthy range. Those at the lower end of the range tend to have a leaner build, while those at the higher end may carry more lean muscle mass. Both can be perfectly healthy depending on individual circumstances.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Ideal Weight Calculator - Find Your Healthy Body Weight Free</title>
        <meta
          name="description"
          content="Find your ideal body weight instantly with our free online calculator. Based on the Devine formula using height and gender. Supports metric and imperial units."
        />
        <link rel="canonical" href="https://thefitcalculator.com/ideal-weight-calculator" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── Page Title ── */}
        <div className="text-center pb-2">
          {/* <span className="inline-block bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Free Online Tool</span> */}
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Ideal Weight Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg mx-auto">Estimate your recommended healthy body weight based on your height and gender using the clinically recognised Devine formula.</p>
        </div>

        {/* ── Calculator Card ── */}
        <section id="ideal-weight-calculator" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4">
            <h2 className="text-white font-bold text-lg">Ideal Weight Calculator (Devine Formula)</h2>
            <p className="text-brand-100 text-xs mt-0.5">Supports Metric and Imperial units</p>
          </div>

          <div className="p-6">

            {/* Unit Toggle + Converter Link */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl">
                <button
                  onClick={() => setUnit(UnitSystem.Metric)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${unit === UnitSystem.Metric ? 'bg-white dark:bg-gray-800 text-brand-700 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  Metric (cm)
                </button>
                <button
                  onClick={() => setUnit(UnitSystem.Imperial)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${unit === UnitSystem.Imperial ? 'bg-white dark:bg-gray-800 text-brand-700 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                  Imperial (inches)
                </button>
              </div>

              {/* Unit Converter Link */}
              <a
                href="/unit-converter"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700 px-3 py-2 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 16V4m0 0L3 8m4-4 4 4" /><path d="M17 8v12m0 0 4-4m-4 4-4-4" />
                </svg>
                Open Unit Converter <br />
              <span className="inline-block mt-1">→</span>

              </a>
            </div>

            <form onSubmit={handleCalculate} className="space-y-5">

              {/* Gender Toggle */}
              <div>
                <label className="block text-xs font-bold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Male', value: Gender.Male },
                    { label: 'Female', value: Gender.Female },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setGender(item.value)}
                      className={`py-3 rounded-xl border font-bold text-sm transition-all ${
                        gender === item.value
                          ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Height Input */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Height ({unit === UnitSystem.Metric ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                  placeholder={unit === UnitSystem.Metric ? 'e.g. 175' : 'e.g. 69'}
                  required
                  min="1"
                  step="0.1"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-200 dark:shadow-none text-sm"
                >
                  Calculate Ideal Weight
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Result */}
            {result !== null && (
           <div className="mt-6 rounded-2xl border border-brand-100 dark:border-brand-800 bg-white dark:bg-gray-900 p-5 animate-in fade-in slide-in-from-bottom-2 duration-500">



                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Your Ideal Weight</p>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-6xl font-extrabold text-brand-700 dark:text-brand-400 leading-none">
                    {unit === UnitSystem.Metric ? result.toFixed(1) : (result * 2.20462).toFixed(1)}
                  </span>
                  <span className="text-xl font-bold mb-1 text-brand-600 dark:text-brand-400">{weightUnit}</span>
                </div>

                {/* Healthy Range Cards */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'Lower Range', value: rangeLow, desc: 'Leaner build', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-800' },
                    { label: 'Ideal Weight', value: unit === UnitSystem.Metric ? result.toFixed(1) : (result * 2.20462).toFixed(1), desc: 'Devine formula', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-100 dark:border-green-800' },
                    { label: 'Upper Range', value: rangeHigh, desc: 'More muscle mass', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-100 dark:border-yellow-800' },
                  ].map((card) => (
                    <div key={card.label} className={`rounded-xl p-3 border text-center ${card.bg} ${card.border}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${card.color}`}>{card.label}</p>
                      <p className={`text-base font-extrabold ${card.color}`}>{card.value} <span className="text-xs font-semibold">{weightUnit}</span></p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">{card.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 italic">
                  Healthy weight range shown as ±5 {weightUnit} around your ideal. Both ends can be healthy depending on body composition.
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Based on the Devine formula for {gender === Gender.Male ? 'men' : 'women'}. Ideal weight varies by body composition, muscle mass, and frame size. Use this as a reference point, not a strict target.
                </p>

                <div className="mt-4 pt-4 border-t border-brand-100 dark:border-brand-800 flex flex-wrap justify-between items-center gap-2">
                  <button
                    onClick={() => {
                      const shareText = `My ideal weight is ${displayWeight}. Check yours at https://thefitcalculator.com/ideal-weight-calculator`;
                      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                      if (isMobile && navigator.share) {
                        navigator.share({ title: 'My Ideal Weight Result', text: shareText }).catch(() => {});
                      } else {
                        setShowShareOptions(true);
                      }
                    }}
                    className="text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    ↗ Share Results
                  </button>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 italic">*Consult a professional for a personalised assessment.</span>
                </div>

                {showShareOptions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href={`https://wa.me/?text=${encodeURIComponent(`My ideal weight is ${displayWeight}. Check yours at https://thefitcalculator.com/ideal-weight-calculator`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold">WhatsApp</a>
                    <a href={`https://t.me/share/url?text=${encodeURIComponent(`My ideal weight is ${displayWeight}. Check yours at https://thefitcalculator.com/ideal-weight-calculator`)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-semibold">Telegram</a>
                    <a href={`mailto:?subject=My Ideal Weight Result&body=${encodeURIComponent(`My ideal weight is ${displayWeight}. Check yours at https://thefitcalculator.com/ideal-weight-calculator`)}`} className="px-3 py-2 bg-gray-700 text-white rounded-lg text-xs font-semibold">Email</a>
                    <button onClick={() => { navigator.clipboard.writeText(`My ideal weight is ${displayWeight}. Check yours at https://thefitcalculator.com/ideal-weight-calculator`); alert('Copied to clipboard!'); }} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-xs font-semibold">Copy</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Content Section ── */}
        <section className="space-y-6">

          {/* What is ideal weight */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              What is Ideal Body Weight?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Ideal body weight (IBW) is an estimated healthy weight range based primarily on your height and gender. It is used in clinical settings to guide drug dosing, nutritional planning, and general health assessments. While no single weight is perfect for every person, staying within or close to your ideal weight range is associated with lower risk of chronic diseases including hypertension, cardiovascular disease, type 2 diabetes, and joint problems.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Why Knowing Your Ideal Weight Matters
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Having a reference point for your healthy weight helps you set realistic, achievable fitness and nutrition goals. Rather than chasing an arbitrary number you saw on social media or comparing yourself to others, your ideal body weight gives you a personalised, science-based target calibrated to your own body. It also helps you track progress meaningfully — understanding whether you are above, below, or within your healthy range gives context to your weight management journey.
            </p>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Factors That Affect Your Ideal Weight
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: 'Muscle Mass', desc: 'Higher muscle mass means a higher healthy weight. Strength athletes typically weigh more than the formula suggests while remaining very lean.', color: 'border-brand-300 dark:border-brand-700' },
                { label: 'Frame Size', desc: 'People with larger bone structures (broad shoulders, wide hips) naturally carry more weight at a healthy body composition.', color: 'border-blue-300 dark:border-blue-700' },
                { label: 'Age', desc: 'Body composition changes with age — muscle tends to decrease and fat tends to increase, even when the scale stays the same.', color: 'border-green-300 dark:border-green-700' },
                { label: 'Activity Level', desc: 'Regularly active individuals, particularly those doing resistance training, often have a higher healthy weight due to lean muscle mass.', color: 'border-yellow-300 dark:border-yellow-700' },
                { label: 'Ethnicity', desc: 'Research shows that health risks at the same body weight can differ by ethnic group. Some populations carry higher metabolic risk at lower weights.', color: 'border-purple-300 dark:border-purple-700' },
                { label: 'Gender', desc: 'Men and women have different healthy weight ranges at the same height, reflecting differences in bone density and body fat distribution.', color: 'border-red-300 dark:border-red-700' },
              ].map((item) => (
                <div key={item.label} className={`p-3 rounded-xl border-l-4 bg-gray-50 dark:bg-gray-700/40 ${item.color}`}>
                  <p className="text-sm font-bold text-gray-800 dark:text-white mb-0.5">{item.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How it's calculated */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              How is Ideal Weight Calculated?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              This calculator uses the <strong className="text-gray-800 dark:text-gray-100">Devine formula</strong>, developed in 1974 and still widely used in clinical medicine. It calculates ideal body weight based on height in feet and inches above 5 feet.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">For Men</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm leading-relaxed">IBW = 50 kg + 2.3 kg × (inches over 5 ft)</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">For Women</p>
                <p className="text-gray-900 dark:text-white font-bold text-sm leading-relaxed">IBW = 45.5 kg + 2.3 kg × (inches over 5 ft)</p>
              </div>
            </div>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-400 rounded-full inline-block"></span>
              Worked Example
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-200 dark:border-gray-600 text-sm">
              <p className="font-bold text-gray-800 dark:text-gray-100 mb-2">Male, 5 feet 10 inches (177.8 cm):</p>
              <p className="text-gray-600 dark:text-gray-300 leading-loose">
                Height above 5 ft = 10 inches<br />
                IBW = 50 + (2.3 × 10)<br />
                IBW = 50 + 23 = <strong className="text-brand-700 dark:text-brand-400">73 kg (approx. 160.9 lbs)</strong><br />
                Healthy range = <strong className="text-green-600 dark:text-green-400">68 – 78 kg</strong>
              </p>
            </div>

            <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Other Ideal Weight Formulas
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
              Several other formulas are used in medical and research settings. All produce similar but slightly different results:
            </p>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/60">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Formula</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Men base</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Women base</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Per inch over 5 ft</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { formula: 'Devine (this calculator)', men: '50 kg', women: '45.5 kg', inch: '2.3 kg', dot: 'bg-brand-400' },
                    { formula: 'Robinson', men: '52 kg', women: '49 kg', inch: '1.9 kg', dot: 'bg-blue-400' },
                    { formula: 'Miller', men: '56.2 kg', women: '53.1 kg', inch: '1.41 kg', dot: 'bg-green-400' },
                    { formula: 'Hamwi', men: '48 kg', women: '45.5 kg', inch: '2.7 kg', dot: 'bg-yellow-400' },
                  ].map((row) => (
                    <tr key={row.formula} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.dot}`}></span>
                          {row.formula}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.men}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.women}</td>
                      <td className="px-4 py-3 font-bold text-brand-600 dark:text-brand-400">{row.inch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* IBW vs BMI + Benefits */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Ideal Weight vs BMI — What's the Difference?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2">BMI</p>
                <ul className="space-y-1.5">
                  {['Compares current weight to height', 'Results in a category (underweight, normal, obese)', 'Tells you where you are now', 'Same formula for all heights'].map(item => (
                    <li key={item}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5 marker:text-gray">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
                <p className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-wider mb-2">Ideal Weight</p>
                <ul className="space-y-1.5">
                  {['Gives you a target weight in kg or lbs', 'Provides a specific number to work toward', 'Tells you where you should aim to be', 'Adjusted for gender and height'].map(item => (
                    <li key={item}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5 marker:text-gray">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Benefits of Knowing Your Ideal Weight
            </h2>
            <ul className="space-y-2">
              {[
                'Helps you set realistic, personalised fitness and weight management goals',
                'Reduces risk of heart disease, hypertension, type 2 diabetes, and joint problems',
                'Provides a reference point to track long-term progress meaningfully',
                'Supports better planning for diet, exercise, and lifestyle changes',
                'Useful for healthcare providers when calculating medication dosages',
              ].map((item) => (
                <li key={item}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5 marker:text-gray">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Limitations of Ideal Weight Formulas
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
              While useful, ideal weight calculators have significant limitations and should always be used alongside other health indicators:
            </p>
            <ul className="space-y-2 mb-5">
              {[
                'Originally developed for clinical drug dosing — not specifically as a fitness or health target for the general public',
                'Does not account for body composition — two people at the same "ideal weight" can have very different muscle-to-fat ratios',
                'May underestimate healthy weight for athletes and heavily muscular individuals',
                'Does not consider bone density, frame size, ethnicity, or age-related changes in body composition',
                'Provides a single point estimate — in reality, a range of weights can be healthy for any given height',
              ].map((item) => (
                <li key={item}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5 marker:text-gray">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Conclusion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Knowing your ideal body weight is a valuable step toward setting meaningful health and fitness goals. Use it as a directional guide rather than a rigid rule — what matters most is your overall body composition, how you feel, your energy levels, and your long-term sustainable habits. Use our free Ideal Weight Calculator above to find your personalised estimate, and consider pairing it with a BMI check and consultation with a healthcare professional for the full picture.
            </p>
          </div>

          {/* ── FAQ Section ── */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
              Frequently Asked Questions
            </h2>
            {/* <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Click any question to reveal the answer.</p> */}

            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

        </section>
      </div>

      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs
        .filter(f => f.question && f.answer) // remove empty items
        .map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer.replace(/<[^>]+>/g, ''), // remove HTML
          },
        })),
    }),
  }}
/>

    </>
  );
};