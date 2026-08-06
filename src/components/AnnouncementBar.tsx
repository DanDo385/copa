'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './AnnouncementBar.module.css';

export function AnnouncementBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const setHeightVar = () => {
      document.documentElement.style.setProperty(
        '--announcement-height-actual',
        `${el.offsetHeight}px`,
      );
    };

    setHeightVar();
    const observer = new ResizeObserver(setHeightVar);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} className={styles.bar} role="region" aria-label="Store announcement">
      <div className={styles.inner}>
        <p className={styles.fallNote}>
          <span aria-hidden="true">🍂</span> Fall preview coming soon
        </p>
        <span className={styles.divider} aria-hidden="true" />
        <Link href="/#newsletter" className={styles.promoLink}>
          <img
            src="/images/whatnot-mark.png"
            alt=""
            aria-hidden="true"
            className={styles.whatnotIcon}
          />
          Sign up for a Whatnot discount code
        </Link>
      </div>
    </div>
  );
}
