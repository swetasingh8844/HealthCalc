import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Download, ArrowLeft, ExternalLink, X, ShoppingBag, Star } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const products = [
  {
    name: "Speed Skipping Rope",
    category: "Cardio & Endurance",
    image: "/images/skipping_rope.jpeg",
    description: "Adjustable skipping rope for fat burning and cardio workouts at home or gym",
    rating: "4.0",
    link: "https://amzn.to/40YJchJ",
  },
  {
    name: "Resistance Band Set",
    category: "Strength & Toning",
    image: "/images/resistance_band.jpeg",
    description: "5-level resistance bands for full body strength training and toning",
    rating: "4.1",
    link: "https://amzn.to/4ryoFvt",
  },
  {
    name: "Water Bottle",
    category: "Hydration & Nutrition",
    image: "/images/bottle7.jpeg",
    description: "PEXPO Water Bottle 1 LTR Stainless Steel | Hot and Cold Flask",
    rating: "4.3",
    link: "https://amzn.to/3PiPPsQ",
  },
  {
    name: "Dumbbell",
    category: "Strength & Toning",
    image: "/images/dumbbell.jpeg",
    description: "Lifelong PVC Hex Fixed Dumbbells",
    rating: "4.0",
    link: "https://amzn.to/4bzguJg",
  },
  {
    name: "Running Shoes",
    category: "Cardio & Endurance",
    image: "/images/men_shoes1.jpeg",
    description: "Men Wells Running Shoes",
    rating: "4.0",
    link: "https://amzn.to/3Nf2tZg",
  },
   {
    name: "Water Bottle",
    category: "Hydration & Nutrition",
    image: "/images/bottle6.jpeg",
    description: "CASPIAN /// Hike Stainless Steel Customize Sipper Water Bottle",
    rating: "4.0",
    link: "https://amzn.to/40O19j4",
  },
  {
    name: "Resistance Band Set",
    category: "Strength & Toning",
    image: "/images/resistance1_band.jpg",
    description: "Resistance bands set for targeted muscle activation and recovery",
    rating: "4.4",
    link: "https://amzn.to/4rwQS5V",
  },
  {
    name: "Running Shoes",
    category: "Cardio & Endurance",
    image: "/images/men_shoes2.jpeg",
    description: "Campus Men Lam Running Shoes",
    rating: "4.2",
    link: " https://amzn.to/4sixpXz",
  },
  {
    name: "Water Bottle",
    category: "Hydration & Nutrition",
    image: "/images/bottle5.jpeg",
    description: "Motivational Borosilicate Glass Sipper with Silicone Sleeve, Time Markings, Leak-Proof",
    rating: "4.0",
    link: "https://amzn.to/4rHJ3u0",
  },
  {
    name: "Yoga Mat",
    category: "Yoga & Wellness",
    image: "/images/yoga_mat4.jpeg",
    description: "Non-slip yoga mat with extra cushioning for home workouts and meditation",
    rating: "4.1",
    link: "https://amzn.to/47EHc1O",
  },
  {
    name: "Bodyband Abs Roller",
    category: "Strength & Toning",
    image: "/images/bodyband_roller.jpeg",
    description: "Bodyband Abs Roller for Men & Women Stomach Abs Roller Wheel for Home Workout",
    rating: "3.6",
    link: "https://amzn.to/4sTqV19",
  },
  {
    name: "Water Bottle",
    category: "Hydration & Nutrition",
    image: "/images/bottle4.jpeg",
    description: "PEXPO Bistro ISI Certified Stainless Steel Fridge Cooling/Sports Sipper Water Bottle",
    rating: "4.0",
    link: "https://amzn.to/4sSCrKk",
  },
  {
    name: "Boldfit Walking Shoes",
    category: "Cardio & Endurance",
    image: "/images/women_shoes1.jpeg",
    description: "Boldfit Walking Shoes for Women",
    rating: "4.3",
    link: "https://amzn.to/4lKTxrq",
  },
   {
    name: "Yoga Mat",
    category: "Yoga & Wellness",
    image: "/images/yoga_mat1.jpeg",
    description: "Anti-Slip Yoga Mat for Yoga Exercise",
    rating: "4.0",
    link: "https://amzn.to/47fW9HI",
  },
  {
    name: "Water Bottle",
    category: "Hydration & Nutrition",
    image: "/images/bottle3.jpeg",
    description: "PEXPO Water Bottle 1 ltr Stainless Steel Sports/Fridge Bottle with Sipper Cap",
    rating: "4.1",
    link: "https://amzn.to/3PnLK6z",
  },
  {
    name: "Foam Roller",
    category: "Recovery & Relief",
    image: "/images/foam_roller1.jpeg",
    description: "Foam roller for back, neck & knee pain relief and deep tissue massage",
    rating: "4.1",
    link: "https://amzn.to/4bIhoUU",
  },
  {
    name: "Yoga Mat",
    category: "Yoga & Wellness",
    image: "/images/yoga_mat3.jpeg",
    description: "Lifelong LLYM71 Yoga mat for Women & Men",
    rating: "4.0",
    link: "https://amzn.to/4uHysC6",
  },
   {
    name: "Push-ups Assistant Device",
    category: "Strength & Toning",
    image: "/images/Push-ups_Assistant_Device.jpeg",
    description: "Sit-ups and Push-ups Assistant Device For Weight Lose",
    rating: "3.9",
    link: "https://amzn.to/47bZ7Nf",
  },
  {
    name: "Water Bottle",
    category: "Hydration & Nutrition",
    image: "/images/bottle2.jpeg",
    description: "Leak Proof Sipper Bottle for Gym, Office, Workout-Dark Blue Sky Blue",
    rating: "4.2",
    link: "https://amzn.to/4bnQNwp",
  },
  {
    name: "Boldfit Walking Shoes",
    category: "Cardio & Endurance",
    image: "/images/women_shoes.jpeg",
    description: "Boldfit Walking Shoes for Women",
    rating: "4.5",
    link: "https://amzn.to/40EBXvt",
  },
  {
    name: "Pull Reducer Bands",
    category: "Strength & Toning",
    image: "/images/Pull_Reducer_Bands.jpeg",
    description: "Body Pedal Exerciser Yoga Crossfit Exercise, Arm Exercise, Body Building Training Men and Women",
    rating: "4.2",
    link: "https://amzn.to/40LQHsp",
  },
  {
    name: "Foam Roller",
    category: "Recovery & Relief",
    image: "/images/foam_roller2.jpeg",
    description: "Multicolour foam roller for deep tissue massage and muscle recovery",
    rating: "5.0",
    link: "https://amzn.to/4bquPHY",
  },
   {
    name: "Water Bottle",
    category: "Hydration & Nutrition",
    image: "/images/bottle8.jpeg",
    description: "Cello Puro Steel-X Benz 900 PU Insulated Water Bottle",
    rating: "3.9",
    link: "https://amzn.to/4bwYGOY",
  },
   {
    name: "Pelvic Floor Exerciser Device",
    category: "Strength & Toning",
    image: "/images/Pelvic_Floor_Exerciser_Device.jpeg",
    description: "Training Tool for Home, Gym, Fitness, Workout, Stretcher",
    rating: "4.0",
    link: "https://amzn.to/4bReFIV",
  },
  {
    name: "Yoga Mat",
    category: "Yoga & Wellness",
    image: "/images/yoga_mat2.jpeg",
    description: "Boldfit Yoga Mats For Women Men Exercise Mat For Home Gym",
    rating: "3.9",
    link: "https://amzn.to/3PAQNk9",
  },
  {
    name: "Water Bottle",
    category: "Hydration & Nutrition",
    image: "/images/bottle.jpeg",
    description: "Stainless Steel Water Bottle",
    rating: "",
    link: "https://amzn.to/4lsTUq7",
  },
  {
    name: "Water Bottle",
    category: "Hydration & Nutrition",
    image: "/images/bottle1.jpeg",
    description: "24-hour hot and cold insulated water bottle for all-day hydration",
    rating: "",
     link: "https://amzn.to/417Gczy",
  },
];

