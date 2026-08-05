'use client';

import type { ReactNode } from 'react';
import { useOwnerReview } from '@/lib/owner-review-context';
import styles from './PlaceholderBadge.module.css';

interface PlaceholderBadgeProps {
  label?: string;
  /** When true, renders the stronger "[OWNER APPROVAL REQUIRED]" wording instead of the label. */
  prominent?: boolean;
  className?: string;
}

export function PlaceholderBadge({
  label = 'Prototype placeholder',
  prominent = false,
  className,
}: PlaceholderBadgeProps) {
  const { reviewMode } = useOwnerReview();

  if (!reviewMode) return null;

  return (
    <span
      className={[styles.badge, prominent ? styles.prominent : styles.subtle, className ?? '']
        .filter(Boolean)
        .join(' ')}
      role="note"
    >
      {prominent ? '[OWNER APPROVAL REQUIRED]' : label}
    </span>
  );
}

/** Wraps owner-review-only copy (e.g. a disclaimer paragraph) that isn't a badge itself. */
export function OwnerNote({ children }: { children: ReactNode }) {
  const { reviewMode } = useOwnerReview();

  if (!reviewMode) return null;

  return <>{children}</>;
}
