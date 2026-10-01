/**
 * Builds the link preview (public/brand/og-image.png, 1200×630) that WhatsApp, LinkedIn and X
 * show when someone shares the site.
 *
 *   npm run og
 *
 * Run it after `npm run brand`, and again whenever the edition year, date or venue changes in
 * src/config/site.ts. The card is laid out as a web page with the site's fonts, colors and hero
 * wave, then photographed by the Chrome or Edge installed on this computer. Set CHROME_PATH if
 * the browser isn't found.
 */
import sharp from 'sharp';
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';
import { site, fullName } from '../src/config/site.ts';
import { wave, TONES } from '../src/scripts/particles.ts';

const W = 1200;
const H = 630;
const root = new URL('../', import.meta.url);
const file = (path) => fileURLToPath(new URL(path, root));
const dataUri = async (path, type) => `data:${type};base64,${(await readFile(file(path))).toString('base64')}`;

const browsers = [
  process.env.CHROME_PATH,
  `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env['PROGRAMFILES(X86)']}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env['PROGRAMFILES(X86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/microsoft-edge',
];
const browser = browsers.find((path) => path && existsSync(path));
if (!browser) {
  console.error('No Chrome or Edge found. Install one, or point CHROME_PATH at its executable.');
  process.exit(1);
}

// Fonts and logo are inlined so the page needs no network or file access.
const face = async (family, weight) =>
  `@font-face { font-family: '${family}'; font-weight: ${weight}; src: url(${await dataUri(
    `node_modules/@fontsource/${family.toLowerCase()}/files/${family.toLowerCase()}-latin-${weight}-normal.woff2`,
    'font/woff2',
  )}) format('woff2'); }`;
const fonts = (await Promise.all([face('Poppins', 200), face('Poppins', 300), face('Barlow', 600)])).join('\n');
const tokens = await readFile(file('src/styles/tokens.css'), 'utf8');
const logo = await dataUri('public/brand/qcon-logo-white.png', 'image/png');

// A fixed moment of the home page wave, a little brighter, so the image only changes when the content does.
const dots = wave(W, H, 6, 1, 0.62).map(([x, y, r, a]) => [x, y, r, Math.min(1, a * 1.7)].map((n) => Math.round(n * 100) / 100));
const place = `${site.venue.name}, ${site.venue.city}`;
const meta = site.event.dateLabel ? `${site.event.dateLabel} · ${place}` : place;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
${fonts}
${tokens}
* { margin: 0; box-sizing: border-box; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
body {
  position: relative;
  color: var(--text);
  font-family: var(--font-body);
  background:
    radial-gradient(50% 75% at 0% 0%, color-mix(in srgb, var(--brand-maroon) 75%, transparent), transparent 75%),
    radial-gradient(55% 75% at 92% 88%, color-mix(in srgb, var(--blue-800) 45%, transparent), transparent 75%),
    var(--bg);
}
canvas {
  position: absolute;
  inset: 0;
  mask-image: linear-gradient(90deg, transparent 30%, #000 75%);
}
.card { position: relative; display: flex; flex-direction: column; height: 100%; padding: 68px 80px 62px; }
.logo { width: 252px; height: auto; }
h1 { margin-top: 52px; font-family: var(--font-display); font-size: 76px; font-weight: 300; line-height: 1.1; }
.kind { font-family: var(--font-display); font-size: 50px; font-weight: 200; line-height: 1.25; color: var(--text-body); }
.meta { margin-top: auto; color: var(--accent-soft); font-size: 26px; font-weight: 600; letter-spacing: 0.01em; }
.bar { position: absolute; inset: auto 0 0; height: 6px; background: var(--gradient-brand); }
</style>
</head>
<body>
<canvas width="${W}" height="${H}"></canvas>
<div class="card">
  <img class="logo" src="${logo}" alt="">
  <h1>${fullName}</h1>
  <p class="kind">${site.kind}</p>
  <p class="meta">${meta}</p>
</div>
<div class="bar"></div>
<script>
  const [r, g, b] = ${JSON.stringify(TONES.blue)};
  const ctx = document.querySelector('canvas').getContext('2d');
  ctx.globalCompositeOperation = 'lighter';
  for (const [x, y, rad, a] of ${JSON.stringify(dots)}) {
    ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
  }
</script>
</body>
</html>`;

const tmp = await mkdtemp(join(tmpdir(), 'qcon-og-'));
try {
  const page = join(tmp, 'card.html');
  const shot = join(tmp, 'card.png');
  await writeFile(page, html);
  await promisify(execFile)(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${join(tmp, 'profile')}`,
    '--force-device-scale-factor=1',
    `--window-size=${W},${H}`,
    '--virtual-time-budget=5000',
    `--screenshot=${shot}`,
    pathToFileURL(page).href,
  ]);
  const { width, height } = await sharp(shot).metadata();
  if (width !== W || height !== H) throw new Error(`Screenshot came out ${width}×${height}, expected ${W}×${H}.`);
  const info = await sharp(shot).png({ compressionLevel: 9 }).toFile(file('public/brand/og-image.png'));
  console.log(`  public/brand/og-image.png  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
} finally {
  await rm(tmp, { recursive: true, force: true });
}
