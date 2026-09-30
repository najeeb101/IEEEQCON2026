// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL  – the public origin the site is served from (used for canonical URLs, sitemap, social cards).
// BASE_PATH – set when the site lives in a sub-folder, e.g. "/IEEEQCON2026" on GitHub Pages project sites.
// See docs/DEPLOYMENT.md.
const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  // Redirect targets are not base-prefixed by Astro, so add it here.
  redirects: {
    '/program': `${base.replace(/\/$/, '')}/program/schedule/`,
  },
});
