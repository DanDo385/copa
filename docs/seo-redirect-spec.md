# SEO and Redirect Specification

Target: WCAG-aligned, fact-based SEO. No engagement-ring or unrelated category keywords.

## Page titles and meta descriptions (template)

| Route | Title template | Meta description template |
|-------|----------------|----------------------------|
| `/` | COPA Jewelry \| Brazilian-Spirited Curated Jewelry | Founder-led jewelry curated worldwide. Shop earrings, necklaces, rings, and live-show favorites. |
| `/collections/{handle}` | {Collection Name} \| COPA Jewelry | Shop {collection} — filters for finish, material, and price. |
| `/products/{handle}` | {Product Name} \| COPA Jewelry | {Verified short description — no unverified durability claims}. |
| `/about` | Our Story \| COPA Jewelry | Meet the founders behind COPA's live styling and worldwide curation. |
| `/live-shows` | Live Shows \| COPA Jewelry | Join COPA on Whatnot for live styling. Catalogue and restocks on copajewelry.com. |
| `/shipping-and-returns` | Shipping & Returns \| COPA Jewelry | Processing, delivery, returns — canonical policy (owner-approved copy). |
| `/size-guide` | Size Guide \| COPA Jewelry | Ring, bracelet, and necklace sizing in inches and millimeters. |

**Status:** Copy templates only — final strings require owner approval (G3, G5, G7).

## Canonical URLs

- Production base: `https://copajewelry.com`
- Self-referencing canonical on every indexable page
- Paginated collections: canonical to page 1 or `rel=next/prev` per Shopify defaults
- Search: `noindex, follow` recommended for `/search?q=*`

## Breadcrumbs

```
Home > {Collection} > {Product}
Home > {Page title}
```

Schema: `BreadcrumbList` when hierarchy is unambiguous.

## Structured data plan

| Type | When to emit | Gate |
|------|--------------|------|
| `Organization` | Sitewide | G1, G6 approved |
| `WebSite` + `SearchAction` | Homepage | Search live |
| `Product` + `Offer` | PDP | Verified price, SKU, availability |
| `AggregateRating` | PDP | Judge.me live data only — not Whatnot |
| `BreadcrumbList` | Collection, PDP | Implemented nav |
| `FAQPage` | FAQ | Owner-approved Q&A only |
| `MerchantReturnPolicy` | PDP/shipping | G3 approved |
| `ShippingDeliveryTime` | PDP/shipping | G4 approved |

**Do not emit** warranty or material claims in schema until verified.

## 301 redirects (live URL changes)

Document proposed redirects when prototype IA ships. Verify live URLs before implementation.

| From (live, observed) | To (proposed) | Reason |
|-----------------------|---------------|--------|
| `/pages/about-us` | `/about` | IA simplification |
| `/pages/shop-our-live-shows` | `/live-shows` | Consistent handle |
| `/pages/contact-us` | `/contact` | Consistent handle |
| `/pages/shipping-and-returns` | `/shipping-and-returns` | Keep or consolidate with policies |
| `/collections/frontpage` | `/collections/all` | Clearer shop-all |
| `/newletter` | `/` or email capture anchor | Misspelled URL — fix or redirect |
| Empty blog URLs | `/` or remove | Dead content |

### Search / product URL preservation

- Keep existing product handles (`imperial-necklace`, `tiara-ring`, etc.) — **no handle changes** without redirect
- If collection handles change, 301 each old → new

## Internal linking

- Descriptive anchor text ("Shop best sellers", not "click here")
- Policy links from PDP, cart, footer
- Size guide from ring/bracelet PDPs

## Image SEO

- Alt text describes actual image content
- Prototype SVG placeholders: include product name + "placeholder"
- Synced photos: `{Product name}, {view type}` e.g. "Imperial Necklace, clasp detail"

## robots / sitemap

- Preserve existing `robots.txt` allowances
- Sitemap includes products, collections, pages — exclude cart, checkout, account
- Refresh sitemap on migration cutover

## Open Graph

- `og:image` 1200×630 — hero or product image per page
- `og:title` matches title tag
- Prototype: static defaults until assets approved

## Verification status

| Check | Status |
|-------|--------|
| Live redirect map validated | PENDING |
| Schema on staging PDP | PENDING |
| Search Console submission | PENDING (post-launch) |
