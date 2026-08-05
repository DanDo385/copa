/**
 * COPA Jewelry placeholder register — tracks demo content requiring real input.
 */

export type ProductionStatus = 'prototype' | 'blocked' | 'ready' | 'deprecated';

export interface Placeholder {
  id: string;
  route: string;
  component: string;
  displayedExample: string;
  requiredInput: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  productionStatus: ProductionStatus;
}

export const placeholders: Placeholder[] = [
  {
    id: 'ph-account-auth',
    route: '/account',
    component: 'AccountPlaceholder',
    displayedExample: 'Sign in to view orders (placeholder)',
    requiredInput: 'Shopify Customer Account API or auth provider integration',
    riskLevel: 'low',
    productionStatus: 'prototype',
  },
  {
    id: 'ph-search-results',
    route: '/search',
    component: 'SearchOverlay',
    displayedExample: 'Search catalog by title and tags',
    requiredInput: 'Production search index (Algolia/Shopify Search)',
    riskLevel: 'low',
    productionStatus: 'prototype',
  },
  {
    id: 'ph-live-shows-schedule',
    route: '/live-shows',
    component: 'LiveShowsPage',
    displayedExample: 'Whatnot live show schedule embed',
    requiredInput: 'Whatnot show calendar URL and embed policy approval',
    riskLevel: 'medium',
    productionStatus: 'prototype',
  },
  {
    id: 'ph-custom-inquiry-form',
    route: '/custom',
    component: 'CustomWorkForm',
    displayedExample: 'Custom work inquiry form (no backend)',
    requiredInput: 'Form endpoint, SLA copy, and Isabella Magro routing',
    riskLevel: 'medium',
    productionStatus: 'prototype',
  },
  {
    id: 'ph-our-story-founders',
    route: '/our-story',
    component: 'FoundersSection',
    displayedExample: 'Founder pitch-copy placeholders',
    requiredInput: 'Owner-approved bios and photography',
    riskLevel: 'low',
    productionStatus: 'prototype',
  },
  {
    id: 'ph-fleur-specs',
    route: '/products/fleur-earrings',
    component: 'ProductSpecs',
    displayedExample: 'To be confirmed',
    requiredInput: 'Supplier spec sheet for Fleur Earrings',
    riskLevel: 'medium',
    productionStatus: 'blocked',
  },
  {
    id: 'ph-snake-necklace-specs',
    route: '/products/snake-necklace',
    component: 'ProductSpecs',
    displayedExample: 'To be confirmed',
    requiredInput: 'Supplier spec sheet for Articulated Snake Necklace',
    riskLevel: 'medium',
    productionStatus: 'blocked',
  },
  {
    id: 'ph-petalia-origin',
    route: '/products/petalia-clip-on-earrings',
    component: 'ProvenanceBadge',
    displayedExample: 'Made in Italy (unverified)',
    requiredInput: 'Supplier origin certificate and legal review',
    riskLevel: 'high',
    productionStatus: 'blocked',
  },
  {
    id: 'ph-diamond-dust-hoops-price',
    route: '/products/diamond-dust-hoops',
    component: 'ProductPrice',
    displayedExample: '$68.00 (placeholder)',
    requiredInput: 'Confirmed retail price from catalog/Shopify',
    riskLevel: 'medium',
    productionStatus: 'blocked',
  },
  {
    id: 'ph-diamond-dust-hoops-specs',
    route: '/products/diamond-dust-hoops',
    component: 'ProductSpecs',
    displayedExample: 'To be confirmed',
    requiredInput: 'Supplier spec sheet for Diamond Dust Hoops',
    riskLevel: 'medium',
    productionStatus: 'blocked',
  },
  {
    id: 'ph-gift-wrap-service',
    route: '/cart',
    component: 'GiftWrapOption',
    displayedExample: 'Gift wrap $8 — unavailable',
    requiredInput: 'Gift wrap fulfillment workflow and UX design',
    riskLevel: 'low',
    productionStatus: 'blocked',
  },
  {
    id: 'ph-intaglio-earrings-specs',
    route: '/products/intaglio-earrings',
    component: 'ProductSpecs',
    displayedExample: 'To be confirmed',
    requiredInput: 'Supplier spec sheet for Intaglio Earrings',
    riskLevel: 'medium',
    productionStatus: 'blocked',
  },
  {
    id: 'ph-catena-specs',
    route: '/products/catena-body-chain',
    component: 'ProductSpecs',
    displayedExample: 'To be confirmed',
    requiredInput: 'Supplier spec sheet for Catena Body Chain',
    riskLevel: 'medium',
    productionStatus: 'blocked',
  },
  {
    id: 'ph-shipping-policy-faq',
    route: '/faq#shipping',
    component: 'FaqShipping',
    displayedExample: 'Structural shipping placeholder',
    requiredInput: 'Approved shipping policy from operations',
    riskLevel: 'high',
    productionStatus: 'blocked',
  },
  {
    id: 'ph-returns-policy-faq',
    route: '/faq#returns',
    component: 'FaqReturns',
    displayedExample: 'Structural returns placeholder',
    requiredInput: 'Approved return policy from legal/operations',
    riskLevel: 'high',
    productionStatus: 'blocked',
  },
  {
    id: 'ph-product-images-svg',
    route: '/products/*',
    component: 'ProductGallery',
    displayedExample: '/images/products/{handle}-1.svg placeholders',
    requiredInput: 'Licensed product photography from media-manifest',
    riskLevel: 'medium',
    productionStatus: 'prototype',
  },
];

export const placeholderIds = placeholders.map((p) => p.id);
