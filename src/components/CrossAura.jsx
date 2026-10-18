import { useId } from 'react';

/**
 * Luminous Sacred Cross with divine aura, ray bursts, and polished gold trim
 */
export default function CrossAura({ className = '' }) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');

  const goldGrad = `gold-grad-${id}`;
  const rimGrad = `rim-grad-${id}`;
  const auraGlow = `aura-glow-${id}`;

  return (
    <svg
      viewBox="-20 -20 140 160"
      className={`transform-gpu ${className}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Soft celestial aura */}
        <radialGradient id={auraGlow} cx="50" cy="50" r="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="80%" stopColor="#1e3a8a" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>

        {/* Polished gold front gradient */}
        <linearGradient id={goldGrad} x1="20" y1="0" x2="80" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#fef08a" />
          <stop offset="55%" stopColor="#facc15" />
          <stop offset="85%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        {/* Golden outer bevel edge */}
        <linearGradient id={rimGrad} x1="50" y1="0" x2="50" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>

      {/* 1. Divine Back Glow */}
      <circle cx="50" cy="50" r="54" fill={`url(#${auraGlow})`} />

      {/* 2. Celestial Radiating Light Rays (Gleams) */}
      <g opacity="0.65" stroke="#93c5fd" strokeWidth="0.75" strokeDasharray="1.5 2.5">
        <line x1="50" y1="0" x2="50" y2="10" />
        <line x1="50" y1="90" x2="50" y2="100" />
        <line x1="10" y1="40" x2="20" y2="40" />
        <line x1="80" y1="40" x2="90" y2="40" />
        <line x1="22" y1="12" x2="29" y2="19" />
        <line x1="78" y1="12" x2="71" y2="19" />
        <line x1="22" y1="68" x2="29" y2="61" />
        <line x1="78" y1="68" x2="71" y2="61" />
      </g>

      {/* 3. Halo / Ring behind intersection (Celtic / Cathedral motif) */}
      <circle
        cx="50"
        cy="40"
        r="24"
        stroke={`url(#${rimGrad})`}
        strokeWidth="1.8"
        strokeOpacity="0.8"
        fill="none"
      />
      <circle
        cx="50"
        cy="40"
        r="21"
        stroke="#93c5fd"
        strokeWidth="0.6"
        strokeOpacity="0.5"
        strokeDasharray="2 3"
        fill="none"
      />

      {/* 4. Cross Base Shadow */}
      <path
        d="M44 6h12v26h24v16H56v62H44V48H20V32h24V6z"
        fill="#020617"
        fillOpacity="0.6"
        transform="translate(1, 2)"
      />

      {/* 5. Main Golden Cross Body */}
      <path
        d="M44 6h12v26h24v16H56v62H44V48H20V32h24V6z"
        fill={`url(#${goldGrad})`}
        stroke={`url(#${rimGrad})`}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 6. Inner Sacred Emboss Ridge */}
      <path
        d="M50 10v94M24 40h52"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeOpacity="0.65"
        strokeLinecap="round"
      />

      {/* 7. Center Jewel / Heart of the Cross */}
      <circle cx="50" cy="40" r="4.5" fill="#ffffff" fillOpacity="0.9" />
      <circle cx="50" cy="40" r="3" fill="#60a5fa" />
      <circle cx="50" cy="40" r="1.5" fill="#ffffff" />
    </svg>
  );
}
