'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useId } from 'react';
import styles from './SearchForm.module.css';

interface SearchFormProps {
  compact?: boolean;
  initialQuery?: string;
  onSubmitSuccess?: () => void;
}

export function SearchForm({ compact = false, initialQuery = '', onSubmitSuccess }: SearchFormProps) {
  const router = useRouter();
  const inputId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get('q') ?? '').trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/search');
    }
    onSubmitSuccess?.();
  };

  return (
    <form
      className={[styles.form, compact ? styles.compact : ''].filter(Boolean).join(' ')}
      role="search"
      onSubmit={handleSubmit}
    >
      <label htmlFor={inputId} className={styles.label}>
        Search jewelry
      </label>
      <div className={styles.fieldRow}>
        <input
          id={inputId}
          name="q"
          type="search"
          defaultValue={initialQuery}
          placeholder="Search earrings, rings, finishes…"
          className={styles.input}
          autoComplete="off"
          enterKeyHint="search"
        />
        <button type="submit" className={styles.submit}>
          Search
        </button>
      </div>
    </form>
  );
}