const categories = ["All", "Cardio & Endurance", "Strength & Toning", "Yoga & Wellness", "Recovery & Relief", "Hydration & Nutrition"];

const categoryColors: Record<string, string> = {
  "Cardio & Endurance":   "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  "Strength & Toning":    "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
  "Yoga & Wellness":      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  "Recovery & Relief":    "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
  "Hydration & Nutrition":"bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
};

const ShopPage = () => {
  const [active, setActive] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const location = useLocation();
const isShopPage = location.pathname === '/fitness-shop';
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
<Helmet>
  {isShopPage && (
      <title>Shop Fitness Equipment – TheFitCalculator</title>
  )}
  {isShopPage && (
      <meta name="description" content="Shop curated fitness equipment for every workout — resistance bands, yoga mats, foam rollers, water bottles and more." />
  )}  
  {isShopPage && (
      <link rel="canonical" href="https://thefitcalculator.com/fitness-shop" />
  )}
  {isShopPage && (  
      <meta property="og:title" content="Shop Fitness Equipment – TheFitCalculator" />
  )} 
  {isShopPage && (  
      <meta property="og:description" content="Shop curated fitness equipment for every workout — resistance bands, yoga mats, foam rollers, water bottles and more." />
  )}
  {isShopPage && (  
      <meta property="og:url" content="https://thefitcalculator.com/fitness-shop" />
  )}
  {isShopPage && (  
      <meta property="og:type" content="website" />
  )}
  {isShopPage && (  
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Fitness Equipment Shop",
            "url": "https://thefitcalculator.com/fitness-shop",
            "itemListElement": products.map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.name,
                "description": product.description,
                "image": `https://thefitcalculator.com${product.image}`,
                "url": "https://thefitcalculator.com/fitness-shop",
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "url": product.link,
                  "seller": {
                    "@type": "Organization",
                    "name": "Amazon"
                  }
                }
              }
            }))
          })
        }}
      />
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
              <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.3em]">Shop</span>
            </div>
          </div>
        </header>

        {/* Hero banner */}
        <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl px-10 py-10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 mb-2">Curated For You</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                Shop Fitness <span className="text-brand-400">Gear</span>
              </h2>
              <p className="text-brand-100 text-base mt-4 whitespace-nowrap">
                Hand-picked equipment for every workout — strength, yoga, recovery, and hydration.
              </p>
             <p className="text-brand-200 text-xs mt-2">
            As an Amazon Associate, TheFitCalculator earns from qualifying purchases.
            </p>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-400" />
              <span className="text-xs font-bold text-gray-500 dark:text-gray-200">{products.length} items</span>
            </div>
          </div>
        </div>
        </div>
       <div className="hidden md:block h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
        {/* Category Filter */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 flex justify-center">
            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 inline-flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                    active === cat
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20 scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            </div>
          </div>
        </div>


        {/* Products Grid */}
        <main className="max-w-7xl mx-auto px-4 py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedProduct(product)}
                  className="group cursor-pointer bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image — clean, no overlays */}
                  <div className="aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-gray-800">
                    <img
                      src={product.image}
                     alt={`${product.name} - ${product.category} fitness equipment`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card body */}
                  <div className="p-4 flex flex-col flex-1 gap-2">
                    {/* Category + Rating row — below image */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${categoryColors[product.category] ?? 'bg-brand-100 text-brand-700'}`}>
                        {product.category}
                      </span>
                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-[10px] font-black text-gray-700 dark:text-gray-300">{product.rating} / 5</span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-base font-black text-gray-900 dark:text-white leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {product.name}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                      {product.description}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100 dark:border-gray-800">
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Buy Now
                      </a>
                      <div className="flex items-center gap-2">
                        <a
                          href={product.image}
                          download
                          onClick={(e) => e.stopPropagation()}
                          title="Download Image"
                          className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-brand-50 dark:hover:bg-brand-900/20 text-gray-600 dark:text-gray-300 hover:text-brand-600 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                        <span className="text-gray-800 dark:text-gray-100 group-hover:text-brand-500 transition-colors text-sm font-bold">→</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Product Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image */}
                <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden min-h-[240px]">
                  <img
                    src={selectedProduct.image}
                   alt={`${selectedProduct.name} - ${selectedProduct.category} fitness equipment`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 p-7 flex flex-col justify-between">
                  <div>
                    <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${categoryColors[selectedProduct.category] ?? ''}`}>
                      {selectedProduct.category}
                    </span>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight mb-2">
                      {selectedProduct.name}
                    </h2>
                    {selectedProduct.rating && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{selectedProduct.rating} / 5</span>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  <div className="space-y-3 mt-6">
                    <a
                      href={selectedProduct.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-600/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Buy on Amazon
                    </a>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold text-sm transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      Back to Shop
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
         <section className="bg-gray-950 dark:bg-black py-20 mt-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-xs text-gray-400 text-center py-4">
  As an Amazon Associate, TheFitCalculator earns from qualifying purchases. 
  Product prices and availability are subject to change.
</p>
            <h2 className="text-2xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-0">
              Shop Now<br />
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

export default ShopPage;