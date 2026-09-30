/**
 * Generative particle backgrounds — Q-Con's signature visuals drawn in code.
 *   wave   – the dotted mesh wave from the Q-Con hero
 *   sphere – the speckled globe from the closing call to action
 *   rings  – the concentric contour rings from the "Full day of innovation" panel
 *
 * Performance: each <canvas data-particles> animates only while on screen, at 30fps (24 on
 * phones), holds still while the page scrolls, and steps its particle count down on slower
 * devices (falling back to a still frame if needed). Reduced motion and Data Saver get a
 * single still frame.
 */

type Variant = 'wave' | 'sphere' | 'rings';
type RGB = [number, number, number];
type Dot = [x: number, y: number, r: number, a: number];

const TONES: Record<string, RGB> = {
  blue: [146, 168, 240], // periwinkle from the Q-Con hero
  cyan: [74, 160, 214], // Q-Con accent
  maroon: [232, 112, 112], // maroon glow
};

const BUCKETS = 14;
// Frame rate comes from data-fps (default 30, capped at 24 on phones): background motion is
// slow, so 30fps looks the same as 60 at half the cost.
/** Max average draw time per frame before quality steps down. */
const BUDGET_MS = 8;
/** Density multipliers tried in order on slower devices. */
const QUALITY = [1, 0.8, 0.62, 0.48, 0.36];

// While the page is scrolling every field holds still, leaving the main thread to the scroll.
let scrollIdleAt = 0;
let scrollListening = false;
function listenForScroll() {
  if (scrollListening) return;
  scrollListening = true;
  window.addEventListener('scroll', () => (scrollIdleAt = performance.now() + 180), { passive: true });
}

