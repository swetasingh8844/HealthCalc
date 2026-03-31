import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Calculator, Clock } from 'lucide-react';

const newsItems = [
  {
    id: 'glp1-heart-protection',
    title: 'Stopping Weight Loss Drugs May Undo Years of Heart Protection',
    content: 'Millions of people take GLP-1 drugs like Ozempic and Wegovy not just for weight loss, but because they protect the heart. A major study from Washington University School of Medicine tracked over 333,000 veterans with Type 2 diabetes for three years and found something sobering: stopping these drugs — even for just six months — starts to erase cardiovascular protection that took years to build. Researchers called it "metabolic whiplash." Blood pressure climbs back up, cholesterol rises, inflammation returns. People who quit for two years saw a 22% jump in serious heart events compared to those who stayed on treatment. "It takes years to build cardiovascular protection and half as much time to undo it," said lead researcher Dr. Ziyad Al-Aly.',
    source: 'Earth.com / BMJ Medicine',
    sourceUrl: 'https://www.earth.com/news/stopping-weight-loss-drugs-may-erase-years-of-heart-protection/',
    // date: 'Mar 19, 2026',
    image: '/images/heart.jpeg',
    category: 'Medication',
    // tag: 'Breaking',
    tagColor: 'bg-rose-500',
    cardColor: 'bg-rose-500',
  },
  {
    id: 'fatty-pancreas-diabetes',
    title: "Half of Type 2 Diabetes Patients Have Fatty Pancreas Disease — Most Don't Know",
    content: 'A 2026 meta-analysis covering 12 studies and over 6,300 participants found that roughly 54% of people with Type 2 diabetes also have fatty pancreas disease (FPD) — a condition that is widely underdiagnosed. FPD involves fat deposits within pancreatic tissue, impairing insulin production and driving metabolic dysfunction. Researchers say it affects around one in five people in the general population, making it one of the most common pancreatic conditions worldwide. The findings signal a need for doctors to look beyond blood sugar levels and consider the health of the pancreas itself when managing diabetic patients.',
    source: 'European Medical Journal',
    sourceUrl: 'https://www.emjreviews.com/diabetes/news/half-of-patients-with-type-2-diabetes-have-fatty-pancreas-disease/',
    // date: 'Mar 19, 2026',
    image: '/images/pancreas.png',
  },
  {
    id: 'body-composition-brain',
    title: "Belly Fat and Weak Muscles Linked to Higher Risk of Alzheimer's and Parkinson's",
    content: "A UK Biobank study of over 412,000 people found a clear link between body fat distribution and Alzheimer's and Parkinson's risk. Belly fat raised the risk of neurodegenerative disease by 13%; arm fat raised it by 18%. But here is the encouraging part: people with greater muscle strength were 26% less likely to develop these conditions — measured through a simple grip strength test. The research suggests that managing central obesity and building muscle could be among the most effective things a person can do to protect long-term brain health. It is not just about looks or weight — it is about what is happening inside.",
    source: 'Neurology Journal',
    sourceUrl: 'https://www.neurology.org/doi/10.1212/WNL.0000000000209659',
    // date: 'July 24, 2024',
    image: '/images/fat.png',
  },
  {
    id: 'walking-weight-loss',
    title: 'Your Heart is a Muscle. Here is How to Train It.',
    content: "Your heart is a muscle, and like every muscle, it gets stronger when you work it. People who do not exercise are nearly twice as likely to develop heart disease. The good news is you do not need a gym or athletic background to make a real difference — a 30-minute brisk walk five days a week is enough to start. There are three things your heart needs. Cardio first — walking, cycling, swimming, anything that raises your heart rate while still letting you hold a conversation. Aim for 150 minutes a week. If that feels like too much, start with 10 minutes and build up. Second is strength training — weights, resistance bands, or bodyweight exercises two to three times a week. It helps your muscles use oxygen more efficiently, which takes pressure off your heart. Third is stretching — just a few minutes after each workout keeps your body flexible and helps your heart recover between sessions. One thing to remember: if you feel chest pain, dizziness, a racing heartbeat, or break into a cold sweat while exercising, stop and get help immediately. Mild soreness for a day or two is normal. What you will notice quickly is better sleep, more energy, and a heart that is quietly getting stronger every single day.",
    source: 'WebMD',
    sourceUrl: 'https://www.webmd.com/fitness-exercise/exercise-healthy-heart',
    // date: 'Dec 11, 2024',
    image: '/images/heart1.png',
  },
  {
    id: 'sleep-muscle-recovery',
    title: 'The Hours You Sleep Matter More Than the Hours You Train',
    content: 'You can train hard every day, but if your sleep is poor, you are working against yourself. During deep sleep the body releases growth hormone — the primary driver of muscle repair. Without adequate rest, exercise-induced damage accumulates rather than heals. Studies show athletes who sleep fewer than seven hours perform worse, suffer more injuries, and plateau faster. The brain also consolidates motor patterns during sleep, meaning the coordination and muscle memory you are building only gets locked in when you sleep enough. Recovery is not passive — it is where adaptation actually happens.',
    source: 'Healthline',
    sourceUrl: 'https://www.healthline.com/health/sleep-deprivation/effects-on-body',
    // date: 'Mar 12, 2026',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'hydration-metabolism',
    title: 'Drinking More Water Actually Speeds Up Your Metabolism',
    content: 'Most people know hydration matters, but few realize how directly it affects calorie burning. Drinking water triggers water-induced thermogenesis — the body raises its metabolic rate to warm the fluid to body temperature, boosting resting energy expenditure by up to 30% for about an hour. Beyond that, dehydration slows fat metabolism at the cellular level. And most practically: many hunger signals are actually thirst in disguise. Drinking a glass of water before meals consistently reduces calorie intake across studies. It is one of the simplest, cheapest levers for weight management that most people overlook.',
    source: 'Mayo Clinic',
    sourceUrl: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256',
    // date: 'Mar 10, 2026',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'protein-intake-aging',
    title: 'What Happens to Your Body When You Exercise Regularly',
    content: "Most people know exercise is good for them. Few realize just how many systems it improves at once. Regular physical activity reduces the risk of heart disease, stroke, Type 2 diabetes, and at least six types of cancer including breast, colon, and kidney. It lowers blood pressure, improves cholesterol, and strengthens the heart muscle itself. Beyond the physical, exercise reduces anxiety and depression — and the mood benefit can kick in after just one session. For bones, 90 minutes of exercise a week is enough to slow age-related density loss. For muscles, weight-bearing movement becomes increasingly critical after 40 as natural muscle loss accelerates. For the brain, regular exercise reduces the risk of dementia and Alzheimer's disease and improves cognitive processing speed in people over 50. It also improves sleep quality, reduces daytime drowsiness, helps manage chronic pain, and cuts the risk of falls in older adults. The most important finding from decades of research is this: you do not need to do a lot to start seeing benefits. The biggest jump in health outcomes happens when someone goes from doing nothing to doing just a little. Even small increases in activity matter — and they matter immediately.",
    source: 'Medical News Today',
    sourceUrl: 'https://www.medicalnewstoday.com/articles/benefits-of-exercise',
    // date: 'Mar 08, 2026',
    image: '/images/exercise.jpeg',
  },
  {
    id: 'health-news-roundup',
    title: "This Week in Health: What the Research Headlines Are Actually Saying",
    content: "Health headlines can be misleading — one week a food causes cancer, the next it prevents it. A more useful habit is reading aggregated health coverage from credible sources and looking past the headline. This week across major health outlets: new data on GLP-1 medication discontinuation risks, updated diabetes care standards from the American Diabetes Association, and growing evidence that muscle strength is one of the strongest predictors of long-term health outcomes across virtually every disease category. The common thread: lifestyle factors — diet, movement, sleep, stress — remain the dominant drivers of how well you age.",
    source: 'BBC Health / Google News',
    sourceUrl: 'https://www.bbc.com/news/health',
    // date: 'Mar 21, 2026',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
  },
];

