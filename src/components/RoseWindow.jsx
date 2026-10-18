/**
 * Gothic Cathedral Rose Window (Stained Glass Rosette)
 * Slowly rotates in the ambient backdrop with celestial blue and golden rays
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
        <radialGradient id="rose-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="35%" stopColor="#2563eb" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="96" fill="url(#rose-radial)" />

      {/* Outer Cathedral Rim */}
      <circle cx="100" cy="100" r="92" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.4" />
      <circle cx="100" cy="100" r="86" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="3 4" strokeOpacity="0.35" />
      <circle cx="100" cy="100" r="74" stroke="#fbbf24" strokeWidth="0.75" strokeOpacity="0.3" />

      {/* 12 Cathedral Rosette Petals */}
      <g stroke="#93c5fd" strokeWidth="1" strokeOpacity="0.35" fill="none">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              {/* Pointed Gothic Arch Petal */}
              <path d="M100 26 C90 52 92 76 100 100 C108 76 110 52 100 26 Z" />
              <circle cx="100" cy="38" r="4.5" stroke="#facc15" strokeWidth="0.8" strokeOpacity="0.4" />
              <path d="M100 50 L100 90" strokeDasharray="2 3" strokeOpacity="0.25" />
            </g>
          );
        })}
      </g>

      {/* Secondary Inner Flower of 6 Petals */}
      <g stroke="#facc15" strokeWidth="0.9" strokeOpacity="0.3" fill="none">
        {[...Array(6)].map((_, i) => {
          const angle = (i * 360) / 6 + 15;
          return (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <ellipse cx="100" cy="68" rx="8" ry="16" />
            </g>
          );
        })}
      </g>

      {/* Central Sanctuary Rosette */}
      <circle cx="100" cy="100" r="28" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.45" />
      <circle cx="100" cy="100" r="14" stroke="#fef08a" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="100" cy="100" r="4" fill="#ffffff" fillOpacity="0.6" />
    </svg>
  );
}
