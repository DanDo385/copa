'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/data/products';
import { sortProducts, type SortOption } from '@/lib/catalog';
import { Container } from '@/components/Container';
import { EmptyState } from '@/components/EmptyState';
import { ProductCard } from '@/components/ProductCard';
import { Section } from '@/components/Section';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'title-asc', label: 'Name: A–Z' },
];

interface CollectionCatalogProps {
  initialProducts: Product[];
  collectionHandle: string;
  title: string;
}

export function CollectionCatalog({
  initialProducts,
  collectionHandle,
  title,
}: CollectionCatalogProps) {
  const [sort, setSort] = useState<SortOption>('featured');
  const [availableOnly, setAvailableOnly] = useState(false);

  const products = useMemo(() => {
    let list = [...initialProducts];
    if (availableOnly) {
      list = list.filter((p) => p.stockState !== 'sold_out' && p.stockState !== 'unavailable');
    }
    return sortProducts(list, sort);
  }, [initialProducts, sort, availableOnly]);

  return (
    <Section spacing="lg">
      <Container>
        <div className="catalog-toolbar">
          <p className="catalog-toolbar__count" aria-live="polite">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'} in {title}
          </p>
          <div className="catalog-toolbar__controls">
            <label className="catalog-toolbar__checkbox">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
              />
              Available only
            </label>
            <label className="catalog-toolbar__sort" htmlFor={`sort-${collectionHandle}`}>
              Sort by
              <select
                id={`sort-${collectionHandle}`}
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {products.length === 0 ? (
          <EmptyState
            title="No pieces match these filters"
            description="Try clearing filters or explore another collection."
          />
        ) : (
          <ul className="grid grid--4 product-grid">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
