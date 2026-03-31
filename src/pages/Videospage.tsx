import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, Play, ExternalLink, Download } from 'lucide-react';

const videos = [
  {
    id: 1,
    // title: 'BMI, BMR & Calorie Calculator in One Place',
    desc: 'Yoga Asanas',
    emoji: '💪',
    videoUrl: '/videos/reel1.mp4',
    pinterestUrl: 'https://www.pinterest.com/pin/123456789/',
    thumbnail: 'images/reel1.jpeg',
  },
  {
    id: 2,
    // title: 'How to Calculate Your BMI',
    desc: 'Yoga Asanas',
    emoji: '💪',
    videoUrl: '/videos/reel2.mp4',
    pinterestUrl: 'https://www.pinterest.com/pin/234567890/',
    thumbnail: 'images/reel2.jpeg',
  },
  {
    id: 3,
    // title: 'Understanding BMR',
    desc: 'Exercise',
    emoji: '🔥',
    videoUrl: '/videos/reel3.mp4',
    pinterestUrl: 'https://www.pinterest.com/pin/345678901/',
    thumbnail: 'images/reel3.jpeg',
  },
  {
    id: 4,
    // title: 'Daily Calorie Needs',
    desc: 'Meditation',
    emoji: '🧠',
    videoUrl: '/videos/reel4.mp4',
    pinterestUrl: 'https://www.pinterest.com/pin/456789012/',
    thumbnail: 'images/reel4.jpeg',
  },
  {
    id: 5,
    // title: 'Daily Calorie Needs',
    desc: 'Meditation',
    emoji: '🧠',
    videoUrl: '/videos/reel5.mp4',
    pinterestUrl: 'https://www.pinterest.com/pin/456789012/',
    thumbnail: 'images/reel5.jpeg',
  },
  {
    id: 6,
    // title: 'Daily Calorie Needs',
    desc: 'Exercise',
    emoji: '🔥',
    videoUrl: '/videos/reel6.mp4',
    pinterestUrl: 'https://www.pinterest.com/pin/456789012/',
    thumbnail: 'images/reel6.jpeg',
  },
  {
    id: 7,
    // title: 'How to Calculate Your BMI',
    desc: 'Check BMI',
    emoji: '📊',
    videoUrl: '/videos/reel7.mp4',
    pinterestUrl: 'https://www.pinterest.com/pin/234567890/',
    thumbnail: 'images/reel7.jpeg',
  },
  {
    id: 8,
    // title: 'How to Calculate Your BMI',
    desc: 'Use TheFitCalculator',
    emoji: '📊',
    videoUrl: '/videos/reel8.mp4',
    pinterestUrl: 'https://www.pinterest.com/pin/234567890/',
    thumbnail: 'images/reel8.jpeg',
  },
  {
    id: 9,
    // title: 'How to Calculate Your BMI',
    desc: 'Use TheFitCalculator',
    emoji: '📊',
    videoUrl: '/videos/reel9.mp4',
    pinterestUrl: 'https://www.pinterest.com/pin/234567890/',
    thumbnail: 'images/reel9.jpeg',
  },
  {
    id: 10,
    // title: 'How to Calculate Your BMI',
    desc: 'Use TheFitCalculator',
    emoji: '📊',
    videoUrl: '/videos/reel10.mp4',
    pinterestUrl: 'https://www.pinterest.com/pin/234567890/',
    thumbnail: 'images/reel10.jpeg',
  },
  {
    id: 11,
    // title: 'How to Calculate Your BMI',
    desc: 'Check BMR',
    emoji: '📊',
    videoUrl: '/videos/reel11.mp4',
    pinterestUrl: 'https://www.pinterest.com/pin/234567890/',
    thumbnail: 'images/reel11.jpeg',
  },
  // {
  //   id: 12,
  //   title: 'How to Calculate Your BMI',
  //   desc: 'Step by step guide to calculating BMI and understanding what the number means for health.',
  //   emoji: '📊',
  //   videoUrl: '/videos/reel11.mp4',
  //   pinterestUrl: 'https://www.pinterest.com/pin/234567890/',
  //   thumbnail: 'images/reel9.jpeg',
  // },
];

const VideosPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const location = useLocation();
const isReelsPage = location.pathname === '/fitness-reels';

  return (
    <>
      <Helmet>
  {isReelsPage && (
      <title>Fitness Reels – TheFitCalculator</title>
  )}
   {isReelsPage && (
      <meta name="description" content="Watch short fitness reels on BMI, BMR, calorie tracking, and healthy weight management from TheFitCalculator." />
  )}
  {isReelsPage && (
      <link rel="canonical" href="https://thefitcalculator.com/fitness-reels" />
  )} 
   {isReelsPage && (  
      <meta property="og:title" content="Fitness Reels – TheFitCalculator" />
   )}  
    {isReelsPage && (
      <meta property="og:description" content="Watch short fitness reels on workout tips and healthy weight management." />
    )}  
   {isReelsPage && (
      <meta property="og:url" content="https://thefitcalculator.com/fitness-reels" />
   )}  
    {isReelsPage && (
      <meta property="og:type" content="video.other" />
    )}
     {isReelsPage && ( 
      <meta property="og:image" content="https://thefitcalculator.com/images/reel1.jpeg" />
     )} 
    {isReelsPage && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Fitness Reels – TheFitCalculator",
            "url": "https://thefitcalculator.com/fitness-reels",
            "itemListElement": videos.map((video, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "VideoObject",
                "name": `Fitness Reel #${String(index + 1).padStart(2, '0')}`,
                "description": video.desc,
                "thumbnailUrl": `https://thefitcalculator.com/${video.thumbnail}`,
                "contentUrl": `https://thefitcalculator.com${video.videoUrl}`,
                "embedUrl": "https://thefitcalculator.com/fitness-reels",
                "uploadDate": "2026-03-01",
                "publisher": {
                  "@type": "Organization",
                  "name": "TheFitCalculator",
                  "url": "https://thefitcalculator.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://thefitcalculator.com/logo1.png"
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
                    <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">Reels</h1>
                    {/* <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.3em]">Reels</span> */}
                  </div>
                </div>
              </header>

        {/* ── Hero strip ── */}
        {/* <div className="border-b border-gray-800 px-4 py-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-400 mb-3">Short · Quick · Useful</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
            Health in <span className="text-brand-400">60 Seconds</span>
          </h2>
          <p className="text-gray-500 text-sm mt-4 max-w-md mx-auto">
            Tap any reel to watch. Download or share directly to Pinterest.
          </p>
        </div> */}
        <div className="hidden md:block h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

{/* About Section */}
<div className="max-w-7xl mx-auto px-4 py-10">
  <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl px-8 py-10 relative overflow-hidden">
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
    <div className="relative max-w-2xl mx-auto text-center">
      <span className="inline-block bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 block text-center">
        Why Fitness Reels?
      </span>
      <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4 text-center">
        Small Videos. <span className="text-brand-200">Real Results.</span>
      </h2>
      <p className="text-brand-100 text-base leading-relaxed mb-4 text-center">
        We made these reels so you can pick up something useful without sitting through a long video. These reels cut through that. Watch one between tasks, share one with a friend, or just scroll through when you have a minute. Simple health, no fluff.
      </p>
    </div>
  </div>
</div>

        {/* ── Reels Grid — portrait cards like Instagram Reels / TikTok ── */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-brand-500 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300"
                style={{ aspectRatio: '9/16' }}
              >
                {/* Thumbnail fills full portrait card */}
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={`Fitness reel ${index + 1} - ${video.desc.slice(0, 50)}`}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-5xl opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300">
                      {video.emoji}
                    </span>
                  </div>
                )}

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                {/* Play button — center, appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>

                {/* Reel number — top left */}
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-black text-white/50 tabular-nums">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Download — top right, hover only */}
                <a
                  href={video.videoUrl}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-600"
                  title="Download"
                >
                  <Download className="w-3 h-3 text-white" />
                </a>

                {/* Title — bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                    <Play className="w-2 h-2 fill-current" /> Watch
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Video Modal ── */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              className="relative flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-2xl"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 z-10 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Portrait video player */}
              <div
                className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 flex-shrink-0"
                style={{ width: '240px', aspectRatio: '9/16' }}
              >
                <video
                  src={selectedVideo.videoUrl}
                  poster={selectedVideo.thumbnail || undefined}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Side panel */}
              <div className="text-white space-y-5 max-w-[220px]">
                <div>
                  <span className="text-4xl block mb-3">{selectedVideo.emoji}</span>
                  {/* <h2 className="text-lg font-black leading-tight mb-2">{selectedVideo.title}</h2> */}
                  <p className="text-gray-400 text-xs leading-relaxed">{selectedVideo.desc}</p>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={selectedVideo.videoUrl}
                    download
                    className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Reel
                  </a>
                  {/* <a
                    href={selectedVideo.pinterestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View on Pinterest
                  </a> */}
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="w-full py-2.5 text-gray-500 hover:text-white text-xs font-bold transition-colors"
                  >
                    ← Back to Reels
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideosPage;