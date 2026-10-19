/**
 * Ornate Gold & White Marble Church Offering Box (Nerchapetti / Hundi)
 * Features Gothic arch glass panels, illuminated interior cross, marble roof with coin slot,
 * and realistic golden drop-shadows & interactive drop glow.
 */
export default function NerchapettiBox({ className = '', slotGlow = false }) {
  return (
    <div className={`relative w-full flex flex-col items-center justify-center select-none ${className}`}>
      {/* 1. Ambient Plinth Shadow */}
      <div className="absolute inset-x-3 bottom-1 h-5 rounded-[50%] bg-sky-500/30 blur-lg pointer-events-none" />

      {/* 2. Ornate Gold & Marble Church Hundi */}
      <img
        src="/hundi.webp"
        alt="നേർച്ചപ്പെട്ടി · Church Offering Box"
        className="relative w-full max-h-[22vh] sm:max-h-[135px] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] brightness-110 select-none pointer-events-none"
        draggable={false}
      />

      {/* 3. Dynamic Golden Slot Light Flare when offering enters */}
      {slotGlow && (
        <div className="absolute top-[26%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center">
          <div className="w-20 h-5 rounded-full bg-amber-300/90 blur-md animate-ping" />
          <div className="absolute w-12 h-3 rounded-full bg-white/95 blur-xs" />
        </div>
      )}
    </div>
  );
}
