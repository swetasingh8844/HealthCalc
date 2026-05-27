import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  CloudRain, Waves, Flame, Bird, Coffee, Wind, Music, Volume2, VolumeX,
  Clock, X, SlidersHorizontal, Zap, Heart, Sparkles, Play, Pause,
  RotateCcw, Timer, Gamepad2, SkipForward, CheckCircle, ArrowLeft,
} from 'lucide-react';

// ── Animation helper ──────────────────────────────────────────────────────────
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

// ─────────────────────────────────────────────────────────────────────────────
// WEB AUDIO ENGINE — all sounds generated procedurally, zero external URLs
// ─────────────────────────────────────────────────────────────────────────────

let _ctx: AudioContext | null = null;

// Must be called inside a user-gesture handler (click/tap).
function getCtx(): AudioContext {
  if (!_ctx) {
    _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (_ctx.state === 'suspended') {
    _ctx.resume().catch(() => {});
  }
  return _ctx;
}

// Play a silent 1-sample buffer to pre-unlock AudioContext on first user click.
function unlockAudio() {
  try {
    const ctx = getCtx();
    const buf = ctx.createBuffer(1, 1, ctx.sampleRate);
    const src = ctx.createBufferSource();
    src.buffer = buf; src.connect(ctx.destination); src.start(0);
  } catch (_) {}
}

interface SoundEngine { stop(): void; setVolume(v: number): void; }

// ── Rain: filtered pink noise ─────────────────────────────────────────────────
function makeRain(vol = 0.6): SoundEngine {
  const ctx = getCtx();
  const gain = ctx.createGain(); gain.gain.value = vol;
  const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
  for (let i = 0; i < d.length; i++) {
    const w = Math.random() * 2 - 1;
    b0=0.99886*b0+w*0.0555179;b1=0.99332*b1+w*0.0750759;b2=0.96900*b2+w*0.1538520;
    b3=0.86650*b3+w*0.3104856;b4=0.55000*b4+w*0.5329522;b5=-0.7616*b5-w*0.0168980;
    d[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11; b6=w*0.115926;
  }
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
  const hipass = ctx.createBiquadFilter(); hipass.type='highpass'; hipass.frequency.value=1200;
  const lopass = ctx.createBiquadFilter(); lopass.type='lowpass';  lopass.frequency.value=8000;
  src.connect(hipass); hipass.connect(lopass); lopass.connect(gain); gain.connect(ctx.destination);
  src.start();
  return { stop(){ try{src.stop();}catch(_){} gain.disconnect(); }, setVolume(v){gain.gain.setTargetAtTime(v,ctx.currentTime,0.1);} };
}

// ── Thunder: low rumble bursts ────────────────────────────────────────────────
function makeThunder(vol = 0.5): SoundEngine {
  const ctx = getCtx();
  const masterGain = ctx.createGain(); masterGain.gain.value = vol;
  masterGain.connect(ctx.destination);
  let stopped = false;
  const nodes: AudioNode[] = [];

  const rumble = () => {
    if (stopped) return;
    const g = ctx.createGain(); g.gain.value = 0;
    const src = ctx.createBufferSource();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random()*2-1) * Math.exp(-i/(ctx.sampleRate*0.8));
    src.buffer = buf;
    const lp = ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=120;
    src.connect(lp); lp.connect(g); g.connect(masterGain);
    nodes.push(g, lp);
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(0.8,t+0.3);
    g.gain.exponentialRampToValueAtTime(0.001,t+2.5);
    src.start(t);
    setTimeout(rumble, 4000 + Math.random()*6000);
  };
  rumble();
  return {
    stop(){ stopped=true; nodes.forEach(n=>{try{n.disconnect();}catch(_){}});  masterGain.disconnect(); },
    setVolume(v){ masterGain.gain.setTargetAtTime(v,getCtx().currentTime,0.1); }
  };
}

// ── Ocean: slow modulated noise ───────────────────────────────────────────────
function makeOcean(vol = 0.6): SoundEngine {
  const ctx = getCtx();
  const gain = ctx.createGain(); gain.gain.value = vol;
  const buf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
  const lp = ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=400;
  // LFO for wave motion
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.12;
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 200;
  lfo.connect(lfoGain); lfoGain.connect(lp.frequency);
  lfo.start();
  src.connect(lp); lp.connect(gain); gain.connect(ctx.destination); src.start();
  return {
    stop(){ try{src.stop();lfo.stop();}catch(_){} gain.disconnect(); },
    setVolume(v){ gain.gain.setTargetAtTime(v,ctx.currentTime,0.1); }
  };
}

// ── Forest: layered bird chirps + wind ───────────────────────────────────────
function makeForest(vol = 0.5): SoundEngine {
  const ctx = getCtx();
  const master = ctx.createGain(); master.gain.value = vol; master.connect(ctx.destination);
  let stopped = false;

  // Wind layer
  const wBuf = ctx.createBuffer(1, ctx.sampleRate*2, ctx.sampleRate);
  const wd = wBuf.getChannelData(0);
  for(let i=0;i<wd.length;i++) wd[i]=Math.random()*2-1;
  const wSrc = ctx.createBufferSource(); wSrc.buffer=wBuf; wSrc.loop=true;
  const wLp = ctx.createBiquadFilter(); wLp.type='bandpass'; wLp.frequency.value=800; wLp.Q.value=0.5;
  const wGain = ctx.createGain(); wGain.gain.value=0.15;
  wSrc.connect(wLp); wLp.connect(wGain); wGain.connect(master); wSrc.start();

  // Bird chirps
  const chirp = () => {
    if (stopped) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    const baseFreq = 1200 + Math.random()*2000;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq*1.5, ctx.currentTime+0.1);
    osc.frequency.exponentialRampToValueAtTime(baseFreq*0.8, ctx.currentTime+0.25);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.3, ctx.currentTime+0.05);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.3);
    osc.connect(g); g.connect(master);
    osc.start(); osc.stop(ctx.currentTime+0.35);
    setTimeout(chirp, 800 + Math.random()*3000);
  };
  chirp();

  return {
    stop(){ stopped=true; try{wSrc.stop();}catch(_){} master.disconnect(); },
    setVolume(v){ master.gain.setTargetAtTime(v,ctx.currentTime,0.1); }
  };
}

// ── Fireplace: crackling fire ─────────────────────────────────────────────────
function makeFireplace(vol = 0.5): SoundEngine {
  const ctx = getCtx();
  const master = ctx.createGain(); master.gain.value = vol; master.connect(ctx.destination);
  let stopped = false;

  // Base rumble
  const buf = ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
  const d = buf.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
  const src = ctx.createBufferSource(); src.buffer=buf; src.loop=true;
  const lp = ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=200;
  const bg = ctx.createGain(); bg.gain.value=0.3;
  src.connect(lp); lp.connect(bg); bg.connect(master); src.start();

  // Crackles
  const crackle = () => {
    if(stopped) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type='sawtooth'; osc.frequency.value=80+Math.random()*200;
    const dur=0.02+Math.random()*0.08;
    g.gain.setValueAtTime(0.4+Math.random()*0.4,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);
    osc.connect(g); g.connect(master);
    osc.start(); osc.stop(ctx.currentTime+dur);
    setTimeout(crackle, 50+Math.random()*300);
  };
  crackle();

  return {
    stop(){ stopped=true; try{src.stop();}catch(_){} master.disconnect(); },
    setVolume(v){ master.gain.setTargetAtTime(v,ctx.currentTime,0.1); }
  };
}

// ── White noise: flat spectrum ─────────────────────────────────────────────────
function makeWhiteNoise(vol = 0.4): SoundEngine {
  const ctx = getCtx();
  const gain = ctx.createGain(); gain.gain.value = vol;
  const buf = ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
  const d = buf.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
  const src = ctx.createBufferSource(); src.buffer=buf; src.loop=true;
  src.connect(gain); gain.connect(ctx.destination); src.start();
  return {
    stop(){ try{src.stop();}catch(_){} gain.disconnect(); },
    setVolume(v){ gain.gain.setTargetAtTime(v,ctx.currentTime,0.1); }
  };
}

