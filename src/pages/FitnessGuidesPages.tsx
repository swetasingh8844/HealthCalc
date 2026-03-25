import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Youtube, Calculator, ExternalLink, Download, Filter } from 'lucide-react';

const categories = ['All', 'Yoga Asanas', 'Meditation', 'Exercise'];

const guides = [
  {
    id: 'yoga-belly-fat',
    title: 'Best Yoga for Belly Fat',
    content: ' Core-focused yoga poses like Boat Pose (Navasana) and Plank (Phalakasana) target the abdominal muscles directly. Regular practice helps burn belly fat, improve posture, and strengthen the entire core. This sequence is ideal for beginners and can be done at home without any equipment.',
    youtubeId: 's2NQhpFGIOg',
    image: '/images/Bellyfat.png',
    category: 'Yoga Asanas'
  },
  {
    id: 'exercise-push-ups',
    title: '5 Minute Push Ups Workout',
    content: ' A compact but intense push-up routine that works the chest, shoulders, triceps, and core all at once. No equipment needed — just your bodyweight and the floor. Perfect for beginners building upper body strength or anyone who wants a quick daily habit to stay active at home.',
    youtubeId: 'tWjBnQX3if0',
    image: '/images/pushups.jpeg',
    category: 'Exercise'
  },
  {
    id: 'exercise',
    title: '10 Min Squat Workout',
    content: 'Ten squat variations in ten minutes to target the quads, hamstrings, glutes, and core from every angle. Squats are the king of lower body exercises and this workout proves you don\'t need a gym to build strong, powerful legs. Suitable for all fitness levels.',
    youtubeId: 'irfw1gQ0foQ',
    image: '/images/squat.png',
    category: 'Exercise'
  },
   {
    id: 'exercise',
    title: 'Crunches',
    content: 'The classic abdominal exercise, done correctly, isolates and strengthens the rectus abdominis for a toned midsection. This guided routine shows you proper form to avoid neck strain and maximize results. A foundational move for anyone building a stronger core from the ground up.',
    youtubeId: '0t4t3IpiEao',
    image: '/images/crunches.jpeg',
    category: 'Exercise'
  },
  {
    id: 'asana-flexibility',
    title: 'Asana for Full Body Flexibility',
    content: 'Sun Salutations (Surya Namaskar) and Triangle Pose (Trikonasana) work together to stretch every major muscle group from head to toe. This routine reduces muscle stiffness, improves range of motion, and leaves your body feeling light and energized throughout the day.',
    youtubeId: 'v7AYKMP6rOE',
    image: '/images/Flex.png',
    category: 'Yoga Asanas'
  },
  {
    id: 'asana-flexibility',
    title: 'Surya Namaskar',
    content: 'The 12-step Sun Salutation is one of the most complete yoga sequences in existence. It warms up the spine, opens the hips, stretches the hamstrings, and activates every organ. Practiced daily in the morning, it boosts circulation, improves flexibility, and sets a calm, focused tone for the day ahead.',
    youtubeId: 'aJb1AWMc-64',
    image: '/images/surya_namaskar.png',
    category: 'Yoga Asanas'
  },
   {
    id: 'asana-flexibility',
    title: 'Tadasana (Mountain Pose) ',
    content: 'Often overlooked as "just standing," Tadasana is the foundation of all yoga poses. It corrects posture, aligns the spine, strengthens the thighs and ankles, and teaches body awareness. Holding this pose with full attention engages your entire body and builds the groundwork for deeper asana practice.',
    youtubeId: '0mPNlC0vD6s',
    image: '/images/Tadasana.png',
    category: 'Yoga Asanas'
  },
   {
    id: 'exercise',
    title: 'Stretching',
    content: 'A full-body stretching session that targets the neck, shoulders, back, hips, and legs in sequence. Regular stretching reduces muscle soreness, prevents injury, and improves flexibility over time. This routine is perfect after any workout or as a standalone session on rest days.',
    youtubeId: 'hNCqIgl7Pjc',
    image: '/images/Stretching.png',
    category: 'Exercise'
  },
  {
    id: 'asana-flexibility',
    title: 'Vajrasana (Thunderbolt Pose)',
    content: 'One of the few yoga poses recommended after meals, Vajrasana aids digestion by improving blood flow to the abdominal region. It also strengthens the lower back, stretches the thighs, and provides a stable base for breathing exercises and meditation practice.',
    youtubeId: '82p0aGNJSF4',
    image: '/images/Vajrasana.png',
    category: 'Yoga Asanas'
  },
  {
    id: 'asana-flexibility',
    title: 'Bhujangasana (Cobra Pose)',
    content: 'Lying face down and lifting the chest, Cobra Pose opens the heart, stretches the lungs, and strengthens the entire spine. It relieves lower back pain, tones the glutes, and stimulates the digestive organs. A key pose for anyone who sits at a desk for long hours.',
    youtubeId: 'luTSRGXPEMs',
    image: '/images/Bhujangasana.png',
    category: 'Yoga Asanas'
  },
   {
    id: 'exercise',
    title: 'Burpees',
    content: 'One of the most effective full-body exercises ever created. Burpees combine a squat, push-up, and jump into one continuous movement, spiking the heart rate and engaging every major muscle group. Even a few sets burn serious calories and build functional strength and cardiovascular endurance.',
    youtubeId: 'qLBImHhCXSw',
    image: '/images/burpees.jpeg',
    category: 'Exercise'
  },
   {
    id: 'asana-flexibility',
    title: 'Trikonasana (Triangle Pose)',
    content: 'A standing lateral stretch that works the hips, hamstrings, and inner thighs simultaneously. Trikonasana improves balance, opens the chest, and strengthens the legs. It also stimulates the abdominal organs and helps relieve stress and anxiety stored in the body.',
    youtubeId: 'NMnmn8Z39Cc',
    image: '/images/Trikonasana.png',
    category: 'Yoga Asanas'
  },
  {
    id: 'meditation-stress',
    title: '10-Minute Meditation for Stress Relief',
    content: 'Using slow deep breathing and body scan techniques, this guided session activates the parasympathetic nervous system to lower cortisol levels. Just ten minutes of this practice can shift your mood, reduce anxiety, and bring a sense of calm that lasts for hours afterward.',
    youtubeId: 'ZToicYcHIOU',
    image: '/images/stress.jpeg',
    category: 'Meditation'
  },
  {
    id: 'yoga-morning-flow',
    title: 'Energizing Morning Yoga Flow',
    content: 'A flowing sequence of gentle twists, chest openers, and hip stretches designed specifically for mornings. It wakes up the spine, gets the blood moving, and clears mental fog. Just 15 minutes of this flow can transform your energy and mood for the entire day.',
    youtubeId: '4pKly2JojMw',
    image: '/images/Morningyoga.png',
    category: 'Yoga Asanas'
  },
  {
    id: 'asana-balance',
    title: 'Asanas for Better Balance',
    content: 'Tree Pose (Vrikshasana) and other single-leg balancing asanas challenge your stabilizing muscles and sharpen focus. Regular practice improves coordination, strengthens the ankles and knees, and trains the mind to stay present and calm under pressure.',
    youtubeId: 'qbxrBZFBJJU',
    image: '/images/Vrikshasana.png',
    category: 'Yoga Asanas'
  },
  {
    id: 'meditation-sleep',
    title: 'Deep Sleep Meditation',
    content: ' Progressive muscle relaxation combined with visualization guides your body into a state of complete rest. This session is designed for people who struggle to fall asleep or wake up in the middle of the night. It quiets the nervous system and prepares the mind for deep, restorative sleep.',
    youtubeId: 'MN_JP4gyBNI',
    image: '/images/sleep_meditation.jpeg',
    category: 'Meditation'
  },
  {
    id: 'meditation-sleep',
    title: 'Increase Brain Power',
    content: 'Carefully composed frequency-based music designed to stimulate neural activity, raise your energy vibration, and sharpen cognitive function. Listen with headphones for the best effect. Ideal before studying, creative work, or any activity that demands high mental performance.',
    youtubeId: 'Rcofz-30dnU',
    image: '/images/power.jpeg',
    category: 'Meditation'
  },
  {
    id: 'meditation-sleep',
    title: 'Relax Mind',
    content: 'Powerful healing meditation music layered with calming frequencies for stress relief, positive energy, and deep mental healing. Let the sound wash over you and dissolve tension held in the body and mind. Perfect for winding down after a long and demanding day.',
    youtubeId: 'jfuXJWoFi-o',
    image: '/images/meditation1.jpeg',
    category: 'Meditation'
  },
  {
    id: 'meditation-sleep',
    title: 'Guided Meditation Hindi — BK Shivani',
    content: 'A deeply personal guided session in Hindi by spiritual teacher BK Shivani. This meditation helps you reconnect with your inner self, release negative thought patterns, and cultivate a lasting sense of peace and purpose in your daily life.',
    youtubeId: 'XnT_cOq_Ba8',
    image: '/images/guided1.jpeg',
    category: 'Meditation'
  },
  {
    id: 'meditation-sleep',
    title: 'Guided Meditation English — BK Shivani',
    content: 'An English-language guided session to help you reconnect with your core values and recharge your mental energy. BK Shivani\'s gentle voice and clear instructions make this accessible to both beginners and experienced meditators seeking renewal.',
    youtubeId: 'fgChzlOt3XI',
    image: '/images/guided2.jpeg',
    category: 'Meditation'
  },
   {
    id: 'meditation-sleep',
    title: 'Meditation for Overthinking',
    content: 'A focused 10-minute practice specifically designed to interrupt the cycle of rumination. Using breath anchoring and gentle redirection techniques, this session teaches you to observe thoughts without getting caught in them, bringing stillness and clarity to an overactive mind.',
    youtubeId: 'sfSDQRdIvTc',
    image: '/images/overthinking.png',
    category: 'Meditation'
  },
  {
    id: 'yoga-weight-loss',
    title: 'Power Yoga for Weight Loss',
    content: 'A fast-paced, dynamic style of yoga that links breath to movement without rest between poses. It builds internal heat, raises the heart rate, and burns significant calories. Over time, it builds lean muscle, boosts metabolism, and improves both strength and endurance.',
    youtubeId: '9kOCY0KNByw',
    image: '/images/power_yoga.png',
    category: 'Yoga Asanas'
  },
  {
    id: 'asana-back-pain',
    title: 'Asanas for Back Pain Relief',
    content: "Cat-Cow stretches, Child's Pose, and gentle spinal twists target the root causes of back pain — tight muscles, compressed discs, and poor posture. This sequence decompresses the spine, loosens the surrounding muscles, and can be done safely even during flare-ups.",
    youtubeId: '2eA2Koq6pTI',
    image: '/images/Childpose.png',
    category: 'Yoga Asanas'
  },
  {
    id: 'meditation-focus',
    title: 'Mindfulness for Better Focus',
    content: 'Train your attention like a muscle with this mindfulness practice. By repeatedly returning focus to the present moment, you build concentration, reduce mental fatigue, and improve cognitive performance. Ideal for students, professionals, and anyone who wants a sharper, calmer mind.',
    youtubeId: '6p_yaNFSYao',
    image: '/images/focus.png',
    category: 'Meditation'
  }
];

