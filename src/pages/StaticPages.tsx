
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';


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

    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">

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
          TheFitCalculator offers free and reliable health calculators built on established scientific methods. The goal is to make health information easy to access for everyone, no matter their background or budget, so they can better understand their body and make informed choices about their wellbeing.
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
              desc: 'Every formula we use is drawn from peer-reviewed research and clinical standards — not guesswork or trends.',
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

    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">

      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl px-8 py-10 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
        {/* <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Legal</span> */}
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-brand-100 text-sm">
  Last updated:{" "}
  <strong className="text-white">
    {new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </strong>
</p>

      </div>

      {/* ── Intro ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
          Welcome to <strong className="text-gray-800 dark:text-gray-100">TheFitCalculator</strong> ("we", "our", or "us"), accessible at{' '}
          <a href="https://thefitcalculator.com" className="text-brand-600 dark:text-brand-400 hover:underline font-medium">
            https://thefitcalculator.com
          </a>
          . This Privacy Policy explains how we collect, use, and protect information when you visit our website and use our free online health calculators.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          We are committed to protecting your privacy. Please read this policy carefully. By using our website, you agree to the practices described in this document. If you do not agree with any part of this policy, please discontinue use of the site.
        </p>
      </div>

      {/* ── Calculator Data ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Calculator Inputs — No Data Stored
        </h2>
       <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
  All calculations on TheFitCalculator, including BMI, BMR, daily calorie needs, and ideal weight, run <strong className="text-gray-800 dark:text-gray-100">directly in your browser</strong>. This means your inputs are processed on your device, helping keep your personal data private while still giving you quick and accurate results.
</p>

        <ul className="space-y-2 mb-3">
          {[
            'Your height, weight, age, gender, and any other inputs are never transmitted to our servers.',
            'We do not store any personal health information in a database.',
            'No account, login, or registration is required to use any of our calculators.',
            'When you close or refresh your browser, all calculator inputs are cleared and permanently discarded.',
          ].map((item) => (
            <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5 marker:text-gray">
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          Your health data belongs to you. We have designed our platform specifically so that sensitive personal measurements never leave your own device.
        </p>
      </div>

      {/* ── Information We Collect ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Information We May Collect
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          While we do not collect your health data, we may automatically collect certain non-personal, anonymous information when you visit our website. This includes:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Log Data', desc: 'Your browser type, operating system, referring URLs, pages visited, and the date and time of your visit — collected automatically by web servers.' },
            { label: 'Device Information', desc: 'General information about the device you use to access the site, such as screen size and browser version, used to optimise the layout.' },
            { label: 'Usage Data', desc: 'Aggregated, anonymous data about which calculators are used most frequently, helping us improve and prioritise new features.' },
            { label: 'Cookies & Local Storage', desc: 'Small files stored in your browser to remember functional preferences such as your selected colour mode (light or dark).' },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-xl border-l-4 border-brand-300 dark:border-brand-700 bg-gray-50 dark:bg-gray-700/40">
              <p className="text-sm font-bold text-gray-800 dark:text-white mb-0.5">{item.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Cookies ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Cookies Policy
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          Cookies are small text files placed on your device by a website. We use cookies for the following purposes:
        </p>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/60">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Purpose</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Provider</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {[
                { type: 'Functional', purpose: 'Remembering your light/dark mode preference', provider: 'TheFitCalculator', dot: 'bg-green-400' },
                { type: 'Analytics', purpose: 'Understanding how visitors interact with the site (page views, session duration, traffic sources)', provider: 'Google Analytics', dot: 'bg-blue-400' },
                // { type: 'Advertising', purpose: 'Displaying relevant ads to support free access to our tools', provider: 'Google AdSense', dot: 'bg-yellow-400' },
              ].map((row) => (
                <tr key={row.type} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.dot}`}></span>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">{row.purpose}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs font-medium">{row.provider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-3 leading-relaxed">
          You can control or disable cookies through your browser settings at any time. Please note that disabling certain cookies may affect the functionality of this website.
        </p>
      </div>

      {/* ── Google Analytics & AdSense ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Third-Party Services
        </h2>

        <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2">Google Analytics</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          We use Google Analytics to collect anonymous, aggregated information about how visitors use our website — such as which pages are visited most often, how long people spend on each page, and where visitors come from. This data helps us understand and improve our site. Google Analytics does not allow us to identify individual users. You can opt out of Google Analytics tracking by installing the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>

        
      </div>

      {/* ── How We Use Information ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          How We Use the Information We Collect
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
          The anonymous, non-personal information we collect is used solely for the following purposes:
        </p>
        <ul className="space-y-2">
          {[
            'To monitor and analyse website traffic and usage patterns to improve the site experience',
            'To understand which calculators and content are most useful to visitors',
            'To maintain and improve the performance, security, and reliability of the website',
            // 'To display relevant advertisements through Google AdSense to support free access to our tools',
            'To remember your functional preferences (such as light or dark mode)',
          ].map((item) => (
            <li key={item} className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5 marker:text-gray">
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-3">
          We do <strong className="text-gray-800 dark:text-gray-100">not</strong> sell, rent, trade, or otherwise transfer any information about our users to third parties for their marketing purposes.
        </p>
      </div>

      {/* ── Children's Privacy ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Children's Privacy
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          TheFitCalculator is intended for use by adults aged 18 and over. Our calculators are not designed for use by children under the age of 13. We do not knowingly collect any personal information from children. If you believe a child has provided personal information through our website, please contact us immediately at{' '}
          <a href="/contact" className="underline text-brand-500">Contact Us
    </a>{' '}
          and we will take steps to remove that information.
        </p>
      </div>

      {/* ── External Links ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          External Links
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          Our website may contain links to third-party websites for reference or informational purposes. These external sites are not operated by us and we have no control over their content or privacy practices. We encourage you to review the privacy policy of any third-party website you visit. The inclusion of a link does not imply our endorsement of that site.
        </p>
      </div>

      {/* ── Your Rights ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Your Rights
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
          Depending on your location, you may have certain rights regarding your personal data. Since TheFitCalculator does not collect or store personal health information, most of these rights are not directly applicable to our calculator inputs. However, with respect to any non-personal data collected through analytics and advertising cookies, you have the right to:
        </p>
        <ul className="space-y-2">
  {[
    'Opt out of Google Analytics tracking via the browser add-on or your browser settings',
    'Disable all non-essential cookies via your browser preferences',
    <>
      Request information about any data we may hold-{" "}
      <a
        href="/contact"
        className="underline text-brand-500"
      >
       Contact Us
      </a>
    </>
  ].map((item, index) => (
    <li
      key={index}
      className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5"
    >
      {item}
    </li>
  ))}
</ul>

      </div>

      {/* ── Changes ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Changes to This Privacy Policy
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we do, we will update the "Last updated" date at the top of this page. We encourage you to review this page periodically to stay informed about how we are protecting your information. Continued use of the website after any changes constitutes your acceptance of the updated policy.
        </p>
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

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

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
              Have a question about one of our calculators, spotted a bug, or want to suggest a new feature?
              We read every message and aim to reply within 48 hours.
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
    </>
  );
};