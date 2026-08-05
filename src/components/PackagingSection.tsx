import { Container } from './Container';
import { PlaceholderBadge } from './PlaceholderBadge';
import { Section } from './Section';
import styles from './PackagingSection.module.css';

interface PackagingSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

export function PackagingSection({ imageSrc, imageAlt }: PackagingSectionProps) {
  return (
    <Section tone="elevated">
      <Container>
        <div className={styles.layout}>
          <div className={styles.media}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageAlt ?? 'CopaJewelry packaging'}
                className={styles.image}
              />
            ) : (
              <div className={styles.assetRequired}>
                <PlaceholderBadge prominent />
                <p>Production asset required: approved packaging and unboxing photography.</p>
              </div>
            )}
          </div>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Unboxing</p>
            <h2 className={styles.title}>Packaging customers notice</h2>
            <p className={styles.body}>
              CopaJewelry’s unboxing can become another live-to-owned brand moment: a considered boxing
              ritual, a signature sensory detail, and rewards for the people who follow the story
              beyond the show. Exact scent, packaging, and reward terms require owner approval.
            </p>
            <PlaceholderBadge />
          </div>
        </div>
      </Container>
    </Section>
  );
}
