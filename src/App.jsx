import React, { useState, useRef } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import confetti from 'canvas-confetti';
import { Heart, X, Info, RotateCcw, MapPin, Briefcase, Sparkles, Sun } from 'lucide-react';

const CHAIR_DATA = [ /* same expanded array from previous message - 8 chairs with real image URLs where possible */ ];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [showBio, setShowBio] = useState(false);

  const currentChair = CHAIR_DATA[currentIndex] || {};
  const nextChair = CHAIR_DATA[currentIndex + 1];
  const audioCtx = useRef(new (window.AudioContext || window.webkitAudioContext)());

  const playSound = (type) => {
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    if (type === 'whoosh') {
      osc.frequency.setValueAtTime(300, audioCtx.current.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.current.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, audioCtx.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.3);
    } else if (type === 'ding') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.current.currentTime);
      osc.frequency.setValueAtTime(1000, audioCtx.current.currentTime + 0.05);
      gain.gain.setValueAtTime(0.4, audioCtx.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.4);
    }
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.4);
  };

  const [{ x, y, rot, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    config: config.wobbly,
  }));

  const bind = useGesture(
    {
      onDragStart: () => playSound('whoosh'),
      onDrag: ({ movement: [mx, my], velocity: [vx, vy], direction: [dx], down, offset: [ox, oy] }) => {
        const velocity = Math.hypot(vx, vy);
        const rotation = (mx / 200) * 30;
        api.start({
          x: mx,
          y: my,
          rot: rotation,
          scale: 1 + velocity * 0.05,
          immediate: down,
        });
      },
      onDragEnd: ({ movement: [mx], velocity: [vx], direction: [dx] }) => {
        const triggerThreshold = 150;
        const flyVelocity = Math.hypot(vx, 0) * 500;
        if (Math.abs(mx) > triggerThreshold || flyVelocity > 400) {
          const dir = mx > 0 ? 1 : -1;
          api.start({
            x: mx + dir * 1000,
            rot: (mx / 200) * 60,
            scale: 1.1,
            config: { ...config.default, velocity: flyVelocity * dir },
            onRest: () => {
              if (dir > 0) {
                setMatches(prev => [...prev, currentChair]);
                confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
                playSound('ding');
              }
              setCurrentIndex(prev => prev + 1);
              api.start({ x: 0, y: 0, rot: 0, scale: 1, immediate: true });
            },
          });
        } else {
          api.start({ x: 0, y: 0, rot: 0, scale: 1 });
        }
      },
    },
    { drag: { filterTaps: true } }
  );

  const reset = () => {
    setCurrentIndex(0);
    setMatches([]);
  };

  if (currentIndex >= CHAIR_DATA.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-orange-50 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center">
          <Sun size={48} className="mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-2">Out of Seats, bru!</h2>
          <p className="text-slate-500 mb-6">Matched with {matches.length} legends 🇿🇦🪑</p>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {matches.map(m => (
              <div key={m.id} className="w-16 h-16 rounded-full overflow-hidden border-4 border-orange-400 shadow-md">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <button onClick={reset} className="flex items-center justify-center gap-2 w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700">
            <RotateCcw size={18} /> Restart the Jol
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-orange-100 p-4 overflow-hidden">
      {/* Preview stack */}
      <div className="relative w-full max-w-[420px] h-[680px]">
        {nextChair && (
          <animated.div
            className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden scale-95 opacity-70 translate-y-4 z-0"
            style={{ transform: 'translateY(20px) scale(0.92)' }}
          >
            <img src={nextChair.image} alt="next" className="w-full h-full object-cover" />
          </animated.div>
        )}
        {/* Main card */}
        <animated.div
          {...bind()}
          className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden touch-none select-none z-10"
          style={{ x, y, rotate: rot, scale }}
        >
          <img src={currentChair.image} alt={currentChair.name} className="w-full h-full object-cover pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex justify-between items-end mb-3">
              <div>
                <h1 className="text-4xl font-bold drop-shadow-lg">{currentChair.name}, {currentChair.age}</h1>
                <p className="text-xl opacity-90 flex items-center gap-2">
                  <Briefcase size={20} /> {currentChair.model}
                </p>
              </div>
              <button onClick={() => setShowBio(!showBio)} className="bg-white/30 backdrop-blur-lg p-3 rounded-full hover:bg-white/50">
                <Info size={28} />
              </button>
            </div>

            <div className={`transition-all duration-500 ${showBio ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <p className="text-base italic mb-4">"{currentChair.bio}"</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentChair.hobbies.map(h => (
                  <span key={h} className="text-sm bg-white/20 px-3 py-1 rounded-full">{h}</span>
                ))}
              </div>
              <div className="text-sm opacity-90 space-y-1">
                <p className="flex items-center gap-2"><MapPin size={16} /> {currentChair.location}</p>
                <p className="flex items-center gap-2"><Sparkles size={16} /> Vibe: {currentChair.vibe}</p>
              </div>
            </div>
          </div>
        </animated.div>
      </div>

      <div className="flex gap-8 mt-10">
        <button onClick={() => api.start({ x: -500, rot: -30, onRest: () => setCurrentIndex(prev => prev + 1) })} className="w-20 h-20 rounded-full bg-white shadow-2xl text-red-600 hover:scale-110">
          <X size={40} />
        </button>
        <button onClick={() => api.start({ x: 500, rot: 30, onRest: () => { setMatches(p => [...p, currentChair]); confetti(); playSound('ding'); setCurrentIndex(p => p + 1); } })} className="w-20 h-20 rounded-full bg-white shadow-2xl text-green-600 hover:scale-110">
          <Heart size={40} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default App;
