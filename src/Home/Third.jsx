import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Church, Share2, Volume2, VolumeX, Maximize2, X, HeartHandshake } from 'lucide-react';

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

const BIBLE_VERSES = [
  {
    id: 1,
    ref: 'സുഭാഷിതങ്ങൾ 3:9-10',
    ml: 'നിന്റെ ധനംകൊണ്ടും നിന്റെ എല്ലാ വരുമാനത്തിന്റെ ആദ്യഫലംകൊണ്ടും യഹോവയെ ബഹുമാനിക്കുക; അപ്പോൾ നിന്റെ കളപ്പുരകൾ സമൃദ്ധിയായി നിറയും.',
  },
  {
    id: 2,
    ref: '2 കോറിന്തോസ് 9:7-8',
    ml: 'സന്തോഷത്തോടെ കൊടുക്കുന്നവനെ ദൈവം സ്നേഹിക്കുന്നു; നിങ്ങളുടെ എല്ലാ ആവശ്യങ്ങളിലും അവിടുത്തെ കൃപ സമൃദ്ധമായി നൽകാൻ ദൈവം ശക്തനാണ്.',
  },
  {
    id: 3,
    ref: 'ലൂക്കോസ് 6:38',
    ml: 'കൊടുക്കുവിൻ; എന്നാൽ നിങ്ങൾക്കും ലഭിക്കും; അമർത്തി കുലുക്കി കവിഞ്ഞൊഴുകുന്ന നല്ലൊരു അളവ് നിങ്ങളുടെ മടിയിൽ അളന്നു തരും.',
  },
  {
    id: 4,
    ref: 'മലാഖി 3:10',
    ml: 'എന്റെ ആലയത്തിൽ ആഹാരം ഉണ്ടാകേണ്ടതിന് ദശാംശമൊക്കെയും ഭണ്ഡാരത്തിലേക്ക് കൊണ്ടുവരുവിൻ; ഞാൻ ആകാശത്തിന്റെ കിളിവാതിലുകളെ തുറന്നു അനുഗ്രഹം ചൊരിഞ്ഞുതരുമോ എന്ന് എന്നെ പരീക്ഷിച്ചുനോക്കുവിൻ.',
  },
  {
    id: 5,
    ref: 'സങ്കീർത്തനങ്ങൾ 128:1-3',
    ml: 'യഹോവയെ ഭയപ്പെട്ട് അവന്റെ വഴികളിൽ നടക്കുന്ന ഏവനും ഭാഗ്യവാൻ. നിന്റെ കൈകളുടെ അധ്വാനഫലം നീ തിന്നും; നിന്റെ കുടുംബത്തിൽ കർത്താവിന്റെ അനുഗ്രഹം നിറയും.',
  },
  {
    id: 6,
    ref: 'സങ്കീർത്തനം 20:3-4',
    ml: 'അവിടുന്ന് നിന്റെ സമർപ്പണങ്ങളെല്ലാം ഓർത്തു നിന്റെ വഴിപാടുകളെ കൈക്കൊള്ളുമാറാകട്ടെ; നിന്റെ ഹൃദയത്തിലെ ആഗ്രഹങ്ങളെല്ലാം അവിടുന്ന് സാധിപ്പിച്ചുതരട്ടെ.',
  },
];

/**
 * Sanctuary Altar Blessing Card
 * Features continuous auto-scrolling scripture slogans.
 */
