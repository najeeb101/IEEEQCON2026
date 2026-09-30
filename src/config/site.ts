/**
 * SITE CONFIG — the single source of truth for edition-wide facts.
 *
 * Change the year, dates, venue, links and statuses here; every page reads from this file.
 * See docs/CONTENT-GUIDE.md for a walkthrough.
 */

/** 'open' shows the action button, 'soon' shows "Opening soon", 'closed' shows "Closed". */
export type Status = 'open' | 'soon' | 'closed';

export const site = {
  name: 'IEEE Q-Con',
  edition: 2026,
  /** Shown in the hero under the title. */
  kind: 'Student Conference',
  tagline: 'Innovate. Inspire. Excel.',
  description:
    'IEEE Q-Con is a nationwide student engineering conference in Qatar where undergraduates and graduates present research, showcase prototypes, and connect with academic and industry leaders.',
  organizer: 'IEEE Chapter at Texas A&M University at Qatar',

  event: {
    /** ISO 8601 with the Qatar offset (+03:00). Drives the countdown and structured data. */
    start: '2026-04-01T08:00:00+03:00',
    end: '2026-04-01T16:00:00+03:00',
    dateLabel: 'April 1, 2026',
    timeLabel: '8:00 AM – 4:00 PM',
    format: 'In person',
  },

  venue: {
    name: 'Qatar National Library',
    area: 'Education City',
    city: 'Doha',
    country: 'Qatar',
    /** Used for the embedded map and the "Get directions" button. */
    mapQuery: 'Qatar National Library, Education City, Doha, Qatar',
  },

  contact: {
    email: 'ieeeqcon@gmail.com',
  },

  socials: [
    { label: 'Instagram', handle: '@ieeeqcon', url: 'https://www.instagram.com/ieeeqcon', icon: 'instagram' },
  ] as const,

  registration: {
    status: 'open' as Status,
    /** Public Google Form link. The page embeds it when status is 'open'. */
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSdtKSSySb5cfqBjG1FW0sMLw2HstF86sHVpDRL1nEAP1kBWig/viewform',
  },

  sponsorship: {
    /** Link to a PDF prospectus. Leave empty to hide the download button. */
    prospectusUrl: '',
  },

  /** Official IEEE policy links shown in the footer of IEEE-branded sites. */
  ieeeLinks: [
    { label: 'IEEE', url: 'https://www.ieee.org' },
    { label: 'Privacy Policy', url: 'https://www.ieee.org/security-privacy.html' },
    { label: 'Nondiscrimination Policy', url: 'https://www.ieee.org/about/corporate/governance/p9-26.html' },
  ],
} as const;

/** "IEEE Q-Con 2026" */
export const fullName = `${site.name} ${site.edition}`;

/** "Qatar National Library, Education City, Doha, Qatar" */
export const venueLine = `${site.venue.name}, ${site.venue.area}, ${site.venue.city}, ${site.venue.country}`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.venue.mapQuery)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.venue.mapQuery)}&output=embed`;