const categoryColors: Record<string, string> = {
  Yoga: 'bg-emerald-500',
  Asana: 'bg-violet-500',
  // Exercise: 'bg-sky-500',
};

const FitnessGuidesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const location = useLocation();
const isFitnessGuidePage = location.pathname === '/fitness-guide-videos';

  const filteredGuides = activeCategory === 'All'
    ? guides
    : guides.filter(g => g.category === activeCategory);

  const handleDownload = (imageUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
     <Helmet>
  {isFitnessGuidePage && (
    <>
      <title>Fitness Guides - Yoga Asanas, Meditation & Exercise | TheFitCalculator</title>
      <meta name="description" content="Explore our aesthetic fitness guides for yoga asanas, meditation and exercise. Downloadable routines and video demonstrations for your health journey." />
      <link rel="canonical" href="https://thefitcalculator.com/fitness-guide-videos" />
      <meta property="og:title" content="Fitness Guides - Yoga Asanas, Meditation & Exercise | TheFitCalculator" />
      <meta property="og:description" content="Explore our aesthetic fitness guides for yoga asanas, meditation and exercise. Downloadable routines and video demonstrations for your health journey." />
      <meta property="og:url" content="https://thefitcalculator.com/fitness-guide-videos" />
    </>
  )}
</Helmet>

       <div className="min-h-screen bg-white dark:bg-gray-950">
      
              {/* Header */}
              <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                  <Link to="/" className="group flex items-center gap-3 text-gray-500 hover:text-brand-600 transition-all">
                    <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30 transition-colors">
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-l uppercase tracking-widest">Home</span>
                  </Link>
      
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">Fitness</h1>
                    <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.3em]">Guides</span>
                  </div>
                </div>
              </header>

       <div className="hidden md:block h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