function SanctuaryAltarCard({ onExpand, churchName }) {
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = (e) => {
    e?.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center overflow-hidden rounded-2xl bg-slate-950 border border-sky-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.8)] backdrop-blur-md">
      {/* Top Header Row */}
      <div className="w-full z-30 flex items-center justify-between px-3.5 py-2 bg-slate-950/95 border-b border-sky-400/30 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
          </span>
          <span className="font-malayalam text-[11px] sm:text-xs font-bold text-sky-100 tracking-wide">
            വിശുദ്ധ ബൈബിൾ സന്ദേശങ്ങൾ
          </span>
        </div>

        {/* Top Sound Toggle Pill */}
        <button
          onClick={toggleSound}
          type="button"
          aria-label={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-semibold border transition-all cursor-pointer ${
            !isMuted
              ? 'bg-sky-500/25 border-sky-300 text-sky-100 shadow-[0_0_8px_rgba(56,189,248,0.4)]'
              : 'bg-slate-900/90 border-sky-400/40 text-slate-300 hover:text-sky-200'
          }`}
        >
          {!isMuted ? (
            <>
              <Volume2 className="w-2.5 h-2.5 text-sky-300" />
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

      {/* Main Sanctuary Visual: Continuous Upward Scrolling Slogans */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 flex flex-col select-none">
        {/* Divine Background Rays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.14)_0%,transparent_75%)] pointer-events-none" />

        {/* Top Gradient Fade Overlay */}
        <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-20" />

        {/* Bottom Gradient Fade Overlay */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pointer-events-none z-20" />

        {/* Continuous Upward Scrolling Slogans */}
        <div className="w-full flex flex-col items-center px-3 pt-6 pb-4 bible-news-crawl">
          {[...BIBLE_VERSES, ...BIBLE_VERSES].map((verse, i) => (
            <div
              key={`${verse.id}-${i}`}
              className="w-full flex flex-col items-center text-center my-3 transition-opacity duration-300"
            >
              {/* Reference Pill Badge */}
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/15 border border-amber-300/45 shadow-[0_2px_10px_rgba(245,195,88,0.15)] mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-malayalam text-[10.5px] font-bold text-amber-200">{verse.ref}</span>
              </div>

              {/* Malayalam Scripture Passage */}
              <p className="font-malayalam text-[12.5px] sm:text-[13.5px] text-white font-semibold leading-relaxed px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-[340px]">
                &ldquo;{verse.ml}&rdquo;
              </p>

              {/* Liturgical Golden Cross Divider */}
              <div className="flex items-center justify-center gap-2 mt-4 mb-2 text-amber-300/60 w-36">
                <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-300/60" />
                <span className="text-xs">✝</span>
                <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-300/60" />
              </div>
            </div>
          ))}
        </div>

        {/* Optional Expand Fullscreen Button */}
        {onExpand && (
          <div className="absolute bottom-2 right-2 z-30 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExpand({
                  title: 'വിശുദ്ധ തിരുവചന സൂക്തങ്ങൾ',
                  desc: 'നേർച്ച സമർപ്പണത്തിനും അനുഗ്രഹങ്ങൾക്കുമായുള്ള വിശുദ്ധ തിരുവചനങ്ങൾ.',
                  verses: BIBLE_VERSES,
                });
              }}
              type="button"
              aria-label="Expand Verses"
              className="p-1.5 rounded-full bg-slate-950/80 border border-sky-400/35 text-sky-200 hover:text-white backdrop-blur-md shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


/** Expanded Scripture Verses Modal */
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
        className="relative w-full max-w-[390px] max-h-[85vh] flex flex-col rounded-3xl overflow-hidden bg-slate-950 border border-sky-400/50 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.3)] p-4 text-center z-10"
      >
        <div className="flex items-center justify-between mb-2 shrink-0 border-b border-sky-400/20 pb-2">
          <div className="flex items-center gap-1.5 text-left">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <div>
              <p className="font-malayalam text-xs font-bold text-sky-100">{item.title}</p>
              <p className="text-[8.5px] text-sky-300/70 font-malayalam">{item.desc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-sky-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable list of all verses */}
        <div className="w-full flex-1 overflow-y-auto space-y-3 pr-1 py-1 text-left custom-scrollbar">
          {(item.verses || BIBLE_VERSES).map((verse) => (
            <div
              key={verse.id}
              className="p-3 rounded-2xl bg-slate-900/80 border border-sky-400/30 shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-malayalam text-[11px] font-bold text-amber-200">{verse.ref}</span>
                <span className="text-xs text-amber-300/60">✝</span>
              </div>
              <p className="font-malayalam text-[12px] text-sky-100 leading-relaxed">
                &ldquo;{verse.ml}&rdquo;
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white font-semibold font-malayalam text-xs cursor-pointer active:scale-95 transition-transform shrink-0"
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
          നിങ്ങളുടെ നേർച്ച സ്വീകരിക്കപ്പെട്ടു
        </p>
        <p className="relative mt-0.5 text-[9px] uppercase tracking-[0.3em] text-sky-400 font-semibold">
          Offering Received & Blessed
        </p>

        <div className="relative mt-3.5 font-cinzel font-bold text-3xl text-white tabular-nums drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          <span className="text-base opacity-60">₹</span>
          {amount}
        </div>
        <p className="relative mt-1 px-2 font-malayalam text-[11px] leading-snug text-blue-200/90">{churchName}</p>

        <div className="relative mt-3 rounded-xl bg-sky-500/25 border border-sky-300/45 px-3 py-2 backdrop-blur-md">
          <p className="text-[8.5px] uppercase tracking-[0.2em] text-sky-200 font-semibold">Receipt No.</p>
          <p className="text-[11px] font-bold tracking-wide text-white drop-shadow-sm">{receipt}</p>
          <p className="mt-0.5 text-[9px] text-sky-200/80">{formatStamp(paidAt)}</p>
        </div>

        <div className="relative mt-4 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onViewSanctuary}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-blue-600 text-white font-bold font-malayalam text-sm cursor-pointer shadow-[0_4px_16px_rgba(14,165,233,0.45)] border border-sky-200/60 transition-transform"
          >
            മദ്ബഹ ദർശനം കാണുക
          </motion.button>
          <button
            onClick={onReset}
            className="w-full py-2.5 rounded-xl bg-sky-500/20 border border-sky-300/40 text-white font-malayalam font-bold text-xs sm:text-[13px] cursor-pointer transition-colors hover:bg-sky-500/35 active:scale-95 shadow-sm"
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
          കർത്താവ് നിങ്ങളെ സമൃദ്ധമായി അനുഗ്രഹിക്കട്ടെ
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
