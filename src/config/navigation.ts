/**
 * NAVIGATION — header menu, mobile menu and footer columns.
 * Paths are written from the site root; `url()` adds the deployment base path.
 */

export interface NavLink {
  label: string;
  href: string;
  /** One-line hint shown under the label in dropdowns. */
  description?: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
  /** Only shown in the mobile menu (the logo already links home on desktop). */
  mobileOnly?: boolean;
}

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/', mobileOnly: true },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About Q-Con', href: '/about/', description: 'Mission, themes and who can take part' },
      { label: 'Organizing Committee', href: '/about/organizing-committee/', description: 'The team behind the conference' },
    ],
  },
  {
    label: 'Submissions',
    href: '/submissions/',
    children: [
      { label: 'Call for Submissions', href: '/submissions/', description: 'Formats, tracks and key dates' },
      { label: 'Poster Competition', href: '/submissions/poster-competition/', description: 'Abstracts and research posters' },
      { label: 'Prototype Competition', href: '/submissions/prototype-competition/', description: 'Show what you have built' },
      { label: 'Technical Presentations', href: '/submissions/technical-presentations/', description: 'Present your research as a talk' },
    ],
  },
  {
    label: 'Program',
    href: '/program/schedule/',
    children: [
      { label: 'Schedule', href: '/program/schedule/', description: 'The full day, hour by hour' },
      { label: 'Speakers', href: '/program/speakers/', description: 'Keynotes and panelists' },
    ],
  },
  { label: 'Sponsors', href: '/sponsors/' },
  { label: 'Venue', href: '/venue/' },
];

export const navCta: NavLink = { label: 'Register', href: '/registration/' };

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Conference',
    links: [
      { label: 'About Q-Con', href: '/about/' },
      { label: 'Organizing Committee', href: '/about/organizing-committee/' },
      { label: 'Sponsors', href: '/sponsors/' },
      { label: 'Venue', href: '/venue/' },
    ],
  },
  {
    title: 'Participate',
    links: [
      { label: 'Call for Submissions', href: '/submissions/' },
      { label: 'Poster Competition', href: '/submissions/poster-competition/' },
      { label: 'Prototype Competition', href: '/submissions/prototype-competition/' },
      { label: 'Technical Presentations', href: '/submissions/technical-presentations/' },
      { label: 'Registration', href: '/registration/' },
    ],
  },
  {
    title: 'Program',
    links: [
      { label: 'Schedule', href: '/program/schedule/' },
      { label: 'Speakers', href: '/program/speakers/' },
    ],
  },
];
