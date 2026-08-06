/**
 * COPA Jewelry Whatnot show schedule.
 *
 * Cadence: Wednesdays at 1:00 PM ET and Fridays at 11:00 AM ET, per owner-
 * provided schedule. Timezone is assumed America/New_York (common default
 * for US-based sellers) and show length is assumed 90 minutes; neither
 * figure is published by Whatnot, so both remain OWNER_APPROVED-pending in
 * the decision register, not verified fact.
 *
 * Show instants are computed in the assumed timezone (DST-aware) and then
 * displayed using the viewer's own browser-local timezone, so each time
 * shown always means the real ET show time converted to wherever the
 * visitor actually is — not the raw hour in whichever timezone the runtime
 * happens to be.
 */

// Wed, Fri (Date#getDay(): Sun=0..Sat=6) mapped to their show start time in ASSUMED_TIMEZONE.
export const SHOW_TIMES_BY_WEEKDAY: Record<number, { hour: number; minute: number }> = {
  3: { hour: 13, minute: 0 }, // Wednesday, 1:00 PM ET
  5: { hour: 11, minute: 0 }, // Friday, 11:00 AM ET
};
export const ASSUMED_SHOW_LENGTH_MINUTES = 90;
export const ASSUMED_TIMEZONE = 'America/New_York';

export interface ShowOccurrence {
  start: Date;
  end: Date;
}

function getZonedDateParts(
  date: Date,
  timeZone: string,
): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { year: get('year'), month: get('month') - 1, day: get('day') };
}

/** Converts a wall-clock date/time in `timeZone` to the equivalent UTC instant, DST-aware. */
function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const guess = new Date(Date.UTC(year, month, day, hour, minute, 0, 0));
  const asUtc = new Date(guess.toLocaleString('en-US', { timeZone: 'UTC' }));
  const asZone = new Date(guess.toLocaleString('en-US', { timeZone }));
  const offsetMs = asUtc.getTime() - asZone.getTime();
  return new Date(guess.getTime() + offsetMs);
}

/** Returns the next `count` show occurrences at or after `from`, including one in progress. */
export function getUpcomingShows(from: Date, count: number): ShowOccurrence[] {
  const shows: ShowOccurrence[] = [];
  for (let dayOffset = 0; shows.length < count && dayOffset < 30; dayOffset += 1) {
    const candidate = new Date(from.getTime() + dayOffset * 86_400_000);
    const { year, month, day } = getZonedDateParts(candidate, ASSUMED_TIMEZONE);
    const weekday = new Date(Date.UTC(year, month, day)).getUTCDay();
    const showTime = SHOW_TIMES_BY_WEEKDAY[weekday];
    if (!showTime) continue;

    const start = zonedTimeToUtc(year, month, day, showTime.hour, showTime.minute, ASSUMED_TIMEZONE);
    const end = new Date(start.getTime() + ASSUMED_SHOW_LENGTH_MINUTES * 60_000);

    const alreadyIncluded = shows.some((show) => show.start.getTime() === start.getTime());
    if (end.getTime() > from.getTime() && !alreadyIncluded) {
      shows.push({ start, end });
    }
  }
  return shows;
}

export function isShowLive(show: ShowOccurrence, now: Date): boolean {
  return now.getTime() >= show.start.getTime() && now.getTime() <= show.end.getTime();
}

/** Formats a show instant in the viewer's own browser-local timezone. */
export function formatShowTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: date.getMinutes() === 0 ? undefined : '2-digit',
  }).format(date);
}
