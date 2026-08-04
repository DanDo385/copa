'use client';

import { useEffect, useId, useMemo } from 'react';
import type { Product, ProductVariant, StockState } from '@/data/products';
import styles from './VariantSelector.module.css';

interface VariantSelectorProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
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

export function VariantSelector({
  product,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  const finishGroupId = useId();
  const sizeGroupId = useId();
  const stockLiveId = useId();

  const finishes = useMemo(
    () => [...new Set(product.variants.map((v) => v.finish).filter(Boolean))] as string[],
    [product.variants],
  );

  const sizes = useMemo(
    () => [...new Set(product.variants.map((v) => v.size).filter(Boolean))] as string[],
    [product.variants],
  );

  const selectedFinish = selectedVariant?.finish;
  const selectedSize = selectedVariant?.size;

  const findVariant = (finish?: string, size?: string) =>
    product.variants.find(
      (variant) =>
        (finish ? variant.finish === finish : true) &&
        (size ? variant.size === size : true),
    );

  useEffect(() => {
    if (!selectedVariant && product.variants[0]) {
      onVariantChange(product.variants[0]);
    }
  }, [product.variants, selectedVariant, onVariantChange]);

  const handleFinishChange = (finish: string) => {
    const variant =
      findVariant(finish, selectedSize) ??
      findVariant(finish) ??
      product.variants.find((v) => v.finish === finish);
    if (variant) onVariantChange(variant);
  };

  const handleSizeChange = (size: string) => {
    const variant =
      findVariant(selectedFinish, size) ??
      findVariant(undefined, size) ??
      product.variants.find((v) => v.size === size);
    if (variant) onVariantChange(variant);
  };

  const stockStatus = selectedVariant?.stockState ?? product.stockState;

  return (
    <div className={styles.selector}>
      {finishes.length > 0 && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Finish</legend>
          <div role="radiogroup" aria-labelledby={finishGroupId} className={styles.optionRow}>
            <span id={finishGroupId} className={styles.srOnly}>
              Select finish
            </span>
            {finishes.map((finish) => (
              <label key={finish} className={styles.option}>
                <input
                  type="radio"
                  name={`finish-${product.id}`}
                  value={finish}
                  checked={selectedFinish === finish}
                  onChange={() => handleFinishChange(finish)}
                />
                <span className={styles.optionLabel}>{finish}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {sizes.length > 0 && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Size</legend>
          <div role="radiogroup" aria-labelledby={sizeGroupId} className={styles.optionRow}>
            <span id={sizeGroupId} className={styles.srOnly}>
              Select size
            </span>
            {sizes.map((size) => (
              <label key={size} className={styles.option}>
                <input
                  type="radio"
                  name={`size-${product.id}`}
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => handleSizeChange(size)}
                />
                <span className={styles.optionLabel}>{size}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <p className={styles.stock} id={stockLiveId} aria-live="polite">
        {stockLabel(stockStatus)}
      </p>
    </div>
  );
}
