import Image from 'next/image';
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
              <Image
                src={imageSrc}
                alt={imageAlt ?? 'COPA Jewelry packaging'}
                width={640}
                height={480}
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
              COPA’s packaging experience is part of the brand — details, presentation, and care
              instructions will be confirmed with owner-approved photography and copy.
            </p>
            <PlaceholderBadge />
          </div>
        </div>
      </Container>
    </Section>
  );
}
