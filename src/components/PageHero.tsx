import type { ReactNode } from 'react';
import { Container } from './Container';
import styles from './PageHero.module.css';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: ReactNode;
}

export function PageHero({ title, subtitle, eyebrow, children }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <Container>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children && <div className={styles.actions}>{children}</div>}
      </Container>
    </section>
  );
}
