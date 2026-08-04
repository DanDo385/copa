/**
 * COPA Jewelry claim registry — governs what may be published and where.
 * Aug 3, 2026 audit baseline.
 */

import type { ClaimStatus } from './products';

export type ClaimSurface =
  | 'pdp'
  | 'collection'
  | 'homepage'
  | 'footer'
  | 'faq'
  | 'checkout'
  | 'live-show'
  | 'social'
  | 'press'
  | 'email';

export interface Claim {
  claim_id: string;
  proposedPublicWording: string;
  applicableProducts: string[] | '*';
  evidenceSource: string;
  evidenceOwner: string;
  approvalStatus: ClaimStatus;
  usageBoundary: string;
  warrantyImplication: boolean;
  allowedSurfaces: ClaimSurface[];
  lastVerifiedDate: string | null;
  notes?: string;
}

export function isClaimPublishable(claim: Claim): boolean {
  return claim.approvalStatus === 'VERIFIED' || claim.approvalStatus === 'OWNER_APPROVED';
}

export const claims: Claim[] = [
  {
    claim_id: 'brand-name-copa-jewelry',
    proposedPublicWording: 'COPA Jewelry',
    applicableProducts: '*',
    evidenceSource: 'Public storefront and Whatnot shop branding observed Aug 3, 2026',
    evidenceOwner: 'Brand / Owner',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Use as primary brand name across all customer-facing surfaces.',
    warrantyImplication: false,
    allowedSurfaces: ['pdp', 'collection', 'homepage', 'footer', 'faq', 'checkout', 'live-show', 'social', 'press', 'email'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'whatnot-followers-17-4k',
    proposedPublicWording: '17.4K followers on Whatnot',
    applicableProducts: '*',
    evidenceSource: 'Whatnot shop profile observed Aug 3, 2026 — https://www.whatnot.com/user/copajewelry',
    evidenceOwner: 'Whatnot platform metrics',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Attribute explicitly to Whatnot; never imply website follower count.',
    warrantyImplication: false,
    allowedSurfaces: ['homepage', 'live-show', 'social'],
    lastVerifiedDate: '2026-08-03',
    notes: 'Aggregate metric — refresh periodically.',
  },
  {
    claim_id: 'whatnot-items-sold-27-8k',
    proposedPublicWording: '27.8K items sold on Whatnot',
    applicableProducts: '*',
    evidenceSource: 'Whatnot shop profile observed Aug 3, 2026',
    evidenceOwner: 'Whatnot platform metrics',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Whatnot channel only; do not conflate with DTC website order volume.',
    warrantyImplication: false,
    allowedSurfaces: ['homepage', 'live-show', 'social'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'whatnot-reviews-4707-5-0',
    proposedPublicWording: '4,707 reviews with 5.0 rating on Whatnot',
    applicableProducts: '*',
    evidenceSource: 'Whatnot shop profile observed Aug 3, 2026',
    evidenceOwner: 'Whatnot platform metrics',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Must label as Whatnot reviews; never present as website reviews.',
    warrantyImplication: false,
    allowedSurfaces: ['homepage', 'live-show', 'social'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'whatnot-premier-shop',
    proposedPublicWording: 'Whatnot Premier Shop',
    applicableProducts: '*',
    evidenceSource: 'Whatnot shop badge observed Aug 3, 2026',
    evidenceOwner: 'Whatnot platform',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Whatnot-specific badge; include platform name.',
    warrantyImplication: false,
    allowedSurfaces: ['homepage', 'live-show', 'social'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'whatnot-one-day-shipping',
    proposedPublicWording: 'One-day average shipping on Whatnot orders',
    applicableProducts: '*',
    evidenceSource: 'Whatnot shop profile shipping stat observed Aug 3, 2026',
    evidenceOwner: 'Whatnot platform metrics',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Whatnot channel fulfillment only; website shipping policy is separate gate.',
    warrantyImplication: false,
    allowedSurfaces: ['live-show', 'social'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'website-judgeme-4-71-78',
    proposedPublicWording: '4.71 out of 5 from 78 reviews (Judge.me on-site)',
    applicableProducts: '*',
    evidenceSource: 'Judge.me widget on copajewelry.com observed Aug 3, 2026',
    evidenceOwner: 'Judge.me / Website',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Website reviews only; never merge with Whatnot review counts.',
    warrantyImplication: false,
    allowedSurfaces: ['pdp', 'homepage', 'collection'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'free-shipping-80-threshold',
    proposedPublicWording: 'Free shipping on orders over $80',
    applicableProducts: '*',
    evidenceSource: 'Prototype demo config — observed promotional pattern; terms not legally verified',
    evidenceOwner: 'Owner / Operations',
    approvalStatus: 'OWNER_APPROVED',
    usageBoundary: 'Demo/configurable threshold (8000 cents). Owner must confirm final policy before production checkout.',
    warrantyImplication: false,
    allowedSurfaces: ['homepage', 'collection', 'checkout', 'faq'],
    lastVerifiedDate: null,
    notes: 'Configurable in catalog.ts as freeShippingThreshold.',
  },
  {
    claim_id: 'lifetime-warranty',
    proposedPublicWording: 'Lifetime warranty on all pieces',
    applicableProducts: '*',
    evidenceSource: 'Observed on legacy/marketing surfaces — terms document not reviewed',
    evidenceOwner: 'Legal / Owner',
    approvalStatus: 'DO_NOT_PUBLISH',
    usageBoundary: 'Blocked until written warranty terms are reviewed and approved.',
    warrantyImplication: true,
    allowedSurfaces: [],
    lastVerifiedDate: null,
    notes: 'Gate blocked — no warranty language in prototype customer surfaces.',
  },
  {
    claim_id: 'hypoallergenic-blanket',
    proposedPublicWording: 'Hypoallergenic / nickel-free jewelry',
    applicableProducts: '*',
    evidenceSource: 'Not verified — no supplier allergen test documentation on file',
    evidenceOwner: 'Supplier / Legal',
    approvalStatus: 'DO_NOT_PUBLISH',
    usageBoundary: 'Do not use blanket hypoallergenic or nickel-free claims on any surface.',
    warrantyImplication: true,
    allowedSurfaces: [],
    lastVerifiedDate: null,
  },
  {
    claim_id: 'water-resistant-tarnish-free',
    proposedPublicWording: 'Water-resistant / tarnish-free / shower-safe',
    applicableProducts: '*',
    evidenceSource: 'Not verified — no accelerated wear or corrosion test documentation',
    evidenceOwner: 'Supplier / Owner',
    approvalStatus: 'DO_NOT_PUBLISH',
    usageBoundary: 'Do not publish performance claims without supplier evidence.',
    warrantyImplication: true,
    allowedSurfaces: [],
    lastVerifiedDate: null,
  },
  {
    claim_id: 'nyfw-spfw',
    proposedPublicWording: 'New York Fashion Week / São Paulo Fashion Week features',
    applicableProducts: '*',
    evidenceSource: 'Observed in marketing copy — press documentation not verified Aug 3, 2026',
    evidenceOwner: 'Owner / PR',
    approvalStatus: 'DO_NOT_PUBLISH',
    usageBoundary: 'Blocked until press clips, dates, and usage rights confirmed.',
    warrantyImplication: false,
    allowedSurfaces: [],
    lastVerifiedDate: null,
  },
  {
    claim_id: 'schon-editorial',
    proposedPublicWording: 'As featured in Schön Magazine',
    applicableProducts: '*',
    evidenceSource: 'Editorial reference observed — publication rights and exact wording not verified',
    evidenceOwner: 'Owner / Legal',
    approvalStatus: 'LEGAL_REVIEW_REQUIRED',
    usageBoundary: 'Requires legal review of editorial credit line and image rights before any surface.',
    warrantyImplication: false,
    allowedSurfaces: [],
    lastVerifiedDate: null,
  },
  {
    claim_id: 'petalia-made-in-italy',
    proposedPublicWording: 'Made in Italy',
    applicableProducts: ['petalia-clip-on-earrings'],
    evidenceSource: 'Public PDP origin claim — supplier certificate not on file',
    evidenceOwner: 'Supplier / Owner',
    approvalStatus: 'LEGAL_REVIEW_REQUIRED',
    usageBoundary: 'Product-specific origin claim; requires supplier documentation before PDP publication.',
    warrantyImplication: false,
    allowedSurfaces: [],
    lastVerifiedDate: null,
  },
  {
    claim_id: 'intaglio-bracelet-materials',
    proposedPublicWording: 'Brass base, 18k gold plating, acrylic resin, glass agate',
    applicableProducts: ['intaglio-bracelet'],
    evidenceSource: 'Public PDP copajewelry.com observed Aug 3, 2026',
    evidenceOwner: 'Supplier / PDP',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Micron plating depth not listed — do not add micron spec.',
    warrantyImplication: false,
    allowedSurfaces: ['pdp'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'sultan-snake-ring-materials',
    proposedPublicWording: 'Stainless steel with 18k gold plating',
    applicableProducts: ['sultan-snake-ring'],
    evidenceSource: 'Public PDP observed Aug 3, 2026',
    evidenceOwner: 'Supplier / PDP',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'No micron depth claim.',
    warrantyImplication: false,
    allowedSurfaces: ['pdp'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'imperial-necklace-materials',
    proposedPublicWording: 'Stainless steel, 18k gold plated',
    applicableProducts: ['imperial-necklace'],
    evidenceSource: 'Public PDP observed Aug 3, 2026',
    evidenceOwner: 'Supplier / PDP',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'No performance claims.',
    warrantyImplication: false,
    allowedSurfaces: ['pdp'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'moissanite-ring-materials',
    proposedPublicWording: '925 sterling silver with moissanite stones',
    applicableProducts: ['moissanite-full-eternity-band-ring'],
    evidenceSource: 'Public PDP observed Aug 3, 2026',
    evidenceOwner: 'Supplier / PDP',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Do not claim diamond equivalency or graded diamond certification.',
    warrantyImplication: false,
    allowedSurfaces: ['pdp'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'natural-crystal-ring-materials',
    proposedPublicWording: '925 silver, 24k plating, natural quartz',
    applicableProducts: ['natural-crystal-ring'],
    evidenceSource: 'Public PDP observed Aug 3, 2026',
    evidenceOwner: 'Supplier / PDP',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Natural stone variance disclaimer may be needed — owner review.',
    warrantyImplication: false,
    allowedSurfaces: ['pdp'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'diamond-dust-ring-materials',
    proposedPublicWording: 'Brass, 5A CZ, rhodium or gold plating',
    applicableProducts: ['diamond-dust-ring'],
    evidenceSource: 'Public PDP observed Aug 3, 2026',
    evidenceOwner: 'Supplier / PDP',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Use CZ terminology — not diamond.',
    warrantyImplication: false,
    allowedSurfaces: ['pdp'],
    lastVerifiedDate: '2026-08-03',
  },
  {
    claim_id: 'tiara-double-ring-materials',
    proposedPublicWording: 'Brass with rhodium plating, adjustable',
    applicableProducts: ['tiara-double-ring'],
    evidenceSource: 'Public PDP observed Aug 3, 2026',
    evidenceOwner: 'Supplier / PDP',
    approvalStatus: 'VERIFIED',
    usageBoundary: 'Adjustable sizing only — no universal fit guarantee.',
    warrantyImplication: false,
    allowedSurfaces: ['pdp'],
    lastVerifiedDate: '2026-08-03',
  },
];

export const claimIds = claims.map((c) => c.claim_id);
