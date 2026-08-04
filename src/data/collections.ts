/**
 * COPA Jewelry collection registry — prototype merchandising groups.
 */

import type { ProductCategory, ProductTag } from './products';

export type CollectionKind = 'category' | 'merchandising' | 'demo';

export interface CollectionFilter {
  categories?: ProductCategory[];
  tags?: ProductTag[];
  maxPriceCents?: number;
  handles?: string[];
  excludeHandles?: string[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  kind: CollectionKind;
  filter: CollectionFilter;
  sortDefault: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  /** Owner must approve demo thresholds before production */
  ownerApprovalRequired?: boolean;
  placeholderNote?: string;
}

export const collections: Collection[] = [
  {
    id: 'col-all',
    handle: 'all',
    title: 'All Jewelry',
    description: 'Browse the full COPA catalog prototype.',
    kind: 'category',
    filter: {},
    sortDefault: 'featured',
  },
  {
    id: 'col-earrings',
    handle: 'earrings',
    title: 'Earrings',
    description: 'Studs, hoops, clips, and statement earrings.',
    kind: 'category',
    filter: { categories: ['earrings'] },
    sortDefault: 'featured',
  },
  {
    id: 'col-necklaces',
    handle: 'necklaces',
    title: 'Necklaces',
    description: 'Necklaces and body chains.',
    kind: 'category',
    filter: { categories: ['necklaces'] },
    sortDefault: 'featured',
  },
  {
    id: 'col-rings',
    handle: 'rings',
    title: 'Rings',
    description: 'Bands, statement rings, and stacking sets.',
    kind: 'category',
    filter: { categories: ['rings'] },
    sortDefault: 'featured',
  },
  {
    id: 'col-bracelets',
    handle: 'bracelets',
    title: 'Bracelets',
    description: 'Bracelets and wrist statement pieces.',
    kind: 'category',
    filter: { categories: ['bracelets'], excludeHandles: ['gift-wrap'] },
    sortDefault: 'featured',
  },
  {
    id: 'col-ear-cuffs',
    handle: 'ear-cuffs',
    title: 'Ear Cuffs',
    description: 'Non-pierced and cuff-style ear pieces.',
    kind: 'category',
    filter: { categories: ['ear-cuffs'] },
    sortDefault: 'featured',
  },
  {
    id: 'col-best-sellers',
    handle: 'best-sellers',
    title: 'Best Sellers',
    description: 'Customer favorites from the COPA catalog.',
    kind: 'merchandising',
    filter: { tags: ['bestseller'] },
    sortDefault: 'featured',
  },
  {
    id: 'col-new-arrivals',
    handle: 'new-arrivals',
    title: 'New Arrivals',
    description: 'Latest additions to the collection.',
    kind: 'merchandising',
    filter: { tags: ['new'] },
    sortDefault: 'newest',
  },
  {
    id: 'col-gifts',
    handle: 'gifts',
    title: 'Gifts',
    description: 'Gift-ready pieces and presentation options.',
    kind: 'merchandising',
    filter: { tags: ['gift'] },
    sortDefault: 'featured',
  },
  {
    id: 'col-gifts-under-75',
    handle: 'gifts-under-75',
    title: 'Gifts Under $75',
    description: 'Curated gift picks under $75 — demo threshold pending owner approval.',
    kind: 'demo',
    filter: { tags: ['gift'], maxPriceCents: 7500 },
    sortDefault: 'price-asc',
    ownerApprovalRequired: true,
    placeholderNote: '$75 threshold is prototype demo config; owner must approve before production.',
  },
  {
    id: 'col-limited-edition',
    handle: 'limited-edition',
    title: 'Limited Edition',
    description: 'Template collection for limited-run and seasonal drops.',
    kind: 'merchandising',
    filter: { tags: ['limited'] },
    sortDefault: 'newest',
    placeholderNote: 'Template data — populate with confirmed limited SKUs before launch.',
  },
];

export const collectionHandles = collections.map((c) => c.handle);
