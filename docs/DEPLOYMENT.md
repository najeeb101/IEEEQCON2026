# Deployment

The site builds to plain static files in `dist/`, so any static host works. **Nothing is deployed yet.** This guide is for when we're ready.

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

## Option A: GitHub Pages (free, repo already on GitHub)

1. In the repository: **Settings → Pages → Source: GitHub Actions**.
2. Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy site
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
        env:
          SITE_URL: https://<user>.github.io        # or your custom domain
          BASE_PATH: /IEEEQCON2026                  # remove when using a custom domain
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: '${{ steps.d.outputs.page_url }}' }
    steps:
      - id: d
        uses: actions/deploy-pages@v4
```

3. For a **custom domain**, add it under Settings → Pages, create `public/CNAME` containing the domain, set `SITE_URL` to it and remove `BASE_PATH`.

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
