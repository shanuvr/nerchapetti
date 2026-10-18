/**
 * Cathedral Sacred Aura & Volumetric Sunbeams
 * Creates an authentic, majestic church atmosphere with:
 * 1. Radiant volumetric divine light rays streaming from the sacred Cross
 * 2. An ornate liturgical Gothic cruciform nimbus (sacred gold halo)
 * 3. Soft celestial breathing aura and sacred church glow
 */
export default function CathedralAura({ className = '' }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 
        Center the Divine Source at the Holy Altar Cross (x: 50%, y: 32%)
      */}
      <div className="absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] flex items-center justify-center pointer-events-none">
        
        {/* 1. Volumetric God Rays (Divine Sunbeams piercing through cathedral clerestory) */}
        <div
          className="absolute inset-0 rounded-full celestial-ray-spin opacity-40 mix-blend-screen transform-gpu will-change-transform"
          style={{
            background: `conic-gradient(
              from 0deg at 50% 50%,
              rgba(254, 240, 138, 0.35) 0deg,
              transparent 14deg,
              rgba(253, 224, 71, 0.22) 28deg,
              transparent 42deg,
              rgba(125, 211, 252, 0.30) 56deg,
              transparent 70deg,
              rgba(254, 240, 138, 0.38) 84deg,
              transparent 98deg,
              rgba(250, 204, 21, 0.24) 112deg,
              transparent 126deg,
              rgba(186, 230, 253, 0.32) 140deg,
              transparent 154deg,
              rgba(254, 240, 138, 0.40) 168deg,
              transparent 182deg,
              rgba(253, 224, 71, 0.22) 196deg,
              transparent 210deg,
              rgba(125, 211, 252, 0.28) 224deg,
              transparent 238deg,
              rgba(254, 240, 138, 0.36) 252deg,
              transparent 266deg,
              rgba(250, 204, 21, 0.26) 280deg,
              transparent 294deg,
              rgba(186, 230, 253, 0.30) 308deg,
              transparent 322deg,
              rgba(254, 240, 138, 0.35) 336deg,
              transparent 350deg,
              rgba(254, 240, 138, 0.35) 360deg
            )`,
            maskImage: 'radial-gradient(circle at center, black 0%, black 35%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, black 35%, transparent 70%)',
          }}
        />

        {/* 2. Soft Pulsing Holy Light Core */}
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-amber-200/40 via-white/50 to-sky-200/40 blur-2xl celestial-core-pulse pointer-events-none" />

        {/* 3. Ornate Gothic Cruciform Nimbus (Sacred Liturgical Halo) */}
        <svg
          viewBox="0 0 240 240"
          className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] sacred-nimbus-spin transform-gpu will-change-transform drop-shadow-[0_0_24px_rgba(250,204,21,0.6)] drop-shadow-[0_0_45px_rgba(56,189,248,0.4)] pointer-events-none"
          fill="none"
        >
          <defs>
            <linearGradient id="gold-leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#facc15" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#d97706" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="azure-liturgical" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.65" />
            </linearGradient>
          </defs>

          {/* Concentric Sacred Halos */}
          <circle cx="120" cy="120" r="114" stroke="url(#gold-leaf-grad)" strokeWidth="1.2" strokeOpacity="0.8" />
          <circle cx="120" cy="120" r="106" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.7" />
          <circle cx="120" cy="120" r="92" stroke="url(#azure-liturgical)" strokeWidth="1.5" strokeOpacity="0.75" />
          <circle cx="120" cy="120" r="76" stroke="url(#gold-leaf-grad)" strokeWidth="1.2" strokeDasharray="6 3" strokeOpacity="0.85" />

          {/* 4 Primary Cruciform Arms of the Cross */}
          {[0, 90, 180, 270].map((angle, i) => (
            <g key={`primary-${i}`} transform={`rotate(${angle} 120 120)`}>
              {/* Grand Ray with Gothic Trefoil Tip */}
              <line x1="120" y1="120" x2="120" y2="10" stroke="url(#gold-leaf-grad)" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M116 16 C112 12 114 6 120 6 C126 6 128 12 124 16 C128 18 127 24 120 22 C113 24 112 18 116 16 Z"
                fill="url(#gold-leaf-grad)"
              />
              <circle cx="120" cy="32" r="3.5" fill="#ffffff" />
            </g>
          ))}

          {/* 4 Diagonal Sacred Rays (Eight-pointed Star of Redemption) */}
          {[45, 135, 225, 315].map((angle, i) => (
            <g key={`diag-${i}`} transform={`rotate(${angle} 120 120)`}>
              <line x1="120" y1="120" x2="120" y2="28" stroke="url(#azure-liturgical)" strokeWidth="1.5" strokeDasharray="5 3" />
              <polygon points="120,24 123,30 120,36 117,30" fill="url(#gold-leaf-grad)" />
            </g>
          ))}

          {/* 8 Minor Interstitial Ray Flares */}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
            <g key={`minor-${i}`} transform={`rotate(${angle} 120 120)`}>
              <line x1="120" y1="120" x2="120" y2="48" stroke="#fef08a" strokeWidth="1" strokeOpacity="0.65" />
              <circle cx="120" cy="48" r="2" fill="#ffffff" fillOpacity="0.9" />
            </g>
          ))}

          {/* Central Gothic Quatrefoil Medallion */}
          <circle cx="120" cy="120" r="42" stroke="url(#gold-leaf-grad)" strokeWidth="1.5" fill="#0284c7" fillOpacity="0.12" />
          <circle cx="120" cy="120" r="24" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.85" />
          <circle cx="120" cy="120" r="8" fill="url(#gold-leaf-grad)" />
          <circle cx="120" cy="120" r="3.5" fill="#ffffff" />
        </svg>

      </div>
    </div>
  );
}
