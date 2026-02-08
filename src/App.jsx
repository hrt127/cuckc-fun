import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import confetti from 'canvas-confetti';
import { Heart, X, Info, RotateCcw, MapPin, Briefcase, Sparkles, MessageCircle, Shield } from 'lucide-react';
import CHAIR_DATA from './data/chairs.json';

const META_BLURBS = {
  "whale": "Moves the market just by shifting weight.",
  "degen": "Launched at 3am on Pump.fun and still thinks it’s early.",
  "builder": "Shipping code while you sleep.",
  "grinder": "Farming airdrops since 2021.",
  "exit_liquidity": "You bought the top, didn't you?",
  "bot": "Front-running your sitting experience.",
  "hacker": "Not your keys, not your chair.",
  "infra": "Uptime is the only metric that matters.",
  "vc": "Vesting schedule: 4 years linear.",
  "sniper": "First block or nothing.",
  "cabal": "You're not on the list.",
  "staking": "Lock your tokens, touch grass.",
  "airdrop_farmer": "10,000 wallets, 1 human.",
  "ledger": "Cold storage for your ass.",
  "founder": "Trust the plan.",
  "polygon": "Business development go brrr.",
  "ai_agent": "I have no body but I must sit.",
  "chart_pattern": "Technical analysis says up only.",
  "vaporware": "Coming soon (Q4 2028).",
  "recycler": "Migration token, please send gas.",
  "incubator": "WAGMI.",
  "insider": "The code is law, but I wrote it.",
  "artist": "Right-click save this.",
  "institution": "ETF approved.",
  "influencer": "Smash that like button.",
  "regan": "Carbon neutral seating.",
  "dev": "Git push --force.",
  "default": "Comfort 2/10, meme potential 10/10."
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [showBio, setShowBio] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [sessionStats, setSessionStats] = useState({ solid: 0, wobbly: 0 });
  const [wingChairCache, setWingChairCache] = useState({});
  const apiKey = ""; // Keep empty to trigger offline mode gracefully

  const currentChair = CHAIR_DATA[currentIndex] || {};

  // Calculate "Chair Taste Index" (0-10 score based on % SOLID)
  const totalSwipes = sessionStats.solid + sessionStats.wobbly;
  const tasteIndex = totalSwipes === 0 ? "0.0" : ((sessionStats.solid / totalSwipes) * 10).toFixed(1);

  const callGemini = async (prompt, systemPrompt) => {
    if (!apiKey) {
      setAiResponse("Wing-Chair is offline (no API key). Shill it yourself.");
      return;
    }

    if (wingChairCache[currentChair.id]) {
      setAiResponse(wingChairCache[currentChair.id]);
      return;
    }

    setAiLoading(true);
    setAiResponse(null);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Wing-Chair is confused.";
      setAiResponse(text);
      setWingChairCache(prev => ({ ...prev, [currentChair.id]: text }));
    } catch (e) {
      setAiResponse("Dojo Connection Error: Wing-Chair is offline.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleWingChair = () => {
    if (wingChairCache[currentChair.id]) {
      setAiResponse(wingChairCache[currentChair.id]);
      return;
    }
    const metaInfo = `Archetype: ${currentChair.market_archetype}, Chain: ${currentChair.chain_meta}, Tags: ${currentChair.meme_tags?.join(", ")}`;
    const prompt = `Roast or shill this chair based on its crypto personality. Chair: ${currentChair.name} (${currentChair.model}). Bio: ${currentChair.bio}. Meta: ${metaInfo}`;
    const system = "You are a savage crypto-native assistant. Generate a short, funny, design-centric roast or shill (1 sentence max). Use crypto slang (wagmi, rekt, down bad, etc) where appropriate.";
    callGemini(prompt, system);
  };

  const [{ x, y, rot, scale }, api] = useSpring(() => ({ x: 0, y: 0, rot: 0, scale: 1, config: config.stiff }));

  const bind = useGesture({
    onDrag: ({ movement: [mx, my], down }) => {
      api.start({ x: mx, y: my, rot: mx / 12, scale: down ? 1.05 : 1, immediate: down });
    },
    onDragEnd: ({ movement: [mx] }) => {
      if (Math.abs(mx) > 130) {
        const dir = mx > 0 ? 1 : -1;
        api.start({
          x: dir * 800, onRest: () => {
            if (dir > 0) {
              setMatches(p => [...p, currentChair]);
              setSessionStats(p => ({ ...p, solid: p.solid + 1 }));
              confetti({ particleCount: 30, origin: { x: 0.5, y: 0.7 } });
            } else {
              setSessionStats(p => ({ ...p, wobbly: p.wobbly + 1 }));
            }
            setCurrentIndex(p => p + 1);
            api.start({ x: 0, y: 0, rot: 0, scale: 1, immediate: true });
            setAiResponse(null);
            setShowBio(false);
          }
        });
      } else {
        api.start({ x: 0, y: 0, rot: 0, scale: 1 });
      }
    }
  });

  if (currentIndex >= CHAIR_DATA.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
        <Sparkles className="text-orange-500 mb-4" size={48} />
        <h2 className="text-3xl font-black uppercase tracking-tighter">Deck Cleared</h2>
        <p className="text-slate-400 mt-2 italic">Matched with {matches.length} silhouettes.</p>
        <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-500">Session Vibe</p>
          <p className="text-xl font-black text-orange-500">{tasteIndex} / 10</p>
          <p className="text-xs text-slate-400">Chair Taste Index</p>
        </div>
        <button onClick={() => { setCurrentIndex(0); setSessionStats({ solid: 0, wobbly: 0 }); setMatches([]); }} className="mt-8 bg-orange-600 px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-orange-500 transition-all">
          Reset Showroom
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center font-sans overflow-hidden p-4">
      <div className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-md border-b border-white/5 p-3 flex justify-between items-center px-6 z-50">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-widest">
          <Shield size={12} /> <span>Dojo v0.1.0</span>
        </div>
        <div className="flex bg-black/50 px-3 py-1 rounded-full border border-white/10 gap-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Index: <span className="text-orange-500">{tasteIndex}</span>
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {currentIndex + 1} / {CHAIR_DATA.length}
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-sm h-[600px] mt-8">
        <animated.div {...bind()} className="absolute inset-0 bg-slate-800 rounded-[3rem] shadow-2xl overflow-hidden touch-none border border-white/10" style={{ x, y, rotate: rot, scale }}>
          <img src={currentChair.image} alt={currentChair.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

          <div className="absolute bottom-0 p-10 text-white w-full">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-1">{currentChair.name}, {currentChair.age}</h1>
                <p className="text-orange-500 font-bold text-[10px] uppercase flex items-center gap-1 tracking-widest">
                  <Briefcase size={12} /> {currentChair.model}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  <span className="text-[9px] bg-orange-600/20 text-orange-400 border border-orange-600/30 px-2 py-0.5 rounded uppercase font-bold tracking-tight">
                    {currentChair.market_archetype}
                  </span>
                  <span className="text-[9px] bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 px-2 py-0.5 rounded uppercase font-bold tracking-tight">
                    {currentChair.chain_meta?.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={handleWingChair} className="bg-orange-600 p-4 rounded-full shadow-lg hover:scale-110 active:scale-90 transition-all"><MessageCircle size={20} /></button>
                <button onClick={() => setShowBio(!showBio)} className="bg-white/10 p-4 rounded-full border border-white/10"><Info size={20} /></button>
              </div>
            </div>

            {!aiResponse && !showBio && (
              <div className="mb-4 text-xs font-medium text-slate-400 italic border-l-2 border-orange-500 pl-3">
                "{META_BLURBS[currentChair.market_archetype] || META_BLURBS["default"]}"
              </div>
            )}

            {aiResponse && <div className="bg-orange-600/95 backdrop-blur-sm p-4 rounded-3xl text-xs font-medium italic mb-4 animate-in slide-in-from-bottom-4 border border-white/10 shadow-2xl">"{aiResponse}"</div>}
            {aiLoading && <div className="text-[10px] font-black text-orange-500 animate-pulse mb-4 tracking-widest uppercase text-center">Consulting Chain...</div>}

            <div className={`overflow-hidden transition-all duration-300 ${showBio ? 'max-h-64' : 'max-h-0'}`}>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">"{currentChair.bio}"</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentChair.meme_tags?.map(t => <span key={t} className="text-[9px] text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase tracking-tighter">#{t}</span>)}
              </div>
              <div className="text-[10px] opacity-75 uppercase tracking-widest flex flex-col gap-1">
                <p className="flex items-center gap-1"><MapPin size={10} /> {currentChair.location}</p>
                <p className="flex items-center gap-1"><Sparkles size={10} /> {currentChair.vibe}</p>
              </div>
            </div>
          </div>
        </animated.div>
      </div>

      <div className="flex gap-12 mt-8">
        <button onClick={() => api.start({
          x: -800, onRest: () => {
            setSessionStats(p => ({ ...p, wobbly: p.wobbly + 1 }));
            setCurrentIndex(p => p + 1);
            setAiResponse(null);
          }
        })} className="w-16 h-16 rounded-full bg-slate-800 text-white/40 flex items-center justify-center border border-white/5 hover:text-red-500 transition-all">
          <X size={32} />
        </button>
        <button onClick={() => {
          setMatches(p => [...p, currentChair]);
          setSessionStats(p => ({ ...p, solid: p.solid + 1 }));
          confetti();
          api.start({
            x: 800, onRest: () => {
              setCurrentIndex(p => p + 1);
              setAiResponse(null);
            }
          });
        }} className="w-20 h-20 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all">
          <Heart size={32} fill="currentColor" />
        </button>
      </div>

      <div className="mt-6 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
        Sit or Swipe • $CUCKC
      </div>
    </div>
  );
};

export default App;