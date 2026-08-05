/**
 * Whatnot channel proof metrics — observed Aug 3, 2026.
 * NEVER attribute these metrics to website reviews.
 */

export interface WhatnotMetric {
  key: string;
  label: string;
  value: string;
  numericValue?: number;
  unit?: string;
}

export interface WhatnotProof {
  sourceUrl: string;
  observedDate: string;
  attributionLabel: string;
  disclaimer: string;
  metrics: WhatnotMetric[];
  badges: string[];
}

export const whatnotProof: WhatnotProof = {
  sourceUrl: 'https://www.whatnot.com/user/copajewelry',
  observedDate: '2026-08-03',
  attributionLabel: 'Whatnot shop metrics',
  disclaimer:
    'These figures are from the CopaJewelry Whatnot shop profile observed August 3, 2026. They are not website reviews, DTC order counts, or Judge.me ratings. Always label the platform when displaying.',
  metrics: [
    {
      key: 'followers',
      label: 'Followers',
      value: '17.4K',
      numericValue: 17400,
      unit: 'followers',
    },
    {
      key: 'items_sold',
      label: 'Items Sold',
      value: '27.8K',
      numericValue: 27800,
      unit: 'items',
    },
    {
      key: 'reviews',
      label: 'Reviews',
      value: '4,707',
      numericValue: 4707,
      unit: 'reviews',
    },
    {
      key: 'rating',
      label: 'Rating',
      value: '5.0',
      numericValue: 5.0,
      unit: 'stars',
    },
    {
      key: 'avg_shipping',
      label: 'Average Shipping',
      value: 'One day',
    },
  ],
  badges: ['Premier Shop'],
};

/** Website review aggregate — separate from Whatnot; Judge.me observed same audit date */
export const websiteReviewProof = {
  source: 'Judge.me widget on copajewelry.com',
  observedDate: '2026-08-03',
  rating: 4.71,
  reviewCount: 78,
  attributionLabel: 'Website reviews (Judge.me)',
  disclaimer: 'Website on-site reviews only — do not merge with Whatnot review count.',
} as const;
