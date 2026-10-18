import confetti from 'canvas-confetti';

/* Celestial Church Palette: Marian Blue, Sky Light, Angelic White, and Sacred Gold */
const CELESTIAL_PALETTE = [
  '#ffffff',
  '#f8fafc',
  '#e0f2fe',
  '#bae6fd',
  '#7dd3fc',
  '#38bdf8',
  '#2563eb',
  '#1d4ed8',
  '#fef08a',
  '#facc15',
  '#eab308',
];

let confettiWorkerInstance = null;

function getWorkerConfetti() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;

  if (!confettiWorkerInstance) {
    let canvas = document.getElementById('nerchapetti-confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'nerchapetti-confetti-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);
    }

    try {
      confettiWorkerInstance = confetti.create(canvas, {
        resize: true,
        useWorker: true,
        disableForReducedMotion: true,
      });
    } catch {
      confettiWorkerInstance = confetti;
    }
  }

  return confettiWorkerInstance;
}

/**
 * Celestial Thanksgiving Offering Celebration Shower
 * Multi-stage burst of angelic starlight and golden glints
 */
export const celebrateOffering = () => {
  const fire = getWorkerConfetti();
  if (!fire) return;

  // 1. Initial burst from center upward
  fire({
    particleCount: 45,
    spread: 70,
    origin: { y: 0.65 },
    colors: CELESTIAL_PALETTE,
    startVelocity: 35,
    gravity: 0.85,
    scalar: 1.1,
    drift: 0,
    ticks: 240,
  });

  // 2. Twin angelic wings shower from left and right
  setTimeout(() => {
    fire({
      particleCount: 30,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.6 },
      colors: CELESTIAL_PALETTE,
      startVelocity: 38,
      gravity: 0.9,
      scalar: 0.95,
      ticks: 220,
    });
    fire({
      particleCount: 30,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.6 },
      colors: CELESTIAL_PALETTE,
      startVelocity: 38,
      gravity: 0.9,
      scalar: 0.95,
      ticks: 220,
    });
  }, 220);

  // 3. Gentle golden starlight floating descent
  setTimeout(() => {
    fire({
      particleCount: 25,
      spread: 100,
      origin: { y: 0.3 },
      colors: ['#ffffff', '#fef08a', '#facc15', '#60a5fa'],
      startVelocity: 18,
      gravity: 0.6,
      scalar: 0.8,
      ticks: 300,
    });
  }, 480);
};
