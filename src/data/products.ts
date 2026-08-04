/**
 * COPA Jewelry product catalog — prototype data derived from Aug 3, 2026 audit.
 * Unverified specs are marked SUPPLIER_EVIDENCE_REQUIRED; do not treat as verified.
 */

export type ProductCategory =
  | 'earrings'
  | 'necklaces'
  | 'rings'
  | 'bracelets'
  | 'ear-cuffs';

export type ProductTag = 'bestseller' | 'new' | 'gift' | 'limited';

export type ClaimStatus =
  | 'VERIFIED'
  | 'OWNER_APPROVED'
  | 'SUPPLIER_EVIDENCE_REQUIRED'
  | 'LEGAL_REVIEW_REQUIRED'
  | 'DO_NOT_PUBLISH';

export type StockState = 'in_stock' | 'sold_out' | 'limited' | 'unavailable';

export type InventoryClass = 'standard' | 'made_to_order' | 'digital' | 'gift_option';

export type ChannelRole = 'core' | 'merchandising' | 'gift' | 'demo';

export interface SpecField {
  displayValue: string;
  status: ClaimStatus;
  notes?: string;
}

export interface ProductSpecs {
  baseMaterial: SpecField;
  plating: SpecField;
  stones: SpecField;
  finishOptions: SpecField;
  dimensions: SpecField;
  weight: SpecField;
  origin: SpecField;
  closure: SpecField;
}

export interface CareNotes {
  displayValue: string;
  status: ClaimStatus;
}

export interface StylingNote {
  text: string;
  author: string;
  editorial: true;
  approvalStatus: ClaimStatus;
}

export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  finish?: string;
  size?: string;
  priceCents: number;
  compareAtCents: number | null;
  stockState: StockState;
  available: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  category: ProductCategory;
  priceCents: number;
  /** Prototype placeholder when audit price unknown */
  priceIsPlaceholder?: boolean;
  compareAtCents: number | null;
  description: string;
  finishes: string[];
  sizes: string[];
  variants: ProductVariant[];
  images: string[];
  tags: ProductTag[];
  inventoryClass: InventoryClass;
  channelRole: ChannelRole;
  stockState: StockState;
  specs: ProductSpecs;
  careNotes: CareNotes;
  stylingNote: StylingNote;
  relatedHandles: string[];
  giftEligible: boolean;
  provenance: string;
  placeholderIds: string[];
}

const spec = (
  displayValue: string,
  status: ClaimStatus = 'SUPPLIER_EVIDENCE_REQUIRED',
  notes?: string
): SpecField => ({ displayValue, status, notes });

const variant = (
  handle: string,
  suffix: string,
  title: string,
  priceCents: number,
  stockState: StockState,
  opts?: { finish?: string; size?: string; compareAtCents?: number | null }
): ProductVariant => ({
  id: `${handle}-${suffix}`,
  sku: `COPA-${handle.toUpperCase()}-${suffix.toUpperCase()}`,
  title,
  finish: opts?.finish,
  size: opts?.size,
  priceCents,
  compareAtCents: opts?.compareAtCents ?? null,
  stockState,
  available: stockState === 'in_stock' || stockState === 'limited',
});

