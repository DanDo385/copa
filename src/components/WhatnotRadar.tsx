'use client';

import { useEffect, useState } from 'react';
import { whatnotProof } from '@/data/whatnot-proof';
import {
  ASSUMED_SHOW_LENGTH_MINUTES,
  formatShowTime,
  getUpcomingShows,
  isShowLive,
} from '@/lib/whatnot-schedule';
import { Button } from './Button';
import { Container } from './Container';
import { ConsentCapture } from './ConsentCapture';
import { Section } from './Section';
import styles from './WhatnotRadar.module.css';

interface WhatnotRadarProps {
  /** When true, renders just the panel content without its own Section/Container wrapper,
   *  and forces a stacked single-column layout — for embedding inside another section (e.g. the hero). */
  bare?: boolean;
}

export function WhatnotRadar({ bare = false }: WhatnotRadarProps) {
  const [now, setNow] = useState<Date | null>(null);
  const [remindersOpen, setRemindersOpen] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const layoutClass = [styles.layout, bare ? styles.layoutBare : ''].filter(Boolean).join(' ');

  if (!now) {
    const placeholder = <div className={layoutClass} aria-hidden="true" />;
    if (bare) return placeholder;
    return (
      <Section>
        <Container>{placeholder}</Container>
      </Section>
    );
  }

  const upcoming = getUpcomingShows(now, 4);
  const current = upcoming[0];
  const live = Boolean(current && isShowLive(current, now));
  const nextShows = live ? upcoming.slice(1) : upcoming.slice(0, 3);

  const content = (
        <div className={layoutClass} aria-label={bare ? 'Whatnot live show status' : undefined}>
          {!bare && (
            <div className={styles.radarWrap} aria-hidden="true">
              {live ? (
                <div className={styles.antenna}>
                  <span className={[styles.wave, styles.wave1].join(' ')} />
                  <span className={[styles.wave, styles.wave2].join(' ')} />
                  <span className={[styles.wave, styles.wave3].join(' ')} />
                  <span className={styles.antennaDot} />
                  <span className={styles.antennaMast} />
                </div>
              ) : (
                <div className={styles.radar}>
                  <span className={styles.radarRing} />
                  <span className={styles.radarRing2} />
                  <span className={styles.radarSweep} />
                  <span className={styles.radarDot} />
                </div>
              )}
            </div>
          )}

          <div className={styles.status}>
            {live && (
              <div className={styles.liveAlert} role="status">
                <p className={styles.badgeLive}>
                  <span className={styles.badgeDot} aria-hidden="true" />
                  Live on Whatnot now
                </p>
                <h2 className={styles.heading}>CopaJewelry is live on Whatnot right now</h2>
                <p className={styles.copy}>
                  Join the show for live styling and finish comparisons — this window is
                  estimated from the show&apos;s usual {ASSUMED_SHOW_LENGTH_MINUTES}-minute
                  length, not a confirmed end time.
                </p>
                <Button
                  href={`${whatnotProof.sourceUrl}/shows`}
                  variant="primary"
                  size="lg"
                  className={styles.liveButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch now ↗
                </Button>
                <p className={styles.dropNote}>
                  New pieces can debut mid-show — pieces shown live may be added here as
                  previews during and after the broadcast.
                </p>
              </div>
            )}

            <div className={styles.scheduleBlock}>
              {live ? (
                <p className={styles.badge}>Also on the schedule</p>
              ) : (
                <>
                  <p className={styles.badge}>Next shows</p>
                  {!bare && <h2 className={styles.heading}>Catch the next live show</h2>}
                </>
              )}
              {nextShows.length > 0 ? (
                <ul className={styles.showList}>
                  {nextShows.map((show) => (
                    <li key={show.start.toISOString()}>{formatShowTime(show.start)}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.copy}>Schedule not available right now.</p>
              )}
              <p className={styles.caveat}>
                {bare
                  ? 'Shown in your local time — shows run Wed 1 PM / Fri 11 AM ET.'
                  : 'Shown in your local time zone — shows run Wednesday 1:00 PM / Friday 11:00 AM ET, per owner-provided schedule.'}
              </p>
              <Button
                variant={live ? 'secondary' : 'primary'}
                size={bare ? 'sm' : live ? 'md' : 'lg'}
                onClick={() => setRemindersOpen((open) => !open)}
                aria-expanded={remindersOpen}
              >
                {remindersOpen ? 'Hide reminder signup' : 'Get text/email reminders'}
              </Button>
              {remindersOpen && (
                <div className={styles.reminderForm}>
                  <ConsentCapture mode="show-reminder" compact />
                </div>
              )}
            </div>
          </div>
        </div>
  );

  if (bare) return content;

  return (
    <Section aria-label="Whatnot live show status">
      <Container>{content}</Container>
    </Section>
  );
}
