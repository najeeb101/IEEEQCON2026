const TZ = 'Asia/Qatar';

/** Parses "YYYY-MM-DD" as midday in Doha so the calendar day never shifts across time zones. */
function parseDay(iso: string): Date {
  return new Date(iso.length === 10 ? `${iso}T12:00:00+03:00` : iso);
}

/** "February 16, 2026" — or "TBD" for null. */
export function formatDate(iso: string | null, style: 'long' | 'short' = 'long'): string {
  if (!iso) return 'TBD';
  return new Intl.DateTimeFormat('en-US', {
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: TZ,
  }).format(parseDay(iso));
}

/** { day: "16", month: "Feb", year: "2026", weekday: "Monday" } for calendar-style badges. */
export function dateParts(iso: string) {
  const d = parseDay(iso);
  const part = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { ...o, timeZone: TZ }).format(d);
  return {
    day: part({ day: 'numeric' }),
    month: part({ month: 'short' }),
    year: part({ year: 'numeric' }),
    weekday: part({ weekday: 'long' }),
  };
}

/** "08:00" → "8:00 AM" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** "Sara El-Sallabi" → "SE" */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}
