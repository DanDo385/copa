#!/usr/bin/env tsx

import { claims, isClaimPublishable } from '../src/data/claims';
import { placeholders } from '../src/data/placeholders';
import { auditContentGates } from '../src/lib/claims-gate';

const violations: string[] = [];
const unresolved = claims.filter((claim) => !isClaimPublishable(claim));

for (const claim of claims) {
  const blocked = [
    'DO_NOT_PUBLISH',
    'SUPPLIER_EVIDENCE_REQUIRED',
    'LEGAL_REVIEW_REQUIRED',
  ].includes(claim.approvalStatus);

  if (blocked && isClaimPublishable(claim)) {
    violations.push(`Claim ${claim.claim_id}: blocked status marked publishable`);
  }
}

for (const placeholder of placeholders) {
  if (placeholder.productionStatus === 'ready' && placeholder.riskLevel === 'critical') {
    violations.push(`Placeholder ${placeholder.id}: critical item marked ready`);
  }
}

const gate = auditContentGates();
violations.push(
  ...gate.violations
    .filter((violation) => violation.severity === 'error')
    .map((violation) => `${violation.id}: ${violation.message}`),
);

console.log('COPA Content Audit\n');
console.log(`Claims: ${claims.length}`);
console.log(`Unresolved claims documented: ${unresolved.length}`);
console.log(`Placeholders: ${placeholders.length}`);
console.log(`Critical placeholders marked ready: ${placeholders.filter((p) => p.productionStatus === 'ready' && p.riskLevel === 'critical').length}`);

if (violations.length > 0) {
  console.error('\nContent-gate violations:');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log('\n✓ No false-verification violations detected.');
console.log('  Unresolved items remain explicitly blocked or labeled for owner/supplier review.');
