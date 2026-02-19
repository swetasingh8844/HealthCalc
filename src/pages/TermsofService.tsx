import React from 'react';
import { Helmet } from 'react-helmet-async';

export const TermsOfService: React.FC = () => (
  <>
    <Helmet>
      <title>Terms of Service | TheFitCalculator</title>
      <meta name="description" content="Terms of Service for TheFitCalculator — conditions for using our free online health calculators." />
      <link rel="canonical" href="https://thefitcalculator.com/terms" />
    </Helmet>

    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl px-8 py-10 relative overflow-hidden shadow-lg">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
        <div className="relative">
          {/* <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Legal</span> */}
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Terms of Service</h1>
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
      </div>

      {/* Agreement */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Agreement to These Terms
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          By accessing or using{' '}
          <a href="https://thefitcalculator.com" className="text-brand-600 dark:text-brand-400 hover:underline font-medium">thefitcalculator.com</a>,
          you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the website.
        </p>
      </div>

      {/* Use of Site */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Use of Our Website
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
          Our calculators are provided for personal, non-commercial, informational use only. By using this site you agree to:
        </p>
        <ul className="space-y-2">
          {[
            'Use the website only for lawful purposes',
            'Not attempt to disrupt or gain unauthorised access to the site or its infrastructure',
            'Not copy, reproduce, or commercially exploit any content without written permission',
            'Not use automated bots or scrapers to extract data from this website',
          ].map((item) => (
            <li key={item}  className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-5">{item}</li>
          ))}
        </ul>
      </div>


      {/* Limitation of Liability */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Limitation of Liability
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          We make reasonable efforts to ensure the accuracy of our calculators but provide no warranties regarding completeness or suitability for any purpose. TheFitCalculator shall not be liable for any damages arising from your use of or reliance on any content or calculation on this website. Your use of the site is entirely at your own risk.
        </p>
      </div>

      {/* Intellectual Property
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Intellectual Property
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          All content on this website — including text, design, layout, and code — is the property of TheFitCalculator and protected by applicable copyright laws. You may not reproduce or commercially exploit any content without our prior written consent.
        </p>
      </div> */}

      {/* Third-Party */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Third-Party Services & Privacy
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
  We use <strong className="text-gray-800 dark:text-gray-100">Google Analytics</strong> to understand how visitors interact with our website, such as pages visited, time spent, and general usage patterns. This helps us improve website performance and user experience. For full details on how we handle your data, please read our{" "}
  <a
    href="/privacy-policy"
    className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
  >
    Privacy Policy
  </a>.
</p>

      </div>

      {/* Changes */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-brand-500 rounded-full inline-block"></span>
          Changes to These Terms
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          We may update these Terms at any time. The "Last updated" date at the top of this page will reflect any changes. Continued use of the website after updates are posted constitutes your acceptance of the revised Terms.
        </p>
      </div>

    </div>
  </>
);