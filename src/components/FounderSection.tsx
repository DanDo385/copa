import { founders } from '@/data/founders';
import { Container } from './Container';
import { PlaceholderBadge } from './PlaceholderBadge';
import { Section } from './Section';
import styles from './FounderSection.module.css';

export function FounderSection() {
  return (
    <Section tone="elevated">
      <Container>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Meet the hosts</p>
            <h2 className={styles.title}>Styled live by the people who source it</h2>
            <p className={styles.lead}>
              Marcela Garrett, Isabella Magro, and Carol Cavalcanti bring Brazilian-founded taste
              and worldwide curation to every show and styling note.
            </p>
            <PlaceholderBadge prominent />
          </div>

          <ul className={styles.founders}>
            {founders.map((founder) => (
              <li key={founder.id} className={styles.founderCard}>
                <div className={styles.avatar} aria-hidden="true">
                  {founder.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <div>
                  <h3 className={styles.name}>{founder.name}</h3>
                  <p className={styles.role}>{founder.roleLabel}</p>
                  <p className={styles.bio}>{founder.pitchCopy}</p>
                  <PlaceholderBadge />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
