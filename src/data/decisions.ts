/**
 * COPA Jewelry owner decision register — 14 prototype gates.
 * Each gate tracks status, prototype assumption, and risk.
 */

export type DecisionStatus = 'NEEDS_OWNER' | 'APPROVED' | 'BLOCKED' | 'DEFERRED';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface OwnerDecision {
  gate_id: string;
  gate_number: number;
  title: string;
  description: string;
  status: DecisionStatus;
  assumptionUsedInPrototype: string;
  risk: RiskLevel;
  riskDescription: string;
  blockedSurfaces?: string[];
  ownerAction: string;
}

export const ownerDecisions: OwnerDecision[] = [
  {
    gate_id: 'gate-01-free-shipping-threshold',
    gate_number: 1,
    title: 'Free Shipping Threshold',
    description: 'Confirm minimum order value for free shipping on DTC website.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: '$80 (8000 cents) demo threshold in catalog.ts and claims registry.',
    risk: 'medium',
    riskDescription: 'Checkout may display incorrect shipping promise if threshold differs from ops policy.',
    ownerAction: 'Confirm threshold amount, exclusions (international, expedited), and effective date.',
  },
  {
    gate_id: 'gate-02-return-refund-policy',
    gate_number: 2,
    title: 'Return & Refund Policy',
    description: 'Finalize return window, condition requirements, and refund method.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'FAQ entries use structural placeholders — no final legal terms.',
    risk: 'high',
    riskDescription: 'Publishing unapproved return terms creates consumer compliance exposure.',
    blockedSurfaces: ['faq', 'checkout', 'footer'],
    ownerAction: 'Provide approved return policy text and link to terms of service.',
  },
  {
    gate_id: 'gate-03-warranty-terms',
    gate_number: 3,
    title: 'Warranty Terms',
    description: 'Lifetime or limited warranty language observed on legacy surfaces — terms not reviewed.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'All warranty claims marked DO_NOT_PUBLISH in claims registry.',
    risk: 'critical',
    riskDescription: 'Implied lifetime warranty without written terms is legal and CX liability.',
    blockedSurfaces: ['pdp', 'faq', 'homepage', 'checkout'],
    ownerAction: 'Provide written warranty document or confirm no warranty claim should be published.',
  },
  {
    gate_id: 'gate-04-hypoallergenic-claims',
    gate_number: 4,
    title: 'Hypoallergenic / Nickel-Free Claims',
    description: 'Blanket allergen claims require supplier test documentation.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'Blocked via claims-gate — no hypoallergenic copy in prototype.',
    risk: 'critical',
    riskDescription: 'False allergen claims trigger regulatory and product liability risk.',
    ownerAction: 'Obtain supplier allergen/nickel test reports or confirm claims remain blocked.',
  },
  {
    gate_id: 'gate-05-performance-claims',
    gate_number: 5,
    title: 'Water-Resistant / Tarnish-Free Claims',
    description: 'Durability and wear performance claims need supplier evidence.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'No material/performance collections; care notes marked SUPPLIER_EVIDENCE_REQUIRED.',
    risk: 'high',
    riskDescription: 'Performance claims without testing mislead customers and increase chargebacks.',
    ownerAction: 'Provide care guides and any verified durability statements per SKU.',
  },
  {
    gate_id: 'gate-06-fashion-week-press',
    gate_number: 6,
    title: 'NYFW / SPFW Press Claims',
    description: 'Fashion week feature claims require press verification and usage rights.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'NYFW/SPFW claims marked DO_NOT_PUBLISH.',
    risk: 'medium',
    riskDescription: 'Unverified press claims damage brand credibility and may violate event IP rules.',
    ownerAction: 'Supply press clips, dates, and approved wording or remove claims permanently.',
  },
  {
    gate_id: 'gate-07-schon-editorial',
    gate_number: 7,
    title: 'Schön Magazine Editorial Credit',
    description: 'Editorial feature attribution requires legal review of credit line and image rights.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'Schön claim marked LEGAL_REVIEW_REQUIRED — not rendered in prototype.',
    risk: 'medium',
    riskDescription: 'Unauthorized editorial credits may violate publication trademark and image rights.',
    ownerAction: 'Legal review of credit wording and licensed images before any publication.',
  },
  {
    gate_id: 'gate-08-review-attribution',
    gate_number: 8,
    title: 'Review Source Attribution (Whatnot vs Website)',
    description: 'Separate Whatnot aggregates from Judge.me website reviews at all times.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'whatnot-proof.ts and claims registry enforce channel-specific attribution.',
    risk: 'high',
    riskDescription: 'Conflating review sources is deceptive trade practice risk.',
    ownerAction: 'Confirm UI labels and marketing copy always specify review platform.',
  },
  {
    gate_id: 'gate-09-founder-bios',
    gate_number: 9,
    title: 'Founder Bios & Roles',
    description: 'Founder names, titles, and biographies require owner approval.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'Pitch-copy placeholders with OWNER_APPROVED editorial styling notes only.',
    risk: 'low',
    riskDescription: 'Incorrect roles or bios misrepresent team structure.',
    ownerAction: 'Approve final bios, headshots, and role titles for Our Story page.',
  },
  {
    gate_id: 'gate-10-provenance-origin',
    gate_number: 10,
    title: 'Product Origin & Provenance Claims',
    description: 'Made in Italy and similar origin claims need supplier certificates.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'Petalia origin flagged LEGAL_REVIEW_REQUIRED on spec and claim registry.',
    risk: 'high',
    riskDescription: 'False origin claims violate FTC Made in USA / country-of-origin rules.',
    ownerAction: 'Obtain supplier origin documentation per SKU before publishing origin claims.',
  },
  {
    gate_id: 'gate-11-gift-wrap-service',
    gate_number: 11,
    title: 'Gift Wrap Service',
    description: 'Gift wrap add-on availability and UX — legacy liquid implementation excluded.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'gift-wrap SKU marked unavailable; broken legacy UI not reproduced.',
    risk: 'low',
    riskDescription: 'Shipping unapproved gift UX creates fulfillment gaps.',
    ownerAction: 'Define gift wrap offering, pricing, and fulfillment workflow or remove SKU.',
  },
  {
    gate_id: 'gate-12-gifts-under-75-threshold',
    gate_number: 12,
    title: 'Gifts Under $75 Collection Threshold',
    description: 'Demo merchandising threshold for gift collection filtering.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: '$75 maxPriceCents filter with ownerApprovalRequired flag on collection.',
    risk: 'low',
    riskDescription: 'Wrong price band misaligns gift marketing with margin goals.',
    ownerAction: 'Confirm threshold amount and whether collection is seasonal or permanent.',
  },
  {
    gate_id: 'gate-13-unverified-product-specs',
    gate_number: 13,
    title: 'Unverified Product Specifications',
    description: 'Material, plating micron, dimension, and care specs pending supplier evidence.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'Unknown specs display "To be confirmed" with SUPPLIER_EVIDENCE_REQUIRED status.',
    risk: 'medium',
    riskDescription: 'Publishing guessed specs creates PDP accuracy and advertising liability.',
    ownerAction: 'Provide supplier spec sheets; update products.ts and re-run claims audit.',
  },
  {
    gate_id: 'gate-14-media-rights',
    gate_number: 14,
    title: 'Product Media Asset Rights',
    description: 'Reuse of copajewelry.com product imagery for prototype and production.',
    status: 'NEEDS_OWNER',
    assumptionUsedInPrototype: 'media-manifest.ts marks all assets INTERNAL_PROTOTYPE_ONLY until download and rights review.',
    risk: 'high',
    riskDescription: 'Using web-scraped images in production without license is copyright infringement.',
    ownerAction: 'Confirm asset ownership, download masters, and approve production usage rights.',
  },
];

export const pendingOwnerGates = ownerDecisions.filter((d) => d.status === 'NEEDS_OWNER');
