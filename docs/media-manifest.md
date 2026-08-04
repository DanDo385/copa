# Media Manifest

Machine-readable manifest: `docs/media-manifest.json`
Sync script: `scripts/download-media.mjs` (prototype asset sync only — **GET only**, no live store writes)

## Purpose

Document provenance for every reused COPA image: source URL, page, product association, placements, rights, and quality.

## Manifest fields

### Product entry

| Field | Description |
|-------|-------------|
| `handle` | Shopify product handle |
| `title` | Product title from `.js` endpoint |
| `source_url` | `https://copajewelry.com/products/{handle}.js` |
| `image_count` | Downloaded image count |
| `local_images` | Paths under `/images/products/` |
| `error` | Present if sync failed |

### Asset entry

| Field | Description |
|-------|-------------|
| `asset_id` | Unique ID `ASSET-{handle}-{n}` |
| `source_url` | Original CDN URL |
| `source_page` | Live PDP URL |
| `subject_product` | Product handle (must match) |
| `local_path` | Prototype path |
| `rights_status` | First-party store — internal prototype only |
| `synced_at` | ISO timestamp |

## Before / after placement map

| Asset / product | Live store (observed Aug 3 2026) | Prototype placement | Treatment |
|-----------------|----------------------------------|---------------------|-------------|
| Homepage hero imagery | `/` seasonal/promo led | Homepage hero (planned) | Recompose — remove SPRING promo dependency |
| Imperial Necklace images | `/products/imperial-necklace` | PDP, bestsellers, complete-the-look | Responsive crop; preserve product identity |
| Category collection images | `/collections/*` | Category grid tiles | Card crop 4:5 |
| About / founder | `/pages/about-us` | `/about`, `/founders` | Editorial crop |
| Live shows | `/pages/shop-our-live-shows` | `/live-shows` | Add schedule module |
| Packaging | Reviews / About references | Homepage packaging section | Owner approval |
| SVG placeholders | N/A | PDP fallback when sync not run | Replace with synced or new photography |

## Rules

1. **Never** use one product's image for another product.
2. No deceptive color/finish/scale alteration — CSS crop only.
3. Preserve untouched source in sync output.
4. Third-party / press images: placeholder until rights confirmed.
5. Owner-review gallery required before Shopify publication.

## Initial state

`media-manifest.json` ships empty until `npm run media:sync` is executed against the live store.

## Prototype SVG placeholders

| File | Product |
|------|---------|
| `imperial-necklace-1.svg` | Imperial Necklace |
| `tiara-ring-1.svg` | Tiara Ring |
| `fleur-earrings-1.svg` | Fleur Earrings |
| `intaglio-bracelet-1.svg` | Intaglio Bracelet |

Labeled "PROTOTYPE PLACEHOLDER" — abstract silhouettes, not fabricated photos.
