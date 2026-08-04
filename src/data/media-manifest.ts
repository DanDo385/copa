/**
 * COPA Jewelry media asset manifest — intended reuse from copajewelry.com product pages.
 * Rights: INTERNAL_PROTOTYPE_ONLY until owner confirms download and licensing.
 */

export type MediaRights = 'INTERNAL_PROTOTYPE_ONLY' | 'LICENSED' | 'UNKNOWN';

export type MediaQuality = 'unknown' | 'web' | 'print' | 'master';

export type ProposedPlacement =
  | 'pdp-hero'
  | 'pdp-gallery'
  | 'collection-card'
  | 'homepage-feature'
  | 'cart-thumbnail';

export interface MediaAsset {
  id: string;
  productHandle: string;
  sourceUrl: string;
  rights: MediaRights;
  quality: MediaQuality;
  proposedPlacements: ProposedPlacement[];
  downloaded: boolean;
  notes: string;
}

const PDP_BASE = 'https://copajewelry.com/products';

export const mediaManifest: MediaAsset[] = [
  {
    id: 'media-intaglio-bracelet',
    productHandle: 'intaglio-bracelet',
    sourceUrl: `${PDP_BASE}/intaglio-bracelet`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'collection-card', 'homepage-feature'],
    downloaded: false,
    notes: 'Primary hero from live PDP — quality unknown until download.',
  },
  {
    id: 'media-fleur-earrings',
    productHandle: 'fleur-earrings',
    sourceUrl: `${PDP_BASE}/fleur-earrings`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'collection-card'],
    downloaded: false,
    notes: 'Sold-out badge state may differ on live site.',
  },
  {
    id: 'media-sultan-snake-ring',
    productHandle: 'sultan-snake-ring',
    sourceUrl: `${PDP_BASE}/sultan-snake-ring`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'collection-card'],
    downloaded: false,
    notes: 'Snake detail shots useful for gallery slots.',
  },
  {
    id: 'media-snake-necklace',
    productHandle: 'snake-necklace',
    sourceUrl: `${PDP_BASE}/snake-necklace`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'pdp-gallery', 'homepage-feature'],
    downloaded: false,
    notes: 'Capture gold and silver variant images separately.',
  },
  {
    id: 'media-moissanite-full-eternity-band-ring',
    productHandle: 'moissanite-full-eternity-band-ring',
    sourceUrl: `${PDP_BASE}/moissanite-full-eternity-band-ring`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'pdp-gallery'],
    downloaded: false,
    notes: 'Macro stone detail for gallery slot 2.',
  },
  {
    id: 'media-natural-crystal-ring',
    productHandle: 'natural-crystal-ring',
    sourceUrl: `${PDP_BASE}/natural-crystal-ring`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'collection-card'],
    downloaded: false,
    notes: 'Natural stone variance — each unit may look different.',
  },
  {
    id: 'media-petalia-clip-on-earrings',
    productHandle: 'petalia-clip-on-earrings',
    sourceUrl: `${PDP_BASE}/petalia-clip-on-earrings`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'collection-card'],
    downloaded: false,
    notes: 'On-ear lifestyle shot if available on PDP.',
  },
  {
    id: 'media-imperial-necklace',
    productHandle: 'imperial-necklace',
    sourceUrl: `${PDP_BASE}/imperial-necklace`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'homepage-feature', 'collection-card'],
    downloaded: false,
    notes: 'Bestseller merchandising candidate.',
  },
  {
    id: 'media-diamond-dust-ring',
    productHandle: 'diamond-dust-ring',
    sourceUrl: `${PDP_BASE}/diamond-dust-ring`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'collection-card', 'cart-thumbnail'],
    downloaded: false,
    notes: 'Rhodium and gold variant images if listed.',
  },
  {
    id: 'media-tiara-double-ring',
    productHandle: 'tiara-double-ring',
    sourceUrl: `${PDP_BASE}/tiara-double-ring`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'collection-card'],
    downloaded: false,
    notes: 'On-hand styling shot preferred for double-band silhouette.',
  },
  {
    id: 'media-intaglio-earrings',
    productHandle: 'intaglio-earrings',
    sourceUrl: `${PDP_BASE}/intaglio-earrings`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'collection-card'],
    downloaded: false,
    notes: 'Pair with intaglio-bracelet for set merchandising.',
  },
  {
    id: 'media-catena-body-chain',
    productHandle: 'catena-body-chain',
    sourceUrl: `${PDP_BASE}/catena-body-chain`,
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['pdp-hero', 'pdp-gallery'],
    downloaded: false,
    notes: 'Full-body styling image critical for body chain PDP.',
  },
  {
    id: 'media-brand-logo',
    productHandle: '_brand',
    sourceUrl: 'https://copajewelry.com',
    rights: 'INTERNAL_PROTOTYPE_ONLY',
    quality: 'unknown',
    proposedPlacements: ['homepage-feature'],
    downloaded: false,
    notes: 'Header/logo asset from homepage — confirm trademark usage.',
  },
];

export const mediaManifestNote =
  'All assets marked INTERNAL_PROTOTYPE_ONLY. Quality unknown until download. Do not use in production without owner rights confirmation.';
