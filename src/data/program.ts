/**
 * PROGRAM CONTENT — what the conference offers, its themes, the schedule and speakers.
 * Icons are names from src/components/ui/Icon.astro.
 */
import type { IconName } from '../components/ui/icons';

export interface Highlight {
  title: string;
  body: string;
  icon: IconName;
}

/** The four core components of the day (home page cards + about page). */
export const highlights: Highlight[] = [
  {
    title: 'Research Presentations',
    icon: 'presentation',
    body: 'Students present their research through oral talks and posters across multiple disciplines, reviewed by faculty and industry experts.',
  },
  {
    title: 'Keynotes & Industry Panels',
    icon: 'mic',
    body: 'Speakers from major institutions, including QSTP, QCRI, QEERI, HBKU and leading tech companies, share insights on AI, sustainability, entrepreneurship and innovation leadership.',
  },
  {
    title: 'Innovation Prototype Competition',
    icon: 'cpu',
    body: 'Teams showcase devices, prototypes and engineered solutions. Judges evaluate creativity, technical depth and real-world impact.',
  },
  {
    title: 'Poster Session Showcase',
    icon: 'poster',
    body: 'Accepted posters highlight impactful student research across sustainability, healthcare tech, smart infrastructure and more, with awards for undergraduate and graduate categories.',
  },
];

export interface Theme {
  title: string;
  body: string;
  icon: IconName;
}

export const themes: Theme[] = [
  {
    title: 'Sustainable Energy & Power Systems',
    icon: 'bolt',
    body: 'Renewables, storage, efficient power conversion and the grid of the future.',
  },
  {
    title: 'Healthcare & Biomedical Technologies',
    icon: 'pulse',
    body: 'Devices, sensing and computing that improve diagnosis, treatment and wellbeing.',
  },
  {
    title: 'Smart Infrastructure & Intelligent Systems',
    icon: 'city',
    body: 'Connected cities, automation, AI and the systems that tie them together.',
  },
];

export interface Stat {
  value: string;
  label: string;
  note: string;
}

/** "Q-Con at a glance" band — every number is a fact about the format, not a guess. */
export const stats: Stat[] = [
  { value: '1', label: 'Full day', note: 'Talks, keynotes, posters and prototypes under one roof' },
  { value: '3', label: 'Conference themes', note: 'Energy, healthcare and smart infrastructure' },
  { value: '4', label: 'Ways to take part', note: 'Present, exhibit a poster, compete, or attend' },
  { value: '2', label: 'Award categories', note: 'Undergraduate and graduate' },
];

export type SessionKind = 'arrival' | 'ceremony' | 'keynote' | 'session' | 'block' | 'break' | 'panel' | 'networking';

export interface ScheduleItem {
  start: string; // "08:00" (24h, Doha time)
  end: string;
  title: string;
  kind: SessionKind;
  location?: string;
  speaker?: string;
  /** Sub-items shown inside a block (e.g. the Innovation Block). */
  parts?: { title: string; time?: string; note?: string }[];
}

export const scheduleDate = '2026-04-01';

export const schedule: ScheduleItem[] = [
  { start: '08:00', end: '09:00', title: 'Registration & Welcome Coffee', kind: 'arrival' },
  { start: '09:00', end: '09:10', title: 'Opening Ceremony', kind: 'ceremony' },
  { start: '09:10', end: '09:40', title: 'Keynote #1', kind: 'keynote', speaker: 'Sara El-Sallabi' },
  { start: '09:40', end: '10:20', title: 'Session 1: Technical Talks', kind: 'session' },
  { start: '10:20', end: '10:40', title: 'Coffee Break & Networking', kind: 'break' },
  { start: '10:40', end: '12:00', title: 'Session 2: Technical Talks', kind: 'session' },
  {
    start: '12:00',
    end: '13:30',
    title: 'Innovation Block',
    kind: 'block',
    parts: [
      { title: 'Lunch', time: '12:00 – 12:30' },
      { title: 'Poster Session', note: 'Posters on display with judges and attendees' },
      { title: 'Prototype Competition', note: 'Live demos and judging' },
    ],
  },
  { start: '13:30', end: '14:00', title: 'Keynote #2', kind: 'keynote', speaker: 'IEEE alumni member or faculty member' },
  { start: '14:00', end: '14:30', title: 'Panel Discussion', kind: 'panel' },
  { start: '14:30', end: '14:50', title: 'Coffee Break', kind: 'break' },
  { start: '14:50', end: '15:20', title: 'Awards & Closing Ceremony', kind: 'ceremony' },
  { start: '15:20', end: '16:00', title: 'Photos & Networking', kind: 'networking' },
];

export const sessionKindLabels: Record<SessionKind, string> = {
  arrival: 'Arrival',
  ceremony: 'Ceremony',
  keynote: 'Keynote',
  session: 'Technical talks',
  block: 'Innovation Block',
  break: 'Break',
  panel: 'Panel',
  networking: 'Networking',
};

export interface Speaker {
  name: string;
  role: string;
  /** e.g. "Keynote #1 · 9:10 AM" */
  session?: string;
  affiliation?: string;
  bio?: string;
  /** Path under /public, e.g. "/people/sara.jpg". Initials are shown when empty. */
  photo?: string;
  /** Marks a placeholder that should read "To be announced". */
  tba?: boolean;
}

export const speakers: Speaker[] = [
  { name: 'Sara El-Sallabi', role: 'Keynote Speaker', session: 'Keynote #1 · 9:10 AM' },
  {
    name: 'To be announced',
    role: 'Keynote Speaker',
    session: 'Keynote #2 · 1:30 PM',
    affiliation: 'IEEE alumni member or faculty member',
    tba: true,
  },
  { name: 'To be announced', role: 'Panelists', session: 'Panel Discussion · 2:00 PM', tba: true },
];
