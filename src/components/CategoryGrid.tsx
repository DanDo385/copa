import Link from 'next/link';
import { demoMedia } from '@/data/demo-media';
import { collections } from '@/data/collections';
import { Container } from './Container';
import { Section } from './Section';
import styles from './CategoryGrid.module.css';

const CATEGORY_IMAGES = demoMedia.categories;

const SHOP_CATEGORIES = collections.filter(
  (collection) =>
    collection.kind === 'category' &&
    collection.handle !== 'all' &&
    Object.hasOwn(demoMedia.categories, collection.handle),
);

export function CategoryGrid() {
  return (
    <Section>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Shop by category</h2>
          <p className={styles.subtitle}>A selection grounded in CopaJewelry’s current collection imagery.</p>
        </div>
        <ul className={styles.grid}>
          {SHOP_CATEGORIES.map((category) => {
            const image = CATEGORY_IMAGES[category.handle as keyof typeof CATEGORY_IMAGES];
            if (!image) return null;
            return (
              <li key={category.handle}>
                <Link href={`/collections/${category.handle}`} className={styles.card}>
                  {image && (
                    <img
                      src={image}
                      alt=""
                      className={styles.image}
                    />
                  )}
                  <span className={styles.overlay} />
                  <span className={styles.content}>
                    <span className={styles.cardLabel}>{category.title}</span>
                    <span className={styles.cardDesc}>{category.description}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