// ── Café: chatter + clink simulation ─────────────────────────────────────────
function makeCafe(vol = 0.4): SoundEngine {
  const ctx = getCtx();
  const master = ctx.createGain(); master.gain.value = vol; master.connect(ctx.destination);
  let stopped = false;

  // Background murmur
  const buf = ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
  const d = buf.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
  const src = ctx.createBufferSource(); src.buffer=buf; src.loop=true;
  const bp = ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=1200; bp.Q.value=0.3;
  const bg = ctx.createGain(); bg.gain.value=0.12;
  src.connect(bp); bp.connect(bg); bg.connect(master); src.start();

  // Cup clinks
  const clink = () => {
    if(stopped) return;
    const osc = ctx.createOscillator(); osc.type='sine';
    const freq=1800+Math.random()*800;
    osc.frequency.setValueAtTime(freq,ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq*0.5,ctx.currentTime+0.4);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.2+Math.random()*0.15,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.5);
    osc.connect(g); g.connect(master);
    osc.start(); osc.stop(ctx.currentTime+0.55);
    setTimeout(clink, 3000+Math.random()*8000);
  };
  clink();

  return {
    stop(){ stopped=true; try{src.stop();}catch(_){} master.disconnect(); },
    setVolume(v){ master.gain.setTargetAtTime(v,ctx.currentTime,0.1); }
  };
}

// ── Piano: soothing chord pad ─────────────────────────────────────────────────
function makePiano(vol = 0.4): SoundEngine {
  const ctx = getCtx();
  const master = ctx.createGain(); master.gain.value = vol; master.connect(ctx.destination);
  let stopped = false;
  const oscs: OscillatorNode[] = [];

  const CHORD_PROGRESSIONS = [
    [261.63, 329.63, 392.00], // C major
    [220.00, 277.18, 329.63], // A minor
    [174.61, 220.00, 261.63], // F major
    [196.00, 246.94, 293.66], // G major
  ];
  let chordIdx = 0;

  const playChord = () => {
    if(stopped) return;
    const freqs = CHORD_PROGRESSIONS[chordIdx % CHORD_PROGRESSIONS.length];
    chordIdx++;
    freqs.forEach(freq => {
      [1,2,0.5].forEach((mult,hi)=>{
        const osc = ctx.createOscillator();
        osc.type = hi===0?'sine':'triangle';
        osc.frequency.value = freq*mult;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0,ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.08/(hi+1),ctx.currentTime+0.3);
        g.gain.setValueAtTime(0.08/(hi+1),ctx.currentTime+2.5);
        g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+4);
        osc.connect(g); g.connect(master);
        osc.start(); osc.stop(ctx.currentTime+4.1);
        oscs.push(osc);
      });
    });
    setTimeout(playChord, 5000);
  };
  playChord();

  return {
    stop(){ stopped=true; oscs.forEach(o=>{try{o.stop();}catch(_){}}); master.disconnect(); },
    setVolume(v){ master.gain.setTargetAtTime(v,ctx.currentTime,0.1); }
  };
}

// ── Lofi beats: kick + hat + pad ─────────────────────────────────────────────
function makeLofi(vol = 0.4): SoundEngine {
  const ctx = getCtx();
  const master = ctx.createGain(); master.gain.value = vol; master.connect(ctx.destination);
  let stopped = false; let beat = 0;

  const kick = () => {
    const osc=ctx.createOscillator(); const g=ctx.createGain();
    osc.frequency.setValueAtTime(150,ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.3);
    g.gain.setValueAtTime(1,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.3);
    osc.connect(g); g.connect(master); osc.start(); osc.stop(ctx.currentTime+0.35);
  };

  const hat = () => {
    const buf=ctx.createBuffer(1,ctx.sampleRate*0.05,ctx.sampleRate);
    const d=buf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
    const src=ctx.createBufferSource(); src.buffer=buf;
    const hp=ctx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=8000;
    const g=ctx.createGain(); g.gain.setValueAtTime(0.15,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.05);
    src.connect(hp); hp.connect(g); g.connect(master); src.start(); 
  };

  const tick = () => {
    if(stopped) return;
    if(beat%4===0||beat%4===2) kick();
    if(beat%2!==0) hat();
    beat++;
    setTimeout(tick, 450);
  };
  tick();

  return {
    stop(){ stopped=true; master.disconnect(); },
    setVolume(v){ master.gain.setTargetAtTime(v,ctx.currentTime,0.1); }
  };
}

// ── Completion chime: 3-note ascending ───────────────────────────────────────
function playCompletionChime() {
  const ctx = getCtx();
  const notes = [523.25, 659.25, 783.99]; // C5 E5 G5
  notes.forEach((freq,i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const rev = ctx.createConvolver();
    // Simple reverb buffer
    const revBuf = ctx.createBuffer(2,ctx.sampleRate*1.5,ctx.sampleRate);
    for(let c=0;c<2;c++){ const d=revBuf.getChannelData(c); for(let j=0;j<d.length;j++) d[j]=(Math.random()*2-1)*Math.exp(-j/(ctx.sampleRate*0.5)); }
    rev.buffer=revBuf;
    const t = ctx.currentTime + i * 0.22;
    osc.type = 'sine'; osc.frequency.value = freq;
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(0.4,t+0.05);
    g.gain.exponentialRampToValueAtTime(0.001,t+1.2);
    osc.connect(g); g.connect(rev); rev.connect(ctx.destination); g.connect(ctx.destination);
    osc.start(t); osc.stop(t+1.3);
  });
}

// Map sound id → generator function
const SOUND_GENERATORS: Record<string, (vol:number)=>SoundEngine> = {
  rain:    makeRain,
  thunder: makeThunder,
  ocean:   makeOcean,
  forest:  makeForest,
  fire:    makeFireplace,
  white:   makeWhiteNoise,
  cafe:    makeCafe,
  piano:   makePiano,
  lofi:    makeLofi,
};

