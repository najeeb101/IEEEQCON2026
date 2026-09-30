# Launch checklist

The site is seeded with the **real content of IEEE Q-Con 2026** from the Wix site. Anything the old sites didn't have is a clearly marked placeholder. Work through this list before going live.

## Decisions needed

- [x] **Edition.** The site is for the new edition starting in **mid-October**. The site still shows the 2026 content until the dates arrive.
- [ ] **Edition dates.** Pending from the organizers. When they arrive, follow "Starting a new edition" in the [content guide](CONTENT-GUIDE.md).
- [ ] **Domain.** Custom domain, or `github.io`? Sets `SITE_URL` (see [deployment](DEPLOYMENT.md)).
- [ ] **Hosting.** GitHub Pages, Vercel/Netlify, or a university/IEEE server.
- [ ] **Registration form.** Keeping the existing Google Form for now (decided). It still accepts responses, so revisit before launch.

## Placeholders to fill

| Item | Where | Currently |
| --- | --- | --- |
| Committee names, roles, photos | `data/community.ts` → `committee` | Role names only, "To be announced" |
| Keynote #2 and panelists | `data/program.ts` → `speakers` | "To be announced" |
| Speaker photos, affiliations, bios | `data/program.ts` → `speakers` | Initials only for Sara El-Sallabi |
| Sponsors and logos | `data/community.ts` → `sponsorTiers` | Empty tiers with "Your logo here" slots |
| Organizer logo (IEEE / TAMUQ chapter) | `data/community.ts` → `organizers[].logo` | Text wordmark |
| Sponsorship prospectus PDF | `config/site.ts` → `sponsorship.prospectusUrl` | Hidden |
| A1 poster template link | `data/submissions.ts` → `posterTemplateUrl` | "Will be posted here" |
| Prototype competition dates and form | `data/submissions.ts` → `prototypeDates`, `tracks` | TBD / "Opening soon" |
| Session rooms | `data/program.ts` → `schedule[].location` | Not shown |
| New logo for the edition year | `public/brand/*` | 2026 artwork |
| Social preview image | `public/brand/og-image.png` | 2026 artwork |

## Facts to confirm

These appear on the site. They come from the old sites, but should be re-checked for each edition:

- [ ] Organizer wording: "IEEE Chapter at Texas A&M University at Qatar"
- [ ] Institutions named in the keynote copy: QSTP, QCRI, QEERI, HBKU
- [ ] Contact email `ieeeqcon@gmail.com` and Instagram `@ieeeqcon`
- [ ] Event time 8:00 AM – 4:00 PM and "In person" format
- [ ] Conference themes (three) and the "at a glance" numbers in `data/program.ts`
- [ ] IEEE brand usage. If you add the IEEE master logo, follow the IEEE brand guidelines. The footer links to IEEE's privacy and nondiscrimination policies.

## Technical

- [ ] `npm run build` passes (it runs type checks first)
- [ ] Tested on iPhone/Android and on desktop Chrome, Safari and Firefox
- [ ] Links in announcements and CTAs point to live pages or forms
- [ ] Analytics (optional): decide on Google Analytics, a privacy-friendly option, or none
