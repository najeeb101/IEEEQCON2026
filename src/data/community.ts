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
    body: 'The next edition of Qatar’s student engineering conference is being planned. The date and deadlines will be announced here and on Instagram.',
    cta: { label: `Follow ${site.socials[0].handle}`, href: site.socials[0].url },
  },
  {
    tag: 'Call for Submissions',
    title: 'Start preparing your abstract',
    body: 'Research and poster abstracts are one page (350 words max.) and can cover completed or in-progress work. The submission form opens with the call.',
    cta: { label: 'Submission guidelines', href: '/submissions/research-and-posters/' },
  },
  {
    tag: 'Prototype Competition',
    title: 'Build something to show',
    body: 'Individuals or teams of up to four can enter working or conceptual prototypes with an electrical or electronic component.',
    cta: { label: 'Competition details', href: '/submissions/prototype-competition/' },
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
export const committee: CommitteeGroup[] = [
  { title: 'Faculty Advisor', members: [{ name: '', role: 'Faculty Advisor' }] },
  {
    title: 'General Chairs',
    members: [
      { name: '', role: 'General Chair' },
      { name: '', role: 'General Co-Chair' },
    ],
  },
  {
    title: 'Program & Competitions',
    members: [
      { name: '', role: 'Technical Program Chair' },
      { name: '', role: 'Poster Session Chair' },
      { name: '', role: 'Prototype Competition Chair' },
    ],
  },
  {
    title: 'Operations & Outreach',
    members: [
      { name: '', role: 'Logistics Chair' },
      { name: '', role: 'Sponsorship Chair' },
      { name: '', role: 'Publicity & Media Chair' },
    ],
  },
];

export interface Organization {
  name: string;
  /** Path under /public. The name is shown as a wordmark when empty. */
  logo?: string;
  url?: string;
}

export const organizers: Organization[] = [{ name: site.organizer }];

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
