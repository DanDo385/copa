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
  { href: 'https://www.instagram.com/copajewelry/', label: 'Instagram' },
  { href: 'https://www.facebook.com/copacabana.jewelry/', label: 'Facebook' },
  { href: 'https://www.whatnot.com/user/copajewelry/shop', label: 'Whatnot' },
] as const;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.socialGlyph} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="instagramGradient" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FED576" />
          <stop offset="26%" stopColor="#F47133" />
          <stop offset="61%" stopColor="#BC3081" />
          <stop offset="100%" stopColor="#4C63D2" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="6" fill="url(#instagramGradient)" />
      <rect x="6" y="6" width="12" height="12" rx="3.6" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16.1" cy="7.9" r="1" fill="#fff" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.socialGlyph} aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path
        d="M13.6 21.3v-7.2h2.4l.4-2.8h-2.8V9.5c0-.8.2-1.3 1.4-1.3h1.5V5.7c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2.1H8.5v2.8h2.4v7.2z"
        fill="#fff"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brandBlock}>
            <img src="/images/copa-mark.png" alt="CopaJewelry" className={styles.brandMark} />
            <p className={styles.brandName}>CopaJewelry</p>
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
            <PlaceholderBadge />
          </div>

          <div className={styles.socialBlock}>
            <h2 className={styles.heading}>Follow CopaJewelry</h2>
            <ul className={styles.socialList}>
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label === 'Instagram' && <InstagramIcon />}
                    {link.label === 'Facebook' && <FacebookIcon />}
                    {link.label === 'Whatnot' && (
                      <img
                        src="/images/whatnot-mark.png"
                        alt=""
                        aria-hidden="true"
                        className={styles.whatnotIcon}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.accessibility}>
            CopaJewelry is committed to an accessible shopping experience. Report barriers via the contact
            page once support channels are approved.
          </p>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} CopaJewelry. Prototype storefront — not for production
            checkout.
          </p>
        </div>
      </Container>
    </footer>
  );
}
