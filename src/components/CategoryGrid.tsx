import Link from 'next/link';
import { collections } from '@/data/collections';
import { Container } from './Container';
import { Section } from './Section';
import styles from './CategoryGrid.module.css';

const SHOP_CATEGORIES = collections.filter(
  (collection) =>
    collection.kind === 'category' && collection.handle !== 'all',
);

export function CategoryGrid() {
  return (
    <Section>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Shop by category</h2>
          <p className={styles.subtitle}>Five core collections to start your search.</p>
        </div>
        <ul className={styles.grid}>
          {SHOP_CATEGORIES.map((category) => (
            <li key={category.handle}>
              <Link href={`/collections/${category.handle}`} className={styles.card}>
                <span className={styles.cardLabel}>{category.title}</span>
                <span className={styles.cardDesc}>{category.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
