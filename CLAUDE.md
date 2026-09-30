# IEEE Q-Con website

Static Astro 7 site for the IEEE Q-Con student conference (Doha, Qatar). It merges the Q-Con 2026 Wix site (visual identity) with the IECON 2026 WordPress site (structure and features). See `docs/ARCHITECTURE.md` for the page-by-page lineage.

## Rules

- **Stay on-theme.** Colors, fonts, spacing, radii, shadows and motion come from `src/styles/tokens.css`. No raw hex values in components. Read `docs/DESIGN-SYSTEM.md` before any visual change.
- **Content lives in `src/config/` and `src/data/`.** Components take props. Sections may read data. Pages compose sections.
- **Internal links go through `url()`** from `src/lib/url.ts` (or `Button`, which calls it), so `BASE_PATH` deployments work.
- **Don't invent facts** (fees, dates, names, partners). Use a clearly marked placeholder and list it in `docs/LAUNCH-CHECKLIST.md`.
- Hover lifts use the CSS `translate` property. `data-reveal` owns `transform` via an animation.
- **Performance:** put `data-reveal` on list containers, not items. No `backdrop-filter` over particle fields or on the fixed header. Load heavy embeds on demand (see `MapEmbed`). Keep particle work inside `scripts/particles.ts`, which self-throttles. See "Performance" in `docs/ARCHITECTURE.md`.
- `slot` is reserved in Astro templates, so don't use it as a prop name (speakers use `session`).
- Keep mobile working: check at 390px width as well as desktop.

## Commands

```
npm run dev       # dev server (or: npx astro dev --background / astro dev stop|status|logs)
npm run check     # astro check (types)
npm run build     # check + build to dist/
```

## Docs

`README.md` · `docs/CONTENT-GUIDE.md` · `docs/DESIGN-SYSTEM.md` · `docs/ARCHITECTURE.md` · `docs/DEPLOYMENT.md` · `docs/LAUNCH-CHECKLIST.md`

Astro reference: https://docs.astro.build
