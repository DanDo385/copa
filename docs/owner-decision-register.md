# Owner Decision Register — 14 Gates

Production migration cannot proceed until owners decide or supply evidence for each gate. Prototype may use labeled assumptions.

| Gate | Topic | Prototype assumption | Owner action required | Blocks |
|------|-------|---------------------|----------------------|--------|
| **G1** | Brand display name & trademark | "COPA Jewelry" | Permanent name + trademark path | Legal, ads, packaging |
| **G2** | Permanent 25% promotion & pricing | Demo pricing; no SPRING code | Retire or approve promo architecture | Ads, margin, trust |
| **G3** | Returns policy (canonical) | Placeholder structure | Cash refund vs credit, window, exclusions, intl | Ads, support, checkout |
| **G4** | Shipping (processing, carriers, threshold) | $80 demo threshold | Processing SLA, carriers, insurance, duties | Ads, cart messaging |
| **G5** | Warranty | Placeholder — no final promise | Duration, coverage, exclusions, remedy, claim route | PDP, footer, ads |
| **G6** | Support contact & entity | Placeholder email/hours | Approved email, phone, hours, address, legal entity | Contact, policies, ads |
| **G7** | Founder biographies | Placeholder bios | Approved bios and public roles for Marcela, Isabella, Carol | About, homepage |
| **G8** | Product specifications | "To be confirmed" fields | Base metal, plating, stones, dimensions per variant | PDP, feeds, claims |
| **G9** | Live show schedule & reminders | Wed/Fri placeholder | Schedule, timezone, reminder rules, referral credit terms | Live shows page |
| **G10** | Inventory/channel classification | Data model documented | Evergreen vs one-of-one vs auction vs exclusive per SKU | Double-sale prevention |
| **G11** | Review & UGC reuse | Judge.me slots only | Permissions for Whatnot/customer content reuse | Reviews, marketing |
| **G12** | Press claims & image rights | Not displayed | Schön! and other press evidence + wording | About, homepage |
| **G13** | Privacy, cookie, email, SMS consent | Separate unchecked consents | Canonical policies + consent requirements | Forms, lifecycle, ads |
| **G14** | Unit economics & ad readiness | Not collected | COGS, fees, shipping subsidy, margins, CAC targets | Paid acquisition |

## Decision workflow

1. Owner meeting → record decision in this register with date and approver.
2. Update `src/data/claims.ts` and `src/data/placeholders.ts`.
3. Replace prototype placeholder copy on affected routes.
4. Re-run `npm run audit:content`.
5. Update ad-readiness gate status in `docs/ad-readiness.md`.

## Current status summary

**All 14 gates: OPEN** — no production decisions recorded as of prototype documentation date.
