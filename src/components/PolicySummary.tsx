import Link from 'next/link';
import { PlaceholderBadge } from './PlaceholderBadge';
import styles from './PolicySummary.module.css';

const POLICY_LINKS = [
  {
    href: '/shipping-returns',
    label: 'Shipping & returns',
    description: 'Processing time, transit, eligibility, and international duties — owner approval required.',
  },
  {
    href: '/warranty',
    label: 'Warranty',
    description: 'Coverage and claim route to be confirmed before publication.',
  },
] as const;

export function PolicySummary() {
  return (
    <aside className={styles.summary} aria-label="Shipping, returns, and warranty">
      <h2 className={styles.title}>Before you order</h2>
      <ul className={styles.list}>
        {POLICY_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.link}>
              {link.label}
            </Link>
            <p className={styles.description}>{link.description}</p>
          </li>
        ))}
      </ul>
      <PlaceholderBadge />
    </aside>
  );
}
