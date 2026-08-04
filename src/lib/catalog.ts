/**
 * COPA Jewelry catalog helpers — query, filter, sort, and price formatting.
 */

import { collections, type Collection } from '../data/collections';
import {
  products,
  type Product,
  type ProductCategory,
  type ProductTag,
  type StockState,
} from '../data/products';

/** Demo free-shipping threshold — owner approval required before production */
export const FREE_SHIPPING_THRESHOLD_CENTS = 8000;
export const FREE_SHIPPING_THRESHOLD_LABEL =
  '$80 demo threshold — owner approval required';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'title-asc';

export interface ProductFilter {
  categories?: ProductCategory[];
  tags?: ProductTag[];
  maxPriceCents?: number;
  minPriceCents?: number;
  stockStates?: StockState[];
  handles?: string[];
  excludeHandles?: string[];
  giftEligible?: boolean;
  searchQuery?: string;
}

export function getProduct(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getProducts(handles?: string[]): Product[] {
  if (!handles) return [...products];
  const set = new Set(handles);
  return products.filter((p) => set.has(p.handle));
}

export function getCollection(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}

function matchesFilter(product: Product, filter: ProductFilter): boolean {
  if (filter.categories?.length && !filter.categories.includes(product.category)) {
    return false;
  }
  if (filter.tags?.length && !filter.tags.some((t) => product.tags.includes(t))) {
    return false;
  }
  if (filter.maxPriceCents != null && product.priceCents > filter.maxPriceCents) {
    return false;
  }
  if (filter.minPriceCents != null && product.priceCents < filter.minPriceCents) {
    return false;
  }
  if (filter.stockStates?.length && !filter.stockStates.includes(product.stockState)) {
    return false;
  }
  if (filter.handles?.length && !filter.handles.includes(product.handle)) {
    return false;
  }
  if (filter.excludeHandles?.includes(product.handle)) {
    return false;
  }
  if (filter.giftEligible != null && product.giftEligible !== filter.giftEligible) {
    return false;
  }
  if (filter.searchQuery) {
    const q = filter.searchQuery.toLowerCase();
    const haystack = [
      product.title,
      product.handle,
      product.description,
      product.category,
      ...product.tags,
      ...product.finishes,
    ]
      .join(' ')
      .toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

export function filterProducts(filter: ProductFilter): Product[] {
  return products.filter((p) => matchesFilter(p, filter));
}

export function sortProducts(items: Product[], sort: SortOption = 'featured'): Product[] {
  const sorted = [...items];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.priceCents - b.priceCents);
    case 'price-desc':
      return sorted.sort((a, b) => b.priceCents - a.priceCents);
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
      return sorted.sort((a, b) => {
        const aNew = a.tags.includes('new') ? 1 : 0;
        const bNew = b.tags.includes('new') ? 1 : 0;
        return bNew - aNew || a.title.localeCompare(b.title);
      });
    case 'featured':
    default:
      return sorted.sort((a, b) => {
        const score = (p: Product) =>
          (p.tags.includes('bestseller') ? 3 : 0) +
          (p.tags.includes('new') ? 2 : 0) +
          (p.stockState === 'in_stock' ? 1 : 0);
        return score(b) - score(a) || a.title.localeCompare(b.title);
      });
  }
}

export function getCollectionProducts(
  collectionHandle: string,
  sort?: SortOption
): Product[] {
  const collection = getCollection(collectionHandle);
  if (!collection) return [];
  const filtered = filterProducts(collection.filter);
  return sortProducts(filtered, sort ?? collection.sortDefault);
}

export function searchProducts(query: string, sort: SortOption = 'featured'): Product[] {
  return sortProducts(filterProducts({ searchQuery: query }), sort);
}

export function getRelated(handle: string, limit = 4): Product[] {
  const product = getProduct(handle);
  if (!product) return [];
  const related = product.relatedHandles
    .map((h) => getProduct(h))
    .filter((p): p is Product => p != null);
  if (related.length >= limit) return related.slice(0, limit);
  const sameCategory = products.filter(
    (p) => p.handle !== handle && p.category === product.category
  );
  const extras = sameCategory.filter((p) => !related.some((r) => r.handle === p.handle));
  return [...related, ...extras].slice(0, limit);
}

export function formatPrice(
  cents: number,
  opts?: { placeholder?: boolean; locale?: string }
): string {
  const formatted = new Intl.NumberFormat(opts?.locale ?? 'en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
  return opts?.placeholder ? `${formatted} (placeholder)` : formatted;
}

export function freeShippingThreshold(): {
  cents: number;
  formatted: string;
  demo: true;
  label: string;
} {
  return {
    cents: FREE_SHIPPING_THRESHOLD_CENTS,
    formatted: formatPrice(FREE_SHIPPING_THRESHOLD_CENTS),
    demo: true,
    label: FREE_SHIPPING_THRESHOLD_LABEL,
  };
}

export function qualifiesForFreeShipping(subtotalCents: number): boolean {
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getAvailableVariants(product: Product) {
  return product.variants.filter((v) => v.available);
}

export { products, collections };
