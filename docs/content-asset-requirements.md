# Content Asset Requirements — Replacement Shot List

Prioritized production photography and media needs. Use existing copajewelry.com assets where quality permits; request new shots where noted.

## Priority legend

- **P0** — Blocks homepage, bestseller PDPs, or owner presentation
- **P1** — Conversion and trust on key collections
- **P2** — Merchandising depth and lifecycle
- **P3** — Nice-to-have editorial

## Shot list

| Priority | Asset | Placement | Requirement | Current status |
|----------|-------|-----------|-------------|----------------|
| P0 | Hero — founder or product-led | Homepage hero | High-res, brand story, no unverified claims | NEEDS SHOOT or approved existing |
| P0 | Imperial Necklace — full gallery set | PDP + bestsellers | Front, clasp, scale, on-body, detail | Partial — live store has 7 images; audit quality |
| P0 | Tiara Ring — full gallery set | PDP + bestsellers | Same standard | NEEDS AUDIT |
| P0 | Packaging / unboxing | Homepage section | Approved packaging photos; no scent claims | Existing may suffice — owner approval |
| P0 | Founder portraits (×3) | Founders, homepage | Marcela, Isabella, Carol — approved bios paired | PLACEHOLDER |
| P1 | Category tiles — earrings, necklaces, rings, bracelets, ear cuffs | Homepage grid | Consistent crop, representative pieces | Mix live assets + placeholders |
| P1 | Fleur Earrings gallery | PDP | Movement slot optional | SVG placeholder in prototype |
| P1 | Diamond Dust Ring + Hoops | PDP, complete-the-look | Same finish pairing shots | NEEDS AUDIT |
| P1 | Live show — host styling clip (10–20s) | Live shows | User-initiated playback; poster frame | PLACEHOLDER |
| P2 | Intaglio Bracelet | PDP | Scale + clasp detail | SVG placeholder |
| P2 | Snake Necklace, Sultan Snake Ring | Search/SEO PDPs | Fix search discoverability story | Live assets exist |
| P2 | Gift guide lifestyle | `/collections/gifts` | Occasion styling, no fake products | NEEDS SHOOT |
| P2 | Materials macro — plating, stones | Materials page | Per verified material family only | SUPPLIER DATA REQUIRED |
| P3 | Press / Schön! editorial | About (if approved) | Text + image rights separate | DO NOT USE until rights confirmed |
| P3 | Custom work portfolio | `/custom` | Past bespoke with customer permission | OWNER INPUT |

## Standard PDP gallery slots

1. Product-only hero
2. Alternate angle / clasp
3. Scale reference
4. On-body
5. Detail / stone
6. Movement or styling (video optional)
7. Packaging context (where relevant)

## Prototype placeholders

Abstract SVG silhouettes in `public/images/products/*-1.svg` — **not** fake product photos. Replace before production.

## Sync from live store

Run `npm run media:sync` (GET only) to download product JSON images into `public/images/products/` and update `docs/media-manifest.json`.
