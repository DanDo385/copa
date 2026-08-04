export type SortOption =
  | "featured"
  | "best-selling"
  | "newest"
  | "price-asc"
  | "price-desc";

export interface ProductFilterRecord {
  handle: string;
  title: string;
  category: string;
  finish: string;
  material: string;
  stone: string;
  size: string;
  style: string;
  priceCents: number;
  available: boolean;
  createdAt: string;
  featuredRank?: number;
  bestSellerRank?: number;
}

export interface FilterState {
  categories: string[];
  finishes: string[];
  materials: string[];
  stones: string[];
  sizes: string[];
  styles: string[];
  priceMinCents?: number;
  priceMaxCents?: number;
  availableOnly: boolean;
}

export const defaultFilterState = (): FilterState => ({
  categories: [],
  finishes: [],
  materials: [],
  stones: [],
  sizes: [],
  styles: [],
  availableOnly: false,
});

function matchesArrayFilter(values: string[], productValue: string): boolean {
  return values.length === 0 || values.includes(productValue);
}

export function applyFilters(products: ProductFilterRecord[], filters: FilterState): ProductFilterRecord[] {
  return products.filter((p) => {
    if (filters.availableOnly && !p.available) return false;
    if (filters.priceMinCents != null && p.priceCents < filters.priceMinCents) return false;
    if (filters.priceMaxCents != null && p.priceCents > filters.priceMaxCents) return false;
    if (!matchesArrayFilter(filters.categories, p.category)) return false;
    if (!matchesArrayFilter(filters.finishes, p.finish)) return false;
    if (!matchesArrayFilter(filters.materials, p.material)) return false;
    if (!matchesArrayFilter(filters.stones, p.stone)) return false;
    if (!matchesArrayFilter(filters.sizes, p.size)) return false;
    if (!matchesArrayFilter(filters.styles, p.style)) return false;
    return true;
  });
}

export function sortProducts(products: ProductFilterRecord[], sort: SortOption): ProductFilterRecord[] {
  const copy = [...products];
  switch (sort) {
    case "featured":
      return copy.sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999));
    case "best-selling":
      return copy.sort((a, b) => (a.bestSellerRank ?? 999) - (b.bestSellerRank ?? 999));
    case "newest":
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "price-asc":
      return copy.sort((a, b) => a.priceCents - b.priceCents);
    case "price-desc":
      return copy.sort((a, b) => b.priceCents - a.priceCents);
    default:
      return copy;
  }
}

export function getActiveFilterCount(filters: FilterState): number {
  let count = 0;
  count += filters.categories.length;
  count += filters.finishes.length;
  count += filters.materials.length;
  count += filters.stones.length;
  count += filters.sizes.length;
  count += filters.styles.length;
  if (filters.priceMinCents != null) count += 1;
  if (filters.priceMaxCents != null) count += 1;
  if (filters.availableOnly) count += 1;
  return count;
}

export function toggleFilterValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