const HealthNewsPage: React.FC = () => {
  const featured = newsItems[0];
  const rest = newsItems.slice(1);
  const location = useLocation();
const isNewsPage = location.pathname === '/fitness-news';

  return (
    <>
      <Helmet>
  {isNewsPage && (
      <title>Latest Health & Fitness News | TheFitCalculator</title>
  )}  
  {isNewsPage && (
      <meta name="description" content="Stay updated with the latest health studies, fitness tips, and wellness news. Science-backed information to help you live a healthier life." />
  )} 
  {isNewsPage && (  
      <link rel="canonical" href="https://thefitcalculator.com/fitness-news" />
  )} 
  {isNewsPage && ( 
      <meta property="og:title" content="Latest Health & Fitness News | TheFitCalculator" />
  )}
  {isNewsPage && (
      <meta property="og:description" content="Stay updated with the latest health studies, fitness tips, and wellness news. Science-backed information to help you live a healthier life." />
  )}  
  {isNewsPage && ( 
    <meta property="og:url" content="https://thefitcalculator.com/fitness-news" />
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
                    <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">Health</h1>
                    <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.3em]">News</span>
                  </div>
                </div>
              </header>

        {/* Hero */}
        <section className="relative py-14 overflow-hidden border-b border-gray-200 dark:border-gray-800">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-600/5 -skew-x-12 translate-x-1/2" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                {/* <span className="w-8 h-px bg-brand-600" /> */}
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-600">Science & Wellness</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase mb-5">
                Health <br />
                {/* <span className="text-transparent" style={{ WebkitTextStroke: '1.5px currentColor' }}>Intelligence.</span> */}
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-l leading-relaxed">
                Real findings from real studies — explained plainly so you can actually use them.
              </p>
            </motion.div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 py-14">

          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16 pb-16 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl group">
              <img src={featured.image} alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                {/* <span className={`text-[9px] font-black text-white uppercase tracking-widest px-3 py-1 rounded-full ${featured.tagColor ?? featured.cardColor}`}>
                  {featured.tag ?? featured.category}
                </span> */}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {/* <Clock className="w-3 h-3" /> */}
                {/* <span>{featured.date}</span> */}
                {/* <span>·</span> */}
                <span>{featured.source}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black leading-tight tracking-tighter">{featured.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{featured.content}</p>
              <div className="flex items-center gap-5 pt-1">
                <a href={featured.sourceUrl} target="_blank" rel="noopener noreferrer"
                  className="group/l flex items-center gap-1.5 text-xs font-black uppercase tracking-widest hover:text-brand-600 transition-colors"
                >
                  Read Full Study <ExternalLink className="w-3.5 h-3.5 group-hover/l:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {rest.map((item, i) => (
              <motion.article key={item.id + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[16/14] overflow-hidden rounded-2xl mb-4">
                  <img src={item.image} alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[9px] font-black text-white uppercase tracking-widest px-2.5 py-1 rounded-full ${item.cardColor}`}>
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {/* <Clock className="w-3 h-3" /> */}
                  {/* <span>{item.date}</span> */}
                  {/* <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" /> */}
                  <span>{item.source}</span>
                </div>

                <h4 className="text-base font-black leading-tight tracking-tight mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4 flex-1 mb-4">
                  {item.content}
                </p>

                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-brand-600 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> View Source
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </main>

        {/* Footer CTA */}
        <section className="bg-gray-950 dark:bg-black py-20 mt-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-[10px] font-black text-brand-400 uppercase tracking-[0.4em] mb-2">Knowledge is Power</p>
            <h2 className="text-2xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-0">
              Stay Informed.<br />
              <span className="text-2xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-0">Stay Healthy.</span>
            </h2>
            {/* <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Apply what you have read. Use our free calculators to put the numbers to work for your health.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/bmi-calculator" className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-black rounded-2xl transition-all hover:scale-105 shadow-xl shadow-brand-600/20 text-sm uppercase tracking-widest">
                BMI Calculator →
              </Link>
              <Link to="/" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl transition-all hover:scale-105 text-sm uppercase tracking-widest">
                All Tools →
              </Link>
            </div> */}
          </div>
        </section>

      </div>
    </>
  );
};

export default HealthNewsPage;