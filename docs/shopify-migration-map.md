# Shopify Migration Map — Online Store 2.0

Map prototype → Shopify without executing migration. No live theme edits without written approval.

## Templates (JSON)

| Prototype route | Shopify template | Notes |
|-----------------|------------------|-------|
| `/` | `templates/index.json` | Section stack — hero, proof, grids |
| `/products/[handle]` | `templates/product.json` | Variant picker, specs metafields |
| `/collections/*` | `templates/collection.json` | Filters via Search & Discovery |
| `/search` | `templates/search.json` | Zero-results section |
| `/cart` | `templates/cart.json` | Gift option — fix broken snippet |
| `/pages/about` | `templates/page.about.json` | Custom section |
| `/pages/live-shows` | `templates/page.live-shows.json` | Reminder form → customer API later |
| Policy pages | `templates/page.json` | Single policy section block |
| 404 | `templates/404.json` | Recovery links |

## Section groups

- **Header group:** announcement, header (menu, search, cart)
- **Footer group:** links, social, newsletter, trust badges

## Reusable sections

| Section | Blocks |
|---------|--------|
| `hero-editorial` | heading, subcopy, CTAs, media |
| `proof-strip` | metric items (Whatnot attributed) |
| `product-grid` | collection picker, limit |
| `category-grid` | category tiles |
| `founders-row` | metaobject references |
| `complete-the-look` | manual product list |
| `live-show-module` | schedule metaobject, CTA |
| `reviews-home` | Judge.me app block |
| `email-capture` | consent checkboxes |
| `policy-body` | rich text / metaobject |
| `faq-accordion` | FAQ metaobject entries |

## Metafields (product / variant)

| Namespace.key | Type | Content |
|---------------|------|---------|
| `copa.specs_base_metal` | single_line | Verified only |
| `copa.specs_plating` | single_line | Supplier doc required |
| `copa.specs_stone` | single_line | Per variant |
| `copa.specs_dimensions` | single_line | |
| `copa.specs_weight` | single_line | |
| `copa.specs_closure` | single_line | |
| `copa.care_instructions` | multi_line | |
| `copa.styling_note` | multi_line | Editorial |
| `copa.claim_status` | single_line | Registry link |
| `copa.inventory_class` | single_line | evergreen / one-of-one / etc. |
| `copa.channel_role` | single_line | shopify / whatnot / both |

## Metaobjects

| Type | Use |
|------|-----|
| `founder` | Bio, photo, role |
| `material_family` | Materials & care |
| `care_instruction` | Linked to materials |
| `size_guide_entry` | Ring/bracelet/necklace |
| `faq_item` | FAQ page |
| `press_item` | Gate G12 only when approved |
| `show_schedule_entry` | Live shows |
| `claim_evidence` | Links to claim registry |

## Admin actions (pre-launch)

1. Reconcile shipping/returns/refund policies (G3, G4).
2. Publish warranty page when G5 approved.
3. Fix cart gift-wrapping snippet or remove until defined.
4. Configure Search & Discovery filters (category, finish, material, stone, price, availability).
5. Configure manual recommendations — "Complete the look."
6. Audit Judge.me: badge, PDP widget, homepage, review hub.
7. Disable Shopify Inbox automatic agent; staff FAQs only until approved.
8. Set up customer privacy / consent banner per G13.
9. Create redirect rules (see `seo-redirect-spec.md`).
10. Staging theme duplicate — never edit live first.

## Judge.me blocks

| Placement | Block type |
|-----------|------------|
| Product card | Preview badge |
| PDP | Review widget |
| Homepage | Review carousel |
| `/pages/reviews` | Full hub |

Audit: rendering, request timing, moderation, incentive disclosure, rich results, mobile CLS.

## Search & Discovery

- Filters: category, finish, material, stone, size, price, availability
- Sort: featured, best selling, newest, price
- Complementary products: owner-curated lists first

## Shopify Inbox

- Future native support surface
- **Automatic agent: DISABLED** until policies, product knowledge, privacy, escalation, critical-answer tests pass (Gate + owner sign-off)

## Rollback / staging plan

### Staging

1. Duplicate live theme → `COPA Rebuild Staging`.
2. Install on unpublished preview URL.
3. Import metafield definitions via Shopify admin or CSV.
4. Point prototype component map to section settings.
5. Owner review on preview — placeholders visible.

### Pre-publish checklist

- [ ] All 14 owner gates addressed or explicitly deferred
- [ ] `audit:content` passes
- [ ] Redirects configured
- [ ] Judge.me verified on staging PDPs
- [ ] Test order on staging checkout
- [ ] No automatic Inbox agent

### Rollback

1. Keep previous theme published as `COPA Legacy Backup`.
2. One-click revert: Online Store → Themes → Publish backup.
3. Redirect JSON preserved separately — revert redirects if needed.
4. Document rollback owner: Marcela Garrett (or designated ops).

### Production cutover

1. Low-traffic window.
2. Publish staging theme.
3. Smoke test: homepage, cart, checkout, top 5 PDPs.
4. Monitor Search Console / support for 48h.
