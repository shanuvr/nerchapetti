// Nerchapetti Church Audio Engine:
// 1. Cathedral Bell (Resonant bronze church chime with minor-third partials)
// 2. Coin strike (brass slot tick + wooden chest body thud)
// 3. Banknote slide (soft paper glide)

let ctx = null;
let master = null;
let cathedralReverb = null;
let noiseBuf = null;

const getContext = () => {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  if (!ctx || ctx.state === 'closed') {
    ctx = new AudioCtx();

    // Master Dynamics Compressor to prevent clipping during simultaneous sounds
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -12;
    comp.knee.value = 30;
    comp.ratio.value = 5;
    comp.attack.value = 0.003;
    comp.release.value = 0.25;

    master = ctx.createGain();
    master.gain.value = 0.85;
    master.connect(comp);
    comp.connect(ctx.destination);

    // Cathedral Sanctuary Impulse Response (Spacious church acoustic reverb)
    const len = Math.floor(ctx.sampleRate * 1.8);
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const channelData = ir.getChannelData(c);
      for (let i = 0; i < len; i++) {
        // Exponential decay envelope with high initial density
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
      }
    }

    const convolver = ctx.createConvolver();
    convolver.buffer = ir;
    cathedralReverb = ctx.createGain();
    cathedralReverb.gain.value = 0.45;
    cathedralReverb.connect(convolver);
    convolver.connect(master);

    // Noise buffer for mechanical impacts & paper slides
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  }

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  return ctx;
};

const rand = (min, max) => min + Math.random() * (max - min);

/**
 * Resonant Cathedral Bronze Church Bell Chime
 * Modeled after traditional bell acoustics:
 * Hum tone (0.5x), Prime (1.0x), Tierce / minor 3rd (1.19x), Quint (1.5x), Nominal (2.0x)
 */
export const playChurchBell = (pitch = 392) => {
  const c = getContext();
  if (!c) return;

  const t0 = c.currentTime;

  // Traditional Church Bell acoustic ratios
  const partials = [
    { ratio: 0.5, amp: 0.7, decay: 2.8 },    // Hum tone (deep foundation)
    { ratio: 1.0, amp: 1.0, decay: 2.4 },    // Prime tone
    { ratio: 1.189, amp: 0.6, decay: 2.1 },  // Minor Tierce (gives church bell its distinct solemnity)
    { ratio: 1.5, amp: 0.45, decay: 1.7 },   // Quint
    { ratio: 2.0, amp: 0.35, decay: 1.4 },   // Nominal
    { ratio: 2.67, amp: 0.2, decay: 0.9 },   // Superquint
    { ratio: 3.0, amp: 0.15, decay: 0.7 },   // Octave nominal
  ];

  partials.forEach((p) => {
    const osc = c.createOscillator();
    const g = c.createGain();

    osc.type = 'sine';
    // Subtle detune for natural bronze warmth
    const freq = pitch * p.ratio * rand(0.998, 1.002);
    osc.frequency.setValueAtTime(freq, t0);

    g.gain.setValueAtTime(0.0001, t0);
    // Instant attack on clapper strike
    g.gain.linearRampToValueAtTime(p.amp * 0.38, t0 + 0.004);
    // Natural resonant church decay
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + p.decay);

    osc.connect(g);
    g.connect(master);
    g.connect(cathedralReverb);

    osc.start(t0);
    osc.stop(t0 + p.decay + 0.1);
  });

  // Clapper strike impact noise
  if (noiseBuf) {
    const noise = c.createBufferSource();
    noise.buffer = noiseBuf;
    const filter = c.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, t0);
    filter.Q.setValueAtTime(1.2, t0);

    const ng = c.createGain();
    ng.gain.setValueAtTime(0.0001, t0);
    ng.gain.linearRampToValueAtTime(0.18, t0 + 0.002);
    ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.04);

    noise.connect(filter);
    filter.connect(ng);
    ng.connect(master);

    noise.start(t0);
    noise.stop(t0 + 0.05);
  }
};

/**
 * Real Coin Drop into Church Nerchapetti
 * Combines brass coin slot ping with hollow wooden chest acoustic body thud
 */
export const playCoinDrop = (value = 5) => {
  const c = getContext();
  if (!c) return;

  const t0 = c.currentTime;

  // Base frequency varies slightly by coin denomination
  const pitchMap = { 1: 3400, 2: 3200, 5: 2900, 10: 2700, 20: 2600 };
  const baseFreq = pitchMap[value] || 3000;

  // 1. Sharp metallic ring on the brass slot rim
  [1, 2.14, 3.8].forEach((r, i) => {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * r * rand(0.99, 1.01), t0);

    const dur = 0.08 / (i + 1);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(0.25 / (i + 1), t0 + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    osc.connect(g);
    g.connect(master);
    g.connect(cathedralReverb);

    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  });

  // 2. Secondary metallic bounce inside
  const tBounce = t0 + 0.06;
  const oscBounce = c.createOscillator();
  const gBounce = c.createGain();
  oscBounce.type = 'sine';
  oscBounce.frequency.setValueAtTime(baseFreq * 1.08, tBounce);
  gBounce.gain.setValueAtTime(0.0001, tBounce);
  gBounce.gain.linearRampToValueAtTime(0.14, tBounce + 0.001);
  gBounce.gain.exponentialRampToValueAtTime(0.0001, tBounce + 0.05);

  oscBounce.connect(gBounce);
  gBounce.connect(master);
  oscBounce.start(tBounce);
  oscBounce.stop(tBounce + 0.06);

  // 3. Wooden Nerchapetti box hollow chamber resonance
  const woodOsc = c.createOscillator();
  const woodG = c.createGain();
  woodOsc.type = 'triangle';
  woodOsc.frequency.setValueAtTime(210, t0);
  woodOsc.frequency.exponentialRampToValueAtTime(140, t0 + 0.08);

  woodG.gain.setValueAtTime(0.0001, t0);
  woodG.gain.linearRampToValueAtTime(0.22, t0 + 0.003);
  woodG.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.12);

  woodOsc.connect(woodG);
  woodG.connect(master);
  woodG.connect(cathedralReverb);

  woodOsc.start(t0);
  woodOsc.stop(t0 + 0.15);
};

/**
 * Banknote rustle & slide into church box
 */
export const playNoteDrop = () => {
  const c = getContext();
  if (!c || !noiseBuf) return;

  const t0 = c.currentTime;

  // Dual-phase crisp paper flutter
  [0, 0.03].forEach((offset, idx) => {
    const t = t0 + offset;
    const noise = c.createBufferSource();
    noise.buffer = noiseBuf;

    const filter = c.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(idx === 0 ? 3200 : 2200, t);
    filter.Q.setValueAtTime(1.5, t);

    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

    noise.connect(filter);
    filter.connect(g);
    g.connect(master);

    noise.start(t, Math.random() * 0.5);
    noise.stop(t + 0.16);
  });
};
