'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { collections } from '@/data/collections';
import { useCart } from '@/lib/cart-context';
import styles from './Header.module.css';
import { SearchForm } from './SearchForm';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/new', label: 'New' },
  { href: '/best-sellers', label: 'Best Sellers' },
  { href: '/live-shows', label: 'Live Shows' },
  { href: '/custom', label: 'Custom' },
  { href: '/our-story', label: 'Our Story' },
] as const;

const CATEGORY_NAV = collections.filter((collection) => collection.kind === 'category');

interface HeaderProps {
  onCartOpen?: () => void;
}

export function Header({ onCartOpen }: HeaderProps) {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const categoriesId = useId();
  const mobileMenuId = useId();

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setCategoriesOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobile();
        return;
      }

      if (event.key !== 'Tab' || !menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const firstLink = menuRef.current?.querySelector<HTMLElement>('a, button, input');
    firstLink?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="COPA Jewelry home">
          <span className={styles.logoMark}>COPA</span>
          <span className={styles.logoSub}>Jewelry</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_LINKS.slice(0, 3).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li className={styles.dropdown}>
              <button
                type="button"
                className={styles.navLink}
                aria-expanded={categoriesOpen}
                aria-controls={categoriesId}
                onClick={() => setCategoriesOpen((open) => !open)}
                onBlur={() => setTimeout(() => setCategoriesOpen(false), 150)}
              >
                Categories
                <span aria-hidden="true">▾</span>
              </button>
              {categoriesOpen && (
                <ul id={categoriesId} className={styles.dropdownMenu} role="menu">
                  {CATEGORY_NAV.map((category) => (
                    <li key={category.handle} role="none">
                      <Link
                        href={`/collections/${category.handle}`}
                        className={styles.dropdownLink}
                        role="menuitem"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {NAV_LINKS.slice(3).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.desktopSearch}>
            <SearchForm compact />
          </div>
          <Link href="/account" className={styles.actionLink}>
            Account
          </Link>
          <button
            type="button"
            className={styles.cartButton}
            aria-label={`Open cart, ${itemCount} items`}
            onClick={onCartOpen}
          >
            Cart
            {itemCount > 0 && (
              <span className={styles.cartCount} aria-hidden="true">
                {itemCount}
              </span>
            )}
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className={styles.menuIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Close menu"
            onClick={closeMobile}
          />
          <div
            ref={menuRef}
            id={mobileMenuId}
            className={styles.mobileMenu}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <SearchForm onSubmitSuccess={closeMobile} />
            <nav aria-label="Mobile primary">
              <ul className={styles.mobileList}>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.mobileLink} onClick={closeMobile}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <span className={styles.mobileSectionLabel}>Categories</span>
                  <ul className={styles.mobileSubList}>
                    {CATEGORY_NAV.map((category) => (
                      <li key={category.handle}>
                        <Link
                          href={`/collections/${category.handle}`}
                          className={styles.mobileLink}
                          onClick={closeMobile}
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link href="/account" className={styles.mobileLink} onClick={closeMobile}>
                    Account
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
