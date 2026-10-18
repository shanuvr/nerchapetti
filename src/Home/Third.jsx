import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Church, Share2, Volume2, VolumeX, Maximize2, X, Play, HeartHandshake } from 'lucide-react';
import CrossAura from '../components/CrossAura';
import AltarCandle from '../components/AltarCandle';

/* Church collection UPI handle */
const CHURCH_UPI_ID = 'stmaryscathedral@upi';

const makeReceipt = () =>
  `NP-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.random()
    .toString(36)
    .slice(2, 5)
    .toUpperCase()}`;

const formatStamp = (d) =>
  d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

/**
 * Sanctuary Altar Blessing Card
 * Provides an inspiring altar visual with sound toggle and video expansion support.
 * (Ready for future video file/stream insertion as planned)
 */
function SanctuaryAltarCard({ onExpand, churchName }) {
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = (e) => {
    e?.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center overflow-hidden rounded-2xl bg-slate-950 border border-blue-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.8)] backdrop-blur-md">
      {/* Top Header Row */}
      <div className="w-full z-30 flex items-center justify-between px-3 py-1.5 bg-slate-950/95 border-b border-blue-400/30 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
          </span>
          <span className="font-malayalam text-[10.5px] sm:text-[11.5px] font-bold text-blue-100 tracking-wide">
            വിശുദ്ധ മദ്ബഹ ദർശനം
          </span>
          <span className="text-[8px] uppercase tracking-wider text-blue-300/80 font-medium">
            · Holy Sanctuary
          </span>
        </div>

        {/* Top Sound Toggle Pill */}
        <button
          onClick={toggleSound}
          type="button"
          aria-label={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-semibold border transition-all cursor-pointer ${
            !isMuted
              ? 'bg-blue-500/25 border-blue-300 text-blue-200 shadow-[0_0_8px_rgba(59,130,246,0.4)]'
              : 'bg-slate-900/90 border-blue-400/40 text-slate-300 hover:text-blue-200'
          }`}
        >
          {!isMuted ? (
            <>
              <Volume2 className="w-2.5 h-2.5 text-blue-300" />
              <span>Sound ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-2.5 h-2.5 text-slate-400" />
              <span>Sound OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Main Sanctuary Altar Visual (Luminous Altar Art & Atmosphere) */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950/80 to-slate-950 flex flex-col items-center justify-center p-4">
        {/* Divine Background Rays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2)_0%,transparent_70%)] pointer-events-none" />

        {/* Altar Presentation */}
        <div className="relative flex items-center justify-center gap-3">
          <AltarCandle height={54} />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
            <CrossAura className="w-full h-full drop-shadow-[0_0_24px_rgba(56,189,248,0.7)]" />
          </div>
          <AltarCandle height={54} />
        </div>

        <p className="relative font-malayalam text-[11px] font-semibold text-blue-100 text-center mt-2 drop-shadow-sm">
          &ldquo;കർത്താവിന്റെ അനുഗ്രഹം നിങ്ങളുടെ കുടുംബത്തിൽ നിറയട്ടെ&rdquo;
        </p>

        {/* Bottom Floating Bar */}
        <div className="absolute bottom-2 inset-x-2 z-30 flex items-center justify-between">
          <button
            onClick={toggleSound}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-blue-400/50 text-blue-200 text-[10px] font-malayalam font-semibold backdrop-blur-md shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-blue-300" />
                <span>സ്തോത്രഗീതം ഓൺ</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-blue-300" />
                <span>സ്തോത്രഗീതം ഓഫ്</span>
              </>
            )}
          </button>

          {onExpand && (
            <button
              onClick={() =>
                onExpand({
                  title: 'സെന്റ് മേരീസ് കത്തീഡ്രൽ മദ്ബഹ · Holy Sanctuary',
                  desc: 'Blessed sanctuary altar view and thanksgiving prayer offering.',
                  initialMuted: isMuted,
                })
              }
              type="button"
              aria-label="Expand Sanctuary View"
              className="p-1.5 rounded-full bg-slate-950/80 border border-blue-400/50 text-blue-200 hover:text-white backdrop-blur-md shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Expanded Sanctuary Modal */
function SanctuaryModal({ item, onClose }) {
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3.5 bg-black/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-[380px] flex flex-col rounded-3xl overflow-hidden bg-slate-950 border border-blue-400/50 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(37,99,235,0.3)] p-4 text-center z-10"
      >
        <div className="flex items-center justify-between mb-2 shrink-0">
          <span className="font-cinzel text-xs font-bold text-blue-200 tracking-wider">Sanctuary Darshan</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-blue-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full min-h-[220px] rounded-2xl overflow-hidden border border-blue-400/30 bg-gradient-to-b from-slate-900 to-blue-950 flex flex-col items-center justify-center p-5 mb-3">
          <CrossAura className="w-24 h-24 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)] mb-2" />
          <p className="font-malayalam text-sm font-bold text-white mb-1">{item.title}</p>
          <p className="text-xs text-slate-300">{item.desc}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white font-semibold font-malayalam text-xs cursor-pointer active:scale-95 transition-transform"
        >
          ശരി / Close
        </button>
      </motion.div>
    </motion.div>
  );
}

/** Success Dialog Popup */
function SuccessDialog({ amount, churchName, receipt, paidAt, onViewSanctuary, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute inset-0 z-[100] flex items-center justify-center p-4 transform-gpu"
      role="dialog"
      aria-modal="true"
      aria-label="Offering received successfully"
    >
      <div
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-[6px] transition-opacity"
        onClick={onViewSanctuary}
      />

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 22 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 15 }}
        transition={{
          type: 'spring',
          stiffness: 340,
          damping: 28,
          mass: 0.75,
          delay: 0.05,
        }}
        className="relative w-full max-w-[290px] rounded-3xl px-6 pb-5 pt-7 text-center bg-gradient-to-b from-slate-900/98 via-slate-900/95 to-slate-950/98 border border-blue-400/50 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(37,99,235,0.3)] transform-gpu will-change-transform"
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-36 h-20 -translate-y-1/2 rounded-full bg-blue-400/25 blur-2xl pointer-events-none" />

        {/* Animated Checkmark Circle */}
        <div className="relative mx-auto w-[74px] h-[74px] mb-3">
          <motion.span
            className="absolute inset-0 rounded-full border border-sky-300/60 pointer-events-none"
            initial={{ scale: 0.7, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          />
          <svg viewBox="0 0 52 52" className="w-full h-full transform-gpu" fill="none">
            <circle cx="26" cy="26" r="24" fill="rgba(56,189,248,0.15)" stroke="#1d4ed8" strokeWidth="1.5" />
            <motion.circle
              cx="26"
              cy="26"
              r="24"
              stroke="#93c5fd"
              strokeWidth="2.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            />
            <motion.path
              d="M15.5 27.5l7.5 7.5 14-15.5"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, delay: 0.35, ease: 'easeOut' }}
            />
          </svg>
        </div>

        <p className="relative font-malayalam text-lg text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          സ്തോത്രക്കാഴ്ച സ്വീകരിക്കപ്പെട്ടു
        </p>
        <p className="relative mt-0.5 text-[9px] uppercase tracking-[0.3em] text-sky-400 font-semibold">
          Offering Received & Blessed
        </p>

        <div className="relative mt-3.5 font-cinzel font-bold text-3xl text-white tabular-nums drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          <span className="text-base opacity-60">₹</span>
          {amount}
        </div>
        <p className="relative mt-1 px-2 font-malayalam text-[11px] leading-snug text-blue-200/90">{churchName}</p>

        <div className="relative mt-3 rounded-xl bg-slate-950/60 border border-blue-400/25 px-3 py-2">
          <p className="text-[8.5px] uppercase tracking-[0.2em] text-blue-200/60 font-medium">Receipt No.</p>
          <p className="text-[11px] font-semibold tracking-wide text-white">{receipt}</p>
          <p className="mt-0.5 text-[9px] text-blue-200/60">{formatStamp(paidAt)}</p>
        </div>

        <div className="relative mt-4 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onViewSanctuary}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white font-semibold font-malayalam text-sm cursor-pointer shadow-[0_4px_16px_rgba(37,99,235,0.4)] transition-transform"
          >
            മദ്ബഹ ദർശനം കാണുക
          </motion.button>
          <button
            onClick={onReset}
            className="w-full py-2.5 rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-200 font-malayalam font-semibold text-xs sm:text-[13px] cursor-pointer transition-colors hover:bg-blue-500/20 active:scale-95"
          >
            മറ്റൊരു സമർപ്പണം
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Third({
  onBack,
  onReset,
  amount = 0,
  churchName = "സെന്റ് മേരീസ് കത്തീഡ്രൽ",
}) {
  const [receipt] = useState(makeReceipt);
  const [paidAt] = useState(() => new Date());
  const [showDone, setShowDone] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowDone(false);
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const share = async () => {
    const text = `I offered ₹${amount} at ${churchName} through Nerchapetti. Receipt ${receipt}. God bless you!`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Nerchapetti Church Offering', text });
        return;
      }
      await navigator.clipboard.writeText(text);
    } catch {
      // User cancelled
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="relative w-full h-full flex flex-col justify-between items-center p-3.5 sm:p-5 overflow-hidden gap-1.5 sm:gap-2.5 transform-gpu"
    >
      {/* 1. Header */}
      <div className="w-full flex items-center justify-between z-10 shrink-0 pt-0.5">
        <button
          onClick={onBack}
          aria-label="Back"
          className="p-1.5 sm:p-2 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/30 backdrop-blur-md cursor-pointer transition-colors hover:bg-blue-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-[10px] uppercase tracking-[0.3em] text-blue-200 font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          Thanksgiving
        </span>
        <div className="w-8 sm:w-9 flex justify-center">
          <Church className="w-4 h-4 text-sky-400" />
        </div>
      </div>

      {/* 2. Blessing Verse */}
      <div className="relative z-10 w-full flex flex-col items-center px-1 shrink-0">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-malayalam font-medium text-center text-xs sm:text-[13.5px] leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-[320px]"
        >
          നിന്റെ സമർപ്പണം കർത്താവ് അനുഗ്രഹിക്കട്ടെ
        </motion.p>
      </div>

      {/* 3. Sanctuary Altar Blessing Card */}
      <div className="relative z-10 w-full flex-1 min-h-[180px] sm:min-h-[220px] flex flex-col py-1 overflow-hidden">
        <SanctuaryAltarCard onExpand={setActiveModal} churchName={churchName} />
      </div>

      {/* 4. Receipt Breakdown Card */}
      <div className="relative z-10 w-full shrink-0">
        <div className="w-full overflow-hidden rounded-2xl bg-slate-950/60 border border-blue-400/30 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2.5 px-3.5 py-2 border-b border-blue-400/15">
            <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-700/20 border border-blue-400/30 flex items-center justify-center">
              <HeartHandshake className="w-3.5 h-3.5 text-blue-200" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[10.5px] font-semibold text-white">{churchName}</p>
              <p className="text-[8px] uppercase tracking-[0.2em] text-blue-300/60">Nerchapetti · Digital Offering</p>
            </div>
          </div>

          <div className="flex items-center justify-between px-3.5 py-1.5">
            <span className="text-[9.5px] uppercase tracking-[0.2em] text-blue-200/70 font-medium">Total Offering</span>
            <span className="font-cinzel font-bold text-xl sm:text-2xl text-white tabular-nums">
              <span className="text-sm opacity-60">₹</span>
              {amount}
            </span>
          </div>

          <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/40 border-t border-blue-400/15">
            <span className="text-[8.5px] uppercase tracking-[0.2em] text-blue-200/60">Paid to</span>
            <span className="truncate text-[10px] font-medium text-blue-100">{CHURCH_UPI_ID}</span>
          </div>

          <div className="flex items-center justify-between gap-2 px-3.5 py-1.5 bg-slate-900/40 border-t border-blue-400/15">
            <span className="text-[8.5px] uppercase tracking-[0.2em] text-blue-200/60">Receipt</span>
            <span className="truncate text-[10px] font-medium tracking-wide text-blue-100">
              {receipt} · {formatStamp(paidAt)}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Bottom Actions */}
      <div className="relative z-10 w-full shrink-0 flex items-center gap-2 pt-0.5">
        <motion.button
          onClick={onReset}
          whileTap={{ scale: 0.97 }}
          className="flex-1 py-2.5 sm:py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white font-semibold font-malayalam text-sm sm:text-base border border-sky-300/40 shadow-[0_6px_20px_rgba(37,99,235,0.4)] cursor-pointer"
        >
          മറ്റൊരു സമർപ്പണം
        </motion.button>
        <motion.button
          onClick={share}
          whileTap={{ scale: 0.92 }}
          aria-label="Share offering blessing"
          className="w-[44px] shrink-0 py-2.5 sm:py-3 rounded-2xl bg-blue-500/10 text-blue-300 border border-blue-400/30 backdrop-blur-md hover:bg-blue-500/20 transition-colors flex items-center justify-center cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Success Dialog Modal */}
      <AnimatePresence>
        {showDone && (
          <SuccessDialog
            amount={amount}
            churchName={churchName}
            receipt={receipt}
            paidAt={paidAt}
            onViewSanctuary={() => setShowDone(false)}
            onReset={onReset}
          />
        )}
      </AnimatePresence>

      {/* Expanded Sanctuary Modal */}
      <AnimatePresence>
        {activeModal && (
          <SanctuaryModal item={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
