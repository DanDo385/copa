/**
 * COPA Jewelry founder profiles — bios require owner approval before publication.
 */

import type { ClaimStatus } from './products';

export type FounderRole =
  | 'host-styling'
  | 'custom-work'
  | 'curation';

export interface Founder {
  id: string;
  slug: string;
  name: string;
  role: FounderRole;
  roleLabel: string;
  /** Polished pitch copy — not verified biography */
  pitchCopy: string;
  bioPlaceholder: true;
  ownerApprovalRequired: true;
  approvalStatus: ClaimStatus;
  assumptionNote: string;
  imagePath: string;
}

export const founders: Founder[] = [
  {
    id: 'founder-marcela-garrett',
    slug: 'marcela-garrett',
    name: 'Marcela Garrett',
    role: 'host-styling',
    roleLabel: 'Host & Styling',
    pitchCopy:
      'Marcela brings COPA to life on live shows and in editorial moments — translating runway energy into wearable pieces you can style every day. Her eye for layering and occasion dressing shapes how we present each collection.',
    bioPlaceholder: true,
    ownerApprovalRequired: true,
    approvalStatus: 'SUPPLIER_EVIDENCE_REQUIRED',
    assumptionNote:
      'Role assigned as host/styling based on prototype assignment — owner must confirm title and bio.',
    imagePath: '/images/founders/marcela-garrett.svg',
  },
  {
    id: 'founder-isabella-magro',
    slug: 'isabella-magro',
    name: 'Isabella Magro',
    role: 'custom-work',
    roleLabel: 'Custom Work',
    pitchCopy:
      'Isabella leads custom and made-to-order conversations — helping clients find the right fit, finish, and personal detail. She bridges COPA\'s catalog with one-of-one requests and bespoke adjustments.',
    bioPlaceholder: true,
    ownerApprovalRequired: true,
    approvalStatus: 'SUPPLIER_EVIDENCE_REQUIRED',
    assumptionNote:
      'Role assigned as custom work lead based on prototype assignment — owner must confirm scope and bio.',
    imagePath: '/images/founders/isabella-magro.svg',
  },
  {
    id: 'founder-carol-cavalcanti',
    slug: 'carol-cavalcanti',
    name: 'Carol Cavalcanti',
    role: 'curation',
    roleLabel: 'Curation',
    pitchCopy:
      'Carol curates what makes it into each COPA drop — balancing trend, wearability, and the brand\'s signature boldness. Her selections drive new arrivals, bestseller edits, and limited releases.',
    bioPlaceholder: true,
    ownerApprovalRequired: true,
    approvalStatus: 'SUPPLIER_EVIDENCE_REQUIRED',
    assumptionNote:
      'Role assigned as curation lead based on prototype assignment — owner must confirm title and bio.',
    imagePath: '/images/founders/carol-cavalcanti.svg',
  },
];
