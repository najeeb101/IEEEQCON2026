/**
 * SUBMISSIONS & DATES — tracks, requirements and the important-dates timeline.
 * Dates are ISO strings (YYYY-MM-DD). Use `null` for "TBD".
 */
import type { Status } from '../config/site';

export interface ImportantDate {
  label: string;
  date: string | null;
  track?: string;
  /** The conference day itself; rendered with emphasis. */
  milestone?: boolean;
}

export const importantDates: ImportantDate[] = [
  { label: 'Abstract submission deadline', date: '2026-02-16', track: 'Research & Posters' },
  { label: 'Notification of acceptance', date: '2026-02-28', track: 'Research & Posters' },
  { label: 'Final poster deadline', date: '2026-03-14', track: 'Research & Posters' },
  { label: 'Prototype submission deadline', date: null, track: 'Prototype Competition' },
  { label: 'Conference day, evaluation & awards', date: '2026-04-01', milestone: true },
];

export interface Requirement {
  text: string;
  /** Nested bullet points. */
  items?: string[];
  emphasis?: boolean;
}

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
    id: 'research',
    title: 'Research & Poster Submissions',
    href: '/submissions/research-and-posters/',
    summary:
      'Submit a one-page abstract for the Oral Presentation or Poster Session tracks. Completed and in-progress work are both welcome.',
    status: 'open',
    formUrl: 'https://forms.gle/UxDpqHF7y3auWSrY9',
    deadline: '2026-02-16',
  },
  {
    id: 'prototype',
    title: 'Prototype & Innovation Competition',
    href: '/submissions/prototype-competition/',
    summary:
      'Individuals or teams of up to four present an engineered prototype, working or conceptual, during the Innovation Block.',
    status: 'soon',
    deadline: null,
  },
];

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

export const researchDates: ImportantDate[] = [
  { label: 'Abstract deadline', date: '2026-02-16' },
  { label: 'Notification of acceptance', date: '2026-02-28' },
  { label: 'Final poster deadline', date: '2026-03-14' },
  { label: 'Evaluation and awards', date: '2026-04-01', milestone: true },
];

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

export const prototypeDates: ImportantDate[] = [
  { label: 'Draft submission deadline', date: null },
  { label: 'Final submission deadline', date: null },
  { label: 'Notification of acceptance', date: null },
  { label: 'Evaluation and awards', date: '2026-04-01', milestone: true },
];