export const products: Product[] = [
  {
    id: 'prod-intaglio-bracelet',
    handle: 'intaglio-bracelet',
    title: 'Intaglio Bracelet',
    category: 'bracelets',
    priceCents: 8900,
    compareAtCents: null,
    description:
      'Statement bracelet featuring intaglio-inspired detailing. Public PDP lists brass base with 18k plating, acrylic resin, and glass agate accents.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('intaglio-bracelet', 'gold-os', 'Gold / One Size', 8900, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: ['/images/products/intaglio-bracelet-1.svg'],
    tags: ['bestseller'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('Brass', 'VERIFIED', 'From public PDP Aug 3, 2026'),
      plating: spec('18k gold plating', 'VERIFIED', 'From public PDP; micron depth not listed'),
      stones: spec('Glass agate', 'VERIFIED'),
      finishOptions: spec('Gold', 'VERIFIED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Layer with fine chains for an elevated wrist stack — intaglio texture reads best against minimal silhouettes.',
      author: 'Marcela Garrett',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['intaglio-earrings', 'imperial-necklace', 'catena-body-chain'],
    giftEligible: true,
    provenance: 'Material composition from public PDP; micron plating depth not verified.',
    placeholderIds: [],
  },
  {
    id: 'prod-fleur-earrings',
    handle: 'fleur-earrings',
    title: 'Fleur Earrings',
    category: 'earrings',
    priceCents: 5800,
    compareAtCents: null,
    description: 'Floral-motif earrings from the COPA catalog. Material details pending supplier confirmation.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('fleur-earrings', 'gold-os', 'Gold / One Size', 5800, 'sold_out', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: ['/images/products/fleur-earrings-1.svg'],
    tags: ['bestseller'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'sold_out',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      stones: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold', 'SUPPLIER_EVIDENCE_REQUIRED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Pair with an off-shoulder neckline to frame the floral detail.',
      author: 'Isabella Magro',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['intaglio-earrings', 'petalia-clip-on-earrings', 'diamond-dust-hoops'],
    giftEligible: true,
    provenance: 'Price and availability from Aug 3, 2026 audit; specs unverified.',
    placeholderIds: ['ph-fleur-specs'],
  },
  {
    id: 'prod-sultan-snake-ring',
    handle: 'sultan-snake-ring',
    title: 'Sultan Snake Ring',
    category: 'rings',
    priceCents: 5700,
    compareAtCents: null,
    description:
      'Sculptural snake ring. Public PDP lists stainless steel base with 18k gold plating.',
    finishes: ['Gold'],
    sizes: ['6', '7', '8', '9'],
    variants: [
      variant('sultan-snake-ring', 'gold-7', 'Gold / Size 7', 5700, 'sold_out', {
        finish: 'Gold',
        size: '7',
      }),
    ],
    images: ['/images/products/sultan-snake-ring-1.svg'],
    tags: ['limited'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'sold_out',
    specs: {
      baseMaterial: spec('Stainless steel', 'VERIFIED', 'From public PDP Aug 3, 2026'),
      plating: spec('18k gold plating', 'VERIFIED'),
      stones: spec('None', 'VERIFIED'),
      finishOptions: spec('Gold', 'VERIFIED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('N/A — ring', 'VERIFIED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Wear solo on the index finger for a bold focal point, or stack with thin bands.',
      author: 'Carol Cavalcanti',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['snake-necklace', 'tiara-double-ring', 'diamond-dust-ring'],
    giftEligible: true,
    provenance: 'Stainless steel + 18k plating from public PDP.',
    placeholderIds: [],
  },
  {
    id: 'prod-snake-necklace',
    handle: 'snake-necklace',
    title: 'Articulated Snake Necklace',
    category: 'necklaces',
    priceCents: 12900,
    compareAtCents: null,
    description:
      'Articulated snake necklace available in gold and silver finish variants. Material details pending full supplier spec sheet.',
    finishes: ['Gold', 'Silver'],
    sizes: ['One Size'],
    variants: [
      variant('snake-necklace', 'gold-os', 'Gold / One Size', 12900, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
      variant('snake-necklace', 'silver-os', 'Silver / One Size', 12900, 'in_stock', {
        finish: 'Silver',
        size: 'One Size',
      }),
    ],
    images: ['/images/products/snake-necklace-1.svg'],
    tags: ['bestseller', 'new'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('Gold and silver finish options', 'SUPPLIER_EVIDENCE_REQUIRED'),
      stones: spec('None', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold, Silver', 'VERIFIED', 'Variant names from audit'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Let the articulation sit at the collarbone — works beautifully with open necklines.',
      author: 'Marcela Garrett',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['sultan-snake-ring', 'imperial-necklace', 'catena-body-chain'],
    giftEligible: true,
    provenance: 'Title and finish variants from Aug 3, 2026 audit.',
    placeholderIds: ['ph-snake-necklace-specs'],
  },
  {
    id: 'prod-moissanite-full-eternity-band-ring',
    handle: 'moissanite-full-eternity-band-ring',
    title: 'Moissanite Full Eternity Band Ring',
    category: 'rings',
    priceCents: 19900,
    compareAtCents: null,
    description:
      'Full eternity band with moissanite stones. Public PDP lists 925 sterling silver base. Price varies by size ($199–$289 observed).',
    finishes: ['Silver'],
    sizes: ['5', '6', '7', '8', '9', '10'],
    variants: [
      variant('moissanite-full-eternity-band-ring', 'sz-5', 'Size 5', 19900, 'in_stock', {
        size: '5',
      }),
      variant('moissanite-full-eternity-band-ring', 'sz-6', 'Size 6', 21900, 'in_stock', {
        size: '6',
      }),
      variant('moissanite-full-eternity-band-ring', 'sz-7', 'Size 7', 23900, 'in_stock', {
        size: '7',
      }),
      variant('moissanite-full-eternity-band-ring', 'sz-8', 'Size 8', 25900, 'limited', {
        size: '8',
      }),
      variant('moissanite-full-eternity-band-ring', 'sz-9', 'Size 9', 27900, 'sold_out', {
        size: '9',
      }),
      variant('moissanite-full-eternity-band-ring', 'sz-10', 'Size 10', 28900, 'sold_out', {
        size: '10',
      }),
    ],
    images: ['/images/products/moissanite-full-eternity-band-ring-1.svg'],
    tags: ['bestseller', 'new'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'limited',
    specs: {
      baseMaterial: spec('925 sterling silver', 'VERIFIED', 'From public PDP Aug 3, 2026'),
      plating: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      stones: spec('Moissanite', 'VERIFIED'),
      finishOptions: spec('Silver', 'VERIFIED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('N/A — ring', 'VERIFIED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Stack with a solitaire or wear alone as a commitment-band alternative.',
      author: 'Isabella Magro',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['natural-crystal-ring', 'diamond-dust-ring', 'tiara-double-ring'],
    giftEligible: true,
    provenance: '925 sterling + moissanite from public PDP; size pricing from audit sample.',
    placeholderIds: [],
  },
  {
    id: 'prod-natural-crystal-ring',
    handle: 'natural-crystal-ring',
    title: 'Natural Crystal Ring',
    category: 'rings',
    priceCents: 22900,
    compareAtCents: null,
    description:
      'Ring featuring natural quartz crystal. Public PDP lists 925 silver with 24k plating.',
    finishes: ['Gold'],
    sizes: ['6', '7', '8'],
    variants: [
      variant('natural-crystal-ring', 'gold-7', 'Gold / Size 7', 22900, 'in_stock', {
        finish: 'Gold',
        size: '7',
      }),
    ],
    images: ['/images/products/natural-crystal-ring-1.svg'],
    tags: ['new', 'limited'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('925 silver', 'VERIFIED', 'From public PDP Aug 3, 2026'),
      plating: spec('24k plating', 'VERIFIED'),
      stones: spec('Natural quartz', 'VERIFIED'),
      finishOptions: spec('Gold', 'VERIFIED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('N/A — ring', 'VERIFIED'),
    },
    careNotes: {
      displayValue: 'Natural stone — care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Each crystal is unique — style as a singular statement on the ring finger.',
      author: 'Carol Cavalcanti',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['moissanite-full-eternity-band-ring', 'diamond-dust-ring', 'intaglio-bracelet'],
    giftEligible: true,
    provenance: '925 silver, 24k plating, natural quartz from public PDP.',
    placeholderIds: [],
  },
  {
    id: 'prod-petalia-clip-on-earrings',
    handle: 'petalia-clip-on-earrings',
    title: 'Petalia Clip-On Earrings',
    category: 'earrings',
    priceCents: 11900,
    compareAtCents: null,
    description:
      'Clip-on earrings with petal-inspired form. Public PDP claims made in Italy and 24k plating — provenance requires owner verification.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('petalia-clip-on-earrings', 'gold-os', 'Gold / One Size', 11900, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: ['/images/products/petalia-clip-on-earrings-1.svg'],
    tags: ['new', 'gift'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('24k plating', 'VERIFIED', 'From public PDP; micron depth not listed'),
      stones: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold', 'VERIFIED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('Made in Italy', 'LEGAL_REVIEW_REQUIRED', 'Origin claim from PDP — owner must verify'),
      closure: spec('Clip-on', 'VERIFIED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Ideal for non-pierced ears or as an asymmetrical accent on one lobe.',
      author: 'Marcela Garrett',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['fleur-earrings', 'intaglio-earrings', 'diamond-dust-hoops'],
    giftEligible: true,
    provenance: 'Made in Italy claim from public PDP — flagged for owner/legal review before publication.',
    placeholderIds: ['ph-petalia-origin'],
  },
  {
    id: 'prod-imperial-necklace',
    handle: 'imperial-necklace',
    title: 'Imperial Necklace',
    category: 'necklaces',
    priceCents: 7200,
    compareAtCents: null,
    description:
      'Necklace with imperial-inspired detailing. Public PDP lists stainless steel with 18k gold plating.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('imperial-necklace', 'gold-os', 'Gold / One Size', 7200, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: ['/images/products/imperial-necklace-1.svg'],
    tags: ['bestseller', 'gift'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('Stainless steel', 'VERIFIED', 'From public PDP Aug 3, 2026'),
      plating: spec('18k gold plated', 'VERIFIED'),
      stones: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold', 'VERIFIED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'A strong everyday length piece — pairs with both structured blazers and soft knits.',
      author: 'Isabella Magro',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['snake-necklace', 'intaglio-bracelet', 'catena-body-chain'],
    giftEligible: true,
    provenance: 'Stainless steel + 18k gold plated from public PDP.',
    placeholderIds: [],
  },
  {
    id: 'prod-diamond-dust-ring',
    handle: 'diamond-dust-ring',
    title: 'Diamond Dust Ring',
    category: 'rings',
    priceCents: 5600,
    compareAtCents: null,
    description:
      'Sparkle-forward ring with 5A CZ stones. Public PDP lists brass base with rhodium or gold plating options.',
    finishes: ['Rhodium', 'Gold'],
    sizes: ['Adjustable'],
    variants: [
      variant('diamond-dust-ring', 'rhodium-adj', 'Rhodium / Adjustable', 5600, 'in_stock', {
        finish: 'Rhodium',
        size: 'Adjustable',
      }),
      variant('diamond-dust-ring', 'gold-adj', 'Gold / Adjustable', 5600, 'in_stock', {
        finish: 'Gold',
        size: 'Adjustable',
      }),
    ],
    images: ['/images/products/diamond-dust-ring-1.svg'],
    tags: ['bestseller', 'gift'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('Brass', 'VERIFIED', 'From public PDP Aug 3, 2026'),
      plating: spec('Rhodium or gold plating', 'VERIFIED'),
      stones: spec('5A CZ', 'VERIFIED'),
      finishOptions: spec('Rhodium, Gold', 'VERIFIED'),
      dimensions: spec('Adjustable', 'VERIFIED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('N/A — ring', 'VERIFIED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'An easy gifting ring — adjustable fit suits most recipients.',
      author: 'Carol Cavalcanti',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['diamond-dust-hoops', 'tiara-double-ring', 'moissanite-full-eternity-band-ring'],
    giftEligible: true,
    provenance: 'Brass, 5A CZ, rhodium/gold plating from public PDP.',
    placeholderIds: [],
  },
  {
    id: 'prod-tiara-double-ring',
    handle: 'tiara-double-ring',
    title: 'Tiara Double Ring',
    category: 'rings',
    priceCents: 6700,
    compareAtCents: null,
    description:
      'Double-band ring with tiara-inspired silhouette. Public PDP lists brass with rhodium plating, adjustable sizing.',
    finishes: ['Rhodium'],
    sizes: ['Adjustable'],
    variants: [
      variant('tiara-double-ring', 'rhodium-adj', 'Rhodium / Adjustable', 6700, 'in_stock', {
        finish: 'Rhodium',
        size: 'Adjustable',
      }),
    ],
    images: ['/images/products/tiara-double-ring-1.svg'],
    tags: ['new'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('Brass', 'VERIFIED', 'From public PDP Aug 3, 2026'),
      plating: spec('Rhodium', 'VERIFIED'),
      stones: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Rhodium', 'VERIFIED'),
      dimensions: spec('Adjustable', 'VERIFIED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('N/A — ring', 'VERIFIED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Wear across two fingers for a sculptural, editorial look.',
      author: 'Marcela Garrett',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['diamond-dust-ring', 'sultan-snake-ring', 'natural-crystal-ring'],
    giftEligible: true,
    provenance: 'Brass, rhodium, adjustable from public PDP.',
    placeholderIds: [],
  },
  {
    id: 'prod-intaglio-earrings',
    handle: 'intaglio-earrings',
    title: 'Intaglio Earrings',
    category: 'earrings',
    priceCents: 6200,
    compareAtCents: null,
    description:
      'Earring counterpart to the Intaglio collection. Material details pending supplier confirmation.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('intaglio-earrings', 'gold-os', 'Gold / One Size', 6200, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: ['/images/products/intaglio-earrings-1.svg'],
    tags: ['bestseller'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      stones: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold', 'SUPPLIER_EVIDENCE_REQUIRED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Complete the Intaglio story — match with the bracelet for a coordinated set.',
      author: 'Isabella Magro',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['intaglio-bracelet', 'fleur-earrings', 'imperial-necklace'],
    giftEligible: true,
    provenance: 'Price from Aug 3, 2026 audit; specs unverified.',
    placeholderIds: ['ph-intaglio-earrings-specs'],
  },
  {
    id: 'prod-catena-body-chain',
    handle: 'catena-body-chain',
    title: 'Catena Body Chain',
    category: 'necklaces',
    priceCents: 14900,
    compareAtCents: null,
    description:
      'Body chain for layered styling across neck and torso. Material and length specs pending supplier confirmation.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('catena-body-chain', 'gold-os', 'Gold / One Size', 14900, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: ['/images/products/catena-body-chain-1.svg'],
    tags: ['new', 'limited'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      stones: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold', 'SUPPLIER_EVIDENCE_REQUIRED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Style over a slip dress or open blazer — the chain adds dimension to minimal outfits.',
      author: 'Carol Cavalcanti',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['snake-necklace', 'imperial-necklace', 'intaglio-bracelet'],
    giftEligible: true,
    provenance: 'Price from Aug 3, 2026 audit; categorized as body/necklace piece.',
    placeholderIds: ['ph-catena-specs'],
  },
  {
    id: 'prod-diamond-dust-hoops',
    handle: 'diamond-dust-hoops',
    title: 'Diamond Dust Hoops',
    category: 'earrings',
    priceCents: 6800,
    priceIsPlaceholder: true,
    compareAtCents: null,
    description:
      'Hoop earrings from the Diamond Dust line. Price not confirmed in audit sample — placeholder for merchandising demo.',
    finishes: ['Gold', 'Rhodium'],
    sizes: ['One Size'],
    variants: [
      variant('diamond-dust-hoops', 'gold-os', 'Gold / One Size', 6800, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: ['/images/products/diamond-dust-hoops-1.svg'],
    tags: ['new'],
    inventoryClass: 'standard',
    channelRole: 'merchandising',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      stones: spec('5A CZ (assumed line match)', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold, Rhodium (assumed)', 'SUPPLIER_EVIDENCE_REQUIRED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Everyday sparkle — pair with the Diamond Dust Ring for a cohesive set.',
      author: 'Marcela Garrett',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['diamond-dust-ring', 'fleur-earrings', 'intaglio-earrings'],
    giftEligible: true,
    provenance: 'Product line inferred from Diamond Dust Ring; price is prototype placeholder.',
    placeholderIds: ['ph-diamond-dust-hoops-price', 'ph-diamond-dust-hoops-specs'],
  },
  {
    id: 'prod-celestial-ear-cuff',
    handle: 'celestial-ear-cuff',
    title: 'Celestial Ear Cuff',
    category: 'ear-cuffs',
    priceCents: 4500,
    priceIsPlaceholder: true,
    compareAtCents: null,
    description:
      'Representative ear cuff for category merchandising. All specs are prototype placeholders pending catalog confirmation.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('celestial-ear-cuff', 'gold-os', 'Gold / One Size', 4500, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: ['/images/products/celestial-ear-cuff-1.svg'],
    tags: ['new'],
    inventoryClass: 'standard',
    channelRole: 'merchandising',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      stones: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold (placeholder)', 'SUPPLIER_EVIDENCE_REQUIRED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('Ear cuff — no piercing required', 'SUPPLIER_EVIDENCE_REQUIRED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Position mid-cartilage and pair with a single stud for an asymmetric ear story.',
      author: 'Isabella Magro',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['intaglio-earrings', 'petalia-clip-on-earrings', 'diamond-dust-hoops'],
    giftEligible: true,
    provenance: 'Representative ear cuff — not verified against live catalog.',
    placeholderIds: ['ph-celestial-ear-cuff-all'],
  },
  {
    id: 'prod-gift-wrap',
    handle: 'gift-wrap',
    title: 'Gift Wrap',
    category: 'bracelets',
    priceCents: 800,
    compareAtCents: null,
    description:
      'Gift wrapping add-on for demo purposes. Currently unavailable — do not reproduce broken gift-wrap liquid from legacy site.',
    finishes: [],
    sizes: [],
    variants: [
      variant('gift-wrap', 'standard', 'Standard Gift Wrap', 800, 'unavailable'),
    ],
    images: ['/images/products/gift-wrap-1.svg'],
    tags: ['gift'],
    inventoryClass: 'gift_option',
    channelRole: 'gift',
    stockState: 'unavailable',
    specs: {
      baseMaterial: spec('N/A — service add-on', 'VERIFIED'),
      plating: spec('N/A', 'VERIFIED'),
      stones: spec('N/A', 'VERIFIED'),
      finishOptions: spec('N/A', 'VERIFIED'),
      dimensions: spec('N/A', 'VERIFIED'),
      weight: spec('N/A', 'VERIFIED'),
      origin: spec('N/A', 'VERIFIED'),
      closure: spec('N/A', 'VERIFIED'),
    },
    careNotes: {
      displayValue: 'N/A — gift service add-on.',
      status: 'VERIFIED',
    },
    stylingNote: {
      text: 'Presentation matters — gift wrap elevates the unboxing moment.',
      author: 'Carol Cavalcanti',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['diamond-dust-ring', 'imperial-necklace', 'intaglio-bracelet'],
    giftEligible: false,
    provenance: 'Demo gift option; unavailable in prototype. Legacy liquid UI excluded intentionally.',
    placeholderIds: ['ph-gift-wrap-service'],
  },
  {
    id: 'prod-riviera-chain-bracelet',
    handle: 'riviera-chain-bracelet',
    title: 'Riviera Chain Bracelet',
    category: 'bracelets',
    priceCents: 7900,
    priceIsPlaceholder: true,
    compareAtCents: null,
    description:
      'Merchandising bestseller placeholder — chain bracelet for demo collections. Specs pending owner selection.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('riviera-chain-bracelet', 'gold-os', 'Gold / One Size', 7900, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: ['/images/products/riviera-chain-bracelet-1.svg'],
    tags: ['bestseller'],
    inventoryClass: 'standard',
    channelRole: 'merchandising',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      stones: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold (placeholder)', 'SUPPLIER_EVIDENCE_REQUIRED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Stack with the Intaglio Bracelet for mixed-texture wrist interest.',
      author: 'Marcela Garrett',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['intaglio-bracelet', 'imperial-necklace', 'catena-body-chain'],
    giftEligible: true,
    provenance: 'Merchandising placeholder — owner to confirm real bestseller SKU.',
    placeholderIds: ['ph-riviera-bracelet-all'],
  },
  {
    id: 'prod-luna-pendant-necklace',
    handle: 'luna-pendant-necklace',
    title: 'Luna Pendant Necklace',
    category: 'necklaces',
    priceCents: 8400,
    priceIsPlaceholder: true,
    compareAtCents: null,
    description:
      'Merchandising bestseller placeholder — pendant necklace for demo collections. Specs pending owner selection.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('luna-pendant-necklace', 'gold-os', 'Gold / One Size', 8400, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: ['/images/products/luna-pendant-necklace-1.svg'],
    tags: ['bestseller'],
    inventoryClass: 'standard',
    channelRole: 'merchandising',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      stones: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold (placeholder)', 'SUPPLIER_EVIDENCE_REQUIRED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'A daily pendant anchor — layer at varying lengths with the Imperial Necklace.',
      author: 'Carol Cavalcanti',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['imperial-necklace', 'snake-necklace', 'intaglio-earrings'],
    giftEligible: true,
    provenance: 'Merchandising placeholder — owner to confirm real bestseller SKU.',
    placeholderIds: ['ph-luna-necklace-all'],
  },
  {
    id: 'prod-aurora-stacking-ring-set',
    handle: 'aurora-stacking-ring-set',
    title: 'Aurora Stacking Ring Set',
    category: 'rings',
    priceCents: 9400,
    priceIsPlaceholder: true,
    compareAtCents: null,
    description:
      'Additional ring merchandising piece for new-arrivals demo. Specs and pricing pending catalog confirmation.',
    finishes: ['Gold', 'Rhodium'],
    sizes: ['5', '6', '7', '8'],
    variants: [
      variant('aurora-stacking-ring-set', 'gold-7', 'Gold / Size 7', 9400, 'in_stock', {
        finish: 'Gold',
        size: '7',
      }),
    ],
    images: ['/images/products/aurora-stacking-ring-set-1.svg'],
    tags: ['new'],
    inventoryClass: 'standard',
    channelRole: 'merchandising',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      stones: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold, Rhodium (placeholder)', 'SUPPLIER_EVIDENCE_REQUIRED'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('N/A — ring set', 'SUPPLIER_EVIDENCE_REQUIRED'),
    },
    careNotes: {
      displayValue: 'Care instructions to be confirmed with supplier.',
      status: 'SUPPLIER_EVIDENCE_REQUIRED',
    },
    stylingNote: {
      text: 'Mix finishes across fingers for a curated stack — odd numbers read most intentional.',
      author: 'Isabella Magro',
      editorial: true,
      approvalStatus: 'OWNER_APPROVED',
    },
    relatedHandles: ['tiara-double-ring', 'diamond-dust-ring', 'moissanite-full-eternity-band-ring'],
    giftEligible: true,
    provenance: 'Merchandising extra for new-arrivals collection demo.',
    placeholderIds: ['ph-aurora-ring-set-all'],
  },
];

export const productCount = products.length;
