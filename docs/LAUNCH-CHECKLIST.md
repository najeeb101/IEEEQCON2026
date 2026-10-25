# Launch checklist

The site is set up for **IEEE Q-Con 2027** with the designer's new logo. Content from Q-Con 2026 (the day plan, tracks, requirements) carries over where it still applies. Dates, deadlines, the venue and speakers say "To be announced" until they're confirmed. The [content timeline](#content-timeline) lists when each update is due.

## Decisions needed

- [x] **Edition.** IEEE Q-Con 2027, the new edition starting in **mid-October**. Q-Con 2026 is listed under "Past editions" on the About page.
- [ ] **Edition dates.** Pending from the organizers. When they arrive, follow "Before the date is confirmed" in the [content guide](CONTENT-GUIDE.md#before-the-date-is-confirmed).
- [ ] **Venue.** Hidden until the official reveal (decided 2026-10-25). Then follow "Before the venue is announced" in the [content guide](CONTENT-GUIDE.md#before-the-venue-is-announced).
- [ ] **Domain.** The site runs at `najeeb101.github.io/IEEEQCON2026` for now. Decide whether to use a custom domain (see [deployment](DEPLOYMENT.md#option-a-github-pages-current)).
- [x] **Hosting.** GitHub Pages, deployed automatically from `main`.
- [x] **Registration form.** The page shows "Opening soon" until a 2027 form exists (decided). The 2026 form still accepts responses, so close it in Google Forms.
- [x] **Organizer wording.** "Organized by the IEEE student branches at TAMUQ, QU, HBKU and UDST" (decided 2026-10-25).
- [ ] **Attendee registration.** Does it open with the call for submissions, and is there a fee? Registration stays "Opening soon" until this is answered.
- [ ] **"Partner with us".** Whether to publish the expected audience and the sponsor tiers. The Sponsors page stays as it is until then.

## Content timeline

Website updates follow the team's media calendar. Each one goes live the same day as its Instagram post, never earlier, so reveals aren't spoiled. All dates are tentative.

| Date | Website update | Where | Waiting on |
| --- | --- | --- | --- |
| Nov 16 | Committee names and headshots | `data/community.ts` → `leadership`, `committees` | Lead and co-lead names and photos for all 8 committees (due Oct 31) |
| Nov 30 | Date and venue reveal: countdown on, map back | `config/site.ts` → `event`, `venue`, then `npm run og` | Date and venue (due Nov 15) |
| Dec 15 | Call for submissions opens: form links, track explanations, criteria for all three formats | `data/submissions.ts` → `tracks`, requirements, `importantDates`; `community.ts` → `announcements` | Poster, Prototype, Panel & Speakers committees |
| Dec 28 | Full poster criteria (template, eligibility, rubric, dates), if not in by Dec 15 | `posterRequirements`, `posterTemplateUrl` | Poster committee |
| Jan 11 | Full prototype criteria (team size, what to bring, space and power, rubric) | `prototypeEligibility`, `prototypeRequirements` | Prototype committee |
| Jan 25 | Technical presentation criteria (talk length, format, judging) | `presentationRequirements` | Panel & Speakers committee |
| Feb 1 | New Volunteer page: roles, perks, training date, sign-up link and deadline | new page | Student Engagement committee |
| Feb 15 | Close submissions (set each format's `status` to `'closed'`) | `data/submissions.ts` → `tracks` | — |
| Mar 1 | Sponsor logos | `data/community.ts` → `sponsorTiers` | Logos and tiers (Sponsorship) |
| Mar 15 | Announcement: acceptances are out | `data/community.ts` → `announcements` | — |
| Mar 22 | Speakers and panel topics | `data/program.ts` → `speakers` | Photos, titles and bios (Panel & Speakers) |
| Mar 29 | Final schedule | `data/program.ts` → `schedule`, `scheduleStatus: 'final'` | Final program (Ceremonies) |
| Apr 15 | Close registration | `config/site.ts` → `registration.status` | — |
| Apr 19 | "Know before you go" on the Venue page (parking, dress code, map) | `pages/venue.astro` | Logistics |
| After the event | Gallery page | new page | Photos |

Open points:

- The final program is due from Ceremonies on Mar 31, two days after the Mar 29 schedule reveal.
- If the conference runs over more than one day, the schedule needs a day-by-day layout, and the "A Full Day of Innovation" panel on the home page (`sections/DayFlow.astro`) needs new wording.

## Placeholders to fill

| Item | Where | Currently |
| --- | --- | --- |
| Conference date and time | `config/site.ts` → `event`, `data/program.ts` → `scheduleDate` | "Date to be announced"; countdown hidden |
| Venue | `config/site.ts` → `venue` (`name`, `area`, `mapQuery`) | "Venue to be announced"; map hidden. The 2026 values are in a comment. |
| Submission deadlines | `data/submissions.ts` → `importantDates`, `formatDates`, `tracks[].deadline` | "To be announced" |
| Registration form | `config/site.ts` → `registration` (`formUrl`, `status`) | "Opening soon". The 2026 form link is kept in a comment. |
| Poster and Technical Presentations forms | `data/submissions.ts` → `tracks` (`formUrl`, `status`) | "Opening soon". The 2026 abstract form link is kept in a comment. |
| Prototype competition form | `data/submissions.ts` → `tracks` | "Opening soon" |
| 2027 competition criteria | `data/submissions.ts` → requirement lists and `rulesYear` | Q-Con 2026 rules with a "Last year's rules" note; talk format empty |
| Schedule | `data/program.ts` → `schedule`, `scheduleStatus` | Tentative, following the 2026 day plan |
| Keynote speakers and panelists | `data/program.ts` → `speakers` | All "To be announced" |
| Speaker photos, affiliations, bios | `data/program.ts` → `speakers` | None yet |
| Announcements | `data/community.ts` → `announcements` | Phase 1 items: the edition, the committees, the three formats. No dates. |
| Committee names, photos | `data/community.ts` → `leadership`, `committees` | Role names only, "To be announced" |
| Sponsors and logos | `data/community.ts` → `sponsorTiers` | Empty tiers with "Your logo here" slots |
| University / IEEE branch logos | `data/community.ts` → `organizers` | University names as wordmarks |
| Sponsorship prospectus PDF | `config/site.ts` → `sponsorship.prospectusUrl` | Hidden |
| A1 poster template link | `data/submissions.ts` → `posterTemplateUrl` | "Will be posted here" |
| Session rooms | `data/program.ts` → `schedule[].location` | Not shown |

## Facts to confirm

These appear on the site. They come from the old sites, but should be re-checked for each edition:

- [ ] Institutions named in the keynote copy: QSTP, QCRI, QEERI, HBKU
- [ ] Contact email `ieeeqcon@gmail.com` and Instagram `@ieeeqcon`
- [ ] "In person" format
- [ ] The "at a glance" numbers in `data/program.ts` (two award categories: undergraduate and graduate)
- [ ] Past editions entry for 2026 (date, venue, keynote) in `data/program.ts` → `pastEditions`
- [ ] IEEE brand usage. If you add the IEEE master logo, follow the IEEE brand guidelines. The footer links to IEEE's privacy and nondiscrimination policies.

## Technical

- [ ] `npm run build` passes (it runs type checks first)
- [ ] Tested on iPhone/Android and on desktop Chrome, Safari and Firefox
- [ ] Links in announcements and CTAs point to live pages or forms
- [ ] Link preview checked after deploying (paste the URL into WhatsApp or LinkedIn's Post Inspector)
- [ ] Analytics (optional): decide on Google Analytics, a privacy-friendly option, or none
