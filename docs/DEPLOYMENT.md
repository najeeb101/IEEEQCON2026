# Deployment

The site builds to plain static files in `dist/`, so any static host works.

**Live at https://najeeb101.github.io/IEEEQCON2026/** on GitHub Pages (option A below). Every merge to `main` rebuilds and republishes it within a couple of minutes; progress shows under the repository's **Actions** tab.

## Build

```bash
npm ci
SITE_URL=https://your-domain.org npm run build     # runs type checks, then builds to dist/
npm run preview                                    # check the production build locally
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `SITE_URL` | **Yes, for production** | Public origin, e.g. `https://qcon.example.org`. Used for canonical links, the sitemap and social-share image URLs. Defaults to `http://localhost:4321`. |
| `BASE_PATH` | Only for sub-folder hosting | e.g. `/IEEEQCON2026` for `https://<user>.github.io/IEEEQCON2026/`. Defaults to `/`. |

All internal links go through `url()`, so a `BASE_PATH` change needs no code changes.

## Option A: GitHub Pages (current)

Free, and the repository is already on GitHub.

- **Settings → Pages → Source** is set to **GitHub Actions**.
- `.github/workflows/deploy.yml` runs `npm ci` and `npm run build` on every push to `main` (or by hand from the Actions tab), then publishes `dist/`. It sets `SITE_URL=https://najeeb101.github.io` and `BASE_PATH=/IEEEQCON2026`.
- If a deploy fails, open the failed run in the Actions tab. The usual cause is a type error, which `npm run build` also shows locally.
- **Custom domain:** add it under Settings → Pages, create `public/CNAME` containing the domain, then in the workflow set `SITE_URL` to `https://<domain>` and remove `BASE_PATH`.

## Option B: Vercel or Netlify

Import the repository. Both detect Astro automatically.

- Build command: `npm run build`. Output directory: `dist`.
- Add the environment variable `SITE_URL` (your production domain).
- Every pull request gets a preview URL, which is useful for reviewing content changes.

## Option C: University or IEEE server

Run the build locally or in CI with `SITE_URL` (and `BASE_PATH` if it's served from a folder), then upload the contents of `dist/` to the web root. `404.html` is included. Point the server's not-found page at it.

## After deploying

- [ ] Open the site on a phone and a desktop. Check the menu, carousel, countdown and map.
- [ ] Paste the URL into WhatsApp or LinkedIn to confirm the preview image and title.
- [ ] Visit `/sitemap-index.xml` and confirm the URLs use the real domain.
- [ ] Submit the sitemap in Google Search Console (optional).
- [ ] Visit a made-up URL to confirm the 404 page appears.
