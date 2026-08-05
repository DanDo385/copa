'use client';

import { Container } from './Container';
import { PlaceholderBadge } from './PlaceholderBadge';
import { Section } from './Section';
import { useOwnerReview } from '@/lib/owner-review-context';
import styles from './ReviewsSection.module.css';

export function ReviewsSection() {
  const { reviewMode } = useOwnerReview();

  if (!reviewMode) return null;

  return (
    <Section tone="elevated">
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Reviews on CopaJewelry&apos;s website</h2>
          <p className={styles.subtitle}>
            Judge.me integration slots — configure in authorized Shopify implementation.
          </p>
        </div>

        <div className={styles.judgeMeSlots}>
          <div className={styles.slot} aria-label="Judge.me preview badge slot">
            <PlaceholderBadge label="Judge.me preview badge" />
            <p>Product review preview badge placement</p>
          </div>
          <div className={styles.slot} aria-label="Judge.me review widget slot">
            <PlaceholderBadge label="Judge.me review widget" />
            <p>Homepage and PDP review widget placement</p>
          </div>
          <div className={styles.slot} aria-label="Judge.me review hub slot">
            <PlaceholderBadge label="Judge.me review hub" />
            <p>On-site review hub block</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
