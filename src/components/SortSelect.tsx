'use client';

import type { SortOption } from '@/lib/filters';
import styles from './SortSelect.module.css';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best selling' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  id?: string;
}

export function SortSelect({ value, onChange, id = 'product-sort' }: SortSelectProps) {
  return (
    <div className={styles.wrap}>
      <label htmlFor={id} className={styles.label}>
        Sort by
      </label>
      <select
        id={id}
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
