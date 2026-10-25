/**
 * SUBMISSIONS & DATES — competition formats, requirements and the important-dates timeline.
 * Dates are ISO strings (YYYY-MM-DD). Use `null` for "To be announced".
 *
 * The requirements below are the Q-Con 2026 rules, shown as last year's until each committee
 * confirms the 2027 criteria. Set `rulesYear` to the new edition once they do.
 */
import type { Status } from '../config/site';

/** The edition the requirements on the format pages come from. */
export const rulesYear: number = 2026;

export interface ImportantDate {
  label: string;
  date: string | null;
  track?: string;
  /** The conference day itself; rendered with emphasis. */
  milestone?: boolean;
}

/** Home page and Call for Submissions. */
export const importantDates: ImportantDate[] = [
  { label: 'Call for submissions opens', date: null, track: 'All formats' },
  { label: 'Submission deadline', date: null, track: 'All formats' },
  { label: 'Acceptances announced', date: null, track: 'All formats' },
  { label: 'Attendee registration closes', date: null, track: 'Registration' },
  { label: 'Conference, judging & awards', date: null, milestone: true },
];

/** The timeline on each format page. */
export const formatDates: ImportantDate[] = [
  { label: 'Submission deadline', date: null },
  { label: 'Acceptances announced', date: null },
  { label: 'Judging and awards', date: null, milestone: true },
];

export interface Requirement {
  text: string;
  /** Nested bullet points. */
  items?: string[];
  emphasis?: boolean;
}

/**
 * The three student competition formats (Call for Submissions cards). Not to be confused with the
 * three conference tracks, which are `themes` in program.ts.
 */
export interface Track {
  id: string;
  title: string;
  href: string;
  summary: string;
  status: Status;
  /** Submission form link, used when status is 'open'. */
  formUrl?: string;
  deadline: string | null;
}

export const tracks: Track[] = [
  {
    id: 'poster',
    title: 'Poster Competition',
    href: '/submissions/poster-competition/',
    summary: 'Submit a one-page abstract and present your research as a poster, judged on conference day.',
    status: 'soon',
    /** The 2026 abstract form (posters and talks) was https://forms.gle/UxDpqHF7y3auWSrY9. */
    formUrl: '',
    deadline: null,
  },
  {
    id: 'prototype',
    title: 'Prototype Competition',
    href: '/submissions/prototype-competition/',
    summary: 'Show an engineered prototype, working or conceptual, and demo it to the judges on conference day.',
    status: 'soon',
    deadline: null,
  },
  {
    id: 'presentation',
    title: 'Technical Presentations',
    href: '/submissions/technical-presentations/',
    summary: 'Submit a one-page abstract and present your research as a technical talk to judges and attendees.',
    status: 'soon',
    formUrl: '',
    deadline: null,
  },
];

/** Poster Competition and Technical Presentations. */
export const abstractRequirements: Requirement[] = [
  { text: '1 page (350 words max.)' },
  { text: 'Must relate to the conference themes' },
  { text: 'Can present completed or in-progress work' },
  { text: 'Results are not required, but they strengthen the submission' },
  { text: 'Open to students and researchers, but only students compete for awards', emphasis: true },
];

export const posterRequirements: Requirement[] = [
  { text: 'Use of the official A1 poster template' },
  {
    text: 'Clear structure:',
    items: ['Introduction', 'Problem Statement', 'Methodology', 'Results and Discussions', 'Conclusions and Future Work'],
  },
  { text: 'Readable, well-organized, and aligned with the conference themes' },
];

/** Link to the A1 poster template. Leave empty to show "Template coming soon". */
export const posterTemplateUrl = '';

/**
 * Technical Presentations: talk length, format and judging. Empty until the Panel & Speakers
 * committee confirms them; the page then says they will be announced.
 */
export const presentationRequirements: Requirement[] = [];

export const prototypeEligibility: Requirement[] = [
  { text: 'Open to all university students, individually or in teams of up to 4' },
  { text: 'Prototype entries are showcased during the Innovation Block alongside posters' },
];

export const prototypeRequirements: Requirement[] = [
  { text: 'Must relate to electrical engineering or include an electrical/electronic component' },
  { text: 'Can be working or non-working, as long as the concept is clearly presented' },
  {
    text: 'Must be explained through a 500-word written summary covering:',
    items: ['Problem being solved', 'Idea and design', 'Electrical/electronic components', 'Implementation', 'Potential impact or use'],
  },
  { text: 'Must include an image of the current prototype, with completion plans if it is unfinished at the time of submission' },
];
