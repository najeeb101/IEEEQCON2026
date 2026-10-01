/**
 * Builds every logo file the site uses from the designer's masters in brand-source/.
 *
 *   npm run brand
 *
 * New edition: replace the files in brand-source/ (same names), run the command, and commit the
 * changes in public/brand/. Then run `npm run og` for the social preview image.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const src = (name) => fileURLToPath(new URL(`brand-source/${name}`, root));
const out = (name) => fileURLToPath(new URL(`public/brand/${name}`, root));

const clear = { r: 0, g: 0, b: 0, alpha: 0 };

/** The designer files the site uses. */
const masters = {
  'logo-color': 'Logo (Transparent Background).png',
  'logo-white': 'White Logo.png',
  'icon-color': 'Icon.png',
  'icon-white': 'Icon White.png',
};

/** Crops a master to its artwork. */
const trimmed = (name) => sharp(src(masters[name])).trim({ threshold: 1 }).png().toBuffer();

/** Fits artwork into a fixed canvas, so width/height attributes in the markup never change. */
const fit = (input, width, height) =>
  sharp(input).resize(width, height, { fit: 'contain', background: clear }).png({ compressionLevel: 9 });

/** A square app icon: the artwork centered on a (optionally rounded) white tile. */
async function appIcon(input, size, { pad = 0.12, radius = 0 } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const art = await sharp(input).resize(inner, inner, { fit: 'contain', background: clear }).png().toBuffer();
  const r = Math.round(size * radius);
  const tile = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#fff"/></svg>`,
  );
  return sharp(tile).composite([{ input: art, gravity: 'center' }]).png({ compressionLevel: 9 });
}

const made = [];
const save = async (pipeline, name) => {
  const info = await pipeline.toFile(out(name));
  made.push(`${name}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
};

// Site logos (2× the largest display size). Header, footer and panels use the white logo.
await save(fit(await trimmed('logo-white'), 720, 384), 'qcon-logo-white.png');
await save(fit(await trimmed('logo-color'), 720, 384), 'qcon-logo-color.png');
await save(fit(await trimmed('icon-white'), 400, 486), 'qcon-mark-white.png');
await save(fit(await trimmed('icon-color'), 400, 486), 'qcon-mark-color.png');

// Browser and phone icons from the color "Q". Tabs get it on transparent; home screens on white.
const icon = await trimmed('icon-color');
await save(fit(icon, 32, 32), 'favicon-32.png');
await save(await appIcon(icon, 180), 'apple-touch-icon.png');
await save(await appIcon(icon, 192, { radius: 0.22 }), 'icon-192.png');
await save(await appIcon(icon, 512, { radius: 0.22 }), 'icon-512.png');

console.log(made.map((line) => `  public/brand/${line}`).join('\n'));
