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
    images: [
      'https://copajewelry.com/cdn/shop/files/960EBE94-E295-4E75-A5D8-D519064899A7.jpg?v=1772829609&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3889.png?v=1772829609&width=3024',
      'https://copajewelry.com/cdn/shop/files/B50E8631-D4E5-457A-8940-B7D7377D714B.jpg?v=1772818148&width=3024',
      'https://copajewelry.com/cdn/shop/files/E4FA94B2-1FF6-4F58-A97B-24047F3AE5D1.jpg?v=1772818148&width=3024',
    ],
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
    description: 'Floral-motif earrings from the CopaJewelry catalog. Material details pending supplier confirmation.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('fleur-earrings', 'gold-os', 'Gold / One Size', 5800, 'sold_out', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: [
      'https://copajewelry.com/cdn/shop/files/IMG-3893.png?v=1772814588&width=3024',
      'https://copajewelry.com/cdn/shop/files/2EF468CC-F9EF-42C0-AA76-8574E948AC87.jpg?v=1772817547&width=3024',
      'https://copajewelry.com/cdn/shop/files/12C232A3-4020-4946-8D2C-EC318B09E4EE.jpg?v=1772817547&width=3024',
    ],
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
    images: [
      'https://copajewelry.com/cdn/shop/files/B132D3A1-93D8-4193-B31C-FC3EB063D30F.jpg?v=1772829657&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3877.png?v=1772829657&width=3024',
      'https://copajewelry.com/cdn/shop/files/DE18365A-82B3-49B8-A241-D09797927B4B.jpg?v=1772829657&width=3024',
      'https://copajewelry.com/cdn/shop/files/975C3718-7691-4C93-A06F-58E8BC685F0B.jpg?v=1772763230&width=3024',
    ],
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
    images: [
      'https://copajewelry.com/cdn/shop/files/A43E75FF-FF13-4B9F-BCCC-18E00057D045.jpg?v=1772830573&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3525.png?v=1772830573&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3526.png?v=1772830573&width=3024',
      'https://copajewelry.com/cdn/shop/files/35F587A9-564E-4EC1-B395-479F23BFC787.jpg?v=1772765153&width=3024',
      'https://copajewelry.com/cdn/shop/files/DCC644D8-AAA6-40CD-B17E-CBCC64152C04.jpg?v=1772765152&width=3024',
      'https://copajewelry.com/cdn/shop/files/666F4BBA-385E-4F48-9DD2-78C1B976ED4B.jpg?v=1772765153&width=3024',
      'https://copajewelry.com/cdn/shop/files/B1127DC7-320E-4F67-8401-1DCBEB053629.jpg?v=1772765153&width=3024',
      'https://copajewelry.com/cdn/shop/files/2C230032-0D7C-4434-90FB-8D6765CF477A.jpg?v=1772765153&width=3024',
    ],
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
    images: [
      'https://copajewelry.com/cdn/shop/files/IMG-1875.png?v=1708303397&width=3024',
      'https://copajewelry.com/cdn/shop/files/68042C41-8FB2-48E5-8F10-A2D7072F909D.jpg?v=1708397189&width=3024',
      'https://copajewelry.com/cdn/shop/files/F0F60FE6-1135-48EF-A1D8-97EA1A425B84.jpg?v=1708397188&width=3024',
      'https://copajewelry.com/cdn/shop/files/8454D5D7-B92F-4CAF-8F02-CC75AB562225.jpg?v=1708397187&width=3024',
      'https://copajewelry.com/cdn/shop/files/D9C006C2-974A-473E-BB28-3B33D58F666E.jpg?v=1708397189&width=3024',
      'https://copajewelry.com/cdn/shop/files/3BE3007B-AA11-4078-8CE9-03C613317DD4.jpg?v=1708397188&width=3024',
      'https://copajewelry.com/cdn/shop/files/B83BF9E9-8910-43F7-97A7-C38F6E66EB18.jpg?v=1708397188&width=3024',
      'https://copajewelry.com/cdn/shop/files/26B572FF-AB4E-4879-858A-41DA585B645C.jpg?v=1708397187&width=3024',
    ],
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
    images: [
      'https://copajewelry.com/cdn/shop/files/IMG-4980.png?v=1744912335&width=3024',
      'https://copajewelry.com/cdn/shop/files/3C2D1A09-A5AE-4D42-A03D-4F7A730B564D.jpg?v=1744919842&width=3024',
      'https://copajewelry.com/cdn/shop/files/3A2ACEB0-ABDA-4A51-A828-4754BC4DEBB2.jpg?v=1744919841&width=3024',
      'https://copajewelry.com/cdn/shop/files/4AAAC46C-6FD1-4E77-B9AE-4D41346CB358.jpg?v=1745172708&width=3024',
      'https://copajewelry.com/cdn/shop/files/4B04315A-26E1-46C4-B220-6E38DEF8A313.jpg?v=1745172708&width=3024',
    ],
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
    images: [
      'https://copajewelry.com/cdn/shop/files/389541D0-FB62-4004-B09F-D410AD6FF329.jpg?v=1772829722&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3880.png?v=1772829722&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3881.png?v=1772829722&width=3024',
      'https://copajewelry.com/cdn/shop/files/08C5F1DC-71D6-45CF-A479-833EDBFF769D.jpg?v=1772829722&width=3024',
      'https://copajewelry.com/cdn/shop/files/7D6F9330-7802-4430-9EDB-6B711534E136.jpg?v=1772818528&width=3024',
      'https://copajewelry.com/cdn/shop/files/C18E5CD9-1B1C-4E17-9C03-DBA8D5B83A2F.jpg?v=1772818528&width=3024',
      'https://copajewelry.com/cdn/shop/files/D2C47E20-03CF-474C-9F18-76545B25270D.jpg?v=1772818528&width=3024',
    ],
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
    images: [
      'https://copajewelry.com/cdn/shop/files/358BECF6-A547-47EA-BBB4-8681B6831EE2.jpg?v=1764734314&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-0982.png?v=1764734314&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-0983.png?v=1764734314&width=3024',
      'https://copajewelry.com/cdn/shop/files/E7F7CFEB-ECBB-4051-9ED0-23F2F060211D.jpg?v=1764302763&width=3024',
      'https://copajewelry.com/cdn/shop/files/B8E07292-FC6A-48C1-8765-04938B0FFBD3.jpg?v=1764302763&width=3024',
      'https://copajewelry.com/cdn/shop/files/08445853-30BC-47FA-8644-FEB1E7AD8788.jpg?v=1764306177&width=3024',
      'https://copajewelry.com/cdn/shop/files/1A828BD9-4D88-4E1D-9E62-5E68D8A8C32B.jpg?v=1764306177&width=3024',
    ],
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
    images: [
      'https://copajewelry.com/cdn/shop/files/F1E57D04-F76E-446C-B826-595496939AE2.jpg?v=1772831602&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3586.png?v=1772831602&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3587.png?v=1772831602&width=3024',
      'https://copajewelry.com/cdn/shop/files/F3FCB703-18AF-4961-83B2-8397E0AF9A81.jpg?v=1772831584&width=3024',
    ],
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
    images: [
      'https://copajewelry.com/cdn/shop/files/23B77E81-EEEB-43AE-823B-4DC6F0E19C0C.jpg?v=1772804696&width=3024',
      'https://copajewelry.com/cdn/shop/files/6C037551-5A99-4955-93FC-B0D0AB45F30E.jpg?v=1772822785&width=3024',
      'https://copajewelry.com/cdn/shop/files/BCAC93DE-2031-4C63-AC76-301D4A81CF35.jpg?v=1772804696&width=3024',
    ],
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
    images: [
      'https://copajewelry.com/cdn/shop/files/IMG-3885.png?v=1772813740&width=3024',
      'https://copajewelry.com/cdn/shop/files/C7F206C2-2650-4E58-A8CB-7E13B85E73A0.jpg?v=1772818028&width=3024',
      'https://copajewelry.com/cdn/shop/files/332CE01A-640F-48FD-BF6B-A850444F3113.jpg?v=1772818027&width=3024',
    ],
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
      'Body chain for layered styling across neck and torso. Public PDP lists brass base with 18k gold plating and a green or clear glass stone option.',
    finishes: ['Green', 'Clear'],
    sizes: ['One Size'],
    variants: [
      variant('catena-body-chain', 'green-os', 'Green / One Size', 14900, 'in_stock', {
        finish: 'Green',
        size: 'One Size',
      }),
      variant('catena-body-chain', 'clear-os', 'Clear / One Size', 14900, 'in_stock', {
        finish: 'Clear',
        size: 'One Size',
      }),
    ],
    images: [
      'https://copajewelry.com/cdn/shop/files/2AD7C50F-6709-46ED-8933-B8AFCDB57FDA.jpg?v=1772829920&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3604.png?v=1772829920&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3603.png?v=1772829920&width=3024',
      'https://copajewelry.com/cdn/shop/files/D9FFB00B-C272-486D-80E7-1E8B67A0027E.jpg?v=1772811321&width=3024',
      'https://copajewelry.com/cdn/shop/files/BA4F6977-EC6C-4F10-B6FF-C344C22AB1A5.jpg?v=1772811321&width=3024',
      'https://copajewelry.com/cdn/shop/files/68645E04-52E4-4FB1-843C-333679501407.jpg?v=1772811321&width=3024',
      'https://copajewelry.com/cdn/shop/files/0BFF68EF-8FC9-4BD2-8B0A-C9D50C039589.jpg?v=1772811321&width=3024',
    ],
    tags: ['new', 'limited'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('Brass', 'VERIFIED', 'From public PDP Aug 5, 2026'),
      plating: spec('18k gold plating', 'VERIFIED', 'From public PDP; micron depth not listed'),
      stones: spec('Green or clear glass stone', 'VERIFIED'),
      finishOptions: spec('Green, Clear', 'VERIFIED'),
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
    provenance: 'Material composition, price, and gallery from public PDP observed Aug 5, 2026.',
    placeholderIds: [],
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
    images: [
      'https://copajewelry.com/cdn/shop/files/IMG-3581.png?v=1772511240&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3582.png?v=1772511240&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3579.png?v=1772511240&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-3580.png?v=1772511240&width=3024',
      'https://copajewelry.com/cdn/shop/files/DF7E5592-D91E-42D8-98F9-C54A33A6BC13.jpg?v=1772805199&width=3024',
      'https://copajewelry.com/cdn/shop/files/2F0FA1E2-6D8B-488A-92F1-89C30791D8D6.jpg?v=1772805199&width=3024',
    ],
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
    id: 'prod-saturn-ear-cuff',
    handle: 'saturn-ear-cuff',
    title: 'Saturn Ear Cuff',
    category: 'ear-cuffs',
    priceCents: 2400,
    compareAtCents: null,
    description: 'Ear cuff from the CopaJewelry catalog. Public PDP lists gold finish; base metal not itemized.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('saturn-ear-cuff', 'gold-os', 'Gold / One Size', 2400, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: [
      'https://copajewelry.com/cdn/shop/files/FDB10033-2CE8-4547-99BE-09F43C13548E.png?v=1718321133&width=3024',
      'https://copajewelry.com/cdn/shop/files/C60D58EE-7624-4399-AB1D-E5081E5B2801.jpg?v=1718323371&width=3024',
    ],
    tags: ['new'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      stones: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      finishOptions: spec('Gold', 'VERIFIED', 'From public PDP Aug 5, 2026'),
      dimensions: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('Ear cuff — no piercing required', 'VERIFIED'),
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
    provenance: 'Title, price, and gallery from public PDP observed Aug 5, 2026; base metal not itemized on PDP.',
    placeholderIds: [],
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
    images: [],
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
    id: 'prod-eternal-chain-bracelet',
    handle: 'chain-bracelet',
    title: 'Eternal Chain Bracelet',
    category: 'bracelets',
    priceCents: 5900,
    compareAtCents: null,
    description:
      'Chain bracelet from the CopaJewelry catalog. Public PDP lists 18k gold plating with white rhodium plating, 19cm length.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('chain-bracelet', 'gold-os', 'Gold / One Size', 5900, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: [
      'https://copajewelry.com/cdn/shop/files/IMG-1686.png?v=1733507932&width=3024',
      'https://copajewelry.com/cdn/shop/files/IMG-1687.png?v=1733507945&width=3024',
      'https://copajewelry.com/cdn/shop/files/FD82F760-3302-4F2C-9A13-7B354E110EA6.jpg?v=1733891524&width=3024',
      'https://copajewelry.com/cdn/shop/files/31C18FEA-070C-4978-AFDB-C000EDE67BE5.jpg?v=1734055147&width=3024',
      'https://copajewelry.com/cdn/shop/files/241AD18A-E943-4BE0-8315-366659784DE7.jpg?v=1734055147&width=3024',
    ],
    tags: ['bestseller'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      plating: spec('18k gold plated & white rhodium plated', 'VERIFIED', 'From public PDP Aug 5, 2026'),
      stones: spec('None', 'VERIFIED'),
      finishOptions: spec('Gold', 'VERIFIED'),
      dimensions: spec('Length 19cm, thickness 1.2cm', 'VERIFIED', 'From public PDP'),
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
    provenance:
      'Title, price, materials, and gallery from public PDP observed Aug 5, 2026. PDP also states "Nickel Free & Hypoallergenic" — not carried into claims here pending supplier allergen test documentation, consistent with the claims registry (hypoallergenic-blanket, DO_NOT_PUBLISH).',
    placeholderIds: [],
  },
  {
    id: 'prod-roma-coin-necklace',
    handle: 'roma-coin-necklace',
    title: 'Roma Coin Necklace',
    category: 'necklaces',
    priceCents: 6900,
    compareAtCents: null,
    description:
      'Coin pendant necklace from the CopaJewelry catalog. Public PDP lists brass base with 18k gold plating, 5A cubic zirconia, and glass agate.',
    finishes: ['Gold'],
    sizes: ['One Size'],
    variants: [
      variant('roma-coin-necklace', 'gold-os', 'Gold / One Size', 6900, 'in_stock', {
        finish: 'Gold',
        size: 'One Size',
      }),
    ],
    images: [
      'https://copajewelry.com/cdn/shop/files/IMG-3741.png?v=1772679142&width=3024',
      'https://copajewelry.com/cdn/shop/files/0F6F336A-6CE2-4ECC-A988-4EF7E68D6482.jpg?v=1772829821&width=3024',
      'https://copajewelry.com/cdn/shop/files/360DEF61-1848-433E-A437-CEA064345FA6.jpg?v=1772805698&width=3024',
      'https://copajewelry.com/cdn/shop/files/6F80707B-318C-4E55-8C2E-E4DCF3717E95.jpg?v=1772829790&width=3024',
      'https://copajewelry.com/cdn/shop/files/EC084D89-AC08-4169-A763-F6B1F88F9EF5.jpg?v=1772829772&width=3024',
    ],
    tags: ['bestseller'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('Brass', 'VERIFIED', 'From public PDP Aug 5, 2026'),
      plating: spec('18k gold plating', 'VERIFIED'),
      stones: spec('5A cubic zirconia, glass agate', 'VERIFIED'),
      finishOptions: spec('Gold', 'VERIFIED'),
      dimensions: spec('Length 18 + 2 inches', 'VERIFIED', 'From public PDP'),
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
    provenance: 'Title, price, materials, and gallery from public PDP observed Aug 5, 2026.',
    placeholderIds: [],
  },
  {
    id: 'prod-regalia-ring',
    handle: 'regalia-ring',
    title: 'Regalia Ring',
    category: 'rings',
    priceCents: 6200,
    compareAtCents: null,
    description:
      'Ring from the CopaJewelry catalog. Public PDP lists brass base with 18k gold plating, rhodium plating, and 5A cubic zirconia stones.',
    finishes: ['Gold'],
    sizes: ['6', '7', '8'],
    variants: [
      variant('regalia-ring', 'gold-6', 'Gold / Size 6', 6200, 'in_stock', {
        finish: 'Gold',
        size: '6',
      }),
      variant('regalia-ring', 'gold-7', 'Gold / Size 7', 6200, 'in_stock', {
        finish: 'Gold',
        size: '7',
      }),
      variant('regalia-ring', 'gold-8', 'Gold / Size 8', 6200, 'in_stock', {
        finish: 'Gold',
        size: '8',
      }),
    ],
    images: [
      'https://copajewelry.com/cdn/shop/files/89E33A2A-BEF8-4101-A96C-189BC028CFE6.jpg?v=1772831584&width=3024',
      'https://copajewelry.com/cdn/shop/files/FullSizeRender_fd73a726-0b5f-446e-91b9-dcc27369d5bd.jpg?v=1772831584&width=3024',
      'https://copajewelry.com/cdn/shop/files/F1E57D04-F76E-446C-B826-595496939AE2.jpg?v=1772831602&width=3024',
      'https://copajewelry.com/cdn/shop/files/F3FCB703-18AF-4961-83B2-8397E0AF9A81.jpg?v=1772831584&width=3024',
      'https://copajewelry.com/cdn/shop/files/854BFB38-1984-4DF2-8B32-1329116C77CA.jpg?v=1772831584&width=3024',
    ],
    tags: ['new'],
    inventoryClass: 'standard',
    channelRole: 'core',
    stockState: 'in_stock',
    specs: {
      baseMaterial: spec('Brass', 'VERIFIED', 'From public PDP Aug 5, 2026'),
      plating: spec('18k gold plating & rhodium plating', 'VERIFIED'),
      stones: spec('5A cubic zirconia', 'VERIFIED'),
      finishOptions: spec('Gold', 'VERIFIED'),
      dimensions: spec('Sizes 6, 7, 8', 'VERIFIED', 'From public PDP size selector'),
      weight: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      origin: spec('To be confirmed', 'SUPPLIER_EVIDENCE_REQUIRED'),
      closure: spec('N/A — ring', 'VERIFIED'),
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
    provenance: 'Title, price, materials, and gallery from public PDP observed Aug 5, 2026.',
    placeholderIds: [],
  },
];

export const productCount = products.length;
