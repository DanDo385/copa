'use client';

import { useOwnerReview } from '@/lib/owner-review-context';
import styles from './PlaceholderBadge.module.css';

interface PlaceholderBadgeProps {
  label?: string;
  /** When true, always shows the prominent owner-review badge regardless of reviewMode. */
  prominent?: boolean;
  className?: string;
}

export function PlaceholderBadge({
  label = 'Prototype placeholder',
  prominent = false,
  className,
}: PlaceholderBadgeProps) {
  const { reviewMode } = useOwnerReview();
  const isProminent = prominent || reviewMode;

  return (
    <span
      className={[
        styles.badge,
        isProminent ? styles.prominent : styles.subtle,
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="note"
    >
      {isProminent ? '[OWNER APPROVAL REQUIRED]' : label}
    </span>
  );
}
