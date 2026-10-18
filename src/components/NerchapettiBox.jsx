import { useId } from 'react';

/**
 * Authentic Kerala Church Nerchapetti (Offering Chest)
 * Crafted with polished dark mahogany wood grain, brass corner brackets,
 * brass cross insignia, padlock latch, and an illuminated coin slot.
 */
export default function NerchapettiBox({ className = '', slotGlow = false }) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');

  const woodBase = `wood-base-${id}`;
  const woodLid = `wood-lid-${id}`;
  const brassMetal = `brass-metal-${id}`;
  const slotLight = `slot-light-${id}`;

  return (
    <svg
      viewBox="0 0 240 180"
      className={`transform-gpu w-full h-auto drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] ${className}`}
      fill="none"
      aria-label="Church Nerchapetti offering chest"
    >
      <defs>
        {/* Polished Dark Teak / Mahogany Wood Grain */}
        <linearGradient id={woodBase} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#451a03" />
          <stop offset="25%" stopColor="#78350f" />
          <stop offset="50%" stopColor="#2e1065" stopOpacity="0.15" />
          <stop offset="75%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#1e0b04" />
        </linearGradient>

        {/* Angled Wood Lid */}
        <linearGradient id={woodLid} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#9a3412" />
          <stop offset="40%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>

        {/* Church Brass Fixtures */}
        <linearGradient id={brassMetal} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#facc15" />
          <stop offset="70%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        {/* Illuminated Slot Flare */}
        <radialGradient id={slotLight} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Ambient Bottom Shadow */}
      <ellipse cx="120" cy="172" rx="100" ry="8" fill="#000000" fillOpacity="0.75" />

      {/* 2. Main Wooden Box Body */}
      <rect
        x="24"
        y="52"
        width="192"
        height="114"
        rx="6"
        fill={`url(#${woodBase})`}
        stroke="#1c1917"
        strokeWidth="2"
      />

      {/* Wood panel vertical plank grooves */}
      <line x1="72" y1="52" x2="72" y2="166" stroke="#1c1917" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="120" y1="52" x2="120" y2="166" stroke="#1c1917" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="168" y1="52" x2="168" y2="166" stroke="#1c1917" strokeWidth="1" strokeOpacity="0.4" />

      {/* 3. Base Plinth */}
      <path
        d="M20 162h200v8a4 4 0 01-4 4H24a4 4 0 01-4-4v-8z"
        fill="#292524"
        stroke={`url(#${brassMetal})`}
        strokeWidth="0.8"
      />

      {/* 4. Beveled Lid Top */}
      <path
        d="M16 48 L32 20 L208 20 L224 48 L220 54 L20 54 Z"
        fill={`url(#${woodLid})`}
        stroke="#292524"
        strokeWidth="1.5"
      />
      <line x1="32" y1="20" x2="208" y2="20" stroke="#fef08a" strokeWidth="0.8" strokeOpacity="0.4" />

      {/* 5. Brass Offering Slot on Lid */}
      <rect
        x="88"
        y="28"
        width="64"
        height="7"
        rx="3.5"
        fill="#0f172a"
        stroke={`url(#${brassMetal})`}
        strokeWidth="1.6"
      />
      {/* Slot drop opening */}
      <rect x="94" y="30" width="52" height="3" rx="1.5" fill="#000000" />

      {/* Dynamic Slot Light Burst when coin enters */}
      {slotGlow && (
        <ellipse cx="120" cy="31" rx="42" ry="14" fill={`url(#${slotLight})`} />
      )}

      {/* 6. Brass Corner Reinforcements (Brackets with Rivets) */}
      {/* Top Left */}
      <path d="M24 54h16v4H28v12h-4z" fill={`url(#${brassMetal})`} />
      <circle cx="27" cy="57" r="1.2" fill="#451a03" />
      <circle cx="36" cy="56" r="1.2" fill="#451a03" />
      {/* Top Right */}
      <path d="M216 54h-16v4h12v12h4z" fill={`url(#${brassMetal})`} />
      <circle cx="213" cy="57" r="1.2" fill="#451a03" />
      <circle cx="204" cy="56" r="1.2" fill="#451a03" />
      {/* Bottom Left */}
      <path d="M24 162h16v-4H28v-12h-4z" fill={`url(#${brassMetal})`} />
      <circle cx="27" cy="159" r="1.2" fill="#451a03" />
      {/* Bottom Right */}
      <path d="M216 162h-16v-4h12v-12h4z" fill={`url(#${brassMetal})`} />
      <circle cx="213" cy="159" r="1.2" fill="#451a03" />

      {/* 7. Center Brass Plaque with Malayalam Title: നേർച്ചപ്പെട്ടി */}
      <rect
        x="68"
        y="62"
        width="104"
        height="22"
        rx="4"
        fill="#1c1917"
        stroke={`url(#${brassMetal})`}
        strokeWidth="1.2"
      />
      <circle cx="72" cy="73" r="1.2" fill="#facc15" />
      <circle cx="168" cy="73" r="1.2" fill="#facc15" />
      <text
        x="120"
        y="77"
        textAnchor="middle"
        className="font-malayalam"
        fontSize="11"
        fontWeight="bold"
        fill="#fef08a"
        letterSpacing="0.05em"
      >
        നേർച്ചപ്പെട്ടി
      </text>

      {/* 8. Center Brass Cross Insignia */}
      <g transform="translate(120, 118)">
        {/* Soft Cross Glow */}
        <circle cx="0" cy="0" r="22" fill="#facc15" fillOpacity="0.12" />
        {/* Vertical Beam */}
        <rect x="-4.5" y="-22" width="9" height="42" rx="1.5" fill={`url(#${brassMetal})`} stroke="#fef08a" strokeWidth="0.6" />
        {/* Horizontal Beam */}
        <rect x="-16" y="-12" width="32" height="9" rx="1.5" fill={`url(#${brassMetal})`} stroke="#fef08a" strokeWidth="0.6" />
        {/* Center Jewel */}
        <circle cx="0" cy="-7.5" r="2.5" fill="#ffffff" />
      </g>

      {/* 9. Heavy Brass Padlock Latch (Hasp & Staple) */}
      <rect x="115" y="48" width="10" height="12" rx="2" fill={`url(#${brassMetal})`} stroke="#78350f" strokeWidth="0.5" />
      <path
        d="M117 56h6v5a3 3 0 01-6 0v-5z"
        fill="#292524"
        stroke={`url(#${brassMetal})`}
        strokeWidth="0.8"
      />
    </svg>
  );
}
