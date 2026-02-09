
import React, { useState } from 'react';
import { Helmet } from "react-helmet";

export const About: React.FC = () => (
  <div className="container mx-auto px-4 py-16 prose prose-brand dark:prose-invert max-w-4xl">
    <Helmet>
      <title>About | HealthCalculator Pro</title>
      <link rel="canonical" href="https://thefitcalculator.com/about" />
    </Helmet>
    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8">About HealthCalculator Pro</h1>
    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
      We are making this so that everyone can calculate their BMI, BMR, etc., and according to this they can prepare their diet plans. Our goal is to provide accessible, high-quality health metrics to help individuals take charge of their wellness journey through science-backed calculations.
    </p>
  </div>
);

export const PrivacyPolicy: React.FC = () => (
  <div className="container mx-auto px-4 py-16 prose prose-brand dark:prose-invert max-w-4xl">
    <Helmet>
      <title>Privacy Policy | HealthCalculator Pro</title>
      <link rel="canonical" href="https://thefitcalculator.com/privacy-policy" />
    </Helmet>
    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
    <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
      <p>
        At HealthCalculator Pro, your privacy is our top priority. We understand that health data is deeply personal, which is why we have designed our platform to be as secure as possible. Every calculation you perform—whether it's for BMI, BMR, or daily calorie needs—is processed entirely within your own web browser. Your height, weight, age, and gender are never transmitted to our servers, nor are they stored in any permanent database.
      </p>
      <p>
        We utilize local storage only for functional preferences, such as remembering your choice between light and dark modes, to ensure a seamless experience upon your return. While we use standard third-party tools like Google Analytics and Google AdSense to monitor site traffic and support our free services through advertising, these services handle data according to their own strict privacy protocols. We are committed to providing a safe, transparent, and private environment where you can track your health metrics with absolute peace of mind.
      </p>
    </div>
  </div>
);

export const ContactUs: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // REPLACE 'YOUR_FORMSPREE_ID' with your actual Formspree ID (e.g., 'mwpvqzld')
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
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
       <Helmet>
        <title>Contact | HealthCalculator Pro</title>
        <link rel="canonical" href="https://thefitcalculator.com/contact" />
      </Helmet>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Have questions about our calculators or want to suggest a new feature? We'd love to hear from you.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        {status === 'success' ? (
          <div className="text-center animate-in fade-in zoom-in duration-300 py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">Message Sent!</h2>
            <p className="text-green-700 dark:text-green-500">Thank you for reaching out. Our team will get back to you shortly.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 text-brand-600 dark:text-brand-400 font-bold hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {status === 'error' && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
                Oops! There was a problem submitting your form. Please try again.
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
              <input 
                name="name"
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Email Address</label>
              <input 
                name="email"
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Subject</label>
              <input 
                name="subject"
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition"
                placeholder="Inquiry about BMI Calculator"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Message</label>
              <textarea 
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
