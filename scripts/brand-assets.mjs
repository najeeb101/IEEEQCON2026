/**
 * Builds every logo file the site uses from the designer's masters in brand-source/.
 *
 *   npm run brand
 *
 * New edition: replace the seven files in brand-source/ (same names), run the command, and commit
 * the changes in public/brand/ and src/data/brand-kit.json. The social preview image (og-image.png) is made separately; see
 * docs/CONTENT-GUIDE.md.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const src = (name) => fileURLToPath(new URL(`brand-source/${name}`, root));
const out = (name) => fileURLToPath(new URL(`public/brand/${name}`, root));

const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const white = { r: 255, g: 255, b: 255, alpha: 1 };

/** Designer file → media-kit file. `bg` is the background the artwork is drawn for. */
const masters = {
  'logo-color': { file: 'Logo (Transparent Background).png', bg: 'light' },
  'logo-color-on-white': { file: 'Logo (White Background).png', bg: 'white' },
  'logo-white': { file: 'White Logo.png', bg: 'dark' },
  'logo-black': { file: 'Black Logo.png', bg: 'light' },
  'icon-color': { file: 'Icon.png', bg: 'light' },
  'icon-white': { file: 'Icon White.png', bg: 'dark' },
  'icon-black': { file: 'Icon Black.png', bg: 'light' },
};

/** Crops a master to its artwork and adds an even margin (a fraction of the longer side). */
async function trimmed(name, margin) {
  const { file, bg } = masters[name];
  const background = bg === 'white' ? white : clear;
  const { data, info } = await sharp(src(file)).trim({ threshold: 1 }).png().toBuffer({ resolveWithObject: true });
  const pad = Math.round(Math.max(info.width, info.height) * margin);
  return sharp(data).extend({ top: pad, bottom: pad, left: pad, right: pad, background }).png().toBuffer();
}

/** Fits artwork into a fixed canvas, so width/height attributes in the markup never change. */
const fit = (input, width, height, background = clear) =>
  sharp(input).resize(width, height, { fit: 'contain', background }).png({ compressionLevel: 9 });

/** A square app icon: the artwork centered on a (optionally rounded) tile. */
async function appIcon(input, size, { pad = 0.12, radius = 0 } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const art = await sharp(input).resize(inner, inner, { fit: 'contain', background: clear }).png().toBuffer();
  const r = Math.round(size * radius);
  const tile = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#fff"/></svg>`,
  );
  return sharp(tile).composite([{ input: art, gravity: 'center' }]).png({ compressionLevel: 9 });
}

await mkdir(out('kit'), { recursive: true });
const made = [];
const save = async (pipeline, name) => {
  const info = await pipeline.toFile(out(name));
  made.push(`${name}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
  return { src: `/brand/${name}`, width: info.width, height: info.height, bytes: info.size };
};

// Media kit: full-resolution downloads plus small previews for the page. The page reads the
// sizes from src/data/brand-kit.json.
const kit = {};
for (const name of Object.keys(masters)) {
  const art = await trimmed(name, name === 'logo-color-on-white' ? 0.08 : 0.03);
  const file = await save(sharp(art).png({ compressionLevel: 9 }), `kit/qcon-${name}.png`);
  const preview = await save(
    sharp(art).resize(640, 640, { fit: 'inside' }).webp({ quality: 88, alphaQuality: 100 }),
    `kit/qcon-${name}-preview.webp`,
  );
  kit[name] = { ...file, preview };
}
await writeFile(fileURLToPath(new URL('src/data/brand-kit.json', root)), `${JSON.stringify(kit, null, 2)}\n`);

// Site logos (2× the largest display size). Header, footer and panels use the white logo.
await save(fit(await trimmed('logo-white', 0), 720, 384), 'qcon-logo-white.png');
await save(fit(await trimmed('logo-color', 0), 720, 384), 'qcon-logo-color.png');
await save(fit(await trimmed('icon-white', 0), 400, 486), 'qcon-mark-white.png');
await save(fit(await trimmed('icon-color', 0), 400, 486), 'qcon-mark-color.png');

// Browser and phone icons from the color "Q". Tabs get it on transparent; home screens on white.
const icon = await trimmed('icon-color', 0);
await save(fit(icon, 32, 32), 'favicon-32.png');
await save(await appIcon(icon, 180), 'apple-touch-icon.png');
await save(await appIcon(icon, 192, { radius: 0.22 }), 'icon-192.png');
await save(await appIcon(icon, 512, { radius: 0.22 }), 'icon-512.png');

console.log(made.map((line) => `  public/brand/${line}`).join('\n'));
