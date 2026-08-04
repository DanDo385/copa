'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useMemo, useRef } from 'react';
import { products } from '@/data/products';
import { formatPrice, getProduct } from '@/lib/catalog';
import { useCart } from '@/lib/cart-context';
import { getCartAddOns } from '@/lib/recommendations';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { PlaceholderBadge } from './PlaceholderBadge';
import { ProductCard } from './ProductCard';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const {
    lines,
    subtotalCents,
    itemCount,
    giftOption,
    setGiftOption,
    updateQty,
    removeItem,
    amountUntilFreeShippingCents,
    qualifiesForFreeShipping,
    freeShippingThresholdCents,
  } = useCart();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const addOnProducts = useMemo(() => {
    const cartHandles = lines.map((line) => line.productHandle);
    const catalogHandles = products.map((product) => product.handle);
    return getCartAddOns(cartHandles, catalogHandles, 3)
      .map((handle) => getProduct(handle))
      .filter((product): product is NonNullable<typeof product> => product != null);
  }, [lines]);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const progressPercent = qualifiesForFreeShipping
    ? 100
    : Math.min(
        100,
        Math.round((subtotalCents / Math.max(freeShippingThresholdCents, 1)) * 100),
      );

  return (
    <div className={styles.root}>
      <button type="button" className={styles.backdrop} aria-label="Close cart" onClick={onClose} />
      <div
        ref={dialogRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            Your bag ({itemCount})
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            Close
          </button>
        </header>

        <div className={styles.content}>
          {lines.length === 0 ? (
            <EmptyState
              title="Your bag is empty"
              description="Explore bestsellers or shop by category to find your next piece."
            />
          ) : (
            <>
              <div className={styles.shippingProgress} aria-live="polite">
                {qualifiesForFreeShipping ? (
                  <p>You qualify for free shipping on this order.</p>
                ) : (
                  <p>
                    Add {formatPrice(amountUntilFreeShippingCents)} more for free shipping
                    <span className={styles.demoNote}> (demo threshold)</span>
                  </p>
                )}
                <div
                  className={styles.progressBar}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progressPercent}
                  aria-label="Progress toward free shipping"
                >
                  <span className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <ul className={styles.lines}>
                {lines.map((line) => (
                  <li key={line.lineId} className={styles.line}>
                    <div className={styles.lineMedia}>
                      {line.imageSrc ? (
                        <Image
                          src={line.imageSrc}
                          alt=""
                          width={72}
                          height={90}
                          className={styles.lineImage}
                        />
                      ) : (
                        <div className={styles.lineFallback} aria-hidden="true" />
                      )}
                    </div>
                    <div className={styles.lineBody}>
                      <Link href={`/products/${line.productHandle}`} className={styles.lineTitle}>
                        {line.title}
                      </Link>
                      <p className={styles.lineVariant}>{line.variantLabel}</p>
                      <p className={styles.linePrice}>{formatPrice(line.priceCents)}</p>
                      <div className={styles.qtyRow}>
                        <label htmlFor={`qty-${line.lineId}`} className={styles.qtyLabel}>
                          Quantity
                        </label>
                        <input
                          id={`qty-${line.lineId}`}
                          type="number"
                          min={1}
                          max={99}
                          value={line.quantity}
                          onChange={(event) =>
                            updateQty(line.lineId, Number(event.target.value))
                          }
                          className={styles.qtyInput}
                        />
                        <button
                          type="button"
                          className={styles.remove}
                          onClick={() => removeItem(line.lineId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={styles.giftOption}>
                <label className={styles.giftLabel}>
                  <input
                    type="checkbox"
                    checked={giftOption}
                    onChange={(event) => setGiftOption(event.target.checked)}
                  />
                  <span>Add gift packaging</span>
                </label>
                <p className={styles.giftNote}>
                  Gift price, contents, and note behavior require owner approval.
                </p>
                <PlaceholderBadge />
              </div>

              {addOnProducts.length > 0 && (
                <section className={styles.addOns} aria-label="Curated add-ons">
                  <h3 className={styles.addOnsTitle}>Selected to pair with your bag</h3>
                  <div className={styles.addOnGrid}>
                    {addOnProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        <footer className={styles.footer}>
          <div className={styles.summary}>
            <span>Subtotal</span>
            <strong>{formatPrice(subtotalCents)}</strong>
          </div>
          <p className={styles.summaryNote}>
            Shipping, tax, and duties calculated at checkout once policies are approved.
          </p>
          <Button variant="primary" size="lg" fullWidth disabled aria-disabled="true">
            Checkout — prototype only
          </Button>
          <Link href="/cart" className={styles.fullCartLink} onClick={onClose}>
            View full cart
          </Link>
        </footer>
      </div>
    </div>
  );
}
