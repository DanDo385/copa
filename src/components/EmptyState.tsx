import Link from 'next/link';
import { Button } from './Button';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description?: string;
}

const SUGGESTIONS = [
  { href: '/best-sellers', label: 'Best Sellers' },
  { href: '/collections/earrings', label: 'Shop earrings' },
  { href: '/search', label: 'Search the catalogue' },
] as const;

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={styles.state}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.suggestions}>
        <p className={styles.suggestionsLabel}>Try:</p>
        <ul className={styles.suggestionList}>
          {SUGGESTIONS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.suggestionLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Button href="/shop" variant="outline">
        Browse all jewelry
      </Button>
    </div>
  );
}
