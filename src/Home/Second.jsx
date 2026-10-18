import { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { ArrowLeft, Bell, Loader2, Info, X, Phone, MessageCircle, Mail, MapPin, Clock, Church } from 'lucide-react';
import Money from '../components/Money';
import Label from '../components/Label';
import NerchapettiBox from '../components/NerchapettiBox';
import { moneyKind } from '../data/money';
import { playChurchBell, playCoinDrop, playNoteDrop } from '../utils/audio';
import { celebrateOffering } from '../utils/confetti';

const COINS = [1, 2, 5, 10, 20];
const NOTES = [50, 100, 200, 500];

let flightId = 0;

const triggerHaptic = (pattern = 40) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // ignore on unsupported devices
    }
  }
};

/** Church Parish Information Modal */
function ParishInfoModal({ onClose, churchName = "St. Mary's Metropolitan Cathedral" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-[100] flex items-center justify-center p-4 transform-gpu"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-[6px]"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 18 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 12 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28, mass: 0.75 }}
        className="relative w-full max-w-[320px] rounded-3xl p-5 bg-gradient-to-b from-slate-900/95 via-sky-950/90 to-slate-950/98 border border-sky-300/50 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(14,165,233,0.3)] transform-gpu will-change-transform"
      >
        {/* Ambient Top Glow */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-16 -translate-y-1/2 rounded-full bg-sky-400/35 blur-2xl pointer-events-none" />

        {/* Close Icon */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-sky-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Parish Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/35 to-blue-600/30 border border-sky-300/50 flex items-center justify-center text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.4)] mb-2">
            <Church className="w-6 h-6 text-sky-300" />
          </div>
          <h3 className="font-cinzel text-sm sm:text-base font-bold text-white leading-tight">
            {churchName}
          </h3>
          <p className="font-malayalam text-xs text-blue-300/90 mt-0.5">സെന്റ് മേരീസ് കത്തീഡ്രൽ</p>
          <p className="text-[8.5px] uppercase tracking-[0.2em] text-slate-400 mt-0.5">
            Archdiocese of Changanacherry, Kerala
          </p>
        </div>

        {/* Info Rows */}
        <div className="mt-3.5 space-y-2 text-left">
          {/* Address */}
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-blue-400/15">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-[8.5px] uppercase tracking-[0.16em] text-blue-200/60 font-medium">Parish Address</p>
              <p className="text-[10px] text-slate-200 leading-tight mt-0.5">Cathedral Junction, Changanacherry, Kerala - 686101</p>
            </div>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-blue-400/15">
              <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-[0.16em] text-blue-200/60 font-medium">Parish Office</p>
                <p className="text-[9.5px] font-medium text-slate-200 truncate">+91 481 2420311</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-blue-400/15">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-[0.16em] text-blue-200/60 font-medium">WhatsApp</p>
                <p className="text-[9.5px] font-medium text-slate-200 truncate">+91 94471 00222</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-blue-400/15">
            <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[8px] uppercase tracking-[0.16em] text-blue-200/60 font-medium">Parish Email</p>
              <p className="text-[9.5px] font-medium text-slate-200 truncate">office@stmaryscathedral.org</p>
            </div>
          </div>

          {/* Holy Mass Timings */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-blue-400/15">
            <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[8px] uppercase tracking-[0.16em] text-blue-200/60 font-medium">വിശുദ്ധ കുർബാന / Holy Mass</p>
              <p className="text-[9px] text-slate-200 leading-tight">Daily: 06:00 AM, 05:30 PM · Sunday: 06:00 AM, 08:30 AM, 05:00 PM</p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-semibold font-malayalam text-xs cursor-pointer shadow-[0_4px_16px_rgba(37,99,235,0.4)] active:scale-95 transition-transform"
        >
          ശരി / Close
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Second({
  onBack,
  onNext,
  amount = 0,
  onAmountChange,
  churchName = "സെന്റ് മേരീസ് കത്തീഡ്രൽ",
}) {
  const [showInfo, setShowInfo] = useState(false);
  const boxRef = useRef(null);
  const lastGlowTimer = useRef(null);
  const submitTimer = useRef(null);
  const boxAnim = useAnimationControls();
  const [flights, setFlights] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [rung, setRung] = useState(0);
  const [slotGlow, setSlotGlow] = useState(false);
  const [paying, setPaying] = useState(false);

  const ringBell = useCallback(() => {
    playChurchBell();
    triggerHaptic(75);
    setRung((n) => n + 1);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(lastGlowTimer.current);
      clearTimeout(submitTimer.current);
    },
    []
  );

  /** Submit offering: spinner settles offering, triggers celestial shower & bell, then advances */
  const submitOffering = useCallback(() => {
    if (paying || amount <= 0) return;
    setPaying(true);
    triggerHaptic([30, 40, 60]);
    submitTimer.current = setTimeout(() => {
      celebrateOffering();
      playChurchBell();
      triggerHaptic([25, 30, 25, 30, 80]);
      onNext();
    }, 2000);
  }, [paying, amount, onNext]);

  const dropRipple = useCallback((id) => {
    setRipples((r) => r.filter((x) => x.id !== id));
  }, []);

  const placeOffering = useCallback(
    (value, event) => {
      const source = event.currentTarget.getBoundingClientRect();
      const nerchapetti = boxRef.current?.getBoundingClientRect();
      if (!nerchapetti) return;

      const isCoin = moneyKind(value) === 'coin';
      // Trajectory targets the top roof slot (26%) for coins, and front panel (62%) for notes
      const target = {
        x: nerchapetti.left + nerchapetti.width / 2,
        y: isCoin ? nerchapetti.top + nerchapetti.height * 0.26 : nerchapetti.top + nerchapetti.height * 0.62,
      };

      const id = ++flightId;
      setFlights((f) => [
        ...f,
        { id, value, isCoin, from: source, target, kind: isCoin ? 'coin' : 'note' },
      ]);

      onAmountChange((t) => t + value);
      triggerHaptic(isCoin ? 35 : 45);

      setSlotGlow(true);
      const glowTimer = setTimeout(() => setSlotGlow(false), 700);

      lastGlowTimer.current = glowTimer;
      boxAnim.start({ scale: [1, 1.04, 1], transition: { duration: 0.4, ease: 'easeOut' } });
    },
    [boxAnim, onAmountChange]
  );

  const endFlight = useCallback(
    (id) => {
      const flight = flights.find((f) => f.id === id);
      setFlights((f) => f.filter((x) => x.id !== id));
      if (flight) {
        setRipples((r) => [...r, { id: `${id}-r`, x: flight.target.x, y: flight.target.y }]);

        if (flight.isCoin) {
          playCoinDrop(flight.value);
          triggerHaptic([25, 35, 50]);
        } else {
          playNoteDrop();
          triggerHaptic([40, 30]);
        }
      }
    },
    [flights]
  );

  const overlay = createPortal(
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full border-2 border-sky-300 shadow-[0_0_14px_rgba(56,189,248,0.9)]"
            style={{ left: r.x, top: r.y, width: 26, height: 26, marginLeft: -13, marginTop: -13 }}
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => dropRipple(r.id)}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {flights.map((f) => {
          const dx = f.target.x - (f.from.left + f.from.width / 2);
          const dy = f.target.y - (f.from.top + f.from.height / 2);
          const lift = Math.min(110, Math.abs(dy) * 0.4 + 40);

          return (
            <motion.div
              key={f.id}
              className="absolute pointer-events-none"
              style={{ left: f.from.left, top: f.from.top, width: f.from.width }}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
              animate={{
                x: dx,
                y: [0, -lift, dy],
                scale: f.isCoin ? [1, 1.25, 1.15, 0.4, 0.08] : [1, 1.12, 1.05, 0.5, 0.18],
                rotate: f.isCoin ? [0, 90, 240, 480] : [0, -4, 4, 0],
                opacity: f.isCoin ? [1, 1, 1, 0.85, 0] : [1, 1, 1, 0.75, 0],
              }}
              transition={{
                duration: 0.88,
                ease: 'easeInOut',
                x: { duration: 0.88, ease: [0.25, 0.1, 0.25, 1] },
                y: { duration: 0.88, times: [0, 0.4, 1], ease: [0.25, 0.1, 0.35, 1] },
                scale: { duration: 0.88, times: [0, 0.25, 0.75, 0.92, 1] },
                rotate: { duration: 0.88, times: [0, 0.3, 0.75, 1], ease: 'easeInOut' },
                opacity: { duration: 0.88, times: [0, 0.5, 0.8, 0.94, 1] },
              }}
              onAnimationComplete={() => endFlight(f.id)}
            >
              <Money value={f.value} className="w-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)]" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative w-full h-full flex flex-col justify-between items-center p-3.5 sm:p-4 overflow-hidden"
    >
      {/* Gentle dark gradient from coins downwards so coins and notes are clearly visible against bright floor */}
      <div className="absolute inset-x-0 bottom-0 top-[45%] pointer-events-none bg-gradient-to-b from-transparent via-slate-950/45 to-slate-950/80 z-0" />

      {/* 1. Header Bar */}
      <div className="w-full flex items-center justify-between z-10 shrink-0 pt-0.5">
        <button
          onClick={onBack}
          disabled={paying}
          aria-label="Back"
          className={`p-2 rounded-full bg-sky-700/50 text-white border border-sky-400/50 backdrop-blur-md transition-colors ${
            paying ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-sky-700/65'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <motion.button
          onClick={() => setShowInfo(true)}
          whileTap={{ scale: 0.96 }}
          aria-label="View church details"
          className="flex-1 mx-2 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-2xl bg-sky-700/50 hover:bg-sky-700/65 border border-sky-400/50 backdrop-blur-md transition-all cursor-pointer text-center shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse shrink-0 self-center" />
          <span className="font-malayalam text-[11px] sm:text-[12px] text-white font-bold leading-tight text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            {churchName}
          </span>
          <Info className="w-3 h-3 text-sky-200 shrink-0 self-center ml-0.5" />
        </motion.button>

        {/* Cathedral Church Bell Button */}
        <motion.button
          onClick={ringBell}
          whileTap={{ scale: 0.85 }}
          aria-label="Ring cathedral bell"
          className="relative p-2 rounded-full bg-gradient-to-tr from-sky-700/60 to-sky-600/50 border border-sky-400/60 text-white hover:border-sky-300 transition-colors shadow-[0_2px_12px_rgba(3,105,161,0.35)] cursor-pointer"
        >
          <motion.span
            className="block"
            animate={rung ? { rotate: [-24, 24, -18, 18, -8, 8, 0] } : { rotate: 0 }}
            transition={{ duration: 0.95 }}
          >
            <Bell className="w-4 h-4" />
          </motion.span>
          {rung > 0 && (
            <motion.span
              key={rung}
              initial={{ scale: 0.6, opacity: 0.9 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-sky-300 pointer-events-none"
            />
          )}
        </motion.button>
      </div>

      {/* 2. Scripture Slogan */}
      <div className="relative z-10 w-full flex flex-col items-center pt-1 px-2 shrink-0">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-malayalam font-bold text-white text-center text-xs sm:text-[13px] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] max-w-[340px]"
        >
          നിങ്ങളുടെ നേർച്ചയും പ്രാർത്ഥനയും ദൈവസന്നിധിയിൽ സ്മരിക്കപ്പെട്ടിരിക്കുന്നു
        </motion.p>
      </div>

      {/* 3. Center Ornate Gold & Marble Church Offering Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className="relative z-30 my-auto w-48 sm:w-52 shrink-0"
      >
        <motion.div ref={boxRef} animate={boxAnim} className="relative">
          {/* Ornate Gold & Marble Church Offering Box */}
          <NerchapettiBox slotGlow={slotGlow} />
        </motion.div>
      </motion.div>

      {/* 4. Running Total Display */}
      <div className="relative z-10 w-full my-auto flex items-center justify-center gap-2.5 shrink-0">
        <span className="font-malayalam text-xs text-sky-100 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">ആകെ സമർപ്പണം</span>
        <div className="relative h-7 overflow-hidden min-w-[88px] px-3.5 flex items-center justify-center rounded-full bg-sky-700/50 border border-sky-400/60 backdrop-blur-md shadow-[0_4px_18px_rgba(3,105,161,0.4)]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={amount}
              initial={{ y: 22, opacity: 0, scale: 0.75 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -22, opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center gap-1 font-cinzel font-bold text-base text-white tabular-nums"
            >
              <span className="text-xs text-sky-200">₹</span>
              {amount}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* 5. Coins Section */}
      <div className="relative z-10 w-full mt-1 shrink-0 px-1">
        <Label className="font-malayalam text-sky-100 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] mb-1.5">നാണയങ്ങൾ · Coins</Label>
        <div className="grid grid-cols-5 gap-1.5 px-1">
          {COINS.map((value, i) => (
            <motion.button
              key={value}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.4, type: 'spring', stiffness: 260, damping: 18 }}
              whileTap={{ scale: 0.85 }}
              onClick={(e) => placeOffering(value, e)}
              disabled={paying}
              aria-label={`Offer ${value} rupee coin`}
              className={`mx-auto w-full max-w-[48px] focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-300 rounded-full transition-opacity ${
                paying ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <Money value={value} className="w-full h-auto drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)] hover:scale-105 active:scale-95 transition-transform" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* 6. Notes Section */}
      <div className="relative z-10 w-full mt-2 shrink-0 px-1">
        <Label className="font-malayalam text-sky-100 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] mb-1.5">നോട്ടുകൾ · Notes</Label>
        <div className="grid grid-cols-2 gap-2.5 px-0.5">
          {NOTES.map((value, i) => (
            <motion.button
              key={value}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.06, duration: 0.4 }}
              whileTap={{ scale: 0.94 }}
              onClick={(e) => placeOffering(value, e)}
              disabled={paying}
              aria-label={`Offer ${value} rupee note`}
              className={`mx-auto w-full max-w-[125px] flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-300 rounded-md transition-opacity ${
                paying ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <Money value={value} className="w-full h-auto drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)] hover:scale-[1.03] active:scale-95 transition-transform" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* 7. Offer Button */}
      <div className="relative z-10 w-full mt-auto pt-1 pb-1 sm:pb-0.5 shrink-0">
        <motion.button
          onClick={submitOffering}
          disabled={amount === 0 || paying}
          whileTap={amount === 0 || paying ? undefined : { scale: 0.97 }}
          className={`w-full py-2.5 px-6 rounded-2xl font-malayalam text-base border transition-all duration-300 flex items-center justify-center gap-2 ${
            paying
              ? 'bg-gradient-to-r from-sky-500/80 via-sky-400/80 to-blue-500/80 text-white font-bold border-sky-300/40 cursor-wait'
              : amount > 0
                ? 'bg-gradient-to-r from-sky-500 via-sky-400 to-blue-600 text-white font-bold shadow-[0_8px_25px_rgba(14,165,233,0.5)] border-sky-200/70 cursor-pointer'
                : 'bg-sky-500/20 text-sky-100/50 border-sky-300/25 cursor-not-allowed'
          }`}
        >
          {paying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>സമർപ്പിക്കുന്നു...</span>
            </>
          ) : (
            <span className={amount > 0 ? '' : 'opacity-70'}>സമർപ്പിക്കുക</span>
          )}
        </motion.button>

        {/* Status line */}
        <div className="h-4 mt-1 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {paying && (
              <motion.p
                key="paying"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[9.5px] uppercase tracking-[0.2em] text-blue-200/70 font-medium"
              >
                Completing your offering
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {overlay}

      {/* Parish Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <ParishInfoModal
            churchName={churchName}
            onClose={() => setShowInfo(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
