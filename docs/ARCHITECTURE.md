# Architecture

## Stack and why

| Choice | Why |
| --- | --- |
| **Astro 7, static output** | A conference site is content that changes a few times a month. Static HTML is the fastest option on phones, has nothing to hack or patch, and hosts free on GitHub Pages, Vercel or Netlify. The old sites needed Wix (paid, ads) or WordPress (plugins, updates). |
| **Plain CSS with design tokens** | The theme sits in one file (`tokens.css`) and components use scoped `<style>` blocks. No Tailwind or CSS framework to learn. |
| **TypeScript data files** for content | Content is typed. A typo such as a missing date or wrong status fails `npm run check` instead of breaking the live page. |
| **Vanilla JS, no UI framework** | The interactive parts (menu, carousel, countdown, particles, dialogs) are small, so each component ships its own `<script>`, which Astro bundles and loads once. |
| **Self-hosted fonts** (`@fontsource`) | No third-party font requests. Works offline and avoids privacy banners. |

## Directory layout

```
astro.config.mjs            site URL, base path, sitemap, redirects
src/
├─ config/
│  ├─ site.ts               edition-wide facts + statuses (single source of truth)
│  └─ navigation.ts         header/mobile/footer menus
├─ data/
│  ├─ program.ts            highlights, themes, stats, schedule, speakers
│  ├─ submissions.ts        tracks, requirements, important dates
│  ├─ community.ts          announcements, committee, organizers, sponsors, get-involved cards
│  ├─ brand.ts              media kit: logo groups, colors, fonts, usage rules
│  └─ brand-kit.json        logo file sizes, written by `npm run brand`
├─ styles/
│  ├─ tokens.css            design tokens (the theme)
│  └─ global.css            reset, base typography, utilities, reveal animation
├─ layouts/
│  ├─ BaseLayout.astro      <head>/SEO/social/icons/fonts + Header + Footer + reveal script
│  └─ PageLayout.astro      BaseLayout + PageHero, used by every inner page
├─ components/
│  ├─ layout/               Header, Footer, PageHero, BackToTop
│  ├─ ui/                   reusable building blocks (Button, Icon, cards, timeline, map…)
│  └─ sections/             full-width page sections (Hero, Overview, Themes, KeyDates…)
├─ scripts/particles.ts     generative particle backgrounds (canvas)
├─ lib/
│  ├─ url.ts                base-path-aware links, active-link detection
│  └─ format.ts             date/time formatting in Doha time, initials
└─ pages/                   file-based routes (one file = one URL)
public/brand/               logos, favicons, og-image.png, media kit files (all generated)
brand-source/               the designer's logo masters
scripts/
├─ brand-assets.mjs         npm run brand: logos, icons and media kit files from brand-source/
└─ og-image.mjs             npm run og: the link preview image
```

### Layers and rules

```
pages  →  sections  →  ui  →  tokens.css
  ↓          ↓         ↓
     config/ + data/   (content only, no markup)
```

1. **Pages** compose sections and pass data. They hold page-specific layout only.
2. **Sections** are self-contained bands of a page. They read from `data/` and `config/` directly.
3. **UI components** receive everything through props. They never import content.
4. **Content never contains HTML or styling.** If content needs a new visual treatment, add a prop or component.
5. **Every internal link goes through `url()`** (or `Button`/`FactGrid`, which call it), so the site works when deployed under a sub-path.

## How the two reference sites were merged

### Page map

| Page | Structure from | Look from |
| --- | --- | --- |
| Home | IECON (announcements, overview, stats, dates, speakers, partners, volunteer calls) | Q-Con (hero, staggered cards, "Full day" panel, "When and Where?", closing globe CTA) |
| About | Q-Con About page, plus past editions | Q-Con |
| Media Kit | New: logo downloads, colors, fonts, usage rules | Q-Con |
| Organizing Committee | IECON `/about/organizing-committee/` (grouped circular portraits) | Q-Con colors |
| Call for Submissions | IECON Call for Papers (intro + tracks + sticky dates sidebar) | Q-Con |
| Research & Posters, Prototype Competition | Q-Con Submissions page (status column + requirements) | Q-Con |
| Schedule | Q-Con Schedule rows + IECON program color-coding legend | Q-Con |
| Speakers | IECON Keynote Speakers (portrait grid + "Read more") | Q-Con colors |
| Sponsors | IECON exhibitors/partners grid + sponsorship CTA | Q-Con |
| Venue | IECON Hotel/Travel → Venue, reduced to what a one-day local event needs | Q-Con "When and Where?" |
| Registration | Q-Con Registration (embedded Google Form) | Q-Con |

### Home page, top to bottom

| # | Section | Component |
| --- | --- | --- |
| 1 | Hero: title, tagline, date/venue chips, actions, countdown | `sections/Hero` |
| 2 | Announcements carousel (overlaps the hero) | `sections/Announcements` |
| 3 | Overview panel + four staggered feature cards | `sections/Overview` |
| 4 | "At a glance" numbers | `sections/Stats` |
| 5 | Conference themes (light band) | `sections/Themes` |
| 6 | "A full day of innovation" + key moments | `sections/DayFlow` |
| 7 | Important dates + globe | `sections/KeyDates` |
| 8 | Keynotes & panel | `sections/SpeakersPreview` |
| 9 | When and Where? + map | `sections/WhenWhere` |
| 10 | Organized by / sponsors or "Partner with us" | `sections/Partners` |
| 11 | Get involved (follow, judge, volunteer) | `sections/GetInvolved` |
| 12 | Closing CTA with particle globe | `sections/FinalCta` |

