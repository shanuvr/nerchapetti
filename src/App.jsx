import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import First from './Home/First';
import Second from './Home/Second';
import Third from './Home/Third';
import CathedralAura from './components/CathedralAura';
import { preloadAssets } from './utils/preload';
import './App.css';

const STEPS = [
  { key: 'welcome', component: First },
  { key: 'nerchapetti', component: Second },
  { key: 'thanksgiving', component: Third },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    preloadAssets();
  }, []);

  const goNext = useCallback(
    () => setStep((s) => Math.min(STEPS.length - 1, s + 1)),
    []
  );
  const goBack = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);
  const goReset = useCallback(() => {
    setAmount(0);
    setStep(0);
  }, []);

  const Current = STEPS[step].component;

  return (
    <main className="h-[100dvh] max-h-[100dvh] sm:h-screen sm:min-h-screen w-full flex flex-col items-center justify-center p-0 sm:p-2 md:p-3 relative selection:bg-blue-500 selection:text-white overflow-hidden bg-slate-950 sm:bg-white">
      {/* Main Kiosk Container */}
      <div className="relative w-full sm:max-w-[400px] mx-auto h-[100dvh] max-h-[100dvh] sm:h-[min(844px,96vh)] sm:max-h-[860px] flex flex-col justify-between items-center overflow-hidden rounded-none sm:rounded-[32px] border-0 sm:border-2 sm:border-slate-800/80 shadow-none sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_10px_30px_rgba(0,0,0,0.15)] bg-slate-950 z-10">
        
        {/* 1. Cathedral Sanctuary Background Image (public/bg.jpg) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/bg.jpg"
            alt="Cathedral Sanctuary"
            className="w-full h-full object-cover object-center select-none"
          />
          {/* Soft atmospheric sky-tinted vignette to highlight radiant stained glass & altar */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-950/40 via-slate-950/25 to-sky-950/60 pointer-events-none" />
        </div>

        {/* 2. Sacred Cathedral Aura (Volumetric Divine Sunbeams & Liturgical Cross Halo) */}
        <CathedralAura />

        {/* 3. Floating Celestial Starlight Particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-amber-200/70 select-none pointer-events-none starlight-particle transform-gpu"
              style={{
                top: `${12 + i * 13}%`,
                left: `${8 + ((i * 17) % 84)}%`,
                '--dur': `${3.8 + i * 0.7}s`,
                '--del': `${i * 0.35}s`,
              }}
            >
              <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-100" fill="currentColor">
                <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" opacity="0.7" />
              </svg>
            </div>
          ))}
        </div>

        {/* 4. Screen Transition Layer */}
        <div className="relative w-full h-full z-10 flex flex-col">
          <AnimatePresence mode="wait">
            <Current
              key={STEPS[step].key}
              churchName="സെന്റ് മേരീസ് കത്തീഡ്രൽ"
              churchNameEn="St. Mary's Metropolitan Cathedral"
              amount={amount}
              onAmountChange={setAmount}
              onComplete={goNext}
              onNext={goNext}
              onBack={goBack}
              onReset={goReset}
            />
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
