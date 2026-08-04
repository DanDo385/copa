#!/usr/bin/env node
/**
 * Content audit — parses claims + placeholders; exits 1 if any placeholder
 * marked incorrectly as VERIFIED or unresolved claims treated as verified.
 *
 * Usage: node scripts/content-audit.mjs
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

async function loadTsModule(relPath) {
  const { register } = await import("tsx/esm/api");
  register();
  return import(path.join(ROOT, relPath));
}

async function main() {
  const { claims, isClaimPublishable } = await loadTsModule("src/data/claims.ts");
  const { placeholders, getIncorrectlyVerifiedPlaceholders } = await loadTsModule("src/data/placeholders.ts");
  const { auditContentGates } = await loadTsModule("src/lib/claims-gate.ts");

  const violations = [];
  const warnings = [];

  console.log("COPA Content Audit\n");
  console.log("═".repeat(60));

  for (const claim of claims) {
    const publishable = isClaimPublishable(claim);
    const blocked = ["DO NOT PUBLISH", "SUPPLIER EVIDENCE REQUIRED", "LEGAL REVIEW REQUIRED"].includes(
      claim.approval_status,
    );
    if (blocked && publishable) {
      violations.push(`Claim ${claim.claim_id}: blocked status but publishable`);
    }
    if (!publishable) {
      warnings.push(`Claim ${claim.claim_id} [${claim.approval_status}]: ${claim.proposed_public_wording.slice(0, 60)}…`);
    }
  }

  for (const ph of placeholders) {
    if (ph.incorrectly_verified) {
      violations.push(`Placeholder ${ph.placeholder_id} incorrectly marked VERIFIED`);
    }
    if (ph.production_replacement !== "complete") {
      console.log(`  PH ${ph.placeholder_id} @ ${ph.route} — ${ph.status}`);
    }
  }

  const gate = auditContentGates();
  violations.push(...gate.violations);

  const badPlaceholders = getIncorrectlyVerifiedPlaceholders();
  if (badPlaceholders.length) {
    violations.push(`${badPlaceholders.length} placeholder(s) incorrectly verified`);
  }

  console.log("\nClaims summary:");
  console.log(`  Total: ${claims.length}`);
  console.log(`  Unresolved warnings: ${warnings.length}`);

  console.log("\nPlaceholders:");
  console.log(`  Total: ${placeholders.length}`);
  console.log(`  Pending replacement: ${placeholders.filter((p) => p.production_replacement === "pending").length}`);

  if (violations.length) {
    console.log("\n❌ VIOLATIONS:");
    violations.forEach((v) => console.log(`  - ${v}`));
    process.exit(1);
  }

  console.log("\n✓ No false-verification violations detected.");
  if (warnings.length) {
    console.log(`  (${warnings.length} unresolved claims documented — expected for prototype)`);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
