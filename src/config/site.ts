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
  edition: 2027,
  /** Shown in the hero under the title. */
  kind: 'Student Conference',
  tagline: 'Innovate. Inspire. Excel.',
  description:
    'IEEE Q-Con is a nationwide student engineering conference in Qatar where undergraduates and graduates present research, showcase prototypes, and connect with academic and industry leaders.',
  organizer: 'IEEE Chapter at Texas A&M University at Qatar',

  event: {
    /**
     * ISO 8601 with the Qatar offset, e.g. '2027-04-01T08:00:00+03:00'. Drives the countdown and
     * structured data. Leave null (and the labels empty) until the date is confirmed: the site then
     * says "To be announced" and hides the countdown.
     */
    start: null as string | null,
    end: null as string | null,
    /** e.g. 'April 1, 2027' */
    dateLabel: '' as string,
    /** e.g. '8:00 AM – 4:00 PM' */
    timeLabel: '' as string,
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

/** "IEEE Q-Con 2027" */
export const fullName = `${site.name} ${site.edition}`;

export const TBA = 'To be announced';

/** True once the conference date is set. */
export const hasDate = Boolean(site.event.start);

/** "April 1, 2027", or "Date to be announced" */
export const dateText = site.event.dateLabel || 'Date to be announced';

/** "8:00 AM – 4:00 PM", or "Time to be announced" */
export const timeText = site.event.timeLabel || 'Time to be announced';

/** "Qatar National Library, Education City, Doha, Qatar" */
export const venueLine = `${site.venue.name}, ${site.venue.area}, ${site.venue.city}, ${site.venue.country}`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.venue.mapQuery)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.venue.mapQuery)}&output=embed`;
