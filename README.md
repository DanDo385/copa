# COPA Jewelry Prototype

Working Shopify-ready storefront prototype for **COPA Jewelry**. This is a local, isolated pitch environment — not connected to the live Shopify store and unable to process real checkout.

## Quick start

```bash
npm install
npm run media:sync   # optional — inventory existing COPA imagery into public/media
npm run dev          # http://127.0.0.1:3000
npm run verify       # typecheck, lint, unit tests, build, content audit
```

## Prototype scope

- **No live Shopify connection** — cart, search, and checkout are simulated locally.
- **No real checkout** — the checkout button is disabled and labeled as prototype-only.
- **No form submission** — contact, reminder, and consent forms validate locally only.
- **Placeholder content** — unresolved facts use labeled placeholders and owner-review mode.
- **Existing COPA photos** — reuse first-party assets from copajewelry.com with provenance in the media manifest (after `media:sync`).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint (Next.js core web vitals) |
| `npm run typecheck` | TypeScript strict check |
| `npm run test` | Vitest unit/component tests |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run test:a11y` | Playwright + axe accessibility checks |
| `npm run media:sync` | Sync media manifest from copajewelry.com |
| `npm run audit:content` | Fail if placeholders are treated as verified |
| `npm run audit:links` | Check internal route links |
| `npm run verify` | Full local QA pipeline |

## Route inventory

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/collections/all` | Shop all |
| `/collections/earrings` | Earrings category |
| `/collections/necklaces` | Necklaces category |
| `/collections/rings` | Rings category |
| `/collections/bracelets` | Bracelets category |
| `/collections/ear-cuffs` | Ear cuffs category |
| `/collections/best-sellers` | Best sellers |
| `/collections/new-arrivals` | New arrivals |
| `/collections/gifts` | Gifts |
| `/collections/gifts-under-[threshold]` | Gifts under threshold (owner-approved) |
| `/products/[handle]` | Product detail page |
| `/search` | Search results |
| `/cart` | Full cart page |
| `/about` | Our story |
| `/founders` | Meet the founders |
| `/reviews` | Reviews & community proof |
| `/live-shows` | Live shows |
| `/custom` | Custom & bespoke |
| `/materials-and-care` | Materials and care |
| `/size-guide` | Size guide |
| `/warranty` | Warranty |
| `/shipping-and-returns` | Shipping and returns |
| `/faq` | FAQ |
| `/contact` | Contact |
| `/privacy` | Privacy placeholder |
| `/terms` | Terms placeholder |
| `/account` | Account placeholder |
| `/ad-readiness` | Ad readiness gate report |
| `/limited/[handle]` | Optional limited-edition landing template |
| `404` | Not found recovery |

## Design system

Tokens live in `src/styles/tokens.css` — warm sunlit stone backgrounds, deep teal sea accents, warm gold highlights, Fraunces display + Source Sans 3 body. Owner-review mode reveals placeholder markers.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript (strict)
- Vitest + Testing Library
- Playwright + axe-core
- ESLint (next/core-web-vitals)

## Owner review mode

Toggle **Owner review** in the header to surface placeholder markers and unresolved assumptions. Pitch view renders polished example copy with subtle prototype indicators.
