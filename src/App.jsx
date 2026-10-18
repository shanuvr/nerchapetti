import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import First from './Home/First';
import Second from './Home/Second';
import Third from './Home/Third';
import RoseWindow from './components/RoseWindow';
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
    <main className="h-[100dvh] max-h-[100dvh] sm:h-screen sm:min-h-screen w-full flex flex-col items-center justify-center p-0 sm:p-2 md:p-3 relative selection:bg-blue-500 selection:text-white overflow-hidden bg-slate-950 sm:bg-slate-900">
      {/* Background ambient lighting on desktop viewport */}
      <div className="hidden sm:block fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block fixed bottom-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Kiosk Container */}
      <div className="relative w-full sm:max-w-[400px] mx-auto h-[100dvh] max-h-[100dvh] sm:h-[min(844px,96vh)] sm:max-h-[860px] flex flex-col justify-between items-center overflow-hidden rounded-none sm:rounded-[32px] border-0 sm:border sm:border-blue-400/30 shadow-none sm:shadow-[0_15px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(37,99,235,0.25)] bg-slate-950 z-10">
        
        {/* 1. Deep Midnight Cathedral Blue Background with Radial Aura */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#020617] via-[#0b1329] to-[#030712] z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.22)_0%,transparent_60%)]" />
        </div>

        {/* 2. Persistent Gothic Cathedral Rose Window (Slow Majestic Spin) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center sanctuary-aura z-0">
          <RoseWindow className="w-[430px] h-[430px] sm:w-[530px] sm:h-[530px] opacity-40 drop-shadow-[0_0_35px_rgba(56,189,248,0.3)]" />
        </div>

        {/* 3. Floating Celestial Starlight Particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-200 select-none pointer-events-none starlight-particle transform-gpu"
              style={{
                top: `${12 + i * 11}%`,
                left: `${8 + ((i * 17) % 84)}%`,
                '--dur': `${3.5 + i * 0.6}s`,
                '--del': `${i * 0.35}s`,
              }}
            >
              <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-sky-200" fill="currentColor">
                <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" opacity="0.75" />
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
