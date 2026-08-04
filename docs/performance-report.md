# Performance Report

**Scope:** COPA Jewelry prototype
**Date:** 2026-08-03
**Important:** Local synthetic indicators only. **Field Core Web Vitals require CrUX / Search Console after launch.**

## Strategy

### Mobile-first

- Design and test at 375px width first
- Single DOM gallery — no duplicated desktop/mobile galleries
- Touch targets ≥44px (`--touch-target`)

### LCP (Largest Contentful Paint)

- Eager-load hero/PDP primary image only
- `fetchpriority="high"` on LCP candidate
- Responsive `srcset` / Next.js `Image` with explicit width/height
- Avoid autoplay video as LCP

### CLS (Cumulative Layout Shift)

- Intrinsic dimensions on all images
- Reserve space for Judge.me widgets and recommendation rows
- Font display: swap with metric-compatible fallbacks (Fraunces, Source Sans 3)
- Announcement + header heights fixed via CSS variables

### INP (Interaction to Next Paint)

- Minimize third-party scripts in prototype (none connected)
- Debounce filter applications
- Cart updates client-side — no full page reload

### Assets

- Modern formats (WebP/AVIF) on sync pipeline where supported
- Lazy load below-fold collection images
- SVG placeholders lightweight for dev

### Third parties (production plan)

| Script | Prototype | Production gate |
|--------|-----------|-------------------|
| GA4 | Disabled stub | Consent + G14 |
| Judge.me | Slot only | Staging audit |
| Shopify Inbox | Not loaded | Post-launch |
| Payment wallets | N/A | Checkout test |

## Local indicators (PENDING measurement)

Run after build:

```bash
npm run build
npm run start
# Lighthouse CLI (optional):
# npx lighthouse http://127.0.0.1:3000 --preset=desktop --output=json
```

| Metric | Target | Prototype measurement | Status |
|--------|--------|----------------------|--------|
| LCP | < 2.5s | — | PENDING |
| INP | < 200ms | — | PENDING |
| CLS | < 0.1 | — | PENDING |
| TTFB | < 800ms | — | PENDING |
| JS bundle (first load) | Minimal | — | PENDING |

## Build output

Next.js build analysis: **PENDING** — run `npm run build` and record route sizes.

## Production CWV

After Shopify migration:

1. Enable Search Console property
2. Monitor CrUX field data (28-day rolling)
3. Set performance budgets in CI (optional Lighthouse threshold)

**Do not claim CWV pass based on local Lighthouse alone.**

## Responsive test matrix

| Viewport | Width | Status |
|----------|-------|--------|
| Small mobile | 375 | PENDING |
| Large mobile | 428 | PENDING |
| Tablet | 768 | PENDING |
| Desktop | 1280 | PENDING |

## Verification status

All performance measurements: **PENDING** until prototype routes built and commands executed.
