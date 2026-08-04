'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/Container';
import { EmptyState } from '@/components/EmptyState';
import { PlaceholderBadge } from '@/components/PlaceholderBadge';
import { ProductCard } from '@/components/ProductCard';
import { SearchForm } from '@/components/SearchForm';
import { Section } from '@/components/Section';
import { searchProducts, sortProducts, type SortOption } from '@/lib/catalog';

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim();
  const [sort, setSort] = useState<SortOption>('featured');

  const results = useMemo(() => {
    if (!query) return [];
    return sortProducts(searchProducts(query), sort);
  }, [query, sort]);

  return (
    <>
      <Section spacing="sm">
        <Container>
          <SearchForm initialQuery={query} />
        </Container>
      </Section>

      <Section>
        <Container>
          {query ? (
            <>
              <p className="catalog-toolbar__count" aria-live="polite">
                {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}
                &rdquo;
              </p>
              <label className="catalog-toolbar__sort" htmlFor="search-sort">
                Sort by
                <select
                  id="search-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </label>
            </>
          ) : (
            <p className="text-muted">Enter a search term to explore the catalogue.</p>
          )}

          {query && results.length === 0 ? (
            <EmptyState
              title={`No results for “${query}”`}
              description="Try a shorter keyword, browse categories, or explore best sellers."
            />
          ) : null}

          {results.length > 0 ? (
            <ul className="grid grid--4 product-grid">
              {results.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : null}

          {!query && (
            <div className="search-recovery">
              <PlaceholderBadge />
              <p>Browse curated starting points while search indexing is finalized.</p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
