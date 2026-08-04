# Component and Route Inventory

> **Status:** Prototype scaffold — routes marked *planned* until UI implementation completes. Inventory reflects target architecture from rebuild spec.

## Routes

| Path | Page | Type | Status |
|------|------|------|--------|
| `/` | Homepage | page | planned |
| `/collections/all` | Shop All | collection | planned |
| `/collections/earrings` | Earrings | collection | planned |
| `/collections/necklaces` | Necklaces | collection | planned |
| `/collections/rings` | Rings | collection | planned |
| `/collections/bracelets` | Bracelets | collection | planned |
| `/collections/ear-cuffs` | Ear Cuffs | collection | planned |
| `/collections/best-sellers` | Best Sellers | collection | planned |
| `/collections/new-arrivals` | New Arrivals | collection | planned |
| `/collections/gifts` | Gifts | collection | planned |
| `/collections/gifts-under-100` | Gifts Under Threshold | collection | planned |
| `/products/[handle]` | Product Detail | product | planned |
| `/search` | Search Results | utility | planned |
| `/cart` | Cart | utility | planned |
| `/about` | Our Story | page | planned |
| `/founders` | Meet the Founders | page | planned |
| `/reviews` | Reviews & Community | page | planned |
| `/live-shows` | Live Shows | page | planned |
| `/custom` | Custom & Bespoke | page | planned |
| `/materials-and-care` | Materials and Care | policy | planned |
| `/size-guide` | Size Guide | policy | planned |
| `/warranty` | Warranty | policy | planned |
| `/shipping-and-returns` | Shipping and Returns | policy | planned |
| `/faq` | FAQ | policy | planned |
| `/contact` | Contact | page | planned |
| `/privacy` | Privacy | policy | planned |
| `/terms` | Terms | policy | planned |
| `/limited-edition` | Limited Edition LP | page | planned |
| `/*` (404) | Not Found | utility | planned |

Source: `src/data/routes.ts`

## Layout components (target)

| Component | Purpose |
|-----------|---------|
| `RootLayout` | HTML shell, fonts, globals |
| `AnnouncementBar` | Truthful promo/show message |
| `SiteHeader` | Nav, search, cart, account placeholder |
| `SiteFooter` | Policies, social, accessibility |
| `SkipLink` | WCAG skip to main |
| `OwnerReviewModeToggle` | Reveals placeholders |

## Homepage sections (target)

| Component | Section |
|-----------|---------|
| `HeroSection` | H1, value prop, CTAs |
| `ProofStrip` | Whatnot metrics (attributed) |
| `ProductGrid` | Best sellers |
| `FoundersSection` | Host styling story |
| `CategoryGrid` | Shop by category |
| `CompleteTheLook` | Curated merchandising |
| `PackagingSection` | Unboxing story |
| `StorySection` | Brazilian-founded narrative |
| `LiveShowModule` | Schedule, reminder CTA |
| `ReviewsSection` | Judge.me slots + Whatnot proof |
| `CustomTeaser` | Bespoke inquiry route |
| `EmailCapture` | Consent-safe signup |

## Commerce components (target)

| Component | Used on |
|-----------|---------|
| `ProductCard` | Collections, search, grids |
| `ProductGallery` | PDP |
| `VariantSelector` | PDP |
| `SizeSelector` | PDP (rings, bracelets) |
| `AddToCartButton` | PDP, quick-add |
| `StickyMobileCTA` | PDP |
| `ProductSpecs` | PDP |
| `JudgeMeBadge` | PDP, cards (slot) |
| `JudgeMeReviews` | PDP, reviews page (slot) |
| `CollectionFilters` | Collection pages |
| `CollectionSort` | Collection pages |
| `SearchBar` | Header, search page |
| `ZeroResultsRecovery` | Search |
| `CartDrawer` | Global |
| `CartPage` | `/cart` |
| `ShippingProgress` | Cart drawer/page |
| `CartRecommendations` | Cart |
| `GiftOption` | Cart (placeholder) |

## Content / trust components (target)

| Component | Page |
|-----------|------|
| `PolicyPageLayout` | Warranty, shipping, privacy |
| `SizeGuideContent` | Size guide |
| `MaterialsCareContent` | Materials |
| `FAQAccordion` | FAQ |
| `ContactForm` | Contact |
| `ReminderForm` | Live shows |
| `FounderCard` | Founders |
| `WhatnotCTA` | Live shows, proof strip |
| `PlaceholderIndicator` | Any gated content |

## Data / lib modules (implemented)

| Module | Path |
|--------|------|
| Cart logic | `src/lib/cart.ts` |
| Filters | `src/lib/filters.ts` |
| Recommendations | `src/lib/recommendations.ts` |
| Variants | `src/lib/variants.ts` |
| Validation | `src/lib/validation.ts` |
| Claims gate | `src/lib/claims-gate.ts` |
| Analytics stubs | `src/lib/events.ts` |
| Claims data | `src/data/claims.ts` |
| Placeholders | `src/data/placeholders.ts` |
| Routes | `src/data/routes.ts` |
