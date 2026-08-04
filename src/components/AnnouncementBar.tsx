'use client';

import { FREE_SHIPPING_THRESHOLD_CENTS } from '@/lib/catalog';
import styles from './AnnouncementBar.module.css';
import { PlaceholderBadge } from './PlaceholderBadge';

interface AnnouncementBarProps {
  /** Owner-approved shipping threshold in cents, when configured. */
  freeShippingThresholdCents?: number;
  /** Optional live-show reminder message. */
  showReminder?: string;
}

export function AnnouncementBar({
  freeShippingThresholdCents = FREE_SHIPPING_THRESHOLD_CENTS,
  showReminder,
}: AnnouncementBarProps) {
  return (
    <div className={styles.bar} role="region" aria-label="Store announcement">
      <div className={styles.inner}>
        <p className={styles.message}>
          {showReminder ? (
            <>
              <span className={styles.label}>Live show:</span> {showReminder}
            </>
          ) : (
            <>
              Free shipping on orders over{' '}
              <strong>${(freeShippingThresholdCents / 100).toFixed(0)}</strong>
              <span className={styles.demoNote}> — configurable demo threshold</span>
            </>
          )}
        </p>
        <PlaceholderBadge prominent />
      </div>
      <p className={styles.srOnly}>
        Final announcement copy requires owner approval before production launch.
      </p>
    </div>
  );
}
