# Claim Registry

Mirrors `src/data/claims.ts`. Every public-facing claim must have an approval status.

## Status values

| Status | Meaning |
|--------|---------|
| `VERIFIED` | Evidence on file, may publish within boundary |
| `OWNER APPROVED` | Owners approved wording; may publish within boundary |
| `SUPPLIER EVIDENCE REQUIRED` | Do not publish until supplier docs exist |
| `LEGAL REVIEW REQUIRED` | Counsel must review before publish |
| `DO NOT PUBLISH` | Blocked |

## Rules

1. No catalogue-wide water-resistant, tarnish-free, hypoallergenic, nickel-free, or lifetime guarantee without variant evidence.
2. No plating microns until supplier documentation exists.
3. No NYFW/SPFW without documentation.
4. Whatnot metrics: attribute platform + observation date; never imply collected on COPA website.
5. Use "Styled by COPA" / "Complete the look" — not "Customers also bought" until clean order data.
6. Schön! editorial requires separate text and image permissions.

## Registry

| ID | Wording (summary) | Products | Status | Allowed surfaces |
|----|-------------------|----------|--------|------------------|
| CLM-001 | COPA Jewelry (display name) | Sitewide | OWNER APPROVED | header, footer, about |
| CLM-002 | Whatnot metrics (Aug 3 2026) | Homepage, live, reviews | VERIFIED | homepage, live-shows, reviews |
| CLM-003 | Lifetime warranty | Sitewide (live store) | DO NOT PUBLISH | — |
| CLM-004 | Hypoallergenic/nickel-free (catalogue) | Collections | SUPPLIER EVIDENCE REQUIRED | — |
| CLM-005 | Water-resistant/tarnish-free (Whatnot bio) | Channel bio | SUPPLIER EVIDENCE REQUIRED | — |
| CLM-006 | NYFW and SPFW | About | DO NOT PUBLISH | — |
| CLM-007 | Brazilian-founded; worldwide curation | About, homepage | OWNER APPROVED | about, homepage, founders |
| CLM-008 | Free shipping over $80 | Cart, shipping | OWNER APPROVED (demo threshold) | cart, shipping-page |
| CLM-009 | Styled by COPA / Complete the look | PDP, cart | OWNER APPROVED | pdp, cart, homepage |
| CLM-010 | 18k gold plated stainless steel (Imperial) | imperial-necklace | SUPPLIER EVIDENCE REQUIRED | pdp-imperial-necklace |

## Audit

Run: `npm run audit:content`

Exits 1 if unresolved claims are treated as verified or placeholders incorrectly marked verified.

## Full field schema

Each record includes: `claim_id`, `proposed_public_wording`, `applicable_products_or_variants`, `evidence_source`, `evidence_owner`, `approval_status`, `usage_boundary`, `warranty_or_remedy_implication`, `allowed_surfaces`, `last_verified_date`.
