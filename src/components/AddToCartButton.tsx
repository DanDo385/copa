'use client';

import type { ReactNode } from 'react';
import type { Product, ProductVariant } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { Button } from './Button';
import styles from './AddToCartButton.module.css';

interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant | null;
  quantity?: number;
  disabled?: boolean;
  stickyMobile?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  variant,
  quantity = 1,
  disabled = false,
  stickyMobile = false,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const isDisabled =
    disabled || !variant || !variant.available || variant.stockState === 'sold_out';

  const handleClick = () => {
    if (!variant || isDisabled) return;
    addItem({ product, variant, quantity });
  };

  const button = (
    <Button
      variant="primary"
      size="lg"
      fullWidth
      disabled={isDisabled}
      onClick={handleClick}
      className={className}
      aria-label={`Add ${product.title} to bag`}
    >
      Add to bag
    </Button>
  );

  if (!stickyMobile) return button;

  return (
    <>
      <div className={styles.desktopButton}>{button}</div>
      <div className={styles.stickyWrap}>
        <div className={styles.stickyInner}>{button}</div>
      </div>
    </>
  );
}

export function StickyAddToCart({ children }: { children: ReactNode }) {
  return (
    <div className={styles.stickyWrap}>
      <div className={styles.stickyInner}>{children}</div>
    </div>
  );
}
