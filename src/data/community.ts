/**
 * PEOPLE, PARTNERS & CALLS TO ACTION — announcements, committee, sponsors and "get involved" cards.
 */
import type { IconName } from '../components/ui/icons';
import { site } from '../config/site';

export interface Announcement {
  tag: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
}

/** Rotating announcements card on the home page. First item shows first. */
export const announcements: Announcement[] = [
  {
    tag: `Q-Con ${site.edition}`,
    title: `${site.name} ${site.edition} is on its way`,
    body: 'Qatar’s student engineering conference is back, organized by the IEEE student branches at TAMUQ, QU, HBKU and UDST. The date and venue will be announced here and on Instagram.',
    cta: { label: `Follow ${site.socials[0].handle}`, href: site.socials[0].url },
  },
  {
    tag: 'Organizing Committee',
    title: 'Meet the team soon',
    body: 'Eight student committees are planning this year’s conference. Their leads will be introduced on Instagram and on the committee page.',
    cta: { label: 'Organizing Committee', href: '/about/organizing-committee/' },
  },
  {
    tag: 'Competitions',
    title: 'Three ways to compete',
    body: 'Enter the Poster Competition, the Prototype Competition or Technical Presentations, in energy, healthcare or smart infrastructure. The criteria are posted when the call opens.',
    cta: { label: 'Competition formats', href: '/submissions/' },
  },
  {
    tag: 'Get Involved',
    title: 'Volunteer, judge or sponsor',
    body: 'Students can join the organizing team, faculty and industry experts can judge posters and prototypes, and organizations can sponsor the day.',
    cta: { label: 'Sponsorship', href: '/sponsors/' },
  },
];

export interface Member {
  name: string;
  role: string;
  affiliation?: string;
  photo?: string;
}

export interface CommitteeGroup {
  title: string;
  members: Member[];
}

/** Leave `name` empty to show "To be announced". */
export const leadership: CommitteeGroup[] = [
  { title: 'Faculty Advisor', members: [{ name: '', role: 'Faculty Advisor' }] },
  {
    title: 'General Chairs',
    members: [
      { name: '', role: 'General Chair' },
      { name: '', role: 'General Co-Chair' },
    ],
  },
];

/** The eight committees, in the order they are introduced on Instagram. Each has a lead and a co-lead. */
export const committees: CommitteeGroup[] = [
  { title: 'Poster', members: [{ name: '', role: 'Lead' }, { name: '', role: 'Co-lead' }] },
  { title: 'Prototype', members: [{ name: '', role: 'Lead' }, { name: '', role: 'Co-lead' }] },
  { title: 'Panel & Speakers', members: [{ name: '', role: 'Lead' }, { name: '', role: 'Co-lead' }] },
  { title: 'Logistics', members: [{ name: '', role: 'Lead' }, { name: '', role: 'Co-lead' }] },
  { title: 'Sponsorship', members: [{ name: '', role: 'Lead' }, { name: '', role: 'Co-lead' }] },
  { title: 'Student Engagement', members: [{ name: '', role: 'Lead' }, { name: '', role: 'Co-lead' }] },
  { title: 'Ceremonies', members: [{ name: '', role: 'Lead' }, { name: '', role: 'Co-lead' }] },
  { title: 'Publicity', members: [{ name: '', role: 'Lead' }, { name: '', role: 'Co-lead' }] },
];

export interface Organization {
  name: string;
  /** Path under /public. The name is shown as a wordmark when empty. */
  logo?: string;
  url?: string;
}

/** Organizer tiles, one per university; the heading above them names the IEEE student branches. */
export const organizers: Organization[] = site.universities.map((u) => ({ name: u.name }));

export interface SponsorTier {
  tier: string;
  sponsors: Organization[];
  /** How many "Your logo here" slots to show while the tier is empty (sponsors page only). */
  placeholders: number;
}

export const sponsorTiers: SponsorTier[] = [
  { tier: 'Platinum', sponsors: [], placeholders: 1 },
  { tier: 'Gold', sponsors: [], placeholders: 2 },
  { tier: 'Silver', sponsors: [], placeholders: 3 },
  { tier: 'Partners', sponsors: [], placeholders: 4 },
];

export interface CallToAction {
  title: string;
  body: string;
  icon: IconName;
  cta: { label: string; href: string };
}

const mail = (subject: string) => `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;

export const getInvolved: CallToAction[] = [
  {
    title: 'Stay in the loop',
    icon: 'instagram',
    body: 'Follow us for deadlines, speaker announcements and highlights from the day.',
    cta: { label: 'Follow @ieeeqcon', href: site.socials[0].url },
  },
  {
    title: 'Volunteer as a judge',
    icon: 'award',
    body: 'Faculty and industry professionals: help evaluate posters and prototypes and mentor the next generation of engineers.',
    cta: { label: 'Offer to judge', href: mail(`Judging at ${site.name} ${site.edition}`) },
  },
  {
    title: 'Join the organizing team',
    icon: 'users',
    body: 'Students: support on-site coordination, session logistics and participant experience on conference day.',
    cta: { label: 'Volunteer with us', href: mail(`Volunteering at ${site.name} ${site.edition}`) },
  },
];
