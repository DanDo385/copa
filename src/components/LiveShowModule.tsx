import Link from 'next/link';
import { whatnotProof } from '@/data/whatnot-proof';
import { formatShowTime, getUpcomingShows } from '@/lib/whatnot-schedule';
import { Button } from './Button';
import { Container } from './Container';
import { ConsentCapture } from './ConsentCapture';
import { Section } from './Section';
import styles from './LiveShowModule.module.css';

export function LiveShowModule() {
  const nextShow = getUpcomingShows(new Date(), 1)[0];

  return (
    <Section>
      <Container>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Live on Whatnot</p>
            <h2 className={styles.title}>Join the next show</h2>
            <p className={styles.body}>
              Whatnot is for live discovery, community, and show exclusives. This website is your
              home for the full catalogue, gifting, restocks, and custom work.
            </p>

            <dl className={styles.schedule}>
              <div>
                <dt>Next show</dt>
                <dd>
                  {nextShow ? formatShowTime(nextShow.start) : 'Schedule unavailable'}
                  <span className={styles.scheduleNote}>
                    Shown in your local time zone — shows run Wed 1 PM / Fri 11 AM ET, per
                    owner-provided schedule.
                  </span>
                </dd>
              </div>
              <div>
                <dt>What to expect</dt>
                <dd>Live styling, finish comparisons, and founder-hosted curation.</dd>
              </div>
            </dl>

            <div className={styles.actions}>
              <Button href={whatnotProof.sourceUrl} variant="secondary" size="lg">
                Watch on Whatnot
              </Button>
              <Link href="/live-shows" className={styles.secondaryLink}>
                Live Shows page
              </Link>
            </div>
          </div>

          <div className={styles.reminder}>
            <h3 className={styles.reminderTitle}>Remind me</h3>
            <p className={styles.reminderCopy}>
              Get show reminders on CopaJewelry&apos;s owned channels — separate from Whatnot notifications.
            </p>
            <ConsentCapture mode="show-reminder" compact />
          </div>
        </div>
      </Container>
    </Section>
  );
}
