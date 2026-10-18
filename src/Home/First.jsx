import { useEffect } from 'react';
import { motion } from 'framer-motion';
import CrossAura from '../components/CrossAura';
import AltarCandle from '../components/AltarCandle';
import { MONEY } from '../data/money';
import { playChurchBell } from '../utils/audio';

export const FIRST_SCREEN_DURATION = 3600;

export default function First({
  churchName = "സെന്റ് മേരീസ് കത്തീഡ്രൽ",
  churchNameEn = "St. Mary's Metropolitan Cathedral",
  onComplete,
}) {
  useEffect(() => {
    const timer = setTimeout(onComplete, FIRST_SCREEN_DURATION);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Preload screen 2 assets silently in background
  useEffect(() => {
    const preloadAssets = () => {
      const urls = Object.values(MONEY).map((m) => m.src);
      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(preloadAssets, { timeout: 1500 });
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(preloadAssets, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDevotionalTap = () => {
    playChurchBell();
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleDevotionalTap}
      className="relative w-full h-full flex flex-col justify-between items-center p-3.5 sm:p-5 text-center cursor-pointer select-none overflow-hidden transform-gpu will-change-transform"
    >
      {/* Dark contrast scrim to ensure crisp text readability against bright background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/45 to-slate-950/75 pointer-events-none -z-10" />

      {/* 1. Cathedral Header Badge */}
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex flex-col items-center z-10 pt-0.5 shrink-0"
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/75 border border-sky-400/40 shadow-[0_4px_24px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          <p className="font-malayalam text-xs sm:text-[13px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {churchName}
          </p>
        </div>
        <p className="text-[9.5px] uppercase tracking-[0.22em] text-sky-200 font-semibold mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
          {churchNameEn}
        </p>
      </motion.div>

      {/* 2. Center Sacred Sanctuary: Altar with Luminous Cross and Twin Candles */}
      <div className="flex flex-col items-center justify-center flex-1 min-h-0 z-10 py-1 sm:py-2 w-full">
        {/* Sacred Altar Assembly */}
        <div className="relative flex flex-col items-center mb-2 sm:mb-3">
          {/* Ethereal Cathedral Halo */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-sky-500/30 via-sky-400/20 to-amber-300/20 blur-2xl pointer-events-none transform-gpu"
          />

          {/* Central Medallion seating the Luminous Cross */}
          <div className="relative flex items-center justify-center">
            {/* Left Altar Candle */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="absolute -left-12 sm:-left-16 bottom-2 z-10"
            >
              <AltarCandle height={68} />
            </motion.div>

            {/* Glowing Cross */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.05 }}
              className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center z-20"
            >
              <CrossAura className="w-full h-full drop-shadow-[0_0_30px_rgba(56,189,248,0.75)]" />
            </motion.div>

            {/* Right Altar Candle */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="absolute -right-12 sm:-right-16 bottom-2 z-10"
            >
              <AltarCandle height={68} />
            </motion.div>
          </div>

          {/* Altar Marble Pedestal */}
          <div className="relative w-44 sm:w-52 h-4 rounded-full bg-gradient-to-r from-transparent via-sky-200/40 to-transparent blur-[1px] mt-1" />
        </div>

        {/* Biblical Verse Badge (2 Corinthians 9:7) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-950/75 border border-amber-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md mb-2 sm:mb-3"
        >
          <p className="font-malayalam text-[11px] sm:text-xs font-semibold text-amber-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            &ldquo;സന്തോഷത്തോടെ കൊടുക്കുന്നവനെ ദൈവം സ്നേഹിക്കുന്നു&rdquo;
          </p>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.45 }}
          className="relative mb-2 sm:mb-3 flex flex-col items-center"
        >
          {/* Ambient soft dark backing for crystal-clear title legibility */}
          <div className="absolute inset-0 -inset-x-6 bg-slate-950/50 rounded-full blur-xl pointer-events-none" />
          <div className="relative flex items-center justify-center gap-2.5">
            <span className="h-[1.5px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-amber-300" />
            <h1 className="text-2xl sm:text-3xl font-malayalam font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95),0_1px_3px_rgba(0,0,0,1)] tracking-wide">
              നേർച്ചപ്പെട്ടി
            </h1>
            <span className="h-[1.5px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-amber-300" />
          </div>
        </motion.div>

        {/* Devotional Plaque */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          className="relative px-4 py-3 sm:px-5 sm:py-3.5 max-w-[340px] w-full rounded-2xl bg-gradient-to-b from-slate-900/90 via-sky-950/85 to-slate-950/90 backdrop-blur-md border border-sky-400/40 shadow-[0_12px_36px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.25)]"
        >
          <span className="pointer-events-none absolute inset-1 rounded-xl border border-sky-200/20" />
          <h2 className="relative font-malayalam text-xs sm:text-[13px] font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] leading-relaxed">
            &ldquo;കർത്താവിന്റെ ആലയത്തിലേക്കുള്ള നിങ്ങളുടെ സ്നേഹ സമർപ്പണം&rdquo;
          </h2>

          <div className="relative mt-2 flex justify-center">
            <motion.span
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="px-4 py-1 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 border border-sky-300/80 text-white font-malayalam text-[11px] font-bold shadow-[0_2px_14px_rgba(2,132,199,0.5)]"
            >
              പ്രാർത്ഥനാപൂർവ്വം സമർപ്പിക്കുക
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* 3. Progress Countdown & Church Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.35 }}
        className="w-full z-20 flex flex-col items-center gap-1.5 sm:gap-2 pb-1 shrink-0"
      >
        <div className="w-full max-w-[190px] h-[3px] rounded-full bg-sky-400/35 overflow-hidden relative">
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-sky-500 via-sky-300 to-white shadow-[0_0_12px_rgba(56,189,248,0.9)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ transformOrigin: 'left center' }}
            transition={{ duration: FIRST_SCREEN_DURATION / 1000, ease: 'linear' }}
          />
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/75 border border-sky-400/40 backdrop-blur-md shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
          <span className="font-malayalam text-[11px] text-white font-bold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">നേർച്ച സമർപ്പണം</span>
          <span className="text-sky-300 font-bold">&middot;</span>
          <span className="text-[10px] tracking-wider text-sky-100 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Nerchapetti by Programmers</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
