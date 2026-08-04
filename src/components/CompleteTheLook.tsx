import type { Product } from '@/data/products';
import { Container } from './Container';
import { ProductCard } from './ProductCard';
import { Section } from './Section';
import styles from './CompleteTheLook.module.css';

interface CompleteTheLookProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function CompleteTheLook({
  products,
  title = 'Complete the look',
  subtitle = 'Styled by COPA — curated pairings until order data supports behavioral recommendations.',
}: CompleteTheLookProps) {
  if (products.length === 0) return null;

  return (
    <Section tone="sunken">
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <ul className={styles.grid}>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
