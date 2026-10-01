# Launch checklist

The site is set up for **IEEE Q-Con 2027** with the designer's new logo. Content from Q-Con 2026 (the day plan, tracks, requirements and themes) carries over where it still applies. Dates, deadlines and speakers say "To be announced" until they're confirmed. Work through this list before going live.

## Decisions needed

- [x] **Edition.** IEEE Q-Con 2027, the new edition starting in **mid-October**. Q-Con 2026 is listed under "Past editions" on the About page.
- [ ] **Edition dates.** Pending from the organizers. When they arrive, follow "Before the date is confirmed" in the [content guide](CONTENT-GUIDE.md#before-the-date-is-confirmed).
- [ ] **Domain.** The site runs at `najeeb101.github.io/IEEEQCON2026` for now. Decide whether to use a custom domain (see [deployment](DEPLOYMENT.md#option-a-github-pages-current)).
- [x] **Hosting.** GitHub Pages, deployed automatically from `main`.
- [x] **Registration form.** The page shows "Opening soon" until a 2027 form exists (decided). The 2026 form still accepts responses, so close it in Google Forms.

## Placeholders to fill

| Item | Where | Currently |
| --- | --- | --- |
| Conference date and time | `config/site.ts` → `event`, `data/program.ts` → `scheduleDate` | "Date to be announced"; countdown hidden |
| Submission deadlines | `data/submissions.ts` → `importantDates`, `researchDates`, `prototypeDates`, `tracks[].deadline` | "To be announced" |
| Registration form | `config/site.ts` → `registration` (`formUrl`, `status`) | "Opening soon". The 2026 form link is kept in a comment. |
| Research & poster submission form | `data/submissions.ts` → `tracks` (research `formUrl`, `status`) | "Opening soon". The 2026 form link is kept in a comment. |
| Prototype competition form | `data/submissions.ts` → `tracks` | "Opening soon" |
| Schedule | `data/program.ts` → `schedule`, `scheduleStatus` | Tentative, following the 2026 day plan |
| Keynote speakers and panelists | `data/program.ts` → `speakers` | All "To be announced" |
| Speaker photos, affiliations, bios | `data/program.ts` → `speakers` | None yet |
| Announcements | `data/community.ts` → `announcements` | General "coming soon" items. Replace with real news when the call opens. |
| Committee names, roles, photos | `data/community.ts` → `committee` | Role names only, "To be announced" |
| Sponsors and logos | `data/community.ts` → `sponsorTiers` | Empty tiers with "Your logo here" slots |
| Organizer logo (IEEE / TAMUQ chapter) | `data/community.ts` → `organizers[].logo` | Text wordmark |
| Sponsorship prospectus PDF | `config/site.ts` → `sponsorship.prospectusUrl` | Hidden |
| A1 poster template link | `data/submissions.ts` → `posterTemplateUrl` | "Will be posted here" |
| Session rooms | `data/program.ts` → `schedule[].location` | Not shown |

## Facts to confirm

These appear on the site. They come from the old sites, but should be re-checked for each edition:

- [ ] Organizer wording: "IEEE Chapter at Texas A&M University at Qatar"
- [ ] Institutions named in the keynote copy: QSTP, QCRI, QEERI, HBKU
- [ ] Contact email `ieeeqcon@gmail.com` and Instagram `@ieeeqcon`
- [ ] "In person" format and the venue (Qatar National Library)
- [ ] Conference themes (three) and the "at a glance" numbers in `data/program.ts`
- [ ] Past editions entry for 2026 (date, venue, keynote) in `data/program.ts` → `pastEditions`
- [ ] IEEE brand usage. If you add the IEEE master logo, follow the IEEE brand guidelines. The footer links to IEEE's privacy and nondiscrimination policies.

## Technical

- [ ] `npm run build` passes (it runs type checks first)
- [ ] Tested on iPhone/Android and on desktop Chrome, Safari and Firefox
- [ ] Links in announcements and CTAs point to live pages or forms
- [ ] Link preview checked after deploying (paste the URL into WhatsApp or LinkedIn's Post Inspector)
- [ ] Analytics (optional): decide on Google Analytics, a privacy-friendly option, or none
