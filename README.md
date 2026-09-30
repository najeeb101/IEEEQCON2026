# IEEE Q-Con — Conference Website

The official website of **IEEE Q-Con**, the nationwide student engineering conference in Qatar, organized by the IEEE Chapter at Texas A&M University at Qatar.

It merges the two sites the team built last year:

| Reference | What we kept |
| --- | --- |
| [Q-Con 2026 (Wix)](https://ieeeqcon.wixsite.com/my-site) | **The look.** Dark theme, steel-blue accent, particle-wave visuals, hairline split panels, small-caps headings, the logo. |
| [IECON 2026 (WordPress)](https://www.iecon2026.org) | **The structure.** Dropdown navigation, nested pages, announcements carousel, dates timeline, speaker and committee grids, sponsor tiers, volunteer calls. |

Built with [Astro](https://astro.build): a static site, with no server or database to run, that is fast on phones and free to host.

## Quick start

Requires **Node.js 22.12+**.

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run check` | Type-checks every page, component and data file |
| `npm run build` | Checks, then builds the static site into `dist/` |
| `npm run preview` | Serves the built `dist/` locally |

## Where things live

```
src/
  config/site.ts         ← edition year, dates, venue, contact, form links, open/closed statuses
  config/navigation.ts   ← header menu, mobile menu, footer columns
  data/                  ← all page content (program, schedule, speakers, dates, committee, sponsors…)
  styles/tokens.css      ← the theme: every color, font, size, radius and shadow
  components/            ← layout, reusable UI, and page sections
  pages/                 ← one file per URL
public/brand/            ← logos, favicons, social-share image
docs/                    ← the documentation below
```

**Most updates only touch `src/config/` and `src/data/`.** No HTML required.

## Documentation

| Doc | Read it when… |
| --- | --- |
| [Content guide](docs/CONTENT-GUIDE.md) | You need to change dates, add a speaker, post an announcement, add a sponsor logo… |
| [Design system](docs/DESIGN-SYSTEM.md) | You're building or restyling anything and need to stay on-theme |
| [Architecture](docs/ARCHITECTURE.md) | You want to understand how the site is put together, or add a page or section |
| [Deployment](docs/DEPLOYMENT.md) | It's time to put the site online |
| [Launch checklist](docs/LAUNCH-CHECKLIST.md) | Before going live: placeholders to fill and facts to confirm |

## Site map

```
/                                   Home
/about/                             About Q-Con
/about/organizing-committee/        Organizing Committee
/submissions/                       Call for Submissions
/submissions/research-and-posters/  Research & Poster Submissions
/submissions/prototype-competition/ Prototype & Innovation Competition
/program/schedule/                  Conference Schedule   (/program redirects here)
/program/speakers/                  Keynotes & Panel
/sponsors/                          Sponsors & Partners
/venue/                             Venue
/registration/                      Registration
```
