import { useId } from 'react';

/**
 * Church Altar Votive Pillar Candle with brass holder and gentle flame flicker
 */
export default function AltarCandle({ className = '', height = 48 }) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');

  const waxGrad = `wax-${id}`;
  const brassGrad = `brass-${id}`;
  const outerFlame = `outer-flame-${id}`;
  const coreFlame = `core-flame-${id}`;
  const auraGlow = `aura-${id}`;

  return (
    <svg
      viewBox="0 0 40 76"
      className={`transform-gpu will-change-transform ${className}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ height }}
    >
      <defs>
        {/* Soft amber-gold candle halo */}
        <radialGradient id={auraGlow} cx="0.5" cy="0.25" r="0.45">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.75" />
          <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
        </radialGradient>

        {/* Outer Flame (Amber-Orange) */}
        <linearGradient id={outerFlame} x1="20" y1="28" x2="20" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="18%" stopColor="#f59e0b" />
          <stop offset="55%" stopColor="#facc15" />
          <stop offset="90%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* Inner Flame Core (Brilliant White-Blue) */}
        <linearGradient id={coreFlame} x1="20" y1="26" x2="20" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="30%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fffdf0" />
        </linearGradient>

        {/* Ivory Pillar Wax with realistic vertical shading */}
        <linearGradient id={waxGrad} x1="8" y1="36" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="25%" stopColor="#f8fafc" />
          <stop offset="60%" stopColor="#ffffff" />
          <stop offset="85%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Polished Altar Brass Candlestick Holder */}
        <linearGradient id={brassGrad} x1="4" y1="62" x2="36" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#facc15" />
          <stop offset="70%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>

      {/* 1. Ambient Warm Halo */}
      <circle cx="20" cy="18" r="20" fill={`url(#${auraGlow})`} />

      {/* 2. Candlestick Brass Base */}
      <path
        d="M6 72c0-2.5 4.5-4 14-4s14 1.5 14 4H6z"
        fill={`url(#${brassGrad})`}
        stroke="#fef08a"
        strokeWidth="0.5"
      />
      <rect x="16" y="65" width="8" height="4" rx="1" fill={`url(#${brassGrad})`} />
      <ellipse cx="20" cy="65" rx="8" ry="2" fill="#facc15" />

      {/* 3. Ivory Wax Candle Body */}
      <rect x="13" y="32" width="14" height="34" rx="2" fill={`url(#${waxGrad})`} />
      <ellipse cx="20" cy="32" rx="7" ry="2.2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.4" />

      {/* 4. Wax Drip Detail */}
      <path
        d="M14 33c0 3 1.5 5 1.5 7s-1 1-1.5 0"
        fill="#f8fafc"
        opacity="0.9"
      />

      {/* 5. Candle Wick */}
      <line x1="20" y1="32" x2="20" y2="25" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />

      {/* 6. Flickering Flame Group */}
      <g className="candle-flicker">
        {/* Outer Flame Tear */}
        <path
          d="M20 4c4 7 7 11.5 7 16.5 0 5-3.1 8-7 8s-7-3-7-8C13 15.5 16 11 20 4z"
          fill={`url(#${outerFlame})`}
        />
        {/* Inner Flame Core */}
        <path
          d="M20 12c2 3.5 3.5 5.8 3.5 8.5 0 2.5-1.5 4-3.5 4s-3.5-1.5-3.5-4c0-2.7 1.5-5 3.5-8.5z"
          fill={`url(#${coreFlame})`}
        />
      </g>
    </svg>
  );
}
