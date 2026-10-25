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
  /** Reads after "organized by the". The universities themselves are listed in `universities` below. */
  organizer: 'IEEE student branches at TAMUQ, QU, HBKU and UDST',

  /** The universities behind Q-Con (organizer tiles, "at a glance" band). */
  universities: [
    { short: 'TAMUQ', name: 'Texas A&M University at Qatar' },
    { short: 'QU', name: 'Qatar University' },
    { short: 'HBKU', name: 'Hamad Bin Khalifa University' },
    { short: 'UDST', name: 'University of Doha for Science and Technology' },
  ],

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
    /**
     * Leave `name` empty until the venue is announced: the site then says "Venue to be announced"
     * and hides the map. The 2026 venue was Qatar National Library, Education City, with
     * mapQuery 'Qatar National Library, Education City, Doha, Qatar'.
     */
    name: '' as string,
    area: '' as string,
    city: 'Doha',
    country: 'Qatar',
    /** Used for the embedded map and the "Get directions" button. */
    mapQuery: '' as string,
  },

  contact: {
    email: 'ieeeqcon@gmail.com',
  },

  socials: [
    { label: 'Instagram', handle: '@ieeeqcon', url: 'https://www.instagram.com/ieeeqcon', icon: 'instagram' },
  ] as const,

  registration: {
    status: 'soon' as Status,
    /**
     * Public Google Form link. The page embeds it when status is 'open'.
     * The 2026 form was https://docs.google.com/forms/d/e/1FAIpQLSdtKSSySb5cfqBjG1FW0sMLw2HstF86sHVpDRL1nEAP1kBWig/viewform.
     * Add the new edition's form and set status to 'open'.
     */
    formUrl: '' as string,
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

/** True once the venue is set. */
export const hasVenue = Boolean(site.venue.name);

/** "Qatar National Library", or "Venue to be announced" */
export const venueText = site.venue.name || 'Venue to be announced';

/** "Qatar National Library, Doha", or "Doha, Qatar" while the venue is unannounced */
export const venueShort = hasVenue ? `${site.venue.name}, ${site.venue.city}` : `${site.venue.city}, ${site.venue.country}`;

/** "Qatar National Library, Education City, Doha, Qatar", or "Venue to be announced" */
export const venueLine = hasVenue
  ? [site.venue.name, site.venue.area, site.venue.city, site.venue.country].filter(Boolean).join(', ')
  : venueText;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.venue.mapQuery)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.venue.mapQuery)}&output=embed`;
