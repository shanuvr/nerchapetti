/**
 * Ornate Gold & White Marble Church Offering Box (Nerchapetti / Hundi)
 * Features Gothic arch glass panels, illuminated interior cross, marble roof with coin slot,
 * and realistic golden drop-shadows & interactive drop glow.
 */
export default function NerchapettiBox({ className = '', slotGlow = false }) {
  return (
    <div className={`relative w-full aspect-square flex items-center justify-center select-none ${className}`}>
      {/* 1. Ambient Plinth Shadow */}
      <div className="absolute bottom-1 inset-x-4 h-7 bg-black/45 blur-xl rounded-full pointer-events-none" />

      {/* 2. Ornate Gold & Marble Church Hundi */}
      <img
        src="/hundi.webp"
        alt="നേർച്ചപ്പെട്ടി · Church Offering Box"
        className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_14px_30px_rgba(0,0,0,0.6)] pointer-events-none"
        draggable={false}
      />

      {/* 3. Dynamic Golden Slot Light Flare when offering enters */}
      {slotGlow && (
        <div className="absolute top-[26%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center">
          <div className="w-24 h-6 rounded-full bg-amber-300/90 blur-md animate-ping" />
          <div className="absolute w-14 h-3.5 rounded-full bg-white/95 blur-xs" />
        </div>
      )}
    </div>
  );
}