// Focus timer ambient generators
const FOCUS_SOUND_GEN: Record<string,(v:number)=>SoundEngine> = {
  rain:   makeRain,
  forest: makeForest,
  white:  makeWhiteNoise,
  cafe:   makeCafe,
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
type Tab = 'breathe' | 'sounds' | 'focus' | 'games' | 'mood' | 'water' | 'quote';

interface SoundDef { id:string; name:string; category:'Nature'|'Ambient'|'Music'; icon:React.ElementType; ytUrl:string; image:string; }
interface ActiveSound { id:string; volume:number; }

const SOUNDS: SoundDef[] = [
  { id:'rain',    name:'Soft Rain',      category:'Nature',  icon:CloudRain, ytUrl:'https://www.youtube.com/results?search_query=rain+sounds+sleep',           image:'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=600' },
  { id:'thunder', name:'Thunderstorm',   category:'Nature',  icon:Zap,       ytUrl:'https://www.youtube.com/results?search_query=thunderstorm+sounds+sleep',    image:'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&q=80&w=600' },
  { id:'ocean',   name:'Ocean Waves',    category:'Nature',  icon:Waves,     ytUrl:'https://www.youtube.com/results?search_query=ocean+wave+sounds+relaxing',   image:'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=600' },
  { id:'forest',  name:'Forest Birds',   category:'Nature',  icon:Bird,      ytUrl:'https://www.youtube.com/results?search_query=forest+nature+sounds+birds',   image:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600' },
  { id:'fire',    name:'Fireplace',      category:'Nature',  icon:Flame,     ytUrl:'https://www.youtube.com/results?search_query=fireplace+crackling+relaxing', image:'https://images.unsplash.com/photo-1542181961-9590d0c79dab?auto=format&fit=crop&q=80&w=600' },
  { id:'white',   name:'White Noise',    category:'Ambient', icon:Wind,      ytUrl:'https://www.youtube.com/results?search_query=white+noise+focus+study',      image:'https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&q=80&w=600' },
  { id:'cafe',    name:'Paris Café',     category:'Ambient', icon:Coffee,    ytUrl:'https://www.youtube.com/results?search_query=paris+cafe+ambient+sounds',    image:'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600' },
  { id:'piano',   name:'Moonlight Piano',category:'Music',   icon:Music,     ytUrl:'https://www.youtube.com/results?search_query=soft+piano+relaxing+music',   image:'images/piano.jpg' },
  { id:'lofi',    name:'Lofi Beats',     category:'Music',   icon:Music,     ytUrl:'https://www.youtube.com/results?search_query=lofi+beats+study+relax',      image:'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=600' },
];
const SOUND_CATS = ['All','Nature','Ambient','Music'] as const;

const BREATH_PATTERNS = [
  { label:'Box (4-4-4)',    values:[4,4,4] as [number,number,number] },
  { label:'4-7-8 Calming', values:[4,7,8] as [number,number,number] },
  { label:'Quick (2-2-2)', values:[2,2,2] as [number,number,number] },
  { label:'Deep (5-5)',    values:[5,0,5] as [number,number,number] },
];
const MOODS = [
  { label:'Exhausted', emoji:'😴', tip:'Rest is productive. Your body is telling you something important — honour it today.' },
  { label:'Low',       emoji:'😔', tip:"It's okay to have low days. Even a 5-minute walk outside can gently shift your state." },
  { label:'Okay',      emoji:'😐', tip:'Steady is underrated. Hydrate, take a deep breath, and keep moving forward.' },
  { label:'Good',      emoji:'🙂', tip:"Nice energy! Channel it — this is a good moment to tackle something you've been putting off." },
  { label:'Great',     emoji:'😄', tip:'You are thriving. Share that energy, set a bold goal today, and celebrate a small win.' },
];
const QUOTES = [
  { text:'Almost everything will work again if you unplug it for a few minutes — including you.', author:'Anne Lamott' },
  { text:"You don't have to control your thoughts. You just have to stop letting them control you.", author:'Dan Millman' },
  { text:'The present moment is the only moment available to us, and it is the door to all moments.', author:'Thich Nhat Hanh' },
  { text:'Rest when you are weary. Refresh and renew yourself, your body, your mind, your spirit.', author:'Ralph Marston' },
  { text:'Tension is who you think you should be. Relaxation is who you are.', author:'Chinese proverb' },
  { text:'Your body hears everything your mind says. Stay kind to yourself.', author:'Naomi Judd' },
  { text:"Don't stop until you're proud.", author:'Anonymous' },
];
const STRETCHES = [
  { icon:'↔️', label:'Neck roll — tilt ear to shoulder',   dur:'30 s each' },
  { icon:'🤲', label:'Shoulder cross stretch',              dur:'30 s each' },
  { icon:'✋', label:'Wrist circles — 10 reps each way',    dur:'20 s' },
  { icon:'🔄', label:'Torso twist — seated',                dur:'30 s each' },
  { icon:'☝️', label:'Overhead reach — interlace fingers',  dur:'20 s' },
];
const FOCUS_TRACKS = [
  { id:'jazz',  label:'Steady Jazz',  ytUrl:'https://www.youtube.com/results?search_query=steady+jazz+focus+music', color:'from-amber-600 to-orange-700' },
  { id:'synth', label:'Synth Wave',   ytUrl:'https://www.youtube.com/results?search_query=synthwave+focus+music',   color:'from-violet-600 to-purple-700' },
  { id:'lofi2', label:'Lofi Hip-hop', ytUrl:'https://www.youtube.com/results?search_query=lofi+hip+hop+study',      color:'from-teal-600 to-cyan-700' },
  { id:'class', label:'Classical',    ytUrl:'https://www.youtube.com/results?search_query=classical+music+focus+study', color:'from-rose-600 to-pink-700' },
];
const FOCUS_SOUND_LIST = [
  { id:'rain',   label:'Rain'       },
  { id:'forest', label:'Forest'     },
  { id:'white',  label:'White noise'},
  { id:'cafe',   label:'Café'       },
];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UI
// ─────────────────────────────────────────────────────────────────────────────
const Hdr:React.FC<{title:string;count?:string;icon?:React.ElementType}> = ({title,count,icon:Icon}) => (
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-3">
      <div className="w-1 h-6 bg-gradient-to-b from-teal-400 to-teal-600 rounded-full"/>
      {Icon && <Icon className="w-4 h-4 text-teal-400"/>}
      <h2 className="text-base font-bold text-white tracking-tight">{title}</h2>
    </div>
    {count && <span className="text-[11px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full border border-gray-700">{count}</span>}
  </div>
);

// Toast notification
const Toast:React.FC<{msg:string;sub?:string;onClose:()=>void}> = ({msg,sub,onClose}) => (
  <motion.div initial={{opacity:0,y:40,scale:0.9}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:0.9}}
    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gray-900 border border-teal-500/50 shadow-2xl shadow-teal-900/40 min-w-[280px]"
  >
    <CheckCircle className="w-5 h-5 text-teal-400 shrink-0"/>
    <div className="flex-1">
      <p className="text-sm font-bold text-white">{msg}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><X className="w-4 h-4"/></button>
  </motion.div>
);

const TABS:{id:Tab;label:string;emoji:string}[] = [
  {id:'breathe',label:'Breathe',emoji:'🌬️'},
  {id:'sounds', label:'Sounds', emoji:'🎵'},
  {id:'focus',  label:'Focus',  emoji:'⏱️'},
  {id:'games',  label:'Games',  emoji:'🎮'},
  {id:'mood',   label:'Mood',   emoji:'😊'},
  {id:'water',  label:'Water',  emoji:'💧'},
  {id:'quote',  label:'Quote',  emoji:'💬'},
];

// ─────────────────────────────────────────────────────────────────────────────
// BREATHING PANEL
// ─────────────────────────────────────────────────────────────────────────────
// ── Speak a phrase via SpeechSynthesis (non-blocking, cancels previous) ────────
function speak(text: string, rate = 0.82, pitch = 0.95) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate  = rate;
  u.pitch = pitch;
  u.volume = 1;
  // Prefer a calm English voice if available
  const voices = window.speechSynthesis.getVoices();
  const calm = voices.find(v =>
    v.lang.startsWith('en') && /female|samantha|karen|moira|victoria|fiona|zira/i.test(v.name)
  ) || voices.find(v => v.lang.startsWith('en'));
  if (calm) u.voice = calm;
  window.speechSynthesis.speak(u);
}

// ── Soft tone cue per phase ───────────────────────────────────────────────────
function playBreathTone(phase: 'in'|'hold'|'out'|'rest'|'done') {
  try {
    const ctx = getCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    // in=rising G4, hold=steady E4, out=falling C4, rest=low A3, done=chime
    const freqs: Record<string,[number,number]> = {
      in:   [392, 440],
      hold: [330, 330],
      out:  [330, 261],
      rest: [220, 220],
      done: [523, 659],
    };
    const [f1, f2] = freqs[phase] || [330, 330];
    osc.frequency.setValueAtTime(f1, now);
    osc.frequency.linearRampToValueAtTime(f2, now + 0.6);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    gain.gain.linearRampToValueAtTime(0, now + 0.7);
    osc.start(now); osc.stop(now + 0.8);
  } catch (_) {}
}

