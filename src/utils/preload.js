import { MONEY } from '../data/money';

const ASSETS_TO_PRELOAD = [
  '/bg.jpg',
  '/hundi.webp',
  ...Object.values(MONEY).map((m) => m.src),
];

let hasPreloaded = false;

export const preloadAssets = () => {
  if (hasPreloaded || typeof window === 'undefined') return;
  hasPreloaded = true;

  const schedulePreload = () => {
    let index = 0;
    const preloadNext = () => {
      if (index >= ASSETS_TO_PRELOAD.length) return;
      const src = ASSETS_TO_PRELOAD[index++];
      const img = new Image();
      img.src = src;
      if ('decode' in img) {
        img.decode()
          .catch(() => {})
          .finally(() => {
            if ('requestIdleCallback' in window) {
              window.requestIdleCallback(preloadNext, { timeout: 400 });
            } else {
              setTimeout(preloadNext, 40);
            }
          });
      } else {
        setTimeout(preloadNext, 40);
      }
    };

    preloadNext();
  };

  setTimeout(() => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(schedulePreload, { timeout: 1500 });
    } else {
      setTimeout(schedulePreload, 200);
    }
  }, 400);
};