{/* About Section */}
<div className="max-w-7xl mx-auto px-4 py-10">
  <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl px-8 py-10 relative overflow-hidden">
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
   <div className="relative max-w-2xl mx-auto text-center">
    <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 block text-center">
        Why Fitness Videos?
      </span>
     <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4 text-center">
        Move Your Body. <span className="text-brand-200">Train Your Mind.</span>
      </h2>
<p className="text-brand-100 text-base leading-relaxed mb-4 text-center">
  Numbers alone won't get you fit. Once you know your BMI or daily calories, the next step is actually doing something. That's why we put together these youtube videos — yoga poses, meditation sessions, and simple home exercises you can follow without any equipment or gym. Pick a category, press play, and get started.
</p>
    </div>
  </div>
</div>
      {/* Category Filter */}
   <div className="py-6">
  <div className="max-w-7xl mx-auto px-4 flex justify-center">
    
    {/* Background wrapper (only around content) */}
    <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 inline-flex flex-wrap items-center gap-3">
      
      <div className="flex items-center gap-2 text-gray-400">
        <Filter className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Filter:
        </span>
      </div>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
            activeCategory === cat
              ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20 scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {cat}
        </button>
      ))}

    </div>
  </div>
</div>

        {/* Guides List */}
        <main className="max-w-7xl mx-auto px-4 py-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide, index) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="group grid grid-cols-1 lg:grid-cols-[240px_1fr_400px] gap-0 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-shadow duration-500"
                  >
                    {/* ── Column 1: Image ── */}
                    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 h-48 lg:h-auto">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`text-[10px] font-black text-white uppercase tracking-[0.2em] px-3 py-1 rounded-full ${categoryColors[guide.category] ?? 'bg-brand-600'}`}>
                          {guide.category}
                        </span>
                      </div>
                      {/* Download button */}
                      <button
                        onClick={() => handleDownload(guide.image, guide.title)}
                        className="absolute top-4 right-4 p-2.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-md hover:bg-brand-600 hover:text-white transition-all transform hover:scale-110"
                        title="Download Image"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      {/* Bottom gradient overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* ── Column 2: Content ── */}
                    <div className="flex flex-col justify-between p-10 border-x border-gray-100 dark:border-gray-800">
                      <div className="space-y-10">
                        <h2 className="text-2xl font-black text-gray-1200 dark:text-white leading-tight tracking-tight">
                          {guide.title}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base">
                          {guide.content}
                        </p>
                      </div>

                      {/* Bottom actions */}
