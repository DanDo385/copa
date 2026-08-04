'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { PlaceholderBadge } from './PlaceholderBadge';
import styles from './ProductGallery.module.css';

const GALLERY_SLOTS = [
  'Product',
  'On body',
  'Scale',
  'Detail',
  'Movement',
  'Styling',
] as const;

interface ProductGalleryProps {
  images: string[];
  productTitle: string;
}

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const liveId = useId();

  const goTo = useCallback(
    (index: number) => {
      if (images.length === 0) return;
      setActiveIndex((index + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    const node = thumbsRef.current?.querySelector<HTMLButtonElement>(
      `[data-index="${activeIndex}"]`,
    );
    node?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  if (images.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.mainEmpty}>
          <PlaceholderBadge prominent />
          <p>Production product imagery required.</p>
        </div>
      </div>
    );
  }

  const activeImage = images[activeIndex];
  const slotLabel = GALLERY_SLOTS[activeIndex] ?? GALLERY_SLOTS[0];

  return (
    <div className={styles.gallery} onKeyDown={handleKeyDown}>
      <div className={styles.main} aria-live="polite" aria-atomic="true" id={liveId}>
        <Image
          src={activeImage}
          alt={`${productTitle} — ${slotLabel}`}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.mainImage}
        />
        <span className={styles.slotBadge}>{slotLabel}</span>
      </div>

      <div
        ref={thumbsRef}
        className={styles.thumbs}
        role="tablist"
        aria-label={`${productTitle} gallery`}
      >
        {images.map((image, index) => {
          const selected = index === activeIndex;
          const label = GALLERY_SLOTS[index] ?? `View ${index + 1}`;
          return (
            <button
              key={`${image}-${index}`}
              type="button"
              role="tab"
              data-index={index}
              aria-selected={selected}
              aria-controls={liveId}
              tabIndex={selected ? 0 : -1}
              className={[styles.thumb, selected ? styles.thumbActive : ''].join(' ')}
              onClick={() => setActiveIndex(index)}
            >
              <Image src={image} alt="" fill sizes="80px" className={styles.thumbImage} />
              <span className={styles.thumbLabel}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
