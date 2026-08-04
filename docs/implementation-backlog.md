# Implementation Backlog

Prioritized work for COPA Jewelry prototype → production migration.

## P0 — Trust, policy, identity, contact, cart defects

| ID | Task | Owner | Depends |
|----|------|-------|---------|
| P0-1 | Resolve returns/shipping policy contradictions (G3, G4) | Owners + counsel | — |
| P0-2 | Define warranty scope or remove "lifetime" claims (G5) | Owners | P0-1 |
| P0-3 | Unify brand name and contact entity (G1, G6) | Owners | — |
| P0-4 | Fix live cart gift-wrapping Liquid error (migration) | Dev | Gift spec |
| P0-5 | Privacy policy placeholders — legal review (G13) | Counsel | — |
| P0-6 | Claims registry enforcement in UI (`audit:content`) | Dev | — |
| P0-7 | Prototype checkout block — no real transactions | Dev | — |
| P0-8 | Implement all routes with placeholder discipline | Dev | P0-6 |

## P1 — Conversion, reviews, PDPs, search, mobile, performance

| ID | Task | Owner | Depends |
|----|------|-------|---------|
| P1-1 | Homepage hierarchy per spec | Dev + design | P0-8 |
| P1-2 | Product template — specs, variants, size guide links | Dev | G8 partial |
| P1-3 | Collection filters + sort | Dev | Product data |
| P1-4 | Search + zero-results recovery | Dev | P1-3 |
| P1-5 | Cart drawer + shipping progress | Dev | G4 threshold |
| P1-6 | Judge.me block placements (staging) | Dev | Staging theme |
| P1-7 | Media sync + manifest (`media:sync`) | Dev | Network |
| P1-8 | Responsive QA + Lighthouse baseline | Dev | P1-1 |
| P1-9 | axe + keyboard E2E pass | Dev | P1-1 |

## P2 — Lifecycle, merchandising, structured data, inventory

| ID | Task | Owner | Depends |
|----|------|-------|---------|
| P2-1 | Inventory channel model in Shopify metafields | Dev + ops | G10 |
| P2-2 | Reserve-before-show workflow documentation → tooling | Ops | P2-1 |
| P2-3 | Complete-the-look curation in Search & Discovery | Merch | P1-3 |
| P2-4 | Lifecycle flow spec → Shopify Flow (no send in proto) | Marketing | G13 |
| P2-5 | Product + breadcrumb schema (verified data only) | Dev | P0-2, P1-2 |
| P2-6 | Email/SMS capture with separate consent | Dev | G13 |
| P2-7 | Live show reminder form (validate only in proto) | Dev | G9 |
| P2-8 | 301 redirect implementation | Dev | Staging |

## P3 — Ads, automation, loyalty, advanced personalization

| ID | Task | Owner | Depends |
|----|------|-------|---------|
| P3-1 | Merchant Center feed | Marketing | P0-2, P1-2 |
| P3-2 | GA4 + Consent Mode | Marketing | G13, staging order |
| P3-3 | Google Ads branded search test | Marketing | All ad gates |
| P3-4 | Shopify Inbox — staff FAQs only | Support | P0-1 |
| P3-5 | Inbox AI agent | Support | P3-4 + knowledge tests |
| P3-6 | Behavioral recommendations | Dev | Order history |
| P3-7 | Loyalty / VIP tier | Owners | Economics |
| P3-8 | Win-back and browse abandonment sends | Marketing | G13, ESP |

## Quick wins (can ship first after P0)

1. Owner presentation route with review mode toggle
2. Design token theme in Shopify staging
3. Top 10 PDP spec cleanup
4. Whatnot proof strip with attribution
5. Broken link audit in CI (`audit:links`)

## Estimation

Estimates **not provided** — depend on owner gate turnaround and staging access.