<div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
  <a
    href={`https://www.youtube.com/watch?v=${guide.youtubeId}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
    <ExternalLink className="w-3 h-3 text-gray-400" />
    <span className="text-[10px] font-bold text-gray-400 hover:text-red-600 uppercase tracking-widest">YouTube</span>
  </a>
</div>
</div>
                    {/* ── Column 3: YouTube Video ── */}
                    <div className="flex flex-col">
                      {/* Video label bar */}
                      <div className="flex items-center gap-2.5 px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        <div className="w-7 h-7 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                          <Youtube className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Watch Routine</span>
                      </div>
                      {/* Iframe fills remaining height */}
                      <div className="flex-1 bg-black min-h-[160px]">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${guide.youtubeId}`}
                          title={guide.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                          style={{ minHeight: '160px' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-400 font-bold uppercase tracking-widest">No guides found in this category.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer CTA */}
        <section className="bg-gray-900 dark:bg-black py-24">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase">
                Elevate Your <span className="text-brand-600">Practice</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                Combine these ancient practices with modern data tracking to achieve your peak physical and mental condition.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/shop"
                className="bg-brand-600 text-white font-black px-10 py-5 rounded-2xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 hover:scale-105"
              >
                SHOP FITNESS GEAR
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FitnessGuidesPage;