### Improvements over the originals

- Fixed the Q-Con mobile header, where the logo and the Register button overlapped.
- Removed IECON's page-blocking popup. The announcement lives in the carousel instead.
- Replaced Wix stock backgrounds, which are licensed for Wix sites only, with code-drawn particle fields. They're lighter and animated, and they pause off-screen.
- Added a countdown, live "next deadline" highlighting, a schema.org Event for search engines, social-share cards, a sitemap, a skip link and keyboard-accessible menus.

## Client-side behavior

| Feature | Where | Notes |
| --- | --- | --- |
| Header scroll state, dropdowns, mobile menu | `layout/Header.astro` | Dropdowns open on hover (mouse) or click/Enter (touch, keyboard). Escape closes. The mobile menu is `inert` when closed. |
| Scroll reveal | `layouts/BaseLayout.astro` + `global.css` | Only elements that start *below the fold* are hidden (`.reveal-pending`), so first paint never waits for JS and nothing is hidden without JS. |
| Announcements carousel | `sections/Announcements.astro` | The 7s timer is a CSS animation on the progress bar, and its `animationend` advances the slide, so there is no per-frame JavaScript. Pauses on hover, focus and when off screen. Supports arrow keys and swipe. No autoplay with reduced motion. |
| Countdown | `ui/Countdown.astro` | Reads `site.event.start`/`end`. Shows "Happening now" during the event and a thank-you after. Until a date is set, a "coming soon" line takes its place. |
| Date timeline states | `ui/DateTimeline.astro` | Past/next are computed in the visitor's browser, so they stay right without a rebuild. |
| Particle fields | `scripts/particles.ts` | See [Performance](#performance). |
| Venue map | `ui/MapEmbed.astro` | Placeholder first. The Google Maps iframe loads only when the visitor taps "Show interactive map". |
| Link prefetch | `astro.config.mjs` → `prefetch` | Pages are fetched on hover or focus, so navigation feels instant. |
| Speaker bio dialog | `ui/PersonCard.astro` | Native `<dialog>`. Closes on Escape or backdrop click. |

## Performance

Measured with Playwright on a production build (`npm run build`, then `npm run preview`) at 1440px, and at 390px with the CPU throttled 4× to stand in for a mid-range phone:

| Phone profile | Before | After |
| --- | --- | --- |
| Home page scroll | 12 fps, 14.4s of blocked main thread | 49 fps, 0.2s |
| About page scroll | 19 fps | 53 fps |
| Home largest paint | 1.7s | 1.2s |

What keeps it smooth, and should be kept:

- **Particle fields** (`scripts/particles.ts`) animate only while on screen, at the field's `fps` (30 for heroes, 20 for panels, max 24 on phones). They **hold still while the page scrolls**, render at no more than 1.5× pixel density, draw tiny dots as rectangles, and **step their particle count down** when frames cost more than 8ms. On very slow devices they fall back to a still frame. Off-screen canvases are hidden. Reduced motion and Data Saver get one still frame.
- **No `backdrop-filter` blur over animated areas or on the fixed header.** A blur has to be recomputed every frame. Use a solid color with ~95% opacity instead.
- **Reveal lists as one block.** Put `data-reveal` on the list or grid container (timeline, schedule, stats, themes, facts), not on each item. Each revealed element becomes its own GPU layer while it animates.
- **Heavy third-party embeds load on demand** (the map). Registration is the exception, because there the form is the whole point of the page.
- **Fonts:** the three faces used above the fold are preloaded in `BaseLayout`. Every face is self-hosted.

## SEO and sharing

- `BaseLayout` sets the title pattern `Page | IEEE Q-Con 2027`, meta description, canonical URL, Open Graph and Twitter card tags, and theme color.
- The home page adds schema.org `Event` JSON-LD (dates, venue, organizer) once `site.event.start` is set.
- `@astrojs/sitemap` generates `sitemap-index.xml`. **It needs `SITE_URL` set at build time** (see [DEPLOYMENT.md](DEPLOYMENT.md)).
- The social preview image is `public/brand/og-image.png` (1200×630). `npm run og` rebuilds it from the logo and `site.ts` with the site's fonts, tokens and particle wave. Rerun it when the logo, year, date or venue changes.

## Adding things

**A new page:** create `src/pages/<path>.astro` using `PageLayout`, then add it to `config/navigation.ts` (menu and footer).

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
---
<PageLayout title="FAQ" lead="Answers to common questions." crumbs={[{ label: 'FAQ' }]}>
  <section class="section"><div class="container">…</div></section>
</PageLayout>
```

**A new home section:** create it in `components/sections/`, build it from `ui/` parts and tokens, then place it in `pages/index.astro`.

**A new content type:** add a typed array to the matching `data/*.ts` file (export an `interface`), then render it from a section.
