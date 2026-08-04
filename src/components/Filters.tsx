'use client';

import { useCallback, useMemo } from 'react';
import {
  defaultFilterState,
  toggleFilterValue,
  type FilterState,
} from '@/lib/filters';
import styles from './Filters.module.css';

type FilterGroupKey =
  | 'categories'
  | 'finishes'
  | 'materials'
  | 'stones'
  | 'sizes'
  | 'styles';

const FILTER_GROUPS: {
  key: FilterGroupKey;
  label: string;
}[] = [
  { key: 'categories', label: 'Category' },
  { key: 'finishes', label: 'Finish' },
  { key: 'materials', label: 'Material' },
  { key: 'stones', label: 'Stone' },
  { key: 'sizes', label: 'Size' },
  { key: 'styles', label: 'Style' },
];

export interface FilterOptionSet {
  categories: string[];
  finishes: string[];
  materials: string[];
  stones: string[];
  sizes: string[];
  styles: string[];
}

interface FiltersProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  options: FilterOptionSet;
  /** Called when filters change — ready for URL sync via filter_use. */
  onFilterUse?: (filters: FilterState) => void;
}

export function Filters({ value, onChange, options, onFilterUse }: FiltersProps) {
  const emit = useCallback(
    (next: FilterState) => {
      onChange(next);
      onFilterUse?.(next);
    },
    [onChange, onFilterUse],
  );

  const toggleListFilter = (key: FilterGroupKey, optionValue: string) => {
    emit({
      ...value,
      [key]: toggleFilterValue(value[key], optionValue),
    });
  };

  const clearAll = () => {
    emit(defaultFilterState());
  };

  const hasActiveFilters = useMemo(() => {
    return (
      value.categories.length +
        value.finishes.length +
        value.materials.length +
        value.stones.length +
        value.sizes.length +
        value.styles.length +
        (value.availableOnly ? 1 : 0) +
        (value.priceMinCents != null ? 1 : 0) +
        (value.priceMaxCents != null ? 1 : 0) >
      0
    );
  }, [value]);

  return (
    <aside className={styles.filters} aria-label="Product filters">
      <div className={styles.header}>
        <h2 className={styles.title}>Filter</h2>
        {hasActiveFilters && (
          <button type="button" className={styles.clear} onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Availability</legend>
        <label className={styles.optionLabel}>
          <input
            type="checkbox"
            checked={value.availableOnly}
            onChange={(event) => emit({ ...value, availableOnly: event.target.checked })}
          />
          <span>In stock only</span>
        </label>
      </fieldset>

      {FILTER_GROUPS.map((group) => {
        const groupOptions = options[group.key];
        if (groupOptions.length === 0) return null;

        return (
          <fieldset key={group.key} className={styles.group}>
            <legend className={styles.legend}>{group.label}</legend>
            <ul className={styles.optionList}>
              {groupOptions.map((option) => {
                const checked = value[group.key].includes(option);
                const inputId = `${group.key}-${option}`.replace(/\s+/g, '-').toLowerCase();
                return (
                  <li key={option}>
                    <label htmlFor={inputId} className={styles.optionLabel}>
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleListFilter(group.key, option)}
                      />
                      <span>{option}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        );
      })}

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Price</legend>
        <div className={styles.priceRow}>
          <label className={styles.priceField}>
            <span className={styles.priceLabel}>Min ($)</span>
            <input
              type="number"
              min={0}
              step={1}
              value={value.priceMinCents != null ? value.priceMinCents / 100 : ''}
              onChange={(event) => {
                const dollars = event.target.value;
                emit({
                  ...value,
                  priceMinCents: dollars ? Math.round(Number(dollars) * 100) : undefined,
                });
              }}
              className={styles.priceInput}
            />
          </label>
          <label className={styles.priceField}>
            <span className={styles.priceLabel}>Max ($)</span>
            <input
              type="number"
              min={0}
              step={1}
              value={value.priceMaxCents != null ? value.priceMaxCents / 100 : ''}
              onChange={(event) => {
                const dollars = event.target.value;
                emit({
                  ...value,
                  priceMaxCents: dollars ? Math.round(Number(dollars) * 100) : undefined,
                });
              }}
              className={styles.priceInput}
            />
          </label>
        </div>
      </fieldset>
    </aside>
  );
}
