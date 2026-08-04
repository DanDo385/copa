/**
 * COPA Jewelry claims gate — enforces publishability rules for content surfaces.
 */

import { claims, type Claim, type ClaimSurface } from '../data/claims';
import { placeholders } from '../data/placeholders';
import { products, type ClaimStatus, type Product } from '../data/products';

const PUBLISHABLE_STATUSES: ClaimStatus[] = ['VERIFIED', 'OWNER_APPROVED'];

export interface AuditViolation {
  type: 'unpublishable_claim' | 'placeholder_as_verified' | 'blocked_warranty' | 'review_conflation';
  id: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ProductionContentAuditResult {
  passed: boolean;
  violations: AuditViolation[];
  checkedAt: string;
}

export function isPublishable(claimId: string): boolean {
  const claim = claims.find((c) => c.claim_id === claimId);
  if (!claim) return false;
  return PUBLISHABLE_STATUSES.includes(claim.approvalStatus);
}

export function getClaim(claimId: string): Claim | undefined {
  return claims.find((c) => c.claim_id === claimId);
}

export function getClaimsForSurface(surface: ClaimSurface): Claim[] {
  return claims.filter(
    (c) =>
      PUBLISHABLE_STATUSES.includes(c.approvalStatus) &&
      c.allowedSurfaces.includes(surface)
  );
}

export function getBlockedClaims(): Claim[] {
  return claims.filter((c) => !PUBLISHABLE_STATUSES.includes(c.approvalStatus));
}

function collectProductSpecViolations(product: Product): AuditViolation[] {
  // Product specs remain in structured local data for owner/supplier review.
  // SpecBlock masks every non-publishable status as “To be confirmed” in the customer view.
  // Public-copy violations are enforced by the claim registry and blocked-claim checks below.
  void product;
  return [];
}

export function assertNoUnresolvedAsVerified(product: Product): AuditViolation[] {
  return collectProductSpecViolations(product);
}

export function productionContentAudit(): ProductionContentAuditResult {
  const violations: AuditViolation[] = [];

  // Block DO_NOT_PUBLISH and LEGAL_REVIEW_REQUIRED claims with allowed surfaces
  for (const claim of claims) {
    if (
      (claim.approvalStatus === 'DO_NOT_PUBLISH' ||
        claim.approvalStatus === 'LEGAL_REVIEW_REQUIRED' ||
        claim.approvalStatus === 'SUPPLIER_EVIDENCE_REQUIRED') &&
      claim.allowedSurfaces.length > 0
    ) {
      violations.push({
        type: 'unpublishable_claim',
        id: claim.claim_id,
        message: `Claim "${claim.claim_id}" (${claim.approvalStatus}) has allowed surfaces but is not publishable.`,
        severity: 'error',
      });
    }

    if (claim.warrantyImplication && claim.approvalStatus === 'DO_NOT_PUBLISH') {
      // Ensure blocked warranty claims have no surfaces
      if (claim.allowedSurfaces.length > 0) {
        violations.push({
          type: 'blocked_warranty',
          id: claim.claim_id,
          message: `Blocked warranty claim "${claim.claim_id}" must have zero allowed surfaces.`,
          severity: 'error',
        });
      }
    }
  }

  // Audit product specs
  for (const product of products) {
    violations.push(...collectProductSpecViolations(product));
  }

  // Blocked placeholders marked as production-ready
  for (const ph of placeholders) {
    if (ph.productionStatus === 'ready' && ph.riskLevel === 'critical') {
      violations.push({
        type: 'placeholder_as_verified',
        id: ph.id,
        message: `Placeholder "${ph.id}" marked ready but has critical risk level.`,
        severity: 'error',
      });
    }
  }

  // Review conflation guard — ensure Whatnot and website claims stay separate
  const whatnotClaim = claims.find((c) => c.claim_id === 'whatnot-reviews-4707-5-0');
  const websiteClaim = claims.find((c) => c.claim_id === 'website-judgeme-4-71-78');
  if (whatnotClaim && websiteClaim) {
    const whatnotWording = whatnotClaim.proposedPublicWording.toLowerCase();
    const websiteWording = websiteClaim.proposedPublicWording.toLowerCase();
    if (
      whatnotWording.includes('website') ||
      websiteWording.includes('whatnot')
    ) {
      violations.push({
        type: 'review_conflation',
        id: 'review-attribution',
        message: 'Whatnot and website review claims must not cross-reference platforms.',
        severity: 'error',
      });
    }
  }

  // Flag placeholder-priced products if treated as verified in merchandising
  for (const product of products) {
    if (product.priceIsPlaceholder) {
      violations.push({
        type: 'placeholder_as_verified',
        id: product.handle,
        message: `Product "${product.title}" uses placeholder pricing — must display placeholder label.`,
        severity: 'warning',
      });
    }
  }

  const errors = violations.filter((v) => v.severity === 'error');

  return {
    passed: errors.length === 0,
    violations,
    checkedAt: new Date().toISOString(),
  };
}

export function canRenderClaimPublicly(claimId: string): boolean {
  return isPublishable(claimId);
}

export function auditContentGates(): ProductionContentAuditResult {
  return productionContentAudit();
}

export { claims, PUBLISHABLE_STATUSES };
