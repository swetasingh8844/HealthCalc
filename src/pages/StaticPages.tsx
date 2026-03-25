
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
      <Link to="/" className="group flex items-center gap-3 text-gray-500 hover:text-brand-600 transition-all">
        <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="font-bold text-l uppercase tracking-widest">Home</span>
      </Link>

      <div className="flex flex-col items-center">
        <p className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">{title}</p>
        <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.3em]">{subtitle}</span>
      </div>

      {/* <div className="w-[72px]" /> */}
    </div>
  </header>
);
export const About: React.FC = () => (
  <>
    <Helmet>
      <title>About Us | TheFitCalculator</title>
      <meta
        name="description"
        content="Learn about TheFitCalculator — our mission to make free, science-backed health calculators accessible to everyone, from BMI and BMR to ideal weight and daily calories."
      />
      <link rel="canonical" href="https://thefitcalculator.com/about" />
    </Helmet>

   <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader title="About" subtitle="Our Mission" />
 
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl px-8 py-12 text-center shadow-lg overflow-hidden relative">
        {/* decorative circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-white/5 rounded-full" />

        <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Our Mission
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          Health Clarity for Everyone
        </h1>
        <p className="text-brand-100 text-base leading-relaxed max-w-xl mx-auto">
          TheFitCalculator offers free and reliable health calculators built on established scientific methods. We also have fitness reels, yoga and meditation guide youtube videos, daily health news, and a curated fitness shop. The goal is to make health information easy to access for everyone, so they can better understand their body and make informed choices about their wellbeing.
        </p>
      </div>

      {/* ── Mission + Story ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Why We Built This
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
          Understanding your health shouldn’t feel complicated or expensive. Many people just want simple answers about their BMI, metabolism, ideal weight, or daily calorie needs without dealing with paywalls or difficult medical terms. That’s the idea behind TheFitCalculator. It aims to provide clear and practical insights so you can make better decisions about your health and daily habits.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          The calculators are based on well-known formulas like Mifflin-St Jeor, Harris-Benedict, Devine, and WHO reference standards, which are commonly used by health professionals. Here, these methods are explained in a simple way, free to use, and designed to work smoothly on any device so you can check and understand your numbers whenever you need to.
        </p>
      </div>

      {/* ── What We Offer ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Our Free Calculators
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              title: 'BMI Calculator',
              desc: 'Find out if your weight falls within a healthy range for your height, using WHO-standard categories.',
              href: '/bmi-calculator',
              color: 'border-brand-300 dark:border-brand-700',
              bg: 'bg-brand-50 dark:bg-yellow-900/20',
              hColor: 'text-brand-700 dark:text-brand-300',
            },
            {
              title: 'BMR Calculator',
              desc: 'Discover how many calories your body burns at rest — the foundation of any nutrition plan.',
              href: '/bmr-calculator',
              color: 'border-blue-300 dark:border-blue-700',
              bg: 'bg-blue-50 dark:bg-blue-900/20',
              hColor: 'text-blue-700 dark:text-blue-300',
            },
            {
              title: 'Calorie Calculator',
              desc: 'Calculate your daily calorie needs for weight loss, maintenance, or muscle gain based on your activity level.',
              href: '/calorie-calculator',
              color: 'border-green-300 dark:border-green-700',
              bg: 'bg-green-50 dark:bg-green-900/20',
              hColor: 'text-green-700 dark:text-green-300',
            },
            {
              title: 'Ideal Weight Calculator',
              desc: 'Estimate your recommended healthy body weight using the clinically recognised Devine formula.',
              href: '/ideal-weight-calculator',
              color: 'border-yellow-300 dark:border-yellow-700',
              bg: 'bg-yellow-50 dark:bg-yellow-900/20',
              hColor: 'text-yellow-700 dark:text-yellow-300',
            },
             {
    title: 'Water Intake Calculator',
    desc: 'Find out exactly how much water your body needs daily based on your weight and activity level.',
    href: '/water-intake-calculator',
    color: 'border-cyan-300 dark:border-cyan-700',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    hColor: 'text-cyan-700 dark:text-cyan-300',
  },
  {
    title: 'Weight Loss Calculator',
    desc: 'Plan your calorie deficit and get a realistic timeline to reach your target weight safely.',
    href: '/weight-loss-calculator',
    color: 'border-rose-300 dark:border-rose-700',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    hColor: 'text-rose-700 dark:text-rose-300',
  },
             {
    title: 'Body Fat Calculator',
    desc: 'Estimate your body fat percentage using the US Navy method and BMI method.',
    href: '/body-fat-calculator',
    color: 'border-purple-300 dark:border-purple-700',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    hColor: 'text-purple-700 dark:text-purple-300',
  },
  {
    title: 'Protein Intake Calculator',
    desc: 'Calculate how much protein your body needs daily for your goals — muscle gain, weight loss, or maintenance.',
    href: '/protein-intake-calculator',
    color: 'border-orange-300 dark:border-orange-700',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    hColor: 'text-orange-700 dark:text-orange-300',
  },
            {
    title: 'Life Expectancy Calculator',
    desc: 'Get a science-backed estimate of your longevity based on your lifestyle and health factors.',
    href: '/life-expectancy-calculator',
    color: 'border-teal-300 dark:border-teal-700',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    hColor: 'text-teal-700 dark:text-teal-300',
  },
  {
    title: 'Unit Converter',
    desc: 'Convert kg to lbs, cm to feet and inches, and more — instantly before entering your measurements.',
    href: '/unit-converter',
    color: 'border-gray-300 dark:border-gray-600',
    bg: 'bg-gray-50 dark:bg-gray-800/50',
    hColor: 'text-gray-700 dark:text-gray-300',
  },
          ].map((tool) => (
            <a
              key={tool.title}
              href={tool.href}
              className={`block p-4 rounded-xl border-l-4 ${tool.bg} ${tool.color} hover:shadow-md transition-shadow group`}
            >
              <p className={`text-sm font-bold mb-1 group-hover:underline ${tool.hColor}`}>
                {tool.title} →
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{tool.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* ── Values ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          What We Stand For
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: '🔬',
              title: 'Science-Backed',
              desc: 'Every calculator uses formulas trusted by doctors and dietitians worldwide — WHO, Mifflin-St Jeor, Devine, and Harris-Benedict.',
            },
            {
              icon: '🆓',
              title: 'Always Free',
              desc: 'No sign-up, no subscription, no hidden fees. Our tools are and will always be completely free to use.',
            },
            {
              icon: '🌍',
              title: 'Accessible to All',
              desc: 'We support metric and imperial units, plain language explanations, and a design that works on any device.',
            },
          ].map((v) => (
            <div
              key={v.title}
              className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-200 dark:border-gray-600 text-center"
            >
              <div className="text-3xl mb-2">{v.icon}</div>
              <p className="font-bold text-sm text-gray-800 dark:text-white mb-1">{v.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
    </div>
  </>
);

export const PrivacyPolicy: React.FC = () => (
  <>
    <Helmet>
      <title>Privacy Policy | TheFitCalculator</title>
      <meta
        name="description"
        content="Read the Privacy Policy of TheFitCalculator. Learn how we handle your data, use cookies, and protect your privacy when using our free health calculators."
      />
      <link rel="canonical" href="https://thefitcalculator.com/privacy-policy" />
    </Helmet>

    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader title="Privacy" subtitle="Policy" />

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl px-8 py-10 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-brand-100 text-sm">
  Last updated:{' '}
  <strong className="text-white">24 March 2026</strong>
</p>
        </div>

        {/* Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block" />
            Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-2">
            Welcome to <strong className="text-gray-800 dark:text-gray-100">TheFitCalculator</strong> (
            <a href="https://thefitcalculator.com" className="text-brand-600 dark:text-brand-400 hover:underline">
              https://thefitcalculator.com
            </a>
            ). Your privacy is important to us. This Privacy Policy explains what information we collect, how we use it, and how we keep it safe.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            By using this website, you agree to the terms of this Privacy Policy.
          </p>
        </div>

        {/* 1. No Personal Data Storage */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block" />
            1. No Personal Data Storage
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
            All calculations on TheFitCalculator are performed directly in your browser.
          </p>
          <ul className="space-y-2 mb-3">
            {[
              'We do not store, collect, or transmit your personal health data.',
              'Inputs like height, weight, age, etc. remain on your device.',
              'No login or account is required.',
            ].map((item) => (
              <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            This means your personal data stays completely private.
          </p>
        </div>

        {/* 2. Information We May Collect */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block" />
            2. Information We May Collect
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
            We may collect non-personal, anonymous data automatically, such as:
          </p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {[
              { label: 'Browser', desc: 'Browser type and version.' },
              { label: 'Pages Visited', desc: 'Pages visited and time spent.' },
              { label: 'Device Info', desc: 'Device type and screen size.' },
              { label: 'Usage Patterns', desc: 'General usage patterns for improving tools.' },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl border-l-4 border-brand-300 dark:border-brand-700 bg-gray-50 dark:bg-gray-700/40">
                <p className="text-sm font-bold text-gray-800 dark:text-white mb-0.5">{item.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            This data helps us improve user experience and website performance.
          </p>
        </div>

        {/* 3. Cookies */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block" />
            3. Cookies
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
            We use cookies to enhance your experience. Types of cookies:
          </p>
          <ul className="space-y-2 mb-3">
            {[
              'Functional cookies – to remember preferences like dark/light mode.',
              'Analytics cookies – to understand website usage.',
              'Advertising cookies – used by third-party ad partners.',
            ].map((item) => (
              <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            You can disable cookies anytime in your browser settings.
          </p>
        </div>

        {/* 4. Advertising Partners */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block" />
            4. Advertising Partners
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
            We may use third-party advertising networks to display ads on our website. These ad networks may:
          </p>
          <ul className="space-y-2 mb-3">
            {[
              'Use cookies and similar tracking technologies.',
              'Show ads based on your interests and browsing behavior.',
              'Collect anonymous usage data such as device type, browser, and pages visited.',
            ].map((item) => (
              <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            We do not control how these third-party ad networks collect or use your data. We recommend reviewing their respective privacy policies for more information.
          </p>
        </div>

        {/* 5. Amazon Affiliate Disclosure */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block" />
            5. Amazon Affiliate Disclosure
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
            TheFitCalculator participates in the <strong className="text-gray-800 dark:text-gray-100">Amazon Associates Program</strong>, an affiliate advertising program.
          </p>
          <ul className="space-y-2 mb-3">
            {[
              'Some links on our website are affiliate links.',
              'If you click and make a purchase, we may earn a commission.',
              'There is no extra cost to you.',
            ].map((item) => (
              <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            This helps us keep our tools free for users.
          </p>
        </div>

        {/* 6. External Links */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block" />
            6. External Links
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
            Our website may contain links to third-party websites. We are not responsible for:
          </p>
          <ul className="space-y-2 mb-3">
            {[
              'Content on external websites.',
              'Their privacy practices.',
            ].map((item) => (
              <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            We recommend reading their privacy policies before interacting with them.
          </p>
        </div>

        {/* 7. Children's Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block" />
            7. Children's Information
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
            TheFitCalculator is designed for a general audience and can be used by individuals of all ages.
          </p>
          <ul className="space-y-2 mb-3">
            {[
              'We do not knowingly collect personal data from children under 13.',
              'All calculations run locally and no data is stored.',
            ].map((item) => (
              <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            If you believe a child has provided personal information, please{' '}
            <a href="/contact" className="underline text-brand-500">contact us</a> and we will take appropriate action.
          </p>
        </div>

        {/* 8. Data Protection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block" />
            8. Data Protection
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            We take reasonable steps to protect your information. However, no method of transmission over the internet is 100% secure.
          </p>
        </div>

        {/* 9. Changes */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block" />
            9. Changes to This Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
            We may update this Privacy Policy from time to time.
          </p>
          <ul className="space-y-2">
            {[
              'Updates will be posted on this page.',
              'The "Last updated" date will be revised.',
            ].map((item) => (
              <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 10. Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full inline-block" />
            10. Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            If you have any questions about this Privacy Policy, please{' '}
            <a href="/contact" className="text-brand-600 dark:text-brand-400 hover:underline font-bold">
              contact us here
            </a>.
          </p>
        </div>

        {/* Consent */}
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-700 rounded-2xl p-5 text-center">
          <p className="text-brand-700 dark:text-brand-300 text-sm font-bold mb-1">Consent</p>
          <p className="text-brand-600 dark:text-brand-400 text-sm leading-relaxed">
            By using our website, you consent to this Privacy Policy.
          </p>
        </div>

      </div>
    </div>
  </>
);

export const ContactUs: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const FORMSPREE_ID = 'xdadldpl';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | TheFitCalculator</title>
        <meta
          name="description"
          content="Get in touch with TheFitCalculator. Ask a question, report an issue, or suggest a new feature for our free health calculators."
        />
        <link rel="canonical" href="https://thefitcalculator.com/contact" />
      </Helmet>

       <div className="min-h-screen bg-white dark:bg-gray-950">
        <PageHeader title="Contact" subtitle="Get in Touch" />
 
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

        {/* ── Hero ── */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl px-8 py-10 relative overflow-hidden shadow-lg">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
          <div className="relative">
            <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Get in Touch
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Contact Us</h1>
            <p className="text-brand-100 text-sm max-w-lg leading-relaxed">
              Got a question about any of our calculators? Found something that is not working? Want to suggest something new? Send us a message. We read every single one and usually reply within 48 hours.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Left: Info cards ── */}
          <div className="space-y-4">

            {/* What to contact us about */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
              <h2 className="text-base font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-4 bg-brand-500 rounded-full inline-block"></span>
                How Can We Help?
              </h2>
              <div className="space-y-3">
                {[
                  { icon: '🐛', label: 'Report a Bug', desc: 'Found an issue with a calculator or the site?' },
                  { icon: '💡', label: 'Suggest a Feature', desc: 'Have an idea for a new calculator or tool?' },
                  { icon: '❓', label: 'General Questions', desc: 'Questions about how our tools work?' },
                  { icon: '🤝', label: 'Partnership', desc: 'Interested in collaborating or partnering?' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white leading-tight">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct email */}
            {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
              <h2 className="text-base font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-4 bg-brand-500 rounded-full inline-block"></span>
                Direct Email
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
                Prefer to email directly? Reach us at:
              </p>
              <a
                href="mailto:hello@thefitcalculator.com"
                className="inline-block text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline break-all"
              >
                hello@thefitcalculator.com
              </a>
            </div> */}

            {/* Response time */}
            <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-700 rounded-2xl p-5">
              <p className="text-brand-700 dark:text-brand-300 text-xs leading-relaxed">
                <strong className="block mb-1">⏱ Response Time</strong>
                We typically respond within 24–48 hours on working days. We appreciate your patience.
              </p>
            </div>

          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">

              <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-4">
                <h2 className="text-white font-bold text-base">Send Us a Message</h2>
                <p className="text-brand-100 text-xs mt-0.5">Fill in the form below and we'll get back to you</p>
              </div>

              <div className="p-6">
                {status === 'success' ? (
                  <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg">
                      ✓
                    </div>
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out. We've received your message and will get back to you within 48 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline"
                    >
                      ← Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">

                    {status === 'error' && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-800">
                        Something went wrong. Please try again or email us directly at{' '}
                        <a href="mailto:hello@thefitcalculator.com" className="font-bold underline">
                          hello@thefitcalculator.com
                        </a>
                        .
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Subject
                      </label>
                      <select
                        name="subject"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition text-sm"
                      >
                        <option value="">Select a topic…</option>
                        <option value="Bug Report">🐛 Bug Report</option>
                        <option value="Feature Suggestion">💡 Feature Suggestion</option>
                        <option value="General Question">❓ General Question</option>
                        <option value="Calculator Feedback">📊 Calculator Feedback</option>
                        <option value="Partnership">🤝 Partnership Inquiry</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition text-sm resize-none"
                        placeholder="Tell us how we can help you…"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-200 dark:shadow-none text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        'Send Message →'
                      )}
                    </button>

                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center leading-relaxed">
                      By submitting this form you agree to our{' '}
                      <a href="/privacy-policy" className="text-brand-500 hover:underline">Privacy Policy</a>.
                      We never share your email with third parties.
                    </p>

                  </form>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
      </div>
    </>
  );
};