const BreathPanel:React.FC = () => {
  const [running,setRunning]  = useState(false);
  const [patIdx,setPatIdx]    = useState(0);
  const [voiceOn,setVoiceOn]  = useState(true);
  const [phase,setPhase]      = useState<'idle'|'in'|'hold'|'out'|'rest'|'done'>('idle');
  const [cyclesDone,setCycles]= useState(0);
  const [countdown,setCountdown] = useState<number|null>(null);
  const runRef  = useRef(false);
  const tRef    = useRef<ReturnType<typeof setTimeout>|null>(null);
  const cdRef   = useRef<ReturnType<typeof setInterval>|null>(null);
  const voiceRef= useRef(true);

  useEffect(()=>{ voiceRef.current=voiceOn; },[voiceOn]);

  const clr=()=>{
    if(tRef.current)clearTimeout(tRef.current);
    if(cdRef.current)clearInterval(cdRef.current);
  };

  const announce=(text:string, tone:'in'|'hold'|'out'|'rest'|'done')=>{
    playBreathTone(tone);
    if(voiceRef.current) speak(text);
  };

  // countdown ticker for the ring number display
  const startCountdown=(seconds:number)=>{
    if(cdRef.current)clearInterval(cdRef.current);
    setCountdown(seconds);
    const start=Date.now();
    cdRef.current=setInterval(()=>{
      const elapsed=Math.floor((Date.now()-start)/1000);
      const left=seconds-elapsed;
      if(left<=0){ clearInterval(cdRef.current!); setCountdown(null); }
      else setCountdown(left);
    },200);
  };

  const stop=useCallback(()=>{
    runRef.current=false; clr();
    setRunning(false); setCycles(0); setPhase('idle'); setCountdown(null);
    window.speechSynthesis?.cancel();
  },[]);

  const runCycle=useCallback((cycle:number,pat:typeof BREATH_PATTERNS[0])=>{
    if(!runRef.current||cycle>=4){ stop(); return; }
    const[inn,hold,out]=pat.values;

    // ── INHALE ──
    setPhase('in'); startCountdown(inn);
    announce('Breathe in', 'in');
    tRef.current=setTimeout(()=>{
      if(!runRef.current)return;

      if(hold>0){
        // ── HOLD ──
        setPhase('hold'); startCountdown(hold);
        announce('Hold', 'hold');
        tRef.current=setTimeout(()=>{
          if(!runRef.current)return;
          doExhale(cycle,out,pat);
        },hold*1000);
      } else {
        doExhale(cycle,out,pat);
      }
    },inn*1000);
  },[stop]);

  const doExhale=(cycle:number,out:number,pat:typeof BREATH_PATTERNS[0])=>{
    // ── EXHALE ──
    setPhase('out'); startCountdown(out);
    announce('Breathe out', 'out');
    tRef.current=setTimeout(()=>{
      if(!runRef.current)return;
      const n=cycle+1; setCycles(n);
      if(n>=4){
        setPhase('done'); setCountdown(null);
        announce('Well done. Session complete.', 'done');
        setRunning(false); runRef.current=false;
        return;
      }
      // ── REST ──
      setPhase('rest'); startCountdown(1);
      announce('Rest', 'rest');
      tRef.current=setTimeout(()=>{ if(runRef.current)runCycle(n,pat); },900);
    },out*1000);
  };

  const start=()=>{ unlockAudio(); runRef.current=true; setRunning(true); setCycles(0); runCycle(0,BREATH_PATTERNS[patIdx]); };
  useEffect(()=>()=>clr(),[]);

  const phaseLabel:{[k:string]:string}={idle:'Ready',in:'Breathe in',hold:'Hold',out:'Breathe out',rest:'Rest',done:'Well done!'};
  const phaseColor:{[k:string]:string}={idle:'text-gray-500',in:'text-teal-400',hold:'text-violet-400',out:'text-blue-400',rest:'text-gray-400',done:'text-emerald-400'};
  const phaseBg:{[k:string]:string}   ={idle:'border-gray-600/30',in:'border-teal-500',hold:'border-violet-500',out:'border-blue-500',rest:'border-gray-600',done:'border-emerald-500'};
  const ringScale=(phase==='in'||phase==='hold')?'scale-[1.35]':'scale-100';
  const dur=phase==='in'?`${BREATH_PATTERNS[patIdx].values[0]}000ms`:phase==='out'?`${BREATH_PATTERNS[patIdx].values[2]}000ms`:'800ms';

  return (
    <div>
      <Hdr title="Breathing Exercise" count="4 cycles" icon={Wind}/>
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* ── Ring + phase display ── */}
        <div className="flex flex-col items-center shrink-0 w-full lg:w-auto">
          <div className="relative w-48 h-48 mb-5">
            {/* Outer pulse ring */}
            {running && (
              <div className={`absolute inset-0 rounded-full border-2 border-teal-400/20 ${phase==='in'?'animate-ping':''}`} style={{animationDuration:'2s'}}/>
            )}
            {/* Main ring */}
            <div
              className={`w-full h-full rounded-full border-[3px] flex items-center justify-center transition-transform ease-in-out ${ringScale} ${phaseBg[phase]}`}
              style={{transitionDuration:dur}}
            >
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/5 flex flex-col items-center justify-center gap-1 shadow-inner">
                {/* Countdown number */}
                {running && countdown!==null
                  ? <span className={`text-5xl font-bold tabular-nums ${phaseColor[phase]}`}>{countdown}</span>
                  : <span className="text-4xl">{phase==='done'?'✅':'🌬️'}</span>
                }
              </div>
            </div>
          </div>

          {/* Phase label — big and clear for eyes-closed use */}
          <div className={`text-lg font-bold text-center mb-1 min-h-[28px] tracking-wide ${phaseColor[phase]}`}>
            {phaseLabel[phase]}
          </div>
          <div className="text-xs text-gray-500 text-center mb-4 min-h-[16px]">
            {phase==='in' &&'Inhale slowly and deeply'}
            {phase==='hold'&&'Keep still — hold your breath'}
            {phase==='out'&&'Let it all go, slowly'}
            {phase==='rest'&&'Relax before the next cycle'}
            {phase==='done'&&'Session complete — great work'}
            {phase==='idle'&&'Close your eyes and follow the voice'}
          </div>

          {/* Cycle dots */}
          <div className="flex gap-2.5 mb-5">
            {Array.from({length:4}).map((_,i)=>(
              <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${
                i<cyclesDone?'bg-teal-500 scale-110 shadow-sm shadow-teal-500/50':'bg-gray-700'
              }`}/>
            ))}
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="flex-1 w-full space-y-4">

          {/* Voice toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-800/60 border border-gray-700/50">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🔊</span>
              <div>
                <p className="text-xs font-bold text-white">Voice guidance</p>
                <p className="text-[10px] text-gray-500">Speaks each phase aloud so you can practice with eyes closed</p>
              </div>
            </div>
            <button
              onClick={()=>setVoiceOn(v=>!v)}
              className={`relative w-11 h-6 rounded-full border transition-all ${voiceOn?'bg-teal-600 border-teal-500':'bg-gray-700 border-gray-600'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${voiceOn?'left-5':'left-0.5'}`}/>
            </button>
          </div>

          {/* Pattern picker */}
          <div>
            <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wider">Pattern</p>
            <div className="grid grid-cols-2 gap-2">
              {BREATH_PATTERNS.map((p,i)=>(
                <button key={i} disabled={running} onClick={()=>setPatIdx(i)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all disabled:opacity-40 text-left ${
                    patIdx===i?'bg-teal-900/50 border-teal-500 text-teal-300':'bg-gray-800/60 border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >{p.label}</button>
              ))}
            </div>
          </div>

          {/* Live phase tip */}
          <div className="bg-gray-800/40 rounded-xl p-3 border border-gray-700/50 min-h-[52px]">
            {phase==='in'  &&<p className="text-xs text-teal-300 leading-relaxed">Inhaling slowly fills the lungs and energises the body.</p>}
            {phase==='hold'&&<p className="text-xs text-violet-300 leading-relaxed">Holding the breath oxygenates the blood and builds CO₂ tolerance.</p>}
            {phase==='out' &&<p className="text-xs text-blue-300 leading-relaxed">Exhaling activates the parasympathetic system — calms and relaxes.</p>}
            {phase==='done'&&<p className="text-xs text-emerald-300 leading-relaxed">You completed 4 full breath cycles. Your cortisol is lower. Well done.</p>}
            {(phase==='idle'||phase==='rest')&&<p className="text-xs text-gray-400 leading-relaxed">Box breathing reduces cortisol, lowers heart rate, and improves focus within minutes.</p>}
          </div>

          {/* Start / stop */}
          <button
            onClick={running?stop:start}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              running
                ?'bg-red-900/40 border border-red-700 text-red-300 hover:bg-red-900/60'
                :'bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-500 hover:to-teal-400 shadow-lg shadow-teal-900/40'
            }`}
          >
            {running?<><Pause className="w-4 h-4"/>Stop session</>:<><Play className="w-4 h-4"/>Start breathing</>}
          </button>

          {voiceOn&&!running&&(
            <p className="text-[10px] text-gray-600 text-center">Voice will say "Breathe in", "Hold", "Breathe out" during the session</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SOUNDS PANEL — Web Audio generated, no external URLs
// ─────────────────────────────────────────────────────────────────────────────
const SoundsPanel:React.FC = () => {
  const [activeSounds,setActive]=useState<ActiveSound[]>([]);
  const [category,setCat]=useState<typeof SOUND_CATS[number]>('All');
  const [favorites,setFavs]=useState<string[]>([]);
  const [showMixer,setMixer]=useState(false);
  const enginesRef=useRef<Record<string,SoundEngine>>({});

  useEffect(()=>{ try{const s=localStorage.getItem('cn_favs');if(s)setFavs(JSON.parse(s));}catch(_){} },[]);
  useEffect(()=>()=>{ Object.values(enginesRef.current).forEach(e=>e.stop()); },[]);

  const toggleSound=(sound:SoundDef)=>{
    unlockAudio(); // satisfy browser autoplay policy on first interaction
    const isOn=activeSounds.find(s=>s.id===sound.id);
    if(isOn){
      enginesRef.current[sound.id]?.stop();
      delete enginesRef.current[sound.id];
      setActive(prev=>prev.filter(s=>s.id!==sound.id));
    } else {
      const gen=SOUND_GENERATORS[sound.id];
      if(gen){
        try { enginesRef.current[sound.id]=gen(0.6); }
        catch(err){ console.warn('Sound gen error',err); }
      }
      setActive(prev=>[...prev,{id:sound.id,volume:0.6}]);
    }
  };
  const updateVol=(id:string,vol:number)=>{
    enginesRef.current[id]?.setVolume(vol);
    setActive(prev=>prev.map(s=>s.id===id?{...s,volume:vol}:s));
  };
  const toggleFav=(id:string,e:React.MouseEvent)=>{
    e.stopPropagation();
    const n=favorites.includes(id)?favorites.filter(f=>f!==id):[...favorites,id];
    setFavs(n); try{localStorage.setItem('cn_favs',JSON.stringify(n));}catch(_){}
  };
  const stopAll=()=>{ Object.values(enginesRef.current).forEach(e=>e.stop()); enginesRef.current={}; setActive([]); };
  const filtered=SOUNDS.filter(s=>category==='All'||s.category===category);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <Hdr title="Relaxing Sounds" />
        <div className="flex items-center gap-2 flex-wrap">
          {activeSounds.length>0&&<>
            <button onClick={()=>setMixer(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 hover:border-violet-500 text-xs font-bold text-gray-300 hover:text-violet-300 transition-all">
              <SlidersHorizontal className="w-3.5 h-3.5"/>Mixer ({activeSounds.length})
            </button>
            <button onClick={stopAll} className="px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 hover:border-red-500 text-xs font-bold text-gray-400 hover:text-red-400 transition-all flex items-center gap-1"><VolumeX className="w-3.5 h-3.5"/>Stop all</button>
          </>}
        </div>
      </div>
      <div className="text-xs text-gray-400 mb-4 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 flex items-center gap-2">
        <Volume2 className="w-3.5 h-3.5 text-violet-400 shrink-0"/>
        <span>All sounds play directly in your browser — <strong className="text-gray-200">no downloads needed</strong>. Tap any card to start. Use the Mixer to layer multiple sounds.</span>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {SOUND_CATS.map(cat=>(
          <button key={cat} onClick={()=>setCat(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${category===cat?'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-900/40':'bg-gray-800/60 border-gray-700 text-gray-400 hover:border-violet-500 hover:text-violet-300'}`}
          >{cat}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((sound,i)=>{
          const active=activeSounds.find(s=>s.id===sound.id);
          const isFav=favorites.includes(sound.id);
          const Icon=sound.icon;
          return (
            <motion.div key={sound.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.3,delay:i*0.05}}
              className={`group relative h-52 rounded-2xl overflow-hidden cursor-pointer border transition-all ${active?'border-violet-500/70 shadow-lg shadow-violet-900/30':'border-white/5 hover:border-violet-400/30'}`}
              onClick={()=>toggleSound(sound)}
            >
              <img src={sound.image} alt={sound.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.4] group-hover:brightness-50"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"/>

              {/* Animated equalizer when active */}
              {active && (
                <div className="absolute top-3 left-3 flex items-end gap-0.5 h-5">
                  {[1,2,3,4,3].map((h,j)=>(
                    <div key={j} className="w-1 bg-violet-400 rounded-sm animate-pulse" style={{height:`${h*4}px`,animationDelay:`${j*0.1}s`}}/>
                  ))}
                </div>
              )}

              <div className="absolute top-3 right-3 flex gap-1.5">
                <button onClick={e=>toggleFav(sound.id,e)}
                  className={`p-2 rounded-full backdrop-blur-md border transition-all ${isFav?'bg-red-500/30 border-red-400/50 text-red-400':'bg-black/40 border-white/10 text-white/50 hover:text-white'}`}
                ><Heart className={`w-3 h-3 ${isFav?'fill-current':''}`}/></button>
                <a href={sound.ytUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                  className="p-2 rounded-full backdrop-blur-md bg-red-700/80 border border-red-500/50 text-white hover:bg-red-500 transition-all" title="YouTube">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <div className={`p-2 rounded-full backdrop-blur-md border transition-all ${active?'bg-violet-600 border-violet-400 shadow-lg shadow-violet-500/30':'bg-black/40 border-white/10'}`}>
                  {active?<Volume2 className="w-3 h-3 text-white animate-pulse"/>:<Icon className="w-3 h-3 text-white/70"/>}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-1">{sound.category}</p>
                <h3 className="text-sm font-bold text-white mb-2 leading-tight">{sound.name}</h3>
                {active&&(
                  <div onClick={e=>e.stopPropagation()}>
                    <div className="flex justify-between text-[10px] text-violet-300/70 mb-1"><span>Volume</span><span>{Math.round(active.volume*100)}%</span></div>
                    <input type="range" min="0" max="1" step="0.01" value={active.volume}
                      onChange={e=>updateVol(sound.id,parseFloat(e.target.value))}
                      className="w-full h-0.5 bg-white/20 rounded appearance-none cursor-pointer accent-violet-400"/>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mixer drawer */}
      <AnimatePresence>
        {showMixer&&activeSounds.length>0&&(
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={()=>setMixer(false)}/>
            <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:30,stiffness:300}}
              className="relative w-80 h-full bg-gray-950 border-l border-gray-800 p-6 flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div><h3 className="text-base font-bold text-white">Active Mixer</h3><p className="text-xs text-gray-500 mt-0.5">{activeSounds.length} sound{activeSounds.length>1?'s':''} playing</p></div>
                <button onClick={()=>setMixer(false)} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white"><X className="w-4 h-4"/></button>
              </div>
              <div className="flex-1 space-y-3">
                {activeSounds.map(active=>{
                  const sound=SOUNDS.find(s=>s.id===active.id); if(!sound)return null;
                  const Icon=sound.icon;
                  return (
                    <div key={active.id} className="p-4 rounded-xl bg-gray-800/60 border border-gray-700/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-violet-900/60 border border-violet-700/50 flex items-center justify-center"><Icon className="w-4 h-4 text-violet-400"/></div>
                          <div><p className="text-xs font-bold text-white leading-none mb-0.5">{sound.name}</p><p className="text-[10px] text-violet-400/70 uppercase tracking-wider">{sound.category}</p></div>
                        </div>
                        <button onClick={()=>toggleSound(sound)} className="text-[10px] font-bold text-red-400/60 hover:text-red-400 uppercase tracking-wider transition-colors">Remove</button>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] text-gray-500 mb-2"><span>Intensity</span><span>{Math.round(active.volume*100)}%</span></div>
                        <input type="range" min="0" max="1" step="0.01" value={active.volume} onChange={e=>updateVol(active.id,parseFloat(e.target.value))} className="w-full accent-violet-400 cursor-pointer"/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FOCUS TIMER PANEL
// ─────────────────────────────────────────────────────────────────────────────
const FocusPanel:React.FC = () => {
  const [mode,setMode]=useState<'pomodoro'|'short'|'long'>('pomodoro');
  const [running,setRunning]=useState(false);
  const [timeLeft,setTimeLeft]=useState(25*60);
  const [sessions,setSessions]=useState(0);
  const [activeFocusSound,setActiveFocusSound]=useState<string|null>(null);
  const [toast,setToast]=useState<{msg:string;sub:string}|null>(null);
  const timerRef=useRef<ReturnType<typeof setInterval>|null>(null);
  const focusEngineRef=useRef<SoundEngine|null>(null);

  const durations={pomodoro:25*60,short:5*60,long:15*60};
  const modeLabels={pomodoro:'Focus',short:'Short Break',long:'Long Break'};
  const modeColors={pomodoro:'from-teal-600 to-emerald-600',short:'from-violet-600 to-purple-600',long:'from-blue-600 to-cyan-600'};
  const modeRingColor={pomodoro:'#14b8a6',short:'#8b5cf6',long:'#3b82f6'};
  const completionMessages={
    pomodoro:{msg:'🎉 Focus session complete!',sub:'Great work! Take a 5-minute break.'},
    short:   {msg:'☕ Break time over!',       sub:'Ready to focus? Start your next session.'},
    long:    {msg:'✅ Long break complete!',   sub:'Feeling refreshed? Let\'s get back to it.'},
  };

  const switchMode=(m:typeof mode)=>{
    setMode(m);setRunning(false);setTimeLeft(durations[m]);
    if(timerRef.current)clearInterval(timerRef.current);
  };

  // Stop focus sound helper
  const stopFocusSound=()=>{
    focusEngineRef.current?.stop();
    focusEngineRef.current=null;
    setActiveFocusSound(null);
  };

  const toggleFocusSound=(id:string)=>{
    unlockAudio();
    if(activeFocusSound===id){ stopFocusSound(); return; }
    focusEngineRef.current?.stop();
    const gen=FOCUS_SOUND_GEN[id];
    if(gen){
      try { focusEngineRef.current=gen(0.5); }
      catch(err){ console.warn('Focus sound error',err); }
    }
    setActiveFocusSound(id);
  };

  const modeRef=useRef(mode);
  useEffect(()=>{ modeRef.current=mode; },[mode]);

  useEffect(()=>{
    if(running){
      timerRef.current=setInterval(()=>{
        setTimeLeft(prev=>{
          if(prev<=1){
            const currentMode=modeRef.current;
            setRunning(false);
            if(timerRef.current)clearInterval(timerRef.current);
            // Play completion chime
            try { unlockAudio(); playCompletionChime(); } catch(_){}
            const msgs:{pomodoro:{msg:string;sub:string};short:{msg:string;sub:string};long:{msg:string;sub:string}}={
              pomodoro:{msg:'🎉 Focus session complete!',sub:'Great work! Take a 5-minute break.'},
              short:   {msg:'☕ Break time over!',       sub:'Ready to focus? Start your next session.'},
              long:    {msg:'✅ Long break complete!',   sub:"Feeling refreshed? Let's get back to it."},
            };
            setToast(msgs[currentMode]);
            if(currentMode==='pomodoro') setSessions(s=>s+1);
            return 0;
          }
          return prev-1;
        });
      },1000);
    } else {
      if(timerRef.current)clearInterval(timerRef.current);
    }
    return()=>{if(timerRef.current)clearInterval(timerRef.current);};
  },[running]);

  // Auto-dismiss toast
  useEffect(()=>{
    if(!toast)return;
    const id=setTimeout(()=>setToast(null),6000);
    return()=>clearTimeout(id);
  },[toast]);

  useEffect(()=>()=>{ stopFocusSound(); },[]);

  const reset=()=>{setRunning(false);setTimeLeft(durations[mode]);if(timerRef.current)clearInterval(timerRef.current);};
  const pct=timeLeft/durations[mode];
  const r=76; const circ=2*Math.PI*r;
  const fmt=(s:number)=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <div>
      <Hdr title="Focus Timer" count={`${sessions} session${sessions!==1?'s':''} done`} icon={Timer}/>

      {/* Mode selector */}
      <div className="flex gap-2 mb-6 p-1.5 bg-gray-800/60 rounded-xl border border-gray-700/50">
        {(['pomodoro','short','long'] as const).map(m=>(
          <button key={m} onClick={()=>switchMode(m)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${mode===m?`bg-gradient-to-r ${modeColors[m]} text-white shadow-lg`:'text-gray-400 hover:text-gray-200'}`}
          >{modeLabels[m]}</button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Circle timer */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-52 h-52 mb-5">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r={r} fill="none" stroke="#1f2937" strokeWidth="10"/>
              <circle cx="90" cy="90" r={r} fill="none" stroke={modeRingColor[mode]} strokeWidth="10"
                strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ*(1-pct)} className="transition-all duration-1000"/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-white tabular-nums tracking-tighter">{fmt(timeLeft)}</span>
              <span className="text-xs text-gray-400 mt-1.5 uppercase tracking-widest font-semibold">{modeLabels[mode]}</span>
              {running && <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse mt-2"/>}
            </div>
          </div>
          <div className="flex gap-3 mb-3">
            <button onClick={()=>{ unlockAudio(); setRunning(r=>!r); }}
              className={`flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${
                running?'bg-red-900/50 border border-red-700 text-red-300 hover:bg-red-900/70':`bg-gradient-to-r ${modeColors[mode]} text-white hover:opacity-90`
              }`}
            >{running?<><Pause className="w-4 h-4"/>Pause</>:<><Play className="w-4 h-4"/>Start</>}</button>
            <button onClick={()=>{ unlockAudio(); reset(); }} className="p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all"><RotateCcw className="w-4 h-4"/></button>
          </div>
          {sessions>0&&<p className="text-xs text-teal-400 font-bold">🎉 {sessions} session{sessions>1?'s':''} completed!</p>}
        </div>

        {/* Right side: music + sounds */}
        <div className="flex-1 space-y-5">
          {/* Focus music */}
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3">Focus music (opens YouTube)</p>
            <div className="space-y-2">
              {FOCUS_TRACKS.map(t=>(
                <a key={t.id} href={t.ytUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-gray-800/60 border border-gray-700 hover:border-gray-600 group transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center`}><Music className="w-4 h-4 text-white"/></div>
                    <span className="text-sm font-bold text-white tracking-wide uppercase">{t.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-red-400" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    <SkipForward className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300 transition-colors"/>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Ambient sounds — Web Audio, play in-page */}
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3">Background ambient (in-page audio)</p>
            <div className="flex flex-wrap gap-2">
              {FOCUS_SOUND_LIST.map(s=>(
                <button key={s.id} onClick={()=>toggleFocusSound(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                    activeFocusSound===s.id?'bg-teal-900/50 border-teal-500 text-teal-300 shadow-lg shadow-teal-900/30':'bg-gray-800/60 border-gray-700 text-gray-400 hover:border-teal-500 hover:text-teal-300'
                  }`}
                >
                  {activeFocusSound===s.id?<Volume2 className="w-3 h-3 animate-pulse"/>:<Volume2 className="w-3 h-3"/>}
                  {s.label}
                  {activeFocusSound===s.id&&<span className="text-[10px] text-teal-400 font-normal ml-1">playing</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-3">
            <p className="text-[11px] text-gray-500 leading-relaxed">💡 <strong className="text-gray-300">Pomodoro technique:</strong> 25 min focus → 5 min break → repeat 4× → 15 min long break. A chime will sound when time is up.</p>
          </div>
        </div>
      </div>

      {/* Completion toast */}
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} sub={toast.sub} onClose={()=>setToast(null)}/>}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GAMES PANEL
// ─────────────────────────────────────────────────────────────────────────────
type GameId = 'bubble'|'sand'|null;

const BubbleGame:React.FC<{onBack:()=>void}> = ({onBack}) => {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const bubblesRef=useRef<{x:number;y:number;r:number;vx:number;vy:number;hue:number;popping:number}[]>([]);
  const rafRef=useRef<number>(0);
  const [score,setScore]=useState(0);
  const [popped,setPopped]=useState(0);

  const spawn=(w:number,h:number)=>({x:Math.random()*w,y:h+40,r:20+Math.random()*30,vx:(Math.random()-0.5)*0.6,vy:-(0.6+Math.random()*0.8),hue:180+Math.random()*80,popping:0});

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas)return;
    const ctx=canvas.getContext('2d'); if(!ctx)return;
    const w=canvas.width=canvas.offsetWidth; const h=canvas.height=canvas.offsetHeight;
    for(let i=0;i<8;i++) bubblesRef.current.push({...spawn(w,h),y:Math.random()*h});

    const loop=()=>{
      ctx.clearRect(0,0,w,h);
      if(Math.random()<0.03) bubblesRef.current.push(spawn(w,h));
      bubblesRef.current=bubblesRef.current.filter(b=>{
        if(b.popping>0){
          b.popping++;
          if(b.popping>12)return false;
          const p=b.popping/12;
          ctx.beginPath();ctx.arc(b.x,b.y,b.r*(1+p*0.5),0,Math.PI*2);
          ctx.strokeStyle=`hsla(${b.hue},80%,70%,${1-p})`;ctx.lineWidth=2;ctx.stroke();
          return true;
        }
        b.x+=b.vx;b.y+=b.vy;b.vx+=Math.sin(Date.now()/2000)*0.01;
        if(b.x<-b.r||b.x>w+b.r||b.y<-b.r)return false;
        const grd=ctx.createRadialGradient(b.x-b.r*0.3,b.y-b.r*0.3,b.r*0.1,b.x,b.y,b.r);
        grd.addColorStop(0,`hsla(${b.hue},80%,90%,0.6)`);
        grd.addColorStop(0.7,`hsla(${b.hue},70%,60%,0.15)`);
        grd.addColorStop(1,`hsla(${b.hue},70%,50%,0.35)`);
        ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();
        ctx.strokeStyle=`hsla(${b.hue},80%,80%,0.5)`;ctx.lineWidth=1.5;ctx.stroke();
        ctx.beginPath();ctx.ellipse(b.x-b.r*0.3,b.y-b.r*0.3,b.r*0.25,b.r*0.15,-0.5,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,0.4)';ctx.fill();
        return true;
      });
      rafRef.current=requestAnimationFrame(loop);
    };
    loop();

    const click=(e:MouseEvent)=>{
      const rect=canvas.getBoundingClientRect(); const mx=e.clientX-rect.left; const my=e.clientY-rect.top;
      let hit=false;
      bubblesRef.current.forEach(b=>{if(b.popping===0&&Math.hypot(mx-b.x,my-b.y)<b.r){b.popping=1;hit=true;}});
      if(hit){setPopped(p=>p+1);setScore(s=>s+Math.floor(10+Math.random()*20));}
    };
    canvas.addEventListener('click',click);
    return()=>{cancelAnimationFrame(rafRef.current);canvas.removeEventListener('click',click);};
  },[]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <button onClick={onBack} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">← Back</button>
        <div className="flex gap-4 text-sm">
          <span className="text-gray-400">Popped: <strong className="text-teal-400">{popped}</strong></span>
          <span className="text-gray-400">Score: <strong className="text-violet-400">{score}</strong></span>
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full rounded-xl bg-gray-900/80 border border-gray-700 cursor-pointer" style={{height:300}}/>
      <p className="text-xs text-gray-500 text-center mt-2">Click bubbles to pop them 🫧</p>
    </div>
  );
};

const SandGame:React.FC<{onBack:()=>void}> = ({onBack}) => {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const isDrawing=useRef(false);
  const lastPos=useRef<{x:number;y:number}|null>(null);
  const hueRef=useRef(30);

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas)return;
    const ctx=canvas.getContext('2d'); if(!ctx)return;
    canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight;
    ctx.fillStyle='#1a1510';ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<3000;i++){
      ctx.fillStyle=`rgba(${180+Math.random()*40},${140+Math.random()*40},${80+Math.random()*40},${0.03+Math.random()*0.04})`;
      ctx.fillRect(Math.random()*canvas.width,Math.random()*canvas.height,1.5,1.5);
    }
    const draw=(x:number,y:number,px:number,py:number)=>{
      hueRef.current=(hueRef.current+0.5)%360;
      const grd=ctx.createRadialGradient(x,y,0,x,y,18);
      grd.addColorStop(0,`hsla(${hueRef.current},80%,60%,0.9)`);
      grd.addColorStop(0.5,`hsla(${hueRef.current},70%,50%,0.5)`);
      grd.addColorStop(1,`hsla(${hueRef.current},60%,40%,0)`);
      ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(x,y);
      ctx.strokeStyle=grd;ctx.lineWidth=10;ctx.lineCap='round';ctx.stroke();
      for(let i=0;i<8;i++){
        const a=Math.random()*Math.PI*2;const d=Math.random()*20;
        ctx.beginPath();ctx.arc(x+Math.cos(a)*d,y+Math.sin(a)*d,0.8+Math.random()*1.5,0,Math.PI*2);
        ctx.fillStyle=`hsla(${hueRef.current+Math.random()*30-15},70%,${50+Math.random()*20}%,${0.4+Math.random()*0.4})`;ctx.fill();
      }
    };
    const getPos=(e:MouseEvent|TouchEvent)=>{
      const rect=canvas.getBoundingClientRect();
      if('touches' in e){const t=e.touches[0];return{x:t.clientX-rect.left,y:t.clientY-rect.top};}
      return{x:(e as MouseEvent).clientX-rect.left,y:(e as MouseEvent).clientY-rect.top};
    };
    const onStart=(e:MouseEvent|TouchEvent)=>{e.preventDefault();isDrawing.current=true;lastPos.current=getPos(e);};
    const onMove=(e:MouseEvent|TouchEvent)=>{e.preventDefault();if(!isDrawing.current||!lastPos.current)return;const p=getPos(e);draw(p.x,p.y,lastPos.current.x,lastPos.current.y);lastPos.current=p;};
    const onEnd=()=>{isDrawing.current=false;lastPos.current=null;};
    canvas.addEventListener('mousedown',onStart);canvas.addEventListener('mousemove',onMove);
    canvas.addEventListener('mouseup',onEnd);canvas.addEventListener('mouseleave',onEnd);
    canvas.addEventListener('touchstart',onStart,{passive:false});
    canvas.addEventListener('touchmove',onMove,{passive:false});
    canvas.addEventListener('touchend',onEnd);
    return()=>{
      canvas.removeEventListener('mousedown',onStart);canvas.removeEventListener('mousemove',onMove);
      canvas.removeEventListener('mouseup',onEnd);canvas.removeEventListener('mouseleave',onEnd);
      canvas.removeEventListener('touchstart',onStart);canvas.removeEventListener('touchmove',onMove);
      canvas.removeEventListener('touchend',onEnd);
    };
  },[]);

  const clear=()=>{
    const canvas=canvasRef.current;const ctx=canvas?.getContext('2d');if(!ctx||!canvas)return;
    ctx.fillStyle='#1a1510';ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<3000;i++){
      ctx.fillStyle=`rgba(${180+Math.random()*40},${140+Math.random()*40},${80+Math.random()*40},${0.03+Math.random()*0.04})`;
      ctx.fillRect(Math.random()*canvas.width,Math.random()*canvas.height,1.5,1.5);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <button onClick={onBack} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">← Back</button>
        <button onClick={clear} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-lg transition-all"><RotateCcw className="w-3 h-3"/>Clear</button>
      </div>
      <canvas ref={canvasRef} className="w-full rounded-xl border border-amber-900/30 cursor-crosshair touch-none" style={{height:300,background:'#1a1510'}}/>
      <p className="text-xs text-gray-500 text-center mt-2">Draw patterns in the sand 🌊 — colors shift as you trace</p>
    </div>
  );
};

const GamesPanel:React.FC = () => {
  const [activeGame,setActiveGame]=useState<GameId>(null);
  const games=[
    {id:'bubble' as GameId,title:'Bubble Pop',icon:Sparkles,desc:'Satisfying pops and gentle floating bubbles.',color:'from-blue-600 to-violet-700',iconColor:'text-blue-300',bg:'bg-blue-900/20',border:'border-blue-700/40'},
    {id:'sand'   as GameId,title:'Sand Drawing',icon:Wind,  desc:'Trace patterns in the digital sand of time.',color:'from-amber-600 to-orange-700',iconColor:'text-amber-300',bg:'bg-amber-900/20',border:'border-amber-700/40'},
  ];
  if(activeGame==='bubble')return <BubbleGame onBack={()=>setActiveGame(null)}/>;
  if(activeGame==='sand')  return <SandGame   onBack={()=>setActiveGame(null)}/>;
  return (
    <div>
      <Hdr title="Mindful Games" count="2 games" icon={Gamepad2}/>
      <p className="text-xs text-gray-400 mb-6 leading-relaxed">Interactive experiences to quiet the mind and bring you into the present moment.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {games.map(g=>{const Icon=g.icon;return(
          <motion.button key={g.id} onClick={()=>setActiveGame(g.id)} whileHover={{scale:1.02}} whileTap={{scale:0.98}}
            className={`group relative flex flex-col items-center text-center p-8 rounded-2xl border ${g.bg} ${g.border} transition-all cursor-pointer overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${g.color} opacity-0 group-hover:opacity-10 transition-opacity`}/>
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${g.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
              <Icon className={`w-8 h-8 ${g.iconColor}`}/>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{g.title}</h3>
            <p className="text-sm text-gray-400 italic leading-relaxed">{g.desc}</p>
            <div className={`mt-4 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${g.color} text-white opacity-0 group-hover:opacity-100 transition-opacity`}>Play now →</div>
          </motion.button>
        );})}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOOD PANEL
// ─────────────────────────────────────────────────────────────────────────────
const MoodPanel:React.FC = () => {
  const [selected,setSelected]=useState<number|null>(null);
  return (
    <div>
      <Hdr title="Mood Check-in" count="daily"/>
      <p className="text-sm text-gray-400 mb-5">How are you feeling right now?</p>
      <div className="flex gap-2 sm:gap-3 mb-5">
        {MOODS.map((m,i)=>(
          <button key={i} onClick={()=>setSelected(i)}
            className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all ${selected===i?'bg-teal-900/40 border-teal-500 shadow-lg scale-105':'bg-gray-800/60 border-gray-700 hover:border-gray-600'}`}
          ><span className="text-2xl sm:text-3xl">{m.emoji}</span><span className="text-[10px] font-semibold text-gray-400 hidden sm:block">{m.label}</span></button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {selected!==null
          ? <motion.div key={selected} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="border-l-2 border-teal-500 pl-4 py-3 bg-teal-900/20 rounded-r-xl">
              <p className="text-xs font-bold text-teal-400 mb-1">{MOODS[selected].label}</p>
              <p className="text-sm text-gray-300 leading-relaxed">{MOODS[selected].tip}</p>
            </motion.div>
          : <div className="border-l-2 border-gray-700 pl-4 py-3 text-sm text-gray-600">Pick a mood above to get a personalised tip.</div>
        }
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// WATER PANEL
// ─────────────────────────────────────────────────────────────────────────────
const WaterPanel:React.FC = () => {
  const [filled,setFilled]=useState(0);
  const ml=filled*250; const goal=2000; const pct=ml/goal;
  return (
    <div>
      <Hdr title="Hydration Tracker" count="8 × 250 ml"/>
      <p className="text-sm text-gray-400 mb-5">Tap each cup as you drink. Daily goal: 2 L.</p>
      <div className="flex flex-wrap gap-2.5 mb-5">
        {Array.from({length:8}).map((_,i)=>(
          <button key={i} onClick={()=>setFilled(filled===i+1?i:i+1)}
            className={`w-10 h-12 rounded-lg border-2 transition-all relative overflow-hidden ${i<filled?'border-blue-400':'border-gray-600 hover:border-blue-500/50'}`}
          >
            {i<filled&&<><div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-blue-400"/><div className="absolute bottom-0 left-0 right-0 h-1.5 bg-blue-300/40 animate-pulse"/></>}
          </button>
        ))}
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-3 border border-gray-700">
        <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500 relative" style={{width:`${pct*100}%`}}>
          <div className="absolute inset-0 bg-white/20 animate-pulse"/>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <span>Consumed: <strong className="text-white">{ml} ml</strong></span>
        <span className={pct>=1?'text-teal-400 font-bold':''}>{pct>=1?'🎉 Goal reached!':`Remaining: ${goal-ml} ml`}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[{l:'25%',c:2},{l:'50%',c:4},{l:'100%',c:8}].map(t=>(
          <button key={t.l} onClick={()=>setFilled(t.c)} className="py-2 rounded-lg text-xs font-bold bg-gray-800/60 border border-gray-700 hover:border-blue-500 hover:text-blue-300 text-gray-400 transition-all">{t.l}</button>
        ))}
      </div>
      <button onClick={()=>setFilled(0)} className="text-xs text-gray-500 border border-gray-700 px-4 py-2 rounded-lg hover:border-gray-600 hover:text-gray-300 transition-all flex items-center gap-1.5"><RotateCcw className="w-3 h-3"/>Reset</button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// QUOTE PANEL
// ─────────────────────────────────────────────────────────────────────────────
const QuotePanel:React.FC = () => {
  const [qIdx,setQIdx]=useState(()=>Math.floor(Math.random()*QUOTES.length));
  return (
    <div>
      <Hdr title="Daily Inspiration" count="refresh anytime"/>
      <motion.div key={qIdx} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 mb-4 relative overflow-hidden">
        <div className="absolute top-4 left-5 text-6xl text-teal-500/10 font-serif leading-none select-none">"</div>
        <p className="text-base sm:text-lg text-white italic leading-relaxed mb-4 relative">{QUOTES[qIdx].text}</p>
        <p className="text-sm text-teal-400 font-bold">— {QUOTES[qIdx].author}</p>
      </motion.div>
      <div className="flex justify-end mb-8">
        <button onClick={()=>setQIdx(i=>(i+1)%QUOTES.length)} className="text-xs text-gray-400 border border-gray-700 px-4 py-2 rounded-lg hover:border-teal-500 hover:text-teal-400 transition-all flex items-center gap-1.5"><RotateCcw className="w-3 h-3"/>New quote</button>
      </div>
      <Hdr title="Quick Desk Stretches" count="~2 min"/>
      <div className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden">
        {STRETCHES.map((s,i)=>(
          <div key={i} className={`flex items-center gap-3 px-5 py-3.5 ${i<STRETCHES.length-1?'border-b border-gray-700/50':''} hover:bg-gray-700/30 transition-colors`}>
            <span className="text-lg w-7 text-center">{s.icon}</span>
            <span className="flex-1 text-sm text-gray-300">{s.label}</span>
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{s.dur}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export const Calmnest:React.FC = () => {
  const [tab,setTab]=useState<Tab>('breathe');

  // Unlock AudioContext on first user interaction anywhere on page
  useEffect(()=>{
    const unlock=()=>unlockAudio();
    window.addEventListener('click',unlock,{once:true});
    window.addEventListener('touchstart',unlock,{once:true});
    return()=>{ window.removeEventListener('click',unlock); window.removeEventListener('touchstart',unlock); };
  },[]);

  return (
    <>
      {/* ── Header ── */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all">
            <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm uppercase tracking-widest">Home</span>
          </Link>

          <div className="flex flex-col items-center">
            <h1 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">Calm</h1>
            <span className="text-[10px] font-bold text-teal-500 dark:text-teal-400 uppercase tracking-[0.3em]">Nest</span>
          </div>

          {/* <div className="w-24" />spacer to balance the back button */}
        </div>
      </header>

      <Helmet>
        <title>Calmnest | Breathing, Relaxing Sounds & Wellness Tools — TheFitCalculator</title>
        <meta name="description" content="Calmnest is your free wellness corner inside TheFitCalculator. Guided breathing with voice, ambient sounds mixer, Pomodoro focus timer, Bubble Pop & Sand Drawing games, mood check-ins, and hydration tracker." />
        <link rel="canonical" href="https://thefitcalculator.com/calmnest" />
        <meta property="og:title" content="Calmnest | Breathing, Relaxing Sounds & Wellness Tools — TheFitCalculator" />
        <meta property="og:description" content="Calmnest is your free wellness corner inside TheFitCalculator. Guided breathing with voice, ambient sounds mixer, Pomodoro focus timer, mindful games, mood check-ins, and hydration tracker." />
        <meta property="og:url" content="https://thefitcalculator.com/calmnest" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://thefitcalculator.com/logo1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Calmnest | Breathing, Relaxing Sounds & Wellness Tools — TheFitCalculator" />
        <meta name="twitter:description" content="Guided breathing with voice, ambient sounds mixer, Pomodoro timer, mindful games, mood & hydration — all free." />
        <meta name="twitter:image" content="https://thefitcalculator.com/logo1.png" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Hero */}
        <motion.div {...fade(0)} className="relative text-center py-12 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-950/20 to-transparent pointer-events-none"/>
          <div className="inline-flex items-center gap-2 bg-gray-800/80 border border-gray-700 text-teal-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            🌿 Mind & Body Wellness
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-3">
            <span className="text-white">Your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Calm</span>
            <span className="text-white"> Space</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-8">Breathing · Real ambient audio · Focus timer · Mindful games · Mood · Hydration</p>
          <div className="flex justify-center gap-8 sm:gap-12">
            {[{val:'9',lbl:'Sounds'},{val:'2',lbl:'Mini games'},{val:'4',lbl:'Focus modes'},{val:'7',lbl:'Tools'}].map(s=>(
              <div key={s.lbl} className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-teal-400">{s.val}</div>
                <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">{s.lbl}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Banner */}
        <motion.div {...fade(0.08)} className="relative bg-gradient-to-r from-gray-800/80 to-gray-800/40 border border-gray-700 rounded-2xl p-5 overflow-hidden flex items-center justify-between gap-4">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 via-violet-500 to-transparent"/>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-900/60 border border-teal-700 text-teal-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">🎵 Real audio</div>
            <h2 className="text-base font-bold text-white mb-1">All sounds play directly in your browser</h2>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xl">Rain, ocean, fireplace, forest, café and more. No downloads.</p>
          </div>
          <button onClick={()=>setTab('sounds')} className="shrink-0 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-500 transition-all whitespace-nowrap">Try sounds →</button>
        </motion.div>

        {/* Tab bar */}
        <motion.div {...fade(0.12)} className="flex gap-1.5 p-1.5 bg-gray-900/80 border border-gray-800 rounded-2xl overflow-x-auto backdrop-blur-sm">
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-1 justify-center ${
                tab===t.id?'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-900/40':'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            ><span className="text-sm">{t.emoji}</span><span className="hidden sm:inline">{t.label}</span></button>
          ))}
        </motion.div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.25}}
            className="bg-gray-900/90 border border-gray-800 rounded-2xl p-5 sm:p-7 backdrop-blur-sm">
            {tab==='breathe' && <BreathPanel/>}
            {tab==='sounds'  && <SoundsPanel/>}
            {tab==='focus'   && <FocusPanel/>}
            {tab==='games'   && <GamesPanel/>}
            {tab==='mood'    && <MoodPanel/>}
            {tab==='water'   && <WaterPanel/>}
            {tab==='quote'   && <QuotePanel/>}
          </motion.div>
        </AnimatePresence>

        <div className="text-center text-xs text-gray-600 border-t border-gray-800 pt-5">
          <span className="text-teal-500 font-bold">Calmnest</span> — a wellness space inside TheFitCalculator &nbsp;·&nbsp; Take a breath. You are doing well. 🌿
        </div>
      </div>
    </>
  );
};

export default Calmnest;