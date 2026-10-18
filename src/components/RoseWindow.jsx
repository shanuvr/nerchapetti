/**
 * Gothic Cathedral Rose Window (Luminous Stained Glass Rosette)
 * Slowly rotates in the ambient backdrop with radiant sky blue, gold, and white sacred rays.
 */
export default function RoseWindow({ className = '' }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`rose-window-spin select-none pointer-events-none transform-gpu will-change-transform ${className}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Luminous Celestial Halo */}
        <radialGradient id="rose-radial-bright" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="65%" stopColor="#0284c7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
        </radialGradient>

        {/* Golden Petal Shimmer */}
        <linearGradient id="gold-petal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#facc15" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#eab308" stopOpacity="0.85" />
        </linearGradient>

        {/* Sky Blue Arch Gradient */}
        <linearGradient id="sky-arch" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#7dd3fc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Ambient Radial Bloom */}
      <circle cx="100" cy="100" r="98" fill="url(#rose-radial-bright)" />

      {/* Outer Cathedral Rims (Bold & Radiant) */}
      <circle cx="100" cy="100" r="94" stroke="#7dd3fc" strokeWidth="2.2" strokeOpacity="0.95" />
      <circle cx="100" cy="100" r="88" stroke="#ffffff" strokeWidth="1.4" strokeDasharray="4 4" strokeOpacity="0.85" />
      <circle cx="100" cy="100" r="76" stroke="url(#gold-petal)" strokeWidth="1.8" strokeOpacity="0.95" />

      {/* 12 Cathedral Rosette Petals (Vibrant Gothic Arches) */}
      <g stroke="url(#sky-arch)" strokeWidth="1.6" strokeOpacity="0.95" fill="none">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              {/* Pointed Gothic Arch Petal */}
              <path
                d="M100 24 C88 52 90 76 100 100 C110 76 112 52 100 24 Z"
                fill="#38bdf8"
                fillOpacity="0.12"
              />
              <circle cx="100" cy="38" r="5" stroke="url(#gold-petal)" strokeWidth="1.4" fill="#facc15" fillOpacity="0.3" />
              <path d="M100 48 L100 92" stroke="#bae6fd" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.8" />
            </g>
          );
        })}
      </g>

      {/* Secondary Inner Flower of 6 Petals (Golden Sacred Geometry) */}
      <g stroke="url(#gold-petal)" strokeWidth="1.6" strokeOpacity="0.95" fill="#fef08a" fillOpacity="0.08">
        {[...Array(6)].map((_, i) => {
          const angle = (i * 360) / 6 + 15;
          return (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <ellipse cx="100" cy="68" rx="9" ry="18" />
            </g>
          );
        })}
      </g>

      {/* Central Sanctuary Rosette Star */}
      <circle cx="100" cy="100" r="30" stroke="#7dd3fc" strokeWidth="2" strokeOpacity="0.95" fill="#0284c7" fillOpacity="0.2" />
      <circle cx="100" cy="100" r="16" stroke="#fef08a" strokeWidth="1.8" strokeOpacity="1" fill="#facc15" fillOpacity="0.35" />
      <circle cx="100" cy="100" r="5" fill="#ffffff" stroke="#fef08a" strokeWidth="1" />
    </svg>
  );
}
