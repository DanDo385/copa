'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import type { Product, StockState } from '@/data/products';
import { formatPrice } from '@/lib/catalog';
import { useCart } from '@/lib/cart-context';
import { useOwnerReview } from '@/lib/owner-review-context';
import { PlaceholderBadge } from './PlaceholderBadge';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

function stockLabel(state: StockState): string {
  switch (state) {
    case 'in_stock':
      return 'In stock';
    case 'limited':
      return 'Limited availability';
    case 'sold_out':
      return 'Sold out';
    case 'unavailable':
      return 'Unavailable';
    default:
      return 'Availability to be confirmed';
  }
}

export function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const { addItem } = useCart();
  const { reviewMode } = useOwnerReview();
  const primaryImage = product.images[0];
  const defaultVariant = product.variants.find((v) => v.available) ?? product.variants[0];

  const finishLabel = useMemo(() => {
    if (product.finishes.length === 1) return product.finishes[0];
    if (product.finishes.length > 1) return `${product.finishes.length} finishes`;
    return undefined;
  }, [product.finishes]);

  const handleQuickAdd = () => {
    if (!defaultVariant?.available) return;
    addItem({ product, variant: defaultVariant, quantity: 1 });
  };

  return (
    <article className={styles.card}>
      <Link href={`/products/${product.handle}`} className={styles.mediaLink}>
        <div className={styles.imageWrap}>
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={product.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.imageFallback} aria-hidden="true" />
          )}
        </div>
      </Link>

      <div className={styles.body}>
        <Link href={`/products/${product.handle}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>

        <p className={styles.price}>
          {formatPrice(product.priceCents)}
          {product.priceIsPlaceholder && (
            <PlaceholderBadge label="Price to be confirmed" className={styles.priceBadge} />
          )}
        </p>

        {finishLabel && <p className={styles.finish}>{finishLabel}</p>}

        <p className={styles.stock} data-status={product.stockState}>
          {stockLabel(product.stockState)}
        </p>

        {reviewMode && (
          <div className={styles.reviewSlot} aria-label="Review preview placeholder">
            <PlaceholderBadge label="Judge.me preview" />
          </div>
        )}

        {showQuickAdd && defaultVariant?.available && (
          <button
            type="button"
            className={styles.quickAdd}
            onClick={handleQuickAdd}
            aria-label={`Quick add ${product.title} to cart`}
          >
            Quick add
          </button>
        )}
      </div>
    </article>
  );
}
