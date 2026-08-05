import { demoMedia } from '@/data/demo-media';
import { whatnotProof } from '@/data/whatnot-proof';
import { Button } from './Button';
import styles from './ProofStrip.module.css';

export function ProofStrip() {
  const rating = whatnotProof.metrics.find((metric) => metric.key === 'rating');
  const reviews = whatnotProof.metrics.find((metric) => metric.key === 'reviews');
  const followers = whatnotProof.metrics.find((metric) => metric.key === 'followers');
  const itemsSold = whatnotProof.metrics.find((metric) => metric.key === 'items_sold');

  return (
    <section className={styles.strip} aria-label="Whatnot community proof">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <img
            src={demoMedia.whatnotStorefront.sourceUrl}
            alt={demoMedia.whatnotStorefront.alt}
            className={styles.storeImage}
          />
          <div className={styles.headingText}>
            <p className={styles.liveTag}>
              <img src="/images/whatnot-mark.png" alt="" aria-hidden="true" className={styles.whatnotIcon} />
              Trusted on Whatnot
            </p>
            <p className={styles.intro}>
              Trusted on Whatnot — {whatnotProof.attributionLabel}, observed{' '}
              {whatnotProof.observedDate}
            </p>
          </div>
          <Button
            href={whatnotProof.sourceUrl}
            variant="primary"
            size="md"
            className={styles.watchButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/whatnot-mark.png" alt="" aria-hidden="true" className={styles.whatnotIcon} />
            View our Whatnot page ↗
          </Button>
        </div>
        <dl className={styles.stats}>
          {followers && (
            <div>
              <dt>{followers.label}</dt>
              <dd>{followers.value}</dd>
            </div>
          )}
          {itemsSold && (
            <div>
              <dt>{itemsSold.label}</dt>
              <dd>{itemsSold.value}</dd>
            </div>
          )}
          {reviews && (
            <div>
              <dt>{reviews.label}</dt>
              <dd>{reviews.value}</dd>
            </div>
          )}
          {rating && (
            <div>
              <dt>{rating.label}</dt>
              <dd>{rating.value}</dd>
            </div>
          )}
          {whatnotProof.badges.length > 0 && (
            <div>
              <dt>Shop status</dt>
              <dd>{whatnotProof.badges.join(', ')}</dd>
            </div>
          )}
        </dl>
        <p className={styles.attribution}>{whatnotProof.disclaimer}</p>
      </div>
    </section>
  );
}