function drawDots(ctx: CanvasRenderingContext2D, dots: Dot[], [r, g, b]: RGB) {
  const buckets: Dot[][] = Array.from({ length: BUCKETS }, () => []);
  for (const d of dots) {
    if (!(d[3] > 0.01)) continue; // also skips NaN
    buckets[Math.min(BUCKETS - 1, Math.floor(d[3] * BUCKETS))].push(d);
  }
  buckets.forEach((list, i) => {
    if (!list.length) return;
    ctx.fillStyle = `rgba(${r},${g},${b},${((i + 0.5) / BUCKETS).toFixed(3)})`;
    ctx.beginPath();
    for (const [x, y, rad] of list) {
      // Tiny dots are indistinguishable from squares and far cheaper to fill.
      if (rad < 1.3) {
        ctx.rect(x - rad, y - rad, rad * 2, rad * 2);
      } else {
        ctx.moveTo(x + rad, y);
        ctx.arc(x, y, rad, 0, Math.PI * 2);
      }
    }
    ctx.fill();
  });
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function wave(w: number, h: number, t: number, density: number, horizon: number): Dot[] {
  const dots: Dot[] = [];
  const cols = Math.round(120 * density);
  const rows = Math.round(60 * density);
  const f = Math.max(h, w * 0.55) * 0.9;
  const camH = 1.3;
  const zNear = 1.6;
  const zFar = 20;
  for (let j = 0; j < rows; j++) {
    const v = j / (rows - 1);
    const Z = zNear + (zFar - zNear) * v;
    const s = f / Z;
    // The grid widens with depth so it always spans the frame, and drifts right as it recedes.
    const half = (w * 0.5 * Z) / f + 1.5;
    for (let i = 0; i < cols; i++) {
      const u = i / (cols - 1);
      const x0 = (u - 0.5) * 2 * half;
      const Y =
        1.05 * Math.sin(0.3 * x0 + 0.2 * Z + t * 0.4) * (0.6 + 0.4 * Math.sin(0.11 * Z - t * 0.16)) +
        0.38 * Math.sin(0.55 * Z - 0.26 * x0 - t * 0.3) +
        0.12 * Math.sin(1.25 * x0 + t * 0.75);
      const sx = w * 0.5 + (x0 + Z * 0.12) * s;
      const sy = h * horizon + (camH - Y) * s * 0.7;
      if (sx < -8 || sx > w + 8 || sy < -8 || sy > h + 8) continue;
      const crest = clamp01((Y + 1.4) / 2.8);
      const a = clamp01((1 - v) ** 1.1 * (0.3 + 0.9 * crest) * 1.25);
      dots.push([sx, sy, Math.max(0.5, Math.min(3.4, s * 0.0058)), a]);
    }
  }
  return dots;
}

// Fibonacci sphere, generated once per density.
const sphereCache = new Map<number, [number, number, number, number][]>();
function spherePoints(n: number) {
  if (!sphereCache.has(n)) {
    const pts: [number, number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      const jitter = 1 + (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.06;
      pts.push([Math.cos(th) * rad * jitter, y * jitter, Math.sin(th) * rad * jitter, Math.abs(Math.sin(i * 78.233)) ]);
    }
    sphereCache.set(n, pts);
  }
  return sphereCache.get(n)!;
}

function sphere(w: number, h: number, t: number, density: number): Dot[] {
  const dots: Dot[] = [];
  const R = Math.min(w, h) * 0.36;
  const cx = w * 0.5;
  const cyy = h * 0.5;
  const rot = t * 0.12;
  const tilt = 0.38;
  const cr = Math.cos(rot);
  const sr = Math.sin(rot);
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  for (const [x, y, z, seed] of spherePoints(Math.round(2600 * density))) {
    const x1 = x * cr + z * sr;
    const z1 = -x * sr + z * cr;
    const y2 = y * ct - z1 * st;
    const z2 = y * st + z1 * ct;
    const p = 1 / (1 - z2 * 0.18);
    const a = (0.12 + 0.88 * clamp01((z2 + 1) / 2) ** 1.6) * (0.5 + seed * 0.5);
    dots.push([cx + x1 * R * p, cyy + y2 * R * p, (0.55 + seed * 1.05) * p, Math.min(1, a * 1.2)]);
  }
  return dots;
}

function rings(w: number, h: number, t: number, density: number): Dot[] {
  const dots: Dot[] = [];
  const cx = w * 0.55;
  const cyy = h * 0.42;
  const base = Math.min(w, h) * 0.085;
  const count = 9;
  const rot = -0.35;
  const cr = Math.cos(rot);
  const sr = Math.sin(rot);
  for (let k = 0; k < count; k++) {
    const r0 = base * (k + 1) ** 1.18;
    const n = Math.round((60 + k * 26) * density);
    const fade = 1 - k / count;
    for (let i = 0; i < n; i++) {
      const th = (i / n) * Math.PI * 2;
      const r =
        r0 *
        (1 + 0.14 * Math.sin(3 * th + t * 0.5 + k * 0.55) + 0.07 * Math.sin(5 * th - t * 0.7 + k) + 0.05 * Math.sin(2 * th + t * 0.3));
      const x = Math.cos(th) * r;
      const y = Math.sin(th) * r * 0.78;
      dots.push([cx + x * cr - y * sr, cyy + x * sr + y * cr, 0.8 + fade * 1.2, 0.08 + fade ** 1.5 * 0.9]);
    }
  }
  return dots;
}

function setup(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const variant = (canvas.dataset.variant ?? 'wave') as Variant;
  const tone = TONES[canvas.dataset.tone ?? 'blue'] ?? TONES.blue;
  const intensity = Number(canvas.dataset.intensity ?? 1);
  const fps = Number(canvas.dataset.fps ?? 30);
  const horizon = Number(canvas.dataset.horizon ?? 0.5);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  const constrained = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;

  let w = 0;
  let h = 0;
  let visible = false;
  let raf = 0;
  let lastDraw = 0;
  // Animation clock that only advances while drawing, so motion resumes without a jump after a pause.
  let clock = Math.random() * 20;
  // Adaptive quality: index into QUALITY, stepped down when frames are too expensive for the device.
  let level = constrained ? 1 : 0;
  let cost = 0;
  let samples = 0;
  let drawn = 0;
  let still = reduce || !!nav.connection?.saveData;

  const frame = () => {
    const began = performance.now();
    const density = (w < 640 ? 0.6 : w < 1024 ? 0.8 : 1) * QUALITY[level];
    ctx.clearRect(0, 0, w, h);
    const dots =
      variant === 'sphere' ? sphere(w, h, clock, density) : variant === 'rings' ? rings(w, h, clock, density) : wave(w, h, clock, density, horizon);
    if (intensity !== 1) for (const d of dots) d[3] = Math.min(1, d[3] * intensity);
    ctx.globalCompositeOperation = 'lighter';
    drawDots(ctx, dots, tone);
    ctx.globalCompositeOperation = 'source-over';
    return performance.now() - began;
  };

  const loop = (now: number) => {
    raf = 0;
    if (!visible || still || document.hidden) return;
    raf = requestAnimationFrame(loop);
    // Hold still while the page scrolls, and cap the frame rate otherwise (lower on phones).
    if (now < scrollIdleAt || now - lastDraw < 1000 / (w < 640 ? Math.min(fps, 24) : fps)) return;
    clock += Math.min(now - lastDraw, 50) / 1000;
    lastDraw = now;
    const c = frame();
    // Skip warm-up frames (cold JIT, page still loading), calibrate on the third, then re-check every 10.
    if (++drawn <= 2) return;
    cost = drawn === 3 ? c : cost * 0.8 + c * 0.2;
    if (drawn > 3 && ++samples < 10) return;
    samples = 0;
    while (cost > BUDGET_MS && level < QUALITY.length - 1) {
      cost *= stepRatio(level);
      level++;
    }
    if (cost > BUDGET_MS * 1.5) still = true; // lowest quality is still too slow: keep the last frame
    canvas.dataset.quality = still ? 'still' : String(level);
  };

  const kick = () => {
    if (!raf && visible && !still) {
      lastDraw = performance.now();
      raf = requestAnimationFrame(loop);
    }
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    // Soft dots don't need full retina resolution; 1.5x keeps phones from pushing 9x the pixels.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = rect.width;
    h = rect.height;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Resizing clears the canvas. Repaint now only if it's on screen; otherwise when it arrives.
    painted = false;
    if (visible) paint();
  };

  let painted = false;
  const paint = () => {
    frame();
    painted = true;
  };

  // Estimated cost after stepping one quality level down (the wave's dot count scales with density²).
  const stepRatio = (l: number) => (QUALITY[l + 1] / QUALITY[l]) ** (variant === 'wave' ? 2 : 1);

  listenForScroll();
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      // Off-screen canvases are hidden so the browser can skip compositing them entirely.
      canvas.style.visibility = visible ? '' : 'hidden';
      // First paint happens on arrival, so a field scrolled into view mid-scroll is never blank.
      if (visible && !painted && w) paint();
      kick();
    },
    { rootMargin: '120px' },
  ).observe(canvas);
  document.addEventListener('visibilitychange', kick);
  resize();
}

export function initParticles() {
  document.querySelectorAll<HTMLCanvasElement>('canvas[data-particles]:not([data-ready])').forEach((canvas) => {
    canvas.dataset.ready = '';
    setup(canvas);
  });
}
