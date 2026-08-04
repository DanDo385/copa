# Inventory and Channel Model

Variant-level control for Shopify + Whatnot without double-selling one-of-one inventory.

## Variant record (proposed)

| Field | Type | Description |
|-------|------|-------------|
| `sku` | string | Unique SKU |
| `product_handle` | string | Shopify handle |
| `channel_role` | enum | `shopify-only`, `whatnot-only`, `both` |
| `inventory_class` | enum | See below |
| `availability_state` | enum | See below |
| `quantity_on_hand` | number | Shopify inventory (private) |
| `reserved_quantity` | number | Held for show or cart |
| `location` | string | Warehouse / show kit |
| `claim_status` | string | Link to claim registry |
| `material_metafield_ref` | ref | Metaobject |
| `care_metafield_ref` | ref | Metaobject |
| `related_products` | list | Owner-curated handles |

Implementation: `src/lib/variants.ts`

## Inventory class

| Class | Description | Web purchasable | Whatnot |
|-------|-------------|-----------------|---------|
| `evergreen` | Replenishable catalogue | Yes | Optional |
| `limited-multi` | Fixed run, may restock | Yes until sold | Often |
| `one-of-one` | Single unit | One channel only | Auction/show |
| `auction-only` | Whatnot auction | No | Yes |
| `clearance` | Exit inventory | Yes | Optional |
| `preorder` | Future ship date | Yes (labeled) | Rare |
| `website-exclusive` | Owned channel only | Yes | No |
| `marketplace-exclusive` | Whatnot exclusive | No | Yes |
| `discontinued` | No restock | Hide/redirect | No |

## Availability state

| State | Meaning | Customer-facing |
|-------|---------|-----------------|
| `available` | Sellable on assigned channel | Add to cart / Buy |
| `reserved-shopify` | Held for web order/show prep | Unavailable |
| `reserved-whatnot` | Held for upcoming show | Unavailable on web |
| `sold-pending-reconciliation` | Sold live; sync pending | Unavailable |
| `unavailable` | Repair, sample, damaged, gift | Sold out / notify |

## Channel rules

1. **One-of-one:** NEVER purchasable on both channels simultaneously.
2. **Reserve before show:** Move units to `reserved-whatnot` before broadcast.
3. **Reconcile after show:** Mark sold or return to `available` within SLA.
4. **Replenishable buffer:** Owner-approved safety quantity on web until sync verified — **quantity not invented in prototype**.
5. **Auction-only:** Web shows "Available on Whatnot" CTA, not add to cart.

## Reserve-before-show workflow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ Available (web) │────▶│ Reserved-Whatnot │────▶│ Sold / Return   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        ▲                         │                        │
        └─────────────────────────┴────────────────────────┘
                    Reconcile after show
```

### Steps

1. **T-24h:** Merch selects show lineup SKUs in admin.
2. **Reserve:** Set `availability_state = reserved-whatnot` for show units.
3. **Verify:** Web PDP shows unavailable; Whatnot listing active.
4. **During show:** Sales on Whatnot only.
5. **T+2h reconcile:** Update Shopify inventory; unsold → `available`.
6. **Exception:** One-of-one sold → `sold-pending-reconciliation` until books match.

## Shopify metafields mapping

| Metafield | Values |
|-----------|--------|
| `copa.inventory_class` | enum above |
| `copa.availability_state` | enum above |
| `copa.channel_role` | enum above |
| `copa.show_reserved_until` | datetime (optional) |

## Prototype behavior

- Cart uses client-side state only
- Variant purchasability via `isPurchasable()` in `src/lib/variants.ts`
- No live inventory API connection

## Owner decision

Gate **G10:** Classify each SKU — required before production sync automation.
