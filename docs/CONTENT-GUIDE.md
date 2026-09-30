# Content guide

How to update the site without touching design or layout. Everything here is an edit to a file in `src/config/` or `src/data/`.

**Workflow:**
1. Run `npm run dev` and open http://localhost:4321.
2. Edit the file. The browser refreshes on save.
3. Run `npm run check`. It catches typos, such as a status spelled `"opne"` or a missing comma, before they reach the live site.

> Text goes inside quotes: `'like this'`. If your text contains an apostrophe, use the curly one (’) or wrap the text in backticks: `` `it's fine` ``.

---

## Starting a new edition (e.g. 2027)

Everything year-specific lives in **`src/config/site.ts`**:

```ts
edition: 2027,
event: {
  start: '2027-04-07T08:00:00+03:00',   // drives the countdown. Keep +03:00 (Doha time)
  end:   '2027-04-07T16:00:00+03:00',
  dateLabel: 'April 7, 2027',           // how the date is written on the page
  timeLabel: '8:00 AM – 4:00 PM',
  format: 'In person',
},
venue: { name: 'Qatar National Library', area: 'Education City', city: 'Doha', country: 'Qatar', mapQuery: '…' },
```

Then work through:
- `src/data/submissions.ts`: important dates, track deadlines, statuses, form links
- `src/data/program.ts`: `scheduleDate`, schedule, speakers
- `src/data/community.ts`: announcements, committee, sponsors
- `public/brand/`: the logo files contain the year ("2026"), so replace them with the new artwork (same file names). See [Logos & images](#logos--images).

## Statuses: open, opening soon, closed

Registration and each submission track have a `status`:

| Value | What visitors see |
| --- | --- |
| `'open'` | The **Submit now** / registration form is shown (a form link is required) |
| `'soon'` | An "Opening soon" badge |
| `'closed'` | A "Closed" badge |

- Registration: `site.registration.status` and `formUrl` in `src/config/site.ts`. When open, the Google Form is embedded on `/registration/`. Paste the normal `…/viewform` link; the page adds the embed settings itself.
- Tracks: `tracks[].status`, `formUrl` and `deadline` in `src/data/submissions.ts`.

> Statuses change only when you edit them. The site doesn't flip them automatically at a deadline. Past dates on the timeline *do* dim automatically.

## Important dates

`src/data/submissions.ts` → `importantDates` (home and Call for Submissions), plus `researchDates` and `prototypeDates` for the track pages.

```ts
{ label: 'Abstract submission deadline', date: '2027-02-15', track: 'Research & Posters' },
{ label: 'Prototype submission deadline', date: null, track: 'Prototype Competition' },   // null shows "TBD"
{ label: 'Conference day, evaluation & awards', date: '2027-04-07', milestone: true },    // highlighted
```

Dates are `YYYY-MM-DD`. The next upcoming date gets a "Next" badge automatically.

## Announcements (home carousel)

`src/data/community.ts` → `announcements`. The first item shows first. Keep 2–5 items.

```ts
{
  tag: 'Program',
  title: 'Keynote speakers announced',
  body: 'One or two sentences.',
  cta: { label: 'Meet the speakers', href: '/program/speakers/' },   // optional
},
```

## Schedule

`src/data/program.ts` → `schedule`. Times are 24-hour, Doha time.

```ts
{ start: '09:10', end: '09:40', title: 'Keynote #1', kind: 'keynote', speaker: 'Name', location: 'Auditorium' },
```

`kind` controls the color and label: `arrival`, `ceremony`, `keynote`, `session`, `block`, `break`, `panel` or `networking`. Add `location` once rooms are known. A `block` can list `parts` (see the Innovation Block).

## Speakers

`src/data/program.ts` → `speakers`.

```ts
{
  name: 'Dr. Jane Doe',
  role: 'Keynote Speaker',
  session: 'Keynote #1 · 9:10 AM',
  affiliation: 'Qatar Computing Research Institute',
  bio: 'Short biography…',             // adds a "Read more" button with a pop-up
  photo: '/people/jane-doe.jpg',       // optional, file in public/people/
},
```

Use `tba: true` with `name: 'To be announced'` for placeholders.

## Organizing committee

`src/data/community.ts` → `committee`. Groups contain members. Leave `name: ''` to show "To be announced".

```ts
{ title: 'General Chairs', members: [{ name: 'Name Surname', role: 'General Chair', affiliation: 'TAMUQ', photo: '/people/name.jpg' }] },
```

## Sponsors & organizers

`src/data/community.ts`:

```ts
export const organizers = [{ name: 'IEEE Chapter at Texas A&M University at Qatar', logo: '/logos/ieee-tamuq.png', url: 'https://…' }];

export const sponsorTiers = [
  { tier: 'Gold', sponsors: [{ name: 'Company', logo: '/logos/company.svg', url: 'https://company.com' }], placeholders: 2 },
];
```

- While a tier has no sponsors, the Sponsors page shows `placeholders` dashed "Your logo here" slots. The home page shows a "Partner with us" invitation until at least one sponsor exists.
- Logos sit on a light tile, so full-color logos work. SVG or PNG with a transparent background is best.
- To offer a PDF prospectus, put it in `public/` and set `site.sponsorship.prospectusUrl: '/sponsorship-prospectus.pdf'`.

## Logos & images

- Put images in `public/` (for example `public/people/`, `public/logos/`) and reference them from the site root: `'/people/jane.jpg'`.
- Portraits: square, at least 400×400, face centered. They're cropped to a circle.
- Brand files in `public/brand/`:

| File | Used for |
| --- | --- |
| `qcon-logo-white.png` | Header, footer, panels (dark backgrounds) |
| `qcon-logo-color.png` | Available for light backgrounds and print |
| `qcon-mark-white.png` | The "Q" in page heroes and on the 404 page |
| `qcon-mark-color.png`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Browser and phone icons |
| `og-image.png` | Link preview on WhatsApp, LinkedIn, X (1200×630) |

## Contact, socials, menus

- Email and Instagram: `site.contact` and `site.socials` in `src/config/site.ts`. Adding a LinkedIn entry with `icon: 'linkedin'` shows it in the footer.
- Menus: `src/config/navigation.ts`. The same file drives the desktop dropdowns, the mobile menu and the footer columns.

## Wording on fixed sections

Some longer copy lives in the section components themselves, because it's part of the page design rather than list data:

| Text | File |
| --- | --- |
| Home overview paragraph | `src/components/sections/Overview.astro` |
| "A full day of innovation" paragraph | `src/components/sections/DayFlow.astro` |
| Closing call to action | `src/components/sections/FinalCta.astro` |
| About page mission and "What is IEEE Q-Con?" | `src/pages/about/index.astro` |
| Page intros (the `lead` text under each title) | the page file in `src/pages/` |

Edit the words between the tags. Leave the tags and `class="…"` attributes alone.
