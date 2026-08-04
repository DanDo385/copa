import Link from 'next/link';
import { Container } from './Container';
import { PlaceholderBadge } from './PlaceholderBadge';
import styles from './Footer.module.css';

const POLICY_LINKS = [
  { href: '/shipping-returns', label: 'Shipping & Returns' },
  { href: '/warranty', label: 'Warranty' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const;

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/copajewelry', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@copajewelry', label: 'TikTok' },
  { href: 'https://www.facebook.com/copajewelry', label: 'Facebook' },
  { href: 'https://www.whatnot.com/user/copajewelry', label: 'Whatnot' },
] as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brandBlock}>
            <p className={styles.brandName}>COPA Jewelry</p>
            <p className={styles.tagline}>
              Brazilian-founded taste. Worldwide curation. Styled live by the people who source it.
            </p>
            <PlaceholderBadge />
          </div>

          <nav className={styles.navBlock} aria-label="Policies and support">
            <h2 className={styles.heading}>Policies</h2>
            <ul className={styles.linkList}>
              {POLICY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contactBlock}>
            <h2 className={styles.heading}>Contact</h2>
            <p className={styles.placeholder}>
              Support email, hours, and return address — owner approval required.
            </p>
            <PlaceholderBadge prominent />
          </div>

          <div className={styles.socialBlock}>
            <h2 className={styles.heading}>Follow COPA</h2>
            <ul className={styles.socialList}>
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.accessibility}>
            COPA is committed to an accessible shopping experience. Report barriers via the contact
            page once support channels are approved.
          </p>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} COPA Jewelry. Prototype storefront — not for production
            checkout.
          </p>
        </div>
      </Container>
    </footer>
  );
}
